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
      <a class="lab-item__media" href="/labs/whatsapp-receptionist" tabindex="-1" aria-hidden="true"><img src="/assets/tile-labs-800.webp" srcset="/assets/tile-labs-800.webp 800w, /assets/tile-labs.webp 1280w" sizes="(max-width: 900px) calc(100vw - 26px), 55vw" alt="" width="1280" height="775" loading="lazy" decoding="async" /></a>
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
  "An AI receptionist that answers your customers on WhatsApp in seconds, answers their questions, and books calls straight into the diary - tailored to your services and prices on setup. Try the live demo.",
  "/labs/whatsapp-receptionist",
  "WhatsApp AI Receptionist · a Deepanshu Labs project",
  "WhatsApp the live demo. Message the number and watch it book you a call with a real Google Meet link.") + '<body id="top" class="has-dock">\n' + SHELL_TOP + f'''<main id="main">
<section class="band" aria-labelledby="hero-h">
  <div class="band__column">
    <div class="lab-hero">
      <div>
        <div class="hang">
          <div class="swing" id="swing">
            {cord()}
            <button class="sign" id="sign" type="button" aria-pressed="false">
              <span class="card">
                <span class="face open"><small>Your WhatsApp is</small><b>Open</b><span>answered in seconds</span></span>
                <span class="face busy" aria-hidden="true"><small>Sorry, we’re</small><b>Busy</b><span>with a customer</span></span>
              </span>
              <span class="sr-only"> (tap to turn the sign over)</span>
            </button>
          </div>
          <script>
            /* the sign arrives showing BUSY and turns itself over once; this does not wait for site.js */
            (function (s, w) {{
              if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
              s.classList.add('pre'); s.setAttribute('aria-pressed', 'true');
              requestAnimationFrame(function () {{ requestAnimationFrame(function () {{
                s.classList.remove('pre');
                setTimeout(function () {{
                  s.setAttribute('aria-pressed', 'false');
                  s.dispatchEvent(new Event('turned'));
                  setTimeout(function () {{ w.classList.add('settle'); }}, 520);
                }}, 700);
              }}); }});
            }})(document.getElementById('sign'), document.getElementById('swing'));
          </script>
        </div>
        <span class="turn" id="sign-hint" aria-hidden="true"></span>
      </div>
      <div>
        <p class="lab-eyebrow"><a href="/labs">Deepanshu Labs</a> <span aria-hidden="true">/</span> WhatsApp AI Receptionist</p>
        <h1 id="hero-h">It’s 9pm. A customer just WhatsApped you. <span class="chip-word chip-word--lime chip-word--nowrap">Who answers?</span></h1>
        <p class="lede"><strong>An AI receptionist for your business.</strong> While you’re with a customer, it replies to the next one in seconds, answers their questions, and books the next step straight into the diary. Set up around your business: your services, your prices, your hours.</p>
        <div class="lab-actions">
          <a class="btn btn--solid" href="{DEMO}" target="_blank" rel="noopener">{WA}Try it on WhatsApp</a>
          <a class="btn btn--ghost" href="#how">How it works</a>
        </div>
        <p class="lab-demo"><strong>Message the number and watch it book you a call.</strong> Demo line: +91 99996 02901</p>
        <div class="lab-meta"><span class="live-chip">Demo line · Live 24/7</span><span>A <a href="/labs">Deepanshu Labs</a> project</span></div>
      </div>
    </div>
  </div>
</section>

<section class="band" id="how" aria-label="How it works">
  <div class="band__column">
    <div class="section-head">
      <div class="section-head__row">
        <svg viewBox="0 0 34 34" aria-hidden="true"><path d="M17 4a13 13 0 0 0-11.2 19.6L4 30l6.6-1.7A13 13 0 1 0 17 4z" fill="#E7FF7D" stroke="#17323A" stroke-width="1.8" stroke-linejoin="round"/></svg>
        <h2 data-reveal>Try it the way a customer would.</h2>
      </div>
      <p data-reveal>Four steps, all on WhatsApp. Nothing to install, and no real business gets your messages.</p>
    </div>
    <div class="lab-how">
      <div data-reveal>
        <ol class="steps">
          <li><span class="n" aria-hidden="true">1</span><h3>Message the number</h3><p>Open WhatsApp and say hello to +91 99996 02901. Ask it to book you a call with Deepanshu.</p></li>
          <li><span class="n" aria-hidden="true">2</span><h3>Give it a time and topic</h3><p>Pick a day and time and say what the call is about. It asks for whatever is missing - one short question, never a form.</p></li>
          <li><span class="n" aria-hidden="true">3</span><h3>Get a real Meet link</h3><p>Within minutes a Google Meet link lands in the chat, with the date, time and both names on it.</p></li>
          <li><span class="n" aria-hidden="true">4</span><h3>Show up and talk</h3><p>The same details reach Deepanshu and his calendar. The flow you just tried is the one your customers would get.</p></li>
        </ol>
        <div class="lab-how__act">
          <a class="btn btn--solid" href="{DEMO}" target="_blank" rel="noopener">{WA}Book a demo call</a>
          <span>The demo line answers 24/7.</span>
        </div>
      </div>
      <figure class="chat" data-reveal>
        <div class="chat-screen">
          <div class="chat-head"><i class="ava" aria-hidden="true">DL</i><div><b>Deepanshu Labs</b><span>AI assistant · live WhatsApp line</span></div></div>
          <ol>
            <li class="them"><span class="who">Visitor: </span>Hi, I’d like to book a call with Deepanshu this week.<time>11:02{check}</time></li>
            <li class="bot"><span class="who">Assistant: </span>Happy to set that up - what day and time works for you?<time>11:02</time></li>
            <li class="them"><span class="who">Visitor: </span>Tomorrow at 3pm<time>11:03{check}</time></li>
            <li class="bot"><span class="who">Assistant: </span>What should we cover on the call?<time>11:03</time></li>
            <li class="them"><span class="who">Visitor: </span>An AI receptionist for my salon<time>11:04{check}</time></li>
            <li class="bot payoff"><span class="who">Assistant: </span>Locked in: AI receptionist - Sam x Deepanshu, 14 Oct 2026, 3:00 PM IST. Your Google Meet link:<span class="meet"><i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5A1.5 1.5 0 0 1 5.5 6h8A1.5 1.5 0 0 1 15 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 16.5zM15 10.5l5-3v9l-5-3z"/></svg></i><span><b>Google Meet</b><span>meet.google.com/abc-defg-hij</span></span></span><time>11:04</time></li>
          </ol>
        </div>
        <figcaption class="chat-note">An example conversation. The real one is waiting on WhatsApp.</figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="band" id="expect" aria-label="What to expect">
  <div class="band__column">
    <div class="section-head">
      <div class="section-head__row">
        <svg viewBox="0 0 34 34" aria-hidden="true"><path d="M8 4h18v26l-3-2-3 2-3-2-3 2-3-2-3 2z" fill="#AFE3FF" stroke="#17323A" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 13l3 3 6-6" fill="none" stroke="#17323A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <h2 data-reveal>What to expect.</h2>
      </div>
    </div>
    <div class="receipt-grid">
      <div class="receipt promise receipt--1" data-reveal><h3>You deal with me</h3><p>One person, not an agency. The person you message is the person who builds and fixes it.</p></div>
      <div class="receipt promise receipt--2" data-reveal><h3>It sounds like your business</h3><p>Set up around your business: your services, your prices, your diary. Not a generic script.</p></div>
      <div class="receipt promise receipt--3" data-reveal><h3>You stay in charge</h3><p>It doesn’t pretend to be human: ask and it says it’s an AI assistant. And when someone books a call, you hear about it right away.</p></div>
      <div class="receipt promise receipt--4" data-reveal><h3>Try it before we talk</h3><p>The demo is live now. Test it as hard as you like, then bring me your questions.</p></div>
      <div class="receipt promise receipt--5" data-reveal><h3>Straight answers</h3><p>Plain English, honest labels, and no numbers I can’t back up.</p></div>
      <div class="receipt promise promise--cta receipt--6" data-reveal><h3>Message +91 99996 02901</h3><a class="btn btn--solid" href="{DEMO}" target="_blank" rel="noopener">{WA}Try it on WhatsApp</a></div>
    </div>
  </div>
</section>
</main>
''' + SHELL_BOTTOM + f'''<div class="dock"><a class="btn btn--lime" href="{DEMO}" target="_blank" rel="noopener">{WA}Try it on WhatsApp</a></div>

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
        <p>If you pick a quick question in the &ldquo;Say hi&rdquo; window, it is held in your browser tab for a moment to carry it to the terminal on the Sidequests page, and is cleared when you close the tab. It is not sent to us.</p>
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
