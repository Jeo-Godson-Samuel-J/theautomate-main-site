import Blog from '@/sections/Blog';
import Courses from '@/sections/Courses';
import FeaturesGrid from '@/sections/FeaturesGrid';
import Hero from '@/sections/Hero';
import StatsSection from '@/sections/StatSection';
import Testimonials from '@/sections/Testimonials';
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
      <StatsSection />
      <FeaturesGrid />
      <Courses />
      <Testimonials initialData={testimonials} />
      <Blog />
    </main>
  );
}