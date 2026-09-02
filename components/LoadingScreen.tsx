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
  const logoPathRef = useRef<SVGPathElement>(null);
  const curtainRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    if (!logoPathRef.current || !curtainRef.current) return;

    gsap.set(curtainRef.current, { attr: { d: CURTAIN_EXPANDED } });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        setIsMounted(false);
      },
    });

    tl.add(() =>
      animateDrawSVG(logoPathRef.current as SVGPathElement, 0, 100, 1.0, "power2.inOut")
    );

    tl.to({}, { duration: 0.3 });

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
            <path ref={curtainRef} className="fill-foreground" d={CURTAIN_EXPANDED} />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 500 500" className="w-20 h-20 md:w-28 md:h-28 fill-none">
              <path
                ref={logoPathRef}
                d="M 175 165 L 325 165 L 175 335 L 325 335"
                className="fill-none stroke-background stroke-[50]"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
