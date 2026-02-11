import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, Target, MonitorPlay, Gift, Timer, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WebinarHero() {
    return (
        <main className="min-h-screen pt-16 px-16 pb-40 md:pt-20 md:px-20 md:pb-48 lg:pb-56 bg-[#1e3a8a] text-white font-sans selection:bg-orange-500/30">
            <div className="mx-auto px-4 sm:px-8 pt-10 md:pt-20">

                {/* Section 1: Title and Expert Image */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 mb-12 md:mb-20">
                    <div className="flex-1 text-center lg:text-left space-y-4 md:space-y-6">
                        <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                            AI Master Class for QA Professionals -
                        </h1>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f97316]">
                            Master AI Agents
                        </h2>
                        <p className="text-lg md:text-xl lg:text-2xl text-blue-100/90 font-medium max-w-3xl mx-auto lg:mx-0">
                            90 Minutes That Will Transform You From Manual Tester to AI-Powered QA Leader -
                            <span className="sm:block mt-2">Live Technical Demos + Ready-to-Deploy Frameworks</span>
                        </p>
                    </div>

                    {/* Expert Image Card: Responsive sizing using aspect-square */}
                    <div className="relative w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[400px] shrink-0">
                        <div className="relative aspect-square rounded-xl border-[4px] md:border-[6px] border-[#f97316] overflow-hidden shadow-2xl">
                            <Image
                                src="/expert-photo.jpg" // Placeholder path
                                alt="AI Expert speaking at the webinar"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 280px, 400px"
                            />
                        </div>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#f97316] text-white px-6 md:px-8 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-xl whitespace-nowrap">
                            AI Expert
                        </div>
                    </div>
                </div>

                {/* Section 2: Premium Info Box (Stacked on Mobile, Grid on Tablet+) */}
                <section className="max-w-5xl mx-auto bg-[#2b4ba7] rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl overflow-hidden">

                    {/* Status Header */}
                    <div className="py-4 md:py-6 px-4 text-center bg-white/5">
                        <p className="text-[#fbbf24] font-bold text-base sm:text-lg md:text-2xl flex items-center justify-center gap-2">
                            <span className="animate-pulse">🔥</span>
                            PREMIUM Live Masterclass - Limited to 200 Attendees (158+ Already Registered!)
                        </p>
                    </div>

                    {/* Details Grid: 2x2 on mobile, 4x1 on desktop */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
                        <DetailItem icon={<Calendar size={20} />} label="Date" value="Feb 14, 2026" isLastMobile={false} />
                        <DetailItem icon={<Clock size={20} />} label="Time" value="10:00 AM IST" isLastMobile={false} />
                        <DetailItem icon={<Target size={20} />} label="Duration" value="90 Minutes" isLastMobile={false} />
                        <DetailItem icon={<MonitorPlay size={20} />} label="Format" value="Live Online" isLastMobile={true} />
                    </div>

                    {/* Bonus Banner */}
                    <div className="bg-[#3b5998]/40 p-4 md:p-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
                        <Gift className="text-pink-400 shrink-0" size={24} />
                        <p className="text-blue-50 italic text-base md:text-lg">
                            Bonus: <span className="font-bold text-white underline decoration-[#f97316] underline-offset-4">testron.ai Framework</span> +
                            <span className="font-bold text-white ml-1">₹42,994+ Resources</span> for Next 42 Registrants Only!
                        </p>
                    </div>

                    {/* Red Alert Footer */}
                    <div className="bg-[#dc2626] p-4 text-center">
                        <div className="flex items-center justify-center gap-2 font-black text-xs md:text-base uppercase tracking-widest mb-1">
                            <Timer size={18} className="animate-bounce" />
                            OFFER EXPIRES AT 11:59 PM IST TONIGHT!
                        </div>
                        <p className="text-[10px] md:text-xs text-white/90 font-medium italic">
                            After midnight: No bonuses, no framework access, no exception
                        </p>
                    </div>
                </section>

                {/* Section 3: Call to Action */}
                <div className="p-3 md:p-6 lg:p-20 text-center space-y-4">
                    <Button
                        className="w-full sm:w-auto bg-gradient-to-r from-[#2563eb] to-[#f97316] hover:brightness-110 transition-all hover:scale-105 active:scale-95 p-px rounded-xl md:rounded-2xl shadow-[0_0_50px_rgba(249,115,22,0.3)]"
                        aria-label="Register for the webinar for 99 Rupees"
                    >
                        <div className="bg-transparent px-6 md:px-14 py-4 md:py-6 rounded-xl md:rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4">
                            <span className="text-sm md:text-3xl font-black">Secure My Spot & Bonuses</span>
                            <div className="flex items-center gap-2">
                                <span className="line-through text-white/50 text-sm md:text-xl font-normal">₹499</span>
                                <span className="text-white text-sm md:text-3xl font-black">₹99</span>
                            </div>
                        </div>
                    </Button>

                    <div className="space-y-3">
                        <p className="text-[#f97316] text-lg md:text-2xl font-black italic tracking-wide animate-pulse">
                            Before 42 Remaining Seats Fill Up!
                        </p>
                        <div className="flex items-center justify-center gap-3 text-[10px] md:text-xs text-white/50 uppercase tracking-[0.15em] font-bold">
                            <AlertCircle size={14} className="text-red-500 shrink-0" />
                            Once we hit 200 registrants, this page goes offline
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}

/**
 * Reusable component for Detail Items to follow DRY principle
 */
function DetailItem({ icon, label, value, isLastMobile }: { icon: React.ReactNode, label: string, value: string, isLastMobile: boolean }) {
    return (
        <div className={`p-4 md:p-6 flex flex-col items-center text-center ${!isLastMobile ? 'border-r border-b lg:border-b-0 border-white/10' : 'border-b lg:border-b-0 border-white/10'} even:border-r-0 lg:even:border-r lg:last:border-r-0`}>
            <div className="text-[#f97316] mb-1 md:mb-2">{icon}</div>
            <span className="text-[10px] uppercase tracking-tighter md:tracking-widest text-blue-200 mb-1">{label}</span>
            <span className="font-bold text-sm md:text-lg leading-tight">{value}</span>
        </div>
    );
}
