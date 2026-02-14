import { client, urlFor } from "@/lib/sanity.client";
import Image from "next/image";
import { notFound } from "next/navigation";

/* -----------------------------
   QUERY
----------------------------- */

const CASE_STUDY_QUERY = `
*[_type == "caseStudy" && slug.current == $slug][0]{
  title,
  clientName,
  clientDescription,
  banner,
  sections,
  results
}
`;

/* -----------------------------
   STATIC PARAMS
----------------------------- */

export async function generateStaticParams() {
    const slugs = await client.fetch(
        `*[_type == "caseStudy" && defined(slug.current)][].slug.current`
    );

    return slugs.map((slug: string) => ({ slug }));
}

/* -----------------------------
   PAGE
----------------------------- */

export default async function CaseStudyPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const study = await client.fetch(CASE_STUDY_QUERY, { slug });

    if (!study) return notFound();

    return (
        <main className="bg-white min-h-screen">

            {/* BANNER */}
            <div className="w-full border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-6 py-10">
                    <Image
                        src={urlFor(study.banner).width(1600).height(600).fit("crop").url()}
                        alt={study.title}
                        width={1600}
                        height={600}
                        className="rounded-xl w-full object-cover"
                        priority
                    />
                </div>
            </div>

            {/* ARTICLE */}
            <article className="max-w-3xl mx-auto px-6 py-16">

                {/* TITLE */}
                <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                    {study.title}
                </h1>

                {/* CLIENT */}
                {study.clientName && (
                    <p className="text-blue-600 font-medium mb-2">
                        Client: {study.clientName}
                    </p>
                )}

                {study.clientDescription && (
                    <p className="text-gray-600 mb-10">
                        {study.clientDescription}
                    </p>
                )}

                {/* SECTIONS */}
                <div className="space-y-12">
                    {study.sections?.map((section: any, index: number) => (
                        <section key={index}>
                            <h2 className="text-2xl font-semibold mb-3">
                                {section.heading}
                            </h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {section.content}
                            </p>
                        </section>
                    ))}
                </div>

                {/* RESULTS */}
                {study.results?.length > 0 && (
                    <div className="mt-16 bg-slate-50 border border-slate-200 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Key Results
                        </h3>
                        <ul className="space-y-2">
                            {study.results.map((result: string, i: number) => (
                                <li key={i} className="text-gray-700">
                                    ✓ {result}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </article>
        </main>
    );
}
