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
