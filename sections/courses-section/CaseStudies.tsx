'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';

const cases = [
    {
        slug: "inventory-control",
        title: "Streamlining Inventory Control for an E-commerce Business",
        image: "/courses-banner/inventory.jpg"
    },
    {
        slug: "unified-framework",
        title: "Unified Automation Framework for a Leading US-Based Restaurant",
        image: "/courses-banner/automation.jpg"
    },
    {
        slug: "efficiency-insurance",
        title: "Enhancing Automation Efficiency for a Digital Insurance Application",
        image: "/courses-banner/e-commerce.jpg"
    },
];

export default function CaseStudies() {
    // 1. Embla Config: 'touchAction: "pan-y"' is CRITICAL for mobile scrolling
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        loop: false,
        containScroll: 'trimSnaps',
        watchDrag: true // Explicitly watch for touch/mouse drag
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <section className="py-8 md:py-20 bg-white overflow-hidden">
            <div className="px-6 md:px-16 lg:px-24 mx-auto">

                <h2 className="text-5xl md:text-5xl font-bold text-center mb-12 md:mb-20 text-[#1B262C]">
                    Case Studies
                </h2>

                {/* 2. Added 'touch-pan-y': This allows the browser to handle vertical page scrolling 
                       while Embla handles the horizontal swipe. */}
                <div
                    className="overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
                    ref={emblaRef}
                >
                    <div className="flex -ml-4 md:-ml-8">
                        {cases.map((item, i) => (
                            <div
                                key={i}
                                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4 md:pl-8"
                            >
                                <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-gray-100 shadow-xl border border-gray-100">

                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* 3. Mobile Logic: On mobile (hover:none), we make the overlay 
                                           slightly visible by default or let it appear on tap. */}
                                    <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 
                                        bg-black/40 md:bg-black/0 
                                        transition-all duration-500 
                                        group-hover:bg-black/70">

                                        <div className="md:translate-y-8 md:opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                            <h3 className="text-xl font-bold text-white mb-6 leading-tight">
                                                {item.title}
                                            </h3>

                                            <Link
                                                href={`/case-studies/${item.slug}`}
                                                className="inline-flex items-center justify-center bg-white text-[#163E72] px-10 py-3.5 rounded-full font-bold text-sm"
                                            >
                                                Learn More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {scrollSnaps.length > 0 && (
                    <div className="flex justify-center items-center gap-3 mt-12">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollTo(index)}
                                className={`h-2.5 rounded-full transition-all duration-500 ${index === selectedIndex
                                    ? "w-10 bg-[#163E72]"
                                    : "w-2.5 bg-gray-200"
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}