"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { playClick } from "@/lib/soundEffects";

interface ProjectImageLightboxProps {
  images: string[];
  initialIndex: number;
  alt: string;
  onClose: () => void;
}

export default function ProjectImageLightbox({
  images,
  initialIndex,
  alt,
  onClose,
}: ProjectImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount animation: mount with opacity-0 then transition to opacity-100
  useEffect(() => {
    setMounted(true);
    const raf = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Animated close
  const handleClose = useCallback(() => {
    playClick();
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  }, [onClose]);

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      playClick();
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    },
    [images.length]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      playClick();
      setCurrentIndex((prev) => (prev + 1) % images.length);
    },
    [images.length]
  );

  // Lock body scroll while lightbox is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Keyboard navigation: Escape to close, Left/Right arrows to step
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft" && images.length > 1) {
        handlePrev();
      } else if (e.key === "ArrowRight" && images.length > 1) {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose, handlePrev, handleNext, images.length]);

  if (!mounted || typeof document === "undefined" || images.length === 0) {
    return null;
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[92vh] bg-[#141313] border border-white/20 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-barlow-condensed uppercase tracking-wide text-foreground">
              {alt}
            </h3>
            {images.length > 1 && (
              <p className="text-xs font-barlow-condensed tracking-wider uppercase text-foreground/60">
                Screenshot {currentIndex + 1} of {images.length}
              </p>
            )}
          </div>

          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-orange text-foreground hover:text-background border border-white/15 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* High-Res Image Container with object-contain (never crops screenshot) */}
        <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-lg overflow-hidden bg-black/60 border border-white/5 flex items-center justify-center">
          <Image
            src={images[currentIndex]}
            alt={`${alt} — screenshot ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 1400px) 100vw, 1400px"
            priority
          />

          {/* Left / Right Chevron Navigation if images.length > 1 */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Previous screenshot"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-orange text-white hover:text-background border border-white/20 flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next screenshot"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-orange text-white hover:text-background border border-white/20 flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Progress dots at bottom matching ProjectImageCarousel.tsx */}
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-2 pt-1">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  playClick();
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to screenshot ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex ? "w-5 bg-orange" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
