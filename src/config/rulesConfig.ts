import { RuleSectionItem } from '../types/eventInformation.ts';

export const rulesIntroContent = {
  eyebrow: 'PLAY FAIR. BUILD BOLDLY.',
  heading: 'The Rules Behind the Magic',
  paragraph:
    'A great hackathon begins with shared expectations. Review the participation guidelines and make sure you understand the requirements before joining.',
};

export const eligibilityCards = [
  {
    id: 'el-age',
    label: 'Eligibility & Age',
    value: 'Open to all passionate builders 18+ (or enrolled students with consent) ready to join us on-site',
    icon: 'users',
  },
  {
    id: 'el-format',
    label: 'Format & Location',
    value: '100% In-Person Experience (Join us at the festive venue to build, collaborate, and celebrate together)',
    icon: 'globe',
  },
  {
    id: 'el-team',
    label: 'Team Size',
    value: '1 to 4 members per team (Form your crew on-site or arrive with your squad ready to build)',
    icon: 'shield',
  },
  {
    id: 'el-freshness',
    label: 'Code Freshness',
    value: 'Fresh code written on-site during the live 8-hour holiday build marathon',
    icon: 'code',
  },
];

export const ruleSections: RuleSectionItem[] = [
  {
    id: 'rule-01',
    title: 'Participation Guidelines & Team Formation',
    summary:
      'General requirements covering on-site check-in, squad sizes, and live collaboration.',
    details:
      'Participants may register individually or in teams of up to 4 members. You can find teammates during our on-site morning welcome mixer or arrive as a completed squad. Team registrations close when the hacking timer begins.',
    guidelines: [
      'Teams must consist of 1 to 4 registered on-site attendees.',
      'All team members must check in at the venue registration desk before kickoff.',
      'A participant may only submit a single primary project to one competitive track.',
      'On-site matchmaking assistance will be facilitated during the morning welcome hour.',
    ],
    officialStatus: 'draft',
  },
  {
    id: 'rule-02',
    title: 'Originality, Code Freshness & Attribution',
    summary:
      'Standards for intellectual honesty, third-party libraries, and crafting software on-site.',
    details:
      'To ensure fair play for all participants, all project code and prototypes must be initiated and built on-site during the live 8-hour build sprint. Utilizing public open-source libraries, UI components, and public APIs is welcomed with proper attribution in your repository README.',
    guidelines: [
      'Pre-existing full codebases, templates disguised as completed projects, or commercial products are prohibited.',
      'Third-party APIs, SDKs, npm packages, and design kits must be clearly documented.',
      'Generative AI tools (LLMs, code assistants) may be used for ideation, coding assistance, and asset generation with proper attribution.',
      'All code must be hosted in a publicly inspectable Git repository with a transparent commit history during the event.',
    ],
    officialStatus: 'draft',
  },
  {
    id: 'rule-03',
    title: 'Responsible Technology & Safety Standards',
    summary:
      'Ethical standards regarding user privacy, data security, and responsible technological implementation.',
    details:
      'Projects must adhere to responsible engineering principles. Software designed to deceive, harvest private user credentials, violate platform terms of service, or cause digital harm will be disqualified immediately.',
    guidelines: [
      'Respect data privacy: Do not store or transmit sensitive personal data without explicit simulated sandboxes.',
      'Adhere to the API terms of service for all integrated platforms.',
      'AI systems should prioritize safety, transparency, and helpfulness.',
      'Security vulnerabilities identified during development should be handled responsibly.',
    ],
    officialStatus: 'draft',
  },
  {
    id: 'rule-04',
    title: 'Project Submission Requirements',
    summary:
      'Mandatory artifacts required for a project to be considered complete and eligible for review.',
    details:
      'When the submission window closes at 7:00 PM, teams must submit all required artifacts through the participant portal and prepare for on-site live demonstrations.',
    guidelines: [
      'Public GitHub / GitLab repository link with an informative README.',
      'Live functional deployment URL or instructions for running the demo at your station.',
      'Concise 2-minute project walkthrough or live presentation for the judging panel.',
      'Selection of one primary challenge track for evaluation.',
    ],
    officialStatus: 'draft',
  },
  {
    id: 'rule-05',
    title: 'Evaluation Pillars & Judging Focus (Draft)',
    summary:
      'The four foundational criteria that will guide project reviews across all challenge tracks.',
    details:
      'Projects are evaluated by a multidisciplinary panel considering innovation, execution quality, and thematic creativity in equal measure.',
    guidelines: [
      'Innovation & Originality (25%): How creative, ambitious, and novel is the core concept?',
      'Technical Execution (25%): Quality of software architecture, code cleanliness, and stability of demo.',
      'User Experience & Polish (25%): Thoughtfulness of interface design, usability, and accessibility.',
      'Holiday Theme Resonance (25%): How meaningfully does the project embody the spirit of Festive Christmas?',
    ],
    officialStatus: 'draft',
  },
  {
    id: 'rule-06',
    title: 'Community Safety & Code of Conduct',
    summary:
      'Our commitment to maintaining a welcoming, harassment-free, and respectful environment.',
    details:
      'Festive Christmas is dedicated to providing an inclusive, safe, and joyful in-person experience for everyone regardless of gender identity, sexual orientation, disability, appearance, race, ethnicity, or technological background.',
    guidelines: [
      'Be respectful, collaborative, and considerate to all attendees, mentors, and venue staff.',
      'Harassment, exclusionary behavior, or damage to venue property will result in immediate disqualification and removal.',
      'Report any safety or conduct concerns immediately to event organizers on-site or via hello@festivechristmas.dev.',
    ],
    officialStatus: 'draft',
  },
];
