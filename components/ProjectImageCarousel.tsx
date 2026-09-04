"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ProjectImageCarouselProps {
  /** Project screenshot paths. Pass an empty array (or omit) if none exist yet. */
  images: string[];
  /** Used for accessible alt text, e.g. the project name. */
  alt: string;
  /** How long each image stays on screen before crossfading to the next. Default 3000ms. */
  intervalMs?: number;
  className?: string;
}

/**
 * Renders a project's screenshots with an automatic crossfade every `intervalMs`.
 * - 0 images  -> clean gradient placeholder, never a broken image icon.
 * - 1 image   -> static, no cycling, no dots.
 * - 2+ images -> auto-cycles with a smooth opacity crossfade, pauses on hover,
 *                shows small progress dots.
 *
 * Parent element must be `position: relative` with a defined height/aspect
 * ratio, since this uses next/image's `fill` mode internally.
 */
export default function ProjectImageCarousel({
  images,
  alt,
  intervalMs = 3000,
  className = "",
}: ProjectImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const hasImages = images && images.length > 0;
  const isCycling = hasImages && images.length > 1;

  useEffect(() => {
    if (!isCycling || isPaused) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isCycling, isPaused, images.length, intervalMs]);

  // Reset to the first frame if the images array itself changes (e.g. new project)
  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  // --- No screenshots yet: clean placeholder, never a broken box ---
  if (!hasImages) {
    return (
      <div
        className={`relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1c1c20] to-[#131212] border border-[#272522] ${className}`}
      >
        <span className="font-barlow-condensed text-[10px] md:text-xs tracking-[.3rem] uppercase text-foreground/30">
          Preview coming soon
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`${alt} — screenshot ${index + 1}`}
          fill
          priority={index === 0}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-opacity duration-700 ease-in-out"
          style={{ opacity: index === activeIndex ? 1 : 0 }}
        />
      ))}

      {/* Progress dots — only when there's more than one frame to show */}
      {isCycling && (
        <div className="absolute bottom-3 right-3 z-10 flex gap-1.5">
          {images.map((_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-4 bg-orange" : "w-1.5 bg-foreground/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
