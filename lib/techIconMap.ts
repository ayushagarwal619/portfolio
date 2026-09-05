import React from "react";
import type { IconType } from "react-icons";
import {
  SiC,
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiHtml5,

  SiCss,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiStreamlit,
  SiNodedotjs,
  SiExpress,
  SiFlask,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiSupabase,
  SiPytorch,
  SiOpencv,
  SiScikitlearn,
  SiGit,
  SiGithub,
  SiPostman,
  SiNpm,
  SiVite,
  SiRender,
  SiFigma,
  SiDocker,
  SiExpo,
  SiPostgresql,
  SiDrizzle,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaJava } from "react-icons/fa6";
import { Brain, Puzzle, Users, Compass, Zap, Code2 } from "lucide-react";

// Alias for CSS3 and Visual Studio Code to match Simple Icons specifications
const SiCss3 = SiCss;
const SiVisualstudiocode = VscVscode;

export type TechIconType =
  | IconType
  | React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

export const techIconMap: Record<string, TechIconType> = {
  // Programming Languages
  C: SiC,
  "C++": SiCplusplus,
  Java: FaJava,
  Python: SiPython,

  JavaScript: SiJavascript,
  TypeScript: SiTypescript,

  // Web Technologies
  HTML5: SiHtml5,
  CSS3: SiCss3,
  "React.js": SiReact,
  React: SiReact,
  "Next.js": SiNextdotjs,
  Next: SiNextdotjs,
  "Node.js": SiNodedotjs,
  Node: SiNodedotjs,
  "Express.js": SiExpress,
  Express: SiExpress,

  // Frameworks & Libraries
  "React Native": SiReact,
  Expo: SiExpo,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: SiBootstrap,
  Flask: SiFlask,
  Streamlit: SiStreamlit,
  OpenCV: SiOpencv,
  "Scikit-learn": SiScikitlearn,
  "Scikit-Learn": SiScikitlearn,
  "scikit-learn": SiScikitlearn,
  PyTorch: SiPytorch,

  // Tools & Platforms
  Git: SiGit,
  GitHub: SiGithub,
  Postman: SiPostman,
  "VS Code": SiVisualstudiocode,
  "Visual Studio Code": SiVisualstudiocode,
  npm: SiNpm,
  Vite: SiVite,
  Docker: SiDocker,
  Figma: SiFigma,
  Render: SiRender,

  // Databases & Cloud
  PostgreSQL: SiPostgresql,
  Postgres: SiPostgresql,
  "Drizzle ORM": SiDrizzle,
  Drizzle: SiDrizzle,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Supabase: SiSupabase,
  Firebase: SiFirebase,

  // Soft Skills (Tasteful semantic UI icons from lucide-react)
  "Analytical Thinking": Brain,
  "Problem Solving": Puzzle,
  "Team Collaboration": Users,
  Adaptability: Compass,
  "Quick Learning": Zap,
};

/**
 * Authentic brand colors for technology logos.
 * Prevents monochromatic overrides and guarantees high-contrast visibility on dark backgrounds.
 */
export const techBrandColors: Record<string, string> = {
  // Programming Languages
  C: "#A8B9CC",
  "C++": "#00599C",
  Java: "#ED8B00",
  Python: "#3776AB",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",

  // Web Technologies
  HTML5: "#E34F26",
  CSS3: "#1572B6",
  "React.js": "#61DAFB",
  React: "#61DAFB",
  "Next.js": "#FFFFFF",
  Next: "#FFFFFF",
  "Node.js": "#5FA04E",
  Node: "#5FA04E",
  "Express.js": "#E2E8F0",
  Express: "#E2E8F0",

  // Frameworks & Libraries
  "React Native": "#61DAFB",
  Expo: "#FFFFFF",
  "Tailwind CSS": "#06B6D4",
  Bootstrap: "#9063CD",
  Flask: "#E2E8F0",
  Streamlit: "#FF4B4B",
  OpenCV: "#5C3EE8",
  "Scikit-learn": "#F7931E",
  "Scikit-Learn": "#F7931E",
  "scikit-learn": "#F7931E",
  PyTorch: "#EE4C2C",

  // Tools & Platforms
  Git: "#F05032",
  GitHub: "#FFFFFF",
  Postman: "#FF6C37",
  "VS Code": "#007ACC",
  "Visual Studio Code": "#007ACC",
  npm: "#CB3837",
  Vite: "#BD34FE",
  Docker: "#2496ED",
  Figma: "#F24E1E",
  Render: "#46E3B7",

  // Databases & Cloud
  PostgreSQL: "#4169E1",
  Postgres: "#4169E1",
  "Drizzle ORM": "#C5F74F",
  Drizzle: "#C5F74F",
  MySQL: "#4479A1",
  MongoDB: "#47A248",
  Supabase: "#3ECF8E",
  Firebase: "#FFCA28",
};

/**
 * Resolves a technology or skill name to its corresponding icon component.
 */
export function getTechIcon(name: string): TechIconType | undefined {
  if (techIconMap[name]) {
    return techIconMap[name];
  }

  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  for (const [key, icon] of Object.entries(techIconMap)) {
    if (key.toLowerCase().replace(/[^a-z0-9]/g, "") === normalized) {
      return icon;
    }
  }

  return undefined;
}

/**
 * Resolves a technology name to its official brand hex color.
 */
export function getTechBrandColor(name: string): string | undefined {
  if (techBrandColors[name]) {
    return techBrandColors[name];
  }

  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  for (const [key, color] of Object.entries(techBrandColors)) {
    if (key.toLowerCase().replace(/[^a-z0-9]/g, "") === normalized) {
      return color;
    }
  }

  return undefined;
}

/**
 * Reusable TechIcon component with built-in authentic brand coloring.
 */
export function TechIcon({
  name,
  className,
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const IconComponent = getTechIcon(name) || Code2;
  const brandColor = getTechBrandColor(name);
  const combinedStyle = brandColor ? { color: brandColor, ...style } : style;

  return React.createElement(IconComponent, {
    className,
    style: combinedStyle,
  });
}
