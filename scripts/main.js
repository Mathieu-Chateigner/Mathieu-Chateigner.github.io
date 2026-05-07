// Navbar scroll behavior
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// AOS init
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true, offset: 80 });
});
