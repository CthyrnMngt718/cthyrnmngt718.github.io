import { ROLE_LENSES } from '../data/profile.js';

export function initRoleLens(onChange = () => {}) {
  const buttons = [...document.querySelectorAll('[data-role-lens]')];
  const headline = document.querySelector('#heroHeadline');
  const eyebrow = document.querySelector('#heroEyebrow');
  const description = document.querySelector('#heroDescription');
  const activeText = document.querySelector('#activeLensText');
  const brandFocus = document.querySelector('#brandFocus');
  const focusField = document.querySelector('#portfolioFocusField');

  const url = new URL(location.href);
  const initial = ROLE_LENSES[url.searchParams.get('focus')] ? url.searchParams.get('focus') : 'all';

  function apply(key, push = true) {
    const lens = ROLE_LENSES[key] || ROLE_LENSES.all;
    buttons.forEach(btn => {
      const active = btn.dataset.roleLens === key;
      btn.setAttribute('aria-pressed', String(active));
    });
    if (headline) headline.textContent = lens.headline;
    if (eyebrow) eyebrow.textContent = lens.eyebrow;
    if (description) description.textContent = lens.description;
    if (activeText) activeText.textContent = lens.label;
    if (brandFocus) brandFocus.textContent = key === 'all' ? 'Front-End · UI/UX · Systems' : `${lens.label} · Portfolio Lens`;
    if (focusField) focusField.value = lens.label;

    document.querySelectorAll('[data-focus]').forEach(el => {
      const tags = el.dataset.focus.split(/\s+/);
      el.classList.toggle('lens-highlight', key !== 'all' && tags.some(t => lens.priorities.includes(t) || t === key));
    });
    document.querySelectorAll('[data-role-card]').forEach(el => el.classList.toggle('active-role', key !== 'all' && el.dataset.roleCard === key));

    if (push) {
      const u = new URL(location.href);
      if (key === 'all') u.searchParams.delete('focus'); else u.searchParams.set('focus', key);
      history.replaceState(history.state, '', `${u.pathname}${u.search}${u.hash}`);
    }
    onChange(key, lens);
  }

  buttons.forEach(btn => btn.addEventListener('click', () => apply(btn.dataset.roleLens)));
  apply(initial, false);
  return { apply, current: () => document.querySelector('[data-role-lens][aria-pressed="true"]')?.dataset.roleLens || 'all' };
}
