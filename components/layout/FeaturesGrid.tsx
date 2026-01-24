import React from 'react';

const features = [
    {
        title: "Learn from anywhere",
        description: "Auto-mate online learning platform empowers you to learn new skills and accomplish real growth.",
        icon: "/icons/globe.png", // Replace with your exported figma icon
    },
    {
        title: "Expert Mentors",
        description: "Automate any application with our expertise, what you achieve is up to you.",
        icon: "/icons/mentor.png",
    },
    {
        title: "Learn in-demand skills",
        description: "Automate any application with our expertise, what you achieve is up to you.",
        icon: "/icons/graph.png",
    },
    {
        title: "AI-Powered Automation",
        description: "Automate any application with our expertise, what you achieve is up to you.",
        icon: "/icons/cloud.png",
    },
    {
        title: "Tailored Consulting",
        description: "Automate any application with our expertise, what you achieve is up to you.",
        icon: "/icons/classroom.png",
    },
    {
        title: "Community and Events",
        description: "Automate any application with our expertise, what you achieve is up to you.",
        icon: "/icons/atom.png",
    },
];

export default function FeaturesGrid() {
    return (
        <section className="w-full py-20 px-6 bg-gradient-to-br from-[#8ECAE6] via-[#219EBC] to-[#023047]">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                    What Makes Us Unique?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[40px] p-10 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                            <div className="w-16 h-16 mb-6 flex items-center justify-center">
                                <img src={feature.icon} alt={feature.title} className="object-contain" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}