// Nav: add .scrolled class when user scrolls past hero
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Mobile hamburger toggle
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-a');
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Close any other open items
    document.querySelectorAll('.faq-q[aria-expanded="true"]').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        other.closest('.faq-item').querySelector('.faq-a').style.maxHeight = '';
      }
    });

    btn.setAttribute('aria-expanded', String(!isOpen));
    answer.style.maxHeight = isOpen ? '' : answer.scrollHeight + 'px';
  });
});

// Quote carousel — auto-advances every 5 seconds
const quoteSlides = document.querySelectorAll('.quote-slide');
const quoteDots   = document.querySelectorAll('.quote-dot');
let currentQuote  = 0;
let quoteTimer;

function showQuote(index) {
  quoteSlides[currentQuote].classList.remove('active');
  quoteDots[currentQuote].classList.remove('active');
  currentQuote = (index + quoteSlides.length) % quoteSlides.length;
  quoteSlides[currentQuote].classList.add('active');
  quoteDots[currentQuote].classList.add('active');
}

function startQuoteCarousel() {
  quoteTimer = setInterval(() => showQuote(currentQuote + 1), 5000);
}

if (quoteSlides.length > 1) {
  quoteDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showQuote(i);
      clearInterval(quoteTimer);
      startQuoteCarousel();
    });
  });
  startQuoteCarousel();
}

// Contact form — Netlify handles submission server-side;
// this intercepts to show inline success without a page reload.
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    try {
      const res = await fetch('/', { method: 'POST', body: data });
      if (res.ok) {
        form.classList.add('hidden');
        success.classList.remove('hidden');
      } else {
        form.submit(); // fallback to native Netlify redirect
      }
    } catch {
      form.submit();
    }
  });
}
