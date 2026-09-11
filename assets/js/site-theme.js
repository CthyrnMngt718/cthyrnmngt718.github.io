const key='cm-theme-v5';
const meta=document.querySelector('meta[name="theme-color"]');
function themeValue(){try{return localStorage.getItem(key)||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}catch{return 'dark'}}
function apply(theme,persist=true){document.documentElement.dataset.theme=theme;if(meta)meta.content=theme==='light'?'#f5f2eb':'#07110d';const b=document.querySelector('.standalone-theme-toggle');if(b){b.textContent=theme==='light'?'☀':'☾';b.setAttribute('aria-label',theme==='light'?'Switch to dark mode':'Switch to light mode');b.title=theme==='light'?'Switch to dark mode':'Switch to light mode'}if(persist)try{localStorage.setItem(key,theme)}catch{}}
apply(themeValue(),false);
addEventListener('DOMContentLoaded',()=>{
  const header=document.querySelector('header .wrap');
  if(header&&!document.querySelector('.standalone-theme-toggle')){
    const existing=[...header.children].find(el=>el!==header.querySelector('.brand'));
    const controls=document.createElement('div');controls.className='standalone-controls';
    if(existing)controls.append(existing);
    const btn=document.createElement('button');btn.type='button';btn.className='standalone-theme-toggle';controls.append(btn);header.append(controls);apply(document.documentElement.dataset.theme,false);
    btn.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='light'?'dark':'light';const change=()=>apply(next,true);if(document.startViewTransition&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.startViewTransition(change);else change()});
  } else if(!document.querySelector('.standalone-theme-toggle')){
    const btn=document.createElement('button');btn.type='button';btn.className='standalone-theme-toggle';btn.style.cssText='position:fixed;right:16px;top:16px;z-index:50';document.body.append(btn);apply(document.documentElement.dataset.theme,false);btn.addEventListener('click',()=>apply(document.documentElement.dataset.theme==='light'?'dark':'light',true));
  }
  const prog=document.createElement('div');prog.className='standalone-progress';document.body.append(prog);
  const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;prog.style.width=`${max>0?Math.min(100,scrollY/max*100):0}%`};addEventListener('scroll',()=>requestAnimationFrame(update),{passive:true});update();
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('main h1,.lead,.shot,.grid section').forEach((el,i)=>{el.classList.add('case-reveal');el.style.transitionDelay=`${Math.min(i*45,180)}ms`;obs.observe(el)})}
});
matchMedia('(prefers-color-scheme: light)').addEventListener?.('change',e=>{try{if(!localStorage.getItem(key))apply(e.matches?'light':'dark',false)}catch{}});
