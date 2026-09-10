"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Download, Menu, X, Github, Linkedin } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { playClick, playHover } from "@/lib/soundEffects";
import { assetsConfig } from "@/data/bioData";

const NAV_LINKS = [
  { label: "Home", href: "#hero", id: "hero" },
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Certificates", href: "#certificates", id: "certificates" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com/ayushagarwal619", Icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/ayushagarwal619", Icon: Linkedin },
];

export default function Navbar() {
  const { isNavbarOpen, setIsNavbarOpen } = useAppContext();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("hero");
  const isNavigatingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsNavbarOpen(false);
  }, [pathname, setIsNavbarOpen]);

  useEffect(() => {
    document.body.style.overflow = isNavbarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isNavbarOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isNavigatingRef.current) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. Top of page -> Home
      if (scrollPosition < 150) {
        setActiveSection("hero");
        return;
      }

      // 2. Bottom of page -> Contact
      if (windowHeight + scrollPosition >= documentHeight - 60) {
        setActiveSection("contact");
        return;
      }

      // 3. Determine active section based on viewport position
      const offsetThreshold = 200;
      let currentSection = "hero";

      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offsetThreshold && rect.bottom > offsetThreshold) {
            currentSection = link.id;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: { href: string; id: string }
  ) => {
    playClick();

    e.preventDefault();

    isNavigatingRef.current = true;
    setActiveSection(link.id);

    if (isNavbarOpen) {
      setIsNavbarOpen(false);
    }

    const targetEl = document.getElementById(link.id);
    if (link.id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (targetEl) {
      const navOffset = 80;
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 850);
  };

  return (
    <>
      {/* Floating HUD Navigation */}
      <header className="fixed top-5 left-6 right-6 max-w-7xl mx-auto z-[999] pointer-events-none">
        <div className="w-full flex items-center justify-between gap-4 pointer-events-auto">
          {/* LEFT: Compact AKA Logo & Technical Subtitle */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              aria-label="Ayush Kumar Agarwal (AKA)"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="relative z-[1000] flex items-center group transition-transform duration-300 hover:scale-105"
            >
              <Image
                src="/Images/logo-mark.svg"
                alt="AKA Logo"
                width={110}
                height={44}
                priority
                className="h-6 md:h-7 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(249,52,52,0.4)]"
              />
            </Link>

            <span className="hidden xl:inline-flex items-center gap-2 border-l border-white/15 pl-3.5 text-[9px] font-mono tracking-widest text-foreground/50 uppercase select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse shadow-[0_0_6px_#f93434]" />
              DEVELOPER // CREATOR // LEARNER
            </span>
          </div>

          {/* CENTER: Navigation with Active Red Accent */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-10">
            {NAV_LINKS.map((link, idx) => {
              const isActive = activeSection === link.id;
              return (
                <React.Fragment key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    onMouseEnter={() => playHover()}
                    className={`group relative flex items-center gap-1.5 font-barlow-condensed text-xs lg:text-sm tracking-[.18rem] uppercase font-semibold transition-all duration-300 ${
                      isActive
                        ? "text-orange drop-shadow-[0_0_8px_rgba(249,52,52,0.6)]"
                        : "text-foreground/75 hover:text-white hover:drop-shadow-[0_0_8px_rgba(249,52,52,0.4)]"
                    }`}
                  >
                    {/* Active Glowing Dot */}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-orange shadow-[0_0_8px_#f93434]" />
                    )}
                    <span>{link.label}</span>
                    {/* Subtle Underline Accent */}
                    <span
                      className={`absolute -bottom-1 left-0 h-[1.5px] bg-orange transition-all duration-300 ${
                        isActive ? "w-full shadow-[0_0_6px_#f93434]" : "w-0 group-hover:w-full opacity-60"
                      }`}
                    />
                  </a>

                  {/* Micro HUD Accent Dot between navigation items */}
                  {idx < NAV_LINKS.length - 1 && (
                    <span className="hidden xl:inline-block w-1 h-1 rounded-full bg-white/15 select-none" />
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* RIGHT: Separate Premium Red-Accent Resume CTA */}
          <div className="flex items-center gap-3">
            <a
              href={assetsConfig.resumePdf}
              download="Ayush_Kumar_Agarwal_Resume.pdf"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="group hidden lg:inline-flex items-center gap-2 border border-orange/40 hover:border-orange bg-orange/[0.08] hover:bg-orange/[0.16] backdrop-blur-md rounded-full px-4 py-1.5 font-barlow-condensed text-xs tracking-[.14rem] uppercase font-semibold text-foreground hover:text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(249,52,52,0.4)]"
            >
              <Download className="h-3.5 w-3.5 text-orange transition-transform duration-300 group-hover:translate-y-0.5" />
              <span>Download Resume</span>
            </a>

            {/* Mobile Navigation Toggle */}
            <button
              onClick={() => {
                playClick();
                setIsNavbarOpen((prev) => !prev);
              }}
              aria-label={isNavbarOpen ? "Close menu" : "Open menu"}
              className="md:hidden relative z-[1000] w-9 h-9 flex items-center justify-center text-foreground cursor-pointer transition-colors"
            >
              {isNavbarOpen ? <X className="w-6 h-6 text-orange" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile HUD Fullscreen Overlay */}
      <div
        className={`fixed inset-0 z-[998] bg-background/95 backdrop-blur-2xl flex flex-col items-start justify-center px-8 gap-6 transition-all duration-500 ease-in-out md:hidden ${
          isNavbarOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        {NAV_LINKS.map((link, idx) => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              style={{ transitionDelay: isNavbarOpen ? `${idx * 50}ms` : "0ms" }}
              className={`font-bigger-display text-4xl uppercase transition-all duration-300 flex items-center gap-3 ${
                isActive
                  ? "text-orange drop-shadow-[0_0_12px_rgba(249,52,52,0.6)] translate-x-2"
                  : "text-foreground hover:text-orange"
              }`}
            >
              {isActive && <span className="w-2.5 h-2.5 rounded-full bg-orange shadow-[0_0_10px_#f93434]" />}
              <span>{link.label}</span>
            </a>
          );
        })}

        {/* Mobile Download Resume CTA */}
        <a
          href={assetsConfig.resumePdf}
          download="Ayush_Kumar_Agarwal_Resume.pdf"
          onClick={() => {
            playClick();
            setIsNavbarOpen(false);
          }}
          className="mt-4 inline-flex items-center gap-2.5 border border-orange/40 bg-orange/[0.12] rounded-full px-6 py-2.5 font-barlow-condensed text-sm tracking-[.16rem] uppercase font-semibold text-white shadow-[0_0_15px_rgba(249,52,52,0.3)]"
        >
          <Download className="h-4 w-4 text-orange" />
          <span>Download Resume</span>
        </a>

        <div className="flex items-center gap-5 mt-6">
          {SOCIAL_LINKS.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              onClick={() => playClick()}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-foreground hover:bg-orange hover:border-orange hover:text-background transition-all duration-300"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
