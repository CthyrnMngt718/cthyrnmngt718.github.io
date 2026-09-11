export function initMotion() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData === true;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const revealSelector = '.evidence-row,.project-card,.workflow-demo,.decision-comparison,.lab-panel,.process-grid article,.role-board article,.job-match,.timeline article,.collab-grid article,.contact-card';
  const pointerSelector = '.project-card,.lab-panel,.process-grid article,.role-board article,.collab-grid article,.evidence-row';
  const tiltSelector = '.project-card,.process-grid article,.role-board article,.collab-grid article';

  const revealObserver = (!reduce && 'IntersectionObserver' in window)
    ? new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      }), { threshold:.11, rootMargin:'0px 0px -7% 0px' })
    : null;

  const decorateReveal = (el, index = 0) => {
    if (el.dataset.motionRevealReady) return;
    el.dataset.motionRevealReady = 'true';
    if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', index % 3 === 0 ? 'up' : (index % 3 === 1 ? 'left' : 'right'));
    if (reduce || !revealObserver) el.classList.add('visible');
    else {
      el.style.transitionDelay = `${Math.min((index % 4) * 45, 135)}ms`;
      revealObserver.observe(el);
    }
  };

  const decoratePointer = el => {
    if (!fine || reduce || el.dataset.pointerReady) return;
    el.dataset.pointerReady = 'true';
    el.classList.add('pointer-surface');
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--px', `${((e.clientX-r.left)/r.width)*100}%`);
      el.style.setProperty('--py', `${((e.clientY-r.top)/r.height)*100}%`);
    });
  };

  const decorateTilt = el => {
    if (!fine || reduce || el.dataset.tiltReady) return;
    el.dataset.tiltReady = 'true';
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX-r.left)/r.width-.5;
      const ny = (e.clientY-r.top)/r.height-.5;
      el.style.setProperty('--tilt-y', `${nx*2.4}deg`);
      el.style.setProperty('--tilt-x', `${-ny*2}deg`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--tilt-y','0deg');
      el.style.setProperty('--tilt-x','0deg');
    });
  };

  const decorateRipple = el => {
    if (el.dataset.rippleReady) return;
    el.dataset.rippleReady = 'true';
    el.classList.add('ui-ripple-host');
    el.addEventListener('pointerdown', event => {
      if (reduce) return;
      const rect = el.getBoundingClientRect();
      const dot = document.createElement('span');
      dot.className = 'ui-ripple';
      dot.style.left = `${event.clientX - rect.left}px`;
      dot.style.top = `${event.clientY - rect.top}px`;
      el.appendChild(dot);
      dot.addEventListener('animationend', () => dot.remove(), { once:true });
    });
  };

  const scan = (scope = document) => {
    const reveals = [...(scope.matches?.(revealSelector) ? [scope] : []), ...scope.querySelectorAll?.(revealSelector) || []];
    reveals.forEach(decorateReveal);
    if (fine && !reduce) {
      const pointers = [...(scope.matches?.(pointerSelector) ? [scope] : []), ...scope.querySelectorAll?.(pointerSelector) || []];
      pointers.forEach(decoratePointer);
      const tilts = [...(scope.matches?.(tiltSelector) ? [scope] : []), ...scope.querySelectorAll?.(tiltSelector) || []];
      tilts.forEach(decorateTilt);
    }
    const rippleSelector = '.primary-cta,.secondary-cta,.icon-btn,.submit-btn,.project-actions a,.project-actions button,.role-lens-buttons button,.contact-mode button';
    const ripples = [...(scope.matches?.(rippleSelector) ? [scope] : []), ...scope.querySelectorAll?.(rippleSelector) || []];
    ripples.forEach(decorateRipple);
  };

  document.querySelectorAll('[data-reveal]').forEach((el,i) => decorateReveal(el,i));
  scan(document);
  const mutation = new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
    if (node.nodeType === 1) scan(node);
  })));
  mutation.observe(document.body,{childList:true,subtree:true});

  if ('IntersectionObserver' in window) {
    const sectionObs = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-in-view', entry.isIntersecting)), { threshold:.08, rootMargin:'-10% 0px -12% 0px' });
    document.querySelectorAll('.section-block').forEach(el => sectionObs.observe(el));
    const stepObs = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-active-step');
      else if (!reduce) entry.target.classList.remove('is-active-step');
    }), { threshold:.42, rootMargin:'-18% 0px -30% 0px' });
    document.querySelectorAll('.story-steps article,.timeline article').forEach(el => stepObs.observe(el));
  }

  if (!reduce && fine) {
    const cursor = document.querySelector('#ambientCursor');
    let tx=innerWidth/2,ty=innerHeight/2,cx=tx,cy=ty,raf=0;
    const frame=()=>{cx+=(tx-cx)*.12;cy+=(ty-cy)*.12;cursor?.style.setProperty('transform',`translate3d(${cx-260}px,${cy-260}px,0)`);raf=Math.abs(tx-cx)+Math.abs(ty-cy)>.5?requestAnimationFrame(frame):0};
    addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;if(!raf)raf=requestAnimationFrame(frame)},{passive:true});
    const stage=document.querySelector('#portraitStage');const card=stage?.querySelector('.portrait-card');
    stage?.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect(),nx=(e.clientX-r.left)/r.width-.5,ny=(e.clientY-r.top)/r.height-.5;if(card)card.style.transform=`perspective(1200px) rotateY(${nx*4.5}deg) rotateX(${-ny*3.5}deg)`});
    stage?.addEventListener('pointerleave',()=>{if(card)card.style.transform=''});
    document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.07}px,${(e.clientY-r.top-r.height/2)*.07}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
  }

  document.addEventListener('visibilitychange',()=>document.documentElement.classList.toggle('page-hidden',document.hidden));
}
