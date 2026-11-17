// Everything on the site reads from this file — edit it to update the portfolio.

export const profile = {
  name: 'Ismail Miloua',
  firstName: "ismail's",
  roles: ['Computer Science Senior at Pitt', 'Full-Stack Developer', 'Building Agentic AI Systems'],
  tagline:
    'I build full-stack web apps and LLM-powered systems by day, to enjoy working out and playing video games at night.',
  location: 'Pittsburgh, PA',
  email: 'milouaismail71@gmail.com',
  github: 'https://github.com/ishScript',
  linkedin: 'https://www.linkedin.com/in/ismail-m-48397722b',
};

export const about = [
  "I'm a Computer Science student at the University of Pittsburgh, graduating in December 2026. My coursework has covered software engineering, software quality assurance, operating systems, data structures and algorithms, and web development.",
  "Right now I'm building my senior capstone with industry partner CGI: an agentic AI system that maps contributor expertise across a codebase using LangChain and GraphRAG.",
  "Alongside school I work as a Technical Specialist at Apple, where I troubleshoot hardware and software problems and explain the fixes to people who aren't technical. I'm open to software engineering roles.",
];

export const skillGroups = [
  { label: 'Languages', items: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'Swift', 'HTML5', 'CSS'] },
  { label: 'Frameworks', items: ['React', 'LangChain', 'Flask', 'SQLAlchemy'] },
  {
    label: 'Tools',
    items: ['Git', 'GitHub', 'Vite', 'JUnit', 'Playwright', 'GDB', 'AWS (S3, EC2)', 'Terraform', 'PostgreSQL', 'MySQL'],
  },
  {
    label: 'Concepts',
    items: ['Agentic Systems & LLMs', 'GraphRAG', 'Operating Systems', 'Algorithms & Data Structures', 'RESTful APIs', 'Agile'],
  },
];

// repo and demo are optional — add the URLs and the buttons appear in the project dialog.
export const projects = [
  {
    id: 'contribution-intelligence',
    title: 'Contribution Intelligence',
    when: 'Fall 2026 · Senior capstone with CGI',
    summary:
      'An agentic AI system that maps contributor expertise in a GitHub repository and surfaces knowledge risk for engineering leaders.',
    highlights: [
      'Agentic system built with LangChain for industry partner CGI, analysing a real open-source GitHub repository.',
      'Python ingestion pipeline that merges commit history, documentation and Jira stories into a Neo4j knowledge graph, enriched with LLM-written summaries of each contributor’s work.',
      'GraphRAG chat interface that answers questions like who the subject-matter expert for a component is, or which code only one person understands.',
      'Run in Agile sprints with CGI stakeholders, with an end-to-end system and live demo due at the end of the semester.',
    ],
    tags: ['Python', 'LangChain', 'GraphRAG', 'Neo4j', 'PostgreSQL'],
  },
  {
    id: 'multi-room-chat',
    title: 'Real-Time Multi-Room Chat',
    when: 'Full-stack web app',
    summary: 'A Flask chat platform with multiple concurrent rooms and near-real-time message delivery.',
    highlights: [
      'RESTful JSON API for incremental fetching that returns only new messages on each request, keeping payloads small.',
      'Multiple concurrent chat rooms with near-real-time delivery through a one-second polling loop.',
      'User authentication, room ownership enforcement, live ejection of users from deleted rooms, and server-side message ordering to prevent phantom messages.',
    ],
    tags: ['Python', 'Flask', 'JavaScript', 'SQLAlchemy', 'SQLite'],
  },
];

export const experience = [
  {
    role: 'Technical Specialist',
    org: 'Apple',
    place: 'Pittsburgh, PA',
    dates: 'August 2025 – Present',
    points: [
      'Diagnose and resolve hardware and software issues across the Apple ecosystem, using structured troubleshooting to find root causes.',
      'Work with teammates to streamline in-store workflows, reducing issue resolution time.',
      'Partner with the Business team to identify customer needs, averaging 31+ business introductions per quarter.',
    ],
  },
  {
    role: 'Sales Advisor',
    org: 'Best Buy',
    place: 'Pittsburgh, PA',
    dates: 'July 2020 – October 2022',
    points: [
      'Analysed sales data to identify trends and inform product strategy.',
      'Advised customers on consumer electronics, reaching $60K–$90K in monthly sales while exceeding KPI targets.',
    ],
  },
];

export const education = {
  school: 'University of Pittsburgh',
  degree: 'B.S. Computer Science',
  dates: 'Expected December 2026',
};
