"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SubtleParticle {
  baseX: number;
  baseY: number;
  dirX: number;
  dirY: number;
  maxDist: number;
  size: number;
  alpha: number;
  isRed: boolean;
}

interface TextParticleCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  span1Ref: React.RefObject<HTMLSpanElement | null>;
  span2Ref: React.RefObject<HTMLSpanElement | null>;
}

export default function TextParticleCanvas({
  containerRef,
  span1Ref,
  span2Ref,
}: TextParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const span1 = span1Ref.current;
    const span2 = span2Ref.current;

    if (!canvas || !container || !span1 || !span2 || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number | null = null;
    let isCancelled = false;
    let particles: SubtleParticle[] = [];
    let dpr = 1;
    let scrollTriggerInstance: ScrollTrigger | null = null;
    let isRendering = false;
    let lastRenderedProgress = -1;
    const animState = { progress: 0 };

    const generateParticles = () => {
      if (!container || !span1 || !span2) return;

      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const rect1 = span1.getBoundingClientRect();
      const rect2 = span2.getBoundingClientRect();

      const relX1 = rect1.left - rect.left;
      const relY1 = rect1.top - rect.top;
      const relX2 = rect2.left - rect.left;
      const relY2 = rect2.top - rect.top;

      const isMobile = window.innerWidth < 768;
      const countWhite = isMobile ? 35 : 65;
      const countRed = isMobile ? 20 : 35;

      const newParticles: SubtleParticle[] = [];

      // White particles around "AYUSH KUMAR "
      for (let i = 0; i < countWhite; i++) {
        const baseX = relX1 + Math.random() * rect1.width;
        const baseY = relY1 + Math.random() * rect1.height;
        const angle = Math.random() * Math.PI * 2;
        const maxDist = (20 + Math.random() * 65) * (isMobile ? 0.7 : 1.0);

        newParticles.push({
          baseX,
          baseY,
          dirX: Math.cos(angle),
          dirY: Math.sin(angle),
          maxDist,
          size: (1.0 + Math.random() * 1.0) * (isMobile ? 0.9 : 1.1),
          alpha: 0.4 + Math.random() * 0.5,
          isRed: false,
        });
      }

      // Red particles around "AGARWAL"
      for (let i = 0; i < countRed; i++) {
        const baseX = relX2 + Math.random() * rect2.width;
        const baseY = relY2 + Math.random() * rect2.height;
        const angle = Math.random() * Math.PI * 2;
        const maxDist = (20 + Math.random() * 65) * (isMobile ? 0.7 : 1.0);

        newParticles.push({
          baseX,
          baseY,
          dirX: Math.cos(angle),
          dirY: Math.sin(angle),
          maxDist,
          size: (1.0 + Math.random() * 1.0) * (isMobile ? 0.9 : 1.1),
          alpha: 0.5 + Math.random() * 0.45,
          isRed: true,
        });
      }

      particles = newParticles;
    };

    const drawFrame = () => {
      if (isCancelled || !ctx || !canvas) return;

      const progress = animState.progress;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      // Group 1: White particles
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.isRed) continue;

        const offset = p.maxDist * progress;
        const curX = p.baseX + p.dirX * offset;
        const curY = p.baseY + p.dirY * offset;

        ctx.rect(curX - p.size / 2, curY - p.size / 2, p.size, p.size);
      }
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.fill();

      // Group 2: Red particles
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p.isRed) continue;

        const offset = p.maxDist * progress;
        const curX = p.baseX + p.dirX * offset;
        const curY = p.baseY + p.dirY * offset;

        ctx.rect(curX - p.size / 2, curY - p.size / 2, p.size, p.size);
      }
      ctx.fillStyle = "rgba(249, 52, 52, 0.85)";
      ctx.fill();

      ctx.restore();
      lastRenderedProgress = progress;
    };

    const renderLoop = () => {
      if (isCancelled) return;

      drawFrame();

      if (Math.abs(animState.progress - lastRenderedProgress) > 0.0001 || isRendering) {
        isRendering = false;
        animFrameId = requestAnimationFrame(renderLoop);
      } else {
        animFrameId = null;
      }
    };

    const triggerRender = () => {
      if (animFrameId === null) {
        isRendering = true;
        animFrameId = requestAnimationFrame(renderLoop);
      }
    };

    const setupScrollTrigger = () => {
      const rect = container.getBoundingClientRect();
      const initialTop = rect.top + window.scrollY;
      const triggerStart = Math.max(0, initialTop - 40);

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: document.body,
        start: `${triggerStart}px top`,
        end: `${triggerStart + 350}px top`,
        scrub: 1.0,
        onUpdate: (self) => {
          animState.progress = self.progress;
          triggerRender();
        },
      });

      animState.progress = scrollTriggerInstance.progress || 0;
      triggerRender();
    };

    generateParticles();
    setupScrollTrigger();

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (isCancelled) return;
        generateParticles();
        if (scrollTriggerInstance) {
          scrollTriggerInstance.refresh();
          animState.progress = scrollTriggerInstance.progress || 0;
        }
        triggerRender();
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isCancelled = true;
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      if (animFrameId !== null) cancelAnimationFrame(animFrameId);
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
    };
  }, [containerRef, span1Ref, span2Ref, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-10"
    />
  );
}
