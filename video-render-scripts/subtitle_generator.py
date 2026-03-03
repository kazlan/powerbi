import json
import os
import sys

def ms_to_ass_time(ms):
    """
    Converts milliseconds to ASS timestamp format: H:MM:SS.cc
    """
    seconds = ms / 1000.0
    cs = int((seconds - int(seconds)) * 100)
    seconds = int(seconds)
    minutes = seconds // 60
    hours = minutes // 60
    
    minutes %= 60
    seconds %= 60
    
    return f"{hours}:{minutes:02}:{seconds:02}.{cs:02}"

def generate_ass(json_path, output_ass_path, font_name="Arial", font_size=80, playback_speed=1.0):
    """
    Generates an .ass subtitle file from Word-Level JSON.
    Implements Karaoke effect: Current word is highlighted/popped.
    """
    print(f"[ASS] Generating dynamic subtitles from {json_path}...")
    
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    header = f"""[Script Info]
Title: Dynamic Captions
ScriptType: v4.00+
WrapStyle: 0
ScaledBorderAndShadow: yes
YCbCr Matrix: TV.601
PlayResX: 1920
PlayResY: 1080

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,{font_name},{font_size},&H00FFFFFF,&H0000FFFF,&H00000000,&H80000000,-1,0,0,0,100,100,0,0,1,3,0,2,10,10,100,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    
    events = []
    
    # Process Word-by-Word
    WORDS_PER_LINE = 5
    
    chunk = []
    
    for item in data:
        if item.get('type') == 'word':
            chunk.append(item)
            
            if len(chunk) >= WORDS_PER_LINE:
                events.extend(create_ass_events_for_chunk(chunk))
                chunk = []
        elif item.get('type') == 'segment':
             pass

    # Flush last chunk
    if chunk:
        events.extend(create_ass_events_for_chunk(chunk))
        
    with open(output_ass_path, 'w', encoding='utf-8') as f:
        f.write(header)
        for line in events:
            f.write(line + "\n")
            
    print(f"[ASS] Saved to {output_ass_path}")


def create_ass_events_for_chunk(words):
    events = []
    
    chunk_start = words[0]['start']
    chunk_end = words[-1]['end']
    
    full_text_str = " ".join([w['text'] for w in words])
    
    for i, active_word in enumerate(words):
        start_t = active_word['start']
        end_t = active_word['end']
        
        text_parts = []
        for j, w in enumerate(words):
            txt = w['text']
            is_active = (i == j)
            
            if is_active:
                prefix = r"{\c&H00FFFF&}{\fscx120\fscy120}" 
                suffix = r"{\fscx100\fscy100}{\c&HFFFFFF&}"
            else:
                prefix = r"{\c&HFFFFFF&}{\fscx100\fscy100}"
                suffix = ""
            
            text_parts.append(f"{prefix}{txt}{suffix}")
            
        final_line_text = " ".join(text_parts)
        
        ass_start = ms_to_ass_time(start_t * 1000)
        ass_end = ms_to_ass_time(end_t * 1000)
        
        events.append(f"Dialogue: 0,{ass_start},{ass_end},Default,,0,0,0,,{final_line_text}")
        
    return events


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python subtitle_generator.py <input_json> <output_ass>")
        sys.exit(1)
        
    input_json = sys.argv[1]
    output_ass = sys.argv[2]
    
    generate_ass(input_json, output_ass)
