"""Copy the shared header, say-hi modal and footer from index.html into every other page.

Run from anywhere after editing those blocks in index.html:

    python3 tools/sync-pages.py

Labs pages get the same blocks, but with "Labs" marked as the current page and the
footer's contact strip swapped for one written for businesses rather than recruiters.
"""
import pathlib, re

root = pathlib.Path(__file__).resolve().parent.parent
index = (root / "index.html").read_text()


def block(src, start, end):
    i = src.index(start)
    j = src.index(end, i) + len(end)
    return src[i:j]


header = block(index, '<header class="site-header"', "</header>")
modal_start = index.index('<div class="sayhi" data-sayhi hidden>')
modal = index[modal_start:index.index("<main", modal_start)].rstrip() + "\n\n"
footer = block(index, '<footer class="home2-footer">', "</footer>")

current = {
    "about.html": "/about", "sidequests.html": "/sidequests",
    "proofmart.html": "/#work", "gapl.html": "/#work", "lputv.html": "/#work",
}

DEMO = "https://wa.me/919999602901?text=Hi%2C%20I'd%20like%20to%20book%20a%20call%20with%20Deepanshu%20this%20week."
WA = '<svg class="ic" aria-hidden="true"><use href="/art.svg#i-wa"/></svg>'
LABS_CONTACT = '''<div class="footer-contact" id="contact">
    <div>
      <h2 data-reveal>Let’s <em>talk</em>.</h2>
      <p class="footer-contact__facts"><span>Delhi NCR, India</span><span>One person, not an agency</span><span>Replies within a day</span></p>
      <p class="footer-contact__sub">Tell me about your business and how your customers get in touch today.</p>
    </div>
    <div class="footer-contact__actions">
      <a class="btn btn--solid" href="#" data-email-link>Email me</a>
      <a class="btn btn--ghost" href="https://wa.me/918221016809?text=Hi%20Deepanshu%2C%20I%20found%20Deepanshu%20Labs" target="_blank" rel="noopener">Message me on WhatsApp</a>
      <a class="btn btn--ghost" href="https://www.linkedin.com/in/deepanshulathar" target="_blank" rel="noopener">LinkedIn</a>
    </div>
  </div>'''
RECEPTIONIST_CONTACT = f'''<div class="footer-contact rx-close" id="contact">
    <div>
      <h2 data-reveal>Try it free for 15 days.</h2>
      <div class="rx-close__row">
        <p>Start with the demo. If you like it, yours is set up around your services, prices and hours.</p>
        <div>
          <div class="rx-act"><a class="btn btn--solid" href="{DEMO}" target="_blank" rel="noopener">{WA}Try it on WhatsApp</a></div>
          <p class="rx-foot">Demo line <b>+91 99996 02901</b></p>
        </div>
      </div>
    </div>
  </div>'''

pages = [p for p in root.rglob("*.html") if p.name != "index.html" or p.parent != root]
pages = [p for p in pages if ".git" not in p.parts and "tools" not in p.parts]
for page in sorted(pages):
    rel = page.relative_to(root).as_posix()
    s = page.read_text()
    if '<header class="site-header"' not in s:
        print("skipped", rel)
        continue
    is_labs = rel.startswith("labs/")
    href = "/labs" if is_labs else current.get(rel)
    h = header
    if href:
        h = h.replace(f'<a href="{href}">', f'<a href="{href}" aria-current="page">', 1)
    s = s.replace(block(s, '<header class="site-header"', "</header>"), h)
    ms = s.index('<div class="sayhi" data-sayhi hidden>')
    s = s[:ms] + modal + s[s.index("<main", ms):]
    f = footer
    if is_labs:
        contact = RECEPTIONIST_CONTACT if rel.startswith("labs/whatsapp-receptionist/") else LABS_CONTACT
        f = re.sub(r'<div class="footer-contact">[\s\S]*?</div>\n  </div>', lambda m: contact, f, count=1)
        f = f.replace('<a href="/privacy">Privacy</a>', '<a href="/labs/privacy">Privacy</a>')
    s = s.replace(block(s, '<footer class="home2-footer">', "</footer>"), f)
    if 'classList.add("js")' not in s:
        s = s.replace('<link rel="stylesheet"', '<script>document.documentElement.classList.add("js")</script>\n<link rel="stylesheet"', 1)
    page.write_text(s)
    print("synced", rel)
