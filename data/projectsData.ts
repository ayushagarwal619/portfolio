/**
 * Projects Data Layer
 * Source of truth: CONTENT.md
 */

export type ProjectStatus = "completed" | "in-progress" | "ongoing" | "archived";

export interface ProjectTeamInfo {
  isTeam: boolean;
  teamName?: string;
  role?: string;
  contribution?: string;
  note?: string;
}

export interface ProjectHackathonInfo {
  name: string;
  track?: string;
  result?: string;
  organizer?: string;
  certificateId?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  featured: boolean;
  status: ProjectStatus;
  statusLabel: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  liveDemoUrl?: string | null;
  githubUrl?: string | null;
  images: string[];
  teamInfo: ProjectTeamInfo;
  hackathon?: ProjectHackathonInfo;
  contributions?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "smartattend",
    title: "SmartAttend",
    featured: true,
    status: "completed",
    statusLabel: "Completed & Deployed",
    tagline: "AI-powered attendance, zero manual roll-calls",
    shortDescription:
      "Automated attendance system using face and voice biometrics with cloud database syncing, separate dashboards, and session analytics.",
    fullDescription:
      "Automated attendance system that recognizes students from classroom photos or audio clips using face and voice biometrics, cross-checks them against enrolled profiles, and writes verified attendance to a cloud database — with separate Teacher and Student dashboards, QR-based self-enrollment, and session analytics.",
    techStack: [
      "Python",
      "Streamlit",
      "dlib (face recognition + SVM)",
      "Resemblyzer (voice recognition)",
      "Supabase",
      "NumPy",
      "Pandas",
      "bcrypt",
    ],
    liveDemoUrl: "https://smartattend-a.streamlit.app/",
    githubUrl: "https://github.com/ayushagarwal619/SMARTATTEND",
    images: [
      "/Images/Projects/SmartAttend/smartattend-landing.jpg",
      "/Images/Projects/SmartAttend/smartattend-face-login.jpg",
      "/Images/Projects/SmartAttend/smartattend-student-dashboard.jpg",
    ],
    teamInfo: {
      isTeam: false,
      role: "Solo Developer",
    },
  },
  {
    id: "gymguru",
    title: "GymGuru",
    featured: true,
    status: "completed",
    statusLabel: "Completed & Deployed",
    tagline: "Your AI personal trainer, right in the browser",
    shortDescription:
      "Real-time fitness coach using live pose detection to track exercise form, count reps/sets, flag errors, and provide spoken AI coaching.",
    fullDescription:
      "Real-time fitness coach using live pose detection to track exercise form (squats, push-ups, curls, shoulder press, lunges), auto-counts reps and sets, flags form mistakes, and gives spoken AI coaching via an LLM — all through webcam, no wearables needed.",
    techStack: [
      "Python",
      "Streamlit",
      "MediaPipe (pose landmarks)",
      "OpenCV",
      "Groq (LLaMA 3.3 70B)",
      "gTTS",
      "SQLite",
    ],
    liveDemoUrl: "https://gymguru-1.onrender.com/",
    githubUrl: "https://github.com/ayushagarwal619/GymGuru",
    images: [
      "/Images/Projects/GymGuru/gymguru-landing.jpg",
      "/Images/Projects/GymGuru/gymguru-dashboard.png",
      "/Images/Projects/GymGuru/gymguru-features.jpg",
    ],
    teamInfo: {
      isTeam: false,
      role: "Solo Developer",
    },
  },
  {
    id: "jansewa",
    title: "JanSewa",
    featured: true,
    status: "completed",
    statusLabel: "Completed & Deployed",
    tagline: "Sarkar Aapke Dwaar — government at your doorstep",
    shortDescription:
      "Civic-tech platform connecting citizens with government welfare schemes, GPS-tagged grievance reporting, SLA escalation, and SHA-256 tamper detection.",
    fullDescription:
      "Civic-tech platform connecting citizens with government welfare schemes and enabling transparent grievance reporting. Citizens get AI-powered scheme matching, GPS-tagged complaint submission (with anonymous reporting), a locator for nearby assistance camps, and a bilingual (English/Hindi) voice+text AI assistant. Admins get a department-scoped dashboard, a geographic grievance map, and automated SLA-based escalation. Uses SHA-256 hash-chaining on status updates so tampering with complaint history is cryptographically detectable.",
    techStack: [
      "React 19",
      "Vite",
      "React Router",
      "Leaflet",
      "Chart.js/Recharts",
      "Node.js",
      "Express 5",
      "MongoDB (2dsphere geospatial queries)",
      "Mongoose",
      "JWT + bcryptjs",
      "Groq SDK",
      "node-cron",
    ],
    liveDemoUrl: "https://jansewa-vert.vercel.app/",
    githubUrl: "https://github.com/ayushagarwal619/JANSEWA",
    images: [
      "/Images/Projects/JanSewa/jansewa-home.jpg",
      "/Images/Projects/JanSewa/jansewa-grievance.png",
    ],
    teamInfo: {
      isTeam: false,
      role: "Solo Developer",
    },
    hackathon: {
      name: "IEMHACKS 4.0",
      track: "Track 05: Social Issues",
      organizer: "Dept. of CSE & IT, IEM/UEM",
      certificateId: "iemhacks-4",
    },
  },
  {
    id: "resumatch",
    title: "ResuMatch",
    featured: false,
    status: "completed",
    statusLabel: "Completed (Not Yet Deployed)",
    tagline: "Beat the ATS before you hit submit",
    shortDescription:
      "ATS resume analyzer scoring job match similarity with NLP, identifying missing skills, and generating personalized improvement suggestions via LLM.",
    fullDescription:
      "ATS resume analyzer that scores how well a resume matches a job description using NLP and semantic similarity, flags missing keywords/skills, and generates personalized improvement suggestions via LLM — with login, analysis history, and exportable PDF reports.",
    techStack: [
      "Python",
      "FastAPI",
      "Streamlit",
      "spaCy",
      "Sentence Transformers",
      "Groq (Llama 3)",
      "Supabase + Google OAuth",
      "Jinja2/WeasyPrint",
    ],
    liveDemoUrl: null,
    githubUrl: "https://github.com/ayushagarwal619/RESUMATCH",
    images: [
      "/Images/Projects/ResuMatch/resumatch-landing.jpg",
      "/Images/Projects/ResuMatch/resumatch-analyze.jpg",
    ],
    teamInfo: {
      isTeam: false,
      role: "Solo Developer",
    },
  },
  {
    id: "roopantar",
    title: "RoopAntar",
    featured: false,
    status: "in-progress",
    statusLabel: "In Progress",
    tagline: "Real-time style transfer in a single pass",
    shortDescription:
      "Neural style transfer web app fusing content image structure with style image texture using Adaptive Instance Normalization (AdaIN).",
    fullDescription:
      "Neural style transfer web app using Adaptive Instance Normalization (AdaIN) — fuses a content image's structure with a style image's texture in one feed-forward pass, with a continuous style-strength slider.",
    techStack: [
      "Python",
      "PyTorch",
      "TorchVision",
      "Flask",
      "Bootstrap",
      "JavaScript",
    ],
    liveDemoUrl: null,
    githubUrl: "https://github.com/ayushagarwal619/RoopAntar",
    images: [],
    teamInfo: {
      isTeam: false,
      role: "Solo Developer",
    },
  },
  {
    id: "nimiza",
    title: "NIMIZA",
    featured: false,
    status: "completed",
    statusLabel: "Completed & Deployed",
    tagline: "Turning screen time into meaningful learning time",
    shortDescription:
      "Interactive learning platform for kids aged 3–8 with animated reels, 6 interactive storybooks, mini-games, and habit trackers.",
    fullDescription:
      "Interactive learning platform for kids aged 3–8, built around three guide characters (Nino, Miko, Zara) teaching curiosity, kindness, and problem-solving through animated learning reels, six interactive storybooks, mini-games (Balloon Pop, Slide Puzzle), a daily routine/habit tracker, and 'mood rings' for emotional awareness.",
    techStack: ["HTML5", "CSS3", "Vanilla JavaScript", "GitHub Pages"],
    liveDemoUrl: "https://ayushagarwal619.github.io/NIMIZA",
    githubUrl: "https://github.com/ayushagarwal619/NIMIZA",
    images: [],
    teamInfo: {
      isTeam: false,
      role: "Solo Developer",
      note: "Connected to AIEEE Hackathon Nimiza Startup Pitch certificate",
    },
  },
  {
    id: "ml-micro-projects",
    title: "ML Micro-Projects",
    featured: false,
    status: "ongoing",
    statusLabel: "Ongoing Collection",
    tagline: "A growing lab of applied ML experiments",
    shortDescription:
      "Collection of smaller machine learning predictive models and data pipelines built as hands-on practice.",
    fullDescription:
      "Collection of smaller machine learning projects — predictive models and data pipelines — built as hands-on practice.",
    techStack: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Jupyter Notebooks"],
    liveDemoUrl: null,
    githubUrl: "https://github.com/ayushagarwal619/ml-micro-projects",
    images: [],
    teamInfo: {
      isTeam: false,
      role: "Solo Developer",
    },
  },
  {
    id: "verifund",
    title: "VeriFund",
    featured: false,
    status: "completed",
    statusLabel: "Completed (Team Project)",
    tagline: "Transparent, blockchain-verified crowdfunding",
    shortDescription:
      "Blockchain-based crowdfunding platform enabling verifiable donation tracking, fund utilization, and AI campaign verification.",
    fullDescription:
      "Blockchain-based crowdfunding platform enabling verifiable donation tracking and fund utilization, with AI-assisted campaign verification. Built as part of the Hackforge hackathon (Srijan '26, Jadavpur University).",
    techStack: ["React", "Node.js", "Solidity", "JWT"],
    liveDemoUrl: null,
    githubUrl: "https://github.com/ayushagarwal619/Verifund",
    images: [
      "/Images/Projects/VeriFund/verifund-landing.jpg",
      "/Images/Projects/VeriFund/verifund-connect-wallet.jpg",
    ],
    teamInfo: {
      isTeam: true,
      teamName: "Team UdyamX",
      role: "Frontend & Backend Integration",
      contribution: "UI components, backend integration, performance optimization. (Forked from Dhirajchowdhury/Verifund)",
    },
    hackathon: {
      name: "Hackforge (Srijan 2026)",
      organizer: "CodeClub JUSL, Jadavpur University",
      result: "Finalist",
      certificateId: "hackforge-srijan-2026",
    },
    contributions:
      "Engineered UI components, backend integration, and performance optimizations within Team UdyamX.",
  },
];
