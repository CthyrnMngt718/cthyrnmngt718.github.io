export function initPWA(showToast=()=>{}) {
  const installButton=document.querySelector('#installButton');let promptEvent=null;
  addEventListener('beforeinstallprompt',e=>{e.preventDefault();promptEvent=e;if(installButton)installButton.hidden=false;});
  installButton?.addEventListener('click',async()=>{if(!promptEvent)return;promptEvent.prompt();await promptEvent.userChoice;promptEvent=null;installButton.hidden=true;});

  if(!('serviceWorker'in navigator))return;
  navigator.serviceWorker.register('./sw.js').then(reg=>{
    const updateToast=document.querySelector('#updateToast'),updateNow=document.querySelector('#updateNow');
    const announce=worker=>{if(!worker)return;if(updateToast)updateToast.hidden=false;updateNow?.addEventListener('click',()=>worker.postMessage({type:'SKIP_WAITING'}),{once:true});};
    if(reg.waiting)announce(reg.waiting);
    reg.addEventListener('updatefound',()=>{const worker=reg.installing;worker?.addEventListener('statechange',()=>{if(worker.state==='installed'&&navigator.serviceWorker.controller)announce(worker);});});
    navigator.serviceWorker.addEventListener('controllerchange',()=>location.reload());
  }).catch(()=>showToast('Offline support could not be enabled'));
}
