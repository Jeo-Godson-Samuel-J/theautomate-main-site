"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // I recommend Lucide for cleaner code

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Blog", href: "/blogs" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, center: 0 });

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
      center: linkRect.left - navRect.left + linkRect.width / 2,
    });
    setActiveIndex(index);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 px-6 py-4 md:py-8 border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center z-50">
          <Image src="/logo.svg" alt="Auto-Mate" width={120} height={40} className="w-auto h-8 md:h-10" />
        </Link>

        {/* Desktop Navigation */}
        <div
          ref={navRef}
          className="relative hidden md:flex items-center gap-8 font-medium text-black"
          onMouseLeave={() => setActiveIndex(null)}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              ref={(el) => { linkRefs.current[i] = el }}
              onMouseEnter={() => moveIndicator(i)}
              className="relative py-2 transition-colors hover:text-[#0166A7]"
            >
              {link.name}
            </Link>
          ))}

          <Button className="ml-6 bg-[#1B262C] text-white px-6 py-2 rounded-full hover:opacity-90 transition">
            Start Learning
          </Button>

          {/* Animated Jumping Dot (Desktop Only) */}
          {activeIndex !== null && (
            <span
              className="absolute -top-1 w-2 h-2 bg-[#0166A7] rounded-full transition-all duration-300 ease-out pointer-events-none"
              style={{ left: indicator.center - 4 }}
            />
          )}
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-3 z-50">
          {!isOpen && (
            <Button className="bg-[#1B262C] text-white px-4 py-2 rounded-full text-xs">
              Start Learning
            </Button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#0166A7] hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div className={`
        fixed inset-0 bg-white z-40 flex flex-col p-8 pt-24 transition-transform duration-500 ease-in-out md:hidden
        ${isOpen ? "translate-y-0" : "-translate-y-full"}
      `}>
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)} // Close menu on click
              className="text-2xl font-bold text-[#1B262C] border-b border-gray-50 pb-4 active:text-[#0166A7]"
            >
              {link.name}
            </Link>
          ))}

          <div className="mt-8 flex flex-col gap-4">
            <Button className="w-full bg-[#1B262C] text-white py-6 rounded-2xl text-lg font-bold">
              Start Learning
            </Button>
            <p className="text-center text-gray-500 text-sm">
              Level up your automation skills today.
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}