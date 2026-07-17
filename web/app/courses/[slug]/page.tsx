import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getCourseBySlug } from "@/lib/services/course.service";
import ContactCTA from "@/sections/HomeCTA";
import PlanSelector from "@/components/layout/PlanSelector";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CoursePage({ params }: Props) {
  // Next.js 15: params is a Promise — must be awaited before accessing properties.
  // Accessing params.slug synchronously returns undefined, which is why
  // $slug was never provided to the GROQ query.
  const { slug } = await params;

  const course = await getCourseBySlug(slug);

  if (!course) return notFound();

  return (

    <main>

      <section className="py-20">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-7xl font-bold text-center">
            {course.title}
          </h1>

          <div className="mt-8 flex justify-center gap-8">

            <div>
              ⭐ {course.rating}
            </div>

            <div>
              ({course.students} students)
            </div>

            <div>
              {course.instructorName}
            </div>

          </div>

        </div>

      </section>

      <section className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2">

          <Image
            src={course.thumbnail}
            alt={course.title}
            width={1200}
            height={700}
            className="rounded-3xl"
          />

          <div className="space-y-16 mt-16">

            <section>

              <h2 className="text-4xl font-bold mb-6">
                About the Course
              </h2>

              <div className="text-lg leading-9 prose prose-lg max-w-none">
                <PortableText value={course.about} />
              </div>

            </section>

            <section>

              <h2 className="text-4xl font-bold mb-6">
                What You Will Learn
              </h2>

              <ul className="space-y-3">

                {course.whatYouWillLearn.map((item, index) => (

                  <li key={index}>
                    • {item}
                  </li>

                ))}

              </ul>

            </section>

            <section>

              <h2 className="text-4xl font-bold mb-6">
                Prerequisites
              </h2>

              <ul className="space-y-3">

                {course.prerequisites.map((item, index) => (

                  <li key={index}>
                    • {item}
                  </li>

                ))}

              </ul>

            </section>

            <section>

              <h2 className="text-4xl font-bold mb-6">
                Who is this Course For?
              </h2>

              <ul className="space-y-3">

                {course.whoIsThisCourseFor.map((item, index) => (

                  <li key={index}>
                    • {item}
                  </li>

                ))}

              </ul>

            </section>

          </div>

        </div>

        <div>

          <div className="sticky top-28 rounded-3xl bg-blue-50 p-8">

            <div className="text-sm uppercase">

              {course.category}

            </div>

            <div className="text-5xl font-bold mt-4">

              ${course.price}

            </div>

            <hr className="my-8" />

            <div className="space-y-4">

              <div>
                🎥 {course.duration} on-demand videos
              </div>

              <div>
                📚 {course.modules} modules
              </div>

              <div>
                👥 {course.students} students
              </div>

              <div>
                ⭐ Certificate Included
              </div>

            </div>

            <div className="mt-10">

              <PlanSelector
                courseSlug={course.slug.current}
              />

            </div>

          </div>

        </div>

      </section>

      <ContactCTA />

    </main>

  );

}