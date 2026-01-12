
import re
import json

def parse_transcript():
    file_path = r"c:\Users\perse\OneDrive\Documentos\1. PROYECTOS\PL-300\public\podcasts\Transcripción Power BI y el Arte de los Datos.txt"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove header
    content = content.replace("Transcripción: Power BI y el Arte de los Datos\n\n", "")
    
    # Split by speakers, keeping the delimiter
    # Using regex to find Locutora: or Locutor:
    # We want to split but keep the 'Locutora:' or 'Locutor:' at the start of the segment
    
    # normalize spaces
    content = content.strip()
    
    # We can split by specific known strings, then reconstruct
    # Or just iterate.
    
    # Strategy: Replace "Locutora:" with "|SPLIT|Locutora:" and same for Locutor
    content = content.replace("Locutora:", "|SPLIT|Locutora:")
    content = content.replace("Locutor:", "|SPLIT|Locutor:")
    
    segments_raw = content.split("|SPLIT|")
    segments = []
    
    for s in segments_raw:
        s = s.strip()
        if not s:
            continue
            
        # Extract speaker and text
        if s.startswith("Locutora:"):
            speaker = "Locutora"
            text = s.replace("Locutora:", "").strip()
        elif s.startswith("Locutor:"):
            speaker = "Locutor"
            text = s.replace("Locutor:", "").strip()
        else:
            # Maybe the intro text? 
            # In the file viewed in Step 25:
            # Line 1: Transcripción...
            # Line 3: Locutora: 
            # So the first real segment starts with Locutora.
            # If there is text before the first Speaker, we can assign it to "Intro" or similar, 
            # but looking at file content, it seems clean enough after header removal.
            speaker = "Unknown"
            text = s
        
        # Clean text (remove newlines in middle of sentences if any)
        text = text.replace('\n', ' ')
        
        if text:
            segments.append({"speaker": speaker, "text": text})
            
    # Calculate timestamps
    TOTAL_DURATION_SEC = 930 # 15:30
    
    total_chars = sum(len(seg["text"]) for seg in segments)
    
    current_time = 0
    final_json = []
    
    for seg in segments:
        seg_len = len(seg["text"])
        duration = (seg_len / total_chars) * TOTAL_DURATION_SEC
        
        start = current_time
        end = current_time + duration
        
        # Format text to include speaker prefix if desired, or just the text.
        # The existing podcast structure has just "text".
        # The design shows "Karaoke" style. Usually easier if we prepend Speaker Name if it's a conversation.
        # However, the user said "literal transcription".
        # Let's prepend the speaker name to the text to make it clear who is speaking, 
        # similar to the source text, but maybe bolded?
        # The current app handles plain text. 
        # I will prepend "Locutor/a: " to the text so the user sees who is talking.
        
        display_text = f"{seg['speaker']}: {seg['text']}"
        
        final_json.append({
            "start": round(start, 2), # Round to 2 decimals
            "end": round(end, 2),
            "text": display_text
        })
        
        current_time = end

    # Check matches
    # print(json.dumps(final_json, indent=4, ensure_ascii=False))
    
    # Generate JS array string
    print("export const transcript = [")
    for item in final_json:
        # escapes for JS
        safe_text = item['text'].replace('"', '\\"').replace("'", "\\'")
        print(f"    {{ start: {item['start']}, end: {item['end']}, text: \"{safe_text}\" }},")
    print("];")

if __name__ == "__main__":
    parse_transcript()
