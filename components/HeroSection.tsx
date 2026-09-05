"use client";

import React from "react";
import { heroContent, assetsConfig, socialLinks } from "@/data/bioData";
import { Download, Rocket, Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { playClick, playHover } from "@/lib/soundEffects";

import TextParticleCanvas from "./TextParticleCanvas";

export default function HeroSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const span1Ref = React.useRef<HTMLSpanElement>(null);
  const span2Ref = React.useRef<HTMLSpanElement>(null);

  const handleResumeDownload = () => {
    playClick();
  };

  const githubLink = socialLinks.find((s) => s.name.toLowerCase().includes("github"));
  const linkedinLink = socialLinks.find((s) => s.name.toLowerCase().includes("linkedin"));

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-between items-center text-center px-4 sm:px-6 pt-28 sm:pt-32 md:pt-36 lg:pt-[28vh] pb-6 sm:pb-8 overflow-hidden select-none">
      {/* Subtle Ambient Glow behind lower composition */}
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[550px] md:w-[750px] h-[300px] bg-orange/[0.04] rounded-full blur-3xl pointer-events-none"
      />

      {/* =======================================================
          LEFT EDITORIAL SUPPORT (Desktop only, framed like reference poster)
      ======================================================== */}
      <div
        aria-hidden="true"
        className="hidden xl:flex flex-col justify-between absolute left-8 2xl:left-14 top-28 bottom-16 pointer-events-none z-10 select-none"
      >
        {/* Top-left: Ideation slogan */}
        <div className="flex flex-col text-left font-barlow-condensed uppercase tracking-[0.25em] text-[11px] leading-tight text-white/50">
          <span>TURNING</span>
          <span>IDEAS INTO</span>
          <span className="text-orange font-bold">REALITY</span>
        </div>

        {/* Mid-left: Disciplines list */}
        <div className="flex flex-col text-left gap-1 font-mono text-[10px] tracking-[0.22em] text-white/40 my-auto">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange shadow-[0_0_8px_#F93434]" />
            <span className="text-white/70 font-semibold">DEVELOP</span>
          </div>
          <span className="pl-3.5">DESIGN</span>
          <span className="pl-3.5">LEARN</span>
          <span className="pl-3.5">ITERATE</span>
          <span className="pl-3.5">GROW</span>
        </div>

        {/* Bottom-left: Geographic coordinates */}
        <div className="flex flex-col text-left font-mono text-[9px] tracking-[0.25em] text-white/35 leading-tight">
          <span>LOC:</span>
          <span>22.57°N</span>
          <span>88.36°E</span>
        </div>
      </div>

      {/* Angled handwritten accent note on left side */}
      <div
        aria-hidden="true"
        className="hidden 2xl:flex flex-col absolute left-[12%] top-[23%] -rotate-12 pointer-events-none select-none opacity-40 font-serif italic text-xs leading-tight text-orange/90"
      >
        <span>Build</span>
        <span className="ml-2">Learn</span>
        <span className="ml-3">Create</span>
        <span className="ml-4 text-white/90">Repeat</span>
      </div>

      {/* =======================================================
          RIGHT EDITORIAL SUPPORT (Desktop only, framed like reference poster)
      ======================================================== */}
      <div
        aria-hidden="true"
        className="hidden xl:flex flex-col justify-between items-end absolute right-8 2xl:right-14 top-28 bottom-16 pointer-events-none z-10 select-none"
      >
        {/* Top-right quote */}
        <div className="flex flex-col text-right font-mono text-[10px] tracking-[0.24em] text-white/45 leading-relaxed">
          <span>&ldquo;DISCIPLINE</span>
          <span>BUILDS</span>
          <span>FREEDOM&rdquo;</span>
          <div className="w-6 h-[1px] bg-orange/60 ml-auto mt-1.5" />
        </div>

        {/* Mid-right: Identity & Standards */}
        <div className="flex flex-col text-right gap-4 my-auto">
          <div className="flex flex-col text-right gap-1 font-mono text-[10px] tracking-[0.22em] text-white/40">
            <div className="flex items-center justify-end gap-2">
              <span className="text-white/70 font-semibold">01 // DEVELOPER</span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange shadow-[0_0_8px_#F93434]" />
            </div>
            <span>AI/ML</span>
            <span>FULL STACK</span>
            <span>PROBLEM SOLVER</span>
            <span>LIFELONG LEARNER</span>
          </div>

          <div className="flex flex-col text-right font-mono text-[10px] tracking-widest text-white/35 leading-tight">
            <span className="text-orange text-xs font-bold font-mono">&lt;/&gt;</span>
            <span className="mt-0.5">SAME PERSON</span>
            <span>HIGHER STANDARDS</span>
            <div className="w-6 h-[1px] bg-white/20 ml-auto mt-1" />
          </div>
        </div>

        {/* Bottom-right quote */}
        <div className="flex flex-col text-right font-mono text-[9px] tracking-[0.22em] text-white/35 leading-tight">
          <span>&ldquo;A BRIGHTER</span>
          <span>TECH TOMORROW&rdquo;</span>
          <div className="w-5 h-[1px] bg-orange/50 ml-auto mt-1" />
        </div>
      </div>

      {/* =======================================================
          MAIN CENTER HIERARCHY:
          NAVBAR (fixed top)
          ↓
          UNOBSTRUCTED PORTRAIT FACE (hair & head completely visible)
          ↓
          SMALL STATUS / EYEBROW PILL
          ↓
          LARGE WIDE NAME (AYUSH KUMAR AGARWAL)
          ↓
          ROLE LINE WITH RED PIPE DIVIDERS
          ↓
          DESCRIPTION
          ↓
          EXPLORE PROJECTS + DOWNLOAD RESUME
          ↓
          CONNECT WITH ME & SOCIAL ICONS
      ======================================================== */}
      <div className="relative z-10 w-full max-w-5xl 2xl:max-w-6xl mx-auto flex flex-col items-center gap-4 sm:gap-5 my-auto">
        {/* 1. Small Status / Eyebrow Pill (Below chin level) */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-orange/40 bg-black/60 backdrop-blur-md px-4 sm:px-5 py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.22em] text-white/90 shadow-[0_0_20px_rgba(249,52,52,0.15)] animate-in fade-in duration-700">
          <span className="w-2 h-2 rounded-full bg-orange shadow-[0_0_10px_#F93434] animate-pulse shrink-0" />
          <span>BUILDING AI-POWERED PRODUCTS AND FULL-STACK APPLICATIONS</span>
        </div>

        {/* 2. Large Wide Personal Wordmark (AYUSH KUMAR in white, AGARWAL in red with accent flare) */}
        <div ref={containerRef} className="relative w-full flex flex-col items-center mt-1">
          <TextParticleCanvas
            containerRef={containerRef}
            span1Ref={span1Ref}
            span2Ref={span2Ref}
          />
          <h1 className="w-full text-center font-bigger-display italic uppercase leading-[0.88] tracking-[0.04em] sm:tracking-[0.07em] md:tracking-[0.1em] text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] 2xl:text-[7.25rem] select-none relative z-0">
            <span ref={span1Ref} className="text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
              AYUSH KUMAR{" "}
            </span>
            <span ref={span2Ref} className="relative inline-block text-orange drop-shadow-[0_0_35px_rgba(249,52,52,0.5)]">
              AGARWAL
              {/* Subtle red light flare accent underneath AGARWAL matching reference image */}
              <span className="absolute -bottom-2 right-0 w-32 sm:w-48 h-[2px] bg-gradient-to-r from-transparent via-orange to-transparent opacity-80 pointer-events-none" />
            </span>
          </h1>
        </div>

        {/* 3. Professional Role Line (Divided by red pipes '|') */}
        <div className="flex flex-wrap items-center justify-center gap-y-1 font-barlow-condensed font-bold uppercase tracking-[0.22em] sm:tracking-[0.3em] text-xs sm:text-sm md:text-base text-white/90 mt-0.5">
          <span>FULL STACK DEVELOPER</span>
          <span className="text-orange mx-2.5 sm:mx-3 font-normal">|</span>
          <span>AI/ML ENTHUSIAST</span>
          <span className="text-orange mx-2.5 sm:mx-3 font-normal">|</span>
          <span>B.TECH CSBS</span>
        </div>

        {/* 4. Description */}
        <p className="max-w-xl text-xs sm:text-sm md:text-[15px] text-foreground/75 font-normal leading-relaxed tracking-wide px-4">
          Building AI-powered products, full-stack applications, and ideas that can scale.
        </p>

        {/* 5. Primary Actions (Explore Projects + Download Resume) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-1.5 sm:mt-2">
          <a
            href="#projects"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
            className="flex items-center gap-2 bg-orange hover:bg-white text-white hover:text-black transition-all duration-300 font-barlow-condensed text-xs sm:text-sm md:text-[15px] tracking-[0.16em] uppercase font-bold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-[0_0_25px_rgba(249,52,52,0.5)] hover:shadow-[0_0_35px_rgba(255,255,255,0.5)] cursor-pointer group"
          >
            <Rocket className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
            <span>EXPLORE PROJECTS</span>
            <span className="ml-0.5 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>

          <a
            href={assetsConfig.resumePdf}
            download="Ayush_Kumar_Agarwal_Resume.pdf"
            onClick={handleResumeDownload}
            onMouseEnter={() => playHover()}
            className="flex items-center gap-2 bg-black/40 hover:bg-white/10 text-white/90 border border-white/20 hover:border-orange/60 transition-all duration-300 font-barlow-condensed text-xs sm:text-sm md:text-[15px] tracking-[0.16em] uppercase font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full cursor-pointer backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            <Download className="w-4 h-4 text-orange shrink-0" />
            <span>DOWNLOAD RESUME</span>
          </a>
        </div>

        {/* 6. Connect With Me & Social Links */}
        <div className="flex flex-col items-center gap-2.5 mt-2 w-full max-w-xs sm:max-w-sm">
          {/* Subtle Technical Divider */}
          <div className="w-full flex items-center justify-center gap-3">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/15 to-white/25" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase text-white/60 font-medium whitespace-nowrap">
              CONNECT WITH ME
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-white/15 to-white/25" />
          </div>

          {/* Social Icon Square Buttons */}
          <div className="flex items-center justify-center gap-3">
            {githubLink && (
              <a
                href={githubLink.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
                className="w-10 h-10 rounded-lg border border-white/15 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-orange hover:border-orange hover:shadow-[0_0_18px_rgba(249,52,52,0.45)] transition-all duration-300 cursor-pointer"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {linkedinLink && (
              <a
                href={linkedinLink.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
                className="w-10 h-10 rounded-lg border border-white/15 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-orange hover:border-orange hover:shadow-[0_0_18px_rgba(249,52,52,0.45)] transition-all duration-300 cursor-pointer"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}

            <a
              href={`mailto:${heroContent.email}`}
              aria-label="Send Email"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="w-10 h-10 rounded-lg border border-white/15 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-orange hover:border-orange hover:shadow-[0_0_18px_rgba(249,52,52,0.45)] transition-all duration-300 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* =======================================================
          7. SCROLL DOWN INDICATOR (Mouse outline pill with red scroll wheel)
      ======================================================== */}
      <div
        aria-hidden="true"
        className="relative z-10 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity mt-2 pointer-events-none select-none"
      >
        <div className="w-5 h-8 sm:w-5.5 sm:h-9 rounded-full border border-white/30 flex items-start justify-center p-1 bg-black/40 backdrop-blur-sm">
          <div className="w-1 h-2 rounded-full bg-orange animate-scroll-wheel shadow-[0_0_8px_#F93434]" />
        </div>
        <span className="text-[9px] font-mono tracking-[0.25em] text-white/50 uppercase mt-0.5">
          SCROLL DOWN
        </span>
        <ChevronDown className="w-3 h-3 text-orange animate-bounce -mt-0.5" />
      </div>
    </section>
  );
}
