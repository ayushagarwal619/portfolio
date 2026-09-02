"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface ParticleCanvasProps {
  img?: string;
  mixBlend?: boolean;
}

interface NetworkParticle {
  originX: number;
  originY: number;
  radius: number;
  velocityX: number;
  velocityY: number;
  x: number;
  y: number;
}

export default function ParticleCanvas({ mixBlend = false }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isHomePage = pathname === "/";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isHomePage) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame: number | null = null;
    let isCancelled = false;
    let dpr = 1;
    let particles: NetworkParticle[] = [];
    const mouse = { x: -9999, y: -9999 };

    const createParticles = () => {
      const count = window.innerWidth < 768 ? 58 : 105;
      particles = Array.from({ length: count }, (_, index) => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;

        return {
          x,
          y,
          originX: x,
          originY: y,
          radius: index % 17 === 0 ? 2.4 * dpr : (0.8 + Math.random() * 0.8) * dpr,
          velocityX: 0,
          velocityY: 0,
        };
      });
    };

    const drawGlow = () => {
      const largeGlow = context.createRadialGradient(
        canvas.width * 0.73,
        canvas.height * 0.15,
        0,
        canvas.width * 0.73,
        canvas.height * 0.15,
        Math.max(canvas.width, canvas.height) * 0.42
      );
      largeGlow.addColorStop(0, "rgba(249, 52, 52, 0.16)");
      largeGlow.addColorStop(1, "rgba(249, 52, 52, 0)");
      context.fillStyle = largeGlow;
      context.fillRect(0, 0, canvas.width, canvas.height);

      const smallGlow = context.createRadialGradient(
        canvas.width * 0.9,
        canvas.height * 0.33,
        0,
        canvas.width * 0.9,
        canvas.height * 0.33,
        canvas.width * 0.18
      );
      smallGlow.addColorStop(0, "rgba(249, 52, 52, 0.18)");
      smallGlow.addColorStop(1, "rgba(249, 52, 52, 0)");
      context.fillStyle = smallGlow;
      context.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawScene = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawGlow();

      const connectionDistance = 145 * dpr;
      for (let first = 0; first < particles.length; first++) {
        for (let second = first + 1; second < particles.length; second++) {
          const dx = particles[first].x - particles[second].x;
          const dy = particles[first].y - particles[second].y;
          const distance = Math.hypot(dx, dy);

          if (distance < connectionDistance) {
            context.beginPath();
            context.moveTo(particles[first].x, particles[first].y);
            context.lineTo(particles[second].x, particles[second].y);
            context.strokeStyle = `rgba(249, 52, 52, ${0.14 * (1 - distance / connectionDistance)})`;
            context.lineWidth = Math.max(0.45, dpr * 0.5);
            context.stroke();
          }
        }
      }

      particles.forEach((particle, index) => {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = index % 17 === 0 ? "rgba(249, 52, 52, 0.9)" : "rgba(242, 242, 242, 0.48)";
        context.shadowBlur = index % 17 === 0 ? 12 * dpr : 0;
        context.shadowColor = "rgba(249, 52, 52, 0.9)";
        context.fill();
      });
      context.shadowBlur = 0;
    };

    const updatePhysics = () => {
      const interactionRadius = 170 * dpr;
      const maxDisplacement = 28 * dpr;

      particles.forEach((particle) => {
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.hypot(dx, dy);

        if (distance > 0 && distance < interactionRadius) {
          const force = (1 - distance / interactionRadius) * 0.7 * dpr;
          particle.velocityX += (dx / distance) * force;
          particle.velocityY += (dy / distance) * force;
        }

        particle.velocityX += (particle.originX - particle.x) * 0.012;
        particle.velocityY += (particle.originY - particle.y) * 0.012;
        particle.velocityX *= 0.88;
        particle.velocityY *= 0.88;
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;

        const offsetX = particle.x - particle.originX;
        const offsetY = particle.y - particle.originY;
        const displacement = Math.hypot(offsetX, offsetY);
        if (displacement > maxDisplacement) {
          particle.x = particle.originX + (offsetX / displacement) * maxDisplacement;
          particle.y = particle.originY + (offsetY / displacement) * maxDisplacement;
        }
      });
    };

    const animate = () => {
      if (isCancelled) return;
      updatePhysics();
      drawScene();
      animationFrame = requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      createParticles();
      drawScene();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (event.clientX - rect.left) * dpr;
      mouse.y = (event.clientY - rect.top) * dpr;
    };

    const handlePointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (!prefersReducedMotion) {
      document.addEventListener("pointermove", handlePointerMove, { passive: true });
      document.addEventListener("pointerleave", handlePointerLeave);
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      isCancelled = true;
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    };
  }, [isHomePage, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 z-[1] h-full w-full pointer-events-none opacity-70 ${
        mixBlend ? "mix-blend-normal" : ""
      }`}
    />
  );
}
