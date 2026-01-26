'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"

export default function CourseHero() {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <section className="py-16 px-6 bg-white">
            <div className='mx-auto'>
                <h1 className="text-4xl flex flex-col items-center md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent 
                    bg-linear-to-r from-[#0A3D62] via-[#1E90FF] to-[#0A3D62] leading-[1.2] text-center">
                    Our Industry Leading Training <br /> Courses
                </h1>
                <p className='p-4 text-black-400 md:p-12 md:m-4 md:text-lg text-center'>Master the art of automation with our industry-leading training courses! Designed and delivered by seasoned experts, our hands-on programs equip you with real-world skills to excel in automation.
                    Whether you&apos;re advancing your career or upskilling your team, we’ll empower you to lead with confidence in today’s tech-driven world</p>

                <div className="bg-white rounded-[40px] w-full lg:w-[80%] mx-auto shadow-2xl shadow-[#2B71B8] flex flex-col md:flex-row overflow-hidden p-2">
                    <div className="md:w-1/2 relative group overflow-hidden rounded-3xl">
                        {/* Video Element */}
                        <video
                            src="/courses-banner/genai.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            onLoadedMetadata={(e) => {
                                const video = e.currentTarget;
                                // This forces the browser to recognize the full file length
                                if (video.duration) {
                                    console.log("Video duration detected:", video.duration);
                                }
                            }}
                            className="w-full h-full aspect-video md:aspect-square object-cover"
                        />

                        {/* The Overlay: inset-0 only works correctly if the parent is 'relative' */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 transition-colors duration-500 group-hover:bg-black/50">

                            {/* Featured Tag (Optional but looks professional) */}
                            <span className="text-white/70 text-[10px] uppercase tracking-[0.2em] mb-2">
                                Artificial Intelligence
                            </span>

                            <h2 className="text-white text-4xl md:text-5xl font-black uppercase tracking-tighter drop-shadow-lg">
                                Gen AI
                            </h2>

                            {/* Decorative line */}
                            <div className="w-12 h-1 bg-cyan-400 mt-4 rounded-full" />
                        </div>
                    </div>
                    <div className="md:w-1/2 p-3 md:p-12 flex flex-col justify-center">
                        <span className="bg-[#163E72] text-white text-[10px] md:text-xs px-3 py-1 rounded-full w-fit mb-3 md:mb-4">
                            Featured Course
                        </span>
                        <div className='flex gap-2 md:flex-col'><h2 className="text-2xl md:text-3xl font-bold p-2md:mb-4 text-[#1B262C]">
                            GenAI
                        </h2>
                            <div className="flex text-cyan-400 p-2">★★★★★</div></div>

                        <div className="flex flex-row items-center p-2 gap-2 md:gap-8">
                            <div className="flex items-center text-sm md:text-base">
                                <Image src="/icons/timer.png" alt="Timer" width={18} height={18} />
                                <span className="ml-2 text-gray-600">80+ hrs</span>
                            </div>
                            <div className="flex items-center text-sm md:text-base">
                                <Image src="/icons/learner.png" alt="Learner" width={18} height={18} />
                                <span className="ml-2 text-gray-600">150+ Learners</span>
                            </div>
                        </div><div className="relative p-2 text-black-400">
                            <p className={`text-sm md:text-base transition-all duration-200 ${!isExpanded ? 'line-clamp-3 md:line-clamp-none' : ''}`}>
                                This generative AI course will equip you with the skills to deploy generative AI techniques in real-world scenarios. You will gain a comprehensive understanding of applied generative AI.
                            </p>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="md:hidden text-[#2B71B8] font-bold text-xs mt-1 focus:outline-none"
                            >
                                {isExpanded ? "Read Less" : "Read More"}
                            </button>
                        </div>


                        {/* Buttons Container (Using the responsive logic we discussed earlier) */}
                        <div className="flex flex-row items-center gap-3 p-2">
                            <Button className="w-full sm:w-fit bg-[#2B71B8] text-white px-8 rounded-full font-bold hover:bg-[#163E72] transition-all">
                                Resume Course
                            </Button>
                            <Button className="w-full bg-white sm:w-fit text-[#2B71B8] hover:text-white hover:bg-[#2B71B8] underline font-bold">
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}