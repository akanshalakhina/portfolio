import urllib.request
import os

projects_urls = {
    "sensai": "https://sensai-dun.vercel.app",
    "stayhub": "https://stayhub-travel-accomodation-platform.vercel.app",
    "swipe": "https://swipe-clone-main.vercel.app/",
    "servicehive": "https://service-hive-seven.vercel.app",
    "reducate": "https://reducate-ai-one.vercel.app",
    "accredian": "https://accredian-clone-lime.vercel.app",
    "aethoria": "https://aethoria-the-fictional-world.vercel.app",
    "bookmypackers": "https://bookmy-packers.vercel.app"
}

public_dir = r"c:\Users\Akansha\Documents\Downloads\3d-portfolio-NEW-master\3d-portfolio-NEW-master\public"

print("Downloading live screenshots for projects...")
for name, url in projects_urls.items():
    screenshot_url = f"https://image.thum.io/get/width/1280/crop/800/maxAge/12/delay/3/{url}"
    dest_path = os.path.join(public_dir, f"project-{name}.png")
    try:
        print(f"Fetching screenshot for {name} ({url})...")
        req = urllib.request.Request(
            screenshot_url,
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        with urllib.request.urlopen(req, timeout=15) as response:
            with open(dest_path, "wb") as f:
                f.write(response.read())
        print(f"  Successfully saved {dest_path}")
    except Exception as e:
        print(f"  Failed to get screenshot for {name}: {e}")

print("Done.")
