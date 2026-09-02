"use client";

import React, { useState } from "react";
import { projectsData } from "@/data/projectsData";
import ProjectCard from "./ProjectCard";
import { Sparkles, Grid } from "lucide-react";

export default function ProjectsSection() {
  const [filter, setFilter] = useState<"all" | "featured">("all");

  const featuredProjects = projectsData.filter((p) => p.featured);
  const otherProjects = projectsData.filter((p) => !p.featured);

  const displayedProjects =
    filter === "featured" ? featuredProjects : projectsData;

  return (
    <section id="projects" className="w-full py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <p className="font-barlow-condensed text-xs sm:text-sm tracking-[.35rem] sm:tracking-[.5rem] uppercase text-orange font-bold">
          SELECTED WORK
        </p>
        <h2 className="text-3xl sm:text-5xl font-bigger-display uppercase tracking-wide text-foreground">
          FEATURED & LAB PROJECTS
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-foreground/70 font-normal">
          Real-world applications spanning AI/ML, computer vision, full-stack systems, and civic-tech platforms.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <button
          onClick={() => setFilter("all")}
          className={`flex items-center gap-1.5 text-xs font-barlow-condensed uppercase tracking-widest font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer ${
            filter === "all"
              ? "bg-orange text-background border-orange font-bold"
              : "bg-white/5 text-foreground/70 border-white/10 hover:border-white/20"
          }`}
        >
          <Grid className="w-3.5 h-3.5" /> All Projects ({projectsData.length})
        </button>
        <button
          onClick={() => setFilter("featured")}
          className={`flex items-center gap-1.5 text-xs font-barlow-condensed uppercase tracking-widest font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer ${
            filter === "featured"
              ? "bg-orange text-background border-orange font-bold"
              : "bg-white/5 text-foreground/70 border-white/10 hover:border-white/20"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> Featured Only ({featuredProjects.length})
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
