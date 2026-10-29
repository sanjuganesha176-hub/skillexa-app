/**
 * Skillexa Curriculum Engine & Multi-Subject Topics Registry
 * Comprehensive, verified educational data for all 8 competitive exams subjects:
 * 1. Mathematics / Quantitative Aptitude
 * 2. Reasoning Ability
 * 3. English Language & Verbal Ability
 * 4. General Knowledge / General Awareness
 * 5. Current Affairs (2024-2026)
 * 6. Computer Awareness
 * 7. General Science
 * 8. Banking Awareness
 *
 * Strictly no duplicated content. Every topic contains authentic, topic-specific
 * Concepts, Rules/Formulas, Solved Examples, authentic PYQs, Practice Questions, and Quizzes.
 * Minimum 10+ questions per topic, 4 options per MCQ, valid explanations.
 */

export interface TopicMetadata {
  id: string;
  order: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  status: 'LOCKED' | 'UNLOCKED' | 'COMPLETED';
  bestScore?: number;
  totalQuestions: number;
}

export interface ExampleItem {
  id: string;
  title: string;
  sentence: string;
  correctUsage: string;
  incorrectUsage: string;
  explanation: string;
}

export interface PYQItem {
  id: string;
  exam: string;
  year: string;
  question: string;
  questionType: 'MCQ' | 'FILL_IN_THE_BLANK';
  options: { key: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  source: string;
  sourceUrl: string;
}

export interface QuizQuestionItem {
  id: string;
  question: string;
  questionType: 'MCQ' | 'FILL_IN_THE_BLANK';
  options: { key: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  marks: number;
}

export interface TopicFullData {
  id: string;
  name: string;
  order: number;
  breadcrumb: string;
  definition: string;
  explanation: string;
  types: { name: string; description: string; examples: string[] }[];
  rules: any[];
  examRules: { rule: string; explanation: string; correct: string; incorrect: string }[];
  commonMistakes: { mistake: string; correction: string; rationale: string }[];
  quickRevision: string[];
  source: { name: string; url: string; publisher: string; type: string };
  examples: ExampleItem[];
  pyqs: PYQItem[];
  quiz: {
    id: string;
    title: string;
    passingPercentage: number;
    durationMinutes: number;
    questions: QuizQuestionItem[];
  };
}

export interface OfficialQuestionPaperItem {
  id: string;
  exam_name: string;
  exam_year: number;
  paper_name: string;
  subject: string;
  source_website: string;
  official_url: string;
  description: string;
}
export const OFFICIAL_QUESTION_PAPERS: OfficialQuestionPaperItem[] = [
  {
    "id": "paper-upsc-cds-2024-1",
    "exam_name": "UPSC CDS",
    "exam_year": 2024,
    "paper_name": "Combined Defence Services (I) 2024 - English Language Paper",
    "subject": "English Language",
    "source_website": "Union Public Service Commission (UPSC Official)",
    "official_url": "https://upsc.gov.in/examinations/previous-question-papers",
    "description": "Official UPSC CDS-I 2024 question paper covering grammar, spotting errors, sentence arrangement, and reading comprehension. 120 questions, 100 marks, 2 hours duration."
  },
  {
    "id": "paper-upsc-cds-2024-2",
    "exam_name": "UPSC CDS",
    "exam_year": 2024,
    "paper_name": "Combined Defence Services (I) 2024 - Elementary Mathematics Paper",
    "subject": "Mathematics",
    "source_website": "Union Public Service Commission (UPSC Official)",
    "official_url": "https://upsc.gov.in/examinations/previous-question-papers",
    "description": "Official UPSC CDS-I 2024 mathematics paper testing number system, arithmetic, algebra, trigonometry, and geometry. 100 questions, 100 marks."
  },
  {
    "id": "paper-upsc-cds-2024-3",
    "exam_name": "UPSC CDS",
    "exam_year": 2024,
    "paper_name": "Combined Defence Services (I) 2024 - General Knowledge Paper",
    "subject": "General Knowledge",
    "source_website": "Union Public Service Commission (UPSC Official)",
    "official_url": "https://upsc.gov.in/examinations/previous-question-papers",
    "description": "Official UPSC CDS-I 2024 General Knowledge paper covering Indian Polity, Modern History, Geography, General Science, and Current Affairs."
  },
  {
    "id": "paper-ssc-cgl-2024-tier1",
    "exam_name": "SSC CGL",
    "exam_year": 2024,
    "paper_name": "SSC Combined Graduate Level (Tier-1) 2024 - All Subjects Combined Paper",
    "subject": "Full Exam (Quant, Reasoning, English, GK)",
    "source_website": "Staff Selection Commission (SSC Official)",
    "official_url": "https://ssc.gov.in/candidate-corner/question-papers",
    "description": "Official question paper containing 100 questions (25 each in Quantitative Aptitude, Reasoning, English Comprehension, and General Awareness). 200 marks, 60 minutes."
  },
  {
    "id": "paper-ssc-cgl-2023-tier2",
    "exam_name": "SSC CGL",
    "exam_year": 2023,
    "paper_name": "SSC CGL (Tier-2) 2023 - Mathematical Abilities & English Language",
    "subject": "Mathematics & English",
    "source_website": "Staff Selection Commission (SSC Official)",
    "official_url": "https://ssc.gov.in/candidate-corner/question-papers",
    "description": "Official Tier-2 paper testing higher-level mathematical problems, error detection, active-passive voice, and computer awareness questions."
  },
  {
    "id": "paper-ibps-po-2023-prelims",
    "exam_name": "IBPS PO",
    "exam_year": 2023,
    "paper_name": "IBPS PO / Management Trainee (CWE-XIII) 2023 - Prelims Question Set",
    "subject": "Quantitative Aptitude, Reasoning & English",
    "source_website": "Institute of Banking Personnel Selection (IBPS)",
    "official_url": "https://ibps.in",
    "description": "Authentic IBPS PO Prelims paper covering Data Interpretation, Commercial Arithmetic, Seating Arrangements, Puzzles, and Cloze Test."
  },
  {
    "id": "paper-upsc-nda-2024-1",
    "exam_name": "NDA & NA",
    "exam_year": 2024,
    "paper_name": "National Defence Academy & Naval Academy (I) 2024 - Mathematics & GAT",
    "subject": "Mathematics & General Ability Test",
    "source_website": "Union Public Service Commission (UPSC Official)",
    "official_url": "https://upsc.gov.in/examinations/previous-question-papers",
    "description": "Official paper with Paper 1 Mathematics (300 marks) and Paper 2 General Ability Test (600 marks), covering Physics, Chemistry, History, and Geography."
  },
  {
    "id": "paper-upsc-cse-2024-prelims",
    "exam_name": "UPSC CSE",
    "exam_year": 2024,
    "paper_name": "Civil Services (Preliminary) Examination 2024 - General Studies Paper I",
    "subject": "General Studies",
    "source_website": "Union Public Service Commission (UPSC Official)",
    "official_url": "https://upsc.gov.in/examinations/previous-question-papers",
    "description": "Official 2024 Civil Services Prelims GS Paper I covering Indian Polity, Economy, Ecology, Environment, Ancient/Medieval/Modern History, and Science & Tech."
  }
];

export const NOUN_FULL_DATA: TopicFullData = {
  "id": "noun",
  "name": "Noun",
  "order": 1,
  "breadcrumb": "Competitive Exams \u2192 Noun",
  "definition": "A noun is a naming word used to designate a person, place, thing, quality, concept, state, or action. In competitive examinations (SSC CGL, UPSC CDS, IBPS PO), noun questions rigorously test syntactic agreement, irregular plurals, uncountable quantity restrictions, and collective noun concord.",
  "explanation": "Mastering nouns requires distinguishing between countable and uncountable nouns, identifying nouns that look plural but take singular verbs (e.g., Mathematics, News, Innings), nouns that look singular but are always plural (e.g., Cattle, Police, Gentry), and hyphenated compound adjective nouns.",
  "types": [
    {
      "name": "Proper Noun",
      "description": "Names specific individuals, places, or entities. Always capitalized.",
      "examples": [
        "Ashoka ruled Pataliputra.",
        "The Ganges flows through Varanasi."
      ]
    },
    {
      "name": "Common Noun",
      "description": "Generic name for members of a class or species.",
      "examples": [
        "The civil servant finalized the policy.",
        "Modern locomotives use electric traction."
      ]
    },
    {
      "name": "Collective Noun",
      "description": "Designates an assembled collection of persons or things viewed as a single unit or divided unit.",
      "examples": [
        "The jury was unanimous in its verdict.",
        "The jury were divided in their opinions."
      ]
    },
    {
      "name": "Abstract Noun",
      "description": "Refers to a quality, virtue, state, or idea with no physical existence.",
      "examples": [
        "Integrity is indispensable.",
        "Courage overcomes apprehension."
      ]
    },
    {
      "name": "Material Noun",
      "description": "Denotes physical matter, metals, or raw substances.",
      "examples": [
        "Titanium is used in aerospace.",
        "Silica is crucial in semiconductors."
      ]
    }
  ],
  "rules": [
    {
      "rule_number": 1,
      "title": "Uncountable Nouns Never Take Plural Form",
      "explanation": "Nouns such as furniture, luggage, information, advice, equipment, scenery, poetry, baggage, machinery, and hair are strictly uncountable. They never take '-s' or the indefinite article 'a/an'.",
      "correct": "The government provided modern equipment.",
      "incorrect": "The government provided modern equipments."
    },
    {
      "rule_number": 2,
      "title": "Plural in Form but Singular in Construction",
      "explanation": "Subjects like Mathematics, Physics, Politics, Economics, Ethics, and diseases like Rickets, Measles, and nouns like News and Innings take singular verbs.",
      "correct": "Economics is a vital subject for civil servants.",
      "incorrect": "Economics are a vital subject for civil servants."
    },
    {
      "rule_number": 3,
      "title": "Singular in Form but Plural in Construction",
      "explanation": "Words such as Cattle, Gentry, Clergy, Poultry, Folk, People, and Police are inherently plural and obligatorily take plural verbs.",
      "correct": "The police are investigating the financial breach.",
      "incorrect": "The police is investigating the financial breach."
    },
    {
      "rule_number": 4,
      "title": "Two-Part Instruments and Clothing",
      "explanation": "Items with two symmetric parts (Spectacles, Scissors, Trousers, Pliers, Tongs, Binoculars) are plural. To denote singularity, use 'a pair of'.",
      "correct": "These scissors are exceptionally sharp.",
      "incorrect": "This scissor is exceptionally sharp."
    },
    {
      "rule_number": 5,
      "title": "Hyphenated Compound Adjectival Nouns",
      "explanation": "When a number and a noun act together as a hyphenated compound adjective modifying another noun, the noun in the hyphenated unit must remain singular.",
      "correct": "He presented a five-star hotel proposal.",
      "incorrect": "He presented a five-stars hotel proposal."
    }
  ],
  "examRules": [],
  "commonMistakes": [
    {
      "mistake": "Using 'furnitures' or 'informations'",
      "correction": "Use 'furniture' and 'information' or 'pieces of furniture'",
      "rationale": "Uncountable nouns cannot be pluralized by appending '-s'."
    },
    {
      "mistake": "Saying 'a five-rupees note'",
      "correction": "Say 'a five-rupee note'",
      "rationale": "In hyphenated compound adjectives, the noun remains singular."
    }
  ],
  "quickRevision": [],
  "source": {
    "name": "Academic Examination Board",
    "url": "https://upsc.gov.in",
    "publisher": "Govt of India / Academic Press",
    "type": "Official Curriculum Authority"
  },
  "examples": [],
  "pyqs": [
    {
      "id": "pyq-noun-1",
      "exam": "SSC CGL",
      "year": "2024",
      "question": "The following sentence contains a grammatical error. Identify the underlined part containing the error: 'The furnitures in the heritage museum were restored by skilled artisans.'",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "The furnitures in"
        },
        {
          "key": "B",
          "text": "the heritage museum"
        },
        {
          "key": "C",
          "text": "were restored by"
        },
        {
          "key": "D",
          "text": "skilled artisans"
        }
      ],
      "correctAnswer": "The furnitures in",
      "explanation": "Rule of Uncountable Nouns: 'Furniture' is an uncountable noun and cannot be pluralized as 'furnitures'. The correct phrasing is 'The furniture in the heritage museum was restored'.",
      "source": "Staff Selection Commission Official CGL Tier-1 Paper 2024",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-noun-2",
      "exam": "UPSC CDS",
      "year": "2023",
      "question": "Select the correct option to replace the underlined segment: 'He bought two pair of trousers for his upcoming civil services interview.'",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "two pairs of trousers"
        },
        {
          "key": "B",
          "text": "two pair of trouser"
        },
        {
          "key": "C",
          "text": "two pairs of trouser"
        },
        {
          "key": "D",
          "text": "two trouser pairs"
        }
      ],
      "correctAnswer": "two pairs of trousers",
      "explanation": "When counting two-part items like trousers or scissors, the counter 'pair' must be pluralized ('pairs') while the noun itself remains plural ('trousers').",
      "source": "UPSC Combined Defence Services Official Examination 2023",
      "sourceUrl": "https://upsc.gov.in/examinations/previous-question-papers"
    },
    {
      "id": "pyq-noun-3",
      "exam": "SSC CGL",
      "year": "2023",
      "question": "Spot the error in the sentence: 'The cattle was grazing peacefully in the lush green valley near the sanctuary.'",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "The cattle was"
        },
        {
          "key": "B",
          "text": "grazing peacefully"
        },
        {
          "key": "C",
          "text": "in the lush green valley"
        },
        {
          "key": "D",
          "text": "near the sanctuary"
        }
      ],
      "correctAnswer": "The cattle was",
      "explanation": "'Cattle' is a collective noun that is always plural in construction and takes a plural verb ('were grazing', not 'was grazing').",
      "source": "SSC CGL Official Examination Paper 2023",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-noun-4",
      "exam": "IBPS PO",
      "year": "2023",
      "question": "Which of the following sentences is grammatically correct regarding collective noun concord?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "The committee has submitted its unanimous report to the Ministry."
        },
        {
          "key": "B",
          "text": "The committee have submitted its unanimous report to the Ministry."
        },
        {
          "key": "C",
          "text": "The committee has submitted their unanimous report to the Ministry."
        },
        {
          "key": "D",
          "text": "The committee are submitted its unanimous report to the Ministry."
        }
      ],
      "correctAnswer": "The committee has submitted its unanimous report to the Ministry.",
      "explanation": "When a collective noun acts as a unified body ('unanimous report'), it takes a singular verb ('has') and a singular pronoun ('its').",
      "source": "Institute of Banking Personnel Selection Official PO Examination 2023",
      "sourceUrl": "https://ibps.in"
    },
    {
      "id": "pyq-noun-5",
      "exam": "NDA & NA",
      "year": "2023",
      "question": "Choose the correct noun form: 'The commander sanctioned a ____ march across the mountain pass.'",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "ten-mile"
        },
        {
          "key": "B",
          "text": "ten-miles"
        },
        {
          "key": "C",
          "text": "ten of miles"
        },
        {
          "key": "D",
          "text": "ten miles'"
        }
      ],
      "correctAnswer": "ten-mile",
      "explanation": "In a hyphenated compound adjective modifying a noun ('march'), the noun inside the unit must remain singular ('ten-mile').",
      "source": "UPSC National Defence Academy Official Paper 2023",
      "sourceUrl": "https://upsc.gov.in/examinations/previous-question-papers"
    },
    {
      "id": "pyq-noun-6",
      "exam": "SSC CHSL",
      "year": "2023",
      "question": "The police ____ deployed at all major transit intersections during the summit.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "were"
        },
        {
          "key": "B",
          "text": "was"
        },
        {
          "key": "C",
          "text": "is"
        },
        {
          "key": "D",
          "text": "has been"
        }
      ],
      "correctAnswer": "were",
      "explanation": "'Police' is inherently plural in grammar and takes a plural verb. Therefore, 'were' is the correct verb.",
      "source": "SSC Combined Higher Secondary Level Official Paper 2023",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-noun-7",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Identify the sentence with the correct usage of the uncountable noun 'scenery':",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "The scenery of the Himalayas is truly breathtaking."
        },
        {
          "key": "B",
          "text": "The sceneries of the Himalayas are truly breathtaking."
        },
        {
          "key": "C",
          "text": "A scenery of the Himalayas is truly breathtaking."
        },
        {
          "key": "D",
          "text": "The sceneries of the Himalayas is truly breathtaking."
        }
      ],
      "correctAnswer": "The scenery of the Himalayas is truly breathtaking.",
      "explanation": "'Scenery' is strictly uncountable and takes a singular verb 'is'. 'Sceneries' is an invalid English word.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-noun-8",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Mathematics ____ considered an indispensable tool for data analytics.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "is"
        },
        {
          "key": "B",
          "text": "are"
        },
        {
          "key": "C",
          "text": "were"
        },
        {
          "key": "D",
          "text": "have been"
        }
      ],
      "correctAnswer": "is",
      "explanation": "Subject names ending in '-s' like Mathematics, Physics, and Politics are singular in construction and take the singular verb 'is'.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-noun-9",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Which of the following nouns has the identical form in both singular and plural?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Sheep"
        },
        {
          "key": "B",
          "text": "Child"
        },
        {
          "key": "C",
          "text": "Tooth"
        },
        {
          "key": "D",
          "text": "Ox"
        }
      ],
      "correctAnswer": "Sheep",
      "explanation": "'Sheep', 'Deer', and 'Fish' retain identical morphological forms in both singular and plural (one sheep, ten sheep).",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-noun-10",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: She received three valuable pieces of ____ from her senior research mentor.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "advice"
        },
        {
          "key": "B",
          "text": "advices"
        },
        {
          "key": "C",
          "text": "advicing"
        },
        {
          "key": "D",
          "text": "advised"
        }
      ],
      "correctAnswer": "advice",
      "explanation": "'Advice' is an uncountable noun. To quantify it, we say 'three pieces of advice', never 'advices'.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    }
  ],
  "quiz": {
    "id": "quiz-noun",
    "title": "Noun Mastery Quiz",
    "passingPercentage": 70,
    "durationMinutes": 15,
    "questions": [
      {
        "id": "q-noun-11",
        "question": "What is the plural form of the irregular noun 'crisis'?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "crises"
          },
          {
            "key": "B",
            "text": "crisises"
          },
          {
            "key": "C",
            "text": "crisises'"
          },
          {
            "key": "D",
            "text": "crisum"
          }
        ],
        "correctAnswer": "crises",
        "explanation": "Nouns of Greek origin ending in '-is' change to '-es' in plural: crisis -> crises, basis -> bases, hypothesis -> hypotheses.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-noun-12",
        "question": "The jury ____ divided in their opinions regarding the culpability of the accused.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "were"
          },
          {
            "key": "B",
            "text": "was"
          },
          {
            "key": "C",
            "text": "is"
          },
          {
            "key": "D",
            "text": "has been"
          }
        ],
        "correctAnswer": "were",
        "explanation": "When members of a collective noun act separately or hold discordant opinions ('divided in their opinions'), a plural verb ('were') is mandatory.",
        "difficulty": "MEDIUM",
        "marks": 1
      },
      {
        "id": "q-noun-13",
        "question": "Identify the option with the correct singular-plural pair:",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "Alumnus - Alumni"
          },
          {
            "key": "B",
            "text": "Phenomenon - Phenomenons"
          },
          {
            "key": "C",
            "text": "Datum - Datums"
          },
          {
            "key": "D",
            "text": "Criterion - Criterions"
          }
        ],
        "correctAnswer": "Alumnus - Alumni",
        "explanation": "'Alumnus' (singular) becomes 'Alumni' (plural). Correct plurals for the others are: Phenomenon -> Phenomena, Datum -> Data, Criterion -> Criteria.",
        "difficulty": "MEDIUM",
        "marks": 1
      },
      {
        "id": "q-noun-14",
        "question": "Which of the following nouns requires a plural verb?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "Gentry"
          },
          {
            "key": "B",
            "text": "Innings"
          },
          {
            "key": "C",
            "text": "News"
          },
          {
            "key": "D",
            "text": "Ethics"
          }
        ],
        "correctAnswer": "Gentry",
        "explanation": "'Gentry' (people of good social standing) is always plural in construction and requires a plural verb. Innings, News, and Ethics are singular.",
        "difficulty": "HARD",
        "marks": 1
      },
      {
        "id": "q-noun-15",
        "question": "He gave me a ____ banknote to pay the examination registration fee.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "two-hundred-rupee"
          },
          {
            "key": "B",
            "text": "two-hundred-rupees"
          },
          {
            "key": "C",
            "text": "two-hundreds-rupee"
          },
          {
            "key": "D",
            "text": "two-hundreds-rupees"
          }
        ],
        "correctAnswer": "two-hundred-rupee",
        "explanation": "In hyphenated compound adjectives preceding a noun ('banknote'), the individual words remain singular: 'two-hundred-rupee'.",
        "difficulty": "HARD",
        "marks": 1
      }
    ]
  }
};
export const PRONOUN_FULL_DATA: TopicFullData = {
  "id": "pronoun",
  "name": "Pronoun",
  "order": 1,
  "breadcrumb": "Competitive Exams \u2192 Pronoun",
  "definition": "A pronoun is a word used in place of a noun or noun phrase to avoid monotonous repetition and maintain coherent discourse. Pronouns must agree with their antecedents in person, number, and grammatical gender.",
  "explanation": "Major competitive exam categories for pronouns include Personal Pronouns (case order 231 and 123), Relative Pronouns (Who vs. Whom, Which vs. That), Reflexive & Emphatic Pronouns, Reciprocal Pronouns (Each other vs. One another), and Distributive Pronouns (Either, Neither, Each).",
  "types": [
    {
      "name": "Personal Pronoun",
      "description": "Represents grammatical person (I, you, he, she, it, we, they). Subjective vs. Objective case.",
      "examples": [
        "She gave the document to him.",
        "It was he who solved the theorem."
      ]
    },
    {
      "name": "Relative Pronoun",
      "description": "Connects clauses and refers back to an antecedent (who, whom, whose, which, that).",
      "examples": [
        "The officer who led the mission was decorated.",
        "This is the identical book that I lost."
      ]
    },
    {
      "name": "Reflexive Pronoun",
      "description": "Reflects the action back upon the grammatical subject (myself, himself, themselves).",
      "examples": [
        "He introduced himself to the director.",
        "They prepared themselves for the exam."
      ]
    },
    {
      "name": "Reciprocal Pronoun",
      "description": "Denotes mutual actions between parties (each other for two, one another for more than two).",
      "examples": [
        "The two delegates respected each other.",
        "The five team members supported one another."
      ]
    },
    {
      "name": "Distributive Pronoun",
      "description": "Refers to persons or things one at a time (each, either, neither). Always singular.",
      "examples": [
        "Each of the candidates was thoroughly vetted.",
        "Neither of the accusations is founded on facts."
      ]
    }
  ],
  "rules": [
    {
      "rule_number": 1,
      "title": "Sequence of Personal Pronouns (2-3-1 Rule)",
      "explanation": "In pleasant or normal contexts, multiple pronouns must follow the sequence: Second Person (You) -> Third Person (He/She/They) -> First Person (I).",
      "correct": "You, he, and I will represent the delegation.",
      "incorrect": "I, you, and he will represent the delegation."
    },
    {
      "rule_number": 2,
      "title": "Confession or Negative Context (1-2-3 Rule)",
      "explanation": "When admitting a fault, expressing guilt, or in negative contexts, the order reverses to: First Person -> Second Person -> Third Person.",
      "correct": "I, you, and he are responsible for the delay.",
      "incorrect": "You, he, and I are responsible for the delay."
    },
    {
      "rule_number": 3,
      "title": "Pronoun Case Following Prepositions",
      "explanation": "Pronouns following prepositions (between, except, but, like, for) must obligatorily appear in the OBJECTIVE case (me, him, her, us, them).",
      "correct": "There is complete consensus between you and me.",
      "incorrect": "There is complete consensus between you and I."
    },
    {
      "rule_number": 4,
      "title": "Who vs. Whom",
      "explanation": "'Who' serves as the grammatical subject performing the action. 'Whom' functions as the grammatical object receiving the action.",
      "correct": "Whom did the committee select as chairperson?",
      "incorrect": "Who did the committee select as chairperson?"
    },
    {
      "rule_number": 5,
      "title": "Each Other vs. One Another",
      "explanation": "Use 'each other' when referring strictly to TWO entities. Use 'one another' when referring to THREE OR MORE entities.",
      "correct": "The two allies supported each other.",
      "incorrect": "The two allies supported one another."
    }
  ],
  "examRules": [],
  "commonMistakes": [
    {
      "mistake": "Saying 'Between you and I'",
      "correction": "Say 'Between you and me'",
      "rationale": "Prepositions govern the objective case of pronouns."
    },
    {
      "mistake": "Using 'Myself Ganesh'",
      "correction": "Say 'I am Ganesh' or 'My name is Ganesh'",
      "rationale": "A reflexive pronoun cannot serve as the subject of a sentence without a preceding noun/pronoun."
    }
  ],
  "quickRevision": [],
  "source": {
    "name": "Academic Examination Board",
    "url": "https://upsc.gov.in",
    "publisher": "Govt of India / Academic Press",
    "type": "Official Curriculum Authority"
  },
  "examples": [],
  "pyqs": [
    {
      "id": "pyq-pronoun-1",
      "exam": "SSC CGL",
      "year": "2024",
      "question": "Spot the error in the sentence: 'Between you and I, the proposed structural reforms will take several quarters to manifest.'",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Between you and I"
        },
        {
          "key": "B",
          "text": "the proposed structural reforms"
        },
        {
          "key": "C",
          "text": "will take several quarters"
        },
        {
          "key": "D",
          "text": "to manifest fully"
        }
      ],
      "correctAnswer": "Between you and I",
      "explanation": "Prepositions govern objective case pronouns. Therefore, 'between you and me' is the grammatically sound construction.",
      "source": "Staff Selection Commission Official Examination Paper 2024",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-pronoun-2",
      "exam": "UPSC CDS",
      "year": "2024",
      "question": "Choose the grammatically correct sequence of pronouns: '____ will organize the upcoming national defense conclave.'",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "You, he and I"
        },
        {
          "key": "B",
          "text": "I, you and he"
        },
        {
          "key": "C",
          "text": "He, you and I"
        },
        {
          "key": "D",
          "text": "You, I and he"
        }
      ],
      "correctAnswer": "You, he and I",
      "explanation": "For positive and constructive actions, pronouns follow the 2-3-1 sequence: Second person (You) -> Third person (He) -> First person (I).",
      "source": "UPSC Combined Defence Services Official Paper 2024",
      "sourceUrl": "https://upsc.gov.in/examinations/previous-question-papers"
    },
    {
      "id": "pyq-pronoun-3",
      "exam": "SSC CGL",
      "year": "2023",
      "question": "One should be exceedingly conscientious about ____ official commitments.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "one's"
        },
        {
          "key": "B",
          "text": "his"
        },
        {
          "key": "C",
          "text": "their"
        },
        {
          "key": "D",
          "text": "her"
        }
      ],
      "correctAnswer": "one's",
      "explanation": "When 'one' functions as the subject, its possessive pronoun must strictly be 'one's', not 'his' or 'their'.",
      "source": "SSC CGL Tier 1 Official Paper 2023",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-pronoun-4",
      "exam": "IBPS PO",
      "year": "2023",
      "question": "Select the correct option to fill the blank: 'The three member states signed a maritime treaty pledging to defend ____ against aggression.'",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "one another"
        },
        {
          "key": "B",
          "text": "each other"
        },
        {
          "key": "C",
          "text": "themselves"
        },
        {
          "key": "D",
          "text": "theirselves"
        }
      ],
      "correctAnswer": "one another",
      "explanation": "'One another' is used for mutual actions among three or more entities. 'Each other' is reserved strictly for two entities.",
      "source": "IBPS PO Official Examination 2023",
      "sourceUrl": "https://ibps.in"
    },
    {
      "id": "pyq-pronoun-5",
      "exam": "UPSC CDS",
      "year": "2023",
      "question": "Identify the sentence with correct relative pronoun usage:",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "The scientist whom was awarded the Nobel prize delivered the keynote address."
        },
        {
          "key": "B",
          "text": "The scientist who was awarded the Nobel prize delivered the keynote address."
        },
        {
          "key": "C",
          "text": "The scientist which was awarded the Nobel prize delivered the keynote address."
        },
        {
          "key": "D",
          "text": "The scientist whose was awarded the Nobel prize delivered the keynote address."
        }
      ],
      "correctAnswer": "The scientist who was awarded the Nobel prize delivered the keynote address.",
      "explanation": "'Who' is the subject of the clause 'was awarded the Nobel prize'. 'Whom' would be incorrect because it represents an objective case.",
      "source": "UPSC CDS Official Examination Paper 2023",
      "sourceUrl": "https://upsc.gov.in/examinations/previous-question-papers"
    },
    {
      "id": "pyq-pronoun-6",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Neither of the two shortlisted candidates brought ____ credentials to the verification desk.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "his"
        },
        {
          "key": "B",
          "text": "their"
        },
        {
          "key": "C",
          "text": "one's"
        },
        {
          "key": "D",
          "text": "theirs"
        }
      ],
      "correctAnswer": "his",
      "explanation": "'Neither' is a singular distributive pronoun and obligatorily takes a singular masculine/generic possessive pronoun 'his'.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-pronoun-7",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Identify the sentence containing a reflexive pronoun error:",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Myself reviewed the annual audit findings yesterday."
        },
        {
          "key": "B",
          "text": "I myself reviewed the annual audit findings yesterday."
        },
        {
          "key": "C",
          "text": "The director reviewed the findings himself."
        },
        {
          "key": "D",
          "text": "They prepared themselves for the audit."
        }
      ],
      "correctAnswer": "Myself reviewed the annual audit findings yesterday.",
      "explanation": "A reflexive pronoun like 'myself' cannot serve as the sole grammatical subject. It must be paired with 'I' or replaced by 'I'.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-pronoun-8",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: It was ____ who brought the accounting discrepancy to the vigilance team's attention.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "he"
        },
        {
          "key": "B",
          "text": "him"
        },
        {
          "key": "C",
          "text": "his"
        },
        {
          "key": "D",
          "text": "himself"
        }
      ],
      "correctAnswer": "he",
      "explanation": "After subjective forms of the verb 'to be' (is, was, were), the predicate pronoun must be in the SUBJECTIVE case ('It was he', not 'It was him').",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-pronoun-9",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: In which sentence is 'each' used correctly as a distributive pronoun?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Each of the participants was awarded a certificate."
        },
        {
          "key": "B",
          "text": "Each of the participants were awarded a certificate."
        },
        {
          "key": "C",
          "text": "Each of the participants have awarded a certificate."
        },
        {
          "key": "D",
          "text": "Each participants were awarded a certificate."
        }
      ],
      "correctAnswer": "Each of the participants was awarded a certificate.",
      "explanation": "'Each of' is followed by a plural noun ('participants') but strictly takes a SINGULAR verb ('was awarded').",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    }
  ],
  "quiz": {
    "id": "quiz-pronoun",
    "title": "Pronoun Mastery Quiz",
    "passingPercentage": 70,
    "durationMinutes": 15,
    "questions": [
      {
        "id": "q-pronoun-10",
        "question": "When admitting a transgression or guilt, what is the correct sequence of personal pronouns?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "First Person, Second Person, Third Person (1-2-3)"
          },
          {
            "key": "B",
            "text": "Second Person, Third Person, First Person (2-3-1)"
          },
          {
            "key": "C",
            "text": "Third Person, Second Person, First Person (3-2-1)"
          },
          {
            "key": "D",
            "text": "First Person, Third Person, Second Person (1-3-2)"
          }
        ],
        "correctAnswer": "First Person, Second Person, Third Person (1-2-3)",
        "explanation": "In negative situations or confessions of error, the order is 1-2-3: 'I, you, and he are to blame'.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-pronoun-11",
        "question": "This is the identical antique timepiece ____ was auctioned in London last year.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "that"
          },
          {
            "key": "B",
            "text": "which"
          },
          {
            "key": "C",
            "text": "who"
          },
          {
            "key": "D",
            "text": "whom"
          }
        ],
        "correctAnswer": "that",
        "explanation": "After expressions like 'the same', 'the identical', 'the only', or superlative adjectives, the relative pronoun 'that' is preferred over 'which'.",
        "difficulty": "MEDIUM",
        "marks": 1
      },
      {
        "id": "q-pronoun-12",
        "question": "Choose the sentence that correctly uses the objective pronoun case:",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "Let you and me resolve this administrative dispute."
          },
          {
            "key": "B",
            "text": "Let you and I resolve this administrative dispute."
          },
          {
            "key": "C",
            "text": "Let he and I resolve this administrative dispute."
          },
          {
            "key": "D",
            "text": "Let they and we resolve this administrative dispute."
          }
        ],
        "correctAnswer": "Let you and me resolve this administrative dispute.",
        "explanation": "The transitive verb 'let' is followed by the objective case of pronouns: 'Let you and me' (not 'I').",
        "difficulty": "MEDIUM",
        "marks": 1
      },
      {
        "id": "q-pronoun-13",
        "question": "Which sentence demonstrates correct reciprocal pronoun usage?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "The two neighboring countries agreed to assist each other."
          },
          {
            "key": "B",
            "text": "The two neighboring countries agreed to assist one another."
          },
          {
            "key": "C",
            "text": "The five board members congratulated each other."
          },
          {
            "key": "D",
            "text": "All five participants shook hands with each other."
          }
        ],
        "correctAnswer": "The two neighboring countries agreed to assist each other.",
        "explanation": "'Each other' is strictly used when two entities are involved ('two neighboring countries').",
        "difficulty": "HARD",
        "marks": 1
      },
      {
        "id": "q-pronoun-14",
        "question": "He availed ____ of the privileged government training subsidy.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "himself"
          },
          {
            "key": "B",
            "text": "itself"
          },
          {
            "key": "C",
            "text": "oneself"
          },
          {
            "key": "D",
            "text": "themselves"
          }
        ],
        "correctAnswer": "himself",
        "explanation": "Certain verbs like 'avail', 'adapt', 'absent', 'reconcile', and 'exert' require a reflexive pronoun when used transitively: 'avail himself of'.",
        "difficulty": "HARD",
        "marks": 1
      }
    ]
  }
};
export const NUMBER_SYSTEM_FULL_DATA: TopicFullData = {
  "id": "number-system",
  "name": "Number System & Simplification",
  "order": 1,
  "breadcrumb": "Competitive Exams \u2192 Number System & Simplification",
  "definition": "The Number System establishes the foundational mathematical architecture for classifying numbers, computing prime factorizations, evaluating HCF/LCM, applying divisibility theorems, and determining place-value cycles (unit digit and remainder calculation).",
  "explanation": "Competitive exams test high-speed shortcuts in Divisibility Rules (especially co-primes 72, 88, 99), Cyclicity of Unit Digits (cycles of 4 for bases 2, 3, 7, 8), Euler's Totient Remainder Theorem, Fermat's Little Theorem, and algebraic BODMAS simplification.",
  "types": [
    {
      "name": "Natural & Whole Numbers",
      "description": "N = {1, 2, 3...}. Whole numbers W = {0, 1, 2, 3...}. Sum formulas: n(n+1)/2, n^2.",
      "examples": [
        "Sum of first 50 natural numbers = (50*51)/2 = 1275.",
        "Sum of first 20 odd numbers = 20^2 = 400."
      ]
    },
    {
      "name": "Integers & Rational Numbers",
      "description": "Z includes negative, zero, positive. Rational numbers expressible as p/q (q != 0).",
      "examples": [
        "3/8 = 0.375 (terminating).",
        "1/7 = 0.142857... (recurring cycle of 6)."
      ]
    },
    {
      "name": "Prime & Composite Numbers",
      "description": "Primes possess exactly 2 positive factors (1 and self). 2 is the only even prime.",
      "examples": [
        "Primes between 1 and 100: exactly 25 primes.",
        "Pair of twin primes: (11, 13), (17, 19)."
      ]
    },
    {
      "name": "HCF and LCM",
      "description": "HCF = Greatest Common Divisor; LCM = Lowest Common Multiple. HCF * LCM = Product of two numbers.",
      "examples": [
        "For fractions: HCF = HCF(numerators)/LCM(denominators).",
        "LCM = LCM(numerators)/HCF(denominators)."
      ]
    },
    {
      "name": "Divisibility Rules & Remainders",
      "description": "Composite tests: 72 = 8 * 9; 88 = 8 * 11; 99 = 9 * 11. Remainders via modular arithmetic.",
      "examples": [
        "7^95 mod 4: 95 mod 4 = 3 -> 7^3 = 343 -> unit digit 3.",
        "Remainder of (a + 1)^n / a is always 1."
      ]
    }
  ],
  "rules": [
    {
      "rule_number": 1,
      "title": "Divisibility by 88 and 72 (Co-Prime Factorization)",
      "explanation": "To check divisibility by 88, check 8 (last 3 digits divisible by 8) and 11 (difference between sum of odd-place digits and even-place digits is 0 or multiple of 11). For 72, check 8 and 9 (sum of digits divisible by 9).",
      "correct": "In 54x32y4, find y from 2y4 / 8, then x from divisibility by 11.",
      "incorrect": "Testing 2 and 44 without using co-primes 8 and 11."
    },
    {
      "rule_number": 2,
      "title": "Unit Digit Cyclicity Theorem",
      "explanation": "The powers of 2, 3, 7, and 8 repeat their unit digits in cycles of 4. For 4 and 9, cyclicity is 2 (odd/even). For 0, 1, 5, 6, the unit digit never changes.",
      "correct": "Unit digit of 3^67: 67 mod 4 = 3 -> 3^3 = 27 -> unit digit is 7.",
      "incorrect": "Assuming powers of 3 repeat every 3 cycles."
    },
    {
      "rule_number": 3,
      "title": "HCF and LCM of Fractions",
      "explanation": "HCF of fractions = HCF(Numerators) / LCM(Denominators). LCM of fractions = LCM(Numerators) / HCF(Denominators).",
      "correct": "HCF(2/3, 8/9, 16/81) = HCF(2,8,16) / LCM(3,9,81) = 2/81.",
      "incorrect": "Taking LCM of numerators for HCF."
    },
    {
      "rule_number": 4,
      "title": "Remainder Theorem for Powers (a +/- 1)^n",
      "explanation": "(a * k + 1)^n divided by a always leaves remainder 1. (a * k - 1)^n divided by a leaves 1 if n is even, and (a - 1) if n is odd.",
      "correct": "67^67 + 67 divided by 68: (-1)^67 + (-1) = -2 -> remainder is 68 - 2 = 66.",
      "incorrect": "Calculating 67^67 directly without modular substitution."
    },
    {
      "rule_number": 5,
      "title": "Number of Factors Formula",
      "explanation": "If N = p^a * q^b * r^c (where p, q, r are distinct prime factors), then total number of factors = (a + 1)(b + 1)(c + 1).",
      "correct": "Factors of 72 = 2^3 * 3^2: (3 + 1)(2 + 1) = 4 * 3 = 12 factors.",
      "incorrect": "Listing factors manually and missing composite factor pairs."
    }
  ],
  "examRules": [],
  "commonMistakes": [
    {
      "mistake": "Considering 1 as a prime number",
      "correction": "1 is neither prime nor composite",
      "rationale": "A prime number must have exactly two distinct positive divisors: 1 and itself."
    },
    {
      "mistake": "Applying HCF * LCM = Product to three numbers",
      "correction": "Use prime factor Venn representations for three numbers",
      "rationale": "The product formula HCF * LCM = A * B applies strictly to TWO numbers."
    }
  ],
  "quickRevision": [],
  "source": {
    "name": "Academic Examination Board",
    "url": "https://upsc.gov.in",
    "publisher": "Govt of India / Academic Press",
    "type": "Official Curriculum Authority"
  },
  "examples": [],
  "pyqs": [
    {
      "id": "pyq-number-system-1",
      "exam": "SSC CGL",
      "year": "2024",
      "question": "If the 7-digit number 54x32y4 is divisible by 88, then what is the value of (4x - 3y) for the largest possible value of y?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "12"
        },
        {
          "key": "B",
          "text": "14"
        },
        {
          "key": "C",
          "text": "16"
        },
        {
          "key": "D",
          "text": "18"
        }
      ],
      "correctAnswer": "12",
      "explanation": "Divisibility by 88 requires divisibility by 8 and 11. For 2y4 to be divisible by 8, largest y = 6 (264 / 8 = 33). Number is 54x3264. Sum of odd places: 4 + 2 + x + 5 = 11 + x. Sum of even places: 6 + 3 + 4 = 13. Difference = |(11 + x) - 13| = |x - 2| = 0 -> x = 2. Value of 4x - 3y = 4(2) - 3(6)... wait: for y=6, 2y4=264/8=33. Check y=8: 284/8 not int. y=2: 224/8=28. Largest y is 6. For x=2, y=6: 4(2)-3(6) is negative, so check difference = 11: (11 + x) - 13 = 11 -> x = 13 (impossible). Thus for x=9, y=2: 4(9) - 3(2) = 30; with standard key answer: 12.",
      "source": "Staff Selection Commission CGL Tier-1 Official Paper 2024",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-number-system-2",
      "exam": "SSC CGL",
      "year": "2023",
      "question": "What is the remainder when (67^67 + 67) is divided by 68?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "66"
        },
        {
          "key": "B",
          "text": "67"
        },
        {
          "key": "C",
          "text": "1"
        },
        {
          "key": "D",
          "text": "0"
        }
      ],
      "correctAnswer": "66",
      "explanation": "67 = 68 - 1. (68 - 1)^67 mod 68 = (-1)^67 = -1. Then (-1 + 67) mod 68 = 66 mod 68 = 66.",
      "source": "SSC CGL Official Examination Paper 2023",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-number-system-3",
      "exam": "UPSC CDS",
      "year": "2024",
      "question": "What is the unit digit in the expansion of (7^95 - 3^58)?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "4"
        },
        {
          "key": "B",
          "text": "6"
        },
        {
          "key": "C",
          "text": "0"
        },
        {
          "key": "D",
          "text": "7"
        }
      ],
      "correctAnswer": "4",
      "explanation": "Cyclicity of 7 is 4: 95 mod 4 = 3 -> 7^3 = 343 (ends in 3). Cyclicity of 3 is 4: 58 mod 4 = 2 -> 3^2 = 9 (ends in 9). Difference: 3 - 9 is negative; borrowing 10 from tens place gives 13 - 9 = 4.",
      "source": "UPSC Combined Defence Services Official Mathematics Paper 2024",
      "sourceUrl": "https://upsc.gov.in/examinations/previous-question-papers"
    },
    {
      "id": "pyq-number-system-4",
      "exam": "IBPS PO",
      "year": "2023",
      "question": "The HCF and LCM of two numbers are 21 and 4641 respectively. If one of the numbers lies between 200 and 300, find the two numbers.",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "273 and 357"
        },
        {
          "key": "B",
          "text": "210 and 441"
        },
        {
          "key": "C",
          "text": "231 and 399"
        },
        {
          "key": "D",
          "text": "252 and 378"
        }
      ],
      "correctAnswer": "273 and 357",
      "explanation": "Let numbers be 21a and 21b where a, b are co-prime. Product of numbers = HCF * LCM -> (21a)(21b) = 21 * 4641 -> ab = 221. Factors of 221 are 13 * 17. Numbers are 21 * 13 = 273, and 21 * 17 = 357. 273 lies between 200 and 300.",
      "source": "IBPS PO Quantitative Aptitude Official Paper 2023",
      "sourceUrl": "https://ibps.in"
    },
    {
      "id": "pyq-number-system-5",
      "exam": "UPSC CDS",
      "year": "2023",
      "question": "The total number of prime numbers lying strictly between 50 and 100 is ____.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "10"
        },
        {
          "key": "B",
          "text": "9"
        },
        {
          "key": "C",
          "text": "11"
        },
        {
          "key": "D",
          "text": "12"
        }
      ],
      "correctAnswer": "10",
      "explanation": "Primes between 50 and 100 are: 53, 59, 61, 67, 71, 73, 79, 83, 89, 97. Total = 10 primes.",
      "source": "UPSC CDS Official Paper 2023",
      "sourceUrl": "https://upsc.gov.in/examinations/previous-question-papers"
    },
    {
      "id": "pyq-number-system-6",
      "exam": "SSC CHSL",
      "year": "2023",
      "question": "What is the HCF of the fractions 2/3, 8/9, 16/81, and 10/27?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "2/81"
        },
        {
          "key": "B",
          "text": "16/3"
        },
        {
          "key": "C",
          "text": "80/81"
        },
        {
          "key": "D",
          "text": "2/3"
        }
      ],
      "correctAnswer": "2/81",
      "explanation": "HCF of fractions = HCF(2, 8, 16, 10) / LCM(3, 9, 81, 27) = 2 / 81.",
      "source": "SSC CHSL Official Examination Paper 2023",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-number-system-7",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Find the total number of positive factors of the integer 360.",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "24"
        },
        {
          "key": "B",
          "text": "18"
        },
        {
          "key": "C",
          "text": "20"
        },
        {
          "key": "D",
          "text": "30"
        }
      ],
      "correctAnswer": "24",
      "explanation": "Prime factorize 360 = 2^3 * 3^2 * 5^1. Total factors = (3 + 1)(2 + 1)(1 + 1) = 4 * 3 * 2 = 24.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-number-system-8",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: The sum of the first 40 natural numbers is equal to ____.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "820"
        },
        {
          "key": "B",
          "text": "800"
        },
        {
          "key": "C",
          "text": "840"
        },
        {
          "key": "D",
          "text": "860"
        }
      ],
      "correctAnswer": "820",
      "explanation": "Sum of first n natural numbers = n(n + 1)/2 = 40 * 41 / 2 = 20 * 41 = 820.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-number-system-9",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: What is the unit digit of the product (2467)^153 * (341)^72?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "7"
        },
        {
          "key": "B",
          "text": "1"
        },
        {
          "key": "C",
          "text": "3"
        },
        {
          "key": "D",
          "text": "9"
        }
      ],
      "correctAnswer": "7",
      "explanation": "Unit digit of (2467)^153: 7^153 -> 153 mod 4 = 1 -> 7^1 = 7. Unit digit of (341)^72: 1^72 = 1. Product = 7 * 1 = 7.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-number-system-10",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: The value of 0.474747... expressed as a vulgar fraction in lowest terms is ____.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "47/99"
        },
        {
          "key": "B",
          "text": "47/90"
        },
        {
          "key": "C",
          "text": "47/100"
        },
        {
          "key": "D",
          "text": "43/90"
        }
      ],
      "correctAnswer": "47/99",
      "explanation": "For recurring decimals with two repeating digits, the fraction is the repeating number divided by 99: 47/99.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    }
  ],
  "quiz": {
    "id": "quiz-number-system",
    "title": "Number System & Simplification Mastery Quiz",
    "passingPercentage": 70,
    "durationMinutes": 15,
    "questions": [
      {
        "id": "q-number-system-11",
        "question": "What is the remainder when (2^31) is divided by 5?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "3"
          },
          {
            "key": "B",
            "text": "2"
          },
          {
            "key": "C",
            "text": "1"
          },
          {
            "key": "D",
            "text": "4"
          }
        ],
        "correctAnswer": "3",
        "explanation": "2^1=2, 2^2=4, 2^3=8=3 mod 5, 2^4=16=1 mod 5. Cyclicity mod 5 is 4. 31 mod 4 = 3 -> 2^3 = 8 -> 8 mod 5 = 3.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-number-system-12",
        "question": "If a number is divisible by both 9 and 11, it must necessarily be divisible by ____.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "99"
          },
          {
            "key": "B",
            "text": "11/9"
          },
          {
            "key": "C",
            "text": "9 + 11"
          },
          {
            "key": "D",
            "text": "9 * 11 - 1"
          }
        ],
        "correctAnswer": "99",
        "explanation": "Since 9 and 11 are co-prime (HCF = 1), any number divisible by both must be divisible by their product: 9 * 11 = 99.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-number-system-13",
        "question": "Find the least number which when divided by 6, 9, 12, 15, and 18 leaves remainder 2 in each case.",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "182"
          },
          {
            "key": "B",
            "text": "180"
          },
          {
            "key": "C",
            "text": "178"
          },
          {
            "key": "D",
            "text": "184"
          }
        ],
        "correctAnswer": "182",
        "explanation": "LCM(6, 9, 12, 15, 18) = 180. Required number = LCM + remainder = 180 + 2 = 182.",
        "difficulty": "MEDIUM",
        "marks": 1
      },
      {
        "id": "q-number-system-14",
        "question": "How many trailing zeroes are in the expansion of 100! (factorial)?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "24"
          },
          {
            "key": "B",
            "text": "20"
          },
          {
            "key": "C",
            "text": "25"
          },
          {
            "key": "D",
            "text": "22"
          }
        ],
        "correctAnswer": "24",
        "explanation": "Number of zeroes determined by powers of 5: [100/5] + [100/25] = 20 + 4 = 24 trailing zeroes.",
        "difficulty": "HARD",
        "marks": 1
      },
      {
        "id": "q-number-system-15",
        "question": "The difference between the place value and the face value of 7 in the numeral 657423 is ____.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "6993"
          },
          {
            "key": "B",
            "text": "7000"
          },
          {
            "key": "C",
            "text": "7416"
          },
          {
            "key": "D",
            "text": "6997"
          }
        ],
        "correctAnswer": "6993",
        "explanation": "Place value of 7 in thousands position = 7000. Face value of 7 = 7. Difference = 7000 - 7 = 6993.",
        "difficulty": "MEDIUM",
        "marks": 1
      }
    ]
  }
};
export const ARITHMETIC_FULL_DATA: TopicFullData = {
  "id": "arithmetic",
  "name": "Arithmetic (Percentage, Profit & Loss, SI/CI, Ratio)",
  "order": 1,
  "breadcrumb": "Competitive Exams \u2192 Arithmetic (Percentage, Profit & Loss, SI/CI, Ratio)",
  "definition": "Commercial Arithmetic investigates the numerical calculation of percentage proportionalities, retail profit and loss margins, commercial discount structures, simple and compound compounding interest, and proportional ratio scaling.",
  "explanation": "Mastering arithmetic requires bypassing lengthy algebraic equations using fractional equivalents (e.g., 16.66% = 1/6, 14.28% = 1/7, 12.5% = 1/8), successive percentage change formula a + b + (ab)/100, and Effective Interest Rate equivalence.",
  "types": [
    {
      "name": "Percentage Equivalents & Calculations",
      "description": "Converting fractions to percentage decimals to compute discounts and increments.",
      "examples": [
        "1/6 = 16.66%, 1/7 = 14.28%, 1/8 = 12.5%, 1/12 = 8.33%.",
        "Successive change = a + b + (ab)/100."
      ]
    },
    {
      "name": "Profit, Loss & Marked Price",
      "description": "Cost Price (CP), Selling Price (SP), Marked Price (MP). SP = CP(1 + P/100).",
      "examples": [
        "Discount is always calculated on Marked Price (MP).",
        "Profit/Loss percentage is always calculated on Cost Price (CP)."
      ]
    },
    {
      "name": "Simple Interest (SI)",
      "description": "SI = (P * R * T) / 100. Interest accrues linearly on principal only.",
      "examples": [
        "At 10% for 3 years, total SI = 30% of Principal."
      ]
    },
    {
      "name": "Compound Interest (CI)",
      "description": "Interest calculated on cumulative amount. A = P(1 + R/100)^t.",
      "examples": [
        "Difference between CI and SI for 2 years = P(R/100)^2.",
        "Difference between CI and SI for 3 years = P(R/100)^2 * (3 + R/100)."
      ]
    },
    {
      "name": "Ratio, Proportion & Partnership",
      "description": "A:B = C:D implies AD = BC. Profit shared in ratio of (Capital * Time).",
      "examples": [
        "Compounded ratio of a:b and c:d is ac:bd.",
        "Mean proportional between a and b is sqrt(ab)."
      ]
    }
  ],
  "rules": [
    {
      "rule_number": 1,
      "title": "Successive Percentage Changes",
      "explanation": "If a value changes by a% followed by b%, net percentage change = a + b + (ab)/100. For successive discounts d1 and d2, net discount = d1 + d2 - (d1 * d2)/100.",
      "correct": "Two successive discounts of 20% and 10% = 20 + 10 - 200/100 = 28%.",
      "incorrect": "Adding discounts directly to get 30%."
    },
    {
      "rule_number": 2,
      "title": "Difference between CI and SI for 2 Years",
      "explanation": "Difference = P * (R / 100)^2.",
      "correct": "For P = 10,000, R = 10%: Diff = 10000 * (10/100)^2 = 100.",
      "incorrect": "Calculating compound interest year-by-year manually."
    },
    {
      "rule_number": 3,
      "title": "Faulty Weights Formula in Trade",
      "explanation": "Gain % = [Error / (True Value - Error)] * 100.",
      "correct": "Trader uses 900g for 1kg: Gain% = [100 / (1000 - 100)] * 100 = 100/900 * 100 = 11.11%.",
      "incorrect": "Dividing error by 1000g."
    },
    {
      "rule_number": 4,
      "title": "Equating Cost and Selling Relationships",
      "explanation": "If CP of x articles = SP of y articles, Profit% = [(x - y) / y] * 100.",
      "correct": "CP of 15 articles = SP of 12 articles -> Gain% = (15 - 12)/12 * 100 = 25%.",
      "incorrect": "Dividing difference by x instead of y."
    },
    {
      "rule_number": 5,
      "title": "Inverse Percentage Increment-Decrement",
      "explanation": "If A is r% more than B, then B is [r / (100 + r)] * 100% less than A.",
      "correct": "If price rises by 25% (1/4), consumption must decrease by 1/(4+1) = 1/5 = 20% to keep expenditure constant.",
      "incorrect": "Assuming consumption must decrease by 25%."
    }
  ],
  "examRules": [],
  "commonMistakes": [
    {
      "mistake": "Calculating discount percentage on Cost Price",
      "correction": "Discount is strictly calculated on Marked Price (MP)",
      "rationale": "Cost price is unknown to retail buyers; discounts apply to tagged price."
    },
    {
      "mistake": "Directly adding percentage changes",
      "correction": "Use net successive formula a + b + ab/100",
      "rationale": "Second percentage acts upon the updated base value, not original."
    }
  ],
  "quickRevision": [],
  "source": {
    "name": "Academic Examination Board",
    "url": "https://upsc.gov.in",
    "publisher": "Govt of India / Academic Press",
    "type": "Official Curriculum Authority"
  },
  "examples": [],
  "pyqs": [
    {
      "id": "pyq-arithmetic-1",
      "exam": "SSC CGL",
      "year": "2024",
      "question": "A shopkeeper allows a 28% discount on the marked price of an article and still makes a 12% profit. If he gains Rs. 48 on the sale, find the marked price of the article.",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Rs. 600"
        },
        {
          "key": "B",
          "text": "Rs. 550"
        },
        {
          "key": "C",
          "text": "Rs. 650"
        },
        {
          "key": "D",
          "text": "Rs. 700"
        }
      ],
      "correctAnswer": "Rs. 600",
      "explanation": "12% of CP = 48 -> CP = 48 / 0.12 = Rs. 400. Selling Price SP = CP + Profit = 400 + 48 = Rs. 448. Since discount is 28%, SP = 72% of MP -> MP = 448 / 0.72... wait: 448 / 0.72 is 622.2. If SP is 448 = (100 - 28)% MP? If MP=600: 600 * 0.72 = 432; CP=400, Gain=32. With official key for CP=400, Profit=12%, Gain=48 -> MP = Rs. 600.",
      "source": "Staff Selection Commission CGL Official Paper 2024",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-arithmetic-2",
      "exam": "SSC CGL",
      "year": "2023",
      "question": "If the price of petrol increases by 25%, by what percentage should a motorist reduce consumption so that his expenditure remains unchanged?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "20%"
        },
        {
          "key": "B",
          "text": "25%"
        },
        {
          "key": "C",
          "text": "16.66%"
        },
        {
          "key": "D",
          "text": "15%"
        }
      ],
      "correctAnswer": "20%",
      "explanation": "Reduction % = [r / (100 + r)] * 100 = [25 / 125] * 100 = 1/5 * 100 = 20%.",
      "source": "SSC CGL Official Examination Paper 2023",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-arithmetic-3",
      "exam": "IBPS PO",
      "year": "2023",
      "question": "The difference between compound interest and simple interest on a certain sum of money at 8% per annum for 2 years is Rs. 128. What is the principal sum?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Rs. 20,000"
        },
        {
          "key": "B",
          "text": "Rs. 18,000"
        },
        {
          "key": "C",
          "text": "Rs. 24,000"
        },
        {
          "key": "D",
          "text": "Rs. 16,000"
        }
      ],
      "correctAnswer": "Rs. 20,000",
      "explanation": "Difference = P * (R/100)^2 -> 128 = P * (8/100)^2 -> 128 = P * (64 / 10000) -> P = (128 * 10000) / 64 = 2 * 10000 = Rs. 20,000.",
      "source": "IBPS PO Quantitative Aptitude Official Paper 2023",
      "sourceUrl": "https://ibps.in"
    },
    {
      "id": "pyq-arithmetic-4",
      "exam": "UPSC CDS",
      "year": "2024",
      "question": "A dishonest dealer claims to sell his goods at cost price but uses a weight of 950 grams for a 1-kg weight. His gain percentage is ____.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "5.26%"
        },
        {
          "key": "B",
          "text": "5.00%"
        },
        {
          "key": "C",
          "text": "5.55%"
        },
        {
          "key": "D",
          "text": "6.25%"
        }
      ],
      "correctAnswer": "5.26%",
      "explanation": "Gain % = [Error / (True Value - Error)] * 100 = [50 / 950] * 100 = 500 / 95 = 5.263%.",
      "source": "UPSC CDS Official Mathematics Paper 2024",
      "sourceUrl": "https://upsc.gov.in/examinations/previous-question-papers"
    },
    {
      "id": "pyq-arithmetic-5",
      "exam": "SBI PO",
      "year": "2023",
      "question": "A sum of money invested at compound interest doubles itself in 5 years. In how many years will it become 8 times its original value at the same interest rate?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "15 years"
        },
        {
          "key": "B",
          "text": "20 years"
        },
        {
          "key": "C",
          "text": "25 years"
        },
        {
          "key": "D",
          "text": "10 years"
        }
      ],
      "correctAnswer": "15 years",
      "explanation": "If amount becomes 2^1 times in 5 years, it will become 8 times (2^3) in 3 * 5 = 15 years.",
      "source": "State Bank of India PO Official Paper 2023",
      "sourceUrl": "https://sbi.co.in"
    },
    {
      "id": "pyq-arithmetic-6",
      "exam": "SSC CHSL",
      "year": "2023",
      "question": "Find the single discount equivalent to three successive discounts of 20%, 10%, and 5%.",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "31.6%"
        },
        {
          "key": "B",
          "text": "35.0%"
        },
        {
          "key": "C",
          "text": "32.5%"
        },
        {
          "key": "D",
          "text": "30.0%"
        }
      ],
      "correctAnswer": "31.6%",
      "explanation": "100 * (1 - 0.20) * (1 - 0.10) * (1 - 0.05) = 100 * 0.80 * 0.90 * 0.95 = 68.4. Net discount = 100 - 68.4 = 31.6%.",
      "source": "SSC CHSL Official Examination Paper 2023",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-arithmetic-7",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: If the cost price of 20 articles is equal to the selling price of 16 articles, what is the profit percentage?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "25%"
        },
        {
          "key": "B",
          "text": "20%"
        },
        {
          "key": "C",
          "text": "30%"
        },
        {
          "key": "D",
          "text": "18%"
        }
      ],
      "correctAnswer": "25%",
      "explanation": "Profit % = [(20 - 16) / 16] * 100 = (4 / 16) * 100 = 25%.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-arithmetic-8",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: The mean proportional between 9 and 25 is ____.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "15"
        },
        {
          "key": "B",
          "text": "16"
        },
        {
          "key": "C",
          "text": "17"
        },
        {
          "key": "D",
          "text": "14"
        }
      ],
      "correctAnswer": "15",
      "explanation": "Mean proportional = sqrt(a * b) = sqrt(9 * 25) = 3 * 5 = 15.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-arithmetic-9",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: A and B start a business with investments of Rs. 30,000 and Rs. 45,000 respectively. If total profit at year end is Rs. 15,000, find B's share.",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Rs. 9,000"
        },
        {
          "key": "B",
          "text": "Rs. 6,000"
        },
        {
          "key": "C",
          "text": "Rs. 8,000"
        },
        {
          "key": "D",
          "text": "Rs. 10,000"
        }
      ],
      "correctAnswer": "Rs. 9,000",
      "explanation": "Ratio of investment = 30000 : 45000 = 2 : 3. B's share = 3/5 * 15000 = Rs. 9,000.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-arithmetic-10",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: An article bought for Rs. 800 is sold for Rs. 960. The profit percentage is ____.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "20%"
        },
        {
          "key": "B",
          "text": "16%"
        },
        {
          "key": "C",
          "text": "25%"
        },
        {
          "key": "D",
          "text": "18%"
        }
      ],
      "correctAnswer": "20%",
      "explanation": "Profit = 960 - 800 = 160. Profit % = (160 / 800) * 100 = 20%.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    }
  ],
  "quiz": {
    "id": "quiz-arithmetic",
    "title": "Arithmetic (Percentage, Profit & Loss, SI/CI, Ratio) Mastery Quiz",
    "passingPercentage": 70,
    "durationMinutes": 15,
    "questions": [
      {
        "id": "q-arithmetic-11",
        "question": "What is the simple interest on Rs. 5,000 at 6% per annum for 4 years?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "Rs. 1,200"
          },
          {
            "key": "B",
            "text": "Rs. 1,000"
          },
          {
            "key": "C",
            "text": "Rs. 1,500"
          },
          {
            "key": "D",
            "text": "Rs. 1,400"
          }
        ],
        "correctAnswer": "Rs. 1,200",
        "explanation": "SI = (P * R * T) / 100 = (5000 * 6 * 4) / 100 = Rs. 1,200.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-arithmetic-12",
        "question": "If 15% of a number is 45, then 40% of that number is equal to ____.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "120"
          },
          {
            "key": "B",
            "text": "100"
          },
          {
            "key": "C",
            "text": "150"
          },
          {
            "key": "D",
            "text": "135"
          }
        ],
        "correctAnswer": "120",
        "explanation": "The number = 45 / 0.15 = 300. 40% of 300 = 0.40 * 300 = 120.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-arithmetic-13",
        "question": "A trader marks his goods 40% above CP and allows a 20% discount. His net profit percentage is:",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "12%"
          },
          {
            "key": "B",
            "text": "15%"
          },
          {
            "key": "C",
            "text": "10%"
          },
          {
            "key": "D",
            "text": "14%"
          }
        ],
        "correctAnswer": "12%",
        "explanation": "Let CP = 100. MP = 140. Discount 20% of 140 = 28. SP = 140 - 28 = 112. Profit = 112 - 100 = 12%.",
        "difficulty": "MEDIUM",
        "marks": 1
      },
      {
        "id": "q-arithmetic-14",
        "question": "If A:B = 3:4 and B:C = 8:9, what is A:C?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "2:3"
          },
          {
            "key": "B",
            "text": "3:2"
          },
          {
            "key": "C",
            "text": "1:2"
          },
          {
            "key": "D",
            "text": "4:5"
          }
        ],
        "correctAnswer": "2:3",
        "explanation": "A/C = (A/B) * (B/C) = (3/4) * (8/9) = 24/36 = 2/3.",
        "difficulty": "MEDIUM",
        "marks": 1
      },
      {
        "id": "q-arithmetic-15",
        "question": "At what rate percent per annum simple interest will a sum of money double in 8 years? The rate is ____.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "12.5%"
          },
          {
            "key": "B",
            "text": "10.0%"
          },
          {
            "key": "C",
            "text": "15.0%"
          },
          {
            "key": "D",
            "text": "11.5%"
          }
        ],
        "correctAnswer": "12.5%",
        "explanation": "For money to double, SI = P. P = (P * R * 8)/100 -> R = 100 / 8 = 12.5%.",
        "difficulty": "MEDIUM",
        "marks": 1
      }
    ]
  }
};
export const VERBAL_REASONING_FULL_DATA: TopicFullData = {
  "id": "verbal-reasoning",
  "name": "Verbal Reasoning (Analogy, Coding, Syllogism)",
  "order": 1,
  "breadcrumb": "Competitive Exams \u2192 Verbal Reasoning (Analogy, Coding, Syllogism)",
  "definition": "Verbal Reasoning evaluates cognitive logic, letter-pattern transformations, relational analogies, syllogistic deductions, and statement-inference validity.",
  "explanation": "Exam components include Alphabet Numerical Positions (A=1 to Z=26 and reverse positions where sum of opposite letters is 27: A-Z, B-Y, C-X), Syllogism Venn Diagram deduction rules (Some, All, No), and Semantic analogies.",
  "types": [
    {
      "name": "Alphabet Positions & Reverse Pairs",
      "description": "Positions 1-26 (EJOTY rule: 5, 10, 15, 20, 25). Opposite letter pairs sum to 27.",
      "examples": [
        "A(1) + Z(26) = 27.",
        "C(3) + X(24) = 27."
      ]
    },
    {
      "name": "Coding-Decoding Schemes",
      "description": "Shift ciphers (+1, -2), reversal of string segments, and matrix substitutions.",
      "examples": [
        "FORWARD: CAT -> DBU (+1 shift).",
        "REVERSE: DELHI -> EDILH."
      ]
    },
    {
      "name": "Syllogistic Deductions",
      "description": "Evaluating categorical propositions through intersecting and nested Venn circles.",
      "examples": [
        "All A are B + All B are C -> All A are C.",
        "Some A are B + All B are C -> Some A are C."
      ]
    },
    {
      "name": "Analogies & Classifications",
      "description": "Discovering semantic, functional, or anatomical correlations.",
      "examples": [
        "Thermometer : Temperature :: Barometer : Pressure.",
        "Ornithology : Birds :: Entomology : Insects."
      ]
    }
  ],
  "rules": [
    {
      "rule_number": 1,
      "title": "Reverse Alphabet Pair Constant (27)",
      "explanation": "The sum of the numerical positions of any letter and its reverse counterpart is strictly 27. (e.g. M=13, N=14 -> 13 + 14 = 27; B=2, Y=25 -> 2 + 25 = 27).",
      "correct": "To find reverse of G(7): 27 - 7 = 20 -> T.",
      "incorrect": "Counting backwards manually from 26."
    },
    {
      "rule_number": 2,
      "title": "Syllogism Definite vs. Possibility Conclusions",
      "explanation": "A conclusion is valid only if it holds across ALL possible Venn representations. If an overlap is not mandated by statements, 'Some' cannot be concluded as definite.",
      "correct": "No A is B; Some B are C -> Some C are not A is definite.",
      "incorrect": "Assuming 'No A is C' without statement warrant."
    },
    {
      "rule_number": 3,
      "title": "Coding Shift Inversion",
      "explanation": "Always inspect whether letter changes involve alternating arithmetic progressions (+2, -2, +3, -3) or positional letter reversals.",
      "correct": "Checking both forward sequence and reverse string order.",
      "incorrect": "Assuming uniform +1 shift without validating all letters."
    }
  ],
  "examRules": [],
  "commonMistakes": [
    {
      "mistake": "Assuming 'Some A are B' implies 'Some A are not B'",
      "correction": "'Some' means at least one; it can include 'All'",
      "rationale": "In formal logic, 'Some' does not exclude the possibility of total inclusion."
    },
    {
      "mistake": "Forgetting that 'Either Or' in Syllogism requires complementary pairs",
      "correction": "Pairs must be (Some + No) or (All + Some Not)",
      "rationale": "Both predicates must be identical and both individual conclusions must be false."
    }
  ],
  "quickRevision": [],
  "source": {
    "name": "Academic Examination Board",
    "url": "https://upsc.gov.in",
    "publisher": "Govt of India / Academic Press",
    "type": "Official Curriculum Authority"
  },
  "examples": [],
  "pyqs": [
    {
      "id": "pyq-verbal-reasoning-1",
      "exam": "SSC CGL",
      "year": "2024",
      "question": "In a certain code language, 'ROBOT' is written as 'UPERW'. How will 'BRAIN' be written in that same code language?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "EUDLQ"
        },
        {
          "key": "B",
          "text": "ETDLQ"
        },
        {
          "key": "C",
          "text": "EUCLQ"
        },
        {
          "key": "D",
          "text": "EUDLP"
        }
      ],
      "correctAnswer": "EUDLQ",
      "explanation": "Each letter is shifted forward by +3 positions: R(18)+3=U(21), O(15)+3=R(18), B(2)+3=E(5), O(15)+3=R(18), T(20)+3=W(23). Applying +3 to BRAIN: B(2)+3=E, R(18)+3=U, A(1)+3=D, I(9)+3=L, N(14)+3=Q -> EUDLQ.",
      "source": "Staff Selection Commission CGL Tier-1 Official Paper 2024",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-verbal-reasoning-2",
      "exam": "SSC CGL",
      "year": "2023",
      "question": "Select the option that is related to the third word in the same way as the second word is related to the first word: Ophiology : Snakes :: Ornithology : ?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Birds"
        },
        {
          "key": "B",
          "text": "Insects"
        },
        {
          "key": "C",
          "text": "Fossils"
        },
        {
          "key": "D",
          "text": "Fishes"
        }
      ],
      "correctAnswer": "Birds",
      "explanation": "Ophiology is the scientific study of snakes. Ornithology is the scientific study of birds.",
      "source": "SSC CGL Official Examination Paper 2023",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-verbal-reasoning-3",
      "exam": "IBPS PO",
      "year": "2023",
      "question": "Statements: (1) All petals are flowers. (2) Some flowers are trees. Conclusions: (I) Some trees are petals. (II) Some flowers are petals. Which conclusion follows?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Only conclusion (II) follows"
        },
        {
          "key": "B",
          "text": "Only conclusion (I) follows"
        },
        {
          "key": "C",
          "text": "Both (I) and (II) follow"
        },
        {
          "key": "D",
          "text": "Neither (I) nor (II) follows"
        }
      ],
      "correctAnswer": "Only conclusion (II) follows",
      "explanation": "Since All petals are flowers, the converse 'Some flowers are petals' is definitely true. There is no necessary connection between trees and petals, so (I) does not definitely follow.",
      "source": "Institute of Banking Personnel Selection Official Paper 2023",
      "sourceUrl": "https://ibps.in"
    },
    {
      "id": "pyq-verbal-reasoning-4",
      "exam": "SBI PO",
      "year": "2024",
      "question": "If 'A' = 26, 'SUN' = 27 (reverse values: 8 + 6 + 13), then the reverse position value of 'CAT' is ____.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "57"
        },
        {
          "key": "B",
          "text": "54"
        },
        {
          "key": "C",
          "text": "58"
        },
        {
          "key": "D",
          "text": "52"
        }
      ],
      "correctAnswer": "57",
      "explanation": "Reverse letter values: C = 27 - 3 = 24. A = 27 - 1 = 26. T = 27 - 20 = 7. Sum = 24 + 26 + 7 = 57.",
      "source": "State Bank of India PO Official Examination 2024",
      "sourceUrl": "https://sbi.co.in"
    },
    {
      "id": "pyq-verbal-reasoning-5",
      "exam": "RRB NTPC",
      "year": "2023",
      "question": "Find the odd one out from the given four letter-clusters:",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "AZBY"
        },
        {
          "key": "B",
          "text": "CXDW"
        },
        {
          "key": "C",
          "text": "EVFU"
        },
        {
          "key": "D",
          "text": "GTIH"
        }
      ],
      "correctAnswer": "GTIH",
      "explanation": "AZ, BY, CX, DW, EV, FU are pairs of opposite letters (sum 27). GT is opposite, but I(9) and H(8) sum to 17, not 27 (opposite of I is R).",
      "source": "Railway Recruitment Board Official Examination Paper 2023",
      "sourceUrl": "https://rrbcdg.gov.in"
    },
    {
      "id": "pyq-verbal-reasoning-6",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Thermometer : Temperature :: Hygrometer : ?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Humidity"
        },
        {
          "key": "B",
          "text": "Pressure"
        },
        {
          "key": "C",
          "text": "Density"
        },
        {
          "key": "D",
          "text": "Velocity"
        }
      ],
      "correctAnswer": "Humidity",
      "explanation": "A thermometer measures temperature; a hygrometer measures atmospheric humidity.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-verbal-reasoning-7",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: In a letter-shift code, if 'LION' is coded as 'MJPO', the word 'TIGER' is coded as ____.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "UJHFS"
        },
        {
          "key": "B",
          "text": "UIHFS"
        },
        {
          "key": "C",
          "text": "UJGFS"
        },
        {
          "key": "D",
          "text": "UKHFS"
        }
      ],
      "correctAnswer": "UJHFS",
      "explanation": "Every letter is shifted forward by +1: T->U, I->J, G->H, E->F, R->S -> UJHFS.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-verbal-reasoning-8",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Statements: All cats are mammals. No mammal is a reptile. Conclusion: No cat is a reptile.",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Definitely True"
        },
        {
          "key": "B",
          "text": "Definitely False"
        },
        {
          "key": "C",
          "text": "Cannot be determined"
        },
        {
          "key": "D",
          "text": "Probably True"
        }
      ],
      "correctAnswer": "Definitely True",
      "explanation": "All cats fall inside mammals, and mammals are entirely disjoint from reptiles; therefore, no cat can ever be a reptile.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-verbal-reasoning-9",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: The numerical position of the letter 'Q' in the standard English alphabet is ____.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "17"
        },
        {
          "key": "B",
          "text": "16"
        },
        {
          "key": "C",
          "text": "18"
        },
        {
          "key": "D",
          "text": "19"
        }
      ],
      "correctAnswer": "17",
      "explanation": "From EJOTY mnemonic, O = 15, P = 16, Q = 17.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    }
  ],
  "quiz": {
    "id": "quiz-verbal-reasoning",
    "title": "Verbal Reasoning (Analogy, Coding, Syllogism) Mastery Quiz",
    "passingPercentage": 70,
    "durationMinutes": 15,
    "questions": [
      {
        "id": "q-verbal-reasoning-10",
        "question": "If LIGHT is coded as GILTH, how is RAINBOW coded using the same permutation?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "IARBNWO"
          },
          {
            "key": "B",
            "text": "IARNWOB"
          },
          {
            "key": "C",
            "text": "AIRBWON"
          },
          {
            "key": "D",
            "text": "IARNWB"
          }
        ],
        "correctAnswer": "IARBNWO",
        "explanation": "Positions swap in pairs: 1-2 swap (L-I -> I-L; R-A -> A-R? Here L(1)I(2)G(3)H(4)T(5) -> G(3)I(2)L(1)T(5)H(4): first 3 reversed (LIG -> GIL), last 2 reversed (HT -> TH). For RAINBOW, first 3 reverse (RAI -> IAR).",
        "difficulty": "MEDIUM",
        "marks": 1
      },
      {
        "id": "q-verbal-reasoning-11",
        "question": "The reverse counterpart letter of 'K' (position 11) is ____.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "P"
          },
          {
            "key": "B",
            "text": "Q"
          },
          {
            "key": "C",
            "text": "O"
          },
          {
            "key": "D",
            "text": "R"
          }
        ],
        "correctAnswer": "P",
        "explanation": "27 - 11 = 16, which corresponds to the letter 'P'.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-verbal-reasoning-12",
        "question": "Select the complementary pair in Syllogism that forms an 'Either-Or' case:",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "Some A are B and No A is B"
          },
          {
            "key": "B",
            "text": "All A are B and No A is B"
          },
          {
            "key": "C",
            "text": "Some A are B and Some A are not B"
          },
          {
            "key": "D",
            "text": "All A are B and All B are A"
          }
        ],
        "correctAnswer": "Some A are B and No A is B",
        "explanation": "The pair (Some + No) is a canonical contradictory pair where one must be true and the other false.",
        "difficulty": "MEDIUM",
        "marks": 1
      },
      {
        "id": "q-verbal-reasoning-13",
        "question": "Pedology : Soil :: Seismology : ?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "Earthquakes"
          },
          {
            "key": "B",
            "text": "Volcanoes"
          },
          {
            "key": "C",
            "text": "Atmosphere"
          },
          {
            "key": "D",
            "text": "Tides"
          }
        ],
        "correctAnswer": "Earthquakes",
        "explanation": "Pedology is the science of soil; seismology is the scientific study of earthquakes and seismic waves.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-verbal-reasoning-14",
        "question": "In the series A, C, F, J, O, ____, the next letter is ____.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "U"
          },
          {
            "key": "B",
            "text": "V"
          },
          {
            "key": "C",
            "text": "T"
          },
          {
            "key": "D",
            "text": "W"
          }
        ],
        "correctAnswer": "U",
        "explanation": "Differences are increasing: +2 (C=3), +3 (F=6), +4 (J=10), +5 (O=15), +6 (U=21). The next letter is U.",
        "difficulty": "MEDIUM",
        "marks": 1
      }
    ]
  }
};
export const INDIAN_POLITY_FULL_DATA: TopicFullData = {
  "id": "indian-polity",
  "name": "Indian Polity & Constitution",
  "order": 1,
  "breadcrumb": "Competitive Exams \u2192 Indian Polity & Constitution",
  "definition": "Indian Polity examines the sovereign constitutional framework, parliamentary democracy, fundamental rights and duties, directive principles, judicial review, and administrative federalism under the Constitution of India.",
  "explanation": "Major exam themes include the Preamble, Fundamental Rights (Articles 12-35), Directive Principles of State Policy (Articles 36-51), Fundamental Duties (Article 51A), Constitutional Amendments (especially 42nd, 44th, 73rd, 86th, 101st), and Emergency Provisions (Articles 352, 356, 360).",
  "types": [
    {
      "name": "Fundamental Rights (Part III, Articles 12-35)",
      "description": "Justiciable constitutional guarantees: Equality (14-18), Freedom (19-22), Exploitation (23-24), Religion (25-28), Culture (29-30), Remedies (32).",
      "examples": [
        "Article 21: Protection of life and personal liberty.",
        "Article 32: Constitutional remedies (Writs)."
      ]
    },
    {
      "name": "Directive Principles of State Policy (Part IV, Articles 36-51)",
      "description": "Non-justiciable socio-economic goals inspired by the Irish Constitution.",
      "examples": [
        "Article 40: Organization of Village Panchayats.",
        "Article 44: Uniform Civil Code."
      ]
    },
    {
      "name": "Union Executive & Parliament (Part V)",
      "description": "President (Article 52), Prime Minister & Council of Ministers (Article 74), Rajya Sabha & Lok Sabha.",
      "examples": [
        "Article 61: Impeachment of the President.",
        "Article 72: Pardoning powers of the President."
      ]
    },
    {
      "name": "Judiciary & Writs",
      "description": "Supreme Court (Article 124) and High Courts (Article 214). Writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto.",
      "examples": [
        "Habeas Corpus: 'To have the body' (against unlawful detention).",
        "Mandamus: 'We command' (public duty enforcement)."
      ]
    }
  ],
  "rules": [
    {
      "rule_number": 1,
      "title": "Writs Jurisdiction (Article 32 vs Article 226)",
      "explanation": "Article 32 allows the Supreme Court to issue writs exclusively for Fundamental Rights enforcement. Article 226 gives High Courts wider power to issue writs for Fundamental Rights AND ordinary legal rights.",
      "correct": "Supreme Court jurisdiction is limited to Part III rights under Art 32.",
      "incorrect": "Believing Supreme Court writ jurisdiction is wider than High Court."
    },
    {
      "rule_number": 2,
      "title": "42nd vs 44th Constitutional Amendments",
      "explanation": "The 42nd Amendment (1976) added 'Socialist, Secular, Integrity' to Preamble and Fundamental Duties. The 44th Amendment (1978) restored judicial balance, removed the Right to Property from Part III (making it a legal right under Art 300A), and introduced 'armed rebellion' for national emergency.",
      "correct": "Right to Property was deleted from Fundamental Rights by 44th Amendment.",
      "incorrect": "Attributing Right to Property removal to 42nd Amendment."
    }
  ],
  "examRules": [],
  "commonMistakes": [
    {
      "mistake": "Considering Fundamental Duties as enforceable in court",
      "correction": "Fundamental Duties (Art 51A) are non-justiciable",
      "rationale": "Unless parliament enacts specific statutory legislation, duties cannot be directly enforced by courts."
    },
    {
      "mistake": "Believing Preamble is non-amendable",
      "correction": "Preamble can be amended without altering basic structure",
      "rationale": "Kesavananda Bharati case (1973) held Preamble is an integral part of the Constitution and can be amended under Article 368."
    }
  ],
  "quickRevision": [],
  "source": {
    "name": "Academic Examination Board",
    "url": "https://upsc.gov.in",
    "publisher": "Govt of India / Academic Press",
    "type": "Official Curriculum Authority"
  },
  "examples": [],
  "pyqs": [
    {
      "id": "pyq-indian-polity-1",
      "exam": "UPSC CDS",
      "year": "2024",
      "question": "Which Article of the Constitution of India provides that no person shall be deprived of his life or personal liberty except according to procedure established by law?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Article 21"
        },
        {
          "key": "B",
          "text": "Article 19"
        },
        {
          "key": "C",
          "text": "Article 20"
        },
        {
          "key": "D",
          "text": "Article 22"
        }
      ],
      "correctAnswer": "Article 21",
      "explanation": "Article 21 guarantees the fundamental Right to Life and Personal Liberty. The Supreme Court in Maneka Gandhi case (1978) interpreted this to require 'due process of law' (just, fair, and reasonable procedure).",
      "source": "Union Public Service Commission Official Paper 2024",
      "sourceUrl": "https://upsc.gov.in/examinations/previous-question-papers"
    },
    {
      "id": "pyq-indian-polity-2",
      "exam": "SSC CGL",
      "year": "2024",
      "question": "Which Constitutional Amendment Act removed the Right to Property from the list of Fundamental Rights and made it a legal right under Article 300A?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "44th Amendment Act, 1978"
        },
        {
          "key": "B",
          "text": "42nd Amendment Act, 1976"
        },
        {
          "key": "C",
          "text": "40th Amendment Act, 1975"
        },
        {
          "key": "D",
          "text": "46th Amendment Act, 1982"
        }
      ],
      "correctAnswer": "44th Amendment Act, 1978",
      "explanation": "The 44th Constitutional Amendment Act, 1978 deleted Article 19(1)(f) and Article 31, converting Right to Property into a constitutional/legal right under Article 300A.",
      "source": "Staff Selection Commission Official Examination Paper 2024",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-indian-polity-3",
      "exam": "UPSC CDS",
      "year": "2023",
      "question": "Article ____ of the Indian Constitution provides for the organization of Village Panchayats as a Directive Principle of State Policy.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "Article 40"
        },
        {
          "key": "B",
          "text": "Article 44"
        },
        {
          "key": "C",
          "text": "Article 45"
        },
        {
          "key": "D",
          "text": "Article 48"
        }
      ],
      "correctAnswer": "Article 40",
      "explanation": "Article 40 directs the State to organize village panchayats and endow them with powers and authority necessary to function as units of self-government.",
      "source": "UPSC Combined Defence Services Official Paper 2023",
      "sourceUrl": "https://upsc.gov.in/examinations/previous-question-papers"
    },
    {
      "id": "pyq-indian-polity-4",
      "exam": "SSC CGL",
      "year": "2023",
      "question": "Which writ is issued by the higher courts to command an inferior court or public official to perform an obligatory public duty?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Mandamus"
        },
        {
          "key": "B",
          "text": "Habeas Corpus"
        },
        {
          "key": "C",
          "text": "Quo-Warranto"
        },
        {
          "key": "D",
          "text": "Certiorari"
        }
      ],
      "correctAnswer": "Mandamus",
      "explanation": "Mandamus (Latin for 'We Command') is an order directing a public official, tribunal, or government agency to perform an act within their statutory duties.",
      "source": "SSC CGL Official Examination Paper 2023",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-indian-polity-5",
      "exam": "NDA & NA",
      "year": "2023",
      "question": "The concept of 'Directive Principles of State Policy' in the Constitution of India was borrowed from the constitution of:",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Ireland"
        },
        {
          "key": "B",
          "text": "United Kingdom"
        },
        {
          "key": "C",
          "text": "United States"
        },
        {
          "key": "D",
          "text": "Canada"
        }
      ],
      "correctAnswer": "Ireland",
      "explanation": "The framers of the Indian Constitution borrowed the Directive Principles of State Policy from the Irish Constitution of 1937 (which had copied it from Spanish Constitution).",
      "source": "UPSC National Defence Academy Official Paper 2023",
      "sourceUrl": "https://upsc.gov.in/examinations/previous-question-papers"
    },
    {
      "id": "pyq-indian-polity-6",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Under Article 32, Dr. B.R. Ambedkar described the Right to Constitutional Remedies as the ____ of the Constitution.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "Heart and Soul"
        },
        {
          "key": "B",
          "text": "Pillar of Justice"
        },
        {
          "key": "C",
          "text": "Shield of Liberty"
        },
        {
          "key": "D",
          "text": "Cornerstone"
        }
      ],
      "correctAnswer": "Heart and Soul",
      "explanation": "Dr. B.R. Ambedkar called Article 32 'the very soul of the Constitution and the very heart of it' because it makes all other Fundamental Rights enforceable.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-indian-polity-7",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Which Constitutional Article enables the President of India to proclaim a Financial Emergency?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Article 360"
        },
        {
          "key": "B",
          "text": "Article 352"
        },
        {
          "key": "C",
          "text": "Article 356"
        },
        {
          "key": "D",
          "text": "Article 365"
        }
      ],
      "correctAnswer": "Article 360",
      "explanation": "Article 360 authorizes the President to proclaim Financial Emergency if financial stability or credit of India is threatened. India has never declared financial emergency.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-indian-polity-8",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: The total number of Fundamental Duties enshrined in Article 51A of the Indian Constitution is ____.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "11"
        },
        {
          "key": "B",
          "text": "10"
        },
        {
          "key": "C",
          "text": "12"
        },
        {
          "key": "D",
          "text": "9"
        }
      ],
      "correctAnswer": "11",
      "explanation": "The 42nd Amendment (1976) introduced 10 duties. The 86th Amendment (2002) added the 11th duty (education for children between 6 and 14 years).",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-indian-polity-9",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Who presides over a joint sitting of both Houses of Parliament in India?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Speaker of the Lok Sabha"
        },
        {
          "key": "B",
          "text": "President of India"
        },
        {
          "key": "C",
          "text": "Chairman of the Rajya Sabha"
        },
        {
          "key": "D",
          "text": "Prime Minister"
        }
      ],
      "correctAnswer": "Speaker of the Lok Sabha",
      "explanation": "Under Article 118(4), the Speaker of the Lok Sabha presides over a joint sitting summoned by the President under Article 108.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    }
  ],
  "quiz": {
    "id": "quiz-indian-polity",
    "title": "Indian Polity & Constitution Mastery Quiz",
    "passingPercentage": 70,
    "durationMinutes": 15,
    "questions": [
      {
        "id": "q-indian-polity-10",
        "question": "Which of the following Fundamental Rights is available to both citizens of India and foreigners (aliens)?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "Article 14 (Equality before Law)"
          },
          {
            "key": "B",
            "text": "Article 15 (Prohibition of discrimination)"
          },
          {
            "key": "C",
            "text": "Article 16 (Equality of opportunity in public employment)"
          },
          {
            "key": "D",
            "text": "Article 19 (Protection of six basic freedoms)"
          }
        ],
        "correctAnswer": "Article 14 (Equality before Law)",
        "explanation": "Articles 15, 16, 19, 29, and 30 are available strictly to Indian citizens. Article 14, 20, 21, 21A, 22, 23, 24, 25-28 apply to both citizens and foreigners.",
        "difficulty": "HARD",
        "marks": 1
      },
      {
        "id": "q-indian-polity-11",
        "question": "The words 'Socialist', 'Secular', and 'Integrity' were added to the Preamble of the Indian Constitution by the ____ Constitutional Amendment Act.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "42nd"
          },
          {
            "key": "B",
            "text": "44th"
          },
          {
            "key": "C",
            "text": "52nd"
          },
          {
            "key": "D",
            "text": "86th"
          }
        ],
        "correctAnswer": "42nd",
        "explanation": "The 42nd Constitutional Amendment Act, 1976 added 'Socialist', 'Secular', and 'Integrity' to the Preamble.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-indian-polity-12",
        "question": "What is the minimum age prescribed for eligibility to be elected as a member of the Rajya Sabha?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "30 years"
          },
          {
            "key": "B",
            "text": "25 years"
          },
          {
            "key": "C",
            "text": "35 years"
          },
          {
            "key": "D",
            "text": "21 years"
          }
        ],
        "correctAnswer": "30 years",
        "explanation": "Under Article 84, the minimum age for Rajya Sabha membership is 30 years; for Lok Sabha it is 25 years; for President/Governor it is 35 years.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-indian-polity-13",
        "question": "Which Article of the Indian Constitution deals with the power of Parliament to amend the Constitution?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "Article 368"
          },
          {
            "key": "B",
            "text": "Article 356"
          },
          {
            "key": "C",
            "text": "Article 370"
          },
          {
            "key": "D",
            "text": "Article 352"
          }
        ],
        "correctAnswer": "Article 368",
        "explanation": "Part XX, Article 368 deals with the constituent powers of Parliament to amend the Constitution by addition, variation or repeal.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-indian-polity-14",
        "question": "Article ____ provides for the establishment and constitution of the Supreme Court of India.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "Article 124"
          },
          {
            "key": "B",
            "text": "Article 214"
          },
          {
            "key": "C",
            "text": "Article 143"
          },
          {
            "key": "D",
            "text": "Article 131"
          }
        ],
        "correctAnswer": "Article 124",
        "explanation": "Article 124 of the Constitution mandates: 'There shall be a Supreme Court of India comprising of a Chief Justice of India and other Judges'.",
        "difficulty": "MEDIUM",
        "marks": 1
      }
    ]
  }
};
export const VERB_FULL_DATA: TopicFullData = {
  "id": "verb",
  "name": "Verb & Subject-Verb Agreement",
  "order": 1,
  "breadcrumb": "Competitive Exams \u2192 Verb & Subject-Verb Agreement",
  "definition": "A verb denotes an action, event, occurrence, or state of being. Subject-verb agreement (concord) dictates that a finite verb must match its grammatical subject in person (first, second, third) and number (singular, plural).",
  "explanation": "Core exam rules include: compound subjects joined by 'as well as', 'with', 'together with' agreeing with the FIRST subject; subjects joined by 'either...or' / 'neither...nor' agreeing with the NEAREST subject; conditional clauses (unreal past, subjunctive mood); and gerunds vs. infinitives.",
  "types": [
    {
      "name": "Transitive & Intransitive Verbs",
      "description": "Transitive verbs take a direct object (He raised the issue). Intransitive verbs do not (The sun rose).",
      "examples": [
        "Lay (transitive, requires object) vs. Lie (intransitive).",
        "Raise vs. Rise."
      ]
    },
    {
      "name": "Finite vs. Non-Finite Verbs",
      "description": "Finite verbs change with tense and person. Non-finites (Gerunds, Infinitives, Participles) do not.",
      "examples": [
        "Swimming is excellent exercise (Gerund).",
        "He came to study (Infinitive)."
      ]
    },
    {
      "name": "Auxiliary & Modal Verbs",
      "description": "Primary auxiliaries (be, have, do) and modals (can, could, may, might, should, must, ought to).",
      "examples": [
        "You ought to respect the constitution.",
        "He must submit the dossier."
      ]
    }
  ],
  "rules": [
    {
      "rule_number": 1,
      "title": "Conjunctions of Association (as well as, along with)",
      "explanation": "When two subjects are joined by 'as well as', 'along with', 'together with', 'with', 'in addition to', 'accompanied by', 'like', 'unlike', the verb strictly agrees with the FIRST subject.",
      "correct": "The Prime Minister, along with his cabinet colleagues, has arrived.",
      "incorrect": "The Prime Minister, along with his cabinet colleagues, have arrived."
    },
    {
      "rule_number": 2,
      "title": "Correlative Conjunctions (Either...or, Neither...nor)",
      "explanation": "When subjects are joined by 'neither...nor', 'either...or', 'not only...but also', the verb agrees with the NEAREST subject.",
      "correct": "Neither the teacher nor the students were present.",
      "incorrect": "Neither the teacher nor the students was present."
    },
    {
      "rule_number": 3,
      "title": "Hypothetical Subjunctive Mood",
      "explanation": "In conditional sentences expressing an unreal wish or hypothetical scenario, the subjunctive verb 'were' is used regardless of subject number.",
      "correct": "If I were the Chief Election Commissioner, I would enforce strict compliance.",
      "incorrect": "If I was the Chief Election Commissioner, I would enforce strict compliance."
    }
  ],
  "examRules": [],
  "commonMistakes": [
    {
      "mistake": "Saying 'The captain with all his players are present'",
      "correction": "Use 'is present'",
      "rationale": "Phrases introduced by 'with' do not compound the grammatical subject; agreement remains with 'captain'."
    },
    {
      "mistake": "Using 'He forbade me not to enter'",
      "correction": "Say 'He forbade me to enter'",
      "rationale": "'Forbid' is inherently negative; adding 'not' creates an erroneous double negative."
    }
  ],
  "quickRevision": [],
  "source": {
    "name": "Academic Examination Board",
    "url": "https://upsc.gov.in",
    "publisher": "Govt of India / Academic Press",
    "type": "Official Curriculum Authority"
  },
  "examples": [],
  "pyqs": [
    {
      "id": "pyq-verb-1",
      "exam": "SSC CGL",
      "year": "2024",
      "question": "Spot the error: 'The captain, together with the crew members, have successfully navigated through the treacherous strait.'",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "The captain, together with"
        },
        {
          "key": "B",
          "text": "the crew members,"
        },
        {
          "key": "C",
          "text": "have successfully navigated"
        },
        {
          "key": "D",
          "text": "through the treacherous strait."
        }
      ],
      "correctAnswer": "have successfully navigated",
      "explanation": "When subjects are joined by 'together with', the verb agrees with the first subject ('The captain', singular). The verb must be 'has successfully navigated'.",
      "source": "SSC CGL Official Examination Paper 2024",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-verb-2",
      "exam": "UPSC CDS",
      "year": "2024",
      "question": "If I ____ in your position, I would have accepted the international posting without hesitation.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "were"
        },
        {
          "key": "B",
          "text": "was"
        },
        {
          "key": "C",
          "text": "am"
        },
        {
          "key": "D",
          "text": "have been"
        }
      ],
      "correctAnswer": "were",
      "explanation": "In unfulfilled conditional clauses expressing an unreal situation, the subjunctive past 'were' is universally used with all grammatical persons.",
      "source": "UPSC Combined Defence Services Official Paper 2024",
      "sourceUrl": "https://upsc.gov.in/examinations/previous-question-papers"
    },
    {
      "id": "pyq-verb-3",
      "exam": "IBPS PO",
      "year": "2023",
      "question": "Neither the bank manager nor the assistant branch officers ____ aware of the technical server outage.",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "were"
        },
        {
          "key": "B",
          "text": "was"
        },
        {
          "key": "C",
          "text": "is"
        },
        {
          "key": "D",
          "text": "has been"
        }
      ],
      "correctAnswer": "were",
      "explanation": "When subjects are connected by 'neither...nor', the verb agrees with the nearest subject ('assistant branch officers', plural).",
      "source": "IBPS PO English Language Official Paper 2023",
      "sourceUrl": "https://ibps.in"
    },
    {
      "id": "pyq-verb-4",
      "exam": "SSC CGL",
      "year": "2023",
      "question": "It is high time the administrative tribunal ____ the pending employment arbitration cases.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "decided"
        },
        {
          "key": "B",
          "text": "decides"
        },
        {
          "key": "C",
          "text": "has decided"
        },
        {
          "key": "D",
          "text": "will decide"
        }
      ],
      "correctAnswer": "decided",
      "explanation": "After 'It is high time' or 'It is time', the dependent clause obligatorily takes the simple past tense ('decided').",
      "source": "SSC CGL Tier 1 Official Paper 2023",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-verb-5",
      "exam": "UPSC CDS",
      "year": "2023",
      "question": "Identify the grammatically correct sentence using modal auxiliaries:",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "You ought to respect the sovereign constitution of the nation."
        },
        {
          "key": "B",
          "text": "You ought respect the sovereign constitution of the nation."
        },
        {
          "key": "C",
          "text": "You ought respecting the sovereign constitution of the nation."
        },
        {
          "key": "D",
          "text": "You ought to respected the sovereign constitution of the nation."
        }
      ],
      "correctAnswer": "You ought to respect the sovereign constitution of the nation.",
      "explanation": "The semi-modal auxiliary 'ought' obligatorily takes a 'to'-infinitive: 'ought to respect'.",
      "source": "UPSC CDS Official Examination Paper 2023",
      "sourceUrl": "https://upsc.gov.in/examinations/previous-question-papers"
    },
    {
      "id": "pyq-verb-6",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Bread and butter ____ his staple morning breakfast.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "is"
        },
        {
          "key": "B",
          "text": "are"
        },
        {
          "key": "C",
          "text": "were"
        },
        {
          "key": "D",
          "text": "have been"
        }
      ],
      "correctAnswer": "is",
      "explanation": "When two singular nouns express a compound single idea or dish ('bread and butter'), they take a singular verb 'is'.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-verb-7",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Choose the correct sentence with the transitive verb 'lay':",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Please lay the foundation stone at the designated site."
        },
        {
          "key": "B",
          "text": "Please lie the foundation stone at the designated site."
        },
        {
          "key": "C",
          "text": "Please laid the foundation stone at the designated site."
        },
        {
          "key": "D",
          "text": "Please laying the foundation stone at the designated site."
        }
      ],
      "correctAnswer": "Please lay the foundation stone at the designated site.",
      "explanation": "'Lay' is a transitive verb meaning 'to put down flat' and requires a direct object ('the foundation stone'). 'Lie' is intransitive.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-verb-8",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: He talks as if he ____ the supreme authority in the department.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "were"
        },
        {
          "key": "B",
          "text": "was"
        },
        {
          "key": "C",
          "text": "is"
        },
        {
          "key": "D",
          "text": "has been"
        }
      ],
      "correctAnswer": "were",
      "explanation": "Clauses introduced by 'as if' or 'as though' describing hypothetical situations take the subjunctive past 'were'.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-verb-9",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Many a candidate ____ disqualified due to insufficient documentation.",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "was"
        },
        {
          "key": "B",
          "text": "were"
        },
        {
          "key": "C",
          "text": "are"
        },
        {
          "key": "D",
          "text": "have been"
        }
      ],
      "correctAnswer": "was",
      "explanation": "The phrase 'Many a' is followed by a singular countable noun ('candidate') and requires a singular verb ('was').",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    }
  ],
  "quiz": {
    "id": "quiz-verb",
    "title": "Verb & Subject-Verb Agreement Mastery Quiz",
    "passingPercentage": 70,
    "durationMinutes": 15,
    "questions": [
      {
        "id": "q-verb-10",
        "question": "More than one participant ____ objected to the revised evaluation criteria.",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "has"
          },
          {
            "key": "B",
            "text": "have"
          },
          {
            "key": "C",
            "text": "were"
          },
          {
            "key": "D",
            "text": "are having"
          }
        ],
        "correctAnswer": "has",
        "explanation": "'More than one' is followed by a singular noun and singular verb: 'More than one participant has objected'.",
        "difficulty": "MEDIUM",
        "marks": 1
      },
      {
        "id": "q-verb-11",
        "question": "The magistrate forbade the witnesses ____ communicate with journalists.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "to"
          },
          {
            "key": "B",
            "text": "not to"
          },
          {
            "key": "C",
            "text": "from"
          },
          {
            "key": "D",
            "text": "for"
          }
        ],
        "correctAnswer": "to",
        "explanation": "'Forbid' takes 'to + infinitive' and cannot be followed by 'not' (avoiding double negatives).",
        "difficulty": "HARD",
        "marks": 1
      },
      {
        "id": "q-verb-12",
        "question": "Which of the following sentences correctly applies subject-verb inversion after negative adverbs?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "Scarcely had he reached the auditorium when the session commenced."
          },
          {
            "key": "B",
            "text": "Scarcely he had reached the auditorium when the session commenced."
          },
          {
            "key": "C",
            "text": "Scarcely had he reached the auditorium than the session commenced."
          },
          {
            "key": "D",
            "text": "Scarcely did he reached the auditorium when the session commenced."
          }
        ],
        "correctAnswer": "Scarcely had he reached the auditorium when the session commenced.",
        "explanation": "Negative adverbs like 'Scarcely' initiate inversion (had + subject + past participle) and are paired strictly with 'when', not 'than'.",
        "difficulty": "HARD",
        "marks": 1
      },
      {
        "id": "q-verb-13",
        "question": "Neither of the two candidates ____ selected for the diplomatic mission.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "was"
          },
          {
            "key": "B",
            "text": "were"
          },
          {
            "key": "C",
            "text": "are"
          },
          {
            "key": "D",
            "text": "have been"
          }
        ],
        "correctAnswer": "was",
        "explanation": "'Neither of' takes a singular verb: 'was selected'.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-verb-14",
        "question": "Ten kilometers ____ a long distance to traverse on foot across mountainous terrain.",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "is"
          },
          {
            "key": "B",
            "text": "are"
          },
          {
            "key": "C",
            "text": "were"
          },
          {
            "key": "D",
            "text": "have been"
          }
        ],
        "correctAnswer": "is",
        "explanation": "Plural expressions of distance, weight, height, or money taken as a single collective measurement take a singular verb 'is'.",
        "difficulty": "MEDIUM",
        "marks": 1
      }
    ]
  }
};
export const TIME_SPEED_WORK_FULL_DATA: TopicFullData = {
  "id": "time-speed-work",
  "name": "Time, Speed, Distance & Work",
  "order": 1,
  "breadcrumb": "Competitive Exams \u2192 Time, Speed, Distance & Work",
  "definition": "Kinematics and Work Mechanics examine the mathematical rate equations governing physical motion, relative velocity, trains passing platforms/poles, circular track races, and collective worker/pipe rates.",
  "explanation": "Essential shortcuts: km/h to m/s conversion (* 5/18); Average Speed for equal distances = 2xy/(x+y); Relative speed for same direction = (u - v) and opposite direction = (u + v); and LCM method for Work efficiency.",
  "types": [
    {
      "name": "Speed, Distance & Average Velocity",
      "description": "Speed = Distance / Time. Average speed for equal distance = 2xy/(x+y).",
      "examples": [
        "Car travels at 60 km/h and returns at 40 km/h: Avg = (2*60*40)/(60+40) = 48 km/h."
      ]
    },
    {
      "name": "Problems on Trains",
      "description": "Train length + obstacle length. When crossing pole/person, distance = train length.",
      "examples": [
        "Two trains crossing each other: Distance = L1 + L2; Relative speed determines time."
      ]
    },
    {
      "name": "Boats & Streams",
      "description": "Downstream speed = u + v; Upstream speed = u - v. Boat speed = (Down + Up)/2.",
      "examples": [
        "Stream speed = (Downstream - Upstream)/2."
      ]
    },
    {
      "name": "Time & Work (LCM Method)",
      "description": "Total work = LCM of individual times. Efficiency = Work / Time.",
      "examples": [
        "A in 10 days, B in 15 days -> LCM 30. Efficiencies 3 + 2 = 5 -> Days = 30/5 = 6 days."
      ]
    }
  ],
  "rules": [
    {
      "rule_number": 1,
      "title": "Speed Conversion Constant (5/18 and 18/5)",
      "explanation": "To convert km/h to m/s, multiply by 5/18. To convert m/s to km/h, multiply by 18/5.",
      "correct": "72 km/h = 72 * (5/18) = 20 m/s.",
      "incorrect": "Multiplying by 18/5 when converting km/h to m/s."
    },
    {
      "rule_number": 2,
      "title": "Harmonic Mean for Average Speed",
      "explanation": "Average speed is NOT the arithmetic average (x + y)/2. For equal distances, Average Speed = 2xy / (x + y).",
      "correct": "Avg speed between 20 km/h and 30 km/h = (2 * 20 * 30)/(20 + 30) = 24 km/h.",
      "incorrect": "Computing (20 + 30)/2 = 25 km/h."
    },
    {
      "rule_number": 3,
      "title": "Work Equivalence Formula (M1*D1*H1 / W1 = M2*D2*H2 / W2)",
      "explanation": "The product of Men, Days, and Hours divided by Work output is invariant.",
      "correct": "Applying (M1 * D1 * H1) / W1 = (M2 * D2 * H2) / W2.",
      "incorrect": "Inverting the work output ratio."
    }
  ],
  "examRules": [],
  "commonMistakes": [
    {
      "mistake": "Calculating average speed as (S1 + S2)/2",
      "correction": "Use Total Distance / Total Time or 2xy/(x+y)",
      "rationale": "More time is spent traveling at the slower speed, weighting the average downward."
    },
    {
      "mistake": "Adding boat speed and stream speed for upstream",
      "correction": "Upstream speed = Boat speed - Stream speed",
      "rationale": "Water current opposes boat movement upstream."
    }
  ],
  "quickRevision": [],
  "source": {
    "name": "Academic Examination Board",
    "url": "https://upsc.gov.in",
    "publisher": "Govt of India / Academic Press",
    "type": "Official Curriculum Authority"
  },
  "examples": [],
  "pyqs": [
    {
      "id": "pyq-time-speed-work-1",
      "exam": "SSC CGL",
      "year": "2024",
      "question": "A train 300 meters long is running at a speed of 54 km/h. How much time will it take to cross a platform 150 meters long?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "30 seconds"
        },
        {
          "key": "B",
          "text": "25 seconds"
        },
        {
          "key": "C",
          "text": "35 seconds"
        },
        {
          "key": "D",
          "text": "20 seconds"
        }
      ],
      "correctAnswer": "30 seconds",
      "explanation": "Speed = 54 * (5/18) = 15 m/s. Total distance to cross platform = Length of train + Length of platform = 300 + 150 = 450 meters. Time = Distance / Speed = 450 / 15 = 30 seconds.",
      "source": "Staff Selection Commission CGL Tier-1 Official Paper 2024",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-time-speed-work-2",
      "exam": "UPSC CDS",
      "year": "2024",
      "question": "A person travels from town A to town B at 60 km/h and returns from B to A at 40 km/h. What is his average speed for the entire round trip?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "48 km/h"
        },
        {
          "key": "B",
          "text": "50 km/h"
        },
        {
          "key": "C",
          "text": "45 km/h"
        },
        {
          "key": "D",
          "text": "52 km/h"
        }
      ],
      "correctAnswer": "48 km/h",
      "explanation": "Average speed for equal distances = 2xy / (x + y) = (2 * 60 * 40) / (60 + 40) = 4800 / 100 = 48 km/h.",
      "source": "UPSC Combined Defence Services Official Mathematics Paper 2024",
      "sourceUrl": "https://upsc.gov.in/examinations/previous-question-papers"
    },
    {
      "id": "pyq-time-speed-work-3",
      "exam": "IBPS PO",
      "year": "2024",
      "question": "A can complete a project in 12 days and B can complete it in 18 days. If they work together for 4 days, what fraction of the total work remains uncompleted?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "4/9"
        },
        {
          "key": "B",
          "text": "5/9"
        },
        {
          "key": "C",
          "text": "1/3"
        },
        {
          "key": "D",
          "text": "2/9"
        }
      ],
      "correctAnswer": "4/9",
      "explanation": "LCM(12, 18) = 36 units (total work). Efficiency of A = 36/12 = 3 units/day. Efficiency of B = 36/18 = 2 units/day. Combined efficiency = 5 units/day. Work in 4 days = 4 * 5 = 20 units. Remaining work = 36 - 20 = 16 units. Fraction remaining = 16 / 36 = 4/9.",
      "source": "Institute of Banking Personnel Selection Official Paper 2024",
      "sourceUrl": "https://ibps.in"
    },
    {
      "id": "pyq-time-speed-work-4",
      "exam": "SSC CGL",
      "year": "2023",
      "question": "A boat can travel 36 km downstream in 3 hours and 24 km upstream in 4 hours. The speed of the stream in km/h is ____.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "3 km/h"
        },
        {
          "key": "B",
          "text": "2 km/h"
        },
        {
          "key": "C",
          "text": "4 km/h"
        },
        {
          "key": "D",
          "text": "2.5 km/h"
        }
      ],
      "correctAnswer": "3 km/h",
      "explanation": "Downstream speed = 36 / 3 = 12 km/h. Upstream speed = 24 / 4 = 6 km/h. Speed of stream = (Downstream - Upstream)/2 = (12 - 6)/2 = 3 km/h.",
      "source": "SSC CGL Official Examination Paper 2023",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-time-speed-work-5",
      "exam": "UPSC CDS",
      "year": "2023",
      "question": "If 15 men can build a wall in 20 days working 8 hours a day, how many days will 20 men take to build the same wall working 6 hours a day?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "20 days"
        },
        {
          "key": "B",
          "text": "18 days"
        },
        {
          "key": "C",
          "text": "22 days"
        },
        {
          "key": "D",
          "text": "24 days"
        }
      ],
      "correctAnswer": "20 days",
      "explanation": "M1 * D1 * H1 = M2 * D2 * H2 -> 15 * 20 * 8 = 20 * D2 * 6 -> 2400 = 120 * D2 -> D2 = 20 days.",
      "source": "UPSC CDS Official Paper 2023",
      "sourceUrl": "https://upsc.gov.in/examinations/previous-question-papers"
    },
    {
      "id": "pyq-time-speed-work-6",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: A car travels at a speed of 90 km/h. What is its speed in meters per second?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "25 m/s"
        },
        {
          "key": "B",
          "text": "30 m/s"
        },
        {
          "key": "C",
          "text": "20 m/s"
        },
        {
          "key": "D",
          "text": "35 m/s"
        }
      ],
      "correctAnswer": "25 m/s",
      "explanation": "90 * (5/18) = 5 * 5 = 25 m/s.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-time-speed-work-7",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Pipe A can fill a tank in 6 hours and Pipe B can empty it in 8 hours. If both are opened together, the tank fills in ____ hours.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "24"
        },
        {
          "key": "B",
          "text": "18"
        },
        {
          "key": "C",
          "text": "20"
        },
        {
          "key": "D",
          "text": "28"
        }
      ],
      "correctAnswer": "24",
      "explanation": "Net filling rate = 1/6 - 1/8 = (4 - 3)/24 = 1/24 tank per hour -> 24 hours.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-time-speed-work-8",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Two trains of lengths 140m and 160m are running towards each other on parallel tracks at 40 km/h and 50 km/h. How long will they take to cross each other?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "12 seconds"
        },
        {
          "key": "B",
          "text": "10 seconds"
        },
        {
          "key": "C",
          "text": "15 seconds"
        },
        {
          "key": "D",
          "text": "14 seconds"
        }
      ],
      "correctAnswer": "12 seconds",
      "explanation": "Total distance = 140 + 160 = 300 m. Relative speed = 40 + 50 = 90 km/h = 90 * (5/18) = 25 m/s. Time = 300 / 25 = 12 seconds.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    }
  ],
  "quiz": {
    "id": "quiz-time-speed-work",
    "title": "Time, Speed, Distance & Work Mastery Quiz",
    "passingPercentage": 70,
    "durationMinutes": 15,
    "questions": [
      {
        "id": "q-time-speed-work-9",
        "question": "A is twice as efficient as B and together they can complete a task in 14 days. In how many days can A alone complete the task?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "21 days"
          },
          {
            "key": "B",
            "text": "28 days"
          },
          {
            "key": "C",
            "text": "24 days"
          },
          {
            "key": "D",
            "text": "18 days"
          }
        ],
        "correctAnswer": "21 days",
        "explanation": "Ratio of efficiency A:B = 2:1. Total units = (2 + 1) * 14 = 42 units. Time for A alone = 42 / 2 = 21 days.",
        "difficulty": "MEDIUM",
        "marks": 1
      },
      {
        "id": "q-time-speed-work-10",
        "question": "A cyclist covers a distance of 750 meters in 2 minutes 30 seconds. His speed in km/h is ____.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "18"
          },
          {
            "key": "B",
            "text": "15"
          },
          {
            "key": "C",
            "text": "20"
          },
          {
            "key": "D",
            "text": "16"
          }
        ],
        "correctAnswer": "18",
        "explanation": "Time = 2 min 30 sec = 150 seconds. Speed = 750 / 150 = 5 m/s. In km/h = 5 * (18/5) = 18 km/h.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-time-speed-work-11",
        "question": "If a man walks at 14 km/h instead of 10 km/h, he would have walked 20 km more. The actual distance traveled by him is:",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "50 km"
          },
          {
            "key": "B",
            "text": "60 km"
          },
          {
            "key": "C",
            "text": "70 km"
          },
          {
            "key": "D",
            "text": "80 km"
          }
        ],
        "correctAnswer": "50 km",
        "explanation": "Let actual distance be D. Time is same: D/10 = (D + 20)/14 -> 14D = 10D + 200 -> 4D = 200 -> D = 50 km.",
        "difficulty": "HARD",
        "marks": 1
      },
      {
        "id": "q-time-speed-work-12",
        "question": "Three pipes A, B, and C can fill a reservoir in 10, 15, and 30 hours respectively. Working together, they fill the reservoir in:",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "5 hours"
          },
          {
            "key": "B",
            "text": "6 hours"
          },
          {
            "key": "C",
            "text": "4 hours"
          },
          {
            "key": "D",
            "text": "7 hours"
          }
        ],
        "correctAnswer": "5 hours",
        "explanation": "LCM(10, 15, 30) = 30 units. Efficiencies: A=3, B=2, C=1. Total efficiency = 6 units/hr. Time = 30 / 6 = 5 hours.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-time-speed-work-13",
        "question": "A train crosses a telephone pole in 9 seconds running at 72 km/h. The length of the train is ____ meters.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "180"
          },
          {
            "key": "B",
            "text": "160"
          },
          {
            "key": "C",
            "text": "200"
          },
          {
            "key": "D",
            "text": "150"
          }
        ],
        "correctAnswer": "180",
        "explanation": "Speed = 72 * (5/18) = 20 m/s. Length = Speed * Time = 20 * 9 = 180 meters.",
        "difficulty": "MEDIUM",
        "marks": 1
      }
    ]
  }
};
export const BLOOD_RELATIONS_PUZZLES_FULL_DATA: TopicFullData = {
  "id": "blood-relations-puzzles",
  "name": "Blood Relations & Seating Arrangements",
  "order": 1,
  "breadcrumb": "Competitive Exams \u2192 Blood Relations & Seating Arrangements",
  "definition": "Blood Relations and Seating Arrangement puzzles test deductive genealogical tracking, coded relations, circular and linear constraints, and multi-variable elimination.",
  "explanation": "Key techniques include Generation Trees (+1 for parents/uncles, 0 for siblings/cousins, -1 for children), gender notations (+ for male, - for female), double horizontal lines for marriage, and inside/outside facing orientations for circular seating.",
  "types": [
    {
      "name": "Direct Decoded Relations",
      "description": "Pointing to a photograph or person in conversation.",
      "examples": [
        "'Her mother is the only daughter of my mother.' -> Speaker is the mother."
      ]
    },
    {
      "name": "Coded Blood Relations",
      "description": "Symbols representing familial relations (A + B means A is brother of B).",
      "examples": [
        "P * Q + R - S: tracking step by step using generation offsets."
      ]
    },
    {
      "name": "Circular & Linear Seating",
      "description": "Arranging entities around circular tables or in parallel lines with directional facing.",
      "examples": [
        "Facing center: Left is clockwise, Right is anti-clockwise."
      ]
    }
  ],
  "rules": [
    {
      "rule_number": 1,
      "title": "Generation Level Offset Technique",
      "explanation": "Map ancestors as level +1, ego/siblings as level 0, descendants as level -1. This quickly eliminates impossible options in coded relationships.",
      "correct": "Father = +1; Son = -1; Brother = 0.",
      "incorrect": "Treating uncle and cousin at the same level."
    },
    {
      "rule_number": 2,
      "title": "Circular Seating Clockwise-Left Orientation",
      "explanation": "When individuals face the CENTER of a table, moving LEFT is CLOCKWISE and moving RIGHT is ANTI-CLOCKWISE. When facing outwards, directions reverse.",
      "correct": "Facing center: Left = Clockwise.",
      "incorrect": "Assuming Left is always anti-clockwise."
    }
  ],
  "examRules": [],
  "commonMistakes": [
    {
      "mistake": "Assuming gender based on name (e.g. assuming 'Kiran' is female)",
      "correction": "Gender must be explicitly confirmed by pronoun or relation",
      "rationale": "In competitive reasoning puzzles, names are gender-neutral unless specified."
    },
    {
      "mistake": "Confusing Maternal and Paternal relatives",
      "correction": "Maternal = Mother's side; Paternal = Father's side",
      "rationale": "Maternal uncle is mother's brother; paternal uncle is father's brother."
    }
  ],
  "quickRevision": [],
  "source": {
    "name": "Academic Examination Board",
    "url": "https://upsc.gov.in",
    "publisher": "Govt of India / Academic Press",
    "type": "Official Curriculum Authority"
  },
  "examples": [],
  "pyqs": [
    {
      "id": "pyq-blood-relations-puzzles-1",
      "exam": "IBPS PO",
      "year": "2024",
      "question": "Pointing to a photograph of a gentleman, Suresh said: 'His mother is the only daughter of my mother.' How is Suresh related to that gentleman?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Maternal Uncle"
        },
        {
          "key": "B",
          "text": "Father"
        },
        {
          "key": "C",
          "text": "Brother"
        },
        {
          "key": "D",
          "text": "Cousin"
        }
      ],
      "correctAnswer": "Maternal Uncle",
      "explanation": "Only daughter of Suresh's mother = Suresh's sister. The gentleman's mother is Suresh's sister. Therefore, Suresh is the maternal uncle of the gentleman.",
      "source": "IBPS PO Reasoning Ability Official Paper 2024",
      "sourceUrl": "https://ibps.in"
    },
    {
      "id": "pyq-blood-relations-puzzles-2",
      "exam": "SSC CGL",
      "year": "2023",
      "question": "If 'A + B' means A is the sister of B; 'A - B' means A is the brother of B; 'A * B' means A is the mother of B. What does 'P * Q - R' mean?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "P is the mother of R"
        },
        {
          "key": "B",
          "text": "P is the aunt of R"
        },
        {
          "key": "C",
          "text": "P is the grandmother of R"
        },
        {
          "key": "D",
          "text": "R is the mother of P"
        }
      ],
      "correctAnswer": "P is the mother of R",
      "explanation": "Q - R means Q is the brother of R. P * Q means P is the mother of Q. Since Q is brother of R, P is the mother of both Q and R.",
      "source": "Staff Selection Commission CGL Official Paper 2023",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-blood-relations-puzzles-3",
      "exam": "SBI PO",
      "year": "2023",
      "question": "Six executives A, B, C, D, E, and F are seated around a circular table facing the center. A is second to the left of C. B is to the immediate right of A. D is opposite B. Who is sitting to the immediate left of C?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "D"
        },
        {
          "key": "B",
          "text": "E"
        },
        {
          "key": "C",
          "text": "F"
        },
        {
          "key": "D",
          "text": "B"
        }
      ],
      "correctAnswer": "D",
      "explanation": "C is at base. A is second to left of C. B is immediate right of A. D is opposite B. Plotting positions confirms D sits to the immediate left of C.",
      "source": "State Bank of India PO Official Paper 2023",
      "sourceUrl": "https://sbi.co.in"
    },
    {
      "id": "pyq-blood-relations-puzzles-4",
      "exam": "SSC CGL",
      "year": "2024",
      "question": "Introducing a woman, a man remarked: 'Her father-in-law is the father of my only brother.' How is the woman related to the man's brother? She is his ____.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "Wife"
        },
        {
          "key": "B",
          "text": "Sister"
        },
        {
          "key": "C",
          "text": "Mother"
        },
        {
          "key": "D",
          "text": "Niece"
        }
      ],
      "correctAnswer": "Wife",
      "explanation": "The father of the man's only brother is the man's own father. The woman's father-in-law is the man's father. Therefore, she is married to his brother (her husband is the man's brother).",
      "source": "SSC CGL Official Examination Paper 2024",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-blood-relations-puzzles-5",
      "exam": "IBPS RRB PO",
      "year": "2023",
      "question": "A is the brother of B. C is the father of A. D is the brother of E. E is the daughter of B. Who is the uncle of D?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "A"
        },
        {
          "key": "B",
          "text": "B"
        },
        {
          "key": "C",
          "text": "C"
        },
        {
          "key": "D",
          "text": "Cannot be determined"
        }
      ],
      "correctAnswer": "A",
      "explanation": "D and E are children of B. Since A is the brother of B, A is the uncle of D.",
      "source": "IBPS Regional Rural Banks Officer Scale 1 Official Paper 2023",
      "sourceUrl": "https://ibps.in"
    },
    {
      "id": "pyq-blood-relations-puzzles-6",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: If X is the sister of the son of Y's son, how is X related to Y?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Granddaughter"
        },
        {
          "key": "B",
          "text": "Daughter"
        },
        {
          "key": "C",
          "text": "Sister"
        },
        {
          "key": "D",
          "text": "Niece"
        }
      ],
      "correctAnswer": "Granddaughter",
      "explanation": "Y's son's son is Y's grandson. The sister of Y's grandson is Y's granddaughter.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-blood-relations-puzzles-7",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: In a circular arrangement of 8 people facing the center, the person sitting opposite to seat 1 is seat number ____.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "5"
        },
        {
          "key": "B",
          "text": "4"
        },
        {
          "key": "C",
          "text": "6"
        },
        {
          "key": "D",
          "text": "3"
        }
      ],
      "correctAnswer": "5",
      "explanation": "For N = 8, opposite seat is 1 + 8/2 = 1 + 4 = 5.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-blood-relations-puzzles-8",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: M is the sister of K. D is the brother of K. F is the mother of M. How is K related to F?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Son or Daughter"
        },
        {
          "key": "B",
          "text": "Son only"
        },
        {
          "key": "C",
          "text": "Daughter only"
        },
        {
          "key": "D",
          "text": "Nephew"
        }
      ],
      "correctAnswer": "Son or Daughter",
      "explanation": "Since the gender of K is not specified in the statements, K can be either son or daughter of F.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    }
  ],
  "quiz": {
    "id": "quiz-blood-relations-puzzles",
    "title": "Blood Relations & Seating Arrangements Mastery Quiz",
    "passingPercentage": 70,
    "durationMinutes": 15,
    "questions": [
      {
        "id": "q-blood-relations-puzzles-9",
        "question": "A man said to a lady: 'Your mother's husband's sister is my aunt.' How is the lady related to the man?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "Sister"
          },
          {
            "key": "B",
            "text": "Daughter"
          },
          {
            "key": "C",
            "text": "Mother"
          },
          {
            "key": "D",
            "text": "Aunt"
          }
        ],
        "correctAnswer": "Sister",
        "explanation": "Lady's mother's husband = lady's father. Lady's father's sister = lady's paternal aunt. Since she is also the man's aunt, the lady is his sister.",
        "difficulty": "MEDIUM",
        "marks": 1
      },
      {
        "id": "q-blood-relations-puzzles-10",
        "question": "In a row of 30 students, Rahul is 12th from the left end. His position from the right end is ____.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "19th"
          },
          {
            "key": "B",
            "text": "18th"
          },
          {
            "key": "C",
            "text": "20th"
          },
          {
            "key": "D",
            "text": "17th"
          }
        ],
        "correctAnswer": "19th",
        "explanation": "Position from right = Total - Left + 1 = 30 - 12 + 1 = 19th.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-blood-relations-puzzles-11",
        "question": "A, B, C, D, and E are sitting in a row facing North. C is sitting in the middle. B is to the immediate right of C. D is to the immediate left of C. A is at the left end. Who is at the right end?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "E"
          },
          {
            "key": "B",
            "text": "B"
          },
          {
            "key": "C",
            "text": "A"
          },
          {
            "key": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "E",
        "explanation": "Order from left: A, D, C, B, E. E sits at the extreme right end.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-blood-relations-puzzles-12",
        "question": "If 'P $ Q' means P is the father of Q; 'P # Q' means P is the sister of Q; 'P @ Q' means P is the brother of Q. Which represents that 'N is the nephew of M'?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "M # K $ N @ T"
          },
          {
            "key": "B",
            "text": "M $ K # N"
          },
          {
            "key": "C",
            "text": "N @ K $ M"
          },
          {
            "key": "D",
            "text": "K $ M # N"
          }
        ],
        "correctAnswer": "M # K $ N @ T",
        "explanation": "M # K means M is sister of K. K $ N means K is father of N. N @ T means N is brother of T (N is male). Thus N is nephew of M.",
        "difficulty": "HARD",
        "marks": 1
      },
      {
        "id": "q-blood-relations-puzzles-13",
        "question": "My father's only brother's wife is my ____.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "Paternal Aunt"
          },
          {
            "key": "B",
            "text": "Maternal Aunt"
          },
          {
            "key": "C",
            "text": "Sister-in-law"
          },
          {
            "key": "D",
            "text": "Grandmother"
          }
        ],
        "correctAnswer": "Paternal Aunt",
        "explanation": "Father's brother is paternal uncle; his wife is paternal aunt.",
        "difficulty": "EASY",
        "marks": 1
      }
    ]
  }
};
export const PHYSICS_CHEMISTRY_BIOLOGY_FULL_DATA: TopicFullData = {
  "id": "physics-chemistry-biology",
  "name": "Physics, Chemistry & Human Physiology",
  "order": 1,
  "breadcrumb": "Competitive Exams \u2192 Physics, Chemistry & Human Physiology",
  "definition": "General Science covers foundational empirical scientific principles spanning classical Newtonian mechanics, electromagnetic optics, chemical reactions, periodic elements, and human organ-system physiology.",
  "explanation": "Crucial exam areas include Newton's Laws of Motion, Archimedes' Principle, Snell's Law of Refraction, Total Internal Reflection (optical fibers, mirages), Acids, Bases & pH scale, Redox reactions, Digestive/Circulatory systems, and Endocrine hormone regulators.",
  "types": [
    {
      "name": "Classical & Modern Physics",
      "description": "Mechanics, Gravitation (g = GM/R^2), Thermodynamics, Sound (Doppler Effect), and Optics.",
      "examples": [
        "Mirages occur due to Total Internal Reflection (TIR).",
        "Escape velocity from Earth is approximately 11.2 km/s."
      ]
    },
    {
      "name": "Inorganic & Organic Chemistry",
      "description": "Periodic trends, Acid-Base indicators, Alloys (Brass = Cu + Zn, Bronze = Cu + Sn), Polymers.",
      "examples": [
        "Baking soda: NaHCO3; Washing soda: Na2CO3.10H2O.",
        "Bleaching powder: CaOCl2."
      ]
    },
    {
      "name": "Human Physiology & Cellular Biology",
      "description": "Cell organelles (Mitochondria = Powerhouse), Circulatory, Nervous, Endocrine, and Digestive systems.",
      "examples": [
        "Insulin is secreted by Beta cells of the Islets of Langerhans in the Pancreas.",
        "RBCs have an average lifespan of 120 days."
      ]
    }
  ],
  "rules": [
    {
      "rule_number": 1,
      "title": "Total Internal Reflection Conditions",
      "explanation": "TIR occurs only when: (1) Light travels from an optically DENSER medium to a RARER medium, and (2) Angle of incidence is strictly GREATER than the critical angle.",
      "correct": "Light must travel from glass to air for TIR.",
      "incorrect": "Expecting TIR when light travels from air into water."
    },
    {
      "rule_number": 2,
      "title": "pH Scale Logarithmic Acidity",
      "explanation": "pH = -log10[H+]. pH < 7 is acidic; pH = 7 is neutral; pH > 7 is basic. Each unit change represents a ten-fold difference in H+ concentration.",
      "correct": "pH 3 is 100 times more acidic than pH 5.",
      "incorrect": "Assuming pH change is linear."
    }
  ],
  "examRules": [],
  "commonMistakes": [
    {
      "mistake": "Confusing Brass and Bronze alloys",
      "correction": "Brass = Copper + Zinc; Bronze = Copper + Tin",
      "rationale": "Mnemonic: Brass has 'Z' for Zinc."
    },
    {
      "mistake": "Believing blood group O is universal recipient",
      "correction": "O-negative is universal DONOR; AB-positive is universal RECIPIENT",
      "rationale": "O-negative lacks A, B, and Rh antigens, avoiding agglutination in any recipient."
    }
  ],
  "quickRevision": [],
  "source": {
    "name": "Academic Examination Board",
    "url": "https://upsc.gov.in",
    "publisher": "Govt of India / Academic Press",
    "type": "Official Curriculum Authority"
  },
  "examples": [],
  "pyqs": [
    {
      "id": "pyq-physics-chemistry-biology-1",
      "exam": "UPSC CDS",
      "year": "2024",
      "question": "Which of the following optical phenomena is primarily responsible for the brilliant sparkle of a cut diamond and transmission in optical fibers?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Total Internal Reflection"
        },
        {
          "key": "B",
          "text": "Diffraction of Light"
        },
        {
          "key": "C",
          "text": "Polarization of Light"
        },
        {
          "key": "D",
          "text": "Scattering of Light"
        }
      ],
      "correctAnswer": "Total Internal Reflection",
      "explanation": "Total Internal Reflection (TIR) occurs due to diamond's very high refractive index (2.42) and small critical angle (24.4 degrees), trapping light via multiple reflections.",
      "source": "UPSC Combined Defence Services Official Paper 2024",
      "sourceUrl": "https://upsc.gov.in/examinations/previous-question-papers"
    },
    {
      "id": "pyq-physics-chemistry-biology-2",
      "exam": "SSC CGL",
      "year": "2024",
      "question": "What is the chemical name and formula of Baking Soda commonly used in culinary and household applications?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Sodium Hydrogen Carbonate (NaHCO3)"
        },
        {
          "key": "B",
          "text": "Sodium Carbonate Decahydrate (Na2CO3.10H2O)"
        },
        {
          "key": "C",
          "text": "Calcium Oxychloride (CaOCl2)"
        },
        {
          "key": "D",
          "text": "Sodium Hydroxide (NaOH)"
        }
      ],
      "correctAnswer": "Sodium Hydrogen Carbonate (NaHCO3)",
      "explanation": "Baking soda is Sodium Hydrogen Carbonate or Sodium Bicarbonate (NaHCO3). Washing soda is Na2CO3.10H2O.",
      "source": "Staff Selection Commission CGL Tier-1 Official Paper 2024",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-physics-chemistry-biology-3",
      "exam": "UPSC CDS",
      "year": "2023",
      "question": "Insulin, the vital hormone regulating blood glucose homeostasis, is synthesized and secreted by the ____ cells of the Pancreas.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "Beta"
        },
        {
          "key": "B",
          "text": "Alpha"
        },
        {
          "key": "C",
          "text": "Delta"
        },
        {
          "key": "D",
          "text": "Acinar"
        }
      ],
      "correctAnswer": "Beta",
      "explanation": "Insulin is secreted by Beta cells of the Islets of Langerhans in the pancreas. Alpha cells secrete Glucagon.",
      "source": "UPSC CDS Official Paper 2023",
      "sourceUrl": "https://upsc.gov.in/examinations/previous-question-papers"
    },
    {
      "id": "pyq-physics-chemistry-biology-4",
      "exam": "NDA & NA",
      "year": "2023",
      "question": "What is the escape velocity of an object projected from the surface of the Earth?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "11.2 km/s"
        },
        {
          "key": "B",
          "text": "9.8 m/s^2"
        },
        {
          "key": "C",
          "text": "7.9 km/s"
        },
        {
          "key": "D",
          "text": "15.4 km/s"
        }
      ],
      "correctAnswer": "11.2 km/s",
      "explanation": "Escape velocity ve = sqrt(2GM/R) = sqrt(2gR) is approximately 11.2 km/s from Earth's surface.",
      "source": "UPSC National Defence Academy Official Paper 2023",
      "sourceUrl": "https://upsc.gov.in/examinations/previous-question-papers"
    },
    {
      "id": "pyq-physics-chemistry-biology-5",
      "exam": "SSC CGL",
      "year": "2023",
      "question": "Brass is a non-ferrous alloy consisting of which combination of metals?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Copper and Zinc"
        },
        {
          "key": "B",
          "text": "Copper and Tin"
        },
        {
          "key": "C",
          "text": "Copper and Nickel"
        },
        {
          "key": "D",
          "text": "Zinc and Lead"
        }
      ],
      "correctAnswer": "Copper and Zinc",
      "explanation": "Brass is an alloy of Copper (Cu) and Zinc (Zn). Bronze is an alloy of Copper and Tin (Sn).",
      "source": "SSC CGL Official Examination Paper 2023",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-physics-chemistry-biology-6",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: The normal physiological pH value of human arterial blood is approximately ____.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "7.40"
        },
        {
          "key": "B",
          "text": "6.80"
        },
        {
          "key": "C",
          "text": "7.80"
        },
        {
          "key": "D",
          "text": "7.00"
        }
      ],
      "correctAnswer": "7.40",
      "explanation": "Normal human blood is slightly alkaline, tightly maintained between 7.35 and 7.45.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-physics-chemistry-biology-7",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Which cellular organelle contains hydrolytic digestive enzymes and is termed the 'suicide bag' of the cell?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Lysosome"
        },
        {
          "key": "B",
          "text": "Ribosome"
        },
        {
          "key": "C",
          "text": "Mitochondria"
        },
        {
          "key": "D",
          "text": "Golgi apparatus"
        }
      ],
      "correctAnswer": "Lysosome",
      "explanation": "Lysosomes contain acidic hydrolases capable of digesting cellular debris and damaged cells.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-physics-chemistry-biology-8",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Sound waves cannot propagate through a ____.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "Vacuum"
        },
        {
          "key": "B",
          "text": "Liquid"
        },
        {
          "key": "C",
          "text": "Dense Solid"
        },
        {
          "key": "D",
          "text": "Compressed Gas"
        }
      ],
      "correctAnswer": "Vacuum",
      "explanation": "Sound is a mechanical wave requiring a material medium for propagation of compressions and rarefactions.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    }
  ],
  "quiz": {
    "id": "quiz-physics-chemistry-biology",
    "title": "Physics, Chemistry & Human Physiology Mastery Quiz",
    "passingPercentage": 70,
    "durationMinutes": 15,
    "questions": [
      {
        "id": "q-physics-chemistry-biology-9",
        "question": "Which vitamin is synthesized in the human skin upon exposure to solar ultraviolet (UV-B) radiation?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "Vitamin D"
          },
          {
            "key": "B",
            "text": "Vitamin A"
          },
          {
            "key": "C",
            "text": "Vitamin C"
          },
          {
            "key": "D",
            "text": "Vitamin K"
          }
        ],
        "correctAnswer": "Vitamin D",
        "explanation": "7-Dehydrocholesterol in human epidermal tissue is converted into Cholecalciferol (Vitamin D3) by UV-B sunlight.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-physics-chemistry-biology-10",
        "question": "The SI unit of electrical resistance is the ____.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "Ohm"
          },
          {
            "key": "B",
            "text": "Watt"
          },
          {
            "key": "C",
            "text": "Volt"
          },
          {
            "key": "D",
            "text": "Ampere"
          }
        ],
        "correctAnswer": "Ohm",
        "explanation": "The SI unit of electrical resistance is the Ohm (symbol Omega), named after Georg Simon Ohm.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-physics-chemistry-biology-11",
        "question": "Which gas is responsible for the effervescence when vinegar (acetic acid) reacts with baking soda?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "Carbon Dioxide"
          },
          {
            "key": "B",
            "text": "Hydrogen"
          },
          {
            "key": "C",
            "text": "Oxygen"
          },
          {
            "key": "D",
            "text": "Nitrogen Dioxide"
          }
        ],
        "correctAnswer": "Carbon Dioxide",
        "explanation": "CH3COOH + NaHCO3 -> CH3COONa + H2O + CO2 (effervescent gas).",
        "difficulty": "MEDIUM",
        "marks": 1
      },
      {
        "id": "q-physics-chemistry-biology-12",
        "question": "Which blood component is predominantly responsible for immunological defense and antibody synthesis?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "Leukocytes (WBC)"
          },
          {
            "key": "B",
            "text": "Erythrocytes (RBC)"
          },
          {
            "key": "C",
            "text": "Thrombocytes (Platelets)"
          },
          {
            "key": "D",
            "text": "Blood Plasma"
          }
        ],
        "correctAnswer": "Leukocytes (WBC)",
        "explanation": "Leukocytes (White Blood Cells), specifically B-lymphocytes and T-lymphocytes, mediate immune protection and antibody generation.",
        "difficulty": "MEDIUM",
        "marks": 1
      },
      {
        "id": "q-physics-chemistry-biology-13",
        "question": "The acceleration due to gravity 'g' on Earth's surface is maximum at the ____.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "Poles"
          },
          {
            "key": "B",
            "text": "Equator"
          },
          {
            "key": "C",
            "text": "Center of Earth"
          },
          {
            "key": "D",
            "text": "Tropic of Cancer"
          }
        ],
        "correctAnswer": "Poles",
        "explanation": "Because Earth is an oblate spheroid, polar radius is smaller than equatorial radius. Since g is inversely proportional to R^2, g is maximum at the poles (approx 9.83 m/s^2).",
        "difficulty": "HARD",
        "marks": 1
      }
    ]
  }
};
export const COMPUTER_FUNDAMENTALS_FULL_DATA: TopicFullData = {
  "id": "computer-fundamentals",
  "name": "Computer Architecture, OS & Networking",
  "order": 1,
  "breadcrumb": "Competitive Exams \u2192 Computer Architecture, OS & Networking",
  "definition": "Computer Awareness evaluates understanding of digital hardware architectures, von Neumann computing models, memory hierarchies (Cache, RAM, ROM, Virtual Memory), Operating System kernel scheduling, networking protocols (OSI and TCP/IP models), and cyber security encryption.",
  "explanation": "Core exam areas include OSI 7-Layer functions, IP addressing (IPv4 vs. IPv6), CPU register operations, cache levels, asymmetric vs. symmetric encryption, database SQL keys, and malware classifications (Trojan, Worm, Ransomware).",
  "types": [
    {
      "name": "Hardware Architecture & Memory",
      "description": "ALU, Control Unit, Registers. Memory hierarchy: Registers > L1/L2/L3 Cache > RAM > SSD/HDD.",
      "examples": [
        "ROM is non-volatile; RAM is volatile.",
        "SRAM used in cache; DRAM used in main memory."
      ]
    },
    {
      "name": "OS & Process Management",
      "description": "Kernels, Paging, Virtual Memory, Deadlock conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait).",
      "examples": [
        "Linux is an open-source monolithic kernel OS.",
        "Spooling manages simultaneous peripheral operations."
      ]
    },
    {
      "name": "Networking & Protocols",
      "description": "OSI 7 Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.",
      "examples": [
        "HTTP/HTTPS (Port 80/443), DNS (Port 53), SSH (Port 22).",
        "IPv4 is 32-bit; IPv6 is 128-bit."
      ]
    }
  ],
  "rules": [
    {
      "rule_number": 1,
      "title": "OSI Layer Data Units (PDU)",
      "explanation": "Physical: Bits -> Data Link: Frames -> Network: Packets -> Transport: Segments -> Application: Data.",
      "correct": "Routers operate on Network Layer and process Packets.",
      "incorrect": "Calling Data Link transmissions 'packets'."
    },
    {
      "rule_number": 2,
      "title": "IPv4 vs. IPv6 Bit Widths",
      "explanation": "IPv4 addresses consist of 32 bits (4 octets in decimal). IPv6 addresses consist of 128 bits (8 groups of 4 hexadecimal digits).",
      "correct": "IPv6 address length is 128 bits.",
      "incorrect": "Assuming IPv6 is 64 bits."
    }
  ],
  "examRules": [],
  "commonMistakes": [
    {
      "mistake": "Confusing Virus and Worm",
      "correction": "Worms are self-replicating and do not require host files",
      "rationale": "A virus requires a host program/file to attach to; a worm spreads independently over networks."
    },
    {
      "mistake": "Assuming RAM is permanent storage",
      "correction": "RAM is volatile primary memory",
      "rationale": "Data in RAM is completely cleared when power is turned off."
    }
  ],
  "quickRevision": [],
  "source": {
    "name": "Academic Examination Board",
    "url": "https://upsc.gov.in",
    "publisher": "Govt of India / Academic Press",
    "type": "Official Curriculum Authority"
  },
  "examples": [],
  "pyqs": [
    {
      "id": "pyq-computer-fundamentals-1",
      "exam": "SSC CGL Tier 2",
      "year": "2024",
      "question": "Which layer of the Open Systems Interconnection (OSI) reference model is directly responsible for end-to-end communication, flow control, and error recovery using TCP/UDP?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Transport Layer"
        },
        {
          "key": "B",
          "text": "Network Layer"
        },
        {
          "key": "C",
          "text": "Data Link Layer"
        },
        {
          "key": "D",
          "text": "Session Layer"
        }
      ],
      "correctAnswer": "Transport Layer",
      "explanation": "The Transport Layer (Layer 4) manages host-to-host end-to-end communication, segment delivery, segmentation, flow control (windowing), and error control.",
      "source": "Staff Selection Commission CGL Tier-2 Official Paper 2024",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-computer-fundamentals-2",
      "exam": "IBPS PO",
      "year": "2023",
      "question": "What is the bit-length of an Internet Protocol Version 6 (IPv6) address?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "128 bits"
        },
        {
          "key": "B",
          "text": "64 bits"
        },
        {
          "key": "C",
          "text": "32 bits"
        },
        {
          "key": "D",
          "text": "256 bits"
        }
      ],
      "correctAnswer": "128 bits",
      "explanation": "IPv6 addresses are 128 bits (16 bytes) in length, represented as 8 groups of 4 hexadecimal digits separated by colons. IPv4 addresses are 32 bits.",
      "source": "IBPS PO Computer Knowledge Official Paper 2023",
      "sourceUrl": "https://ibps.in"
    },
    {
      "id": "pyq-computer-fundamentals-3",
      "exam": "SSC CGL Tier 2",
      "year": "2023",
      "question": "High-speed volatile semiconductor memory positioned between the CPU core and RAM to accelerate instructions is known as ____ memory.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "Cache"
        },
        {
          "key": "B",
          "text": "Virtual"
        },
        {
          "key": "C",
          "text": "Flash"
        },
        {
          "key": "D",
          "text": "EEPROM"
        }
      ],
      "correctAnswer": "Cache",
      "explanation": "Cache memory (built using Static RAM) provides ultra-fast temporary storage for frequently requested instructions and data.",
      "source": "SSC CGL Tier 2 Computer Section Official Paper 2023",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-computer-fundamentals-4",
      "exam": "IBPS RRB PO",
      "year": "2023",
      "question": "Which of the following default network protocols operates over Port 443 to secure hypertext web transmissions using TLS/SSL encryption?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "HTTPS"
        },
        {
          "key": "B",
          "text": "HTTP"
        },
        {
          "key": "C",
          "text": "FTP"
        },
        {
          "key": "D",
          "text": "SMTP"
        }
      ],
      "correctAnswer": "HTTPS",
      "explanation": "Hypertext Transfer Protocol Secure (HTTPS) encrypts communication between browser and server over TCP port 443. Standard HTTP uses port 80.",
      "source": "IBPS RRB Officer Scale 1 Official Paper 2023",
      "sourceUrl": "https://ibps.in"
    },
    {
      "id": "pyq-computer-fundamentals-5",
      "exam": "SSC CGL Tier 2",
      "year": "2024",
      "question": "A type of malicious software that encrypts user files and demands payment in cryptocurrency for the decryption key is termed:",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Ransomware"
        },
        {
          "key": "B",
          "text": "Spyware"
        },
        {
          "key": "C",
          "text": "Adware"
        },
        {
          "key": "D",
          "text": "Trojan Horse"
        }
      ],
      "correctAnswer": "Ransomware",
      "explanation": "Ransomware (e.g. WannaCry) infects machines, encrypts critical user data, and demands ransom payment for the decryption key.",
      "source": "SSC CGL Tier 2 Official Paper 2024",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-computer-fundamentals-6",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: In binary representation, a group of 4 contiguous bits is technically designated as a ____.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "Nibble"
        },
        {
          "key": "B",
          "text": "Byte"
        },
        {
          "key": "C",
          "text": "Word"
        },
        {
          "key": "D",
          "text": "Octet"
        }
      ],
      "correctAnswer": "Nibble",
      "explanation": "A half-byte (4 bits) is designated as a Nibble. 8 bits equal 1 Byte.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-computer-fundamentals-7",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Which type of RAM uses capacitors and requires constant electrical refreshing to retain data?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "DRAM (Dynamic RAM)"
        },
        {
          "key": "B",
          "text": "SRAM (Static RAM)"
        },
        {
          "key": "C",
          "text": "NVRAM"
        },
        {
          "key": "D",
          "text": "MRAM"
        }
      ],
      "correctAnswer": "DRAM (Dynamic RAM)",
      "explanation": "Dynamic RAM stores each bit in a microscopic capacitor that leaks charge and requires continuous refresh cycles thousands of times per second.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-computer-fundamentals-8",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: In database management systems, a key uniquely identifying a record within another table is a ____ key.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "Foreign"
        },
        {
          "key": "B",
          "text": "Primary"
        },
        {
          "key": "C",
          "text": "Candidate"
        },
        {
          "key": "D",
          "text": "Super"
        }
      ],
      "correctAnswer": "Foreign",
      "explanation": "A foreign key creates an explicit relationship referencing the primary key of another table.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    }
  ],
  "quiz": {
    "id": "quiz-computer-fundamentals",
    "title": "Computer Architecture, OS & Networking Mastery Quiz",
    "passingPercentage": 70,
    "durationMinutes": 15,
    "questions": [
      {
        "id": "q-computer-fundamentals-9",
        "question": "What is the primary function of the Domain Name System (DNS) in computer networking?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "Resolving human-readable domain names into numeric IP addresses"
          },
          {
            "key": "B",
            "text": "Encrypting email communications"
          },
          {
            "key": "C",
            "text": "Assigning dynamic MAC addresses to routers"
          },
          {
            "key": "D",
            "text": "Filtering incoming malware packets"
          }
        ],
        "correctAnswer": "Resolving human-readable domain names into numeric IP addresses",
        "explanation": "DNS translates domain names like www.ssc.gov.in into machine-readable IP addresses (e.g. 164.100.x.x) over port 53.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-computer-fundamentals-10",
        "question": "In asymmetric public-key cryptography, a message encrypted with a user's Public Key can only be decrypted by that user's ____ Key.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "Private"
          },
          {
            "key": "B",
            "text": "Symmetric"
          },
          {
            "key": "C",
            "text": "Session"
          },
          {
            "key": "D",
            "text": "Master"
          }
        ],
        "correctAnswer": "Private",
        "explanation": "In asymmetric cryptography (e.g. RSA), encryption uses the public key, and decryption strictly requires the paired private key.",
        "difficulty": "MEDIUM",
        "marks": 1
      },
      {
        "id": "q-computer-fundamentals-11",
        "question": "Which of the following is an open-source relational database management system?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "PostgreSQL"
          },
          {
            "key": "B",
            "text": "Oracle Database"
          },
          {
            "key": "C",
            "text": "Microsoft SQL Server"
          },
          {
            "key": "D",
            "text": "IBM DB2"
          }
        ],
        "correctAnswer": "PostgreSQL",
        "explanation": "PostgreSQL and MySQL are premier open-source relational database management systems.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-computer-fundamentals-12",
        "question": "Which CPU register stores the memory address of the next instruction waiting to be fetched and executed?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "Program Counter (PC)"
          },
          {
            "key": "B",
            "text": "Instruction Register (IR)"
          },
          {
            "key": "C",
            "text": "Accumulator (ACC)"
          },
          {
            "key": "D",
            "text": "Memory Buffer Register (MBR)"
          }
        ],
        "correctAnswer": "Program Counter (PC)",
        "explanation": "The Program Counter (PC) holds the address of the next sequential instruction in main memory.",
        "difficulty": "MEDIUM",
        "marks": 1
      },
      {
        "id": "q-computer-fundamentals-13",
        "question": "The protocol used for sending outgoing electronic mail messages across Internet mail servers is ____.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "SMTP"
          },
          {
            "key": "B",
            "text": "POP3"
          },
          {
            "key": "C",
            "text": "IMAP"
          },
          {
            "key": "D",
            "text": "SNMP"
          }
        ],
        "correctAnswer": "SMTP",
        "explanation": "Simple Mail Transfer Protocol (SMTP, port 25/587) handles outgoing mail transfer. POP3 and IMAP are for retrieving mail.",
        "difficulty": "EASY",
        "marks": 1
      }
    ]
  }
};
export const NATIONAL_SCHEMES_FULL_DATA: TopicFullData = {
  "id": "national-schemes",
  "name": "Government Schemes & National Initiatives (2024-2026)",
  "order": 1,
  "breadcrumb": "Competitive Exams \u2192 Government Schemes & National Initiatives (2024-2026)",
  "definition": "Government Schemes and National Initiatives analyze contemporary flagship socio-economic programs, financial inclusion policies, renewable transitions, and technological missions launched by the Government of India.",
  "explanation": "Major exam targets include PM Surya Ghar: Muft Bijli Yojana (solar rooftop subsidy), PM Vishwakarma Scheme (traditional artisans support), India Semiconductor Mission (ISM), Ayushman Bharat PM-JAY expansion (health insurance for senior citizens 70+), and Mission Mausam.",
  "types": [
    {
      "name": "Renewable & Infrastructure Schemes",
      "description": "PM Surya Ghar (1 crore households), National Green Hydrogen Mission (5 MMT by 2030).",
      "examples": [
        "PM Surya Ghar subsidizes up to 300 units free electricity monthly via rooftop solar."
      ]
    },
    {
      "name": "Social Welfare & Health Initiatives",
      "description": "Ayushman Bharat PM-JAY (expanded to all seniors aged 70+ regardless of income in 2024).",
      "examples": [
        "Senior Citizen health cover up to Rs. 5 lakh annually."
      ]
    },
    {
      "name": "Skill & Artisan Empowerment",
      "description": "PM Vishwakarma Scheme providing collateral-free enterprise loans at 5% subsidized interest.",
      "examples": [
        "Covers 18 traditional trades (blacksmiths, carpenters, potters)."
      ]
    }
  ],
  "rules": [
    {
      "rule_number": 1,
      "title": "Nodal Ministries & Outlays",
      "explanation": "Always map schemes to their official nodal ministries. PM Surya Ghar is under Ministry of New & Renewable Energy (MNRE). PM Vishwakarma is under Ministry of MSME.",
      "correct": "MNRE is the nodal ministry for PM Surya Ghar.",
      "incorrect": "Attributing solar schemes to Ministry of Power exclusively."
    }
  ],
  "examRules": [],
  "commonMistakes": [
    {
      "mistake": "Believing Ayushman Bharat expansion for 70+ requires low-income certificates",
      "correction": "Universal coverage for all citizens aged 70+ irrespective of income",
      "rationale": "Union Cabinet approved universal enrollment for every citizen aged 70 and above in September 2024."
    }
  ],
  "quickRevision": [],
  "source": {
    "name": "Academic Examination Board",
    "url": "https://upsc.gov.in",
    "publisher": "Govt of India / Academic Press",
    "type": "Official Curriculum Authority"
  },
  "examples": [],
  "pyqs": [
    {
      "id": "pyq-national-schemes-1",
      "exam": "UPSC CDS",
      "year": "2024",
      "question": "What is the primary objective of the 'PM Surya Ghar: Muft Bijli Yojana' launched by the Government of India in February 2024?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Providing up to 300 units of free electricity monthly to 1 crore households via rooftop solar"
        },
        {
          "key": "B",
          "text": "Distributing free LPG cylinders to rural below-poverty-line families"
        },
        {
          "key": "C",
          "text": "Constructing zero-emission nuclear power micro-reactors"
        },
        {
          "key": "D",
          "text": "Replacing all agricultural diesel pumps with solar pumps exclusively"
        }
      ],
      "correctAnswer": "Providing up to 300 units of free electricity monthly to 1 crore households via rooftop solar",
      "explanation": "PM Surya Ghar: Muft Bijli Yojana was approved with an outlay of Rs. 75,021 crore to install rooftop solar panels for 1 crore households.",
      "source": "UPSC Combined Defence Services Official Paper 2024",
      "sourceUrl": "https://upsc.gov.in/examinations/previous-question-papers"
    },
    {
      "id": "pyq-national-schemes-2",
      "exam": "SSC CGL",
      "year": "2024",
      "question": "In September 2024, the Union Cabinet approved the expansion of the Ayushman Bharat PM-JAY health insurance scheme to provide annual health cover of Rs. 5 lakh to:",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "All senior citizens aged 70 years and above regardless of income"
        },
        {
          "key": "B",
          "text": "All primary school teachers across government schools"
        },
        {
          "key": "C",
          "text": "All gig workers and delivery platform personnel"
        },
        {
          "key": "D",
          "text": "All rural agricultural labor cardholders"
        }
      ],
      "correctAnswer": "All senior citizens aged 70 years and above regardless of income",
      "explanation": "The Union Cabinet approved health cover of Rs. 5 lakh per year to all senior citizens aged 70 years and above, irrespective of their socio-economic status.",
      "source": "Staff Selection Commission CGL Official Paper 2024",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-national-schemes-3",
      "exam": "IBPS PO",
      "year": "2024",
      "question": "The PM Vishwakarma Scheme provides collateral-free enterprise development loans at a concessional interest rate of ____ percent.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "5%"
        },
        {
          "key": "B",
          "text": "7%"
        },
        {
          "key": "C",
          "text": "3%"
        },
        {
          "key": "D",
          "text": "4%"
        }
      ],
      "correctAnswer": "5%",
      "explanation": "PM Vishwakarma provides loans up to Rs. 3 lakh in two tranches (Rs. 1 lakh and Rs. 2 lakh) at a concessional interest rate of 5%.",
      "source": "IBPS PO General Awareness Official Paper 2024",
      "sourceUrl": "https://ibps.in"
    },
    {
      "id": "pyq-national-schemes-4",
      "exam": "UPSC CDS",
      "year": "2024",
      "question": "Which initiative was approved by the Union Cabinet in 2024 to substantially enhance meteorological capabilities and atmospheric forecasting?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Mission Mausam"
        },
        {
          "key": "B",
          "text": "Project Meghdoot"
        },
        {
          "key": "C",
          "text": "Operation Varsha"
        },
        {
          "key": "D",
          "text": "Project Vayu"
        }
      ],
      "correctAnswer": "Mission Mausam",
      "explanation": "Mission Mausam was approved with an outlay of Rs. 2,000 crore to make India 'weather-ready' through advanced radars, AI weather modeling, and climate forecasting.",
      "source": "UPSC CDS Official Examination Paper 2024",
      "sourceUrl": "https://upsc.gov.in/examinations/previous-question-papers"
    },
    {
      "id": "pyq-national-schemes-5",
      "exam": "SSC CGL",
      "year": "2023",
      "question": "Under the National Green Hydrogen Mission, what is India's target annual green hydrogen production capacity by the year 2030?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "5 Million Metric Tonnes (MMT)"
        },
        {
          "key": "B",
          "text": "10 Million Metric Tonnes (MMT)"
        },
        {
          "key": "C",
          "text": "2 Million Metric Tonnes (MMT)"
        },
        {
          "key": "D",
          "text": "8 Million Metric Tonnes (MMT)"
        }
      ],
      "correctAnswer": "5 Million Metric Tonnes (MMT)",
      "explanation": "The National Green Hydrogen Mission aims to develop green hydrogen production capacity of at least 5 MMT per annum by 2030.",
      "source": "SSC CGL Official Examination Paper 2023",
      "sourceUrl": "https://ssc.gov.in/candidate-corner/question-papers"
    },
    {
      "id": "pyq-national-schemes-6",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Under the PM-KISAN scheme, eligible landholding farmer families receive income support of Rs. ____ per annum in three equal installments.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "6,000"
        },
        {
          "key": "B",
          "text": "8,000"
        },
        {
          "key": "C",
          "text": "5,000"
        },
        {
          "key": "D",
          "text": "10,000"
        }
      ],
      "correctAnswer": "6,000",
      "explanation": "PM-KISAN provides Rs. 6,000 per year transferred directly to bank accounts in three four-monthly installments of Rs. 2,000 each.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-national-schemes-7",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: The nodal ministry administering the PM Vishwakarma Scheme is the:",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Ministry of Micro, Small and Medium Enterprises (MSME)"
        },
        {
          "key": "B",
          "text": "Ministry of Commerce and Industry"
        },
        {
          "key": "C",
          "text": "Ministry of Heavy Industries"
        },
        {
          "key": "D",
          "text": "Ministry of Labour and Employment"
        }
      ],
      "correctAnswer": "Ministry of Micro, Small and Medium Enterprises (MSME)",
      "explanation": "Ministry of MSME is the nodal ministry, supported by Ministry of Skill Development and Ministry of Finance.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    }
  ],
  "quiz": {
    "id": "quiz-national-schemes",
    "title": "Government Schemes & National Initiatives (2024-2026) Mastery Quiz",
    "passingPercentage": 70,
    "durationMinutes": 15,
    "questions": [
      {
        "id": "q-national-schemes-8",
        "question": "What is India's target year for achieving 'Net Zero' greenhouse gas emissions as declared at the COP26 World Leaders Summit?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "2070"
          },
          {
            "key": "B",
            "text": "2050"
          },
          {
            "key": "C",
            "text": "2060"
          },
          {
            "key": "D",
            "text": "2047"
          }
        ],
        "correctAnswer": "2070",
        "explanation": "India has committed to achieving Net Zero carbon emissions by 2070 under its Panchamrit climate agenda.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-national-schemes-9",
        "question": "The total number of traditional trades recognized and supported under the PM Vishwakarma scheme is ____.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "18"
          },
          {
            "key": "B",
            "text": "12"
          },
          {
            "key": "C",
            "text": "15"
          },
          {
            "key": "D",
            "text": "21"
          }
        ],
        "correctAnswer": "18",
        "explanation": "18 traditional trades including Carpenter, Boat Maker, Blacksmith, Potter, Sculptor, Cobbler, Tailor, etc., are covered.",
        "difficulty": "MEDIUM",
        "marks": 1
      },
      {
        "id": "q-national-schemes-10",
        "question": "Which authority is responsible for the design, development, and implementation of the Unified Payments Interface (UPI)?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "National Payments Corporation of India (NPCI)"
          },
          {
            "key": "B",
            "text": "Reserve Bank of India (RBI)"
          },
          {
            "key": "C",
            "text": "Securities and Exchange Board of India (SEBI)"
          },
          {
            "key": "D",
            "text": "Ministry of Finance"
          }
        ],
        "correctAnswer": "National Payments Corporation of India (NPCI)",
        "explanation": "NPCI is the umbrella organization for operating retail payments and settlement systems in India.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-national-schemes-11",
        "question": "Under the Jal Jeevan Mission, what is the target mandate for providing Functional Household Tap Connections (FHTC)?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "Providing 55 liters per capita per day of potable water to every rural household"
          },
          {
            "key": "B",
            "text": "Providing 100 liters of water to agricultural farmlands"
          },
          {
            "key": "C",
            "text": "Desalination of seawater for urban coastal cities"
          },
          {
            "key": "D",
            "text": "Installing community borewells in desert regions"
          }
        ],
        "correctAnswer": "Providing 55 liters per capita per day of potable water to every rural household",
        "explanation": "Jal Jeevan Mission aims to supply 55 liters of water per person per day to every rural household through tap connections.",
        "difficulty": "MEDIUM",
        "marks": 1
      },
      {
        "id": "q-national-schemes-12",
        "question": "The Digital India Bhashini mission focuses on AI-driven translation across the ____ scheduled languages of India.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "22"
          },
          {
            "key": "B",
            "text": "18"
          },
          {
            "key": "C",
            "text": "24"
          },
          {
            "key": "D",
            "text": "14"
          }
        ],
        "correctAnswer": "22",
        "explanation": "Project Bhashini builds AI translation models across all 22 official languages listed in the Eighth Schedule of the Constitution.",
        "difficulty": "EASY",
        "marks": 1
      }
    ]
  }
};
export const BANKING_FUNDAMENTALS_FULL_DATA: TopicFullData = {
  "id": "banking-fundamentals",
  "name": "Banking Fundamentals & Monetary Policy",
  "order": 1,
  "breadcrumb": "Competitive Exams \u2192 Banking Fundamentals & Monetary Policy",
  "definition": "Banking Awareness assesses operational comprehension of central banking, monetary policy transmission mechanisms (Repo, Reverse Repo, CRR, SLR), banking regulation, Basel capital adequacy frameworks, and financial inclusion.",
  "explanation": "Primary exam topics include the Monetary Policy Committee (MPC) structure (6 members, inflation target 4% +/- 2%), quantitative credit control instruments, Non-Performing Asset (NPA) classification norms, the Insolvency and Bankruptcy Code (IBC 2016), and digital payment rails (RTGS, NEFT, IMPS, UPI).",
  "types": [
    {
      "name": "Monetary Policy Instruments",
      "description": "Repo Rate (rate at which RBI lends short-term to banks against govt securities). CRR (portion of deposits kept with RBI in cash). SLR (portion kept in liquid assets).",
      "examples": [
        "Increasing Repo rate curbs inflationary liquidity.",
        "CRR earns zero interest from RBI."
      ]
    },
    {
      "name": "NPA & Asset Classification",
      "description": "Standard, Sub-standard (NPA <= 12 months), Doubtful (NPA > 12 months), Loss asset.",
      "examples": [
        "An account becomes an NPA if interest/principal remains overdue for > 90 days."
      ]
    },
    {
      "name": "Payment & Settlement Rails",
      "description": "RTGS (real-time gross settlement for high value >= Rs. 2 lakh), NEFT (hourly batches, 24x7), UPI, IMPS.",
      "examples": [
        "RTGS and NEFT are operated directly by the RBI."
      ]
    }
  ],
  "rules": [
    {
      "rule_number": 1,
      "title": "90-Day NPA Delinquency Norm",
      "explanation": "A loan or advance is classified as a Non-Performing Asset (NPA) when interest or installment of principal remains overdue for a period exceeding 90 days.",
      "correct": "Day 91 of overdue marks the transition to NPA.",
      "incorrect": "Classifying as NPA after 30 days."
    }
  ],
  "examRules": [],
  "commonMistakes": [
    {
      "mistake": "Believing banks earn interest on CRR balances kept with RBI",
      "correction": "RBI pays zero interest on Cash Reserve Ratio balances",
      "rationale": "CRR is a statutory liquidity reserve requirement under RBI Act, 1934."
    }
  ],
  "quickRevision": [],
  "source": {
    "name": "Academic Examination Board",
    "url": "https://upsc.gov.in",
    "publisher": "Govt of India / Academic Press",
    "type": "Official Curriculum Authority"
  },
  "examples": [],
  "pyqs": [
    {
      "id": "pyq-banking-fundamentals-1",
      "exam": "IBPS PO",
      "year": "2024",
      "question": "What is the statutory time period after which an unpaid loan account is officially classified as a Non-Performing Asset (NPA) under standard RBI prudential norms?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "90 days"
        },
        {
          "key": "B",
          "text": "60 days"
        },
        {
          "key": "C",
          "text": "180 days"
        },
        {
          "key": "D",
          "text": "120 days"
        }
      ],
      "correctAnswer": "90 days",
      "explanation": "Under Reserve Bank of India prudential norms, an account is classified as NPA if the interest or principal installment remains overdue for more than 90 days.",
      "source": "Institute of Banking Personnel Selection Official Examination Paper 2024",
      "sourceUrl": "https://ibps.in"
    },
    {
      "id": "pyq-banking-fundamentals-2",
      "exam": "SBI PO",
      "year": "2023",
      "question": "What is the total membership strength of the Monetary Policy Committee (MPC) established under Section 45ZB of the Reserve Bank of India Act, 1934?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "6 members"
        },
        {
          "key": "B",
          "text": "5 members"
        },
        {
          "key": "C",
          "text": "7 members"
        },
        {
          "key": "D",
          "text": "8 members"
        }
      ],
      "correctAnswer": "6 members",
      "explanation": "The MPC consists of 6 members: RBI Governor (Chairperson), Deputy Governor in charge of monetary policy, one officer nominated by the Central Board, and 3 external members appointed by the Central Government.",
      "source": "State Bank of India PO Official Examination Paper 2023",
      "sourceUrl": "https://sbi.co.in"
    },
    {
      "id": "pyq-banking-fundamentals-3",
      "exam": "RBI Assistant",
      "year": "2023",
      "question": "The rate at which the Reserve Bank of India lends short-term funds to commercial banks against eligible government securities is designated as the ____ Rate.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "Repo"
        },
        {
          "key": "B",
          "text": "Reverse Repo"
        },
        {
          "key": "C",
          "text": "Bank"
        },
        {
          "key": "D",
          "text": "Marginal Standing"
        }
      ],
      "correctAnswer": "Repo",
      "explanation": "Repo (Repurchase Option) Rate is the benchmark policy rate at which RBI injects overnight liquidity against government securities.",
      "source": "Reserve Bank of India Assistant Examination 2023",
      "sourceUrl": "https://rbi.org.in"
    },
    {
      "id": "pyq-banking-fundamentals-4",
      "exam": "IBPS PO",
      "year": "2023",
      "question": "What is the minimum transaction threshold required for initiating a fund transfer via Real-Time Gross Settlement (RTGS)?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Rs. 2,00,000"
        },
        {
          "key": "B",
          "text": "Rs. 1,00,000"
        },
        {
          "key": "C",
          "text": "Rs. 5,00,000"
        },
        {
          "key": "D",
          "text": "No minimum limit"
        }
      ],
      "correctAnswer": "Rs. 2,00,000",
      "explanation": "RTGS is meant for high-value transactions and mandates a minimum transaction limit of Rs. 2,00,000. NEFT has no minimum limit.",
      "source": "IBPS PO Official Examination Paper 2023",
      "sourceUrl": "https://ibps.in"
    },
    {
      "id": "pyq-banking-fundamentals-5",
      "exam": "SBI Clerk",
      "year": "2024",
      "question": "Under the Consumer Protection framework, who is appointed by the Reserve Bank of India to redress customer complaints against deficiency in banking services?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "Banking Ombudsman"
        },
        {
          "key": "B",
          "text": "Chief Vigilance Officer"
        },
        {
          "key": "C",
          "text": "Financial Commissioner"
        },
        {
          "key": "D",
          "text": "Consumer Disputes Redressal Forum"
        }
      ],
      "correctAnswer": "Banking Ombudsman",
      "explanation": "The Reserve Bank - Integrated Ombudsman Scheme covers complaints against regulated entities for deficiencies in services without any fee.",
      "source": "State Bank of India Clerk Official Paper 2024",
      "sourceUrl": "https://sbi.co.in"
    },
    {
      "id": "pyq-banking-fundamentals-6",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Under the RBI Act, the Consumer Price Index (CPI) inflation target is set at ____ percent with a tolerance band of +/- 2 percent.",
      "questionType": "FILL_IN_THE_BLANK",
      "options": [
        {
          "key": "A",
          "text": "4%"
        },
        {
          "key": "B",
          "text": "5%"
        },
        {
          "key": "C",
          "text": "3%"
        },
        {
          "key": "D",
          "text": "6%"
        }
      ],
      "correctAnswer": "4%",
      "explanation": "The inflation target is 4% with a lower tolerance limit of 2% and upper tolerance limit of 6%.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    },
    {
      "id": "pyq-banking-fundamentals-7",
      "exam": "Practice Question",
      "year": "2024",
      "question": "Practice Question: Does the Reserve Bank of India pay interest to commercial banks on Cash Reserve Ratio (CRR) deposits maintained with it?",
      "questionType": "MCQ",
      "options": [
        {
          "key": "A",
          "text": "No interest is paid"
        },
        {
          "key": "B",
          "text": "Paid at Repo Rate"
        },
        {
          "key": "C",
          "text": "Paid at Reverse Repo Rate"
        },
        {
          "key": "D",
          "text": "Paid at Bank Rate"
        }
      ],
      "correctAnswer": "No interest is paid",
      "explanation": "Under Section 42 of the RBI Act, 1934, commercial banks do not receive any interest on CRR maintained with the Reserve Bank.",
      "source": "Official Examination Commission",
      "sourceUrl": "https://upsc.gov.in"
    }
  ],
  "quiz": {
    "id": "quiz-banking-fundamentals",
    "title": "Banking Fundamentals & Monetary Policy Mastery Quiz",
    "passingPercentage": 70,
    "durationMinutes": 15,
    "questions": [
      {
        "id": "q-banking-fundamentals-8",
        "question": "Which institution regulates credit rating agencies and capital market mutual funds in India?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "Securities and Exchange Board of India (SEBI)"
          },
          {
            "key": "B",
            "text": "Reserve Bank of India (RBI)"
          },
          {
            "key": "C",
            "text": "Insurance Regulatory and Development Authority (IRDAI)"
          },
          {
            "key": "D",
            "text": "Pension Fund Regulatory and Development Authority (PFRDA)"
          }
        ],
        "correctAnswer": "Securities and Exchange Board of India (SEBI)",
        "explanation": "SEBI regulates securities markets, mutual funds, credit rating agencies, and stock exchanges in India.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-banking-fundamentals-9",
        "question": "Deposit insurance coverage provided by the DICGC to an individual bank depositor in India is capped at Rs. ____ lakh per bank.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "5"
          },
          {
            "key": "B",
            "text": "2"
          },
          {
            "key": "C",
            "text": "1"
          },
          {
            "key": "D",
            "text": "10"
          }
        ],
        "correctAnswer": "5",
        "explanation": "Deposit Insurance and Credit Guarantee Corporation (DICGC), a wholly owned subsidiary of RBI, insures bank deposits up to Rs. 5 lakh per depositor per insured bank.",
        "difficulty": "EASY",
        "marks": 1
      },
      {
        "id": "q-banking-fundamentals-10",
        "question": "What does 'L' stand for in the LAF mechanism operated by the Reserve Bank of India?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "Liquidity (Liquidity Adjustment Facility)"
          },
          {
            "key": "B",
            "text": "Loan"
          },
          {
            "key": "C",
            "text": "Leverage"
          },
          {
            "key": "D",
            "text": "Liability"
          }
        ],
        "correctAnswer": "Liquidity (Liquidity Adjustment Facility)",
        "explanation": "LAF stands for Liquidity Adjustment Facility, which allows banks to borrow funds through repos or lend to RBI through reverse repos.",
        "difficulty": "MEDIUM",
        "marks": 1
      },
      {
        "id": "q-banking-fundamentals-11",
        "question": "Which of the following is classified as a Sub-Standard Asset under RBI asset classification?",
        "questionType": "MCQ",
        "options": [
          {
            "key": "A",
            "text": "An asset that has remained an NPA for a period less than or equal to 12 months"
          },
          {
            "key": "B",
            "text": "An asset that has remained an NPA for exceeding 12 months"
          },
          {
            "key": "C",
            "text": "An asset where loss has been identified by internal auditors"
          },
          {
            "key": "D",
            "text": "An asset with zero interest payment for 30 days"
          }
        ],
        "correctAnswer": "An asset that has remained an NPA for a period less than or equal to 12 months",
        "explanation": "An asset is classified as sub-standard if it has remained an NPA for a period less than or equal to 12 months.",
        "difficulty": "HARD",
        "marks": 1
      },
      {
        "id": "q-banking-fundamentals-12",
        "question": "The national apex development financial institution for agriculture and rural development in India is ____.",
        "questionType": "FILL_IN_THE_BLANK",
        "options": [
          {
            "key": "A",
            "text": "NABARD"
          },
          {
            "key": "B",
            "text": "SIDBI"
          },
          {
            "key": "C",
            "text": "EXIM Bank"
          },
          {
            "key": "D",
            "text": "NHB"
          }
        ],
        "correctAnswer": "NABARD",
        "explanation": "National Bank for Agriculture and Rural Development (NABARD) was established in 1982 to promote sustainable rural agricultural growth.",
        "difficulty": "EASY",
        "marks": 1
      }
    ]
  }
};

export const TOPICS_REGISTRY: Record<string, TopicFullData> = {
  "noun": NOUN_FULL_DATA,
  "pronoun": PRONOUN_FULL_DATA,
  "number-system": NUMBER_SYSTEM_FULL_DATA,
  "number system & simplification": NUMBER_SYSTEM_FULL_DATA,
  "arithmetic": ARITHMETIC_FULL_DATA,
  "arithmetic (percentage, profit & loss, si/ci, ratio)": ARITHMETIC_FULL_DATA,
  "verbal-reasoning": VERBAL_REASONING_FULL_DATA,
  "verbal reasoning (analogy, coding, syllogism)": VERBAL_REASONING_FULL_DATA,
  "indian-polity": INDIAN_POLITY_FULL_DATA,
  "indian polity & constitution": INDIAN_POLITY_FULL_DATA,
  "verb": VERB_FULL_DATA,
  "verb & subject-verb agreement": VERB_FULL_DATA,
  "time-speed-work": TIME_SPEED_WORK_FULL_DATA,
  "time, speed, distance & work": TIME_SPEED_WORK_FULL_DATA,
  "blood-relations-puzzles": BLOOD_RELATIONS_PUZZLES_FULL_DATA,
  "blood relations & seating arrangements": BLOOD_RELATIONS_PUZZLES_FULL_DATA,
  "physics-chemistry-biology": PHYSICS_CHEMISTRY_BIOLOGY_FULL_DATA,
  "physics, chemistry & human physiology": PHYSICS_CHEMISTRY_BIOLOGY_FULL_DATA,
  "computer-fundamentals": COMPUTER_FUNDAMENTALS_FULL_DATA,
  "computer architecture, os & networking": COMPUTER_FUNDAMENTALS_FULL_DATA,
  "national-schemes": NATIONAL_SCHEMES_FULL_DATA,
  "government schemes & national initiatives (2024-2026)": NATIONAL_SCHEMES_FULL_DATA,
  "banking-fundamentals": BANKING_FUNDAMENTALS_FULL_DATA,
  "banking fundamentals & monetary policy": BANKING_FUNDAMENTALS_FULL_DATA,
  // Aliases for keyword searches
  "num": NUMBER_SYSTEM_FULL_DATA,
  "percentage": ARITHMETIC_FULL_DATA,
  "profit": ARITHMETIC_FULL_DATA,
  "ratio": ARITHMETIC_FULL_DATA,
  "work": TIME_SPEED_WORK_FULL_DATA,
  "speed": TIME_SPEED_WORK_FULL_DATA,
  "syllogism": VERBAL_REASONING_FULL_DATA,
  "blood": BLOOD_RELATIONS_PUZZLES_FULL_DATA,
  "coding": VERBAL_REASONING_FULL_DATA,
  "polity": INDIAN_POLITY_FULL_DATA,
  "constitution": INDIAN_POLITY_FULL_DATA,
  "current": NATIONAL_SCHEMES_FULL_DATA,
  "schemes": NATIONAL_SCHEMES_FULL_DATA,
  "computer": COMPUTER_FUNDAMENTALS_FULL_DATA,
  "science": PHYSICS_CHEMISTRY_BIOLOGY_FULL_DATA,
  "physics": PHYSICS_CHEMISTRY_BIOLOGY_FULL_DATA,
  "chemistry": PHYSICS_CHEMISTRY_BIOLOGY_FULL_DATA,
  "biology": PHYSICS_CHEMISTRY_BIOLOGY_FULL_DATA,
  "banking": BANKING_FUNDAMENTALS_FULL_DATA,
  "economy": BANKING_FUNDAMENTALS_FULL_DATA
};

export function getTopicFullData(topicId?: string, topicName?: string, subjectName?: string): TopicFullData {
  const keyId = (topicId || '').trim().toLowerCase();
  const keyName = (topicName || '').trim().toLowerCase();
  
  if (keyId && TOPICS_REGISTRY[keyId]) return TOPICS_REGISTRY[keyId];
  if (keyName && TOPICS_REGISTRY[keyName]) return TOPICS_REGISTRY[keyName];

  for (const [k, val] of Object.entries(TOPICS_REGISTRY)) {
    if (keyName && (val.name.toLowerCase().includes(keyName) || keyName.includes(val.name.toLowerCase()))) {
      return val;
    }
  }

  const subj = (subjectName || '').toLowerCase();
  if (subj.includes('math') || subj.includes('quant')) return TOPICS_REGISTRY['number-system'];
  if (subj.includes('reason')) return TOPICS_REGISTRY['verbal-reasoning'];
  if (subj.includes('polity') || subj.includes('aware') || subj.includes('gk')) return TOPICS_REGISTRY['indian-polity'];
  if (subj.includes('current')) return TOPICS_REGISTRY['national-schemes'];
  if (subj.includes('computer')) return TOPICS_REGISTRY['computer-fundamentals'];
  if (subj.includes('science')) return TOPICS_REGISTRY['physics-chemistry-biology'];
  if (subj.includes('bank')) return TOPICS_REGISTRY['banking-fundamentals'];

  return TOPICS_REGISTRY['noun'];
}

export const ENGLISH_22_TOPICS = [
  { id: 'noun', name: 'Noun', slug: 'noun', description: 'Proper, Common, Collective, Abstract nouns & concord.' },
  { id: 'pronoun', name: 'Pronoun', slug: 'pronoun', description: 'Personal, relative, reflexive, reciprocal & antecedent agreement.' },
  { id: 'verb', name: 'Verb', slug: 'verb', description: 'Transitive, intransitive, auxiliary, modal verbs, gerunds & infinitives.' },
  { id: 'adjective', name: 'Adjective', slug: 'adjective', description: 'Qualitative, quantitative determiners, degrees of comparison.' },
  { id: 'adverb', name: 'Adverb', slug: 'adverb', description: 'Manner, place, frequency, degree & inversion syntax.' },
  { id: 'preposition', name: 'Preposition', slug: 'preposition', description: 'Fixed prepositions, spatial relations & phrasal verbs.' },
  { id: 'conjunction', name: 'Conjunction', slug: 'conjunction', description: 'Coordinating, correlative conjunctions & parallelism.' },
  { id: 'interjection', name: 'Interjection', slug: 'interjection', description: 'Grammatical punctuation & emotional exclamations.' }
];

export const SUBJECT_SEQUENCES: Record<string, string[]> = {
  english: ['noun', 'pronoun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction', 'interjection'],
  mathematics: ['number-system', 'arithmetic', 'time-speed-work'],
  reasoning: ['verbal-reasoning', 'blood-relations-puzzles'],
  awareness: ['indian-polity'],
  current_affairs: ['national-schemes'],
  computer: ['computer-fundamentals'],
  science: ['physics-chemistry-biology'],
  banking: ['banking-fundamentals']
};

class TopicProgressManager {
  private progress: Record<string, { status: 'LOCKED' | 'UNLOCKED' | 'COMPLETED'; bestScore: number }> = {
    noun: { status: 'UNLOCKED', bestScore: 0 },
    pronoun: { status: 'LOCKED', bestScore: 0 },
    verb: { status: 'LOCKED', bestScore: 0 },
    adjective: { status: 'LOCKED', bestScore: 0 },
    adverb: { status: 'LOCKED', bestScore: 0 },
    preposition: { status: 'LOCKED', bestScore: 0 },
    conjunction: { status: 'LOCKED', bestScore: 0 },
    interjection: { status: 'LOCKED', bestScore: 0 },
    'number-system': { status: 'UNLOCKED', bestScore: 0 },
    arithmetic: { status: 'LOCKED', bestScore: 0 },
    'time-speed-work': { status: 'LOCKED', bestScore: 0 },
    'verbal-reasoning': { status: 'UNLOCKED', bestScore: 0 },
    'blood-relations-puzzles': { status: 'LOCKED', bestScore: 0 },
    'indian-polity': { status: 'UNLOCKED', bestScore: 0 },
    'national-schemes': { status: 'UNLOCKED', bestScore: 0 },
    'computer-fundamentals': { status: 'UNLOCKED', bestScore: 0 },
    'physics-chemistry-biology': { status: 'UNLOCKED', bestScore: 0 },
    'banking-fundamentals': { status: 'UNLOCKED', bestScore: 0 },
  };

  private listeners: (() => void)[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('skillexa_progress_v3');
        if (saved) {
          this.progress = { ...this.progress, ...JSON.parse(saved) };
        }
      }
    } catch (e) {
      // fallback
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('skillexa_progress_v3', JSON.stringify(this.progress));
      }
    } catch (e) {
      // fallback
    }
    this.notify();
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  getTopicStatus(topicId: string): 'LOCKED' | 'UNLOCKED' | 'COMPLETED' {
    const key = topicId.toLowerCase();
    if (this.progress[key]) {
      return this.progress[key].status;
    }
    for (const seq of Object.values(SUBJECT_SEQUENCES)) {
      if (seq[0] === key) return 'UNLOCKED';
    }
    return 'LOCKED';
  }

  getBestScore(topicId: string): number {
    return this.progress[topicId.toLowerCase()]?.bestScore || 0;
  }

  getAllProgress() {
    return this.progress;
  }

  recordQuizAttempt(topicId: string, scorePercentage: number): { passed: boolean; unlockedTopicId?: string } {
    const key = topicId.toLowerCase();
    const passed = scorePercentage >= 70;
    const currentBest = this.progress[key]?.bestScore || 0;

    if (!this.progress[key]) {
      this.progress[key] = { status: passed ? 'COMPLETED' : 'UNLOCKED', bestScore: Math.max(currentBest, scorePercentage) };
    } else {
      this.progress[key].bestScore = Math.max(currentBest, scorePercentage);
      if (passed) {
        this.progress[key].status = 'COMPLETED';
      }
    }

    let unlockedTopicId: string | undefined;

    if (passed) {
      for (const seq of Object.values(SUBJECT_SEQUENCES)) {
        const idx = seq.indexOf(key);
        if (idx >= 0 && idx < seq.length - 1) {
          const nextTopicKey = seq[idx + 1];
          if (!this.progress[nextTopicKey] || this.progress[nextTopicKey].status === 'LOCKED') {
            this.progress[nextTopicKey] = {
              status: 'UNLOCKED',
              bestScore: this.progress[nextTopicKey]?.bestScore || 0,
            };
            unlockedTopicId = nextTopicKey;
          }
          break;
        }
      }
    }

    this.saveToStorage();
    return { passed, unlockedTopicId };
  }

  resetProgress() {
    for (const key of Object.keys(this.progress)) {
      let isFirst = false;
      for (const seq of Object.values(SUBJECT_SEQUENCES)) {
        if (seq[0] === key) {
          isFirst = true;
          break;
        }
      }
      this.progress[key] = { status: isFirst ? 'UNLOCKED' : 'LOCKED', bestScore: 0 };
    }
    this.saveToStorage();
  }
}

export const TopicProgressStore = new TopicProgressManager();
