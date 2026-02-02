import re
import datetime
import os

# Configuration
BASE_URL = "https://www.powerbimax.com"
PODCASTS_FILE = r"src/data/podcasts.js"
CHARTS_FILE = r"src/data/charts.jsx"
OUTPUT_FILE = r"public/sitemap.xml"

def slugify(text):
    text = text.lower()
    text = re.sub(r'\s+', '-', text)
    text = re.sub(r'[^\w\-]+', '', text)
    text = re.sub(r'\-\-+', '-', text)
    text = re.sub(r'^-+', '', text)
    text = re.sub(r'-+$', '', text)
    return text

def get_podcast_ids():
    ids = []
    try:
        with open(PODCASTS_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
            # Only look for IDs in the main podcasts array, avoiding the series section
            if "export const series" in content:
                content = content.split("export const series")[0]
            
            # Simple regex to find id: "value"
            matches = re.findall(r'id:\s*["\']([^"\']+)["\']', content)
            ids = matches
    except Exception as e:
        print(f"Error reading podcasts: {e}")
    return ids

def get_visual_slugs():
    slugs = []
    try:
        with open(CHARTS_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
            # Find chart objects. They have title: "..." inside chartLibrary
            matches = re.findall(r'title:\s*["\']([^"\']+)["\']', content)
            
            for title in matches:
                if len(title) < 3: continue
                slugs.append(slugify(title))
    except Exception as e:
        print(f"Error reading charts.jsx: {e}")
    return list(set(slugs)) # Remove duplicates

def generate_sitemap():
    urls = []
    
    # Static pages
    urls.append(f"{BASE_URL}/")
    urls.append(f"{BASE_URL}/?view=rutas")

    # Podcasts
    podcast_ids = get_podcast_ids()
    print(f"Found {len(podcast_ids)} input IDs from podcasts.js")
    for pid in podcast_ids:
        # Check if it's a valid podcast ID (simple heuristic)
        # Exclude IDs starting with 'ruta-' as they are series, not podcasts
        if len(pid) > 3 and not pid.startswith("ruta-"): 
             urls.append(f"{BASE_URL}/?podcast={pid}")

    # Visuals
    visual_slugs = get_visual_slugs()
    print(f"Found {len(visual_slugs)} visuals from charts.jsx")
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
