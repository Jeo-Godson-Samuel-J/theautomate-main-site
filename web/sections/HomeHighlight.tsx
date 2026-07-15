import React from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.client";
import { getHomeHighlight } from "@/lib/services/homeHighlight.service";
import type { HomeHighlight } from "@/lib/types/homeHighlight";
import HomeHighlightAnimations from "./HomeHighlightAnimations";

export default async function HomeHighlight() {
    const data: HomeHighlight | null = await getHomeHighlight().catch(
        () => null,
    );

    if (!data) return null;

    const leftImageUrl = data.leftImage
        ? urlFor(data.leftImage).width(800).height(900).fit("crop").url()
        : null;

    const rightImageUrl = data.rightImage
        ? urlFor(data.rightImage).width(700).height(800).fit("crop").url()
        : null;

    const avatars = data.studentAvatars ?? [];

    return (
        <section className="py-16 md:py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* ── Desktop layout: 3 columns ── */}
                <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] gap-6 xl:gap-8 items-center">

                    {/* Left Image */}
                    <HomeHighlightAnimations delay={0}>
                        {leftImageUrl ? (
                            <div className="rounded-3xl overflow-hidden">
                                <Image
                                    src={leftImageUrl}
                                    alt="Highlight left"
                                    width={800}
                                    height={900}
                                    className="w-full h-[480px] xl:h-[540px] object-cover"
                                />
                            </div>
                        ) : (
                            <div />
                        )}
                    </HomeHighlightAnimations>

                    {/* Center Cards Column */}
                    <div className="flex flex-col gap-5 xl:gap-6 w-[280px] xl:w-[320px]">
                        {/* Statistic Card */}
                        <HomeHighlightAnimations delay={0.15}>
                            <div
                                className="px-7 py-7 xl:px-8 xl:py-8"
                                style={{
                                    background: "#EAF5FF",
                                    borderRadius: "24px",
                                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                                }}
                            >
                                {/* Avatars row */}
                                {avatars.length > 0 && (
                                    <div className="flex items-center mb-5">
                                        <div className="flex -space-x-3">
                                            {avatars.map((avatar: any, index: number) => {
                                                const avatarUrl = urlFor(avatar)
                                                    .width(80)
                                                    .height(80)
                                                    .fit("crop")
                                                    .url();
                                                return (
                                                    <div
                                                        key={index}
                                                        className="relative w-11 h-11 xl:w-12 xl:h-12 rounded-full border-[2.5px] border-white overflow-hidden"
                                                        style={{ zIndex: avatars.length - index }}
                                                    >
                                                        <Image
                                                            src={avatarUrl}
                                                            alt={`Student ${index + 1}`}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Statistic number + heading */}
                                <p
                                    className="text-3xl xl:text-4xl font-bold leading-tight"
                                    style={{ color: "#0166A7" }}
                                >
                                    {data.statisticNumber}
                                </p>
                                <p
                                    className="text-base xl:text-lg font-semibold mt-1 leading-snug"
                                    style={{ color: "#0166A7" }}
                                >
                                    {data.statisticHeading}
                                </p>
                            </div>
                        </HomeHighlightAnimations>

                        {/* Quote Card */}
                        <HomeHighlightAnimations delay={0.3}>
                            <div
                                className="px-7 py-7 xl:px-8 xl:py-8"
                                style={{
                                    background: "#0F172A",
                                    borderRadius: "24px",
                                    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                                }}
                            >
                                {/* Quote text with opening mark */}
                                <p className="text-white text-base xl:text-lg leading-relaxed mb-5 font-normal">
                                    <span className="font-serif text-2xl mr-1">&ldquo;</span>
                                    {data.quote}&rdquo;
                                </p>

                                {/* Author */}
                                <div>
                                    <p
                                        className="inline-block text-sm xl:text-base font-semibold px-2 py-0.5 rounded"
                                        style={{ background: "#0166A7", color: "#fff" }}
                                    >
                                        {data.quoteAuthor}
                                    </p>
                                    {data.quoteSubtitle && (
                                        <p className="text-gray-400 text-xs xl:text-sm mt-1.5">
                                            {data.quoteSubtitle}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </HomeHighlightAnimations>
                    </div>

                    {/* Right Image */}
                    <HomeHighlightAnimations delay={0.2}>
                        {rightImageUrl ? (
                            <div className="rounded-3xl overflow-hidden">
                                <Image
                                    src={rightImageUrl}
                                    alt="Highlight right"
                                    width={700}
                                    height={800}
                                    className="w-full h-[480px] xl:h-[540px] object-cover"
                                />
                            </div>
                        ) : (
                            <div />
                        )}
                    </HomeHighlightAnimations>
                </div>

                {/* ── Tablet layout: 2 columns (cards + one image per row) ── */}
                <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-6 items-center">
                    {/* Left Image */}
                    <HomeHighlightAnimations delay={0}>
                        {leftImageUrl && (
                            <div className="rounded-3xl overflow-hidden">
                                <Image
                                    src={leftImageUrl}
                                    alt="Highlight left"
                                    width={800}
                                    height={900}
                                    className="w-full h-[400px] object-cover"
                                />
                            </div>
                        )}
                    </HomeHighlightAnimations>

                    {/* Cards stacked */}
                    <div className="flex flex-col gap-5">
                        {/* Statistic Card */}
                        <HomeHighlightAnimations delay={0.15}>
                            <div
                                className="px-7 py-7"
                                style={{
                                    background: "#EAF5FF",
                                    borderRadius: "24px",
                                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                                }}
                            >
                                {avatars.length > 0 && (
                                    <div className="flex items-center mb-4">
                                        <div className="flex -space-x-3">
                                            {avatars.map((avatar: any, index: number) => {
                                                const avatarUrl = urlFor(avatar)
                                                    .width(80)
                                                    .height(80)
                                                    .fit("crop")
                                                    .url();
                                                return (
                                                    <div
                                                        key={index}
                                                        className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                                                        style={{ zIndex: avatars.length - index }}
                                                    >
                                                        <Image
                                                            src={avatarUrl}
                                                            alt={`Student ${index + 1}`}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                <p
                                    className="text-3xl font-bold leading-tight"
                                    style={{ color: "#0166A7" }}
                                >
                                    {data.statisticNumber}
                                </p>
                                <p
                                    className="text-base font-semibold mt-1 leading-snug"
                                    style={{ color: "#0166A7" }}
                                >
                                    {data.statisticHeading}
                                </p>
                            </div>
                        </HomeHighlightAnimations>

                        {/* Quote Card */}
                        <HomeHighlightAnimations delay={0.25}>
                            <div
                                className="px-7 py-7"
                                style={{
                                    background: "#0F172A",
                                    borderRadius: "24px",
                                    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                                }}
                            >
                                <p className="text-white text-base leading-relaxed mb-5 font-normal">
                                    <span className="font-serif text-2xl mr-1">&ldquo;</span>
                                    {data.quote}&rdquo;
                                </p>
                                <div>
                                    <p
                                        className="inline-block text-sm font-semibold px-2 py-0.5 rounded"
                                        style={{ background: "#0166A7", color: "#fff" }}
                                    >
                                        {data.quoteAuthor}
                                    </p>
                                    {data.quoteSubtitle && (
                                        <p className="text-gray-400 text-xs mt-1.5">
                                            {data.quoteSubtitle}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </HomeHighlightAnimations>
                    </div>

                    {/* Right Image — full width spanning both columns */}
                    <div className="col-span-2">
                        <HomeHighlightAnimations delay={0.3}>
                            {rightImageUrl && (
                                <div className="rounded-3xl overflow-hidden">
                                    <Image
                                        src={rightImageUrl}
                                        alt="Highlight right"
                                        width={700}
                                        height={800}
                                        className="w-full h-[360px] object-cover"
                                    />
                                </div>
                            )}
                        </HomeHighlightAnimations>
                    </div>
                </div>

                {/* ── Mobile layout: single-column stack ── */}
                <div className="flex flex-col gap-6 md:hidden">
                    {/* Left Image */}
                    <HomeHighlightAnimations delay={0}>
                        {leftImageUrl && (
                            <div className="rounded-3xl overflow-hidden shadow-lg">
                                <Image
                                    src={leftImageUrl}
                                    alt="Highlight left"
                                    width={800}
                                    height={900}
                                    className="w-full h-[320px] object-cover"
                                />
                            </div>
                        )}
                    </HomeHighlightAnimations>

                    {/* Statistic Card */}
                    <HomeHighlightAnimations delay={0.1}>
                        <div
                            className="px-6 py-6"
                            style={{
                                background: "#EAF5FF",
                                borderRadius: "24px",
                                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                            }}
                        >
                            {avatars.length > 0 && (
                                <div className="flex items-center mb-4">
                                    <div className="flex -space-x-3">
                                        {avatars.map((avatar: any, index: number) => {
                                            const avatarUrl = urlFor(avatar)
                                                .width(80)
                                                .height(80)
                                                .fit("crop")
                                                .url();
                                            return (
                                                <div
                                                    key={index}
                                                    className="relative w-9 h-9 rounded-full border-2 border-white overflow-hidden"
                                                    style={{ zIndex: avatars.length - index }}
                                                >
                                                    <Image
                                                        src={avatarUrl}
                                                        alt={`Student ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <p
                                className="text-2xl font-bold leading-tight"
                                style={{ color: "#0166A7" }}
                            >
                                {data.statisticNumber}
                            </p>
                            <p
                                className="text-sm font-semibold mt-1"
                                style={{ color: "#0166A7" }}
                            >
                                {data.statisticHeading}
                            </p>
                        </div>
                    </HomeHighlightAnimations>

                    {/* Quote Card */}
                    <HomeHighlightAnimations delay={0.2}>
                        <div
                            className="px-6 py-6"
                            style={{
                                background: "#0F172A",
                                borderRadius: "24px",
                                boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                            }}
                        >
                            <p className="text-white text-sm leading-relaxed mb-4 font-normal">
                                <span className="font-serif text-xl mr-1">&ldquo;</span>
                                {data.quote}&rdquo;
                            </p>
                            <div>
                                <p
                                    className="inline-block text-xs font-semibold px-2 py-0.5 rounded"
                                    style={{ background: "#0166A7", color: "#fff" }}
                                >
                                    {data.quoteAuthor}
                                </p>
                                {data.quoteSubtitle && (
                                    <p className="text-gray-400 text-xs mt-1.5">
                                        {data.quoteSubtitle}
                                    </p>
                                )}
                            </div>
                        </div>
                    </HomeHighlightAnimations>

                    {/* Right Image */}
                    <HomeHighlightAnimations delay={0.3}>
                        {rightImageUrl && (
                            <div className="rounded-3xl overflow-hidden shadow-lg">
                                <Image
                                    src={rightImageUrl}
                                    alt="Highlight right"
                                    width={700}
                                    height={800}
                                    className="w-full h-[280px] object-cover"
                                />
                            </div>
                        )}
                    </HomeHighlightAnimations>
                </div>

            </div>
        </section>
    );
}
