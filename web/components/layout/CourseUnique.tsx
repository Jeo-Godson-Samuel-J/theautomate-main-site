"use client";
import React from "react";
import Image from "next/image";

const uniqueFeatures = [
    {
        title: "Available offline",
        description: "Auto-mate online learning platform empowers you to learn new skills and accomplish real growth.",
        icon: "/icons/offline.png",
    },
    {
        title: "Trusted by millions",
        description: "Automate any application with our expertise, what you achieve is up to you.",
        icon: "/icons/millions.png",
    },
    {
        title: "Certificate awarded",
        description: "Automate any application with our expertise, what you achieve is up to you.",
        icon: "/icons/award.png",
    },
    {
        title: "700+ hours of classes",
        description: "Automate any application with our expertise, what you achieve is up to you.",
        icon: "/icons/clock.png",
    },
    {
        title: "Chat online",
        description: "Automate any application with our expertise, what you achieve is up to you.",
        icon: "/icons/chat.png",
    },
    {
        title: "Made by professionals",
        description: "Automate any application with our expertise, what you achieve is up to you.",
        icon: "/icons/professional.png",
    },
];

export default function CourseUnique() {
    return (
        <section className="w-full py-12 md:py-16 px-6 bg-white">
            <div className="mx-auto">
                {/* Heading */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-black">
                        What Makes Us Unique?
                    </h2>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
                    {uniqueFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 flex items-center justify-center mb-5">
                                <Image
                                    src={feature.icon}
                                    alt={feature.title}
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                />
                            </div>

                            {/* Text */}
                            <h3 className="text-xl font-semibold text-black mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-[280px]">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}