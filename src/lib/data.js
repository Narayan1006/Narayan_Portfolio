/**
 * Central data store — all copy lives here.
 * Keep components presentation-only.
 */

export const PERSONAL = {
  name: 'Narayan Singh',
  role: 'Software Engineer',
  currentRole: 'Java Developer Intern',
  roles: ['Java Developer Intern', 'Backend Engineer', 'AI Builder'],
  tagline: 'Building intelligent systems where backend engineering meets artificial intelligence.',
  shortBio:
    'Computer Science Engineering student focused on backend systems, artificial intelligence, machine learning, and scalable software architecture. My work combines backend development with AI engineering — from Spring Boot applications to RAG systems and intelligent software platforms.',
  bio: 'Backend Engineer and AI Builder specializing in Java systems, RAG architectures, and offline-first AI platforms. B.Tech CSE at ABES Engineering College. Currently a Java Developer Intern.',
  location: 'Ghaziabad, Uttar Pradesh, India',
  availability: 'Open to Opportunities',
  openTo: 'Full-time · Remote',
  email: 'singhnarayan0866@gmail.com',
  linkedin: 'https://www.linkedin.com/in/singhnarayan',
  github: 'https://github.com/Narayan1006',
}

export const PROJECTS = [
  {
    id: 'verihire',
    index: '01',
    title: 'VeriHire AI',
    year: '2024',
    status: 'DEPLOYED',
    statusType: 'deployed',
    constraint: '"How do you eliminate bias and inefficiency from the hiring process at scale?"',
    reasoning:
      'Built a multi-stage RAG pipeline that cross-references candidate responses against verified evidence, using LLM reasoning to score credibility — not just keyword matching.',
    breakthrough:
      'Replaced subjective HR screening with structured, explainable AI scoring that auditors can trace back to specific evidence.',
    description:
      'AI-powered hiring platform using semantic retrieval, evidence verification, and LLM reasoning.',
    systemDesc:
      'AI hiring platform that automates candidate evaluation using intelligent screening, structured assessments, and explainable AI scoring.',
    tech: ['Java', 'Spring Boot', 'Python', 'LangChain', 'ChromaDB', 'React'],
    github: 'https://github.com/Narayan1006/VireHire',
    demo: null,
  },
  {
    id: 'ranksense',
    index: '02',
    title: 'RankSense AI',
    year: '2024',
    status: 'PRODUCTION',
    statusType: 'production',
    constraint:
      '"How do you rank thousands of candidates meaningfully when every job requirement is different?"',
    reasoning:
      'Combined BM25 information retrieval for initial recall with RankNet neural re-ranking for precision — achieving meaningful ordering without human-labeled training data.',
    breakthrough:
      'Scaled to 100,000+ candidate profiles while maintaining sub-second ranking latency through chunked processing and vector indexing.',
    description:
      'Large-scale candidate ranking system using BM25 retrieval and RankNet reranking.',
    systemDesc:
      'Large-scale candidate ranking system using semantic similarity, multi-dimensional scoring, and RAG-powered job-fit analysis.',
    tech: ['Python', 'BM25', 'RankNet', 'NumPy', 'Pandas', 'Scikit-Learn'],
    github: 'https://github.com/Narayan1006/RankSense',
    demo: 'https://huggingface.co/spaces/Narayan1006/Ranksense',
  },
  {
    id: 'fieldagent',
    index: '03',
    title: 'FieldAgent',
    year: '2024',
    status: 'OPEN SOURCE',
    statusType: 'open',
    constraint:
      '"How do field workers access AI assistance in areas with no internet connectivity?"',
    reasoning:
      'Designed an offline-first architecture using quantized local models that run entirely on-device, syncing data only when connectivity is restored.',
    breakthrough:
      'Proved that AI assistance does not require cloud connectivity — serving last-mile users who need it most.',
    description:
      'Offline-first AI workflow platform designed for unreliable network environments.',
    systemDesc:
      'Offline-first AI workflow platform that runs intelligent agents locally, syncs when connectivity returns, and never loses data.',
    tech: ['Python', 'FastAPI', 'React', 'Docker', 'SQLite'],
    github: 'https://github.com/Narayan1006/FieldAgent',
    demo: null,
  },
  {
    id: 'classroom',
    index: '04',
    title: 'Offline Classroom AI',
    year: '2024',
    status: 'DEPLOYED',
    statusType: 'deployed',
    constraint:
      '"How do students in low-connectivity schools access AI-powered learning tools?"',
    reasoning:
      'Built a local LLM pipeline that processes lecture content and engages in lesson-aware conversations — entirely on-device with no external API calls.',
    breakthrough:
      'Transformed hardware-constrained classroom environments into AI-powered learning spaces without any infrastructure upgrades.',
    description:
      'Offline teaching assistant powered by local language models and lesson-aware conversations.',
    systemDesc:
      'Offline teaching assistant that runs on school hardware — answering student questions and supporting teachers without internet.',
    tech: ['Python', 'LLMs', 'RAG', 'React', 'FastAPI'],
    github: 'https://github.com/Narayan1006/offline-classroom-ai',
    demo: null,
  },
]

export const SKILLS = {
  languages: [
    { name: 'Java', level: 88 },
    { name: 'Python', level: 85 },
    { name: 'JavaScript', level: 78 },
    { name: 'C', level: 72 },
  ],
  backend: [
    { name: 'Spring Boot', level: 86 },
    { name: 'REST APIs', level: 88 },
    { name: 'FastAPI', level: 78 },
    { name: 'Docker', level: 72 },
  ],
  ai: [
    { name: 'RAG Systems', level: 84 },
    { name: 'LLMs', level: 80 },
    { name: 'ChromaDB', level: 76 },
    { name: 'Scikit-Learn', level: 75 },
  ],
  fullstack: [
    { name: 'React', level: 80 },
    { name: 'HTML / CSS', level: 85 },
    { name: 'Tailwind CSS', level: 78 },
    { name: 'Vite', level: 74 },
  ],
  learning: [
    'LangChain',
    'AI Agents',
    'Advanced RAG Systems',
    'Spring Boot Architecture',
    'Modern React Ecosystem',
  ],
}

export const SKILL_ZONES = [
  {
    id: 'core',
    label: 'CORE LANGUAGES',
    items: ['Java', 'Python', 'C', 'JavaScript'],
    color: 'accent',
  },
  {
    id: 'backend',
    label: 'BACKEND ROUTES',
    items: ['Spring Boot', 'REST APIs', 'FastAPI'],
    color: 'accent-light',
  },
  {
    id: 'ai',
    label: 'AI / ML FRONTIER',
    items: ['RAG', 'LLMs', 'ChromaDB', 'Scikit-Learn', 'NumPy', 'Pandas'],
    color: 'accent',
  },
  {
    id: 'fullstack',
    label: 'FULL STACK TERRITORY',
    items: ['React', 'Vite', 'Tailwind CSS', 'HTML', 'CSS'],
    color: 'accent-light',
  },
  {
    id: 'future',
    label: 'FUTURE DESTINATIONS',
    items: ['LangChain', 'AI Agents', 'AWS', 'Docker', 'Linux'],
    color: 'muted',
  },
]

export const EXPERIENCE = [
  {
    id: 'yukti-intern',
    solid: true,
    year: '2024 – Present',
    title: 'SDE Intern',
    company: 'Yukti Software',
    type: 'Onsite',
    description:
      'Working onsite at Yukti Software on production-grade software systems, backend APIs, and real-world software development workflows.',
    summary: 'Production backend systems',
    note: 'Gaining hands-on experience in the full software development lifecycle — from requirements to deployment in a professional engineering environment.',
    tags: ['Java', 'Spring Boot', 'REST APIs', 'Backend Architecture'],
  },
]

export const EDUCATION = {
  institution: 'ABES Engineering College',
  degree: 'Bachelor of Technology (B.Tech)',
  field: 'Computer Science Engineering',
  specialization: 'Computer Science Engineering',
  period: '2024 – Present',
  dept: 'CSE',
  focus:
    'Focus: Backend Systems, Artificial Intelligence, Machine Learning, Software Architecture',
  sgpa: [
    { term: 'Semester I', score: '8.00' },
    { term: 'Semester II', score: '8.60' },
    { term: 'Semester III', score: '7.98' },
  ],
  bullets: [
    'Specialization: Computer Science Engineering',
    'Relevant coursework: Data Structures, Algorithms, Operating Systems, Database Management, Machine Learning',
    'SGPA — Sem I: 8.00 · Sem II: 8.60 · Sem III: 7.98',
  ],
  highlights: [
    { label: 'SDE Intern', value: 'Yukti Software (Onsite)' },
    { label: 'RAG Systems', value: 'VeriHire AI · RankSense AI' },
    { label: 'Offline-First AI', value: 'FieldAgent · Classroom AI' },
    { label: 'ML Enthusiast', value: 'Scikit-Learn · LLMs · ChromaDB' },
  ],
}

export const SEMESTERS = [
  { term: 'Semester I', score: '8.00' },
  { term: 'Semester II', score: '8.64' },
  { term: 'Semester III', score: '7.98' },
]

export const ACHIEVEMENTS = [
  'Built and deployed multiple AI and machine learning projects.',
  'Hands-on experience with RAG pipelines and LLM applications.',
  'Developed full-stack applications from concept to deployment.',
  'Active GitHub contributor.',
  'Strong focus on backend engineering and intelligent systems.',
]
