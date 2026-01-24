"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    center: 0,
  });

  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const moveIndicator = (index: number) => {
    const nav = navRef.current;
    const link = linkRefs.current[index];
    if (!nav || !link) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    setIndicator({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
      center:
        linkRect.left -
        navRect.left +
        linkRect.width / 2,
    });

    setActiveIndex(index);
  };

  const clearIndicator = () => {
    setActiveIndex(null);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/60 backdrop-blur-lg z-50 px-6 py-8 border-b border-white/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="Auto-Mate" width={150} height={150} />
        </Link>

        {/* Desktop Navigation */}
        <div
          ref={navRef}
          className="relative hidden md:flex items-center gap-8 font-medium text-black"
          onMouseLeave={clearIndicator}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              ref={(el) => {linkRefs.current[i] = el}}
              onMouseEnter={() => moveIndicator(i)}
              className="relative py-2 transition-colors hover:text-brand-blue"
            >
              {link.name}
            </Link>
          ))}

          {/* CTA */}
          <button className="ml-6 bg-brand-dark text-white px-6 py-2 rounded-full hover:opacity-90 transition">
            Start Learning
          </button>

          {/* Animated Underline */}
          {activeIndex !== null && (
            <>

              {/* Jumping Dot (above text) */}
              <span
                className="absolute -top-1.5 w-2.5 h-2.5 bg-brand-blue rounded-full
                           transition-all duration-300 ease-in-out"
                style={{
                  left: indicator.center - 5,
                }}
              />
            </>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-4">
          <button className="bg-brand-dark text-white px-4 py-2 rounded-full text-sm">
            Start Learning
          </button>

          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d={
                  isOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
