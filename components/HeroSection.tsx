"use client";

import React, { useState } from "react";
import Image from "next/image";
import { heroContent, assetsConfig, socialLinks } from "@/data/bioData";
import { Download, ArrowUpRight, Terminal, Github, Linkedin, Sparkles } from "lucide-react";
import { playClick, playHover } from "@/lib/soundEffects";

export default function HeroSection() {
  const [imgError, setImgError] = useState(false);
  const hasPortrait = !!assetsConfig.profilePortrait && !imgError && assetsConfig.profilePortrait.length > 0;

  const handleResumeDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    playClick();
    // Safe graceful handling if file is not yet dropped into /public
    // Link still points to /resume.pdf and triggers browser download
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 pt-28 pb-16 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        {/* Terminal line badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-orange/30 bg-orange/5 text-orange text-xs sm:text-sm font-mono tracking-wider animate-in fade-in duration-700">
          <Terminal className="w-3.5 h-3.5 animate-pulse" />
          <span>{heroContent.terminalLine}</span>
        </div>

        {/* Profile Avatar: Portrait Image OR Monogram Fallback */}
        <div className="relative my-2">
          {hasPortrait ? (
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-orange/40 shadow-xl shadow-orange/10">
              <Image
                src={assetsConfig.profilePortrait}
                alt={heroContent.name}
                fill
                priority
                onError={() => setImgError(true)}
                className="object-cover"
              />
            </div>
          ) : (
            /* Premium Monogram Fallback Badge */
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-orange/30 bg-gradient-to-br from-[#1f1a1a] via-[#141212] to-[#0d0d0d] flex flex-col items-center justify-center shadow-xl shadow-orange/10 group hover:border-orange transition-all duration-300">
              <div className="absolute inset-0 bg-orange/5 rounded-2xl blur-sm" />
              <span className="relative font-bigger-display text-3xl sm:text-4xl uppercase tracking-widest text-foreground">
                AKA
              </span>
              <span className="relative text-[9px] font-barlow-condensed tracking-widest uppercase text-orange font-bold -mt-1">
                DEV · AI/ML
              </span>
            </div>
          )}
        </div>

        {/* Name & Title */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bigger-display uppercase tracking-wide text-foreground">
            {heroContent.name}
          </h1>

          <p className="text-base sm:text-xl font-barlow-condensed uppercase tracking-[0.2em] sm:tracking-[0.25em] text-orange font-bold">
            {heroContent.primaryTitle}
          </p>
        </div>

        {/* Headline */}
        <p className="max-w-2xl text-base sm:text-lg text-foreground/80 font-normal leading-relaxed">
          {heroContent.headline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <a
            href="#projects"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
            className="flex items-center gap-2 bg-orange text-background hover:bg-white transition-all font-barlow-condensed text-sm sm:text-base tracking-widest uppercase font-bold px-6 py-3.5 rounded-full shadow-lg shadow-orange/20"
          >
            Explore Projects
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href={assetsConfig.resumePdf}
            download="Ayush_Kumar_Agarwal_Resume.pdf"
            onClick={handleResumeDownload}
            onMouseEnter={() => playHover()}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-foreground border border-white/15 hover:border-orange/50 transition-all font-barlow-condensed text-sm sm:text-base tracking-widest uppercase font-semibold px-6 py-3.5 rounded-full"
          >
            <Download className="w-4 h-4 text-orange" />
            Download Resume
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 mt-2">
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              className="flex items-center gap-1.5 text-xs font-barlow-condensed tracking-wider uppercase text-foreground/50 hover:text-orange transition-colors"
            >
              {s.name === "GitHub" ? <Github className="w-4 h-4" /> : <Linkedin className="w-4 h-4" />}
              <span>{s.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
