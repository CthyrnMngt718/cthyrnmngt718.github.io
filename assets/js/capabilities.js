import { CAPABILITIES } from '../data/profile.js';
import { PROJECTS } from '../data/projects.js';

export function renderEvidenceMatrix(role='all') {
  const host = document.querySelector('#evidenceMatrix');
  if (!host) return;
  host.innerHTML = CAPABILITIES.map(c => {
    const relevant = role === 'all' || c.roles.includes(role);
    return `<article class="evidence-row ${role!=='all'?(relevant?'lens-highlight':'lens-muted'):''}" data-capability-row="${c.id}">
      <div><small>CAPABILITY</small><h3>${c.area}</h3></div>
      <div><small>CURRENT LEVEL</small><span class="level-pill">${c.level}</span></div>
      <div><small>EVIDENCE</small><div class="evidence-list">${c.evidence.map(x=>`<span>${x}</span>`).join('')}</div></div>
    </article>`;
  }).join('');
}

export function initJobMatcher() {
  const textarea = document.querySelector('#jobDescription');
  const results = document.querySelector('#jobMatchResults');
  const run = document.querySelector('#runRoleMatch');
  const clear = document.querySelector('#clearRoleMatch');
  if (!textarea || !results) return;

  const vocab = {
    uiux:['ui','ux','user experience','interface','wireframe','design','figma','usability','prototype','visual hierarchy','responsive'],
    frontend:['front-end','frontend','html','css','javascript','bootstrap','responsive','web','accessibility','component'],
    systems:['php','mysql','database','system','crud','backend','records','forms','sql','application'],
    coordination:['client','communication','requirements','coordination','stakeholder','support','project','documentation','team','collaboration'],
    support:['troubleshooting','support','documentation','testing','hardware','software','technical']
  };
  function match() {
    const text = textarea.value.toLowerCase().trim();
    if (!text) { results.innerHTML='<small>Paste a job description first.</small>'; return; }
    const matched = Object.entries(vocab).map(([key,words]) => ({key,hits:words.filter(w=>text.includes(w))})).filter(x=>x.hits.length).sort((a,b)=>b.hits.length-a.hits.length);
    if (!matched.length) { results.innerHTML='<small>No obvious keyword overlap found. Review the full portfolio instead of relying on a score.</small>'; return; }
    const capHtml = matched.map(m => {
      const cap = CAPABILITIES.find(c=>c.id===m.key);
      return cap ? `<div class="match-group"><strong>${cap.area}</strong><div>${cap.skills.slice(0,5).map(x=>`<span>${x}</span>`).join('')}</div></div>` : '';
    }).join('');
    const projectHtml = PROJECTS.filter(p => p.roles.some(r=>matched.some(m=>m.key===r))).slice(0,4).map(p=>`<span>${p.title}</span>`).join('');
    results.innerHTML = `${capHtml}<div class="match-group"><strong>Relevant project evidence</strong><div>${projectHtml}</div></div>`;
  }
  run?.addEventListener('click',match);
  clear?.addEventListener('click',()=>{textarea.value='';results.innerHTML='<small>Relevant evidence will appear here.</small>';textarea.focus();});
}
