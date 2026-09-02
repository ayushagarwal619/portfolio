"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAppContext } from "@/context/AppContext";
import { animateDrawSVG } from "@/lib/drawSvg";

const CURTAIN_COLLAPSED = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
const CURTAIN_EXPANDED = "M0 1000S175 1000 500 1000s500 1000 500 1000V0H0Z";

export default function LoadingScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setIsLoading } = useAppContext();
  const [isMounted, setIsMounted] = useState(true);

  const overlayRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<SVGPathElement>(null);
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);

  useGSAP(() => {
    if (!curtainRef.current) return;

    gsap.set(curtainRef.current, { attr: { d: CURTAIN_EXPANDED } });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        setIsMounted(false);
      },
    });

    // Draw all logo mark strokes in parallel
    tl.add(() => {
      pathsRef.current.forEach((path) => {
        if (path) {
          animateDrawSVG(path, 0, 100, 0.9, "power2.inOut");
        }
      });
    });

    tl.to({}, { duration: 0.5 });

    tl.to(curtainRef.current, {
      attr: { d: CURTAIN_COLLAPSED },
      duration: 0.8,
      ease: "power3.inOut",
    });

    tl.to(overlayRef.current, { autoAlpha: 0, duration: 0.3 }, "-=0.2");
  }, []);

  return (
    <>
      {isMounted && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9999] pointer-events-none"
        >
          <svg
            className="absolute inset-0 w-full h-lvh"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            <path ref={curtainRef} className="fill-[#0d0d0d]" d={CURTAIN_EXPANDED} />
          </svg>

          {/* New AKA Logo Animatable Mark */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <svg
              viewBox="0 0 360 150"
              className="w-48 h-20 sm:w-64 sm:h-28 md:w-80 md:h-36 fill-none drop-shadow-[0_0_25px_rgba(249,52,52,0.25)]"
            >
              {/* Chevron Triangle */}
              <path
                ref={(el) => { pathsRef.current[0] = el; }}
                d="M 25 35 L 68 65 L 25 95 Z"
                className="stroke-orange stroke-[8] fill-none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Letter 'A' (First) */}
              <path
                ref={(el) => { pathsRef.current[1] = el; }}
                d="M 95 105 L 125 25 L 155 105"
                className="stroke-[#f2f2f2] stroke-[10] fill-none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                ref={(el) => { pathsRef.current[2] = el; }}
                d="M 107 78 L 143 78"
                className="stroke-[#f2f2f2] stroke-[10] fill-none"
                strokeLinecap="round"
              />

              {/* Letter 'K' */}
              <path
                ref={(el) => { pathsRef.current[3] = el; }}
                d="M 180 25 L 180 105"
                className="stroke-[#f2f2f2] stroke-[10] fill-none"
                strokeLinecap="round"
              />
              <path
                ref={(el) => { pathsRef.current[4] = el; }}
                d="M 230 25 L 180 65"
                className="stroke-[#f2f2f2] stroke-[10] fill-none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                ref={(el) => { pathsRef.current[5] = el; }}
                d="M 195 55 L 235 105"
                className="stroke-[#f2f2f2] stroke-[10] fill-none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Letter 'A' (Second) */}
              <path
                ref={(el) => { pathsRef.current[6] = el; }}
                d="M 260 105 L 290 25 L 320 105"
                className="stroke-[#f2f2f2] stroke-[10] fill-none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                ref={(el) => { pathsRef.current[7] = el; }}
                d="M 272 78 L 308 78"
                className="stroke-[#f2f2f2] stroke-[10] fill-none"
                strokeLinecap="round"
              />

              {/* Underline Accent */}
              <path
                ref={(el) => { pathsRef.current[8] = el; }}
                d="M 95 124 L 320 124"
                className="stroke-orange stroke-[7] fill-none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
