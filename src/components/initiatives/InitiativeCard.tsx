import React from 'react';
import { ProjectItem } from '../../types';
import { Heart, MapPin, ArrowUpRight } from 'lucide-react';

interface InitiativeCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

export const InitiativeCard: React.FC<InitiativeCardProps> = ({ project, onSelect }) => {
  return (
    <div className="bg-white dark:bg-[#0C0F38] rounded-3xl border border-stone-200 dark:border-slate-800 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div className="relative aspect-16/10 overflow-hidden bg-stone-200">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-[#4D2EAB] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
          {project.category}
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2.5 py-1 rounded-full">
          <MapPin className="w-3 h-3 text-emerald-400" />
          <span>{project.location}</span>
        </div>
      </div>

      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="font-extrabold text-stone-900 dark:text-white text-base leading-snug">
            {project.title}
          </h3>
          <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-emerald-700 dark:text-emerald-400">
                Raised ₦{project.raisedAmount.toLocaleString()}
              </span>
              <span className="text-stone-500 dark:text-slate-400">
                Goal: ₦{project.goalAmount.toLocaleString()}
              </span>
            </div>
            <div className="w-full h-2.5 bg-stone-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#4D2EAB] to-emerald-500 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(project.progressPercent, 100)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-slate-800">
            <span className="text-[11px] font-extrabold text-stone-500 dark:text-slate-400">
              {project.progressPercent}% Funded
            </span>
            <button
              onClick={() => onSelect(project)}
              className="inline-flex items-center gap-1.5 bg-[#4D2EAB] hover:bg-[#3B2285] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-sm hover:scale-102"
            >
              <span>Support Initiative</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
