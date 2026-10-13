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
})();
