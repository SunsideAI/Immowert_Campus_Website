(function () {
  const stickyCta = document.querySelector('.sticky-cta');
  const heroAnchor = document.querySelector('.hero__cta-anchor');

  if (!stickyCta) return;

  // Show sticky CTA when hero CTA scrolls out of view
  if (heroAnchor && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            stickyCta.classList.remove('is-visible');
          } else {
            stickyCta.classList.add('is-visible');
          }
        });
      },
      { threshold: 0 }
    );
    observer.observe(heroAnchor);
  } else {
    // Fallback: show after scrolling 400px
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        stickyCta.classList.add('is-visible');
      } else {
        stickyCta.classList.remove('is-visible');
      }
    }, { passive: true });
  }

  // Smooth scroll on sticky CTA click
  stickyCta.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
