import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, ThemeMode } from '../context/ThemeContext';
import { useNavbarVisibility } from './ui/resizable-navbar';

interface ThemeToggleProps {
  className?: string;
  variant?: string;
}

const themeOptions: Array<{
  mode: ThemeMode;
  label: string;
  icon: React.ReactNode;
}> = [
  {
    mode: 'light',
    label: 'Light',
    icon: <Sun className="w-3.5 h-3.5 text-amber-500" />,
  },
  {
    mode: 'dark',
    label: 'Dark',
    icon: <Moon className="w-3.5 h-3.5 text-indigo-400" />,
  },
  {
    mode: 'system',
    label: 'System',
    icon: <Monitor className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />,
  },
];

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const isScrolled = useNavbarVisibility();

  const currentOption = themeOptions.find((opt) => opt.mode === theme) || themeOptions[0];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold bg-[#4D2EAB]/10 dark:bg-indigo-950/80 text-[#4D2EAB] dark:text-indigo-300 hover:bg-[#4D2EAB]/20 dark:hover:bg-indigo-900/80 border border-[#4D2EAB]/20 dark:border-indigo-800/80 shadow-xs transition-all duration-200 cursor-pointer whitespace-nowrap backdrop-blur-md active:scale-95"
        aria-label="Select theme"
        title={`Theme: ${currentOption.label}`}
      >
        <span className="flex items-center gap-1.5">
          {currentOption.icon}
          {!isScrolled && <span>{currentOption.label}</span>}
        </span>
        {!isScrolled && (
          <ChevronDown
            className={`w-3 h-3 text-[#4D2EAB]/70 dark:text-indigo-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute right-0 top-full mt-2 w-36 p-1.5 rounded-2xl bg-white/95 dark:bg-[#080A26]/95 border border-stone-200/90 dark:border-slate-800 shadow-xl backdrop-blur-xl z-50 ring-1 ring-stone-900/5 dark:ring-white/10"
            >
              {themeOptions.map((option) => {
                const isActive = option.mode === theme;
                return (
                  <button
                    key={option.mode}
                    onClick={() => {
                      setTheme(option.mode);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#4D2EAB]/10 text-[#4D2EAB] dark:bg-indigo-950/80 dark:text-indigo-300 font-bold'
                        : 'text-stone-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {option.icon}
                      <span>{option.label}</span>
                    </span>
                    {isActive && <Check className="w-3.5 h-3.5 text-[#4D2EAB] dark:text-indigo-400" />}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
