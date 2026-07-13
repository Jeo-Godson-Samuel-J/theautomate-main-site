import React from 'react';
import { PricingCard, BundleData } from '@/components/ui/PricingCard';

const bundles: BundleData[] = [
  {
    title: "Starter Plan",
    badge: "Starter",
    price: "$99.99",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    instructor: "By Auto-Mate",
    duration: "1 month",
    batch: "Weekday or Weekend",
    features: [
      { name: "Recorded video sessions", included: true },
      { name: "Community chat (course-based)", included: true },
      { name: "Review system (post-completion)", included: true },
      { name: "Quizzes", included: false },
      { name: "Artifacts / hands-on labs", included: false },
      { name: "Live webinars", included: false },
    ]
  },
  {
    title: "Professional Plan",
    badge: "Pro",
    price: "$199.99",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    instructor: "By Auto-Mate",
    duration: "1 month",
    batch: "Weekday or Weekend",
    features: [
      { name: "Recorded video sessions", included: true },
      { name: "Community chat (course-based)", included: true },
      { name: "Review system (post-completion)", included: true },
      { name: "Quizzes", included: true },
      { name: "Artifacts / hands-on labs", included: true },
      { name: "Live webinars", included: false },
    ]
  },
  {
    title: "Premium Plan",
    badge: "Premium",
    price: "$299.99",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    instructor: "By Auto-Mate",
    duration: "1 month",
    batch: "Weekday or Weekend",
    features: [
      { name: "Recorded video sessions", included: true },
      { name: "Community chat (course-based)", included: true },
      { name: "Review system (post-completion)", included: true },
      { name: "Quizzes", included: true },
      { name: "Artifacts / hands-on labs", included: true },
      { name: "Live webinars", included: true },
    ]
  }
];

export default function Courses() {
  return (
    <section className="py-16 md:py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-slate-900 mb-12">
          Our Featured <span className="text-[#0166A7] italic">Plans</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bundles.map((bundle) => (
            <PricingCard key={bundle.title} bundle={bundle} />
          ))}
        </div>
      </div>
    </section>
  );
}
