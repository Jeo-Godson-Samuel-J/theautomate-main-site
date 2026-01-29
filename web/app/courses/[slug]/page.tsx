import { client } from "@/lib/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import Image from "next/image";

interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

interface Highlight {
  icon?: SanityImage;
  title: string;
}

const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImage) => builder.image(source);

const COURSE_QUERY = `
*[_type == "course" && slug.current == $slug][0]{
  title,
  tagline,
  heroImage,
  rating,
  instructorName,
  instructorImage,
  price,
  duration,
  level,
  description,
  keyConcepts[]{
    title,
    description,
    icon
  },
  whoFor,
  whatYouLearn,
  outcomes,
  highlights[]{
    title,
    icon
  },
  hours,
  students,
  projects
}
`;

export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "course" && defined(slug.current)][].slug.current`
  );

  return slugs.map((slug: string) => ({ slug }));
}

/* ✅ FIX IS HERE */
export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params; // <-- unwrap params

  const course = await client.fetch(COURSE_QUERY, {
    slug,
  });

  if (!course) return notFound();

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">

      {/* HERO */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-2">
          {course.title}
        </h1>

        <p className="text-gray-600 mb-4">
          {course.tagline}
        </p>

        {course.heroImage && (
          <Image
            src={urlFor(course.heroImage).width(1200).url()}
            width={1200}
            height={600}
            alt={course.title}
            className="rounded-xl w-full"
          />
        )}
      </section>

      {/* META INFO */}
      <section className="flex gap-6 text-gray-600 mb-10">
        {course.rating && <span>⭐ {course.rating}</span>}
        {course.duration && <span>{course.duration}</span>}
        {course.level && <span>{course.level}</span>}
        {course.price && <span>₹{course.price}</span>}
      </section>

      {/* INSTRUCTOR */}
      {course.instructorName && (
        <section className="flex items-center gap-4 mb-12">
          {course.instructorImage && (
            <Image
              src={urlFor(course.instructorImage).width(80).url()}
              width={80}
              height={80}
              className="w-16 h-16 rounded-full"
              alt=""
            />
          )}
          <p className="font-medium">
            Instructor: {course.instructorName}
          </p>
        </section>
      )}

      {/* DESCRIPTION */}
      {course.description && (
        <section className="prose max-w-none mb-12">
          <h2>About this course</h2>
          <PortableText value={course.description} />
        </section>
      )}

      {/* WHAT YOU'LL LEARN */}
      {course.whatYouLearn?.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            What You&apos;ll Learn
          </h2>

          <ul className="space-y-2">
            {course.whatYouLearn.map((item: string, i: number) => (
              <li key={i}>✔ {item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* WHO FOR */}
      {course.whoFor?.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Who is this for?
          </h2>

          <ul className="space-y-2">
            {course.whoFor.map((item: string, i: number) => (
              <li key={i}>👉 {item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* OUTCOMES */}
      {course.outcomes?.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Outcomes
          </h2>

          <ul className="space-y-2">
            {course.outcomes.map((item: string, i: number) => (
              <li key={i}>🚀 {item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* HIGHLIGHTS */}
      {course.highlights?.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            Course Highlights
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {course.highlights.map((h: Highlight, i: number) => (
              <div key={i} className="flex items-center gap-3">
                {h.icon && (
                  <Image
                    src={urlFor(h.icon).width(40).url()}
                    width={40}
                    height={40}
                    alt=""
                  />
                )}
                <span>{h.title}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* STATS */}
      <section className="grid grid-cols-3 gap-6 text-center mt-16">
        {course.hours && (
          <div>
            <p className="text-3xl font-bold">
              {course.hours}
            </p>
            <p>Hours</p>
          </div>
        )}

        {course.students && (
          <div>
            <p className="text-3xl font-bold">
              {course.students}
            </p>
            <p>Students</p>
          </div>
        )}

        {course.projects && (
          <div>
            <p className="text-3xl font-bold">
              {course.projects}
            </p>
            <p>Projects</p>
          </div>
        )}
      </section>

    </main>
  );
}
