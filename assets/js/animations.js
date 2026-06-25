/* ── Grain canvas ──────────────────────────────────────────────────────── */
function initGrain() {
  const canvas = document.getElementById('grain');
  const ctx = canvas.getContext('2d');
  let frame;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function draw() {
    const { width, height } = canvas;
    const imageData = ctx.createImageData(width, height);
    const buf = imageData.data;

    for (let i = 0; i < buf.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      buf[i] = buf[i + 1] = buf[i + 2] = v;
      buf[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
    frame = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();

  /* pause grain when tab is hidden to save CPU */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(frame);
    else draw();
  });
}

/* ── Year progress bar ─────────────────────────────────────────────────── */
function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end   = new Date(now.getFullYear() + 1, 0, 1);
  const pct   = ((now - start) / (end - start)) * 100;

  /* defer so CSS transition fires */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { bar.style.width = `${pct.toFixed(3)}%`; });
  });
}

/* ── Card mouse-glow parallax ──────────────────────────────────────────── */
function initCardGlow() {
  const card = document.querySelector('.card');
  if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;

    card.classList.add('glow');

    /* subtle tilt — reduced for glassmorphism feel */
    const tiltX = (y / rect.height) * 1.5;
    const tiltY = (x / rect.width)  * -1.5;
    card.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('glow');
    card.style.transform = '';
    card.style.removeProperty('--glow-x');
    card.style.removeProperty('--glow-y');
  });
}

/* ── Commentary fade-in via IntersectionObserver ───────────────────────── */
function initCommentaryReveal() {
  const commentary = document.getElementById('commentary');
  if (!commentary) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        commentary.classList.add('visible');
        observer.disconnect();
      }
    },
    { threshold: 0.15 }
  );

  observer.observe(commentary);
}

/* ── Typewriter for verse ──────────────────────────────────────────────── */
export function typewriterVerse(text, targetId, onDone) {
  const el = document.getElementById(targetId);
  if (!el) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = text;
    onDone?.();
    return;
  }

  el.textContent = '';
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  el.appendChild(cursor);

  const words = text.split(' ');
  let i = 0;

  function next() {
    if (i >= words.length) {
      cursor.remove();
      onDone?.();
      return;
    }
    const word = document.createTextNode((i === 0 ? '' : ' ') + words[i]);
    el.insertBefore(word, cursor);
    i++;
    setTimeout(next, 55 + Math.random() * 40);
  }

  setTimeout(next, 350);
}

/* ── Boot ──────────────────────────────────────────────────────────────── */
initGrain();
initProgressBar();
initCommentaryReveal();

/* card glow after card animates in */
setTimeout(initCardGlow, 800);
