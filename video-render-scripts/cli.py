import json
import os
import argparse
import sys
import glob
import subprocess
import xml.etree.ElementTree as ET
from render import render_project

def get_audio_duration(audio_path):
    """Gets audio duration using ffprobe."""
    try:
        cmd = [
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            audio_path
        ]
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        return float(result.stdout.strip())
    except Exception as e:
        print(f"[CLI] ERROR: Could not get audio duration: {e}")
        return None

def load_project_data(project_dir, audio_path=None, transcription_path=None):
    """
    Detects audio and transcription files in the project directory
    and constructs the project_data dictionary expected by render.py
    """
    
    # 1. Detect Audio
    if not audio_path:
        patterns = ["audio.m4a", "audio.mp3", "audio.wav", "*.m4a", "*.mp3", "*.wav"]
        for pattern in patterns:
            matches = glob.glob(os.path.join(project_dir, pattern))
            if matches:
                 audio_path = matches[0]
                 break
    
    if not audio_path:
        print(f"[CLI] WARNING: No audio file found in {project_dir}")
    else:
        print(f"[CLI] Audio file found: {os.path.basename(audio_path)}")

    # 2. Detect Transcription/Data
    data_file = transcription_path
    if not data_file:
        possible_files = ["transcription.json", "transcription.txt", "content.xml"]
        for fname in possible_files:
            fpath = os.path.join(project_dir, fname)
            if os.path.exists(fpath):
                if fname.endswith('.txt'):
                     try:
                         with open(fpath, 'r', encoding='utf-8') as f:
                             json.load(f)
                         data_file = fpath
                         break
                     except json.JSONDecodeError:
                         continue
                else:
                    data_file = fpath
                    break
    
    if not data_file:
         if os.path.exists(os.path.join(project_dir, "content.xml")):
             data_file = os.path.join(project_dir, "content.xml")

    if not data_file:
         raise FileNotFoundError(f"[CLI] No valid data file found in {project_dir}")
    
    print(f"[CLI] Data file found: {os.path.basename(data_file)}")
    
    # 3. Parse Data (SLIDES)
    slides = []
    xml_path = os.path.join(project_dir, "content.xml")
    
    if os.path.exists(xml_path):
        print(f"[CLI] Parsing XML for Slides: {os.path.basename(xml_path)}")
        try:
            tree = ET.parse(xml_path)
            root = tree.getroot()
            slides_node = root.find('Slides')
            if slides_node is not None:
                for slide_elem in slides_node.findall('Slide'):
                    img_name = slide_elem.find('ImageFilename')
                    img_path = img_name.text if img_name is not None else ""
                    
                    seg_text = slide_elem.find('SegmentText')
                    text_content = seg_text.text if seg_text is not None else ""
                    
                    if text_content: text_content = text_content.strip()
                    if img_path: img_path = img_path.strip()

                    slides.append({
                        "title": text_content[:50] + "..." if len(text_content) > 50 else text_content, 
                        "subtitle": text_content,
                        "backgroundImage": img_path,
                        "startTime": 0, 
                        "endTime": 0    
                    })
            else:
                 print(f"[CLI] WARNING: No <Slides> tag found in XML.")
        except Exception as e:
            print(f"[CLI] ERROR parsing XML: {e}")

    # Fallback to JSON if no XML slides found
    if not slides and data_file and (data_file.endswith('.json') or data_file.endswith('.txt')):
         try:
            with open(data_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                if isinstance(data, dict) and 'slides' in data:
                     slides = data.get('slides', [])
                elif isinstance(data, list) and len(data) > 0 and 'backgroundImage' in data[0]:
                     slides = data
         except:
             pass

    # 4. Resolve Image Paths
    base_slides = []
    for s in slides:
        img_rel = s.get('backgroundImage', '')
        if img_rel:
            if not img_rel.startswith(('http://', 'https://', 'data:')):
                 if os.path.isabs(img_rel) and os.path.exists(img_rel):
                      pass
                 else:
                     abs_path = os.path.join(project_dir, img_rel)
                     if os.path.exists(abs_path):
                         s['backgroundImage'] = abs_path
                     else:
                         alt_path = os.path.join(project_dir, 'slides', os.path.basename(img_rel))
                         if os.path.exists(alt_path):
                             s['backgroundImage'] = alt_path
                         else:
                              print(f"[CLI] WARNING: Image not found: {img_rel}")
        base_slides.append(s)

    # 5. Calculate Slide Cycling
    final_slides = []
    if audio_path and os.path.exists(audio_path):
        total_duration = get_audio_duration(audio_path)
        if total_duration:
            print(f"[CLI] Audio Duration: {total_duration:.2f}s")
            
            SLIDE_DURATION = 20.0
            current_time = 0.0
            slide_idx = 0
            
            while current_time < total_duration:
                if not base_slides: break
                
                original = base_slides[slide_idx % len(base_slides)]
                new_slide = original.copy()
                
                new_slide['startTime'] = current_time
                end_time = min(current_time + SLIDE_DURATION, total_duration)
                new_slide['endTime'] = end_time
                
                final_slides.append(new_slide)
                
                current_time = end_time
                slide_idx += 1
                
            print(f"[CLI] Created {len(final_slides)} cycled slides for {total_duration:.2f}s video.")
        else:
            final_slides = base_slides
    else:
        final_slides = base_slides

    return {
        "name": os.path.basename(project_dir),
        "audioPath": audio_path,
        "transcriptionPath": data_file,
        "slides": final_slides
    }

def main():
    parser = argparse.ArgumentParser(
        description="""
Podcast PowerHouse Video Generator CLI
======================================
Generates a video from a project folder containing audio, transcription, and slides.

Features:
- Auto-detects audio (.m4a, .mp3, .wav) and data files (.json, .xml).
- Cycles slides automatically every 20 seconds.
- Optimized for Intel Arc (QSV) encoding with CPU fallback.
""",
        formatter_class=argparse.RawTextHelpFormatter
    )

    parser.add_argument("project_dir", 
                        help="Path to the project directory containing assets.")
    
    parser.add_argument("--output", "-o", required=True, 
                        help="Path for the output video file.")
    
    parser.add_argument("--audio", 
                        help="Explicit path to the audio file.")
    
    parser.add_argument("--transcription", 
                        help="Explicit path to the transcription file.")

    parser.add_argument("--preview", action="store_true",
                        help="Render only the first 30 seconds for testing.")

    parser.add_argument("--cpu", action="store_true",
                        help="Force CPU encoding (libx264), bypass GPU checks.")

    args = parser.parse_args()
    
    if not os.path.isdir(args.project_dir):
        print(f"Error: Project directory '{args.project_dir}' does not exist.")
        return

    try:
        project_data = load_project_data(
            args.project_dir, 
            audio_path=args.audio, 
            transcription_path=args.transcription
        )
        
        if not project_data or not project_data.get('slides'):
             print("[CLI] Error: No slides data could be loaded.")
             return

        render_project(
            project_data, 
            args.output,
            preview_mode=args.preview,
            force_cpu=args.cpu
        )
        
    except Exception as e:
        print(f"An error occurred: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()
