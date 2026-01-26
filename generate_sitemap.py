import re
import datetime
import os

# Configuration
BASE_URL = "https://powerbimax.com"
PODCASTS_FILE = r"src/data/podcasts.js"
APP_FILE = r"src/App.jsx"
OUTPUT_FILE = r"public/sitemap.xml"

def slugify(text):
    text = text.lower()
    text = re.sub(r'\s+', '-', text)
    text = re.sub(r'[^\w\-]+', '', text)
    text = re.sub(r'\-\-+', '-', text)
    text = text.strip('-')
    return text

def get_podcast_ids():
    ids = []
    try:
        with open(PODCASTS_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
            # Simple regex to find id: "value"
            matches = re.findall(r'id:\s*["\']([^"\']+)["\']', content)
            # Filter out category IDs from App.jsx if any confusion, but this is podcasts.js
            # podcasts.js structure: id: "dax-narracion-datos"
            ids = matches
    except Exception as e:
        print(f"Error reading podcasts: {e}")
    return ids

def get_visual_slugs():
    slugs = []
    try:
        with open(APP_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
            # Find chart objects. They have title: "..." inside chartLibrary
            # We look for title: "..."
            # This might match other things, but in App.jsx titles are mostly chart titles.
            # Let's be more specific if possible, but title keys are unique to charts in the large object.
            matches = re.findall(r'title:\s*["\']([^"\']+)["\']', content)
            
            # Filter out titles that look like links or metadata
            # The titles in App.jsx are like "Barras y Columnas (Estándar)"
            for title in matches:
                # Exclude known non-chart titles if any (e.g. "Documentación Oficial")
                if "Documentación" in title or "Guía" in title:
                    continue
                if len(title) < 3: continue
                slugs.append(slugify(title))
    except Exception as e:
        print(f"Error reading App.jsx: {e}")
    return list(set(slugs)) # Remove duplicates

def generate_sitemap():
    urls = []
    
    # Static pages
    urls.append(f"{BASE_URL}/")
    
    # Podcasts
    podcast_ids = get_podcast_ids()
    print(f"Found {len(podcast_ids)} podcasts.")
    for pid in podcast_ids:
        # Check if it's a valid podcast ID (simple heuristic)
        if len(pid) > 3: 
             urls.append(f"{BASE_URL}/?podcast={pid}")

    # Visuals
    visual_slugs = get_visual_slugs()
    print(f"Found {len(visual_slugs)} visuals.")
    for slug in visual_slugs:
        urls.append(f"{BASE_URL}/?visual={slug}")

    # XML Construction
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    today = datetime.date.today().isoformat()
    
    for url in urls:
        xml += '  <url>\n'
        xml += f'    <loc>{url}</loc>\n'
        xml += f'    <lastmod>{today}</lastmod>\n'
        xml += '    <changefreq>weekly</changefreq>\n'
        xml += '    <priority>0.8</priority>\n'
        xml += '  </url>\n'
    
    xml += '</urlset>'
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(xml)
    print(f"Sitemap generated at {OUTPUT_FILE} with {len(urls)} URLs.")

if __name__ == "__main__":
    generate_sitemap()
