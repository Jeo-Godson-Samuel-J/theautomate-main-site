export interface HomeAbout {
  title: string;
  highlightText: string;
  description: string;
  /** Raw Sanity image reference — pass directly to urlFor() */
  heroImage: any;
  completionTitle: string;
  completionPercentage: number;
  statOneNumber: string;
  statOneDescription: string;
  statTwoNumber: string;
  statTwoDescription: string;
  buttonText: string;
  buttonLink: string;
}
