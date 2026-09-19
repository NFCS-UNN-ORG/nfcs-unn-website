import React, { ElementType, useEffect, useRef, useState, useMemo } from 'react';
import { cn } from '../../lib/utils';
import {
  motion,
  useAnimationControls,
  Transition,
} from 'framer-motion';

interface ComesInGoesOutUnderlineProps {
  /**
   * The content to be displayed and animated
   */
  children: React.ReactNode;

  /**
   * HTML Tag to render the component as
   * @default span
   */
  as?: ElementType;

  /**
   * Direction of the animation
   * @default "left"
   */
  direction?: 'left' | 'right';

  /**
   * Optional class name for styling
   */
  className?: string;

  /**
   * Height of the underline as a ratio of font size
   * @default 0.1
   */
  underlineHeightRatio?: number;

  /**
   * Padding of the underline as a ratio of font size
   * @default 0.01
   */
  underlinePaddingRatio?: number;

  /**
   * Animation transition configuration
   * @default { duration: 0.4, ease: "easeInOut" }
   */
  transition?: Transition;
  [key: string]: any;
}

export const ComesInGoesOutUnderline: React.FC<ComesInGoesOutUnderlineProps> = ({
  children,
  as = 'span',
  direction = 'left',
  className,
  underlineHeightRatio = 0.1,
  underlinePaddingRatio = 0.01,
  transition = {
    duration: 0.4,
    ease: 'easeInOut' as const,
  },
  ...props
}) => {
  const controls = useAnimationControls();
  const [blocked, setBlocked] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const MotionComponent = useMemo(
    () => (typeof (motion as any).create === 'function' ? (motion as any).create(as) : (motion as any)(as)),
    [as]
  );

  useEffect(() => {
    const updateUnderlineStyles = () => {
      if (textRef.current) {
        const fontSize = parseFloat(getComputedStyle(textRef.current).fontSize) || 16;
        const underlineHeight = fontSize * underlineHeightRatio;
        const underlinePadding = fontSize * underlinePaddingRatio;
        textRef.current.style.setProperty(
          '--underline-height',
          `${underlineHeight}px`
        );
        textRef.current.style.setProperty(
          '--underline-padding',
          `${underlinePadding}px`
        );
      }
    };

    updateUnderlineStyles();
    window.addEventListener('resize', updateUnderlineStyles);

    return () => window.removeEventListener('resize', updateUnderlineStyles);
  }, [underlineHeightRatio, underlinePaddingRatio]);

  const animate = async () => {
    if (blocked) return;

    setBlocked(true);

    await controls.start({
      width: '100%',
      transition,
      transitionEnd: {
        left: direction === 'left' ? 'auto' : 0,
        right: direction === 'left' ? 0 : 'auto',
      },
    });

    await controls.start({
      width: 0,
      transition,
      transitionEnd: {
        left: direction === 'left' ? 0 : '',
        right: direction === 'left' ? '' : 0,
      },
    });

    setBlocked(false);
  };

  return (
    <MotionComponent
      className={cn('relative inline-block cursor-pointer', className)}
      onHoverStart={animate}
      ref={textRef}
      {...props}
    >
      <span>{children}</span>
      <motion.span
        className={cn('absolute bg-current w-0 pointer-events-none', {
          'left-0': direction === 'left',
          'right-0': direction === 'right',
        })}
        style={{
          height: 'var(--underline-height, 2px)',
          bottom: 'calc(1 * var(--underline-padding, 0px))',
        }}
        animate={controls}
        aria-hidden="true"
      />
    </MotionComponent>
  );
};

ComesInGoesOutUnderline.displayName = 'ComesInGoesOutUnderline';

export default ComesInGoesOutUnderline;
