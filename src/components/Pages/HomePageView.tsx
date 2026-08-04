import React from 'react';
import { HeroSection } from '../HeroSection';
import { FeaturedPrograms } from '../FeaturedPrograms';
import { ImpactStatsSection } from '../ImpactStatsSection';
import { VisionMissionSection } from '../VisionMissionSection';
import { StorySpotlight } from '../StorySpotlight';
import { PillarsGrid } from '../PillarsGrid';
import { CampaignsGrid } from '../CampaignsGrid';
import { ChaplaincySpotlight } from '../ChaplaincySpotlight';
import { TestimonialsSection } from '../TestimonialsSection';
import { NewsletterBanner } from '../NewsletterBanner';
import { PageTab } from '../../types';

interface HomePageViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenPortalModal: () => void;
}

export const HomePageView: React.FC<HomePageViewProps> = ({ onNavigate, onOpenPortalModal }) => {
  return (
    <div className="space-y-0">
      <HeroSection onNavigate={onNavigate} onOpenPortalModal={onOpenPortalModal} />
      <FeaturedPrograms onNavigate={onNavigate} />
      <ImpactStatsSection />
      <VisionMissionSection onNavigate={onNavigate} />
      <StorySpotlight onNavigate={onNavigate} />
      <PillarsGrid onNavigate={onNavigate} />
      <CampaignsGrid onNavigate={onNavigate} />
      <ChaplaincySpotlight onNavigate={onNavigate} />
      <TestimonialsSection />
      <NewsletterBanner />
    </div>
  );
};
