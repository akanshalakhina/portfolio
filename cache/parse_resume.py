import sys
import subprocess

# Ensure pypdf is installed
try:
    import pypdf
except ImportError:
    print("pypdf not found. Installing it...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf"])
    import pypdf

def extract_text_from_pdf(pdf_path):
    print(f"Extracting text from {pdf_path}...")
    reader = pypdf.PdfReader(pdf_path)
    text = ""
    for i, page in enumerate(reader.pages):
        page_text = page.extract_text()
        text += f"--- PAGE {i+1} ---\n"
        text += page_text + "\n"
    return text

if __name__ == "__main__":
    pdf_path = "resume.pdf"
    output_txt = "resume_text.txt"
    try:
        text = extract_text_from_pdf(pdf_path)
        with open(output_txt, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Extraction successful! Text written to {output_txt}.")
        print("Resume Preview:")
        print(text[:1500]) # Print first 1500 chars
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
