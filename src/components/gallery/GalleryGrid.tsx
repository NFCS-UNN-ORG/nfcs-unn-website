import React from 'react';
import { Play, Eye, Calendar } from 'lucide-react';

export interface PhotoItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  caption: string;
  spanCol?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  views: string;
  description: string;
}

interface GalleryGridProps {
  photos: PhotoItem[];
  videos: VideoItem[];
  activeTabFilter: 'all' | 'photos' | 'videos';
  onPhotoSelect: (index: number) => void;
  onVideoSelect: (video: VideoItem) => void;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  photos,
  videos,
  activeTabFilter,
  onPhotoSelect,
  onVideoSelect,
}) => {
  return (
    <div className="space-y-12">
      {/* Photos Section */}
      {(activeTabFilter === 'all' || activeTabFilter === 'photos') && (
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Photo Albums & Event Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {photos.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => onPhotoSelect(idx)}
                className={`relative rounded-3xl overflow-hidden bg-stone-200 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-md group cursor-pointer aspect-4/3 ${
                  p.spanCol || ''
                }`}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-extrabold uppercase bg-[#4D2EAB] text-white px-2.5 py-0.5 rounded-full w-fit mb-1">
                    {p.category}
                  </span>
                  <h3 className="text-base font-extrabold">{p.title}</h3>
                  <p className="text-xs text-stone-300 line-clamp-1 mt-0.5">{p.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videos Section */}
      {(activeTabFilter === 'all' || activeTabFilter === 'videos') && (
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Featured Video Broadcasts & Documentaries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((v) => (
              <div
                key={v.id}
                onClick={() => onVideoSelect(v)}
                className="bg-white dark:bg-[#0C0F38] border border-stone-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer"
              >
                <div className="relative aspect-16/9 overflow-hidden bg-stone-200">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 text-[#4D2EAB] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-[#4D2EAB] ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                    {v.duration}
                  </span>
                </div>
                <div className="p-5 space-y-1">
                  <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase">
                    {v.category}
                  </span>
                  <h3 className="font-extrabold text-stone-900 dark:text-white text-base leading-snug">
                    {v.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-slate-400 line-clamp-2">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
