'use client';
import React from 'react';

const blogs = [
    {
        title: "Why page.goto() will slow down playwright tests?",
        date: "13 Dec 2024",
        image: "/image1.png",
    },
    {
        title: "How to use chatgpt to write a Playwright code",
        date: "20 Dec 2024",
        image: "/image2.png",
    },
    {
        title: "Building a Robust Test Automation Framework",
        date: "10 Jan 2025",
        image: "/image3.png",
    }
];

export default function Blog() {
    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Latest Blog Posts & Guides</h2>
                <p className="text-gray-500 mb-12">Fresh guides, reviews & verified deals - Read our latest posts.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {blogs.map((post, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="overflow-hidden rounded-[40px] mb-6">
                                <img src={post.image} alt={post.title} className="w-full h-64 object-cover group-hover:scale-105 transition duration-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-4 leading-tight group-hover:text-brand-blue transition">
                                {post.title}
                            </h3>
                            <div className="flex flex-col gap-3 text-sm text-gray-400">
                                <span className="flex gap-1">📅 {post.date}</span>
                                <span className="flex gap-1"><img src="user.png" alt='user' />Name Name</span>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="mt-16 bg-brand-dark text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-opacity-90">
                    See more
                </button>
            </div>
        </section>
    );
}