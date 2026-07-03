from pathlib import Path
import re

root = Path(r"C:\Users\Stunna\OneDrive\Desktop\Lighthub.ed")
files = [
    root / 'app' / 'course' / '[courseId]' / 'page.jsx',
    root / 'app' / 'course' / '[courseId]' / 'gaps' / 'page.jsx',
    root / 'app' / 'dashboard' / 'page.jsx',
    root / 'app' / 'panic' / 'page.jsx',
]

def clean_text(text: str) -> str:
    text = re.sub(r'^import\s+ThemeProfileMenu.*\n', '', text, flags=re.M)
    text = text.replace('<ThemeProfileMenu />', '')
    text = text.replace('ThemeProfileMenu', '')
    text = re.sub(r'dark:[^\s"\'\)]+', '', text)
    text = re.sub(r'\s{2,}', ' ', text)
    return text

for path in files:
    if not path.exists():
        print(f'MISSING {path}')
        continue
    original = path.read_text(encoding='utf8')
    cleaned = clean_text(original)
    if cleaned != original:
        path.write_text(cleaned, encoding='utf8')
        print(f'cleaned {path.relative_to(root)}')
