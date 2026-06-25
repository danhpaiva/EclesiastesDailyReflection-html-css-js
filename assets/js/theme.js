const STORAGE_KEY = 'ecl-theme';
const root = document.documentElement;

function getPreferred() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
  } else {
    root.removeAttribute('data-theme');
  }
}

export function initTheme() {
  applyTheme(getPreferred());

  const btn = document.getElementById('btn-theme');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);

    /* spin animation */
    btn.style.transition = 'border-color 0.25s, color 0.25s, background 0.25s, transform 0.45s';
    btn.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      btn.style.transform = '';
      btn.style.transition = '';
    }, 450);
  });
}
