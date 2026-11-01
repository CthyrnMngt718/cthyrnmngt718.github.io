/* Cathyrine Menguito · Production behavior bundle. Feature modules are IIFEs and progressive. */

/* -------- site.js -------- */
/* Cathyrine Menguito — Interactive Portfolio, framework-free and keyboard accessible. */
(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  const doc = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const PROJECTS = {"rhu-morong":{"short":"RHU Morong Health System","category":"Healthcare · Academic team project","role":"Responsive interface architecture, UI/UX decisions, workflow design, and collaboration on backend integration.","stack":["PHP","MySQL","Responsive UI","UI/UX"],"number":"01","title":"RHU Morong Health System","description":"A healthcare management system for the Rural Health Unit of Morong, Rizal, built to improve patient intake, appointment scheduling, and record-management workflows.","url":"/work/rhu-morong/","image":"/assets/images/projects/rhu-morong/showcase.webp","gallery":[{"path":"/assets/images/projects/rhu-morong/screen-01.webp","caption":"Public-facing sign-in interface"},{"path":"/assets/images/projects/rhu-morong/screen-02.webp","caption":"Administrative dashboard overview"},{"path":"/assets/images/projects/rhu-morong/screen-03.webp","caption":"Health center management view"}]},"mbmis":{"short":"Menguito Businesses MIS","category":"Business operations · Full-stack","role":"Full-stack application development covering interfaces, PHP/MySQL operations, role-aware access, system modules, testing, and deployment.","stack":["Full-stack","PHP","MySQL","Bootstrap"],"number":"02","title":"Menguito Businesses MIS","description":"A full-stack management information system built to bring Menguito Businesses operations, records, services, assets, collections, financial information, and role-based workspaces into one secure web platform.","url":"/work/mbmis/","image":"/assets/images/projects/mbmis/showcase.webp","gallery":[{"path":"/assets/images/projects/mbmis/screen-01.webp","caption":"Menguito Businesses access screen"},{"path":"/assets/images/projects/mbmis/screen-02.webp","caption":"Business dashboard and navigation"},{"path":"/assets/images/projects/mbmis/screen-03.webp","caption":"System status module"}]},"angono-career-assessment":{"short":"Angono NHS Career Assessment","category":"Education · Independent academic project","role":"Independent database, front-end, system features, and deployment work across the project lifecycle.","stack":["Full-stack","Education","Assessment UX"],"number":"03","title":"Angono NHS Career Assessment","description":"A web-based career guidance tool for incoming Senior High School students to explore suitable SHS strands using interests, skills, and academic inclinations.","url":"/work/angono-career-assessment/","image":"/assets/images/projects/angono-career-assessment/showcase.webp","gallery":[{"path":"/assets/images/projects/angono-career-assessment/screen-01.webp","caption":"Career assessment welcome screen"},{"path":"/assets/images/projects/angono-career-assessment/screen-02.webp","caption":"Student sign-in screen"},{"path":"/assets/images/projects/angono-career-assessment/screen-03.webp","caption":"Administrator sign-in screen"}]},"ritremis":{"short":"RITREMIS","category":"Real estate · Professional collaboration","role":"Front-end implementation, UI/UX and responsive interface design in collaboration with the development team.","stack":["UI/UX","Responsive UI","Collaboration"],"number":"04","title":"RITREMIS","description":"A real-estate management information platform designed to centralize property information and improve how stakeholders work with property-related data.","url":"/work/ritremis/","image":"/assets/images/projects/ritremis/showcase.webp","gallery":[{"path":"/assets/images/projects/ritremis/screen-01.webp","caption":"Administrative dashboard interface"},{"path":"/assets/images/projects/ritremis/screen-02.webp","caption":"Package and add-on management interface"}]},"howcan-i-help":{"short":"HowCan-i-Help (HCIH)","category":"Healthcare · Professional collaboration","role":"Interface implementation, user-experience improvements, front-end work, and project coordination.","stack":["UI/UX","Front-end","Collaboration"],"number":"05","title":"HowCan-i-Help","description":"A healthcare and assistance platform developed professionally at Real IT OPC to support clinic workflows and connected user needs.","url":"/work/howcan-i-help/","image":"/assets/images/projects/howcan-i-help/showcase.webp","gallery":[{"path":"/assets/images/projects/howcan-i-help/screen-01.webp","caption":"Public-facing clinic support homepage"}]}};
  const sections = [
    {title:'Home', subtitle:'Introduction', url:'/#home'},
    {title:'Expertise', subtitle:'Technical skills & specialties', url:'/#expertise'},
    {title:'Projects', subtitle:'Selected academic & professional work', url:'/#work'},
    {title:'My process', subtitle:'How I approach development', url:'/#approach'},
    {title:'About', subtitle:'Education and experience', url:'/#about'},
    {title:'Beyond My Current Stack', subtitle:'Flutter, Docker, Go, testing, cloud and Rust learning interests', url:'/#learning'},
    {title:'Contact', subtitle:'Send a message', url:'/#contact'},
    {title:'Final Resume', subtitle:'View the unmodified PDF', url:'/assets/docs/Final-Resume-Cathyrine-Menguito.pdf'},
    {title:'Resume preview', subtitle:'Open the built-in PDF viewer', url:'/resume.html'}
  ];
  const locations = [...sections, ...Object.entries(PROJECTS).map(([slug,p])=>({title:p.title, subtitle:p.category, url:p.url, terms:p.description}))];
  const safeStore = {get(key){try{return localStorage.getItem(key)}catch{return null}},set(key,v){try{localStorage.setItem(key,v)}catch{}}};

  // Theme state; dark is the default because it matches the HASSOU-inspired palette.
  const themeBtn = $('#themeButton');
  function setTheme(value) {
    const theme = value==='light'?'light':'dark';
    doc.dataset.theme = theme;
    if(themeBtn){themeBtn.textContent=theme==='dark'?'☀':'☾'; themeBtn.setAttribute('aria-label',theme==='dark'?'Switch to light mode':'Switch to dark mode'); themeBtn.title=theme==='dark'?'Use light theme':'Use dark theme';}
    safeStore.set('cm-theme',theme);
    const meta = $('meta[name="theme-color"]');if(meta)meta.content=theme==='dark'?'#041334':'#f3f8ff';
  }
  setTheme(safeStore.get('cm-theme') || 'dark');
  themeBtn?.addEventListener('click',()=>setTheme(doc.dataset.theme==='dark'?'light':'dark'));
  const menu = $('#menuButton'),nav = $('#primaryNav');
  function closeMenu(){if(!menu || !nav)return;nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰';menu.setAttribute('aria-label','Open navigation')}
  menu?.addEventListener('click',()=>{const expanded=nav?.classList.toggle('open')||false;menu.setAttribute('aria-expanded',String(expanded));menu.setAttribute('aria-label',expanded?'Close navigation':'Open navigation');menu.textContent=expanded?'✕':'☰';});
  $$('#primaryNav a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('click',e=>{if(nav?.classList.contains('open') && !e.target.closest('.site-header'))closeMenu()});
  window.addEventListener('resize',()=>{if(window.innerWidth>1040)closeMenu()},{passive:true});

  // Reading progress, active section, and back to top. Throttled via RAF.
  const progress=$('#readingProgress'),toTop=$('#backToTop');let scrollQueued=false;
  function updateScroll(){const remaining=document.documentElement.scrollHeight-innerHeight;const fraction=remaining>0?scrollY/remaining:0;
    if(progress)progress.style.width=(Math.min(1,Math.max(0,fraction))*100).toFixed(2)+'%';
    toTop?.classList.toggle('is-visible',scrollY>650);scrollQueued=false;}
  window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateScroll)}},{passive:true});updateScroll();
  toTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduce.matches?'auto':'smooth'}));
  if('IntersectionObserver' in window) {
    const sectionEls=$$('main > section[id]');
    const activeObserver=new IntersectionObserver(entries=>{
      for(const entry of entries){if(entry.isIntersecting){$$('#primaryNav a').forEach(a=>{
        const anchor=(a.getAttribute('href')||'').split('#')[1]||'';const current=anchor===entry.target.id;a.classList.toggle('active',current);
        if(current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
      });}}
    },{rootMargin:'-24% 0px -62% 0px',threshold:0});sectionEls.forEach(el=>activeObserver.observe(el));
  }
  // Reveal elements after observing. Accessibility, reduced motion and no-JS are preserved.
  if('IntersectionObserver' in window && !reduce.matches){
    const items=$$('[data-reveal]');
    doc.classList.add('motion-ready');
    const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');revealObserver.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px 20px 0px'});
    items.forEach((el,i)=>{el.style.setProperty('--reveal-delay',Math.min((i%3)*75,150)+'ms');revealObserver.observe(el)});
  }

  // The hero focus descriptor stays static to respect reading time and avoid distracting motion.
  // Mouse-follow spotlight remains understated; not enabled for touch or reduced motion.
  if(window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reduce.matches){
    $$('.interactive-surface').forEach(card=>card.addEventListener('pointermove',e=>{const rect=card.getBoundingClientRect();card.style.setProperty('--pointer-x',(e.clientX-rect.left)+'px');card.style.setProperty('--pointer-y',(e.clientY-rect.top)+'px')},{passive:true}));
  }

  // Unified filter + full-text search; featured project participates in both.
  const filters=$$('.filter'); const cards=$$('.project-card, .work-lead');
  const search=$('#projectSearch'),status=$('#projectResult'),empty=$('#projectEmpty');let activeFilter='all';
  function filterProjects(){const q=(search?.value||'').trim().toLocaleLowerCase();let shown=0;
    cards.forEach(card=>{const categories=(card.dataset.categories||'').split(' ');const text=(card.dataset.search||card.textContent||'').toLocaleLowerCase();const visible=(activeFilter==='all'||categories.includes(activeFilter)) && (!q||text.includes(q));card.hidden=!visible;if(visible)shown++;});
    filters.forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.filter===activeFilter)));
    if(status)status.textContent=shown+' of '+cards.length+' projects shown';if(empty)empty.hidden=shown>0;
  }
  filters.forEach(btn=>btn.addEventListener('click',()=>{activeFilter=btn.dataset.filter;filterProjects()}));
  search?.addEventListener('input',filterProjects);
  $('#resetProjects')?.addEventListener('click',()=>{activeFilter='all';if(search)search.value='';filterProjects();search?.focus()});
  if(cards.length)filterProjects();

  // Real-project quick views: accessible slideshow using only the uploaded screen captures.
  const projectDialog=$('#projectDialog');let lastModalOpener=null;
  const modalImg=$('#projectModalImage'),modalThumbs=$('#projectSlideThumbs');
  const lightbox=$('#projectLightbox');
  let currentSlides=[],currentSlideIndex=0,modalFocusReturn=null,dragX=null;
  const makeSlides=(project)=>[
    {path:project.image,caption:'Project showcase · actual screenshot with branded framing'},
    ...(project.gallery||[]).map(s=>({path:s.path,caption:s.caption||'Actual system screenshot'}))
  ];
  function paintSlide(index){
    if(!currentSlides.length)return;
    currentSlideIndex=(index+currentSlides.length)%currentSlides.length;
    const slide=currentSlides[currentSlideIndex];
    modalImg.src=slide.path;
    modalImg.alt=slide.caption;
    $('#projectSlideCaption').textContent=slide.caption;
    $('#projectSlideCounter').textContent=String(currentSlideIndex+1).padStart(2,'0')+' / '+String(currentSlides.length).padStart(2,'0');
    $$('.modal-carousel-thumb',modalThumbs).forEach((b,i)=>{
      b.classList.toggle('is-selected',i===currentSlideIndex);
      b.setAttribute('aria-pressed',String(i===currentSlideIndex));
      b.setAttribute('aria-label',`Show screenshot ${i+1} of ${currentSlides.length}: ${currentSlides[i].caption}`);
    });
  }
  function openProject(button){
    const project=PROJECTS[button.dataset.quick];if(!project||!projectDialog)return;
    lastModalOpener=button;
    $('#projectModalTitle').textContent=project.title;
    $('#projectModalCategory').textContent=project.category;
    $('#projectModalDescription').textContent=project.description;
    $('#projectModalRole').textContent=project.role;
    const tags=$('#projectModalTags');tags.replaceChildren();project.stack.forEach(x=>{const tag=document.createElement('span');tag.textContent=x;tags.append(tag)});
    $('#projectModalLink').href=project.url;
    currentSlides=makeSlides(project);
    modalThumbs.replaceChildren();
    currentSlides.forEach((slide,i)=>{
      const button=document.createElement('button');button.type='button';button.className='modal-carousel-thumb';
      const img=document.createElement('img');img.src=slide.path;img.alt='';img.loading='lazy';button.append(img);
      const num=document.createElement('small');num.textContent=String(i+1).padStart(2,'0');button.append(num);
      button.addEventListener('click',()=>paintSlide(i));modalThumbs.append(button);
    });
    paintSlide(0);
    if(!projectDialog.open)projectDialog.showModal();
    $('#projectSlideNext')?.focus();
  }
  $$('.quick-view,.project-image-quick').forEach(btn=>btn.addEventListener('click',()=>openProject(btn)));
  $('#projectSlidePrev')?.addEventListener('click',()=>paintSlide(currentSlideIndex-1));
  $('#projectSlideNext')?.addEventListener('click',()=>paintSlide(currentSlideIndex+1));
  projectDialog?.addEventListener('keydown',e=>{
    if(lightbox?.open)return;
    if(e.key==='ArrowLeft'||e.key==='ArrowRight'){
      // Keep arrow behavior scoped to the project dialog, not form fields.
      if(e.target.matches('input, textarea, select'))return;
      e.preventDefault();paintSlide(currentSlideIndex+(e.key==='ArrowRight'?1:-1));
    }
  });
  const openSlide=$('#projectSlideOpen');
  openSlide?.addEventListener('pointerdown',e=>{dragX=e.clientX});
  openSlide?.addEventListener('pointerup',e=>{if(dragX===null)return;const dx=e.clientX-dragX;dragX=null;if(Math.abs(dx)>45){paintSlide(currentSlideIndex+(dx<0?1:-1));openSlide.dataset.swiped='yes'}});
  openSlide?.addEventListener('click',()=>{
    if(openSlide.dataset.swiped==='yes'){delete openSlide.dataset.swiped;return}
    if(!lightbox||!currentSlides.length)return;
    modalFocusReturn=document.activeElement;
    const slide=currentSlides[currentSlideIndex];
    $('#projectLightboxImage').src=slide.path;$('#projectLightboxImage').alt=slide.caption;
    $('#projectLightboxCaption').textContent=slide.caption;
    lightbox.showModal();$('#projectLightboxClose').focus();
  });
  $('#projectLightboxClose')?.addEventListener('click',()=>lightbox?.close());
  lightbox?.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()});
  lightbox?.addEventListener('close',()=>modalFocusReturn?.focus?.());
  // One closure routine for every modal, with sensible focus restoration.
  $$('[data-close-dialog]').forEach(btn=>btn.addEventListener('click',()=>btn.closest('dialog')?.close()));
  $$('dialog').forEach(dialog=>{
    dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
    dialog.addEventListener('close',()=>{if(dialog===projectDialog)lastModalOpener?.focus()});
  });

  // Command navigation, Ctrl/Cmd+K, arrows + Enter. No external search service needed.
  const command=$('#commandDialog'),commandOpen=$('#openCommand'),commandInput=$('#commandSearch'),commandResults=$('#commandResults');
  let matching=[],selection=0,opener=null;
  const normalized = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  function paintCommands(){if(!commandResults)return;const q=normalized((commandInput?.value||'').trim());matching=locations.filter(x=>!q||normalized(`${x.title} ${x.subtitle||''} ${x.terms||''}`).includes(q)).slice(0,10);selection=Math.min(selection,Math.max(matching.length-1,0));commandResults.replaceChildren();
    if(!matching.length){const item=document.createElement('p');item.className='command-no-match';item.textContent='No results. Try a project name or section.';commandResults.append(item);return}
    matching.forEach((item,i)=>{const b=document.createElement('button');b.type='button';b.className='command-item';b.setAttribute('role','option');b.setAttribute('aria-selected',String(i===selection));b.innerHTML='<span></span><span aria-hidden="true">↗</span>';const text=b.firstElementChild;const strong=document.createElement('b');strong.textContent=item.title;const small=document.createElement('small');small.textContent=item.subtitle||'';text.append(strong,small);b.addEventListener('click',()=>navigateCommand(i));commandResults.append(b)});
  }
  function openCommand(){if(!command||command.open)return;opener=document.activeElement;selection=0;if(commandInput)commandInput.value='';paintCommands();command.showModal();commandInput?.focus()}
  function navigateCommand(index){const choice=matching[index];if(!choice)return;command?.close();location.assign(choice.url)}
  commandOpen?.addEventListener('click',openCommand);
  document.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(command?.open)command.close();else openCommand()}
    if(e.key==='Escape')closeMenu();
  });
  commandInput?.addEventListener('input',()=>{selection=0;paintCommands()});
  command?.addEventListener('keydown',e=>{
    if(e.key==='Escape'){e.preventDefault();command.close();return}
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){if(!matching.length)return;e.preventDefault();selection=(selection+(e.key==='ArrowDown'?1:-1)+matching.length)%matching.length;paintCommands();$$('.command-item',command)[selection]?.scrollIntoView({block:'nearest'});}
    if(e.key==='Enter' && (e.target===commandInput || e.target.classList.contains('command-item'))){e.preventDefault();navigateCommand(selection)}
  });
  command?.addEventListener('close',()=>opener?.focus?.());

  // 4-step process tab interface with keyboard interactions.
  const processData=[
    {label:'THE QUESTION',title:'What does the user need to accomplish?',description:'Start with goals, audiences, constraints and the actual workflow before defining screens.'},
    {label:'THE STRUCTURE',title:'What is the simplest clear path?',description:'Map tasks, data relationships, screen hierarchy and responsive behavior before implementation.'},
    {label:'THE IMPLEMENTATION',title:'How does the interface connect to the system?',description:'Build reusable interface patterns, forms and application workflows, then integrate data-backed behavior.'},
    {label:'THE REFINEMENT',title:'Does the solution work well in practice?',description:'Test common and edge cases, improve clarity, troubleshoot, and document changes for future iterations.'}
  ];
  const steps=$$('.process-tab');let processIndex=0;
  function showStep(n,focus){if(!steps.length)return;processIndex=Math.max(0,Math.min(3,n));
    steps.forEach((btn,i)=>{btn.setAttribute('aria-selected',String(i===processIndex));btn.tabIndex=i===processIndex?0:-1});
    const d=processData[processIndex];$('#processCounter').textContent=`Step 0${processIndex+1} / 04`;$('.process-stage-badge').textContent='0'+(processIndex+1);
    $('#processStageLabel').textContent=d.label;$('#processStageTitle').textContent=d.title;$('#processStageDescription').textContent=d.description;
    $('#process-panel').setAttribute('aria-labelledby',steps[processIndex].id);$('#processPrevious').disabled=processIndex===0;$('#processNext').textContent=processIndex===3?'Back to start ↻':'Next stage →';if(focus)steps[processIndex].focus();
  }
  steps.forEach((btn,i)=>{btn.addEventListener('click',()=>showStep(i,false));btn.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'||e.key==='Home'||e.key==='End'){e.preventDefault();showStep(e.key==='Home'?0:e.key==='End'?3:(i+(e.key==='ArrowRight'?1:3))%4,true)}})});
  $('#processNext')?.addEventListener('click',()=>showStep((processIndex+1)%4,false));
  $('#processPrevious')?.addEventListener('click',()=>showStep(processIndex-1,false));

  // Skill groups sourced from the original résumé's technology list.
  const skillData={
    web:{label:'Frontend and web application foundations',tags:['HTML','CSS','JavaScript','PHP','Bootstrap']},
    data:{label:'Data and system implementation',tags:['MySQL / MariaDB','SQL','phpMyAdmin','CRUD Operations','Database-backed Workflows']},
    practice:{label:'Interface practices, development and collaboration tools',tags:['Responsive Web Design','UI/UX Design','System Testing','Debugging','Documentation','VS Code','Git','GitHub','Hostinger','Microsoft Office','Google Workspace','Canva']},
    brand:{label:'Brand, logo and identity presentation',tags:['Brand Identity Concepts','Logo Design','Typography','Color Systems','Visual Style Guides','Brand Consistency','Canva','Digital Design Assets']}
  };
  const skillTabs=$$('.skill-tabs [role="tab"]');
  function showSkills(key,focus){const data=skillData[key];if(!data)return;
    skillTabs.forEach(btn=>{const selected=btn.dataset.skill===key;btn.setAttribute('aria-selected',String(selected));btn.tabIndex=selected?0:-1;if(selected)$('#skillDisplay').setAttribute('aria-labelledby',btn.id)});
    $('.skill-caption').textContent=data.label;const pills=$('#skillPills');pills.replaceChildren();data.tags.forEach(tag=>{const pill=document.createElement('span');pill.textContent=tag;pills.append(pill)});if(focus)skillTabs.find(x=>x.dataset.skill===key)?.focus();
  }
  skillTabs.forEach((btn,i)=>{btn.addEventListener('click',()=>showSkills(btn.dataset.skill,false));btn.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const n=(i+(e.key==='ArrowRight'?1:skillTabs.length-1))%skillTabs.length;showSkills(skillTabs[n].dataset.skill,true)}})});

  // Clipboard with safe fallback when running in unsupported contexts.
  const copy=$('#copyEmail'),copyNotice=$('#copyNotice');
  copy?.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText('cthyrnmngt718@gmail.com');if(copyNotice)copyNotice.textContent='Email copied ✓';}
    catch{if(copyNotice)copyNotice.textContent='Select the email above to copy it.';}
  });

  // Existing owner's Formspree action is retained. Network delivery must be tested on live deployment.
  const form=$('#contactForm'),message=$('#formMessage');
  form?.addEventListener('submit',async e=>{
    e.preventDefault();if(!form.reportValidity())return;const trap=$('[name="_gotcha"]',form);if(trap?.value)return;
    const btn=$('button[type="submit"]',form);const original=btn.textContent;btn.disabled=true;btn.textContent='Sending securely…';message.textContent='Sending your message…';message.className='form-message';
    try{const result=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
      if(!result.ok)throw new Error('The form provider did not accept the submission');
      form.reset();message.textContent='Your message was submitted successfully. Thank you for reaching out!';message.className='form-message success';
    }catch{message.textContent='Unable to send through the form right now. Please email cthyrnmngt718@gmail.com directly.';message.className='form-message error';}
    finally{btn.disabled=false;btn.textContent=original}
  });
  const year=$('#year');if(year)year.textContent=String(new Date().getFullYear());
  // Cleanup old service workers from the original green portfolio, preventing stale cached pages.
  if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations().then(regs=>regs.forEach(x=>x.unregister())).catch(()=>{});}

  // Real-system screenshot gallery, keyboard operable and without external dependencies.
  $$('.gallery-block').forEach(gallery=>{
    const main=$('.gallery-main',gallery),caption=$('.gallery-caption',gallery),counter=$('.gallery-counter',gallery);
    const thumbs=$$('.gallery-thumb',gallery);
    thumbs.forEach((btn,i)=>btn.addEventListener('click',()=>{
      if(!main)return;
      main.src=btn.dataset.image;main.alt=btn.dataset.caption||'Actual system screenshot';
      caption.textContent=btn.dataset.caption||'';
      counter.textContent=String(i+1).padStart(2,'0')+' / '+String(thumbs.length).padStart(2,'0');
      thumbs.forEach(th=>{th.classList.toggle('is-active',th===btn);th.setAttribute('aria-pressed',th===btn?'true':'false')});
    }));
    const expand=$('.gallery-expand',gallery);
    expand?.addEventListener('click',()=>{
      const dialog=document.createElement('dialog');dialog.className='screenshot-dialog';
      const close=document.createElement('button');close.type='button';close.className='dialog-close';close.textContent='✕';close.setAttribute('aria-label','Close enlarged screenshot');
      const image=document.createElement('img');image.src=main.src;image.alt=main.alt;
      dialog.append(close,image);document.body.append(dialog);
      close.addEventListener('click',()=>dialog.close());
      dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
      dialog.addEventListener('close',()=>{dialog.remove();expand.focus()});
      dialog.showModal();close.focus();
    });
  });
  // One and only one versatile up/down control on EVERY portfolio page.
  // Home jumps between named sections. Case studies and resume jump between meaningful reading landmarks.
  const prevSection=$('#sectionPrev'),nextSection=$('#sectionNext'),railPosition=$('.rail-current');
  if(prevSection&&nextSection){
    const isHome=!!$('#expertise');
    const unique=els=>els.filter((el,i)=>el&&els.indexOf(el)===i);
    const getTargets=()=>{
      if(isHome)return unique([...$$('main > section[id]'),$('#siteFooter')].filter(Boolean));
      const candidates=$$('main > .case-hero,main > .case-gallery-section,main .case-overview,main .case-grid,main .case-next,main .resume-layout,main .resume-preview,main > section,footer');
      let last=-1000;
      return unique(candidates).filter(el=>{const top=el.getBoundingClientRect().top+scrollY;if(top-last<180)return false;last=top;return true});
    };
    const activeIndex=(targets)=>{
      const y=scrollY+Math.min(innerHeight*.28,200);let selected=0;
      targets.forEach((el,i)=>{if(el.getBoundingClientRect().top+scrollY<=y)selected=i});return selected;
    };
    const jump=direction=>{
      const targets=getTargets();if(!targets.length)return;
      const here=activeIndex(targets);let next=here+direction;
      // A jump to the page's first/last landmark is always possible.
      next=Math.max(0,Math.min(next,targets.length-1));
      targets[next].scrollIntoView({behavior:reduce.matches?'auto':'smooth',block:'start'});
    };
    prevSection.addEventListener('click',()=>jump(-1));nextSection.addEventListener('click',()=>jump(1));
    let queued=false;
    const sync=()=>{queued=false;const targets=getTargets(),i=activeIndex(targets);
      prevSection.disabled=i<=0;nextSection.disabled=i>=targets.length-1;
      if(railPosition){railPosition.textContent=`${String(i+1).padStart(2,'0')}/${String(targets.length).padStart(2,'0')}`;railPosition.setAttribute('aria-label',`Section ${i+1} of ${targets.length}`)};
    };
    const queue=()=>{if(!queued){queued=true;requestAnimationFrame(sync)}};
    addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue,{passive:true});
    sync();
  }

})();
;

/* -------- experience.js -------- */
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
;

/* -------- refinement.js -------- */
/* Section motion and learning explorer; enhances content without hiding it. */
(()=>{
  'use strict';
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const header=$('#topbar')||$('.site-header');
  const sections=$$('main > section[id]');
  let oldY=scrollY, queued=false, scrollDirection='down';
  function updateHeader(){
    const y=scrollY;
    if(Math.abs(y-oldY)>3){scrollDirection=y>oldY?'down':'up';document.body.dataset.scrollDirection=scrollDirection;oldY=y;}
    header?.classList.toggle('is-condensed',y>100);
    queued=false;
  }
  addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(updateHeader)}},{passive:true});
  updateHeader();
  if(!media.matches&&'IntersectionObserver' in window){
    document.body.classList.add('motion-enhanced');
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          // Toggle to replay a small, readable entrance animation in both directions.
          entry.target.dataset.enterFrom=scrollDirection;
          entry.target.classList.add('section-active');
        }else{entry.target.classList.remove('section-active')}
      });
    },{threshold:.045,rootMargin:'-7% 0px -10% 0px'});
    sections.forEach(x=>observer.observe(x));
  }
  const roadmap={
    flutter:{name:'Flutter & Dart',category:'Applications · Language / Framework',summary:'Explore cross-platform mobile and desktop application development, with an emphasis on readable layouts, navigation and maintainable code.',items:['Widgets, layouts, and navigation','State management and application architecture','Device support, testing, and API integration'],project:'Prototype a small mobile companion app using sample data and an accessible interface.',resource:'https://docs.flutter.dev/learn'},
    docker:{name:'Docker',category:'Deployment · Containers',summary:'Learn how application containers can make local setups, testing, and deployments more consistent across environments.',items:['Container images and Dockerfiles','Volumes, networking, and Docker Compose','Reproducible local development environments'],project:'Containerize a non-sensitive sample web app and database using Docker Compose.',resource:'https://docs.docker.com/learn/paths/get-started-with-docker-containers/'},
    go:{name:'Go',category:'Backend · Programming Language',summary:'Study Go for backend services and APIs, including its approach to concurrency and the standard library.',items:['Packages, types, interfaces, and error handling','HTTP services, JSON, and database access','Testing and concurrency fundamentals'],project:'Create a small REST API for a sample inventory or task-tracking dataset.',resource:'https://go.dev/learn/'},
    automation:{name:'GitHub Actions & Playwright',category:'Quality · Developer Tools',summary:'Explore ways to automatically validate changes, run browser tests, and improve confidence in software releases.',items:['Continuous integration workflow basics','Browser testing and accessibility checks','Test reports and deployment gates'],project:'Set up a demonstration repository with automated checks and a small Playwright test suite.',resource:'https://docs.github.com/en/actions/get-started/quickstart'},
    cloud:{name:'Cloud Infrastructure',category:'Cloud · Platforms',summary:'Build a foundation in hosting, networking, security, and cost-aware deployment using introductory Azure or AWS resources.',items:['Compute, storage, networking, and identity','Environment configuration and security basics','Monitoring, budgets, and deployment approaches'],project:'Deploy a small demo application and document access controls, costs, and deployment steps.',resource:'https://learn.microsoft.com/en-us/training/azure/'},
    rust:{name:'Rust',category:'Systems · Programming Language',summary:'Explore systems programming concepts with a focus on memory safety, explicit error handling, and performance.',items:['Ownership, borrowing, and lifetimes','Pattern matching, traits, and error handling','Cargo, tests, and simple command-line programs'],project:'Build a small command-line utility and cover key behavior with tests.',resource:'https://doc.rust-lang.org/book/'}
  };
  const tabs=$$('.learning-option');
  const detail=$('#learningDetails');
  if(tabs.length&&detail){
    const heading=$('#learningLanguage'),desc=$('#learningSummary'),concepts=$('#learningConcepts'),count=$('#learningCount'),category=$('#learningCategory'),project=$('#learningProjectIdea'),resource=$('#learningResource');
    const select=(key,focus=false)=>{
      const item=roadmap[key];if(!item)return;
      const active=tabs.find(t=>t.dataset.learning===key),i=tabs.indexOf(active);
      tabs.forEach(t=>{const is=t===active;t.classList.toggle('is-current',is);t.setAttribute('aria-selected',String(is));t.tabIndex=is?0:-1;});
      detail.setAttribute('aria-labelledby',active.id);
      if(heading)heading.textContent=item.name;
      if(desc)desc.textContent=item.summary;
      if(category)category.textContent=item.category;
      if(project)project.textContent=item.project;
      if(resource)resource.href=item.resource;
      if(concepts)concepts.replaceChildren(...item.items.map(label=>{const el=document.createElement('li');el.textContent=label;return el;}));
      if(count){count.textContent=`${String(i+1).padStart(2,'0')} / ${String(tabs.length).padStart(2,'0')}`;count.setAttribute('aria-label',`Learning topic ${i+1} of ${tabs.length}`)}
      detail.classList.remove('is-changing');void detail.offsetWidth;detail.classList.add('is-changing');
      if(focus)active.focus();
    };
    tabs.forEach(tab=>{
      tab.addEventListener('click',()=>select(tab.dataset.learning));
      tab.addEventListener('keydown',e=>{
        if(!['ArrowDown','ArrowUp','ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;
        e.preventDefault();const i=tabs.indexOf(tab);let next=i;
        if(e.key==='Home')next=0;
        else if(e.key==='End')next=tabs.length-1;
        else next=(i+(['ArrowRight','ArrowDown'].includes(e.key)?1:-1)+tabs.length)%tabs.length;
        select(tabs[next].dataset.learning,true);
      });
    });
    const move=dir=>{
      const current=tabs.findIndex(tab=>tab.getAttribute('aria-selected')==='true');
      const next=(current+dir+tabs.length)%tabs.length;
      select(tabs[next].dataset.learning);
    };
    $('#learningPrev')?.addEventListener('click',()=>move(-1));
    $('#learningNext')?.addEventListener('click',()=>move(1));

  }
})();
;

/* Navigation refinements and concise interface semantics. */
(()=>{
'use strict';
const nav=document.querySelector('#primaryNav'),menu=document.querySelector('#menuButton');
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');if(menu)menu.textContent='☰';menu?.focus();}});
const contactConsent=document.querySelector('#contactForm .form-check input[type="checkbox"]');
if(contactConsent&&!contactConsent.name){contactConsent.name='consent';contactConsent.value='yes';}
})();
