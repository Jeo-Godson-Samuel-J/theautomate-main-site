"use client";

/**
 * FloatingStudents
 * ─────────────────
 * Renders four student avatars in themed shape containers with GSAP float.
 * Shared between Hero and HomeCTA.
 *
 * variant "light" → positions suit a white/light section
 * variant "dark"  → positions suit the midnight-blue CTA card
 *
 * IMPORTANT: the parent element must have  position: relative  and
 * overflow: visible (or hidden if desired) so the absolutes land correctly.
 */

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export interface FloatingStudentsProps {
  variant?: "light" | "dark";
}

/* ─────────────────────────────────────────────────────────────
   Shape styles
   We use inline style for shapes that Tailwind can't express
   with a single utility class (hexagon, pentagon).
───────────────────────────────────────────────────────────── */
type ShapeKey = "square" | "circle" | "hexagon" | "pentagon";

function getShapeStyle(shape: ShapeKey): React.CSSProperties {
  switch (shape) {
    case "square":
      // slightly rounded square
      return { borderRadius: "22%" };
    case "circle":
      return { borderRadius: "50%" };
    case "hexagon":
      // classic CSS hexagon via clip-path
      return {
        clipPath:
          "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
        borderRadius: "0",
      };
    case "pentagon":
      return {
        clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
        borderRadius: "0",
      };
  }
}

/* ─────────────────────────────────────────────────────────────
   Per-image config
───────────────────────────────────────────────────────────── */
interface FloatConfig {
  src: string;
  shape: ShapeKey;
  /** Tailwind background colour class */
  bg: string;
  /** Tailwind w-* h-* sizing */
  size: string;
  /** Tailwind absolute positioning — relative to the SECTION */
  pos: string;
  /* GSAP */
  yAmt: number;
  xAmt: number;
  rot: number;
  dur: number;
  delay: number;
}

/**
 * LIGHT variant (Hero section)
 *
 * Reference layout (see inspiration image):
 *   img-1 (square,   light-blue)  → top-left,  vertically near h1 line 1
 *   img-2 (circle,   salmon/coral)→ bottom-left, near buttons row
 *   img-3 (hexagon,  coral/peach) → top-right,  near h1 line 1
 *   img-4 (pentagon, teal)        → bottom-right, near buttons row
 *
 * The section content is max-w-3xl (≈768px) centered.
 * We position images so they sit just beside the text — not at the
 * very screen edge — by using percentage values anchored to the
 * section width and carefully chosen left/right offsets.
 */
const LIGHT_CONFIGS: FloatConfig[] = [
  {
    // TOP-LEFT — square, light blue
    src: "/images/heroImg-1.png",
    shape: "square",
    bg: "bg-[#EAF6FF]",
    size: "w-[88px] h-[88px] md:w-[108px] md:h-[108px]",
    pos: "top-[14%] left-[1%] md:left-[2%] lg:left-[4%]",
    yAmt: 10, xAmt: 4, rot: 5,  dur: 5.2, delay: 0,
  },
  {
    // BOTTOM-LEFT — circle, coral
    src: "/images/heroImg-2.png",
    shape: "circle",
    bg: "bg-[#FFDED4]",
    size: "w-[80px] h-[80px] md:w-[96px] md:h-[96px]",
    pos: "bottom-[24%] left-[2%] md:left-[3%] lg:left-[5%]",
    yAmt: 12, xAmt: 6, rot: -6, dur: 6.0, delay: 0.7,
  },
  {
    // TOP-RIGHT — hexagon, peach
    src: "/images/heroImg-3.png",
    shape: "hexagon",
    bg: "bg-[#FFE5D4]",
    size: "w-[80px] h-[80px] md:w-[96px] md:h-[96px]",
    pos: "top-[14%] right-[1%] md:right-[2%] lg:right-[4%]",
    yAmt: 14, xAmt: -5, rot: 4, dur: 5.8, delay: 0.4,
  },
  {
    // BOTTOM-RIGHT — pentagon, teal
    src: "/images/heroImg-4.png",
    shape: "pentagon",
    bg: "bg-[#CCFAF0]",
    size: "w-[88px] h-[88px] md:w-[108px] md:h-[108px]",
    pos: "bottom-[24%] right-[2%] md:right-[3%] lg:right-[5%]",
    yAmt: 10, xAmt: -6, rot: -5, dur: 6.4, delay: 1.1,
  },
];

/** DARK variant (HomeCTA card) — same shapes, adjusted palette + positions */
const DARK_CONFIGS: FloatConfig[] = [
  {
    src: "/images/heroImg-1.png",
    shape: "square",
    bg: "bg-[#EAF6FF]",
    size: "w-[80px] h-[80px] md:w-[100px] md:h-[100px]",
    pos: "top-[14%] left-[3%] md:left-[5%]",
    yAmt: 10, xAmt: 4, rot: 5,  dur: 5.2, delay: 0,
  },
  {
    src: "/images/heroImg-2.png",
    shape: "circle",
    bg: "bg-white",
    size: "w-[70px] h-[70px] md:w-[88px] md:h-[88px]",
    pos: "bottom-[18%] left-[4%] md:left-[7%]",
    yAmt: 12, xAmt: 6, rot: -6, dur: 6.0, delay: 0.7,
  },
  {
    src: "/images/heroImg-3.png",
    shape: "hexagon",
    bg: "bg-[#1a3a6b]",
    size: "w-[76px] h-[76px] md:w-[96px] md:h-[96px]",
    pos: "top-[14%] right-[3%] md:right-[5%]",
    yAmt: 14, xAmt: -5, rot: 4, dur: 5.8, delay: 0.4,
  },
  {
    src: "/images/heroImg-4.png",
    shape: "pentagon",
    bg: "bg-[#0a5c4a]",
    size: "w-[80px] h-[80px] md:w-[100px] md:h-[100px]",
    pos: "bottom-[16%] right-[4%] md:right-[7%]",
    yAmt: 10, xAmt: -6, rot: -5, dur: 6.4, delay: 1.1,
  },
];

/* ─────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────── */
export default function FloatingStudents({
  variant = "light",
}: FloatingStudentsProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const configs = variant === "dark" ? DARK_CONFIGS : LIGHT_CONFIGS;

  useGSAP(
    () => {
      if (!scopeRef.current) return;
      const els =
        scopeRef.current.querySelectorAll<HTMLElement>("[data-float-item]");

      els.forEach((el, i) => {
        const c = configs[i];
        gsap.to(el, {
          y: c.yAmt,
          x: c.xAmt,
          rotation: c.rot,
          duration: c.dur,
          delay: c.delay,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    },
    { scope: scopeRef, dependencies: [variant] }
  );

  return (
    /**
     * `contents` makes this wrapper invisible to layout — the absolute
     * children position themselves relative to the nearest positioned
     * ancestor (the <section> that wraps this component).
     */
    <div ref={scopeRef} className="contents">
      {configs.map((cfg, i) => (
        <div
          key={i}
          data-float-item
          className={`absolute z-10 pointer-events-none overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.14)] ${cfg.size} ${cfg.pos} ${cfg.bg}`}
          style={getShapeStyle(cfg.shape)}
        >
          <Image
            src={cfg.src}
            alt={`Student ${i + 1}`}
            fill
            sizes="(max-width: 768px) 88px, 110px"
            className="object-cover object-top"
          />
        </div>
      ))}
    </div>
  );
}
