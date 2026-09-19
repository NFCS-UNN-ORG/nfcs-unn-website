import React, { useState, useCallback } from 'react';
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
import { SitePreloader } from '../ui/SitePreloader';
import { PageTab } from '../../types';

interface HomePageViewProps {
  onNavigate: (tab: PageTab) => void;
  isModelReady?: boolean;
}

export const HomePageView: React.FC<HomePageViewProps> = ({ onNavigate, isModelReady = true }) => {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setIsPreloaderDone(true);
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

      {/* Editorial Luxury Circular Preloader with Jump Animation */}
      {!isPreloaderDone && (
        <SitePreloader
          isModelReady={isModelReady}
          onComplete={handlePreloaderComplete}
        />
      )}

      {/* Single non-infinite rendering of all home sections with 3D model visible */}
      <div className="relative z-10 dark text-slate-100 lg:pr-36 xl:pr-44 transition-all duration-300">
        <div data-section="hero" id="hero">
          <HeroSection onNavigate={onNavigate} isModelReady={isPreloaderDone} />
        </div>
        <div data-section="impact-stats" id="impact-stats">
          <ImpactStatsSection />
        </div>
        <div data-section="vision-mission" id="vision-mission">
          <VisionMissionSection onNavigate={onNavigate} />
        </div>
        <div data-section="story-spotlight" id="story-spotlight">
          <StorySpotlight onNavigate={onNavigate} />
        </div>
        <div data-section="pillars" id="pillars">
          <PillarsGrid onNavigate={onNavigate} />
        </div>
        <div data-section="campaigns" id="campaigns">
          <CampaignsGrid onNavigate={onNavigate} />
        </div>
        <div data-section="chaplaincy" id="chaplaincy">
          <ChaplaincySpotlight onNavigate={onNavigate} />
        </div>
        <div data-section="testimonials" id="testimonials">
          <TestimonialsSection />
        </div>
        <div data-section="newsletter" id="newsletter">
          <NewsletterBanner />
        </div>
      </div>

      {/* Footer naturally renders at the bottom of the home page */}
      <div className="relative z-20 bg-stone-950/95 border-t border-stone-800 backdrop-blur-md">
        <Footer onNavigate={onNavigate} />
      </div>
    </div>
  );
};
