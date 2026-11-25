"""Optional: download official Google Play screenshots and update website paths.
Run with Python 3 from any folder. Failed downloads leave remote links intact.
"""
from pathlib import Path
import json, os, urllib.request, urllib.error

ROOT = Path(__file__).resolve().parents[1]
CATALOGUE = ROOT / 'assets/catalogue.json'
DEST = ROOT / 'assets/screenshots'
DEST.mkdir(exist_ok=True)
games = json.loads(CATALOGUE.read_text(encoding='utf-8'))
replacements = {}
for game in games:
    for i, url in enumerate(game['images']):
        if not url.startswith('https://play-lh.googleusercontent.com/'):
            continue
        try:
            request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(request, timeout=25) as response:
                data = response.read(10_000_001)
            if len(data) > 10_000_000:
                raise ValueError('Image exceeds 10 MB')
            if data.startswith(b'\xff\xd8\xff'):
                ext = 'jpg'
            elif data.startswith(b'\x89PNG\r\n\x1a\n'):
                ext = 'png'
            elif data.startswith(b'RIFF') and data[8:12] == b'WEBP':
                ext = 'webp'
            else:
                raise ValueError('Response is not a recognized image')
            target = DEST / f"{game['slug']}-{i+1}.{ext}"
            target.write_bytes(data)
            replacements[url] = target
            game['images'][i] = target.relative_to(ROOT).as_posix()
            print('Saved', target.name)
        except (OSError, ValueError) as error:
            print('Keeping remote image:', game['slug'], i+1, error)
for file in ROOT.rglob('*.html'):
    original = file.read_text(encoding='utf-8')
    text = original
    for url, target in replacements.items():
        text = text.replace(url, Path(os.path.relpath(target, file.parent)).as_posix())
    if text != original:
        file.write_text(text, encoding='utf-8')
CATALOGUE.write_text(json.dumps(games, indent=2, ensure_ascii=False), encoding='utf-8')
print(f'{len(replacements)} screenshot URLs localized. Remaining remote images still work as before.')
