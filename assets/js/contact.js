import { PROFILE } from '../data/profile.js';

export function initContact(showToast=()=>{}) {
  const form=document.querySelector('#contactForm'); if(!form)return;form.noValidate=true;
  const modes=[...document.querySelectorAll('[data-contact-mode]')];
  const panels=[...document.querySelectorAll('[data-mode-panel]')];
  const message=document.querySelector('#contactMessage'), count=document.querySelector('#messageCount'), label=document.querySelector('#messageLabel');
  const status=document.querySelector('#formStatus'), submit=document.querySelector('#submitButton'), success=document.querySelector('#successPanel');
  const modeField=document.querySelector('#contactModeField'), subject=document.querySelector('#formSubject'), reference=document.querySelector('#referenceField');
  const draftStatus=document.querySelector('#draftStatus'), networkWrap=document.querySelector('.draft-status'), network=document.querySelector('#networkStatus');
  let mode='job', saveTimer=0;
  const keys={job:'cm-contact-v5-job',interview:'cm-contact-v5-interview',project:'cm-contact-v5-project',networking:'cm-contact-v5-networking'};
  const subjectMap={job:'New portfolio job opportunity',interview:'New interview invitation',project:'New portfolio project inquiry',networking:'New portfolio networking message'};
  const labelMap={job:'Opportunity details',interview:'Interview details',project:'Project brief',networking:'Message'};
  const placeholderMap={job:'Share the role, responsibilities, context, or anything helpful for understanding the opportunity.',interview:'Share the role, interview context, preferred schedule, and anything I should prepare.',project:'Describe the project, users, current workflow, main problem, and desired outcome.',networking:'Share the context for your message or collaboration idea.'};
  const buttonMap={job:'Send opportunity',interview:'Send interview invitation',project:'Send project inquiry',networking:'Send message'};

  const allNamed=()=>[...form.elements].filter(el=>el.name&&el.type!=='hidden'&&el.name!=='_gotcha');
  function saveDraft(){const data={};allNamed().forEach(el=>{data[el.name]=el.type==='checkbox'?el.checked:el.value;});localStorage.setItem(keys[mode],JSON.stringify({saved:Date.now(),data}));if(draftStatus)draftStatus.textContent='Draft saved locally';}
  function restoreDraft(){const raw=localStorage.getItem(keys[mode]);if(!raw)return;try{const parsed=JSON.parse(raw);if(Date.now()-parsed.saved>14*864e5){localStorage.removeItem(keys[mode]);return;}Object.entries(parsed.data||{}).forEach(([name,val])=>{const el=form.elements.namedItem(name);if(!el)return;if(el.type==='checkbox')el.checked=!!val;else el.value=val;});updateCount();if(draftStatus)draftStatus.textContent='Draft restored from this device';}catch{}}
  function clearCurrentDraft(){localStorage.removeItem(keys[mode]);form.reset();document.querySelector('#consent').checked=false;modeField.value=mode;subject.value=subjectMap[mode];submit.innerHTML=`<span>${buttonMap[mode]}</span><i class="fa-solid fa-paper-plane"></i>`;updateCount();if(draftStatus)draftStatus.textContent='Draft cleared';}
  function switchMode(next){saveDraft();mode=next;form.reset();document.querySelector('#consent').checked=false;modes.forEach(btn=>{const active=btn.dataset.contactMode===mode;btn.classList.toggle('active',active);btn.setAttribute('aria-selected',String(active));});panels.forEach(p=>{const active=p.dataset.modePanel===mode;p.hidden=!active;p.querySelectorAll('input,select,textarea').forEach(el=>el.disabled=!active);});modeField.value=mode;subject.value=subjectMap[mode];label.firstChild.textContent=`${labelMap[mode]} `;message.placeholder=placeholderMap[mode];submit.innerHTML=`<span>${buttonMap[mode]}</span><i class="fa-solid fa-paper-plane"></i>`;restoreDraft();clearErrors();}
  modes.forEach((btn,index)=>{btn.addEventListener('click',()=>{if(btn.dataset.contactMode!==mode)switchMode(btn.dataset.contactMode);});btn.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();let next=index;if(e.key==='ArrowLeft')next=(index-1+modes.length)%modes.length;if(e.key==='ArrowRight')next=(index+1)%modes.length;if(e.key==='Home')next=0;if(e.key==='End')next=modes.length-1;modes[next].focus();switchMode(modes[next].dataset.contactMode);});});
  form.addEventListener('input',()=>{clearTimeout(saveTimer);saveTimer=setTimeout(saveDraft,450);updateCount();});
  document.querySelector('#clearDraft')?.addEventListener('click',clearCurrentDraft);
  function updateCount(){if(count&&message)count.textContent=message.value.length;}
  panels.forEach(p=>{const active=p.dataset.modePanel===mode;p.hidden=!active;p.querySelectorAll('input,select,textarea').forEach(el=>el.disabled=!active);});updateCount();restoreDraft();

  function setNetwork(){const online=navigator.onLine;networkWrap?.classList.toggle('offline',!online);if(network)network.innerHTML=online?'<i></i> Online':'<i></i> Offline — draft preserved';}
  addEventListener('online',setNetwork);addEventListener('offline',setNetwork);setNetwork();

  const errors={contactName:'Please enter your name.',contactEmail:'Enter a valid email address.',contactMessage:'Please provide at least 20 characters of useful context.',consent:'Please confirm the consent statement.'};
  function clearErrors(){Object.keys(errors).forEach(id=>{const el=document.querySelector(`#${id}`);el?.removeAttribute('aria-invalid');const out=document.querySelector(`#${id}Error`);if(out)out.textContent='';});status.textContent='';status.className='form-status';}
  function validate(){clearErrors();let ok=true;const name=document.querySelector('#contactName'),email=document.querySelector('#contactEmail'),consent=document.querySelector('#consent');const tests=[[name,name.value.trim().length>=2],[email,/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())],[message,message.value.trim().length>=20],[consent,consent.checked]];tests.forEach(([el,pass])=>{if(pass)return;ok=false;el.setAttribute('aria-invalid','true');const out=document.querySelector(`#${el.id}Error`);if(out)out.textContent=errors[el.id];});return ok;}
  function makeRef(){const d=new Date(),date=`${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`,rand=Math.random().toString(36).slice(2,6).toUpperCase();return`CM-${date}-${rand}`;}

  form.addEventListener('submit',async e=>{
    e.preventDefault(); if(!validate()){status.textContent='Please review the highlighted fields.';status.className='form-status error';form.querySelector('[aria-invalid="true"]')?.focus();return;}
    if(!navigator.onLine){status.textContent='You are offline. Your draft is safe on this device; reconnect and try again.';status.className='form-status error';return;}
    const ref=makeRef();reference.value=ref;const focus=document.querySelector('#portfolioFocusField');if(focus)focus.value=document.querySelector('#activeLensText')?.textContent||'Balanced view';submit.disabled=true;submit.innerHTML='<span>Sending…</span><i class="fa-solid fa-spinner fa-spin"></i>';status.textContent='Sending securely through Formspree…';status.className='form-status';
    const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
    try{
      const response=await fetch(PROFILE.formspree,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'},signal:controller.signal});clearTimeout(timeout);
      let payload={};try{payload=await response.json();}catch{}
      if(response.ok){localStorage.removeItem(keys[mode]);form.hidden=true;success.hidden=false;document.querySelector('#successReference').textContent=ref;success.focus();status.textContent='';showToast('Message sent successfully');return;}
      if(response.status===429)throw new Error('Too many submissions were sent recently. Please wait a little and try again.');
      const msg=payload?.errors?.map?.(x=>x.message).filter(Boolean).join(' ')||'Formspree could not accept the message. Please review your details or use email instead.';throw new Error(msg);
    }catch(err){clearTimeout(timeout);status.textContent=err.name==='AbortError'?'The request timed out. Your draft is preserved — please retry or use email.':(err.message||'Network error. Your draft is preserved.');status.className='form-status error';submit.disabled=false;submit.innerHTML=`<span>${buttonMap[mode]}</span><i class="fa-solid fa-paper-plane"></i>`;saveDraft();}
  });

  document.querySelector('#sendAnother')?.addEventListener('click',()=>{success.hidden=true;form.hidden=false;form.reset();document.querySelector('#consent').checked=false;modeField.value=mode;subject.value=subjectMap[mode];panels.forEach(p=>{const active=p.dataset.modePanel===mode;p.hidden=!active;p.querySelectorAll('input,select,textarea').forEach(el=>el.disabled=!active);});updateCount();submit.disabled=false;submit.innerHTML=`<span>${buttonMap[mode]}</span><i class="fa-solid fa-paper-plane"></i>`;form.querySelector('input:not([type="hidden"])')?.focus();});
  document.querySelector('#copyReference')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(document.querySelector('#successReference').textContent);showToast('Reference copied');}catch{}});
}
