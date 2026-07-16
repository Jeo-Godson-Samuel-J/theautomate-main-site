"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity.client";
import { Plan, PlanFeature } from "@/lib/types/plan";

const FEATURE_HINTS: Record<string, string> = {
  "Live support":
    "This feature provides real-time access to instructors and mentors during lessons.",
  "Project work":
    "This feature delivers guided project assignments that you can build and complete step by step.",
  "Cross-browser testing":
    "This feature runs your automated tests across different browsers to verify compatibility.",
  "Advanced reporting":
    "This feature generates detailed reports for your test runs and shows result summaries.",
  "AI-assisted testing":
    "This feature uses AI to suggest test cases and improve coverage for your automation scripts.",
  "Quality engineering":
    "This feature includes best-practice checklists and standards for reliable automation.",
  "End-to-end architecture":
    "This feature maps the full automation workflow from user action to system validation.",
  "Performance testing":
    "This feature measures application behavior under load and captures performance metrics.",
  "Hands-on labs":
    "This feature gives you guided exercises with real code and step-by-step instructions.",
  "Mentor sessions":
    "This feature schedules one-on-one sessions with experts to review your work.",
  "Certification support":
    "This feature includes exam prep materials and practice resources for certification.",
  "Tool integration":
    "This feature connects your automation setup with popular development and collaboration tools.",
  "Debugging workflows":
    "This feature outlines a process for finding and fixing bugs in your automated tests.",
};

function getFeatureDetails(features?: PlanFeature[]) {
  if (!features?.length) return [];

  return features
    .filter((feature) => feature.included)
    .map((feature) => ({
      label: feature.title,
      detail:
        FEATURE_HINTS[feature.title] ||
        `A helpful addition that makes ${feature.title.toLowerCase()} easier and more effective.`,
    }));
}

const PLAN_BRIEFS = [
  {
    title: "Starter",
    text: "A beginner-friendly plan to launch your automation journey with confidence. It covers the essential tools, hands-on workflows, and practical examples you need to start building reliable tests.",
    points: [
      {
        label: "Core Automation Skills",
        detail:
          "Learn the fundamentals of test automation with guided demos and hands-on exercises.",
      },
      {
        label: "Workflow Building",
        detail:
          "Create practical test flows and end-to-end scenarios that reflect real-world use cases.",
      },
      {
        label: "Confidence Boost",
        detail:
          "Gain the ability to apply theory in practice and build a strong foundation in QA work.",
      },
    ],
  },
  {
    title: "Pro",
    text: "An ideal plan for learners ready to scale their automation skills. It adds real project-based challenges, advanced troubleshooting, and team-friendly techniques for more impactful testing.",
    points: [
      {
        label: "Project-Based Learning",
        detail:
          "Work through real automation scenarios and learn how to solve common testing challenges.",
      },
      {
        label: "Advanced Debugging",
        detail:
          "Use better error tracing, reporting, and optimization to improve test reliability.",
      },
      {
        label: "Team-Ready Practices",
        detail:
          "Adopt patterns and processes that make collaboration easier for cross-functional teams.",
      },
    ],
  },
  {
    title: "Premium",
    text: "A premium plan for professionals seeking scalable, leadership-ready automation. It focuses on architecture, best practices, and the strategic skills for managing complex testing initiatives.",
    points: [
      {
        label: "Strategic Architecture",
        detail:
          "Learn how to design scalable automation systems with integrations and quality control.",
      },
      {
        label: "Quality Engineering",
        detail:
          "Apply industry best practices to deliver stable, maintainable test suites.",
      },
      {
        label: "Leadership Focus",
        detail:
          "Build the mindset and tools needed to lead complex automation initiatives.",
      },
    ],
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
    points: {
      label: string;
      detail: string;
    }[];
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
        <h3 className="text-2xl font-bold text-[#1E90FF] mb-3">
          {brief.title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-base mb-6">
          {brief.text}
        </p>
        <div className="grid gap-4">
          {(plan ? getFeatureDetails(plan.features) : brief.points).map(
            (point, idx) => (
              <div
                key={`${brief.title}-point-${idx}`}
                className="rounded-[28px] border border-blue-100 bg-blue-50 p-5 shadow-sm"
              >
                <h4 className="text-sm font-semibold text-slate-900 mb-1">
                  {point.label}
                </h4>
                <p className="text-sm text-slate-700 leading-6">
                  {point.detail}
                </p>
              </div>
            ),
          )}
        </div>
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
