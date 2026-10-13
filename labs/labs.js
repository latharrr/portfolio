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
    if (sign.classList.contains('pre')) {
      // the page arrived showing BUSY (set before first paint); turn it over once
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        sign.classList.remove('pre');
        setTimeout(function () { turn(false); }, 700);
      }); });
    }
    say();
  }

  /* is the demo line answering this minute? 08:00 to 23:30 IST, every day */
  var now = document.getElementById('demo-now');
  if (now) {
    var tick = function () {
      var p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
      var h = 0, m = 0;
      p.forEach(function (x) { if (x.type === 'hour') h = Number(x.value) % 24; if (x.type === 'minute') m = Number(x.value); });
      var mins = h * 60 + m, open = mins >= 480 && mins < 1410;
      now.hidden = false;
      now.dataset.open = String(open);
      now.textContent = open ? 'Open now' : 'Closed now, opens 08:00 IST';
    };
    tick(); setInterval(tick, 60000);
  }
})();
