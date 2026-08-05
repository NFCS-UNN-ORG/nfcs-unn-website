import React from 'react';
import { PhotoItem, VideoItem } from './GalleryGrid';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryModalProps {
  selectedPhotoIndex: number | null;
  setSelectedPhotoIndex: (idx: number | null) => void;
  photos: PhotoItem[];
  selectedVideo: VideoItem | null;
  setSelectedVideo: (v: VideoItem | null) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  selectedPhotoIndex,
  setSelectedPhotoIndex,
  photos,
  selectedVideo,
  setSelectedVideo,
}) => {
  return (
    <>
      {/* Photo Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xs">
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-4 right-4 p-3 text-white hover:bg-white/20 rounded-full z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={() =>
              setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length)
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white hover:bg-white/20 rounded-full z-50"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={() => setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white hover:bg-white/20 rounded-full z-50"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center space-y-4">
            <img
              src={photos[selectedPhotoIndex].image}
              alt={photos[selectedPhotoIndex].title}
              className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl"
            />
            <div className="text-center text-white max-w-xl space-y-1">
              <h3 className="text-lg font-bold">{photos[selectedPhotoIndex].title}</h3>
              <p className="text-xs text-stone-300">{photos[selectedPhotoIndex].caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xs">
          <div className="bg-stone-900 max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 p-2 text-white bg-black/60 hover:bg-black rounded-full z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-16/9 bg-black">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-6 text-white space-y-2">
              <h3 className="text-lg font-extrabold">{selectedVideo.title}</h3>
              <p className="text-xs text-stone-400">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
