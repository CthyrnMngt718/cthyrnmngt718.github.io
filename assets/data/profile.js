export const PROFILE = {
  name: 'Cathyrine Menguito',
  title: 'Web-Based Developer · System Development · UI/UX',
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
  recruiterSummary: 'Cathyrine Menguito is a BS Computer Science graduate with hands-on experience in web-based development, responsive interfaces, PHP/MySQL systems, UI/UX, project coordination, client support, and team-based system delivery.'
};

export const ROLE_LENSES = {
  all: {
    label: 'Balanced view',
    eyebrow: 'HIRING PORTFOLIO · 2026',
    headline: 'I build practical web-based systems for real-world work.',
    description: 'I’m a BS Computer Science graduate with hands-on experience building and supporting web-based systems using HTML, CSS, JavaScript, PHP, MySQL, responsive interface design, project coordination, and client support.',
    priorities: ['webdev', 'systems', 'uiux', 'coordination']
  },
  webdev: {
    label: 'Web Development',
    eyebrow: 'WEB DEVELOPMENT ROLE LENS',
    headline: 'I build responsive web-based applications that connect people, workflows, and data.',
    description: 'This view highlights my HTML, CSS, JavaScript, Bootstrap, PHP/MySQL, responsive layout, forms, records, dashboard, and web-system work across academic and professional projects.',
    priorities: ['webdev', 'frontend', 'systems', 'uiux']
  },
  uiux: {
    label: 'Interface & UX',
    eyebrow: 'INTERFACE & UX ROLE LENS',
    headline: 'I structure web interfaces around the task, the information, and the person using the system.',
    description: 'This view highlights information hierarchy, workflow planning, form states, responsive behavior, usability decisions, and implementation-aware interface work.',
    priorities: ['uiux', 'webdev', 'frontend', 'coordination']
  },
  systems: {
    label: 'System & Data',
    eyebrow: 'SYSTEM DEVELOPMENT ROLE LENS',
    headline: 'I work on practical web systems that connect forms, records, workflows, and data.',
    description: 'This view highlights PHP/MySQL project work, database-backed forms and records, independent academic development, system integration, and professional project experience.',
    priorities: ['systems', 'webdev', 'frontend', 'support']
  },
  support: {
    label: 'Project / Client Support',
    eyebrow: 'PROJECT SUPPORT ROLE LENS',
    headline: 'I can bridge web-system work with client needs and team coordination.',
    description: 'This view highlights requirements clarification, client communication, documentation, troubleshooting, task coordination, and teamwork.',
    priorities: ['coordination', 'support', 'systems', 'webdev']
  }
};

export const CAPABILITIES = [
  {
    id: 'webdev',
    area: 'Web-Based Development',
    level: 'Core practice',
    roles: ['all','webdev','systems','uiux'],
    evidence: ['RHU Morong Health System', 'Angono NHS independent web application', 'HowCan-i-Help professional project', 'RITREMIS active development'],
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive layouts', 'Web application workflows']
  },
  {
    id: 'systems',
    area: 'PHP / MySQL System Development',
    level: 'Project experience',
    roles: ['all','systems','webdev'],
    evidence: ['Angono NHS independent project', 'RHU Morong system integration', 'HowCan-i-Help professional exposure', 'RITREMIS active development'],
    skills: ['PHP', 'MySQL', 'CRUD workflows', 'Form handling', 'Records', 'Database-backed pages']
  },
  {
    id: 'uiux',
    area: 'Interface & UX Design',
    level: 'Complementary strength',
    roles: ['all','uiux','webdev'],
    evidence: ['RHU Morong interface direction', 'HowCan-i-Help interface implementation', 'RITREMIS responsive interface work', 'Personal portfolio design system'],
    skills: ['Information hierarchy', 'Layout planning', 'Responsive states', 'Form UX', 'Dashboard UI', 'Interaction refinement']
  },
  {
    id: 'coordination',
    area: 'Project & Client Coordination',
    level: 'Professional strength',
    roles: ['all','support','webdev'],
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
