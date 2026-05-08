// Navbar scroll behavior
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// AOS init
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true, offset: 80 });
});

// Close mobile nav on link click
document.querySelectorAll('#navMenu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('navMenu');
    if (menu.classList.contains('show')) {
      bootstrap.Collapse.getInstance(menu)?.hide();
    }
  });
});

// Particle background
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const COLORS = ['52,211,153', '16,185,129', '13,148,136'];
  const COUNT = 80;
  const LINE_THRESH = 130;
  const LINE_OPACITY = 0.32;
  const SPEED = 0.35;
  const DOT_OPACITY = 0.65;
  const LERP = 0.06;

  let dots = [];
  let W, H;
  let mouseX = 0, mouseY = 0;
  let lerpX = 0, lerpY = 0;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initDots() {
    dots = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2.0 + 0.6,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      op: (0.5 + Math.random() * 0.5) * DOT_OPACITY,
      px: Math.random() * 0.03 + 0.01,
    }));
  }

  function draw() {
    lerpX += (mouseX - lerpX) * LERP;
    lerpY += (mouseY - lerpY) * LERP;

    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 0.8;

    dots.forEach(d => {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0) d.x = W;
      if (d.x > W) d.x = 0;
      if (d.y < 0) d.y = H;
      if (d.y > H) d.y = 0;
    });

    const rx = dots.map(d => d.x + lerpX * W * d.px);
    const ry = dots.map(d => d.y + lerpY * H * d.px);

    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = rx[i] - rx[j];
        const dy = ry[i] - ry[j];
        const dist2 = dx * dx + dy * dy;
        if (dist2 < LINE_THRESH * LINE_THRESH) {
          const dist = Math.sqrt(dist2);
          ctx.beginPath();
          ctx.moveTo(rx[i], ry[i]);
          ctx.lineTo(rx[j], ry[j]);
          ctx.strokeStyle = `rgba(13,148,136,${LINE_OPACITY * (1 - dist / LINE_THRESH)})`;
          ctx.stroke();
        }
      }
    }

    dots.forEach((d, i) => {
      ctx.beginPath();
      ctx.arc(rx[i], ry[i], d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${d.color},${d.op})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX / W - 0.5;
    mouseY = e.clientY / H - 0.5;
  });

  window.addEventListener('resize', () => {
    resize();
    initDots();
  });

  resize();
  initDots();
  draw();
})();
