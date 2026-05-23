import urllib.request
import os
import sys

def download_file(url, output_path):
    print(f"Downloading from {url} to {output_path}...")
    headers = {'User-Agent': 'Mozilla/5.0'}
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response, open(output_path, 'wb') as out_file:
        data = response.read()
        out_file.write(data)
    print("Download completed.")

if __name__ == "__main__":
    resume_id = "1FSajxqK6OEFL0l1nBGQVIP_nADHque2h"
    url = f"https://drive.google.com/uc?export=download&id={resume_id}"
    pdf_path = "resume.pdf"
    
    try:
        download_file(url, pdf_path)
        print(f"File downloaded, size: {os.path.getsize(pdf_path)} bytes")
    except Exception as e:
        print(f"Error downloading: {e}")
        sys.exit(1)
