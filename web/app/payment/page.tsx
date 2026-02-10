'use client';

import React, { useState } from 'react';
import PaymentDetails from '@/sections/payment-section/PaymentDetails';
import OrderSummary from '@/sections/payment-section/OrderSummary';

export const COURSE_MAP = {
    playwright: { name: "Playwright + GenAI", price: 20 },
    selenium: { name: "Advanced Selenium", price: 40 },
    devops: { name: "DevOps for QA", price: 50 },
};

export default function PaymentPage() {
    const [courseKey, setCourseKey] = useState('playwright');
    const [batch, setBatch] = useState('weekend');

    const selectedCourse = COURSE_MAP[courseKey as keyof typeof COURSE_MAP];

    return (
        <main className="min-h-screen bg-slate-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24">

                {/* Header */}
                <div className="mb-12 text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-clip-text text-transparent 
                         bg-gradient-to-r from-[#0A3D62] via-[#1E90FF] to-[#0A3D62] leading-tight pb-2">
                        Secure Checkout
                    </h1>
                    <p className="text-black-400 text-sm md:text-base max-w-2xl lg:mx-0 mx-auto">
                        Complete the form below to finalize your enrollment.
                    </p>
                </div>

                {/* The Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* LEFT: FORM (Now first on mobile) */}
                    <div className="lg:col-span-7 order-1">
                        <PaymentDetails
                            setCourseKey={setCourseKey}
                            setBatch={setBatch}
                            currentCourse={courseKey}
                            currentBatch={batch}
                        />
                    </div>

                    {/* RIGHT: SUMMARY (Now second on mobile) */}
                    <div className="lg:col-span-5 order-2 lg:sticky lg:top-28">
                        <OrderSummary
                            courseName={selectedCourse.name}
                            price={selectedCourse.price}
                            batch={batch}
                            courseKey={courseKey}
                        />
                    </div>

                </div>
            </div>
        </main>
    );
}