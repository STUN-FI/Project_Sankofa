from pathlib import Path
import re

root = Path(r"C:\Users\Stunna\OneDrive\Desktop\Lighthub.ed")

paths = [
    root / 'app' / 'course' / '[courseId]' / 'page.jsx',
    root / 'app' / 'course' / '[courseId]' / 'gaps' / 'page.jsx',
    root / 'app' / 'dashboard' / 'page.jsx',
    root / 'app' / 'panic' / 'page.jsx',
]

for path in paths:
    if not path.exists():
        print(f'MISSING {path}')
        continue
    text = path.read_text(encoding='utf8')
    original = text
    text = re.sub(r"^import\s+ThemeProfileMenu.*\n", '', text, flags=re.M)
    text = text.replace('<ThemeProfileMenu />', '')
    text = re.sub(r"dark:[^\s\"\'\n\r]+", '', text)
    text = re.sub(r'\s{2,}', ' ', text)
    text = text.replace('className=" ', 'className="')
    text = text.replace('  ', ' ')
    if text != original:
        path.write_text(text, encoding='utf8')
        print(f'updated {path.relative_to(root)}')

# remove the theme component file
component = root / 'app' / 'components' / 'ThemeProfileMenu.jsx'
if component.exists():
    component.unlink()
    print('removed app/components/ThemeProfileMenu.jsx')

# clean globals.css theme blocks
css_path = root / 'app' / 'globals.css'
if css_path.exists():
    css = css_path.read_text(encoding='utf8')
    original_css = css
    css = re.sub(r'html\.dark\s*\{[^}]*\}', '', css, flags=re.S)
    css = re.sub(r'@media \(prefers-color-scheme: dark\)\s*\{\s*:root\s*\{[^}]*\}\s*\}', '', css, flags=re.S)
    css = re.sub(r'\n{3,}', '\n\n', css)
    css = css.strip() + '\n'
    if css != original_css:
        css_path.write_text(css, encoding='utf8')
        print('updated app/globals.css')
