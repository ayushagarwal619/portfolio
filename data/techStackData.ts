/**
 * Tech Stack Data Layer
 * Source of truth: CONTENT.md
 */

export interface TechCategory {
  id: string;
  category: string;
  items: string[];
  isUnconfirmed?: boolean;
  description?: string;
}

export const techStackData: TechCategory[] = [
  {
    id: "languages",
    category: "Languages",
    items: [
      "C",
      "C++",
      "Java",
      "Python",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
    ],
  },
  {
    id: "frontend",
    category: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap", "Streamlit"],
  },
  {
    id: "backend",
    category: "Backend",
    items: ["Node.js", "Express.js", "Flask"],
  },
  {
    id: "database",
    category: "Database",
    items: ["MySQL", "MongoDB", "Firebase", "Supabase"],
  },
  {
    id: "ai-ml-ds",
    category: "AI / ML / Data Science",
    items: [
      "PyTorch",
      "OpenCV",
      "MediaPipe",
      "Scikit-Learn",
      "NumPy",
      "Pandas",
    ],
  },
  {
    id: "tools-devops",
    category: "Tools / DevOps",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "VS Code",
      "npm",
      "Vite",
      "Vercel",
      "Render",
      "Figma",
      "Docker",
      "Kubernetes",
      "MySQL Workbench",
    ],
  },
  {
    id: "currently-learning",
    category: "Currently Learning",
    isUnconfirmed: true,
    description: "Unconfirmed — verify before publishing",
    items: [
      "Advanced DSA & System Design",
      "Generative AI / RAG / AI Agents",
      "Neural Style Transfer (AdaIN)",
    ],
  },
];

/**
 * Helper to get a flat list of all confirmed tech stack skills.
 */
export function getAllSkills(includeUnconfirmed = false): string[] {
  return techStackData
    .filter((cat) => includeUnconfirmed || !cat.isUnconfirmed)
    .flatMap((cat) => cat.items);
}
