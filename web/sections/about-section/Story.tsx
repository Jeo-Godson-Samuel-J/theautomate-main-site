'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function Story() {
    return (
        <div className="p-16 md:p-24">
            <h2 className="text-4xl font-bold text-center mb-20 text-[#1B262C]">Our Journey</h2>
            <div className="relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-100 -translate-x-1/2 hidden md:block"></div>
                <div className="space-y-24">
                    <TimelineItem
                        side="left"
                        title="Auto-Mate's Story"
                        text="What started as a small vision to bridge the skills gap has evolved into a powerhouse of automation excellence."
                    />
                    <TimelineItem
                        side="right"
                        title="Our Purpose"
                        text="To democratize high-end software engineering skills and make automation accessible to every aspiring professional."
                    />
                </div>
            </div>
        </div>
    );
}

function TimelineItem({ side, title, text }: { side: 'left' | 'right'; title: string; text: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`flex flex-col md:flex-row items-center gap-12 ${side === 'right' ? 'md:flex-row-reverse' : ''}`}
        >
            <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold text-[#1E90FF] mb-4">{title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{text}</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white border-4 border-blue-500 z-10 flex items-center justify-center shadow-lg shrink-0">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            </div>
            <div className="flex-1 h-64 bg-gray-100 rounded-[40px] relative overflow-hidden flex items-center justify-center">
                <span className="text-gray-400 italic">Visual History Asset</span>
            </div>
        </motion.div>
    );
}