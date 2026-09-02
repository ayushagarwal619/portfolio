"use client";

import React from "react";
import { bioContent, heroContent } from "@/data/bioData";
import { GraduationCap, Code2, Rocket, Award, ExternalLink } from "lucide-react";
import { playClick, playHover } from "@/lib/soundEffects";

export default function AboutSection() {
  const stats = [
    { label: "Shipped Products", value: "3+", desc: "SmartAttend, GymGuru, JanSewa" },
    { label: "Hackathons & Challenges", value: "12+", desc: "National & Global Events" },
    { label: "Verified Milestones", value: "15+", desc: "Certifications & Simulations" },
  ];

  return (
    <section id="about" className="w-full py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="flex flex-col items-center text-center gap-4 mb-14">
        <p className="font-barlow-condensed text-xs sm:text-sm tracking-[.35rem] sm:tracking-[.5rem] uppercase text-orange font-bold">
          BACKGROUND & PHILOSOPHY
        </p>
        <h2 className="text-3xl sm:text-5xl font-bigger-display uppercase tracking-wide text-foreground">
          ABOUT ME
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
        {/* Left Column: Short Bio & Degree Info */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="rounded-2xl border border-white/10 bg-[#171616] p-6 sm:p-8">
            <h3 className="text-2xl sm:text-3xl font-bold font-barlow-condensed uppercase tracking-wide text-foreground mb-4">
              Building at the intersection of AI, Systems & Products
            </h3>
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
              {bioContent.shortBio}
            </p>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-start gap-3 text-sm text-foreground/70">
              <GraduationCap className="w-5 h-5 text-orange shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground">Computer Science & Business Systems</strong>
                <p className="text-xs text-foreground/50 uppercase tracking-wider font-barlow-condensed mt-0.5">
                  Heritage Institute of Technology, Kolkata
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Key Stats & Focus */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-[#171616] p-6 flex items-center justify-between hover:border-orange/30 transition-all"
            >
              <div>
                <p className="font-bigger-display text-4xl sm:text-5xl text-orange">
                  {stat.value}
                </p>
                <h4 className="text-sm sm:text-base font-bold font-barlow-condensed uppercase tracking-wider text-foreground mt-1">
                  {stat.label}
                </h4>
                <p className="text-xs text-foreground/50 font-mono mt-0.5">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
