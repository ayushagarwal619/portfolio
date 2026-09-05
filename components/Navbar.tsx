"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Download, Menu, X, Github, Linkedin } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { playClick, playHover } from "@/lib/soundEffects";
import { assetsConfig } from "@/data/bioData";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com/ayushagarwal619", Icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/ayushagarwal619", Icon: Linkedin },
];

export default function Navbar() {
  const { isNavbarOpen, setIsNavbarOpen } = useAppContext();
  const pathname = usePathname();

  useEffect(() => {
    setIsNavbarOpen(false);
  }, [pathname, setIsNavbarOpen]);

  useEffect(() => {
    document.body.style.overflow = isNavbarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isNavbarOpen]);

  return (
    <>
      <header className="fixed top-4 left-4 right-4 max-w-6xl mx-auto z-[999] flex items-center justify-between gap-4 rounded-xl border border-orange/25 bg-background/85 px-5 py-2.5 sm:py-3 md:px-7 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(249,52,52,0.06)]">
        {/* AKA Logo Mark */}
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
            className="h-7 md:h-8 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-4 lg:gap-5 xl:gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
                className={`font-barlow-condensed text-xs lg:text-sm tracking-[.15rem] lg:tracking-[.2rem] uppercase font-semibold transition-opacity duration-300 ${
                  isActive ? "text-orange" : "text-foreground hover:opacity-60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <a
          href={assetsConfig.resumePdf}
          download="Ayush_Kumar_Agarwal_Resume.pdf"
          onClick={() => playClick()}
          onMouseEnter={() => playHover()}
          className="hidden lg:flex items-center gap-2 rounded-lg border border-orange/60 px-3 py-2 font-barlow-condensed text-xs tracking-[.14rem] uppercase text-foreground transition-colors hover:bg-orange hover:text-background xl:px-4"
        >
          <Download className="h-3.5 w-3.5" />
          Download Resume
        </a>

        <button
          onClick={() => {
            playClick();
            setIsNavbarOpen((prev) => !prev);
          }}
          aria-label={isNavbarOpen ? "Close menu" : "Open menu"}
          className="md:hidden relative z-[1000] w-10 h-10 flex items-center justify-center text-foreground cursor-pointer"
        >
          {isNavbarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      <div
        className={`fixed inset-0 z-[998] bg-background flex flex-col items-start justify-center px-8 gap-6 transition-all duration-500 ease-in-out md:hidden ${
          isNavbarOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        {NAV_LINKS.map((link, idx) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => playClick()}
            style={{ transitionDelay: isNavbarOpen ? `${idx * 60}ms` : "0ms" }}
            className="font-bigger-display text-4xl uppercase text-foreground transition-transform duration-300"
          >
            {link.label}
          </Link>
        ))}

        <div className="flex items-center gap-5 mt-10">
          {SOCIAL_LINKS.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              onClick={() => playClick()}
              className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-foreground hover:bg-orange hover:border-orange hover:text-[#131212] transition-all duration-300"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
