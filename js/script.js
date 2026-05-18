// ---- Header scroll ----
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ---- Burger menu ----
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

// ---- Scroll-in animations ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.querySelectorAll('.s-card, .p-item, .reason, .stat').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ---- Premium Slider ----
const track   = document.getElementById('sliderTrack');
const slides  = document.querySelectorAll('.slide');
const dots    = document.querySelectorAll('.dot');
const btnPrev = document.getElementById('sliderPrev');
const btnNext = document.getElementById('sliderNext');
let current = 0;
let autoTimer;

function goTo(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function startAuto() {
  autoTimer = setInterval(() => goTo(current + 1), 4500);
}

function resetAuto() {
  clearInterval(autoTimer);
  startAuto();
}

// Init
slides[0].classList.add('active');

btnNext.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
btnPrev.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetAuto(); }));

// Touch swipe
let touchStartX = 0;
const sliderEl = document.getElementById('slider');
sliderEl.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
sliderEl.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) { goTo(diff > 0 ? current + 1 : current - 1); resetAuto(); }
});

startAuto();
