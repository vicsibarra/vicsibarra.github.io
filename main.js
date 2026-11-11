// Selector de paleta (temporal)
const html = document.documentElement;
const botones = document.querySelectorAll('.paletas button');
const usar = t => {
  html.dataset.tema = t;
  botones.forEach(b => b.setAttribute('aria-pressed', b.dataset.t === t));
  try { localStorage.setItem('tema', t); } catch (e) {}
};
let guardado = null;
try { guardado = localStorage.getItem('tema'); } catch (e) {}
usar(guardado || 'blanco');
botones.forEach(b => b.addEventListener('click', () => usar(b.dataset.t)));

// Aparición suave al scrollear
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.aparece').forEach(el => io.observe(el));

// Tarjetas: las "fotos" se van pasando al pasar el mouse
document.querySelectorAll('.card[data-tonos]').forEach(card => {
  const tonos = card.dataset.tonos.split(',');
  card.insertAdjacentHTML('afterbegin', tonos.map((t, i) =>
    `<div class="slide t${t}${i === 0 ? ' activa' : ''}">${card.dataset.label} · ${i + 1}</div>`).join(''));
  const slides = card.querySelectorAll('.slide');
  let i = 0, timer;
  const pasar = () => { slides[i].classList.remove('activa'); i = (i + 1) % slides.length; slides[i].classList.add('activa'); };
  card.addEventListener('mouseenter', () => { pasar(); timer = setInterval(pasar, 900); });
  card.addEventListener('mouseleave', () => clearInterval(timer));
});

// Feed de Instagram (placeholder)
const feed = document.getElementById('posts');
if (feed) {
  const posts = Array.from({ length: 12 }, (_, i) => `<div class="post t${[1, 2, 3, 4][i % 4]}">post ${i + 1}</div>`).join('');
  feed.innerHTML = posts + posts;
}
