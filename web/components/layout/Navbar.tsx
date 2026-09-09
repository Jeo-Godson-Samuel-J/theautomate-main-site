"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { ShoppingCart, User, LogOut, MessageSquare } from 'lucide-react';
import { getCart } from "@/lib/services/cart";
import { useAuth } from "@/contexts/AuthContext";

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
  const [isVisible, setIsVisible] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  
  const { isLoggedIn, user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const trail1Ref = useRef<HTMLSpanElement>(null);
  const trail2Ref = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      moveIndicator(defaultIndex);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [defaultIndex, moveIndicator]);

  useEffect(() => {
    // Recalculate at intervals during/after the transition to ensure the pill adjusts smoothly
    const steps = [0, 100, 300, 500, 750];
    const timers = steps.map((delay) =>
      setTimeout(() => {
        moveIndicator(defaultIndex);
      }, delay)
    );

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [isVisible, scrolled, defaultIndex, pathname, moveIndicator]);

  useEffect(() => {
    const updateCount = () => setCartCount(getCart().length);
    updateCount();
    window.addEventListener("cart-updated", updateCount);
    return () => window.removeEventListener("cart-updated", updateCount);
  }, []);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-[60] pt-3 sm:px-4 md:px-6 md:pt-4 pointer-events-none flex justify-center">
        <div className="mx-auto flex w-full max-w-[1480px] px-3 sm:px-0 justify-start pointer-events-auto">
          <div
            className={`flex h-[72px] items-center rounded-full border border-slate-200/80 bg-slate-50/80 backdrop-blur-xl px-3 shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:h-[78px] md:px-8 overflow-visible ${scrolled
              ? "mt-2 shadow-[0_12px_45px_rgba(0,0,0,0.1)] border-slate-300/80 bg-white/90"
              : "mt-3"
              } ${isVisible ? "w-[min(92vw,1480px)] sm:w-full" : "w-[160px] md:w-[230px]"
              }`}
          >
            <div className="relative flex w-full items-center justify-between">
              <Link href="/" className="z-50 flex shrink-0 items-center pr-4">
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
                className={`absolute left-1/2 -translate-x-1/2 items-center gap-2 rounded-full p-1 hidden md:flex transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50 -translate-x-[150%] pointer-events-none"
                  }`}
              >
                <div ref={navRef} className="relative flex items-center gap-2" onMouseLeave={() => moveIndicator(defaultIndex)}>
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
              </div>
              <div className={`ml-auto flex shrink-0 items-center gap-2 md:gap-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-20 scale-75 pointer-events-none"
                }`}>
                <Link href="/cart" className="relative">
                  <ShoppingCart className="w-6 h-6 text-slate-800 cursor-pointer hover:text-[#0166A7] transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white shadow-sm border-2 border-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
                
                {isLoggedIn ? (
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-[#0166A7] hover:bg-slate-200 transition-colors"
                    >
                      <User size={20} />
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-white p-2 shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col pointer-events-auto">
                        <div className="px-3 py-2 border-b border-slate-50 mb-1">
                          <p className="text-sm font-semibold text-slate-900 truncate">{user?.name}</p>
                          <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                        </div>
                        <Link
                          href="/contact"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0166A7] transition-colors"
                        >
                          <MessageSquare size={16} />
                          Contact
                        </Link>
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            setShowLogoutAlert(true);
                          }}
                          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Button
                    asChild
                    className="rounded-full bg-[#0166A7] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(1,102,167,0.25)] transition-all duration-250 hover:scale-[1.03] hover:brightness-110"
                  >
                    <Link href="/contact">Contact</Link>
                  </Button>
                )}
                
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
        </div>
      </nav>

      <div
        id="mobile-nav-menu"
        className={`fixed inset-0 z-40 flex flex-col bg-slate-950/20 px-4 pb-8 pt-24 transition-all duration-500 ease-in-out md:hidden ${isOpen
          ? "translate-y-0 opacity-100 visible pointer-events-auto"
          : "-translate-y-full opacity-0 invisible pointer-events-none"
          }`}
      >
        <div className="mx-auto flex w-full max-w-[440px] flex-col rounded-[2.5rem] border border-slate-100 bg-white p-6 shadow-[0_20px_80px_rgba(15,23,42,0.15)]">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-slate-100 pb-4 text-[1.05rem] font-semibold text-slate-800 transition-colors duration-200 active:text-[#0166A7]"
              >
                {link.name}
              </Link>
            ))}
          </div>

            <div className="mt-8 flex flex-col gap-4">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-3 px-2 border-b border-slate-100 pb-4 mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-[#0166A7]">
                    <User size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900">{user?.name}</span>
                    <span className="text-xs text-slate-500">{user?.email}</span>
                  </div>
                </div>
                <Button asChild className="w-full rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 py-6 text-lg font-semibold shadow-none">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Contact Support
                  </Link>
                </Button>
                <Button 
                  onClick={() => { setIsOpen(false); setShowLogoutAlert(true); }}
                  className="w-full rounded-full bg-red-50 text-red-600 hover:bg-red-100 py-6 text-lg font-semibold shadow-none"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild className="w-full rounded-full bg-[#0166A7] py-6 text-lg font-semibold text-white shadow-[0_10px_24px_rgba(1,102,167,0.25)]">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Contact
                  </Link>
                </Button>
                <p className="text-center text-sm text-slate-600">
                  Get in touch with us today.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <LogoutModal 
        isOpen={showLogoutAlert} 
        onClose={() => setShowLogoutAlert(false)} 
        onConfirm={() => {
          setShowLogoutAlert(false);
          logout();
        }} 
      />
    </>
  );
}

export function LogoutModal({ isOpen, onClose, onConfirm }: { isOpen: boolean, onClose: () => void, onConfirm: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div 
        className="w-full max-w-[400px] rounded-[24px] bg-white p-8 shadow-2xl"
        style={{ animation: "authModalIn 0.2s cubic-bezier(0.34,1.46,0.64,1) both" }}
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
          <LogOut size={28} />
        </div>
        <h3 className="text-center text-xl font-bold text-slate-900 mb-2">Are you sure?</h3>
        <p className="text-center text-sm text-slate-500 mb-8 leading-relaxed">
          You are about to log out of your account. You will need to sign in again to access your courses.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-[14px] bg-slate-100 px-4 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-[14px] bg-red-600 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(220,38,38,0.3)] hover:bg-red-700 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
