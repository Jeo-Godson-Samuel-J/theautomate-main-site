import { notFound } from "next/navigation";
import { getCoursePlans } from "@/lib/services/course.service";
import { PricingCard } from "@/components/ui/PricingCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CoursePlansPage({ params }: Props) {
  const { slug } = await params;

  const data = await getCoursePlans(slug);

  if (!data) return notFound();

  const { title, plans } = data;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0166A7] mb-3">
            Choose Your Plan
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            {title}
          </h1>
          <p className="mt-4 text-slate-500 text-base max-w-xl mx-auto">
            Select the plan that works best for you. All plans include
            full access to the course content.
          </p>
        </div>

        {/* Plan cards — reuses existing PricingCard exactly as-is */}
        {plans && plans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PricingCard
                key={plan._id}
                bundle={plan}
                courseSlug={slug}
                /*
                  PricingCard already builds the /payment URL internally when
                  courseSlug is provided:
                  /payment?course=<slug>&bundleId=<planId>&bundleTitle=...&amount=...
                */
                buttonLabel="Buy Plan"
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 py-20 text-lg">
            No plans are assigned to this course yet. Please check back soon.
          </p>
        )}

      </section>
    </main>
  );
}
