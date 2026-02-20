"use client";
import React from "react";

const features = [
    {
        title: "Learn from anywhere",
        description: "Auto-mate online learning platform empowers you to learn new skills and accomplish real growth.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "Expert Mentors",
        description: "Automate any application with our expertise, taught by industry veterans.",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "In-demand Skills",
        description: "Master the tools that top tech companies are looking for in 2024.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "AI-Powered Training",
        description: "Integrate GenAI into your automation workflows for cutting-edge efficiency.",
        image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "Tailored Consulting",
        description: "Get personalized guidance to solve your specific automation challenges.",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "Community & Events",
        description: "Connect with a global network of automation engineers and experts.",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    },
];

export default function Unique() {
    return (
        <section className="w-full py-16 md:py-32 px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                {/* Heading Container */}
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-4xl md:text-5xl font-black text-[#0A3D62] mb-6 tracking-tight">
                        What Makes Us Unique?
                    </h2>
                    <div className="h-1.5 w-24 bg-[#1E90FF] mx-auto rounded-full" />
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-[22px] bg-slate-900 transition-all duration-300 hover:-translate-y-1"
                            style={{
                                border: "1px solid rgba(30,144,255,0.45)",
                                boxShadow: "0 0 18px rgba(30,144,255,0.18), 0 4px 24px rgba(0,0,0,0.18)",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 32px rgba(30,144,255,0.45), 0 8px 32px rgba(0,0,0,0.22)")}
                            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 18px rgba(30,144,255,0.18), 0 4px 24px rgba(0,0,0,0.18)")}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-all duration-300 filter grayscale contrast-125 brightness-50 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
                                style={{ backgroundImage: `url(${feature.image})` }}
                            />
                            <div className="absolute inset-0 bg-black/45 transition-colors duration-300 group-hover:bg-white/55" />

                            <div className="relative z-10 p-10">
                                <div className="absolute right-6 top-6 text-5xl font-black tracking-tight text-white/25 transition-colors duration-300 group-hover:text-black/25">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-slate-950">
                                    {feature.title}
                                </h3>
                                <p className="mt-4 leading-relaxed text-white/80 transition-colors duration-300 group-hover:text-slate-800">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
