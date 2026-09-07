"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";

interface PreviewVideo {
  key: string;
  title: string;
  url: string;
  mimeType?: string;
  poster?: string;
}

interface SampleVideoPreviewProps {
  courseTitle: string;
  videos: PreviewVideo[];
  featuredVideo: PreviewVideo;
}

export default function SampleVideoPreview({
  courseTitle,
  videos,
  featuredVideo,
}: SampleVideoPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(featuredVideo);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const openPreview = () => {
    setSelectedVideo(featuredVideo);
    setIsOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={openPreview}
        aria-label={`Preview ${courseTitle}`}
        className="group block w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-lg"
      >
        <div
          className="relative aspect-video overflow-hidden bg-slate-950"
          style={
            featuredVideo.poster
              ? {
                  backgroundImage: `url(${featuredVideo.poster})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }
              : undefined
          }
        >
          <div className="absolute inset-0 bg-slate-950/45 transition-colors group-hover:bg-slate-950/55" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#0A3D62] shadow-xl transition-transform group-hover:scale-105">
              <Play className="ml-1 h-7 w-7 fill-current" />
            </span>
          </span>
          <span className="absolute bottom-4 left-0 right-0 text-center text-sm font-semibold text-white drop-shadow-md">
            Preview this course
          </span>
        </div>

        <div className="border-t border-slate-100 px-5 py-4">
          <p className="text-sm font-bold text-slate-900">
            {featuredVideo.title}
          </p>
          <p className="mt-1 text-xs text-slate-500">Free course preview</p>
        </div>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${courseTitle} course preview`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <div className="max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-[#11131c] text-white shadow-2xl">
            <div className="flex items-start justify-between gap-5 px-5 py-4 md:px-6">
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400">
                  Course Preview
                </p>
                <h2 className="mt-1 truncate text-base font-semibold md:text-lg">
                  {courseTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close course preview"
                className="shrink-0 rounded-full p-1 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[calc(92vh-76px)] overflow-y-auto">
              <video
                key={selectedVideo.key}
                controls
                autoPlay
                playsInline
                preload="metadata"
                poster={selectedVideo.poster}
                className="aspect-video w-full bg-black object-cover"
              >
                <source src={selectedVideo.url} type={selectedVideo.mimeType} />
                Your browser does not support video playback.
              </video>

              <div className="px-5 pb-3 pt-4 md:px-6">
                <h3 className="text-sm font-bold">Free Sample Videos:</h3>
              </div>

              <div className="border-t border-white/15">
                {videos.map((video) => {
                  const isSelected = video.key === selectedVideo.key;

                  return (
                    <button
                      key={video.key}
                      type="button"
                      onClick={() => setSelectedVideo(video)}
                      className={`flex w-full items-center gap-3 border-b border-white/15 px-5 py-3 text-left transition-colors md:px-6 ${
                        isSelected ? "bg-[#292b43]" : "hover:bg-white/5"
                      }`}
                    >
                      <span
                        className="flex h-12 w-20 shrink-0 items-center justify-center overflow-hidden bg-slate-800 bg-cover bg-center"
                        style={
                          video.poster
                            ? { backgroundImage: `url(${video.poster})` }
                            : undefined
                        }
                      >
                        {!video.poster && <Play className="h-4 w-4" />}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-200">
                        {video.title}
                      </span>
                      {isSelected && (
                        <Play className="h-4 w-4 shrink-0 fill-current" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
