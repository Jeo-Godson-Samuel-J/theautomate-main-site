'use client';

import dynamic from 'next/dynamic';
// import Testimonials from "@/sections/Testimonials";

// Dynamic imports with SSR disabled for Framer Motion components
const AboutHero = dynamic(() => import("@/sections/about-section/AboutHero"), { ssr: false });
const Story = dynamic(() => import("@/sections/about-section/Story"), { ssr: false });
const Unique = dynamic(() => import("@/components/layout/CourseUnique"), { ssr: false });
const CTA = dynamic(() => import("@/components/layout/CTA"), { ssr: false });
const MissionVision = dynamic(() => import("@/sections/about-section/MissionVision"), { ssr: false });
const Achievements = dynamic(() => import("@/sections/about-section/Achievements"), { ssr: false });

export default function AboutPage() {
    return (
        <main className="bg-white gap-3">

            <AboutHero />
            <Achievements />
            <Story />
            <MissionVision />
            <Unique />
            <CTA
                title="Start Learning Today"
                description="Join the next wave of innovation. Your journey to mastering automation starts with a single click."
                buttonText="Get The Course"
            />
        </main>
    );
}