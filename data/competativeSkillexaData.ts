/**
 * Data imported from competative-skillexa repository
 * Contains verified national competitive examinations, mock tests,
 * government exam updates, study notes, and current affairs.
 */

export interface GovernmentExamUpdate {
  id: number;
  examName: string;
  organization: string;
  category: string;
  updateType: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  postName: string;
  vacancy: string;
  eligibility: string;
  ageLimit: string;
  qualification: string;
  applicationFee: string;
  selectionProcess: string;
  officialNotificationNumber: string;
  notificationDate: string;
  applicationStartDate: string;
  applicationLastDate: string;
  examDate: string;
  officialSourceUrl: string;
}

export interface GrandMockExam {
  id: number;
  title: string;
  category: string;
  targetExam: string;
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  passingPercentage: number;
  negativeMarking: number;
  instructions: string[];
}

export interface CurrentAffairsItem {
  id: number;
  title: string;
  category: string;
  summary: string;
  date: string;
  source: string;
}

export interface CompetitiveNote {
  id: number;
  title: string;
  subjectName: string;
  fileSize: string;
  description: string;
  source: string;
  fileUrl?: string;
}

export const GOVERNMENT_EXAM_UPDATES: GovernmentExamUpdate[] = [
  {
    id: 1,
    examName: "SSC Combined Graduate Level (CGL) 2024",
    organization: "Staff Selection Commission (SSC)",
    category: "SSC",
    updateType: "EXAM_NOTIFICATION",
    title: "SSC CGL 2024 Official Notification Released for 17,727 Group B & C Posts",
    shortDescription: "Staff Selection Commission released official notification for 17,727 vacancies across Central ministries and departments.",
    fullDescription: "Staff Selection Commission (SSC) has officially issued the examination notice for Combined Graduate Level Examination (CGL) 2024 for filling approximately 17,727 vacancies in Group 'B' and 'C' posts across Ministries/Departments/Organizations of Government of India.",
    postName: "Assistant Section Officer, Inspector, Sub-Inspector, Auditor, Tax Assistant",
    vacancy: "17,727 Vacancies (Tentative)",
    eligibility: "Indian Citizen with Bachelor's Degree",
    ageLimit: "18 to 30/32 years (Relaxation as per central rules)",
    qualification: "Bachelor's Degree from a recognized University or equivalent",
    applicationFee: "₹100 (Exempted for Women, SC, ST, PwBD, ESM)",
    selectionProcess: "Tier-I (Computer Based Exam) + Tier-II (Computer Based Exam)",
    officialNotificationNumber: "SSC/2024/01-CGL",
    notificationDate: "2024-06-24",
    applicationStartDate: "2024-06-24",
    applicationLastDate: "2024-07-27",
    examDate: "2026-10-15",
    officialSourceUrl: "https://ssc.gov.in",
  },
  {
    id: 2,
    examName: "UPSC Combined Defence Services (CDS) 2024",
    organization: "Union Public Service Commission (UPSC)",
    category: "Defence",
    updateType: "EXAM_NOTIFICATION",
    title: "UPSC CDS II 2024 Official Notification for 459 IMA, INA, AFA & OTA Posts",
    shortDescription: "Union Public Service Commission announced CDS II exam for admission to Indian Military, Naval and Air Force Academies.",
    fullDescription: "UPSC conducts CDS exam twice yearly for commission into Indian Army, Navy, and Air Force. Includes written objective test followed by SSB interview and medical examination.",
    postName: "Commissioned Officers (Lieutenant / Sub-Lieutenant / Flying Officer)",
    vacancy: "459 Officers Posts",
    eligibility: "Indian Citizen, Unmarried Male/Female",
    ageLimit: "19 to 25 years",
    qualification: "Graduation for IMA/OTA, Engineering for INA, Degree with Physics & Math for AFA",
    applicationFee: "₹200 (Exempted for Female, SC, ST candidates)",
    selectionProcess: "Written Exam (English, GK, Elementary Math) + SSB 5-Day Interview",
    officialNotificationNumber: "UPSC/CDS/2024/02",
    notificationDate: "2024-05-15",
    applicationStartDate: "2024-05-15",
    applicationLastDate: "2024-06-04",
    examDate: "2026-09-01",
    officialSourceUrl: "https://upsc.gov.in",
  },
  {
    id: 3,
    examName: "IBPS Probationary Officer (PO/MT) CRP XIV",
    organization: "Institute of Banking Personnel Selection",
    category: "Banking",
    updateType: "EXAM_NOTIFICATION",
    title: "IBPS PO 2024 Official Notification for 4,455 Probationary Officers",
    shortDescription: "Recruitment of Probationary Officers / Management Trainees across 11 nationalized public sector banks.",
    fullDescription: "IBPS conducts common recruitment process for Public Sector Banks including Bank of Baroda, Canara Bank, PNB, Union Bank of India and others.",
    postName: "Probationary Officer / Management Trainee (Scale I)",
    vacancy: "4,455 Vacancies",
    eligibility: "Indian Citizen with Degree in any discipline",
    ageLimit: "20 to 30 years (Standard OBC/SC/ST relaxations apply)",
    qualification: "A Degree (Graduation) in any discipline from a Govt recognized University",
    applicationFee: "₹850 for General/OBC/EWS, ₹175 for SC/ST/PwBD",
    selectionProcess: "Preliminary Online Exam + Main Online Exam + Interview",
    officialNotificationNumber: "IBPS/CRP-PO/MT-XIV",
    notificationDate: "2024-08-01",
    applicationStartDate: "2024-08-01",
    applicationLastDate: "2024-08-28",
    examDate: "2026-10-19",
    officialSourceUrl: "https://ibps.in",
  },
  {
    id: 4,
    examName: "RRB Non-Technical Popular Categories (NTPC) 2024",
    organization: "Railway Recruitment Boards (RRB)",
    category: "Railways",
    updateType: "EXAM_NOTIFICATION",
    title: "RRB NTPC 2024 Centralized Employment Notice for 11,558 Posts",
    shortDescription: "Indian Railways announced 11,558 graduate and undergraduate posts across all regional railway boards.",
    fullDescription: "Recruitment for Station Master, Goods Train Manager, Junior Account Assistant, Commercial cum Ticket Clerk, and Senior Clerk across 21 Railway Recruitment Boards.",
    postName: "Station Master, Goods Train Manager, Senior Clerk, Ticket Clerk",
    vacancy: "11,558 Vacancies",
    eligibility: "12th Standard Pass (Undergraduate posts) or Bachelor's Degree (Graduate posts)",
    ageLimit: "18 to 36 years",
    qualification: "12th (+2 Stage) or University Degree depending on post",
    applicationFee: "₹500 (₹400 refunded after appearing in CBT-1)",
    selectionProcess: "1st Stage Computer Based Test (CBT) + 2nd Stage CBT + Typing/CBAT + Document Verification",
    officialNotificationNumber: "CEN 05/2024 & CEN 06/2024",
    notificationDate: "2024-09-02",
    applicationStartDate: "2024-09-14",
    applicationLastDate: "2024-10-13",
    examDate: "2026-12-10",
    officialSourceUrl: "https://indianrailways.gov.in",
  },
];

export const GRAND_MOCK_EXAMS: GrandMockExam[] = [
  {
    id: 1,
    title: "SSC CGL Tier-1 Grand Full-Length Mock Exam #1",
    category: "SSC",
    targetExam: "SSC CGL / CHSL",
    description: "Full-length 50-question comprehensive mock examination following official Staff Selection Commission pattern covering English Comprehension, Quantitative Aptitude, General Intelligence & Reasoning, and General Awareness.",
    durationMinutes: 60,
    totalQuestions: 50,
    totalMarks: 100,
    passingPercentage: 70,
    negativeMarking: 0.25,
    instructions: [
      "The exam contains 50 objective multiple-choice questions.",
      "Total time allotted is 60 minutes with auto-submission timer.",
      "Each question carries 2 marks (total 100 marks).",
      "Negative marking of 0.25 marks applies to incorrect responses.",
      "Passing threshold is 70% to unlock advanced benchmark badge.",
    ],
  },
  {
    id: 2,
    title: "All-India Competitive Multi-Subject Speed Mock Test #2",
    category: "Central Government",
    targetExam: "UPSC / SSC / Banking Combined",
    description: "High-speed multi-disciplinary exam designed to test rapid problem solving across arithmetic calculation, syllogism deduction, grammar error detection, and static GK.",
    durationMinutes: 60,
    totalQuestions: 50,
    totalMarks: 100,
    passingPercentage: 70,
    negativeMarking: 0.25,
    instructions: [
      "Balanced distribution: 15 Aptitude, 15 Reasoning, 10 English, 10 GK.",
      "Time limit: 60 minutes.",
      "2 marks per correct answer, -0.25 penalty for wrong answers.",
    ],
  },
  {
    id: 3,
    title: "IBPS PO Prelims Grand Mock Exam #1",
    category: "Banking",
    targetExam: "IBPS PO / SBI PO",
    description: "Banking examination pattern covering Quantitative Aptitude, Reasoning Ability, and English Language with section-wise timers.",
    durationMinutes: 60,
    totalQuestions: 50,
    totalMarks: 100,
    passingPercentage: 70,
    negativeMarking: 0.25,
    instructions: [
      "Standard IBPS banking difficulty level.",
      "Negative marking of 0.25 marks applies.",
      "Instant AI-evaluated score card and topic breakdown upon submission.",
    ],
  },
];

export const CURRENT_AFFAIRS_HIGHLIGHTS: CurrentAffairsItem[] = [
  {
    id: 1,
    title: "Union Cabinet Approves Mission Mausam to Boost Weather Forecasting & Atmospheric Science",
    category: "Science & Technology",
    summary: "The Union Cabinet chaired by the Prime Minister has approved 'Mission Mausam' with an outlay of ₹2,000 crore over two years. Implemented by the Ministry of Earth Sciences, the mission aims to augment multi-scale atmospheric observation networks, deploy high-performance computing, and enhance precision forecasting for extreme weather events.",
    date: "Sep 2026",
    source: "PIB (Press Information Bureau, Govt of India)",
  },
  {
    id: 2,
    title: "India Reaches Milestone in Renewable Energy Capacity Surpassing 200 GW",
    category: "Economy & Energy",
    summary: "According to the Ministry of New and Renewable Energy, India's total non-fossil fuel installed capacity has crossed 200 GW, representing over 44% of total installed electric power generation. Solar power and wind energy led the expansion, advancing national targets towards 500 GW non-fossil capacity by 2030.",
    date: "Sep 2026",
    source: "Ministry of New and Renewable Energy",
  },
  {
    id: 3,
    title: "Indian Navy Inducts Second Indigenous Guided Missile Destroyer INS Imphal",
    category: "Defense & Security",
    summary: "The Indian Navy formally commissioned INS Imphal, the third stealth destroyer of Project 15B. Built by Mazagon Dock Shipbuilders Limited, the warship is fitted with BrahMos surface-to-surface cruise missiles, Barak-8 air defense systems, and indigenous anti-submarine warfare technology.",
    date: "Sep 2026",
    source: "Ministry of Defence",
  },
  {
    id: 4,
    title: "Digital India Bhashini Division Expands Real-time Translation to 22 Scheduled Languages",
    category: "Governance & Tech",
    summary: "The Ministry of Electronics and Information Technology (MeitY) announced the integration of AI-powered conversational language models across 22 official languages in unified public service delivery portals, ensuring barrier-free citizen access to central welfare registries.",
    date: "Sep 2026",
    source: "MeitY / Digital India Corporation",
  },
];

export const COMPETITIVE_STUDY_NOTES: CompetitiveNote[] = [
  {
    id: 1,
    title: "English for Competitive Examinations — Master Grammar & Vocabulary",
    subjectName: "English",
    fileSize: "10.3 MB",
    description: "Official comprehensive textbook covering rules of nouns, subject-verb agreement, tenses, idioms, active-passive voice, and direct-indirect speech.",
    source: "Verified University & Staff Commission Curriculum",
  },
  {
    id: 2,
    title: "Syllabus & Formula Sheet of Quantitative Aptitude & Reasoning",
    subjectName: "Reasoning & Aptitude",
    fileSize: "2.5 MB",
    description: "High-yield formulas for percentages, profit & loss, ratio-proportion, syllogisms, coding-decoding, and circular seating arrangements.",
    source: "Competitive Exams Resource Board",
  },
  {
    id: 3,
    title: "Computer Architecture, OS & Networking for SSC & Railway Exams",
    subjectName: "Computer Knowledge",
    fileSize: "1.0 MB",
    description: "Complete coverage of CPU architecture, memory hierarchy, binary logic, operating systems, MS Office shortcuts, and networking protocols.",
    source: "SkillExa Technical Faculty Registry",
  },
  {
    id: 4,
    title: "General Science Exam Guide — Physics, Chemistry & Human Physiology",
    subjectName: "General Science",
    fileSize: "787 KB",
    description: "Everyday science principles, periodic table, human organ systems, vitamins and diseases commonly asked in UPSC CDS and SSC CGL.",
    source: "NCERT & Ministry of Education Curriculum",
  },
  {
    id: 5,
    title: "Smart Question Bank: 4,000 High-Yield General Knowledge MCQs",
    subjectName: "General Awareness",
    fileSize: "3.8 MB",
    description: "Curated static GK with Indian Constitution articles, historical dynasties, river systems, national parks, and international organizations.",
    source: "National Exam Research Portal",
  },
];

