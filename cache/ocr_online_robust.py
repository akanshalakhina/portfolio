import os
import urllib.request
import json
import mimetypes

folder = r"C:\Users\Akansha\Documents\Downloads\drive-download-20260519T123439Z-3-001"
landscape_images = []

for file in os.listdir(folder):
    if file.lower().endswith(('.png', '.jpg', '.jpeg')):
        path = os.path.join(folder, file)
        try:
            from PIL import Image
            with Image.open(path) as img:
                w, h = img.size
                if w > h:
                    landscape_images.append(path)
        except Exception:
            pass

print(f"Found {len(landscape_images)} landscape images. Sending to OCR.space...")

def post_multipart(url, fields, files):
    boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
    CRLF = b'\r\n'
    L = []
    for key, value in fields.items():
        L.append(b'--' + boundary.encode('utf-8'))
        L.append(f'Content-Disposition: form-data; name="{key}"'.encode('utf-8'))
        L.append(b'')
        L.append(str(value).encode('utf-8'))
    for key, filename, value in files:
        L.append(b'--' + boundary.encode('utf-8'))
        L.append(f'Content-Disposition: form-data; name="{key}"; filename="{filename}"'.encode('utf-8'))
        L.append(b'Content-Type: image/jpeg')
        L.append(b'')
        L.append(value)
    L.append(b'--' + boundary.encode('utf-8') + b'--')
    L.append(b'')
    body = CRLF.join(L)
    
    headers = {
        'Content-Type': f'multipart/form-data; boundary={boundary}',
        'User-Agent': 'Mozilla/5.0'
    }
    
    req = urllib.request.Request(url, data=body, headers=headers)
    with urllib.request.urlopen(req, timeout=20) as res:
        return json.loads(res.read().decode('utf-8'))

project_keywords = ["sensai", "stayhub", "swipe", "servicehive", "novastore", "reducate", "accredian", "aethoria", "vibemate", "packers", "attendance", "face"]

for filepath in sorted(landscape_images):
    name = os.path.basename(filepath)
    try:
        with open(filepath, 'rb') as f:
            file_bytes = f.read()
            
        res_data = post_multipart(
            "https://api.ocr.space/parse/image",
            {"apikey": "helloworld", "language": "eng"},
            [("file", name, file_bytes)]
        )
        
        if res_data.get("IsErroredOnProcessing") == False:
            text = res_data["ParsedResults"][0]["ParsedText"]
            matched = [k for k in project_keywords if k in text.lower()]
            clean_text = text.strip().replace('\r\n', ' ').replace('\n', ' ')[:200]
            print(f"\n[{name}]:")
            if matched:
                print(f"  * MATCHED: {matched}")
            print(f"  * Text: {clean_text}...")
        else:
            print(f"[{name}]: OCR error: {res_data.get('ErrorMessage')}")
    except Exception as e:
        print(f"[{name}]: Failed: {e}")
