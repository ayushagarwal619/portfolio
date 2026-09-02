# CONTENT.md — Portfolio Source of Truth

> **Display rule:** Do not display internal user IDs, account identifiers, enrolment IDs, or sensitive metadata publicly. Only display credential IDs explicitly intended for public verification. (See "Internal Reference Data" at the bottom — that section must never be imported into the data layer or rendered on the site.)

> **⚠️ Cleanup required in the existing repo:** The current codebase was inherited from a different portfolio template. Before treating anything in the existing repo as "real info to preserve," replace/remove:
> - `data/projectsData.ts` — currently contains placeholder agency projects (Staurga, Linkryse, Patreon, Orunk, YappedIn) belonging to a different person. Replace entirely with the Projects section below.
> - `layout.tsx` metadata — currently says `"Zaheer Khan | Creative Developer"`. Replace with Ayush's name/title/description (see Hero Content below).
> - `TestimonialsSection.tsx` / `WhatTheySaid.tsx` — currently contain placeholder testimonials (Shahida Zia, Amir Khan, Abeeha Parveen) for a different person. Remove or replace with real testimonials once available; until then, hide this section rather than show fake reviews.
> - `Navbar.tsx`, `LoadingScreen.tsx`, `TransitionRouter.tsx`, `SmoothScroll.tsx`, `SmudgeMask.tsx`, `ScrollRevealText.tsx` already exist and work — do not rebuild them unless asked.

---

## 1. Hero Content (compact — for the Home hero only)

- **Name:** Ayush Kumar Agarwal
- **Primary Title:** Full Stack Developer · AI/ML Enthusiast · B.Tech CSBS
- **Headline:** Building AI-powered products, full-stack applications, and ideas that can scale.
- **Terminal-style line (optional):** `> building AI-powered products and full-stack applications`

## 2. Bio

### Short Bio (Homepage)
I'm Ayush Kumar Agarwal, a Computer Science & Business Systems student and passionate developer who loves building impactful digital products. I enjoy exploring Full-Stack Development, Artificial Intelligence, and innovative startup ideas — from AI-powered attendance systems to fitness coaches that watch your form in real time. Currently focused on strengthening my technical skills, building real-world projects, and turning ideas into scalable solutions.

### Long Bio (About Page)
Hi, I'm Ayush Kumar Agarwal, a Computer Science & Business Systems student at Heritage Institute of Technology, Kolkata, and an aspiring technology entrepreneur with a strong interest in software development, Artificial Intelligence, and building innovative digital products.

My journey in technology started with curiosity — understanding how applications work and gradually moving towards building projects myself. That curiosity turned into three shipped products: SmartAttend, an AI-powered attendance system using facial recognition; GymGuru, a real-time fitness coach that uses pose detection to correct your form and count reps; and ResuMatch, an NLP-based ATS resume analyzer. I'm currently building RoopAntar, a neural style transfer tool, alongside a growing set of applied ML experiments. Over time, I've developed a growing interest in Full-Stack Development, Data Structures & Algorithms, and problem-solving.

I enjoy participating in hackathons, working on real-world ideas, and exploring how technology can solve meaningful problems — I've competed in IEMHACKS, the Adobe University Hackathon, the NextGen Hackathon (ACM Fremont Chapter, USA), and made it to the finals at Hackforge (Jadavpur University's Srijan '26) and Ace The Case. Alongside development, I'm also deeply interested in startups, finance, and building scalable businesses through technology — I co-founded KidGuides, an offline edtech startup, through the Hult Prize program at HIT, and explored the finance side through Goldman Sachs' Risk job simulation, Tata's GenAI Data Analytics simulation, and Study2Win's Financial Freedom program.

Currently, I'm focused on improving my development skills, strengthening my DSA fundamentals, building better projects, and exploring AI-powered solutions. My long-term goal is to create impactful technology products and build something meaningful at a large scale.

> **Flag for Ayush:** confirm you want the precise degree name "Computer Science & Business Systems" on the site (vs. shorthand "Computer Science").

## 3. Tech Stack

| Category | Items |
|---|---|
| Languages | C, C++, Java, Python, JavaScript, TypeScript, HTML5, CSS3 |
| Frontend | React.js, Next.js, Tailwind CSS, Bootstrap, Streamlit |
| Backend | Node.js, Express.js, Flask |
| Database | MySQL, MongoDB, Firebase, Supabase |
| AI / ML / Data Science | PyTorch, OpenCV, MediaPipe, Scikit-Learn, NumPy, Pandas |
| Tools / DevOps | Git, GitHub, Postman, VS Code, npm, Vite, Vercel, Render, Figma, Docker, Kubernetes, MySQL Workbench |
| Currently Learning *(unconfirmed — verify before publishing)* | Advanced DSA & System Design, Generative AI / RAG / AI Agents, Neural Style Transfer (AdaIN) |

## 4. Projects

### Featured

**1. SmartAttend**
- Status: Completed & deployed · Featured: true
- Tagline: AI-powered attendance, zero manual roll-calls
- Description: Automated attendance system that recognizes students from classroom photos or audio clips using face and voice biometrics, cross-checks them against enrolled profiles, and writes verified attendance to a cloud database — with separate Teacher and Student dashboards, QR-based self-enrollment, and session analytics.
- Tech Stack: Python, Streamlit, dlib (face recognition + SVM), Resemblyzer (voice recognition), Supabase, NumPy, Pandas, bcrypt
- Live Demo: https://smartattend-a.streamlit.app/
- GitHub: https://github.com/ayushagarwal619/SMARTATTEND
- Team/Solo: Solo
- Images: [ TODO — dashboard, enrollment screen, attendance results view ]

**2. GymGuru**
- Status: Completed & deployed · Featured: true
- Tagline: Your AI personal trainer, right in the browser
- Description: Real-time fitness coach using live pose detection to track exercise form (squats, push-ups, curls, shoulder press, lunges), auto-counts reps and sets, flags form mistakes, and gives spoken AI coaching via an LLM — all through webcam, no wearables needed.
- Tech Stack: Python, Streamlit, MediaPipe (pose landmarks), OpenCV, Groq (LLaMA 3.3 70B), gTTS, SQLite
- Live Demo: https://gymguru-1.onrender.com/
- GitHub: https://github.com/ayushagarwal619/GymGuru
- Team/Solo: Solo
- Images: [ TODO — pose-overlay view, post-workout history table ]

**3. JanSewa** 🏆
- Status: Completed & deployed · Featured: true
- Tagline: Sarkar Aapke Dwaar — government at your doorstep
- Description: Civic-tech platform connecting citizens with government welfare schemes and enabling transparent grievance reporting. Citizens get AI-powered scheme matching, GPS-tagged complaint submission (with anonymous reporting), a locator for nearby assistance camps, and a bilingual (English/Hindi) voice+text AI assistant. Admins get a department-scoped dashboard, a geographic grievance map, and automated SLA-based escalation. Uses SHA-256 hash-chaining on status updates so tampering with complaint history is cryptographically detectable.
- Tech Stack: React 19, Vite, React Router, Leaflet, Chart.js/Recharts, Node.js, Express 5, MongoDB (2dsphere geospatial queries), Mongoose, JWT + bcryptjs, Groq SDK, node-cron
- Live Demo: https://jansewa-vert.vercel.app/
- GitHub: https://github.com/ayushagarwal619/JANSEWA
- Team/Solo: Solo
- Hackathon association: Built for IEMHACKS 4.0 (Track 05: Social Issues) — link to the IEMHACKS certificate in Certificates section
- Images: [ TODO — Home/Citizen View, AI Scheme Finder, Grievance Reporting, Admin Dashboard ]

### Other Projects

**4. ResuMatch**
- Status: Completed, not yet deployed · Featured: false
- Tagline: Beat the ATS before you hit submit
- Description: ATS resume analyzer that scores how well a resume matches a job description using NLP and semantic similarity, flags missing keywords/skills, and generates personalized improvement suggestions via LLM — with login, analysis history, and exportable PDF reports.
- Tech Stack: Python, FastAPI, Streamlit, spaCy, Sentence Transformers, Groq (Llama 3), Supabase + Google OAuth, Jinja2/WeasyPrint
- Live Demo: none yet (worth deploying before publishing — flagged as your strongest full-stack piece)
- GitHub: https://github.com/ayushagarwal619/RESUMATCH
- Team/Solo: Solo
- Images: [ TODO — score breakdown dashboard, report export ]

**5. RoopAntar** *(in progress)*
- Status: In progress · Featured: false
- Tagline: Real-time style transfer in a single pass
- Description: Neural style transfer web app using Adaptive Instance Normalization (AdaIN) — fuses a content image's structure with a style image's texture in one feed-forward pass, with a continuous style-strength slider.
- Tech Stack: Python, PyTorch, TorchVision, Flask, Bootstrap/JS
- Live Demo: none (local only)
- GitHub: https://github.com/ayushagarwal619/RoopAntar
- Team/Solo: Solo
- Images: [ TODO — none yet, README only ]

**6. NIMIZA**
- Status: Completed & deployed · Featured: false
- Tagline: Turning screen time into meaningful learning time
- Description: Interactive learning platform for kids aged 3–8, built around three guide characters (Nino, Miko, Zara) teaching curiosity, kindness, and problem-solving through animated learning reels, six interactive storybooks, mini-games (Balloon Pop, Slide Puzzle), a daily routine/habit tracker, and "mood rings" for emotional awareness.
- Tech Stack: HTML5, CSS3, Vanilla JavaScript, GitHub Pages
- Live Demo: https://ayushagarwal619.github.io/NIMIZA
- GitHub: https://github.com/ayushagarwal619/NIMIZA
- Team/Solo: Solo (verify — possibly connected to the AIEEE Hackathon "Nimiza Startup Pitch" certificate; confirm before cross-linking)
- Images: real preview available at https://github.com/ayushagarwal619/NIMIZA/raw/main/assets/preview.png — usable directly

**7. ML Micro-Projects**
- Status: Ongoing collection · Featured: false
- Tagline: A growing lab of applied ML experiments
- Description: Collection of smaller machine learning projects — predictive models and data pipelines — built as hands-on practice.
- Tech Stack: Python, Scikit-Learn, Pandas, NumPy (Jupyter Notebooks)
- Live Demo: N/A (notebook collection)
- GitHub: https://github.com/ayushagarwal619/ml-micro-projects
- Images: none — consider a text-link card instead of a visual card

**8. VeriFund** *(team project)*
- Status: Completed · Featured: false
- Tagline: Transparent, blockchain-verified crowdfunding
- Description: Blockchain-based crowdfunding platform enabling verifiable donation tracking and fund utilization, with AI-assisted campaign verification. Built as part of the Hackforge hackathon (Srijan '26, Jadavpur University).
- Tech Stack: React, Node.js, Solidity, JWT
- Live Demo: none found
- GitHub: https://github.com/ayushagarwal619/Verifund (forked from Dhirajchowdhury/Verifund)
- Team/Solo: **Team project — Team UdyamX.** Your contribution: UI components, backend integration, performance optimization. Must be labeled as a team project, not solo work.
- Hackathon association: Hackforge, Srijan 2026 (Finalist) — see Certificates
- Images: none available

> **Note on GitHub links:** these repo/demo URLs come from an external tool's analysis and have not been independently re-verified in this session — spot-check they still resolve before publishing.

## 5. Certificates & Achievements

Only public-safe fields are listed here. Anything account-specific has been moved to "Internal Reference Data" at the bottom.

### Hackathons

| Certificate | Organizer | Date | Result | Public Verification |
|---|---|---|---|---|
| 2nd NextGen Hackathon 2026 — Team Kaalchakra, "Argus: Autonomous Threat Detection & Governed Response System" | ACM Fremont Chapter, USA (with SCRS) | 15–16 Aug 2026 | Presented | ID: SCRS/2nd NextGen 2026/PC/NGH26_247 · https://nextgen2026.thescrs.org/ |
| National Innovation Hackathon 2026 | AMIEE Association & CMAOI Association, with HIT | 17–19 Jul 2026 | Participant | ID: AMH202600353-M345 (QR verifiable) |
| IEMHACKS 4.0 (36-hr online hackathon) — Team: Kal ka naya yug | Dept. of CSE & IT, IEM/UEM | 8–9 Aug 2026 | Participant | Not shown |
| Adobe University Hackathon | Adobe (via Unstop) | 9 Aug 2026 | Participant | QR present, no printed ID |
| NEXBUILDON HACK 2026 | NexBuildon Community | 17 Aug 2026 | Participant | ID: NEX26-PART-0323 |
| Hackforge (24-hr hackathon, Srijan 2026) — Team UdyamX | CodeClub JUSL, Jadavpur University | 4–5 Apr 2026 | **Finalist** | Not shown |
| Model Forge — Team Tensor Titans | Heritage Institute of Technology (via Unstop) | Not stated | Participant | QR present, no printed ID |
| Ideatex (Session Zero 2026) — Team Zenforge | Google Developer Group on Campus, HIT | 30 May 2026 | **Top 50 Finalist** | QR present, no printed ID |
| MLX (Session Zero 2026) | Google Developer Group on Campus, HIT | Not stated on certificate | Participant | QR present, no printed ID |
| Vibe With India 2.0 (Virtual Hackathon) | HackWithIndia (via Devnovate) | 20 Mar 2026 | Participant | Not shown |
| Hult Prize 2026 (On-Campus Program) | Hult Prize @ HIT, with Institution's Innovation Council | 30 Jan 2026 | Participant | Not shown |
| Ace The Case (Srijan '26) | F.E.T.S.U. Presents Srijan '26 / IIC, JU E-Cell | Srijan '26 (~Apr 2026) | **Finalist** | Not shown |

> ⚠️ **Unverified — reported by an external tool, not independently confirmed in this session (files not reviewed directly):**
> - DATA SPRINT 2026 — Quiz Round, Data Science Club NIST/MAIT (via HackerRank) — QR present, no printed ID
> - Ice Breaker 5 (Prelims), Google Developer Group on Campus HIT — 22 Mar 2026, QR present, no printed ID
>
> Confirm these exist and, if so, upload the certificate files so they can be verified the same way as the rest.

### Job Simulations

| Certificate | Organizer | Date | Public Verification |
|---|---|---|---|
| Risk Job Simulation | Goldman Sachs (via Forage) | 25 Jun 2026 | *(see Internal Reference Data — codes are account-specific)* |
| GenAI Powered Data Analytics Job Simulation | Tata (via Forage) | 25 Jun 2026 | *(see Internal Reference Data — codes are account-specific)* |

### Quizzes

| Certificate | Organizer | Date | Public Verification |
|---|---|---|---|
| National Financial Literacy Quiz 2026 (Online Round) | NISM (SEBI initiative) | Not stated | Not shown |
| HackTheRank (online quiz) | HackerRank | Not stated | QR present, no printed ID |
| Vande Mataram — 150 Years Quiz | Ministry of Culture & MyGov | Not stated | Not shown |

### Workshops

| Certificate | Organizer | Date | Public Verification |
|---|---|---|---|
| AI Tools Workshop (AI tools & ChatGPT) | be10x | 8 Mar 2026 | QR present, no printed ID |

### Courses

| Certificate | Organizer | Date | Public Verification |
|---|---|---|---|
| Prime (AI/ML) Course | Apna College (instructor: Shradha Khapra) | Not stated | ID: 6a3d4bc3ed172e4a2b02ad9a |
| Financial Freedom — Batch 15 Sapphire (Stock Market, Investing & Wealth Creation) | Study2Win (trainer: Sagar Dodeja) | Started 15 Nov 2025 | ID: S2W-FF15-SAPPHIRE-2026 |

## 6. Experience

> Design note: hackathon results are listed under Certificates above rather than duplicated here, to avoid showing the same event twice. Experience is reserved for roles/positions. Adjust if you'd rather have one combined timeline.

**KidGuides — Co-Founder**
- Organization: Built through the Hult Prize program @ Heritage Institute of Technology
- Category: Startup / Entrepreneurship
- Date: Jan 2026 – *(confirm end date / "Present")*
- Description: Co-founded KidGuides, an offline edtech startup, as part of the Hult Prize 2026 on-campus program.
- Related certificate: Hult Prize 2026 (see Certificates)
- **TODO:** needs a fuller description of what KidGuides actually does — only one sentence exists in the current bio.

## 7. Assets

- **Profile / Hero Portrait:** TODO — portrait image will be added separately. (`public/Images/Profile/`)
- **Hero background scroll-sequence:** BG_VIDEO.mp4 + extracted frame sequence already provided in an earlier session. **Pending decision:** the source frames show a small AI-generation watermark (bottom-right) — resolve before using in production (re-export watermark-free, reshoot, or disclose it's AI-generated).
- **Resume PDF:** TODO — not yet provided. Required for the "Resume Download" button.
- **Favicon:** TODO — referenced in `layout.tsx` metadata but not yet provided.
- **Project screenshots:** none exist yet for any project — see per-project `Images: [ TODO ]` markers above. Recommended folder structure:

```
public/
  Images/
    Profile/
    Projects/
      SmartAttend/
      GymGuru/
      JanSewa/
      ResuMatch/
      RoopAntar/
      NIMIZA/
      VeriFund/
      ML-Micro-Projects/
```

---

## Internal Reference Data — do not display publicly

*(Never import this section into the data layer or render it on the site. Kept here only so the information isn't lost.)*

- **Goldman Sachs Forage (Risk Job Simulation):** Enrolment Verification Code `CZBQDfoP7uYxM6KHZ` · User Verification Code `6a3a8b1a05af6522ac4b6b27`
- **Tata Forage (GenAI Data Analytics Simulation):** Enrolment Verification Code `CEo9MRDRYiBfb5tfZ` · User Verification Code `6a3a8b1a05af6522ac4b6b27`

> Note: the "User Verification Code" is **identical across both Forage certificates** — this confirms it's an account-level identifier (tied to your Forage profile), not a per-certificate credential. This is exactly the kind of internal/account ID the display rule at the top of this file is meant to keep off the public site.
