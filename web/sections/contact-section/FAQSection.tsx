'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    { q: "What topics are included in the course?", a: "Our courses cover everything from Playwright and Selenium to advanced CI/CD pipelines and AI-driven testing." },
    { q: "Do you have a refund policy?", a: "Yes, we offer a 7-day money-back guarantee if you are not satisfied with the content." },
    { q: "When was the course recorded?", a: "All courses are updated monthly to ensure they align with the latest industry versions." },
    { q: "Do you have a free trial for the course?", a: "Absolutely! You can access the first two modules of any course for free." },
    { q: "Do you offer discounts for students?", a: "Yes, we provide a 40% discount for verified students and recent graduates." },
    { q: "Do you provide placement support?", a: "We offer resume reviews, mock interviews, and direct referrals to our partner network." },
    { q: "How long can I access the course?", a: "You get lifetime access to the course materials and all future updates." },
    { q: "Is Offline classes available?", a: "Currently, we focus on high-quality digital learning, but we do hold quarterly physical bootcamps." },
];

export default function FAQSection() {
    return (
        <section className="py-10 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1B262C] mb-4">Frequently Asked Questions</h2>
                    <p className="text-black-400 max-w-2xl mx-auto">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac eu et ac elit senectus mauris blandit tempore gestas.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="group bg-white p-6 rounded-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-50 flex items-center justify-between hover:shadow-md transition-all cursor-pointer"
                        >
                            <span className="font-bold text-[#1B262C] pr-4">{faq.q}</span>
                            <div className="bg-gray-50 p-2 rounded-full group-hover:bg-[#0166A7] group-hover:text-white transition-colors">
                                <Plus size={20} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}