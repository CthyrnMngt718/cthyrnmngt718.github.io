import { PROJECTS } from '../data/projects.js';

export function initProjects() {
  const grid = document.querySelector('#projectGrid');
  const dialog = document.querySelector('#projectDialog');
  const content = document.querySelector('#projectDialogContent');
  let opener = null;

  function renderCards() {
    if (!grid) return;
    grid.innerHTML = PROJECTS.filter(p=>p.slug!=='rhu-morong').map(p=>`<article class="project-card" data-project-card="${p.slug}" data-project-roles="${p.roles.join(' ')}">
      <div class="project-cover"><div class="browser"><strong>${p.short}</strong></div></div>
      <div class="project-body"><small>${p.category}</small><h3>${p.title}</h3><p>${p.summary}</p><div class="project-tags">${p.stack.slice(0,5).map(s=>`<span>${s}</span>`).join('')}</div><div class="project-actions"><button type="button" data-project="${p.slug}">Quick view</button><a href="${p.fullCase}">Full case study</a></div></div>
    </article>`).join('');
  }
  renderCards();

  function renderDialog(p) {
    content.innerHTML = `<article class="case-study">
      <div class="case-top"><span>${p.category} · ${p.year}</span><span>${p.stack.join(' · ')}</span></div>
      <h2 id="projectDialogTitle">${p.title}</h2><p class="case-lead">${p.summary}</p>
      <div class="case-grid"><section><small>CONTEXT / PROBLEM</small><h3>Why this work mattered</h3><p>${p.problem}</p></section><section><small>USERS</small><h3>Who the interface served</h3><p>${p.users}</p></section><section><small>MY RESPONSIBILITY</small><h3>Where I contributed</h3><p>${p.responsibility}</p></section><section><small>DESIGN / DEVELOPMENT DECISIONS</small><h3>Reasoning behind the work</h3><ul>${p.decisions.map(d=>`<li>${d}</li>`).join('')}</ul></section><section><small>CHALLENGE → RESPONSE</small><h3>How I approached difficulty</h3><p><strong>Challenge:</strong> ${p.challenges}</p><p><strong>Response:</strong> ${p.solution}</p></section><section><small>OUTCOME + LEARNING</small><h3>What the project proved</h3><p>${p.outcome}</p><p><strong>What I would improve today:</strong> ${p.learning}</p></section></div>
      <div class="case-actions">${p.live?`<a href="${p.live}" target="_blank" rel="noopener noreferrer">Visit project <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`:''}<a href="${p.fullCase}">Full case study <i class="fa-solid fa-arrow-right"></i></a><a href="#contact" data-dialog-contact>Discuss an opportunity</a></div>
    </article>`;
  }

  function openProject(slug, updateUrl=true, trigger=null) {
    const p = PROJECTS.find(x=>x.slug===slug); if(!p||!dialog)return;
    opener = trigger || document.activeElement;
    renderDialog(p); dialog.showModal(); document.body.classList.add('dialog-open');
    if(updateUrl){const u=new URL(location.href);u.searchParams.set('project',slug);history.pushState({project:slug},'',`${u.pathname}${u.search}${u.hash}`);}
    content.querySelector('[data-dialog-contact]')?.addEventListener('click',()=>dialog.close());
  }

  document.addEventListener('click',e=>{const btn=e.target.closest('[data-project]');if(btn)openProject(btn.dataset.project,true,btn);});
  document.querySelector('[data-dialog-close]')?.addEventListener('click',()=>dialog?.close());
  dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  dialog?.addEventListener('close',()=>{document.body.classList.remove('dialog-open');const u=new URL(location.href);u.searchParams.delete('project');history.replaceState({},'',`${u.pathname}${u.search}${u.hash}`);opener?.focus?.();});

  document.querySelectorAll('[data-project-filter]').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-project-filter]').forEach(b=>b.classList.toggle('active',b===btn));
    const key=btn.dataset.projectFilter;
    const update=()=>document.querySelectorAll('[data-project-card]').forEach(card=>card.classList.toggle('filtered-out',key!=='all'&&!card.dataset.projectRoles.split(' ').includes(key)));
    if(document.startViewTransition&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.startViewTransition(update);else update();
  }));

  const initial = new URL(location.href).searchParams.get('project'); if(initial) setTimeout(()=>openProject(initial,false),0);
  addEventListener('popstate',()=>{const slug=new URL(location.href).searchParams.get('project');if(slug&&!dialog.open)openProject(slug,false);else if(!slug&&dialog.open)dialog.close();});
}
