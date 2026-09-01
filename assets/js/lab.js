export function initLab() {
  const slider = document.querySelector('#decisionSlider');
  const stage = document.querySelector('#comparisonStage');
  slider?.addEventListener('input',()=>stage?.style.setProperty('--split',`${slider.value}%`));

  const preview = document.querySelector('#devicePreview');
  document.querySelectorAll('[data-preview-size]').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-preview-size]').forEach(b=>b.classList.toggle('active',b===btn));
    if(preview) preview.dataset.size=btn.dataset.previewSize;
  }));

  const statePreview=document.querySelector('#statePreview'), message=document.querySelector('#stateMessage');
  const messages={idle:'Clear labels and predictable states reduce uncertainty.',focus:'Focus should be visible without overwhelming the interface.',error:'Explain what needs attention and keep the user’s input.',success:'Positive validation should confirm progress without interrupting the task.',sending:'Pending states should prevent duplicate submissions and communicate progress.'};
  document.querySelectorAll('[data-form-state]').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-form-state]').forEach(b=>b.classList.toggle('active',b===btn));
    if(statePreview) statePreview.dataset.state=btn.dataset.formState;
    if(message) message.textContent=messages[btn.dataset.formState];
  }));
}
