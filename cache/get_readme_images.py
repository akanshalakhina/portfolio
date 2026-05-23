import urllib.request
import re
import json

repos = [
    "SENSAI",
    "StayHub-Travel-accomodation-Platform",
    "Swipe_Clone-main",
    "serviceHire",
    "novastore-ecommerce",
    "ReducateAI",
    "accredian-clone",
    "Aethoria-The-Fictional-World",
    "VibeMate",
    "BookmyPackers",
    "Face-Detection-Attendance-App-"
]

print("Scanning GitHub READMEs for project screenshots...")
for repo in repos:
    # Try both main and master branches
    readme_content = None
    for branch in ["main", "master"]:
        url = f"https://raw.githubusercontent.com/akanshalakhina/{repo}/{branch}/README.md"
        try:
            req = urllib.request.Request(
                url,
                headers={'User-Agent': 'Mozilla/5.0'}
            )
            with urllib.request.urlopen(req, timeout=5) as response:
                readme_content = response.read().decode('utf-8')
                break
        except Exception:
            continue
            
    if not readme_content:
        print(f"[{repo}]: Could not fetch README.md")
        continue

    # Search for markdown image links: ![alt](url)
    md_images = re.findall(r'!\[.*?\]\((.*?)\)', readme_content)
    # Search for HTML img tags: <img src="url"...>
    html_images = re.findall(r'<img\s+[^>]*src=["\'](.*?)["\']', readme_content, re.IGNORECASE)
    
    all_images = md_images + html_images
    valid_images = []
    for img in all_images:
        # Filter out badges, icons, or logos
        img_lower = img.lower()
        if "badge" in img_lower or "shield" in img_lower or "logo" in img_lower or img_lower.endswith(".svg"):
            continue
        valid_images.append(img)
        
    if valid_images:
        print(f"[{repo}]: Found screenshots:")
        for img in valid_images:
            print(f"  - {img}")
    else:
        print(f"[{repo}]: No screenshots found in README.")
