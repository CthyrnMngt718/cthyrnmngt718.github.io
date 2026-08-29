export const PROFILE = {
  name: 'Cathyrine Menguito',
  title: 'Front-End Developer · UI/UX · Junior System Development',
  location: 'Morong, Rizal, Philippines',
  email: 'cthyrnmngt718@gmail.com',
  phone: '+63 965 803 9637',
  github: 'https://github.com/CthyrnMngt718/cthyrnmngt718.github.io',
  githubProfile: 'https://github.com/CthyrnMngt718',
  repository: 'https://github.com/CthyrnMngt718/cthyrnmngt718.github.io',
  facebook: 'https://www.facebook.com/cathyrine.menguito',
  instagram: 'https://www.instagram.com/itsme_cthymngt/',
  portfolio: 'https://cthyrnmngt718.github.io/',
  formspree: 'https://formspree.io/f/mzepkbgw',
  publicResume: 'https://cthyrnmngt718.github.io/assets/docs/Cathyrine-Menguito-Public-Resume.pdf',
  recruiterSummary: 'Cathyrine Menguito is a BS Computer Science graduate whose main strengths are UI/UX and responsive front-end work. She also has hands-on PHP/MySQL project experience, client-facing experience, and experience coordinating with developers and project stakeholders.'
};

export const ROLE_LENSES = {
  all: {
    label: 'Balanced view',
    eyebrow: 'HIRING PORTFOLIO · 2026',
    headline: 'I build clear, responsive interfaces for real-world systems.',
    description: 'I’m a BS Computer Science graduate with hands-on work in UI/UX, responsive front-end development, PHP/MySQL systems, project coordination, and client support.',
    priorities: ['uiux', 'frontend', 'systems', 'coordination']
  },
  frontend: {
    label: 'Front-End',
    eyebrow: 'FRONT-END ROLE LENS',
    headline: 'I build responsive interfaces that stay clear on desktop, tablet, and mobile.',
    description: 'This view highlights my HTML, CSS, JavaScript, Bootstrap, responsive layout, form, dashboard, and interaction work across the projects in this portfolio.',
    priorities: ['frontend', 'uiux', 'systems']
  },
  uiux: {
    label: 'UI/UX',
    eyebrow: 'UI/UX ROLE LENS',
    headline: 'I plan interfaces around the task, the information, and the person using them.',
    description: 'This view highlights how I organize information, plan user flows, handle form states, and adapt interfaces across screen sizes.',
    priorities: ['uiux', 'frontend', 'coordination']
  },
  systems: {
    label: 'System Development',
    eyebrow: 'SYSTEM DEVELOPMENT ROLE LENS',
    headline: 'I work on practical web systems that connect forms, records, workflows, and data.',
    description: 'This view highlights my PHP/MySQL project work, database-backed forms and records, independent academic development, and professional system experience.',
    priorities: ['systems', 'frontend', 'support']
  },
  support: {
    label: 'Project / Client Support',
    eyebrow: 'PROJECT SUPPORT ROLE LENS',
    headline: 'I can bridge technical work with client needs and team coordination.',
    description: 'This view highlights requirements clarification, client communication, documentation, troubleshooting, task coordination, and teamwork.',
    priorities: ['coordination', 'support', 'systems']
  }
};

export const CAPABILITIES = [
  {
    id: 'uiux',
    area: 'UI/UX & Interface Design',
    level: 'Strongest focus',
    roles: ['all','uiux','frontend'],
    evidence: ['RHU Morong interface direction', 'HowCan-i-Help UI implementation', 'RITREMIS responsive interface work', 'Personal portfolio design system'],
    skills: ['Information hierarchy', 'Layout planning', 'Responsive states', 'Form UX', 'Dashboard UI', 'Interaction refinement']
  },
  {
    id: 'frontend',
    area: 'Responsive Front-End',
    level: 'Strongest focus',
    roles: ['all','frontend','uiux'],
    evidence: ['Responsive portfolio implementation', 'Healthcare and real-estate UI work', 'Multi-device layouts', 'Interactive components and form states'],
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive design', 'Accessibility states']
  },
  {
    id: 'systems',
    area: 'PHP / MySQL System Development',
    level: 'Project experience',
    roles: ['all','systems','frontend'],
    evidence: ['Angono NHS independent project', 'RHU Morong backend integration collaboration', 'HowCan-i-Help professional exposure', 'RITREMIS active development'],
    skills: ['PHP', 'MySQL', 'CRUD workflows', 'Form handling', 'Records', 'Database-backed pages']
  },
  {
    id: 'coordination',
    area: 'Project & Client Coordination',
    level: 'Professional strength',
    roles: ['all','support','uiux'],
    evidence: ['Operations & Client Success responsibilities', 'Real IT OPC delivery collaboration', 'Skyline CATV customer support', 'Class leadership experience'],
    skills: ['Requirements clarification', 'Communication', 'Feedback handling', 'Task coordination', 'Client support', 'Team collaboration']
  },
  {
    id: 'support',
    area: 'Support, Troubleshooting & Documentation',
    level: 'Working capability',
    roles: ['all','support','systems'],
    evidence: ['TESDA NC II · Computer Systems Servicing', 'Technical documentation work', 'Project debugging and refinement', 'Project Knowledge Seminar participation'],
    skills: ['Technical documentation', 'Basic troubleshooting', 'Testing', 'Handoff notes', 'Project diagrams', 'Office / Workspace tools']
  }
];
