import React from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';

export interface EventItem {
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

interface EventCardProps {
  event: EventItem;
  onRsvpSelect: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onRsvpSelect }) => {
  return (
    <div className="bg-white dark:bg-[#0C0F38] border border-stone-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all group flex flex-col justify-between">
      <div className="relative aspect-16/9 overflow-hidden bg-stone-200">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-[#4D2EAB] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
          {event.category}
        </div>
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[11px] font-black px-3 py-1.5 rounded-xl border border-white/10 text-center">
          <span className="block text-emerald-400 leading-none text-xs">{event.monthDate}</span>
          <span className="text-[9px] font-normal text-stone-300">{event.year}</span>
        </div>
      </div>

      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="font-extrabold text-stone-900 dark:text-white text-base leading-snug">
            {event.title}
          </h3>
          <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed line-clamp-3">
            {event.description}
          </p>
        </div>

        <div className="space-y-2 pt-2 text-xs text-stone-500 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[11px] font-extrabold text-stone-500 dark:text-slate-400">
            {event.rsvpsCount} Attending
          </span>
          <button
            onClick={() => onRsvpSelect(event)}
            className="inline-flex items-center gap-1.5 bg-[#4D2EAB] hover:bg-[#3B2285] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-sm hover:scale-102"
          >
            <span>RSVP Seat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
