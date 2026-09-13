import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChurchHero3D } from '../ChurchHero3D';
import { HeroSection } from '../HeroSection';
import { ImpactStatsSection } from '../ImpactStatsSection';
import { VisionMissionSection } from '../VisionMissionSection';
import { StorySpotlight } from '../StorySpotlight';
import { PillarsGrid } from '../PillarsGrid';
import { CampaignsGrid } from '../CampaignsGrid';
import { ChaplaincySpotlight } from '../ChaplaincySpotlight';
import { TestimonialsSection } from '../TestimonialsSection';
import { NewsletterBanner } from '../NewsletterBanner';
import { Footer } from '../Footer';
import { FederationWeekAnnouncementModal } from '../FederationWeekAnnouncementModal';
import { PageTab } from '../../types';

interface HomePageViewProps {
  onNavigate: (tab: PageTab) => void;
}

export const HomePageView: React.FC<HomePageViewProps> = ({ onNavigate }) => {
  const scrollProgressRef = useRef<number>(0);
  const [isModelReady, setIsModelReady] = useState(false);
  const firstCycleRef = useRef<HTMLDivElement>(null);

  // Endless scrolling state: starts with 2 cycles so the top of the site immediately follows below the first footer
  const [cyclesCount, setCyclesCount] = useState<number>(2);

  // Dynamic scroll listener: loops 3D camera pan/zoom and appends cycles when nearing bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollBottom = window.innerHeight + scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      // When approaching the bottom (within 900px), append another cycle for endless scrolling
      if (scrollBottom >= documentHeight - 900) {
        setCyclesCount((prev) => prev + 1);
      }

      // Parallax progress calculation per cycle for the 3D interior camera
      if (firstCycleRef.current) {
        const cycleHeight = firstCycleRef.current.offsetHeight || 5000;
        const currentProgress = (scrollY % cycleHeight) / Math.max(cycleHeight - 400, 1);
        scrollProgressRef.current = Math.min(Math.max(currentProgress, 0), 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="space-y-0 relative">
      <FederationWeekAnnouncementModal
        onNavigateRaffle={() => {
          window.history.pushState({}, '', '/raffle-draw');
          window.dispatchEvent(new PopStateEvent('popstate'));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Atmospheric Initial Preloader */}
      <AnimatePresence>
        {!isModelReady && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100000] bg-[#070921] flex flex-col items-center justify-center select-none"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="relative size-16 flex items-center justify-center">
                <div className="size-16 rounded-full border-2 border-white/10 border-t-[#4D2EAB] animate-spin" />
                <span className="absolute text-amber-300 text-xl font-light">✦</span>
              </div>
              <div className="text-center space-y-1">
                <p className="text-white text-base font-light tracking-wide">
                  St. Peter's Catholic Chaplaincy, UNN
                </p>
                <p className="text-slate-400 text-xs font-light tracking-wider uppercase">
                  Preparing Sanctuary…
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed 3D Church Interior Background (mounted and visible across all sections except footer) */}
      <ChurchHero3D
        scrollProgressRef={scrollProgressRef}
        onLoaded={() => setIsModelReady(true)}
      />

      {/* Small dark backdrop at 5% opacity and 10% (~2px) blur in front of 3D model */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none bg-black/5 backdrop-blur-[2px]"
        aria-hidden="true"
      />

      {/* Endless Scrolling Cycles: each cycle renders all sections with 3D model visible, followed by the footer */}
      {Array.from({ length: cyclesCount }).map((_, cycleIndex) => {
        const isFirst = cycleIndex === 0;
        return (
          <div
            key={`cycle-${cycleIndex}`}
            ref={isFirst ? firstCycleRef : undefined}
            className="relative"
          >
            {/* All Sections (Hero through Newsletter) with model visible and desktop right-padding */}
            <div className="relative z-10 dark text-slate-100 lg:pr-36 xl:pr-44 transition-all duration-300">
              <div data-section="hero" id={isFirst ? "hero" : undefined}>
                <HeroSection onNavigate={onNavigate} isModelReady={isModelReady} />
              </div>
              <div data-section="impact-stats" id={isFirst ? "impact-stats" : undefined}>
                <ImpactStatsSection />
              </div>
              <div data-section="vision-mission" id={isFirst ? "vision-mission" : undefined}>
                <VisionMissionSection onNavigate={onNavigate} />
              </div>
              <div data-section="story-spotlight" id={isFirst ? "story-spotlight" : undefined}>
                <StorySpotlight onNavigate={onNavigate} />
              </div>
              <div data-section="pillars" id={isFirst ? "pillars" : undefined}>
                <PillarsGrid onNavigate={onNavigate} />
              </div>
              <div data-section="campaigns" id={isFirst ? "campaigns" : undefined}>
                <CampaignsGrid onNavigate={onNavigate} />
              </div>
              <div data-section="chaplaincy" id={isFirst ? "chaplaincy" : undefined}>
                <ChaplaincySpotlight onNavigate={onNavigate} />
              </div>
              <div data-section="testimonials" id={isFirst ? "testimonials" : undefined}>
                <TestimonialsSection />
              </div>
              <div data-section="newsletter" id={isFirst ? "newsletter" : undefined}>
                <NewsletterBanner />
              </div>
            </div>

            {/* Footer (opaque, cleanly covering the 3D model at the end of each cycle) */}
            <div className="relative z-20 bg-stone-950 border-t border-stone-800">
              <Footer onNavigate={onNavigate} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
