/* Progressive enhancements: no critical content depends on these effects. */
(() => {
  'use strict';
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  // Make the actual-image galleries navigable by thumbnail, next/previous arrow or keyboard.
  $$('.gallery-block').forEach(gallery=>{
    const thumbs=$$('.gallery-thumb',gallery);
    if(thumbs.length<2)return;
    const heading=$('.gallery-heading',gallery);
    if(heading){
      const tools=document.createElement('div');tools.className='gallery-navigator';
      const prev=document.createElement('button');prev.type='button';prev.textContent='←';prev.setAttribute('aria-label','Previous real screenshot');
      const next=document.createElement('button');next.type='button';next.textContent='→';next.setAttribute('aria-label','Next real screenshot');
      const move=step=>{
        const current=thumbs.findIndex(x=>x.classList.contains('is-active'));
        thumbs[(Math.max(0,current)+step+thumbs.length)%thumbs.length].click();
      };
      prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
      tools.append(prev,next);heading.append(tools);
      gallery.addEventListener('keydown',e=>{
        if(e.target.closest('input, textarea'))return;
        if(e.key==='ArrowLeft'||e.key==='ArrowRight'){
          e.preventDefault();move(e.key==='ArrowLeft'?-1:1);
        }
      });
    }
  });
  // Let visitors copy a deep link to a particular case study in one click.
  const caseTitle=$('.case-hero h1');
  if(caseTitle){
    const actions=$('.case-actions')||$('.case-hero .actions');
    if(actions){
      const button=document.createElement('button');button.className='btn btn-subtle share-case';button.type='button';button.textContent='Copy case-study link ⧉';
      button.addEventListener('click',async()=>{
        try{await navigator.clipboard.writeText(location.href);button.textContent='Link copied ✓'}
        catch{button.textContent='Copy URL from address bar'}
      });actions.append(button);
    }
  }
  // Lightweight interactive entrance details on top-level sections.
  // Motion is optional; content stays readable with unsupported APIs or reduced-motion settings.
  if('IntersectionObserver' in window && !reduced.matches){
    const sections=$$('main > section,main > .case-hero');
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('section-active');observer.unobserve(entry.target)}});
    },{rootMargin:'0px 0px -8% 0px',threshold:.08});
    sections.forEach((section,i)=>{section.style.setProperty('--section-number',i+1);observer.observe(section)});
  }
  // Keep dated year consistent on all pages even if original inline JS has not loaded.
  const year=$('#year');if(year)year.textContent=String(new Date().getFullYear());
})();
