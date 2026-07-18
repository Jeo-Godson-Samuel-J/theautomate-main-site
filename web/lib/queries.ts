export const POPULAR_COURSES_QUERY = `
*[_type == "courseDetails" && (slug.current == "playwright-automation" || slug.current == "genai-for-qa-automation" || slug.current == "selenium-automation")] | order(
  select(
    slug.current == "playwright" => 0,
    slug.current == "gen-ai" => 1,
    slug.current == "selenium" => 2,
    3
  ) asc
) {
  title,
  "slug": slug.current,
  tagline,
  heroImage,
  students,
  hours,
  rating
}[0...3]
`;

export const ALL_COURSES_QUERY = `*[_type == "courseDetails" && defined(slug.current)] | order(title asc) {
  title,
  "slug": slug.current
}`;

export const LATEST_BLOGS_QUERY = `*[_type == "blog" && defined(slug.current)] | order(publishedAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  readingTime,
  excerpt,
  coverImage,
  "contentImage": content[_type == "image"][0]
}`;
