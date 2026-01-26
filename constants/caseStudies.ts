export interface CaseStudy {
  slug: string;
  title: string;
  image: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "inventory-control",
    title: "Streamlining Inventory Control for an E-commerce Business",
    image: "/courses-banner/inventory.jpg"
  },
  {
    slug: "unified-framework",
    title: "Unified Automation Framework for a Leading US-Based Restaurant",
    image: "/courses-banner/automation.jpg"
  },
  {
    slug: "efficiency-insurance",
    title: "Enhancing Automation Efficiency for a Digital Insurance Application",
    image: "/courses-banner/e-commerce.jpg"
  }
];
