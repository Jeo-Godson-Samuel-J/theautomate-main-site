import Blog from '@/sections/Blog';
import Courses from '@/sections/Courses';
import FeaturesGrid from '@/components/layout/Unique';
import Hero from '@/sections/Hero';
import StatsSection from '@/sections/StatSection';
import Testimonials from '@/sections/Testimonials';
import FAQSection from '@/sections/FAQSection';
import { client } from '@/lib/sanity.client';

const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(_createdAt desc) {
  name,
  text,
  "image": image.asset->url
}`;

export default async function HomePage() {
  const testimonials = await client.fetch(TESTIMONIALS_QUERY).catch(() => []);

  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturesGrid />
      <Courses />
      <StatsSection />
      <Testimonials initialData={testimonials} />
      <Blog />
      <FAQSection />
    </main>
  );
}