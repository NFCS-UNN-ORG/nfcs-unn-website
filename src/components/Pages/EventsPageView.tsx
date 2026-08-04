import React, { useState } from 'react';
import { PageTab } from '../../types';
import { Search, Calendar, MapPin, Clock, ArrowRight, CheckCircle2, ChevronDown, UserCheck, Heart, Sparkles, Building2 } from 'lucide-react';

interface EventsPageViewProps {
  onNavigate: (tab: PageTab) => void;
}

interface EventItem {
  id: string;
  title: string;
  day: string;
  monthDate: string;
  year: string;
  category: string;
  venue: string;
  time: string;
  image: string;
  description: string;
  rsvpsCount: number;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const EventsPageView: React.FC<EventsPageViewProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventRsvp, setSelectedEventRsvp] = useState<EventItem | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>('efaq-1');

  const upcomingEvents: EventItem[] = [
    {
      id: 'e-1',
      title: 'NFCS Annual Lenten Spiritual Retreat & Youth Awakening',
      day: 'Sunday',
      monthDate: '10 Mar',
      year: '2024',
      category: 'Spiritual Retreat',
      venue: 'St. Peter’s Chaplaincy Main Auditorium, UNN',
      time: '09:00 AM - 04:00 PM',
      image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&q=80&w=800',
      description: 'Join thousands of Catholic students for a transformative day of Eucharistic adoration, powerful homilies, confession, and spiritual revival.',
      rsvpsCount: 420,
    },
    {
      id: 'e-2',
      title: 'Grand Academic & Career Empowerment Summit 2024',
      day: 'Monday',
      monthDate: '24 Mar',
      year: '2024',
      category: 'Academic & Career',
      venue: 'Princess Alexandra Auditorium (PAA), UNN',
      time: '10:00 AM - 03:00 PM',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800',
      description: 'Prominent alumni corporate leaders, researchers, and tech founders guide undergraduates on scholarship applications and career pathways.',
      rsvpsCount: 680,
    },
  ];

  const latestEvents: EventItem[] = [
    {
      id: 'e-3',
      title: 'NFCS Cultural & Heritage Day',
      day: 'Saturday',
      monthDate: '06 Apr',
      year: '2024',
      category: 'Culture',
      venue: 'Chaplaincy Grounds, UNN',
      time: '11:00 AM',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
      description: 'Showcasing traditional attire, cultural dances, regional cuisines, and Catholic unity across all states of Nigeria.',
      rsvpsCount: 510,
    },
    {
      id: 'e-4',
      title: 'Free Community Health Screening & Blood Drive',
      day: 'Wednesday',
      monthDate: '17 Apr',
      year: '2024',
      category: 'Outreach',
      venue: 'Obukpa Community Civic Center',
      time: '08:30 AM',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
      description: 'Free medical checkups, malaria testing, eye exams, and blood donation organized by Catholic medical students.',
      rsvpsCount: 340,
    },
    {
      id: 'e-5',
      title: 'Easter Choir Concert & Orchestral Night',
      day: 'Sunday',
      monthDate: '28 Apr',
      year: '2024',
      category: 'Choir & Music',
      venue: 'St. Peter’s Chaplaincy Hall',
      time: '05:00 PM',
      image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=800',
      description: 'A night of divine choral music, brass band performances, and classical Easter hymns led by St. Cecilia Choir.',
      rsvpsCount: 890,
    },
    {
      id: 'e-6',
      title: 'Alumni Mentorship & Business Pitch Night',
      day: 'Friday',
      monthDate: '10 May',
      year: '2024',
      category: 'Entrepreneurship',
      venue: 'UNN Innovation Hub & Online Zoom',
      time: '04:00 PM',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
      description: 'Undergraduate student founders pitch startup concepts to Catholic alumni investors for micro-grant funding.',
      rsvpsCount: 290,
    },
    {
      id: 'e-7',
      title: 'Inter-Faculty Rosary Procession & Mass',
      day: 'Tuesday',
      monthDate: '21 May',
      year: '2024',
      category: 'Spiritual',
      venue: 'UNN Quadrangle to Chapel',
      time: '05:30 PM',
      image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800',
      description: 'Solemn candlelight Rosary procession around UNN campus praying for academic success and peace in Nigeria.',
      rsvpsCount: 1200,
    },
    {
      id: 'e-8',
      title: 'NFCS Sports Week & Chaplain’s Cup Finals',
      day: 'Saturday',
      monthDate: '01 Jun',
      year: '2024',
      category: 'Sports',
      venue: 'UNN Franco Sports Complex',
      time: '09:00 AM',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
      description: 'Exciting football, basketball, and track finals between pious societies and faculty associations.',
      rsvpsCount: 750,
    },
  ];

  const partners = [
    { name: "St. Peter's Chaplaincy UNN", role: "Host Patron" },
    { name: "Catholic Bishops Conference", role: "Ecclesiastical Approval" },
    { name: "UNN Alumni Association", role: "Sponsor & Endowment" },
    { name: "Caritas Nigeria", role: "Outreach Partner" },
    { name: "Catholic Medical Guild", role: "Health Missions" },
  ];

  const eventFaqs: FaqItem[] = [
    {
      id: 'efaq-1',
      question: 'How do I register or sign up for an upcoming event?',
      answer: 'Simply click the "Sign Up / RSVP" button on any event card. Registration is completely free for all UNN students, alumni, and community members.',
    },
    {
      id: 'efaq-2',
      question: 'Can non-Catholic students attend NFCS events?',
      answer: 'Yes! All academic seminars, career empowerment summits, sports competitions, and medical outreaches are open to all students regardless of religious background.',
    },
    {
      id: 'efaq-3',
      question: 'How can our pious society or alumni chapter organize an event?',
      answer: 'Click "Organize Your Event" on this page or submit your proposal to the Chaplaincy Secretariat at least 3 weeks prior to your desired date.',
    },
    {
      id: 'efaq-4',
      question: 'Are certificate of attendance issued for workshops?',
      answer: 'Yes, attendees of our Career Empowerment Summits and Skill Acquisition Workshops receive verifiable digital certificates of participation.',
    },
    {
      id: 'efaq-5',
      question: 'Can I sponsor an event or donate event materials?',
      answer: 'Absolutely! Alumni and well-wishers can sponsor event refreshments, printing materials, or student travel costs via our donation portal.',
    },
    {
      id: 'efaq-6',
      question: 'Where can I find photo and video recaps after an event?',
      answer: 'All event photos and video highlights are published on our Photo & Video Gallery page within 48 hours of event completion.',
    },
    {
      id: 'efaq-7',
      question: 'Who should I contact for emergency event inquiries?',
      answer: 'Contact the NFCS Social Secretary or Chaplaincy Secretariat hotline at +234 803 123 4567.',
    },
  ];

  const filteredUpcoming = upcomingEvents.filter(e =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLatest = latestEvents.filter(e =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConfirmRsvp = () => {
    setRsvpSuccess(true);
    setTimeout(() => {
      setSelectedEventRsvp(null);
      setRsvpSuccess(false);
    }, 2500);
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Hero Header Section matching Image 6 */}
      <section className="relative bg-emerald-950 text-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-8 right-[-35px] rotate-45 bg-emerald-400 text-emerald-950 font-extrabold text-[10px] sm:text-xs py-1 px-10 shadow-md tracking-wider uppercase z-10">
          EMPOWERING LIVES, BUILDING FUTURE
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs font-bold tracking-wider uppercase">
            <span>UPCOMING & PAST EVENTS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Discover Upcoming Events <span className="text-emerald-400">And Get Involved</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-emerald-100/90 font-normal leading-relaxed">
            Join us for holy retreats, academic summits, medical missions, sports tournaments, and cultural celebrations.
          </p>

          {/* Search Box matching Image 6 */}
          <div className="max-w-2xl mx-auto pt-4">
            <div className="relative flex items-center bg-white rounded-2xl p-2 shadow-xl border border-stone-200">
              <Search className="w-5 h-5 text-stone-400 ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Find Events Near You Or Online..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2.5 text-stone-800 placeholder-stone-400 bg-transparent text-sm sm:text-base focus:outline-none"
              />
              <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shrink-0">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Featured Upcoming Events matching Image 6 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            UPCOMING EVENTS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
            Don't Miss Our Upcoming Events And Activities
          </h2>
        </div>

        <div className="space-y-8">
          {filteredUpcoming.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8"
            >
              {/* Image & Date Box Column */}
              <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-stone-100">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-emerald-950 text-white rounded-2xl p-3 text-center shadow-lg border border-emerald-700/60 min-w-[70px]">
                  <span className="text-xs font-bold uppercase tracking-wider block text-emerald-400">{event.day}</span>
                  <span className="text-2xl font-black block leading-none my-1">{event.monthDate}</span>
                  <span className="text-[10px] text-stone-300 font-medium">{event.year}</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {event.category}
                </div>
              </div>

              {/* Event Content Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>{event.time}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 leading-snug">
                  {event.title}
                </h3>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {event.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-stone-100">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                    {event.rsvpsCount} Students & Alumni Registered
                  </span>

                  <button
                    onClick={() => setSelectedEventRsvp(event)}
                    className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-extrabold transition-all shadow-xs flex items-center gap-2"
                  >
                    <UserCheck className="w-4 h-4" />
                    Sign Up / RSVP Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Latest Events Grid matching Image 6 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-stone-200">
        <div className="mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            LATEST EVENTS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
            Catch Up On Our Latest Events And Impact
          </h2>
        </div>

        {/* 2x3 Grid matching Image 6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLatest.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-emerald-950 text-white text-xs font-bold px-3 py-1 rounded-lg">
                    {event.monthDate} {event.year}
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {event.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between mt-2">
                <span className="text-[11px] font-semibold text-stone-400">
                  {event.rsvpsCount} Attended
                </span>
                <button
                  onClick={() => setSelectedEventRsvp(event)}
                  className="px-4 py-2 bg-emerald-50 hover:bg-emerald-700 text-emerald-800 hover:text-white rounded-xl text-xs font-bold transition-all"
                >
                  Sign Up
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Organize Your Own Event Banner matching Image 6 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 p-8 sm:p-12 text-white overflow-hidden shadow-xl">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-extrabold tracking-wider uppercase text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700">
              CREATE & COLLABORATE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Organize Your Own Event With NFCS UNN
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Have a spiritual retreat, academic tutorial, or alumni networking proposal? Partner with St. Peter’s Chaplaincy to host your event.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                Get Started & Submit Proposal
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Our Partnerships matching Image 6 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-8 border border-stone-200 text-center space-y-6">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
              PARTNERSHIPS
            </span>
            <h3 className="text-xl font-extrabold text-stone-900 mt-2">
              Our Esteemed Partners & Sponsors
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-2">
            {partners.map((partner, idx) => (
              <div key={idx} className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-1">
                <Building2 className="w-6 h-6 text-emerald-700 mx-auto" />
                <h4 className="text-xs font-extrabold text-stone-900">{partner.name}</h4>
                <p className="text-[10px] text-stone-500">{partner.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: FAQs matching Image 6 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10 text-center sm:text-left">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            EVENT FAQ
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
            Frequently Asked Questions About Creating Events With Us
          </h2>
        </div>

        <div className="space-y-4 max-w-4xl">
          {eventFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all ${
                  isOpen ? 'bg-white border-emerald-500 shadow-md' : 'bg-white border-stone-200 hover:border-stone-300'
                }`}
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-bold text-stone-900 text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-emerald-700' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Event RSVP Modal */}
      {selectedEventRsvp && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200">
            {!rsvpSuccess ? (
              <div className="space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-stone-900">
                  Register For Event
                </h3>
                <p className="text-xs text-stone-600">
                  Confirm your registration for <strong className="text-stone-900">{selectedEventRsvp.title}</strong> on {selectedEventRsvp.monthDate} {selectedEventRsvp.year}.
                </p>
                <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600 space-y-1 border border-stone-200">
                  <p>• <strong>Venue:</strong> {selectedEventRsvp.venue}</p>
                  <p>• <strong>Time:</strong> {selectedEventRsvp.time}</p>
                  <p>• <strong>Pass:</strong> Free Admission</p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setSelectedEventRsvp(null)}
                    className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmRsvp}
                    className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5"
                  >
                    <UserCheck className="w-4 h-4" />
                    Confirm RSVP
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                <h3 className="text-xl font-extrabold text-stone-900">Registration Confirmed!</h3>
                <p className="text-xs text-stone-500">
                  You are registered for {selectedEventRsvp.title}. A reminder will be sent to your email.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
