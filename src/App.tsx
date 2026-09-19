import React, { useState } from 'react';
import { PageTab } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { CookieConsentProvider } from './context/CookieConsentContext';
import { CookieConsentBanner } from './components/ui/CookieConsentBanner';
import { CookiePreferencesModal } from './components/ui/CookiePreferencesModal';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ChurchHero3D } from './components/ChurchHero3D';
import { HomePageView } from './components/Pages/HomePageView';
import { AboutPageView } from './components/Pages/AboutPageView';
import { InitiativesPageView } from './components/Pages/InitiativesPageView';
import { DonationsPageView } from './components/Pages/DonationsPageView';
import { GetInvolvedPageView } from './components/Pages/GetInvolvedPageView';
import { StructurePageView } from './components/Pages/StructurePageView';
import { PrayerRequestView } from './components/Pages/PrayerRequestView';
import { OrgansView } from './components/Pages/OrgansView';
import { MentorshipView } from './components/Pages/MentorshipView';
import { AcademicSupportView } from './components/Pages/AcademicSupportView';
import { AlumniView } from './components/Pages/AlumniView';
import { CalendarView } from './components/Pages/CalendarView';
import { BlogPageView } from './components/Pages/BlogPageView';
import { SuccessStoriesPageView } from './components/Pages/SuccessStoriesPageView';
import { FaqPageView } from './components/Pages/FaqPageView';
import { GalleryPageView } from './components/Pages/GalleryPageView';
import { ContactPageView } from './components/Pages/ContactPageView';
import { EventsPageView } from './components/Pages/EventsPageView';
import RaffleTicketPurchase from './pages/RaffleTicketPurchase';
import RaffleAdmin from './pages/RaffleAdmin';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') || '/' : '/'
  );

  // Ensure scroll position is not preserved on refresh
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
      const handleBeforeUnload = () => {
        window.scrollTo(0, 0);
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, []);

  React.useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      const search = window.location.search;

      // Redirect alternate admin routes to /raffle-draw/admin
      if (path === '/raffle/admin' || path === '/ticket-purchase/admin') {
        window.history.replaceState({}, '', `/raffle-draw/admin${search}`);
        setCurrentPath('/raffle-draw/admin');
        return;
      }

      // Redirect alternate raffle routes to /raffle-draw
      if (
        path === '/raffle' ||
        path === '/ticket-purchase' ||
        path.startsWith('/raffle/') ||
        path.startsWith('/ticket-purchase/')
      ) {
        window.history.replaceState({}, '', `/raffle-draw${search}`);
        setCurrentPath('/raffle-draw');
        return;
      }

      setCurrentPath(path);
    };

    handleLocationChange();

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (
    currentPath === '/raffle-draw/admin' ||
    currentPath === '/ticket-purchase/admin' ||
    currentPath === '/raffle/admin'
  ) {
    return <RaffleAdmin />;
  }

  if (
    currentPath === '/raffle-draw' ||
    currentPath.startsWith('/raffle-draw/') ||
    currentPath === '/ticket-purchase' ||
    currentPath.startsWith('/ticket-purchase/') ||
    currentPath === '/raffle' ||
    currentPath.startsWith('/raffle/')
  ) {
    return (
      <ThemeProvider>
        <CookieConsentProvider>
          <RaffleTicketPurchase />
          <CookieConsentBanner />
          <CookiePreferencesModal />
        </CookieConsentProvider>
      </ThemeProvider>
    );
  }

  const handleNavigate = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isStructureTab = [
    'structure',
    'mass-confession',
    'prayer-request',
    'fellowship',
    'organs',
    'societies',
    'faculties',
    'mentorship',
    'academic-support',
    'forums',
    'alumni',
  ].includes(activeTab);

  const scrollProgressRef = React.useRef<number>(0);
  const [isModelReady, setIsModelReady] = useState(false);

  // Dynamic scroll progress calculation for 3D camera pan/zoom
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      scrollProgressRef.current = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider>
      <CookieConsentProvider>
        {/* Global 3D Church Model background across all pages */}
        <ChurchHero3D
          scrollProgressRef={scrollProgressRef}
          activeTab={activeTab}
          onLoaded={() => setIsModelReady(true)}
        />

        {/* Dark backdrop (#0001) and 10px blur in front of 3D model */}
        <div
          className="fixed inset-0 z-[1] pointer-events-none bg-[#0001] backdrop-blur-[10px]"
          style={{
            backgroundColor: '#0001',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
          aria-hidden="true"
        />

        <div className="min-h-screen bg-transparent font-sans text-stone-900 dark:text-slate-100 selection:bg-indigo-200 selection:text-indigo-900 flex flex-col justify-between antialiased transition-colors duration-400 relative z-10">
          <div>
            <Header
              activeTab={activeTab}
              setActiveTab={handleNavigate}
            />

            <main>
              {activeTab === 'home' && (
                <HomePageView
                  onNavigate={handleNavigate}
                  isModelReady={isModelReady}
                />
              )}

              {activeTab === 'about' && <AboutPageView />}

              {isStructureTab && (
                <StructurePageView
                  initialSubTab={activeTab === 'structure' ? 'mass-confession' : activeTab}
                  onNavigate={handleNavigate}
                />
              )}

              {activeTab === 'initiatives' && <InitiativesPageView />}

              {activeTab === 'donations' && <DonationsPageView />}

              {activeTab === 'get-involved' && <GetInvolvedPageView onNavigate={handleNavigate} />}

              {activeTab === 'blog' && <BlogPageView />}

              {activeTab === 'calendar' && <CalendarView />}

              {activeTab === 'success-stories' && <SuccessStoriesPageView onNavigate={handleNavigate} />}

              {activeTab === 'faq' && <FaqPageView onNavigate={handleNavigate} />}

              {activeTab === 'gallery' && <GalleryPageView onNavigate={handleNavigate} />}

              {activeTab === 'contact' && <ContactPageView onNavigate={handleNavigate} />}

              {activeTab === 'events' && <EventsPageView onNavigate={handleNavigate} />}
            </main>
          </div>

          {activeTab !== 'home' && (
            <Footer
              onNavigate={handleNavigate}
            />
          )}
        </div>

        {/* Global Cookie Consent Components */}
        <CookieConsentBanner />
        <CookiePreferencesModal />
      </CookieConsentProvider>
    </ThemeProvider>
  );
}
