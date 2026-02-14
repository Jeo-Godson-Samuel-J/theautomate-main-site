'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Settings, BookOpen, Users, GraduationCap } from 'lucide-react';
import Image from 'next/image';

const stats = [
    {
        label: 'Automation Completed',
        value: 10,
        suffix: 'K+',
        icon: <Image src="/icons/autocomplete.png" alt="" width={60} height={60} />,
        description: 'Frameworks deployed'
    },
    {
        label: 'Industrial Courses',
        value: 20,
        suffix: '',
        icon: <Image src="/icons/courses.png" alt="" width={50} height={50} />,
        description: 'Expert-led curriculum'
    },
    {
        label: 'Skilled Experts',
        value: 10,
        suffix: '',
        icon: <Image src="/icons/expert.png" alt="" width={50} height={50} />,
        description: 'Industry veterans'
    },
    {
        label: 'Happy Students',
        value: 5,
        suffix: 'K+',
        icon: <Image src="/icons/students.png" alt="" width={50} height={50} />,
        description: 'Global alumni network'
    },
];

export default function Achievements() {
    return (
        <section className="py-12 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
                {/* The Achievement Container */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 rounded-[40px] overflow-hidden border border-gray-100 shadow-2xl shadow-blue-900/5">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white p-10 flex flex-col items-center text-center group hover:bg-blue-50/50 transition-colors duration-500"
                        >
                            {/* Icon with subtle pulse */}
                            <div className="mb-6 p-4 rounded-2xl text-[#1E90FF] group-hover:scale-110 transition-transform duration-300">
                                {stat.icon}
                            </div>

                            {/* Animated Number */}
                            <div className="flex items-baseline gap-1">
                                <Counter value={stat.value} />
                                <span className="text-4xl font-bold text-[#0A3D62]">{stat.suffix}</span>
                            </div>

                            {/* Labels */}
                            <p className="text-lg font-bold text-[#0A3D62] mt-2 leading-tight">
                                {stat.label}
                            </p>
                            <p className="text-sm text-gray-400 mt-1 font-medium italic">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/**
 * A helper component that handles the count-up animation
 */
function Counter({ value }: { value: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [motionValue, value, isInView]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Intl.NumberFormat("en-US").format(
                    Math.floor(latest)
                );
            }
        });
    }, [springValue]);

    return (
        <span
            ref={ref}
            className="text-4xl md:text-5xl font-extrabold text-[#1E90FF] tracking-tighter"
        >
            0
        </span>
    );
}