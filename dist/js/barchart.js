(function () {
  'use strict';

  var BARS = [
    { value: 3690, height: 0.54 },
    { value: 4890, height: 0.72 },
    { value: 5340, height: 0.86 },
    { value: 5780, height: 1.0  },
  ];

  var MAX_H        = 270; // px — matches .barchart__bars-wrap height in CSS
  var BAR_STAGGER  = 120; // ms between each bar starting
  var BAR_DURATION = 700; // ms for each bar to grow

  var SWAY = [
    { freq: 0.0010, amp: 0.018, phase: 0.0,  freq2: 0.0006, amp2: 0.009, phase2: 1.0 },
    { freq: 0.0008, amp: 0.015, phase: 2.1,  freq2: 0.0011, amp2: 0.007, phase2: 4.2 },
    { freq: 0.0012, amp: 0.016, phase: 4.4,  freq2: 0.0007, amp2: 0.010, phase2: 2.7 },
    { freq: 0.0009, amp: 0.019, phase: 6.8,  freq2: 0.0013, amp2: 0.008, phase2: 0.5 },
  ];

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function init() {
    var container = document.getElementById('hero-chart');
    if (!container) return;

    var bars    = container.querySelectorAll('.barchart__bar');
    var values  = container.querySelectorAll('.barchart__value');
    var years   = container.querySelectorAll('.barchart__year');
    var divider = container.querySelector('.barchart__divider');
    var words   = container.querySelectorAll('.barchart__word');
    var dots    = container.querySelectorAll('.barchart__dot');

    var swayStart = null;

    function startBuilding() {
      var totalBuildTime = BARS.length * BAR_STAGGER + BAR_DURATION;

      // Build-up: animate height directly (one-shot, easeOutCubic)
      BARS.forEach(function (bar, i) {
        setTimeout(function () {
          var start = performance.now();
          function step(now) {
            var t     = Math.min((now - start) / BAR_DURATION, 1);
            var h     = bar.height * MAX_H * easeOutCubic(t);
            bars[i].style.height   = h + 'px';
            values[i].style.bottom = (h + 8) + 'px';
            if (t >= 0.4) {
              values[i].classList.add('is-visible');
              years[i].classList.add('is-visible');
            }
            if (t < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }, i * BAR_STAGGER);
      });

      setTimeout(function () {
        divider.classList.add('is-visible');
      }, totalBuildTime + 100);

      words.forEach(function (word, i) {
        setTimeout(function () {
          word.classList.add('is-visible');
          if (dots[i]) dots[i].classList.add('is-visible');
        }, totalBuildTime + 250 + i * 200);
      });

      // Lock final heights, then hand off sway to transform (GPU layer, no reflow)
      setTimeout(function () {
        BARS.forEach(function (bar, i) {
          var finalH = bar.height * MAX_H;
          bars[i].style.height   = finalH + 'px';
          values[i].style.bottom = (finalH + 8) + 'px';
        });
        swayStart = performance.now();
        startSway();
      }, totalBuildTime + 300);
    }

    function startSway() {
      // Uses transform: scaleY — compositor-only, zero layout cost → silky smooth
      function loop(now) {
        var tick = now - swayStart;
        for (var i = 0; i < BARS.length; i++) {
          var s = SWAY[i];
          var f = 1
            + Math.sin(tick * s.freq  + s.phase)  * s.amp
            + Math.sin(tick * s.freq2 + s.phase2) * s.amp2;
          bars[i].style.transform = 'scaleY(' + f.toFixed(5) + ')';
        }
        requestAnimationFrame(loop);
      }
      requestAnimationFrame(loop);
    }

    var obs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        obs.disconnect();
        startBuilding();
      }
    }, { threshold: 0.3 });
    obs.observe(container);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
