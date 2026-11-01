/* Decorative, progressive section motion. Visible content and navigation work without this script. */
(()=>{
  'use strict';
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(reduced.matches||!('IntersectionObserver' in window))return;
  const sections=[...document.querySelectorAll('main > section.section[id]')];
  let lastY=window.scrollY;
  let direction='down';
  let queued=false;
  window.addEventListener('scroll',()=>{
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{
      const nextY=window.scrollY;
      if(Math.abs(nextY-lastY)>7){direction=nextY>lastY?'down':'up';lastY=nextY;}
      queued=false;
    });
  },{passive:true});
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(({target,isIntersecting})=>{
      if(isIntersecting){
        target.classList.remove('cm-just-entered');
        // Restart the subtle arrival animation when returning to a section from above or below.
        void target.offsetWidth;
        document.body.dataset.scrollDirection=direction;
        target.classList.add('cm-just-entered');
      }else{
        target.classList.remove('cm-just-entered');
      }
    });
  },{threshold:.13,rootMargin:'-9% 0px -18% 0px'});
  sections.forEach(el=>observer.observe(el));
})();
