"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { techStackData } from "@/data/techStackData";
import { TechIcon } from "@/lib/techIconMap";
import {
  Code2,
  Globe,
  Boxes,
  Wrench,
  Database,
  Sparkles,
  Cpu,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Deterministically computes scatter offsets for each tech item.
 * Runs strictly client-side inside useGSAP to guarantee zero SSR hydration mismatches.
 */
function getScatterOffsets(
  catIdx: number,
  itemIdx: number,
  viewportWidth: number
) {
  // Deterministic seed based on category and item index
  const seed = catIdx * 19.3 + itemIdx * 7.7 + 3.14;
  const angle = ((seed * 57.3) % 360) * (Math.PI / 180);

  // Controlled, elegant travel distances to prevent viewport overflow
  let maxDistance = 70;
  let maxRotation = 10;

  if (viewportWidth < 640) {
    // Mobile: restrained travel to keep elements safely within card boundaries
    maxDistance = 18;
    maxRotation = 5;
  } else if (viewportWidth < 1024) {
    // Tablet
    maxDistance = 38;
    maxRotation = 8;
  }

  const radiusNorm = 0.5 + ((seed % 10) / 20); // 0.5 to 1.0
  const distance = maxDistance * radiusNorm;

  const x = Math.round(Math.cos(angle) * distance);
  const y = Math.round(Math.sin(angle) * (distance * 0.8));

  const rotation = Math.round(((seed * 5) % (maxRotation * 2)) - maxRotation);
  const scale = 0.94 + (((seed * 3) % 10) / 100); // 0.94 to 1.03 (never shrinks drastically)
  const opacity = 0.55 + (((seed * 7) % 25) / 100); // 0.55 to 0.80

  return { x, y, rotation, scale, opacity };
}

function getCategoryIcon(id: string) {
  switch (id) {
    case "programming-languages":
      return <Code2 className="w-4 h-4 text-orange" />;
    case "web-technologies":
      return <Globe className="w-4 h-4 text-orange" />;
    case "frameworks-libraries":
      return <Boxes className="w-4 h-4 text-orange" />;
    case "tools-platforms":
      return <Wrench className="w-4 h-4 text-orange" />;
    case "databases-cloud":
      return <Database className="w-4 h-4 text-orange" />;
    case "soft-skills":
      return <Sparkles className="w-4 h-4 text-orange" />;
    default:
      return <Cpu className="w-4 h-4 text-orange" />;
  }
}

export default function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const cards = containerRef.current.querySelectorAll<HTMLElement>(".tech-card");
      const items = containerRef.current.querySelectorAll<HTMLElement>(".tech-item");

      // Reduced motion bypass: instant neutral state with clean fade
      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 });
        gsap.set(items, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });
        return;
      }

      const viewportWidth = window.innerWidth;

      // 1. Initialize scattered visual transforms on real final DOM nodes
      items.forEach((el) => {
        const catIdx = Number(el.dataset.catIndex || 0);
        const itemIdx = Number(el.dataset.itemIndex || 0);
        const scatter = getScatterOffsets(catIdx, itemIdx, viewportWidth);

        gsap.set(el, {
          x: scatter.x,
          y: scatter.y,
          rotation: scatter.rotation,
          scale: scatter.scale,
          opacity: scatter.opacity,
        });
      });

      // 2. Coordinated ScrollTrigger timeline:
      // Category cards reveal -> Controlled intelligent assembly of technology items
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          once: true,
        },
      });

      // Phase 1: Destination category cards become visible and settled
      tl.fromTo(
        cards,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: "power2.out",
        }
      );

      // Phase 2: Gentle attraction & intelligent assembly into natural slots
      tl.to(
        items,
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: (_index, target) => {
            const catIdx = Number(target.dataset.catIndex || 0);
            const itemIdx = Number(target.dataset.itemIndex || 0);
            // Organic, synchronized overlap across categories
            return catIdx * 0.06 + itemIdx * 0.022;
          },
          // Clear transform attribute once assembly completes so CSS hover transforms operate cleanly
          clearProps: "transform",
        },
        "-=0.3"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left overflow-hidden md:overflow-visible"
    >
      {techStackData.map((category, catIdx) => (
        <div
          key={category.id}
          className="tech-card relative rounded-xl border border-white/10 bg-[#171616] p-6 flex flex-col justify-between transition-all duration-300 hover:border-orange/40"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-5">
              <h4 className="text-lg font-bold font-barlow-condensed tracking-wider uppercase text-foreground flex items-center gap-2">
                {getCategoryIcon(category.id)}
                {category.category}
              </h4>
            </div>

            {category.description && (
              <p className="text-xs text-foreground/50 font-barlow-condensed uppercase tracking-wider mb-4">
                {category.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {category.items.map((skill, skillIdx) => (
                <span
                  key={`${category.id}-${skill}`}
                  data-cat-index={catIdx}
                  data-item-index={skillIdx}
                  className="tech-item group/pill inline-flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#1c1b1b]/80 hover:bg-[#242222] hover:border-white/20 transition-all duration-200 cursor-default select-none hover:-translate-y-0.5 shadow-sm"
                >
                  <TechIcon
                    name={skill}
                    className={`w-6 h-6 sm:w-6.5 sm:h-6.5 shrink-0 transition-transform duration-200 group-hover/pill:scale-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] ${
                      category.id === "soft-skills" ? "text-orange" : ""
                    }`}
                  />
                  <span className="text-xs sm:text-[13px] font-mono font-medium tracking-wide text-foreground/90 group-hover/pill:text-white transition-colors">
                    {skill}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
