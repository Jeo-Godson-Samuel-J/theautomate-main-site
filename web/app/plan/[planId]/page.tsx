import { getPlans } from "@/lib/services/plan.services";
import CourseGrid from "@/sections/courses-section/CourseGrid";
import { Plan } from "@/lib/types/plan";
import { Course } from "@/lib/types/course";

interface PlanPageProps {
  params: {
    planId: string;
  };
}

const STATIC_PLAN_COURSES: Course[] = [
  {
    _id: "static-playwright",
    title: "Playwright Automation",
    tagline: "Master modern end-to-end testing with Playwright.",
    image: "/placeholder.png",
    students: "5,000+",
    hours: "40",
    slug: "playwright",
    instructorName: "Auto-Mate Academy",
    instructorImage: undefined,
    price: 14999,
  },
  {
    _id: "static-genai",
    title: "GenAI for QA Automation",
    tagline: "Leverage AI to automate testing and generate smarter workflows.",
    image: "/placeholder.png",
    students: "3,500+",
    hours: "32",
    slug: "genai-qa",
    instructorName: "Auto-Mate Academy",
    instructorImage: undefined,
    price: 15999,
  },
  {
    _id: "static-selenium",
    title: "Selenium Automation",
    tagline: "Build robust browser automation with Selenium and JavaScript.",
    image: "/placeholder.png",
    students: "4,200+",
    hours: "36",
    slug: "selenium",
    instructorName: "Auto-Mate Academy",
    instructorImage: undefined,
    price: 13999,
  },
];

export default async function PlanPage({ params }: PlanPageProps) {
  const plans: Plan[] = await getPlans().catch(() => []);
  const planParam = params.planId;
  const normalizedPlanParam = planParam?.toLowerCase() ?? "";

  const plan = plans.find((plan) => {
    const titleSlug = plan.title
      ? plan.title.toLowerCase().replace(/\s+/g, "-")
      : "";

    return plan._id === planParam || titleSlug === normalizedPlanParam;
  });
  const courses: Course[] = STATIC_PLAN_COURSES;

  if (!plan) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl text-center">
          <h1 className="text-3xl font-bold mb-4">Plan not found</h1>
          <p className="text-slate-600">
            We could not find that plan. Please go back and select a valid plan.
          </p>
        </div>
      </div>
    );
  }

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

        <CourseGrid courses={courses} />
      </div>
    </section>
  );
}
