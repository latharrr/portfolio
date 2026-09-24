/* Sub-pages: theme toggle (shares the 'dl-theme' choice with the home page) */
(() => {
  const root = document.documentElement, btn = document.getElementById('theme-toggle');
  const apply = (t) => {
    root.setAttribute('data-theme', t);
    const m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', t === 'dark' ? '#060918' : '#fffdf8');
    try { localStorage.setItem('dl-theme', t); } catch (e) {}
  };
  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return apply(next);
    const r = btn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    const rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(() => apply(next)).ready.then(() => {
      root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${rad}px at ${x}px ${y}px)`] }, { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' });
    }).catch(() => {});
  });
})();
