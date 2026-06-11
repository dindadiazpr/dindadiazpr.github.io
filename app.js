// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Animated counters
const animateCount = (el) => {
  const to = parseFloat(el.dataset.to);
  const dec = parseInt(el.dataset.dec || '0', 10);
  const suffix = el.dataset.suffix || '';
  const start = performance.now();
  const dur = 1400;
  const step = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (to * eased).toFixed(dec) + suffix;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = to.toFixed(dec) + suffix;
  };
  requestAnimationFrame(step);
};
const countIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { animateCount(e.target); countIO.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-to]').forEach((el) => countIO.observe(el));

// Word rotator
const words = ['confidence', 'curiosity', 'a big smile', 'courage', 'joy'];
let wi = 0;
const rot = document.getElementById('rotator');
setInterval(() => {
  wi = (wi + 1) % words.length;
  rot.style.opacity = '0';
  setTimeout(() => { rot.textContent = words[wi]; rot.style.opacity = '1'; }, 250);
}, 2200);
if (rot) rot.style.transition = 'opacity .25s';

// Flip cards
document.querySelectorAll('.flip').forEach((f) =>
  f.addEventListener('click', () => f.classList.toggle('open'))
);

// Tabs
document.querySelectorAll('.tab').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((b) => b.classList.remove('is-active'));
    document.querySelectorAll('.panel').forEach((p) => p.classList.remove('is-active'));
    btn.classList.add('is-active');
    document.getElementById(btn.dataset.tab).classList.add('is-active');
  });
});

// Lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightboxImg');
document.querySelectorAll('.poladeck .polaroid[data-full]').forEach((fig) => {
  fig.addEventListener('click', () => {
    lbImg.src = fig.dataset.full;
    lb.classList.add('open');
  });
});
const closeLb = () => lb.classList.remove('open');
document.getElementById('lightboxClose').addEventListener('click', closeLb);
lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });

// Mobile menu
const burger = document.getElementById('burger');
const links = document.getElementById('navLinks');
burger.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => links.classList.remove('open')));
