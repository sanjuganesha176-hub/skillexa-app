import enum
import uuid
from datetime import datetime
from sqlalchemy import Boolean, Column, DateTime, Enum, Float, ForeignKey, Integer, String, Text, JSON
from sqlalchemy.orm import relationship
from backend.app.database import Base


def generate_uuid() -> str:
    return str(uuid.uuid4())


class ContentVerificationStatus(str, enum.Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"


class TopicProgressState(str, enum.Enum):
    LOCKED = "LOCKED"
    UNLOCKED = "UNLOCKED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"


class CompetitiveExam(Base):
    __tablename__ = "competitive_exams"

    id = Column(String(36), primary_key=True, default=generate_uuid, index=True)
    code = Column(String(100), unique=True, nullable=False, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String(100), nullable=True)
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    subjects = relationship("CompetitiveSubject", back_populates="exam", cascade="all, delete-orphan")


class CompetitiveSubject(Base):
    __tablename__ = "competitive_subjects"

    id = Column(String(36), primary_key=True, default=generate_uuid, index=True)
    exam_id = Column(String(36), ForeignKey("competitive_exams.id", ondelete="CASCADE"), nullable=False, index=True)
    code = Column(String(100), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    icon = Column(String(100), nullable=True)
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    exam = relationship("CompetitiveExam", back_populates="subjects")
    topics = relationship("CompetitiveTopic", back_populates="subject", cascade="all, delete-orphan")


class CompetitiveTopic(Base):
    __tablename__ = "competitive_topics"

    id = Column(String(36), primary_key=True, default=generate_uuid, index=True)
    subject_id = Column(String(36), ForeignKey("competitive_subjects.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(255), nullable=False, index=True)
    slug = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    order_index = Column(Integer, default=0)
    is_default_unlocked = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    subject = relationship("CompetitiveSubject", back_populates="topics")
    content = relationship("TopicContent", back_populates="topic", uselist=False, cascade="all, delete-orphan")
    examples = relationship("TopicExample", back_populates="topic", cascade="all, delete-orphan")
    pyqs = relationship("PreviousYearQuestion", back_populates="topic", cascade="all, delete-orphan")
    quiz = relationship("CompetitiveQuiz", back_populates="topic", uselist=False, cascade="all, delete-orphan")
    progress_records = relationship("StudentTopicProgress", back_populates="topic", cascade="all, delete-orphan")


class Source(Base):
    __tablename__ = "educational_sources"

    id = Column(String(36), primary_key=True, default=generate_uuid, index=True)
    name = Column(String(255), nullable=False)
    url = Column(String(500), nullable=True)
    content_type = Column(String(100), nullable=True)
    publisher = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class ContentVerification(Base):
    __tablename__ = "content_verifications"

    id = Column(String(36), primary_key=True, default=generate_uuid, index=True)
    entity_type = Column(String(50), nullable=False)
    entity_id = Column(String(36), nullable=False, index=True)
    source_id = Column(String(36), ForeignKey("educational_sources.id", ondelete="SET NULL"), nullable=True)
    added_by = Column(String(255), default="System Admin")
    verification_status = Column(Enum(ContentVerificationStatus), default=ContentVerificationStatus.APPROVED, nullable=False)
    verified_by = Column(String(255), nullable=True)
    verification_date = Column(DateTime, default=datetime.utcnow)
    notes = Column(Text, nullable=True)

    # Relationships
    source = relationship("Source")


class TopicContent(Base):
    __tablename__ = "topic_contents"

    id = Column(String(36), primary_key=True, default=generate_uuid, index=True)
    topic_id = Column(String(36), ForeignKey("competitive_topics.id", ondelete="CASCADE"), nullable=False, unique=True, index=True)
    definition = Column(Text, nullable=False)
    explanation = Column(Text, nullable=False)
    types_json = Column(JSON, nullable=True)
    rules_json = Column(JSON, nullable=True)
    exam_rules_json = Column(JSON, nullable=True)
    common_mistakes_json = Column(JSON, nullable=True)
    exam_tips_json = Column(JSON, nullable=True)
    source_id = Column(String(36), ForeignKey("educational_sources.id", ondelete="SET NULL"), nullable=True)
    status = Column(Enum(ContentVerificationStatus), default=ContentVerificationStatus.APPROVED, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    topic = relationship("CompetitiveTopic", back_populates="content")
    source = relationship("Source")


class TopicExample(Base):
    __tablename__ = "topic_examples"

    id = Column(String(36), primary_key=True, default=generate_uuid, index=True)
    topic_id = Column(String(36), ForeignKey("competitive_topics.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    sentence = Column(Text, nullable=True)
    correct_usage = Column(Text, nullable=False)
    incorrect_usage = Column(Text, nullable=True)
    explanation = Column(Text, nullable=False)
    order_index = Column(Integer, default=0)

    # Relationships
    topic = relationship("CompetitiveTopic", back_populates="examples")


class PreviousYearQuestion(Base):
    __tablename__ = "previous_year_questions"

    id = Column(String(36), primary_key=True, default=generate_uuid, index=True)
    topic_id = Column(String(36), ForeignKey("competitive_topics.id", ondelete="CASCADE"), nullable=False, index=True)
    exam_name = Column(String(100), nullable=False)
    exam_year = Column(Integer, nullable=False)
    question = Column(Text, nullable=False)
    question_type = Column(String(50), default="MCQ", nullable=False)
    options_json = Column(JSON, nullable=False)
    correct_answer = Column(String(500), nullable=False)
    explanation = Column(Text, nullable=False)
    source_id = Column(String(36), ForeignKey("educational_sources.id", ondelete="SET NULL"), nullable=True)
    status = Column(Enum(ContentVerificationStatus), default=ContentVerificationStatus.APPROVED, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    topic = relationship("CompetitiveTopic", back_populates="pyqs")
    source = relationship("Source")


class CompetitiveQuiz(Base):
    __tablename__ = "competitive_quizzes"

    id = Column(String(36), primary_key=True, default=generate_uuid, index=True)
    topic_id = Column(String(36), ForeignKey("competitive_topics.id", ondelete="CASCADE"), nullable=False, unique=True, index=True)
    title = Column(String(255), nullable=False)
    passing_percentage = Column(Integer, default=70)
    total_marks = Column(Integer, default=10)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    topic = relationship("CompetitiveTopic", back_populates="quiz")
    questions = relationship("CompetitiveQuizQuestion", back_populates="quiz", cascade="all, delete-orphan")


class CompetitiveQuizQuestion(Base):
    __tablename__ = "competitive_quiz_questions"

    id = Column(String(36), primary_key=True, default=generate_uuid, index=True)
    quiz_id = Column(String(36), ForeignKey("competitive_quizzes.id", ondelete="CASCADE"), nullable=False, index=True)
    topic_id = Column(String(36), ForeignKey("competitive_topics.id", ondelete="CASCADE"), nullable=False, index=True)
    question = Column(Text, nullable=False)
    question_type = Column(String(50), default="MCQ", nullable=False)
    options_json = Column(JSON, nullable=False)
    correct_answer = Column(String(500), nullable=False)
    explanation = Column(Text, nullable=False)
    difficulty = Column(String(50), default="Medium")
    marks = Column(Integer, default=1)
    order_index = Column(Integer, default=0)

    # Relationships
    quiz = relationship("CompetitiveQuiz", back_populates="questions")


class StudentTopicProgress(Base):
    __tablename__ = "student_topic_progress"

    id = Column(String(36), primary_key=True, default=generate_uuid, index=True)
    student_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    exam_id = Column(String(36), ForeignKey("competitive_exams.id", ondelete="CASCADE"), nullable=True)
    subject_id = Column(String(36), ForeignKey("competitive_subjects.id", ondelete="CASCADE"), nullable=False, index=True)
    topic_id = Column(String(36), ForeignKey("competitive_topics.id", ondelete="CASCADE"), nullable=False, index=True)
    info_viewed = Column(Boolean, default=False)
    pyqs_attempted = Column(Integer, default=0)
    quiz_attempted = Column(Boolean, default=False)
    best_score = Column(Float, default=0.0)
    quiz_completed = Column(Boolean, default=False)
    status = Column(Enum(TopicProgressState), default=TopicProgressState.LOCKED, nullable=False)
    unlocked_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    topic = relationship("CompetitiveTopic", back_populates="progress_records")


class CompetitiveQuizAttempt(Base):
    __tablename__ = "competitive_quiz_attempts"

    id = Column(String(36), primary_key=True, default=generate_uuid, index=True)
    student_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    quiz_id = Column(String(36), ForeignKey("competitive_quizzes.id", ondelete="CASCADE"), nullable=False, index=True)
    topic_id = Column(String(36), ForeignKey("competitive_topics.id", ondelete="CASCADE"), nullable=False, index=True)
    score = Column(Integer, nullable=False)
    total_marks = Column(Integer, nullable=False)
    percentage = Column(Float, nullable=False)
    passed = Column(Boolean, nullable=False)
    answers_json = Column(JSON, nullable=True)
    time_spent_seconds = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class CompetitiveQuestionPaper(Base):
    __tablename__ = "competitive_question_papers"

    id = Column(String(36), primary_key=True, default=generate_uuid, index=True)
    exam_name = Column(String(100), nullable=False)
    exam_year = Column(Integer, nullable=False)
    paper_name = Column(String(255), nullable=False)
    subject = Column(String(100), nullable=False)
    source_website = Column(String(255), nullable=False)
    official_url = Column(String(500), nullable=False)
    description = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
