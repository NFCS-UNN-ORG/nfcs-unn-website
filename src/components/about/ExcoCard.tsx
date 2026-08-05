import React from 'react';
import { ExcoMember } from '../../types';
import { Mail, Phone, GraduationCap } from 'lucide-react';

interface ExcoCardProps {
  member: ExcoMember;
}

export const ExcoCard: React.FC<ExcoCardProps> = ({ member }) => {
  return (
    <div className="bg-white dark:bg-[#0C0F38] border border-stone-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-md hover:shadow-xl transition-all group">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-200 shadow-sm">
        <img
          src={
            member.image ||
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
          }
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-[#4D2EAB] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
          {member.office}
        </span>
      </div>

      <div className="space-y-1 text-center sm:text-left">
        <h3 className="font-extrabold text-stone-900 dark:text-white text-base">{member.name}</h3>
        <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">{member.office}</p>
        <div className="flex items-center gap-1 text-[11px] text-stone-500 dark:text-slate-400 font-medium">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>
            {member.department} ({member.faculty})
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-xs text-stone-500 dark:text-slate-400">
        {member.phone && (
          <a
            href={`tel:${member.phone}`}
            className="flex items-center gap-1 hover:text-[#4D2EAB] dark:hover:text-indigo-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{member.phone}</span>
          </a>
        )}
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-1 hover:text-[#4D2EAB] dark:hover:text-indigo-400 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
        )}
      </div>
    </div>
  );
};
