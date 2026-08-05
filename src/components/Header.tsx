import React, { useState, useRef, useEffect } from 'react';
import { PageTab } from '../types';
import { Cross, Sparkles, FileText, Calendar, BookOpen, LogIn, ImageIcon, HelpCircle, Award, Heart, Users, Shield, GraduationCap, Compass, CalendarDays } from 'lucide-react';
import { NfcsLogo } from './NfcsLogo';
import { TopNotificationBar } from './TopNotificationBar';
import { ResizableNavbar, NavBody, MobileNav, useNavbarVisibility } from './ui/resizable-navbar';
import { ThemeToggle } from './ThemeToggle';
import { DesktopNavDropdowns } from './header/DesktopNavDropdowns';
import { MobileNavMenu } from './header/MobileNavMenu';

interface HeaderProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const isScrolled = useNavbarVisibility();
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* Dropdown Menus Data */
  const structureMenu: {
    id: PageTab;
    label: string;
    icon: React.ReactNode;
    desc: string;
  }[] = [
    {
      id: 'mass-confession',
      label: 'Mass Times & Confession',
      icon: <Cross className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      desc: 'Holy Mass & sacramental confession schedules',
    },
    {
      id: 'prayer-request',
      label: 'Prayer Request',
      icon: <Heart className="w-4 h-4 text-rose-600 dark:text-rose-400" />,
      desc: 'Submit intentions to St. Peter’s Chaplaincy intercessors',
    },
    {
      id: 'fellowship',
      label: 'Student General Fellowship',
      icon: <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
      desc: 'Mid-week Tuesday gathering & worship',
    },
    {
      id: 'organs',
      label: 'Organs',
      icon: <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      desc: '5 Organs & their individual meeting times/days',
    },
    {
      id: 'societies',
      label: 'Societies',
      icon: <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
      desc: 'Pious, Marian & liturgical societies',
    },
    {
      id: 'faculties',
      label: 'Faculties',
      icon: <GraduationCap className="w-4 h-4 text-sky-600 dark:text-sky-400" />,
      desc: 'Catholic associations across UNN faculties',
    },
    {
      id: 'mentorship',
      label: 'Mentorship',
      icon: <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      desc: 'Academic, spiritual & career mentorship network',
    },
    {
      id: 'academic-support',
      label: 'Academic Support',
      icon: <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      desc: 'Tutorials, past questions, study groups & exam support',
    },
    {
      id: 'forums',
      label: 'First Year & Final Year Forum',
      icon: <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />,
      desc: 'Fresher welcome & finalist transition forums',
    },
    {
      id: 'alumni',
      label: 'Alumni',
      icon: <Award className="w-4 h-4 text-rose-500 dark:text-rose-400" />,
      desc: 'NFCS UNN global graduate network',
    },
  ];

  const highlightsMenu: {
    id: PageTab;
    label: string;
    icon: React.ReactNode;
    desc: string;
  }[] = [
    {
      id: 'initiatives',
      label: 'Projects & Impact',
      icon: <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />,
      desc: 'Chaplaincy development & welfare programs',
    },
    {
      id: 'events',
      label: 'Upcoming Events',
      icon: <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
      desc: 'Harvest & Bazaar, retreats & conventions',
    },
    {
      id: 'success-stories',
      label: 'Success Stories',
      icon: <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      desc: 'Testimonials & chaplaincy impact stories',
    },
  ];

  const resourcesMenu: {
    id: PageTab;
    label: string;
    icon: React.ReactNode;
    desc: string;
  }[] = [
    {
      id: 'gallery',
      label: 'Photo & Video Gallery',
      icon: <ImageIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
      desc: 'Mass photos, event albums & video highlights',
    },
    {
      id: 'blog',
      label: 'Blog & News',
      icon: <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      desc: 'Spiritual reflections & chapter news',
    },
    {
      id: 'faq',
      label: 'FAQ & Support',
      icon: <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      desc: 'Frequently asked questions & help guide',
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: <CalendarDays className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
      desc: 'Unified chapter calendar (Masses, organs, events)',
    },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <TopNotificationBar onNavigate={setActiveTab} />

      {/* Floating Resizable Navbar - Sticky at top-0 */}
      <header className="sticky top-0 z-50 w-full bg-transparent transition-all">
        <ResizableNavbar>
          <NavBody>
            {/* Prominent Logo Icon Only */}
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center text-left group focus:outline-hidden cursor-pointer shrink-0 py-1"
              aria-label="NFCS UNN Home"
            >
              <div className="shrink-0 group-hover:scale-105 transition-transform duration-200">
                <NfcsLogo size={50} />
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <DesktopNavDropdowns
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              hoveredKey={hoveredKey}
              setHoveredKey={setHoveredKey}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              structureMenu={structureMenu}
              highlightsMenu={highlightsMenu}
              resourcesMenu={resourcesMenu}
              dropdownRef={dropdownRef}
            />

            {/* Right Action Triggers - ThemeToggle & Portal Login */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <ThemeToggle />

              <a
                href="https://portal.nfcsunn.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#4D2EAB] hover:bg-[#3B2285] dark:bg-indigo-600 dark:hover:bg-indigo-500 border border-[#4D2EAB] dark:border-indigo-500 px-3 py-1.5 rounded-full shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95 whitespace-nowrap"
                title="NFCS UNN Portal"
              >
                <LogIn className="w-3.5 h-3.5 text-white shrink-0" />
                {!isScrolled && <span>Portal</span>}
              </a>
            </div>
          </NavBody>

          {/* Mobile Header Bar */}
          <MobileNav>
            <MobileNavMenu
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              structureMenu={structureMenu}
              highlightsMenu={highlightsMenu}
              resourcesMenu={resourcesMenu}
            />
          </MobileNav>
        </ResizableNavbar>
      </header>
    </>
  );
};

