document.addEventListener('DOMContentLoaded', () => {
  const sectionLinks = document.querySelectorAll('[data-section-link]');
  const sections = Array.from(document.querySelectorAll('.hero-stage, .section-screen'));

  sectionLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', window.location.pathname + href);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = visible.target.id;
      const nextUrl = id ? `${window.location.pathname}#${id}` : window.location.pathname;
      history.replaceState(null, '', nextUrl);
    },
    {
      threshold: [0.45, 0.6, 0.75],
      rootMargin: '-10% 0px -35% 0px'
    }
  );

  sections.forEach((section) => observer.observe(section));

  if (window.location.hash === '#home') {
    history.replaceState(null, '', window.location.pathname);
  }
});
