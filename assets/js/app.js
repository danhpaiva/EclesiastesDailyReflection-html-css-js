import { devocionais } from './data.js';
import { renderDevocional, bindShare } from './render.js';
import { initTheme } from './theme.js';

const MAX_DAY = devocionais[devocionais.length - 1].diaDoAno;

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function formatDateLabel(date) {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

function selectDevocional(dayOfYear) {
  const index = ((dayOfYear - 1) % MAX_DAY + MAX_DAY) % MAX_DAY;
  return devocionais[index] ?? devocionais[0];
}

function dateFromOffset(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d;
}

/* ── card swap animation ─────────────────────────────────────────────── */
function animateCardSwap(card, direction, callback) {
  const out = direction === 'next' ? -24 : 24;
  card.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
  card.style.opacity = '0';
  card.style.transform = `translateX(${out}px)`;

  setTimeout(() => {
    callback();
    card.style.transition = 'none';
    card.style.transform = `translateX(${-out}px)`;
    card.style.opacity = '0';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateX(0)';
      });
    });
  }, 200);
}

/* ── navigation state ────────────────────────────────────────────────── */
let offset = 0;

function render(direction = null) {
  const date = dateFromOffset(offset);
  const day = getDayOfYear(date);
  const devocional = selectDevocional(day);
  const label = formatDateLabel(date);
  const card = document.getElementById('reflection-card');
  const btnToday = document.getElementById('btn-today');

  btnToday.hidden = offset === 0;

  const doRender = () => {
    renderDevocional(devocional, label);
    bindShare(devocional, label);
  };

  if (direction && card) {
    animateCardSwap(card, direction, doRender);
  } else {
    doRender();
  }
}

function init() {
  initTheme();
  render();

  document.getElementById('btn-prev').addEventListener('click', () => {
    offset -= 1;
    render('prev');
  });

  document.getElementById('btn-next').addEventListener('click', () => {
    offset += 1;
    render('next');
  });

  document.getElementById('btn-today').addEventListener('click', () => {
    const direction = offset > 0 ? 'prev' : 'next';
    offset = 0;
    render(direction);
  });
}

init();
