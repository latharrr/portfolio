// living.js: the living motion layer, shared by every page (home has its own extra choreography).
// Lenis drives scroll; gsap.ticker runs Lenis, the section choreography and one fixed WebGL scene
// (glass shards that morph between formations, a planet that wipes each section into the next colour,
// and a sphere of project thumbnails). Sections declare data-bg, data-theme and data-shape in the markup.
const d = document, root = d.documentElement, body = d.body;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const PHONE = matchMedia('(max-width: 759px)').matches;
const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
const { gsap, ScrollTrigger, SplitText, Lenis } = window;
const $ = (s, el = d) => el.querySelector(s), $$ = (s, el = d) => [...el.querySelectorAll(s)];
const clamp01 = (v) => Math.max(0, Math.min(1, v));

accordion();
if (reduce || !gsap || !ScrollTrigger || !SplitText || !Lenis) root.classList.remove('gsap-wait');
else start();

/* ---------- FAQ accordion: height auto via GSAP, one open at a time (works with motion off too) ---------- */
function accordion() {
  const list = $('.faq'); if (!list) return;
  const items = $$('.faq-item', list);
  const set = (item, open, instant) => {
    item.classList.toggle('open', open);
    $('.faq-q', item).setAttribute('aria-expanded', String(open));
    const a = $('.faq-a', item);
    if (instant || reduce || !gsap) { a.style.height = open ? 'auto' : '0px'; return; }
    gsap.to(a, { height: open ? 'auto' : 0, duration: open ? .37 : .27, ease: open ? 'power2.inOut' : 'power2.out',
      onComplete: () => ScrollTrigger && ScrollTrigger.refresh() });
  };
  list.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq-q'); if (!btn) return;
    const item = btn.closest('.faq-item'), open = !item.classList.contains('open');
    items.forEach((x) => { if (x !== item && x.classList.contains('open')) set(x, false); });
    set(item, open); btn.focus();
  });
  items.forEach((it, i) => set(it, i === 0, true));
}

async function start() {
  root.classList.add('lm');
  gsap.registerPlugin(ScrollTrigger, SplitText);

  /* ---------- Lenis + shared velocity ---------- */
  const lenis = new Lenis({ lerp: .1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  const V = { v: 0, dir: 1 };
  let lastFr = -1;
  gsap.ticker.add(() => {
    V.v += ((lenis.velocity || 0) - V.v) * .1;
    if (lenis.direction) V.dir = lenis.direction;
    const fr = Math.round(Math.min(6, Math.abs(V.v) * .12) * 10) / 10;
    if (fr !== lastFr) { lastFr = fr; root.style.setProperty('--fr', fr + 'px'); }
  });
  d.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return;
    const id = a.getAttribute('href'); if (id.length < 2) return;
    const t = d.querySelector(id); if (!t) return;
    e.preventDefault(); lenis.scrollTo(t, { offset: -16 });
  });
  new MutationObserver(() => body.classList.contains('menu-open') ? lenis.stop() : lenis.start())
    .observe(body, { attributes: true, attributeFilter: ['class'] });
  // work page filters move tiles around: re-measure triggers after each filter click
  d.addEventListener('click', (e) => { if (e.target.closest('[data-f]')) setTimeout(() => ScrollTrigger.refresh(), 80); });

  await d.fonts.ready; // split text only after the real fonts are in, so lines measure right

  tagSections();
  const secs = $$('.ls').map((el) => ({ el, bg: el.dataset.bg, theme: el.dataset.theme, shape: el.dataset.shape }));
  const shared = { heroWipe: 0, pinAngle: 0, orbitE: 0 };
  const mask = (split) => (split.masks || []).forEach((m) => m.classList.add('mask-pad'));
  const once = (trigger, start = 'top 88%') => ({ trigger, start, once: true });
  // rise-in for repeated blocks; anything already scrolled past is shown at once so nothing stays hidden
  const rise = (els, y = 50) => {
    if (!els.length) return;
    gsap.set(els, { autoAlpha: 0, y });
    ScrollTrigger.batch(els, { start: 'top 92%', once: true, onEnter: (b) => gsap.to(b, { autoAlpha: 1, y: 0, stagger: .1, duration: .75, ease: 'power3.out' }) });
    els.forEach((el) => { if (el.getBoundingClientRect().bottom < 0) gsap.set(el, { autoAlpha: 1, y: 0 }); });
  };

  /* ---------- hero ---------- */
  if ($('.hero .li')) homeHero(shared, V);
  else pageHero();

  /* ---------- giant headlines mask in by line, once ---------- */
  $$('.h2, .h2--s, .prose h2, .next h2').filter((h) => !h.closest('.hero, .phero') && !h.classList.contains('type-h') && !h.classList.contains('certs-h')).forEach((h) => {
    const s = new SplitText(h, { type: 'lines', mask: 'lines' }); mask(s);
    gsap.from(s.lines, { yPercent: 110, duration: 1, ease: 'expo.out', stagger: .1, scrollTrigger: once(h) });
  });

  /* ---------- home-only choreography (each block runs only if its section exists) ---------- */
  if ($('.st-a')) statement();
  if ($('.type-h')) tension();
  if ($('.certs-track')) certs();
  if ($('.trow')) tenure();
  if ($('.how-b')) how(shared, V);
  if ($('.orbit-p')) orbitText(shared);

  /* ---------- stats: cards rise and straighten, numbers count up once to the written figure ---------- */
  $$('.stats').forEach((s) => {
    gsap.from(s.children, { y: 80, rotation: 2, autoAlpha: 0, duration: 1, ease: 'power3.out', stagger: .12, scrollTrigger: once(s, 'top 85%') });
    ScrollTrigger.create({ ...once(s, 'top 78%'), onEnter: () => $$('[data-count]', s).forEach(countUp) });
  });
  $$('[data-count]').filter((el) => !el.closest('.stats')).forEach((el) => ScrollTrigger.create({ ...once(el, 'top 85%'), onEnter: () => countUp(el) }));

  /* ---------- cards: staggered rise (home: different offsets, scrubbed), tilt + glare on hover ---------- */
  $$('.cards').forEach((grid) => {
    const cs = $$('.card', grid);
    if (grid.closest('#expertise')) [140, 60, 200, 100].forEach((off, i) => cs[i] && gsap.fromTo(cs[i], { y: off }, { y: 0, ease: 'none',
      scrollTrigger: { trigger: grid, start: 'top bottom', end: 'bottom 75%', scrub: .6 } }));
    else rise(cs, 70);
    if (FINE) cs.filter((c) => c.matches('a')).forEach(tilt);
  });

  /* ---------- project tiles: clip-path curtain, image settles 1.15 to 1, title letters rise ---------- */
  const filterable = !!d.getElementById('filters');
  $$('.proj').forEach((p) => {
    const img = $('img', p), h = $('h3', p);
    const t = h ? new SplitText(h, { type: 'lines,chars', mask: 'lines' }) : null; if (t) mask(t);
    if (!filterable) gsap.set(p, { clipPath: 'inset(100% 0% 0% 0% round 24px)' });
    if (t) gsap.set(t.chars, { yPercent: 110 });
    ScrollTrigger.create({ ...once(p), onEnter: () => {
      if (!filterable) gsap.to(p, { clipPath: 'inset(0% 0% 0% 0% round 24px)', duration: 1.1, ease: 'power3.out' });
      if (t) gsap.to(t.chars, { yPercent: 0, duration: .8, ease: 'power3.out', stagger: .025, delay: filterable ? 0 : .35 });
    } });
    if (p.getBoundingClientRect().bottom < 0) { gsap.set(p, { clipPath: 'none' }); if (t) gsap.set(t.chars, { yPercent: 0 }); }
    if (img) gsap.fromTo(img, { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: p, start: 'top bottom', end: 'bottom 55%', scrub: true } });
  });

  /* ---------- case-study shots: curtain, then the image settles with scroll ---------- */
  $$('.shot').forEach((s) => {
    const img = $('img', s);
    gsap.fromTo(s, { clipPath: 'inset(100% 0% 0% 0% round 24px)' }, { clipPath: 'inset(0% 0% 0% 0% round 24px)', duration: 1.1, ease: 'power3.out', scrollTrigger: once(s, 'top 90%') });
    if (img) gsap.fromTo(img, { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: s, start: 'top bottom', end: 'bottom 50%', scrub: true } });
  });

  /* ---------- blocks rise in one at a time ---------- */
  rise($$('.badge, .skill, .tile, .panel, .contact-card, .tl-item, .row, .facts > div, .longform > article, .prose > p, .prose > ul, .toc, .faq-end, .trow, .chat .msg')
    .filter((el) => !el.closest('.certs, .hero, .phero, .how')));
  rise($$('.faq-item'), 40);

  /* ---------- statements fill word by word (time-based, so they always reach full contrast) ---------- */
  $$('[data-fill]').forEach((p) => {
    const w = new SplitText(p, { type: 'words' }).words;
    gsap.fromTo(w, { opacity: .15 }, { opacity: 1, stagger: .05, duration: .3, ease: 'none', scrollTrigger: once(p, 'top 80%') });
  });

  /* ---------- closing CTA: headline letters rise, contact line follows ---------- */
  if ($('#cta-h')) {
    const ch = new SplitText('#cta-h', { type: 'lines,chars', mask: 'lines' }); mask(ch);
    gsap.from(ch.chars, { yPercent: 110, duration: 1, ease: 'expo.out', stagger: .03, scrollTrigger: once('#cta-h', 'top 85%') });
    gsap.from('.final .tel, .final .ctas', { autoAlpha: 0, y: 24, duration: .8, ease: 'power3.out', stagger: .12, delay: .3, scrollTrigger: once('#cta-h', 'top 85%') });
  }

  /* ---------- marquees follow scroll direction and speed up with velocity ---------- */
  $$('[data-marquee]').forEach((t) => {
    let x = 0, half = t.scrollWidth / 2, hover = false, speed = 0;
    addEventListener('resize', () => { half = t.scrollWidth / 2; });
    t.parentElement.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') hover = true; });
    t.parentElement.addEventListener('pointerleave', () => { hover = false; });
    gsap.ticker.add((tm, dt) => {
      const target = hover ? 0 : (half / 26) * (1 + Math.min(5, Math.abs(V.v) * .12));
      speed += (target - speed) * .08;
      x -= (V.dir || 1) * speed * (dt / 1000);
      if (x <= -half) x += half; else if (x > 0) x -= half;
      t.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
    });
  });

  /* ---------- background state, shared by the header and the WebGL planet ---------- */
  const header = $('.header');
  const rectOf = (el) => (el.parentElement && el.parentElement.classList.contains('pin-spacer') ? el.parentElement : el).getBoundingClientRect();
  // idx = section whose colour fills the screen; active/ap = the wipe in progress and how far it has risen (0..1)
  shared.bounds = (rects) => {
    const vh = innerHeight; let idx = 0, active = -1, ap = 0;
    for (let i = 0; i < secs.length - 1; i++) {
      if (secs[i].bg === secs[i + 1].bg) { if (rects[i + 1].top <= 0) idx = i + 1; continue; }
      let p = clamp01((vh - rects[i + 1].top) / vh);
      if (i === 0) p = Math.max(p, shared.heroWipe);
      if (p >= 1) idx = i + 1; else if (p > 0 && active < 0) { active = i; ap = p; }
    }
    return { idx, active, ap };
  };
  /* header theme follows the colour behind it: the planet horizon passes the header at about 57% of a wipe */
  gsap.ticker.add(() => {
    if (!secs.length) return;
    const b = shared.bounds(secs.map((s) => rectOf(s.el)));
    let th = secs[b.idx].theme;
    if (b.active >= 0 && b.active === b.idx && b.ap >= .57) th = secs[b.active + 1].theme;
    if (header.dataset.theme !== th) header.dataset.theme = th;
  });

  addEventListener('pagehide', () => { ScrollTrigger.getAll().forEach((t) => t.kill()); lenis.destroy(); });
  ScrollTrigger.refresh();

  /* ---------- the WebGL layer: lazy, after first paint, never blocking LCP ---------- */
  if (!secs.length) return;
  const idle = window.requestIdleCallback || ((f) => setTimeout(f, 200));
  const go = () => idle(() => initGL(secs, shared, V, rectOf).catch(() => {}), { timeout: 1500 });
  if (d.readyState === 'complete') go(); else addEventListener('load', go, { once: true });

  /* ===== section choreographies ===== */

  /* home hero: lines rise in on load, slice out on scroll while pinned, then the white planet wipes */
  function homeHero(shared, V) {
    const lis = $$('.hero .li');
    const ljs = lis.map((li) => { const j = d.createElement('span'); j.className = 'lj'; while (li.firstChild) j.appendChild(li.firstChild); li.appendChild(j); return j; });
    gsap.set(lis, { yPercent: 110 });
    gsap.set('.hero .hx', { autoAlpha: 0, y: 24 });
    root.classList.remove('gsap-wait');
    whenReady(() => {
      gsap.to(lis, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: .12 });
      gsap.to('.hero .hx', { autoAlpha: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .15, delay: .45 });
    });
    gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=150%', pin: true, scrub: .6, anticipatePin: 1 } })
      .to(ljs, { yPercent: -115, stagger: .08, ease: 'power2.in', duration: .5 }, 0)
      .to('.hero .hx', { autoAlpha: 0, y: -40, stagger: .05, duration: .35 }, 0)
      .to('.scroll-badge', { autoAlpha: 0, duration: .2 }, 0)
      .to(shared, { heroWipe: 1, ease: 'none', duration: .5 }, .5);
    const spin = $('.sb-spin'); let spinA = 0;
    if (spin) gsap.ticker.add((t, dt) => { spinA += (dt / 1000) * (30 + Math.abs(V.v) * 12) * (V.dir || 1); gsap.set(spin, { rotation: spinA, svgOrigin: '60 60' }); });
  }

  /* page hero: h1 lines rise inside masks on load, then drift up as the hero leaves */
  function pageHero() {
    const lines = $$('.phero h1 .line, .hero h1 .line');
    const lis = lines.map((l) => { const li = d.createElement('span'); li.className = 'li'; while (l.firstChild) li.appendChild(l.firstChild); l.appendChild(li); return li; });
    root.classList.remove('gsap-wait');
    if (!lis.length) return;
    gsap.set(lis, { yPercent: 110 });
    whenReady(() => gsap.to(lis, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: .12 }));
    const hero = lines[0].closest('section');
    gsap.to(lis, { yPercent: -45, ease: 'none', stagger: .04, scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .6 } });
  }

  /* statement: pinned; line one masks in and out, then line two fills word by word */
  function statement() {
    const stA = new SplitText('.st-a', { type: 'lines', mask: 'lines' }); mask(stA);
    const stB = new SplitText('.st-b', { type: 'words' });
    gsap.set(stA.lines, { yPercent: 110 });
    gsap.set('.st-b', { autoAlpha: 0 });
    gsap.set(stB.words, { opacity: .15 });
    gsap.to(stA.lines, { yPercent: 0, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: '#statement', start: 'top 75%', end: 'top 15%', scrub: .6 } });
    gsap.timeline({ scrollTrigger: { trigger: '#statement', start: 'top top', end: '+=200%', pin: true, scrub: .6 } })
      .to({}, { duration: .25 })
      .to(stA.lines, { yPercent: -110, stagger: .06, duration: .4, ease: 'power2.in' })
      .set('.st-b', { autoAlpha: 1 })
      .to(stB.words, { opacity: 1, stagger: .05, duration: .25, ease: 'none' })
      .to({}, { duration: .3 });
  }

  /* tension: letters type in on a violet gradient, paragraph fills beside it */
  function tension() {
    const th = new SplitText('.type-h', { type: 'words,chars' });
    th.chars.forEach((c, i, all) => { c.style.color = mix('#6b2fff', '#b39bff', i / Math.max(1, all.length - 1)); });
    gsap.set(th.chars, { opacity: 0 });
    gsap.to(th.chars, { opacity: 1, duration: .01, stagger: .035, ease: 'none', scrollTrigger: once('.tension', 'top 70%') });
    const tp = new SplitText('.ten-p', { type: 'words' });
    gsap.fromTo(tp.words, { opacity: .15 }, { opacity: 1, stagger: .06, duration: .3, ease: 'none', delay: .6, scrollTrigger: once('.tension', 'top 70%') });
    gsap.from('.ten-badges li', { autoAlpha: 0, y: 20, stagger: .12, duration: .6, ease: 'power3.out', delay: 1.4, scrollTrigger: once('.tension', 'top 70%') });
  }

  /* certs: pinned headline, frosted cards slide across it */
  function certs() {
    const track = $('.certs-track');
    $$('.badge', track).forEach((b, i) => gsap.set(b, { rotation: [-4, 3, -2, 4][i % 4] }));
    gsap.set(track, { yPercent: -50 });
    gsap.fromTo(track, { x: () => innerWidth }, { x: () => -track.scrollWidth, ease: 'none',
      scrollTrigger: { trigger: '.certs', start: 'top top', end: () => '+=' + Math.round((track.scrollWidth + innerWidth) * .9), pin: true, scrub: .6, invalidateOnRefresh: true } });
  }

  /* tenure: the row at the centre turns violet, the preview card follows it */
  function tenure() {
    const rows = $$('.trow'), card = $('.tp-card'), inner = $('.tp-inner');
    let active = -1;
    const activate = (i) => {
      if (i === active) return; active = i;
      rows.forEach((r, j) => r.classList.toggle('on', j === i));
      if (!card || getComputedStyle($('.ten-preview')).display === 'none') return;
      const r = rows[i];
      inner.innerHTML = '<h4></h4><p></p><b></b>';
      $('h4', inner).textContent = $('h3', r).textContent;
      $('p', inner).textContent = $('p', r).textContent;
      $('b', inner).innerHTML = $('b', r).innerHTML;
      gsap.fromTo(inner, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .45, ease: 'power2.out' });
      const top0 = rows[0].offsetTop, span = rows[rows.length - 1].offsetTop + rows[rows.length - 1].offsetHeight - top0;
      gsap.to(card, { y: Math.max(0, Math.min(span - card.offsetHeight, r.offsetTop - top0 + r.offsetHeight / 2 - card.offsetHeight / 2)), duration: .7, ease: 'power3.out' });
    };
    rows.forEach((r, i) => ScrollTrigger.create({ trigger: r, start: 'top 55%', end: 'bottom 55%', onToggle: (s) => s.isActive && activate(i) }));
    activate(0);
  }

  /* how: wave ribbons drift; desktop pins and fills one block after another */
  function how(shared, V) {
    const waves = $$('.wv');
    gsap.ticker.add((t) => waves.forEach((w, i) => gsap.set(w, { x: Math.sin(t * (.35 + i * .12) + i * 1.7) * (60 + i * 20) + V.v * (i + 1) * .6 })));
    const blocks = $$('.how-b'), bw = blocks.map((b) => new SplitText($$('p', b), { type: 'words' }).words);
    if (innerWidth >= 900) {
      gsap.set(blocks.slice(1), { autoAlpha: 0, y: 40 });
      gsap.set(bw.flat(), { opacity: .15 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: '.how', start: 'top top', end: '+=' + blocks.length * 70 + '%', pin: true, scrub: .6,
        onUpdate: (s) => { shared.pinAngle = s.progress * Math.PI * 3; } } });
      blocks.forEach((b, i) => {
        if (i) tl.to(b, { autoAlpha: 1, y: 0, duration: .3 });
        tl.to(bw[i], { opacity: 1, stagger: .03, duration: .2, ease: 'none' }).to({}, { duration: .3 });
        if (i < blocks.length - 1) tl.to(b, { autoAlpha: 0, y: -40, duration: .3 });
      });
    } else {
      blocks.forEach((b, i) => gsap.fromTo(bw[i], { opacity: .15 }, { opacity: 1, stagger: .03, duration: .2, ease: 'none', scrollTrigger: once(b, 'top 80%') }));
      ScrollTrigger.create({ trigger: '.how', start: 'top bottom', end: 'bottom top', onUpdate: (s) => { shared.pinAngle = s.progress * Math.PI * 3; } });
    }
  }

  /* orbit: the thumbnail sphere explodes while the paragraph fills (desktop pins) */
  function orbitText(shared) {
    const op = new SplitText('.orbit-p', { type: 'words' });
    if (!PHONE) {
      gsap.set(op.words, { opacity: .15 });
      gsap.timeline({ scrollTrigger: { trigger: '.orbit', start: 'top top', end: '+=150%', pin: true, scrub: .6 } })
        .to(shared, { orbitE: 1, duration: 1, ease: 'power2.inOut' }, 0)
        .to(op.words, { opacity: 1, stagger: .05, duration: .3, ease: 'none' }, .2)
        .to({}, { duration: .2 });
    } else gsap.fromTo(op.words, { opacity: .15 }, { opacity: 1, stagger: .05, duration: .25, ease: 'none', scrollTrigger: once('.orbit', 'top 70%') });
  }
}

/* run after the loader (ui.js adds body.ready) */
function whenReady(fn) {
  if (body.classList.contains('ready')) return fn();
  const mo = new MutationObserver(() => { if (body.classList.contains('ready')) { mo.disconnect(); fn(); } });
  mo.observe(body, { attributes: true });
}

/* tilt up to 6 degrees with a glare that follows the cursor */
function tilt(c) {
  c.classList.add('tilt');
  const g = d.createElement('span'); g.className = 'glare'; c.appendChild(g);
  c.addEventListener('pointermove', (e) => {
    const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    gsap.to(c, { rotationY: (px - .5) * 12, rotationX: -(py - .5) * 12, transformPerspective: 900, duration: .4, ease: 'power2.out' });
    c.style.setProperty('--gx', (px * 100).toFixed(1) + '%'); c.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
  });
  c.addEventListener('pointerleave', () => gsap.to(c, { rotationX: 0, rotationY: 0, duration: .6, ease: 'power3.out' }));
}

/* pages other than home are not hand-tagged: read each section's own colour and pick a theme and shard formation */
function tagSections() {
  if ($('.ls')) return;
  $$('main > section, main > a.next').forEach((el) => {
    let bg = el.classList.contains('final') ? '#6630ff' : toHex(getComputedStyle(el).backgroundColor) || '#120042';
    el.classList.add('ls'); el.dataset.bg = bg; el.style.setProperty('--bg', bg);
    el.dataset.theme = lum(bg) > .5 ? 'light' : 'dark';
    el.dataset.shape = el.matches('.phero, .hero, .final, .next') ? 'scatter'
      : el.querySelector('.stats, .rows, .tl') ? 'domino'
      : el.querySelector('img, figure, form, .prose, .faq, .chat, .tiles, .work, .filters') ? 'hidden' : 'scatter';
  });
}
function toHex(c) {
  const m = c.match(/[\d.]+/g); if (!m || (m[3] !== undefined && +m[3] < .5)) return null;
  return '#' + m.slice(0, 3).map((v) => (+v).toString(16).padStart(2, '0')).join('');
}
function lum(h) { const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255); return .2126 * r + .7152 * g + .0722 * b; }

function countUp(el) {
  const txt = el.textContent, m = txt.match(/^([^\d]*)([\d,]+)(.*)$/); if (!m) return;
  const end = +m[2].replace(/,/g, ''), comma = m[2].includes(','), o = { v: 0 };
  gsap.to(o, { v: end, duration: 1.4, ease: 'power2.out',
    onUpdate: () => { const v = Math.round(o.v); el.textContent = m[1] + (comma ? v.toLocaleString('en-US') : v) + m[3]; },
    onComplete: () => { el.textContent = txt; const c = el.closest('.stat'); if (c) { c.classList.add('flash'); c.addEventListener('animationend', () => c.classList.remove('flash'), { once: true }); } } });
}

function mix(a, b, t) {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const A = p(a), B = p(b);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join('');
}

/* =====================================================================
   WebGL: glass shards, planet wipe, thumbnail sphere
   ===================================================================== */
async function initGL(secs, shared, V, rectOf) {
  const THREE = await import('three');
  const { RoomEnvironment } = await import('/vendor/RoomEnvironment.js');
  const canvas = d.createElement('canvas'); canvas.id = 'gl'; canvas.setAttribute('aria-hidden', 'true');
  body.prepend(canvas);
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: !PHONE, powerPreference: 'high-performance' }); }
  catch (e) { canvas.remove(); return; }
  renderer.setPixelRatio(Math.min(1.5, devicePixelRatio || 1));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture;
  const camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, .1, 300);
  camera.position.set(0, 0, 14);
  const sun = new THREE.DirectionalLight(0xffffff, 1.4); sun.position.set(5, 8, 6); scene.add(sun);

  /* shards */
  const N = PHONE ? 20 : 50;
  const tri = new THREE.Shape(); tri.moveTo(0, 1); tri.lineTo(-.866, -.5); tri.lineTo(.866, -.5); tri.closePath();
  const geo = new THREE.ExtrudeGeometry(tri, { depth: .28, bevelEnabled: true, bevelThickness: .06, bevelSize: .06, bevelSegments: 2 });
  geo.center();
  const mat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: .9, roughness: .12, thickness: .6, ior: 1.4,
    clearcoat: 1, clearcoatRoughness: .08, metalness: 0, envMapIntensity: 1.2, attenuationDistance: 2.5, attenuationColor: new THREE.Color('#6b2fff') });
  let seed = 7; const rnd = (a, b) => { seed = (seed * 16807) % 2147483647; return a + (b - a) * (seed / 2147483647); };
  const shards = [];
  for (let i = 0; i < N; i++) {
    const m = new THREE.Mesh(geo, mat); scene.add(m);
    shards.push({ m, sx: rnd(-11, 11), sy: rnd(-6.5, 6.5), sz: rnd(-9, 2), rx: rnd(0, 6.28), ry: rnd(0, 6.28), rz: rnd(0, 6.28),
      ss: rnd(.5, 1.15) * (PHONE ? .8 : 1), spx: rnd(.1, .35), spy: rnd(.1, .35), ph: rnd(0, 6.28), bob: rnd(.1, .25) });
  }
  const pose = (shape, s, i, out) => {
    if (shape === 'scatter') { out[0] = s.sx * (PHONE ? .55 : 1); out[1] = s.sy; out[2] = s.sz; out[3] = s.rx; out[4] = s.ry; out[5] = s.rz; out[6] = s.ss; return; }
    if (shape === 'domino') {
      const DN = PHONE ? 12 : 22;
      if (i < DN) { const t = i / (DN - 1); out[0] = PHONE ? -2.5 + t * 5 : -9 + t * 16; out[1] = -3.4 + t * 5; out[2] = 4 - t * 18; out[3] = .12; out[4] = -.85; out[5] = 0; out[6] = 1.25; return; }
    }
    if (shape === 'pinwheel' && i < 4) {
      const a = shared.pinAngle + i * Math.PI / 2, cx = PHONE ? 0 : -5.4, rr = PHONE ? 1.2 : 1.9;
      out[0] = cx + Math.cos(a) * rr; out[1] = Math.sin(a) * rr; out[2] = 0; out[3] = 0; out[4] = 0; out[5] = a + Math.PI / 2; out[6] = PHONE ? 1.5 : 2.4; return;
    }
    out[0] = s.sx * 1.3; out[1] = s.sy * 1.3; out[2] = s.sz; out[3] = s.rx; out[4] = s.ry; out[5] = s.rz; out[6] = 0; // hidden
  };
  const SHAPES = ['scatter', 'domino', 'pinwheel', 'hidden'];
  const W = { scatter: 1, domino: 0, pinwheel: 0, hidden: 0 };
  const TINT = { '#12003d': '#a98bff', '#ffffff': '#6b2fff', '#6bff45': '#12003d', '#6b2fff': '#ffffff', '#6630ff': '#ffffff', '#050505': '#8a63ff' };
  const tintFor = (bg) => TINT[bg] || (lum(bg) > .5 ? '#6b2fff' : '#a98bff');
  const tint = new THREE.Color('#a98bff'), tmpC = new THREE.Color(), tmpD = new THREE.Color();

  /* planet: one big flat-coloured sphere, retinted per transition, rising from below the camera */
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(40, 96, 48), new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }));
  sphere.position.z = -80; sphere.visible = false; scene.add(sphere);
  let alpha = .6;
  const fit = () => {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    const tv = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)), thz = tv * camera.aspect;
    alpha = Math.atan(Math.hypot(tv, thz)) + .1;
    const D = camera.position.z - sphere.position.z; sphere.scale.setScalar((D * Math.sin(alpha)) / 40);
  };
  fit(); addEventListener('resize', fit);

  /* thumbnail sphere (desktop only, textures load when the section is near) */
  const orbitSec = secs.find((s) => s.el.id === 'orbit');
  let orbit = null, orbitVis = 0;
  if (!PHONE && orbitSec) {
    const imgs = ['tile-proofmart-800', 'tile-gapl-800', 'tile-lputv-800', 'tile-labs-2-800', 'proofmart-1-800', 'proofmart-2-800', 'gapl-1-800', 'gapl-2-800'];
    const M = 36, group = new THREE.Group(), plane = new THREE.PlaneGeometry(1.6, 1);
    const mats = imgs.map(() => new THREE.MeshBasicMaterial({ color: 0x222233, side: THREE.DoubleSide, toneMapped: false, transparent: true }));
    const items = [];
    for (let i = 0; i < M; i++) {
      const y = 1 - 2 * (i + .5) / M, r = Math.sqrt(1 - y * y), phi = i * 2.39996;
      const dir = new THREE.Vector3(Math.cos(phi) * r, y, Math.sin(phi) * r);
      const mesh = new THREE.Mesh(plane, mats[i % mats.length]);
      mesh.position.copy(dir).multiplyScalar(4);
      mesh.lookAt(dir.clone().multiplyScalar(10));
      items.push({ mesh, dir, q0: mesh.quaternion.clone(), jit: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)) });
      group.add(mesh);
    }
    group.position.y = 1.4; group.scale.setScalar(.001); scene.add(group);
    orbit = { group, items, mats, imgs, loaded: false, qCam: new THREE.Quaternion() };
  }
  const loadOrbit = () => {
    if (!orbit || orbit.loaded) return; orbit.loaded = true;
    const loader = new THREE.TextureLoader();
    orbit.imgs.forEach((name, i) => loader.load(`/assets/${name}.webp`, (tx) => { tx.colorSpace = THREE.SRGBColorSpace; orbit.mats[i].map = tx; orbit.mats[i].color.set(0xffffff); orbit.mats[i].needsUpdate = true; }));
  };

  /* pointer parallax */
  const mouse = { x: 0, y: 0 };
  if (FINE) addEventListener('pointermove', (e) => { mouse.x = e.clientX / innerWidth * 2 - 1; mouse.y = e.clientY / innerHeight * 2 - 1; }, { passive: true });

  const out = new Float32Array(7);
  const clear = new THREE.Color();
  let time = 0, running = !d.hidden;
  d.addEventListener('visibilitychange', () => { running = !d.hidden; });

  function frame(t, dtMs) {
    if (!running) return;
    const dt = Math.min(.05, dtMs / 1000); time += dt;
    const vh = innerHeight, c = vh / 2;
    const rects = secs.map((s) => rectOf(s.el));

    /* which section owns the centre, and how far we are into handing over to the next */
    let k = 0;
    for (let i = 0; i < rects.length; i++) if (rects[i].top <= c) k = i;
    const f = k < secs.length - 1 ? clamp01((c - (rects[k].bottom - .6 * vh)) / (.6 * vh)) : 0;
    const target = { scatter: 0, domino: 0, pinwheel: 0, hidden: 0 };
    target[secs[k].shape] += 1 - f;
    if (k < secs.length - 1) target[secs[k + 1].shape] += f;
    const ease = 1 - Math.exp(-dt * 3.5);
    SHAPES.forEach((s) => { W[s] += (target[s] - W[s]) * ease; });
    tmpC.set(tintFor(secs[k].bg));
    if (k < secs.length - 1) tmpC.lerp(tmpD.set(tintFor(secs[k + 1].bg)), f);
    tint.lerp(tmpC, ease); mat.color.copy(tint).lerp(tmpD.set('#ffffff'), .55); mat.attenuationColor.copy(tint);

    /* shards: weighted blend of formations, plus idle spin, bobbing and velocity spin */
    const spinV = V.v * .0015;
    shards.forEach((s, i) => {
      let px = 0, py = 0, pz = 0, rx = 0, ry = 0, rz = 0, sc = 0, tw = 0;
      SHAPES.forEach((shape) => {
        const w = W[shape]; if (w < .001) return;
        pose(shape, s, i, out); tw += w;
        px += out[0] * w; py += out[1] * w; pz += out[2] * w; rx += out[3] * w; ry += out[4] * w; rz += out[5] * w; sc += out[6] * w;
      });
      tw = tw || 1;
      s.ix = (s.ix || 0) + dt * s.spx + spinV; s.iy = (s.iy || 0) + dt * s.spy + spinV;
      const idleK = 1 - W.pinwheel * (i < 4 ? .85 : 0);
      s.m.position.set(px / tw, py / tw + Math.sin(time * 1.2 + s.ph) * s.bob, pz / tw);
      s.m.rotation.set(rx / tw + s.ix * idleK, ry / tw + s.iy * idleK, rz / tw);
      const scl = sc / tw; s.m.scale.setScalar(scl); s.m.visible = scl > .01;
    });

    /* camera parallax */
    camera.position.x += (mouse.x * .3 - camera.position.x) * .05;
    camera.position.y += (-mouse.y * .3 - camera.position.y) * .05;
    camera.lookAt(0, 0, 0);

    /* colour and planet wipe */
    const { idx, active, ap } = shared.bounds(rects);
    clear.set(secs[idx].bg); renderer.setClearColor(clear);
    if (active >= 0 && active === idx) {
      sphere.visible = true; sphere.material.color.set(secs[active + 1].bg);
      const tv = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const ndc = -1.15 + 3.55 * ap, thetaTop = Math.atan(ndc * tv), thetaC = thetaTop - alpha;
      const D = camera.position.z - sphere.position.z;
      sphere.position.x = camera.position.x; sphere.position.y = camera.position.y + D * Math.tan(thetaC);
    } else sphere.visible = false;

    /* thumbnail sphere */
    if (orbit) {
      const r = rectOf(orbitSec.el);
      if (r.top < vh * 2.5 && r.bottom > -vh) loadOrbit();
      const on = secs[k] === orbitSec ? 1 - f : (secs[k + 1] === orbitSec ? clamp01((f - .6) / .4) : 0);
      orbitVis += (on - orbitVis) * ease;
      orbit.group.visible = orbitVis > .01;
      if (orbit.group.visible) {
        orbit.group.scale.setScalar(Math.max(.001, orbitVis));
        orbit.group.rotation.y += dt * (.25 + Math.abs(V.v) * .01);
        orbit.group.rotation.x = .18;
        const e = shared.orbitE;
        orbit.group.updateMatrixWorld();
        orbit.qCam.copy(orbit.group.quaternion).invert();
        orbit.items.forEach((it) => {
          it.mesh.position.copy(it.dir).multiplyScalar(4 + e * 9).addScaledVector(it.jit, e * 2.2);
          it.mesh.quaternion.copy(it.q0).slerp(orbit.qCam, e * .8);
        });
        orbit.mats.forEach((m) => { m.opacity = Math.min(1, orbitVis * 1.4) * (1 - e * .25); });
      }
    }

    renderer.render(scene, camera);
  }
  gsap.ticker.add(frame);
  root.classList.add('gl');
  addEventListener('pagehide', () => { gsap.ticker.remove(frame); renderer.dispose(); pmrem.dispose(); });
}
