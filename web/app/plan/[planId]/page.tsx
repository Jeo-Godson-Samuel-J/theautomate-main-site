import { notFound } from "next/navigation";
import { getPlans } from "@/lib/services/plan.services";
import CourseGrid from "@/sections/courses-section/CourseGrid";
import { Plan } from "@/lib/types/plan";

interface PlanPageProps {
  params: Promise<{
    planId: string;
  }>;
}

/**
 * Static placeholder courses shown under a plan.
 * TODO: Replace with a Sanity query that finds courses referencing this plan.
 */
const STATIC_PLAN_COURSES = [
  {
    _id: "static-playwright",
    title: "Playwright Automation",
    tagline: "Master modern end-to-end testing with Playwright.",
    image: "/placeholder.png",
    students: 5000,
    hours: 40,
    slug: "playwright",
  },
  {
    _id: "static-genai",
    title: "GenAI for QA Automation",
    tagline: "Leverage AI to automate testing and generate smarter workflows.",
    image: "/placeholder.png",
    students: 3500,
    hours: 32,
    slug: "genai-qa",
  },
  {
    _id: "static-selenium",
    title: "Selenium Automation",
    tagline: "Build robust browser automation with Selenium and JavaScript.",
    image: "/placeholder.png",
    students: 4200,
    hours: 36,
    slug: "selenium",
  },
];

export default async function PlanPage({ params }: PlanPageProps) {
  const { planId: planParam } = await params;

  const plans: Plan[] = await getPlans().catch(() => []);
  const normalizedPlanParam = planParam?.toLowerCase() ?? "";

  const plan = plans.find((plan) => {
    const titleSlug = plan.title
      ? plan.title.toLowerCase().replace(/\s+/g, "-")
      : "";

    return plan._id === planParam || titleSlug === normalizedPlanParam;
  });

  if (!plan) return notFound();

  return (
    <section className="py-16 md:py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-blue font-semibold">
            Plan Courses
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-slate-900">
            {plan.title}
          </h1>
          <p className="mt-4 text-slate-600 max-w-3xl mx-auto">
            Explore all courses included with this plan.
          </p>
        </div>

        <CourseGrid courses={STATIC_PLAN_COURSES} />
      </div>
    </section>
  );
}
