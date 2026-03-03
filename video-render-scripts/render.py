import sys
import json
import argparse
import os
import requests
import subprocess
import shutil
import re
import time
import psutil
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
from rich.console import Console
from rich.live import Live
from rich.panel import Panel
from rich.layout import Layout
from rich.table import Table
from rich import box

# Attempt to locate ffmpeg
def get_ffmpeg_cmd():
    if shutil.which("ffmpeg"):
        return "ffmpeg"
    local_bin = os.path.join(os.getcwd(), "bin", "ffmpeg.exe")
    if os.path.exists(local_bin):
        return local_bin
    return "ffmpeg"

FFMPEG_CMD = get_ffmpeg_cmd()

def download_and_process_slide(slide_data, temp_dir, index):
    """Downloads/loads image, resizes to 1080p, saves as .jpg"""
    try:
        url = slide_data.get('backgroundImage')
        source_path = None
        
        if url:
            url = url.strip()
            url_clean = url.replace("/", os.sep).replace("\\", os.sep).lstrip(os.sep)
            absolute_path = os.path.join(temp_dir, url_clean)
            
            if os.path.exists(url):
                source_path = url
            elif os.path.exists(absolute_path):
                source_path = absolute_path
            elif url.startswith('http'):
                download_path = os.path.join(temp_dir, f"raw_slide_{index}.jpg")
                if not os.path.exists(download_path):
                    print(f"[Slide {index}] Downloading: {url}")
                    response = requests.get(url, stream=True, timeout=30)
                    if response.status_code == 200:
                        with open(download_path, 'wb') as f:
                            for chunk in response.iter_content(chunk_size=4096):
                                f.write(chunk)
                        source_path = download_path
                else:
                    source_path = download_path
            else:
                print(f"[Slide {index}] WARNING: Could not find image: '{url}'")
        
        final_path = os.path.join(temp_dir, f"final_slide_{index}.jpg")
        
        img = None
        if source_path:
            try:
                img = Image.open(source_path).convert('RGB')
            except Exception as e:
                print(f"[Slide {index}] Error opening image: {e}")
        
        if img is None:
            bg_color = slide_data.get('backgroundColor', '#1a1a1a')
            img = Image.new('RGB', (1920, 1080), color=bg_color if bg_color.startswith('#') else (26, 26, 26))
        
        target_w, target_h = 1920, 1080
        img_ratio = img.width / img.height
        target_ratio = target_w / target_h
        
        if img_ratio > target_ratio:
            new_h = target_h
            new_w = int(target_h * img_ratio)
        else:
            new_w = target_w
            new_h = int(target_w / img_ratio)
            
        img = img.resize((new_w, new_h), Image.LANCZOS)
        
        left = (new_w - target_w) // 2
        top = (new_h - target_h) // 2
        img = img.crop((left, top, left + target_w, top + target_h))

        img.save(final_path, quality=95, subsampling=0)
        print(f"[Slide {index}] Processed: {final_path}")
        return index, final_path
        
    except Exception as e:
        print(f"[Slide {index}] FATAL ERROR: {e}")
        import traceback
        traceback.print_exc()
        return index, None


def format_srt_time(seconds):
    """Converts seconds to SRT time format: HH:MM:SS,mmm"""
    millis = int((seconds - int(seconds)) * 1000)
    seconds = int(seconds)
    minutes = seconds // 60
    hours = minutes // 60
    minutes %= 60
    seconds %= 60
    return f"{hours:02}:{minutes:02}:{seconds:02},{millis:03}"

def generate_srt(slides, output_path):
    """Generates an SRT subtitle file from slide segments."""
    print(f"[SRT] Generating subtitles: {output_path}")
    with open(output_path, 'w', encoding='utf-8') as f:
        for i, slide in enumerate(slides):
            start = slide.get('startTime', 0)
            end = slide.get('endTime', 0)
            text = slide.get('subtitle', slide.get('title', ''))
            text = text.replace('\n', ' ').strip()
            if not text: continue
            f.write(f"{i+1}\n")
            f.write(f"{format_srt_time(start)} --> {format_srt_time(end)}\n")
            f.write(f"{text}\n\n")
    return output_path

def render_project(project_data, output_path, preview_mode=False, force_cpu=False):
    print(f"="*60)
    print(f"[RENDER ENGINE] Direct FFmpeg Mode (Optimized)")
    print(f"[FFMPEG PATH] {FFMPEG_CMD}")
    if preview_mode:
        print(f"[CONFIG] Preview Mode ENABLED (Limit: 30s)")
    if force_cpu:
        print(f"[CONFIG] Forcing CPU Encoding")
    print(f"="*60)
    
    slides = project_data.get('slides', [])
    if not slides: raise ValueError("No slides")

    temp_dir = os.path.dirname(output_path)
    audio_path = project_data.get('audioPath')
    
    # 0. Generate Subtitles
    transcription_json = project_data.get('transcriptionPath')
    if not transcription_json:
        transcription_json = os.path.join(temp_dir, "transcription.json")
    
    ass_path = os.path.join(temp_dir, "subtitles.ass")
    srt_path = None  # Initialize for cleanup
    
    if not os.path.exists(transcription_json) and audio_path and os.path.exists(audio_path):
        print(f"[RENDER] No transcription found. Running Whisper AI...")
        engine_dir = os.path.dirname(os.path.abspath(__file__))
        transcribe_script = os.path.join(engine_dir, "transcribe.py")
        try:
            subprocess.run([sys.executable, transcribe_script, audio_path, transcription_json], check=True)
        except subprocess.CalledProcessError as e:
            print(f"[RENDER] Whisper Transcription Failed: {e}")
            
    use_ass = False
    if os.path.exists(transcription_json):
        print(f"[RENDER] Generating Dynamic ASS Subtitles...")
        from subtitle_generator import generate_ass
        try:
             generate_ass(transcription_json, ass_path)
             use_ass = True
        except Exception as e:
             print(f"[RENDER] ASS Generation Failed: {e}")
    
    if not use_ass:
        print(f"[RENDER] Fallback to standard SRT subtitles...")
        srt_path = os.path.join(temp_dir, "subtitles.srt")
        generate_srt(slides, srt_path)
        sub_path_escaped = srt_path.replace("\\", "/").replace(":", "\\:")
        sub_filter = f"subtitles='{sub_path_escaped}':force_style='Fontname=Arial,Fontsize=30,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,BorderStyle=3'"
    else:
        ass_path_escaped = ass_path.replace("\\", "/").replace(":", "\\:")
        sub_filter = f"ass='{ass_path_escaped}'"

    # 1. Process Images in Parallel
    print(f"[ASSETS] Processing {len(slides)} slides...")
    processed_files = {}
    
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = {executor.submit(download_and_process_slide, slide, temp_dir, i): i for i, slide in enumerate(slides)}
        for future in futures:
            idx, path = future.result()
            if path: processed_files[idx] = path
            
    # 2. Build Filter Complex Script (Ken Burns + Transitions)
    print(f"[FILTER] Building complex filter graph with Ken Burns...")
    filter_script_path = os.path.join(temp_dir, "filter_script.txt")
    
    inputs = []
    slide_durations = []
    for s in slides:
        d = s.get('endTime', 0) - s.get('startTime', 0)
        if d <= 0: d = 5.0
        slide_durations.append(d)
        
    trans_duration = 1.0
    fps = 24
    
    # Random seed for Ken Burns variation
    import random
    random.seed(42) 

    with open(filter_script_path, "w", encoding='utf-8') as f:
        for i, slide in enumerate(slides):
            path = processed_files.get(i) or processed_files.get(0)
            inputs.append(path)
            
            # Duration in frames (approx)
            dur_frames = int(slide_durations[i] * fps) + int(trans_duration * fps) 
            
            # Ken Burns Logic
            # Effects:
            # 0: Zoom In (Center)
            # 1: Zoom Out (Center)
            # 2: Pan Left (Right to Left)
            # 3: Pan Right (Left to Right)
            effect_type = random.randint(0, 3)
            
            # zoompan works frame by frame. 
            # z=zoom factor, x,y=coordinates of top-left corner of window
            # We scale input to 1920x1080 first (in download_and_process_slide_step_is_enough_but_lets_be_sure)
            # Actually download_and_process_slide saves at 1920x1080.
            # To do high quality zooms, we might want slightly larger source, but standard 1080p source is okay for mild zooms (1.0 -> 1.25)
            
            # Common constants
            max_zoom = 1.25
            
            # Zoom In: Start at 1.0, go to max_zoom
            # Formula: 1.0 + (on/dur) * (max_zoom - 1.0)
            zoom_expr_in = f"min(1.0+(on/{dur_frames})*0.25,1.25)"
            
            # Zoom Out: Start at max_zoom, go to 1.0
            # Formula: max_zoom - (on/dur) * (max_zoom - 1.0)
            zoom_expr_out = f"max({max_zoom}-(on/{dur_frames})*0.25,1.0)"
            
            if effect_type == 0: # Zoom In Center
                z = zoom_expr_in
                x = "(iw-iw/zoom)/2"
                y = "(ih-ih/zoom)/2"
            elif effect_type == 1: # Zoom Out Center
                z = zoom_expr_out
                x = "(iw-iw/zoom)/2"
                y = "(ih-ih/zoom)/2"
            elif effect_type == 2: # Pan Right to Left (focus moves left)
                z = f"{max_zoom}" # Constant zoom
                # x goes from (iw-iw/zoom) to 0
                x = f"(1-on/{dur_frames})*(iw-iw/zoom)"
                y = "(ih-ih/zoom)/2" # Center Y
            else: # Pan Left to Right (focus moves right)
                z = f"{max_zoom}" # Constant zoom
                # x goes from 0 to (iw-iw/zoom)
                x = f"(on/{dur_frames})*(iw-iw/zoom)"
                y = "(ih-ih/zoom)/2"

            # Supersampling: Upscale to 4x (7680x4320) for sub-pixel precision in zoompan.
            # This eliminates "stutter" during slow pans.
            # zoompan will take 8K input and output 1080p.
            
            kb_filter = (
                f"[{i}:v]scale=7680:4320:force_original_aspect_ratio=decrease,"
                f"pad=7680:4320:(ow-iw)/2:(oh-ih)/2,"
                f"setsar=1,"
                f"zoompan=z='{z}':x='{x}':y='{y}':d={dur_frames}:s=1920x1080:fps={fps}[v{i}];"
            )
            
            # Special handling: zoompan resets timestamp? No, it generates d frames.
            # We need to make sure zoompan generates enough frames.
            # zoompan duration is in number of frames if d=1.
            # We need it to run for 'dur' seconds.
            # Wait, zoompan 'd' is duration of *each* input image displayed as a sequence.
            # Since we loop input 1, we are feeding a stream. 
            # Actually, standard zoompan usage on a single image:
            # -d <duration_in_seconds * fps> if input is a single image looped?
            # Correct approach for single image input:
            # We don't -loop 1 the input in python args (we do currently).
            # If we -loop 1, input is a video stream.
            # If we use zoompan on a stream, it applies to each frame.
            # BUT we want the *accumulation* of zoom over time.
            # Standard way: input is single frame. zoompan generates N frames.
            # Command line currently uses -loop 1 -t <dur>. This makes input a video.
            # If we apply zoompan to a static video, 'on' (frame num) increases, so it works.
            # HOWEVER, 'zoom' variable persists? Yes.
            
            f.write(kb_filter + "\n")

        if len(slides) == 1:
            f.write(f"[v0]copy[slides_final];\n")
        else:
            last_out_label = "[v0]"
            current_offset = 0.0
            
            for i in range(1, len(slides)):
                prev_dur = slide_durations[i-1]
                current_offset += prev_dur 
                fade_start = max(0, current_offset - trans_duration)
                
                next_label = f"[v{i}]"
                target_label = f"[v_m{i}]" if i < len(slides)-1 else "[slides_final]"
                
                xf = f"{last_out_label}{next_label}xfade=transition=fade:duration={trans_duration}:offset={fade_start}{target_label};\n"
                f.write(xf)
                last_out_label = target_label
        
        # Audio Waveform (Glamour)
        final_slides_stream = "[slides_final]" if len(slides) > 1 else "[v0]"
        
        if audio_path and os.path.exists(audio_path):
            audio_idx = len(slides)
            f.write(f"[{audio_idx}:a]asplit=2[a_core][a_glow];\n")
            
            # 1. OPTIMIZED GLOW: Render at Ultra-Low Res (320x90), blur, upscale.
            # 320x90 is 1/36th of 1080p area. Extremely fast.
            # Revert to gblur (smoother than avgblur), sigma=5 is plenty for 90p height.
            f.write(f"[a_glow]showwaves=s=320x90:mode=cline:colors=0x0000FF|0x00FFFF:draw=full[glow_small];\n")
            f.write(f"[glow_small]gblur=sigma=5:steps=1[glow_blurred_small];\n")
            f.write(f"[glow_blurred_small]scale=1920:500:flags=bilinear[glow_upscaled];\n")
            f.write(f"[glow_upscaled]pad=1920:1080:0:520:color=0x00000000,colorchannelmixer=aa=0.4[glow_full];\n")
            
            # 2. CORE: High Res (Sharp)
            f.write(f"[a_core]showwaves=s=1920x500:mode=cline:colors=0xFFFFFF|0xE0FFFF:draw=full[core_raw];\n")
            f.write(f"[core_raw]pad=1920:1080:0:520:color=0x00000000,colorchannelmixer=aa=0.5[core_full];\n")
            
            f.write(f"{final_slides_stream}format=rgba[base_rgba];\n")
            f.write(f"[glow_full]format=rgba[glow_rgba];\n")
            f.write(f"[core_full]format=rgba[core_rgba];\n")
            f.write(f"[base_rgba][glow_rgba]overlay[v_glowing];\n")
            f.write(f"[v_glowing][core_rgba]overlay[v_out_rgb];\n")
            f.write(f"[v_out_rgb]format=yuv420p[v_out_pre_subs];\n")
            f.write(f"[v_out_pre_subs]{sub_filter}[v_out]\n")
        else:
             f.write(f"{final_slides_stream}{sub_filter}[v_out]\n")

    # 3. Construct FFmpeg Command
    print(f"[RENDER] Encoding Cinematic Video...")
    
    cmd = [FFMPEG_CMD, "-y"]
    
    for i, inp in enumerate(inputs):
        # We NO LONGER loop the input. We treat it as a single static image.
        # zoompan filter (d=dur_frames) will generate the video stream.
        cmd.extend(["-i", inp])
        
    if audio_path and os.path.exists(audio_path):
        cmd.extend(["-i", audio_path])
        
    cmd.extend(["-filter_complex_script", filter_script_path])
    cmd.extend(["-map", "[v_out]"])
    if audio_path and os.path.exists(audio_path):
        cmd.extend(["-map", f"{len(slides)}:a"])
    
    # Hardware Acceleration: Intel Arc (QSV) STRICT Priority
    use_qsv = False
    
    if not force_cpu:
        print("[CONFIG] Checking for Intel QSV hardware...")
        try:
             # Basic check: Can we initialize the QSV encoder?
             test_cmd = [
                FFMPEG_CMD, "-y",
                "-f", "lavfi", "-i", "color=c=black:s=64x64",
                "-vframes", "1",
                "-c:v", "h264_qsv",
                "-f", "null", "-"
             ]
             # Check for valid return code
             ret = subprocess.run(test_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
             if ret.returncode == 0:
                 use_qsv = True
                 print("[CONFIG] Intel Arc (QSV) CONFIRMED. Engaging Warp Speed.")
             else:
                 print("[CONFIG] Intel QSV check failed. Falling back to CPU.", flush=True)
        except Exception as e:
             print(f"[CONFIG] Error checking QSV: {e}")
    else:
        print("[CONFIG] Manual Override: CPU Mode Active")

    if use_qsv:
         # INTEL ARC OPTIMIZED SETTINGS
         cmd.extend([
            "-c:v", "h264_qsv",
            "-global_quality", "25", # ICQ mode (Intelligent Constant Quality)
            "-preset", "veryfast",    # Speed over slight quality gains
            "-g", "48",              # Keyframe interval (2s)
            "-look_ahead", "0"       # Low latency
         ])
    else:
         print("[CONFIG] Using libx264 (CPU) - Prepare for slower render.")
         cmd.extend([
            "-c:v", "libx264",
            "-preset", "veryfast", 
            "-crf", "23"
         ])
         
    cmd.extend([
        "-pix_fmt", "yuv420p",
        "-colorspace", "bt709",
        "-color_primaries", "bt709", 
        "-color_trc", "bt709",
        "-color_range", "tv", 
        "-r", str(fps),
    ])
    
    if preview_mode:
        cmd.extend(["-t", "30"])
    
    if audio_path and os.path.exists(audio_path):
        cmd.extend(["-c:a", "aac", "-b:a", "192k"])
        if not preview_mode:
            cmd.extend(["-shortest"])
        
    cmd.append(output_path)
    
    # --- DASHBOARD ---
    console = Console()
    start_time = time.time()

    def generate_dashboard(status, fps_val, speed, time_str):
        layout = Layout()
        layout.split_column(
            Layout(name="header", size=3),
            Layout(name="body", ratio=1),
            Layout(name="footer", size=3)
        )
        layout["header"].update(Panel(f"Rendering: {os.path.basename(output_path)}", style="bold white"))
        
        table = Table(box=box.SIMPLE, expand=True)
        table.add_column("Metric", style="cyan")
        table.add_column("Value", style="green")
        
        encoder_name = "h264_qsv (Intel Arc)" if use_qsv else "libx264 (CPU)"
        table.add_row("Encoder", encoder_name)
        table.add_row("Status", status)
        table.add_row("FPS", str(fps_val))
        table.add_row("Speed", speed)
        table.add_row("Video Time", time_str)
        try:
            table.add_row("CPU Usage", f"{psutil.cpu_percent()}%")
            table.add_row("RAM Usage", f"{psutil.virtual_memory().percent}%")
        except: pass
        
        layout["body"].update(Panel(table, title="Render Statistics", border_style="blue"))
        elapsed = time.time() - start_time
        layout["footer"].update(Panel(f"Elapsed Real Time: {elapsed:.1f}s", style="yellow"))
        
        return layout

    print(f"[EXEC] Launching Dashboard...", flush=True)

    process = subprocess.Popen(
        cmd, 
        stdout=subprocess.PIPE, 
        stderr=subprocess.STDOUT, 
        universal_newlines=True, 
        encoding='utf-8',
        errors='replace'
    )
    
    current_fps = "0"
    current_speed = "0x"
    current_time = "00:00:00"

    with Live(generate_dashboard("STARTING", 0, "0x", "00:00:00"), refresh_per_second=4, console=console) as live:
        for line in process.stdout:
            line = line.strip()
            if not line: continue
            
            if "frame=" in line:
                fps_match = re.search(r"fps=\s*([\d\.]+)", line)
                if fps_match: current_fps = fps_match.group(1)
                
                speed_match = re.search(r"speed=\s*([\d\.]+)x", line)
                if speed_match: current_speed = speed_match.group(1) + "x"
                
                time_match = re.search(r"time=(\d{2}:\d{2}:\d{2}\.\d{2})", line)
                if time_match: current_time = time_match.group(1)
                
                live.update(generate_dashboard("RENDERING", current_fps, current_speed, current_time))
            
            elif "Error" in line:
                console.print(f"[red]{line}[/red]")

    process.wait()
    
    if process.returncode == 0:
        console.print(f"[bold green]\n[SUCCESS] Render Complete![/bold green]")
        console.print(f"Output saved to: {output_path}")
        
        print("[CLEANUP] Removing temporary files...")
        try:
            if os.path.exists(filter_script_path): os.remove(filter_script_path)
            if srt_path and os.path.exists(srt_path): os.remove(srt_path)
            for file in processed_files.values():
                 if os.path.exists(file): os.remove(file)
            print("[CLEANUP] Done.")
        except Exception as e:
            print(f"[CLEANUP] Warning: {e}")
            
    else:
        print(f"[ERROR] FFmpeg failed with code {process.returncode}")
        sys.exit(process.returncode)


if __name__ == "__main__":
    print("[INIT] Python Direct-Render script starting...", flush=True)
    
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    args = parser.parse_args()
    
    try:
        with open(args.input, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        render_project(data, args.output)
    except Exception as e:
        import traceback
        traceback.print_exc()
        sys.exit(1)
