export function initMotion() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData === true;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const reveals = [...document.querySelectorAll('[data-reveal]')];
  if (!reduce && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
    }), { threshold:.11, rootMargin:'0px 0px -7% 0px' });
    reveals.forEach((el,i) => { el.style.transitionDelay = `${Math.min((i%4)*45,135)}ms`; obs.observe(el); });
  } else reveals.forEach(el => el.classList.add('visible'));

  if (!reduce && fine) {
    const cursor = document.querySelector('#ambientCursor');
    let tx=innerWidth/2, ty=innerHeight/2, cx=tx, cy=ty, raf=0;
    const frame = () => {
      cx += (tx-cx)*.12; cy += (ty-cy)*.12;
      cursor?.style.setProperty('transform',`translate3d(${cx-260}px,${cy-260}px,0)`);
      raf = Math.abs(tx-cx)+Math.abs(ty-cy)>.5 ? requestAnimationFrame(frame) : 0;
    };
    addEventListener('pointermove', e => { tx=e.clientX;ty=e.clientY;if(!raf)raf=requestAnimationFrame(frame); }, {passive:true});

    const stage = document.querySelector('#portraitStage');
    const card = stage?.querySelector('.portrait-card');
    stage?.addEventListener('pointermove', e => {
      const r=stage.getBoundingClientRect(), nx=(e.clientX-r.left)/r.width-.5, ny=(e.clientY-r.top)/r.height-.5;
      if(card) card.style.transform=`perspective(1200px) rotateY(${nx*4.5}deg) rotateX(${-ny*3.5}deg)`;
    });
    stage?.addEventListener('pointerleave',()=>{if(card)card.style.transform='';});

    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.07}px,${(e.clientY-r.top-r.height/2)*.07}px)`;});
      el.addEventListener('pointerleave',()=>el.style.transform='');
    });
  }

  document.addEventListener('visibilitychange', () => {
    document.documentElement.classList.toggle('page-hidden', document.hidden);
  });
}
