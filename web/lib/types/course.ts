import { PortableTextBlock } from "@portabletext/types";

export interface Course {
  _id: string;

  title: string;

  slug: {
    current: string;
  };

  category: string;

  thumbnail: string;

  heroImage: string;

  shortDescription: string;

  rating: number;

  students: number;

  modules: number;

  duration: string;

  price: number;

  instructorName: string;

  instructorImage: string;

  about: PortableTextBlock[];

  whatYouWillLearn: string[];

  prerequisites: string[];

  whoIsThisCourseFor: string[];

  plans: Plan[];
}

export interface Plan {
  _id: string;

  title: string;

  price: number;

  badge: string;

  features: {
    text: string;
    included: boolean;
  }[];
}