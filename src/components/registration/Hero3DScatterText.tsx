import React from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  MotionValue,
} from 'framer-motion';

interface Hero3DScatterTextProps {
  isVisible?: boolean;
  onLanded?: () => void;
}

interface CharConfig {
  char: string;
  isDice?: boolean;
  withDice?: boolean;
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
  // scrollEnd defines speed: lower number = reaches target faster over fewer scroll pixels
  scrollEnd: number;
  delay: number;
  // Load entrance fall parameters
  fallStartY?: number;
  fallRotZ?: number;
  fallRotX?: number;
  fallDelay?: number;
}

/**
 * 3D Golden Dice balancing on its bottom vertex / apex
 * Rendered with isometric 3D geometry, metallic gradients, chamfered bevels, and recessed pips
 */
const VertexDice: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`inline-block align-middle relative ${className}`}>
    <svg
      viewBox="0 0 100 106"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full overflow-visible drop-shadow-[0_8px_18px_rgba(0,0,0,0.7)]"
    >
      <defs>
        {/* Top Face Gradient (Brilliant Pure White to Soft Pearl) */}
        <linearGradient id="dice-top-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#FFFFFF" />
          <stop offset="75%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#F1F5F9" />
        </linearGradient>

        {/* Left Face Gradient (Reflective Clean Silver-White) */}
        <linearGradient id="dice-left-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="50%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>

        {/* Right Face Gradient (Shaded Platinum/Slate Pearl) */}
        <linearGradient id="dice-right-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="45%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>

        {/* Recessed Pip Gradient (Deep Obsidian / Velvet Onyx Depth) */}
        <radialGradient id="dice-pip-dark" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="60%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>

        {/* Subtle ground contact shadow blur */}
        <filter id="dice-shadow-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      {/* 1. Ground Contact Shadow under the standing bottom vertex (at y=96) */}
      <ellipse
        cx="50"
        cy="99"
        rx="22"
        ry="4.5"
        fill="rgba(0, 0, 0, 0.75)"
        filter="url(#dice-shadow-blur)"
      />

      {/* 2. Top Face: Diamond at apex (50,6) - (89,28) - (50,50) - (11,28) */}
      <polygon
        points="50,6 89,28 50,50 11,28"
        fill="url(#dice-top-grad)"
        stroke="rgba(255, 255, 255, 0.95)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* 3. Left Face: (11,28) - (50,50) - (50,94) - (11,72) */}
      <polygon
        points="11,28 50,50 50,94 11,72"
        fill="url(#dice-left-grad)"
        stroke="rgba(255, 255, 255, 0.65)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* 4. Right Face: (50,50) - (89,28) - (89,72) - (50,94) */}
      <polygon
        points="50,50 89,28 89,72 50,94"
        fill="url(#dice-right-grad)"
        stroke="rgba(255, 255, 255, 0.45)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* 5. Edge Crease Chamfers */}
      <line x1="50" y1="50" x2="50" y2="94" stroke="rgba(71, 85, 105, 0.45)" strokeWidth="1.2" />
      <line x1="50" y1="50" x2="11" y2="28" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="1.2" />
      <line x1="50" y1="50" x2="89" y2="28" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="1.2" />

      {/* 6. PIPS (Recessed Dots with subtle metallic bevel rings) */}
      {/* Top Face: Pip 1 (Center pip at 50, 28) */}
      <g>
        <ellipse cx="50" cy="28" rx="6" ry="3.6" fill="url(#dice-pip-dark)" />
        <ellipse
          cx="50"
          cy="28"
          rx="6"
          ry="3.6"
          fill="none"
          stroke="rgba(255, 255, 255, 0.65)"
          strokeWidth="0.8"
        />
      </g>

      {/* Left Face: 2 Pips */}
      <g>
        <ellipse
          cx="28"
          cy="46"
          rx="4.8"
          ry="5.5"
          transform="rotate(-15 28 46)"
          fill="url(#dice-pip-dark)"
        />
        <ellipse
          cx="28"
          cy="46"
          rx="4.8"
          ry="5.5"
          transform="rotate(-15 28 46)"
          fill="none"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="0.8"
        />

        <ellipse
          cx="36"
          cy="74"
          rx="4.8"
          ry="5.5"
          transform="rotate(-15 36 74)"
          fill="url(#dice-pip-dark)"
        />
        <ellipse
          cx="36"
          cy="74"
          rx="4.8"
          ry="5.5"
          transform="rotate(-15 36 74)"
          fill="none"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="0.8"
        />
      </g>

      {/* Right Face: 3 Pips along diagonal */}
      <g>
        <ellipse
          cx="66"
          cy="74"
          rx="4.8"
          ry="5.5"
          transform="rotate(15 66 74)"
          fill="url(#dice-pip-dark)"
        />
        <ellipse
          cx="66"
          cy="74"
          rx="4.8"
          ry="5.5"
          transform="rotate(15 66 74)"
          fill="none"
          stroke="rgba(255, 255, 255, 0.35)"
          strokeWidth="0.8"
        />

        <ellipse
          cx="71"
          cy="61"
          rx="4.8"
          ry="5.5"
          transform="rotate(15 71 61)"
          fill="url(#dice-pip-dark)"
        />
        <ellipse
          cx="71"
          cy="61"
          rx="4.8"
          ry="5.5"
          transform="rotate(15 71 61)"
          fill="none"
          stroke="rgba(255, 255, 255, 0.35)"
          strokeWidth="0.8"
        />

        <ellipse
          cx="76"
          cy="48"
          rx="4.8"
          ry="5.5"
          transform="rotate(15 76 48)"
          fill="url(#dice-pip-dark)"
        />
        <ellipse
          cx="76"
          cy="48"
          rx="4.8"
          ry="5.5"
          transform="rotate(15 76 48)"
          fill="none"
          stroke="rgba(255, 255, 255, 0.35)"
          strokeWidth="0.8"
        />
      </g>
    </svg>
  </span>
);

interface ScatterCharProps {
  config: CharConfig;
  isAccent?: boolean;
  scrollY: MotionValue<number>;
  isVisible: boolean;
  className?: string;
}

const ScatterChar: React.FC<ScatterCharProps> = React.memo(({
  config,
  isAccent = false,
  scrollY,
  isVisible,
  className = '',
}) => {
  const {
    char,
    x: targetX,
    y: targetY,
    z: targetZ,
    rotX,
    rotY,
    rotZ,
    scale: targetScale,
    scrollEnd,
    fallStartY = -1100,
    fallRotZ = 0,
    fallRotX = 0,
    fallDelay = 0.1,
  } = config;

  // 1. Scroll-driven scatter values
  const scrollX = useTransform(scrollY, [0, scrollEnd], [0, targetX]);
  const scrollYVal = useTransform(scrollY, [0, scrollEnd], [0, targetY]);
  const scrollZ = useTransform(scrollY, [0, scrollEnd], [0, targetZ]);
  const scrollRotX = useTransform(scrollY, [0, scrollEnd], [0, rotX]);
  const scrollRotY = useTransform(scrollY, [0, scrollEnd], [0, rotY]);
  const scrollRotZ = useTransform(scrollY, [0, scrollEnd], [0, rotZ]);
  const scrollCharScale = useTransform(scrollY, [0, scrollEnd], [1, targetScale]);

  // Dissolve character as it flies past the viewpoint on scroll via pure GPU opacity
  const opacity = useTransform(scrollY, [0, scrollEnd * 0.6, scrollEnd], [1, 0.9, 0]);

  // 2. Interactive hover micro-interaction motion values
  const hoverXRaw = useMotionValue(0);
  const hoverYRaw = useMotionValue(0);
  const hoverZRaw = useMotionValue(0);
  const hoverRotXRaw = useMotionValue(0);
  const hoverRotYRaw = useMotionValue(0);
  const hoverRotZRaw = useMotionValue(0);
  const hoverScaleRaw = useMotionValue(1);

  // High-performance bouncy spring physics for fluid micro-interactions
  const springConfig = { stiffness: 420, damping: 18, mass: 0.8 };
  const hoverX = useSpring(hoverXRaw, springConfig);
  const hoverY = useSpring(hoverYRaw, springConfig);
  const hoverZ = useSpring(hoverZRaw, springConfig);
  const hoverRotX = useSpring(hoverRotXRaw, springConfig);
  const hoverRotY = useSpring(hoverRotYRaw, springConfig);
  const hoverRotZ = useSpring(hoverRotZRaw, springConfig);
  const hoverScale = useSpring(hoverScaleRaw, springConfig);

  // 3. Compose scroll transforms and hover springs into final combined motion values
  const x = useTransform([scrollX, hoverX], ([sX, hX]) => (sX as number) + (hX as number));
  const y = useTransform([scrollYVal, hoverY], ([sY, hY]) => (sY as number) + (hY as number));
  const z = useTransform([scrollZ, hoverZ], ([sZ, hZ]) => (sZ as number) + (hZ as number));
  const rotateX = useTransform([scrollRotX, hoverRotX], ([sRotX, hRotX]) => (sRotX as number) + (hRotX as number));
  const rotateY = useTransform([scrollRotY, hoverRotY], ([sRotY, hRotY]) => (sRotY as number) + (hRotY as number));
  const rotateZ = useTransform([scrollRotZ, hoverRotZ], ([sRotZ, hRotZ]) => (sRotZ as number) + (hRotZ as number));
  const charScale = useTransform([scrollCharScale, hoverScale], ([sScale, hScale]) => (sScale as number) * (hScale as number));

  const handlePointerEnter = () => {
    hoverXRaw.set((Math.random() - 0.5) * 55);
    hoverYRaw.set((Math.random() - 0.5) * 45);
    hoverZRaw.set(120 + Math.random() * 80);
    hoverRotXRaw.set((Math.random() - 0.5) * 35);
    hoverRotYRaw.set((Math.random() - 0.5) * 35);
    hoverRotZRaw.set((Math.random() - 0.5) * 40);
    hoverScaleRaw.set(1.22);
  };

  const handlePointerLeave = () => {
    hoverXRaw.set(0);
    hoverYRaw.set(0);
    hoverZRaw.set(0);
    hoverRotXRaw.set(0);
    hoverRotYRaw.set(0);
    hoverRotZRaw.set(0);
    hoverScaleRaw.set(1);
  };

  return (
    // Outer motion.span: executes the random fall from above the screen on load
    <motion.span
      style={{ transformStyle: 'preserve-3d', display: 'inline-block' }}
      initial={{
        y: fallStartY,
        rotateZ: fallRotZ,
        rotateX: fallRotX,
        opacity: 0,
        scale: 0.25,
      }}
      animate={
        isVisible
          ? {
            y: 0,
            rotateZ: 0,
            rotateX: 0,
            opacity: 1,
            scale: 1,
          }
          : {}
      }
      transition={{
        type: 'spring',
        stiffness: 70,
        damping: 9,
        mass: 1.15,
        delay: fallDelay,
      }}
    >
      {/* Inner motion.span: interactive 3D hover displacement & scroll-driven scatter */}
      <motion.span
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={
          {
            x,
            y,
            z,
            rotateX,
            rotateY,
            rotateZ,
            scale: charScale,
            opacity,
            transformStyle: 'preserve-3d',
            willChange: 'transform, opacity',
          } as any
        }
        className={`inline-block select-none cursor-pointer px-[1px] py-1 transition-colors ${
          isAccent ? 'hero-3d-gold' : 'hero-3d-white'
        } ${className}`}
      >
        {config.withDice ? (
          <span
            className="relative inline-block"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {char}
            <span
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
              style={{
                transform: 'translate3d(0, 2px, 30px)',
                transformStyle: 'preserve-3d',
              }}
            >
              <VertexDice className="w-[0.6em] h-[0.6em]" />
            </span>
          </span>
        ) : config.isDice ? (
          <VertexDice className="w-[0.92em] h-[0.92em] -mb-[0.06em] mr-[0.04em]" />
        ) : (
          char
        )}
      </motion.span>
    </motion.span>
  );
});

export const Hero3DScatterText: React.FC<Hero3DScatterTextProps> = React.memo(({
  isVisible = true,
  onLanded,
}) => {
  const { scrollY } = useScroll();

  // Notify parent once all falling letters have settled into position
  React.useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      onLanded?.();
    }, 1250);
    return () => clearTimeout(timer);
  }, [isVisible, onLanded]);

  // Subtle master zoom & smooth pointer events pass-through when scrolled
  const containerScale = useTransform(scrollY, [0, 420], [1, 1.25]);
  const pointerEvents = useTransform(scrollY, (val) => (val > 250 ? 'none' : 'auto'));

  // Line 1: NFCS FED WEEK (Volumetric White 3D Extrusion)
  const LINE_1_WORDS: { name: string; chars: CharConfig[] }[] = [
    {
      name: 'NFCS',
      chars: [
        { char: 'N', x: -480, y: -320, z: 550, rotX: 25, rotY: -50, rotZ: -45, scale: 2.6, scrollEnd: 240, delay: 0.02, fallStartY: -1100, fallRotZ: -35, fallRotX: 25, fallDelay: 0.04 },
        { char: 'F', x: -340, y: -230, z: 430, rotX: 30, rotY: -25, rotZ: -20, scale: 2.1, scrollEnd: 310, delay: 0.05, fallStartY: -1300, fallRotZ: 20, fallRotX: -30, fallDelay: 0.18 },
        { char: 'C', x: -190, y: -380, z: 620, rotX: -20, rotY: -30, rotZ: 35, scale: 2.9, scrollEnd: 390, delay: 0.08, fallStartY: -950, fallRotZ: -45, fallRotX: 15, fallDelay: 0.10 },
        { char: 'S', x: -520, y: -90, z: 490, rotX: 40, rotY: -45, rotZ: -60, scale: 2.4, scrollEnd: 210, delay: 0.11, fallStartY: -1250, fallRotZ: 50, fallRotX: -20, fallDelay: 0.28 },
      ],
    },
    {
      name: 'FED',
      chars: [
        { char: 'F', x: -70, y: -410, z: 590, rotX: 45, rotY: -15, rotZ: 20, scale: 2.8, scrollEnd: 260, delay: 0.15, fallStartY: -1050, fallRotZ: -25, fallRotX: 30, fallDelay: 0.08 },
        { char: 'E', x: 25, y: -290, z: 720, rotX: 35, rotY: 25, rotZ: -15, scale: 3.4, scrollEnd: 410, delay: 0.18, fallStartY: -1400, fallRotZ: 35, fallRotX: -15, fallDelay: 0.24 },
        { char: 'D', x: 190, y: -350, z: 480, rotX: -25, rotY: 40, rotZ: 30, scale: 2.3, scrollEnd: 230, delay: 0.21, fallStartY: -1150, fallRotZ: -40, fallRotX: 20, fallDelay: 0.14 },
      ],
    },
    {
      name: 'WEEK',
      chars: [
        { char: 'W', x: 310, y: -230, z: 520, rotX: 20, rotY: 45, rotZ: 35, scale: 2.5, scrollEnd: 300, delay: 0.25, fallStartY: -1200, fallRotZ: 45, fallRotX: -35, fallDelay: 0.06 },
        { char: 'E', x: 410, y: -360, z: 610, rotX: 30, rotY: 35, rotZ: -40, scale: 2.8, scrollEnd: 210, delay: 0.28, fallStartY: -1350, fallRotZ: -30, fallRotX: 25, fallDelay: 0.22 },
        { char: 'E', x: 550, y: -150, z: 450, rotX: -30, rotY: 55, rotZ: 50, scale: 2.2, scrollEnd: 380, delay: 0.31, fallStartY: -1000, fallRotZ: 60, fallRotX: -25, fallDelay: 0.12 },
        { char: 'K', x: 630, y: -280, z: 660, rotX: 35, rotY: 60, rotZ: -55, scale: 3.1, scrollEnd: 220, delay: 0.34, fallStartY: -1280, fallRotZ: -55, fallRotX: 35, fallDelay: 0.32 },
      ],
    },
  ];

  // Line 2: GRAND RAFFLE DRAW (Volumetric Gold 3D Extrusion)
  const LINE_2_WORDS: { name: string; chars: CharConfig[] }[] = [
    {
      name: 'GRAND',
      chars: [
        { char: 'G', x: -570, y: 270, z: 530, rotX: -30, rotY: -40, rotZ: -45, scale: 2.5, scrollEnd: 200, delay: 0.38, fallStartY: -1150, fallRotZ: -40, fallRotX: 20, fallDelay: 0.16 },
        { char: 'R', x: -390, y: 370, z: 450, rotX: -35, rotY: -25, rotZ: -30, scale: 2.2, scrollEnd: 320, delay: 0.41, fallStartY: -1320, fallRotZ: 30, fallRotX: -35, fallDelay: 0.28 },
        { char: 'A', x: -270, y: 230, z: 690, rotX: 25, rotY: -35, rotZ: 25, scale: 3.3, scrollEnd: 420, delay: 0.44, fallStartY: -980, fallRotZ: -50, fallRotX: 15, fallDelay: 0.08 },
        { char: 'N', x: -180, y: 420, z: 600, rotX: -40, rotY: 20, rotZ: -35, scale: 2.8, scrollEnd: 240, delay: 0.47, fallStartY: -1240, fallRotZ: 45, fallRotX: -25, fallDelay: 0.22 },
        { char: 'D', withDice: true, x: -80, y: 360, z: 490, rotX: -20, rotY: 25, rotZ: 20, scale: 2.4, scrollEnd: 290, delay: 0.50, fallStartY: -1080, fallRotZ: -20, fallRotX: 30, fallDelay: 0.12 },
      ],
    },
    {
      name: 'RAFFLE',
      chars: [
        { char: 'R', x: -20, y: 450, z: 620, rotX: -50, rotY: -15, rotZ: -20, scale: 2.9, scrollEnd: 220, delay: 0.54, fallStartY: -1380, fallRotZ: 35, fallRotX: -20, fallDelay: 0.05 },
        { char: 'A', x: 60, y: 300, z: 760, rotX: -30, rotY: 30, rotZ: 15, scale: 3.6, scrollEnd: 430, delay: 0.57, fallStartY: -1120, fallRotZ: -45, fallRotX: 25, fallDelay: 0.30 },
        { char: 'F', x: 170, y: 430, z: 550, rotX: -40, rotY: 25, rotZ: 35, scale: 2.6, scrollEnd: 310, delay: 0.60, fallStartY: -1260, fallRotZ: 55, fallRotX: -30, fallDelay: 0.18 },
        { char: 'F', x: 290, y: 370, z: 650, rotX: 35, rotY: 45, rotZ: -45, scale: 3.0, scrollEnd: 190, delay: 0.63, fallStartY: -990, fallRotZ: -30, fallRotX: 15, fallDelay: 0.25 },
        { char: 'L', x: 390, y: 270, z: 480, rotX: -25, rotY: 35, rotZ: 40, scale: 2.3, scrollEnd: 380, delay: 0.66, fallStartY: -1340, fallRotZ: 40, fallRotX: -40, fallDelay: 0.10 },
        { char: 'E', x: 470, y: 390, z: 590, rotX: -30, rotY: 40, rotZ: -35, scale: 2.7, scrollEnd: 270, delay: 0.69, fallStartY: -1180, fallRotZ: -60, fallRotX: 30, fallDelay: 0.34 },
      ],
    },
    {
      name: 'DRAW',
      chars: [
        {
          char: 'D',
          withDice: true,
          x: 350,
          y: 190,
          z: 470,
          rotX: 20,
          rotY: 40,
          rotZ: 30,
          scale: 2.2,
          scrollEnd: 230,
          delay: 0.72,
          fallStartY: -1220,
          fallRotZ: 25,
          fallRotX: -15,
          fallDelay: 0.14,
        },
        { char: 'R', x: 460, y: 250, z: 710, rotX: -25, rotY: 50, rotZ: -25, scale: 3.4, scrollEnd: 410, delay: 0.75, fallStartY: -1060, fallRotZ: -35, fallRotX: 20, fallDelay: 0.26 },
        { char: 'A', x: 570, y: 150, z: 540, rotX: -25, rotY: 45, rotZ: 45, scale: 2.5, scrollEnd: 320, delay: 0.78, fallStartY: -1390, fallRotZ: 50, fallRotX: -35, fallDelay: 0.07 },
        { char: 'W', x: 670, y: 260, z: 650, rotX: 30, rotY: 60, rotZ: -50, scale: 3.1, scrollEnd: 200, delay: 0.82, fallStartY: -1210, fallRotZ: -35, fallRotX: 25, fallDelay: 0.28 },
      ],
    },
  ];

  return (
    <div
      className="relative w-full max-w-full overflow-x-clip flex flex-col items-center justify-center select-none sm:pt-2 px-1 sm:px-4"
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
    >
      <motion.div
        style={{
          scale: containerScale,
          pointerEvents: pointerEvents as any,
          transformStyle: 'preserve-3d',
        }}
        className="w-full text-center tracking-tight leading-[1.05] uppercase font-black mt-2 sm:mt-0"
      >
        {/* Line 1: NFCS FED WEEK - Bold hero clamp sizing scaled to fit mobile screen width without overflow */}
        <div
          className="w-full flex items-center justify-center gap-x-1.5 sm:gap-x-7 md:gap-x-10 flex-nowrap whitespace-nowrap text-[clamp(1.75rem,9.8vw,3.2rem)] sm:text-[clamp(3rem,5.8vw,5.8rem)]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {LINE_1_WORDS.map((word) => (
            <span
              key={word.name}
              className="inline-flex flex-nowrap whitespace-nowrap shrink-0"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {word.chars.map((charConfig, idx) => (
                <ScatterChar
                  key={`${word.name}-${idx}-${charConfig.char}`}
                  config={charConfig}
                  isAccent={false}
                  scrollY={scrollY}
                  isVisible={isVisible}
                />
              ))}
            </span>
          ))}
        </div>

        {/* Line 2 & 3: On Mobile: GRAND takes its own line, RAFFLE DRAW breaks to a new line beneath it.
            On Desktop (sm:): GRAND RAFFLE DRAW stay together on one unified line. */}
        <div
          className="w-full flex flex-col sm:flex-row items-center justify-center sm:gap-x-7 md:gap-x-10 mt-1.5 sm:mt-3"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* GRAND: Bold impactful clamp sizing on mobile, desktop unified clamp */}
          <div
            className="w-full sm:w-auto flex items-center justify-center flex-nowrap whitespace-nowrap text-[clamp(3.5rem,21.5vw,6rem)] sm:text-[clamp(3rem,5.8vw,5.8rem)] leading-[0.95] sm:leading-[1.05]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span
              className="inline-flex flex-nowrap whitespace-nowrap shrink-0"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {LINE_2_WORDS[0].chars.map((charConfig, idx) => (
                <ScatterChar
                  key={`GRAND-${idx}-${charConfig.char}`}
                  config={charConfig}
                  isAccent={true}
                  scrollY={scrollY}
                  isVisible={isVisible}
                />
              ))}
            </span>
          </div>

          {/* RAFFLE DRAW: Bold clamp sizing on mobile, desktop unified clamp */}
          <div
            className="w-full sm:w-auto flex items-center justify-center gap-x-2 sm:gap-x-7 md:gap-x-10 flex-nowrap whitespace-nowrap text-[clamp(1.85rem,10.8vw,3.6rem)] sm:text-[clamp(3rem,5.8vw,5.8rem)] leading-[0.98] sm:leading-[1.05] mt-1 sm:mt-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {LINE_2_WORDS.slice(1).map((word) => (
              <span
                key={word.name}
                className="inline-flex flex-nowrap whitespace-nowrap shrink-0"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {word.chars.map((charConfig, idx) => (
                  <ScatterChar
                    key={`${word.name}-${idx}-${charConfig.char}`}
                    config={charConfig}
                    isAccent={true}
                    scrollY={scrollY}
                    isVisible={isVisible}
                  />
                ))}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
});

export default Hero3DScatterText;
