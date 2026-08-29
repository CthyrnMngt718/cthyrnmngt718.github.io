export function initNavigation() {
  const header = document.querySelector('#siteHeader');
  const progress = document.querySelector('#pageProgress');
  const navLinks = [...document.querySelectorAll('.desktop-nav a, .mobile-dock a')];
  const sections = [...document.querySelectorAll('[data-section-name][id]')];
  let ticking = false;

  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const pct = max > 0 ? Math.min(100, scrollY / max * 100) : 0;
    if (progress) progress.style.width = `${pct}%`;
    header?.classList.toggle('scrolled', scrollY > 18);
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(updateScroll); } }, { passive:true });
  updateScroll();

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${visible.target.id}`));
    }, { rootMargin:'-38% 0px -50% 0px', threshold:[0,.15,.4,.65] });
    sections.forEach(s => obs.observe(s));
  }

  document.querySelectorAll('#siteIndex a').forEach(a => a.addEventListener('click', () => {
    const pop = document.querySelector('#siteIndex');
    if (pop?.matches(':popover-open')) pop.hidePopover();
  }));

  const themeToggle = document.querySelector('#themeToggle');
  const meta = document.querySelector('#themeColorMeta');
  const saved = localStorage.getItem('cm-theme-v5');
  const preferred = saved || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const applyTheme = theme => {
    document.documentElement.dataset.theme = theme;
    if (themeToggle) themeToggle.innerHTML = theme === 'light' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    if (meta) meta.content = theme === 'light' ? '#f4f0e8' : '#07110d';
    localStorage.setItem('cm-theme-v5', theme);
  };
  applyTheme(preferred);
  themeToggle?.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'));

  document.querySelector('#currentYear').textContent = new Date().getFullYear();
}
