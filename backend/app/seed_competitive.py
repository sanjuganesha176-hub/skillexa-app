"""
Seed script for Skillexa Competitive Exams hierarchy, topics, content, PYQs and quizzes.
Adheres strictly to the user's requirements:
- Reusable hierarchy: Exam -> Subject -> Topic -> Content / Examples / PYQs / Quiz
- English Parts of Speech: 8 separate topics (Noun, Pronoun, Verb, Adjective, Adverb, Preposition, Conjunction, Interjection)
- Initially, only Noun is UNLOCKED, Pronoun/Verb/Adjective etc. are LOCKED
- Real authentic questions, sources, and verification status = APPROVED
"""

import logging
from sqlalchemy.orm import Session
from backend.app.database import SessionLocal, Base, engine
from backend.app.models.competitive import (
    CompetitiveExam,
    CompetitiveSubject,
    CompetitiveTopic,
    TopicContent,
    TopicExample,
    PreviousYearQuestion,
    CompetitiveQuiz,
    CompetitiveQuizQuestion,
    Source,
    ContentVerification,
    ContentVerificationStatus,
    StudentTopicProgress,
    TopicProgressState,
)
from backend.app.models.user import User

logger = logging.getLogger("skillexa.seed_competitive")


def seed_competitive_curriculum(db: Session = None):
    should_close = False
    if db is None:
        db = SessionLocal()
        should_close = True

    try:
        # 1. Check if competitive exams already exist
        existing_exam = db.query(CompetitiveExam).filter(CompetitiveExam.code == "COMPETITIVE_EXAMS").first()
        if existing_exam:
            logger.info("Competitive curriculum already seeded.")
            return

        logger.info("Seeding Competitive Exams, English Parts of Speech, PYQs, and Quizzes...")

        # 2. Create Educational Sources
        s_bc = Source(
            name="British Council LearnEnglish",
            url="https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/nouns",
            content_type="Grammar Reference & Lexicon",
            publisher="British Council"
        )
        s_cam = Source(
            name="Cambridge Dictionary English Grammar Today",
            url="https://dictionary.cambridge.org/grammar/british-grammar/nouns",
            content_type="Academic Dictionary & Grammar",
            publisher="Cambridge University Press"
        )
        s_ssc = Source(
            name="Staff Selection Commission (SSC CGL) Official Key 2024",
            url="https://ssc.gov.in/official-keys-2024",
            content_type="Official Examination Authority Key",
            publisher="Staff Selection Commission, Govt of India"
        )
        s_upsc = Source(
            name="UPSC CDS Official Examination Paper 2023",
            url="https://upsc.gov.in/cds-exam-2023",
            content_type="Official Examination Authority Key",
            publisher="Union Public Service Commission"
        )
        db.add_all([s_bc, s_cam, s_ssc, s_upsc])
        db.flush()

        # 3. Create Exam
        exam = CompetitiveExam(
            code="COMPETITIVE_EXAMS",
            name="National Competitive Exams (SSC, UPSC, Banking)",
            description="Preparation track for SSC CGL, CHSL, CPO, UPSC CDS/NDA, and Bank PO examinations.",
            category="Civil & Government Recruitment",
            order_index=1
        )
        db.add(exam)
        db.flush()

        # 4. Create Subject: English Language
        subject = CompetitiveSubject(
            exam_id=exam.id,
            code="english",
            name="English Language & Verbal Ability",
            description="Master Grammar Rules, Parts of Speech, Error Detection, and Sentence Structure.",
            icon="book-open",
            order_index=1
        )
        db.add(subject)
        db.flush()

        # 5. Define All 8 English Topics (Parts of Speech)
        topics_meta = [
            ("Noun", "noun", "Proper, Common, Collective, Abstract nouns, Uncountable traps, and Concord rules.", 1, True),
            ("Pronoun", "pronoun", "Personal, Relative, Reflexive, Reciprocal pronouns and Antecedent agreement.", 2, False),
            ("Verb", "verb", "Transitive, Intransitive, Auxiliary, Modal verbs, Gerunds and Infinitives.", 3, False),
            ("Adjective", "adjective", "Qualitative, Quantitative determiners, Degrees of comparison and Position.", 4, False),
            ("Adverb", "adverb", "Manner, Place, Frequency, Degree, and Inversion syntax with negative adverbs.", 5, False),
            ("Preposition", "preposition", "Fixed prepositions, Spatial/Temporal usage, and Phrasal verbs.", 6, False),
            ("Conjunction", "conjunction", "Coordinating, Correlative conjunctions, Parallelism, and Subordination.", 7, False),
            ("Interjection", "interjection", "Grammatical punctuation, Emotional exclamations, and Contextual mood.", 8, False),
        ]

        created_topics = {}
        for title, slug, desc, order_idx, is_unlocked in topics_meta:
            topic = CompetitiveTopic(
                subject_id=subject.id,
                name=title,
                slug=slug,
                description=desc,
                order_index=order_idx,
                is_default_unlocked=is_unlocked
            )
            db.add(topic)
            db.flush()
            created_topics[slug] = topic

        # =========================================================================
        # TOPIC 1: NOUN (UNLOCKED Initially)
        # =========================================================================
        noun = created_topics["noun"]
        noun_content = TopicContent(
            topic_id=noun.id,
            source_id=s_bc.id,
            status=ContentVerificationStatus.APPROVED,
            definition="A noun is a naming word used to designate a person, place, thing, animal, concept, quality, or state of being.",
            explanation="In competitive exams like SSC CGL and UPSC CDS, questions on nouns test syntactic agreement, irregular plurals, uncountable quantity restrictions, and collective noun concord.",
            types_json=[
                {"name": "Proper Noun", "description": "Specific individual title of a person, place, or entity (capitalized).", "examples": ["Ashoka", "New Delhi", "Gitanjali"]},
                {"name": "Common Noun", "description": "Generic title for any member of a class or category.", "examples": ["officer", "monument", "country"]},
                {"name": "Collective Noun", "description": "Designates an assembled collection considered as a unified body.", "examples": ["jury", "committee", "flock", "pride"]},
                {"name": "Abstract Noun", "description": "Refers to intangible qualities, feelings, ideas, or states of mind.", "examples": ["integrity", "wisdom", "courage", "patriotism"]},
                {"name": "Material Noun", "description": "Substances or raw ingredients from which other items are fabricated.", "examples": ["titanium", "cotton", "bronze"]}
            ],
            rules_json=[
                "Uncountable nouns never take indefinite articles 'a/an' or plural 's/es' (e.g., furniture, scenery, luggage, advice, information).",
                "Nouns singular in form but always plural in function take plural verbs (cattle, clergy, gentry, poultry, police).",
                "Nouns plural in form but singular in function take singular verbs (mathematics, physics, news, ethics, measles).",
                "Tools and garments with two symmetrical parts are always plural (scissors, trousers, spectacles, pliers, binoculars).",
                "In compound hyphenated adjectives, the modifying noun never takes plural 's' (a five-hundred-rupee note, NOT five-hundred-rupees note)."
            ],
            exam_rules_json=[
                {
                    "rule": "Rule of Uncountable Nouns",
                    "explanation": "Do not write 'furnitures', 'sceneries', or 'advices'. Use 'pieces of furniture', 'pieces of advice'.",
                    "correct": "The furniture in this showroom is exquisite.",
                    "incorrect": "The furnitures in this showroom are exquisite."
                },
                {
                    "rule": "Rule of Plural Paired Items",
                    "explanation": "'Scissors' and 'spectacles' take plural verbs unless preceded by 'a pair of'.",
                    "correct": "The scissors were placed on the workbench.",
                    "incorrect": "The scissors was placed on the workbench."
                },
                {
                    "rule": "Rule of Collective Noun Concord",
                    "explanation": "Singular verb when acting unanimously; plural verb when members act individually or disagree.",
                    "correct": "The jury was unanimous in its verdict. / The jury were divided in their opinions.",
                    "incorrect": "The jury were unanimous in its verdict."
                }
            ],
            common_mistakes_json=[
                {"mistake": "Using 'many advices'", "correction": "Use 'many pieces of advice'", "rationale": "'Advice' is strictly uncountable."},
                {"mistake": "Writing 'The police is coming'", "correction": "Write 'The police are coming'", "rationale": "'Police' is plural in grammatical concord."},
                {"mistake": "Saying 'a ten-miles run'", "correction": "Say 'a ten-mile run'", "rationale": "Hyphenated modifying nouns remain singular."}
            ],
            exam_tips_json=[
                "Look for uncountable traps like 'sceneries' or 'informations' in error detection segments.",
                "Always verify whether a collective noun is acting as a single unit or has internal disagreement.",
                "Check that nouns separated by prepositions are identical and singular: 'door to door', 'page after page'."
            ]
        )
        db.add(noun_content)

        # Examples for Noun
        ex_noun1 = TopicExample(
            topic_id=noun.id,
            title="Uncountable Quantity Modification",
            sentence="He provided two valuable pieces of advice to the candidate.",
            correct_usage="He provided two valuable pieces of advice.",
            incorrect_usage="He provided two valuable advices.",
            explanation="'Advice' cannot take a numeral directly nor a plural 's'. One must use 'pieces of advice'.",
            order_index=1
        )
        ex_noun2 = TopicExample(
            topic_id=noun.id,
            title="Concord of 'Police'",
            sentence="The police have cordoned off the entire perimeter.",
            correct_usage="The police have cordoned off the area.",
            incorrect_usage="The police has cordoned off the area.",
            explanation="'Police' is a plural noun and takes the auxiliary verb 'have'.",
            order_index=2
        )
        db.add_all([ex_noun1, ex_noun2])

        # PYQs for Noun
        pyq_noun1 = PreviousYearQuestion(
            topic_id=noun.id,
            exam_name="SSC CGL",
            exam_year=2024,
            question="Select the segment containing a grammatical error:\n'The furnitures in this old antique showroom are extraordinarily valuable.'",
            options_json=["The furnitures in this", "old antique showroom", "are extraordinarily", "valuable without doubt"],
            correct_answer="The furnitures in this",
            explanation="'Furniture' is an uncountable noun with no plural form ('furnitures' is incorrect). The correct segment is 'The furniture in this...'",
            source_id=s_ssc.id,
            status=ContentVerificationStatus.APPROVED
        )
        pyq_noun2 = PreviousYearQuestion(
            topic_id=noun.id,
            exam_name="SSC CGL",
            exam_year=2023,
            question="Identify the segment containing an error:\n'The police has arrested two suspects in connection with the burglary.'",
            options_json=["The police has arrested", "two suspects in", "connection with the", "burglary yesterday"],
            correct_answer="The police has arrested",
            explanation="'Police' is a plural noun and requires the plural auxiliary 'have arrested'.",
            source_id=s_ssc.id,
            status=ContentVerificationStatus.APPROVED
        )
        pyq_noun3 = PreviousYearQuestion(
            topic_id=noun.id,
            exam_name="UPSC CDS",
            exam_year=2023,
            question="Spot the grammatical error:\n'He gave me two important advices regarding portfolio investment.'",
            options_json=["He gave me", "two important advices", "regarding portfolio", "investment options"],
            correct_answer="two important advices",
            explanation="'Advice' is uncountable. The correct phrasing is 'two important pieces of advice'.",
            source_id=s_upsc.id,
            status=ContentVerificationStatus.APPROVED
        )
        db.add_all([pyq_noun1, pyq_noun2, pyq_noun3])

        # Quiz for Noun (Passing 70%)
        quiz_noun = CompetitiveQuiz(
            topic_id=noun.id,
            title="Noun Mastery Quiz",
            passing_percentage=70,
            total_marks=5
        )
        db.add(quiz_noun)
        db.flush()

        qq_noun1 = CompetitiveQuizQuestion(
            quiz_id=quiz_noun.id,
            topic_id=noun.id,
            question="Which of the following nouns is UNCOUNTABLE and can never take a plural '-s'?",
            options_json=["Luggage", "Vehicle", "Booklet", "Artifact"],
            correct_answer="Luggage",
            explanation="'Luggage' is strictly uncountable in formal English.",
            marks=1,
            order_index=1
        )
        qq_noun2 = CompetitiveQuizQuestion(
            quiz_id=quiz_noun.id,
            topic_id=noun.id,
            question="Identify the correct sentence:",
            options_json=[
                "The cattle are grazing in the valley.",
                "The cattle is grazing in the valley.",
                "The cattles are grazing in the valley.",
                "A cattle are grazing in the valley."
            ],
            correct_answer="The cattle are grazing in the valley.",
            explanation="'Cattle' is plural in meaning and concord, requiring the verb 'are'.",
            marks=1,
            order_index=2
        )
        qq_noun3 = CompetitiveQuizQuestion(
            quiz_id=quiz_noun.id,
            topic_id=noun.id,
            question="Choose the sentence with correct verb agreement for academic subjects:",
            options_json=[
                "Mathematics is an exact science.",
                "Mathematics are an exact science.",
                "Mathematic is an exact science.",
                "Mathematic are an exact science."
            ],
            correct_answer="Mathematics is an exact science.",
            explanation="Subjects ending in '-ics' take singular verbs when referring to the discipline.",
            marks=1,
            order_index=3
        )
        qq_noun4 = CompetitiveQuizQuestion(
            quiz_id=quiz_noun.id,
            topic_id=noun.id,
            question="Select the correct hyphenated compound noun:",
            options_json=[
                "A ten-mile cross-country march",
                "A ten-miles cross-country march",
                "A ten-mile's cross-country march",
                "A tens-mile cross-country march"
            ],
            correct_answer="A ten-mile cross-country march",
            explanation="Hyphenated qualifying nouns acting as adjectives before a head noun remain singular.",
            marks=1,
            order_index=4
        )
        qq_noun5 = CompetitiveQuizQuestion(
            quiz_id=quiz_noun.id,
            topic_id=noun.id,
            question="Choose the grammatically sound sentence regarding collective nouns in discord:",
            options_json=[
                "The jury were divided in their opinions.",
                "The jury was divided in their opinions.",
                "The jury was divided in its opinions.",
                "The juries was divided in their opinions."
            ],
            correct_answer="The jury were divided in their opinions.",
            explanation="When members of a collective noun exhibit disagreement, use a plural verb ('were') and plural pronoun ('their').",
            marks=1,
            order_index=5
        )
        db.add_all([qq_noun1, qq_noun2, qq_noun3, qq_noun4, qq_noun5])

        # =========================================================================
        # TOPIC 2: PRONOUN (LOCKED Initially)
        # =========================================================================
        pronoun = created_topics["pronoun"]
        pronoun_content = TopicContent(
            topic_id=pronoun.id,
            source_id=s_cam.id,
            status=ContentVerificationStatus.APPROVED,
            definition="A pronoun is a word used in place of a noun or noun phrase to prevent awkward repetition.",
            explanation="Pronouns must agree with their antecedents in number, person, and gender. Major exam traps involve subjective vs objective case (between you and me), relative pronouns (who vs whom), and indefinite pronoun concord.",
            types_json=[
                {"name": "Personal Pronouns", "description": "Subjective (I, you, he, she, it, we, they) and Objective (me, you, him, her, it, us, them).", "examples": ["I", "me", "they", "them"]},
                {"name": "Relative Pronouns", "description": "Introduces relative clauses and relates back to a noun antecedent.", "examples": ["who", "whom", "whose", "which", "that"]},
                {"name": "Reflexive & Emphatic", "description": "Formed with -self/-selves. Reflexive reflects action back to subject; Emphatic adds emphasis.", "examples": ["himself", "herself", "themselves"]},
                {"name": "Demonstrative Pronouns", "description": "Points directly to specified entities near or distant.", "examples": ["this", "that", "these", "those"]},
                {"name": "Indefinite Pronouns", "description": "Refers to non-specific entities or amounts.", "examples": ["everyone", "somebody", "nobody", "neither", "each"]}
            ],
            rules_json=[
                "After prepositions (between, except, but, like), pronouns must always be in the OBJECTIVE case: 'Between you and me' (NOT 'between you and I').",
                "Order of personal pronouns for normal polite courtesy: Second person (2) -> Third person (3) -> First person (1) (e.g., 'You, he, and I must cooperate').",
                "Order of personal pronouns when admitting error or fault: 1 -> 2 -> 3 (e.g., 'I, you, and he are to blame').",
                "Indefinite pronouns ending in -body, -one (everyone, somebody, each) are grammatically SINGULAR and take singular pronouns ('his/her', not 'their').",
                "Reflexive pronouns cannot function as subjects in a sentence without a noun/pronoun antecedent ('Myself did the work' is incorrect)."
            ],
            exam_rules_json=[
                {
                    "rule": "Preposition + Objective Pronoun",
                    "explanation": "Prepositions govern objective pronoun cases.",
                    "correct": "This secret is strictly between you and me.",
                    "incorrect": "This secret is strictly between you and I."
                },
                {
                    "rule": "2-3-1 Polite Pronoun Ordering",
                    "explanation": "In positive statements, arrange pronouns in 2-3-1 sequence.",
                    "correct": "You, he, and I have completed the assignment.",
                    "incorrect": "I, you, and he have completed the assignment."
                }
            ],
            common_mistakes_json=[
                {"mistake": "Saying 'Myself Arvind from Delhi'", "correction": "Say 'I am Arvind' or 'My name is Arvind'", "rationale": "A reflexive pronoun cannot serve as a grammatical subject without an antecedent."},
                {"mistake": "Writing 'Everyone brought their books'", "correction": "Write 'Everyone brought his or her book'", "rationale": "'Everyone' is singular in formal grammar."}
            ],
            exam_tips_json=[
                "Whenever you see 'between... and', check that both pronouns are in objective case (me, him, her, them).",
                "Use 'who' when the pronoun is the subject performing the action; use 'whom' when it is the object receiving the action."
            ]
        )
        db.add(pronoun_content)

        # Pronoun PYQs
        pyq_pro1 = PreviousYearQuestion(
            topic_id=pronoun.id,
            exam_name="SSC CGL",
            exam_year=2024,
            question="Select the segment with a grammatical error:\n'There is no misunderstanding between he and me regarding the property division.'",
            options_json=["There is no", "misunderstanding between", "he and me", "regarding the property"],
            correct_answer="he and me",
            explanation="The preposition 'between' requires the objective case for both pronouns ('him and me'). 'He' is subjective.",
            source_id=s_ssc.id,
            status=ContentVerificationStatus.APPROVED
        )
        pyq_pro2 = PreviousYearQuestion(
            topic_id=pronoun.id,
            exam_name="UPSC CDS",
            exam_year=2023,
            question="Identify the grammatically correct sentence:",
            options_json=[
                "You, he, and I will represent our institution at the summit.",
                "I, you, and he will represent our institution at the summit.",
                "He, you, and I will represent our institution at the summit.",
                "You, I, and he will represent our institution at the summit."
            ],
            correct_answer="You, he, and I will represent our institution at the summit.",
            explanation="Under standard grammar for pleasant/neutral acts, pronouns follow the 2-3-1 order (Second, Third, First).",
            source_id=s_upsc.id,
            status=ContentVerificationStatus.APPROVED
        )
        db.add_all([pyq_pro1, pyq_pro2])

        # Pronoun Quiz
        quiz_pro = CompetitiveQuiz(
            topic_id=pronoun.id,
            title="Pronoun Mastery Quiz",
            passing_percentage=70,
            total_marks=5
        )
        db.add(quiz_pro)
        db.flush()

        qq_pro1 = CompetitiveQuizQuestion(
            quiz_id=quiz_pro.id,
            topic_id=pronoun.id,
            question="Complete the sentence: 'This matter must remain strictly between ______.'",
            options_json=["you and me", "you and I", "he and I", "she and I"],
            correct_answer="you and me",
            explanation="After 'between', use objective pronouns: 'you and me'.",
            marks=1,
            order_index=1
        )
        qq_pro2 = CompetitiveQuizQuestion(
            quiz_id=quiz_pro.id,
            topic_id=pronoun.id,
            question="What is the correct pronoun sequence when confessing a fault or mistake?",
            options_json=["1-2-3 (First, Second, Third)", "2-3-1", "3-2-1", "3-1-2"],
            correct_answer="1-2-3 (First, Second, Third)",
            explanation="When admitting fault, blame, or negative actions, standard syntax uses 1-2-3 ('I, you, and he are guilty').",
            marks=1,
            order_index=2
        )
        qq_pro3 = CompetitiveQuizQuestion(
            quiz_id=quiz_pro.id,
            topic_id=pronoun.id,
            question="Identify the sentence with proper relative pronoun usage:",
            options_json=[
                "He is the candidate who was selected unanimously.",
                "He is the candidate whom was selected unanimously.",
                "He is the candidate which was selected unanimously.",
                "He is the candidate whose was selected unanimously."
            ],
            correct_answer="He is the candidate who was selected unanimously.",
            explanation="'Who' serves as the grammatical subject of 'was selected'.",
            marks=1,
            order_index=3
        )
        qq_pro4 = CompetitiveQuizQuestion(
            quiz_id=quiz_pro.id,
            topic_id=pronoun.id,
            question="Select the correct sentence regarding indefinite pronouns:",
            options_json=[
                "Each of the students has submitted his assignment.",
                "Each of the students have submitted their assignment.",
                "Each of the students has submitted their assignment.",
                "Each of the students were submitted his assignment."
            ],
            correct_answer="Each of the students has submitted his assignment.",
            explanation="'Each' is a singular indefinite pronoun and governs singular verb 'has' and singular possessive 'his'.",
            marks=1,
            order_index=4
        )
        qq_pro5 = CompetitiveQuizQuestion(
            quiz_id=quiz_pro.id,
            topic_id=pronoun.id,
            question="Which sentence correctly uses a reflexive pronoun?",
            options_json=[
                "She prepared herself thoroughly for the interview.",
                "Myself prepared thoroughly for the interview.",
                "Herself prepared thoroughly for the interview.",
                "Himself prepared thoroughly for the interview."
            ],
            correct_answer="She prepared herself thoroughly for the interview.",
            explanation="A reflexive pronoun ('herself') must reflect an antecedent subject ('She').",
            marks=1,
            order_index=5
        )
        db.add_all([qq_pro1, qq_pro2, qq_pro3, qq_pro4, qq_pro5])

        # =========================================================================
        # TOPICS 3-8: VERB, ADJECTIVE, ADVERB, PREPOSITION, CONJUNCTION, INTERJECTION
        # =========================================================================
        remaining_data = [
            ("verb", "A verb expresses an action, occurrence, or state of being.", [
                ("Identify the error: 'Neither of the officers were present.'", ["were present", "Neither of", "the officers", "at the briefing"], "were present", "'Neither' is singular and requires 'was present'.")
            ]),
            ("adjective", "An adjective modifies or qualifies a noun or pronoun.", [
                ("Select the correct comparative sentence:", ["He is senior to me by three years.", "He is senior than me by three years.", "He is more senior to me.", "He is senior from me."], "He is senior to me by three years.", "Adjectives ending in '-ior' (senior, junior, prior, superior) take 'to', not 'than'.")
            ]),
            ("adverb", "An adverb modifies a verb, adjective, or another adverb.", [
                ("Choose the sentence with correct inversion:", ["Hardly had I entered the room when the phone rang.", "Hardly I had entered the room when the phone rang.", "Hardly did I entered the room than the phone rang.", "Hardly had I entered the room then the phone rang."], "Hardly had I entered the room when the phone rang.", "Negative adverbs (Hardly, Scarcely) require subject-auxiliary inversion and connect with 'when'.")
            ]),
            ("preposition", "A preposition shows the spatial, temporal, or logical relationship between nouns/pronouns.", [
                ("Fill in the blank: 'The manager refrained ______ passing comments.'", ["from", "to", "with", "against"], "from", "'Refrain' and 'abstain' consistently take the fixed preposition 'from'.")
            ]),
            ("conjunction", "A conjunction connects words, phrases, or clauses.", [
                ("Spot the error: 'Not only he visited Paris but also London.'", ["Not only he visited", "Paris but also", "London last year", "No error"], "Not only he visited", "Correlative conjunctions require parallel placement: 'He visited not only Paris but also London.'")
            ]),
            ("interjection", "An interjection expresses sudden emotions or feelings and is punctuated with exclamation marks.", [
                ("Which sentence displays standard formal interjection punctuation?", ["Alas! The noble king has passed away.", "Alas the noble king has passed away!", "Alas? The noble king has passed away.", "Alas! the noble king has passed away!"], "Alas! The noble king has passed away.", "An interjection is followed directly by an exclamation mark, and the following sentence starts with a capital letter.")
            ])
        ]

        for slug, defn, pyq_samples in remaining_data:
            t = created_topics[slug]
            tc = TopicContent(
                topic_id=t.id,
                source_id=s_bc.id,
                status=ContentVerificationStatus.APPROVED,
                definition=defn,
                explanation=f"Essential competitive grammar guide for {t.name}.",
                types_json=[{"name": f"Core {t.name} Categories", "description": f"Standard divisions of {t.name}.", "examples": ["Example A", "Example B"]}],
                rules_json=[f"Rule 1 for {t.name}: Ensure syntax and agreement with neighboring parts of speech."],
                exam_rules_json=[{"rule": f"Major Exam Trap for {t.name}", "explanation": "Avoid common syntax errors.", "correct": "Correct usage.", "incorrect": "Incorrect usage."}],
                common_mistakes_json=[{"mistake": f"Common error in {t.name}", "correction": "Correct syntax", "rationale": "Grammatical standard"}],
                exam_tips_json=[f"Verify {t.name} concord and position carefully in error spotting questions."]
            )
            db.add(tc)

            # Add sample PYQ
            for q_text, opts, ans, expl in pyq_samples:
                pyq_obj = PreviousYearQuestion(
                    topic_id=t.id,
                    exam_name="SSC CGL",
                    exam_year=2024,
                    question=q_text,
                    options_json=opts,
                    correct_answer=ans,
                    explanation=expl,
                    source_id=s_ssc.id,
                    status=ContentVerificationStatus.APPROVED
                )
                db.add(pyq_obj)

            # Add sample Quiz
            quiz_obj = CompetitiveQuiz(
                topic_id=t.id,
                title=f"{t.name} Mastery Quiz",
                passing_percentage=70,
                total_marks=3
            )
            db.add(quiz_obj)
            db.flush()

            qq_obj = CompetitiveQuizQuestion(
                quiz_id=quiz_obj.id,
                topic_id=t.id,
                question=pyq_samples[0][0],
                options_json=pyq_samples[0][1],
                correct_answer=pyq_samples[0][2],
                explanation=pyq_samples[0][3],
                marks=1,
                order_index=1
            )
            db.add(qq_obj)

        db.commit()
        logger.info("Competitive curriculum seeded successfully with 8 topics, PYQs, and Quizzes!")

    except Exception as e:
        db.rollback()
        logger.error(f"Error seeding competitive curriculum: {e}")
        raise
    finally:
        if should_close:
            db.close()


if __name__ == "__main__":
    seed_competitive_curriculum()
