import React, { useState } from 'react';
import {
  Users,
  Search,
  GraduationCap,
  Briefcase,
  Heart,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Sparkles,
  Award,
  BookOpen,
  MapPin,
  Quote,
  X,
  Send,
  Check,
  Compass,
  FileText,
  UserCheck
} from 'lucide-react';
import { NewsletterBanner } from '../NewsletterBanner';

export const GetInvolvedPageView: React.FC = () => {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Modal State for Joining Alumni Network / Volunteer
  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>('Alumni Career & Internship Mentor');
  const [gradYear, setGradYear] = useState<string>('2018');
  const [department, setDepartment] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const divisions = [
    {
      id: 'mentorship',
      title: 'Mentorship & Career',
      jobsAvailable: '12 Roles Available',
      icon: <GraduationCap className="w-6 h-6 text-emerald-700" />,
      description: 'Guide undergraduates with resume reviews, career coaching, graduate school guidance, and job placement opportunities.',
    },
    {
      id: 'technology',
      title: 'Academic & Technology',
      jobsAvailable: '4 Roles Available',
      icon: <Briefcase className="w-6 h-6 text-emerald-700" />,
      description: 'Support digital learning tools, past question printing, STEM workshops, and software infrastructure for UNN students.',
    },
    {
      id: 'welfare',
      title: 'Student Welfare & Relief',
      jobsAvailable: '28 Roles Available',
      icon: <Heart className="w-6 h-6 text-emerald-700" />,
      description: 'Sponsor indigent student tuition, emergency medical funds, accommodation relief, and campus feeding initiatives.',
    },
    {
      id: 'infrastructure',
      title: 'Endowment & Projects',
      jobsAvailable: '8 Roles Available',
      icon: <Building2 className="w-6 h-6 text-emerald-700" />,
      description: 'Fund St. Peter’s Chaplaincy solar power, audio-visual gear, altar maintenance, and library reading annex expansions.',
    },
  ];

  const coreValues = [
    {
      title: 'Integrity & Stewardship',
      desc: 'We uphold absolute financial transparency, publishing audited reports supervised by St. Peter’s Chaplaincy Fathers.',
    },
    {
      title: 'Student Empowerment',
      desc: 'We strive to uplift Catholic undergraduates at UNN through tuition scholarships, mentorship, and spiritual formation.',
    },
    {
      title: 'Alumni Collaboration',
      desc: 'We work together with alumni chapters in Lagos, Abuja, Port Harcourt, Enugu, UK, US, and across the global diaspora.',
    },
    {
      title: 'Sustainable Impact',
      desc: 'We focus on long-term solutions like 24/7 solar power, annual indigent student endowments, and medical outreach.',
    },
  ];

  const alumniReviews = [
    {
      quote: 'Partnering with NFCS UNN as an alumni mentor allowed me to directly guide 300L engineering students into paid internships. Giving back to St. Peter’s Chaplaincy is deeply rewarding.',
      name: 'Dr. Emeka O. Okonkwo',
      role: 'Alumnus (Class of 2012, Electronic Engineering) • Senior Tech Lead, Lagos',
    },
    {
      quote: 'I am proud to be part of an alumni network that pays tuition for stranded Catholic undergraduates every semester. The level of transparency and chaplaincy oversight gives complete trust.',
      name: 'Barr. Chinyere A. Nnamdi',
      role: 'Alumna (Class of 2015, Law) • Legal Practitioner, Abuja',
    },
    {
      quote: 'Sponsoring solar inverter batteries for the chapel study annex brought continuous electricity to over 2,000 students preparing for semester exams. Highly recommended for all graduates!',
      name: 'Engr. Kevin M. Igwe',
      role: 'Alumnus (Class of 2018, Mechanical Engineering) • Energy Consultant',
    },
  ];

  const alumniRoles = [
    {
      category: 'Mentorship',
      title: 'Career & Internship Mentor',
      desc: 'Adopt 2 to 5 UNN Catholic undergraduates in your field for quarterly career mentoring, resume polish, and internship referrals.',
      tags: ['Remote', 'Quarterly Commitment', 'Mentorship'],
    },
    {
      category: 'Welfare Guild',
      title: 'Indigent Student Sponsor',
      desc: 'Join our monthly or annual tuition endowment pool to keep stranded, hardworking undergraduates from academic deferment.',
      tags: ['Sponsorship', 'Flexible Amount', 'Direct Relief'],
    },
    {
      category: 'Chapter Ambassador',
      title: 'Regional Alumni Representative',
      desc: 'Coordinate NFCS UNN Alumni reunions, networking dinners, and welfare drives in Lagos, Abuja, Port Harcourt, or Overseas.',
      tags: ['Leadership', 'Networking', 'Regional Chapter'],
    },
  ];

  const faqs = [
    {
      q: 'How Can An NFCS UNN Alumnus Get Involved?',
      a: 'You can join our global alumni register, mentor current UNN students, participate in regional chapter events (Lagos, Abuja, PH, Diaspora), or sponsor indigent student tuition and chaplaincy projects.',
    },
    {
      q: 'Are There Local Alumni Chapters In Major Cities?',
      a: 'Yes! NFCS UNN Alumni chapters meet regularly in Lagos, Abuja, Port Harcourt, Enugu, Owerri, and virtually for diaspora alumni in North America and Europe.',
    },
    {
      q: 'How Can My Firm Offer Internships Or Jobs To UNN Graduates?',
      a: 'Through the NFCS Alumni Career & Internship Portal, you can post vacancies, request top-performing graduates, or host campus recruitment workshops at UNN.',
    },
    {
      q: 'How Are Alumni Financial Contributions Managed?',
      a: 'All alumni donations go directly to St. Peter’s Catholic Chaplaincy Zenith Bank account with dual-authorization by Chaplaincy Fathers and Trustees. Comprehensive financial statements are presented at annual congresses.',
    },
    {
      q: 'Can I Volunteer As A Guest Speaker Or Workshop Leader?',
      a: 'Yes! We host annual Career Summits, Professional Development Webinars, and Spiritual Retreats where alumni share expertise with current students.',
    },
  ];

  return (
    <div className="bg-stone-50 min-h-screen py-8 sm:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">

        {/* ================= 1. HERO + ALUMNI SEARCH (MATCHING WIREFRAME) ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-6 pt-2">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border border-emerald-200">
            <GraduationCap className="w-4 h-4 text-emerald-800" />
            <span>Alumni & Friends Engagement • NFCS UNN</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.12]">
            Join Us In Making A Lasting Difference
          </h1>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Calling all Great Lions & Lionesses! Reconnect with St. Peter’s Catholic Chaplaincy, mentor Catholic undergraduates, sponsor indigent students, and drive transformative projects at University of Nigeria, Nsukka.
          </p>

          {/* Search Box Widget */}
          <div className="max-w-xl mx-auto bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-full border border-stone-200/90 shadow-lg flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center gap-2 pl-4 w-full">
              <Search className="w-4 h-4 text-stone-400 shrink-0" />
              <input
                type="text"
                placeholder="Find Volunteer & Mentorship Opportunities Near You..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden py-2 bg-transparent"
              />
            </div>
            <button
              onClick={() => {
                setShowApplyModal(true);
                if (searchQuery) setSelectedRole(`Custom Search: ${searchQuery}`);
              }}
              className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl sm:rounded-full shadow-md transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Search Opportunities</span>
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ================= 2. DIVISIONS GRID ================= */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
              Our Division
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Explore Alumni Opportunities Across Our Divisions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisions.map((div) => (
              <div
                key={div.id}
                className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                      {div.icon}
                    </div>
                    <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
                      {div.jobsAvailable}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-stone-900 group-hover:text-emerald-800 transition-colors">
                    {div.title}
                  </h3>

                  <p className="text-xs text-stone-500 leading-relaxed">
                    {div.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-stone-100 mt-4">
                  <button
                    onClick={() => {
                      setSelectedRole(div.title);
                      setShowApplyModal(true);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-black text-stone-900 group-hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    <span>See All Roles</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 3. CORE VALUES SECTION ================= */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/90 shadow-xs space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
                Our Value
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight leading-snug">
                Core Values Driving Positive Alumni Change
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-2">
                We prioritize integrity, empowerment, collaboration, and sustainability to create lasting impact and support the growth of thriving student communities at University of Nigeria, Nsukka.
              </p>
            </div>
          </div>

          {/* 2 Big Featured Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-xs group">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000"
                alt="Alumni Mentorship"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Mentorship Network</span>
                  <h3 className="text-base font-extrabold">Empowering Undergraduates with Career Guidance</h3>
                </div>
              </div>
            </div>

            <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-xs group">
              <img
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1000"
                alt="Chaplaincy Fellowship"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">St. Peter's Chaplaincy UNN</span>
                  <h3 className="text-base font-extrabold">Nurturing Spiritual & Academic Growth Since 1960</h3>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Columns for Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-stone-100">
            {coreValues.map((val, idx) => (
              <div key={idx} className="space-y-1.5">
                <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{val.title}</span>
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed pl-6">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 4. ALUMNI REVIEWS / TESTIMONIALS ================= */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
              Why Our Alumni Love Partnering Here
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Alumni Reviews On Partnering With Our Chaplaincy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alumniReviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <Quote className="w-8 h-8 text-emerald-700 opacity-50" />
                  <p className="text-xs text-stone-600 leading-relaxed italic">
                    "{rev.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-100">
                  <h4 className="font-extrabold text-stone-900 text-sm">{rev.name}</h4>
                  <p className="text-[11px] text-emerald-800 font-semibold">{rev.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 5. ACTIVITIES / PROGRAMS SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-100/80 rounded-3xl p-8 sm:p-12 border border-stone-200/90">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
              Our Activity
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight leading-snug">
              Explore The Wide Range Of Activities & Programs Driving Real Impact
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Our alumni engagement activities are designed to create sustainable, positive impacts across UNN Nsukka campus through a variety of mentorship summits, scholarship awards, career expos, and chaplaincy infrastructure developments.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setSelectedRole('Annual Alumni Homecoming');
                  setShowApplyModal(true);
                }}
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs py-3 px-5 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <span>Join Annual Alumni Homecoming</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-200 border border-stone-300 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1000"
                alt="Alumni Activities"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-6">
                <p className="text-white text-xs font-extrabold">
                  NFCS UNN Global Alumni Reunion & Career Summit
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 6. ALUMNI ADVISORY & VOLUNTEER ROLES ================= */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
                Opportunities Available
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
                Explore Key Alumni Engagement Roles
              </h2>
            </div>

            <button
              onClick={() => {
                setSelectedRole('General Alumni Network');
                setShowApplyModal(true);
              }}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1"
            >
              <span>See All Roles</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alumniRoles.map((role, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    • {role.category}
                  </span>
                  <h3 className="text-lg font-extrabold text-stone-900 leading-snug">{role.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{role.desc}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {role.tags.map((tg, tIdx) => (
                      <span key={tIdx} className="text-[10px] bg-stone-100 text-stone-600 px-2.5 py-1 rounded-md font-medium">
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedRole(role.title);
                    setShowApplyModal(true);
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-stone-900 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 rounded-xl transition-all cursor-pointer"
                >
                  <span>Apply / Join Role</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 7. SLANTED CALLOUT BANNER (MATCHING WIREFRAME SLANTED BADGE) ================= */}
        <div className="relative bg-stone-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-stone-800">
          
          {/* Decorative Diagonal Ribbon */}
          <div className="absolute -top-6 -right-6 bg-emerald-400 text-stone-950 text-[10px] font-black uppercase tracking-widest px-10 py-2 rotate-12 shadow-lg hidden sm:block">
            EMPOWERING LIVES, BUILDING FUTURE
          </div>

          <div className="space-y-3 max-w-2xl relative z-10">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-900 text-emerald-200 px-3 py-1 rounded-full inline-block">
              Join Our Team / Global Network
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Become An Alumni Partner And Create Lasting Impact
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-xl">
              Whether you graduated last year or decades ago, your experience, mentorship, and generosity shape the next generation of Catholic leaders at UNN.
            </p>
          </div>

          <div className="shrink-0 relative z-10">
            <button
              onClick={() => {
                setSelectedRole('Global Alumni Ambassador');
                setShowApplyModal(true);
              }}
              className="inline-flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-black text-sm px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <span>Join Network Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= 8. FAQ ACCORDION ================= */}
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Frequently Asked Questions About Alumni Engagement
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-extrabold text-stone-900 text-sm sm:text-base cursor-pointer hover:bg-stone-50/80"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-emerald-700 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Newsletter Banner */}
        <NewsletterBanner />

      </div>

      {/* ================= ALUMNI JOIN / APPLICATION MODAL ================= */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 relative shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowApplyModal(false);
                setSubmitted(false);
              }}
              className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-stone-900">Registration Complete!</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Thank you, <span className="font-bold text-stone-900">{fullName}</span>! You are officially registered under the NFCS UNN Global Alumni Network for <span className="font-bold text-emerald-800">{selectedRole}</span>.
                </p>
                <div className="p-3 bg-stone-50 rounded-xl font-mono text-xs text-stone-500">
                  Ref ID: NFCS-ALUMNI-{Math.floor(100000 + Math.random() * 900000)}
                </div>
                <button
                  onClick={() => {
                    setShowApplyModal(false);
                    setSubmitted(false);
                  }}
                  className="w-full bg-emerald-700 text-white font-extrabold text-xs py-3 rounded-xl cursor-pointer"
                >
                  Done / Close
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-stone-900">Register / Get Involved</h3>
                  <p className="text-xs text-emerald-800 font-bold">{selectedRole}</p>
                </div>

                <form onSubmit={handleApplySubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Anthony Okeke"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">UNN Grad Year</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 2016"
                        value={gradYear}
                        onChange={(e) => setGradYear(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Department</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Pharmacy / Law"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Current Location (City / Country)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lagos, Nigeria / London, UK"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="anthony@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="0803 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Submit Alumni Registration
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
