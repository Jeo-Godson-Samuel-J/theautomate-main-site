"use client";

import { useEffect, useState } from "react";
import { Play, X, Lock } from "lucide-react";
import Link from "next/link";

interface PreviewVideo {
  key: string;
  title: string;
  url?: string;
  mimeType?: string;
  poster?: string;
  description?: string;
  duration?: string;
  isLocked?: boolean;
  cloudflareId?: string;
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

  useEffect(() => {
    const handleOpenPreview = (event: CustomEvent<{ index: number }>) => {
      const idx = event.detail?.index ?? 0;
      if (idx === 0) {
        setSelectedVideo(featuredVideo);
      } else if (idx > 0 && idx <= videos.length) {
        const vid = videos[idx - 1];
        if (!vid.isLocked) {
          setSelectedVideo(vid);
        }
      }
      setIsOpen(true);
    };

    window.addEventListener("open-preview", handleOpenPreview as EventListener);
    return () => {
      window.removeEventListener("open-preview", handleOpenPreview as EventListener);
    };
  }, [featuredVideo, videos]);

  const openPreview = () => {
    setSelectedVideo(featuredVideo);
    setIsOpen(true);
  };

  const handleVideoSelect = (video: PreviewVideo) => {
    if (video.isLocked) {
      setIsOpen(false);
      // Navigate to the plans page for this course
      window.location.href = `${window.location.pathname}/plans`;
    } else {
      setSelectedVideo(video);
    }
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
          <div className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-[#11131c] text-white shadow-2xl flex flex-col">
            <div className="flex items-start justify-between gap-5 px-5 py-4 md:px-6 shrink-0">
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

            <div className="flex-1 overflow-y-auto">
              <div className="w-full bg-black aspect-video relative">
                {selectedVideo.cloudflareId ? (
                  <iframe
                    src={`https://iframe.videodelivery.net/${selectedVideo.cloudflareId}?autoplay=true`}
                    className="border-0 w-full h-full absolute inset-0"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                    allowFullScreen
                  />
                ) : selectedVideo.url ? (
                  <video
                    key={selectedVideo.key}
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                    poster={selectedVideo.poster}
                    className="w-full h-full absolute inset-0 object-cover"
                  >
                    <source src={selectedVideo.url} type={selectedVideo.mimeType} />
                    Your browser does not support video playback.
                  </video>
                ) : (
                  <div className="w-full h-full absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                    Video unavailable
                  </div>
                )}
              </div>

              <div className="px-5 pb-3 pt-6 md:px-6 shrink-0">
                <h3 className="text-lg font-bold">Course Modules</h3>
                <p className="text-sm text-slate-400 mt-1">First 5 modules are free to preview</p>
              </div>

              <div className="border-t border-white/15">
                {videos.map((video) => {
                  const isSelected = video.key === selectedVideo.key;

                  return (
                    <button
                      key={video.key}
                      type="button"
                      onClick={() => handleVideoSelect(video)}
                      className={`flex w-full items-start gap-4 border-b border-white/15 px-5 py-4 text-left transition-colors md:px-6 ${
                        isSelected ? "bg-[#292b43]" : "hover:bg-white/5"
                      }`}
                    >
                      <div className="relative shrink-0">
                        <span
                          className="flex h-16 w-28 items-center justify-center overflow-hidden rounded bg-slate-800 bg-cover bg-center"
                          style={
                            video.poster
                              ? { backgroundImage: `url(${video.poster})` }
                              : undefined
                          }
                        >
                          {!video.poster && !video.isLocked && <Play className="h-6 w-6" />}
                        </span>
                        {video.isLocked && (
                          <div className="absolute inset-0 bg-black/60 rounded flex items-center justify-center backdrop-blur-[1px]">
                            <Lock className="h-5 w-5 text-white/90" />
                          </div>
                        )}
                        {video.duration && (
                          <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-medium tracking-wide">
                            {video.duration}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-200">
                            {video.title}
                          </span>
                          {video.isLocked && (
                            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-medium">
                              Locked
                            </span>
                          )}
                        </div>
                        {video.description && (
                          <p className="mt-1 text-sm text-slate-400 line-clamp-2">
                            {video.description}
                          </p>
                        )}
                        {video.isLocked && (
                          <p className="mt-2 text-xs text-blue-400 font-medium hover:text-blue-300">
                            Unlock now to view →
                          </p>
                        )}
                      </div>
                      {isSelected && !video.isLocked && (
                        <div className="flex h-full items-center">
                          <Play className="h-5 w-5 shrink-0 fill-current text-white/80" />
                        </div>
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
