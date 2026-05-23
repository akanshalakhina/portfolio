using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Windows.Graphics.Imaging;
using Windows.Media.Ocr;
using Windows.Storage;

class Program
{
    static async Task Main(string[] args)
    {
        string screenshotsDir = @"C:\Users\Akansha\Pictures\Screenshots";
        if (!Directory.Exists(screenshotsDir))
        {
            Console.WriteLine("Directory does not exist: " + screenshotsDir);
            return;
        }

        string[] keywords = { "vibemate", "roommate", "novastore", "attendance", "face recognition" };
        var files = Directory.GetFiles(screenshotsDir, "*.png");
        
        Console.WriteLine($"Scanning {files.Length} screenshots in {screenshotsDir}...");
        
        OcrEngine engine = OcrEngine.TryCreateFromUserProfileLanguages();
        if (engine == null)
        {
            Console.WriteLine("OCR Engine could not be initialized.");
            return;
        }

        foreach (var file in files)
        {
            try
            {
                StorageFile storageFile = await StorageFile.GetFileFromPathAsync(file);
                using (var stream = await storageFile.OpenAsync(FileAccessMode.Read))
                {
                    BitmapDecoder decoder = await BitmapDecoder.CreateAsync(stream);
                    using (SoftwareBitmap bitmap = await decoder.GetSoftwareBitmapAsync())
                    {
                        OcrResult result = await engine.RecognizeAsync(bitmap);
                        string text = result.Text.ToLower();
                        
                        var matched = keywords.Where(kw => text.Contains(kw)).ToList();
                        if (matched.Count > 0)
                        {
                            Console.WriteLine($"\n[MATCH] File: {Path.GetFileName(file)}");
                            Console.WriteLine($"  Keywords: {string.Join(", ", matched)}");
                            Console.WriteLine($"  Text snippet: {(text.Length > 200 ? text.Substring(0, 200) : text)}");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Skip errors
            }
        }
        Console.WriteLine("\nScan complete.");
    }
}
