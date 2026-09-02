import React from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import TechStackSection from "@/components/TechStackSection";
import CertificatesSection from "@/components/CertificatesSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactSection from "@/components/ContactSection";
import ParticleCanvas from "@/components/ParticleCanvas";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col items-center">
      {/* Interactive WebGL particle canvas for background visual interest */}
      <ParticleCanvas />

      {/* Main Sections */}
      <main className="w-full flex flex-col items-center z-10">
        <HeroSection />

        <AboutSection />

        <ProjectsSection />

        {/* Tech Stack Section */}
        <section id="skills" className="w-full py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="flex flex-col items-center text-center gap-4 mb-14">
            <p className="font-barlow-condensed text-xs sm:text-sm tracking-[.35rem] sm:tracking-[.5rem] uppercase text-orange font-bold">
              CAPABILITIES & TOOLING
            </p>
            <h2 className="text-3xl sm:text-5xl font-bigger-display uppercase tracking-wide text-foreground">
              TECHNICAL STACK
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-foreground/70 font-normal">
              Frameworks, languages, ML libraries, databases, and development tooling used to build scalable products.
            </p>
          </div>
          <TechStackSection />
        </section>

        {/* Certificates & Achievements Section */}
        <section id="certificates" className="w-full py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="flex flex-col items-center text-center gap-4 mb-14">
            <p className="font-barlow-condensed text-xs sm:text-sm tracking-[.35rem] sm:tracking-[.5rem] uppercase text-orange font-bold">
              VERIFIED CREDENTIALS
            </p>
            <h2 className="text-3xl sm:text-5xl font-bigger-display uppercase tracking-wide text-foreground">
              CERTIFICATES & ACHIEVEMENTS
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-foreground/70 font-normal">
              Official recognitions across hackathons, job simulations, technical workshops, and specialized courses.
            </p>
          </div>
          <CertificatesSection />
        </section>

        {/* Experience & Timeline Section */}
        <section id="experience" className="w-full py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="flex flex-col items-center text-center gap-4 mb-14">
            <p className="font-barlow-condensed text-xs sm:text-sm tracking-[.35rem] sm:tracking-[.5rem] uppercase text-orange font-bold">
              TIMELINE & ROLES
            </p>
            <h2 className="text-3xl sm:text-5xl font-bigger-display uppercase tracking-wide text-foreground">
              EXPERIENCE & SPRINT TRACKS
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-foreground/70 font-normal">
              Startup co-founding, competitive hackathon building sprints, and industry job simulations.
            </p>
          </div>
          <ExperienceTimeline />
        </section>

        <ContactSection />
      </main>
    </div>
  );
}
