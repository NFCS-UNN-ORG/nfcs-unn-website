import React, { useState } from 'react';
import { PageTab } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
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
    return <RaffleTicketPurchase />;
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

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-[#080A26] font-sans text-stone-900 dark:text-slate-100 selection:bg-indigo-200 selection:text-indigo-900 flex flex-col justify-between antialiased transition-colors duration-400">
        <div>
          <Header
            activeTab={activeTab}
            setActiveTab={handleNavigate}
          />

          <main>
            {activeTab === 'home' && (
              <HomePageView
                onNavigate={handleNavigate}
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

        <Footer
          onNavigate={handleNavigate}
        />
      </div>
    </ThemeProvider>
  );
}
