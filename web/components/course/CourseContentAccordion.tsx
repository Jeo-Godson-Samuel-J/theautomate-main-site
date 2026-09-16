"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, PlayCircle, MonitorPlay } from "lucide-react";
import { CurriculumModule } from "@/lib/types/course";
import { CourseModule } from "@/lib/services/module.service";

interface CourseContentAccordionProps {
  curriculum: CurriculumModule[];
  modules: CourseModule[];
}

export default function CourseContentAccordion({ curriculum, modules }: CourseContentAccordionProps) {
  // Group modules based on curriculum points
  const sections: { title: string; lectures: CourseModule[] }[] = [];
  
  let moduleIndex = 0;
  
  if (curriculum && curriculum.length > 0) {
    curriculum.forEach((section) => {
      const sectionLectures: CourseModule[] = [];
      const numPoints = section.points ? section.points.length : 0;
      
      for (let i = 0; i < Math.max(1, numPoints); i++) {
        if (moduleIndex < modules.length) {
          sectionLectures.push(modules[moduleIndex]);
          moduleIndex++;
        }
      }
      
      if (sectionLectures.length > 0) {
        sections.push({
          title: section.subheading,
          lectures: sectionLectures,
        });
      }
    });
  }
  
  // If there are remaining modules or no curriculum, put them in a final section
  if (moduleIndex < modules.length) {
    const remaining = modules.slice(moduleIndex);
    sections.push({
      title: curriculum && curriculum.length > 0 ? "Additional Modules" : "Course Modules",
      lectures: remaining,
    });
  }

  const [expandedSections, setExpandedSections] = useState<number[]>([0]); // Expand first by default

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => 
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const expandAll = () => {
    if (expandedSections.length === sections.length) {
      setExpandedSections([]);
    } else {
      setExpandedSections(sections.map((_, i) => i));
    }
  };

  // Keep track of overall lecture index for the "first 5 videos" preview logic
  let globalLectureIndex = 0;

  const totalLength = modules.reduce((acc, mod) => {
    if (!mod.duration) return acc;
    const parts = mod.duration.split(':').map(Number);
    if (parts.length === 3) return acc + parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return acc + parts[0] * 60 + parts[1];
    return acc;
  }, 0);
  
  const formatTotalTime = (seconds: number) => {
    if (seconds === 0) return "";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m total length`;
    return `${m}m total length`;
  };

  const totalTimeStr = formatTotalTime(totalLength);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <div className="text-sm font-semibold text-slate-700">
          {sections.length} section{sections.length !== 1 ? 's' : ''} • {modules.length} lecture{modules.length !== 1 ? 's' : ''} {totalTimeStr ? `• ${totalTimeStr}` : ''}
        </div>
        <button 
          onClick={expandAll}
          className="text-brand-blue font-bold text-sm hover:text-brand-dark transition-colors mt-2 sm:mt-0"
        >
          {expandedSections.length === sections.length ? "Collapse all sections" : "Expand all sections"}
        </button>
      </div>

      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
        {sections.map((section, secIndex) => {
          const isExpanded = expandedSections.includes(secIndex);
          const sectionDurationSeconds = section.lectures.reduce((acc, mod) => {
            if (!mod.duration) return acc;
            const parts = mod.duration.split(':').map(Number);
            if (parts.length === 3) return acc + parts[0] * 3600 + parts[1] * 60 + parts[2];
            if (parts.length === 2) return acc + parts[0] * 60 + parts[1];
            return acc;
          }, 0);
          const secMins = Math.ceil(sectionDurationSeconds / 60);
          
          return (
            <div key={secIndex} className={`border-b border-slate-200 last:border-b-0`}>
              {/* Section Header */}
              <button
                onClick={() => toggleSection(secIndex)}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                  )}
                  <h3 className="font-bold text-slate-900 text-[15px]">{section.title}</h3>
                </div>
                <div className="text-sm text-slate-500 hidden sm:block shrink-0">
                  {section.lectures.length} lecture{section.lectures.length !== 1 ? 's' : ''} {secMins > 0 ? `• ${secMins}min` : ''}
                </div>
              </button>

              {/* Lectures List */}
              {isExpanded && (
                <div className="bg-white">
                  {section.lectures.map((lecture, lecIndex) => {
                    const isPreview = globalLectureIndex < 5;
                    globalLectureIndex++;
                    
                    return (
                      <div 
                        key={lecture.id}
                        className={`flex items-start sm:items-center justify-between p-3 px-4 ${lecIndex !== 0 ? 'border-t border-slate-100' : ''} hover:bg-slate-50 transition-colors`}
                      >
                        <div className="flex items-start sm:items-center gap-3 max-w-[70%]">
                          {isPreview ? (
                            <PlayCircle className="w-4 h-4 text-brand-blue shrink-0 mt-0.5 sm:mt-0" />
                          ) : (
                            <MonitorPlay className="w-4 h-4 text-slate-400 shrink-0 mt-0.5 sm:mt-0" />
                          )}
                          <span className={`text-sm ${isPreview ? 'text-brand-blue' : 'text-slate-700'}`}>
                            {lecture.title}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs shrink-0 items-end">
                          {isPreview && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.dispatchEvent(
                                  new CustomEvent("open-preview", {
                                    detail: { index: globalLectureIndex - 1 },
                                  })
                                );
                              }}
                              className="flex items-center gap-1 text-brand-blue font-bold cursor-pointer hover:text-brand-dark transition-colors"
                            >
                              <PlayCircle className="w-3.5 h-3.5 fill-brand-blue text-white" /> Preview
                            </button>
                          )}
                          {lecture.duration && (
                            <span className="text-slate-500 text-right">
                              {lecture.duration}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
