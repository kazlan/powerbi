import json
import sys

# Common transcription AI hallucinations for technical terms
DICTIONARY_REPLACEMENTS = {
    "Copailo": "Copilot",
    "Copilet": "Copilot",
    "Tempauer": "Power BI",
    "Tapuerviai": "Power BI",
    "Dax": "DAX",
    "Microsof": "Microsoft",
    "Fabric": "Fabric",
    "Synapse": "Synapse"
}

def fix_transcript(json_path):
    print(f"[SPELLCHECK] Analyzing {json_path}...")
    
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    fixes_made = 0
    
    for item in data:
        if 'text' in item:
            original_text = item['text']
            # Direct replacements
            for wrong, correct in DICTIONARY_REPLACEMENTS.items():
                if wrong.lower() in original_text.lower():
                    # Preserve standard casing of the correct word
                    item['text'] = correct
                    fixes_made += 1
                    print(f"  Fixed: '{original_text}' -> '{correct}'")
                    
    if fixes_made > 0:
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
        print(f"[SPELLCHECK] Fixed {fixes_made} words. Saved changes to {json_path}.")
    else:
        print(f"[SPELLCHECK] No known errors found.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python fix_transcript.py <transcription.json>")
        sys.exit(1)
        
    fix_transcript(sys.argv[1])
