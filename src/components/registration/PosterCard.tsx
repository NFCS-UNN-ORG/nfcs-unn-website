import React, { useState, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import { Mail, Phone, MapPin, X, ExternalLink } from 'lucide-react';
import { useOutsideClick } from '@/hooks/use-outside-click';

export const DEFAULT_FLIER_IMAGE = '/assets/raffle-flyer.jpg';

interface PosterCardProps {
  flierImage?: string;
  ticketsSold?: number | null;
}

export const PosterCard: React.FC<PosterCardProps> = React.memo(({
  flierImage = DEFAULT_FLIER_IMAGE,
  ticketsSold = null,
}) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isFlierExpanded, setIsFlierExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const modalCardRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsFlierExpanded(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useOutsideClick(modalCardRef, () => {
    if (isFlierExpanded) setIsFlierExpanded(false);
  });

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFlierExpanded(false);
        setIsContactOpen(false);
      }
    };
    if (isFlierExpanded || isContactOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlierExpanded, isContactOpen]);

  // Lock body scrolling when contact modal or desktop flier modal is open
  useEffect(() => {
    if (isContactOpen || (!isMobile && isFlierExpanded)) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isContactOpen, isFlierExpanded, isMobile]);

  // 3D Tilt Parallax Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for fluid tilt response
  const springConfig = { stiffness: 250, damping: 22 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Tilt rotation: Y axis tilts horizontally, X axis tilts vertically
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  // Specular glare position tracking
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['10%', '90%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['10%', '90%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="w-full select-none"
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.aside
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full flex flex-col gap-4"
      >
        {/* Interactive Click-to-Expand Flier Image Card (Desktop only, inactive on mobile) */}
        <motion.div
          layoutId={isMobile ? undefined : `poster-card-${id}`}
          onClick={isMobile ? undefined : () => setIsFlierExpanded(true)}
          style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
          className={`relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-white/[0.04] border-[0.5px] border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group transition-shadow duration-300 ${
            isMobile
              ? 'cursor-default pointer-events-none'
              : 'hover:shadow-[0_25px_60px_rgba(22,108,22,0.4)] cursor-pointer'
          }`}
          role={isMobile ? undefined : 'button'}
          tabIndex={isMobile ? undefined : 0}
          aria-label={isMobile ? undefined : 'Click to expand event flier'}
          onKeyDown={
            isMobile
              ? undefined
              : (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsFlierExpanded(true);
                  }
                }
          }
        >
          <motion.img
            layoutId={isMobile ? undefined : `poster-image-${id}`}
            src={flierImage}
            alt="Federation Week Official Raffle Draw Flier"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
          />

          {/* Specular Glare Reflection on Hover */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: useMotionTemplate`radial-gradient(circle 350px at ${glareX} ${glareY}, rgba(255, 255, 255, 0.22), transparent 75%)`,
            }}
          />
        </motion.div>

        {/* "HOSTED BY" Section with Parallax Depth */}
        <div
          style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
          className="rounded-2xl border-[0.5px] border-white/15 bg-[#175319]/30 backdrop-blur-xl p-4 flex flex-col gap-2.5 shadow-lg"
        >
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#FBE202]">
            Hosted by
          </p>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="/nfcs-unn-logo.png"
                alt="NFCS UNN"
                className="size-9 object-contain shrink-0 filter drop-shadow"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-black text-white truncate">
                  NFCS UNN
                </h4>
                <p className="text-[11px] font-medium text-white/70 truncate">
                  St. Peter&rsquo;s Chaplaincy
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-white hover:bg-white/20 transition-all shrink-0 cursor-pointer active:scale-95"
            >
              <Mail className="size-3.5 text-[#FBE202]" />
              Contact
            </button>
          </div>
        </div>
      </motion.aside>

      {/* ========================================================================= */}
      {/* FULL EXPANDED FLIER MODAL (Desktop Only, strictly inactive on mobile)     */}
      {/* ========================================================================= */}
      {!isMobile &&
        typeof document !== 'undefined' &&
        createPortal(
          <>
            {/* Backdrop Fade */}
            <AnimatePresence>
              {isFlierExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setIsFlierExpanded(false)}
                  className="fixed inset-0 z-[99990] bg-black/85 backdrop-blur-md cursor-zoom-out"
                />
              )}
            </AnimatePresence>

            {/* Modal Card Layout */}
            <AnimatePresence>
              {isFlierExpanded && (
                <div
                  onClick={() => setIsFlierExpanded(false)}
                  className="fixed inset-0 z-[99995] flex items-center justify-center p-4 sm:p-6 md:p-8 cursor-zoom-out"
                >
                  <motion.div
                    ref={modalCardRef}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative max-h-[94vh] max-w-[95vw] sm:max-w-lg md:max-w-xl flex flex-col items-center cursor-default pointer-events-auto"
                  >
                    {/* Floating Top Controls (Close & View Full) */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="w-full flex items-center justify-between pb-2.5 px-1 max-w-full"
                    >
                      <span className="text-xs font-bold text-white/70 truncate">
                        Federation Week 2026 Official Flier
                      </span>

                      <div className="flex items-center gap-2">
                        <a
                          href={flierImage}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FBE202] bg-white/10 hover:bg-white/20 border-[0.5px] border-white/15 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                          title="Open full resolution in new tab"
                        >
                          <span>Full size</span>
                          <ExternalLink className="size-3" />
                        </a>

                        <button
                          type="button"
                          onClick={() => setIsFlierExpanded(false)}
                          className="p-1.5 rounded-full bg-white/15 hover:bg-white/30 text-white border-[0.5px] border-white/15 transition-colors cursor-pointer"
                          aria-label="Close modal"
                        >
                          <X className="size-5" />
                        </button>
                      </div>
                    </motion.div>

                    {/* High-Resolution Flier Card */}
                    <motion.div
                      layoutId={`poster-card-${id}`}
                      className="relative overflow-hidden rounded-2xl border-[0.5px] border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-h-[85vh] bg-[#0A1E0D]"
                    >
                      <motion.img
                        layoutId={`poster-image-${id}`}
                        src={flierImage}
                        alt="Expanded Official Raffle Draw Flier"
                        className="w-full h-auto max-h-[85vh] object-contain select-none"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </>,
          document.body
        )}

      {/* Contact Modal (Rendered at Root Viewport via Portal) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isContactOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsContactOpen(false)}
                className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-hidden cursor-zoom-out"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  maxWidth: '100vw',
                  maxHeight: '100vh',
                  boxSizing: 'border-box',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 10 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-md max-h-[85vh] overflow-y-auto overflow-x-hidden rounded-2xl bg-[#0A1E0D] border border-[#FBE202]/40 p-5 sm:p-6 shadow-2xl text-white relative cursor-default tickets-scrollbar mx-auto box-border"
                >
                  <button
                    type="button"
                    onClick={() => setIsContactOpen(false)}
                    className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="size-5" />
                  </button>
                  <div className="size-11 sm:size-12 rounded-2xl bg-[#166C16]/50 border border-[#166C16]/70 flex items-center justify-center mb-3.5 sm:mb-4 shadow-inner">
                    <Mail className="size-5 sm:size-6 text-[#FBE202]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">Contact Organizer</h3>
                  <p className="text-xs text-white/60 mt-1 mb-4 sm:mb-5 leading-relaxed">
                    Have questions regarding raffle tickets, verification, or grand finale collections?
                  </p>

                  <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm w-full min-w-0">
                    <a
                      href="mailto:info.nfcsunn@gmail.com"
                      className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.12] transition-colors min-w-0 w-full overflow-hidden"
                    >
                      <Mail className="size-4 text-[#FBE202] shrink-0" />
                      <span className="truncate min-w-0">info.nfcsunn@gmail.com</span>
                    </a>
                    <a
                      href="tel:+2349033831547"
                      className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.12] transition-colors min-w-0 w-full overflow-hidden"
                    >
                      <Phone className="size-4 text-[#FBE202] shrink-0" />
                      <span className="truncate min-w-0">+234 903 383 1547</span>
                    </a>
                    <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-white/[0.06] border border-white/10 min-w-0 w-full overflow-hidden">
                      <MapPin className="size-4 text-[#FBE202] shrink-0" />
                      <span className="text-xs text-white/80 truncate min-w-0">St. Peter&rsquo;s Chaplaincy, UNN</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsContactOpen(false)}
                    className="mt-5 sm:mt-6 w-full py-2.5 sm:py-3 rounded-xl bg-white text-[#0B0B0F] font-black text-xs sm:text-sm hover:bg-white/90 transition-all cursor-pointer shadow-lg active:scale-98"
                  >
                    Close
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
});

export default PosterCard;
