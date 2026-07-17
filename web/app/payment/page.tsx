import { Suspense } from "react";
import { client } from "@/lib/sanity.client";
import PaymentPageClient from "@/sections/payment-section/PaymentPageClient";

/**
 * Server component — reads course + plan from search params, fetches both
 * from Sanity, then passes resolved data to the client-side form/checkout.
 *
 * URL shape (built by PricingCard):
 *   /payment?course=<courseSlug>&bundleId=<planId>&bundleTitle=...&amount=...&batch=...
 */

interface SearchParams {
  course?: string;
  bundleId?: string;
  bundleTitle?: string;
  amount?: string;
  batch?: string;
  name?: string;
  email?: string;
  phone?: string;
}

interface Props {
  searchParams: Promise<SearchParams>;
}

const COURSE_TITLE_QUERY = `
  *[_type=="course" && slug.current==$slug][0]{ title }
`;

const PLAN_QUERY = `
  *[_type=="plan" && _id==$planId][0]{
    _id,
    title,
    badge,
    price,
    rating,
    reviewCount,
    duration,
    batchOptions,
    coverImage,
    features[]{ title, included }
  }
`;

export default async function PaymentPage({ searchParams }: Props) {
  const params = await searchParams;

  const courseSlug  = params.course      ?? "";
  const bundleId    = params.bundleId    ?? "";
  const bundleTitle = params.bundleTitle ?? "";
  const amount      = Number(params.amount ?? 0);
  const batch       = params.batch       ?? "weekend";
  const name        = params.name        ?? "";
  const email       = params.email       ?? "";
  const phone       = params.phone       ?? "";

  // Fetch course title + plan in parallel — both are optional graceful fallbacks
  const [courseData, planData] = await Promise.all([
    courseSlug
      ? client.fetch<{ title: string } | null>(COURSE_TITLE_QUERY, { slug: courseSlug }).catch(() => null)
      : Promise.resolve(null),
    bundleId
      ? client.fetch(PLAN_QUERY, { planId: bundleId }).catch(() => null)
      : Promise.resolve(null),
  ]);

  const courseTitle = courseData?.title ?? courseSlug;
  const resolvedBundle = planData ?? null;
  const resolvedPrice  = resolvedBundle?.price ?? amount;
  const resolvedTitle  = resolvedBundle?.title ?? bundleTitle;

  return (
    <main className="min-h-screen bg-slate-50/30">
      <Suspense fallback={<div className="p-20 text-center">Loading checkout…</div>}>
        <PaymentPageClient
          courseSlug={courseSlug}
          courseTitle={courseTitle}
          bundleId={bundleId}
          bundleTitle={resolvedTitle}
          bundlePrice={resolvedPrice}
          batch={batch}
          initialName={name}
          initialEmail={email}
          initialPhone={phone}
        />
      </Suspense>
    </main>
  );
}
