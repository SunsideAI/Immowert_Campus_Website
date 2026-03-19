(function () {
  'use strict';

  /* ── Scroll-reveal via IntersectionObserver ── */
  var targets = document.querySelectorAll('[data-animate]');

  if (targets.length) {
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      targets.forEach(function (el) { observer.observe(el); });
    } else {
      /* Fallback for older browsers */
      targets.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  /* ── Nav scroll effect ── */
  var header = document.querySelector('.site-header');
  if (header) {
    function updateHeader() {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }
})();
