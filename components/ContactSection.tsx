"use client";

import React from "react";
import { heroContent, assetsConfig, socialLinks } from "@/data/bioData";
import { Download, Mail, ArrowUpRight, Github, Linkedin, Heart } from "lucide-react";
import { playClick, playHover } from "@/lib/soundEffects";

export default function ContactSection() {
  return (
    <footer id="contact" className="w-full py-24 px-6 border-t border-white/10 bg-[#0e0d0d] text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        <p className="font-barlow-condensed text-xs sm:text-sm tracking-[.35rem] sm:tracking-[.5rem] uppercase text-orange font-bold">
          LET&apos;S COLLABORATE
        </p>

        <h2 className="text-4xl sm:text-6xl font-bigger-display uppercase tracking-wide text-foreground">
          START A CONVERSATION
        </h2>

        <p className="max-w-xl text-base text-foreground/70 leading-relaxed">
          Whether you have an innovative AI product in mind, a hackathon team to form, or a full-stack opportunity, let&apos;s connect.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <a
            href="mailto:ayushagarwal619@gmail.com"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
            className="flex items-center gap-2 bg-orange text-background hover:bg-white transition-all font-barlow-condensed text-sm sm:text-base tracking-widest uppercase font-bold px-7 py-3.5 rounded-full shadow-lg shadow-orange/20"
          >
            <Mail className="w-4 h-4" />
            Send Email
          </a>

          <a
            href={assetsConfig.resumePdf}
            download="Ayush_Kumar_Agarwal_Resume.pdf"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-foreground border border-white/15 hover:border-orange/50 transition-all font-barlow-condensed text-sm sm:text-base tracking-widest uppercase font-semibold px-7 py-3.5 rounded-full"
          >
            <Download className="w-4 h-4 text-orange" />
            Download Resume
          </a>
        </div>

        {/* Social Icons & External Links */}
        <div className="flex items-center gap-6 mt-6">
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              className="flex items-center gap-1.5 text-xs font-barlow-condensed tracking-widest uppercase text-foreground/60 hover:text-orange transition-colors"
            >
              {s.name === "GitHub" ? <Github className="w-4 h-4" /> : <Linkedin className="w-4 h-4" />}
              <span>{s.name}</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/5 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-foreground/40 font-mono gap-4">
          <p>© {new Date().getFullYear()} {heroContent.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with Next.js, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
