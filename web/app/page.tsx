import Blog from '@/sections/Blog';
import Contact from '@/sections/Contact';
import Courses from '@/sections/Courses';
import FeaturesGrid from '@/sections/FeaturesGrid';
import Hero from '@/sections/Hero';
import StatsSection from '@/sections/StatSection';
import Testimonials from '@/sections/Testimonials';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <StatsSection />
      <FeaturesGrid />
      <Courses />
      <Testimonials />
      <Blog />
      <Contact />
    </main>
  );
}