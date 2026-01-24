import React from 'react';

export default function StatsSection() {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 pb-0">
            {/* Left Content */}
            <div className="lg:w-1/2 pb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                    Shape Your Future with <br /> Knowledge That Matters
                </h2>
                <p className="text-gray-600 text-lg mb-10">
                    We simplify online education with honest reviews, verified discounts, and guides that help learners make the right choices.
                </p>

                <div className="grid grid-cols-3 gap-8 mb-10">
                    <div>
                        <p className="text-3xl md:text-4xl font-bold">500+</p>
                        <p className="text-gray-500 text-sm">Students</p>
                    </div>
                    <div>
                        <p className="text-3xl md:text-4xl font-bold">10+</p>
                        <p className="text-gray-500 text-sm">Courses Covered</p>
                    </div>
                    <div>
                        <p className="text-3xl md:text-4xl font-bold">5+</p>
                        <p className="text-gray-500 text-sm">Years of Training</p>
                    </div>
                </div>

                <button className="bg-brand-dark text-white px-10 py-3 rounded-full font-bold shadow-lg block mx-auto lg:mx-0">
                    Know more
                </button>
            </div>

            {/* Right Content - The Image with starDust.svg background */}
            <div className="lg:w-1/2 relative flex justify-center">
                {/* The Blue Rays / Starburst */}
                <img
                    src="/starDust.svg"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md -z-10 opacity-80"
                    alt=""
                />
                {/* The Student Image */}
                <img
                    src="/person.svg"
                    className="w-full max-w-md h-auto object-contain relative z-10"
                    alt="Student"
                />
            </div>
        </section>
    );
}