import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, Target, MonitorPlay, Gift, Timer, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WebinarHero() {
    return (
        <main className="min-h-screen pt-16 px-6 md:px-12 lg:px-20 bg-white text-[#0A3D62] font-sans selection:bg-[#1E90FF]/20">
            <div className="mx-auto max-w-7xl pt-10 md:pt-20">

                {/* Section 1: Title and Landscape Expert Image */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 mb-16 md:mb-24">
                    <div className="flex-1 text-center lg:text-left space-y-4 md:space-y-8">
                        {/* Heading with requested Gradient */}
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent 
                                       bg-gradient-to-r from-[#0A3D62] via-[#1E90FF] to-[#0A3D62] 
                                       leading-tight md:leading-[1.2]">
                            AI Master Class for QA Professionals -
                        </h1>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E90FF] tracking-tight">
                            Master AI Agents
                        </h2>

                        <p className="text-lg md:text-xl lg:text-2xl text-slate-600 font-medium max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                            90 Minutes That Will Transform You From Manual Tester to AI-Powered QA Leader —
                            <span className="sm:block mt-2 text-[#0A3D62]">Live Technical Demos + Ready-to-Deploy Frameworks</span>
                        </p>
                    </div>

                    {/* Expert Image Card: Landscape (3:2 Aspect Ratio) */}
                    <div className="relative w-full lg:w-[550px] shrink-0">
                        <div className="relative aspect-[3/2] rounded-2xl border-[1px] border-slate-200 overflow-hidden shadow-2xl bg-slate-50">
                            <Image
                                src="/expert-photo.jpg"
                                alt="AI Expert speaking at the webinar"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 550px"
                            />
                        </div>
                        {/* Tag with Blue Accent */}
                        <div className="absolute text-center -bottom-4 left-1/2 -translate-x-1/2 bg-[#0A3D62] text-white px-8 py-2 rounded-full text-xs md:text-sm font-bold shadow-lg uppercase tracking-wider">
                            Featured Speaker
                        </div>
                    </div>
                </div>

                {/* Section 2: Premium Info Box (Clean White/Blue Theme) */}
                <section className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden mb-20">

                    {/* Status Header */}
                    <div className="py-5 px-4 text-center bg-slate-50 border-b border-slate-200">
                        <p className="text-[#0A3D62] font-bold text-base sm:text-lg md:text-xl flex items-center justify-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                            PREMIUM LIVE MASTERCLASS — LIMITED TO 200 ATTENDEES (158+ REGISTERED)
                        </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4">
                        <DetailItem icon={<Calendar size={20} />} label="Date" value="Feb 14, 2026" isLastMobile={false} />
                        <DetailItem icon={<Clock size={20} />} label="Time" value="10:00 AM IST" isLastMobile={false} />
                        <DetailItem icon={<Target size={20} />} label="Duration" value="90 Minutes" isLastMobile={false} />
                        <DetailItem icon={<MonitorPlay size={20} />} label="Format" value="Live Online" isLastMobile={true} />
                    </div>

                    {/* Bonus Banner */}
                    <div className="bg-[#1E90FF]/5 p-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
                        <Gift className="text-[#1E90FF] shrink-0" size={24} />
                        <p className="text-slate-700 italic text-base md:text-lg font-medium">
                            Bonus: <span className="font-bold text-[#0A3D62] underline decoration-[#1E90FF] underline-offset-8">testron.ai Framework</span> +
                            <span className="font-bold text-[#1E90FF] ml-1">₹42,994+ Resources</span> for Next 42 Registrants Only!
                        </p>
                    </div>

                    {/* Red Alert Footer */}
                    <div className="bg-[#0A3D62] p-4 text-center">
                        <div className="flex items-center justify-center gap-2 font-bold text-xs md:text-base text-white uppercase tracking-[0.2em] mb-1">
                            <Timer size={18} className="animate-bounce" />
                            OFFER EXPIRES AT 11:59 PM IST TONIGHT!
                        </div>
                    </div>
                </section>

                {/* Section 3: Call to Action (Gradient Style) */}
                <div className="py-10 md:py-20 text-center space-y-8">
                    <Button
                        className="w-full sm:w-auto h-auto bg-gradient-to-r from-[#0A3D62] to-[#1E90FF] hover:opacity-90 transition-all hover:scale-[1.02] active:scale-95 px-8 md:px-16 py-6 md:py-8 rounded-2xl shadow-[0_20px_40px_rgba(30,144,255,0.25)] border-none"
                        aria-label="Register for the webinar for 99 Rupees"
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6">
                            <span className="text-xl md:text-3xl font-black text-white uppercase tracking-tight">Secure My Spot Now</span>
                            <div className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-xl border border-white/10">
                                <span className="line-through text-white/60 text-lg md:text-xl font-medium">₹499</span>
                                <span className="text-white text-xl md:text-3xl font-black">₹99</span>
                            </div>
                        </div>
                    </Button>

                    <div className="space-y-4">
                        <p className="text-[#1E90FF] text-xl md:text-3xl font-black italic tracking-tighter animate-pulse">
                            Before 42 Remaining Seats Fill Up!
                        </p>
                        <div className="flex items-center justify-center gap-3 text-xs text-slate-400 uppercase tracking-[0.3em] font-bold">
                            <AlertCircle size={14} className="text-[#0A3D62] shrink-0" />
                            Secure Payment via Razorpay
                        </div>
                    </div>
                </div>

                {/* Final Spacer */}
                <div className="h-32 md:h-48" />
            </div>
        </main>
    );
}

function DetailItem({ icon, label, value, isLastMobile }: { icon: React.ReactNode, label: string, value: string, isLastMobile: boolean }) {
    return (
        <div className={`p-6 md:p-10 flex flex-col items-center text-center ${!isLastMobile ? 'border-r border-b lg:border-b-0 border-slate-100' : 'border-b lg:border-b-0 border-slate-100'} even:border-r-0 lg:even:border-r lg:last:border-r-0 hover:bg-slate-50 transition-colors`}>
            <div className="text-[#1E90FF] mb-3">{icon}</div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-2 font-bold">{label}</span>
            <span className="font-bold text-lg md:text-xl leading-tight text-[#0A3D62]">{value}</span>
        </div>
    );
}