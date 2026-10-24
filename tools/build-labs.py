"""One-off generator for the Labs pages in the portfolio's design system.
Header, say-hi modal and footer are placeholders here; tools/sync-pages.py fills them from index.html."""
import pathlib
root = pathlib.Path(__file__).resolve().parent.parent

DEMO = "https://wa.me/919999602901?text=Hi%2C%20I'd%20like%20to%20book%20a%20call%20with%20Deepanshu%20this%20week."
WA = '<svg class="ic" aria-hidden="true"><use href="/art.svg#i-wa"/></svg>'

def head(title, desc, url, og_title=None, og_desc=None):
    return f'''<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#ffffff" />
<title>{title}</title>
<meta name="description" content="{desc}" />
<meta name="author" content="Deepanshu Lathar" />
<meta property="og:type" content="website" />
<meta property="og:title" content="{og_title or title}" />
<meta property="og:description" content="{og_desc or desc}" />
<meta property="og:url" content="https://deepanshulathar.com{url}" />
<meta property="og:image" content="https://deepanshulathar.com/assets/og-image.png" />
<meta property="og:locale" content="en_GB" />
<meta name="twitter:card" content="summary_large_image" />
<script>document.documentElement.classList.add("js")</script>
<link rel="preload" href="/fonts/averia-serif-libre-300.woff2" as="font" type="font/woff2" crossorigin />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<link rel="canonical" href="https://deepanshulathar.com{url}" />
<link rel="stylesheet" href="/styles.css" />
</head>
'''

SHELL_TOP = '''<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header" data-header></header>

<div class="sayhi" data-sayhi hidden></div>

'''
SHELL_BOTTOM = '''
<footer class="home2-footer"></footer>
'''

def cord():
    return '<svg class="cord" viewBox="0 0 100 28.25" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M29.09 28.25 50 1.5 70.91 28.25"/><circle cx="50" cy="1.5" r="1.5"/></svg>'

# ---------------- /labs ----------------
index = head("Deepanshu Labs · Independent software studio",
  "Deepanshu Labs is an independent software studio run by Deepanshu Lathar in Delhi NCR, India. First project: a WhatsApp AI receptionist with a live demo.",
  "/labs") + '<body id="top">\n' + SHELL_TOP + f'''<main id="main">
<section class="band" aria-labelledby="hero-h">
  <div class="band__column">
    <div class="lab-hero">
      <div class="hang">
        <div class="swing">
          {cord()}
          <div class="sign"><span class="card"><span class="face open" aria-hidden="true"><small>Come in, we’re</small><b>Open</b><span>software studio</span></span></span></div>
        </div>
      </div>
      <div>
        <p class="lab-eyebrow">Independent software studio · Delhi NCR</p>
        <h1 id="hero-h">Deepanshu <span class="chip-word chip-word--lime">Labs</span></h1>
        <p class="lede">An independent software studio run by Deepanshu Lathar in Delhi NCR, India. <strong>One person, not an agency:</strong> the person you message is the person who builds and fixes it.</p>
        <div class="lab-actions">
          <a class="btn btn--solid" href="#projects">See the projects</a>
          <a class="btn btn--ghost" href="#contact">Let’s talk</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="band" id="projects" aria-label="Projects">
  <div class="band__column">
    <div class="section-head">
      <div class="section-head__row">
        <svg viewBox="0 0 34 34" aria-hidden="true"><rect x="4" y="9" width="26" height="19" rx="3" fill="#E7FF7D" stroke="#17323A" stroke-width="1.8"/><path d="M12 9V6h10v3" fill="none" stroke="#17323A" stroke-width="1.8" stroke-linejoin="round"/><path d="M4 16h26" stroke="#17323A" stroke-width="1.8"/></svg>
        <h2 data-reveal>Projects</h2>
        <svg viewBox="0 0 34 34" aria-hidden="true"><path d="M17 3l3.4 10.6L31 17l-10.6 3.4L17 31l-3.4-10.6L3 17l10.6-3.4z" fill="#AFE3FF" stroke="#17323A" stroke-width="1.8" stroke-linejoin="round"/></svg>
      </div>
      <p data-reveal>Small, useful software for businesses, each with a live demo you can try before we talk.</p>
    </div>
    <article class="lab-item" data-reveal>
      <a class="lab-item__media" href="/labs/whatsapp-receptionist" tabindex="-1" aria-hidden="true"><img src="/assets/tile-labs-2-800.webp" srcset="/assets/tile-labs-2-800.webp 800w, /assets/tile-labs-2.webp 1280w" sizes="(max-width: 900px) calc(100vw - 26px), 55vw" alt="" width="1280" height="775" loading="lazy" decoding="async" /></a>
      <div class="lab-item__body">
        <span class="kicker">Project 01</span>
        <h3><a href="/labs/whatsapp-receptionist">WhatsApp AI Receptionist</a></h3>
        <span class="live-chip">Live 24/7</span>
        <p>An AI receptionist for your business. It replies to your customers on WhatsApp in seconds, answers their questions, and books the next step straight into the diary.</p>
        <div class="lab-actions">
          <a class="btn btn--solid" href="{DEMO}" target="_blank" rel="noopener">{WA}Try it on WhatsApp</a>
          <a class="btn btn--ghost" href="/labs/whatsapp-receptionist">How it works</a>
        </div>
      </div>
    </article>
    <div class="lab-soon" data-reveal>
      <h3>More on the way</h3>
      <p>New projects will be listed here when they are live.</p>
    </div>
  </div>
</section>
</main>
''' + SHELL_BOTTOM + '''
<script src="/site.js" defer></script>
</body>
</html>
'''

# ---------------- /labs/whatsapp-receptionist ----------------
check = '<svg viewBox="0 0 18 12" aria-hidden="true"><path d="M1 6.5 4.5 10 11 2M7 9.5l.9.6L14.5 2"/></svg>'
recep = head("WhatsApp AI Receptionist · Deepanshu Labs",
  "An AI receptionist that replies to your customers on WhatsApp in seconds, answers common questions and takes call requests. Set up around your business. Try the live demo.",
  "/labs/whatsapp-receptionist",
  "WhatsApp AI Receptionist · a Deepanshu Labs project",
  "WhatsApp the live demo. Ask it about the receptionist, then leave a preferred time for a call with Deepanshu.").replace('</head>', '''<style data-page="receptionist">
/* receptionist page only: one left edge (48px), one picture (the chat), one action */
.rx-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,580px);align-items:start;gap:64px;padding:112px 48px 128px}
.rx-eyebrow,.rx-hero .chat-note{font-family:var(--sans);font-size:12px;line-height:18px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}
.rx-eyebrow{margin-bottom:28px}
.rx-hero h1{font-family:var(--serif);font-weight:300;font-size:clamp(56px,6vw,86px);line-height:.93;letter-spacing:-.032em;color:#000;max-width:13ch;text-wrap:balance}
.rx-lede{margin-top:32px;font-size:19px;line-height:1.5;color:var(--text);max-width:38ch}
.rx-act{margin-top:36px}
.rx-foot{margin-top:16px;font-size:16px;line-height:1.5;color:var(--muted);max-width:44ch}
.rx-foot b{font-weight:400;color:var(--ink);white-space:nowrap}
.rx-hero .chat{display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-rows:auto 1fr;align-items:start;align-self:stretch;justify-self:end;width:100%;max-width:580px}
.rx-hero .chat-note{margin:0 0 12px}
.rx-hero .replay{min-height:0;margin:0 0 12px;line-height:18px}
.rx-hero .chat-screen{grid-column:1/-1;align-self:stretch;display:flex;flex-direction:column}
.rx-hero .chat-head{padding:18px 22px}
.rx-hero .chat ol{flex:1;align-content:end;gap:12px;padding:28px 22px 30px}
.rx-hero .chat li{font-size:15.5px;max-width:80%;padding:11px 15px 10px}
.rx-hero .chat time svg{stroke:var(--teal-ink)}
.rx-hero .chat-head span{font-family:var(--sans);font-size:11px;text-transform:uppercase;letter-spacing:.06em}
.rx-does{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,760px);gap:64px;align-items:start;padding:128px 48px 136px}
.rx-does h2{font-family:var(--serif);font-weight:300;font-size:48px;line-height:1.05;letter-spacing:-.02em;color:#000}
.rx-rows{list-style:none;margin:0;padding:0;border-top:1px solid var(--rule)}
.rx-rows li{display:flex;align-items:center;min-height:84px;padding:20px 0;border-bottom:1px solid var(--rule);font-size:19px;line-height:1.45;color:var(--muted)}
.rx-rows strong{font-weight:400;color:#000}
.home2-footer .rx-close{display:block;padding:128px 48px 136px;text-align:center}
.rx-close>div{max-width:760px;margin-inline:auto}
.rx-close h2{max-width:none;margin-inline:auto;text-wrap:balance;font-size:clamp(56px,5.6vw,80px);line-height:1;letter-spacing:-.028em;color:#000}
.rx-close__row{display:grid;grid-template-columns:minmax(0,1fr);gap:36px;justify-items:center;margin-top:32px}
.rx-close p{font-size:19px;line-height:1.5;color:var(--text);max-width:40ch;margin-inline:auto}
.rx-close .rx-act{margin-top:0}
.rx-close .rx-foot{margin-top:18px;max-width:none;font-family:var(--sans);font-size:12px;line-height:18px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}
.rx-close .rx-foot b{font-weight:500;color:var(--ink)}
/* the shared footer, kept whole but turned down so the offer above stays the last strong thing */
.home2-footer .home2-footer__inner{min-height:0;padding:40px 48px 28px}
.home2-footer .home2-footer__art{width:150px;height:109px}
.home2-footer .home2-footer__links{flex-direction:row;flex-wrap:wrap;justify-content:flex-end;gap:6px 22px}
.home2-footer .home2-footer__links a{font-size:20px;line-height:1.3;letter-spacing:-.01em}
.home2-footer .home2-footer__links .gap{margin-top:0}
.home2-footer .home2-footer__credit{font-size:15px}
@media (max-width:900px){
  .rx-hero{grid-template-columns:1fr;gap:56px;padding:88px 24px 72px}
  .rx-eyebrow{margin-bottom:20px}
  .rx-hero h1{font-size:clamp(40px,11.4vw,56px);line-height:.95;max-width:none}
  .rx-lede{margin-top:22px;font-size:17px}
  .rx-act{margin-top:28px}
  .rx-hero .chat{justify-self:stretch;max-width:none}
  .rx-hero .chat{align-self:start}
  .rx-hero .chat-head{padding:14px 16px}
  .rx-hero .chat ol{gap:8px;padding:16px 10px 18px}
  .rx-hero .chat li{max-width:93%;padding:9px 12px 8px}
  .rx-does{grid-template-columns:1fr;gap:32px;padding:72px 24px 80px}
  .rx-does h2{font-size:36px}
  .rx-rows li{min-height:0;padding:20px 0;font-size:17px}
  .home2-footer .rx-close{padding:80px 24px 88px}
  .rx-close h2{font-size:clamp(40px,11.4vw,56px)}
  .rx-close__row{grid-template-columns:1fr;margin-top:24px;gap:28px}
  .rx-close p{font-size:17px}
  .home2-footer .home2-footer__inner{gap:24px;padding:40px 24px 24px}
  .home2-footer .home2-footer__art{width:120px;height:87px}
  .home2-footer .home2-footer__links{justify-content:center;gap:4px 18px}
  .home2-footer .home2-footer__links a{font-size:18px}
  html.js .dock.dock--hero{translate:0 110%}
  /* the label keeps one line; the replay link moves under the chat */
  .rx-hero .chat-note{white-space:nowrap}
  .rx-hero .replay{grid-row:3;grid-column:1/-1;justify-self:start;margin:14px 0 0}
  /* the dock has already stepped aside at the contact strip, so no white band under the footer */
  body.has-dock{padding-bottom:0}
}
</style>
</head>''', 1) + '<body id="top" class="has-dock">\n' + SHELL_TOP + f'''<main id="main">
<section class="band" aria-labelledby="hero-h">
  <div class="band__column">
    <div class="rx-hero">
      <div>
        <p class="rx-eyebrow">WhatsApp AI receptionist</p>
        <h1 id="hero-h">Busy with a customer? The next one still gets a reply.</h1>
        <p class="rx-lede">An AI receptionist for your WhatsApp. It replies in seconds, answers common questions and takes call requests.</p>
        <div class="rx-act"><a class="btn btn--solid" href="{DEMO}" target="_blank" rel="noopener">{WA}Try it on WhatsApp</a></div>
        <p class="rx-foot">Demo line <b>+91 99996 02901</b>. Ask it anything, then leave a time for a call with Deepanshu.</p>
      </div>
      <figure class="chat" aria-label="Example conversation with the Deepanshu Labs demo line">
        <figcaption class="chat-note">Example conversation</figcaption>
        <div class="chat-screen">
          <div class="chat-head"><i class="ava" aria-hidden="true">DL</i><div><b>Deepanshu Labs</b><span>AI receptionist · Demo</span></div></div>
          <ol>
            <li class="them"><span class="who">Visitor: </span>Hi, can it answer my customers’ questions on WhatsApp?<time>21:14{check}</time></li>
            <li class="bot"><span class="who">Assistant: </span>Yes. It’s set up around your business, so it answers questions about your services, prices and hours.<time>21:14</time></li>
            <li class="them"><span class="who">Visitor: </span>Are you a real person?<time>21:15{check}</time></li>
            <li class="bot"><span class="who">Assistant: </span>No, I’m an AI assistant. I can pass a call request to Deepanshu. What time suits you, and what would you like to talk about?<time>21:15</time></li>
            <li class="them"><span class="who">Visitor: </span>Thursday at 4pm. A receptionist for my clinic.<time>21:16{check}</time></li>
            <li class="bot"><span class="who">Assistant: </span>This is a time request, not a confirmed booking. Wait for confirmation before making plans.<time>21:16</time></li>
          </ol>
        </div>
      </figure>
    </div>
  </div>
</section>

<section class="band" aria-labelledby="does-h">
  <div class="band__column rx-does">
    <h2 id="does-h">What it does</h2>
    <ul class="rx-rows">
      <li><p><strong>Replies on WhatsApp in seconds,</strong> even while you’re with a customer.</p></li>
      <li><p><strong>Answers common questions</strong> about your services, prices and hours.</p></li>
      <li><p><strong>Takes call requests</strong> when a customer asks to talk, and passes their preferred time to you to confirm.</p></li>
      <li><p><strong>Says it’s an AI</strong> whenever someone asks.</p></li>
    </ul>
  </div>
</section>
</main>
''' + SHELL_BOTTOM + f'''<div class="dock dock--hero"><a class="btn btn--lime" href="{DEMO}" target="_blank" rel="noopener">{WA}Try it on WhatsApp</a></div>
<script>
  /* phones: the docked button waits until the hero button has scrolled away, so only one shows at a time */
  (function (d, b) {{
    if (!d) return;
    if (!b || !('IntersectionObserver' in window)) {{ d.classList.remove('dock--hero'); return; }}
    new IntersectionObserver(function (e) {{ d.classList.toggle('dock--hero', e[0].isIntersecting); }}).observe(b);
  }})(document.querySelector('.dock'), document.querySelector('.rx-act .btn'));
</script>

<script src="/site.js" defer></script>
</body>
</html>
'''

# ---------------- /labs/privacy ----------------
privacy = head("Privacy policy · Deepanshu Labs",
  "What Deepanshu Labs collects through this website and the WhatsApp receptionist demo, and how to have it deleted.",
  "/labs/privacy") + '<body id="top">\n' + SHELL_TOP + '''<main id="main">
  <section class="band">
    <div class="band__column">
      <div class="prose">
        <p class="lab-eyebrow"><a href="/labs">Deepanshu Labs</a> <span aria-hidden="true">/</span> Privacy</p>
        <h1>Privacy policy</h1>
        <p class="lede">What we collect through this website and the WhatsApp demo, and how to have it deleted.</p>
        <p class="eff">Deepanshu Labs · Effective 23 October 2026</p>
        <nav aria-label="On this page"><ul class="toc-chips">
          <li><a href="#who">Who we are</a></li><li><a href="#site">This website</a></li><li><a href="#demo">The WhatsApp demo</a></li><li><a href="#providers">Service providers</a></li><li><a href="#deletion">Retention and deletion</a></li><li><a href="#rights">Your rights</a></li><li><a href="#children">Children</a></li><li><a href="#changes">Changes</a></li>
        </ul></nav>

        <h2 id="who">Who we are</h2>
        <p>Deepanshu Labs is an independent software studio run by Deepanshu Lathar in Delhi NCR, India. This policy covers the Deepanshu Labs pages of this website (deepanshulathar.com/labs) and the WhatsApp AI receptionist demo they link to. The rest of deepanshulathar.com has <a href="/privacy">its own privacy policy</a>.</p>

        <h2 id="site">This website</h2>
        <p>These are static pages. They set no cookies, run no analytics and have no forms. Fonts and images are served from this site, not from third parties. The company that hosts it may keep standard server logs, such as IP address and the pages requested, to keep the site running.</p>
        <p>Links to WhatsApp, LinkedIn and GitHub open those services, under their own policies.</p>

        <h2 id="demo">The WhatsApp demo</h2>
        <p>The demo line answers as the Deepanshu Labs assistant and books calls on Deepanshu's calendar. When you message it, we receive what WhatsApp shares with the business you are messaging: your phone number, your WhatsApp profile name, and the messages and photos you send.</p>
        <p>We use them only to:</p>
        <ul>
          <li>Reply to you and manage your booking.</li>
          <li>Hand the conversation to a person when it needs one.</li>
          <li>Follow up with you, if you ask us to.</li>
        </ul>
        <p>Replies are written with the help of AI model providers, which process your messages to produce them. We do not sell or rent your data, use it for advertising, or share it with data brokers.</p>
        <p>It is a demo line, so please do not send payment details or anything sensitive through it.</p>

        <h2 id="providers">Service providers</h2>
        <ul>
          <li>WhatsApp (Meta), to carry messages between you and the demo.</li>
          <li>AI model providers, to help write the demo's replies.</li>
          <li>A static web host (Vercel), to serve this website.</li>
        </ul>

        <h2 id="deletion">Retention and deletion</h2>
        <p>To have your demo conversation deleted, email us from any address and tell us the phone number you used. We will remove it within 30 days. You can also block or delete the chat in WhatsApp at any time.</p>

        <h2 id="rights">Your rights</h2>
        <p>You can ask to access, correct or delete your personal data, or withdraw your consent, at any time, including under the UK GDPR and India's Digital Personal Data Protection Act, 2023. Email us and we will respond within 30 days.</p>

        <h2 id="children">Children</h2>
        <p>The demo is not intended for anyone under 18, and we do not knowingly collect their data.</p>

        <h2 id="changes">Changes</h2>
        <p>If this policy changes, we will update this page and the effective date at the top of it.</p>

        <h2 id="policy-contact">Contact</h2>
        <p>Questions or requests: <a href="mailto:deepanshulathar@gmail.com">deepanshulathar@gmail.com</a></p>
      </div>
    </div>
  </section>
</main>
''' + SHELL_BOTTOM + '''
<script src="/site.js" defer></script>
</body>
</html>
'''

# ---------------- /labs 404 ----------------
gone = head("Page not found · Deepanshu Labs", "This page doesn't exist.", "/labs/404").replace(
  '<meta name="author"', '<meta name="robots" content="noindex" />\n<meta name="author"') + '<body id="top">\n' + SHELL_TOP + f'''<main id="main">
  <section class="band">
    <div class="band__column">
      <div class="lab-gone">
        <div class="hang">
          <div class="swing">
            {cord()}
            <div class="sign"><span class="card"><span class="face busy" style="transform:none" aria-hidden="true"><small>Sorry, we’re</small><b>Closed</b><span>on this page</span></span></span></div>
          </div>
        </div>
        <h1>This page doesn’t exist.</h1>
        <div class="btn-row"><a class="btn btn--solid" href="/labs">Back to Deepanshu Labs</a><a class="btn btn--ghost" href="/">Deepanshu’s portfolio</a></div>
      </div>
    </div>
  </section>
</main>
''' + SHELL_BOTTOM + '''
<script src="/site.js" defer></script>
</body>
</html>
'''

(root / "labs/index.html").write_text(index)
(root / "labs/whatsapp-receptionist/index.html").write_text(recep)
(root / "labs/privacy/index.html").write_text(privacy)
(root / "labs/404.html").write_text(gone)
print("labs pages written")
