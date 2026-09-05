"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { playClick, playHover } from "@/lib/soundEffects";
import { animateDrawSVG } from "@/lib/drawSvg";
import ScrollRevealText from "./ScrollRevealText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
  {
    badge: "01",
    label: "Products Built",
    target: 7,
    suffix: "+",
    subtitle: "AI & Full-Stack Applications",
    desc: "SmartAttend, GymGuru, ResuMatch, RoopAntar, JanSewa, Nimiza & Verifund",
  },
  {
    badge: "02",
    label: "Hackathons & Challenges",
    target: 5,
    suffix: "+",
    subtitle: "National & Global Events",
    desc: "IEMHACKS, Adobe Univ, NextGen USA & JU Srijan '26 Finalist",
  },
  {
    badge: "03",
    label: "Milestones & Programs",
    target: 15,
    suffix: "+",
    subtitle: "Certifications & Industry Programs",
    desc: "Co-Founded KidGuides (Hult Prize), Goldman Sachs & Tata Simulations",
  },
];

const TAGLINES = [
  "BUILD · ITERATE · SCALE",
  "AI × FULL STACK × PRODUCTS",
  "DISCIPLINE BUILDS FREEDOM",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const eduCardRef = useRef<HTMLDivElement>(null);
  const capPathRef = useRef<SVGPathElement>(null);
  const bandPathRef = useRef<SVGPathElement>(null);
  const ribbonPathRef = useRef<SVGPathElement>(null);

  const statsContainerRef = useRef<HTMLDivElement>(null);
  const statNumberRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const statBadgeRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const taglineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // 1. Eyebrow & Subtitle entrance
      if (headerRef.current && !prefersReducedMotion) {
        const eyebrow = headerRef.current.querySelector(".eyebrow-text");
        const subtitle = headerRef.current.querySelector(".subtitle-text");

        if (eyebrow) {
          gsap.fromTo(
            eyebrow,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: 0.15,
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        }

        if (subtitle) {
          gsap.fromTo(
            subtitle,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: 0.25,
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      }

      // 2. Pill Badge entrance
      if (pillRef.current) {
        if (!prefersReducedMotion) {
          gsap.fromTo(
            pillRef.current,
            { opacity: 0, scale: 0.9, y: 10 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.7,
              ease: "back.out(1.4)",
              delay: 0.1,
              scrollTrigger: {
                trigger: headerRef.current || sectionRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        } else {
          gsap.set(pillRef.current, { opacity: 1, scale: 1, y: 0 });
        }
      }

      // 3. Main Showcase Card entrance
      if (mainCardRef.current) {
        if (!prefersReducedMotion) {
          gsap.fromTo(
            mainCardRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: mainCardRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        } else {
          gsap.set(mainCardRef.current, { opacity: 1, y: 0 });
        }
      }

      // 4. Statement Headline (word-by-word reveal & delayed color arrival)
      if (statementRef.current) {
        const words = statementRef.current.querySelectorAll(".statement-word");
        const highlights = statementRef.current.querySelectorAll(".statement-highlight");

        if (!prefersReducedMotion) {
          gsap.fromTo(
            words,
            { yPercent: 100, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.04,
              scrollTrigger: {
                trigger: statementRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            highlights,
            { color: "#f2f2f2" },
            {
              color: "#f93434",
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.08,
              delay: 0.35,
              scrollTrigger: {
                trigger: statementRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        } else {
          gsap.set(words, { yPercent: 0, opacity: 1 });
          gsap.set(highlights, { color: "#f93434" });
        }
      }

      // 5. Bio Paragraph entrance
      if (bioRef.current) {
        if (!prefersReducedMotion) {
          gsap.fromTo(
            bioRef.current,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: bioRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        } else {
          gsap.set(bioRef.current, { opacity: 1, y: 0 });
        }
      }

      // 6. Education Card & DrawSVG icon animation
      if (eduCardRef.current) {
        if (!prefersReducedMotion) {
          gsap.fromTo(
            eduCardRef.current,
            { opacity: 0, x: -25 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: eduCardRef.current,
                start: "top 90%",
                once: true,
                onEnter: () => {
                  if (capPathRef.current)
                    animateDrawSVG(capPathRef.current, 0, 100, 0.9, "power2.inOut");
                  if (bandPathRef.current)
                    animateDrawSVG(bandPathRef.current, 0, 100, 0.9, "power2.inOut");
                  if (ribbonPathRef.current)
                    animateDrawSVG(ribbonPathRef.current, 0, 100, 0.9, "power2.inOut");
                },
              },
            }
          );
        } else {
          gsap.set(eduCardRef.current, { opacity: 1, x: 0 });
        }
      }

      // 7. Numbered Stat Cards (entrance, count-up, badge arrival)
      if (statsContainerRef.current) {
        const cards = statsContainerRef.current.querySelectorAll(".stat-card");

        if (!prefersReducedMotion) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.12,
              scrollTrigger: {
                trigger: statsContainerRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );

          // Badge slide from right
          statBadgeRefs.current.forEach((badgeEl, i) => {
            if (!badgeEl) return;
            gsap.fromTo(
              badgeEl,
              { opacity: 0, x: 20 },
              {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: "power2.out",
                delay: 0.2 + i * 0.12,
                scrollTrigger: {
                  trigger: statsContainerRef.current,
                  start: "top 85%",
                  once: true,
                },
              }
            );
          });

          // Number count-up
          STATS.forEach((stat, i) => {
            const numEl = statNumberRefs.current[i];
            if (!numEl) return;
            const proxy = { count: 0 };
            gsap.to(proxy, {
              count: stat.target,
              duration: 1.2,
              ease: "power1.out",
              delay: 0.15 + i * 0.12,
              onUpdate: () => {
                numEl.textContent = `${Math.round(proxy.count)}${stat.suffix}`;
              },
              scrollTrigger: {
                trigger: statsContainerRef.current,
                start: "top 85%",
                once: true,
              },
            });
          });
        } else {
          gsap.set(cards, { opacity: 1, y: 0 });
          statBadgeRefs.current.forEach((b) => b && gsap.set(b, { opacity: 1, x: 0 }));
          STATS.forEach((stat, i) => {
            const numEl = statNumberRefs.current[i];
            if (numEl) numEl.textContent = `${stat.target}${stat.suffix}`;
          });
        }
      }

      // 8. Bottom Tagline Row (letter spacing expand + fade)
      if (taglineRef.current) {
        const taglines = taglineRef.current.querySelectorAll(".tagline-item");
        if (!prefersReducedMotion) {
          gsap.fromTo(
            taglines,
            { opacity: 0, letterSpacing: "0em", y: 10 },
            {
              opacity: 1,
              letterSpacing: "0.22em",
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.15,
              scrollTrigger: {
                trigger: taglineRef.current,
                start: "top 90%",
                once: true,
              },
            }
          );
        } else {
          gsap.set(taglines, { opacity: 1, letterSpacing: "0.22em", y: 0 });
        }
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 px-6 max-w-7xl mx-auto border-t border-white/5 overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-orange/5 blur-[120px] rounded-full" />

      <div className="relative max-w-5xl mx-auto flex flex-col gap-12 sm:gap-14">
        {/* Header (Pill Badge + Eyebrow + "ABOUT ME" + Subtitle) */}
        <div ref={headerRef} className="flex flex-col items-center text-center gap-4">
          {/* Pill Badge */}
          <div
            ref={pillRef}
            className="inline-flex items-center gap-2.5 rounded-full border border-orange/40 bg-orange/5 px-4.5 py-1.5 text-xs font-barlow-condensed font-semibold uppercase tracking-[0.2em] text-foreground shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-orange animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] shadow-[0_0_8px_rgba(249,52,52,0.8)] shrink-0" />
            <span>BUILDER · AI DEVELOPER · PROBLEM SOLVER</span>
          </div>

          <p className="eyebrow-text font-barlow-condensed text-xs sm:text-sm tracking-[.35rem] sm:tracking-[.5rem] uppercase text-orange font-bold">
            BACKGROUND &amp; PHILOSOPHY
          </p>

          <ScrollRevealText triggerRef={headerRef}>
            <h2 className="text-3xl sm:text-5xl font-bigger-display uppercase tracking-wide text-foreground">
              {"ABOUT ME".split(" ").map((word, wIdx) => (
                <span key={wIdx} className="inline-block mr-[0.3em] overflow-hidden">
                  {Array.from(word).map((char, cIdx) => (
                    <span key={cIdx} className="char-span inline-block">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h2>
          </ScrollRevealText>

          <p className="subtitle-text max-w-2xl text-sm sm:text-base text-foreground/75 font-normal leading-relaxed">
            Engineering intelligent systems, full-stack applications, and scalable products from first principles.
          </p>
        </div>

        {/* Main Statement & Bio Showcase Card */}
        <div
          ref={mainCardRef}
          className="rounded-2xl border border-white/10 bg-[#171616] p-7 sm:p-10 flex flex-col gap-8 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300"
        >
          {/* Headline: Contextual & Bold */}
          <h3
            ref={statementRef}
            className="text-2xl sm:text-3xl md:text-4xl font-bold font-barlow-condensed uppercase tracking-wide text-foreground leading-snug"
          >
            <span className="inline-block overflow-hidden mr-[0.25em]">
              <span className="statement-word inline-block">TURNING</span>
            </span>
            <span className="inline-block overflow-hidden mr-[0.25em]">
              <span className="statement-word inline-block">IDEAS</span>
            </span>
            <span className="inline-block overflow-hidden mr-[0.25em]">
              <span className="statement-word inline-block">INTO</span>
            </span>
            <span className="inline-block overflow-hidden mr-[0.25em]">
              <span className="statement-word statement-highlight inline-block font-bold">
                AI
              </span>
            </span>
            <span className="inline-block overflow-hidden mr-[0.25em]">
              <span className="statement-word inline-block">&amp;</span>
            </span>
            <span className="inline-block overflow-hidden mr-[0.25em]">
              <span className="statement-word statement-highlight inline-block font-bold">
                FULL-STACK
              </span>
            </span>
            <span className="inline-block overflow-hidden">
              <span className="statement-word statement-highlight inline-block font-bold">
                PRODUCTS
              </span>
            </span>
          </h3>

          {/* Authentic Personal Story Bio */}
          <p
            ref={bioRef}
            className="text-base sm:text-lg text-foreground/85 leading-relaxed font-normal"
          >
            I&apos;m <strong className="text-white font-semibold">Ayush Kumar Agarwal</strong> — a Computer Science &amp; Business Systems student at <span className="text-orange/90 font-medium">Heritage Institute of Technology, Kolkata</span>, and a developer who learns by actually building real things. From AI biometrics and real-time pose tracking to full-stack platforms, I focus on turning complex challenges into practical, usable software. Driven by a deep curiosity for AI engineering, systems design, and startup innovation, I&apos;m constantly experimenting, refining my code, and building products designed to scale.
          </p>

          {/* Education Info Row */}
          <div
            ref={eduCardRef}
            className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-foreground/70"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-orange/10 border border-orange/25 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(249,52,52,0.15)]">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5.5 h-5.5 text-orange"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    ref={capPathRef}
                    d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
                  />
                  <path ref={bandPathRef} d="M22 10v6" />
                  <path ref={ribbonPathRef} d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                </svg>
              </div>
              <div>
                <strong className="text-foreground font-semibold text-base block">
                  Computer Science &amp; Business Systems
                </strong>
                <p className="text-xs text-foreground/50 uppercase tracking-wider font-barlow-condensed mt-0.5">
                  Heritage Institute of Technology, Kolkata
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-xs font-barlow-condensed uppercase tracking-widest text-foreground/80 font-semibold shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] shrink-0" />
              <span>B.Tech Undergraduate</span>
            </div>
          </div>
        </div>

        {/* 3 Story-Driven Highlight Cards (Products Built, Hackathons, Milestones) */}
        <div ref={statsContainerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              className="stat-card group relative rounded-2xl border border-white/10 bg-[#171616] p-6 sm:p-7 flex flex-col justify-between gap-6
                         transition-all duration-300 ease-out cursor-pointer
                         hover:-translate-y-1 hover:border-orange/50 hover:shadow-xl hover:shadow-orange/10"
            >
              <div className="flex items-center justify-between">
                <span
                  ref={(el) => {
                    statBadgeRefs.current[index] = el;
                  }}
                  className="font-barlow-condensed text-xs font-bold text-foreground/40 border border-white/10 rounded-full px-3 py-1 uppercase tracking-wider bg-white/[0.02]"
                >
                  {stat.badge}
                </span>
                <div className="w-8 h-8 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-foreground/40 group-hover:text-orange group-hover:border-orange/40 transition-all">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-[15deg]" />
                </div>
              </div>

              <div>
                <p
                  ref={(el) => {
                    statNumberRefs.current[index] = el;
                  }}
                  className="font-bigger-display text-4xl sm:text-5xl text-orange leading-none mb-2"
                >
                  {stat.target}
                  {stat.suffix}
                </p>
                <h4 className="text-base sm:text-lg font-bold font-barlow-condensed uppercase tracking-wider text-foreground mb-1">
                  {stat.label}
                </h4>
                <div className="inline-block px-2.5 py-0.5 rounded bg-orange/10 text-orange text-[10px] font-mono uppercase tracking-wider mb-2 font-medium">
                  {stat.subtitle}
                </div>
                <p className="text-xs text-foreground/50 font-mono leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Tagline Row */}
        <div
          ref={taglineRef}
          className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          {TAGLINES.map((tagline, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="tagline-item font-barlow-condensed text-xs sm:text-sm uppercase font-bold text-foreground/50">
                {tagline}
              </span>
              {i < TAGLINES.length - 1 && (
                <span className="hidden sm:inline-block text-orange/40 font-bold">•</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
