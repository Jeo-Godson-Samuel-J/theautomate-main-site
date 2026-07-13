import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Star, Clock, CheckCircle2, XCircle, LayoutList } from 'lucide-react';

const bundles = [
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
            <div key={bundle.title} className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] overflow-hidden flex flex-col border border-slate-100 transition-all duration-300 group">
              
              {/* Image & Badge */}
              <div className="h-48 md:h-56 relative overflow-hidden">
                <Image
                  src={bundle.image}
                  alt={bundle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-sm border border-slate-100">
                  {bundle.badge}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                {/* Rating & Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-yellow-400 gap-0.5">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className="w-4 h-4" fill="currentColor" />
                    ))}
                    <span className="text-xs text-slate-500 ml-1 font-medium mt-0.5">(5.0)</span>
                  </div>
                  <span className="font-bold text-slate-900 text-lg">{bundle.price}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold mb-1 text-slate-900">{bundle.title}</h3>
                <p className="text-sm text-slate-500 mb-5">{bundle.instructor}</p>

                {/* Metadata */}
                <div className="flex items-center gap-5 text-xs font-medium text-slate-600 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {bundle.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <LayoutList className="w-4 h-4 text-slate-400" />
                    {bundle.batch}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-100 w-full mb-6"></div>

                {/* Features List */}
                <ul className="flex-grow space-y-3 mb-8">
                  {bundle.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm">
                      {feature.included ? (
                        <CheckCircle2 className="w-5 h-5 text-[#0166A7] shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-slate-300 shrink-0" />
                      )}
                      <span className={feature.included ? 'text-slate-700 font-medium' : 'text-slate-400 line-through'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <Link href="/contact" className="mt-auto">
                  <Button variant="outline" className="w-full rounded-full border-slate-300 text-slate-700 font-bold py-6 hover:bg-[#0166A7] hover:text-white hover:border-[#0166A7] transition-all">
                    Choose Plan
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
