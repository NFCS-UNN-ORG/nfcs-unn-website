import React, { useState, useRef, useEffect } from 'react';
import { PageTab } from '../types';
import { SITE_INFO } from '../data/nfcsData';
import { Church, Cross, LogIn, Menu, X, Calendar, BookOpen, Layers, Users, FileText, Sparkles, Heart, GraduationCap, ChevronDown, Image as ImageIcon, HelpCircle, PhoneCall, Award, FileSpreadsheet } from 'lucide-react';
import { NfcsLogo } from './NfcsLogo';

interface HeaderProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  onOpenPortalModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenPortalModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPagesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNavItems: { id: PageTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Church className="w-4 h-4" /> },
    { id: 'about', label: 'About Us', icon: <Users className="w-4 h-4" /> },
    { id: 'get-involved', label: 'Get Involved (Alumni)', icon: <GraduationCap className="w-4 h-4 text-emerald-600" /> },
    { id: 'donations', label: 'Donations', icon: <Heart className="w-4 h-4 text-emerald-600 fill-emerald-100" /> },
    { id: 'events', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
  ];

  const secondaryNavItems: { id: PageTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'gallery', label: 'Photo & Video Gallery', icon: <ImageIcon className="w-4 h-4 text-sky-600" /> },
    { id: 'success-stories', label: 'Success Stories', icon: <Award className="w-4 h-4 text-emerald-600" /> },
    { id: 'reports', label: 'Reports & Publications', icon: <FileSpreadsheet className="w-4 h-4 text-indigo-600" /> },
    { id: 'faq', label: 'FAQ & Help', icon: <HelpCircle className="w-4 h-4 text-amber-600" /> },
    { id: 'contact', label: 'Contact Us', icon: <PhoneCall className="w-4 h-4 text-emerald-600" /> },
    { id: 'initiatives', label: 'Projects & Impact', icon: <Sparkles className="w-4 h-4 text-emerald-600" /> },
    { id: 'spiritual', label: 'Spiritual Life & Mass', icon: <Cross className="w-4 h-4 text-stone-600" /> },
    { id: 'student-life', label: 'Student Life & Faculties', icon: <BookOpen className="w-4 h-4 text-stone-600" /> },
    { id: 'blog', label: 'Blog & News', icon: <FileText className="w-4 h-4 text-stone-600" /> },
    { id: 'figma-guide', label: 'Figma Breakdown & Map', icon: <Layers className="w-4 h-4 text-purple-600" /> },
  ];

  const isSecondaryActive = secondaryNavItems.some(item => item.id === activeTab);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs transition-all">
      {/* Top Notification Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>St. Peter's Catholic Chaplaincy, UNN • Sunday Student Mass @ 8:30 AM</span>
        <span className="hidden sm:inline-block text-emerald-300 font-semibold">• "{SITE_INFO.motto}"</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 text-left group focus:outline-hidden"
        >
          <div className="shrink-0 group-hover:scale-105 transition-transform">
            <NfcsLogo size={46} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl text-stone-900 tracking-tight">NFCS</span>
              <span className="text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">UNN</span>
            </div>
            <p className="text-[11px] font-medium text-stone-500 leading-tight">
              St. Peter's Catholic Chaplaincy
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-stone-100/90 p-1.5 rounded-full border border-stone-200/80">
          {primaryNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === item.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-700 hover:text-emerald-800 hover:bg-stone-200/70'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}

          {/* Pages Dropdown Trigger */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isSecondaryActive
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-700 hover:text-emerald-800 hover:bg-stone-200/70'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>More Pages</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${pagesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {pagesDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-3 py-1.5">
                  Explore Pages & Modules
                </div>
                <div className="space-y-0.5">
                  {secondaryNavItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => {
                        setActiveTab(subItem.id);
                        setPagesDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                        activeTab === subItem.id
                          ? 'bg-emerald-50 text-emerald-800 font-bold'
                          : 'text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {subItem.icon}
                        <span>{subItem.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Header Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('donations')}
            className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 border border-emerald-500/80 px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer hover:scale-105"
          >
            <Heart className="w-3.5 h-3.5 fill-emerald-950" />
            Donate Now! ↗
          </button>

          <button
            onClick={() => setActiveTab('spiritual')}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-3.5 py-2 rounded-xl transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            Mass Times
          </button>
          
          <button
            onClick={onOpenPortalModal}
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 px-4 py-2 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            Portal Login
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="xl:hidden flex items-center gap-2">
          <button
            onClick={onOpenPortalModal}
            className="p-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg flex items-center gap-1 sm:hidden"
          >
            <LogIn className="w-3.5 h-3.5" />
            Portal
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors focus:outline-hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-4 shadow-lg max-h-[85vh] overflow-y-auto animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-2">Main Menu</div>
            {primaryNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold w-full text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-emerald-700 text-white'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          <div className="space-y-1 border-t border-stone-100 pt-3">
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-2">More Pages & Resources</div>
            <div className="grid grid-cols-1 gap-1">
              {secondaryNavItems.map((subItem) => (
                <button
                  key={subItem.id}
                  onClick={() => {
                    setActiveTab(subItem.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold w-full text-left transition-colors ${
                    activeTab === subItem.id
                      ? 'bg-emerald-100 text-emerald-900 font-bold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {subItem.icon}
                  {subItem.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveTab('spiritual');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200"
            >
              <Calendar className="w-4 h-4" />
              Check Mass Schedules
            </button>
            
            <button
              onClick={() => {
                onOpenPortalModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-emerald-700 shadow-md"
            >
              <LogIn className="w-4 h-4" />
              Member Portal Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
