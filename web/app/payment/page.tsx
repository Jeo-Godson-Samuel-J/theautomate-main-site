"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Plan } from "@/lib/types/plan";
import PaymentDetails from "@/sections/payment-section/PaymentDetails";
import OrderSummary from "@/sections/payment-section/OrderSummary";

interface Course {
  title: string;
  slug: string;
}

const STATIC_COURSES: Course[] = [
  {
    title: "WebDriverIO – Advanced JavaScript Automation",
    slug: "webdriverio-advanced",
  },
  {
    title: "TestCafe – Modern JavaScript E2E Testing",
    slug: "testcafe-modern",
  },
  { title: "Tricentis Tosca", slug: "tricentis-tosca" },
  { title: "Appium – Mobile Automation", slug: "appium-mobile" },
  { title: "REST API Automation", slug: "rest-api" },
  { title: "Selenium Automation", slug: "selenium" },
  { title: "Full-Stack Automation", slug: "full-stack" },
  { title: "GenAI for QA Automation", slug: "genai-qa" },
  { title: "Playwright Automation", slug: "playwright" },
  { title: "SDET – Software Development Engineer in Test", slug: "sdet" },
];

interface PaymentContentProps {
  plans: Plan[];
}

function PaymentContent({ plans }: PaymentContentProps) {
  const searchParams = useSearchParams();
  const initialCourseSlug = searchParams.get("course") || "";
  const initialName = searchParams.get("name") || "";
  const initialEmail = searchParams.get("email") || "";
  const initialPhone = searchParams.get("phone") || "";
  const initialBundleId = searchParams.get("bundleId") || "";
  const initialBatch = searchParams.get("batch") || "weekend";

  const [courseKey, setCourseKey] = useState(
    initialCourseSlug || STATIC_COURSES[0].slug,
  );
  const [bundleId, setBundleId] = useState(initialBundleId);
  const [batch, setBatch] = useState(initialBatch);
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [comments, setComments] = useState("");
  const [plansLoaded, setPlansLoaded] = useState(false);

  useEffect(() => {
    const courseFromParams = searchParams.get("course");
    if (courseFromParams) {
      setCourseKey(courseFromParams);
    }
  }, [searchParams]);

  useEffect(() => {
    if (plans.length > 0) {
      setPlansLoaded(true);
      if (!bundleId) {
        setBundleId(plans[0]._id);
      }
    }
  }, [plans, bundleId]);

  const selectedCourse =
    STATIC_COURSES.find((c) => c.slug === courseKey) || STATIC_COURSES[0];
  const selectedBundle =
    plans.find((bundle) => bundle._id === bundleId) || plans[0] || null;
  const bundleTitle = selectedBundle?.title || "";
  const bundlePrice = selectedBundle?.price ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="mb-12 text-center lg:text-left">
        <h1
          className="text-3xl sm:text-4xl md:text-6xl font-bold bg-clip-text text-transparent 
                         bg-gradient-to-r from-[#0A3D62] via-[#1E90FF] to-[#0A3D62] leading-tight pb-2"
        >
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
            bundleId={bundleId}
            setBundleId={setBundleId}
            bundles={plans}
            bundleTitle={bundleTitle}
            bundlePrice={bundlePrice}
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
            bundleTitle={bundleTitle}
            customAmount={bundlePrice}
            batch={batch}
            userData={{ name, email, phone, comments }}
          />
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    async function loadPlans() {
      try {
        const response = await fetch("/api/plans");
        if (!response.ok) {
          throw new Error("Failed to load plans");
        }
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error("Error loading plans:", error);
      }
    }

    loadPlans();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50/30">
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentContent plans={plans} />
      </Suspense>
    </main>
  );
}
