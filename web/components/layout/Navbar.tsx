"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Blog", href: "/blogs" },
  { name: "Case Studies", href: "/case-studies" },
];

export default function Navbar() {
  const pathname = usePathname();
  const currentRouteIndex = navLinks.findIndex((link) => {
    if (link.href === "/") return pathname === "/";
    return pathname?.startsWith(link.href);
  });
  const defaultIndex = currentRouteIndex !== -1 ? currentRouteIndex : null;

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const trail1Ref = useRef<HTMLSpanElement>(null);
  const trail2Ref = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Ensure the indicator is positioned correctly on mount and resize
    const timer = setTimeout(() => {
      moveIndicator(defaultIndex);
    }, 50);

    const handleResize = () => {
      moveIndicator(defaultIndex);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [defaultIndex, pathname]);

  const { contextSafe } = useGSAP({ scope: navRef });

  const moveIndicator = contextSafe((index: number | null) => {
    const pill = pillRef.current;
    const t1 = trail1Ref.current;
    const t2 = trail2Ref.current;
    
    if (!pill || !t1 || !t2) return;

    if (index === null) {
      gsap.to([pill, t1, t2], { opacity: 0, duration: 0.3, overwrite: "auto" });
      linkRefs.current.forEach((el) => {
        if (el) gsap.to(el, { color: "#1e293b", duration: 0.3, overwrite: "auto" });
      });
      return;
    }

    const nav = navRef.current;
    const link = linkRefs.current[index];
    if (!nav || !link) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    gsap.to([pill, t1, t2], {
      left: linkRect.left - navRect.left,
      top: linkRect.top - navRect.top,
      width: linkRect.width,
      height: linkRect.height,
      opacity: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.6)",
      stagger: 0.04,
      overwrite: "auto",
    });

    linkRefs.current.forEach((el, i) => {
      if (el) {
        gsap.to(el, {
          color: i === index ? "#ffffff" : "#1e293b",
          duration: 0.3,
          overwrite: "auto",
        });
      }
    });
  });

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-[60] px-3 pt-3 sm:px-4 md:px-6 md:pt-4">
        <div
          className={`mx-auto flex h-[72px] w-[min(92vw,1480px)] items-center rounded-full border border-white/20 px-3 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 md:h-[78px] md:px-8 ${
            scrolled
              ? "mt-2 bg-white/22 shadow-[0_12px_45px_rgba(0,0,0,0.12)]"
              : "mt-3 bg-white/12"
          }`}
        >
          <div className="relative flex w-full items-center">
            <Link href="/" className="z-50 flex items-center pr-4">
              <Image
                src="/logo.svg"
                alt="Auto-Mate"
                width={120}
                height={40}
                className="h-8 w-auto md:h-10"
              />
            </Link>

            {/* Hidden SVG Gooey filter definition */}
            <svg
              style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
            >
              <defs>
                <filter id="goo">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="goo"
                  />
                  <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
              </defs>
            </svg>

            <div
              ref={navRef}
              className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full p-1 md:flex"
              onMouseLeave={() => moveIndicator(defaultIndex)}
            >
              {/* Gooey Background Container - ONLY for blobs */}
              <div 
                className="pointer-events-none absolute inset-0 z-0" 
                style={{ filter: "url(#goo)" }}
              >
                <span ref={pillRef} className="absolute rounded-full bg-[#0166A7] opacity-0" />
                <span ref={trail1Ref} className="absolute rounded-full bg-[#0166A7] opacity-0" />
                <span ref={trail2Ref} className="absolute rounded-full bg-[#0166A7] opacity-0" />
              </div>

              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  ref={(el) => {
                    linkRefs.current[i] = el;
                  }}
                  onMouseEnter={() => moveIndicator(i)}
                  onFocus={() => moveIndicator(i)}
                  onBlur={() => moveIndicator(defaultIndex)}
                  className="group relative z-10 px-4 py-2 text-[16px] font-medium tracking-[0.2px] text-slate-800/90"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-2 md:gap-3">
              <Button
                asChild
                className="rounded-full bg-[#0166A7] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(1,102,167,0.25)] transition-all duration-250 hover:scale-[1.03] hover:brightness-110"
              >
                <Link href="/contact">Contact</Link>
              </Button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center rounded-full bg-white/20 p-2.5 text-slate-800 shadow-sm backdrop-blur-md transition-all hover:bg-white/40 md:hidden"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        id="mobile-nav-menu"
        className={`fixed inset-0 z-40 flex flex-col bg-slate-950/20 px-4 pb-8 pt-24 transition-all duration-500 ease-in-out md:hidden ${
          isOpen
            ? "translate-y-0 opacity-100 visible pointer-events-auto"
            : "-translate-y-full opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[440px] flex-col rounded-[2rem] border border-white/25 bg-white/15 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.25)] backdrop-blur-2xl">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-white/20 pb-4 text-[1.05rem] font-semibold text-slate-800 transition-colors duration-200 active:text-[#0166A7]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <Button asChild className="w-full rounded-full bg-[#0166A7] py-6 text-lg font-semibold text-white shadow-[0_10px_24px_rgba(1,102,167,0.25)]">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </Button>
            <p className="text-center text-sm text-slate-600">
              Get in touch with us today.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
