export const revalidate = 60;

import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "@/lib/sanity.client";

/* -----------------------------
   TYPES
----------------------------- */

interface SanityImage {
  asset: {
    _ref: string;
    _type: "reference";
  };
}

interface CaseStudy {
  _id: string;
  title: string;
  slug: { current: string };
  clientName?: string;
  clientDescription?: string;
  banner: SanityImage;
}

/* -----------------------------
   GROQ QUERY
----------------------------- */

const CASE_STUDIES_QUERY = `
*[
  _type == "caseStudy" &&
  defined(slug.current)
] | order(_createdAt desc) {
  _id,
  title,
  slug,
  clientName,
  clientDescription,
  banner
}
`;

/* -----------------------------
   PAGE
----------------------------- */

export default async function CaseStudiesPage() {
  const caseStudies: CaseStudy[] = await client.fetch(
    CASE_STUDIES_QUERY,
    {},
    { next: { revalidate: 60 } },
  );

  return (
    <main className="bg-white min-h-screen px-6 py-16 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold md:mt-12 mb-12 text-center">
        Case Studies
      </h1>

      {caseStudies.length === 0 && (
        <p className="text-center text-gray-500">
          No case studies published yet.
        </p>
      )}

      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study) => (
          <Link
            key={study._id}
            href={`/case-studies/${study.slug.current}`}
            className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            {/* BANNER IMAGE */}
            <Image
              src={urlFor(study.banner)
                .width(600)
                .height(350)
                .fit("crop")
                .url()}
              alt={study.title}
              width={600}
              height={350}
              className="w-full h-56 object-cover"
            />

            {/* CONTENT */}
            <div className="p-6 flex flex-col grow">
              <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                {study.title}
              </h2>

              {study.clientName && (
                <p className="text-sm text-blue-600 font-medium mb-2">
                  Client: {study.clientName}
                </p>
              )}

              {study.clientDescription && (
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {study.clientDescription}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
