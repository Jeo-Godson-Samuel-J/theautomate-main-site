import React from "react";
import Image from "next/image";
/* Import social icons from lucide-react or use SVGs */
import { Instagram, Linkedin, Send, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#1B262C] text-white pt-32 pb-10 px-6 md:px-12 font-sans">
      <div className="mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 pb-16 pt-20 lg:grid-cols-12 gap-12 md:pt-0">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <Image
                src="/footer-logo.png"
                alt="Auto-Mate"
                width={180}
                height={100}
                className="h-10 md:h-12"
              />
            </div>
            {/* Right Side: Social Icons & Links */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Social Icons */}
              <div className="flex flex-wrap items-start gap-2">
                <a
                  href="https://www.instagram.com/the.auto_mate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-white/10 hover:bg-white/5 cursor-pointer"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/theauto-mate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-white/10 hover:bg-white/5 cursor-pointer"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://www.youtube.com/@the.auto-mate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-white/10 hover:bg-white/5 cursor-pointer"
                >
                  <Image
                    src="/icons/youtube.png"
                    alt="YouTube"
                    width={20}
                    height={20}
                    className="invert brightness-0"
                  />
                </a>
                <a
                  href="https://t.me/theautomate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-white/10 hover:bg-white/5 cursor-pointer"
                >
                  <Send size={20} />
                </a>
                <a
                  href="https://wa.me/919361142819"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-white/10 hover:bg-white/5 cursor-pointer"
                >
                  {" "}
                  <Image
                    src="/icons/whatsapp.png"
                    alt="WhatsApp"
                    width={20}
                    height={20}
                    className=""
                  />
                </a>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
                Auto-Mate empowers professionals to master automation testing
                and advanced software skills. We equip you not just to adapt to
                the future of tech, but to define it.
              </p>
              <p className="font-bold text-lg">Lead next</p>
            </div>
          </div>
          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-7 gap-12">
            <div className="lg:col-span-3">
              <h4 className="font-bold mb-6 text-white uppercase text-lg tracking-widest whitespace-nowrap">
                Company
              </h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer">
                  <Link href="/">Home</Link>
                </li>
                <li className="hover:text-white cursor-pointer">
                  <Link href="/courses">Courses</Link>
                </li>
                <li className="hover:text-white cursor-pointer">
                  <Link href="/blogs">Blog</Link>
                </li>
                <li className="hover:text-white cursor-pointer">
                  <Link href="/about">About</Link>
                </li>
                <li className="hover:text-white cursor-pointer">
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="sm:col-span-4">
              <h4 className="font-bold mb-6 text-white uppercase text-lg tracking-widest whitespace-nowrap">
                Legal Information
              </h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer">Disclaimer</li>
                <li className="hover:text-white cursor-pointer">
                  Privacy Policy
                </li>
                <li className="hover:text-white cursor-pointer">
                  Terms & Conditions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
