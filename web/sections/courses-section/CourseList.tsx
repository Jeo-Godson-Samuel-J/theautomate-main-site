import { client, urlFor } from "@/lib/sanity.client";
import CourseGrid from "./CourseGrid";
export const revalidate = 60;

const COURSES_QUERY = `
*[_type == "courseDetails"]{
  _id,
  title,
  heroImage,
  students,
  hours,
  tagline,
  instructorName,
  instructorImage,
  price,
  "slug": slug.current
}
`;

export default async function CourseList() {
  const courses = await client.fetch(COURSES_QUERY);

  const priority = [
    {
      key: "playwright",
      match: (c: any) =>
        c.slug?.toLowerCase().includes("playwright") ||
        c.title?.toLowerCase().includes("playwright"),
    },
    {
      key: "genai",
      match: (c: any) =>
        c.slug?.toLowerCase().includes("genai") ||
        c.slug?.toLowerCase().includes("gen-ai") ||
        c.title?.toLowerCase().includes("genai") ||
        c.title?.toLowerCase().includes("gen ai"),
    },
    {
      key: "selenium",
      match: (c: any) =>
        c.slug?.toLowerCase().includes("selenium") ||
        c.title?.toLowerCase().includes("selenium"),
    },
  ];

  const sorted = [...courses].sort((a: any, b: any) => {
    const aIndex = priority.findIndex((p) => p.match(a));
    const bIndex = priority.findIndex((p) => p.match(b));

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return 0;
  });

  const normalizedCourses = sorted.map((course: any) => ({
    ...course,
    image: course.heroImage
      ? urlFor(course.heroImage).width(400).url()
      : "/placeholder.png",
    instructorImage: course.instructorImage
      ? urlFor(course.instructorImage).width(80).height(80).url()
      : undefined,
    students: course.students || "0+",
    hours: course.hours || "0+",
  }));

  return <CourseGrid courses={normalizedCourses} />;
}
