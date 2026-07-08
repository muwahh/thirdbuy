// Reloop — site interactions

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollReveal();
});

/**
 * Mobile nav: toggles a dropdown panel of links on small screens
 * and closes it automatically when a link is tapped.
 */
function initMobileNav() {
  const header = document.querySelector('header');
  const toggle = document.querySelector('.nav-toggle');
  const panel = document.querySelector('.mobile-panel');

  if (!header || !toggle || !panel) return;

  toggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * Scroll reveal: fades/slides sections into view as they enter the
 * viewport. Respects prefers-reduced-motion via the .reveal CSS rules,
 * and skips entirely if IntersectionObserver isn't supported.
 */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.process-item, .grade-card, .cat-card, .warranty-item, .test-card'
  );

  if (!targets.length) return;

  targets.forEach((el) => el.classList.add('reveal'));

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}
