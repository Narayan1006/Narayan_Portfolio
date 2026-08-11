// ============================================================
// RECRUITER PAGE DATA — VERIFIED & FINAL
// Last updated: 2026-08-11
// ============================================================

export const PROFILE = {
  name: 'Narayan Singh',
  role: 'Software Engineer',
  roleSubtitle: 'AI / ML  ·  Backend  ·  Full Stack',
  tagline: 'Building intelligent systems and production-oriented software.',
  email: 'singhnarayan0866@gmail.com',
  phone: '+91-8700159772',
  github: 'https://github.com/Narayan1006',
  linkedin: 'https://www.linkedin.com/in/singhnarayan',
  location: 'Ghaziabad, India',
  availability: 'Open to Internships & Opportunities',
  resumePdf: '/Narayan_resume.pdf',
}

export const SUMMARY =
  'Computer Science undergraduate focused on AI/ML engineering, backend development, and full-stack systems. Experienced in building end-to-end applications spanning machine learning pipelines, LLM-powered systems, REST APIs, databases, and production-oriented web applications. Interested in building practical software at the intersection of AI and engineering.'

export const EDUCATION = {
  degree: 'B.Tech — Computer Science & Engineering',
  institution: 'ABES Engineering College',
  location: 'Ghaziabad, Uttar Pradesh',
  period: '2024 – 2028',
  cgpa: '8.02 / 10.0',
  coursework: [
    'Data Structures & Algorithms',
    'Object-Oriented Programming',
    'Database Management Systems',
    'Machine Learning Fundamentals',
    'Probability & Statistics',
  ],
}

export const EXPERIENCE = [
  {
    id: 'exp-1',
    company: 'Yukti Software',
    role: 'Software Engineering Intern',
    type: 'Internship',
    period: '15 Jun 2026 – 06 Jul 2026',
    location: 'Greater Noida, India',
    project: 'Learning Management System',
    description:
      'Worked on a production-oriented Learning Management System, contributing to both frontend development and backend API implementation.',
    tech: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Spring Boot',
      'Spring Data JPA',
      'REST APIs',
      'H2',
      'PostgreSQL',
    ],
    bullets: [
      'Implemented CRUD REST APIs for LMS modules using Spring Boot and Spring Data JPA.',
      'Worked on database integration and persistence using H2 during development and PostgreSQL.',
      'Contributed to frontend development of the LMS using React, Vite, and Tailwind CSS.',
      'Worked across frontend and backend areas of the LMS to support end-to-end feature implementation.',
    ],
  },
]

export const PROJECTS = [
  {
    id: 'proj-verihire',
    number: '01',
    name: 'VeriHire AI',
    tagline: 'Evidence-backed hiring intelligence beyond resume keywords.',
    description:
      'A microservices-based candidate screening platform that combines semantic resume retrieval, live GitHub evidence, and LLM reasoning to generate explainable HIRE, REVIEW, or REJECT verdicts.',
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
      'Docker',
    ],
    highlights: [
      'Built a 3-layer AI pipeline combining semantic retrieval, external developer evidence, and LLM reasoning.',
      'Implemented a Spring Boot core API for authentication, job configuration, candidate management, and secure API-key handling.',
      'Used ChromaDB and Sentence Transformers for semantic resume-to-job matching.',
      'Implemented BYOK architecture with AES-256 encrypted API-key storage and Dockerized deployment.',
    ],
    architecture: [
      'Resumes + Job Description',
      'Semantic Retrieval',
      'GitHub Evidence',
      'LLM Reasoning',
      'HIRE / REVIEW / REJECT',
    ],
    github: 'https://github.com/Narayan1006/VireHire',
    live: null,
    category: 'AI Engineering',
  },
  {
    id: 'proj-ranksense',
    number: '02',
    name: 'RankSense',
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
    ],
    highlights: [
      'Built a two-stage ranking pipeline for 100,000 candidates with zero network access during inference.',
      'Used BM25 retrieval on career titles to reduce the candidate pool from 100,000 to the top 1,000.',
      'Implemented RankNet re-ranking using 11 behavioral signals including GitHub activity, recency, experience fit, and availability.',
      'Achieved approximately 25-second end-to-end inference on CPU.',
    ],
    architecture: [
      '100K Candidates',
      'BM25 Retrieval',
      'Top 1,000',
      '11 Behavioral Features',
      'RankNet',
      'Top 100',
    ],
    github: 'https://github.com/Narayan1006/RankSense',
    live: 'https://huggingface.co/spaces/Narayan1006/Ranksense',
    category: 'Machine Learning',
  },
  {
    id: 'proj-fieldagent',
    number: '03',
    name: 'FieldAgent',
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
      'Connectivity Plus',
    ],
    highlights: [
      'Built offline-first patient data flow using SQLite for local persistence in zero-connectivity environments.',
      'Implemented deterministic danger-flag detection for clinical risk assessment without network access.',
      'Integrated on-device Gemma 4 E4B via Flutter Gemma to generate referral notes locally on the device.',
      'Added automatic cloud synchronization to Firebase Firestore when connectivity is restored.',
    ],
    architecture: [
      'Patient Data',
      'Local SQLite',
      'Danger Flags',
      'On-Device Gemma',
      'Referral Note',
      'Firestore Sync',
    ],
    github: 'https://github.com/Narayan1006/FieldAgent',
    live: 'https://github.com/Narayan1006/FieldAgent/releases/latest/download/app-release.apk',
    category: 'On-Device AI',
  },
  {
    id: 'proj-dealflow',
    number: '04',
    name: 'DealFlow',
    tagline: 'AI-powered insurance claim verification and automated settlement.',
    description:
      'An AI-powered insurance workflow that analyzes claim evidence with Gemini, verifies it against policy data, and automates claim decisions through an event-driven workflow connecting email, AI, Supabase, and wallet infrastructure.',
    tech: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Gemini',
      'Make.com',
      'Supabase',
      'PostgreSQL',
      'Ethers.js',
    ],
    highlights: [
      'Built an AI-assisted insurance claim workflow using Gemini for receipt and evidence analysis.',
      'Automated claim processing through Make.com connecting email, AI analysis, and application workflows.',
      'Worked on frontend and backend areas of the application, including the dashboard experience and workflow integration.',
      'Connected Supabase policy and financial data with wallet infrastructure for automated settlement workflows.',
    ],
    architecture: [
      'Claim Evidence',
      'Gemini Vision',
      'Policy Verification',
      'AI Verdict',
      'Ledger Update',
      'Email Notification',
    ],
    github: 'https://github.com/Narayan1006/Deal-Flow',
    live: 'https://deal-flows.netlify.app/',
    category: 'AI Automation',
  },
]

export const SKILLS = {
  Languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C'],
  Backend: ['Spring Boot', 'Spring Security', 'FastAPI', 'REST APIs', 'JPA / Hibernate'],
  Frontend: ['React', 'Vite', 'Tailwind CSS'],
  'AI / ML': ['Machine Learning', 'RAG', 'Embeddings', 'Vector Databases', 'LLM Applications', 'RankNet', 'BM25'],
  'Data & ML': ['Scikit-Learn', 'Pandas', 'NumPy', 'PyTorch'],
  Database: ['PostgreSQL', 'MySQL', 'ChromaDB', 'SQLite'],
  Tools: ['Git', 'GitHub', 'Docker', 'VS Code', 'IntelliJ', 'Jupyter Notebook'],
}

export const PROBLEM_SOLVING = {
  platforms: [
    {
      name: 'HackerRank',
      url: 'https://www.hackerrank.com/profile/singhnarayan0866',
      stats: ['4★ in C', '3★ in Java'],
    },
    {
      name: 'Coodolio',
      url: 'https://codolio.com/profile/Narayan_1006',
      stats: ['DSA & Development Profile'],
    },
  ],
  topics: [
    'Arrays',
    'Strings',
    'Hashing',
    'Binary Search',
    'Greedy',
    'Trees',
    'Graphs',
    'Dynamic Programming',
  ],
}

export const CERTIFICATIONS = [
  {
    name: 'CS50x',
    issuer: 'Harvard University / CS50',
    year: '2025',
    type: 'Certificate',
    url: 'https://cs50.harvard.edu/certificates/d1633f48-5302-411d-8abd-80938fbad7b9',
  },
  {
    name: 'Prompt Design in Vertex AI',
    issuer: 'Google Cloud',
    year: null,
    type: 'Skill Badge',
    url: null,
  },
  {
    name: 'AWS Academy Graduate - Cloud Foundations - Training Badge',
    issuer: 'AWS Academy',
    year: '2026',
    type: 'Training Badge',
    url: 'https://www.credly.com/go/wuKLi4cs',
  },
  {
    name: 'Java (Basic)',
    issuer: 'HackerRank',
    year: '2025',
    type: 'Skill Certification',
    url: null,
    credentialId: '908A8C76FA2E',
  },
  {
    name: 'Python (Basic)',
    issuer: 'HackerRank',
    year: '2025',
    type: 'Skill Certification',
    url: null,
    credentialId: '2CF679B32803',
  },
]

export const ACHIEVEMENTS = [
  {
    title: 'Smart India Hackathon (SIH)',
    description:
      'Secured a place in the Top 50 out of 360 teams in the 2025 college internal SIH selection.',
    year: '2025',
    category: 'Hackathon',
  },
  {
    title: '4-Star in C — HackerRank',
    description: 'Achieved 4-star rating in C programming on HackerRank.',
    category: 'Problem Solving',
  },
  {
    title: '3-Star in Java — HackerRank',
    description: 'Achieved 3-star rating in Java programming on HackerRank.',
    category: 'Problem Solving',
  },
]
