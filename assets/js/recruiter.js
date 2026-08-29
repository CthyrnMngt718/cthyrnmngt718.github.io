import { PROFILE } from '../data/profile.js';

export function initRecruiter() {
  const recruiter = document.querySelector('#recruiterDialog');
  const resume = document.querySelector('#resumeDialog');
  let recruiterOpener=null,resumeOpener=null;
  const toast = document.querySelector('#toast');
  const showToast = msg => { if(!toast)return;toast.textContent=msg;toast.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.classList.remove('show'),2200); };
  const copy = async text => { try{await navigator.clipboard.writeText(text);showToast('Copied to clipboard');}catch{showToast('Copy failed — please copy manually');} };

  ['#recruiterOpen','#recruiterOpenCard'].forEach(sel=>document.querySelector(sel)?.addEventListener('click',e=>{recruiterOpener=e.currentTarget;recruiter?.showModal();document.body.classList.add('dialog-open');}));
  document.querySelectorAll('[data-recruiter-close]').forEach(b=>b.addEventListener('click',()=>recruiter?.close()));
  recruiter?.addEventListener('click',e=>{if(e.target===recruiter)recruiter.close();});
  recruiter?.addEventListener('close',()=>{document.body.classList.remove('dialog-open');const u=new URL(location.href);u.searchParams.delete('recruiter');history.replaceState(history.state,'',`${u.pathname}${u.search}${u.hash}`);recruiterOpener?.focus?.();});
  document.querySelector('[data-recruiter-work]')?.addEventListener('click',()=>recruiter?.close());
  document.querySelector('[data-recruiter-contact]')?.addEventListener('click',()=>recruiter?.close());
  document.querySelector('#copyRecruiterSummary')?.addEventListener('click',()=>copy(PROFILE.recruiterSummary));
  document.querySelector('#copyRecruiterLink')?.addEventListener('click',()=>{const u=new URL(PROFILE.portfolio);u.searchParams.set('recruiter','1');copy(u.toString());});

  ['#resumePreview','#indexResume'].forEach(sel=>document.querySelector(sel)?.addEventListener('click',e=>{resumeOpener=e.currentTarget;resume?.showModal();document.body.classList.add('dialog-open');const pop=document.querySelector('#siteIndex');if(pop?.matches(':popover-open'))pop.hidePopover();}));
  document.querySelectorAll('[data-resume-close]').forEach(b=>b.addEventListener('click',()=>resume?.close()));
  resume?.addEventListener('click',e=>{if(e.target===resume)resume.close();});
  resume?.addEventListener('close',()=>{document.body.classList.remove('dialog-open');resumeOpener?.focus?.();});

  const share = async () => {
    const data={title:'Cathyrine Menguito — Portfolio',text:'Front-End · UI/UX · System Development portfolio',url:PROFILE.portfolio};
    if(navigator.share){try{await navigator.share(data);return;}catch(e){if(e.name==='AbortError')return;}}
    copy(PROFILE.portfolio);
  };
  ['#shareProfile','#footerShare'].forEach(sel=>document.querySelector(sel)?.addEventListener('click',share));
  document.querySelector('#indexCopyEmail')?.addEventListener('click',()=>{copy(PROFILE.email);const pop=document.querySelector('#siteIndex');if(pop?.matches(':popover-open'))pop.hidePopover();});

  const saveVCard = () => {
    const v=`BEGIN:VCARD\nVERSION:3.0\nFN:${PROFILE.name}\nTITLE:${PROFILE.title}\nEMAIL:${PROFILE.email}\nTEL:${PROFILE.phone.replace(/\s/g,'')}\nURL:${PROFILE.portfolio}\nADR:;;;Morong;Rizal;;Philippines\nEND:VCARD`;
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([v],{type:'text/vcard'}));a.download='Cathyrine-Menguito.vcf';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);showToast('Contact card downloaded');
  };
  ['#saveContact','#footerSaveContact'].forEach(sel=>document.querySelector(sel)?.addEventListener('click',saveVCard));

  if(new URL(location.href).searchParams.get('recruiter')==='1')setTimeout(()=>{recruiter?.showModal();document.body.classList.add('dialog-open');},0);
  return {showToast};
}
