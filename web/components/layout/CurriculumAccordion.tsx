"use client"; // This is the most important line!

import React, { useState } from "react";
import { Plus, Minus, CheckCircle2 } from "lucide-react";

interface Module {
    subheading: string;
    points: string[];
    summary?: string;
}

export default function CurriculumAccordion({ module }: { module: Module }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-[32px] overflow-hidden shadow-xl border border-slate-100 transition-all duration-300 mb-6">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-8 md:p-10 flex items-center justify-between text-left group"
            >
                <h3 className={`text-xl md:text-2xl font-black transition-colors duration-300 ${isOpen ? 'text-[#1E90FF]' : 'text-[#0A3D62]'}`}>
                    {module.subheading}
                </h3>

                {/* Plus / Minus Icon Container */}
                <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#0A3D62] text-white rotate-180' : 'bg-blue-50 text-[#1E90FF]'
                    }`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </div>
            </button>

            {/* Collapsible Content */}
            <div
                className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
            >
                <div className="px-8 md:px-10 pb-10">
                    <div className="h-px bg-slate-100 w-full mb-8" />

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                        {module.points?.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="text-[#1E90FF] w-5 h-5 mt-1 shrink-0" />
                                <span className="text-slate-700 font-bold text-base leading-snug">
                                    {point}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {module.summary && (
                        <div className="mt-8 p-6 bg-blue-50/50 rounded-2xl border-l-4 border-[#1E90FF]">
                            <p className="text-[#0A3D62] font-black text-sm italic">
                                {module.summary}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}