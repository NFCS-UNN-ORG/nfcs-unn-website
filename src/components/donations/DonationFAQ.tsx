import React from 'react';
import { ChevronDown, ChevronUp, Quote, HelpCircle, Eye, X } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

interface StoryItem {
  title: string;
  tag: string;
  person: string;
  quote: string;
  fullStory: string;
  image: string;
}

interface DonationFAQProps {
  faqs: FaqItem[];
  openFaqIndex: number | null;
  setOpenFaqIndex: (idx: number | null) => void;
  stories: StoryItem[];
  activeStoryModal: StoryItem | null;
  setActiveStoryModal: (story: StoryItem | null) => void;
}

export const DonationFAQ: React.FC<DonationFAQProps> = ({
  faqs,
  openFaqIndex,
  setOpenFaqIndex,
  stories,
  activeStoryModal,
  setActiveStoryModal,
}) => {
  return (
    <div className="space-y-16">
      {/* Student Impact Stories Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Real Impact & Testimonials
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            See How Your Giving Changes Lives
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-400">
            Stories from Catholic undergraduates whose tuition, academic books, and campus life were transformed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0C0F38] border border-stone-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between group hover:shadow-xl transition-all"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-stone-200">
                <img
                  src={story.image}
                  alt={story.person}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#4D2EAB] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {story.tag}
                </span>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-stone-900 dark:text-white text-base leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-slate-300 italic leading-relaxed">
                    "{story.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
                  <p className="text-[11px] font-bold text-stone-500 dark:text-slate-400">{story.person}</p>
                  <button
                    onClick={() => setActiveStoryModal(story)}
                    className="flex items-center gap-1 text-xs font-bold text-[#4D2EAB] dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    <span>Read Story</span>
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-stone-500 dark:text-slate-400">
            Everything you need to know about donating to St. Peter's Chaplaincy UNN
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0C0F38] border border-stone-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-stone-900 dark:text-white cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaqIndex === idx ? (
                  <ChevronUp className="w-4 h-4 shrink-0 text-[#4D2EAB] dark:text-indigo-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 shrink-0 text-stone-400" />
                )}
              </button>

              {openFaqIndex === idx && (
                <div className="px-4 pb-5 sm:px-5 text-xs text-stone-600 dark:text-slate-300 leading-relaxed border-t border-stone-100 dark:border-slate-800/80 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Story Full Modal */}
      {activeStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#0C0F38] border border-stone-200 dark:border-slate-800 max-w-xl w-full rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveStoryModal(null)}
              className="absolute top-4 right-4 p-2 bg-stone-900/60 text-white rounded-full hover:bg-stone-900 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-16/9 bg-stone-200">
              <img
                src={activeStoryModal.image}
                alt={activeStoryModal.person}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#4D2EAB] text-white px-2.5 py-1 rounded-full">
                    {activeStoryModal.tag}
                  </span>
                  <h3 className="text-lg font-black text-white mt-1">{activeStoryModal.title}</h3>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <blockquote className="text-xs sm:text-sm font-bold text-stone-800 dark:text-slate-200 italic border-l-4 border-emerald-500 pl-4 py-1">
                "{activeStoryModal.quote}"
              </blockquote>

              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase text-stone-400">Full Beneficiary Story</h4>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 leading-relaxed">
                  {activeStoryModal.fullStory}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-stone-500">{activeStoryModal.person}</span>
                <button
                  onClick={() => setActiveStoryModal(null)}
                  className="px-4 py-2 bg-[#4D2EAB] text-white font-bold rounded-xl"
                >
                  Close Story
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
