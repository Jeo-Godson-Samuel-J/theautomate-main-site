import { client } from "@/lib/sanity.client";

import {
  COURSES_QUERY,
  COURSE_BY_SLUG_QUERY,
} from "../queries/course";

import { Course } from "../types/course";

export async function getCourses(): Promise<Course[]> {
  return client.fetch(COURSES_QUERY);
}

export async function getCourseBySlug(
  slug: string
): Promise<Course> {
  return client.fetch(COURSE_BY_SLUG_QUERY, {
    slug,
  });
}