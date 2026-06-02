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
