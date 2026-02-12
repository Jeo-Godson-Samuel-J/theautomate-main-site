export const POPULAR_COURSES_QUERY = `*[_type == "course"] | order(title asc)[0...3] {
  title,
  "slug": slug.current,
  tagline,
  heroImage,
  students,
  hours,
  rating
}`;

export const ALL_COURSES_QUERY = `*[_type == "course" && defined(slug.current)] | order(title asc) {
  title,
  "slug": slug.current
}`;
