import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/layout/Hero';
import Courses from '../components/layout/Courses';
import Testimonials from '../components/layout/Testimonials';
import Contact from '../components/layout/Contact';
import FeaturesGrid from '../components/layout/FeaturesGrid';
import StatsSection from '../components/layout/StatSection';
import Footer from '../components/layout/Footer';
import Blog from '../components/layout/Blog';
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <StatsSection />
      <FeaturesGrid />
      <Courses />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
      {/* We can add the Blog and Footer snippets next */}
    </main>
  );
}