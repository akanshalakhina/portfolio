import os
import subprocess

screenshots_dir = r"C:\Users\Akansha\Pictures\Screenshots"
if not os.path.exists(screenshots_dir):
    print("Screenshots dir does not exist.")
    exit()

files = [os.path.join(screenshots_dir, f) for f in os.listdir(screenshots_dir) if f.lower().endswith('.png')]
if not files:
    print("No PNG screenshots found.")
    exit()

test_file = files[0]
print(f"Testing OCR on screenshot: {test_file}")

ps_script = """
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$asPath = [System.IO.Path]::GetFullPath('{filepath}')

[Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics, ContentType=WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Media, ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime] | Out-Null

$fileTask = [Windows.Storage.StorageFile]::GetFileFromPathAsync($asPath)
$fileTask.Wait()
$storageFile = $fileTask.Result

$streamTask = $storageFile.OpenAsync([Windows.Storage.FileAccessMode]::Read)
$streamTask.Wait()
$stream = $streamTask.Result

$decoderTask = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)
$decoderTask.Wait()
$decoder = $decoderTask.Result

$softwareBitmapTask = $decoder.GetSoftwareBitmapAsync()
$softwareBitmapTask.Wait()
$softwareBitmap = $softwareBitmapTask.Result

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
if ($null -eq $engine) {
    Write-Output "ERROR: OcrEngine could not be created."
    exit
}

$ocrResultTask = $engine.RecognizeAsync($softwareBitmap)
$ocrResultTask.Wait()
$ocrResult = $ocrResultTask.Result

Write-Output $ocrResult.Text
""".replace("{filepath}", test_file.replace("'", "''"))

proc = subprocess.run(
    ["powershell", "-Command", ps_script],
    capture_output=True,
    text=True,
    errors='ignore'
)

print("STDOUT:")
print(proc.stdout)
print("STDERR:")
print(proc.stderr)
