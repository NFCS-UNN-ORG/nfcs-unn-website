import React from "react";
import { motion, AnimatePresence } from "motion/react";

export interface NavItemProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  hoverKey: string;
  currentHover: string | null;
  onMouseEnter: (key: string) => void;
  onMouseLeave: () => void;
  onClick?: () => void;
  isActive?: boolean;
}

/* === NAV ITEM WITH ANIMATED ICON ON HOVER & SLIDING UNDERLINE === */
export const NavItem: React.FC<NavItemProps> = ({
  children,
  icon,
  hoverKey,
  currentHover,
  onMouseEnter,
  onMouseLeave,
  onClick,
  isActive,
}) => {
  const isHovered = currentHover === hoverKey;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onMouseEnter(hoverKey)}
      onMouseLeave={onMouseLeave}
      className={`relative px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer rounded-lg whitespace-nowrap ${
        isActive
          ? "text-amber-400 dark:text-amber-400 font-extrabold"
          : isHovered
            ? "text-[#4D2EAB] dark:text-indigo-400"
            : "text-stone-700 dark:text-slate-100 hover:text-[#4D2EAB] dark:hover:text-indigo-400"
      }`}
    >
      <span className="relative z-10 flex items-center gap-1.5">
        {/* Active link always displays icon; other links display icon on hover with fade-in-down */}
        <AnimatePresence>
          {isActive && icon ? (
            <motion.span
              key="active-icon"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="inline-flex items-center text-amber-400 dark:text-amber-400"
            >
              {icon}
            </motion.span>
          ) : isHovered && icon ? (
            <motion.span
              key="hover-icon"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="inline-flex items-center text-current"
            >
              {icon}
            </motion.span>
          ) : null}
        </AnimatePresence>
        <span>{children}</span>
      </span>

      {/* Animated Underline on Hover */}
      {isHovered && !isActive && (
        <motion.span
          layoutId="nav-hover-underline"
          className="absolute bottom-0 left-2 right-2 h-[2.5px] rounded-full bg-[#4D2EAB]/60 dark:bg-indigo-400/60"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}

      {/* Active Tab Underline in Yellow Accent Color */}
      {isActive && (
        <motion.span
          layoutId="nav-active-underline"
          className="absolute bottom-0 left-2 right-2 h-[3px] rounded-full bg-amber-400 dark:bg-amber-400"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </button>
  );
};
