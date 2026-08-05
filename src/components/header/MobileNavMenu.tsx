import React from 'react';
import { PageTab } from '../../types';
import { Home, Info, Menu, X, LogIn, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NfcsLogo } from '../NfcsLogo';
import { ThemeToggle } from '../ThemeToggle';

interface MenuItem {
  id: PageTab;
  label: string;
  icon: React.ReactNode;
  desc: string;
}

interface MobileNavMenuProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  structureMenu: MenuItem[];
  highlightsMenu: MenuItem[];
  resourcesMenu: MenuItem[];
}

export const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  activeTab,
  setActiveTab,
  mobileMenuOpen,
  setMobileMenuOpen,
  structureMenu,
  highlightsMenu,
  resourcesMenu,
}) => {
  return (
    <>
      <div className="flex items-center justify-between w-full px-4 py-3 bg-transparent backdrop-blur-md border-b border-transparent shadow-none">
        <button onClick={() => setActiveTab('home')} className="flex items-center">
          <NfcsLogo size={48} />
        </button>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <a
            href="https://portal.nfcsunn.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-[#4D2EAB] dark:bg-indigo-600 rounded-full shadow-xs"
          >
            <LogIn className="w-3.5 h-3.5 text-white" />
            Portal
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-stone-100 dark:bg-slate-800 text-stone-800 dark:text-slate-200 hover:bg-stone-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Floating Mobile Card Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="w-full bg-white dark:bg-[#080A26] border-b border-stone-200 dark:border-slate-800 shadow-2xl p-4 space-y-4 max-h-[85vh] overflow-y-auto"
          >
            {/* Main Links */}
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-slate-500 px-3">
                Navigation
              </p>
              <button
                onClick={() => {
                  setActiveTab('home');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-left ${
                  activeTab === 'home'
                    ? 'bg-[#4D2EAB] text-white'
                    : 'text-stone-800 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-800'
                }`}
              >
                <Home className="w-4 h-4" />
                Home
              </button>

              <button
                onClick={() => {
                  setActiveTab('about');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-left ${
                  activeTab === 'about'
                    ? 'bg-[#4D2EAB] text-white'
                    : 'text-stone-800 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-800'
                }`}
              >
                <Info className="w-4 h-4" />
                About Us
              </button>
            </div>

            {/* Structure */}
            <div className="space-y-1 border-t border-stone-100 dark:border-slate-800 pt-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-slate-500 px-3">
                Structure
              </p>
              {structureMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-semibold text-left ${
                    activeTab === item.id
                      ? 'bg-[#4D2EAB]/10 text-[#4D2EAB] dark:bg-indigo-950 dark:text-indigo-300 font-bold'
                      : 'text-stone-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>

            {/* Highlights */}
            <div className="space-y-1 border-t border-stone-100 dark:border-slate-800 pt-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-slate-500 px-3">
                Highlights
              </p>
              {highlightsMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-semibold text-left ${
                    activeTab === item.id
                      ? 'bg-[#4D2EAB]/10 text-[#4D2EAB] dark:bg-indigo-950 dark:text-indigo-300 font-bold'
                      : 'text-stone-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>

            {/* Resources */}
            <div className="space-y-1 border-t border-stone-100 dark:border-slate-800 pt-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-slate-500 px-3">
                Resources
              </p>
              {resourcesMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-semibold text-left ${
                    activeTab === item.id
                      ? 'bg-[#4D2EAB]/10 text-[#4D2EAB] dark:bg-indigo-950 dark:text-indigo-300 font-bold'
                      : 'text-stone-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>

            {/* Contact Us */}
            <div className="space-y-1 border-t border-stone-100 dark:border-slate-800 pt-3">
              <button
                onClick={() => {
                  setActiveTab('contact');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-left ${
                  activeTab === 'contact'
                    ? 'bg-[#4D2EAB] text-white'
                    : 'text-stone-800 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-800'
                }`}
              >
                <Phone className="w-4 h-4" />
                Contact Us
              </button>
            </div>

            {/* Portal Login & Theme Toggle */}
            <div className="pt-3 border-t border-stone-100 dark:border-slate-800 flex flex-col gap-2">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-semibold text-stone-600 dark:text-slate-400">Theme</span>
                <ThemeToggle />
              </div>

              <a
                href="https://portal.nfcsunn.org"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-[#4D2EAB] dark:bg-indigo-600 shadow-sm"
              >
                <LogIn className="w-4 h-4 text-white" />
                Member Portal (portal.nfcsunn.org)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

