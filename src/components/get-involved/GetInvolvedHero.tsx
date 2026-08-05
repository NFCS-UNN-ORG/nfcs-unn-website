import React from 'react';
import { Users, GraduationCap, Briefcase, Heart, Building2 } from 'lucide-react';

interface DivisionItem {
  id: string;
  title: string;
  jobsAvailable: string;
  icon: React.ReactNode;
  description: string;
}

interface GetInvolvedHeroProps {
  divisions: DivisionItem[];
  onOpenApplyModal: () => void;
}

export const GetInvolvedHero: React.FC<GetInvolvedHeroProps> = ({ divisions, onOpenApplyModal }) => {
  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-200 dark:border-emerald-800">
          <Users className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
          <span>Alumni & Student Engagement Network</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
          Join NFCS Alumni & Volunteer Network At UNN
        </h1>

        <p className="text-sm sm:text-base text-stone-600 dark:text-slate-300 leading-relaxed">
          Whether you are an alumnus looking to mentor freshers, sponsor indigent tuition, or a student ready to serve in chaplaincy ministries, there is a place for you.
        </p>

        <div className="pt-2 flex justify-center">
          <button
            onClick={onOpenApplyModal}
            className="bg-[#4D2EAB] hover:bg-[#3B2285] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            Join Global NFCS Alumni Directory
          </button>
        </div>
      </div>

      {/* Divisions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {divisions.map((div) => (
          <div
            key={div.id}
            className="bg-white dark:bg-[#0C0F38] border border-stone-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-md hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
              {div.icon}
            </div>
            <span className="text-[10px] font-extrabold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">
              {div.jobsAvailable}
            </span>
            <h3 className="font-extrabold text-stone-900 dark:text-white text-base">{div.title}</h3>
            <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">{div.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
