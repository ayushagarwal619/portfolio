"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getSortedExperience } from "@/data/experienceData";
import { Rocket, Trophy, Briefcase, Calendar } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORIES = [
  "All",
  "Startup / Entrepreneurship",
  "Hackathons",
  "Job Simulations",
] as const;

export default function ExperienceTimeline() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const sectionRef = useRef<HTMLDivElement>(null);

  const allExperiences = getSortedExperience();
  const filtered =
    selectedCategory === "All"
      ? allExperiences
      : allExperiences.filter((item) => item.category === selectedCategory);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const section = sectionRef.current;
      const media = gsap.matchMedia();

      const setupTimeline = (
        cardSelector: string,
        nodeSelector: string,
        progressSelector?: string,
      ) => {
        const cards = gsap.utils.toArray<HTMLElement>(cardSelector, section);
        const nodes = gsap.utils.toArray<HTMLElement>(nodeSelector, section);
        const progressLine = progressSelector
          ? section.querySelector<HTMLElement>(progressSelector)
          : null;
        const pointer = progressSelector
          ? section.querySelector<HTMLElement>(".experience-pointer")
          : null;

        if (!cards.length) return;

        if (prefersReducedMotion) {
          gsap.set(cards, { clearProps: "all", opacity: 1, x: 0, y: 0 });
          gsap.set(nodes, { clearProps: "all", opacity: 1, scale: 1 });
          if (progressLine) gsap.set(progressLine, { scaleY: 1 });
          if (pointer) gsap.set(pointer, { yPercent: 0, autoAlpha: 1 });
          return;
        }

        // Keep layout entirely CSS-controlled. GSAP only animates transform/opacity.
        cards.forEach((card, index) => {
          const side = card.dataset.side === "right" ? 1 : -1;
          gsap.set(card, {
            x: side * 70,
            y: 18,
            autoAlpha: 0,
            transformOrigin: side > 0 ? "left center" : "right center",
          });

          if (nodes[index]) {
            gsap.set(nodes[index], { autoAlpha: 0, scale: 0.7 });
          }
        });

        if (progressLine) gsap.set(progressLine, { scaleY: 0 });
        if (pointer) gsap.set(pointer, { yPercent: 0, autoAlpha: 1 });

        const timeline = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            end: "bottom 70%",
            scrub: 1.15,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, index) => {
          const at = index * 0.18;

          timeline.to(
            card,
            { x: 0, y: 0, autoAlpha: 1, duration: 0.7 },
            at,
          );

          if (nodes[index]) {
            timeline.to(
              nodes[index],
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.45,
                ease: "power3.out",
              },
              at + 0.03,
            );
          }
        });

        if (progressLine) {
          const progressDuration = Math.max(1, filtered.length * 0.2);

          timeline.to(
            progressLine,
            {
              scaleY: 1,
              duration: progressDuration,
              transformOrigin: "top center",
              ease: "none",
            },
            0,
          );

          if (pointer) {
            timeline.to(
              pointer,
              {
                yPercent: 100,
                duration: progressDuration,
                ease: "none",
              },
              0,
            );
          }
        }
      };

      media.add("(min-width: 768px)", () => {
        setupTimeline(
          ".experience-card-desktop",
          ".experience-node-desktop",
          ".experience-progress-line",
        );
      });

      media.add("(max-width: 767px)", () => {
        setupTimeline(".experience-card-mobile", ".experience-node-mobile");
      });

      return () => {
        media.revert();
      };
    },
    { scope: sectionRef, dependencies: [selectedCategory] },
  );

  const getCategoryIcon = (category: string) => {
    if (category.includes("Startup")) {
      return <Rocket className="h-4 w-4 text-orange" aria-hidden="true" />;
    }
    if (category.includes("Hackathon")) {
      return <Trophy className="h-4 w-4 text-amber-400" aria-hidden="true" />;
    }
    return <Briefcase className="h-4 w-4 text-blue-400" aria-hidden="true" />;
  };

  return (
    <div ref={sectionRef} className="w-full text-left">
      {/* Category filters */}
      <div className="mb-10 flex flex-wrap items-center gap-2">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={isActive}
              className={`cursor-pointer rounded-full border px-4 py-2 font-barlow-condensed text-xs font-semibold uppercase tracking-widest transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange/50 ${
                isActive
                  ? "border-orange bg-orange text-background"
                  : "border-white/10 bg-white/5 text-foreground/70 hover:border-white/20 hover:text-white"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Desktop: alternating center timeline */}
      <div className="relative hidden md:block">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10"
        />
        <div
          aria-hidden="true"
          className="experience-progress-line absolute left-1/2 top-0 h-full w-px -translate-x-1/2 origin-top scale-y-0 bg-orange shadow-[0_0_12px_rgba(249,52,52,0.45)]"
        />
        <div
          aria-hidden="true"
          className="experience-pointer pointer-events-none absolute left-1/2 top-0 z-20 h-3 w-3 -translate-x-1/2 rounded-full bg-orange shadow-[0_0_18px_rgba(249,52,52,0.9)]"
        />

        <div className="flex flex-col gap-10 lg:gap-14">
          {filtered.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={item.id}
                className="relative grid min-h-[190px] grid-cols-2 items-center gap-10 lg:gap-16"
              >
                <div
                  className={`experience-card-desktop ${isLeft ? "col-start-1 pr-4 lg:pr-8" : "col-start-2 pl-4 lg:pl-8"}`}
                  data-side={isLeft ? "left" : "right"}
                >
                  <ExperienceCard item={item} getCategoryIcon={getCategoryIcon} />
                </div>

                <div
                  className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 ${
                    isLeft ? "" : ""
                  }`}
                >
                  <div
                    className={`experience-node-desktop flex h-7 w-7 items-center justify-center rounded-full border-2 bg-background ${
                      item.isCurrent
                        ? "border-orange shadow-[0_0_18px_rgba(249,52,52,0.65)]"
                        : "border-white/30"
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        item.isCurrent ? "bg-orange" : "bg-white/50"
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile/tablet: stable single-column timeline */}
      <div className="relative pl-7 md:hidden">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-2 top-0 w-px bg-white/10"
        />
        <div className="flex flex-col gap-8">
          {filtered.map((item) => (
            <div key={item.id} className="relative">
              <div
                className={`experience-node-mobile absolute -left-[1.15rem] top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 bg-background ${
                  item.isCurrent
                    ? "border-orange shadow-[0_0_12px_rgba(249,52,52,0.55)]"
                    : "border-white/30"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    item.isCurrent ? "bg-orange" : "bg-white/45"
                  }`}
                />
              </div>
              <div className="experience-card-mobile" data-side="right">
                <ExperienceCard item={item} getCategoryIcon={getCategoryIcon} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type ExperienceCardProps = {
  item: ReturnType<typeof getSortedExperience>[number];
  getCategoryIcon: (category: string) => React.ReactNode;
};

function ExperienceCard({ item, getCategoryIcon }: ExperienceCardProps) {
  return (
    <article className="group rounded-xl border border-white/10 bg-[#171616] p-5 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:scale-[1.025] hover:-translate-y-0.5 hover:border-orange/30 hover:shadow-[0_16px_45px_rgba(0,0,0,0.24)] sm:p-6">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded border border-white/10 bg-white/5 px-2.5 py-1 font-barlow-condensed text-xs uppercase tracking-wider text-foreground/60">
            {getCategoryIcon(item.category)}
            {item.category}
          </span>

          {item.isCurrent && (
            <span className="rounded border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 font-barlow-condensed text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              Current Role
            </span>
          )}

          {item.result && (
            <span className="rounded border border-orange/20 bg-orange/10 px-2 py-1 font-barlow-condensed text-[11px] font-semibold uppercase tracking-wider text-orange">
              {item.result}
            </span>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 font-barlow-condensed text-xs uppercase tracking-widest text-foreground/50">
          <Calendar className="h-3.5 w-3.5 text-orange" aria-hidden="true" />
          {item.date}
        </div>
      </div>

      <h4 className="font-barlow-condensed text-xl font-bold uppercase tracking-wide text-foreground transition-colors group-hover:text-orange sm:text-2xl">
        {item.title}
      </h4>
      <p className="mt-0.5 font-barlow-condensed text-sm font-semibold uppercase tracking-wider text-orange">
        {item.role} — <span className="text-foreground/70">{item.organization}</span>
      </p>

      {item.shortDescription && (
        <p className="mt-3 text-sm leading-relaxed text-foreground/70">
          {item.shortDescription}
        </p>
      )}

      {item.skills && item.skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/5 pt-3">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="rounded border border-white/5 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-foreground/60"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
