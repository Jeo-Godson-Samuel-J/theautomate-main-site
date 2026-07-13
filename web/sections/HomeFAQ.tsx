"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/layout/Container";
import type { FAQ } from "@/lib/types/faq";

interface HomeFAQProps {
  faqs: FAQ[];
}

export default function HomeFAQ({ faqs }: HomeFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container className="flex flex-col lg:flex-row gap-12 lg:gap-20">

        {/* Left Side: Heading */}
        <div className="lg:w-1/3">
          <div className="sticky top-32">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
              Frequently Asked <br className="hidden lg:block" />
              Questions
            </h2>
            <p className="mt-6 text-slate-500 text-lg">
              Everything you need to know about our platform and how it can help
              you succeed.
            </p>
          </div>
        </div>

        {/* Right Side: FAQs */}
        <div className="lg:w-2/3 flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq._id}
                onClick={() => toggleFaq(index)}
                className={`overflow-hidden rounded-2xl cursor-pointer transition-all duration-400 ease-out
                  ${
                    isOpen
                      ? "bg-[#0166A7] text-white shadow-[0_20px_40px_rgba(1,102,167,0.2)] scale-[1.02] border-transparent"
                      : "bg-[#f8f9fa] text-slate-900 hover:bg-[#f1f3f5] border border-transparent"
                  }`}
              >
                <div className="p-6 md:p-8 flex justify-between items-center gap-4">
                  <h3 className="text-[1.15rem] md:text-xl font-semibold pr-8 leading-snug">
                    {faq.question}
                  </h3>
                  <div
                    className={`flex-shrink-0 transition-transform duration-400 ${
                      isOpen ? "rotate-180 text-white" : "text-slate-600"
                    }`}
                  >
                    {isOpen ? <Minus size={24} /> : <Plus size={24} />}
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 text-white/90 text-base md:text-lg leading-relaxed pt-0">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
