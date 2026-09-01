export function initNavigation() {
  const header = document.querySelector('#siteHeader');
  const progress = document.querySelector('#pageProgress');
  const desktopNav = document.querySelector('#desktopNav');
  const navIndicator = document.querySelector('#navIndicator');
  const navLinks = [...document.querySelectorAll('.desktop-nav a, .mobile-dock a')];
  const sections = [...document.querySelectorAll('[data-section-name][id]')];
  const scrollNav = document.querySelector('#scrollNavigator');
  const prevBtn = document.querySelector('#scrollPrev');
  const nextBtn = document.querySelector('#scrollNext');
  const sectionIndex = document.querySelector('#scrollSectionIndex');
  const sectionName = document.querySelector('#scrollSectionName');
  const scrollPercent = document.querySelector('#scrollPercent');
  let currentIndex = 0;
  let ticking = false;

  const setIndicator = link => {
    if (!desktopNav || !navIndicator || getComputedStyle(desktopNav).display === 'none') return;
    if (!link) { navIndicator.style.width = '0px'; return; }
    const navRect = desktopNav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    navIndicator.style.width = `${linkRect.width}px`;
    navIndicator.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
  };

  const setCurrent = section => {
    const idx = sections.indexOf(section);
    if (idx >= 0) currentIndex = idx;
    const navTarget = ({home:null,proof:'#proof',work:'#work',thinking:'#thinking',lab:'#thinking',process:'#thinking',roles:'#thinking',journey:'#journey',about:'#journey',collaboration:'#journey',contact:'#contact'})[section.id] || null;
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      const active = navTarget ? href === navTarget : false;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    const desktopActive = document.querySelector('.desktop-nav a.active');
    setIndicator(desktopActive);
    if (sectionIndex) sectionIndex.textContent = String(currentIndex).padStart(2, '0');
    if (sectionName) sectionName.textContent = section.dataset.sectionName || section.id;
    if (prevBtn) {
      prevBtn.disabled = currentIndex <= 0;
      prevBtn.title = currentIndex > 0 ? `Previous: ${sections[currentIndex - 1].dataset.sectionName}` : 'Beginning of portfolio';
    }
    if (nextBtn) {
      nextBtn.disabled = currentIndex >= sections.length - 1;
      nextBtn.title = currentIndex < sections.length - 1 ? `Next: ${sections[currentIndex + 1].dataset.sectionName}` : 'End of portfolio';
    }
  };

  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const pct = max > 0 ? Math.min(100, scrollY / max * 100) : 0;
    if (progress) progress.style.width = `${pct}%`;
    if (scrollPercent) scrollPercent.textContent = `${Math.round(pct)}%`;
    header?.classList.toggle('scrolled', scrollY > 18);
    header?.classList.toggle('compact', scrollY > 180);
    scrollNav?.classList.toggle('visible', scrollY > 120 || currentIndex > 0);
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(updateScroll); }
  }, { passive:true });
  updateScroll();

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setCurrent(visible.target);
    }, { rootMargin:'-32% 0px -56% 0px', threshold:[0,.1,.25,.45,.7] });
    sections.forEach(s => obs.observe(s));
  } else if (sections[0]) setCurrent(sections[0]);

  const goTo = index => {
    const target = sections[Math.max(0, Math.min(sections.length - 1, index))];
    target?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'start' });
  };
  prevBtn?.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn?.addEventListener('click', () => goTo(currentIndex + 1));

  addEventListener('keydown', event => {
    if (!event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const tag = document.activeElement?.tagName;
    if (['INPUT','TEXTAREA','SELECT'].includes(tag) || document.activeElement?.isContentEditable) return;
    if (event.key === 'ArrowUp' && currentIndex > 0) { event.preventDefault(); goTo(currentIndex - 1); }
    if (event.key === 'ArrowDown' && currentIndex < sections.length - 1) { event.preventDefault(); goTo(currentIndex + 1); }
  });

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
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'light' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
      themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    }
    if (meta) meta.content = theme === 'light' ? '#f4f0e8' : '#07110d';
    localStorage.setItem('cm-theme-v5', theme);
  };
  applyTheme(preferred);
  themeToggle?.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'));

  const onResize = () => setIndicator(document.querySelector('.desktop-nav a.active'));
  addEventListener('resize', onResize, { passive:true });
  if (document.fonts?.ready) document.fonts.ready.then(onResize);

  const year = document.querySelector('#currentYear');
  if (year) year.textContent = new Date().getFullYear();
  if (sections[0]) setCurrent(sections[0]);
}
