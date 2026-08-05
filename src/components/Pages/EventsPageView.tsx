import React, { useState } from 'react';
import { PageTab } from '../../types';
import { NewsletterBanner } from '../NewsletterBanner';
import { EventsHero } from '../events/EventsHero';
import { EventCard, EventItem } from '../events/EventCard';
import { X, CheckCircle2 } from 'lucide-react';

interface EventsPageViewProps {
  onNavigate: (tab: PageTab) => void;
}

export const EventsPageView: React.FC<EventsPageViewProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventRsvp, setSelectedEventRsvp] = useState<EventItem | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const upcomingEvents: EventItem[] = [
    {
      id: 'e-1',
      title: 'NFCS Annual Lenten Spiritual Retreat & Youth Awakening',
      day: 'Sunday',
      monthDate: '10 Mar',
      year: '2026',
      category: 'Spiritual Retreat',
      venue: "St. Peter’s Chaplaincy Main Auditorium, UNN",
      time: '09:00 AM - 04:00 PM',
      image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&q=80&w=800',
      description:
        'Join thousands of Catholic students for a transformative day of Eucharistic adoration, powerful homilies, confession, and spiritual revival.',
      rsvpsCount: 420,
    },
    {
      id: 'e-2',
      title: 'Grand Academic & Career Empowerment Summit 2026',
      day: 'Monday',
      monthDate: '24 Mar',
      year: '2026',
      category: 'Academic & Career',
      venue: 'Princess Alexandra Auditorium (PAA), UNN',
      time: '10:00 AM - 03:00 PM',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800',
      description:
        'Prominent alumni corporate leaders, researchers, and tech founders guide undergraduates on scholarship applications and career pathways.',
      rsvpsCount: 680,
    },
    {
      id: 'e-3',
      title: 'NFCS Cultural & Heritage Day',
      day: 'Saturday',
      monthDate: '06 Apr',
      year: '2026',
      category: 'Culture',
      venue: 'Chaplaincy Grounds, UNN',
      time: '11:00 AM',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
      description:
        'Showcasing traditional attire, cultural dances, regional cuisines, and Catholic unity across all states of Nigeria.',
      rsvpsCount: 510,
    },
  ];

  const filteredEvents = upcomingEvents.filter(
    (e) =>
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-stone-50 dark:bg-[#080A26] min-h-screen py-8 sm:py-14 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Hero */}
        <EventsHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Events Grid */}
        <div className="space-y-8">
          <div className="border-b border-stone-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
              Upcoming Events Calendar
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400">
              RSVP your seat for upcoming Chaplaincy conventions, retreats, and tutorials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} onRsvpSelect={setSelectedEventRsvp} />
            ))}
          </div>
        </div>

        {/* RSVP Modal */}
        {selectedEventRsvp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <div className="bg-white dark:bg-[#0C0F38] border border-stone-200 dark:border-slate-800 max-w-md w-full rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative">
              <button
                onClick={() => {
                  setSelectedEventRsvp(null);
                  setRsvpSuccess(false);
                }}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              {rsvpSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-black text-stone-900 dark:text-white">Seat Reserved!</h3>
                  <p className="text-xs text-stone-600 dark:text-slate-300">
                    Your seat confirmation code for <strong>{selectedEventRsvp.title}</strong> has been generated. See you at St. Peter's Chaplaincy!
                  </p>
                  <button
                    onClick={() => {
                      setSelectedEventRsvp(null);
                      setRsvpSuccess(false);
                    }}
                    className="px-6 py-2 bg-[#4D2EAB] text-white font-bold text-xs rounded-xl"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setRsvpSuccess(true);
                  }}
                  className="space-y-4"
                >
                  <div className="border-b border-stone-100 dark:border-slate-800 pb-3">
                    <h3 className="font-black text-stone-900 dark:text-white text-base">Confirm Event RSVP</h3>
                    <p className="text-xs text-stone-500 dark:text-slate-400 line-clamp-1">
                      {selectedEventRsvp.title}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Bro. / Sis. Full Name"
                      className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">
                      Phone Number / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="08012345678"
                      className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#4D2EAB] hover:bg-[#3B2285] text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Confirm RSVP Seat
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>

      <NewsletterBanner />
    </div>
  );
};
