// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';
// import { Linkedin } from 'lucide-react';

// const uniquePoints = [
//     {
//         title: "Available Offline",
//         description: "Download course materials and learn anytime, anywhere, even without an internet connection. Your learning journey knows no boundaries.",
//     },
//     {
//         title: "Trusted by Millions",
//         description: "Join a vast community of learners who have transformed their careers. Our programs are recognized for their quality and impact.",
//     },
//     {
//         title: "Certificate Awarded",
//         description: "Receive a globally recognized certificate upon completion, validating your new skills to employers.",
//     },
//     {
//         title: "700+ Hours of Classes",
//         description: "Dive deep with comprehensive curriculum designed to take you from beginner to master, with extensive hands-on practice.",
//     },
//     {
//         title: "Made by Professionals",
//         description: "Learn directly from industry experts with years of real-world experience. Our curriculum is practical and up-to-date.",
//     },
//     {
//         title: "Career Support",
//         description: "Get guidance on resume building, interview preparation, and job placement to kickstart your new career in automation.",
//     }
// ];

// export default function Unique() {
//     return (
//         <section className="py-20 bg-white">
//             <div className="max-w-7xl mx-auto px-6">
//                 <h2 className="text-4xl font-bold text-center mb-16 text-[#0A3D62]">What Makes Us Unique?</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {uniquePoints.map((point, index) => (
//                         <motion.div
//                             key={index}
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.5, delay: index * 0.1 }}
//                             className="bg-blue-50 rounded-2xl p-8 relative hover:shadow-lg transition-shadow duration-300"
//                         >
//                             <div className="absolute top-6 right-6 text-[#0A3D62]">
//                                 <Linkedin className="w-6 h-6" />
//                             </div>
//                             <h3 className="text-xl font-bold text-[#0A3D62] mb-4 pr-8">{point.title}</h3>
//                             <p className="text-gray-600 leading-relaxed text-sm">{point.description}</p>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

const StarDustSVG = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
        <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
    </svg>
);

const uniquePoints = [
    // Column 1
    { title: "Available Offline", desc: "Download materials and learn without boundaries.", col: 1 },
    { title: "Trusted by Millions", desc: "A global community of successful alumni.", col: 1 },
    { title: "Career Support", desc: "Expert guidance from resume to interview.", col: 1 },
    // Column 2
    { title: "Certificate Awarded", desc: "Globally recognized validation of your skills.", col: 2 },
    { title: "700+ Hours of Classes", desc: "Deep-dive curriculum for total mastery.", col: 2 },
    { title: "Chat Online", desc: "24/7 support from our technical mentors.", col: 2 },
    // Column 3
    { title: "Made by Professionals", desc: "Industry-led projects and real-world logic.", col: 3 },
    { title: "Live Workshops", desc: "Interactive sessions with automation leads.", col: 3 },
    { title: "MNC Partnerships", desc: "Direct pipelines to top-tier tech firms.", col: 3 },
];

export default function Unique() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Reduced Opacity StarDust Background */}
            <div className="absolute inset-0 pointer-events-none -z-10 text-blue-100">
                <StarDustSVG className="absolute top-10 left-1/4 w-8 opacity-20" />
                <StarDustSVG className="absolute bottom-20 right-1/4 w-12 opacity-15 rotate-12" />
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20 text-center">
                    <h2 className="text-4xl font-bold text-[#0A3D62]">What Makes Us Unique?</h2>
                    <p className="text-gray-500 mt-4">Built on a foundation of professional excellence and student success.</p>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Subtle Background Trend Line (Graph Visual) */}
                    <svg className="absolute top-1/2 left-0 w-full h-full hidden md:block pointer-events-none opacity-10 -z-10" viewBox="0 0 1200 400">
                        <path
                            d="M0,300 C200,280 400,150 600,180 S1000,50 1200,20"
                            fill="none"
                            stroke="#1E90FF"
                            strokeWidth="4"
                            strokeDasharray="10,10"
                        />
                    </svg>

                    {/* Column 1 - Base Level */}
                    <div className="flex flex-col gap-8">
                        {uniquePoints.filter(p => p.col === 1).map((point, i) => (
                            <UniqueCard key={i} {...point} delay={i * 0.1} />
                        ))}
                    </div>

                    {/* Column 2 - Mid Offset (Linear Graph Stepped Up) */}
                    <div className="flex flex-col gap-8 md:mt-16">
                        {uniquePoints.filter(p => p.col === 2).map((point, i) => (
                            <UniqueCard key={i} {...point} delay={(i + 3) * 0.1} />
                        ))}
                    </div>

                    {/* Column 3 - High Offset (Linear Graph Peak) */}
                    <div className="flex flex-col gap-8 md:mt-32">
                        {uniquePoints.filter(p => p.col === 3).map((point, i) => (
                            <UniqueCard key={i} {...point} delay={(i + 6) * 0.1} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

function UniqueCard({ title, desc, delay }: { title: string; desc: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 relative group"
        >
            <div className="absolute top-6 right-6 text-blue-300 group-hover:text-[#1E90FF] transition-colors">
                <Linkedin size={20} />
            </div>
            <h3 className="text-lg font-bold text-[#0A3D62] mb-3 pr-6">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>

            {/* Corner Accent from Snippet */}
            <div className="absolute bottom-0 left-0 w-1 h-0 bg-[#1E90FF] transition-all duration-300 group-hover:h-12 rounded-bl-2xl"></div>
        </motion.div>
    );
}