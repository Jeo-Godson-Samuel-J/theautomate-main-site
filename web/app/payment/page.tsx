
'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PaymentDetails from '@/sections/payment-section/PaymentDetails';
import OrderSummary from '@/sections/payment-section/OrderSummary';

interface Course {
    title: string;
    slug: string;
}

const STATIC_COURSES: Course[] = [
    { title: "WebDriverIO – Advanced JavaScript Automation", slug: "webdriverio-advanced" },
    { title: "TestCafe – Modern JavaScript E2E Testing", slug: "testcafe-modern" },
    { title: "Tricentis Tosca", slug: "tricentis-tosca" },
    { title: "Appium – Mobile Automation", slug: "appium-mobile" },
    { title: "REST API Automation", slug: "rest-api" },
    { title: "Selenium Automation", slug: "selenium" },
    { title: "Full-Stack Automation", slug: "full-stack" },
    { title: "GenAI for QA Automation", slug: "genai-qa" },
    { title: "Playwright Automation", slug: "playwright" },
    { title: "SDET – Software Development Engineer in Test", slug: "sdet" },
];

function PaymentContent() {
    const searchParams = useSearchParams();
    const initialCourseSlug = searchParams.get('course') || '';

    const [courseKey, setCourseKey] = useState(initialCourseSlug || STATIC_COURSES[0].slug);
    const [batch, setBatch] = useState('weekend');
    const [customAmount, setCustomAmount] = useState('');

    // Personal Details State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [comments, setComments] = useState('');

    const selectedCourse = STATIC_COURSES.find(c => c.slug === courseKey) || STATIC_COURSES[0];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="mb-12 text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-clip-text text-transparent 
                         bg-gradient-to-r from-[#0A3D62] via-[#1E90FF] to-[#0A3D62] leading-tight pb-2">
                    Secure Checkout
                </h1>
                <p className="text-black-400 text-sm md:text-base max-w-2xl lg:mx-0 mx-auto">
                    Complete the form below to finalize your enrollment.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-7 order-1">
                    <PaymentDetails
                        setCourseKey={setCourseKey}
                        currentCourse={courseKey}
                        customAmount={customAmount}
                        setCustomAmount={setCustomAmount}
                        courses={STATIC_COURSES}
                        batch={batch}
                        setBatch={setBatch}
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        phone={phone}
                        setPhone={setPhone}
                        comments={comments}
                        setComments={setComments}
                    />
                </div>

                <div className="lg:col-span-5 order-2 lg:sticky lg:top-28">
                    <OrderSummary
                        courseName={selectedCourse.title}
                        courseKey={courseKey}
                        customAmount={Number(customAmount)}
                        batch={batch}
                        userData={{ name, email, phone, comments }}
                    />
                </div>
            </div>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <main className="min-h-screen bg-slate-50/30">
            <Suspense fallback={<div>Loading...</div>}>
                <PaymentContent />
            </Suspense>
        </main>
    );
}
