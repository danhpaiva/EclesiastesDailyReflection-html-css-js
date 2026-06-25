import { devocionais } from './data.js';
import { renderDevocional, bindShare } from './render.js';

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function formatDateLabel(date) {
  return date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function selectDevocional(dayOfYear) {
  const maxDay = devocionais[devocionais.length - 1].diaDoAno;
  const index = ((dayOfYear - 1) % maxDay + maxDay) % maxDay;
  return devocionais[index] ?? devocionais[0];
}

function init() {
  const today = new Date();
  const day = getDayOfYear(today);
  const devocional = selectDevocional(day);
  const label = formatDateLabel(today);

  renderDevocional(devocional, label);
  bindShare(devocional, label);
}

init();
