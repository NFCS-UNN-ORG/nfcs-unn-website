import React, { useState } from 'react';
import { PageTab } from '../types';
import { Sparkles, Heart, Calendar, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

interface TopNotificationBarProps {
  onNavigate: (tab: PageTab) => void;
}

export const TopNotificationBar: React.FC<TopNotificationBarProps> = ({ onNavigate }) => {
  const [isHovered, setIsHovered] = useState(false);

  const announcements = [
    {
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600 shrink-0" />,
      text: "NFCS UNN HARVEST & BAZAAR 2026 IS COMING UP!",
      highlight: "IMPORTANT",
      linkTab: 'events' as PageTab,
      linkText: "LEARN MORE →",
    },
    {
      icon: <Heart className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600 shrink-0" />,
      text: "SUPPORT ST. PETER'S CHAPLAINCY BUILDING & WELFARE FUND",
      highlight: "DONATE",
      linkTab: 'donations' as PageTab,
      linkText: "SUPPORT NOW →",
    },
    {
      icon: <Calendar className="w-3.5 h-3.5 text-sky-400 dark:text-sky-600 shrink-0" />,
      text: "DAILY & SUNDAY MASS SCHEDULES UPDATED FOR THE SEMESTER",
      highlight: "SCHEDULE",
      linkTab: 'spiritual' as PageTab,
      linkText: "VIEW TIMES →",
    },
    {
      icon: <GraduationCap className="w-3.5 h-3.5 text-purple-400 dark:text-purple-600 shrink-0" />,
      text: "ALUMNI NETWORK & ENDOWMENT SCHEME IS NOW ACTIVE",
      highlight: "ALUMNI",
      linkTab: 'get-involved' as PageTab,
      linkText: "JOIN NETWORK →",
    },
  ];

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative z-50 bg-[#080A26] dark:bg-white text-slate-100 dark:text-stone-900 border-none text-xs py-2 overflow-hidden shadow-sm select-none transition-colors duration-400"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
        {/* Marquee Wrapper */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex overflow-x-hidden w-full marquee-container py-0.5"
        >
          {/* Primary Track */}
          <div className={`animate-marquee flex items-center whitespace-nowrap gap-12 ${isHovered ? 'paused' : ''}`}>
            {announcements.concat(announcements).map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-slate-100 dark:text-stone-900 font-semibold tracking-wide text-[11px] sm:text-xs"
              >
                {item.icon}
                <span>{item.text}</span>
                {item.highlight && (
                  <span className="px-1.5 py-0.5 bg-[#4D2EAB]/30 dark:bg-[#4D2EAB]/15 text-indigo-200 dark:text-[#4D2EAB] border border-[#4D2EAB]/60 dark:border-[#4D2EAB]/40 rounded text-[10px] font-bold">
                    {item.highlight}
                  </span>
                )}
                {item.linkTab && (
                  <button
                    onClick={() => onNavigate(item.linkTab)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="underline underline-offset-2 hover:text-white dark:hover:text-[#4D2EAB]/80 transition-colors font-bold ml-1 text-emerald-400 dark:text-[#4D2EAB] hover:scale-105 transform duration-150 cursor-pointer"
                  >
                    {item.linkText}
                  </button>
                )}
                <span className="text-slate-400 dark:text-stone-400 ml-6">•</span>
              </div>
            ))}
          </div>

          {/* Duplicate Track for Continuous Loop */}
          <div className={`absolute top-0 animate-marquee2 flex items-center whitespace-nowrap gap-12 ${isHovered ? 'paused' : ''}`}>
            {announcements.concat(announcements).map((item, index) => (
              <div
                key={`dup-${index}`}
                className="flex items-center gap-2 text-slate-100 dark:text-stone-900 font-semibold tracking-wide text-[11px] sm:text-xs"
              >
                {item.icon}
                <span>{item.text}</span>
                {item.highlight && (
                  <span className="px-1.5 py-0.5 bg-[#4D2EAB]/30 dark:bg-[#4D2EAB]/15 text-indigo-200 dark:text-[#4D2EAB] border border-[#4D2EAB]/60 dark:border-[#4D2EAB]/40 rounded text-[10px] font-bold">
                    {item.highlight}
                  </span>
                )}
                {item.linkTab && (
                  <button
                    onClick={() => onNavigate(item.linkTab)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="underline underline-offset-2 hover:text-white dark:hover:text-[#4D2EAB]/80 transition-colors font-bold ml-1 text-emerald-400 dark:text-[#4D2EAB] hover:scale-105 transform duration-150 cursor-pointer"
                  >
                    {item.linkText}
                  </button>
                )}
                <span className="text-slate-400 dark:text-stone-400 ml-6">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
