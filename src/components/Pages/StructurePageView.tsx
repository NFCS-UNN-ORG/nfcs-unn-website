import React, { useState } from 'react';
import { PageTab } from '../../types';
import { Cross, Heart, Users, Shield, BookOpen, GraduationCap, Compass, FileText, Sparkles, Award } from 'lucide-react';
import { MassScheduleView } from './MassScheduleView';
import { PrayerRequestView } from './PrayerRequestView';
import { FellowshipView } from './FellowshipView';
import { OrgansView } from './OrgansView';
import { SocietiesView } from './SocietiesView';
import { FacultiesView } from './FacultiesView';
import { MentorshipView } from './MentorshipView';
import { AcademicSupportView } from './AcademicSupportView';
import { ForumsView } from './ForumsView';
import { AlumniView } from './AlumniView';

interface StructurePageViewProps {
  initialSubTab?: PageTab;
  onNavigate?: (tab: PageTab) => void;
}

export const StructurePageView: React.FC<StructurePageViewProps> = ({ initialSubTab = 'mass-confession', onNavigate }) => {
  const [activeSubTab, setActiveSubTab] = useState<PageTab>(initialSubTab);

  const subItems: { id: PageTab; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'mass-confession', label: 'Mass Times & Confession', icon: <Cross className="w-4 h-4 text-emerald-600" />, desc: 'Holy Mass & Sacraments' },
    { id: 'prayer-request', label: 'Prayer Request', icon: <Heart className="w-4 h-4 text-rose-600" />, desc: 'Intercessory petitions' },
    { id: 'fellowship', label: 'Student General Fellowship', icon: <Users className="w-4 h-4 text-indigo-600" />, desc: 'Tuesday gatherings' },
    { id: 'organs', label: 'Organs', icon: <Shield className="w-4 h-4 text-amber-600" />, desc: '5 Organs & meeting times' },
    { id: 'societies', label: 'Societies', icon: <BookOpen className="w-4 h-4 text-purple-600" />, desc: 'Pious & Marian societies' },
    { id: 'faculties', label: 'Faculties', icon: <GraduationCap className="w-4 h-4 text-sky-600" />, desc: 'Faculty associations' },
    { id: 'mentorship', label: 'Mentorship', icon: <Compass className="w-4 h-4 text-emerald-600" />, desc: 'Academic & career direction' },
    { id: 'academic-support', label: 'Academic Support', icon: <FileText className="w-4 h-4 text-blue-600" />, desc: 'Tutorials & past questions' },
    { id: 'forums', label: 'First & Final Year Forum', icon: <Sparkles className="w-4 h-4 text-amber-500" />, desc: 'Fresher & finalist forums' },
    { id: 'alumni', label: 'Alumni', icon: <Award className="w-4 h-4 text-rose-500" />, desc: 'Global graduate network' },
  ];

  return (
    <div className="bg-stone-50 dark:bg-[#080A26] min-h-screen pb-12">
      {/* Sub-navigation pill bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {subItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSubTab(item.id);
                  if (onNavigate) onNavigate(item.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeSubTab === item.id
                    ? 'bg-[#4D2EAB] text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Render sub-component view */}
      {activeSubTab === 'mass-confession' && <MassScheduleView />}
      {activeSubTab === 'prayer-request' && <PrayerRequestView />}
      {activeSubTab === 'fellowship' && <FellowshipView />}
      {activeSubTab === 'organs' && <OrgansView />}
      {activeSubTab === 'societies' && <SocietiesView />}
      {activeSubTab === 'faculties' && <FacultiesView />}
      {activeSubTab === 'mentorship' && <MentorshipView />}
      {activeSubTab === 'academic-support' && <AcademicSupportView />}
      {activeSubTab === 'forums' && <ForumsView />}
      {activeSubTab === 'alumni' && <AlumniView />}
    </div>
  );
};
