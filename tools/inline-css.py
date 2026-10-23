"""Copy styles.css, lightly minified, into a <style> block in every page.

Pages inline their CSS so the first paint does not wait on a stylesheet request.
styles.css stays the source of truth. Run after editing it:

    python3 tools/inline-css.py
"""
import pathlib, re

root = pathlib.Path(__file__).resolve().parent.parent
css = (root / "styles.css").read_text()
css = re.sub(r"/\*[\s\S]*?\*/", "", css)
css = re.sub(r"\s*\n\s*", "", css)
css = re.sub(r"\s*([{};,])\s*", r"\1", css).replace(";}", "}")

block = "<style data-inline=\"styles.css\">" + css + "</style>"
pages = [p for p in root.rglob("*.html") if ".git" not in p.parts and "tools" not in p.parts]
for page in sorted(pages):
    html = page.read_text()
    if 'data-inline="styles.css"' in html:
        html = re.sub(r'<style data-inline="styles.css">[\s\S]*?</style>', lambda m: block, html)
    elif '<link rel="stylesheet" href="/styles.css" />' in html:
        html = html.replace('<link rel="stylesheet" href="/styles.css" />', block)
    else:
        continue
    page.write_text(html)
    print("inlined into", page.relative_to(root).as_posix())
print(f"{len(css):,} bytes of CSS")
