'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface CTAProps {
    icon?: string;
    title: string;
    description: string;
    buttonText: string;
    buttonLink?: string;
}

export default function CTA({
    icon = "/icons/consultation.png",
    title,
    description,
    buttonText,
    buttonLink = "/contact"
}: CTAProps) {
    return (
        <div className="mx-auto pb-16 px-6 md:px-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-2xl mt-10 mb-16 max-w-7xl mx-auto flex flex-col md:flex-row"
                style={{ background: 'linear-gradient(to right, #1060a8 0%, #1a7ac8 50%, #4a9fd4 100%)' }}
            >
                {/* LEFT HALF — clean, no pattern */}
                <div className="relative z-10 flex items-center gap-5 px-10 py-8 md:px-14 md:py-10 md:w-1/2">
                    <div className="shrink-0">
                        <Image
                            src={icon}
                            width={52}
                            height={52}
                            alt="CTA icon"
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mb-1">
                            {title}
                        </h2>
                        <p className="text-blue-100 text-sm max-w-sm">
                            {description}
                        </p>
                    </div>
                </div>

                {/* RIGHT HALF — A.svg tiled pattern + button */}
                <div className="relative md:w-1/2 flex items-center justify-center px-10 py-8 overflow-hidden">
                    {/* Tiled A.svg grid */}
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 gap-4 p-4 opacity-20 pointer-events-none">
                        {Array.from({ length: 18 }).map((_, i) => (
                            <Image
                                key={i}
                                src="/A.svg"
                                width={32}
                                height={32}
                                alt=""
                                className="w-full h-auto object-contain rotate-12"
                            />
                        ))}
                    </div>

                    {/* Button on top */}
                    <Button
                        asChild
                        className="relative z-10 bg-[#0A3D62] hover:bg-[#163E72] text-white px-10 py-5 rounded-full text-base font-bold shadow-md transition-all active:scale-95 whitespace-nowrap"
                    >
                        <Link href={buttonLink}>{buttonText}</Link>
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}