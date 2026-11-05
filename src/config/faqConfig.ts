/**
 * FAQ Configuration for Festive Christmas Hackathon
 * All answers are grounded strictly in verified event configuration.
 */

import { FAQCategoryMeta, FAQIntroContent, FAQItem } from '../types/faq.ts';

export const faqIntroContent: FAQIntroContent = {
  eyebrow: 'A FEW THINGS TO KNOW',
  heading: 'Questions? Let’s Clear the Snow.',
  paragraph:
    'From getting started to understanding the event details, find the information you need to prepare for your Festive Christmas experience.',
};

export const faqCategoriesList: FAQCategoryMeta[] = [
  { id: 'all', label: 'All Questions' },
];

export const faqItemsList: FAQItem[] = [
  {
    id: 'faq-01',
    question: 'What is Festive Christmas?',
    answer:
      'Festive Christmas is an exclusive, one-day, 8-hour in-person mini hackathon on 25 December 2026 (9:00 AM–5:00 PM IST) bringing together creative developers and designers to build extraordinary projects.',
    category: 'all',
    categoryLabel: '',
    keywords: ['about', 'what is', 'overview'],
    publicationStatus: 'published',
    displayOrder: 1,
  },
  {
    id: 'faq-02',
    question: 'Who can participate?',
    answer:
      'Open to all passionate builders, developers, and designers aged 18+ (or enrolled students with consent) ready to join us on-site for the hackathon.',
    category: 'all',
    categoryLabel: '',
    keywords: ['who can participate', 'eligibility', 'age'],
    publicationStatus: 'published',
    displayOrder: 2,
  },
  {
    id: 'faq-03',
    question: 'How do I register?',
    answer:
      'You can sign up directly using the registration button on the website. Registration requires basic details and track preferences with no admission fee.',
    category: 'all',
    categoryLabel: '',
    keywords: ['register', 'sign up', 'fee'],
    publicationStatus: 'published',
    displayOrder: 3,
  },
  {
    id: 'faq-04',
    question: 'What are the rules for team size?',
    answer:
      'You can participate as a solo builder or in a team of up to 4 members. Cross-functional teams combining frontend, backend/AI, and UI/UX are highly encouraged.',
    category: 'all',
    categoryLabel: '',
    keywords: ['team size', 'solo', 'members'],
    publicationStatus: 'published',
    displayOrder: 4,
  },
  {
    id: 'faq-05',
    question: 'What project tracks are available?',
    answer:
      'There are four core tracks: 1) AI & Magic of Intelligence, 2) Web, App & Digital Experiences, 3) Climate, Community & Good, and 4) Open Innovation & Creative Experiments.',
    category: 'all',
    categoryLabel: '',
    keywords: ['tracks', 'themes', 'challenges'],
    publicationStatus: 'published',
    displayOrder: 5,
  },
  {
    id: 'faq-06',
    question: 'Where will the event happen?',
    answer:
      'This is a 100% in-person (offline) event. The exact venue details will be shared directly with registered participants.',
    category: 'all',
    categoryLabel: '',
    keywords: ['venue', 'location', 'in-person', 'offline'],
    publicationStatus: 'published',
    displayOrder: 6,
  },
  {
    id: 'faq-07',
    question: 'Are there restrictions on tech stacks or AI tools?',
    answer:
      'No. Builders may use any programming language, cloud platform, framework, or foundation model, provided the core project logic is built during the 8-hour sprint.',
    category: 'all',
    categoryLabel: '',
    keywords: ['tech stack', 'ai tools', 'framework', 'languages'],
    publicationStatus: 'published',
    displayOrder: 7,
  },
  {
    id: 'faq-08',
    question: 'Who owns the intellectual property (IP) of created projects?',
    answer:
      'You and your team retain 100% of the intellectual property rights to whatever you build. We make no ownership claim over your code.',
    category: 'all',
    categoryLabel: '',
    keywords: ['intellectual property', 'ip', 'ownership', 'code'],
    publicationStatus: 'published',
    displayOrder: 8,
  },
  {
    id: 'faq-09',
    question: 'How can I contact the organizers?',
    answer:
      'You can reach the organizing committee directly at yogeshsharma9425903357@gmail.com for any inquiries or assistance.',
    category: 'all',
    categoryLabel: '',
    keywords: ['contact', 'organizers', 'email', 'support'],
    publicationStatus: 'published',
    displayOrder: 9,
  },
];
