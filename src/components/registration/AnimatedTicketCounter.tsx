import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedTicketCounterProps {
  count: number | null;
  className?: string;
}

export const AnimatedTicketCounter: React.FC<AnimatedTicketCounterProps> = ({
  count,
  className = '',
}) => {
  const [displayCount, setDisplayCount] = useState<number>(0);
  const [hasIncremented, setHasIncremented] = useState(false);
  const prevCountRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (count === null || count === undefined) return;

    // Initial load: Count up from 0 to count over ~1000ms with ease-out cubic
    if (prevCountRef.current === null) {
      const target = count;
      const duration = 1000;
      const startTime = performance.now();

      const updateCounter = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic: 1 - (1 - t)^3
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(eased * target);

        setDisplayCount(currentVal);

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(updateCounter);
        } else {
          setDisplayCount(target);
          prevCountRef.current = target;
        }
      };

      animFrameRef.current = requestAnimationFrame(updateCounter);
    } else if (count > prevCountRef.current) {
      // Incremental live update: flash indicator and update
      setHasIncremented(true);
      setDisplayCount(count);
      prevCountRef.current = count;
      const timer = setTimeout(() => setHasIncremented(false), 900);
      return () => clearTimeout(timer);
    } else {
      setDisplayCount(count);
      prevCountRef.current = count;
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [count]);

  return (
    <span className={`inline-flex items-center gap-1 relative ${className}`}>
      <span className="font-mono font-black">{displayCount.toLocaleString()}</span>

      {/* Floating "+1" moment flash when live sales increment */}
      <AnimatePresence>
        {hasIncremented && (
          <motion.span
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -14, scale: 1.2 }}
            exit={{ opacity: 0, y: -22 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute -top-1 -right-4 text-[10px] font-black text-[#FBE202] drop-shadow-[0_2px_8px_rgba(251,226,2,0.8)] pointer-events-none"
          >
            +1!
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export default AnimatedTicketCounter;
