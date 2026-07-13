import { getFAQs } from "@/lib/services/faq.services";
import HomeFAQ from "@/sections/HomeFAQ";

export default async function FAQSection() {
  let faqs;
  try {
    faqs = await getFAQs("home");
  } catch (err) {
    // getFAQs already logs the full error; render nothing rather than crash the page
    console.error("[FAQSection] Failed to load FAQs:", err);
    return null;
  }

  if (!faqs.length) return null;

  return <HomeFAQ faqs={faqs} />;
}
