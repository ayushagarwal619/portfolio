"use client";

import { heroContent, assetsConfig, socialLinks } from "@/data/bioData";
import { Download, Rocket, Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { playClick, playHover } from "@/lib/soundEffects";

export default function HeroSection() {
  const handleResumeDownload = () => {
    playClick();
  };

  const githubLink = socialLinks.find((s) => s.name.toLowerCase().includes("github"));
  const linkedinLink = socialLinks.find((s) => s.name.toLowerCase().includes("linkedin"));

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-28 pb-20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        {/* Hero Eyebrow Pill */}
        <div className="inline-flex items-center gap-3 rounded-full border border-orange/40 bg-orange/5 px-4 py-2 text-[10px] sm:text-xs font-barlow-condensed font-semibold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-foreground animate-in fade-in duration-700">
          <span className="h-2 w-2 shrink-0 rounded-full bg-orange shadow-[0_0_10px_rgba(249,52,52,0.9)]" />
          <span>{heroContent.terminalLine.replace(/^>\s*/, "")}</span>
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
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <a
            href="#projects"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
            className="flex items-center gap-2.5 bg-orange text-background hover:bg-white transition-all font-barlow-condensed text-sm sm:text-base tracking-widest uppercase font-bold px-7 py-3.5 rounded-full shadow-lg shadow-orange/20"
          >
            <Rocket className="w-4 h-4 shrink-0" />
            Explore Projects
          </a>

          <a
            href={assetsConfig.resumePdf}
            download="Ayush_Kumar_Agarwal_Resume.pdf"
            onClick={handleResumeDownload}
            onMouseEnter={() => playHover()}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-foreground border border-white/15 hover:border-orange/50 transition-all font-barlow-condensed text-sm sm:text-base tracking-widest uppercase font-semibold px-7 py-3.5 rounded-full"
          >
            <Download className="w-4 h-4 text-orange shrink-0" />
            Download Resume
          </a>
        </div>

        {/* Connect With Me Section */}
        <div className="flex flex-col items-center gap-3.5 mt-3 w-full max-w-xs sm:max-w-sm">
          {/* Divider Line */}
          <div className="w-full flex items-center justify-center gap-3">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/15 to-white/20" />
            <span className="text-[11px] sm:text-xs font-barlow-condensed tracking-[0.22em] uppercase text-orange font-bold whitespace-nowrap">
              CONNECT WITH ME
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-white/15 to-white/20" />
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
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-sm flex items-center justify-center text-foreground/80 hover:text-background hover:bg-orange hover:border-orange hover:shadow-lg hover:shadow-orange/25 transition-all duration-300"
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
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-sm flex items-center justify-center text-foreground/80 hover:text-background hover:bg-orange hover:border-orange hover:shadow-lg hover:shadow-orange/25 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}

            <a
              href="mailto:ayushagarwal619@gmail.com"
              aria-label="Send Email"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-sm flex items-center justify-center text-foreground/80 hover:text-background hover:bg-orange hover:border-orange hover:shadow-lg hover:shadow-orange/25 transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-75 hover:opacity-100 transition-opacity pointer-events-none">
        <div className="w-5 h-9 sm:w-6 sm:h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1 sm:p-1.5 bg-black/20 backdrop-blur-[2px]">
          <div className="w-1.5 h-2 rounded-full bg-orange animate-scroll-wheel" />
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-orange animate-pulse" />
      </div>
    </section>
  );
}
