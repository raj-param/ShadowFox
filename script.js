// ── Project filter ──
function filterProjects(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const featured = document.querySelector('.project-featured');
  const cards = document.querySelectorAll('.project-card');

  featured.style.display = (cat === 'all' || featured.dataset.cat === cat) ? 'grid' : 'none';
  cards.forEach(card => {
    card.classList.toggle('hidden', cat !== 'all' && card.dataset.cat !== cat);
  });
}

// ── Typing animation ──
const roles = ['Full Stack Developer', 'Java Programmer', 'Problem Solver', 'UI/UX Enthusiast'];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function type() {
  const el = document.getElementById('typed');
  const current = roles[roleIndex];
  el.textContent = isDeleting ? current.slice(0, --charIndex) : current.slice(0, ++charIndex);

  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => isDeleting = true, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(type, isDeleting ? 60 : 100);
}
type();

// ── Navbar scroll effect ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ── Active nav highlight ──
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? '#6c63ff' : '';
  });
});

// ── Mobile nav ──
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => document.querySelector('.nav-links').classList.remove('open'));
});

// ── Contact form ──
function handleSubmit(e) {
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  msg.textContent = '✅ Message sent! I\'ll get back to you soon.';
  e.target.reset();
  setTimeout(() => msg.textContent = '', 4000);
}

// ── Scroll reveal ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-card, .timeline-item, .stat, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(25px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
