export interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  origin?: { x: number; y: number };
  colors?: string[];
}

export function fireConfetti(options: ConfettiOptions = {}) {
  if (typeof window === 'undefined') return;

  const {
    particleCount = 80,
    spread = 70,
    startVelocity = 45,
    decay = 0.92,
    gravity = 1.2,
    origin = { x: 0.5, y: 0.6 },
    colors = ['#166C16', '#FBE202', '#175319', '#FFFFFF', '#6F43EE', '#B79EFF', '#FFD700'],
  } = options;

  let canvas = document.getElementById('raffle-confetti-canvas') as HTMLCanvasElement | null;
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'raffle-confetti-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const width = (canvas.width = window.innerWidth * dpr);
  const height = (canvas.height = window.innerHeight * dpr);

  const startX = origin.x * width;
  const startY = origin.y * height;

  interface Particle {
    x: number;
    y: number;
    w: number;
    h: number;
    vx: number;
    vy: number;
    angle: number;
    vAngle: number;
    tilt: number;
    vTilt: number;
    color: string;
    opacity: number;
    shape: 'rect' | 'circle';
  }

  const particles: Particle[] = [];
  const radSpread = (spread * Math.PI) / 180;
  const baseAngle = -Math.PI / 2;

  for (let i = 0; i < particleCount; i++) {
    const angle = baseAngle + (Math.random() - 0.5) * radSpread;
    const velocity = (startVelocity + (Math.random() - 0.5) * (startVelocity * 0.5)) * dpr;
    particles.push({
      x: startX,
      y: startY,
      w: (Math.random() * 8 + 6) * dpr,
      h: (Math.random() * 14 + 8) * dpr,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity,
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.2,
      tilt: Math.random() * Math.PI * 2,
      vTilt: (Math.random() - 0.5) * 0.15,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1,
      shape: Math.random() > 0.3 ? 'rect' : 'circle',
    });
  }

  const startTime = performance.now();
  const maxDuration = 4000;

  function render(time: number) {
    const elapsed = time - startTime;
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    let activeCount = 0;

    for (const p of particles) {
      p.vx *= decay;
      p.vy *= decay;
      p.vy += gravity * dpr * 0.5;
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.vAngle;
      p.tilt += p.vTilt;

      if (elapsed > 2000) {
        p.opacity = Math.max(0, 1 - (elapsed - 2000) / 2000);
      }

      if (p.opacity > 0 && p.y < height + 50) {
        activeCount++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(Math.cos(p.tilt), 1);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx.restore();
      }
    }

    if (activeCount > 0 && elapsed < maxDuration) {
      requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, width, height);
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    }
  }

  requestAnimationFrame(render);
}

export function launchCelebrationConfetti() {
  fireConfetti({ particleCount: 75, spread: 65, origin: { x: 0.5, y: 0.5 } });
  setTimeout(() => {
    fireConfetti({ particleCount: 55, spread: 75, origin: { x: 0.25, y: 0.55 } });
  }, 220);
  setTimeout(() => {
    fireConfetti({ particleCount: 55, spread: 75, origin: { x: 0.75, y: 0.55 } });
  }, 440);
}
