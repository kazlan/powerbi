
import os
import json
import re

# Source file
TRANSCRIPT_FILE = r"C:\Users\perse\OneDrive\Documentos\1. PROYECTOS\PL-300\podcasts\copilot-reports\El Arquitecto Digital.txt"

def split_into_sentences(text):
    # Basic split by punctuation, keeping punctuation
    return re.split(r'(?<=[.!?])\s+', text)

def create_paragraphs(sentences, num_paragraphs=20):
    total_sentences = len(sentences)
    sentences_per_para = max(1, total_sentences // num_paragraphs)
    
    paragraphs = []
    current_para = []
    
    for sent in sentences:
        current_para.append(sent)
        if len(current_para) >= sentences_per_para:
            paragraphs.append(" ".join(current_para))
            current_para = []
            
    if current_para:
        if paragraphs:
            paragraphs[-1] += " " + " ".join(current_para)
        else:
            paragraphs.append(" ".join(current_para))
            
    return paragraphs

def main():
    with open(TRANSCRIPT_FILE, 'r', encoding='utf-8') as f:
        text = f.read()
        
    sentences = split_into_sentences(text)
    # We want to interleave 15 slides.
    # So we need roughly 16 text blocks to sandwich them, or 30 blocks to have text-slide-text-slide...
    # Let's aim for ~30 paragraphs so we can put a slide every 2 paragraphs.
    
    paragraphs = create_paragraphs(sentences, num_paragraphs=32)
    
    content_blocks = []
    slide_index = 1
    
    for i, para in enumerate(paragraphs):
        # clean up paragraph
        clean_para = para.strip()
        if not clean_para:
            continue
            
        content_blocks.append({"type": "paragraph", "text": clean_para})
        
        # Insert slide every 2 paragraphs, up to 15 slides
        if (i + 1) % 2 == 0 and slide_index <= 15:
            slide_num = f"{slide_index:02d}"
            content_blocks.append({
                "type": "image", 
                "src": f"/podcasts/copilot-reports/slides/slide_{slide_num}.png", 
                "alt": f"Slide {slide_num}", 
                "caption": f"Concepto clave {slide_num} del episodio."
            })
            slide_index += 1
            
    
    with open("transcription_content.json", "w", encoding="utf-8") as f:
        json.dump(content_blocks, f, indent=4, ensure_ascii=False)
    print("Wrote to transcription_content.json")

if __name__ == "__main__":
    main()
