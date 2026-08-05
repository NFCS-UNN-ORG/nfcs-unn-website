import React, { useState } from 'react';
import { PageTab } from '../../types';
import { Sparkles } from 'lucide-react';
import { NewsletterBanner } from '../NewsletterBanner';
import { GalleryGrid, PhotoItem, VideoItem } from '../gallery/GalleryGrid';
import { GalleryModal } from '../gallery/GalleryModal';

interface GalleryPageViewProps {
  onNavigate: (tab: PageTab) => void;
}

export const GalleryPageView: React.FC<GalleryPageViewProps> = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'photos' | 'videos'>('all');

  const photos: PhotoItem[] = [
    {
      id: 'p-1',
      title: 'Grand Sunday Student Mass',
      category: 'Liturgical',
      date: 'Oct 15, 2025',
      image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&q=80&w=1200',
      caption: 'Over 3,000 Catholic students gathered at St. Peter’s Chaplaincy UNN for the official semester opening Mass.',
      spanCol: 'md:col-span-2',
    },
    {
      id: 'p-2',
      title: 'Eucharistic Adoration Night',
      category: 'Spiritual',
      date: 'Nov 02, 2025',
      image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800',
      caption: 'Overnight candlelit prayer session and benediction led by the Chaplaincy Fathers.',
    },
    {
      id: 'p-3',
      title: 'NFCS Cultural Fiesta',
      category: 'Student Life',
      date: 'Dec 08, 2025',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
      caption: 'Celebrating African culture, traditional dances, and Catholic unity across Nigerian regions.',
    },
    {
      id: 'p-4',
      title: 'Rural Community Health Outreach',
      category: 'Outreach',
      date: 'Jan 20, 2026',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200',
      caption: 'Volunteer medical students and doctors providing free health screenings and medications.',
      spanCol: 'md:col-span-2',
    },
    {
      id: 'p-5',
      title: 'Alumni Homecoming & Dinner',
      category: 'Alumni',
      date: 'Feb 14, 2026',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
      caption: 'Reconnecting generations of Catholic graduates of UNN and raising endowment funds.',
    },
  ];

  const videos: VideoItem[] = [
    {
      id: 'v-1',
      title: 'NFCS UNN Choir Easter Concert Highlights',
      category: 'Liturgical Choir',
      duration: '04:15',
      thumbnail: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      views: '12.4k views',
      description: 'Watch the breathtaking orchestral performance by the St. Peter’s Choir at the annual Easter Concert.',
    },
  ];

  return (
    <div className="bg-stone-50 dark:bg-[#080A26] min-h-screen py-8 sm:py-14 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Banner */}
        <div className="relative bg-gradient-to-b from-stone-100 to-white dark:from-slate-900 dark:to-[#080A26] rounded-3xl p-8 sm:p-14 border border-stone-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-300 px-3.5 py-1 rounded-full text-xs font-bold border border-purple-200 dark:border-purple-800">
              <Sparkles className="w-3.5 h-3.5 text-purple-700 dark:text-purple-400" />
              <span>Media & Memories Gallery</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-[1.15]">
              Capturing Faith, Fellowship & Life At St. Peter's
            </h1>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setActiveTabFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTabFilter === 'all'
                    ? 'bg-[#4D2EAB] text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-700 dark:text-slate-300'
                }`}
              >
                All Media
              </button>
              <button
                onClick={() => setActiveTabFilter('photos')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTabFilter === 'photos'
                    ? 'bg-[#4D2EAB] text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-700 dark:text-slate-300'
                }`}
              >
                Photos Only
              </button>
              <button
                onClick={() => setActiveTabFilter('videos')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTabFilter === 'videos'
                    ? 'bg-[#4D2EAB] text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-700 dark:text-slate-300'
                }`}
              >
                Videos Only
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <GalleryGrid
          photos={photos}
          videos={videos}
          activeTabFilter={activeTabFilter}
          onPhotoSelect={setSelectedPhotoIndex}
          onVideoSelect={setSelectedVideo}
        />

        {/* Lightbox / Video Modal */}
        <GalleryModal
          selectedPhotoIndex={selectedPhotoIndex}
          setSelectedPhotoIndex={setSelectedPhotoIndex}
          photos={photos}
          selectedVideo={selectedVideo}
          setSelectedVideo={setSelectedVideo}
        />
      </div>

      <NewsletterBanner />
    </div>
  );
};
