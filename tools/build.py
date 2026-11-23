#!/usr/bin/env python3
"""Build every page from src/pages/*.html into the site root.

Each source file starts with a front-matter comment:
<!--
out: about.html
path: /about
title: About · Deepanshu Lathar
description: ...
nav: about            (optional; marks the current menu item)
scripts: /oss.js      (optional, space separated)
analytics: yes        (optional; home only, disclosed in /privacy)
privacy: /labs/privacy (optional footer privacy link)
noindex: yes          (optional)
-->
Placeholders in the body: {{marquee}}, {{cta}}, {{faq}}.
Run: python3 tools/build.py
"""
import html, json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
SITE = "https://deepanshulathar.com"
WA = "https://wa.me/918221016809?text=Hi%20Deepanshu%2C%20I%20found%20your%20portfolio"

NAV = [("work", "/work", "Work"), ("expertise", "/expertise", "Expertise"), ("about", "/about", "About"),
       ("labs", "/labs", "Labs"), ("sidequests", "/sidequests", "Sidequests"), ("contact", "/contact", "Contact")]

PROOF = ["15+ production tools in 8 weeks", "3,000+ students reached", "1,000+ submissions in 72 hours",
         "15 deeply profiled beta users", "4 selected products", "4 Oracle Foundations certifications"]

ARROW = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'


def marquee(light=False):
    items = "".join(f"<li>{html.escape(p)}</li>" for p in PROOF)
    cls = "marquee marquee--light" if light else "marquee"
    aria = 'aria-hidden="true"' if light else 'aria-label="Proof"'
    return f'<div class="{cls}" {aria}><div class="marquee-track" data-marquee><ul>{items}</ul></div></div>'


CTA = f"""<section class="final" id="contact-cta" aria-labelledby="cta-h" data-reveal data-progress>
  <div class="final-fill" aria-hidden="true"></div>
  <div class="wrap">
    <h2 class="rv" id="cta-h">Let's <span class="hl-lime">build</span> it</h2>
    <a class="tel rv" href="tel:+918221016809">+91 82210 16809</a>
    <div class="ctas rv">
      <a class="btn btn--light" href="{WA}">WhatsApp me</a>
      <a class="btn btn--dark" href="/contact">Send a brief</a>
      <a class="btn btn--ghost" href="/Deepanshu-Lathar-Resume.pdf">Résumé (PDF)</a>
    </div>
  </div>
  {marquee(True)}
</section>"""


def faq_block(faq):
    plus = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg>'
    out = []
    for i, (q, a) in enumerate(faq):
        out.append(f'<div class="faq-item"><h3><button class="faq-q" aria-expanded="false" aria-controls="fa{i}" id="fq{i}">'
                   f'<span>{html.escape(q)}</span><i aria-hidden="true">{plus}</i></button></h3>'
                   f'<div class="faq-a" id="fa{i}" role="region" aria-labelledby="fq{i}"><p>{html.escape(a)}</p></div></div>')
    return '<div class="faq rv">' + "".join(out) + "</div>"


def faq_schema(faq):
    data = {"@context": "https://schema.org", "@type": "FAQPage",
            "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faq]}
    return f'<script type="application/ld+json">{json.dumps(data, ensure_ascii=False)}</script>'


PERSON = json.dumps({"@context": "https://schema.org", "@type": "Person", "name": "Deepanshu Lathar", "url": SITE + "/",
                     "jobTitle": "Product and software builder", "description": "Turns product questions into working software.", "address": {"@type": "PostalAddress", "addressRegion": "Delhi NCR", "addressCountry": "IN"},
                     "sameAs": ["https://www.linkedin.com/in/deepanshulathar", "https://github.com/latharrr"]})

ANALYTICS = """<script>
/* GA4 + Clarity, home page only, production domain only, on the first scroll, tap, key press or pointer move.
   Off when the browser sends Global Privacy Control or Do Not Track, or after the opt-out on /privacy. */
(function(){
  var off=!!navigator.globalPrivacyControl||navigator.doNotTrack==='1';
  try{if(localStorage.getItem('dl-no-analytics')==='1')off=true}catch(e){}
  if(off||!/(^|\\.)deepanshulathar\\.com$/.test(location.hostname))return;
  function start(){if(start.done)return;start.done=true;
    var g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtag/js?id=G-65PX2BG1P8';document.head.appendChild(g);
    window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','G-65PX2BG1P8');
    (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,'clarity','script','vkah3dr3vr');}
  ['pointerdown','pointermove','keydown','touchstart','scroll','wheel'].forEach(function(e){addEventListener(e,start,{once:true,passive:true})});
})();
</script>"""


def shell(meta, body):
    nav = meta.get("nav", "")
    path = meta["path"]
    cur = ' aria-current="page"'
    links = "".join(f'<a href="{href}"{cur if key == nav else ""}>{label}</a>' for key, href, label in NAV)
    head_extra = meta.get("head", "")
    scripts = "".join(f'<script src="{s}" defer></script>' for s in meta.get("scripts", "").split())
    robots = '<meta name="robots" content="noindex" />' if meta.get("noindex") else f'<link rel="canonical" href="{SITE}{path}" />'
    privacy = meta.get("privacy", "/privacy")
    title = html.escape(meta["title"])
    gsap_mode = meta.get("motion", "gsap") != "off"  # the living layer is on for every page unless a page opts out
    html_attr = ' data-motion="gsap"' if gsap_mode else ""
    if gsap_mode:
        # living motion layer: Lenis + GSAP + three.js, all served from /vendor (no third-party requests)
        head_extra += ('<link rel="stylesheet" href="/vendor/lenis.css" /><link rel="stylesheet" href="/living.css" />'
                       '<script type="importmap">{"imports":{"three":"/vendor/three.module.min.js"}}</script>'
                       "<script>if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('gsap-wait');"
                       "setTimeout(function(){document.documentElement.classList.remove('gsap-wait')},4000)}</script>")
        scripts += "".join(f'<script src="/vendor/{f}" defer></script>' for f in ("gsap.min.js", "ScrollTrigger.min.js", "SplitText.min.js", "lenis.min.js"))
        scripts += '<script type="module" src="/living.js"></script>'
    desc = html.escape(meta["description"])
    return f"""<!doctype html>
<html lang="en"{html_attr}>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{title}</title>
<meta name="description" content="{desc}" />
<meta name="theme-color" content="#120042" />
{robots}
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Deepanshu Lathar" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{desc}" />
<meta property="og:url" content="{SITE}{path}" />
<meta property="og:image" content="{SITE}/assets/og-portrait.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<link rel="preload" href="/fonts/anton-400.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin />
<link rel="stylesheet" href="/ui.css" />
<script>(function(r){{r.classList.add('js');try{{if(sessionStorage.getItem('dl-seen'))r.classList.add('seen')}}catch(e){{}}}})(document.documentElement)</script>
{head_extra}
</head>
<body>
<div class="progress-bar" aria-hidden="true"></div>
<div class="loader" id="loader" aria-hidden="true"><div class="spinner"><i></i><i></i></div></div>
<a class="skip" href="#main">Skip to content</a>
<header class="header">
  <a class="logo" href="/" aria-label="Deepanshu Lathar, home">Lathar<span>.</span></a>
  <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="menu"><span id="menuLabel">Menu</span> <span class="ico" aria-hidden="true"><b></b><s></s></span></button>
  <a class="btn btn--light" href="/contact">Hire me</a>
</header>
<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Site menu">
  <div class="menu-inner">
    <nav>{links}</nav>
    <div class="menu-foot">
      <a class="tel" href="tel:+918221016809">+91 82210 16809</a>
      <div class="ctas"><a class="btn btn--light" href="/Deepanshu-Lathar-Resume.pdf">Résumé (PDF)</a><a class="btn btn--dark" href="/contact">Hire me</a></div>
    </div>
  </div>
</div>
<main id="main">
{body}
</main>
<footer>
  <div class="wrap">
    <div class="foot">
      <div><a class="logo" href="/">Lathar<span>.</span></a><p class="foot-pos">I turn product questions into working software.</p></div>
      <div><h4>Site</h4><ul><li><a href="/work">Work</a></li><li><a href="/expertise">Expertise</a></li><li><a href="/about">About</a></li><li><a href="/labs">Labs</a></li><li><a href="/sidequests">Sidequests</a></li></ul></div>
      <div><h4>Contact</h4><ul><li><a href="/contact">Send a brief</a></li><li><a href="tel:+918221016809">+91 82210 16809</a></li><li><a data-email href="/contact">Email</a></li><li>Delhi NCR · IST</li></ul></div>
      <div><h4>Social</h4><ul><li><a href="https://www.linkedin.com/in/deepanshulathar">LinkedIn</a></li><li><a href="https://github.com/latharrr">GitHub</a></li><li><a href="/Deepanshu-Lathar-Resume.pdf">Résumé (PDF)</a></li></ul></div>
    </div>
    <div class="legal">
      <span>© 2026 Deepanshu Lathar · <a href="{privacy}">Privacy</a> · <a href="/support">Support</a></span>
      <span><span class="chip">4 Oracle Foundations certifications</span> <span class="chip">Exploring Founder's Office and Product internships</span></span>
    </div>
  </div>
</footer>
<script src="/ui.js" defer></script>
{scripts}
{ANALYTICS if meta.get("analytics") else ""}
</body>
</html>
"""


def parse(src):
    m = re.match(r"\s*<!--(.*?)-->\s*", src, re.S)
    assert m, "missing front matter"
    meta = {}
    for line in m.group(1).strip().splitlines():
        k, _, v = line.partition(":")
        meta[k.strip()] = v.strip()
    for need in ("out", "path", "title", "description"):
        assert meta.get(need), f"front matter needs {need}"
    return meta, src[m.end():]


def main():
    faq = json.loads((SRC / "faq.json").read_text())
    built = []
    for f in sorted((SRC / "pages").glob("*.html")):
        meta, body = parse(f.read_text())
        if "{{faq}}" in body:
            body = body.replace("{{faq}}", faq_block(faq))
            meta["head"] = meta.get("head", "") + faq_schema(faq)
        if meta["path"] == "/":
            meta["head"] = meta.get("head", "") + f'<script type="application/ld+json">{PERSON}</script>'
        body = body.replace("{{marquee}}", marquee()).replace("{{cta}}", CTA).replace("{{arrow}}", ARROW)
        assert "{{" not in body, f"{f.name}: unknown placeholder"
        out = ROOT / meta["out"]
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(shell(meta, body))
        built.append(meta["out"])
    print("built", len(built), "pages:", " ".join(built))


if __name__ == "__main__":
    main()
