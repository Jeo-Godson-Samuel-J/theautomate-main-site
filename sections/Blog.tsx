'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface BlogPost {
  title: string;
  date: string;
  image: string;
  author?: string;
}

const BLOG_AUTHOR = 'John Doe';
const BLOG_AUTHOR_AVATAR = '/user.png';

const blogs: BlogPost[] = [
  {
    title: "Why page.goto() will slow down playwright tests?",
    date: "2024-12-13",
    image: "/image1.png",
  },
  {
    title: "How to use chatgpt to write a Playwright code",
    date: "2024-12-20",
    image: "/image2.png",
  },
  {
    title: "Building a Robust Test Automation Framework",
    date: "2025-01-10",
    image: "/image3.png",
  }
];

export default function Blog() {
  return (
    <section className="py-20 px-6 bg-white text-black">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Latest Blog Posts & Guides</h2>
        <p className="text-gray-500 mb-12">Fresh guides, reviews & verified deals - Read our latest posts.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left text-black">
          {blogs.map((post, i) => (
            <div key={i} className="group cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="overflow-hidden rounded-[40px] mb-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={256}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 leading-tight group-hover:text-brand-blue transition">
                {post.title}
              </h3>
              <div className="flex flex-col gap-3 text-sm" aria-label="Post metadata">
                <time
                  dateTime={post.date}
                  className="flex items-center gap-1"
                  title={`Published on ${new Date(post.date).toLocaleDateString('en-US', { dateStyle: 'long' })}`}
                >
                  📅 {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                </time>
                <div className="flex items-center gap-2">
                  <Image
                    src={BLOG_AUTHOR_AVATAR}
                    alt={`${BLOG_AUTHOR}'s avatar`}
                    width={16}
                    height={16}
                    className="rounded-full"
                  />
                  <span>{BLOG_AUTHOR}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-16 bg-brand-dark text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-brand-blue shadow-lg">
          See more
        </Button>
      </div>
    </section>
  );
}