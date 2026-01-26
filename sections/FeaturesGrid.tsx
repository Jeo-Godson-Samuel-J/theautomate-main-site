import React from "react";
import Image from "next/image";

const features = [
  {
    title: "Learn from anywhere",
    description:
      "Auto-mate online learning platform empowers you to learn new skills and accomplish real growth.",
    icon: "/icons/globe1.png",
    accent: "from-[#1682F1] to-[#1EC0F7]",
  },
  {
    title: "Expert Mentors",
    description:
      "Automate any application with our expertise, what you achieve is up to you.",
    icon: "/icons/mentor1.png",
    accent: "from-[#0050DE] to-[#1682F1]",
  },
  {
    title: "Learn in-demand skills",
    description:
      "Automate any application with our expertise, what you achieve is up to you.",
    icon: "/icons/graph1.png",
    accent: "from-[#174778] to-[#0050DE]",
  },
  {
    title: "AI-Powered Automation",
    description:
      "Automate any application with our expertise, what you achieve is up to you.",
    icon: "/icons/cloud1.png",
    accent: "from-[#1EC0F7] to-[#25C8E5]",
  },
  {
    title: "Tailored Consulting",
    description:
      "Automate any application with our expertise, what you achieve is up to you.",
    icon: "/icons/classroom1.png",
    accent: "from-[#1682F1] to-[#25C8E5]",
  },
  {
    title: "Community and Events",
    description:
      "Automate any application with our expertise, what you achieve is up to you.",
    icon: "/icons/atom1.png",
    accent: "from-[#0050DE] to-[#174778]",
  },
];

export default function FeaturesGrid() {
  return (
    <section className="w-full py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black pb-12">
          What Makes Us Unique?
        </h2>

        {/* Feature Lanes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative flex gap-6 items-start
                ${index % 2 !== 0 ? "md:translate-y-16" : ""}
              `}
            >
              {/* Ambient separator shadow (NOT a box) */}
              <div className="absolute -inset-x-4 -inset-y-6 rounded-xl 
                              shadow-[0_20px_40px_-30px_rgba(23,71,120,0.25)] 
                              pointer-events-none" />

              {/* Icon */}
              <div
                className={`relative w-14 h-14 rounded-full 
                            bg-linear-to-br ${feature.accent}
                            flex items-center justify-center shrink-0
                            shadow-lg`}
              >
                <Image
                  src={feature.icon}
                  width={26}
                  height={26}
                  alt={feature.title}
                />
              </div>

              {/* Text */}
              <div className="relative">
                <h3 className="text-xl font-semibold text-black mb-2">
                  {feature.title}
                </h3>

                {/* Accent line */}
                <div
                  className={`h-[3px] w-12 bg-linear-to-r ${feature.accent} mb-4 rounded-full`}
                />

                <p className="text-[#174778] text-sm leading-relaxed max-w-sm">
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
