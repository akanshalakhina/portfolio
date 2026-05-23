import os
import sys
import easyocr

sys.stdout.reconfigure(encoding='utf-8')

screenshots_dir = r"C:\Users\Akansha\Pictures\Screenshots"
if not os.path.exists(screenshots_dir):
    print("Screenshots dir does not exist.")
    exit()

files = [os.path.join(screenshots_dir, f) for f in os.listdir(screenshots_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
if not files:
    print("No screenshots found.")
    exit()

print(f"Scanning {len(files)} screenshots using local EasyOCR...")
reader = easyocr.Reader(['en'], gpu=False) # run on CPU

keywords = ["vibemate", "roommate", "novastore", "attendance", "face recognition", "accredian", "reducate", "stayhub", "sensai"]

matches = []

for file in files:
    try:
        results = reader.readtext(file)
        text = " ".join([res[1] for res in results]).lower()
        matched = [k for k in keywords if k in text]
        if matched:
            print(f"\n[MATCH] {os.path.basename(file)} contains {matched}:")
            print(f"  Text: {text[:250]}")
            matches.append((file, matched))
    except Exception as e:
        pass

print(f"\nScan complete. Found {len(matches)} matches.")
