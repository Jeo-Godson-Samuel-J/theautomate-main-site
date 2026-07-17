'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import LoaderIcon from './LoaderIcon';
interface GlobalLoaderProps {
  isLoading: boolean;
}

export default function GlobalLoader({ isLoading }: GlobalLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          <div className="relative flex flex-col items-center gap-6">

            {/* Main StarDust Container */}
            <LoaderIcon size={160} />

            {/* Subtle Brand Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-1"
            >
              <h2 className="text-[#0A3D62] font-bold tracking-[0.3em] text-lg uppercase">
                Auto-Mate
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[#1E90FF] to-transparent rounded-full" />
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}