'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function CTA() {
    return (
        <div className="px-6 md:px-0"> {/* Wrapper to prevent edge-touching on mobile */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                // mb-20 on mobile ensures it stays away from the footer
                className="bg-gradient-to-r from-[#0A3D62] to-[#163E72] rounded-[30px] md:rounded-[40px] p-10 pb-24 md:p-20 text-center relative overflow-hidden mt-10 mb-20 md:my-32 max-w-7xl mx-auto"
            >
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] bg-center pointer-events-none"></div>

                {/* Background Asset: Scaled down for mobile */}
                <div className="absolute -top-4 -right-4 md:top-0 md:right-0 p-4 md:p-10 opacity-10">
                    <Image
                        src="/A.svg"
                        width={150}
                        height={150}
                        className="w-20 h-20 md:w-48 md:h-48 rotate-12"
                        alt=""
                    />
                </div>

                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                        Start Learning Today
                    </h2>

                    <p className="text-blue-100 mb-8 md:mb-10 text-base md:text-lg max-w-xl mx-auto px-4">
                        Join the next wave of innovation. Your journey to mastering automation starts with a single click.
                    </p>

                    <Button asChild className="bg-white text-[#163E72] hover:bg-blue-50 px-10 py-7 md:py-8 rounded-full text-lg md:text-xl font-bold shadow-xl w-full md:w-auto transition-all active:scale-95">
                        <Link href="/courses">Get The Course</Link>
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
