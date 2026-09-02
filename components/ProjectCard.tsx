"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProjectItem } from "@/data/projectsData";
import { ExternalLink, Github, Users, Sparkles, Code2, Layers, Clock, CheckCircle2 } from "lucide-react";
import { playClick, playHover } from "@/lib/soundEffects";

export default function ProjectCard({ project }: { project: ProjectItem }) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [imgError, setImgError] = useState(false);

  const hasImages = project.images && project.images.length > 0 && !imgError;

  return (
    <div className="group relative rounded-2xl border border-white/10 bg-[#171616] hover:border-orange/50 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-orange/5">
      {/* Visual Header: Image Gallery OR Gradient/Technical Visual Fallback */}
      <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-gradient-to-br from-[#1c1b1b] via-[#151414] to-[#0f0f0f] border-b border-white/5 flex items-center justify-center">
        {hasImages ? (
          <>
            <Image
              src={project.images[activeImageIdx]}
              alt={project.title}
              fill
              onError={() => setImgError(true)}
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {project.images.length > 1 && (
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 z-10">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { playClick(); setActiveImageIdx(i); }}
                    aria-label={`Show image ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeImageIdx === i ? "bg-orange w-4" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          /* Premium Fallback for 0 Images: Technical Blueprint & Code Texture */
          <div className="relative w-full h-full p-6 flex flex-col justify-between overflow-hidden">
            {/* Ambient background glow & grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-orange/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between z-10">
              <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-orange font-bold font-barlow-condensed bg-orange/10 px-2.5 py-1 rounded-md border border-orange/20">
                <Code2 className="w-3.5 h-3.5" />
                {project.techStack[0] || "Codebase"}
              </span>

              {project.status === "in-progress" ? (
                <span className="flex items-center gap-1.5 text-xs text-amber-400 font-barlow-condensed tracking-wider uppercase bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                  <Clock className="w-3 h-3 animate-spin" /> In Progress
                </span>
              ) : project.status === "ongoing" ? (
                <span className="flex items-center gap-1.5 text-xs text-blue-400 font-barlow-condensed tracking-wider uppercase bg-blue-400/10 px-2.5 py-1 rounded-md border border-blue-400/20">
                  <Layers className="w-3 h-3" /> Ongoing Lab
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-barlow-condensed tracking-wider uppercase bg-emerald-400/10 px-2.5 py-1 rounded-md border border-emerald-400/20">
                  <CheckCircle2 className="w-3 h-3" /> Deployed
                </span>
              )}
            </div>

            {/* Central Monogram / Title Preview */}
            <div className="my-auto text-left z-10">
              <h4 className="font-bigger-display text-3xl sm:text-4xl uppercase tracking-wide text-foreground/90 group-hover:text-orange transition-colors">
                {project.title}
              </h4>
              <p className="text-xs sm:text-sm font-barlow-condensed uppercase tracking-wider text-foreground/50 mt-1 line-clamp-1">
                {project.tagline}
              </p>
            </div>

            {/* Bottom Meta Pill */}
            <div className="flex items-center gap-2 z-10">
              {project.teamInfo.isTeam ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-barlow-condensed tracking-wider uppercase text-foreground/70 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  <Users className="w-3 h-3 text-orange" /> {project.teamInfo.teamName || "Team Project"}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-barlow-condensed tracking-wider uppercase text-foreground/50 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  Solo Project
                </span>
              )}
              {project.featured && (
                <span className="inline-flex items-center gap-1 text-[11px] font-barlow-condensed tracking-wider uppercase text-orange bg-orange/10 px-2 py-0.5 rounded border border-orange/20">
                  <Sparkles className="w-3 h-3" /> Featured
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1 justify-between gap-5 text-left">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-2xl font-bold font-barlow-condensed tracking-wide uppercase text-foreground">
              {project.title}
            </h3>
            {project.status === "in-progress" && (
              <span className="text-[11px] font-barlow-condensed uppercase tracking-wider text-amber-400 font-semibold">
                In Progress
              </span>
            )}
          </div>

          <p className="text-sm font-barlow-condensed text-orange font-semibold tracking-wider uppercase mb-3">
            {project.tagline}
          </p>

          <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3">
            {project.shortDescription}
          </p>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-foreground/70 border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Team / Hackathon note if present */}
        {project.teamInfo.isTeam && project.teamInfo.contribution && (
          <div className="text-xs font-barlow-condensed uppercase tracking-wider text-foreground/60 bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
            <span className="text-orange font-bold">Role: </span>
            {project.teamInfo.contribution}
          </div>
        )}

        {/* Action Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-white/5">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="flex items-center gap-1.5 text-xs font-barlow-condensed uppercase tracking-widest font-bold text-background bg-orange hover:bg-white transition-colors px-3.5 py-2 rounded-lg"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="flex items-center gap-1.5 text-xs font-barlow-condensed uppercase tracking-widest font-semibold text-foreground/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 rounded-lg transition-colors"
            >
              <Github className="w-3.5 h-3.5" /> Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
