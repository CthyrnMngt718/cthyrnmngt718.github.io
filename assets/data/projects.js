export const PROJECTS = [
  {
    slug: 'rhu-morong',
    short: 'RHU',
    title: 'RHU Morong Health System',
    category: 'Healthcare · Thesis · Team project',
    year: '2026',
    roles: ['webdev','systems','uiux'],
    summary: 'A healthcare management system for the Rural Health Unit of Morong, Rizal, built to improve patient intake, appointment scheduling, and record-management workflows.',
    problem: 'Healthcare personnel needed a clearer, more organized way to handle operational information and recurring patient workflows in one system.',
    users: 'Healthcare personnel and administrative users working with patient and appointment records.',
    responsibility: 'Web-based interface architecture, responsive implementation, workflow and UI/UX decisions, plus close collaboration with Ariel B. Eubanas, Jr. on backend integration and system optimization.',
    decisions: [
      'Group related patient information so staff can scan records faster.',
      'Use clear visual hierarchy for primary actions and status information.',
      'Keep dense management screens readable across different viewport sizes.',
      'Design forms and records around the order users perform real tasks.'
    ],
    challenges: 'Balancing information density with usability while ensuring the interface still connected correctly with backend and database workflows.',
    solution: 'Structured screens around workflow stages, clarified visual priority, and refined web-system behavior while collaborating on integration and data-flow issues.',
    outcome: 'Received Outstanding System Design and Outstanding Thesis Writing recognition.',
    learning: 'If revisiting the project today, I would formalize reusable components earlier, document more interface states, and conduct more structured usability testing with representative users.',
    stack: ['HTML','CSS','JavaScript','PHP','MySQL','Bootstrap'],
    live: 'https://moronghealthsystem.com/',
    fullCase: 'https://cthyrnmngt718.github.io/work/rhu-morong/'
  },
  {
    slug: 'angono-career-assessment',
    short: 'ANHS',
    title: 'Angono NHS Career Assessment',
    category: 'Education · Academic · Independent',
    year: '2026',
    roles: ['webdev','systems','uiux'],
    summary: 'A web-based career guidance tool for incoming Senior High School students to explore suitable SHS strands using interests, skills, and academic inclinations.',
    problem: 'Students needed a more structured digital way to reflect on possible strand choices and receive guidance based on assessment inputs.',
    users: 'Incoming Senior High School students and school personnel supporting the assessment process.',
    responsibility: 'Independent development of the database, web interface, system features, testing, and deployment across the full project lifecycle.',
    decisions: [
      'Keep the assessment flow sequential and easy to understand.',
      'Use progressive disclosure so users focus on one decision at a time.',
      'Make results clear enough to support discussion rather than appear as an opaque score.',
      'Keep the interface usable on typical student devices.'
    ],
    challenges: 'Owning multiple layers of the application independently while keeping the assessment flow and data handling consistent.',
    solution: 'Built the interface, database, and core features together around one clear user journey, then refined behavior through testing and deployment.',
    outcome: 'Successfully assessed 50+ students and supported more informed academic decision-making.',
    learning: 'A future version could use stronger analytics, improved accessibility testing, and more formal validation of assessment content with school guidance professionals.',
    stack: ['HTML','CSS','JavaScript','PHP','MySQL','Bootstrap'],
    live: 'https://angononhs-onlinecareerassessment.online/',
    fullCase: 'https://cthyrnmngt718.github.io/work/angono-career-assessment/'
  },

  {
    slug: 'mbmis',
    short: 'MBMIS',
    title: 'Menguito Businesses MIS',
    category: 'Business Operations · Full Stack · Live',
    year: '2026',
    roles: ['webdev','systems','uiux','coordination'],
    summary: 'A full-stack management information system for Menguito Businesses that brings operational records, services, assets, collections, financial information, and role-based workspaces into one secure web platform.',
    problem: 'Business information and day-to-day operational tasks needed a more organized way to live in one system while still giving each user access to the tools and responsibilities assigned to their role.',
    users: 'Authorized staff and administrators working across Menguito Businesses operations and management workflows.',
    responsibility: 'Full-stack development across the responsive interface, PHP application workflows, MySQL-backed data handling, role-aware access, validation, system modules, deployment, and iterative maintenance.',
    decisions: [
      'Organize business modules around the tasks users actually perform instead of exposing every function at once.',
      'Use role-aware access so the workspace can adapt to assigned responsibilities.',
      'Keep authentication, status, and account-security feedback clear without making the interface feel heavy.',
      'Build reusable layout and component patterns so new modules can remain visually and behaviorally consistent.'
    ],
    challenges: 'Bringing multiple business functions into one management system while keeping permissions, navigation, data workflows, and interface behavior understandable as the platform grows.',
    solution: 'Structured the system around reusable modules and role-based workflows, connected front-end states to database-backed operations, and refined the interface and application behavior through repeated testing and deployment updates.',
    outcome: 'Deployed online as the active Menguito Businesses Management Information System at menguitobmis.online.',
    learning: 'The project strengthened my full-stack workflow: planning the interface and data flow together, keeping role-based behavior consistent, and treating deployment, security checks, and maintenance as part of development rather than as separate afterthoughts.',
    stack: ['HTML','CSS','JavaScript','PHP','MySQL','Bootstrap'],
    live: 'https://menguitobmis.online/',
    fullCase: 'https://cthyrnmngt718.github.io/work/mbmis/'
  },
  {
    slug: 'ritremis',
    short: 'RIT',
    title: 'RITREMIS',
    category: 'Real Estate · Professional · Real IT OPC',
    year: '2026',
    roles: ['webdev','uiux','coordination'],
    summary: 'A real-estate management information platform designed to centralize property information and improve how stakeholders work with property-related data.',
    problem: 'Property-management workflows involve dense records and varied stakeholder needs, requiring an interface that remains organized and responsive.',
    users: 'Property managers and other stakeholders working with property and transaction information.',
    responsibility: 'Web-interface implementation, UI/UX design, responsive system work, and collaboration with the development team during active implementation.',
    decisions: [
      'Prioritize scannable record layouts for data-heavy screens.',
      'Use responsive structures that adapt dense content rather than simply shrink it.',
      'Separate status, actions, and metadata so users can understand records quickly.',
      'Keep visual patterns consistent across property-related workflows.'
    ],
    challenges: 'Designing for complex records while the wider system continued to evolve during active development.',
    solution: 'Used reusable interface patterns, responsive layouts, and iterative refinement with the team as requirements changed.',
    outcome: 'Currently in active development at Real IT OPC.',
    learning: 'The project has strengthened my understanding of designing interfaces while requirements are still evolving and why reusable patterns matter for maintainability.',
    stack: ['PHP','MySQL','JavaScript','Bootstrap'],
    live: '',
    fullCase: 'https://cthyrnmngt718.github.io/work/ritremis/'
  }
];
