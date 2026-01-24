"use client"
import React from 'react';

const singleSet = [
    {
        name: "Mr. Kannan",
        image: "/kanan.png",
        text: "We approached The Auto-Mate to develop a framework for our QA team and provide training. They delivered an exceptional framework supporting both mobile and desktop applications. Truly glad to have found The Auto-Mate!",
    },
    {
        name: "Mr. Sakthipratheesh",
        image: "/sathi.png",
        text: "\"The Auto-Mate\" is a great platform for students and working professionals who are looking to get inspired and start or advance their journey into automation testing. It helped me alot with lots of challenges.",
    },
    {
        name: "Mrs. Varsha",
        image: "/varsha.png",
        text: "The Auto-Mate transformed my career! Their Playwright course and real-world training helped me switch to automation testing and land a product-based role with a 200% hike. Highly recommend!",
    },
];

// 4 groups of 3 reviews for desktop
const testimonialGroups = [singleSet, singleSet, singleSet, singleSet];

export default function Testimonials() {
    return (
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1B262C]">What Learners Say About Us</h2>
                <p className="text-gray-500 mb-24">Read what people from different industries has to say about us</p>

                {/* Container with extra top padding so the overlapping avatar isn't cut off */}
                <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 pb-12 pt-12">
                    {testimonialGroups.map((group, groupIdx) => (
                        <div
                            key={groupIdx}
                            className="flex flex-shrink-0 w-full md:gap-8 snap-start justify-center"
                        >
                            {group.map((t, i) => (
                                <div
                                    key={i}
                                    className={`relative bg-[#163E72] p-8 pt-16 text-left shadow-2xl
                                        /* Standard rounded corners for a rectangle div */
                                        rounded-[40px]
                                        w-full md:w-[380px] flex-shrink-0 mb-4
                                        ${i > 0 ? 'hidden md:block' : 'block'} 
                                    `}
                                >
                                    {/* Circular Avatar overlapping the top edge */}
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0">
                                        <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
                                            <img
                                                src={t.image}
                                                alt={t.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Star Rating in Cyan */}
                                    <div className="flex text-[#22D3EE] mb-4 text-xl">
                                        ★★★★★
                                    </div>

                                    <h3 className="text-white font-bold text-xl mb-3">{t.name}</h3>
                                    <p className="text-blue-100 text-[14px] leading-relaxed font-light">
                                        {t.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-3 mt-8">
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                    {[1, 2, 3, 4, 5, 6].map((dot) => (
                        <div key={dot} className="w-3 h-3 rounded-full bg-gray-300"></div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
}