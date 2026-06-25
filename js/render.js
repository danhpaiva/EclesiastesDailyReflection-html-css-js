export function renderDevocional({ diaDoAno, capitulo, versiculo, texto, comentarioTeologico }, dateLabel) {
  document.getElementById('day-label').textContent = dateLabel;
  document.getElementById('reference').textContent = `Eclesiastes ${capitulo}.${versiculo}`;
  document.getElementById('verse').textContent = `"${texto}"`;
  document.getElementById('commentary').textContent = comentarioTeologico;
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
      btn.textContent = 'Copiado!';
      setTimeout(() => { btn.innerHTML = svgIcon() + ' Compartilhar'; }, 2000);
    }
  });
}

function svgIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
    stroke-linejoin="round" aria-hidden="true">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>`;
}
