export function initPWA(showToast=()=>{}) {
  const installButton = document.querySelector('#installButton');
  let promptEvent = null;

  addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    promptEvent = event;
    if (installButton) installButton.hidden = false;
  });

  installButton?.addEventListener('click', async () => {
    if (!promptEvent) return;
    promptEvent.prompt();
    await promptEvent.userChoice;
    promptEvent = null;
    installButton.hidden = true;
  });

  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('/sw.js', { scope:'/' }).catch(() => {
    // Offline support is optional; the portfolio still works normally without it.
  });
}
