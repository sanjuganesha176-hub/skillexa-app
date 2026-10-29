import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppHeader } from '../components/common/AppHeader';
import { Palette, Radii, Shadows } from '../constants/theme';
import {
  ENGLISH_22_TOPICS,
  getTopicFullData,
  TopicFullData,
  TopicProgressStore,
} from '../data/skillexaCurriculum';
import { ApiClient } from '../services/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function CompetitiveTopicLearningView() {
  const {
    topic = 'Noun',
    subject = 'English',
    topicId = 'noun',
  } = useLocalSearchParams<{
    topic: string;
    subject: string;
    topicId?: string;
  }>();

  // Active section tab: 'learn' | 'pyqs' | 'quiz'
  const [activeSection, setActiveSection] = useState<'learn' | 'pyqs' | 'quiz'>('learn');

  // Dynamic topic data
  const [data, setData] = useState<TopicFullData>(() =>
    getTopicFullData(topicId, topic, subject)
  );

  useEffect(() => {
    const resolved = getTopicFullData(topicId, topic, subject);
    setData(resolved);

    // Optional sync with backend MySQL if reachable
    const targetSlug = (topicId || topic || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    let isMounted = true;
    ApiClient.competitive.getTopicDetails(targetSlug).then((res) => {
      if (isMounted && res?.success && res?.data?.content) {
        // Topic confirmed active on server
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, [topicId, topic, subject]);

  // PYQ Interactive State
  const [selectedPyqAnswers, setSelectedPyqAnswers] = useState<Record<string, string>>({});
  const [revealedPyqs, setRevealedPyqs] = useState<Record<string, boolean>>({});

  // Quiz State
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<{
    score: number;
    total: number;
    percentage: number;
    passed: boolean;
    unlockedNext?: string;
  } | null>(null);

  // Timer
  const [secondsRemaining, setSecondsRemaining] = useState<number>(300); // 5 mins

  useEffect(() => {
    let interval: any = null;
    if (quizStarted && !quizSubmitted && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            handleAutoSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [quizStarted, quizSubmitted, secondsRemaining]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // PYQ interaction
  const handleSelectPyqOption = (pyqId: string, optionKey: string) => {
    setSelectedPyqAnswers((prev) => ({ ...prev, [pyqId]: optionKey }));
    setRevealedPyqs((prev) => ({ ...prev, [pyqId]: true }));
  };

  // Quiz Interaction
  const handleSelectQuizAnswer = (questionId: string, optionKey: string) => {
    if (quizSubmitted) return;
    setUserQuizAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < data.quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleAutoSubmitQuiz = () => {
    submitQuizInternal();
  };

  const handleSubmitQuiz = () => {
    const answeredCount = Object.keys(userQuizAnswers).length;
    const totalCount = data.quiz.questions.length;

    if (answeredCount < totalCount) {
      Alert.alert(
        'Incomplete Questions',
        `You have answered ${answeredCount} of ${totalCount} questions. Submit anyway?`,
        [
          { text: 'Review Questions', style: 'cancel' },
          { text: 'Submit Now', style: 'destructive', onPress: () => submitQuizInternal() },
        ]
      );
      return;
    }

    submitQuizInternal();
  };

  const submitQuizInternal = () => {
    let score = 0;
    data.quiz.questions.forEach((q) => {
      const userChoice = userQuizAnswers[q.id];
      const optMatch = q.options.find(o => o.key === userChoice || o.text === userChoice);
      const isCorrect = userChoice === q.correctAnswer || 
                        (optMatch && optMatch.text === q.correctAnswer) ||
                        (optMatch && `${optMatch.key}. ${optMatch.text}` === q.correctAnswer);
      if (isCorrect) {
        score += 1;
      }
    });

    const total = data.quiz.questions.length;
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= data.quiz.passingPercentage;

    // Record in TopicProgressStore (enforces sequential unlock)
    const result = TopicProgressStore.recordQuizAttempt(data.id, percentage);

    // Sync attempt to backend MySQL
    ApiClient.competitive.submitTopicQuiz(data.id, {
      answers: userQuizAnswers,
      time_spent_seconds: 300 - secondsRemaining,
    }).catch(() => {});

    setQuizResult({
      score,
      total,
      percentage,
      passed,
      unlockedNext: result.unlockedTopicId,
    });
    setQuizSubmitted(true);
  };

  const handleRetryQuiz = () => {
    setUserQuizAnswers({});
    setCurrentQuestionIndex(0);
    setQuizSubmitted(false);
    setQuizResult(null);
    setSecondsRemaining(300);
    setQuizStarted(true);
  };

  const handleContinueToNext = () => {
    router.back();
  };

  const currentStatus = TopicProgressStore.getTopicStatus(data.id);
  const bestScore = TopicProgressStore.getBestScore(data.id);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#070B14" />
      <AppHeader showBack title={data.name} subtitle={data.breadcrumb} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Topic Card */}
        <View style={styles.headerCard}>
          <View style={styles.breadcrumbRow}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.breadcrumbLink}>{subject || 'Curriculum'}</Text>
            </TouchableOpacity>
            <Feather name="chevron-right" size={13} color="#64748B" />
            <Text style={styles.breadcrumbCurrent}>{data.name}</Text>
          </View>

          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.levelBadgeRow}>
                <View style={styles.levelPill}>
                  <Text style={styles.levelPillText}>LEVEL {data.order}</Text>
                </View>
                <View
                  style={[
                    styles.statusPill,
                    currentStatus === 'COMPLETED' ? styles.statusPillDone : styles.statusPillOpen,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusPillText,
                      currentStatus === 'COMPLETED' ? styles.statusPillTextDone : styles.statusPillTextOpen,
                    ]}
                  >
                    {currentStatus === 'COMPLETED' ? '✓ COMPLETED' : '🔓 OPEN'}
                  </Text>
                </View>
                {bestScore > 0 && (
                  <View style={styles.bestScorePill}>
                    <Feather name="award" size={12} color="#10B981" />
                    <Text style={styles.bestScoreText}>{bestScore}%</Text>
                  </View>
                )}
              </View>

              <Text style={styles.headerTitle}>{data.name}</Text>
              <Text style={styles.headerSubtitle}>{data.explanation}</Text>
            </View>
          </View>
        </View>

        {/* 3 Main Navigation Tabs: LEARN | PYQS | QUIZ */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeSection === 'learn' && styles.tabButtonActive]}
            onPress={() => setActiveSection('learn')}
          >
            <Feather
              name="book-open"
              size={15}
              color={activeSection === 'learn' ? '#38BDF8' : '#94A3B8'}
            />
            <Text style={[styles.tabButtonText, activeSection === 'learn' && styles.tabButtonTextActive]}>
              1. LEARN
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeSection === 'pyqs' && styles.tabButtonActive]}
            onPress={() => setActiveSection('pyqs')}
          >
            <Feather
              name="file-text"
              size={15}
              color={activeSection === 'pyqs' ? '#38BDF8' : '#94A3B8'}
            />
            <Text style={[styles.tabButtonText, activeSection === 'pyqs' && styles.tabButtonTextActive]}>
              2. PYQS ({data.pyqs.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeSection === 'quiz' && styles.tabButtonActive]}
            onPress={() => setActiveSection('quiz')}
          >
            <Feather
              name="award"
              size={15}
              color={activeSection === 'quiz' ? '#38BDF8' : '#94A3B8'}
            />
            <Text style={[styles.tabButtonText, activeSection === 'quiz' && styles.tabButtonTextActive]}>
              3. QUIZ
            </Text>
          </TouchableOpacity>
        </View>

        {/* ========================================================================= */}
        {/* SECTION 1: LEARN                                                          */}
        {/* ========================================================================= */}
        {activeSection === 'learn' && (
          <View style={styles.sectionWrapper}>
            {/* Definition Card */}
            <View style={styles.contentCard}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.cardIconWrap}>
                  <Feather name="info" size={18} color="#38BDF8" />
                </View>
                <Text style={styles.cardTitle}>Definition & Fundamentals</Text>
              </View>
              <Text style={styles.definitionText}>{data.definition}</Text>

              {/* Source Verification Badge */}
              <View style={styles.sourceCitationBadge}>
                <Feather name="shield" size={13} color="#10B981" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.sourceTitleText}>Verified Source: {data.source.name}</Text>
                  <Text style={styles.sourceSubText}>{data.source.publisher}</Text>
                </View>
                <Feather name="check-circle" size={14} color="#10B981" />
              </View>
            </View>

            {/* Types of Nouns */}
            <View style={styles.contentCard}>
              <View style={styles.cardHeaderRow}>
                <View style={[styles.cardIconWrap, { backgroundColor: 'rgba(168, 85, 247, 0.15)' }]}>
                  <Feather name="grid" size={18} color="#A855F7" />
                </View>
                <Text style={styles.cardTitle}>{data.name} Classifications & Core Types</Text>
              </View>

              <View style={styles.typesGrid}>
                {data.types.map((t, idx) => (
                  <View key={idx} style={styles.typeItemCard}>
                    <Text style={styles.typeName}>{t.name}</Text>
                    <Text style={styles.typeDesc}>{t.description}</Text>
                    <View style={styles.examplesPillBox}>
                      <Text style={styles.examplesLabel}>Examples:</Text>
                      {t.examples.map((ex, i) => (
                        <Text key={i} style={styles.exampleTextPill}>• {ex}</Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Important Competitive Exam Rules */}
            <View style={styles.contentCard}>
              <View style={styles.cardHeaderRow}>
                <View style={[styles.cardIconWrap, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
                  <Feather name="bookmark" size={18} color="#F59E0B" />
                </View>
                <Text style={styles.cardTitle}>Important Rules for Competitive Exams</Text>
              </View>

              <View style={styles.rulesList}>
                {data.rules.map((rule, idx) => (
                  <View key={idx} style={styles.ruleListItem}>
                    <View style={styles.ruleNumberCircle}>
                      <Text style={styles.ruleNumberText}>{idx + 1}</Text>
                    </View>
                    <Text style={styles.ruleListText}>{rule}</Text>
                  </View>
                ))}
              </View>

              {/* Contrast Side-by-Side Exam Rules */}
              <Text style={styles.subSectionTitle}>Exam Error Contrasts</Text>
              {data.examRules.map((er, idx) => (
                <View key={idx} style={styles.contrastCard}>
                  <Text style={styles.contrastRuleTitle}>{er.rule}</Text>
                  <Text style={styles.contrastExplanation}>{er.explanation}</Text>

                  <View style={styles.contrastBoxCorrect}>
                    <View style={styles.contrastTagCorrect}>
                      <Feather name="check" size={12} color="#10B981" />
                      <Text style={styles.contrastTagTextCorrect}>CORRECT</Text>
                    </View>
                    <Text style={styles.contrastSentenceCorrect}>{er.correct}</Text>
                  </View>

                  <View style={styles.contrastBoxIncorrect}>
                    <View style={styles.contrastTagIncorrect}>
                      <Feather name="x" size={12} color="#EF4444" />
                      <Text style={styles.contrastTagTextIncorrect}>INCORRECT</Text>
                    </View>
                    <Text style={styles.contrastSentenceIncorrect}>{er.incorrect}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Solved Examples */}
            <View style={styles.contentCard}>
              <View style={styles.cardHeaderRow}>
                <View style={[styles.cardIconWrap, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
                  <Feather name="check-square" size={18} color="#10B981" />
                </View>
                <Text style={styles.cardTitle}>Solved Sentence Examples</Text>
              </View>

              {data.examples.map((ex) => (
                <View key={ex.id} style={styles.exampleItemBox}>
                  <Text style={styles.exampleTitle}>{ex.title}</Text>
                  <Text style={styles.exampleSentence}>"{ex.sentence}"</Text>
                  <View style={styles.exampleCompareRow}>
                    <Text style={styles.correctLine}>✓ {ex.correctUsage}</Text>
                    <Text style={styles.incorrectLine}>✕ {ex.incorrectUsage}</Text>
                  </View>
                  <Text style={styles.exampleExplanation}>{ex.explanation}</Text>
                </View>
              ))}
            </View>

            {/* Common Mistakes & Traps */}
            <View style={styles.contentCard}>
              <View style={styles.cardHeaderRow}>
                <View style={[styles.cardIconWrap, { backgroundColor: 'rgba(239, 68, 68, 0.15)' }]}>
                  <Feather name="alert-triangle" size={18} color="#EF4444" />
                </View>
                <Text style={styles.cardTitle}>Common Exam Mistakes</Text>
              </View>

              {data.commonMistakes.map((cm, idx) => (
                <View key={idx} style={styles.mistakeItem}>
                  <View style={styles.mistakeHeader}>
                    <Text style={styles.mistakeTag}>Avoid</Text>
                    <Text style={styles.mistakeText}>✕ {cm.mistake}</Text>
                  </View>
                  <View style={styles.correctionHeader}>
                    <Text style={styles.correctionTag}>Use</Text>
                    <Text style={styles.correctionText}>✓ {cm.correction}</Text>
                  </View>
                  <Text style={styles.mistakeRationale}>Rationale: {cm.rationale}</Text>
                </View>
              ))}
            </View>

            {/* Quick Revision Points */}
            <View style={styles.contentCard}>
              <View style={styles.cardHeaderRow}>
                <View style={[styles.cardIconWrap, { backgroundColor: 'rgba(56, 189, 248, 0.15)' }]}>
                  <Feather name="zap" size={18} color="#38BDF8" />
                </View>
                <Text style={styles.cardTitle}>Quick Revision Points</Text>
              </View>
              {data.quickRevision.map((pt, idx) => (
                <View key={idx} style={styles.revisionBullet}>
                  <Text style={styles.revisionText}>{pt}</Text>
                </View>
              ))}
            </View>

            {/* Bottom Next Step Button */}
            <TouchableOpacity
              style={styles.actionNavButton}
              onPress={() => setActiveSection('pyqs')}
            >
              <Text style={styles.actionNavButtonText}>Practice Previous Year Questions (PYQs) →</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: PREVIOUS YEAR QUESTIONS                                        */}
        {/* ========================================================================= */}
        {activeSection === 'pyqs' && (
          <View style={styles.sectionWrapper}>
            <View style={styles.pyqHeaderBanner}>
              <View style={styles.pyqBadge}>
                <Feather name="shield" size={14} color="#38BDF8" />
                <Text style={styles.pyqBadgeText}>100% VERIFIED OFFICIAL QUESTIONS</Text>
              </View>
              <Text style={styles.pyqBannerTitle}>Real Exam Previous Year Questions</Text>
              <Text style={styles.pyqBannerSubtitle}>
                Practice authentic questions asked in SSC CGL, UPSC CDS, and Bank PO. Tap any option to test yourself and inspect the official explanation.
              </Text>
            </View>

            {data.pyqs.map((pyq, index) => {
              const selected = selectedPyqAnswers[pyq.id];
              const isRevealed = revealedPyqs[pyq.id];

              return (
                <View key={pyq.id} style={styles.pyqCard}>
                  {/* Exam metadata badge */}
                  <View style={styles.pyqMetaRow}>
                    <View style={styles.examBadge}>
                      <Text style={styles.examBadgeText}>
                        {pyq.exam} ({pyq.year})
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                      {(pyq.questionType === 'FILL_IN_THE_BLANK' || pyq.question.includes('____')) && (
                        <View style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
                          <Text style={{ fontSize: 10, color: '#38BDF8', fontWeight: '700' }}>FILL IN THE BLANK</Text>
                        </View>
                      )}
                      <View style={styles.topicTag}>
                        <Text style={styles.topicTagText}>Topic: {data.name}</Text>
                      </View>
                    </View>
                  </View>

                  <Text style={styles.pyqQuestionNumber}>Question {index + 1}:</Text>
                  <Text style={styles.pyqQuestionText}>{pyq.question}</Text>

                  {/* Options */}
                  <View style={styles.pyqOptionsList}>
                    {pyq.options.map((opt) => {
                      const isChosen = selected === opt.key;
                      const isCorrect = opt.key === pyq.correctAnswer;

                      let optStyle = styles.pyqOptionItem;
                      let badgeStyle = styles.pyqOptionKey;
                      let keyColor = '#94A3B8';

                      if (isRevealed) {
                        if (isCorrect) {
                          optStyle = { ...styles.pyqOptionItem, ...styles.pyqOptionCorrect };
                          badgeStyle = { ...styles.pyqOptionKey, backgroundColor: '#10B981' };
                          keyColor = '#FFFFFF';
                        } else if (isChosen && !isCorrect) {
                          optStyle = { ...styles.pyqOptionItem, ...styles.pyqOptionIncorrect };
                          badgeStyle = { ...styles.pyqOptionKey, backgroundColor: '#EF4444' };
                          keyColor = '#FFFFFF';
                        }
                      }

                      return (
                        <TouchableOpacity
                          key={opt.key}
                          style={optStyle}
                          activeOpacity={0.8}
                          onPress={() => handleSelectPyqOption(pyq.id, opt.key)}
                        >
                          <View style={badgeStyle}>
                            <Text style={[styles.pyqOptionKeyText, { color: keyColor }]}>
                              {opt.key}
                            </Text>
                          </View>
                          <Text style={styles.pyqOptionText}>{opt.text}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  {/* Feedback and Explanation */}
                  {isRevealed && (
                    <View style={styles.pyqExplanationBox}>
                      <View style={styles.pyqAnswerRow}>
                        <Feather name="check-circle" size={16} color="#10B981" />
                        <Text style={styles.pyqCorrectAnswerLabel}>
                          Correct Answer: Option {pyq.correctAnswer}
                        </Text>
                      </View>
                      <Text style={styles.pyqExplanationText}>{pyq.explanation}</Text>
                      <View style={styles.pyqSourceTag}>
                        <Feather name="link" size={12} color="#38BDF8" />
                        <Text style={styles.pyqSourceText}>Source: {pyq.source}</Text>
                      </View>
                    </View>
                  )}
                </View>
              );
            })}

            {/* Proceed to Quiz Button */}
            <TouchableOpacity
              style={styles.actionNavButton}
              onPress={() => setActiveSection('quiz')}
            >
              <Text style={styles.actionNavButtonText}>Take {data.name} Quiz to Unlock Next Topic →</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ========================================================================= */}
        {/* SECTION 3: QUIZ ENGINE                                                    */}
        {/* ========================================================================= */}
        {activeSection === 'quiz' && (
          <View style={styles.sectionWrapper}>
            {!quizStarted && !quizSubmitted && (
              <View style={styles.quizStartCard}>
                <View style={styles.quizIconLargeWrap}>
                  <Feather name="award" size={32} color="#38BDF8" />
                </View>
                <Text style={styles.quizStartTitle}>{data.quiz.title}</Text>
                <Text style={styles.quizStartDesc}>
                  Test your mastery of {data.name}. You must score at least{' '}
                  <Text style={{ color: '#38BDF8', fontWeight: '800' }}>
                    {data.quiz.passingPercentage}%
                  </Text>{' '}
                  to complete this level and unlock Level 2: Pronoun.
                </Text>

                <View style={styles.quizSpecsRow}>
                  <View style={styles.quizSpecBox}>
                    <Feather name="help-circle" size={16} color="#38BDF8" />
                    <Text style={styles.quizSpecVal}>{data.quiz.questions.length}</Text>
                    <Text style={styles.quizSpecLabel}>Questions</Text>
                  </View>
                  <View style={styles.quizSpecBox}>
                    <Feather name="clock" size={16} color="#A855F7" />
                    <Text style={styles.quizSpecVal}>{data.quiz.durationMinutes} Min</Text>
                    <Text style={styles.quizSpecLabel}>Time Limit</Text>
                  </View>
                  <View style={styles.quizSpecBox}>
                    <Feather name="percent" size={16} color="#10B981" />
                    <Text style={styles.quizSpecVal}>{data.quiz.passingPercentage}%</Text>
                    <Text style={styles.quizSpecLabel}>To Unlock</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.startQuizButton}
                  onPress={() => setQuizStarted(true)}
                >
                  <Text style={styles.startQuizButtonText}>Start Quiz Now</Text>
                  <Feather name="arrow-right" size={16} color="#070B14" />
                </TouchableOpacity>
              </View>
            )}

            {/* Active Quiz Engine */}
            {quizStarted && !quizSubmitted && (
              <View style={styles.activeQuizContainer}>
                {/* Timer and Progress bar */}
                <View style={styles.quizStatusBar}>
                  <View style={styles.timerBadge}>
                    <Feather name="clock" size={14} color="#F59E0B" />
                    <Text style={styles.timerText}>{formatTimer(secondsRemaining)}</Text>
                  </View>

                  <Text style={styles.questionCounterText}>
                    Question {currentQuestionIndex + 1} of {data.quiz.questions.length}
                  </Text>
                </View>

                {/* Progress bar */}
                <View style={styles.quizProgressBarTrack}>
                  <View
                    style={[
                      styles.quizProgressBarFill,
                      {
                        width: `${((currentQuestionIndex + 1) / data.quiz.questions.length) * 100}%`,
                      },
                    ]}
                  />
                </View>

                {/* Current Question */}
                {(() => {
                  const q = data.quiz.questions[currentQuestionIndex];
                  const selectedKey = userQuizAnswers[q.id];

                  return (
                    <View style={styles.questionBox}>
                      <View style={styles.questionHeaderRow}>
                        <Text style={styles.questionIndexLabel}>Question {currentQuestionIndex + 1}</Text>
                        <View style={styles.marksBadge}>
                          <Text style={styles.marksBadgeText}>+{q.marks} Marks</Text>
                        </View>
                      </View>

                      <Text style={styles.questionMainText}>{q.question}</Text>

                      <View style={styles.quizOptionsList}>
                        {q.options.map((opt) => {
                          const isSelected = selectedKey === opt.key;
                          return (
                            <TouchableOpacity
                              key={opt.key}
                              style={[
                                styles.quizOptionCard,
                                isSelected && styles.quizOptionCardSelected,
                              ]}
                              activeOpacity={0.8}
                              onPress={() => handleSelectQuizAnswer(q.id, opt.key)}
                            >
                              <View
                                style={[
                                  styles.quizOptionRadio,
                                  isSelected && styles.quizOptionRadioSelected,
                                ]}
                              >
                                <Text
                                  style={[
                                    styles.quizOptionKeyText,
                                    isSelected && styles.quizOptionKeyTextSelected,
                                  ]}
                                >
                                  {opt.key}
                                </Text>
                              </View>
                              <Text
                                style={[
                                  styles.quizOptionLabelText,
                                  isSelected && styles.quizOptionLabelTextSelected,
                                ]}
                              >
                                {opt.text}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  );
                })()}

                {/* Quiz Navigation Buttons */}
                <View style={styles.quizNavRow}>
                  <TouchableOpacity
                    style={[styles.quizNavButton, currentQuestionIndex === 0 && styles.quizNavButtonDisabled]}
                    disabled={currentQuestionIndex === 0}
                    onPress={handlePrevQuestion}
                  >
                    <Feather name="arrow-left" size={16} color="#CBD5E1" />
                    <Text style={styles.quizNavButtonText}>Previous</Text>
                  </TouchableOpacity>

                  {currentQuestionIndex < data.quiz.questions.length - 1 ? (
                    <TouchableOpacity style={styles.quizNavButtonPrimary} onPress={handleNextQuestion}>
                      <Text style={styles.quizNavButtonPrimaryText}>Next</Text>
                      <Feather name="arrow-right" size={16} color="#070B14" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.quizSubmitButton} onPress={handleSubmitQuiz}>
                      <Text style={styles.quizSubmitButtonText}>Submit Quiz</Text>
                      <Feather name="check-circle" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}

            {/* Quiz Result Modal / Screen */}
            {quizSubmitted && quizResult && (
              <View style={styles.resultCard}>
                <View
                  style={[
                    styles.resultBadgeCircle,
                    quizResult.passed ? styles.resultBadgePass : styles.resultBadgeFail,
                  ]}
                >
                  <Feather
                    name={quizResult.passed ? 'check-circle' : 'alert-circle'}
                    size={40}
                    color="#FFFFFF"
                  />
                </View>

                <Text style={styles.resultScoreText}>
                  Score: {quizResult.score} / {quizResult.total}
                </Text>
                <Text
                  style={[
                    styles.resultPercentText,
                    { color: quizResult.passed ? '#10B981' : '#EF4444' },
                  ]}
                >
                  {quizResult.percentage}%
                </Text>
                <Text style={styles.resultStatusText}>
                  {quizResult.passed ? 'Passed ✓' : 'Not Passed'}
                </Text>

                {quizResult.passed ? (
                  <View style={styles.unlockCelebrationBox}>
                    <Feather name="unlock" size={20} color="#38BDF8" />
                    <Text style={styles.unlockCelebrationTitle}>Congratulations!</Text>
                    <Text style={styles.unlockCelebrationDesc}>
                      You scored {quizResult.percentage}% (requirement: {data.quiz.passingPercentage}%).
                      {quizResult.unlockedNext ? `Next Topic (${quizResult.unlockedNext.toUpperCase()}) is now unlocked!` : `You have mastered ${data.name}!`}
                    </Text>

                    <TouchableOpacity
                      style={styles.continueToNextButton}
                      onPress={handleContinueToNext}
                    >
                      <Text style={styles.continueToNextButtonText}>Continue to Next Topic {quizResult.unlockedNext ? `(${quizResult.unlockedNext.toUpperCase()})` : ''} →</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.failNoticeBox}>
                    <Text style={styles.failNoticeTitle}>Keep Practicing!</Text>
                    <Text style={styles.failNoticeDesc}>
                      You scored {quizResult.percentage}%. You need at least{' '}
                      <Text style={{ fontWeight: '800', color: '#F59E0B' }}>
                        {data.quiz.passingPercentage}%
                      </Text>{' '}
                      to unlock the next topic. Review the rules and retry the quiz!
                    </Text>

                    <TouchableOpacity style={styles.retryButton} onPress={handleRetryQuiz}>
                      <Feather name="rotate-ccw" size={16} color="#FFFFFF" />
                      <Text style={styles.retryButtonText}>Retry Quiz</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Review Questions Breakdown */}
                <View style={styles.breakdownContainer}>
                  <Text style={styles.breakdownHeaderTitle}>Answer Explanations & Review</Text>
                  {data.quiz.questions.map((q, idx) => {
                    const userAns = userQuizAnswers[q.id];
                    const userOpt = q.options.find(o => o.key === userAns || o.text === userAns);
                    const correctOpt = q.options.find(o => o.key === q.correctAnswer || o.text === q.correctAnswer);
                    const isRight = userAns === q.correctAnswer || 
                                    (userOpt && userOpt.text === q.correctAnswer) ||
                                    (userOpt && `${userOpt.key}. ${userOpt.text}` === q.correctAnswer);

                    const userDisplay = userOpt ? `${userOpt.key}. ${userOpt.text}` : (userAns || 'None');
                    const correctDisplay = correctOpt ? `${correctOpt.key}. ${correctOpt.text}` : q.correctAnswer;

                    return (
                      <View key={q.id} style={styles.reviewItemCard}>
                        <View style={styles.reviewItemHeader}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Text style={styles.reviewItemNumber}>Question {idx + 1}</Text>
                            {(q.questionType === 'FILL_IN_THE_BLANK' || q.question.includes('____')) && (
                              <View style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
                                <Text style={{ fontSize: 10, color: '#38BDF8', fontWeight: '700' }}>FILL IN THE BLANK</Text>
                              </View>
                            )}
                          </View>
                          <View
                            style={[
                              styles.reviewStatusTag,
                              isRight ? styles.reviewStatusTagRight : styles.reviewStatusTagWrong,
                            ]}
                          >
                            <Text
                              style={[
                                styles.reviewStatusTagText,
                                isRight ? styles.reviewStatusTagTextRight : styles.reviewStatusTagTextWrong,
                              ]}
                            >
                              {isRight ? `CORRECT (+${q.marks || 1})` : 'INCORRECT (0)'}
                            </Text>
                          </View>
                        </View>

                        <Text style={styles.reviewQuestionText}>{q.question}</Text>
                        <Text style={styles.reviewAnswerLine}>
                          Your Answer: <Text style={{ fontWeight: '700' }}>{userDisplay}</Text> | Correct: <Text style={{ fontWeight: '700', color: '#10B981' }}>{correctDisplay}</Text>
                        </Text>
                        <Text style={styles.reviewExplanationText}>{q.explanation}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        )}

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#070B14',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  headerCard: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 16,
    ...Shadows.card,
  },
  breadcrumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  breadcrumbLink: {
    fontSize: 12,
    fontWeight: '700',
    color: '#38BDF8',
  },
  breadcrumbCurrent: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  levelBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  levelPill: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  levelPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#38BDF8',
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusPillOpen: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  statusPillDone: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '800',
  },
  statusPillTextOpen: {
    color: '#38BDF8',
  },
  statusPillTextDone: {
    color: '#10B981',
  },
  bestScorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  bestScoreText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#10B981',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 20,
    gap: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  tabButtonActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
  },
  tabButtonTextActive: {
    color: '#38BDF8',
  },
  sectionWrapper: {
    gap: 16,
  },
  contentCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    ...Shadows.card,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  cardIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  definitionText: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 22,
    marginBottom: 14,
  },
  sourceCitationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
  },
  sourceTitleText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
  },
  sourceSubText: {
    fontSize: 10,
    color: '#94A3B8',
  },
  typesGrid: {
    gap: 12,
  },
  typeItemCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  typeName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#38BDF8',
    marginBottom: 4,
  },
  typeDesc: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 18,
    marginBottom: 8,
  },
  examplesPillBox: {
    backgroundColor: 'rgba(56, 189, 248, 0.06)',
    borderRadius: 8,
    padding: 8,
  },
  examplesLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#38BDF8',
    marginBottom: 4,
  },
  exampleTextPill: {
    fontSize: 11,
    color: '#CBD5E1',
    lineHeight: 16,
  },
  rulesList: {
    gap: 10,
    marginBottom: 18,
  },
  ruleListItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  ruleNumberCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  ruleNumberText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#38BDF8',
  },
  ruleListText: {
    flex: 1,
    fontSize: 13,
    color: '#CBD5E1',
    lineHeight: 20,
  },
  subSectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 12,
  },
  contrastCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: 12,
  },
  contrastRuleTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  contrastExplanation: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 18,
    marginBottom: 10,
  },
  contrastBoxCorrect: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
    marginBottom: 6,
  },
  contrastTagCorrect: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  contrastTagTextCorrect: {
    fontSize: 9,
    fontWeight: '800',
    color: '#10B981',
  },
  contrastSentenceCorrect: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  contrastBoxIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  contrastTagIncorrect: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  contrastTagTextIncorrect: {
    fontSize: 9,
    fontWeight: '800',
    color: '#EF4444',
  },
  contrastSentenceIncorrect: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
  },
  exampleItemBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: 10,
  },
  exampleTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#38BDF8',
    marginBottom: 4,
  },
  exampleSentence: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  exampleCompareRow: {
    gap: 4,
    marginBottom: 8,
  },
  correctLine: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
  incorrectLine: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EF4444',
  },
  exampleExplanation: {
    fontSize: 11,
    color: '#94A3B8',
    lineHeight: 16,
  },
  mistakeItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: 10,
  },
  mistakeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  mistakeTag: {
    fontSize: 9,
    fontWeight: '800',
    color: '#EF4444',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  mistakeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EF4444',
  },
  correctionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  correctionTag: {
    fontSize: 9,
    fontWeight: '800',
    color: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  correctionText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
  mistakeRationale: {
    fontSize: 11,
    color: '#94A3B8',
  },
  revisionBullet: {
    marginBottom: 8,
  },
  revisionText: {
    fontSize: 12,
    color: '#CBD5E1',
    lineHeight: 18,
  },
  actionNavButton: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  actionNavButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#38BDF8',
  },
  pyqHeaderBanner: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 16,
  },
  pyqBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    marginBottom: 10,
  },
  pyqBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#38BDF8',
  },
  pyqBannerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  pyqBannerSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 18,
  },
  pyqCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 16,
    ...Shadows.card,
  },
  pyqMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  examBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  examBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#38BDF8',
  },
  topicTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  topicTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
  },
  pyqQuestionNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 4,
  },
  pyqQuestionText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F8FAFC',
    lineHeight: 22,
    marginBottom: 14,
  },
  pyqOptionsList: {
    gap: 8,
    marginBottom: 12,
  },
  pyqOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  pyqOptionCorrect: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  pyqOptionIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  pyqOptionKey: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pyqOptionKeyText: {
    fontSize: 12,
    fontWeight: '800',
  },
  pyqOptionText: {
    flex: 1,
    fontSize: 13,
    color: '#CBD5E1',
    fontWeight: '600',
  },
  pyqExplanationBox: {
    backgroundColor: 'rgba(16, 185, 129, 0.06)',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
    marginTop: 6,
  },
  pyqAnswerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  pyqCorrectAnswerLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#10B981',
  },
  pyqExplanationText: {
    fontSize: 12,
    color: '#CBD5E1',
    lineHeight: 18,
    marginBottom: 8,
  },
  pyqSourceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pyqSourceText: {
    fontSize: 10,
    color: '#38BDF8',
    fontWeight: '600',
  },
  quizStartCard: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    ...Shadows.card,
  },
  quizIconLargeWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  quizStartTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 8,
    textAlign: 'center',
  },
  quizStartDesc: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  quizSpecsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    width: '100%',
  },
  quizSpecBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  quizSpecVal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F8FAFC',
    marginTop: 4,
  },
  quizSpecLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  startQuizButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#38BDF8',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    width: '100%',
    ...Shadows.button,
  },
  startQuizButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#070B14',
  },
  activeQuizContainer: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    ...Shadows.card,
  },
  quizStatusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  timerText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#F59E0B',
  },
  questionCounterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
  },
  quizProgressBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
    marginBottom: 18,
  },
  quizProgressBarFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 3,
  },
  questionBox: {
    marginBottom: 20,
  },
  questionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionIndexLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#38BDF8',
  },
  marksBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  marksBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#38BDF8',
  },
  questionMainText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
    lineHeight: 24,
    marginBottom: 16,
  },
  quizOptionsList: {
    gap: 10,
  },
  quizOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  quizOptionCardSelected: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderColor: '#38BDF8',
    ...Shadows.glow,
  },
  quizOptionRadio: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizOptionRadioSelected: {
    backgroundColor: '#38BDF8',
  },
  quizOptionKeyText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94A3B8',
  },
  quizOptionKeyTextSelected: {
    color: '#070B14',
  },
  quizOptionLabelText: {
    flex: 1,
    fontSize: 14,
    color: '#CBD5E1',
    fontWeight: '600',
  },
  quizOptionLabelTextSelected: {
    color: '#F8FAFC',
    fontWeight: '700',
  },
  quizNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  quizNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  quizNavButtonDisabled: {
    opacity: 0.35,
  },
  quizNavButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#CBD5E1',
  },
  quizNavButtonPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: '#38BDF8',
  },
  quizNavButtonPrimaryText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#070B14',
  },
  quizSubmitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#10B981',
  },
  quizSubmitButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  resultCard: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    ...Shadows.card,
  },
  resultBadgeCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  resultBadgePass: {
    backgroundColor: '#10B981',
    ...Shadows.glow,
  },
  resultBadgeFail: {
    backgroundColor: '#EF4444',
  },
  resultScoreText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  resultPercentText: {
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 4,
  },
  resultStatusText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 18,
  },
  unlockCelebrationBox: {
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
    width: '100%',
    marginBottom: 20,
  },
  unlockCelebrationTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#38BDF8',
    marginTop: 6,
    marginBottom: 4,
  },
  unlockCelebrationDesc: {
    fontSize: 13,
    color: '#CBD5E1',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  continueToNextButton: {
    backgroundColor: '#38BDF8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  continueToNextButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#070B14',
  },
  failNoticeBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.35)',
    width: '100%',
    marginBottom: 20,
  },
  failNoticeTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#EF4444',
    marginBottom: 4,
  },
  failNoticeDesc: {
    fontSize: 13,
    color: '#CBD5E1',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: '100%',
  },
  retryButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  breakdownContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 18,
    gap: 12,
  },
  breakdownHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 6,
  },
  reviewItemCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  reviewItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  reviewItemNumber: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  reviewStatusTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  reviewStatusTagRight: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  reviewStatusTagWrong: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  reviewStatusTagText: {
    fontSize: 9,
    fontWeight: '800',
  },
  reviewStatusTagTextRight: {
    color: '#10B981',
  },
  reviewStatusTagTextWrong: {
    color: '#EF4444',
  },
  reviewQuestionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 6,
  },
  reviewAnswerLine: {
    fontSize: 12,
    color: '#CBD5E1',
    marginBottom: 6,
  },
  reviewExplanationText: {
    fontSize: 11,
    color: '#94A3B8',
    lineHeight: 16,
  },
});
