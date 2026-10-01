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
  sectionTitle?: string;
}

interface SampleVideoPreviewProps {
  courseTitle: string;
  videos: PreviewVideo[];
  featuredVideo: PreviewVideo;
}

function getPosterUrl(video?: PreviewVideo): string | undefined {
  if (!video) return undefined;
  if (video.poster) return video.poster;
  if (video.cloudflareId) {
    return `https://videodelivery.net/${video.cloudflareId}/thumbnails/thumbnail.jpg`;
  }
  return undefined;
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
    const handleOpenPreview = (event: CustomEvent<{ index?: number; videoId?: string }>) => {
      const videoId = event.detail?.videoId;
      const idx = event.detail?.index;

      if (videoId) {
        const vid = videos.find((v) => v.key === videoId);
        if (vid && !vid.isLocked) {
          setSelectedVideo(vid);
          setIsOpen(true);
          return;
        }
      }

      if (typeof idx === "number" && idx >= 0 && idx < videos.length) {
        const vid = videos[idx];
        if (!vid.isLocked) {
          setSelectedVideo(vid);
          setIsOpen(true);
          return;
        }
      }

      if (featuredVideo) {
        setSelectedVideo(featuredVideo);
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

  const featuredPosterUrl = getPosterUrl(featuredVideo);

  return (
    <>
      <button
        type="button"
        onClick={openPreview}
        aria-label={`Preview ${courseTitle}`}
        className="group block w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-lg"
      >
        <div className="relative aspect-video overflow-hidden bg-slate-950">
          {featuredPosterUrl ? (
            <img
              src={featuredPosterUrl}
              alt={featuredVideo.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : null}
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${courseTitle} course preview`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <div className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white border border-slate-200 text-slate-900 shadow-2xl flex flex-col">
            {/* Top Brand Accent Line */}
            <div className="h-1 w-full bg-gradient-to-r from-brand-blue via-brand-sky to-brand-dark" />

            {/* Header */}
            <div className="flex items-center justify-between gap-5 px-5 py-3.5 md:px-6 shrink-0 bg-white border-b border-slate-200">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-brand-blue uppercase tracking-wider">
                  Course Preview
                </p>
                <h2 className="mt-0.5 truncate text-base font-bold md:text-lg text-black">
                  {courseTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close course preview"
                className="shrink-0 rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-100">
              <div className="w-full bg-slate-950 aspect-video relative">
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
                    poster={getPosterUrl(selectedVideo)}
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

              <div className="px-5 pb-3 pt-5 md:px-6 shrink-0 bg-white border-b border-slate-200">
                <h3 className="text-base font-bold text-black">Course Modules</h3>
                <p className="text-xs text-brand-blue mt-0.5 font-medium">First 5 videos are free to preview</p>
              </div>

              <div className="relative bg-slate-100 p-3 md:p-4 space-y-2.5">
                {videos.map((video, idx) => {
                  const isSelected = video.key === selectedVideo.key;
                  const showSectionHeader = video.sectionTitle && (idx === 0 || video.sectionTitle !== videos[idx - 1].sectionTitle);
                  const posterUrl = getPosterUrl(video);

                  return (
                    <div key={`container-${video.key}`}>
                      {showSectionHeader && (
                        <div className="bg-slate-200/90 px-4 py-2 rounded-lg sticky top-0 z-10 shadow-sm mb-2">
                          <h4 className="text-sm font-bold text-slate-900">{video.sectionTitle}</h4>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handleVideoSelect(video)}
                        className={`group flex w-full items-center gap-4 p-3.5 text-left rounded-xl transition-all border ${
                          isSelected
                            ? "bg-white border-2 border-brand-blue shadow-md ring-2 ring-brand-blue/20"
                            : video.isLocked
                            ? "bg-white/80 border-slate-200 text-slate-500 hover:bg-white hover:border-slate-300"
                            : "bg-white border-slate-200 text-slate-900 shadow-sm hover:border-brand-blue/50 hover:shadow-md"
                        }`}
                      >
                        <div className="relative shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-900 w-28 h-16 sm:w-32 sm:h-20 flex items-center justify-center">
                          {posterUrl ? (
                            <img
                              src={posterUrl}
                              alt={video.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : null}
                          {!posterUrl && !video.isLocked && (
                            <Play className="h-6 w-6 text-brand-blue fill-brand-blue" />
                          )}
                          {!video.isLocked && (
                            <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${isSelected ? "bg-brand-blue/30" : "bg-black/35 group-hover:bg-black/20"}`}>
                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-brand-blue shadow-md transition-transform group-hover:scale-110">
                                <Play className="ml-0.5 h-4 w-4 fill-current" />
                              </span>
                            </div>
                          )}
                          {video.isLocked && (
                            <div className="absolute inset-0 bg-slate-950/65 flex items-center justify-center backdrop-blur-[2px]">
                              <Lock className="h-5 w-5 text-white/90" />
                            </div>
                          )}
                          {video.duration && (
                            <div className="absolute bottom-1 right-1 bg-black/80 backdrop-blur-xs px-1.5 py-0.5 rounded text-[10px] font-medium tracking-wide text-white z-10">
                              {video.duration}
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-bold text-sm md:text-base ${isSelected ? "text-brand-blue" : "text-black"}`}>
                              {video.title}
                            </span>
                            {video.isLocked && (
                              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium border border-slate-200">
                                Locked
                              </span>
                            )}
                          </div>
                          {video.description && (
                            <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                              {video.description}
                            </p>
                          )}
                          {video.isLocked && (
                            <p className="mt-2 text-xs text-brand-blue font-semibold hover:underline transition-colors">
                              Unlock now to view →
                            </p>
                          )}
                        </div>
                        {isSelected && !video.isLocked && (
                          <div className="flex h-full items-center self-center shrink-0">
                            <Play className="h-6 w-6 fill-brand-blue text-brand-blue" />
                          </div>
                        )}
                      </button>
                    </div>
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
