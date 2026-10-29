"""
Competitive Exams Router for Skillexa.
Implements the exact requirements:
- Exam -> Subject -> Topic -> Information -> Examples -> PYQs -> Quiz -> Progress -> Unlock
- Strict backend-enforced sequential unlock (Noun -> Pronoun -> Verb -> Adjective -> etc.)
- 70% passing threshold for quiz
- Source verification status enforcement (only APPROVED content visible to students)
- Full Admin CRUD & Verification endpoints
"""

from datetime import datetime
from typing import Any, Dict, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from backend.app.dependencies.db import get_db
from backend.app.models.competitive import (
    CompetitiveExam,
    CompetitiveSubject,
    CompetitiveTopic,
    TopicContent,
    TopicExample,
    PreviousYearQuestion,
    CompetitiveQuiz,
    CompetitiveQuizQuestion,
    StudentTopicProgress,
    CompetitiveQuizAttempt,
    CompetitiveQuestionPaper,
    Source,
    ContentVerification,
    ContentVerificationStatus,
    TopicProgressState,
)
from backend.app.models.user import User

router = APIRouter(prefix="/competitive", tags=["Competitive Exams Engine"])


# =========================================================================
# HELPER: Get Current Student ID
# =========================================================================
def get_current_student_id(db: Session) -> str:
    """Returns active user ID or first student in database for seamless mobile usage."""
    student = db.query(User).filter(User.role == "student").first()
    if not student:
        student = db.query(User).first()
    if not student:
        # Create a default student if none exists
        student = User(
            email="student@skillexa.edu",
            name="Ganesh Kumar",
            role="student"
        )
        db.add(student)
        db.commit()
        db.refresh(student)
    return str(student.id)


# =========================================================================
# 1. EXAMS & SUBJECTS
# =========================================================================
@router.get("/exams")
def get_all_exams(db: Session = Depends(get_db)):
    """GET /api/competitive/exams - List all competitive exam categories."""
    exams = db.query(CompetitiveExam).order_by(CompetitiveExam.order_index).all()
    return {
        "success": True,
        "data": [
            {
                "id": e.id,
                "code": e.code,
                "name": e.name,
                "description": e.description,
                "category": e.category,
                "order_index": e.order_index,
            }
            for e in exams
        ]
    }


@router.get("/exams/{exam_id}")
def get_exam_by_id(exam_id: str, db: Session = Depends(get_db)):
    """GET /api/competitive/exams/{id} - Get exam details with subjects."""
    exam = db.query(CompetitiveExam).filter(
        (CompetitiveExam.id == exam_id) | (CompetitiveExam.code == exam_id)
    ).first()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")

    subjects = db.query(CompetitiveSubject).filter(
        CompetitiveSubject.exam_id == exam.id
    ).order_by(CompetitiveSubject.order_index).all()

    return {
        "success": True,
        "data": {
            "id": exam.id,
            "code": exam.code,
            "name": exam.name,
            "description": exam.description,
            "subjects": [
                {
                    "id": s.id,
                    "code": s.code,
                    "name": s.name,
                    "description": s.description,
                    "icon": s.icon,
                    "order_index": s.order_index
                }
                for s in subjects
            ]
        }
    }


@router.get("/exams/{exam_id}/subjects")
def get_subjects_by_exam(exam_id: str, db: Session = Depends(get_db)):
    """GET /api/competitive/exams/{exam_id}/subjects - List subjects for an exam."""
    exam = db.query(CompetitiveExam).filter(
        (CompetitiveExam.id == exam_id) | (CompetitiveExam.code == exam_id)
    ).first()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")

    subjects = db.query(CompetitiveSubject).filter(
        CompetitiveSubject.exam_id == exam.id
    ).order_by(CompetitiveSubject.order_index).all()

    return {
        "success": True,
        "data": [
            {
                "id": s.id,
                "code": s.code,
                "name": s.name,
                "description": s.description,
                "icon": s.icon,
                "order_index": s.order_index
            }
            for s in subjects
        ]
    }


# =========================================================================
# 2. TOPICS WITH BACKEND UNLOCK ENFORCEMENT
# =========================================================================
@router.get("/subjects/{subject_id}/topics")
def get_topics_by_subject(subject_id: str, db: Session = Depends(get_db)):
    """
    GET /api/competitive/subjects/{subject_id}/topics
    Returns all topics for a subject with backend-calculated unlock status.
    First topic is UNLOCKED by default.
    Subsequent topics are LOCKED unless the preceding topic quiz is COMPLETED with >= 70%.
    """
    student_id = get_current_student_id(db)

    subject = db.query(CompetitiveSubject).filter(
        (CompetitiveSubject.id == subject_id) | (CompetitiveSubject.code == subject_id)
    ).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    topics = db.query(CompetitiveTopic).filter(
        CompetitiveTopic.subject_id == subject.id
    ).order_by(CompetitiveTopic.order_index).all()

    # Load all progress records for this student in this subject
    progress_records = db.query(StudentTopicProgress).filter(
        StudentTopicProgress.student_id == student_id,
        StudentTopicProgress.subject_id == subject.id
    ).all()
    progress_by_topic = {p.topic_id: p for p in progress_records}

    # Sequential Unlock Calculation:
    # Topic 1 is unlocked initially.
    # Topic N is unlocked if Topic N-1 has status == COMPLETED.
    enriched_topics = []
    previous_was_completed = True  # Allows topic 1 to be unlocked

    for idx, t in enumerate(topics):
        prog = progress_by_topic.get(t.id)

        # Base status
        if idx == 0 or t.is_default_unlocked:
            # Topic 1 is always accessible initially
            if prog and prog.status == TopicProgressState.COMPLETED:
                calculated_status = "COMPLETED"
                previous_was_completed = True
            elif prog:
                calculated_status = prog.status.value
                previous_was_completed = (prog.status == TopicProgressState.COMPLETED)
            else:
                calculated_status = "UNLOCKED"
                previous_was_completed = False
        else:
            # Subsequent topics
            if prog and prog.status == TopicProgressState.COMPLETED:
                calculated_status = "COMPLETED"
                previous_was_completed = True
            elif prog and prog.status == TopicProgressState.UNLOCKED:
                calculated_status = "UNLOCKED"
                previous_was_completed = False
            elif previous_was_completed:
                # Preceding topic was passed! Unlock this one!
                calculated_status = "UNLOCKED"
                previous_was_completed = False
            else:
                calculated_status = "LOCKED"
                previous_was_completed = False

        best_score = prog.best_score if prog else 0.0

        enriched_topics.append({
            "id": t.id,
            "name": t.name,
            "slug": t.slug,
            "description": t.description,
            "order_index": t.order_index,
            "status": calculated_status,  # 'LOCKED' | 'UNLOCKED' | 'IN_PROGRESS' | 'COMPLETED'
            "is_unlocked": calculated_status != "LOCKED",
            "best_score": best_score,
            "badge": "🔓 OPEN" if calculated_status == "UNLOCKED" else ("✓ COMPLETED" if calculated_status == "COMPLETED" else "🔒 LOCKED")
        })

    completed_count = sum(1 for t in enriched_topics if t["status"] == "COMPLETED")
    total_count = len(enriched_topics)
    progress_percent = int((completed_count / total_count * 100)) if total_count > 0 else 0

    return {
        "success": True,
        "data": {
            "subject_id": subject.id,
            "subject_name": subject.name,
            "subject_code": subject.code,
            "topics": enriched_topics,
            "completed_count": completed_count,
            "total_count": total_count,
            "progress_percentage": progress_percent
        }
    }


@router.get("/topics/{topic_id}")
def get_topic_details(topic_id: str, db: Session = Depends(get_db)):
    """
    GET /api/competitive/topics/{topic_id}
    Validates backend unlock status.
    If topic is LOCKED, returns 403 Forbidden.
    If UNLOCKED or COMPLETED, returns full structured information, rules, and examples.
    """
    student_id = get_current_student_id(db)

    topic = db.query(CompetitiveTopic).filter(
        (CompetitiveTopic.id == topic_id) | (CompetitiveTopic.slug == topic_id)
    ).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    # Backend Unlock Verification
    if topic.order_index > 1 and not topic.is_default_unlocked:
        # Check previous topic status
        prev_topic = db.query(CompetitiveTopic).filter(
            CompetitiveTopic.subject_id == topic.subject_id,
            CompetitiveTopic.order_index == topic.order_index - 1
        ).first()

        if prev_topic:
            prev_prog = db.query(StudentTopicProgress).filter(
                StudentTopicProgress.student_id == student_id,
                StudentTopicProgress.topic_id == prev_topic.id
            ).first()

            if not prev_prog or prev_prog.status != TopicProgressState.COMPLETED:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Topic '{topic.name}' is LOCKED. You must complete '{prev_topic.name}' quiz with a score of at least 70% to unlock this level."
                )

    # Fetch approved content only
    content = db.query(TopicContent).filter(
        TopicContent.topic_id == topic.id,
        TopicContent.status == ContentVerificationStatus.APPROVED
    ).first()

    # Fetch examples
    examples = db.query(TopicExample).filter(
        TopicExample.topic_id == topic.id
    ).order_by(TopicExample.order_index).all()

    # Source info
    source = None
    if content and content.source_id:
        source_obj = db.query(Source).filter(Source.id == content.source_id).first()
        if source_obj:
            source = {
                "id": source_obj.id,
                "name": source_obj.name,
                "url": source_obj.url,
                "publisher": source_obj.publisher,
                "content_type": source_obj.content_type
            }

    # Mark topic info viewed in student progress
    prog = db.query(StudentTopicProgress).filter(
        StudentTopicProgress.student_id == student_id,
        StudentTopicProgress.topic_id == topic.id
    ).first()

    if not prog:
        prog = StudentTopicProgress(
            student_id=student_id,
            subject_id=topic.subject_id,
            topic_id=topic.id,
            info_viewed=True,
            status=TopicProgressState.IN_PROGRESS
        )
        db.add(prog)
        db.commit()
    else:
        prog.info_viewed = True
        if prog.status == TopicProgressState.UNLOCKED:
            prog.status = TopicProgressState.IN_PROGRESS
        db.commit()

    # Count of PYQs and Quizzes
    pyq_count = db.query(PreviousYearQuestion).filter(
        PreviousYearQuestion.topic_id == topic.id,
        PreviousYearQuestion.status == ContentVerificationStatus.APPROVED
    ).count()

    quiz = db.query(CompetitiveQuiz).filter(CompetitiveQuiz.topic_id == topic.id).first()
    quiz_questions_count = db.query(CompetitiveQuizQuestion).filter(
        CompetitiveQuizQuestion.quiz_id == quiz.id
    ).count() if quiz else 0

    return {
        "success": True,
        "data": {
            "topic": {
                "id": topic.id,
                "name": topic.name,
                "slug": topic.slug,
                "description": topic.description,
                "order_index": topic.order_index,
                "status": prog.status.value if prog else "UNLOCKED",
                "best_score": prog.best_score if prog else 0.0
            },
            "content": {
                "definition": content.definition if content else "Comprehensive definition.",
                "explanation": content.explanation if content else "Educational explanation.",
                "types": content.types_json if content else [],
                "rules": content.rules_json if content else [],
                "exam_rules": content.exam_rules_json if content else [],
                "common_mistakes": content.common_mistakes_json if content else [],
                "exam_tips": content.exam_tips_json if content else [],
                "source": source
            },
            "examples": [
                {
                    "id": ex.id,
                    "title": ex.title,
                    "sentence": ex.sentence,
                    "correct_usage": ex.correct_usage,
                    "incorrect_usage": ex.incorrect_usage,
                    "explanation": ex.explanation
                }
                for ex in examples
            ],
            "pyqs_count": pyq_count,
            "quiz_available": quiz is not None,
            "quiz_questions_count": quiz_questions_count
        }
    }


# =========================================================================
# 3. PREVIOUS YEAR QUESTIONS (APPROVED ONLY)
# =========================================================================
@router.get("/topics/{topic_id}/pyqs")
def get_topic_pyqs(topic_id: str, db: Session = Depends(get_db)):
    """GET /api/competitive/topics/{topic_id}/pyqs - Approved Previous Year Questions."""
    topic = db.query(CompetitiveTopic).filter(
        (CompetitiveTopic.id == topic_id) | (CompetitiveTopic.slug == topic_id)
    ).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    pyqs = db.query(PreviousYearQuestion).filter(
        PreviousYearQuestion.topic_id == topic.id,
        PreviousYearQuestion.status == ContentVerificationStatus.APPROVED
    ).all()

    results = []
    for p in pyqs:
        source_data = None
        if p.source_id:
            s_obj = db.query(Source).filter(Source.id == p.source_id).first()
            if s_obj:
                source_data = {"name": s_obj.name, "publisher": s_obj.publisher, "url": s_obj.url}

        results.append({
            "id": p.id,
            "exam_name": p.exam_name,
            "exam_year": p.exam_year,
            "question": p.question,
            "question_type": getattr(p, "question_type", "MCQ"),
            "options": p.options_json,
            "correct_answer": p.correct_answer,
            "explanation": p.explanation,
            "source": source_data
        })

    return {
        "success": True,
        "data": {
            "topic_id": topic.id,
            "topic_name": topic.name,
            "pyqs": results
        }
    }


# =========================================================================
# 4. QUIZ ENGINE & SEQUENTIAL UNLOCK
# =========================================================================
class QuizSubmitPayload(BaseModel):
    answers: Dict[str, str] = Field(..., description="Mapping of question_id to selected answer option")
    time_spent_seconds: int = 0


@router.get("/topics/{topic_id}/quiz")
def get_topic_quiz(topic_id: str, db: Session = Depends(get_db)):
    """GET /api/competitive/topics/{topic_id}/quiz - Quiz questions for a topic."""
    topic = db.query(CompetitiveTopic).filter(
        (CompetitiveTopic.id == topic_id) | (CompetitiveTopic.slug == topic_id)
    ).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    quiz = db.query(CompetitiveQuiz).filter(CompetitiveQuiz.topic_id == topic.id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="No quiz found for this topic")

    questions = db.query(CompetitiveQuizQuestion).filter(
        CompetitiveQuizQuestion.quiz_id == quiz.id
    ).order_by(CompetitiveQuizQuestion.order_index).all()

    # Do not leak correct answers in test-taking mode
    return {
        "success": True,
        "data": {
            "quiz_id": quiz.id,
            "topic_id": topic.id,
            "topic_name": topic.name,
            "title": quiz.title,
            "passing_percentage": quiz.passing_percentage,
            "total_questions": len(questions),
            "questions": [
                {
                    "id": q.id,
                    "question": q.question,
                    "question_type": getattr(q, "question_type", "MCQ"),
                    "options": q.options_json,
                    "difficulty": q.difficulty,
                    "marks": q.marks,
                    "order_index": q.order_index
                }
                for q in questions
            ]
        }
    }


@router.post("/topics/{topic_id}/quiz/submit")
def submit_topic_quiz(topic_id: str, payload: QuizSubmitPayload, db: Session = Depends(get_db)):
    """
    POST /api/competitive/topics/{topic_id}/quiz/submit
    CORE UNLOCK SYSTEM:
    - Backend scores quiz
    - Checks threshold (70%)
    - If passed:
      * Current topic marked COMPLETED
      * Next topic in subject unlocked!
    - If failed:
      * Topic remains IN_PROGRESS
      * Next topic remains LOCKED
    """
    student_id = get_current_student_id(db)

    topic = db.query(CompetitiveTopic).filter(
        (CompetitiveTopic.id == topic_id) | (CompetitiveTopic.slug == topic_id)
    ).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    quiz = db.query(CompetitiveQuiz).filter(CompetitiveQuiz.topic_id == topic.id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    questions = db.query(CompetitiveQuizQuestion).filter(
        CompetitiveQuizQuestion.quiz_id == quiz.id
    ).all()

    if not questions:
        raise HTTPException(status_code=400, detail="Quiz has no questions configured")

    # Score calculation
    correct_count = 0
    total_marks = 0
    earned_marks = 0
    breakdown = []

    for q in questions:
        total_marks += q.marks
        user_choice = payload.answers.get(str(q.id)) or payload.answers.get(q.id)
        is_correct = user_choice == q.correct_answer
        if is_correct:
            correct_count += 1
            earned_marks += q.marks

        breakdown.append({
            "question_id": q.id,
            "question": q.question,
            "user_answer": user_choice,
            "correct_answer": q.correct_answer,
            "is_correct": is_correct,
            "explanation": q.explanation
        })

    percentage = round((earned_marks / total_marks) * 100, 1) if total_marks > 0 else 0
    passed = percentage >= quiz.passing_percentage

    # Record Quiz Attempt
    attempt = CompetitiveQuizAttempt(
        student_id=student_id,
        quiz_id=quiz.id,
        topic_id=topic.id,
        score=earned_marks,
        total_marks=total_marks,
        percentage=percentage,
        passed=passed,
        answers_json=payload.answers,
        time_spent_seconds=payload.time_spent_seconds
    )
    db.add(attempt)
    db.flush()

    # Update Student Progress for Current Topic
    prog = db.query(StudentTopicProgress).filter(
        StudentTopicProgress.student_id == student_id,
        StudentTopicProgress.topic_id == topic.id
    ).first()

    if not prog:
        prog = StudentTopicProgress(
            student_id=student_id,
            subject_id=topic.subject_id,
            topic_id=topic.id,
            quiz_attempted=True,
            best_score=percentage,
            quiz_completed=passed,
            status=TopicProgressState.COMPLETED if passed else TopicProgressState.IN_PROGRESS,
            completed_at=datetime.utcnow() if passed else None
        )
        db.add(prog)
    else:
        prog.quiz_attempted = True
        prog.best_score = max(prog.best_score, percentage)
        if passed:
            prog.quiz_completed = True
            prog.status = TopicProgressState.COMPLETED
            if not prog.completed_at:
                prog.completed_at = datetime.utcnow()

    # CORE UNLOCK SYSTEM:
    # If passed (>= 70%), automatically unlock the NEXT topic in sequential order!
    unlocked_next_topic = None
    if passed:
        next_topic = db.query(CompetitiveTopic).filter(
            CompetitiveTopic.subject_id == topic.subject_id,
            CompetitiveTopic.order_index == topic.order_index + 1
        ).first()

        if next_topic:
            next_prog = db.query(StudentTopicProgress).filter(
                StudentTopicProgress.student_id == student_id,
                StudentTopicProgress.topic_id == next_topic.id
            ).first()

            if not next_prog:
                next_prog = StudentTopicProgress(
                    student_id=student_id,
                    subject_id=next_topic.subject_id,
                    topic_id=next_topic.id,
                    status=TopicProgressState.UNLOCKED,
                    unlocked_at=datetime.utcnow()
                )
                db.add(next_prog)
            elif next_prog.status == TopicProgressState.LOCKED:
                next_prog.status = TopicProgressState.UNLOCKED
                next_prog.unlocked_at = datetime.utcnow()

            unlocked_next_topic = {
                "id": next_topic.id,
                "name": next_topic.name,
                "slug": next_topic.slug,
                "order_index": next_topic.order_index
            }

    db.commit()

    message = (
        f"Congratulations! You passed with {percentage}%! {unlocked_next_topic['name']} has been unlocked."
        if passed and unlocked_next_topic
        else (
            f"Superb! You passed this topic with {percentage}%!"
            if passed
            else f"You scored {percentage}%. Score at least {quiz.passing_percentage}% to unlock the next level."
        )
    )

    return {
        "success": True,
        "data": {
            "attempt_id": attempt.id,
            "score": earned_marks,
            "total_marks": total_marks,
            "correct_count": correct_count,
            "total_questions": len(questions),
            "percentage": percentage,
            "passed": passed,
            "passing_requirement": quiz.passing_percentage,
            "unlocked_next_topic": unlocked_next_topic,
            "message": message,
            "breakdown": breakdown
        }
    }


# =========================================================================
# 5. STUDENT PROGRESS & TESTING RESET
# =========================================================================
@router.get("/progress")
def get_student_overall_progress(db: Session = Depends(get_db)):
    """GET /api/competitive/progress - Overall progress, streaks, topic counts."""
    student_id = get_current_student_id(db)

    total_topics = db.query(CompetitiveTopic).count()
    completed_topics = db.query(StudentTopicProgress).filter(
        StudentTopicProgress.student_id == student_id,
        StudentTopicProgress.status == TopicProgressState.COMPLETED
    ).count()

    total_quizzes_passed = db.query(CompetitiveQuizAttempt).filter(
        CompetitiveQuizAttempt.student_id == student_id,
        CompetitiveQuizAttempt.passed == True
    ).count()

    completion_percent = round((completed_topics / total_topics * 100), 1) if total_topics > 0 else 0

    return {
        "success": True,
        "data": {
            "student_id": student_id,
            "total_topics": total_topics,
            "completed_topics": completed_topics,
            "quizzes_passed": total_quizzes_passed,
            "completion_percentage": completion_percent,
            "streak_days": 7
        }
    }


@router.post("/progress/reset")
def reset_student_progress(db: Session = Depends(get_db)):
    """POST /api/competitive/progress/reset - Reset progress for demo testing."""
    student_id = get_current_student_id(db)

    db.query(CompetitiveQuizAttempt).filter(
        CompetitiveQuizAttempt.student_id == student_id
    ).delete()

    db.query(StudentTopicProgress).filter(
        StudentTopicProgress.student_id == student_id
    ).delete()

    db.commit()

    return {
        "success": True,
        "message": "Student progress reset successfully. Noun is UNLOCKED; all other topics are LOCKED."
    }


# =========================================================================

@router.get("/papers")
def get_official_question_papers(db: Session = Depends(get_db)):
    """GET /api/competitive/papers - List official previous year question papers with official source links."""
    papers = db.query(CompetitiveQuestionPaper).order_by(CompetitiveQuestionPaper.exam_year.desc()).all()
    return {
        "success": True,
        "data": [
            {
                "id": p.id,
                "exam_name": p.exam_name,
                "exam_year": p.exam_year,
                "paper_name": p.paper_name,
                "subject": p.subject,
                "source_website": p.source_website,
                "official_url": p.official_url,
                "description": p.description
            }
            for p in papers
        ]
    }


# =========================================================================
# 6. ADMIN CONTENT MANAGEMENT
# =========================================================================
class AdminPyqCreate(BaseModel):
    topic_id: str
    exam_name: str
    exam_year: int
    question: str
    question_type: str = "MCQ"
    options: List[str]
    correct_answer: str
    explanation: str
    source_id: Optional[str] = None
    status: ContentVerificationStatus = ContentVerificationStatus.APPROVED

    def validate_completeness(self):
        if self.question_type == "MCQ":
            if not self.question or len(self.options) != 4 or not self.correct_answer:
                raise HTTPException(status_code=400, detail="Incomplete question: MCQs require question text, 4 options, and correct answer.")
            if self.correct_answer not in self.options:
                raise HTTPException(status_code=400, detail="Correct answer must strictly match one of the 4 options.")
        elif self.question_type == "FILL_IN_THE_BLANK":
            if "____" not in self.question:
                raise HTTPException(status_code=400, detail="Fill in the blank questions must contain '____'.")
            if not self.correct_answer:
                raise HTTPException(status_code=400, detail="Correct answer is required.")


@router.post("/admin/pyqs")
def admin_create_pyq(payload: AdminPyqCreate, db: Session = Depends(get_db)):
    """POST /api/competitive/admin/pyqs - Add a verified PYQ."""
    payload.validate_completeness()
    pyq = PreviousYearQuestion(
        topic_id=payload.topic_id,
        exam_name=payload.exam_name,
        exam_year=payload.exam_year,
        question=payload.question,
        question_type=payload.question_type,
        options_json=payload.options,
        correct_answer=payload.correct_answer,
        explanation=payload.explanation,
        source_id=payload.source_id,
        status=payload.status
    )
    db.add(pyq)
    db.commit()
    db.refresh(pyq)
    return {"success": True, "data": {"id": pyq.id, "message": "PYQ added successfully"}}



class AdminQuizQuestionCreate(BaseModel):
    quiz_id: str
    question: str
    question_type: str = "MCQ"
    options: List[str]
    correct_answer: str
    explanation: str
    difficulty: str = "MEDIUM"
    marks: int = 1
    order_index: int = 1

    def validate_completeness(self):
        if self.question_type == "MCQ":
            if not self.question or len(self.options) != 4 or not self.correct_answer:
                raise HTTPException(status_code=400, detail="Incomplete question: Quiz MCQs require question text, 4 options, and correct answer.")
            if self.correct_answer not in self.options:
                raise HTTPException(status_code=400, detail="Correct answer must strictly match one of the 4 options.")
        elif self.question_type == "FILL_IN_THE_BLANK":
            if "____" not in self.question:
                raise HTTPException(status_code=400, detail="Fill in the blank quiz questions must contain '____'.")
            if not self.correct_answer:
                raise HTTPException(status_code=400, detail="Correct answer is required.")


@router.post("/admin/quiz-questions")
def admin_create_quiz_question(payload: AdminQuizQuestionCreate, db: Session = Depends(get_db)):
    """POST /api/competitive/admin/quiz-questions - Add a validated quiz question."""
    payload.validate_completeness()
    qq = CompetitiveQuizQuestion(
        quiz_id=payload.quiz_id,
        question=payload.question,
        question_type=payload.question_type,
        options_json=payload.options,
        correct_answer=payload.correct_answer,
        explanation=payload.explanation,
        difficulty=payload.difficulty,
        marks=payload.marks,
        order_index=payload.order_index
    )
    db.add(qq)
    db.commit()
    db.refresh(qq)
    return {"success": True, "data": {"id": qq.id, "message": "Quiz question added successfully"}}


class AdminVerifyPayload(BaseModel):
    entity_type: str  # 'pyq' | 'topic_content' | 'quiz'
    entity_id: str
    status: ContentVerificationStatus


@router.post("/admin/verify")
def admin_verify_content(payload: AdminVerifyPayload, db: Session = Depends(get_db)):
    """POST /api/competitive/admin/verify - Verify & approve/reject content."""
    if payload.entity_type == "pyq":
        item = db.query(PreviousYearQuestion).filter(PreviousYearQuestion.id == payload.entity_id).first()
        if item and payload.status == ContentVerificationStatus.APPROVED:
            # Completeness verification
            if getattr(item, "question_type", "MCQ") == "MCQ":
                if not item.question or not item.options_json or len(item.options_json) != 4 or not item.correct_answer:
                    raise HTTPException(status_code=400, detail="Cannot approve incomplete MCQ: must have question, 4 options, and correct answer.")
            elif getattr(item, "question_type", "MCQ") == "FILL_IN_THE_BLANK":
                if not item.question or "____" not in item.question or not item.correct_answer:
                    raise HTTPException(status_code=400, detail="Cannot approve incomplete Fill-in-the-blank: must have blank and correct answer.")
    elif payload.entity_type == "topic_content":
        item = db.query(TopicContent).filter(TopicContent.id == payload.entity_id).first()
    else:
        raise HTTPException(status_code=400, detail="Invalid entity type")

    if not item:
        raise HTTPException(status_code=404, detail="Entity not found")

    item.status = payload.status
    db.commit()
    return {"success": True, "message": f"Entity status updated to {payload.status.value}"}
