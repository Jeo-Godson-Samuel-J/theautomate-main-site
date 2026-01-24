"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <img src="/logo.svg" alt="Auto-Mate" className="h-10 w-auto" />

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 font-medium">
                    <Link href="/" className="border-b-2 border-brand-blue">Home</Link>
                    <Link href="/courses">Courses</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                    <button className="bg-brand-dark text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition">
                        Start Learning
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} strokeWidth="2" strokeLinecap="round" /></svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white p-6 flex flex-col gap-4 shadow-xl">
                    <Link href="/">Home</Link>
                    <Link href="/courses">Courses</Link>
                    <Link href="/contact">Contact</Link>
                    <button className="bg-brand-dark text-white py-3 rounded-xl">Start Learning</button>
                </div>
            )}
        </nav>
    );
}