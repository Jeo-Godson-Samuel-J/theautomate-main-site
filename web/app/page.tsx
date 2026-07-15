import Blog from '@/sections/Blog';
import Courses from '@/sections/Courses';
import Hero from '@/sections/Hero';
import HomeAbout from '@/sections/HomeAbout';
import HomeCTA from '@/sections/HomeCTA';
import Testimonials from '@/sections/Testimonials';
import FAQSection from '@/sections/FAQSection';
import HomeHighlight from '@/sections/HomeHighlight';
import { client } from '@/lib/sanity.client';

const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(_createdAt desc) {
  name,
  text,
  "image": image.asset->url
}`;

export default async function HomePage() {
  const testimonials = await client.fetch(TESTIMONIALS_QUERY).catch(() => []);

  return (
    <div className="min-h-screen">
      <Hero />
      <HomeHighlight />
      <Courses />
      <HomeAbout />
      <Testimonials initialData={testimonials} />
      <Blog />
      <FAQSection />
      <HomeCTA />
    </div>
  );
}