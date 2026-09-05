"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FastParticle {
  targetX: number;
  targetY: number;
  scatterX: number;
  scatterY: number;
  size: number;
  staggerDelay: number;
}

interface TextParticleCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  span1Ref: React.RefObject<HTMLSpanElement | null>;
  span2Ref: React.RefObject<HTMLSpanElement | null>;
  onAssembleComplete?: () => void;
}

export default function TextParticleCanvas({
  containerRef,
  span1Ref,
  span2Ref,
  onAssembleComplete,
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

    if (!canvas || !container || !span1 || !span2) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number | null = null;
    let isCancelled = false;
    let whiteParticles: FastParticle[] = [];
    let redParticles: FastParticle[] = [];
    let dpr = 1;
    let tween: gsap.core.Tween | null = null;
    let isRendering = false;
    const animState = { progress: 0 };

    const sampleText = () => {
      if (!container || !span1 || !span2) return;

      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Offscreen canvas for one-time pixel sampling
      const offscreen = document.createElement("canvas");
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      const rect1 = span1.getBoundingClientRect();
      const rect2 = span2.getBoundingClientRect();

      const style1 = window.getComputedStyle(span1);
      const style2 = window.getComputedStyle(span2);

      const font1 = `${style1.fontStyle} ${style1.fontWeight} ${
        parseFloat(style1.fontSize) * dpr
      }px "biggerDisplay", sans-serif`;
      const font2 = `${style2.fontStyle} ${style2.fontWeight} ${
        parseFloat(style2.fontSize) * dpr
      }px "biggerDisplay", sans-serif`;

      // Render span1 text ("AYUSH KUMAR ")
      offCtx.font = font1;
      offCtx.fillStyle = "#ffffff";
      offCtx.textBaseline = "top";
      const relX1 = (rect1.left - rect.left) * dpr;
      const relY1 = (rect1.top - rect.top) * dpr;
      offCtx.fillText(span1.textContent || "AYUSH KUMAR ", relX1, relY1);

      // Render span2 text ("AGARWAL")
      offCtx.font = font2;
      offCtx.fillStyle = "#f93434";
      offCtx.textBaseline = "top";
      const relX2 = (rect2.left - rect.left) * dpr;
      const relY2 = (rect2.top - rect.top) * dpr;
      offCtx.fillText(span2.textContent || "AGARWAL", relX2, relY2);

      // Sample pixels
      const imgData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
      const data = imgData.data;

      const isMobile = window.innerWidth < 768;
      const maxBudget = isMobile ? 400 : 950;
      
      // Calculate step dynamically to stay strictly within budget
      const pixelCountArea = (offscreen.width * offscreen.height) / (dpr * dpr);
      let step = Math.max(3, Math.ceil(Math.sqrt(pixelCountArea / maxBudget)));
      step = Math.round(step * dpr);

      const newWhite: FastParticle[] = [];
      const newRed: FastParticle[] = [];
      const scatterDist = isMobile ? 140 : 260;

      for (let y = 0; y < offscreen.height; y += step) {
        for (let x = 0; x < offscreen.width; x += step) {
          const idx = (y * offscreen.width + x) * 4;
          const alpha = data[idx + 3];

          if (alpha > 80) {
            const r = data[idx];
            const g = data[idx + 1];
            const isRed = r > 200 && g < 100;

            const targetX = x / dpr;
            const targetY = y / dpr;

            const angle = Math.random() * Math.PI * 2;
            const dist = (0.2 + Math.random() * 0.8) * scatterDist;
            const scatterX = targetX + Math.cos(angle) * dist;
            const scatterY = targetY + Math.sin(angle) * dist;

            const particle: FastParticle = {
              targetX,
              targetY,
              scatterX,
              scatterY,
              size: (0.9 + Math.random() * 0.8) * (isMobile ? 1.1 : 1.25),
              staggerDelay: Math.random() * 0.25,
            };

            if (isRed) {
              newRed.push(particle);
            } else {
              newWhite.push(particle);
            }
          }
        }
      }

      whiteParticles = newWhite;
      redParticles = newRed;
    };

    const drawFrame = () => {
      if (isCancelled || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const progress = animState.progress;

      // 1. Batch render white particles in a single draw call
      if (whiteParticles.length > 0) {
        ctx.fillStyle = "rgba(245, 245, 245, 0.95)";
        ctx.beginPath();
        for (let i = 0; i < whiteParticles.length; i++) {
          const p = whiteParticles[i];
          const localP = Math.max(
            0,
            Math.min(1, (progress - p.staggerDelay) / (1 - p.staggerDelay))
          );
          const easeP = 1 - Math.pow(1 - localP, 3);

          const curX = p.scatterX + (p.targetX - p.scatterX) * easeP;
          const curY = p.scatterY + (p.targetY - p.scatterY) * easeP;

          ctx.rect(curX - p.size / 2, curY - p.size / 2, p.size, p.size);
        }
        ctx.fill();
      }

      // 2. Batch render red particles in a single draw call
      if (redParticles.length > 0) {
        ctx.fillStyle = "rgba(249, 52, 52, 0.98)";
        ctx.beginPath();
        for (let i = 0; i < redParticles.length; i++) {
          const p = redParticles[i];
          const localP = Math.max(
            0,
            Math.min(1, (progress - p.staggerDelay) / (1 - p.staggerDelay))
          );
          const easeP = 1 - Math.pow(1 - localP, 3);

          const curX = p.scatterX + (p.targetX - p.scatterX) * easeP;
          const curY = p.scatterY + (p.targetY - p.scatterY) * easeP;

          ctx.rect(curX - p.size / 2, curY - p.size / 2, p.size, p.size);
        }
        ctx.fill();
      }
    };

    const renderLoop = () => {
      if (isCancelled) return;

      drawFrame();

      // Only continue loop while progress is updating
      if (animState.progress < 1 && isRendering) {
        animFrameId = requestAnimationFrame(renderLoop);
      } else {
        isRendering = false;
        animFrameId = null;
      }
    };

    const triggerRender = () => {
      if (!isRendering) {
        isRendering = true;
        animFrameId = requestAnimationFrame(renderLoop);
      }
    };

    const startAnimation = () => {
      if (prefersReducedMotion) {
        animState.progress = 1;
        drawFrame();
        onAssembleComplete?.();
        return;
      }

      animState.progress = 0;

      tween = gsap.to(animState, {
        progress: 1,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          triggerRender();
        },
        onComplete: () => {
          animState.progress = 1;
          drawFrame();
          isRendering = false;
          onAssembleComplete?.();
        },
      });

      triggerRender();
    };

    document.fonts.ready.then(() => {
      if (isCancelled) return;
      sampleText();
      startAnimation();
    });

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (isCancelled) return;
        sampleText();
        drawFrame();
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isCancelled = true;
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      if (animFrameId !== null) cancelAnimationFrame(animFrameId);
      tween?.kill();
      tween?.scrollTrigger?.kill();
    };
  }, [containerRef, span1Ref, span2Ref, prefersReducedMotion, onAssembleComplete]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-10"
    />
  );
}
