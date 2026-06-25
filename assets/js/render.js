import { typewriterVerse } from './animations.js';

export function renderDevocional({ capitulo, versiculo, texto, comentarioTeologico }, dateLabel) {
  document.getElementById('day-label').textContent = dateLabel;
  document.getElementById('reference').textContent = `Eclesiastes ${capitulo}.${versiculo}`;

  typewriterVerse(`"${texto}"`, 'verse', () => {
    /* reveal commentary after verse finishes typing */
    const commentary = document.getElementById('commentary');
    if (commentary) {
      commentary.textContent = comentarioTeologico;
      /* small delay so IntersectionObserver or direct trigger works */
      requestAnimationFrame(() => commentary.classList.add('visible'));
    }
  });
}

export function bindShare(devocional, dateLabel) {
  const btn = document.getElementById('btn-share');

  btn.addEventListener('click', async () => {
    const shareData = {
      title: 'Eclesiastes — Reflexão Diária',
      text: `${dateLabel} · Eclesiastes ${devocional.capitulo}.${devocional.versiculo}\n\n"${devocional.texto}"\n\n${devocional.comentarioTeologico}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') console.warn('Compartilhamento falhou:', err);
      }
    } else {
      await navigator.clipboard.writeText(`${shareData.title}\n\n${shareData.text}`);
      const original = btn.innerHTML;
      btn.textContent = 'Copiado!';
      setTimeout(() => { btn.innerHTML = original; }, 2000);
    }
  });
}
