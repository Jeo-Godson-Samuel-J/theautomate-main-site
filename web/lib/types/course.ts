export interface Course {
  _id: string;
  title: string;
  tagline?: string;
  image?: string;
  students?: string | number;
  hours?: string | number;
  slug: string;
  instructorName?: string;
  instructorImage?: string;
  price?: number;
}
