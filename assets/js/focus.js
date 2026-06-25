export function initFocusMode() {
  const btn  = document.getElementById('btn-focus');
  const body = document.body;

  function enter() {
    body.classList.add('focus-mode');
    btn.setAttribute('aria-label', 'Sair do modo foco');
    /* attempt native fullscreen — silently skip if denied */
    document.documentElement.requestFullscreen?.().catch(() => {});
  }

  function exit() {
    body.classList.remove('focus-mode');
    btn.setAttribute('aria-label', 'Ativar modo foco');
    if (document.fullscreenElement) document.exitFullscreen?.();
  }

  btn.addEventListener('click', () => {
    body.classList.contains('focus-mode') ? exit() : enter();
  });

  /* Esc key exits */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('focus-mode')) exit();
  });

  /* sync if user exits native fullscreen via browser UI */
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && body.classList.contains('focus-mode')) exit();
  });
}
