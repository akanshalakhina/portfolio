import os
import subprocess
import json

folder = r"C:\Users\Akansha\Documents\Downloads\drive-download-20260519T123439Z-3-001"
landscape_images = []

# List all landscape images first
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

print(f"Found {len(landscape_images)} landscape images. Running Windows Built-in OCR...")

# PowerShell script template to perform OCR on a file
ps_script_template = """
[RequiredShader] | Out-Null
try {
    Add-Type -AssemblyName System.Runtime.WindowsRuntime
    $asPath = [System.IO.Path]::GetFullPath('{filepath}')
    
    # Load Windows.Graphics.Imaging and Windows.Media.Ocr
    [Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics, ContentType=WindowsRuntime] | Out-Null
    [Windows.Media.Ocr.OcrEngine, Windows.Media, ContentType=WindowsRuntime] | Out-Null
    [Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime] | Out-Null
    
    $fileTask = [Windows.Storage.StorageFile]::GetFileFromPathAsync($asPath)
    $storageFile = $fileTask.GetAwaiter().GetResult()
    
    $streamTask = $storageFile.OpenAsync([Windows.Storage.FileAccessMode]::Read)
    $stream = $streamTask.GetAwaiter().GetResult()
    
    $decoderTask = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)
    $decoder = $decoderTask.GetAwaiter().GetResult()
    
    $softwareBitmapTask = $decoder.GetSoftwareBitmapAsync()
    $softwareBitmap = $softwareBitmapTask.GetAwaiter().GetResult()
    
    $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
    $ocrResultTask = $engine.RecognizeAsync($softwareBitmap)
    $ocrResult = $ocrResultTask.GetAwaiter().GetResult()
    
    Write-Output $ocrResult.Text
} catch {
    Write-Error $_.Exception.Message
}
"""

project_keywords = ["sensai", "stayhub", "swipe", "servicehive", "novastore", "reducate", "accredian", "aethoria", "vibemate", "packers", "attendance", "face"]

for filepath in landscape_images:
    # Format path for PowerShell
    formatted_path = filepath.replace("'", "''")
    ps_cmd = ps_script_template.replace("{filepath}", formatted_path)
    
    # Run the PowerShell command
    try:
        proc = subprocess.run(
            ["powershell", "-Command", ps_cmd],
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='ignore',
            timeout=10
        )
        text = proc.stdout.strip()
        if text:
            # Check if any keyword matches
            matched = [k for k in project_keywords if k in text.lower()]
            if matched:
                print(f"\n[MATCH] {os.path.basename(filepath)} contains {matched}:")
                print(f"  OCR Text: {text[:300]}...")
            else:
                # print snippet of any text found
                print(f"Text in {os.path.basename(filepath)}: {text[:100]}...")
    except Exception as e:
        print(f"Failed to process {os.path.basename(filepath)}: {e}")
