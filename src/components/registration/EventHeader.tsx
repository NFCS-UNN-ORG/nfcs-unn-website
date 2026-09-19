import React from 'react';
import { ChevronLeft, MapPin, Calendar } from 'lucide-react';

interface EventHeaderProps {
  title?: string;
  dateChip?: { month: string; day: string };
  dateText?: string;
  timeText?: string;
  locationTitle?: string;
  locationDetails?: string;
  showBreadcrumb?: boolean;
  breadcrumbLabel?: string;
  onBreadcrumbClick?: () => void;
}

export const EventHeader: React.FC<EventHeaderProps> = React.memo(({
  title = 'NFCS UNN Federation Week 2026 Raffle Draw',
  dateChip = { month: 'SEP', day: '27' },
  dateText = 'Sunday, 27th September 2026',
  timeText = '1:00 PM • Live on Campus Stage',
  locationTitle = "St. Peter's Catholic Chaplaincy, UNN",
  locationDetails = 'Main Auditorium Stage, University of Nigeria, Nsukka Campus',
  showBreadcrumb = false,
  breadcrumbLabel = '‹ All registration paths',
  onBreadcrumbClick,
}) => {
  return (
    <header className="flex flex-col gap-6 select-none">
      {/* Optional Breadcrumb */}
      {showBreadcrumb && (
        <button
          type="button"
          onClick={onBreadcrumbClick}
          className="inline-flex items-center gap-1 text-xs font-semibold text-white/50 hover:text-white hover:underline transition-colors w-fit cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{breadcrumbLabel}</span>
        </button>
      )}

      {/* Main Headline */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl lg:text-[3.1rem] font-black leading-[1.08] tracking-tight text-white">
          {title}
        </h1>
      </div>

      {/* Metadata Tiles (Date/Time and Location) */}
      <div className="flex flex-col gap-3.5 pt-1">
        {/* Date / Time Row */}
        <div className="flex items-center gap-4">
          <div
            className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/[0.06] ring-1 ring-white/10 flex-col gap-0 select-none shadow-sm"
            aria-hidden="true"
          >
            <span className="text-[10px] font-extrabold uppercase leading-none tracking-widest text-[#FBE202]">
              {dateChip.month}
            </span>
            <span className="text-lg font-black leading-tight text-white">
              {dateChip.day}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm sm:text-base font-semibold text-white truncate">
              {dateText}
            </p>
            <p className="text-xs text-white/60 truncate">{timeText}</p>
          </div>
        </div>

        {/* Location Row */}
        <div className="flex items-start gap-4">
          <div
            className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/[0.06] ring-1 ring-white/10 text-white shadow-sm"
            aria-hidden="true"
          >
            <MapPin className="size-5 text-[#FBE202]" />
          </div>
          <div className="min-w-0 self-center">
            <p className="text-sm sm:text-base font-semibold text-white leading-snug">
              {locationTitle}
            </p>
            <p className="text-xs text-white/60 leading-normal">{locationDetails}</p>
          </div>
        </div>
      </div>
    </header>
  );
});

export default EventHeader;
