import { client } from "@/lib/sanity.client";

import {
  COURSES_QUERY,
  COURSE_BY_SLUG_QUERY,
  COURSE_PLANS_QUERY,
} from "../queries/course";

import { Course } from "../types/course";
import { Plan } from "../types/plan";

export async function getCourses(): Promise<Course[]> {
  return client.fetch(COURSES_QUERY);
}

export async function getCourseBySlug(
  slug: string
): Promise<Course | null> {
  return client.fetch(COURSE_BY_SLUG_QUERY, { slug });
}

export interface CoursePlans {
  _id: string;
  title: string;
  slug: string;
  plans: Plan[];
}

/**
 * Returns the course title + the full Plan documents referenced by that
 * course — exactly what the /course-plans/[slug] page needs.
 * Uses a single GROQ query; no second fetch required.
 */
export async function getCoursePlans(
  slug: string
): Promise<CoursePlans | null> {
  return client.fetch(COURSE_PLANS_QUERY, { slug });
}