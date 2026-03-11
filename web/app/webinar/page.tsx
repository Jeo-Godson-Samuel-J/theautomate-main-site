import React from 'react'
import Image from 'next/image'
import { Calendar, Clock, Target, MonitorPlay, Gift, Timer, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import client from '@/lib/sanity.client'

export default async function WebinarHero() {

    const data = await client.fetch(`
*[_type == "masterclassHero"][0]{
  title,
  subtitle,
  description,
  coverImage{
    asset->{url}
  },
  eventDetails,
  bonus,
  pricing,
  remainingSeats
}
`)

    if (!data) {
        return <div className="p-20 text-center">No hero content found in Sanity</div>
    }

    const {
        title,
        subtitle,
        description,
        coverImage,
        eventDetails,
        bonus,
        pricing,
        remainingSeats,
    } = data

    return (
        <main className="min-h-screen pt-16 px-6 md:px-12 lg:px-20 bg-white text-[#0A3D62] font-sans">
            <div className="mx-auto max-w-7xl pt-10 md:pt-16">

                {/* HERO SECTION */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 mb-12 md:mb-16">

                    <div className="flex-1 text-center lg:text-left space-y-5">
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent
                                       bg-gradient-to-r from-[#0A3D62] via-[#1E90FF] to-[#0A3D62] leading-tight">
                            {title}
                        </h1>

                        <h2 className="text-2xl md:text-3xl font-bold text-[#1E90FF]">
                            {subtitle}
                        </h2>

                        <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            {description}
                        </p>
                    </div>

                    {/* COVER IMAGE */}
                    <div className="relative w-full lg:w-[500px] shrink-0">
                        <div className="relative aspect-[3/2] rounded-2xl border border-slate-200 overflow-hidden shadow-lg bg-slate-50">
                            {coverImage?.asset?.url && (
                                <Image
                                    src={coverImage.asset.url}
                                    alt="Masterclass Speaker"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            )}
                        </div>
                        <div className="absolute text-center -bottom-4 left-1/2 -translate-x-1/2 bg-[#0A3D62] text-white px-8 py-2 rounded-full text-xs md:text-sm font-bold uppercase whitespace-nowrap">
                            Featured Speaker
                        </div>
                    </div>
                </div>

                {/* INFO BOX */}
                <section className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-12">

                    <div className="py-4 px-4 text-center bg-slate-50 border-b border-slate-200">
                        <p className="font-bold text-sm md:text-base flex items-center justify-center gap-2 text-[#0A3D62]">
                            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                            PREMIUM LIVE MASTERCLASS — LIMITED SEATS
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4">
                        <DetailItem icon={<Calendar size={20} />} label="Date" value={eventDetails?.date} />
                        <DetailItem icon={<Clock size={20} />} label="Time" value={eventDetails?.time} />
                        <DetailItem icon={<Target size={20} />} label="Duration" value={eventDetails?.duration} />
                        <DetailItem icon={<MonitorPlay size={20} />} label="Format" value={eventDetails?.format} />
                    </div>

                    {(bonus?.bonusText || bonus?.bonusHighlight) && (
                        <div className="bg-[#1E90FF]/5 p-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
                            <Gift className="text-[#1E90FF]" size={20} />
                            <p className="text-slate-600 text-sm md:text-base">
                                {bonus?.bonusText}{" "}
                                <span className="font-bold text-[#1E90FF]">
                                    {bonus?.bonusHighlight}
                                </span>
                            </p>
                        </div>
                    )}

                    <div className="bg-[#0A3D62] p-3 text-center">
                        <div className="flex items-center justify-center gap-2 font-bold text-xs md:text-sm text-white uppercase">
                            <Timer size={16} />
                            OFFER EXPIRING SOON
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="py-10 pb-24 md:pb-32 text-center space-y-5">
                    <Button className="bg-gradient-to-r from-[#0A3D62] to-[#1E90FF] px-10 py-6 rounded-full h-auto">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <span className="text-lg md:text-xl font-bold text-white">
                                {pricing?.ctaText}
                            </span>
                            <div className="flex items-center gap-3 bg-white/20 px-4 py-1.5 rounded-full">
                                {pricing?.originalPrice && (
                                    <span className="line-through text-white/60 text-sm">
                                        ₹{pricing.originalPrice}
                                    </span>
                                )}
                                <span className="text-white text-lg font-bold">
                                    ₹{pricing?.price}
                                </span>
                            </div>
                        </div>
                    </Button>

                    <div className="space-y-2 mb-10">
                        <p className="text-[#1E90FF] text-lg md:text-xl font-bold">
                            Only {remainingSeats} Seats Remaining
                        </p>
                        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 uppercase font-semibold">
                            <AlertCircle size={14} />
                            Secure Payment
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) {
    return (
        <div className="p-5 flex flex-col items-center text-center border border-slate-100">
            <div className="text-[#1E90FF] mb-2">{icon}</div>
            <span className="text-xs text-slate-400 uppercase tracking-wide mb-1">{label}</span>
            <span className="font-bold text-base text-[#0A3D62]">
                {value || '—'}
            </span>
        </div>
    )
}