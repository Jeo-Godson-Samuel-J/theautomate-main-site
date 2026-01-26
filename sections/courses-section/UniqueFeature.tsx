import React from 'react';
import Image from 'next/image';

const uniqueFeatures = [
    { title: "Available offline", icon: "/icons/offline.png" },
    { title: "Trusted by millions", icon: "/icons/millions.png" },
    { title: "Certificate awarded", icon: "/icons/award.png" },
    { title: "700+ hours of classes", icon: "/icons/clock.png" },
    { title: "Chat online", icon: "/icons/chat.png" },
    { title: "Made by professionals", icon: "/icons/professional.png" },
];

export default function UniqueFeature() {
    return (
        <section className="py-8 px-6 md:py-16 text-center bg-white">
            <div className='mx-auto'>
                <h2 className="text-5xl font-bold mb-16">What Makes Us Unique?</h2>
                <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    {uniqueFeatures.map((feature, i) => (
                        <div key={i} className="flex flex-col items-center rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6">
                            <div className="w-16 h-16 mb-6 relative">
                                <Image src={feature.icon} alt={feature.title} fill className="object-contain" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                            <p className="text-black-400 text-sm">Automate any application with our expertise, what you achieve is up to you.</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
