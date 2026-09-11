import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

interface ConfettiBlasterTrumpetsProps {
  isVisible?: boolean;
  className?: string;
  delay?: number;
}

// Particle shape types
type ParticleShape = 'rect' | 'circle' | 'star' | 'ribbon';

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  tiltAngle: number;
  tiltSpeed: number;
  shape: ParticleShape;
  opacity: number;
  decay: number;
  gravity: number;
  drag: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  time: number;
}

// Celebration palette matching NFCS Festival branding
const CONFETTI_COLORS = [
  '#FBE202', // Bright Gold
  '#F59E0B', // Amber Gold
  '#FFFBEB', // Foil White-Gold
  '#166C16', // NFCS Deep Emerald
  '#22C55E', // Spring Green
  '#4D2EAB', // NFCS Royal Purple
  '#8B5CF6', // Vivid Violet
  '#EF4444', // Festive Crimson
  '#EC4899', // Hot Pink
  '#0284C7', // Sky Blue
];

/**
 * Detailed Celebratory Brass Fanfare Trumpet Horn
 */
const TrumpetHorn: React.FC<{
  isBlasting?: boolean;
}> = React.memo(({ isBlasting }) => (
  <svg
    viewBox="0 0 70 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full overflow-visible drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)]"
  >
    <defs>
      {/* Brass Polished Tube Gradient */}
      <linearGradient id="trumpet-brass-v4" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#CA8A04" />
        <stop offset="25%" stopColor="#FEF08A" />
        <stop offset="45%" stopColor="#FFFFFF" />
        <stop offset="65%" stopColor="#FDE047" />
        <stop offset="85%" stopColor="#A16207" />
        <stop offset="100%" stopColor="#713F12" />
      </linearGradient>

      {/* Bell Flare Radial Highlight */}
      <radialGradient id="trumpet-bell-rim-v4" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="40%" stopColor="#FDE047" />
        <stop offset="80%" stopColor="#CA8A04" />
        <stop offset="100%" stopColor="#78350F" />
      </radialGradient>

      {/* Bell Mouth Cavity (Dark Depth) */}
      <radialGradient id="trumpet-cavity-v4" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#1C1004" />
        <stop offset="60%" stopColor="#3F1D0B" />
        <stop offset="90%" stopColor="#78350F" />
        <stop offset="100%" stopColor="#CA8A04" />
      </radialGradient>

      {/* Festival Festive Ribbon Accent */}
      <linearGradient id="ribbon-emerald-v4" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#14532D" />
        <stop offset="50%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#14532D" />
      </linearGradient>

      <linearGradient id="ribbon-purple-v4" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3B0764" />
        <stop offset="50%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#3B0764" />
      </linearGradient>
    </defs>

    {/* 1. Lower Mouthpiece & Stem */}
    <rect x="32" y="146" width="6" height="12" rx="2" fill="url(#trumpet-brass-v4)" />
    <path d="M30 146 H40 L37 138 H33 Z" fill="url(#trumpet-brass-v4)" />

    {/* 2. Main Leadpipe Tube */}
    <rect x="33.5" y="65" width="4" height="74" fill="url(#trumpet-brass-v4)" />

    {/* 3. Secondary Parallel Tube & Tuning Slide Loop */}
    <rect x="25.5" y="78" width="3.5" height="52" fill="url(#trumpet-brass-v4)" />
    {/* Bottom Loop Bend */}
    <path
      d="M25.5 130 C25.5 138 33.5 138 33.5 130"
      stroke="url(#trumpet-brass-v4)"
      strokeWidth="3.5"
      fill="none"
    />
    {/* Upper Loop Bend */}
    <path
      d="M25.5 78 C25.5 70 33.5 70 33.5 78"
      stroke="url(#trumpet-brass-v4)"
      strokeWidth="3.5"
      fill="none"
    />

    {/* 4. Three Center Valves & Piston Finger Caps */}
    <g>
      {/* Valve 1 */}
      <rect x="23" y="90" width="4.5" height="22" rx="1.5" fill="url(#trumpet-brass-v4)" />
      <rect x="24" y="85" width="2.5" height="5" fill="#E2E8F0" />
      <ellipse cx="25.2" cy="84" rx="2.5" ry="1.2" fill="#F8FAFC" />

      {/* Valve 2 */}
      <rect x="29" y="90" width="4.5" height="22" rx="1.5" fill="url(#trumpet-brass-v4)" />
      <rect x="30" y="85" width="2.5" height="5" fill="#E2E8F0" />
      <ellipse cx="31.2" cy="84" rx="2.5" ry="1.2" fill="#F8FAFC" />

      {/* Valve 3 */}
      <rect x="35" y="90" width="4.5" height="22" rx="1.5" fill="url(#trumpet-brass-v4)" />
      <rect x="36" y="85" width="2.5" height="5" fill="#E2E8F0" />
      <ellipse cx="37.2" cy="84" rx="2.5" ry="1.2" fill="#F8FAFC" />
    </g>

    {/* 5. Flaring Bell Body */}
    <path
      d="M33 65 C32 45 20 28 6 16 L64 16 C50 28 38 45 37 65 Z"
      fill="url(#trumpet-brass-v4)"
    />

    {/* Decorative Festival Ribbon Bands around Bell Collar */}
    <ellipse cx="35" cy="55" rx="7.5" ry="2" fill="url(#ribbon-emerald-v4)" />
    <ellipse cx="35" cy="45" rx="11" ry="2.5" fill="url(#ribbon-purple-v4)" />
    <ellipse cx="35" cy="35" rx="16" ry="3.2" fill="url(#ribbon-emerald-v4)" />

    {/* 6. Bell Mouth Rim & Dark Chamber Cavity */}
    <g>
      {/* Outer Golden Flared Rim */}
      <ellipse cx="35" cy="16" rx="29" ry="8" fill="url(#trumpet-bell-rim-v4)" stroke="#FEF08A" strokeWidth="1.2" />
      {/* Deep Dark Interior Cavity */}
      <ellipse cx="35" cy="16" rx="24" ry="6" fill="url(#trumpet-cavity-v4)" />
      {/* Glowing center spark */}
      <ellipse cx="35" cy="16" rx="11" ry="2.8" fill="#FEF08A" opacity={isBlasting ? 1 : 0.4} />
    </g>

    {/* 7. Muzzle Flash Starburst during blast */}
    {isBlasting && (
      <g>
        <circle cx="35" cy="16" r="14" fill="rgba(254, 240, 138, 0.45)" filter="blur(3px)" />
        <path
          d="M35 0 L37 12 L49 14 L39 18 L41 30 L35 20 L29 30 L31 18 L21 14 L33 12 Z"
          fill="#FFFBEB"
        />
        <circle cx="35" cy="16" r="5" fill="#FFFFFF" />
      </g>
    )}
  </svg>
));

export const ConfettiBlasterTrumpets: React.FC<ConfettiBlasterTrumpetsProps> = React.memo(({
  isVisible = true,
  className = '',
  delay = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Trumpet lifecycle:
  // 'hidden' -> 'spring_up' -> (spring animation finishes) -> 'blast' -> (confetti falls from top of screen) -> 'retract' -> 'hidden'
  const [phase, setPhase] = useState<'hidden' | 'spring_up' | 'blast' | 'retract'>('hidden');

  // Shared spring physics for both spring-up entrance and scale-down exit
  const trumpetSpring = {
    type: 'spring',
    stiffness: 340,
    damping: 16,
    mass: 0.85,
  } as const;

  // Confetti Particle Engine: falls gracefully and randomly from the top of the screen (y = -20px to -140px)
  const triggerConfettiExplosion = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to window size with DPR scaling
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);

    const particles: ConfettiParticle[] = [];
    const totalParticles = 260;

    // Generate confetti spread randomly across the entire width of the screen
    // starting above the top of the screen for a natural cascading fall
    for (let i = 0; i < totalParticles; i++) {
      // Spread across entire viewport width
      const x = Math.random() * window.innerWidth;
      // Start randomly staggered above the top of the screen (y = -20px to -140px)
      const y = -20 - Math.random() * 120;

      // Downward cascading initial velocity
      const vy = 2.0 + Math.random() * 3.6;
      // Gentle horizontal drift
      const vx = (Math.random() - 0.5) * 3.0;

      // Determine particle shape
      const randShape = Math.random();
      let shape: ParticleShape = 'rect';
      let w = 8 + Math.random() * 8;
      let h = 5 + Math.random() * 5;

      if (randShape < 0.28) {
        shape = 'star';
        w = 12 + Math.random() * 6;
        h = w;
      } else if (randShape < 0.48) {
        shape = 'circle';
        w = 6 + Math.random() * 6;
        h = w;
      } else if (randShape < 0.68) {
        shape = 'ribbon';
        w = 18 + Math.random() * 16;
        h = 4 + Math.random() * 3;
      }

      particles.push({
        x,
        y,
        vx,
        vy,
        w,
        h,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 14,
        tiltAngle: Math.random() * Math.PI * 2,
        tiltSpeed: 0.06 + Math.random() * 0.1,
        shape,
        opacity: 1,
        decay: 0.003 + Math.random() * 0.0035,
        gravity: 0.08 + Math.random() * 0.07,
        drag: 0.99,
        wobbleSpeed: 0.04 + Math.random() * 0.04,
        wobbleAmp: 1.2 + Math.random() * 1.6,
        time: Math.random() * 20,
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      let aliveCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.opacity <= 0 || p.y > window.innerHeight + 50) continue;

        aliveCount++;

        p.time += 1;
        // Physics integration: gentle floating flutter with air resistance
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx + Math.sin(p.time * p.wobbleSpeed) * p.wobbleAmp;
        p.y += p.vy;

        p.rotation += p.rotationSpeed;
        p.tiltAngle += p.tiltSpeed;

        // Fade gradually in lower half of screen
        if (p.y > window.innerHeight * 0.5) {
          p.opacity -= p.decay;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;

        // 3D perspective foreshortening via cosine tumble
        const currentScaleX = Math.cos(p.tiltAngle);

        if (p.shape === 'rect' || p.shape === 'ribbon') {
          ctx.fillRect((-p.w / 2) * currentScaleX, -p.h / 2, p.w * currentScaleX, p.h);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.ellipse(0, 0, (p.w / 2) * Math.abs(currentScaleX), p.h / 2, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'star') {
          // Draw sparkling celebratory 5-point star
          const spikes = 5;
          const outerRadius = (p.w / 2) * Math.abs(currentScaleX);
          const innerRadius = outerRadius * 0.45;
          let rot = (Math.PI / 2) * 3;
          let x = 0;
          let y = 0;
          const step = Math.PI / spikes;

          ctx.beginPath();
          ctx.moveTo(0, -outerRadius);
          for (let s = 0; s < spikes; s++) {
            x = Math.cos(rot) * outerRadius;
            y = Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = Math.cos(rot) * innerRadius;
            y = Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
          }
          ctx.lineTo(0, -outerRadius);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      if (aliveCount > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Complete Trumpet Sequence:
  // 1. Spring UP from behind prizes
  // 2. Wait until spring animation is completely DONE
  // 3. Blast recoil & muzzle flash, while confetti falls from the top of the screen
  // 4. Scale back DOWN behind prizes with the same spring animation
  const handleSpringUpDone = useCallback(() => {
    // Phase 2: Muzzle flash & recoil kick at the top
    setPhase('blast');

    // Confetti showers down from the top of the screen
    triggerConfettiExplosion();

    // Phase 3: Scale back down behind prizes with the same spring animation
    const retractTimer = setTimeout(() => {
      setPhase('retract');
    }, 600);

    return () => clearTimeout(retractTimer);
  }, [triggerConfettiExplosion]);

  // Check if first visit in this browsing session (with override parameter support)
  // Appears LAST: waits until letters, prizes, and button have all fully landed!
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isVisible) return;

    const urlParams = new URLSearchParams(window.location.search);
    const forceBlast = urlParams.get('confetti') === '1' || urlParams.get('blast') === '1';

    const STORAGE_KEY = 'nfcs_raffle_confetti_visited_v5';
    const alreadyVisited = sessionStorage.getItem(STORAGE_KEY);

    if (!alreadyVisited || forceBlast) {
      sessionStorage.setItem(STORAGE_KEY, 'true');

      // Appear LAST in the initial load sequence (wait ~1.4s after prizes arrive)
      const startTimer = setTimeout(() => {
        setPhase('spring_up');
      }, (delay + 1.3) * 1000);

      return () => clearTimeout(startTimer);
    }
  }, [isVisible, delay]);

  // Expose global trigger for easy testing in DevTools console: window.blastConfetti()
  useEffect(() => {
    if (typeof window === 'undefined') return;
    (window as any).blastConfetti = () => {
      setPhase('spring_up');
    };
    return () => {
      delete (window as any).blastConfetti;
    };
  }, []);

  // Target animation values based on current phase
  const getTrumpetAnimate = (baseRotateZ: number) => {
    switch (phase) {
      case 'spring_up':
        return { y: -30, scale: 1, opacity: 1, rotateZ: baseRotateZ };
      case 'blast':
        return { y: -36, scale: 1.12, opacity: 1, rotateZ: baseRotateZ };
      case 'retract':
        return { y: 130, scale: 0, opacity: 0, rotateZ: baseRotateZ * 1.2 };
      default: // 'hidden'
        return { y: 130, scale: 0, opacity: 0, rotateZ: baseRotateZ * 1.2 };
    }
  };

  const isBlasting = phase === 'blast';

  return (
    <>
      {/* Fullscreen High-Performance Confetti Particle Canvas via Portal (escapes 3D perspective trap) */}
      {mounted &&
        typeof document !== 'undefined' &&
        createPortal(
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none select-none"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              pointerEvents: 'none',
              zIndex: 99999,
            }}
          />,
          document.body
        )}

      {/* 3 Spring-Up Trumpets Placed Behind the Prizes (z-0 relative to podium stage) */}
      <div
        className={`absolute inset-x-0 bottom-14 sm:bottom-18 md:bottom-22 z-0 pointer-events-none flex items-end justify-center overflow-x-clip ${className}`}
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        <div className="relative w-full max-w-[620px] h-32 sm:h-40 flex items-end justify-between px-4 sm:px-10">
          {/* 1. Left Trumpet (Angled Outward Left) */}
          <motion.div
            initial={{ y: 130, scale: 0, opacity: 0, rotateZ: -42 }}
            animate={getTrumpetAnimate(-32)}
            transition={trumpetSpring}
            className="relative w-16 sm:w-20 md:w-24 h-36 sm:h-44 shrink-0 -mr-6 sm:-mr-4 origin-bottom-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <TrumpetHorn isBlasting={isBlasting} />
          </motion.div>

          {/* 2. Center Trumpet (Shooting High Straight Up) */}
          <motion.div
            initial={{ y: 130, scale: 0, opacity: 0, rotateZ: 0 }}
            animate={getTrumpetAnimate(2)}
            transition={trumpetSpring}
            onAnimationComplete={() => {
              // Trigger blast & confetti drop right when spring-up animation is done
              if (phase === 'spring_up') {
                handleSpringUpDone();
              }
            }}
            className="relative w-18 sm:w-22 md:w-26 h-40 sm:h-48 shrink-0 z-10 origin-bottom-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <TrumpetHorn isBlasting={isBlasting} />
          </motion.div>

          {/* 3. Right Trumpet (Angled Outward Right) */}
          <motion.div
            initial={{ y: 130, scale: 0, opacity: 0, rotateZ: 42 }}
            animate={getTrumpetAnimate(32)}
            transition={trumpetSpring}
            className="relative w-16 sm:w-20 md:w-24 h-36 sm:h-44 shrink-0 -ml-6 sm:-ml-4 origin-bottom-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <TrumpetHorn isBlasting={isBlasting} />
          </motion.div>
        </div>
      </div>
    </>
  );
});

export default ConfettiBlasterTrumpets;
