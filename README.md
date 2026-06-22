# The Journey — Narayan Singh Portfolio

A high-fidelity, cinematic portfolio and resume experience built for modern web browsers. The site is designed not as a static page, but as a dual-mode narrative journey.

**🌐 Live Deployment:** [https://narayan-portfolio-zv2k.vercel.app/](https://narayan-portfolio-zv2k.vercel.app/)


## Features

- **Dual-Mode Architecture:**
  - **Story Mode:** A cinematic, immersive narrative journey through 4 chapters (The Walls, The Breach, The Voyage, The Horizon). Features a physical "Narrative Spine" that tracks scroll progress and smoothly interpolates colors. Features huge cinematic typography, no grids, and an interactive draggable knowledge map.
  - **System Mode:** A high-contrast, recruiter-focused ATS-style view. Strips away the storytelling to present raw data, technical proficiency, experience, and a downloadable PDF Resume.
- **Decode The Journey Terminal:** A hidden, interactive terminal component at the end of the site offering deep-dives and lore about the site's aesthetic choices and methodologies.
- **Data-Driven UI:** All textual content, technical skills, experiences, and academic metrics are fully decoupled from the UI and live in `src/lib/data.js`.
- **Motion & Physics:** Heavily utilizes `framer-motion` for fluid scroll-based animations, drag physics, and page transitions.

## Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS + Vanilla CSS Variables (Dark/Cinematic Aesthetic)
- **Animation:** Framer Motion (useScroll, useTransform, useSpring)
- **Deployment Ready:** Configured for any static host.

## Development

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Build for production:
   \`\`\`bash
   npm run build
   \`\`\`

## Architecture & Configuration

- `src/lib/data.js`: Central data store. Update this file to change text, add projects, or update the resume.
- `src/components/`: Contains the UI building blocks (`StoryMode.jsx`, `SystemMode.jsx`, `DecodeTerminal.jsx`, etc.)
- `src/index.css`: Contains all the core theme variables (colors, typography).
- `public/`: Static assets, including the downloadable resume PDF.

## Author

**Narayan Singh**
Backend Engineer & AI Builder
[LinkedIn](https://www.linkedin.com/in/singhnarayan) | [GitHub](https://github.com/Narayan1006)
