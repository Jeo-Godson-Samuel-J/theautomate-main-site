'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { CASE_STUDIES } from '@/constants/caseStudies';
import { CaseStudyCard } from '@/components/case-study/CaseStudyCard';
import { CarouselDots } from '@/components/carousel/CarouselDots';

const CAROUSEL_OPTIONS = {
  align: 'start' as const,
  loop: false,
  containScroll: 'trimSnaps' as const,
  watchDrag: true,
};

const CaseStudyCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(CAROUSEL_OPTIONS);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y" ref={emblaRef}>
      <div className="flex -ml-4 md:-ml-8">
        {CASE_STUDIES.map((caseStudy) => (
          <div
            key={caseStudy.slug}
            className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4 md:pl-8"
          >
            <CaseStudyCard caseStudy={caseStudy} />
          </div>
        ))}
      </div>
      
      <CarouselDots
        count={scrollSnaps.length}
        selectedIndex={selectedIndex}
        onDotClick={scrollTo}
      />
    </div>
  );
};

export default function CaseStudies() {
  return (
    <section className="py-8 md:py-20 bg-white overflow-hidden">
      <div className="px-6 md:px-16 lg:px-24 mx-auto">
        <h2 className="text-5xl font-bold text-center mb-12 md:mb-20 text-[#1B262C]">
          Case Studies
        </h2>
        <CaseStudyCarousel />
      </div>
    </section>
  );
}