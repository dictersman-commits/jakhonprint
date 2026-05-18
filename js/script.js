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

// ---- Generic Slider ----
function initSlider(trackId, prevId, nextId, dotsId) {
  const track  = document.getElementById(trackId);
  const slides = track ? track.querySelectorAll('.slide') : [];
  const dots   = document.getElementById(dotsId) ? document.getElementById(dotsId).querySelectorAll('.dot') : [];
  const btnPrev = document.getElementById(prevId);
  const btnNext = document.getElementById(nextId);
  if (!track || !slides.length) return;

  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function resetAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 4500);
  }

  slides[0].classList.add('active');

  if (btnNext) btnNext.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
  if (btnPrev) btnPrev.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetAuto(); }));

  // Touch swipe
  const container = track.closest('.s-card');
  if (container) {
    let touchStartX = 0;
    container.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    container.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) { goTo(diff > 0 ? current + 1 : current - 1); resetAuto(); }
    });
  }

  resetAuto();
}

initSlider('sliderTrack2', 'sliderPrev2', 'sliderNext2', 'sliderDots2');
initSlider('sliderTrack',  'sliderPrev',  'sliderNext',  'sliderDots');
