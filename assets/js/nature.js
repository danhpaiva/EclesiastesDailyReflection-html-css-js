/*
 * nature.js — Eclesiastes thematic animations
 *
 * hebel (הֶבֶל) particles: tiny rising motes representing the
 * "breath / vapor / vanity" at the heart of Ecclesiastes.
 *
 * "Vaidade das vaidades… tudo é vaidade." — Ec 1.2
 */

const DARK_COLOR  = 'rgba(137, 194, 217,'; // sky-blue-light
const LIGHT_COLOR = 'rgba(1,  73, 124,';   // deep-space-blue

function isLight() {
  return document.documentElement.getAttribute('data-theme') === 'light';
}

/* ── Particle class ─────────────────────────────────────────────────────── */
class Mote {
  constructor(canvasW, canvasH) {
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this.reset(true);
  }

  reset(initial = false) {
    this.x    = Math.random() * this.canvasW;
    this.y    = initial
      ? Math.random() * this.canvasH          // scatter on first load
      : this.canvasH + 10;                    // always rise from bottom
    this.r    = 0.8 + Math.random() * 2.2;   // radius 0.8–3px
    this.vy   = 0.18 + Math.random() * 0.42; // rise speed
    this.vx   = (Math.random() - 0.5) * 0.28;// gentle lateral drift
    this.life = 0;
    this.maxLife = 280 + Math.random() * 320; // frames alive
  }

  update() {
    this.x   += this.vx + Math.sin(this.life * 0.018 + this.x) * 0.12;
    this.y   -= this.vy;
    this.life++;
    if (this.y < -10 || this.life > this.maxLife) this.reset();
  }

  alpha() {
    // fade-in for first 60 frames, fade-out for last 80
    const fadeIn  = Math.min(1, this.life / 60);
    const fadeOut = Math.min(1, (this.maxLife - this.life) / 80);
    return fadeIn * fadeOut * (isLight() ? 0.35 : 0.55);
  }

  draw(ctx) {
    const base  = isLight() ? LIGHT_COLOR : DARK_COLOR;
    const alpha = this.alpha();
    if (alpha <= 0) return;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `${base} ${alpha})`;
    ctx.fill();
  }
}

/* ── Main init ──────────────────────────────────────────────────────────── */
export function initNature() {
  const canvas = document.getElementById('hebel');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let motes = [];
  let frame;
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    // respawn all motes scattered across new dimensions
    const count = Math.round((W * H) / 14000); // density ~1 per 14k px²
    motes = Array.from({ length: Math.min(count, 90) }, () => new Mote(W, H));
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (const m of motes) {
      m.canvasW = W;
      m.canvasH = H;
      m.update();
      m.draw(ctx);
    }
    frame = requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  tick();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(frame);
    else tick();
  });
}
