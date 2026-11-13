import { PROJECTS_DATA } from './projectsData'

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
    period: '15 Jun 2026 – 06 Jul 2026', // TODO: Narayan to confirm exact internship dates
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
      'Implemented 5 RESTful APIs for LMS modules using Spring Boot and Spring Data JPA.',
      'Worked on database integration and persistence across 6+ LMS entities using PostgreSQL and H2.', // TODO: Narayan to confirm 6+ LMS entities
      'Contributed to frontend development of the LMS using React, Vite, and Tailwind CSS.',
      'Worked across frontend and backend areas of the LMS to support end-to-end feature implementation.',
    ],
  },
]

export const PROJECTS = PROJECTS_DATA;

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
      name: 'Codolio',
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
