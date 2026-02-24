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
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
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

export default function FeaturesGrid() {
  return (
    <section className="w-full py-16 md:py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading Container */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-10 md:mb-16">
            What Makes Us Unique?
          </h2>
          <div className="h-1.5 w-24 bg-[#1E90FF] mx-auto rounded-full" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative h-[300px] overflow-hidden rounded-[24px] bg-[#1E90FF] transition-all duration-500 border border-transparent hover:border-[#1E90FF]/50 shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2"
            >
              {/* Background Image: Low opacity and grayscale by default */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 group-hover:scale-110"
                style={{ backgroundImage: `url(${feature.image})` }}
              />

              {/* Gradient Overlay: Ensures text remains readable regardless of image color */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/90" />

              {/* Content Container */}
              <div className="relative z-10 p-8 md:p-10 flex flex-col h-full justify-end">
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-relaxed text-gray-100 font-bold text-sm md:text-base opacity-90 group-hover:opacity-100">
                  {feature.description}
                </p>

                {/* Accent Line: Only shows on hover for extra interactivity */}
                <div className="mt-6 h-1 w-12 bg-[#1E90FF] transition-all duration-500 group-hover:w-full rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}