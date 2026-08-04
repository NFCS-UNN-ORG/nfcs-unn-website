import React, { useState } from 'react';
import { PageTab } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PortalLoginModal } from './components/PortalLoginModal';
import { HomePageView } from './components/Pages/HomePageView';
import { AboutPageView } from './components/Pages/AboutPageView';
import { InitiativesPageView } from './components/Pages/InitiativesPageView';
import { DonationsPageView } from './components/Pages/DonationsPageView';
import { GetInvolvedPageView } from './components/Pages/GetInvolvedPageView';
import { SpiritualLifeView } from './components/Pages/SpiritualLifeView';
import { StudentLifeView } from './components/Pages/StudentLifeView';
import { BlogPageView } from './components/Pages/BlogPageView';
import { FigmaTranslationDoc } from './components/Pages/FigmaTranslationDoc';
import { ReportsPageView } from './components/Pages/ReportsPageView';
import { SuccessStoriesPageView } from './components/Pages/SuccessStoriesPageView';
import { FaqPageView } from './components/Pages/FaqPageView';
import { GalleryPageView } from './components/Pages/GalleryPageView';
import { ContactPageView } from './components/Pages/ContactPageView';
import { EventsPageView } from './components/Pages/EventsPageView';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [portalModalOpen, setPortalModalOpen] = useState(false);

  const handleNavigate = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-emerald-200 selection:text-emerald-900 flex flex-col justify-between antialiased">
      <div>
        <Header
          activeTab={activeTab}
          setActiveTab={handleNavigate}
          onOpenPortalModal={() => setPortalModalOpen(true)}
        />

        <main>
          {activeTab === 'home' && (
            <HomePageView
              onNavigate={handleNavigate}
              onOpenPortalModal={() => setPortalModalOpen(true)}
            />
          )}

          {activeTab === 'about' && <AboutPageView />}

          {activeTab === 'initiatives' && <InitiativesPageView />}

          {activeTab === 'donations' && <DonationsPageView />}

          {activeTab === 'get-involved' && <GetInvolvedPageView onNavigate={handleNavigate} />}

          {activeTab === 'spiritual' && <SpiritualLifeView />}

          {activeTab === 'student-life' && <StudentLifeView />}

          {activeTab === 'blog' && <BlogPageView />}

          {activeTab === 'reports' && <ReportsPageView onNavigate={handleNavigate} />}

          {activeTab === 'success-stories' && <SuccessStoriesPageView onNavigate={handleNavigate} />}

          {activeTab === 'faq' && <FaqPageView onNavigate={handleNavigate} />}

          {activeTab === 'gallery' && <GalleryPageView onNavigate={handleNavigate} />}

          {activeTab === 'contact' && <ContactPageView onNavigate={handleNavigate} />}

          {activeTab === 'events' && <EventsPageView onNavigate={handleNavigate} />}

          {activeTab === 'figma-guide' && <FigmaTranslationDoc />}
        </main>
      </div>

      <Footer
        onNavigate={handleNavigate}
        onOpenPortalModal={() => setPortalModalOpen(true)}
      />

      <PortalLoginModal
        isOpen={portalModalOpen}
        onClose={() => setPortalModalOpen(false)}
      />
    </div>
  );
}
