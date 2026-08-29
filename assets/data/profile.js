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
  recruiterSummary: 'Cathyrine Menguito is a BS Computer Science graduate focused on UI/UX and responsive front-end development, with practical PHP/MySQL system experience, professional project collaboration, technical coordination, documentation, and client-facing experience.'
};

export const ROLE_LENSES = {
  all: {
    label: 'Balanced view',
    eyebrow: 'HIRING PORTFOLIO · 2026',
    headline: 'I design interfaces that make complex systems easier to understand and use.',
    description: 'Computer Science graduate focused on UI/UX and responsive front-end implementation, with hands-on experience building and supporting PHP/MySQL systems, coordinating requirements, and contributing to collaborative software delivery.',
    priorities: ['uiux', 'frontend', 'systems', 'coordination']
  },
  frontend: {
    label: 'Front-End',
    eyebrow: 'FRONT-END ROLE LENS',
    headline: 'Responsive interfaces, thoughtful states, and implementation that holds up across devices.',
    description: 'This view emphasizes responsive layout architecture, HTML/CSS implementation, JavaScript interaction, Bootstrap, forms, dashboards, and interface refinement across documented projects.',
    priorities: ['frontend', 'uiux', 'systems']
  },
  uiux: {
    label: 'UI/UX',
    eyebrow: 'UI/UX ROLE LENS',
    headline: 'Clear information hierarchy, usable workflows, and interfaces built around real users.',
    description: 'This view emphasizes interface planning, workflow thinking, visual hierarchy, responsive behavior, form usability, and the reasoning behind design decisions.',
    priorities: ['uiux', 'frontend', 'coordination']
  },
  systems: {
    label: 'System Development',
    eyebrow: 'SYSTEM DEVELOPMENT ROLE LENS',
    headline: 'Practical web systems that connect interfaces, workflows, records, and data.',
    description: 'This view emphasizes PHP/MySQL project work, forms, records, database-backed features, end-to-end academic development, and professional system exposure.',
    priorities: ['systems', 'frontend', 'support']
  },
  support: {
    label: 'Project / Client Support',
    eyebrow: 'PROJECT SUPPORT ROLE LENS',
    headline: 'Technical work becomes stronger when requirements, users, and teams stay aligned.',
    description: 'This view emphasizes client communication, project coordination, documentation, troubleshooting, requirements clarification, and collaborative delivery.',
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
