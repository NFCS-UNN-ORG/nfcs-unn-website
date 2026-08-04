import React from 'react';
import { FACULTY_ASSOCIATIONS } from '../../data/nfcsData';
import { GraduationCap, BookOpen, Award, Users, CheckCircle2, Sparkles } from 'lucide-react';
import { NewsletterBanner } from '../NewsletterBanner';

export const StudentLifeView: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-md text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
            Student Life & Academics
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Harmonizing Faith & Academic Excellence at UNN
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            NFCS UNN believes that deep spiritual devotion and top academic performance go hand in hand. Discover how our faculty Catholic associations support your studies.
          </p>
        </div>

        {/* Academic Integration Highlights */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl font-bold text-stone-900">How NFCS Integrates With Academic Life</h2>
            <p className="text-xs sm:text-sm text-stone-600">
              We empower Catholic students to excel in lectures, continuous assessments, and degree examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-stone-900 text-base">Faculty Peer Tutorials</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Free academic tutorials organised by senior Catholic students in 300L, 400L, and 500L to help junior students master difficult general and departmental courses.
              </p>
            </div>

            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-stone-900 text-base">Past Question Banks</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Access to organized past question archives, study guides, and exam preparation sessions curated by various Faculty Catholic Associations.
              </p>
            </div>

            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-stone-900 text-base">Exam Prayer Retreats</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Special Holy Mass for Examinees, Holy Hour of Adoration for exam success, and peaceful study atmosphere at St. Peter's Chaplaincy grounds.
              </p>
            </div>
          </div>
        </div>

        {/* Faculty Catholic Associations Catalog */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
              Faculty Associations
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Catholic Associations Across UNN Faculties
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Get plugged into your faculty chapter for specialized academic and spiritual fellowship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FACULTY_ASSOCIATIONS.map((fac) => (
              <div
                key={fac.id}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-white bg-emerald-800 px-3 py-1 rounded-lg">
                      {fac.acronym}
                    </span>
                    {fac.patronSaint && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        Patron: {fac.patronSaint}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-stone-900">{fac.fullName}</h3>

                  <p className="text-xs text-stone-500 font-semibold">{fac.faculty}</p>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {fac.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-medium">
                  <span>Chapter Status: Active</span>
                  <span className="text-emerald-700 font-bold">UNN Campus</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <NewsletterBanner />

      </div>
    </div>
  );
};
