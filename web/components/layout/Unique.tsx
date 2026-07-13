"use client";
import React from "react";
import Image from "next/image";

const features = [
  {
    title: "Learn from anywhere",
    description: "Auto-mate online learning platform empowers you to learn new skills and accomplish real growth.",
    icon: "/icons/globe.png",
  },
  {
    title: "Expert Mentors",
    description: "Automate any application with our expertise, what you achieve is up to you.",
    icon: "/icons/training.png",
  },
  {
    title: "Learn in-demand skills",
    description: "Automate any application with our expertise, what you achieve is up to you.",
    icon: "/icons/demand.png",
  },
  {
    title: "AI-Powered Automation",
    description: "Automate any application with our expertise, what you achieve is up to you.",
    icon: "/icons/brain.png",
  },
  {
    title: "Tailored Consulting",
    description: "Automate any application with our expertise, what you achieve is up to you.",
    icon: "/icons/doubtclarification.png",
  },
  {
    title: "Community and Events",
    description: "Automate any application with our expertise, what you achieve is up to you.",
    icon: "/icons/community.png",
  },
];

export default function FeaturesGrid() {
  return (
    <section
      className="w-full py-20 md:py-24 px-6"
      style={{
        background: "linear-gradient(135deg, #0a2a4a 0%, #1565a8 50%, #5aaedc 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            What Makes Us Unique?
          </h2>
          <div className="h-px w-20 bg-gray-300 mx-auto opacity-60" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl px-6 py-8 flex flex-col items-center text-center"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}
            >
              <div className="flex justify-center items-center w-16 h-16 mb-4">
                <Image
                  src={feature.icon}
                  alt={`${feature.title} icon`}
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}