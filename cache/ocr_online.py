import os
import urllib.request
import urllib.parse
import json

folder = r"C:\Users\Akansha\Documents\Downloads\drive-download-20260519T123439Z-3-001"
candidates = [
    "WhatsApp Image 2026-05-10 at 4.21.59 PM.jpeg",
    "WhatsApp Image 2026-05-10 at 4.21.23 PM.jpeg",
    "WhatsApp Image 2026-05-10 at 4.25.09 PM.jpeg",
    "WhatsApp Image 2026-05-10 at 4.22.17 PM (1).jpeg",
    "WhatsApp Image 2026-05-10 at 4.25.04 PM.jpeg",
    "WhatsApp Image 2026-05-10 at 4.21.24 PM.jpeg"
]

project_keywords = ["sensai", "stayhub", "swipe", "servicehive", "novastore", "reducate", "accredian", "aethoria", "vibemate", "packers", "attendance", "face"]

print("Analyzing candidate images using OCR.space free API...")

for name in candidates:
    filepath = os.path.join(folder, name)
    if not os.path.exists(filepath):
        print(f"{name}: File does not exist")
        continue
        
    try:
        # We upload the image to the OCR.space free API
        # Using the standard multi-part post form
        boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
        data = []
        data.append(f'--{boundary}')
        data.append('Content-Disposition: form-data; name="apikey"')
        data.append('')
        data.append('helloworld') # Free public key
        
        data.append(f'--{boundary}')
        data.append('Content-Disposition: form-data; name="language"')
        data.append('')
        data.append('eng')
        
        data.append(f'--{boundary}')
        # Reading image bytes
        with open(filepath, 'rb') as f:
            file_bytes = f.read()
            
        data.append(f'--{boundary}')
        data.append(f'Content-Disposition: form-data; name="file"; filename="{name}"')
        data.append('Content-Type: image/jpeg')
        data.append('')
        
        # Build the payload
        body = b''
        for item in data[:-1]:
            if isinstance(item, str):
                body += item.encode('utf-8') + b'\r\n'
            else:
                body += item + b'\r\n'
        body += file_bytes + b'\r\n'
        body += f'--{boundary}--'.encode('utf-8') + b'\r\n'
        
        req = urllib.request.Request(
            "https://api.ocr.space/parse/image",
            data=body,
            headers={
                'Content-Type': f'multipart/form-data; boundary={boundary}',
                'User-Agent': 'Mozilla/5.0'
            }
        )
        
        with urllib.request.urlopen(req, timeout=15) as res:
            res_data = json.loads(res.read().decode('utf-8'))
            if res_data.get("IsErroredOnProcessing") == False:
                text = res_data["ParsedResults"][0]["ParsedText"]
                matched = [k for k in project_keywords if k in text.lower()]
                print(f"\n[{name}]: OCR detected text:")
                print(f"  Matched keywords: {matched}")
                clean_text = text.strip().replace('\r\n', ' ')[:250]
                print(f"  Text snippet: {clean_text}...")
            else:
                print(f"[{name}]: OCR Space returned error: {res_data.get('ErrorMessage')}")
                
    except Exception as e:
        print(f"[{name}]: Request failed: {e}")
