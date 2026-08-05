import React from 'react';
import { PageTab } from '../../types';
import { Home, Info, Shield, Sparkles, FolderOpen, ChevronDown, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NavItem } from '../NavItem';

interface MenuItem {
  id: PageTab;
  label: string;
  icon: React.ReactNode;
  desc: string;
}

interface DesktopNavDropdownsProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  hoveredKey: string | null;
  setHoveredKey: (key: string | null) => void;
  openDropdown: string | null;
  setOpenDropdown: (key: string | null) => void;
  structureMenu: MenuItem[];
  highlightsMenu: MenuItem[];
  resourcesMenu: MenuItem[];
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export const DesktopNavDropdowns: React.FC<DesktopNavDropdownsProps> = ({
  activeTab,
  setActiveTab,
  hoveredKey,
  setHoveredKey,
  openDropdown,
  setOpenDropdown,
  structureMenu,
  highlightsMenu,
  resourcesMenu,
  dropdownRef,
}) => {
  const isStructureActive = structureMenu.some((item) => item.id === activeTab) || activeTab === 'structure';
  const isHighlightsActive = highlightsMenu.some((item) => item.id === activeTab);
  const isResourcesActive = resourcesMenu.some((item) => item.id === activeTab);

  return (
    <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
      {/* 1. Home */}
      <NavItem
        hoverKey="home"
        currentHover={hoveredKey}
        onMouseEnter={setHoveredKey}
        onMouseLeave={() => setHoveredKey(null)}
        onClick={() => setActiveTab('home')}
        isActive={activeTab === 'home'}
        icon={<Home className="w-4 h-4 text-[#4D2EAB] dark:text-indigo-400" />}
      >
        Home
      </NavItem>

      {/* 2. About Us */}
      <NavItem
        hoverKey="about"
        currentHover={hoveredKey}
        onMouseEnter={setHoveredKey}
        onMouseLeave={() => setHoveredKey(null)}
        onClick={() => setActiveTab('about')}
        isActive={activeTab === 'about'}
        icon={<Info className="w-4 h-4 text-[#4D2EAB] dark:text-indigo-400" />}
      >
        About Us
      </NavItem>

      {/* 3. Structure Dropdown (renamed from Spiritual Life) */}
      <div
        className="relative"
        onMouseEnter={() => {
          setOpenDropdown('structure');
          setHoveredKey('structure');
        }}
        onMouseLeave={() => {
          setOpenDropdown(null);
          setHoveredKey(null);
        }}
      >
        <NavItem
          hoverKey="structure"
          currentHover={hoveredKey}
          onMouseEnter={setHoveredKey}
          onMouseLeave={() => setHoveredKey(null)}
          isActive={isStructureActive}
          icon={<Shield className="w-4 h-4 text-[#4D2EAB] dark:text-indigo-400" />}
        >
          <span className="flex items-center gap-1">
            Structure
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                openDropdown === 'structure' ? 'rotate-180' : ''
              }`}
            />
          </span>
        </NavItem>

        <AnimatePresence>
          {openDropdown === 'structure' && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="absolute left-0 top-full mt-2 w-72 max-h-[75vh] overflow-y-auto rounded-2xl border border-stone-200/90 dark:border-slate-800 bg-white/95 dark:bg-[#080A26]/95 backdrop-blur-xl shadow-2xl p-2 z-50 ring-1 ring-stone-900/5 dark:ring-white/10"
            >
              {structureMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setOpenDropdown(null);
                  }}
                  className={`w-full flex items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-all cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-[#4D2EAB]/10 text-[#4D2EAB] dark:bg-indigo-950/80 dark:text-indigo-300 font-bold'
                      : 'hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-800 dark:text-slate-200'
                  }`}
                >
                  <span className="mt-0.5 shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-xs font-semibold">{item.label}</p>
                    <p className="text-[10px] text-stone-500 dark:text-slate-400 font-normal leading-tight">
                      {item.desc}
                    </p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Highlights Dropdown (renamed from Impact & Events) */}
      <div
        className="relative"
        onMouseEnter={() => {
          setOpenDropdown('highlights');
          setHoveredKey('highlights');
        }}
        onMouseLeave={() => {
          setOpenDropdown(null);
          setHoveredKey(null);
        }}
      >
        <NavItem
          hoverKey="highlights"
          currentHover={hoveredKey}
          onMouseEnter={setHoveredKey}
          onMouseLeave={() => setHoveredKey(null)}
          isActive={isHighlightsActive}
          icon={<Sparkles className="w-4 h-4 text-[#4D2EAB] dark:text-indigo-400" />}
        >
          <span className="flex items-center gap-1">
            Highlights
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                openDropdown === 'highlights' ? 'rotate-180' : ''
              }`}
            />
          </span>
        </NavItem>

        <AnimatePresence>
          {openDropdown === 'highlights' && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-stone-200/90 dark:border-slate-800 bg-white/95 dark:bg-[#080A26]/95 backdrop-blur-xl shadow-2xl p-2 z-50 ring-1 ring-stone-900/5 dark:ring-white/10"
            >
              {highlightsMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setOpenDropdown(null);
                  }}
                  className={`w-full flex items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-all cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-[#4D2EAB]/10 text-[#4D2EAB] dark:bg-indigo-950/80 dark:text-indigo-300 font-bold'
                      : 'hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-800 dark:text-slate-200'
                  }`}
                >
                  <span className="mt-0.5 shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-xs font-semibold">{item.label}</p>
                    <p className="text-[10px] text-stone-500 dark:text-slate-400 font-normal leading-tight">
                      {item.desc}
                    </p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. Resources Dropdown (renamed from Media & News) */}
      <div
        className="relative"
        onMouseEnter={() => {
          setOpenDropdown('resources');
          setHoveredKey('resources');
        }}
        onMouseLeave={() => {
          setOpenDropdown(null);
          setHoveredKey(null);
        }}
      >
        <NavItem
          hoverKey="resources"
          currentHover={hoveredKey}
          onMouseEnter={setHoveredKey}
          onMouseLeave={() => setHoveredKey(null)}
          isActive={isResourcesActive}
          icon={<FolderOpen className="w-4 h-4 text-[#4D2EAB] dark:text-indigo-400" />}
        >
          <span className="flex items-center gap-1">
            Resources
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                openDropdown === 'resources' ? 'rotate-180' : ''
              }`}
            />
          </span>
        </NavItem>

        <AnimatePresence>
          {openDropdown === 'resources' && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-stone-200/90 dark:border-slate-800 bg-white/95 dark:bg-[#080A26]/95 backdrop-blur-xl shadow-2xl p-2 z-50 ring-1 ring-stone-900/5 dark:ring-white/10"
            >
              {resourcesMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setOpenDropdown(null);
                  }}
                  className={`w-full flex items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-all cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-[#4D2EAB]/10 text-[#4D2EAB] dark:bg-indigo-950/80 dark:text-indigo-300 font-bold'
                      : 'hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-800 dark:text-slate-200'
                  }`}
                >
                  <span className="mt-0.5 shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-xs font-semibold">{item.label}</p>
                    <p className="text-[10px] text-stone-500 dark:text-slate-400 font-normal leading-tight">
                      {item.desc}
                    </p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 6. Contact Us */}
      <NavItem
        hoverKey="contact"
        currentHover={hoveredKey}
        onMouseEnter={setHoveredKey}
        onMouseLeave={() => setHoveredKey(null)}
        onClick={() => setActiveTab('contact')}
        isActive={activeTab === 'contact'}
        icon={<Phone className="w-4 h-4 text-[#4D2EAB] dark:text-indigo-400" />}
      >
        Contact Us
      </NavItem>
    </div>
  );
};

