"use client";

import React, { useEffect, useId, useRef } from "react";

interface SmudgeMaskProps {
  foreground: React.ReactNode;
  background: React.ReactNode;
  className?: string;
}

interface TrailPoint {
  el: SVGCircleElement;
  bornAt: number;
}

const TRAIL_LIFETIME_MS = 650;
const MAX_RADIUS = 46;
const MIN_SPAWN_DISTANCE = 14;

export default function SmudgeMask({
  foreground,
  background,
  className = "",
}: SmudgeMaskProps) {
  const reactId = useId().replace(/:/g, "");
  const gooId = `smudge-goo-${reactId}`;
  const maskId = `smudge-mask-${reactId}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const maskGroupRef = useRef<SVGGElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const maskGroup = maskGroupRef.current;
    if (!container || !maskGroup) return;

    const svgNS = "http://www.w3.org/2000/svg";

    const spawnPoint = (x: number, y: number) => {
      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", String(x));
      circle.setAttribute("cy", String(y));
      circle.setAttribute("r", "0");
      maskGroup.appendChild(circle);
      trailRef.current.push({ el: circle, bornAt: performance.now() });
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const last = lastPointRef.current;
      if (!last || Math.hypot(x - last.x, y - last.y) > MIN_SPAWN_DISTANCE) {
        spawnPoint(x, y);
        lastPointRef.current = { x, y };
      }
    };

    const tick = () => {
      const now = performance.now();
      trailRef.current = trailRef.current.filter((point) => {
        const age = now - point.bornAt;
        if (age > TRAIL_LIFETIME_MS) {
          point.el.remove();
          return false;
        }
        const life = 1 - age / TRAIL_LIFETIME_MS;
        const radius = MAX_RADIUS * Math.sin(life * Math.PI * 0.85);
        point.el.setAttribute("r", String(Math.max(0, radius)));
        return true;
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    container.addEventListener("pointermove", handlePointerMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      trailRef.current.forEach((point) => point.el.remove());
      trailRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex items-center justify-center p-2 -my-2 ${className}`}
    >
      <div className="relative z-10 w-full">{foreground}</div>

      <div
        className="absolute inset-0 z-20 w-full pointer-events-none"
        style={{ mask: `url(#${maskId})`, WebkitMask: `url(#${maskId})` }}
      >
        {background}
      </div>

      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id={gooId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="22" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 60 -14"
            />
          </filter>
        </defs>
        <mask id={maskId} maskContentUnits="userSpaceOnUse" maskUnits="userSpaceOnUse">
          <g ref={maskGroupRef} filter={`url(#${gooId})`} fill="white" />
        </mask>
      </svg>
    </div>
  );
}
