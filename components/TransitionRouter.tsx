"use client";

import React, { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CURTAIN_COLLAPSED = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
const CURTAIN_EXPANDED = "M0 1000S175 1000 500 1000s500 1000 500 1000V0H0Z";

export default function TransitionRouter({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const curtainRef = useRef<SVGPathElement>(null);
  const isFirstRender = useRef(true);

  const [displayChildren, setDisplayChildren] = useState(children);
  const pendingChildren = useRef(children);
  pendingChildren.current = children;

  useGSAP(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        setDisplayChildren(children);
        return;
      }
      if (!curtainRef.current) return;

      const tl = gsap.timeline();

      tl.to(curtainRef.current, {
        attr: { d: CURTAIN_EXPANDED },
        duration: 0.55,
        ease: "power3.in",
        onComplete: () => setDisplayChildren(pendingChildren.current),
      }).to(curtainRef.current, {
        attr: { d: CURTAIN_COLLAPSED },
        duration: 0.55,
        ease: "power3.out",
        delay: 0.05,
      });
    },
    { dependencies: [pathname] }
  );

  return (
    <>
      <svg
        className="fixed inset-0 w-full h-lvh z-[9998] pointer-events-none"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <path ref={curtainRef} className="fill-foreground" d={CURTAIN_COLLAPSED} />
      </svg>
      {displayChildren}
    </>
  );
}
