'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface LoaderIconProps {
    size?: number;
}

export default function LoaderIcon({
    size = 160,
}: LoaderIconProps) {
    return (<div className="relative w-32 h-32 md:w-40 md:h-40">

        {/* Outer Glow Effect */}

        <motion.div
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="absolute inset-0 bg-blue-400 rounded-full blur-[40px]"
        />

        {/* The StarDust PNG */}
        <motion.div
            animate={{
                rotate: 360,
                scale: [0.95, 1.05, 0.95]
            }}
            transition={{
                rotate: { duration: 5, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative w-full h-full"
        >
            <Image
                src="/loader.png" // Replace with your actual filename in /public
                alt="Loading..."
                fill
                className="object-contain"
                priority
            />
        </motion.div>
    </div>
    )
}