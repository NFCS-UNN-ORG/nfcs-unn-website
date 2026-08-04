import React, { useState } from 'react';
import { PageTab } from '../../types';
import { Heart, Users, MapPin, Award, ArrowRight, Quote, ChevronLeft, ChevronRight, FileText, CheckCircle2, Sparkles } from 'lucide-react';

interface SuccessStoriesPageViewProps {
  onNavigate: (tab: PageTab) => void;
}

interface StoryItem {
  id: string;
  category: string;
  title: string;
  name: string;
  location: string;
  image: string;
  excerpt: string;
  fullStory: string;
  impactMetrics: string;
}

export const SuccessStoriesPageView: React.FC<SuccessStoriesPageViewProps> = ({ onNavigate }) => {
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const stories: StoryItem[] = [
    {
      id: 'story-1',
      category: 'Education',
      title: 'Education Opened Doors I Never Imagined',
      name: 'Amina',
      location: 'Nsukka Suburbs, Enugu',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
      excerpt: 'Through NFCS educational endowment grants, Amina completed her Engineering degree with first-class honors.',
      fullStory: 'Amina was on the verge of dropping out during her second year due to severe financial hardship following the loss of her parent. The NFCS Indigent Student Scholarship Scheme stepped in, covering her full tuition and providing book allowances. Today, she is a practicing structural engineer advocating for women in STEM.',
      impactMetrics: 'Full Tuition Funded • First Class Honors',
    },
    {
      id: 'story-2',
      category: 'Clean Water Access',
      title: 'Clean Water Gave Us New Hope',
      name: 'Rajesh & Villagers',
      location: 'Obukpa Rural Community',
      image: 'https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=800',
      excerpt: 'NFCS student volunteers drilled a solar-powered borehole providing clean drinking water to over 2,000 residents.',
      fullStory: 'Prior to the project, women and children walked over 4 kilometers daily to fetch untreated stream water, causing frequent waterborne illnesses. The chaplaincy outreach project commissioned a 10,000-liter solar borehole, eliminating waterborne diseases in the community.',
      impactMetrics: '2,000+ Villagers Served • 10,000L Daily Output',
    },
    {
      id: 'story-3',
      category: 'Health Care',
      title: "Health Care Saved My Son's Life",
      name: 'Maria & Family',
      location: 'St. Peter’s Medical Mission',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
      excerpt: 'Free medical consultations, surgeries, and prescriptions organized by Catholic medical students restored health.',
      fullStory: 'During the annual NFCS Rural Health Drive, volunteer medical students and doctors diagnosed Maria’s son with a severe treatable hernia. NFCS funded the corrective surgery at the University of Nigeria Teaching Hospital, giving him a full recovery.',
      impactMetrics: 'Free Surgical Procedure • 100% Recovery',
    },
    {
      id: 'story-4',
      category: 'Hunger Relief',
      title: 'This Gift Gave My Family And Me A Big Hope',
      name: 'Sarah',
      location: 'Campus Food Bank Initiative',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
      excerpt: 'The NFCS Sunday Welfare Food Bank supports indigent students and elderly community widows with monthly food crates.',
      fullStory: 'Sarah, a widowed mother of four near campus, struggled to feed her family during inflation spikes. The chaplaincy food distribution program provides monthly rice, beans, cooking oil, and nutritional supplements.',
      impactMetrics: 'Monthly Food Crates • 150+ Families Supported',
    },
    {
      id: 'story-5',
      category: 'Youth Empowerment',
      title: 'I Never Thought I Could Run My Own Business',
      name: 'Ahmed',
      location: 'UNN Innovation Hub',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
      excerpt: 'Vocational training in solar installation and digital skills empowered Ahmed to start a sustainable micro-enterprise.',
      fullStory: 'After participating in the NFCS Skill Acquisition Workshop, Ahmed received seed micro-grants and mentorship from Catholic alumni entrepreneurs. He now employs three fellow UNN students in his solar maintenance startup.',
      impactMetrics: 'Seed Grant Awardee • 3 Jobs Created',
    },
    {
      id: 'story-6',
      category: 'Clean Water & Hygiene',
      title: 'Clean Water Changed Everything For Us',
      name: 'John & Students',
      location: 'Local Primary School Outreach',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
      excerpt: 'Sanitation facilities and handwashing stations built at community schools improved attendance and health.',
      fullStory: 'John’s school lacked proper hygiene infrastructure, leading to frequent student absenteeism. NFCS constructed modern sanitation blocks and donated hygiene supplies, boosting school attendance by 45%.',
      impactMetrics: '45% Attendance Boost • Modern Sanitation Block',
    },
  ];

  const impactStats = [
    { label: 'Lives Impacted', value: '500k+', icon: <Users className="w-6 h-6 text-emerald-600" /> },
    { label: 'Active Volunteers', value: '100+', icon: <Award className="w-6 h-6 text-emerald-600" /> },
    { label: 'Communities Supported', value: '100+', icon: <MapPin className="w-6 h-6 text-emerald-600" /> },
    { label: 'Youth Empowered', value: '300+', icon: <Sparkles className="w-6 h-6 text-emerald-600" /> },
  ];

  const testimonials = [
    {
      quote: "Seeing the direct transformation in students' lives through NFCS programs gives me the highest confidence in donating annually.",
      author: "Barr. Chidi Anene",
      role: "Alumni Patron • Class of 1998",
    },
    {
      quote: "The medical outreach saved my nephew's sight. The volunteer doctors and students were angels sent by God.",
      author: "Mrs. Nkechi Nwosu",
      role: "Nsukka Community Leader",
    },
  ];

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Hero Banner matching Image 2 */}
      <section className="relative bg-emerald-950 text-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-8 right-[-35px] rotate-45 bg-emerald-400 text-emerald-950 font-extrabold text-[10px] sm:text-xs py-1 px-10 shadow-md tracking-wider uppercase z-10">
          EMPOWERING LIVES, BUILDING FUTURE
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs font-bold tracking-wider uppercase">
            <span>SUCCESS STORY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Real Stories Of <span className="text-emerald-400">Change And Impact</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-emerald-100/90 font-normal leading-relaxed">
            Discover how the grace of God, student dedication, and alumni support transform lives across our campus and host communities.
          </p>
        </div>
      </section>

      {/* Impact Metrics Stats Bar matching Image 2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
              IMPACT
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-2">
              Real Change Through Collective Action
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-stone-100">
            {impactStats.map((stat, idx) => (
              <div key={idx} className="p-4 space-y-1">
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-800">{stat.value}</div>
                <div className="text-xs sm:text-sm font-semibold text-stone-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid matching Image 2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10 text-center sm:text-left">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            SUCCESS STORY
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
            Stories Of Lives Transformed Through Our Support
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {story.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{story.name} • {story.location}</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    "{story.title}"
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {story.excerpt}
                  </p>

                  <div className="p-2.5 bg-emerald-50 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2 border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{story.impactMetrics}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  onClick={() => setSelectedStory(story)}
                  className="flex-1 py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  View Story
                </button>
                <button
                  onClick={() => onNavigate('donations')}
                  className="flex-1 py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  Donate Cause
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section matching Image 2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
                TESTIMONIALS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2">
                Hear From Our Supporters: Together, We Make A Difference
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="p-3 rounded-full bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-800 transition-colors"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="p-3 rounded-full bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-800 transition-colors"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative bg-emerald-50/60 rounded-2xl p-6 sm:p-8 border border-emerald-100">
            <Quote className="w-10 h-10 text-emerald-300 mb-4" />
            <p className="text-base sm:text-lg text-stone-800 font-medium italic leading-relaxed mb-6">
              "{testimonials[currentTestimonialIndex].quote}"
            </p>
            <div>
              <h4 className="font-extrabold text-stone-900 text-base">
                {testimonials[currentTestimonialIndex].author}
              </h4>
              <p className="text-xs text-stone-500 font-medium">
                {testimonials[currentTestimonialIndex].role}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diagonal Ribbon Callout Banner matching Image 2 (Blue variant) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-sky-950 p-8 sm:p-12 text-white overflow-hidden shadow-xl">
          <div className="absolute top-6 right-[-35px] rotate-45 bg-sky-400 text-sky-950 font-extrabold text-[10px] sm:text-xs py-1 px-10 shadow-md tracking-wider uppercase">
            PASSION DRIVES EVERY ACTION
          </div>

          <div className="max-w-2xl space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Become A Volunteer And Create Lasting Change
            </h2>
            <p className="text-sm sm:text-base text-sky-100/90 leading-relaxed">
              Every story of hope begins with someone taking action. Join our chaplaincy volunteer team or sponsor a student today.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('get-involved')}
                className="px-6 py-3 bg-sky-400 hover:bg-sky-300 text-sky-950 font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                Join Us Today
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('donations')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-all"
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200 space-y-6">
            <div className="relative h-60 rounded-2xl overflow-hidden bg-stone-100">
              <img src={selectedStory.image} alt={selectedStory.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                {selectedStory.category}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-stone-500 mb-1">
                {selectedStory.name} • {selectedStory.location}
              </div>
              <h3 className="text-2xl font-extrabold text-stone-900 mb-3">
                "{selectedStory.title}"
              </h3>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed space-y-3">
                {selectedStory.fullStory}
              </p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Impact Highlights</h4>
              <p className="text-sm font-extrabold text-emerald-900">{selectedStory.impactMetrics}</p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedStory(null)}
                className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl"
              >
                Close Story
              </button>
              <button
                onClick={() => { setSelectedStory(null); onNavigate('donations'); }}
                className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
              >
                <Heart className="w-4 h-4 fill-white" />
                Support This Cause
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
