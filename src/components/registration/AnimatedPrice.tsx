import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedPriceProps {
  amount: number;
  currency?: string;
  className?: string;
}

export const AnimatedPrice: React.FC<AnimatedPriceProps> = ({
  amount,
  currency = '₦',
  className = '',
}) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const prevAmountRef = useRef(amount);
  const formatted = amount.toLocaleString();

  useEffect(() => {
    if (prevAmountRef.current !== amount) {
      setIsFlashing(true);
      prevAmountRef.current = amount;
      const timer = setTimeout(() => setIsFlashing(false), 280);
      return () => clearTimeout(timer);
    }
  }, [amount]);

  return (
    <motion.span
      animate={{
        scale: isFlashing ? [1, 1.07, 1] : 1,
        color: isFlashing ? '#FBE202' : '#FFFFFF',
      }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className={`inline-flex items-baseline font-mono font-black select-none ${className}`}
    >
      <span>{currency}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={formatted}
          initial={{ y: -8, opacity: 0, filter: 'blur(2px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: 8, opacity: 0, filter: 'blur(2px)' }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="inline-block"
        >
          {formatted}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
};

export default AnimatedPrice;
