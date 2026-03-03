import whisper
import json
import os
import sys
import torch

def transcribe_audio(audio_path, output_json_path, model_size="base"):
    """
    Transcribes audio using Whisper and saves word-level timestamps to JSON.
    """
    print(f"[TRANSCRIBE] Loading Whisper model: {model_size}...")
    
    # Check for CUDA (GPU)
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"[TRANSCRIBE] Using device: {device}")
    
    try:
        model = whisper.load_model(model_size, device=device)
    except Exception as e:
        print(f"[TRANSCRIBE] Error loading model: {e}")
        return None

    print(f"[TRANSCRIBE] Transcribing {audio_path}...")
    
    # transcribe with word_timestamps=True is key
    result = model.transcribe(audio_path, word_timestamps=True)
    
    # Extract segments with words
    # Structure: result['segments'] -> list of segments -> 'words' -> list of {word, start, end, probability}
    
    data = []
    
    for segment in result['segments']:
        words = segment.get('words', [])
        # Fallback if words are missing (some models/versions might not return them if not configured)
        # But 'word_timestamps=True' usually ensures it.
        
        if not words:
            # Fallback to segment level if no words found
            data.append({
                "text": segment['text'].strip(),
                "start": segment['start'],
                "end": segment['end'],
                "type": "segment"
            })
        else:
            for w in words:
                data.append({
                    "text": w['word'].strip(),
                    "start": w['start'],
                    "end": w['end'],
                    "type": "word"
                })
                
    # Save to JSON
    with open(output_json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
        
    print(f"[TRANSCRIBE] Saved to {output_json_path}")
    return data

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python transcribe.py <audio_path> <output_json_path>")
        sys.exit(1)
        
    audio = sys.argv[1]
    json_out = sys.argv[2]
    
    transcribe_audio(audio, json_out)
