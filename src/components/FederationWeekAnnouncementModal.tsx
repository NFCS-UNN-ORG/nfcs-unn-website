import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ticket, Sparkles, Calendar, Trophy, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface FederationWeekAnnouncementModalProps {
  onNavigateRaffle?: () => void;
}

const SLIDES = [
  {
    id: 'fed-week',
    title: 'Federation Week 2026',
    subtitle: 'Schedule of Activities',
    image: '/federation-week-flyer.jpg',
    alt: 'NFCS UNN Federation Week 2026 Schedule of Activities',
    badge: 'Sept 13th – Sept 20th, 2026',
    badgeIcon: Calendar,
    tag: 'Event Schedule',
    themeColor: '#166C16',
  },
  {
    id: 'raffle',
    title: 'Grand Finale Raffle Draw',
    subtitle: 'Win Powerbank + Earbuds, Gas + Rice & Pressing Iron',
    image: '/assets/raffle-flyer.jpg',
    alt: 'NFCS UNN Federation Week 2026 Official Raffle Draw Flyer',
    badge: '₦200 / Ticket · Win Big',
    badgeIcon: Trophy,
    tag: 'Official Raffle Draw',
    themeColor: '#c9a227',
  },
];

export const FederationWeekAnnouncementModal: React.FC<FederationWeekAnnouncementModalProps> = ({
  onNavigateRaffle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Open 3 seconds after landing page loads
    const timer = setTimeout(() => {
      const alreadyDismissed = sessionStorage.getItem('fed_week_modal_dismissed');
      if (!alreadyDismissed) {
        setIsOpen(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Auto carousel slide every 3.5s when not hovered
  useEffect(() => {
    if (!isOpen || isHovered) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isOpen, isHovered]);

  // Handle ESC key dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('fed_week_modal_dismissed', 'true');
  };

  const nextSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleGoToRaffle = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    handleClose();
    if (onNavigateRaffle) {
      onNavigateRaffle();
    } else {
      window.history.pushState({}, '', '/raffle-draw');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 320 : -320,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 30 },
        opacity: { duration: 0.28 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -320 : 320,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 30 },
        opacity: { duration: 0.28 },
      },
    }),
  };

  const activeSlide = SLIDES[currentSlide];
  const BadgeIcon = activeSlide.badgeIcon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 bg-stone-950/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden z-10 my-auto flex flex-col md:flex-row max-h-[92vh]"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-30 p-2 text-stone-500 hover:text-stone-900 bg-white/90 hover:bg-stone-100 rounded-full shadow-md backdrop-blur-sm transition-all cursor-pointer"
              title="Close announcement"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Carousel for Federation Week & Raffle Draw Flyers */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="md:w-5/12 bg-gradient-to-b from-[#166C16] to-[#0A1E0D] relative flex flex-col items-center justify-center p-4 sm:p-5 overflow-hidden"
            >
              {/* Carousel Viewport */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black/40">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={activeSlide.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={handleGoToRaffle}
                    title="Click to view details & buy tickets"
                  >
                    <img
                      src={activeSlide.image}
                      alt={activeSlide.alt}
                      className="w-full h-full object-contain"
                      loading="eager"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Bottom Badge */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-center pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 bg-[#FBE202] text-[#166C16] font-black text-[10px] sm:text-xs px-3 py-1 rounded-full shadow-md">
                        <BadgeIcon className="size-3.5" />
                        {activeSlide.badge}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Left/Right Carousel Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer z-20 hover:scale-110 active:scale-95 border border-white/20"
                  aria-label="Previous flyer"
                >
                  <ChevronLeft className="size-4" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer z-20 hover:scale-110 active:scale-95 border border-white/20"
                  aria-label="Next flyer"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>

              {/* Carousel Pagination Dots */}
              <div className="flex items-center gap-2 mt-3 z-10">
                {SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => {
                      setDirection(idx > currentSlide ? 1 : -1);
                      setCurrentSlide(idx);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentSlide
                        ? 'w-6 bg-[#FBE202] shadow-sm'
                        : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    title={`Slide to ${slide.title}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Announcement & Raffle Callout */}
            <div className="md:w-7/12 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-none">
              <div>
                {/* Header Tag */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#166C16]/10 text-[#166C16] border border-[#166C16]/25 text-xs font-black uppercase tracking-wider">
                    <Sparkles className="size-3.5 text-amber-500" />
                    Federation Week 2026
                  </span>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    8 Big Days
                  </span>
                </div>

                {/* Title & Theme */}
                <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-tight">
                  Faith Loud, Campus Proud!
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-medium mt-2 leading-relaxed">
                  Join the Nigeria Federation of Catholic Students (NFCS), UNN Chapter, for 8 days of faith, community, culture, praise, and celebration at St. Peter's Chaplaincy!
                </p>

                {/* Grand Draw Highlight Banner */}
                <div className="my-4 p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 via-[#FBE202]/15 to-emerald-50 border border-amber-200/80">
                  <div className="flex items-start gap-2.5">
                    <div className="size-9 rounded-xl bg-[#166C16] text-[#FBE202] flex items-center justify-center shrink-0 shadow-sm font-black text-base">
                      🎟️
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs sm:text-sm font-black text-stone-900">
                          Grand Finale Raffle Draw
                        </h4>
                        <span className="text-[10px] font-black bg-red-500 text-white px-1.5 py-0.2 rounded-md uppercase">
                          Live
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-stone-600 mt-0.5 leading-snug">
                        Win 1st, 2nd, and 3rd grand prizes! Every <strong>10 tickets</strong> bought earns you <strong>+1 free bonus entry</strong>!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Activity Highlights */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 font-bold mb-4">
                  <div className="flex items-center gap-1.5 bg-stone-50 p-2 rounded-xl border border-stone-200/70">
                    <span className="text-amber-600">🎭</span>
                    <span>Costume Sunday & Rally</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-stone-50 p-2 rounded-xl border border-stone-200/70">
                    <span className="text-sky-600">🎬</span>
                    <span>Games & Movie Night</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-stone-50 p-2 rounded-xl border border-stone-200/70">
                    <span className="text-emerald-600">🥁</span>
                    <span>Cultural Owambe Day</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-stone-50 p-2 rounded-xl border border-stone-200/70">
                    <span className="text-purple-600">🕊️</span>
                    <span>All-White Praise Night</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  onClick={handleGoToRaffle}
                  className="w-full sm:flex-1 py-3.5 px-5 bg-[#166C16] hover:bg-[#175319] text-white rounded-2xl font-black text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2 border border-[#FBE202]/40"
                >
                  <Ticket className="w-4 h-4 text-[#FBE202]" />
                  <span>Grab Raffle Tickets (₦200)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto py-3 px-4 text-stone-500 hover:text-stone-800 text-xs font-bold transition-colors cursor-pointer text-center"
                >
                  View Schedule
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
