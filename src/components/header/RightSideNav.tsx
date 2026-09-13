import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTab } from '../../types';
import { ComesInGoesOutUnderline } from '../ui/ComesInGoesOutUnderline';

interface RightSideNavProps {
  activeTab: PageTab;
  onNavigate: (tab: PageTab) => void;
}

interface SectionItem {
  id: string;
  label: string;
}

// Subsections list under Home: Hero Sanctuary replaced with Welcome, Impact Stats and Vision Mission removed
const HOME_SECTIONS: SectionItem[] = [
  { id: 'hero', label: 'Welcome' },
  { id: 'story-spotlight', label: 'Stories & Spotlight' },
  { id: 'pillars', label: 'Our Pillars' },
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'chaplaincy', label: 'Chaplaincy' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'newsletter', label: 'Newsletter' },
];

const MAIN_NAV_PAGES: { tab: PageTab; label: string }[] = [
  { tab: 'structure', label: 'Structure' },
  { tab: 'get-involved', label: 'Get Involved' },
  { tab: 'contact', label: 'Contact' },
];

// Stagger entrance variants: appears at the end of the hero text animation (~2.15s) from the right
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 2.15,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const RightSideNav: React.FC<RightSideNavProps> = ({ activeTab, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Auto-opens when scrolling down
  const isExpanded = isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);

      // Section tracker across ANY cycle in endless scroll
      // Finds the section currently occupying the upper-middle viewport
      const sectionElements = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
      let currentActive = 'hero';
      for (const el of sectionElements) {
        const rect = el.getBoundingClientRect();
        // If section top has reached 45% viewport and bottom is still visible
        if (rect.top <= window.innerHeight * 0.45 && rect.bottom > 50) {
          currentActive = el.getAttribute('data-section') || 'hero';
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const matching = Array.from(document.querySelectorAll<HTMLElement>(`[data-section="${id}"]`));
    if (matching.length === 0) return;
    // Find the one in the current or upcoming cycle closest to current scroll
    let target = matching[0];
    for (const el of matching) {
      const rect = el.getBoundingClientRect();
      if (rect.bottom >= -50) {
        target = el;
        break;
      }
    }
    target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Right Page Navigation"
      className="hidden lg:flex fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 z-50 flex-col items-end pointer-events-none select-none max-h-[90vh] overflow-y-auto pr-1 py-4"
      style={{ scrollbarWidth: 'none' }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        className="flex flex-col items-end space-y-4 pointer-events-auto bg-transparent"
      >
        {/* 1. Home Item with ComesInGoesOutUnderline (+15% larger, hover +10% scale and 0.5rem letter spacing) */}
        <motion.div variants={itemVariants} layout className="flex flex-col items-end">
          <button
            onClick={() => {
              if (activeTab === 'home') {
                scrollToSection('hero');
              } else {
                onNavigate('home');
              }
            }}
            className="py-1 text-right cursor-pointer text-white hover:text-amber-300 transition-all duration-300 transform origin-right hover:scale-110 hover:tracking-[0.5rem]"
          >
            <ComesInGoesOutUnderline
              direction="right"
              className="text-base sm:text-[1.05rem] tracking-wider uppercase font-bold text-white hover:text-amber-300 transition-colors"
            >
              Home
            </ComesInGoesOutUnderline>
          </button>

          {/* Subsections dropdown under Home - auto opens on scroll */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden flex flex-col items-end pr-2 pt-1 pb-2 space-y-2 border-r border-white/20 mr-0.5"
              >
                {HOME_SECTIONS.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`text-right text-xs sm:text-[13px] tracking-wide transition-all duration-300 py-0.5 px-2 rounded-md cursor-pointer block transform origin-right hover:scale-110 hover:tracking-[0.5rem] ${
                        isActive
                          ? 'text-amber-300 font-bold scale-105'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <ComesInGoesOutUnderline direction="right">
                        {section.label}
                      </ComesInGoesOutUnderline>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 2. Other Pages: Structure, Get Involved, Contact with ComesInGoesOutUnderline (+15% size, hover +10% scale and 0.5rem letter spacing) */}
        <motion.div
          variants={itemVariants}
          layout
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="flex flex-col items-end space-y-3.5 pt-0.5"
        >
          {MAIN_NAV_PAGES.map((page) => (
            <motion.button
              key={page.tab}
              variants={itemVariants}
              layout
              onClick={() => onNavigate(page.tab)}
              className="py-0.5 text-right cursor-pointer text-slate-300 hover:text-white transition-all duration-300 transform origin-right hover:scale-110 hover:tracking-[0.5rem]"
            >
              <ComesInGoesOutUnderline
                direction="right"
                className="text-sm sm:text-[14px] uppercase tracking-widest font-semibold hover:font-bold"
              >
                {page.label}
              </ComesInGoesOutUnderline>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </nav>
  );
};
