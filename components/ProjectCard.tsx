"use client";

import React from "react";
import { ProjectItem } from "@/data/projectsData";
import { ExternalLink, Github, Users, Sparkles } from "lucide-react";
import { playClick, playHover } from "@/lib/soundEffects";
import ProjectImageCarousel from "./ProjectImageCarousel";

export default function ProjectCard({ project }: { project: ProjectItem }) {
  const hasImages = project.images && project.images.length > 0;

  return (
    <div className="group relative rounded-2xl border border-white/10 bg-[#171616] hover:border-orange/50 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-orange/5">
      {/* Visual Header: Only rendered when project has screenshots */}
      {hasImages && (
        <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-gradient-to-br from-[#1c1b1b] via-[#151414] to-[#0f0f0f] border-b border-white/5">
          <ProjectImageCarousel images={project.images} alt={project.title} />
        </div>
      )}

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1 justify-between gap-5 text-left">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-2xl font-bold font-barlow-condensed tracking-wide uppercase text-foreground">
              {project.title}
            </h3>
            {project.status === "in-progress" ? (
              <span className="text-[11px] font-barlow-condensed uppercase tracking-wider text-amber-400 font-semibold">
                In Progress
              </span>
            ) : project.featured ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-barlow-condensed tracking-wider uppercase text-orange bg-orange/10 px-2 py-0.5 rounded border border-orange/20">
                <Sparkles className="w-3 h-3" /> Featured
              </span>
            ) : null}
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
          <div className="text-xs font-barlow-condensed uppercase tracking-wider text-foreground/60 bg-white/[0.03] p-2.5 rounded-lg border border-white/5 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-orange shrink-0" />
            <span>
              <strong className="text-orange">{project.teamInfo.teamName || "Team"}:</strong>{" "}
              {project.teamInfo.contribution}
            </span>
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
