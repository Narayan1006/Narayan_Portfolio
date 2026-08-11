# Narayan Singh — Portfolio

A cinematic, 3D-driven portfolio and recruiter experience built with React, Three.js, and GSAP.

**🌐 Live:** [https://narayan-portfolio-zv2k.vercel.app/](https://narayan-portfolio-zv2k.vercel.app/)

---

## Overview

The site has three distinct modes accessible from a single cinematic gateway:

| Mode | Route | Purpose |
|------|-------|---------|
| **Gateway** | `/` | 3D cinematic entry screen with idle-swaying model, navigation cards |
| **Story Mode** | `/explore` | 8-chapter scroll-driven narrative with 3D model driven by GSAP ScrollTrigger |
| **Recruiter Mode** | `/recruiter` | Editorial, ATS-friendly profile page with verified resume data |

---

## Features

### Gateway (`/`)
- Full-screen Three.js canvas with a 3D character model
- Smooth entrance spin animation → idle left-right sway
- Navigation cards: **VIEW** (Story Mode) and **RECRUIT** (Recruiter Mode)
- Mobile fallback: static anime character illustration instead of 3D canvas

### Story Mode (`/explore`)
- 8 chapters: Hello → Identity → Journey → Domains → Projects → Certificates → Exploring → End
- GSAP `ScrollTrigger` drives 3D model position, rotation, camera depth, and background color
- Background transitions from warm off-white (`#EBE7DF`) to pitch black (`#040404`) as you scroll
- **Certificates**: Infinite horizontal marquee with hover-pause and lightbox modal on click
- Persistent story timeline strip showing chapter progress
- Mobile: 3D canvas replaced with fixed fallback image; background color still animates

### Recruiter Mode (`/recruiter`)
- Editorial layout with verified professional data
- Sections: Profile, Summary, Education, Experience, Projects, Skills, Problem Solving, Certifications, Achievements
- One-click resume download (`/Narayan_resume.pdf`)
- 3D model accent on desktop hero (hidden on mobile — layout-only)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite |
| 3D Rendering | Three.js via `@react-three/fiber` + `@react-three/drei` |
| Animation | GSAP + ScrollTrigger, Framer Motion |
| Styling | Tailwind CSS v4 + Vanilla CSS (`index.css`) |
| Fonts | Space Grotesk, Inter, JetBrains Mono (Google Fonts) |
| Deployment | Vercel (auto-deploy from `main` branch) |

---

## Project Structure

```
src/
├── components/
│   ├── CinematicCanvas.jsx      # Gateway 3D canvas (idle sway, entrance anim)
│   ├── GatewayScreen.jsx        # Entry screen UI + navigation cards
│   ├── ModelViewer.jsx          # Shared GLB model loader utility
│   ├── explore/
│   │   ├── StoryCanvas.jsx      # Story Mode fixed 3D canvas (GSAP-driven)
│   │   ├── StoryChapters.jsx    # All 8 chapter JSX sections
│   │   └── StoryStrip.jsx       # Persistent chapter timeline header
│   └── recruiter/
│       ├── RecruiterHero.jsx    # Profile + 3D accent model
│       ├── AtAGlance.jsx        # Quick stats bar
│       ├── EducationSection.jsx
│       ├── ExperienceSection.jsx
│       ├── ProjectsSection.jsx
│       ├── SkillsSection.jsx
│       ├── RecruiterNav.jsx
│       └── ContactSection.jsx
├── data/
│   ├── storyData.js             # Story Mode content (chapters, projects, certs, etc.)
│   └── recruiterData.js         # Recruiter page content (all verified, no placeholders)
├── pages/
│   ├── ExplorePage.jsx          # Story Mode page (GSAP timeline orchestration)
│   └── RecruiterPage.jsx        # Recruiter page layout
├── App.jsx                      # Routing (Gateway → Explore / Recruiter)
├── main.jsx
└── index.css                    # Theme tokens, marquee keyframe
public/
├── model.glb                    # 3D character model
├── model_fallback.png           # Mobile fallback image (anime character)
├── Narayan_resume.pdf           # Downloadable resume
└── certificates/                # Certificate screenshot assets (7 files)
```

---

## Data Files

All content is decoupled from UI:

- **`src/data/storyData.js`** — `CHAPTERS`, `JOURNEY_MILESTONES`, `DOMAINS`, `STORY_PROJECTS`, `STORY_CERTIFICATES`, `EXPLORING_TOPICS`, `SOCIAL`
- **`src/data/recruiterData.js`** — `PROFILE`, `SUMMARY`, `EDUCATION`, `EXPERIENCE`, `PROJECTS`, `SKILLS`, `PROBLEM_SOLVING`, `CERTIFICATIONS`, `ACHIEVEMENTS`

> To update any content, edit only the data files. No UI component changes needed.

---

## Development

```bash
# Install
npm install

# Dev server
npm run dev

# Production build
npm run build
```

---

## Mobile Behavior

| Component | Desktop | Mobile (< 768px) |
|-----------|---------|-----------------|
| Gateway 3D Canvas | ✅ Full Three.js | 🖼️ Static fallback PNG |
| Story 3D Canvas | ✅ GSAP-driven | 🖼️ Fixed fallback PNG, bg color animates |
| Story text reveals | GSAP opacity scroll | Immediately visible (no opacity-0) |
| Recruiter 3D Hero | ✅ Right-side accent | Hidden (layout-only) |

---

## Author

**Narayan Singh** — Software Engineer · AI / ML · Backend · Full Stack

[LinkedIn](https://www.linkedin.com/in/singhnarayan) · [GitHub](https://github.com/Narayan1006) · singhnarayan0866@gmail.com
