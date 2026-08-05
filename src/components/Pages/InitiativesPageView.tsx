import React, { useState } from 'react';
import { CHAPLAINCY_PROJECTS } from '../../data/nfcsData';
import { ProjectItem } from '../../types';
import { NewsletterBanner } from '../NewsletterBanner';
import { InitiativesHero } from '../initiatives/InitiativesHero';
import { InitiativeCard } from '../initiatives/InitiativeCard';
import { InitiativeModal } from '../initiatives/InitiativeModal';

export const InitiativesPageView: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorAmount, setDonorAmount] = useState('');
  const [donorPhone, setDonorPhone] = useState('');

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  const categories = [
    'All',
    'Infrastructure',
    'Student Welfare',
    'Academic Support',
    'Liturgy & Music',
    'Community Charity',
  ];

  const filteredProjects =
    activeCategoryFilter === 'All'
      ? CHAPLAINCY_PROJECTS
      : CHAPLAINCY_PROJECTS.filter((p) => p.category === activeCategoryFilter);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPledgeSubmitted(true);
    setTimeout(() => {
      setPledgeSubmitted(false);
      setSelectedProject(null);
      setDonorName('');
      setDonorAmount('');
      setDonorPhone('');
    }, 2800);
  };

  return (
    <div className="bg-stone-50 dark:bg-[#080A26] min-h-screen py-8 sm:py-14 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Header Hero Banner */}
        <InitiativesHero onVolunteerClick={() => setVolunteerModalOpen(true)} />

        {/* Category Filters */}
        <div id="projects-grid" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
                Current Chaplaincy & Student Projects
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400">
                Transparently tracked development programs funded by generous alumni, students, and donors.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeCategoryFilter === cat
                      ? 'bg-[#4D2EAB] text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-700 dark:text-slate-300 hover:border-stone-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <InitiativeCard key={proj.id} project={proj} onSelect={setSelectedProject} />
            ))}
          </div>
        </div>

        {/* Support & Volunteer Modals */}
        <InitiativeModal
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          volunteerModalOpen={volunteerModalOpen}
          setVolunteerModalOpen={setVolunteerModalOpen}
          pledgeSubmitted={pledgeSubmitted}
          donorName={donorName}
          setDonorName={setDonorName}
          donorAmount={donorAmount}
          setDonorAmount={setDonorAmount}
          donorPhone={donorPhone}
          setDonorPhone={setDonorPhone}
          handleSupportSubmit={handleSupportSubmit}
        />
      </div>

      <NewsletterBanner />
    </div>
  );
};
