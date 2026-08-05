import React, { useState, useRef, useEffect } from "react";
import { PageTab } from "../types";
import {
  Home,
  Info,
  Cross,
  Sparkles,
  FileText,
  GraduationCap,
  ChevronDown,
  Menu,
  X,
  Calendar,
  BookOpen,
  Layers,
  LogIn,
  ImageIcon,
  HelpCircle,
  PhoneCall,
  Award,
  FileSpreadsheet,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NfcsLogo } from "./NfcsLogo";
import { TopNotificationBar } from "./TopNotificationBar";
import { ResizableNavbar, NavBody, MobileNav, useNavbarVisibility } from "./ui/resizable-navbar";
import { ThemeToggle } from "./ThemeToggle";
import { NavItem } from "./NavItem";

interface HeaderProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const isScrolled = useNavbarVisibility();
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Dropdown Menus Data */
  const spiritualMenu: {
    id: PageTab;
    label: string;
    icon: React.ReactNode;
    desc: string;
  }[] = [
      {
        id: "spiritual",
        label: "Mass Times & Spiritual Life",
        icon: (
          <Cross className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        ),
        desc: "Mass schedules, sacraments, rosary & confession",
      },
      {
        id: "student-life",
        label: "Student Life & Societies",
        icon: <BookOpen className="w-4 h-4 text-sky-600 dark:text-sky-400" />,
        desc: "Faculty associations & pious societies",
      },
    ];

  const impactMenu: {
    id: PageTab;
    label: string;
    icon: React.ReactNode;
    desc: string;
  }[] = [
      {
        id: "initiatives",
        label: "Projects & Impact",
        icon: <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />,
        desc: "Chaplaincy development & welfare programs",
      },
      {
        id: "events",
        label: "Upcoming Events",
        icon: (
          <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        ),
        desc: "Harvest & Bazaar, retreats & conventions",
      },
      {
        id: "success-stories",
        label: "Success Stories",
        icon: (
          <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        ),
        desc: "Testimonials & chaplaincy impact stories",
      },
      {
        id: "reports",
        label: "Reports & Publications",
        icon: (
          <FileSpreadsheet className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        ),
        desc: "Financial reports & chapter publications",
      },
    ];

  const mediaMenu: {
    id: PageTab;
    label: string;
    icon: React.ReactNode;
    desc: string;
  }[] = [
      {
        id: "gallery",
        label: "Photo & Video Gallery",
        icon: (
          <ImageIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        ),
        desc: "Mass photos, event albums & video highlights",
      },
      {
        id: "blog",
        label: "Blog & News",
        icon: (
          <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        ),
        desc: "Spiritual reflections & chapter news",
      },
      {
        id: "faq",
        label: "FAQ & Support",
        icon: (
          <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        ),
        desc: "Frequently asked questions & help guide",
      },
      {
        id: "figma-guide",
        label: "Figma Breakdown & Map",
        icon: <Layers className="w-4 h-4 text-[#4D2EAB] dark:text-indigo-400" />,
        desc: "Sitemap & UI architecture guide",
      },
    ];


  const isSpiritualActive = spiritualMenu.some((item) => item.id === activeTab);
  const isImpactActive = impactMenu.some((item) => item.id === activeTab);
  const isMediaActive = mediaMenu.some((item) => item.id === activeTab);

  return (
    <>
      {/* Top Announcement Bar - Normal Flow (Scrolls Away Naturally) */}
      <TopNotificationBar onNavigate={setActiveTab} />

      {/* Floating Resizable Navbar - Sticky at top-0 */}
      <header className="sticky top-0 z-50 w-full bg-transparent transition-all">
        <ResizableNavbar>
          <NavBody>
            {/* Prominent Logo Icon Only */}
            <button
              onClick={() => setActiveTab("home")}
              className="flex items-center text-left group focus:outline-hidden cursor-pointer shrink-0 py-1"
              aria-label="NFCS UNN Home"
            >
              <div className="shrink-0 group-hover:scale-105 transition-transform duration-200">
                <NfcsLogo size={50} />
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <div
              className="hidden lg:flex items-center gap-1"
              ref={dropdownRef}
            >
              <NavItem
                hoverKey="home"
                currentHover={hoveredKey}
                onMouseEnter={setHoveredKey}
                onMouseLeave={() => setHoveredKey(null)}
                onClick={() => setActiveTab("home")}
                isActive={activeTab === "home"}
                icon={
                  <Home className="w-4 h-4 text-[#4D2EAB] dark:text-indigo-400" />
                }
              >
                Home
              </NavItem>

              {/* 2. About Us */}
              <NavItem
                hoverKey="about"
                currentHover={hoveredKey}
                onMouseEnter={setHoveredKey}
                onMouseLeave={() => setHoveredKey(null)}
                onClick={() => setActiveTab("about")}
                isActive={activeTab === "about"}
                icon={
                  <Info className="w-4 h-4 text-[#4D2EAB] dark:text-indigo-400" />
                }
              >
                About Us
              </NavItem>

              {/* 3. Spiritual Life Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setOpenDropdown("spiritual");
                  setHoveredKey("spiritual");
                }}
                onMouseLeave={() => {
                  setOpenDropdown(null);
                  setHoveredKey(null);
                }}
              >
                <NavItem
                  hoverKey="spiritual"
                  currentHover={hoveredKey}
                  onMouseEnter={setHoveredKey}
                  onMouseLeave={() => setHoveredKey(null)}
                  isActive={isSpiritualActive}
                  icon={
                    <Cross className="w-4 h-4 text-[#4D2EAB] dark:text-indigo-400" />
                  }
                >
                  <span className="flex items-center gap-1">
                    Spiritual Life
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === "spiritual" ? "rotate-180" : ""
                        }`}
                    />
                  </span>
                </NavItem>

                <AnimatePresence>
                  {openDropdown === "spiritual" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-0 top-full mt-2 w-64 rounded-2xl border border-stone-200/90 dark:border-slate-800 bg-white/95 dark:bg-[#080A26]/95 backdrop-blur-xl shadow-2xl p-2 z-50 ring-1 ring-stone-900/5 dark:ring-white/10"
                    >
                      {spiritualMenu.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setOpenDropdown(null);
                          }}
                          className={`w-full flex items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-all cursor-pointer ${activeTab === item.id
                            ? "bg-[#4D2EAB]/10 text-[#4D2EAB] dark:bg-indigo-950/80 dark:text-indigo-300 font-bold"
                            : "hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-800 dark:text-slate-200"
                            }`}
                        >
                          <span className="mt-0.5 shrink-0">{item.icon}</span>
                          <div>
                            <p className="text-xs font-semibold">
                              {item.label}
                            </p>
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

              {/* 4. Impact & Events Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setOpenDropdown("impact");
                  setHoveredKey("impact");
                }}
                onMouseLeave={() => {
                  setOpenDropdown(null);
                  setHoveredKey(null);
                }}
              >
                <NavItem
                  hoverKey="impact"
                  currentHover={hoveredKey}
                  onMouseEnter={setHoveredKey}
                  onMouseLeave={() => setHoveredKey(null)}
                  isActive={isImpactActive}
                  icon={
                    <Sparkles className="w-4 h-4 text-[#4D2EAB] dark:text-indigo-400" />
                  }
                >
                  <span className="flex items-center gap-1">
                    Impact & Events
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === "impact" ? "rotate-180" : ""
                        }`}
                    />
                  </span>
                </NavItem>

                <AnimatePresence>
                  {openDropdown === "impact" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-stone-200/90 dark:border-slate-800 bg-white/95 dark:bg-[#080A26]/95 backdrop-blur-xl shadow-2xl p-2 z-50 ring-1 ring-stone-900/5 dark:ring-white/10"
                    >
                      {impactMenu.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setOpenDropdown(null);
                          }}
                          className={`w-full flex items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-all cursor-pointer ${activeTab === item.id
                            ? "bg-[#4D2EAB]/10 text-[#4D2EAB] dark:bg-indigo-950/80 dark:text-indigo-300 font-bold"
                            : "hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-800 dark:text-slate-200"
                            }`}
                        >
                          <span className="mt-0.5 shrink-0">{item.icon}</span>
                          <div>
                            <p className="text-xs font-semibold">
                              {item.label}
                            </p>
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

              {/* 5. Media & News Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setOpenDropdown("media");
                  setHoveredKey("media");
                }}
                onMouseLeave={() => {
                  setOpenDropdown(null);
                  setHoveredKey(null);
                }}
              >
                <NavItem
                  hoverKey="media"
                  currentHover={hoveredKey}
                  onMouseEnter={setHoveredKey}
                  onMouseLeave={() => setHoveredKey(null)}
                  isActive={isMediaActive}
                  icon={
                    <FileText className="w-4 h-4 text-[#4D2EAB] dark:text-indigo-400" />
                  }
                >
                  <span className="flex items-center gap-1">
                    Media & News
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === "media" ? "rotate-180" : ""
                        }`}
                    />
                  </span>
                </NavItem>

                <AnimatePresence>
                  {openDropdown === "media" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-stone-200/90 dark:border-slate-800 bg-white/95 dark:bg-[#080A26]/95 backdrop-blur-xl shadow-2xl p-2 z-50 ring-1 ring-stone-900/5 dark:ring-white/10"
                    >
                      {mediaMenu.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setOpenDropdown(null);
                          }}
                          className={`w-full flex items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-all cursor-pointer ${activeTab === item.id
                            ? "bg-[#4D2EAB]/10 text-[#4D2EAB] dark:bg-indigo-950/80 dark:text-indigo-300 font-bold"
                            : "hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-800 dark:text-slate-200"
                            }`}
                        >
                          <span className="mt-0.5 shrink-0">{item.icon}</span>
                          <div>
                            <p className="text-xs font-semibold">
                              {item.label}
                            </p>
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

              {/* 6. Alumni & Contact Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setOpenDropdown("alumni");
                  setHoveredKey("alumni");
                }}
                onMouseLeave={() => {
                  setOpenDropdown(null);
                  setHoveredKey(null);
                }}
              >
                {/* 2. Contact Us */}
                <NavItem
                  hoverKey="contact"
                  currentHover={hoveredKey}
                  onMouseEnter={setHoveredKey}
                  onMouseLeave={() => setHoveredKey(null)}
                  onClick={() => setActiveTab("contact")}
                  isActive={activeTab === "contact"}
                  icon={
                    <Phone className="w-4 h-4 text-[#4D2EAB] dark:text-indigo-400" />
                  }
                >
                  Contact Us
                </NavItem>


              </div>
            </div>

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
            <div className="flex items-center justify-between w-full px-4 py-3 bg-transparent backdrop-blur-md border-b border-transparent shadow-none">
              <button
                onClick={() => setActiveTab("home")}
                className="flex items-center"
              >
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
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
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
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="w-full bg-white dark:bg-[#080A26] border-b border-stone-200 dark:border-slate-800 shadow-2xl p-4 space-y-4 max-h-[85vh] overflow-y-auto"
                >
                  {/* Main Links */}
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-slate-500 px-3">
                      Navigation
                    </p>
                    <button
                      onClick={() => {
                        setActiveTab("home");
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-left ${activeTab === "home"
                        ? "bg-[#4D2EAB] text-white"
                        : "text-stone-800 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-800"
                        }`}
                    >
                      <Home className="w-4 h-4" />
                      Home
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("about");
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-left ${activeTab === "about"
                        ? "bg-[#4D2EAB] text-white"
                        : "text-stone-800 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-800"
                        }`}
                    >
                      <Info className="w-4 h-4" />
                      About Us
                    </button>
                  </div>

                  {/* Spiritual Life */}
                  <div className="space-y-1 border-t border-stone-100 dark:border-slate-800 pt-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-slate-500 px-3">
                      Spiritual Life
                    </p>
                    {spiritualMenu.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-semibold text-left ${activeTab === item.id
                          ? "bg-[#4D2EAB]/10 text-[#4D2EAB] dark:bg-indigo-950 dark:text-indigo-300 font-bold"
                          : "text-stone-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800"
                          }`}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Impact & Events */}
                  <div className="space-y-1 border-t border-stone-100 dark:border-slate-800 pt-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-slate-500 px-3">
                      Impact & Events
                    </p>
                    {impactMenu.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-semibold text-left ${activeTab === item.id
                          ? "bg-[#4D2EAB]/10 text-[#4D2EAB] dark:bg-indigo-950 dark:text-indigo-300 font-bold"
                          : "text-stone-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800"
                          }`}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Media & News */}
                  <div className="space-y-1 border-t border-stone-100 dark:border-slate-800 pt-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-slate-500 px-3">
                      Media & News
                    </p>
                    {mediaMenu.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-semibold text-left ${activeTab === item.id
                          ? "bg-[#4D2EAB]/10 text-[#4D2EAB] dark:bg-indigo-950 dark:text-indigo-300 font-bold"
                          : "text-stone-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800"
                          }`}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab("about");
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-left ${activeTab === "about"
                      ? "bg-[#4D2EAB] text-white"
                      : "text-stone-800 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-800"
                      }`}
                  >
                    <Info className="w-4 h-4" />
                    About Us
                  </button>


                  {/* Portal Login & Theme Toggle */}
                  <div className="pt-3 border-t border-stone-100 dark:border-slate-800 flex flex-col gap-2">
                    <div className="flex items-center justify-between px-2">
                      <span className="text-xs font-semibold text-stone-600 dark:text-slate-400">
                        Theme
                      </span>
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
          </MobileNav>
        </ResizableNavbar>
      </header>
    </>
  );
};
