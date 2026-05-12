// AOS init
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true, offset: 80 });
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
  const STAR_COUNT = 140;

  let dots = [];
  let stars = [];
  let W, H;

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
    }));
  }

  function initStars() {
    stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 0.9 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.004 + Math.random() * 0.018,
      maxOp: 0.25 + Math.random() * 0.65,
    }));
  }

  function draw() {
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

    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < LINE_THRESH * LINE_THRESH) {
          const dist = Math.sqrt(dist2);
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(13,148,136,${LINE_OPACITY * (1 - dist / LINE_THRESH)})`;
          ctx.stroke();
        }
      }
    }

    dots.forEach(d => {
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${d.color},${d.op})`;
      ctx.fill();
    });

    stars.forEach(s => {
      s.phase += s.speed;
      const op = s.maxOp * (0.5 + 0.5 * Math.sin(s.phase));
      if (op > s.maxOp * 0.65) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,240,255,${(op - s.maxOp * 0.65) * 0.18})`;
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220,240,255,${op})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    resize();
    initDots();
    initStars();
  });

  resize();
  initDots();
  initStars();
  draw();
})();
