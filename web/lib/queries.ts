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

export const LATEST_BLOGS_QUERY = `*[_type == "blog" && defined(slug.current)] | order(publishedAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  coverImage,
  "contentImage": content[_type == "image"][0]
}`;
