"use client";

import React from "react";
import { motion } from "framer-motion";

interface HomeHighlightAnimationsProps {
  children: React.ReactNode;
  delay?: number;
}

export default function HomeHighlightAnimations({
  children,
  delay = 0,
}: HomeHighlightAnimationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
