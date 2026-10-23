"""Copy styles.css, lightly minified, into the <style> block of index.html.

The home page inlines its CSS so the first paint does not wait on a stylesheet
request; every other page links /styles.css. Run after editing styles.css:

    python3 tools/inline-css.py
"""
import pathlib, re

root = pathlib.Path(__file__).resolve().parent.parent
css = (root / "styles.css").read_text()
css = re.sub(r"/\*[\s\S]*?\*/", "", css)
css = re.sub(r"\s*\n\s*", "", css)
css = re.sub(r"\s*([{};,])\s*", r"\1", css).replace(";}", "}")

page = root / "index.html"
html = page.read_text()
block = "<style data-inline=\"styles.css\">" + css + "</style>"
if 'data-inline="styles.css"' in html:
    html = re.sub(r'<style data-inline="styles.css">[\s\S]*?</style>', lambda m: block, html)
else:
    html = html.replace('<link rel="stylesheet" href="/styles.css" />', block)
page.write_text(html)
print(f"inlined {len(css):,} bytes of CSS into index.html")
