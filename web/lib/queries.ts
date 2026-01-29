export const COURSE_BY_SLUG_QUERY = `
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

  keyConcepts[]{
    title,
    description,
    icon
  },

  description,

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
