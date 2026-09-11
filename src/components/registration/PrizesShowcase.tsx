import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ConfettiBlasterTrumpets } from './ConfettiBlasterTrumpets';

interface PrizesShowcaseProps {
  className?: string;
  isVisible?: boolean;
}

export const PrizesShowcase: React.FC<PrizesShowcaseProps> = React.memo(({
  className = '',
  isVisible = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Entrance spring configuration for initial podium drop-in
  const entranceSpring = {
    type: 'spring',
    stiffness: 280,
    damping: 24,
  } as const;

  // --- SCROLL-DRIVEN 3D SCATTER / FLY-OUT TRANSFORMS ---
  const SCROLL_START = 200;
  const SCROLL_END = 420;

  // A. Red SUV Car: drives/zooms outward to the bottom-left past the camera
  const carX = useTransform(scrollY, [0, SCROLL_START, SCROLL_END], [0, 0, -220]);
  const carY = useTransform(scrollY, [0, SCROLL_START, SCROLL_END], [0, 0, 90]);
  const carRotateY = useTransform(scrollY, [0, SCROLL_START, SCROLL_END], [0, 0, -18]);
  const carScale = useTransform(scrollY, [0, SCROLL_START, SCROLL_END], [1, 1, 1.25]);
  const carOpacity = useTransform(
    scrollY,
    [0, SCROLL_START, SCROLL_START + (SCROLL_END - SCROLL_START) * 0.55, SCROLL_END],
    [1, 1, 0.85, 0]
  );
  const carShadowOpacity = useTransform(
    scrollY,
    [0, SCROLL_START, SCROLL_START + (SCROLL_END - SCROLL_START) * 0.5],
    [1, 1, 0]
  );

  // B. Smart TV: floats up and outward to the top-right
  const tvX = useTransform(scrollY, [0, SCROLL_START, SCROLL_END], [0, 0, 220]);
  const tvY = useTransform(scrollY, [0, SCROLL_START, SCROLL_END], [0, 0, -110]);
  const tvRotateY = useTransform(scrollY, [0, SCROLL_START, SCROLL_END], [0, 0, 25]);
  const tvScale = useTransform(scrollY, [0, SCROLL_START, SCROLL_END], [1, 1, 1.15]);
  const tvOpacity = useTransform(
    scrollY,
    [0, SCROLL_START, SCROLL_START + (SCROLL_END - SCROLL_START) * 0.5, SCROLL_END * 0.98],
    [1, 1, 0.8, 0]
  );
  const tvShadowOpacity = useTransform(
    scrollY,
    [0, SCROLL_START, SCROLL_START + (SCROLL_END - SCROLL_START) * 0.45],
    [1, 1, 0]
  );

  // C. Cash Prize Bundles: bursts forward down-left without z-rotation
  const cashEnd = SCROLL_START + (SCROLL_END - SCROLL_START) * 0.85;
  const cashX = useTransform(scrollY, [0, SCROLL_START, cashEnd], [0, 0, -160]);
  const cashY = useTransform(scrollY, [0, SCROLL_START, cashEnd], [0, 0, 180]);
  const cashScale = useTransform(scrollY, [0, SCROLL_START, cashEnd], [1, 1, 1.45]);
  const cashOpacity = useTransform(
    scrollY,
    [0, SCROLL_START, SCROLL_START + (cashEnd - SCROLL_START) * 0.5, cashEnd],
    [1, 1, 0.8, 0]
  );

  // D. Bag of Rice: drops and slides away down-right without z-rotation
  const riceEnd = SCROLL_START + (SCROLL_END - SCROLL_START) * 0.9;
  const riceX = useTransform(scrollY, [0, SCROLL_START, riceEnd], [0, 0, 80]);
  const riceY = useTransform(scrollY, [0, SCROLL_START, riceEnd], [0, 0, 190]);
  const riceScale = useTransform(scrollY, [0, SCROLL_START, riceEnd], [1, 1, 1.3]);
  const riceOpacity = useTransform(
    scrollY,
    [0, SCROLL_START, SCROLL_START + (riceEnd - SCROLL_START) * 0.55, riceEnd],
    [1, 1, 0.8, 0]
  );

  // E. Gas Cylinder: slides outward to the right without z-rotation
  const gasEnd = SCROLL_START + (SCROLL_END - SCROLL_START) * 0.88;
  const gasX = useTransform(scrollY, [0, SCROLL_START, gasEnd], [0, 0, 190]);
  const gasY = useTransform(scrollY, [0, SCROLL_START, gasEnd], [0, 0, 130]);
  const gasScale = useTransform(scrollY, [0, SCROLL_START, gasEnd], [1, 1, 1.25]);
  const gasOpacity = useTransform(
    scrollY,
    [0, SCROLL_START, SCROLL_START + (gasEnd - SCROLL_START) * 0.52, gasEnd],
    [1, 1, 0.8, 0]
  );

  // F. Power Bank: shoots down-center without z-rotation
  const powerEnd = SCROLL_START + (SCROLL_END - SCROLL_START) * 0.8;
  const powerX = useTransform(scrollY, [0, SCROLL_START, powerEnd], [0, 0, -40]);
  const powerY = useTransform(scrollY, [0, SCROLL_START, powerEnd], [0, 0, 210]);
  const powerScale = useTransform(scrollY, [0, SCROLL_START, powerEnd], [1, 1, 1.5]);
  const powerOpacity = useTransform(
    scrollY,
    [0, SCROLL_START, SCROLL_START + (powerEnd - SCROLL_START) * 0.48, powerEnd],
    [1, 1, 0.8, 0]
  );

  // G. Stage Floor Shadows & Spotlight: fade out cleanly on scroll
  const stageShadowOpacity = useTransform(
    scrollY,
    [0, SCROLL_START, SCROLL_START + (SCROLL_END - SCROLL_START) * 0.6],
    [1, 1, 0]
  );
  const stageShadowScale = useTransform(
    scrollY,
    [0, SCROLL_START, SCROLL_START + (SCROLL_END - SCROLL_START) * 0.6],
    [1, 1, 0.4]
  );
  const spotlightOpacity = useTransform(
    scrollY,
    [0, SCROLL_START, SCROLL_START + (SCROLL_END - SCROLL_START) * 0.65],
    [1, 1, 0]
  );

  // Disable pointer events when items dissolve so they never block form controls below
  const pointerEvents = useTransform(scrollY, (v) => (v > SCROLL_START + 120 ? 'none' : 'auto'));

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        pointerEvents: pointerEvents as any,
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
      className={`relative w-full max-w-xl sm:max-w-3xl md:max-w-4xl lg:max-w-3xl mx-auto -mt-3 sm:-mt-6 md:-mt-8 lg:-mt-12 mb-1 px-2 select-none z-10 overflow-x-clip ${className}`}
    >
      {/* Ambient Radial Spotlight behind the prize podium */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: spotlightOpacity }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-28 sm:h-40 bg-gradient-to-r from-emerald-600/20 via-[#FBE202]/30 to-amber-500/25 rounded-full blur-3xl pointer-events-none -z-10"
      />

      {/* Prize Podium Stage */}
      <div
        className="relative w-full h-64 sm:h-76 md:h-84 lg:h-72 flex items-end justify-center pb-2"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        {/* Unified Ground Contact Floor Shadow */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: stageShadowOpacity, scale: stageShadowScale }}
          className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 w-11/12 h-6 sm:h-8 bg-black/80 rounded-full blur-xl pointer-events-none z-0"
        />

        {/* 3 Confetti Blaster Trumpets springing from behind the prizes on initial load */}
        <ConfettiBlasterTrumpets isVisible={isVisible} delay={0.4} />

        {/* ========================================================================= */}
        {/* 1. BASE LAYER: Car on left + Smart TV on right                            */}
        {/* ========================================================================= */}
        <div
          className="relative z-10 w-full flex items-end justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Left: Red SUV Car - Stagger 1 (Delay: 0.05s) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ ...entranceSpring, delay: 0.05 }}
            className="w-[72%] sm:w-[70%] md:w-[67%] lg:w-[48%] max-w-[585px] lg:max-w-[420px] shrink-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              style={{
                x: carX,
                y: carY,
                rotateY: carRotateY,
                scale: carScale,
                opacity: carOpacity,
                transformOrigin: 'center center',
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              className="relative w-full cursor-pointer pointer-events-auto hover:z-40 transition-[z-index]"
            >
              {/* Car tire floor shadow */}
              <motion.div
                aria-hidden="true"
                style={{ opacity: carShadowOpacity }}
                className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-5/6 h-6 sm:h-8 bg-black/85 rounded-full blur-md pointer-events-none"
              />

              <img
                src="/assets/raffle-car.png"
                alt="Grand Prize Red SUV Car"
                className="w-full h-auto object-contain filter drop-shadow-[0_18px_32px_rgba(0,0,0,0.85)] hover:drop-shadow-[0_22px_40px_rgba(220,38,38,0.4)] transition-all duration-300"
              />
            </motion.div>
          </motion.div>

          {/* Right: Smart TV - Stagger 2 (Delay: 0.16s), z-10 base */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ ...entranceSpring, delay: 0.16 }}
            className="w-[38%] sm:w-[37%] md:w-[36%] lg:w-[26%] max-w-[300px] lg:max-w-[220px] -ml-12 sm:-ml-16 md:-ml-20 lg:-ml-12 shrink-0 self-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              style={{
                x: tvX,
                y: tvY,
                rotateY: tvRotateY,
                scale: tvScale,
                opacity: tvOpacity,
                transformOrigin: 'center center',
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              className="relative w-full cursor-pointer pointer-events-auto z-10 hover:z-40 transition-[z-index]"
            >
              {/* TV feet contact shadow */}
              <motion.div
                aria-hidden="true"
                style={{ opacity: tvShadowOpacity }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-3 sm:h-4 bg-black/80 rounded-full blur-sm pointer-events-none"
              />

              <img
                src="/assets/raffle-tv.png"
                alt="Smart TV Prize"
                className="w-full h-auto object-contain filter drop-shadow-[0_14px_28px_rgba(0,0,0,0.85)] hover:drop-shadow-[0_18px_36px_rgba(0,0,0,0.95)] transition-all duration-300"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* 2. FOREGROUND INTERCONNECTED CLUSTER: Money, Rice, Gas & Powerbank       */}
        {/* All touching and overlapping each other in front of the TV and Car        */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-x-0 bottom-3 sm:bottom-4 z-25 pointer-events-none flex items-end justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* A. Money Bundles - Touching front of car & left edge of rice */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ ...entranceSpring, delay: 0.4 }}
            className="w-32 sm:w-44 md:w-52 shrink-0 self-end mb-1 sm:mb-2 -mr-8 sm:-mr-12 md:-mr-14"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              style={{
                x: cashX,
                y: cashY,
                scale: cashScale,
                opacity: cashOpacity,
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.96 }}
              className="relative w-full cursor-pointer pointer-events-auto z-30 hover:z-50 transition-[z-index]"
            >
              {/* Money ground shadow */}
              <motion.div
                aria-hidden="true"
                style={{ opacity: stageShadowOpacity }}
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5/6 h-5 sm:h-6 bg-black/90 rounded-full blur-md pointer-events-none"
              />

              <img
                src="/assets/raffle-cash.png"
                alt="Cash Prize Bundles"
                className="w-full h-auto object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.9)] hover:drop-shadow-[0_20px_36px_rgba(251,226,2,0.5)] transition-all duration-300"
              />
            </motion.div>
          </motion.div>

          {/* B. Rice Bag - In front of TV, touching Money on left & Gas on right */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ ...entranceSpring, delay: 0.26 }}
            className="w-20 sm:w-28 md:w-34 max-w-[150px] shrink-0 self-end mb-1 sm:mb-2 -mr-6 sm:-mr-8 md:-mr-10"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              style={{
                x: riceX,
                y: riceY,
                scale: riceScale,
                opacity: riceOpacity,
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.96 }}
              className="relative w-full cursor-pointer pointer-events-auto z-25 hover:z-50 transition-[z-index]"
            >
              {/* Rice bag ground shadow */}
              <motion.div
                aria-hidden="true"
                style={{ opacity: stageShadowOpacity }}
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-black/90 rounded-full blur-xs pointer-events-none"
              />

              <img
                src="/assets/raffle-rice.png"
                alt="Bag of Rice Prize"
                className="w-full h-auto object-contain filter drop-shadow-[0_14px_26px_rgba(0,0,0,0.9)] hover:drop-shadow-[0_18px_32px_rgba(34,197,94,0.5)] transition-all duration-300"
              />
            </motion.div>
          </motion.div>

          {/* C. Gas Cylinder - In front of TV right side, touching Rice on left & Powerbank */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ ...entranceSpring, delay: 0.32 }}
            className="w-18 sm:w-24 md:w-30 max-w-[130px] shrink-0 self-end mb-1 sm:mb-2"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              style={{
                x: gasX,
                y: gasY,
                scale: gasScale,
                opacity: gasOpacity,
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.96 }}
              className="relative w-full cursor-pointer pointer-events-auto z-20 hover:z-50 transition-[z-index]"
            >
              {/* Gas Cylinder floor shadow */}
              <motion.div
                aria-hidden="true"
                style={{ opacity: stageShadowOpacity }}
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-3.5 bg-black/90 rounded-full blur-sm pointer-events-none"
              />

              <img
                src="/assets/raffle-gas.png"
                alt="Cooking Gas Cylinder Prize"
                className="w-full h-auto object-contain filter drop-shadow-[0_14px_26px_rgba(0,0,0,0.9)] hover:drop-shadow-[0_18px_32px_rgba(234,179,8,0.5)] transition-all duration-300"
              />
            </motion.div>
          </motion.div>

          {/* D. Heavy-Duty Power Bank - In front, touching Money, Rice & Gas Cylinder */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ ...entranceSpring, delay: 0.46 }}
            className="w-18 sm:w-24 md:w-30 max-w-[130px] -ml-8 sm:-ml-12 md:-ml-14 shrink-0 self-end mb-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              style={{
                x: powerX,
                y: powerY,
                scale: powerScale,
                opacity: powerOpacity,
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.96 }}
              className="relative w-full cursor-pointer pointer-events-auto z-35 hover:z-50 transition-[z-index]"
            >
              {/* Power Bank floor shadow */}
              <motion.div
                aria-hidden="true"
                style={{ opacity: stageShadowOpacity }}
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-3.5 bg-black/95 rounded-full blur-xs pointer-events-none"
              />

              <img
                src="/assets/raffle-powerbank.png"
                alt="High Capacity Power Bank Prize"
                className="w-full h-auto object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.95)] hover:drop-shadow-[0_20px_34px_rgba(249,115,22,0.5)] transition-all duration-300"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

export default PrizesShowcase;
