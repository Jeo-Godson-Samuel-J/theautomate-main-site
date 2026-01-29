'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlobalLoaderProps {
  isLoading: boolean;
}

export default function GlobalLoader({ isLoading }: GlobalLoaderProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {/* Custom Loader matching the design */}
        <div className="relative w-16 h-16">
          {/* Outer spinning arc */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Blue arc */}
              <path
                d="M 32 8 A 24 24 0 1 1 8 32"
                stroke="#3B82F6"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </motion.div>
          
          {/* Center pulsing circle */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
          >
            <div className="w-3 h-3 bg-blue-600 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
