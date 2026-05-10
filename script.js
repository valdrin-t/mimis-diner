// Lock hero height on load — prevents twitching in Instagram/Facebook in-app browsers
// where viewport height changes as browser chrome shows/hides on scroll
const heroEl = document.getElementById('hero');
if (heroEl) heroEl.style.minHeight = window.innerHeight + 'px';

// Sticky nav shrink
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// Tab switcher
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
function switchTab(target) {
  tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === target));
  tabPanels.forEach(p => p.classList.toggle('active', p.id === `tab-${target}`));
}
tabBtns.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));

// Nav "Catering" link — switch tab then scroll
document.querySelectorAll('[data-tab="catering"]').forEach(el => {
  el.addEventListener('click', e => {
    if (el.tagName === 'A') {
      e.preventDefault();
      switchTab('catering');
      document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Reviews carousel
const carouselTrack = document.querySelector('.carousel-track');
const carouselCards = document.querySelectorAll('.carousel-track .review-card');
const carouselDots = document.querySelectorAll('.dot');
let carouselIndex = 0;

function carouselGoTo(n) {
  carouselIndex = ((n % carouselCards.length) + carouselCards.length) % carouselCards.length;
  carouselTrack.style.transform = `translateX(-${carouselIndex * 100}%)`;
  carouselDots.forEach((d, i) => d.classList.toggle('active', i === carouselIndex));
}
document.querySelector('.carousel-prev').addEventListener('click', () => carouselGoTo(carouselIndex - 1));
document.querySelector('.carousel-next').addEventListener('click', () => carouselGoTo(carouselIndex + 1));
carouselDots.forEach((dot, i) => dot.addEventListener('click', () => carouselGoTo(i)));

let carouselTimer = setInterval(() => carouselGoTo(carouselIndex + 1), 5000);
const carouselEl = document.querySelector('.reviews-carousel');
carouselEl.addEventListener('mouseenter', () => clearInterval(carouselTimer));
carouselEl.addEventListener('mouseleave', () => { carouselTimer = setInterval(() => carouselGoTo(carouselIndex + 1), 5000); });

// Highlight house specialty items (those whose name starts with ★)
document.querySelectorAll('.item-name').forEach(el => {
  if (el.textContent.trim().startsWith('★')) el.classList.add('specialty');
});
