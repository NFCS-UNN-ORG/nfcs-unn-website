import React, { useState } from 'react';
import { PageTab } from '../../types';
import { Play, Eye, X, ChevronLeft, ChevronRight, Image as ImageIcon, Video, Calendar, Sparkles } from 'lucide-react';

interface GalleryPageViewProps {
  onNavigate: (tab: PageTab) => void;
}

interface PhotoItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  caption: string;
  spanCol?: string;
}

interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  views: string;
  description: string;
}

export const GalleryPageView: React.FC<GalleryPageViewProps> = ({ onNavigate }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'photos' | 'videos'>('all');

  const photos: PhotoItem[] = [
    {
      id: 'p-1',
      title: 'Grand Sunday Student Mass',
      category: 'Liturgical',
      date: 'Oct 15, 2024',
      image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&q=80&w=1200',
      caption: 'Over 3,000 Catholic students gathered at St. Peter’s Chaplaincy UNN for the official semester opening Mass.',
      spanCol: 'md:col-span-2',
    },
    {
      id: 'p-2',
      title: 'Eucharistic Adoration Night',
      category: 'Spiritual',
      date: 'Nov 02, 2024',
      image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800',
      caption: 'Overnight candlelit prayer session and benediction led by the Chaplaincy Fathers.',
    },
    {
      id: 'p-3',
      title: 'NFCS Cultural Fiesta',
      category: 'Student Life',
      date: 'Dec 08, 2024',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
      caption: 'Celebrating African culture, traditional dances, and Catholic unity across Nigerian regions.',
    },
    {
      id: 'p-4',
      title: 'Rural Community Health Outreach',
      category: 'Outreach',
      date: 'Jan 20, 2025',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200',
      caption: 'Volunteer medical students and doctors providing free health screenings and medications.',
      spanCol: 'md:col-span-2',
    },
    {
      id: 'p-5',
      title: 'Alumni Homecoming & Dinner',
      category: 'Alumni',
      date: 'Feb 14, 2025',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
      caption: 'Reconnecting generations of Catholic graduates of UNN and raising endowment funds.',
    },
    {
      id: 'p-6',
      title: 'Youth Skill Acquisition Bootcamp',
      category: 'Empowerment',
      date: 'Mar 05, 2025',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
      caption: 'Practical training in web development, solar power systems, and baking for undergraduates.',
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
    {
      id: 'v-2',
      title: 'Documentary: 40 Years Of St. Peter’s Chaplaincy',
      category: 'History',
      duration: '12:30',
      thumbnail: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      views: '28.1k views',
      description: 'A deep dive into the founding, growth, and impact of NFCS UNN since 1984.',
    },
    {
      id: 'v-3',
      title: 'Rural Community Medical Outreach Vlog',
      category: 'Outreach',
      duration: '06:45',
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      views: '8.9k views',
      description: 'Behind the scenes with our medical student volunteers treating over 800 villagers.',
    },
    {
      id: 'v-4',
      title: 'Freshers Orientation & Holy Mass Recap',
      category: 'Student Life',
      duration: '05:10',
      thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      views: '15.2k views',
      description: 'Welcoming thousands of newly admitted Catholic students to Lions country.',
    },
    {
      id: 'v-5',
      title: 'Chaplaincy Hostel Construction Progress',
      category: 'Projects',
      duration: '03:50',
      thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      views: '6.7k views',
      description: 'Site inspection update on the ongoing multi-story Catholic student hostel project.',
    },
    {
      id: 'v-6',
      title: 'Lenten Retreat Meditation & Homily',
      category: 'Spiritual',
      duration: '08:20',
      thumbnail: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      views: '19.8k views',
      description: 'Key spiritual takeaways and homily excerpts from our Lenten reflections.',
    },
    {
      id: 'v-7',
      title: 'Alumni Keynote Speech: Ethics In Leadership',
      category: 'Alumni',
      duration: '14:00',
      thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      views: '9.4k views',
      description: 'Inspiring session delivered by prominent Catholic alumni at the university auditorium.',
    },
    {
      id: 'v-8',
      title: 'Sports Week Finals: Faculty Tournament',
      category: 'Sports',
      duration: '04:55',
      thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      views: '11.3k views',
      description: 'High energy sports action as Catholic student faculties compete for the Chaplain’s Cup.',
    },
    {
      id: 'v-9',
      title: 'Cathedral Choir Christmas Carol Performance',
      category: 'Liturgical',
      duration: '07:30',
      thumbnail: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      views: '22.5k views',
      description: 'Joyous Christmas carol concert by our student choir and brass band.',
    },
  ];

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Hero Banner matching Image 4 */}
      <section className="relative bg-emerald-950 text-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-8 right-[-35px] rotate-45 bg-emerald-400 text-emerald-950 font-extrabold text-[10px] sm:text-xs py-1 px-10 shadow-md tracking-wider uppercase z-10">
          EMPOWERING LIVES, BUILDING FUTURE
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs font-bold tracking-wider uppercase">
            <span>GALLERY & MEDIA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Explore Our Impact <span className="text-emerald-400">Through Photos And Videos</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-emerald-100/90 font-normal leading-relaxed">
            Visual highlights of holy sacraments, student fellowships, cultural celebrations, medical missions, and alumni events at UNN.
          </p>
        </div>
      </section>

      {/* Section 1: Photo Gallery matching Image 4 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
              OUR ACTIVITY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
              Capturing Moments Of Change And Impact
            </h2>
          </div>
        </div>

        {/* Asymmetric Photo Grid (Image 4 Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer border border-stone-200 shadow-sm hover:shadow-xl transition-all h-80 ${photo.spanCol || ''}`}
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity"></div>

              <div className="absolute top-4 left-4 bg-emerald-700/90 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full">
                {photo.category}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{photo.date}</span>
                </div>
                <h3 className="text-lg font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-2 font-normal">
                  {photo.caption}
                </p>
              </div>

              <div className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Video Gallery matching Image 4 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-stone-200">
        <div className="mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            VIDEO GALLERY
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
            See Our Work In Action Through Videos
          </h2>
        </div>

        {/* 3x3 Video Grid matching Image 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-stone-900">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-stone-950/30 group-hover:bg-stone-950/20 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-stone-950/80 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                    {video.duration}
                  </div>

                  <div className="absolute top-3 left-3 bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {video.category}
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <div className="text-xs text-stone-400 font-semibold">{video.views}</div>
                  <h3 className="text-base font-extrabold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="w-full py-2.5 bg-emerald-50 group-hover:bg-emerald-700 text-emerald-800 group-hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Watch Video Now
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-6 right-6 p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={() => setSelectedPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : (prev as number) - 1))}
            className="absolute left-6 p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => setSelectedPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : (prev as number) + 1))}
            className="absolute right-6 p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl space-y-4 p-4 sm:p-6">
            <div className="relative h-[55vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={photos[selectedPhotoIndex].image}
                alt={photos[selectedPhotoIndex].title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="text-white space-y-1 px-2">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                <span>{photos[selectedPhotoIndex].category}</span>
                <span>•</span>
                <span>{photos[selectedPhotoIndex].date}</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">{photos[selectedPhotoIndex].title}</h3>
              <p className="text-sm text-stone-300">{photos[selectedPhotoIndex].caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between text-white">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase">{selectedVideo.category}</span>
                <h3 className="text-lg font-extrabold">{selectedVideo.title}</h3>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2 text-stone-400 hover:text-white bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img src={selectedVideo.thumbnail} alt={selectedVideo.title} className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-3 p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center shadow-xl animate-pulse">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <p className="text-sm font-semibold max-w-md">Playing: {selectedVideo.title}</p>
                <span className="text-xs text-stone-300 bg-stone-950/80 px-3 py-1 rounded-full">Duration: {selectedVideo.duration} • {selectedVideo.views}</span>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">{selectedVideo.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
