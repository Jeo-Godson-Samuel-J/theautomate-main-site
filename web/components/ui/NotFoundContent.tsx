"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import LoaderIcon from "@/components/ui/LoaderIcon";

export default function NotFoundContent() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        {/* 404 */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-2">
          <motion.h1
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[5rem] md:text-[6rem] lg:text-[8rem] leading-none text-slate-900 select-none"
          >
            4
          </motion.h1>

          <LoaderIcon size={100} />

          <motion.h1
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            className="text-[5rem] md:text-[6rem] lg:text-[8rem] leading-none text-slate-900 select-none"
          >
            4
          </motion.h1>
        </div>

        {/* Text */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-8 text-3xl md:text-4xl font-bold text-[#0A3D62]"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-4 max-w-lg text-center text-gray-500 text-lg leading-8"
        >
          Looks like the page you&apos;re searching for doesn&apos;t exist or
          may have been moved.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-10"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full bg-[#0166A7] px-8 py-4 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#0A3D62]"
          >
            <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
