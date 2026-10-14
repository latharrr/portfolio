/* Deepanshu Labs. No cookies, no storage, no analytics: the privacy policy promises that. */
(function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* the sign turns over once on arrival, from BUSY to OPEN, and again whenever it is tapped */
  var sign = document.getElementById('sign'), hint = document.getElementById('sign-hint'), swing = document.getElementById('swing');
  if (sign && sign.tagName === 'BUTTON') {
    var say = function () {
      var busy = sign.getAttribute('aria-pressed') === 'true';
      sign.setAttribute('aria-label', busy ? 'Sign showing: Sorry, we’re busy with a customer. Turn the sign over.' : 'Sign showing: Your WhatsApp is open, answered in seconds. Turn the sign over.');
      if (hint) hint.textContent = busy ? 'Your door, while you work. Tap to turn it.' : 'Tap the sign to turn it.';
    };
    var settle = function () {
      if (reduce || !swing) return;
      swing.classList.remove('settle'); void swing.offsetWidth; swing.classList.add('settle');
    };
    var turn = function (to) { sign.setAttribute('aria-pressed', String(to)); say(); setTimeout(settle, 520); };
    sign.addEventListener('click', function () { turn(sign.getAttribute('aria-pressed') !== 'true'); });
    // the first turn is done by the inline script beside the sign; keep the label and hint in step with it
    sign.addEventListener('turned', say);
    say();
  }

  /* the docked plate steps aside while the closing section, which has the same plate, is on screen */
  var dock = document.querySelector('.dock'), end = document.getElementById('contact');
  if (dock && end && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { dock.classList.toggle('away', es[0].isIntersecting); }, { rootMargin: '0px 0px -80px 0px' }).observe(end);
  }

  /* the sign leans toward the pointer, like something hung on a cord */
  var door = document.querySelector('.door'), hang = document.querySelector('.hang'), sw = document.querySelector('.swing'), card = document.querySelector('.sign .card');
  if (door && hang && sw && !reduce && matchMedia('(pointer: fine)').matches) {
    var lr = 0;
    door.addEventListener('pointermove', function (e) {
      if (lr) return;
      lr = requestAnimationFrame(function () {
        lr = 0;
        var r = hang.getBoundingClientRect(), dx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / 520));
        sw.style.setProperty('--lean', (dx * -2.2).toFixed(2) + 'deg');
        if (card) card.style.setProperty('--ty', (dx * 7).toFixed(2) + 'deg');
      });
    });
    door.addEventListener('pointerleave', function () { sw.style.setProperty('--lean', '0deg'); if (card) card.style.setProperty('--ty', '0deg'); });
  }

  /* the example conversation plays through once when it scrolls into view */
  var chat = document.querySelector('.chat ol'), note = document.querySelector('.chat-note');
  if (chat && note && !reduce && 'IntersectionObserver' in window) {
    var items = [].slice.call(chat.children), timers = [];
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'replay'; btn.hidden = true; btn.textContent = 'Replay the example';
    note.insertAdjacentElement('afterend', btn);
    var play = function () {
      timers.forEach(clearTimeout); timers = [];
      items.forEach(function (li) { li.classList.remove('shown', 'typing'); });
      chat.classList.add('playing'); btn.hidden = true;
      var t = 250;
      items.forEach(function (li, k) {
        var bot = li.classList.contains('bot');
        if (bot) { timers.push(setTimeout(function () { li.classList.add('typing'); }, t)); t += k === items.length - 1 ? 1300 : 800; }
        timers.push(setTimeout(function () { li.classList.remove('typing'); li.classList.add('shown'); }, t));
        t += bot ? 750 : 650;
      });
      timers.push(setTimeout(function () { chat.classList.remove('playing'); items.forEach(function (li) { li.classList.remove('shown'); }); btn.hidden = false; }, t + 700));
    };
    btn.addEventListener('click', play);
    new IntersectionObserver(function (es, o) { if (es[0].isIntersecting) { o.disconnect(); play(); } }, { threshold: 0.35 }).observe(chat);
  }
})();
