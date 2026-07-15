import { groq } from "next-sanity";

export const HOME_ABOUT_QUERY = groq`
  *[_type == "homeAbout"][0]{
    title,
    highlightText,
    description,
    heroImage,
    completionTitle,
    completionPercentage,
    statOneNumber,
    statOneDescription,
    statTwoNumber,
    statTwoDescription,
    buttonText,
    buttonLink
  }
`;
