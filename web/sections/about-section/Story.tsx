'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Story() {
    return (
        <div id="about-story-section" className="px-6 py-14 md:py-20 md:px-16">
            <h2 className="text-4xl font-bold text-center mb-12 text-black">Our Journey</h2>
            <div className="relative max-w-7xl mx-auto">
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-100 -translate-x-1/2 hidden md:block"></div>
                <div className="space-y-14">
                    <TimelineItem
                        side="left"
                        title="Auto-Mate's Story"
                        text="What started as a small vision to bridge the skills gap has evolved into a powerhouse of automation excellence."
                        imageSrc="/banner1.png"
                    />
                    <TimelineItem
                        side="right"
                        title="Our Purpose"
                        text="To democratize high-end software engineering skills and make automation accessible to every aspiring professional."
                        imageSrc="/banner2.png"
                    />
                </div>
            </div>
        </div>
    );
}

function TimelineItem({ side, title, text, imageSrc }: { side: 'left' | 'right'; title: string; text: string; imageSrc: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`flex flex-col md:flex-row items-center gap-8 ${side === 'right' ? 'md:flex-row-reverse' : ''}`}
        >
            <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#1E90FF] mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed text-base">{text}</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-white border-4 border-blue-500 z-10 flex items-center justify-center shadow-lg shrink-0">
                <div className="w-3.5 h-3.5 rounded-full bg-blue-500"></div>
            </div>
            <div className="flex-1 h-72 bg-gray-100 rounded-[40px] relative overflow-hidden flex items-center justify-center border border-gray-100 shadow-inner">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500"
                />
            </div>
        </motion.div>
    );
}