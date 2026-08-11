// ============================================================
// STORY MODE DATA
// Chapters: HELLO → WHO I AM → JOURNEY → BUILD → PROJECTS → EXPLORING → ENDING
// [PLACEHOLDER] markers = fill in later
// ============================================================

// Chapter definitions — scroll progress thresholds (0–1)
// Total scroll = 750vh (850vh container – 100vh viewport)
export const CHAPTERS = [
  { id: 'hello',        label: 'HELLO',        number: '01', progress: 0.000 },
  { id: 'whoami',       label: 'WHO I AM',     number: '02', progress: 0.110 },
  { id: 'journey',      label: 'JOURNEY',      number: '03', progress: 0.220 },
  { id: 'whatibuild',   label: 'BUILD',        number: '04', progress: 0.400 },
  { id: 'projects',     label: 'PROJECTS',     number: '05', progress: 0.540 },
  { id: 'certificates', label: 'CERTIFICATES', number: '06', progress: 0.760 },
  { id: 'exploring',    label: 'EXPLORING',    number: '07', progress: 0.900 },
  { id: 'ending',       label: 'END',          number: '08', progress: 1.000 },
]

// Journey milestones — broad safe labels
// [PLACEHOLDER] Replace with real personal milestones + dates when provided
export const JOURNEY_MILESTONES = [
  {
    label: '10TH GRADE (SECONDARY)',
    sub: 'Strong academic foundation in science and mathematics.',
    tag: 'SCORE: 90%',
  },
  {
    label: '12TH GRADE (SENIOR SECONDARY)',
    sub: 'Specialized in Science / Mathematics stream.',
    tag: 'SCORE: 86%',
  },
  {
    label: 'B.TECH — 1ST SEMESTER',
    sub: 'Foundations of Computer Science & Engineering mathematics.',
    tag: 'SGPA: 8.00',
  },
  {
    label: 'B.TECH — 2ND SEMESTER',
    sub: 'Core programming, C language, and computer systems.',
    tag: 'SGPA: 8.64',
  },
  {
    label: 'B.TECH — 3RD SEMESTER',
    sub: 'Data Structures, Algorithms & Database Management Systems.',
    tag: 'SGPA: 7.98',
  },
  {
    label: 'B.TECH — 4TH SEMESTER',
    sub: 'Object-Oriented Programming, Java, and Machine Learning Fundamentals.',
    tag: 'SGPA: 7.64',
    active: true,
  },
]

// Domains shown in WHAT I BUILD chapter
export const DOMAINS = [
  {
    label: 'AI / ML',
    description: 'Turning data into systems that can learn.',
    tech: ['Python', 'Scikit-Learn', 'Pandas', 'FastAPI'],
  },
  {
    label: 'BACKEND',
    description: 'Building the systems behind the interface.',
    tech: ['Java', 'Spring Boot', 'REST APIs', 'JPA'],
  },
  {
    label: 'FULL STACK',
    description: 'From API to interface, end to end.',
    tech: ['React', 'JavaScript', 'Tailwind', 'Vite'],
  },
  {
    label: 'PROBLEM SOLVING',
    description: 'The foundation everything else runs on.',
    tech: ['DSA', 'Algorithms', 'HackerRank 4★ C', '3★ Java'],
  },
]

// Projects for Story Mode
export const STORY_PROJECTS = [
  {
    number: '01',
    name: 'VeriHire AI',
    category: 'AI Engineering',
    tagline: 'Evidence-backed hiring intelligence beyond resume keywords.',
    description:
      'A microservices-based candidate screening platform that combines semantic resume retrieval, live GitHub evidence, and LLM reasoning to produce explainable HIRE, REVIEW, or REJECT verdicts.',
    tech: [
      'React 19',
      'TypeScript',
      'Java 21',
      'Spring Boot',
      'Spring Security',
      'FastAPI',
      'ChromaDB',
      'Sentence Transformers',
      'Groq / Llama',
      'PostgreSQL',
      'Docker'
    ],
    pipeline: [
      'Resume + Job Description',
      'Semantic Retrieval',
      'GitHub Evidence',
      'LLM Reasoning',
      'HIRE / REVIEW / REJECT'
    ],
    github: 'https://github.com/Narayan1006/VireHire',
    live: null,
  },
  {
    number: '02',
    name: 'RankSense',
    category: 'Machine Learning',
    tagline: 'Ranking 100,000 candidates in approximately 25 seconds on CPU.',
    description:
      'An offline two-stage candidate ranking system that combines BM25 retrieval on career titles with behavioral RankNet re-ranking to identify stronger candidates without relying on keyword matching.',
    tech: [
      'Python',
      'BM25',
      'RankNet',
      'PyTorch',
      'Pandas',
      'NumPy',
      'Scikit-Learn'
    ],
    pipeline: [
      '100K Candidates',
      'BM25 Retrieval',
      'Top 1,000',
      'Behavioral Features',
      'RankNet',
      'Top 100'
    ],
    github: 'https://github.com/Narayan1006/RankSense',
    live: 'https://huggingface.co/spaces/Narayan1006/Ranksense',
  },
  {
    number: '03',
    name: 'FieldAgent',
    category: 'On-Device AI',
    tagline: 'Offline-first AI healthcare assistance for rural India.',
    description:
      'A Flutter mobile clinical assistant designed for ASHA healthcare workers in low-connectivity environments, combining local patient data, deterministic danger-flag detection, automatic cloud synchronization, and on-device Gemma AI for referral notes.',
    tech: [
      'Flutter',
      'Dart',
      'SQLite',
      'Firebase Firestore',
      'Gemma 4 E4B',
      'Flutter Gemma',
      'Connectivity Plus'
    ],
    pipeline: [
      'Patient Data',
      'Local SQLite',
      'Danger Flags',
      'On-Device Gemma',
      'Referral Note',
      'Firestore Sync'
    ],
    github: 'https://github.com/Narayan1006/FieldAgent',
    live: 'https://github.com/Narayan1006/FieldAgent/releases/latest/download/app-release.apk',
  },
  {
    number: '04',
    name: 'DealFlow',
    category: 'AI Automation',
    tagline: 'AI-powered insurance claim verification and settlement.',
    description:
      'An AI-powered insurance workflow that analyzes claim evidence with Gemini, validates it against policy data, and automates claim decisions through an event-driven workflow connecting email, AI, Supabase, and wallet infrastructure.',
    tech: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Gemini',
      'Make.com',
      'Supabase',
      'PostgreSQL',
      'Ethers.js'
    ],
    pipeline: [
      'Claim Evidence',
      'Gemini Vision',
      'Policy Verification',
      'AI Verdict',
      'Ledger Update',
      'Email Notification'
    ],
    github: 'https://github.com/Narayan1006/Deal-Flow',
    live: 'https://deal-flows.netlify.app/',
  },
]

// Certificates & Badges for Story Mode
export const STORY_CERTIFICATES = [
  {
    id: 'cert-cs50',
    title: 'CS50x — Introduction to Computer Science',
    type: 'Course Certificate',
    issuer: 'Harvard University',
    date: '2025',
    detail: 'Completion of CS50x, including ten problem sets and one final project.',
    credentialId: null,
    verifyUrl: 'https://cs50.harvard.edu/certificates/d1633f48-5302-411d-8abd-80938fbad7b9',
    image: '/certificates/cs50_harvard.png',
    alt: 'Certificate of completion for CS50x issued by Harvard University',
  },
  {
    id: 'cert-aws',
    title: 'AWS Academy Graduate - Cloud Foundations',
    type: 'Training Badge',
    issuer: 'AWS Academy',
    date: '01/29/2026',
    detail: '20 course hours completed in Cloud Foundations.',
    credentialId: null,
    verifyUrl: 'https://www.credly.com/go/wuKLi4cs',
    image: '/certificates/aws_cloud_foundations.png',
    alt: 'AWS Academy Graduate Cloud Foundations Training Badge',
  },
  {
    id: 'badge-google-vertex',
    title: 'Prompt Design in Vertex AI',
    type: 'Skill Badge · Introductory',
    issuer: 'Google Cloud',
    date: '2026',
    detail: 'Machine Learning & AI skill validation badge.',
    credentialId: null,
    verifyUrl: null,
    image: '/certificates/google_cloud_prompt_design.png',
    alt: 'Google Cloud Skill Badge for Prompt Design in Vertex AI',
  },
  {
    id: 'cert-promptwars-1',
    title: 'PromptWars Virtual — Challenge 1',
    type: 'Certificate of Appreciation',
    issuer: 'Google for Developers & Hack2Skill',
    date: '04/08/2026',
    detail: 'Generative AI solution submission for Challenge 1 during PromptWars Virtual.',
    credentialId: '2026H2S04PWVCHL1-A00042',
    verifyUrl: null,
    image: '/certificates/promptwars_challenge_1.png',
    alt: 'Certificate of Appreciation for PromptWars Virtual Challenge 1 from Google for Developers & Hack2Skill',
  },
  {
    id: 'cert-promptwars-2',
    title: 'PromptWars Virtual — Challenge 2 (Top 400)',
    type: 'Certificate of Achievement',
    issuer: 'Google for Developers & Hack2Skill',
    date: '11/08/2026',
    detail: 'Top 400 Leaderboard for Challenge 2 during PromptWars Virtual.',
    credentialId: '2026H2S05PWVCHL2-AT00186',
    verifyUrl: null,
    image: '/certificates/promptwars_challenge_2.png',
    alt: 'Certificate of Achievement for PromptWars Virtual Challenge 2 Top 400 from Google for Developers & Hack2Skill',
  },
  {
    id: 'cert-hr-java',
    title: 'Java (Basic)',
    type: 'Skill Certification',
    issuer: 'HackerRank',
    date: '20 Dec, 2025',
    detail: 'Passed the HackerRank skill certification test for Java.',
    credentialId: '908A8C76FA2E',
    verifyUrl: null,
    image: '/certificates/hackerrank_java.png',
    alt: 'HackerRank Java Basic Skill Certification for Narayan Singh',
  },
  {
    id: 'cert-hr-python',
    title: 'Python (Basic)',
    type: 'Skill Certification',
    issuer: 'HackerRank',
    date: '21 May, 2025',
    detail: 'Passed the HackerRank skill certification test for Python.',
    credentialId: '2CF679B32803',
    verifyUrl: null,
    image: '/certificates/hackerrank_python.png',
    alt: 'HackerRank Python Basic Skill Certification for Narayan Singh',
  },
]

// Currently exploring (user-confirmed topics)
export const EXPLORING_TOPICS = [
  { label: 'AI ENGINEERING', sub: 'RAG pipelines · retrieval systems' },
  { label: 'LLM AGENTS', sub: 'Agentic workflows · tool use' },
  { label: 'CLOUD DEPLOYMENT', sub: 'GCP · AWS infrastructure' },
  { label: 'OPEN SOURCE', sub: 'Contributing to the community' },
  { label: 'COMPETITIVE PROG.', sub: 'DSA · problem solving depth' },
]

export const SOCIAL = {
  github: 'https://github.com/Narayan1006',
  linkedin: 'https://www.linkedin.com/in/singhnarayan',
  email: 'singhnarayan0866@gmail.com',
  resume: '/Narayan_resume.pdf',
}
