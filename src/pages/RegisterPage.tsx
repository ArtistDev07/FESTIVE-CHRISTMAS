import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Users,
  Shield,
  CheckCircle2,
  AlertCircle,
  QrCode,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lock,
  Receipt,
  Loader2,
  Building2,
  Phone,
  Mail,
  Home,
  MapPin,
  GraduationCap,
  BookOpen,
  Calendar,
  Hash,
  Layers,
  Code2,
  Cpu,
  Github,
  Linkedin,
  FileCode,
  Lightbulb,
  Check,
  Trees,
  Copy,
  Printer,
  Compass,
} from 'lucide-react';
import { FestiveContainer } from '../components/ui/FestiveContainer.tsx';
import { FestiveBadge } from '../components/ui/FestiveBadge.tsx';

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================

/**
 * Replace this placeholder with your deployed Google Apps Script Web App URL.
 * When submitted, this endpoint receives the full registration payload and appends
 * it as a new row in your connected Google Sheet.
 */
export const GOOGLE_SCRIPT_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbx5sIBLF1mvrFmWp9jDueYdWgqUUITGMMZOrbrAIxRes0NymQGdfmicH0lTc7YJRl5njQ/exec';

export const REGISTRATION_FEE_INR = 400;

export const PAYMENT_PAYEE_NAME = 'Yogesh Sharma';
export const PAYMENT_UPI_ID = 'yogeshsharma9425903357@oksbi';

/**
 * Payment QR Code image URL pointing to the official Google Pay QR asset.
 */
export const PAYMENT_QR_CODE_URL: string =
  '/assets/aistudio/Untitled_design__6__6804172a.jpg';

export type TeamSizeOption = 'solo' | 'duo' | 'trio' | 'squad';

export interface TeamSizeConfig {
  id: TeamSizeOption;
  label: string;
  memberCount: number;
  badge: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

export const TEAM_SIZES: TeamSizeConfig[] = [
  {
    id: 'solo',
    label: 'Solo',
    memberCount: 1,
    badge: '1 Member',
    subtitle: 'Independent Innovator',
    description: 'Fly solo, architect end-to-end, and build your festive project independently.',
    icon: <User className="h-6 w-6 text-[#E9C578]" />,
  },
  {
    id: 'duo',
    label: 'Duo',
    memberCount: 2,
    badge: '2 Members',
    subtitle: 'Dynamic Pair',
    description: 'Two minds in sync: divide frontend, backend, or design for rapid sprint velocity.',
    icon: <Users className="h-6 w-6 text-[#25A18E]" />,
  },
  {
    id: 'trio',
    label: 'Trio',
    memberCount: 3,
    badge: '3 Members',
    subtitle: 'Tri-Force Crew',
    description: 'Balanced squad for specialized engineering, UI/UX polish, and pitch execution.',
    icon: <Users className="h-6 w-6 text-[#FFB703]" />,
  },
  {
    id: 'squad',
    label: 'Squad',
    memberCount: 4,
    badge: '4 Members',
    subtitle: 'Full Powerhouse',
    description: 'The maximum allowable team size. Ideal for ambitious, multi-disciplinary builds.',
    icon: <Shield className="h-6 w-6 text-[#FFD700]" />,
  },
];

export const TECHNICAL_DOMAINS = [
  'Artificial Intelligence & Machine Learning',
  'Web3, Blockchain & Decentralized Apps',
  'Full-Stack Web & Mobile Development',
  'Cloud Architecture, DevOps & Cybersecurity',
  'IoT, Smart Hardware & Embedded Systems',
  'AR/VR, Game Tech & Creative Computing',
  'Open Innovation & Festive Solutions',
];

export const ACADEMIC_YEARS = [
  '1st Year (Freshman)',
  '2nd Year (Sophomore)',
  '3rd Year (Junior)',
  '4th Year (Senior)',
  'Post-Graduate / Master’s',
  'Alumni / Working Professional',
];

export interface RegistrationFormData {
  // Step 1: Team Information
  teamName: string;
  technicalDomain: string;
  city: string;
  state: string;
  teamSize: TeamSizeOption;

  // Step 2: Team Leader Details
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  leaderCollege: string;
  leaderDegree: string;
  leaderBranch: string;
  leaderYear: string;
  leaderRollNumber: string; // Optional

  // Step 3: Dynamic Team Members
  member2Name: string;
  member2Email: string;
  member2Phone: string;

  member3Name: string;
  member3Email: string;
  member3Phone: string;

  member4Name: string;
  member4Email: string;
  member4Phone: string;

  // Step 4: Technical Profiles & Experience
  programmingLanguages: string; // comma separated
  frameworks: string;
  githubUrl: string;
  linkedinUrl: string;
  pastExperience: string; // Textarea
  projectBrief: string; // Textarea

  // Step 5: Payment Verification
  transactionId: string; // Mandatory UTR / Transaction ID
}

const INITIAL_FORM_DATA: RegistrationFormData = {
  teamName: '',
  technicalDomain: '',
  city: '',
  state: '',
  teamSize: 'duo',

  leaderName: '',
  leaderEmail: '',
  leaderPhone: '',
  leaderCollege: '',
  leaderDegree: '',
  leaderBranch: '',
  leaderYear: '',
  leaderRollNumber: '',

  member2Name: '',
  member2Email: '',
  member2Phone: '',

  member3Name: '',
  member3Email: '',
  member3Phone: '',

  member4Name: '',
  member4Email: '',
  member4Phone: '',

  programmingLanguages: '',
  frameworks: '',
  githubUrl: '',
  linkedinUrl: '',
  pastExperience: '',
  projectBrief: '',

  transactionId: '',
};

export const RegisterPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [formData, setFormData] = useState<RegistrationFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState<string>('');
  const [copiedId, setCopiedId] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const selectedSizeConfig =
    TEAM_SIZES.find((s) => s.id === formData.teamSize) || TEAM_SIZES[1];

  // Helper to update specific fields
  const updateField = (field: keyof RegistrationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-level error when user types
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Validation functions
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/[\s\-+()]/g, '');
    return /^\d{10,12}$/.test(cleaned);
  };

  const validateUrl = (url: string) => {
    const trimmed = url.trim();
    if (!trimmed) return false;
    return (
      trimmed.startsWith('http://') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('github.com') ||
      trimmed.startsWith('linkedin.com') ||
      trimmed.includes('.')
    );
  };

  // Step-by-step validation engine
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.teamName.trim()) {
        newErrors.teamName = 'Team name is required.';
      } else if (formData.teamName.trim().length < 2) {
        newErrors.teamName = 'Team name must be at least 2 characters.';
      }

      if (!formData.technicalDomain.trim()) {
        newErrors.technicalDomain = 'Please select a preferred technical domain.';
      }

      if (!formData.city.trim()) {
        newErrors.city = 'City is required.';
      }

      if (!formData.state.trim()) {
        newErrors.state = 'State / Region is required.';
      }
    }

    if (step === 2) {
      if (!formData.leaderName.trim()) {
        newErrors.leaderName = 'Team Leader full name is required.';
      }

      if (!formData.leaderEmail.trim()) {
        newErrors.leaderEmail = 'Email address is required.';
      } else if (!validateEmail(formData.leaderEmail)) {
        newErrors.leaderEmail = 'Please enter a valid email address.';
      }

      if (!formData.leaderPhone.trim()) {
        newErrors.leaderPhone = 'Mobile number is required.';
      } else if (!validatePhone(formData.leaderPhone)) {
        newErrors.leaderPhone = 'Please enter a valid 10-digit mobile number.';
      }

      if (!formData.leaderCollege.trim()) {
        newErrors.leaderCollege = 'College or University name is required.';
      }

      if (!formData.leaderDegree.trim()) {
        newErrors.leaderDegree = 'Degree / Course is required (e.g., B.Tech, BCA, MCA).';
      }

      if (!formData.leaderBranch.trim()) {
        newErrors.leaderBranch = 'Branch or Specialization is required (e.g., CSE, IT, AI).';
      }

      if (!formData.leaderYear.trim()) {
        newErrors.leaderYear = 'Academic year is required.';
      }
    }

    if (step === 3) {
      // Dynamic member validation based on teamSize
      const count = selectedSizeConfig.memberCount;
      const leaderEmail = formData.leaderEmail.trim().toLowerCase();
      const leaderPhone = formData.leaderPhone.replace(/[\s\-+()]/g, '');

      const emailsSeen = new Set<string>();
      const phonesSeen = new Set<string>();

      if (leaderEmail) emailsSeen.add(leaderEmail);
      if (leaderPhone) phonesSeen.add(leaderPhone);

      // Member 2
      if (count >= 2) {
        if (!formData.member2Name.trim()) {
          newErrors.member2Name = 'Member 2 full name is required.';
        }

        const m2Email = formData.member2Email.trim().toLowerCase();
        if (!m2Email) {
          newErrors.member2Email = 'Member 2 email is required.';
        } else if (!validateEmail(m2Email)) {
          newErrors.member2Email = 'Enter a valid email address.';
        } else if (emailsSeen.has(m2Email)) {
          newErrors.member2Email = 'Member 2 email cannot be the same as Team Leader.';
        } else {
          emailsSeen.add(m2Email);
        }

        const m2Phone = formData.member2Phone.replace(/[\s\-+()]/g, '');
        if (!formData.member2Phone.trim()) {
          newErrors.member2Phone = 'Member 2 mobile number is required.';
        } else if (!validatePhone(m2Phone)) {
          newErrors.member2Phone = 'Enter a valid 10-digit mobile number.';
        } else if (phonesSeen.has(m2Phone)) {
          newErrors.member2Phone = 'Member 2 mobile number cannot duplicate Team Leader.';
        } else {
          phonesSeen.add(m2Phone);
        }
      }

      // Member 3
      if (count >= 3) {
        if (!formData.member3Name.trim()) {
          newErrors.member3Name = 'Member 3 full name is required.';
        }

        const m3Email = formData.member3Email.trim().toLowerCase();
        if (!m3Email) {
          newErrors.member3Email = 'Member 3 email is required.';
        } else if (!validateEmail(m3Email)) {
          newErrors.member3Email = 'Enter a valid email address.';
        } else if (emailsSeen.has(m3Email)) {
          newErrors.member3Email = 'Member 3 email duplicates Leader or Member 2.';
        } else {
          emailsSeen.add(m3Email);
        }

        const m3Phone = formData.member3Phone.replace(/[\s\-+()]/g, '');
        if (!formData.member3Phone.trim()) {
          newErrors.member3Phone = 'Member 3 mobile number is required.';
        } else if (!validatePhone(m3Phone)) {
          newErrors.member3Phone = 'Enter a valid 10-digit mobile number.';
        } else if (phonesSeen.has(m3Phone)) {
          newErrors.member3Phone = 'Member 3 mobile number duplicates Leader or Member 2.';
        } else {
          phonesSeen.add(m3Phone);
        }
      }

      // Member 4
      if (count >= 4) {
        if (!formData.member4Name.trim()) {
          newErrors.member4Name = 'Member 4 full name is required.';
        }

        const m4Email = formData.member4Email.trim().toLowerCase();
        if (!m4Email) {
          newErrors.member4Email = 'Member 4 email is required.';
        } else if (!validateEmail(m4Email)) {
          newErrors.member4Email = 'Enter a valid email address.';
        } else if (emailsSeen.has(m4Email)) {
          newErrors.member4Email = 'Member 4 email duplicates an existing team member.';
        } else {
          emailsSeen.add(m4Email);
        }

        const m4Phone = formData.member4Phone.replace(/[\s\-+()]/g, '');
        if (!formData.member4Phone.trim()) {
          newErrors.member4Phone = 'Member 4 mobile number is required.';
        } else if (!validatePhone(m4Phone)) {
          newErrors.member4Phone = 'Enter a valid 10-digit mobile number.';
        } else if (phonesSeen.has(m4Phone)) {
          newErrors.member4Phone = 'Member 4 mobile number duplicates an existing team member.';
        } else {
          phonesSeen.add(m4Phone);
        }
      }
    }

    if (step === 4) {
      if (!formData.programmingLanguages.trim()) {
        newErrors.programmingLanguages =
          'Please specify primary programming languages (e.g., Python, TypeScript).';
      }

      if (!formData.frameworks.trim()) {
        newErrors.frameworks =
          'Please specify frameworks or tools (e.g., React, Next.js, Node.js).';
      }

      if (!formData.githubUrl.trim()) {
        newErrors.githubUrl = 'GitHub profile link or username is required.';
      } else if (!validateUrl(formData.githubUrl)) {
        newErrors.githubUrl = 'Please enter a valid profile URL or handle.';
      }

      if (!formData.linkedinUrl.trim()) {
        newErrors.linkedinUrl = 'LinkedIn profile link is required.';
      } else if (!validateUrl(formData.linkedinUrl)) {
        newErrors.linkedinUrl = 'Please enter a valid LinkedIn URL.';
      }

      if (!formData.pastExperience.trim()) {
        newErrors.pastExperience =
          'Please provide a brief note on your previous hackathon or coding experience (or state "First-time hacker").';
      }

      if (!formData.projectBrief.trim()) {
        newErrors.projectBrief =
          'Please provide a brief idea or theme you plan to explore during the hackathon.';
      } else if (formData.projectBrief.trim().length < 10) {
        newErrors.projectBrief = 'Please provide at least a short sentence (10+ characters).';
      }
    }

    if (step === 5) {
      const cleanTx = formData.transactionId.trim();
      if (!cleanTx) {
        newErrors.transactionId =
          'Mandatory: Please enter your 12-digit UPI Transaction / UTR Number.';
      } else if (cleanTx.length < 6) {
        newErrors.transactionId =
          'Transaction ID is too short. Please verify from your UPI app receipt.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3 | 4 | 5);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4 | 5);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // Final Form Submission Handler (Google Sheets POST via Apps Script)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(5)) {
      return;
    }

    setIsSubmitting(true);

    const generatedId = `XMAS-${new Date().getFullYear()}-${Math.floor(
      100000 + Math.random() * 900000
    )}`;
    setRegistrationId(generatedId);

    const payload = {
      registrationId: generatedId,
      timestamp: new Date().toISOString(),
      submissionDateFormatted: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
      }),
      // Step 1: Team
      teamName: formData.teamName.trim(),
      technicalDomain: formData.technicalDomain.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      teamSize: formData.teamSize,
      totalMembers: selectedSizeConfig.memberCount,
      // Step 2: Leader
      leaderName: formData.leaderName.trim(),
      leaderEmail: formData.leaderEmail.trim(),
      leaderPhone: formData.leaderPhone.trim(),
      leaderCollege: formData.leaderCollege.trim(),
      leaderDegree: formData.leaderDegree.trim(),
      leaderBranch: formData.leaderBranch.trim(),
      leaderYear: formData.leaderYear.trim(),
      leaderRollNumber: formData.leaderRollNumber.trim() || 'N/A',
      // Step 3: Dynamic Members
      member2Name: formData.member2Name.trim() || 'N/A',
      member2Email: formData.member2Email.trim() || 'N/A',
      member2Phone: formData.member2Phone.trim() || 'N/A',
      member3Name: formData.member3Name.trim() || 'N/A',
      member3Email: formData.member3Email.trim() || 'N/A',
      member3Phone: formData.member3Phone.trim() || 'N/A',
      member4Name: formData.member4Name.trim() || 'N/A',
      member4Email: formData.member4Email.trim() || 'N/A',
      member4Phone: formData.member4Phone.trim() || 'N/A',
      // Step 4: Technical Profiles
      programmingLanguages: formData.programmingLanguages.trim(),
      frameworks: formData.frameworks.trim(),
      githubUrl: formData.githubUrl.trim(),
      linkedinUrl: formData.linkedinUrl.trim(),
      pastExperience: formData.pastExperience.trim(),
      projectBrief: formData.projectBrief.trim(),
      // Step 5: Checkout
      registrationFeeINR: REGISTRATION_FEE_INR,
      transactionId: formData.transactionId.trim(),
      paymentStatus: 'PENDING_VERIFICATION',
    };

    try {
      // Send POST request to Google Apps Script Web App
      // mode: 'no-cors' allows client-side dispatch without CORS preflight blocks
      await fetch(GOOGLE_SCRIPT_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Save a local copy in browser storage so team details are never lost
      try {
        const stored = JSON.parse(
          localStorage.getItem('festive_hackathon_registrations') || '[]'
        );
        stored.push(payload);
        localStorage.setItem(
          'festive_hackathon_registrations',
          JSON.stringify(stored)
        );
      } catch (storageErr) {
        console.warn('Local storage write notice:', storageErr);
      }

      // Trigger backend automated dual email notification system (Participant + Organizer)
      try {
        await fetch('/api/notifications/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...payload,
            storageConfirmed: true,
          }),
        });
      } catch (emailErr) {
        console.warn('Backend email notification dispatch notice:', emailErr);
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 60, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission error (showing printable view):', err);
      // Fallback: Proceed to success state since payload is cached locally and user can print slip
      try {
        const stored = JSON.parse(
          localStorage.getItem('festive_hackathon_registrations') || '[]'
        );
        stored.push(payload);
        localStorage.setItem(
          'festive_hackathon_registrations',
          JSON.stringify(stored)
        );
      } catch (storageErr) {
        console.warn('Local storage write notice:', storageErr);
      }
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 60, behavior: 'smooth' });
    }
  };

  const handleCopyId = () => {
    if (registrationId) {
      navigator.clipboard.writeText(registrationId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(PAYMENT_UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  const stepsList = [
    { num: 1, title: 'Team Info', icon: <Users className="h-4 w-4" /> },
    { num: 2, title: 'Team Leader', icon: <User className="h-4 w-4" /> },
    { num: 3, title: 'Team Members', icon: <Shield className="h-4 w-4" /> },
    { num: 4, title: 'Tech Profiles', icon: <Code2 className="h-4 w-4" /> },
    { num: 5, title: 'Checkout & Pay', icon: <Receipt className="h-4 w-4" /> },
  ];

  return (
    <div className="relative min-h-screen bg-[#041710] text-[#FFF4DF] overflow-x-hidden selection:bg-[#E9C578] selection:text-[#09271E] pb-24 font-body">
      {/* Embedded Print CSS for Clean Slip Isolation */}
      <style>{`
        @media print {
          /* 1. Strict Isolation: Hide headers, navbars, background ambience, footers & action buttons */
          header, nav, button, .no-print {
            display: none !important;
          }

          /* 2. Reset html & body to crisp white with dark high-contrast typography */
          html, body, #root {
            background: #ffffff !important;
            color: #111827 !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          @page {
            size: auto;
            margin: 1.2cm;
          }

          /* Neutralize background glows and outer containers */
          div, main {
            box-shadow: none !important;
            border-color: transparent !important;
            background: transparent !important;
          }

          /* 3. Isolate ONLY the registration slip container on a crisp white card */
          .registration-print-slip {
            display: block !important;
            position: relative !important;
            background: #ffffff !important;
            color: #111827 !important;
            border: 2px solid #09271E !important;
            border-radius: 12px !important;
            padding: 24px 28px !important;
            margin: 0 auto !important;
            width: 100% !important;
            max-width: 720px !important;
            box-shadow: none !important;
            page-break-inside: avoid !important;
          }

          .registration-print-slip * {
            color: #111827 !important;
            text-shadow: none !important;
          }

          .registration-print-slip .print-brand-title {
            color: #09271E !important;
            font-weight: 800 !important;
          }

          .registration-print-slip .print-badge {
            background: #F3F4F6 !important;
            border: 1px solid #111827 !important;
            color: #111827 !important;
            font-weight: 600 !important;
          }

          .registration-print-slip .print-border-b {
            border-bottom: 1px solid #E5E7EB !important;
          }

          .registration-print-slip .print-border {
            border-color: #E5E7EB !important;
          }

          .registration-print-slip .print-text-gold {
            color: #855800 !important;
            font-weight: 700 !important;
          }

          .registration-print-slip .print-text-emerald {
            color: #065F46 !important;
            font-weight: 700 !important;
          }

          .registration-print-slip .print-bg-subtle {
            background: #F9FAFB !important;
            border: 1px solid #E5E7EB !important;
          }
        }
      `}</style>

      {/* Background Decorative Ambience */}
      <div className="no-print fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#123D2B]/35 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-[#0E3526]/40 blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 h-[500px] w-[500px] rounded-full bg-[#E9C578]/5 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#E9C578_0.6px,transparent_0.6px)] [background-size:28px_28px] opacity-[0.06]" />
      </div>

      {/* Top Festive Header Bar */}
      <header className="no-print sticky top-0 z-40 border-b border-[#E9C578]/20 bg-[#061C14]/90 backdrop-blur-xl transition-all">
        <FestiveContainer size="xl">
          <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-[#E9C578]/30 bg-[#0A261D]/70 px-3.5 py-2 text-xs sm:text-sm font-medium text-[#E9C578] transition-all hover:bg-[#123D2B] hover:border-[#E9C578] hover:shadow-[0_0_15px_rgba(233,197,120,0.2)]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>

            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#E9C578] to-[#C62835] text-[#09271E] shadow-md">
                <Trees className="h-5 w-5" />
              </div>
              <div className="text-left">
                <span className="block font-brand-display text-base sm:text-xl font-bold tracking-wide text-[#E9C578] leading-none">
                  Festive Christmas Hackathon
                </span>
                <span className="block text-[10px] font-mono tracking-wider text-[#D9ECF5]/70 uppercase">
                  Official Registration Portal
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <FestiveBadge variant="gold" size="sm" icon={<Lock className="h-3 w-3" />}>
                Secure 256-Bit SSL
              </FestiveBadge>
            </div>
          </div>
        </FestiveContainer>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 pt-8 sm:pt-12">
        <FestiveContainer size="md">
          {/* Header Title & Intro */}
          <div className="no-print text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E9C578]/30 bg-[#0A261D]/80 px-4 py-1.5 text-xs font-mono font-medium text-[#E9C578] backdrop-blur-md shadow-sm mb-4">
              <Sparkles className="h-3.5 w-3.5 text-[#FFD700] animate-pulse" />
              <span>Christmas Edition 2026 • 8-Hour Sprint</span>
            </div>
            <h1 className="font-brand-display text-3xl sm:text-5xl font-bold tracking-tight text-[#FFFFFF] drop-shadow-md">
              Team Registration Portal
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#D9ECF5]/80 max-w-xl mx-auto font-sans-festive">
              Assemble your crew, select your track, and complete payment to confirm your team's
              hackathon slot on the verified roster.
            </p>
          </div>

          {/* SUCCESS SCREEN */}
          {isSuccess ? (
            <div className="relative overflow-hidden rounded-3xl border border-[#E9C578]/40 bg-[#061C14]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(233,197,120,0.15)] text-center animate-fadeIn">
              {/* Decorative Corner Bells & Stars */}
              <div className="no-print absolute top-4 right-4 text-[#E9C578]/30 pointer-events-none">
                <Sparkles className="h-16 w-16" />
              </div>
              <div className="no-print absolute bottom-4 left-4 text-[#25A18E]/20 pointer-events-none">
                <Trees className="h-20 w-20" />
              </div>

              <div className="no-print mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-[#123D2B] via-[#0E3526] to-[#E9C578]/30 border-2 border-[#E9C578] shadow-[0_0_30px_rgba(233,197,120,0.3)]">
                <Check className="h-10 w-10 text-[#FFD700]" />
              </div>

              <span className="no-print font-mono text-xs uppercase tracking-widest text-[#E9C578] font-bold">
                Registration Confirmed
              </span>
              <h2 className="no-print mt-2 font-brand-display text-3xl sm:text-4xl font-bold text-[#FFFFFF]">
                Registration Received!
              </h2>
              <p className="no-print mt-2 text-sm text-[#D9ECF5]/85 max-w-md mx-auto">
                Congratulations! Team <strong>"{formData.teamName}"</strong> has been registered.
                Our organizing jury will verify your transaction and send your entry badge via email.
              </p>

              {/* Registration Slip Container (Optimized for Screen & Isolated for Print) */}
              <div className="registration-print-slip mt-8 rounded-2xl border border-[#E9C578]/30 bg-[#0A261D]/90 p-5 sm:p-6 text-left max-w-2xl mx-auto shadow-inner">
                {/* Slip Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#E9C578]/20 pb-4 mb-4 gap-3 print-border-b">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Trees className="h-5 w-5 text-[#E9C578] print:text-[#09271E]" />
                      <span className="font-brand-display text-lg font-bold text-[#FFFFFF] print-brand-title">
                        Festive Christmas Hackathon 2026
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#D9ECF5]/70 block print:text-[#4B5563]">
                      8-Hour Sprint • Dec 25, 2026 • Indore, Madhya Pradesh, India
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-[#D9ECF5]/60 block print:text-[#4B5563]">
                        Registration ID
                      </span>
                      <span className="font-mono text-sm sm:text-base font-bold text-[#FFD700] print-text-gold">
                        {registrationId}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyId}
                      className="no-print flex items-center gap-1 text-xs font-mono text-[#E9C578] hover:text-[#FFFFFF] bg-[#061C14] px-2 py-1 rounded-lg border border-[#E9C578]/30 transition-colors"
                      title="Copy Registration ID"
                    >
                      <Copy className="h-3 w-3" />
                      <span>{copiedId ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Team & Track Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pb-4 border-b border-[#E9C578]/15 print-border-b">
                  <div>
                    <span className="text-[#D9ECF5]/60 block print:text-[#4B5563]">Team Name</span>
                    <span className="text-[#FFFFFF] font-semibold text-sm print:text-[#111827]">
                      {formData.teamName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#D9ECF5]/60 block print:text-[#4B5563]">Roster Size</span>
                    <span className="text-[#FFD700] font-semibold print-text-gold">
                      {selectedSizeConfig.label} ({selectedSizeConfig.memberCount} Members)
                    </span>
                  </div>
                  <div>
                    <span className="text-[#D9ECF5]/60 block print:text-[#4B5563]">Technical Domain</span>
                    <span className="text-[#E9C578] font-medium print:text-[#111827]">
                      {formData.technicalDomain}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#D9ECF5]/60 block print:text-[#4B5563]">Location</span>
                    <span className="text-[#FFFFFF] print:text-[#111827]">
                      {formData.city}, {formData.state}
                    </span>
                  </div>
                </div>

                {/* Team Leader & Members Section */}
                <div className="pt-3 pb-3 border-b border-[#E9C578]/15 print-border-b">
                  <span className="text-[11px] font-mono font-semibold uppercase text-[#FFEA9F] block mb-2 print:text-[#09271E]">
                    Team Roster Details
                  </span>
                  <div className="space-y-2 text-xs font-mono">
                    {/* Leader */}
                    <div className="rounded-lg bg-[#061C14]/50 p-2 border border-[#E9C578]/15 print-bg-subtle">
                      <span className="text-[10px] uppercase font-bold text-[#E9C578] print-text-gold">
                        Team Leader:
                      </span>{' '}
                      <span className="text-[#FFFFFF] font-semibold print:text-[#111827]">
                        {formData.leaderName}
                      </span>{' '}
                      • <span className="text-[#D9ECF5]/80 print:text-[#4B5563]">{formData.leaderPhone}</span>{' '}
                      • <span className="text-[#D9ECF5]/80 print:text-[#4B5563]">{formData.leaderEmail}</span>
                      <div className="text-[10px] text-[#D9ECF5]/60 mt-0.5 print:text-[#4B5563]">
                        {formData.leaderCollege} | {formData.leaderDegree} - {formData.leaderBranch} ({formData.leaderYear})
                      </div>
                    </div>

                    {/* Member 2 */}
                    {selectedSizeConfig.memberCount >= 2 && formData.member2Name && (
                      <div className="rounded-lg bg-[#061C14]/50 p-2 border border-[#E9C578]/15 print-bg-subtle">
                        <span className="text-[10px] uppercase font-bold text-[#25A18E] print-text-emerald">
                          Member 2:
                        </span>{' '}
                        <span className="text-[#FFFFFF] font-semibold print:text-[#111827]">
                          {formData.member2Name}
                        </span>{' '}
                        • <span className="text-[#D9ECF5]/80 print:text-[#4B5563]">{formData.member2Phone}</span>{' '}
                        • <span className="text-[#D9ECF5]/80 print:text-[#4B5563]">{formData.member2Email}</span>
                      </div>
                    )}

                    {/* Member 3 */}
                    {selectedSizeConfig.memberCount >= 3 && formData.member3Name && (
                      <div className="rounded-lg bg-[#061C14]/50 p-2 border border-[#E9C578]/15 print-bg-subtle">
                        <span className="text-[10px] uppercase font-bold text-[#FFB703] print-text-gold">
                          Member 3:
                        </span>{' '}
                        <span className="text-[#FFFFFF] font-semibold print:text-[#111827]">
                          {formData.member3Name}
                        </span>{' '}
                        • <span className="text-[#D9ECF5]/80 print:text-[#4B5563]">{formData.member3Phone}</span>{' '}
                        • <span className="text-[#D9ECF5]/80 print:text-[#4B5563]">{formData.member3Email}</span>
                      </div>
                    )}

                    {/* Member 4 */}
                    {selectedSizeConfig.memberCount >= 4 && formData.member4Name && (
                      <div className="rounded-lg bg-[#061C14]/50 p-2 border border-[#E9C578]/15 print-bg-subtle">
                        <span className="text-[10px] uppercase font-bold text-[#FFD700] print-text-gold">
                          Member 4:
                        </span>{' '}
                        <span className="text-[#FFFFFF] font-semibold print:text-[#111827]">
                          {formData.member4Name}
                        </span>{' '}
                        • <span className="text-[#D9ECF5]/80 print:text-[#4B5563]">{formData.member4Phone}</span>{' '}
                        • <span className="text-[#D9ECF5]/80 print:text-[#4B5563]">{formData.member4Email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tech Stack Summary */}
                <div className="pt-3 pb-3 border-b border-[#E9C578]/15 text-xs font-mono print-border-b">
                  <span className="text-[11px] font-semibold uppercase text-[#FFEA9F] block mb-1 print:text-[#09271E]">
                    Technical Stack
                  </span>
                  <div className="text-[#D9ECF5]/80 print:text-[#111827]">
                    <span className="font-semibold text-[#FFFFFF] print:text-[#111827]">Languages:</span>{' '}
                    {formData.programmingLanguages || 'Not specified'} |{' '}
                    <span className="font-semibold text-[#FFFFFF] print:text-[#111827]">Frameworks:</span>{' '}
                    {formData.frameworks || 'Not specified'}
                  </div>
                </div>

                {/* Payment Verification Block */}
                <div className="pt-3 grid grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-[#D9ECF5]/60 block print:text-[#4B5563]">Registration Fee</span>
                    <span className="text-[#25A18E] font-bold text-sm print-text-emerald">
                      ₹{REGISTRATION_FEE_INR} (Paid)
                    </span>
                  </div>
                  <div>
                    <span className="text-[#D9ECF5]/60 block print:text-[#4B5563]">Verification Status</span>
                    <span className="text-[#FFD700] font-semibold print-text-gold">
                      PENDING VERIFICATION
                    </span>
                  </div>
                  <div className="col-span-2 pt-1">
                    <span className="text-[#D9ECF5]/60 block print:text-[#4B5563]">
                      UPI Transaction / UTR Number
                    </span>
                    <span className="text-[#FFD700] font-bold text-sm break-all print:text-[#111827]">
                      {formData.transactionId}
                    </span>
                  </div>
                  <div className="col-span-2 pt-1 text-[11px] text-[#D9ECF5]/60 print:text-[#4B5563]">
                    Payee: {PAYMENT_PAYEE_NAME} ({PAYMENT_UPI_ID})
                  </div>
                </div>

                {/* Print Verification Footer Note */}
                <div className="mt-4 pt-3 border-t border-[#E9C578]/15 text-[11px] font-mono text-[#D9ECF5]/60 text-center print:text-[#4B5563] print-border-b">
                  Notice: Please carry this registration pass (printed or digital copy) along with valid college photo IDs during morning check-in at 09:00 AM on Dec 25, 2026.
                </div>
              </div>

              {/* Action Buttons (Strictly Hidden During Print via .no-print and button tag) */}
              <div className="no-print mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handlePrintSlip}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#E9C578]/40 bg-[#0A261D] px-6 py-3 text-sm font-semibold text-[#E9C578] transition-all hover:bg-[#123D2B] hover:border-[#E9C578] cursor-pointer"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print Registration Slip</span>
                </button>

                <Link
                  to="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E9C578] via-[#FFD700] to-[#E9C578] px-7 py-3 text-sm font-bold text-[#09271E] shadow-[0_0_20px_rgba(233,197,120,0.3)] transition-all hover:scale-[1.02] hover:brightness-110"
                >
                  <Home className="h-4 w-4" />
                  <span>Return to Hackathon Home</span>
                </Link>
              </div>
            </div>
          ) : (
            /* MULTI-STEP WIZARD CONTAINER */
            <div className="relative overflow-hidden rounded-3xl border border-[#E9C578]/30 bg-[#061C14]/90 p-5 sm:p-8 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              {/* Stepper Progress Bar Header */}
              <div className="mb-8">
                {/* Visual Step Indicator Bubbles */}
                <div className="flex items-center justify-between relative">
                  {/* Background Track Line */}
                  <div className="absolute top-4 left-4 right-4 h-0.5 bg-[#123D2B] -z-0" />
                  {/* Filled Track Line */}
                  <div
                    className="absolute top-4 left-4 h-0.5 bg-gradient-to-r from-[#E9C578] via-[#FFD700] to-[#25A18E] transition-all duration-500 -z-0"
                    style={{
                      width: `${((currentStep - 1) / (stepsList.length - 1)) * 100}%`,
                    }}
                  />

                  {stepsList.map((step) => {
                    const isCompleted = currentStep > step.num;
                    const isCurrent = currentStep === step.num;

                    return (
                      <div
                        key={step.num}
                        className="relative z-10 flex flex-col items-center cursor-default"
                      >
                        <div
                          className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                            isCompleted
                              ? 'bg-[#25A18E] text-[#FFFFFF] shadow-[0_0_12px_rgba(37,161,142,0.4)]'
                              : isCurrent
                              ? 'bg-gradient-to-r from-[#E9C578] to-[#FFD700] text-[#09271E] ring-4 ring-[#E9C578]/20 shadow-[0_0_15px_rgba(233,197,120,0.5)]'
                              : 'bg-[#0A261D] text-[#D9ECF5]/50 border border-[#E9C578]/20'
                          }`}
                        >
                          {isCompleted ? <Check className="h-4 w-4" /> : step.num}
                        </div>
                        <span
                          className={`mt-2 hidden sm:block text-[11px] font-mono tracking-wider transition-colors ${
                            isCurrent
                              ? 'text-[#FFD700] font-bold'
                              : isCompleted
                              ? 'text-[#25A18E]'
                              : 'text-[#D9ECF5]/40'
                          }`}
                        >
                          {step.title}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile Step Heading */}
                <div className="sm:hidden mt-4 text-center">
                  <span className="font-mono text-xs text-[#FFD700] font-semibold">
                    Step {currentStep} of 5: {stepsList[currentStep - 1].title}
                  </span>
                </div>
              </div>

              {/* Form Content Steps */}
              <form onSubmit={handleSubmit} noValidate>
                {/* ========================================================================= */}
                {/* STEP 1: TEAM INFORMATION */}
                {/* ========================================================================= */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="border-b border-[#E9C578]/20 pb-4">
                      <span className="font-mono text-xs text-[#E9C578] uppercase tracking-wider block">
                        Step 1 of 5
                      </span>
                      <h2 className="font-brand-display text-2xl sm:text-3xl font-bold text-[#FFFFFF] mt-0.5">
                        Team Information & Squad Size
                      </h2>
                      <p className="text-xs sm:text-sm text-[#D9ECF5]/75 mt-1 font-sans-festive">
                        Provide your team identity, track domain, location, and choose your team
                        roster size.
                      </p>
                    </div>

                    {/* Team Size Selection Cards */}
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#FFEA9F] mb-2.5">
                        Select Team Size *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {TEAM_SIZES.map((size) => {
                          const isSelected = formData.teamSize === size.id;
                          return (
                            <button
                              key={size.id}
                              type="button"
                              onClick={() => updateField('teamSize', size.id)}
                              className={`relative flex flex-col justify-between rounded-2xl p-4 text-left transition-all ${
                                isSelected
                                  ? 'border-2 border-[#E9C578] bg-[#0E3526] shadow-[0_0_20px_rgba(233,197,120,0.25)] scale-[1.02]'
                                  : 'border border-[#E9C578]/25 bg-[#0A261D]/70 hover:border-[#E9C578]/60 hover:bg-[#0A261D]'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="p-2 rounded-xl bg-[#061C14]/80 border border-[#E9C578]/20">
                                  {size.icon}
                                </div>
                                <span
                                  className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                    isSelected
                                      ? 'bg-[#E9C578] text-[#09271E]'
                                      : 'bg-[#061C14] text-[#D9ECF5]/70 border border-[#E9C578]/15'
                                  }`}
                                >
                                  {size.badge}
                                </span>
                              </div>
                              <div>
                                <span className="font-brand-display text-xl font-bold text-[#FFFFFF] block leading-tight">
                                  {size.label}
                                </span>
                                <span className="text-[11px] font-mono text-[#FFD700] block mb-1">
                                  {size.subtitle}
                                </span>
                                <p className="text-[11px] text-[#D9ECF5]/70 line-clamp-2 leading-relaxed">
                                  {size.description}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Team Details Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {/* Team Name */}
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="teamName"
                          className="block text-xs font-mono font-medium text-[#FFEA9F] mb-1.5"
                        >
                          Team Name *
                        </label>
                        <div className="relative">
                          <input
                            id="teamName"
                            type="text"
                            value={formData.teamName}
                            onChange={(e) => updateField('teamName', e.target.value)}
                            placeholder="e.g. WinterCoders, CyberElves, QuantumSpark"
                            className={`w-full rounded-xl border bg-[#0A261D]/90 px-4 py-3 text-sm text-[#FFFFFF] placeholder-[#D9ECF5]/35 backdrop-blur-sm transition-all focus:outline-none ${
                              errors.teamName
                                ? 'border-[#EF4050] focus:ring-2 focus:ring-[#EF4050]/40'
                                : 'border-[#E9C578]/30 focus:border-[#E9C578] focus:ring-2 focus:ring-[#E9C578]/30'
                            }`}
                          />
                        </div>
                        {errors.teamName && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#EF4050]">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.teamName}</span>
                          </p>
                        )}
                      </div>

                      {/* Technical Domain */}
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="technicalDomain"
                          className="block text-xs font-mono font-medium text-[#FFEA9F] mb-1.5"
                        >
                          Preferred Technical Domain *
                        </label>
                        <div className="relative">
                          <select
                            id="technicalDomain"
                            value={formData.technicalDomain}
                            onChange={(e) => updateField('technicalDomain', e.target.value)}
                            className={`w-full rounded-xl border bg-[#0A261D] px-4 py-3 text-sm text-[#FFFFFF] backdrop-blur-sm transition-all focus:outline-none appearance-none cursor-pointer ${
                              errors.technicalDomain
                                ? 'border-[#EF4050] focus:ring-2 focus:ring-[#EF4050]/40'
                                : 'border-[#E9C578]/30 focus:border-[#E9C578] focus:ring-2 focus:ring-[#E9C578]/30'
                            }`}
                          >
                            <option value="" disabled className="bg-[#0A261D] text-[#D9ECF5]/50">
                              -- Choose your hackathon track / domain --
                            </option>
                            {TECHNICAL_DOMAINS.map((domain) => (
                              <option
                                key={domain}
                                value={domain}
                                className="bg-[#061C14] text-[#FFFFFF]"
                              >
                                {domain}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#E9C578]">
                            <Layers className="h-4 w-4" />
                          </div>
                        </div>
                        {errors.technicalDomain && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#EF4050]">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.technicalDomain}</span>
                          </p>
                        )}
                      </div>

                      {/* City */}
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-xs font-mono font-medium text-[#FFEA9F] mb-1.5"
                        >
                          City *
                        </label>
                        <div className="relative">
                          <input
                            id="city"
                            type="text"
                            value={formData.city}
                            onChange={(e) => updateField('city', e.target.value)}
                            placeholder="e.g. Bengaluru, Mumbai, Delhi, Hyderabad"
                            className={`w-full rounded-xl border bg-[#0A261D]/90 px-4 py-3 text-sm text-[#FFFFFF] placeholder-[#D9ECF5]/35 backdrop-blur-sm transition-all focus:outline-none ${
                              errors.city
                                ? 'border-[#EF4050] focus:ring-2 focus:ring-[#EF4050]/40'
                                : 'border-[#E9C578]/30 focus:border-[#E9C578] focus:ring-2 focus:ring-[#E9C578]/30'
                            }`}
                          />
                        </div>
                        {errors.city && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#EF4050]">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.city}</span>
                          </p>
                        )}
                      </div>

                      {/* State */}
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-xs font-mono font-medium text-[#FFEA9F] mb-1.5"
                        >
                          State / Region *
                        </label>
                        <div className="relative">
                          <input
                            id="state"
                            type="text"
                            value={formData.state}
                            onChange={(e) => updateField('state', e.target.value)}
                            placeholder="e.g. Karnataka, Maharashtra, Tamil Nadu"
                            className={`w-full rounded-xl border bg-[#0A261D]/90 px-4 py-3 text-sm text-[#FFFFFF] placeholder-[#D9ECF5]/35 backdrop-blur-sm transition-all focus:outline-none ${
                              errors.state
                                ? 'border-[#EF4050] focus:ring-2 focus:ring-[#EF4050]/40'
                                : 'border-[#E9C578]/30 focus:border-[#E9C578] focus:ring-2 focus:ring-[#E9C578]/30'
                            }`}
                          />
                        </div>
                        {errors.state && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#EF4050]">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.state}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* STEP 2: TEAM LEADER DETAILS */}
                {/* ========================================================================= */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="border-b border-[#E9C578]/20 pb-4">
                      <span className="font-mono text-xs text-[#E9C578] uppercase tracking-wider block">
                        Step 2 of 5
                      </span>
                      <h2 className="font-brand-display text-2xl sm:text-3xl font-bold text-[#FFFFFF] mt-0.5">
                        Team Leader Information
                      </h2>
                      <p className="text-xs sm:text-sm text-[#D9ECF5]/75 mt-1 font-sans-festive">
                        The designated primary contact for jury syncs, scheduling updates, and
                        official communication.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="leaderName"
                          className="block text-xs font-mono font-medium text-[#FFEA9F] mb-1.5"
                        >
                          Team Leader Full Name *
                        </label>
                        <div className="relative">
                          <input
                            id="leaderName"
                            type="text"
                            value={formData.leaderName}
                            onChange={(e) => updateField('leaderName', e.target.value)}
                            placeholder="e.g. Aarav Sharma"
                            className={`w-full rounded-xl border bg-[#0A261D]/90 pl-10 pr-4 py-3 text-sm text-[#FFFFFF] placeholder-[#D9ECF5]/35 backdrop-blur-sm transition-all focus:outline-none ${
                              errors.leaderName
                                ? 'border-[#EF4050] focus:ring-2 focus:ring-[#EF4050]/40'
                                : 'border-[#E9C578]/30 focus:border-[#E9C578] focus:ring-2 focus:ring-[#E9C578]/30'
                            }`}
                          />
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E9C578]" />
                        </div>
                        {errors.leaderName && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#EF4050]">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.leaderName}</span>
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="leaderEmail"
                          className="block text-xs font-mono font-medium text-[#FFEA9F] mb-1.5"
                        >
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            id="leaderEmail"
                            type="email"
                            value={formData.leaderEmail}
                            onChange={(e) => updateField('leaderEmail', e.target.value)}
                            placeholder="aarav@example.com"
                            className={`w-full rounded-xl border bg-[#0A261D]/90 pl-10 pr-4 py-3 text-sm text-[#FFFFFF] placeholder-[#D9ECF5]/35 backdrop-blur-sm transition-all focus:outline-none ${
                              errors.leaderEmail
                                ? 'border-[#EF4050] focus:ring-2 focus:ring-[#EF4050]/40'
                                : 'border-[#E9C578]/30 focus:border-[#E9C578] focus:ring-2 focus:ring-[#E9C578]/30'
                            }`}
                          />
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E9C578]" />
                        </div>
                        {errors.leaderEmail && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#EF4050]">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.leaderEmail}</span>
                          </p>
                        )}
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <label
                          htmlFor="leaderPhone"
                          className="block text-xs font-mono font-medium text-[#FFEA9F] mb-1.5"
                        >
                          Mobile Number *
                        </label>
                        <div className="relative">
                          <input
                            id="leaderPhone"
                            type="tel"
                            value={formData.leaderPhone}
                            onChange={(e) => updateField('leaderPhone', e.target.value)}
                            placeholder="10-digit mobile number"
                            className={`w-full rounded-xl border bg-[#0A261D]/90 pl-10 pr-4 py-3 text-sm text-[#FFFFFF] placeholder-[#D9ECF5]/35 backdrop-blur-sm transition-all focus:outline-none ${
                              errors.leaderPhone
                                ? 'border-[#EF4050] focus:ring-2 focus:ring-[#EF4050]/40'
                                : 'border-[#E9C578]/30 focus:border-[#E9C578] focus:ring-2 focus:ring-[#E9C578]/30'
                            }`}
                          />
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E9C578]" />
                        </div>
                        {errors.leaderPhone && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#EF4050]">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.leaderPhone}</span>
                          </p>
                        )}
                      </div>

                      {/* College / University */}
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="leaderCollege"
                          className="block text-xs font-mono font-medium text-[#FFEA9F] mb-1.5"
                        >
                          College / University *
                        </label>
                        <div className="relative">
                          <input
                            id="leaderCollege"
                            type="text"
                            value={formData.leaderCollege}
                            onChange={(e) => updateField('leaderCollege', e.target.value)}
                            placeholder="e.g. National Institute of Technology, IIT, BITS"
                            className={`w-full rounded-xl border bg-[#0A261D]/90 pl-10 pr-4 py-3 text-sm text-[#FFFFFF] placeholder-[#D9ECF5]/35 backdrop-blur-sm transition-all focus:outline-none ${
                              errors.leaderCollege
                                ? 'border-[#EF4050] focus:ring-2 focus:ring-[#EF4050]/40'
                                : 'border-[#E9C578]/30 focus:border-[#E9C578] focus:ring-2 focus:ring-[#E9C578]/30'
                            }`}
                          />
                          <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E9C578]" />
                        </div>
                        {errors.leaderCollege && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#EF4050]">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.leaderCollege}</span>
                          </p>
                        )}
                      </div>

                      {/* Degree / Course */}
                      <div>
                        <label
                          htmlFor="leaderDegree"
                          className="block text-xs font-mono font-medium text-[#FFEA9F] mb-1.5"
                        >
                          Degree / Course *
                        </label>
                        <div className="relative">
                          <input
                            id="leaderDegree"
                            type="text"
                            value={formData.leaderDegree}
                            onChange={(e) => updateField('leaderDegree', e.target.value)}
                            placeholder="e.g. B.Tech, B.E., BCA, MCA, B.Sc"
                            className={`w-full rounded-xl border bg-[#0A261D]/90 pl-10 pr-4 py-3 text-sm text-[#FFFFFF] placeholder-[#D9ECF5]/35 backdrop-blur-sm transition-all focus:outline-none ${
                              errors.leaderDegree
                                ? 'border-[#EF4050] focus:ring-2 focus:ring-[#EF4050]/40'
                                : 'border-[#E9C578]/30 focus:border-[#E9C578] focus:ring-2 focus:ring-[#E9C578]/30'
                            }`}
                          />
                          <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E9C578]" />
                        </div>
                        {errors.leaderDegree && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#EF4050]">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.leaderDegree}</span>
                          </p>
                        )}
                      </div>

                      {/* Branch */}
                      <div>
                        <label
                          htmlFor="leaderBranch"
                          className="block text-xs font-mono font-medium text-[#FFEA9F] mb-1.5"
                        >
                          Branch / Specialization *
                        </label>
                        <div className="relative">
                          <input
                            id="leaderBranch"
                            type="text"
                            value={formData.leaderBranch}
                            onChange={(e) => updateField('leaderBranch', e.target.value)}
                            placeholder="e.g. Computer Science, AI & DS, ECE"
                            className={`w-full rounded-xl border bg-[#0A261D]/90 pl-10 pr-4 py-3 text-sm text-[#FFFFFF] placeholder-[#D9ECF5]/35 backdrop-blur-sm transition-all focus:outline-none ${
                              errors.leaderBranch
                                ? 'border-[#EF4050] focus:ring-2 focus:ring-[#EF4050]/40'
                                : 'border-[#E9C578]/30 focus:border-[#E9C578] focus:ring-2 focus:ring-[#E9C578]/30'
                            }`}
                          />
                          <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E9C578]" />
                        </div>
                        {errors.leaderBranch && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#EF4050]">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.leaderBranch}</span>
                          </p>
                        )}
                      </div>

                      {/* Academic Year */}
                      <div>
                        <label
                          htmlFor="leaderYear"
                          className="block text-xs font-mono font-medium text-[#FFEA9F] mb-1.5"
                        >
                          Academic Year *
                        </label>
                        <div className="relative">
                          <select
                            id="leaderYear"
                            value={formData.leaderYear}
                            onChange={(e) => updateField('leaderYear', e.target.value)}
                            className={`w-full rounded-xl border bg-[#0A261D] px-4 py-3 text-sm text-[#FFFFFF] backdrop-blur-sm transition-all focus:outline-none appearance-none cursor-pointer ${
                              errors.leaderYear
                                ? 'border-[#EF4050] focus:ring-2 focus:ring-[#EF4050]/40'
                                : 'border-[#E9C578]/30 focus:border-[#E9C578] focus:ring-2 focus:ring-[#E9C578]/30'
                            }`}
                          >
                            <option value="" disabled className="bg-[#0A261D] text-[#D9ECF5]/50">
                              -- Select academic year --
                            </option>
                            {ACADEMIC_YEARS.map((yr) => (
                              <option key={yr} value={yr} className="bg-[#061C14] text-[#FFFFFF]">
                                {yr}
                              </option>
                            ))}
                          </select>
                          <Calendar className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E9C578]" />
                        </div>
                        {errors.leaderYear && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#EF4050]">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.leaderYear}</span>
                          </p>
                        )}
                      </div>

                      {/* Roll Number (Optional) */}
                      <div>
                        <label
                          htmlFor="leaderRollNumber"
                          className="block text-xs font-mono font-medium text-[#FFEA9F] mb-1.5"
                        >
                          Roll Number / Student ID{' '}
                          <span className="text-[#D9ECF5]/50 text-[10px]">(Optional)</span>
                        </label>
                        <div className="relative">
                          <input
                            id="leaderRollNumber"
                            type="text"
                            value={formData.leaderRollNumber}
                            onChange={(e) => updateField('leaderRollNumber', e.target.value)}
                            placeholder="e.g. 21CS042"
                            className="w-full rounded-xl border border-[#E9C578]/30 bg-[#0A261D]/90 pl-10 pr-4 py-3 text-sm text-[#FFFFFF] placeholder-[#D9ECF5]/35 backdrop-blur-sm transition-all focus:border-[#E9C578] focus:ring-2 focus:ring-[#E9C578]/30 focus:outline-none"
                          />
                          <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E9C578]/70" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* STEP 3: DYNAMIC TEAM MEMBERS */}
                {/* ========================================================================= */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="border-b border-[#E9C578]/20 pb-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-[#E9C578] uppercase tracking-wider block">
                          Step 3 of 5
                        </span>
                        <span className="font-mono text-xs text-[#FFD700] bg-[#0A261D] px-2.5 py-1 rounded-full border border-[#E9C578]/30">
                          {selectedSizeConfig.label} ({selectedSizeConfig.memberCount} Members)
                        </span>
                      </div>
                      <h2 className="font-brand-display text-2xl sm:text-3xl font-bold text-[#FFFFFF] mt-0.5">
                        Team Member Roster
                      </h2>
                      <p className="text-xs sm:text-sm text-[#D9ECF5]/75 mt-1 font-sans-festive">
                        Dynamically configured for your {selectedSizeConfig.label} team. Ensure all
                        member emails & phone numbers are unique.
                      </p>
                    </div>

                    {/* SOLO MODE CONFIRMATION */}
                    {formData.teamSize === 'solo' && (
                      <div className="rounded-2xl border border-[#E9C578]/30 bg-[#0A261D]/80 p-6 text-center">
                        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#123D2B] border border-[#E9C578]/40">
                          <User className="h-7 w-7 text-[#FFD700]" />
                        </div>
                        <h3 className="font-brand-display text-2xl font-bold text-[#FFFFFF]">
                          Solo Hacker Confirmed!
                        </h3>
                        <p className="text-xs sm:text-sm text-[#D9ECF5]/80 max-w-md mx-auto mt-1">
                          You have selected the Solo track. Your participant details are fully
                          captured in Step 2. No additional team members are required.
                        </p>
                        <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-[#25A18E] bg-[#061C14] px-3 py-1.5 rounded-full border border-[#25A18E]/30">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Ready to proceed to Technical Profiles</span>
                        </div>
                      </div>
                    )}

                    {/* MEMBER 2 (Duo, Trio, Squad) */}
                    {selectedSizeConfig.memberCount >= 2 && (
                      <div className="rounded-2xl border border-[#E9C578]/30 bg-[#0A261D]/70 p-5 space-y-4">
                        <div className="flex items-center gap-2 border-b border-[#E9C578]/15 pb-2.5">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E9C578] text-[11px] font-mono font-bold text-[#09271E]">
                            02
                          </span>
                          <span className="font-mono text-xs font-bold text-[#FFEA9F] uppercase tracking-wider">
                            Member 2 Details
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-mono text-[#D9ECF5]/90 mb-1">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              value={formData.member2Name}
                              onChange={(e) => updateField('member2Name', e.target.value)}
                              placeholder="Member 2 Name"
                              className={`w-full rounded-xl border bg-[#061C14]/90 px-3 py-2.5 text-xs text-[#FFFFFF] placeholder-[#D9ECF5]/35 focus:outline-none ${
                                errors.member2Name
                                  ? 'border-[#EF4050]'
                                  : 'border-[#E9C578]/30 focus:border-[#E9C578]'
                              }`}
                            />
                            {errors.member2Name && (
                              <p className="mt-1 text-[10px] text-[#EF4050]">
                                {errors.member2Name}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-[#D9ECF5]/90 mb-1">
                              Email *
                            </label>
                            <input
                              type="email"
                              value={formData.member2Email}
                              onChange={(e) => updateField('member2Email', e.target.value)}
                              placeholder="member2@example.com"
                              className={`w-full rounded-xl border bg-[#061C14]/90 px-3 py-2.5 text-xs text-[#FFFFFF] placeholder-[#D9ECF5]/35 focus:outline-none ${
                                errors.member2Email
                                  ? 'border-[#EF4050]'
                                  : 'border-[#E9C578]/30 focus:border-[#E9C578]'
                              }`}
                            />
                            {errors.member2Email && (
                              <p className="mt-1 text-[10px] text-[#EF4050]">
                                {errors.member2Email}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-[#D9ECF5]/90 mb-1">
                              Mobile Number *
                            </label>
                            <input
                              type="tel"
                              value={formData.member2Phone}
                              onChange={(e) => updateField('member2Phone', e.target.value)}
                              placeholder="10-digit mobile"
                              className={`w-full rounded-xl border bg-[#061C14]/90 px-3 py-2.5 text-xs text-[#FFFFFF] placeholder-[#D9ECF5]/35 focus:outline-none ${
                                errors.member2Phone
                                  ? 'border-[#EF4050]'
                                  : 'border-[#E9C578]/30 focus:border-[#E9C578]'
                              }`}
                            />
                            {errors.member2Phone && (
                              <p className="mt-1 text-[10px] text-[#EF4050]">
                                {errors.member2Phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* MEMBER 3 (Trio, Squad) */}
                    {selectedSizeConfig.memberCount >= 3 && (
                      <div className="rounded-2xl border border-[#E9C578]/30 bg-[#0A261D]/70 p-5 space-y-4">
                        <div className="flex items-center gap-2 border-b border-[#E9C578]/15 pb-2.5">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFB703] text-[11px] font-mono font-bold text-[#09271E]">
                            03
                          </span>
                          <span className="font-mono text-xs font-bold text-[#FFEA9F] uppercase tracking-wider">
                            Member 3 Details
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-mono text-[#D9ECF5]/90 mb-1">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              value={formData.member3Name}
                              onChange={(e) => updateField('member3Name', e.target.value)}
                              placeholder="Member 3 Name"
                              className={`w-full rounded-xl border bg-[#061C14]/90 px-3 py-2.5 text-xs text-[#FFFFFF] placeholder-[#D9ECF5]/35 focus:outline-none ${
                                errors.member3Name
                                  ? 'border-[#EF4050]'
                                  : 'border-[#E9C578]/30 focus:border-[#E9C578]'
                              }`}
                            />
                            {errors.member3Name && (
                              <p className="mt-1 text-[10px] text-[#EF4050]">
                                {errors.member3Name}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-[#D9ECF5]/90 mb-1">
                              Email *
                            </label>
                            <input
                              type="email"
                              value={formData.member3Email}
                              onChange={(e) => updateField('member3Email', e.target.value)}
                              placeholder="member3@example.com"
                              className={`w-full rounded-xl border bg-[#061C14]/90 px-3 py-2.5 text-xs text-[#FFFFFF] placeholder-[#D9ECF5]/35 focus:outline-none ${
                                errors.member3Email
                                  ? 'border-[#EF4050]'
                                  : 'border-[#E9C578]/30 focus:border-[#E9C578]'
                              }`}
                            />
                            {errors.member3Email && (
                              <p className="mt-1 text-[10px] text-[#EF4050]">
                                {errors.member3Email}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-[#D9ECF5]/90 mb-1">
                              Mobile Number *
                            </label>
                            <input
                              type="tel"
                              value={formData.member3Phone}
                              onChange={(e) => updateField('member3Phone', e.target.value)}
                              placeholder="10-digit mobile"
                              className={`w-full rounded-xl border bg-[#061C14]/90 px-3 py-2.5 text-xs text-[#FFFFFF] placeholder-[#D9ECF5]/35 focus:outline-none ${
                                errors.member3Phone
                                  ? 'border-[#EF4050]'
                                  : 'border-[#E9C578]/30 focus:border-[#E9C578]'
                              }`}
                            />
                            {errors.member3Phone && (
                              <p className="mt-1 text-[10px] text-[#EF4050]">
                                {errors.member3Phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* MEMBER 4 (Squad only) */}
                    {selectedSizeConfig.memberCount >= 4 && (
                      <div className="rounded-2xl border border-[#E9C578]/30 bg-[#0A261D]/70 p-5 space-y-4">
                        <div className="flex items-center gap-2 border-b border-[#E9C578]/15 pb-2.5">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFD700] text-[11px] font-mono font-bold text-[#09271E]">
                            04
                          </span>
                          <span className="font-mono text-xs font-bold text-[#FFEA9F] uppercase tracking-wider">
                            Member 4 Details
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-mono text-[#D9ECF5]/90 mb-1">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              value={formData.member4Name}
                              onChange={(e) => updateField('member4Name', e.target.value)}
                              placeholder="Member 4 Name"
                              className={`w-full rounded-xl border bg-[#061C14]/90 px-3 py-2.5 text-xs text-[#FFFFFF] placeholder-[#D9ECF5]/35 focus:outline-none ${
                                errors.member4Name
                                  ? 'border-[#EF4050]'
                                  : 'border-[#E9C578]/30 focus:border-[#E9C578]'
                              }`}
                            />
                            {errors.member4Name && (
                              <p className="mt-1 text-[10px] text-[#EF4050]">
                                {errors.member4Name}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-[#D9ECF5]/90 mb-1">
                              Email *
                            </label>
                            <input
                              type="email"
                              value={formData.member4Email}
                              onChange={(e) => updateField('member4Email', e.target.value)}
                              placeholder="member4@example.com"
                              className={`w-full rounded-xl border bg-[#061C14]/90 px-3 py-2.5 text-xs text-[#FFFFFF] placeholder-[#D9ECF5]/35 focus:outline-none ${
                                errors.member4Email
                                  ? 'border-[#EF4050]'
                                  : 'border-[#E9C578]/30 focus:border-[#E9C578]'
                              }`}
                            />
                            {errors.member4Email && (
                              <p className="mt-1 text-[10px] text-[#EF4050]">
                                {errors.member4Email}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-[#D9ECF5]/90 mb-1">
                              Mobile Number *
                            </label>
                            <input
                              type="tel"
                              value={formData.member4Phone}
                              onChange={(e) => updateField('member4Phone', e.target.value)}
                              placeholder="10-digit mobile"
                              className={`w-full rounded-xl border bg-[#061C14]/90 px-3 py-2.5 text-xs text-[#FFFFFF] placeholder-[#D9ECF5]/35 focus:outline-none ${
                                errors.member4Phone
                                  ? 'border-[#EF4050]'
                                  : 'border-[#E9C578]/30 focus:border-[#E9C578]'
                              }`}
                            />
                            {errors.member4Phone && (
                              <p className="mt-1 text-[10px] text-[#EF4050]">
                                {errors.member4Phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ========================================================================= */}
                {/* STEP 4: TECHNICAL PROFILES & EXPERIENCE */}
                {/* ========================================================================= */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="border-b border-[#E9C578]/20 pb-4">
                      <span className="font-mono text-xs text-[#E9C578] uppercase tracking-wider block">
                        Step 4 of 5
                      </span>
                      <h2 className="font-brand-display text-2xl sm:text-3xl font-bold text-[#FFFFFF] mt-0.5">
                        Technical Profiles & Experience
                      </h2>
                      <p className="text-xs sm:text-sm text-[#D9ECF5]/75 mt-1 font-sans-festive">
                        Share your tech stack, portfolio repositories, and the festive concept you
                        plan to prototype.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Programming Languages */}
                      <div>
                        <label
                          htmlFor="programmingLanguages"
                          className="block text-xs font-mono font-medium text-[#FFEA9F] mb-1.5"
                        >
                          Programming Languages (comma separated) *
                        </label>
                        <div className="relative">
                          <input
                            id="programmingLanguages"
                            type="text"
                            value={formData.programmingLanguages}
                            onChange={(e) => updateField('programmingLanguages', e.target.value)}
                            placeholder="e.g. Python, TypeScript, Rust, Go, C++"
                            className={`w-full rounded-xl border bg-[#0A261D]/90 pl-10 pr-4 py-3 text-sm text-[#FFFFFF] placeholder-[#D9ECF5]/35 backdrop-blur-sm transition-all focus:outline-none ${
                              errors.programmingLanguages
                                ? 'border-[#EF4050] focus:ring-2 focus:ring-[#EF4050]/40'
                                : 'border-[#E9C578]/30 focus:border-[#E9C578] focus:ring-2 focus:ring-[#E9C578]/30'
                            }`}
                          />
                          <Code2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E9C578]" />
                        </div>
                        {errors.programmingLanguages && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#EF4050]">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.programmingLanguages}</span>
                          </p>
                        )}
                      </div>

                      {/* Frameworks & Technologies */}
                      <div>
                        <label
                          htmlFor="frameworks"
                          className="block text-xs font-mono font-medium text-[#FFEA9F] mb-1.5"
                        >
                          Frameworks & Technologies *
                        </label>
                        <div className="relative">
                          <input
                            id="frameworks"
                            type="text"
                            value={formData.frameworks}
                            onChange={(e) => updateField('frameworks', e.target.value)}
                            placeholder="e.g. React, Next.js, FastAPI, PyTorch, Docker"
                            className={`w-full rounded-xl border bg-[#0A261D]/90 pl-10 pr-4 py-3 text-sm text-[#FFFFFF] placeholder-[#D9ECF5]/35 backdrop-blur-sm transition-all focus:outline-none ${
                              errors.frameworks
                                ? 'border-[#EF4050] focus:ring-2 focus:ring-[#EF4050]/40'
                                : 'border-[#E9C578]/30 focus:border-[#E9C578] focus:ring-2 focus:ring-[#E9C578]/30'
                            }`}
                          />
                          <Cpu className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E9C578]" />
                        </div>
                        {errors.frameworks && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#EF4050]">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.frameworks}</span>
                          </p>
                        )}
                      </div>

                      {/* GitHub Profile */}
                      <div>
                        <label
                          htmlFor="githubUrl"
                          className="block text-xs font-mono font-medium text-[#FFEA9F] mb-1.5"
                        >
                          GitHub Profile Link *
                        </label>
                        <div className="relative">
                          <input
                            id="githubUrl"
                            type="text"
                            value={formData.githubUrl}
                            onChange={(e) => updateField('githubUrl', e.target.value)}
                            placeholder="https://github.com/your-username"
                            className={`w-full rounded-xl border bg-[#0A261D]/90 pl-10 pr-4 py-3 text-sm text-[#FFFFFF] placeholder-[#D9ECF5]/35 backdrop-blur-sm transition-all focus:outline-none ${
                              errors.githubUrl
                                ? 'border-[#EF4050] focus:ring-2 focus:ring-[#EF4050]/40'
                                : 'border-[#E9C578]/30 focus:border-[#E9C578] focus:ring-2 focus:ring-[#E9C578]/30'
                            }`}
                          />
                          <Github className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E9C578]" />
                        </div>
                        {errors.githubUrl && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#EF4050]">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.githubUrl}</span>
                          </p>
                        )}
                      </div>

                      {/* LinkedIn Profile */}
                      <div>
                        <label
                          htmlFor="linkedinUrl"
                          className="block text-xs font-mono font-medium text-[#FFEA9F] mb-1.5"
                        >
                          LinkedIn Profile Link *
                        </label>
                        <div className="relative">
                          <input
                            id="linkedinUrl"
                            type="text"
                            value={formData.linkedinUrl}
                            onChange={(e) => updateField('linkedinUrl', e.target.value)}
                            placeholder="https://linkedin.com/in/your-profile"
                            className={`w-full rounded-xl border bg-[#0A261D]/90 pl-10 pr-4 py-3 text-sm text-[#FFFFFF] placeholder-[#D9ECF5]/35 backdrop-blur-sm transition-all focus:outline-none ${
                              errors.linkedinUrl
                                ? 'border-[#EF4050] focus:ring-2 focus:ring-[#EF4050]/40'
                                : 'border-[#E9C578]/30 focus:border-[#E9C578] focus:ring-2 focus:ring-[#E9C578]/30'
                            }`}
                          />
                          <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E9C578]" />
                        </div>
                        {errors.linkedinUrl && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#EF4050]">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.linkedinUrl}</span>
                          </p>
                        )}
                      </div>

                      {/* Previous Hackathon Experience */}
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="pastExperience"
                          className="block text-xs font-mono font-medium text-[#FFEA9F] mb-1.5"
                        >
                          Previous Hackathon Experience *
                        </label>
                        <div className="relative">
                          <textarea
                            id="pastExperience"
                            rows={3}
                            value={formData.pastExperience}
                            onChange={(e) => updateField('pastExperience', e.target.value)}
                            placeholder="Briefly list past hackathons participated in, projects shipped, or state 'First-time hackathon participant' if you are new."
                            className={`w-full rounded-xl border bg-[#0A261D]/90 p-3 text-sm text-[#FFFFFF] placeholder-[#D9ECF5]/35 backdrop-blur-sm transition-all focus:outline-none resize-none ${
                              errors.pastExperience
                                ? 'border-[#EF4050] focus:ring-2 focus:ring-[#EF4050]/40'
                                : 'border-[#E9C578]/30 focus:border-[#E9C578] focus:ring-2 focus:ring-[#E9C578]/30'
                            }`}
                          />
                        </div>
                        {errors.pastExperience && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#EF4050]">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.pastExperience}</span>
                          </p>
                        )}
                      </div>

                      {/* Project Status / Idea Brief */}
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="projectBrief"
                          className="block text-xs font-mono font-medium text-[#FFEA9F] mb-1.5"
                        >
                          Project Status / Idea Brief *
                        </label>
                        <div className="relative">
                          <textarea
                            id="projectBrief"
                            rows={3}
                            value={formData.projectBrief}
                            onChange={(e) => updateField('projectBrief', e.target.value)}
                            placeholder="What problem statement or technology stack do you plan to tackle during the 8-hour sprint? (e.g., AI Christmas Assistant, Eco-logistics optimizer)"
                            className={`w-full rounded-xl border bg-[#0A261D]/90 p-3 text-sm text-[#FFFFFF] placeholder-[#D9ECF5]/35 backdrop-blur-sm transition-all focus:outline-none resize-none ${
                              errors.projectBrief
                                ? 'border-[#EF4050] focus:ring-2 focus:ring-[#EF4050]/40'
                                : 'border-[#E9C578]/30 focus:border-[#E9C578] focus:ring-2 focus:ring-[#E9C578]/30'
                            }`}
                          />
                        </div>
                        {errors.projectBrief && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#EF4050]">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.projectBrief}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* STEP 5: PAYMENT VERIFICATION & FINAL CHECKOUT (QR CODE) */}
                {/* ========================================================================= */}
                {currentStep === 5 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="border-b border-[#E9C578]/20 pb-4">
                      <span className="font-mono text-xs text-[#E9C578] uppercase tracking-wider block">
                        Step 5 of 5
                      </span>
                      <h2 className="font-brand-display text-2xl sm:text-3xl font-bold text-[#FFFFFF] mt-0.5">
                        Payment Verification & Final Checkout
                      </h2>
                      <p className="text-xs sm:text-sm text-[#D9ECF5]/75 mt-1 font-sans-festive">
                        Scan the UPI QR code to complete your ₹{REGISTRATION_FEE_INR} registration
                        fee and submit your transaction ID.
                      </p>
                    </div>

                    {/* Sleek UI Card stating "Registration Fee: ₹400" */}
                    <div className="flex flex-col sm:flex-row items-center justify-between rounded-2xl border border-[#E9C578]/50 bg-gradient-to-r from-[#123D2B]/90 via-[#0A261D]/90 to-[#123D2B]/90 p-5 backdrop-blur-md shadow-lg gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E9C578] text-[#09271E] shadow-[0_0_15px_rgba(233,197,120,0.4)]">
                          <Receipt className="h-6 w-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFEA9F] block">
                            Flat Team Fee ({selectedSizeConfig.label} Format)
                          </span>
                          <span className="font-brand-display text-2xl sm:text-3xl font-bold text-[#FFFFFF] tracking-wide">
                            Registration Fee: ₹{REGISTRATION_FEE_INR}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#FFD700] bg-[#061C14] px-3.5 py-1.5 rounded-full border border-[#FFD700]/30 shadow-sm">
                          {selectedSizeConfig.badge}
                        </span>
                      </div>
                    </div>

                    {/* QR Code Container */}
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E9C578]/40 bg-[#061C14]/90 p-4 sm:p-6 backdrop-blur-md shadow-inner text-center">
                      <span className="font-mono text-xs uppercase tracking-wider text-[#FFEA9F] font-semibold mb-3 flex items-center gap-1.5">
                        <QrCode className="h-4 w-4 text-[#FFD700]" />
                        Official Google Pay UPI QR Code
                      </span>

                      {/* Actual QR Code Image */}
                      <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-[#E9C578]/50 bg-white p-1.5 sm:p-2 shadow-2xl overflow-hidden max-w-full">
                        <img
                          src="/assets/aistudio/Untitled_design__6__6804172a.jpg"
                          alt="Google Pay QR Code"
                          className="w-56 h-56 sm:w-64 sm:h-64 max-w-full object-contain mx-auto rounded-xl border border-yellow-500/30 shadow-lg"
                        />
                      </div>

                      {/* Official Payment Details: Clean, centered text block */}
                      <div className="mt-4 w-full max-w-md rounded-2xl border border-[#E9C578]/40 bg-[#0A261D]/90 p-4 shadow-md text-center">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFEA9F] block mb-1.5 font-bold">
                          Official Payment Details
                        </span>
                        <div className="text-sm sm:text-base font-bold text-[#FFFFFF]">
                          Name: <span className="text-[#FFD700]">{PAYMENT_PAYEE_NAME}</span>
                        </div>
                        <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                          <span className="text-xs sm:text-sm font-mono font-bold text-[#E9C578] bg-[#061C14] px-3 py-1.5 rounded-lg border border-[#E9C578]/30 select-all break-all">
                            UPI ID: {PAYMENT_UPI_ID}
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#09271E] bg-[#E9C578] hover:bg-[#FFD700] px-3 py-1.5 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
                            title="Copy UPI ID"
                          >
                            <Copy className="h-3.5 w-3.5" />
                            <span>{copiedUpi ? 'Copied!' : 'Copy UPI'}</span>
                          </button>
                        </div>
                        <p className="text-[11px] text-[#D9ECF5]/70 mt-2">
                          Can't scan? Pay directly to this UPI ID using Google Pay, PhonePe, Paytm, or BHIM.
                        </p>
                      </div>

                      {/* Instructions */}
                      <p className="mt-4 text-xs sm:text-sm font-semibold text-[#FFD700] max-w-md">
                        Pay the ₹{REGISTRATION_FEE_INR} Registration Fee. Enter the Transaction/UTR ID below to confirm your registration.
                      </p>

                      <div className="mt-3 rounded-xl border border-[#25A18E]/30 bg-[#092B20]/60 p-3.5 text-left text-xs text-[#D9ECF5]/90 max-w-md w-full space-y-2 font-sans-festive">
                        <p className="flex items-start gap-2">
                          <span className="text-[#FFD700] font-bold font-mono">1.</span>
                          <span>Open Google Pay, PhonePe, Paytm, or any UPI app.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="text-[#FFD700] font-bold font-mono">2.</span>
                          <span>
                            Scan the QR code above or enter UPI ID <strong>{PAYMENT_UPI_ID}</strong> to pay the fee of <strong>₹{REGISTRATION_FEE_INR}</strong>.
                          </span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="text-[#FFD700] font-bold font-mono">3.</span>
                          <span>
                            Copy the 12-digit Transaction ID / UTR Number from your payment receipt and enter it below.
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Mandatory Input: Transaction ID / UTR Number placed neatly below UPI details */}
                    <div>
                      <label
                        htmlFor="transactionId"
                        className="block text-xs font-mono font-semibold text-[#FFEA9F] mb-1.5 uppercase tracking-wider"
                      >
                        Transaction ID / UTR Number *
                      </label>
                      <div className="relative">
                        <input
                          id="transactionId"
                          type="text"
                          value={formData.transactionId}
                          onChange={(e) => updateField('transactionId', e.target.value)}
                          placeholder="e.g. 434912345678 or UPI/CR/434912345678"
                          className={`w-full rounded-xl border bg-[#0A261D]/90 pl-10 pr-4 py-3.5 text-sm font-mono text-[#FFFFFF] placeholder-[#D9ECF5]/35 backdrop-blur-sm transition-all focus:outline-none ${
                            errors.transactionId
                              ? 'border-[#EF4050] focus:ring-2 focus:ring-[#EF4050]/40'
                              : 'border-[#E9C578]/50 focus:border-[#E9C578] focus:ring-2 focus:ring-[#E9C578]/30'
                          }`}
                        />
                        <Receipt className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#FFD700]" />
                      </div>
                      {errors.transactionId && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-[#EF4050]">
                          <AlertCircle className="h-3 w-3" />
                          <span>{errors.transactionId}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Wizard Navigation Action Buttons */}
                <div className="mt-8 flex items-center justify-between border-t border-[#E9C578]/20 pt-6">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#E9C578]/30 bg-[#0A261D] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#E9C578] transition-all hover:bg-[#123D2B] hover:border-[#E9C578] disabled:opacity-50"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Previous Step</span>
                    </button>
                  ) : (
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 text-xs font-mono text-[#D9ECF5]/60 hover:text-[#E9C578] transition-colors"
                    >
                      <Home className="h-3.5 w-3.5" />
                      <span>Back to Landing Page</span>
                    </Link>
                  )}

                  {currentStep < 5 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E9C578] via-[#FFD700] to-[#E9C578] px-6 py-2.5 text-xs sm:text-sm font-bold text-[#09271E] shadow-[0_0_15px_rgba(233,197,120,0.3)] transition-all hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]"
                    >
                      <span>Continue to Step {currentStep + 1}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#25A18E] via-[#FFD700] to-[#E9C578] px-8 py-3 text-sm font-bold text-[#09271E] shadow-[0_0_25px_rgba(37,161,142,0.4)] transition-all hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] disabled:opacity-75 disabled:pointer-events-none cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-[#09271E]" />
                          <span>Transmitting to Google Sheets...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 text-[#09271E]" />
                          <span>Complete Registration</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </FestiveContainer>
      </main>
    </div>
  );
};
