import React, { createContext, useContext, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';

interface NavbarProps {
  children?: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children?: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavProps {
  children?: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavbarContextValue {
  visible: boolean;
  width: number;
  setWidth: (width: number) => void;
}

const NavbarVisibilityContext = createContext<NavbarContextValue>({
  visible: false,
  width: 70,
  setWidth: () => { },
});

export const useNavbarVisibility = () => {
  const context = useContext(NavbarVisibilityContext);
  return context.visible;
};

export const ResizableNavbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(70);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 40) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  const contextValue: NavbarContextValue = {
    visible,
    width,
    setWidth,
  };

  return (
    <NavbarVisibilityContext.Provider value={contextValue}>
      <motion.div
        ref={ref}
        className={`w-full bg-transparent ${className || ''}`}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible })
            : child
        )}
      </motion.div>
    </NavbarVisibilityContext.Provider>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  const displayWidth = visible ? 70 : 100;

  return (
    <motion.div
      animate={{
        width: `${displayWidth}%`,
        y: visible ? 10 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 240,
        damping: 28,
      }}
      className={`mx-auto hidden lg:flex flex-row items-center justify-between transition-all duration-300 px-4 py-1.5 max-w-7xl ${visible
        ? 'bg-white/60 dark:bg-[#080A26]/70 backdrop-blur-xl shadow-2xl rounded-full border border-white/40 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/10'
        : 'bg-transparent border-none rounded-none'
        } ${className || ''}`}
    >
      {children}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        y: visible ? 2 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 30,
      }}
      className={`mx-auto flex w-full flex-col items-center justify-between bg-transparent lg:hidden ${className || ''}`}
    >
      {children}
    </motion.div>
  );
};
