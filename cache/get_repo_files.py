import urllib.request
import json

repos = [
    "novastore-ecommerce",
    "VibeMate",
    "Face-Detection-Attendance-App-"
]

print("Checking repository contents for images on GitHub...")

for repo in repos:
    url = f"https://api.github.com/repos/akanshalakhina/{repo}/contents"
    try:
        req = urllib.request.Request(
            url,
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        with urllib.request.urlopen(req, timeout=5) as response:
            items = json.loads(response.read().decode('utf-8'))
            print(f"\n[{repo}] contents:")
            
            # Look for assets, public, images, screenshots, or any image files
            images = []
            folders_to_explore = []
            
            for item in items:
                name = item["name"]
                item_type = item["type"]
                if item_type == "file" and name.lower().endswith((".png", ".jpg", ".jpeg", ".gif")):
                    images.append(item["download_url"])
                elif item_type == "dir" and name.lower() in ["assets", "public", "images", "img", "screenshots", "src"]:
                    folders_to_explore.append(name)
                    
            if images:
                print("  Found root images:")
                for img in images:
                    print(f"    - {img}")
                    
            # Explore subfolders
            for folder in folders_to_explore:
                sub_url = f"https://api.github.com/repos/akanshalakhina/{repo}/contents/{folder}"
                try:
                    sub_req = urllib.request.Request(
                        sub_url,
                        headers={'User-Agent': 'Mozilla/5.0'}
                    )
                    with urllib.request.urlopen(sub_req, timeout=5) as sub_res:
                        sub_items = json.loads(sub_res.read().decode('utf-8'))
                        for sub_item in sub_items:
                            sub_name = sub_item["name"]
                            if sub_item["type"] == "file" and sub_name.lower().endswith((".png", ".jpg", ".jpeg", ".gif")):
                                print(f"  Found in {folder}/:")
                                print(f"    - {sub_item['download_url']}")
                except Exception as sub_e:
                    print(f"  Error reading folder {folder}: {sub_e}")
                    
    except Exception as e:
        print(f"[{repo}]: Failed to fetch contents: {e}")
