import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CoinCursor: React.FC = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 600, damping: 28, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only show on desktop devices with a mouse/fine pointer; disable on touch screens to eliminate physics listeners
    if (
      typeof window === 'undefined' ||
      window.innerWidth < 768 ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        scale: isClicking ? 0.82 : 1,
        rotate: isClicking ? -15 : 0,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
      className="fixed top-0 left-0 z-[99999] pointer-events-none select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.65)]"
    >
      <img
        src="/gold-coin-cursor.svg"
        alt=""
        className="size-8 object-contain filter drop-shadow-[0_2px_8px_rgba(251,226,2,0.4)]"
      />
    </motion.div>
  );
});

export default CoinCursor;
