"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity.client";
import { Plan } from "@/lib/types/plan";

const PLAN_BRIEFS = [
  {
    title: "Foundation Plan",
    text: "Perfect for beginners, this plan introduces the fundamentals of automation, core tools, and guided hands-on exercises to help you build confidence quickly. It also includes clear workflows, basic test design, and support for moving from theory to real automation tasks.",
  },
  {
    title: "Growth Plan",
    text: "Built for learners ready to scale, this plan adds real-world project-focused automation, advanced debugging, and cross-browser workflows for stronger execution. You will tackle integrated testing patterns, performance checks, and the practical skills required for team-based delivery.",
  },
  {
    title: "Mastery Plan",
    text: "For professionals seeking leadership-level automation skills, this plan covers end-to-end architecture, AI-assisted testing, and scalable delivery practices. It emphasizes strategic automation design, quality engineering best practices, and the tools needed to lead complex automation efforts.",
  },
];

export default function Story() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    async function loadPlans() {
      try {
        const response = await fetch("/api/plans");
        if (!response.ok) throw new Error("Failed to fetch plans");
        const data: Plan[] = await response.json();
        setPlans(data.slice(0, 3));
      } catch (error) {
        console.error("Unable to load plans for about section", error);
      }
    }

    loadPlans();
  }, []);

  return (
    <div id="about-story-section" className="px-6 py-14 md:py-20 md:px-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-black">
        Our Plans
      </h2>
      <div className="relative max-w-7xl mx-auto">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-100 -translate-x-1/2 hidden md:block"></div>
        <div className="space-y-14">
          {PLAN_BRIEFS.map((item, index) => (
            <TimelineItem
              key={item.title}
              side={index % 2 === 1 ? "right" : "left"}
              brief={item}
              plan={plans[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineItem({
  side,
  brief,
  plan,
}: {
  side: "left" | "right";
  brief: {
    title: string;
    text: string;
  };
  plan?: Plan;
}) {
  const imageUrl = plan?.coverImage
    ? urlFor(plan.coverImage).width(1200).url()
    : "/placeholder.png";

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      className={`flex flex-col md:flex-row items-center gap-8 ${side === "right" ? "md:flex-row-reverse" : ""}`}
    >
      <div className="flex-1 order-2 md:order-1 text-center md:text-left">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white border-4 border-blue-500 shadow-lg mb-6 mx-auto md:mx-0">
          <div className="w-3.5 h-3.5 rounded-full bg-blue-500"></div>
        </div>
        <h3 className="text-2xl font-bold text-[#1E90FF] mb-3">{brief.title}</h3>
        <p className="text-gray-600 leading-relaxed text-base mb-6">{brief.text}</p>
        {plan ? (
          <div className="grid gap-3">
            {plan.features?.map((feature, idx) => (
              <div
                key={`${feature.title}-${idx}`}
                className={`rounded-3xl border px-5 py-4 text-sm shadow-sm ${
                  feature.included
                    ? "border-blue-100 bg-blue-50 text-slate-800"
                    : "border-slate-200 bg-slate-50 text-slate-400"
                }`}
              >
                {feature.included ? "• " : "✕ "}
                {feature.title}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-gray-200 bg-gray-50 px-5 py-6 text-sm text-gray-500">
            Loading plan details...
          </div>
        )}
      </div>

      <div className="flex-1 order-1 md:order-2">
        <div className="relative overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-xl min-h-[320px]">
          <Image
            src={imageUrl}
            alt={`${brief.title} image`}
            width={1200}
            height={800}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </motion.div>
  );
}
