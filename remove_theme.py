from pathlib import Path
import re

root = Path(r"C:\Users\Stunna\OneDrive\Desktop\Lighthub.ed")

def remove_theme_from_file(path: Path) -> bool:
    text = path.read_text(encoding='utf8')
    original = text
    # remove import statements for ThemeProfileMenu
    text = re.sub(r'^import\s+ThemeProfileMenu.*\n', '', text, flags=re.M)
    # remove component usage
    text = text.replace('<ThemeProfileMenu />', '')
    # remove any remaining ThemeProfileMenu tokens
    text = text.replace('ThemeProfileMenu', '')
    # remove Tailwind dark: variants
    text = re.sub(r'dark:[^\s"\'\)]+', '', text)
    # collapse extra spaces around className strings
    text = re.sub(r'\s{2,}', ' ', text)
    if text != original:
        path.write_text(text, encoding='utf8')
        return True
    return False

files_updated = []
for ext in ('*.jsx', '*.js', '*.tsx', '*.ts'):
    for path in root.rglob(ext):
        if path.match('**/node_modules/**'):
            continue
        if remove_theme_from_file(path):
            files_updated.append(str(path.relative_to(root)))

# remove theme component file
component = root / 'app' / 'components' / 'ThemeProfileMenu.jsx'
if component.exists():
    component.unlink()
    files_updated.append('app/components/ThemeProfileMenu.jsx removed')

# clean globals.css theme CSS
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
        files_updated.append('app/globals.css updated')

print('Updated files:')
for f in files_updated:
    print(f)
