import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppHeader } from '../components/common/AppHeader';
import {
  CollapsibleSection,
  ExamTipCard,
  ExampleCard,
  NoteCard,
  ProgressBar,
  RuleCard,
} from '../components/common/EducationalCards';
import { Palette, Radii, Shadows } from '../constants/theme';
import { getCompetitiveTopic } from '../data/competitiveCurriculum';
import { getEngineeringTopic } from '../data/engineeringCurriculum';
import { FacultySystemStore } from '../services/facultyStore';

export default function TopicLearningPage() {
  const {
    topic = 'Percentage & Profit/Loss',
    subject = 'Quantitative Aptitude',
    section = 'competitive',
  } = useLocalSearchParams<{
    topic: string;
    subject: string;
    section: string;
  }>();

  // Load topic curriculum
  const isEng = section.toLowerCase().includes('eng') || subject.toLowerCase().includes('embedded') || subject.toLowerCase().includes('programming') || subject.toLowerCase().includes('electronics');
  const topicData = isEng ? getEngineeringTopic(subject, topic) : getCompetitiveTopic(subject, topic);

  // Load attached faculty notes and videos
  const facultyNotes = FacultySystemStore.getNotesForTopic(topic);
  const facultyVideos = FacultySystemStore.getVideosForTopic(topic);

  const [quizCount, setQuizCount] = useState<number>(10);
  const [selectedPyq, setSelectedPyq] = useState<string | null>(null);

  const startQuiz = () => {
    router.push({
      pathname: '/quizzpage',
      params: {
        section: isEng ? 'engineering' : 'competitive',
        subject: topicData.subject,
        topic: topicData.topic,
        count: quizCount.toString(),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <AppHeader showBack title={topicData.topic} subtitle={topicData.subject} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Topic Header */}
        <View style={styles.header}>
          <View style={styles.topicBadge}>
            <Text style={styles.topicBadgeText}>{topicData.badge}</Text>
          </View>
          <Text style={styles.title}>{topicData.topic}</Text>
          <Text style={styles.subtitle}>{topicData.overview}</Text>
        </View>

        {/* Topic Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressTopRow}>
            <Text style={styles.progressLabel}>TOPIC MASTERY</Text>
            <Text style={styles.progressValue}>45% Completed</Text>
          </View>
          <ProgressBar progress={0.45} color={Palette.primary} />
          <Text style={styles.progressMeta}>Read structured notes below before starting topic quiz drills</Text>
        </View>

        {/* 🎥 ATTACHED FACULTY VIDEOS IF PRESENT */}
        {facultyVideos.length > 0 && (
          <View style={styles.facultyVideoSection}>
            <View style={styles.sectionHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Feather name="film" size={18} color={Palette.aiPurple} />
                <Text style={styles.sectionTitle}>Faculty Video Lectures ({facultyVideos.length})</Text>
              </View>
              <Text style={styles.sectionSubtitle}>Watch curriculum video lessons from verified educators</Text>
            </View>

            {facultyVideos.map((v) => (
              <View key={v.id} style={styles.facultyVideoCard}>
                <View style={styles.videoHeaderRow}>
                  <View style={styles.videoTag}>
                    <Text style={styles.videoTagText}>🎥 FACULTY VIDEO • {v.duration || '15 mins'}</Text>
                  </View>
                  <Text style={styles.videoAuthorText}>By {v.facultyName}</Text>
                </View>
                <Text style={styles.videoTitle}>{v.title}</Text>
                <Text style={styles.videoDesc}>{v.description}</Text>

                <TouchableOpacity
                  style={styles.watchBtn}
                  onPress={() => alert(`Streaming lecture: ${v.title}`)}
                  activeOpacity={0.85}
                >
                  <Feather name="play" size={14} color="#FFFFFF" />
                  <Text style={styles.watchBtnText}>Play Video Lecture</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* 📝 ATTACHED FACULTY NOTES IF PRESENT */}
        {facultyNotes.length > 0 && (
          <View style={styles.facultyNotesSection}>
            <View style={styles.sectionHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Feather name="file-text" size={18} color={Palette.primary} />
                <Text style={styles.sectionTitle}>Faculty Verified Notes ({facultyNotes.length})</Text>
              </View>
              <Text style={styles.sectionSubtitle}>Handcrafted lesson notes published by course faculty</Text>
            </View>

            {facultyNotes.map((fn) => (
              <View key={fn.id} style={styles.facultyNoteCard}>
                <View style={styles.facultyNoteTop}>
                  <View style={[styles.facultyBadge, fn.visibility === 'community' ? { backgroundColor: Palette.aiPurpleLight } : null]}>
                    <Text style={[styles.facultyBadgeText, fn.visibility === 'community' ? { color: Palette.aiPurple } : null]}>
                      {fn.visibility === 'community' ? '🌍 COMMUNITY NOTE' : '🏫 MY COLLEGE NOTE'}
                    </Text>
                  </View>
                  <Text style={styles.facultyNoteAuthor}>
                    By {fn.facultyName} {fn.collegeName ? `• ${fn.collegeName}` : ''}
                  </Text>
                </View>

                <Text style={styles.facultyNoteTitle}>{fn.title}</Text>
                <Text style={styles.facultyNoteBody}>{fn.theory}</Text>

                {fn.importantConcepts && fn.importantConcepts.length > 0 && (
                  <View style={styles.fnKeyPointsBox}>
                    <Text style={styles.fnKeyPointsHeading}>Important Points:</Text>
                    {fn.importantConcepts.map((pt, i) => (
                      <Text key={i} style={styles.fnKeyPointText}>• {pt}</Text>
                    ))}
                  </View>
                )}

                {fn.quickRevision ? (
                  <View style={styles.fnQuickRevBox}>
                    <Text style={styles.fnQuickRevText}>💡 <Text style={{ fontWeight: '700' }}>Quick Revision:</Text> {fn.quickRevision}</Text>
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {/* 1. STANDARD STRUCTURED LESSON NOTES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>1. Structured Concept Notes</Text>
          <Text style={styles.sectionSubtitle}>Easy theory & foundational principles</Text>
        </View>

        {/* Theory Note Card */}
        <NoteCard title={`Understanding ${topicData.topic}`}>
          {topicData.theory}
        </NoteCard>

        {/* Important Concepts Bullet Card */}
        <RuleCard
          title="Important Concepts & High-Yield Rules"
          rules={topicData.importantConcepts}
        />

        {/* Formulas / Rules Card If available */}
        {topicData.formulas && topicData.formulas.length > 0 && (
          <RuleCard
            title="Core Formulas & Identity Equations"
            rules={topicData.formulas}
          />
        )}

        {/* Short Tricks & Tips Card */}
        {topicData.tipsTricks && topicData.tipsTricks.length > 0 && (
          <ExamTipCard
            exam="Competitive Exam Shortcuts"
            tip={topicData.tipsTricks.join('\n\n• ')}
          />
        )}

        {/* Solved Examples */}
        <View style={[styles.sectionHeader, { marginTop: 16 }]}>
          <Text style={styles.sectionTitle}>2. Step-by-Step Solved Examples</Text>
          <Text style={styles.sectionSubtitle}>Standard and tricky problem types</Text>
        </View>

        {topicData.examples.map((ex, idx) => (
          <ExampleCard
            key={idx}
            title={ex.title}
            example={ex.example}
            explanation={ex.explanation}
          />
        ))}

        {/* Exam-Focused Points & Common Mistakes */}
        <View style={styles.collapsiblesContainer}>
          <CollapsibleSection
            title="Exam & Interview Insights"
            subtitle="What technical panels test most frequently"
            defaultExpanded={true}
          >
            <Text style={styles.collapsibleBodyText}>
              {topicData.examPoints.map((pt, i) => `• ${pt}`).join('\n\n')}
            </Text>
          </CollapsibleSection>

          <CollapsibleSection
            title="Common Mistakes & Traps to Avoid"
            subtitle="Pitfalls that cost negative marks"
            defaultExpanded={false}
          >
            <Text style={[styles.collapsibleBodyText, { color: Palette.danger }]}>
              {topicData.commonMistakes.map((m, i) => `⚠️ ${m}`).join('\n\n')}
            </Text>
          </CollapsibleSection>
        </View>

        {/* 3. PREVIOUS YEAR QUESTIONS (VERIFIED) */}
        {topicData.pyqs && topicData.pyqs.length > 0 && (
          <View>
            <View style={styles.sectionHeader}>
              <View style={styles.pyqHeaderBadgeRow}>
                <Feather name="award" size={18} color={Palette.warning} />
                <Text style={styles.sectionTitle}>3. Previous Year Questions</Text>
              </View>
              <Text style={styles.sectionSubtitle}>Authentic questions from SSC, Banking, and PSC exams</Text>
            </View>

            <View style={styles.pyqList}>
              {topicData.pyqs.map((pyq) => {
                const isExpanded = selectedPyq === pyq.id;
                return (
                  <View key={pyq.id} style={styles.pyqCard}>
                    <View style={styles.pyqTopRow}>
                      <View style={styles.examTag}>
                        <Text style={styles.examTagText}>{pyq.exam} • {pyq.year}</Text>
                      </View>
                      <Text style={styles.pyqDiff}>{pyq.difficulty}</Text>
                    </View>

                    <Text style={styles.pyqQuestionText}>{pyq.question}</Text>

                    <View style={styles.pyqOptionsGrid}>
                      {pyq.options.map((opt, i) => (
                        <View
                          key={i}
                          style={[
                            styles.pyqOptionPill,
                            isExpanded && opt === pyq.correct && styles.pyqOptionCorrect,
                          ]}
                        >
                          <Text
                            style={[
                              styles.pyqOptionText,
                              isExpanded && opt === pyq.correct && styles.pyqOptionCorrectText,
                            ]}
                          >
                            {String.fromCharCode(65 + i)}. {opt}
                          </Text>
                        </View>
                      ))}
                    </View>

                    <TouchableOpacity
                      style={styles.viewAnswerBtn}
                      onPress={() => setSelectedPyq(isExpanded ? null : pyq.id)}
                    >
                      <Text style={styles.viewAnswerText}>
                        {isExpanded ? 'Hide Solution' : 'View Verified Answer & Explanation'}
                      </Text>
                      <Feather name={isExpanded ? 'chevron-up' : 'chevron-down'} size={14} color={Palette.primary} />
                    </TouchableOpacity>

                    {isExpanded && (
                      <View style={styles.pyqExplanationBox}>
                        <Text style={styles.pyqExplanationHeading}>
                          Correct Answer: <Text style={{ color: Palette.success, fontWeight: '700' }}>{pyq.correct}</Text>
                        </Text>
                        <Text style={styles.pyqExplanationBody}>{pyq.explanation}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* 4. START TOPIC QUIZ CTA */}
        <View style={styles.quizLauncherCard}>
          <Text style={styles.launcherTitle}>🎯 Ready for Topic Assessment?</Text>
          <Text style={styles.launcherDesc}>
            Test your knowledge with distraction-free, topic-specific quiz questions.
          </Text>

          <Text style={styles.countSelectorLabel}>SELECT NUMBER OF QUESTIONS:</Text>
          <View style={styles.countsRow}>
            {[5, 10, 15, 20].map((count) => (
              <TouchableOpacity
                key={count}
                style={[styles.countPill, quizCount === count && styles.countPillActive]}
                onPress={() => setQuizCount(count)}
              >
                <Text style={[styles.countText, quizCount === count && styles.countTextActive]}>
                  {count} Qs
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.startQuizBtn} onPress={startQuiz} activeOpacity={0.85}>
            <Text style={styles.startQuizBtnText}>Start {topicData.topic} Quiz</Text>
            <Feather name="arrow-right" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Palette.background },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 },
  header: { marginBottom: 18 },
  topicBadge: { alignSelf: 'flex-start', backgroundColor: Palette.primaryLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginBottom: 6 },
  topicBadgeText: { fontSize: 10, fontWeight: '800', color: Palette.primary, letterSpacing: 0.8 },
  title: { fontSize: 22, fontWeight: '800', color: Palette.textTitle, marginBottom: 4 },
  subtitle: { fontSize: 13.5, color: Palette.textSecondary, lineHeight: 19 },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: Palette.border,
    marginBottom: 20,
    ...Shadows.card,
  },
  progressTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  progressLabel: { fontSize: 11, fontWeight: '800', color: Palette.primary, letterSpacing: 0.8 },
  progressValue: { fontSize: 14, fontWeight: '700', color: Palette.textTitle },
  progressMeta: { fontSize: 12, color: Palette.textSecondary, marginTop: 8 },
  facultyVideoSection: { marginBottom: 20 },
  facultyVideoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: Palette.aiPurpleBorder,
    borderLeftWidth: 4,
    borderLeftColor: Palette.aiPurple,
    marginBottom: 10,
    ...Shadows.card,
  },
  videoHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  videoTag: { backgroundColor: Palette.aiPurpleLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  videoTagText: { fontSize: 10.5, fontWeight: '800', color: Palette.aiPurple },
  videoAuthorText: { fontSize: 11, color: Palette.textSecondary },
  videoTitle: { fontSize: 15, fontWeight: '800', color: Palette.textTitle, marginBottom: 4 },
  videoDesc: { fontSize: 12.5, color: Palette.textSecondary, marginBottom: 10, lineHeight: 17 },
  watchBtn: { backgroundColor: Palette.aiPurple, borderRadius: Radii.button, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  watchBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  facultyNotesSection: { marginBottom: 20 },
  facultyNoteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: Palette.primaryBorder,
    borderLeftWidth: 4,
    borderLeftColor: Palette.primary,
    marginBottom: 10,
    ...Shadows.card,
  },
  facultyNoteTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  facultyBadge: { backgroundColor: Palette.primaryLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  facultyBadgeText: { fontSize: 10.5, fontWeight: '800', color: Palette.primary },
  facultyNoteAuthor: { fontSize: 11, color: Palette.textSecondary },
  facultyNoteTitle: { fontSize: 15.5, fontWeight: '800', color: Palette.textTitle, marginBottom: 6 },
  facultyNoteBody: { fontSize: 13, color: Palette.textBody, lineHeight: 19, marginBottom: 10 },
  fnKeyPointsBox: { backgroundColor: Palette.backgroundSecondary, padding: 10, borderRadius: 8, marginBottom: 8 },
  fnKeyPointsHeading: { fontSize: 11.5, fontWeight: '700', color: Palette.textTitle, marginBottom: 4 },
  fnKeyPointText: { fontSize: 12, color: Palette.textBody, lineHeight: 17 },
  fnQuickRevBox: { backgroundColor: Palette.primaryLight, padding: 10, borderRadius: 8 },
  fnQuickRevText: { fontSize: 12, color: Palette.primary, lineHeight: 17 },
  sectionHeader: { marginBottom: 14, marginTop: 10 },
  pyqHeaderBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: Palette.textTitle },
  sectionSubtitle: { fontSize: 12, color: Palette.textSecondary, marginTop: 2 },
  collapsiblesContainer: { marginTop: 14, marginBottom: 20 },
  collapsibleBodyText: { fontSize: 13.5, color: Palette.textBody, lineHeight: 20 },
  pyqList: { gap: 12, marginBottom: 24 },
  pyqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: Palette.border,
    ...Shadows.card,
  },
  pyqTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  examTag: { backgroundColor: Palette.warningLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  examTagText: { fontSize: 11, fontWeight: '700', color: Palette.warning },
  pyqDiff: { fontSize: 11, color: Palette.textSecondary, fontWeight: '600' },
  pyqQuestionText: { fontSize: 14.5, fontWeight: '600', color: Palette.textTitle, lineHeight: 20, marginBottom: 12 },
  pyqOptionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  pyqOptionPill: {
    width: '48%',
    backgroundColor: Palette.backgroundSecondary,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  pyqOptionCorrect: { backgroundColor: Palette.successLight, borderColor: Palette.successBorder },
  pyqOptionText: { fontSize: 12.5, color: Palette.textBody },
  pyqOptionCorrectText: { color: Palette.success, fontWeight: '700' },
  viewAnswerBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingTop: 8, borderTopWidth: 1, borderTopColor: Palette.borderSubtle },
  viewAnswerText: { fontSize: 12.5, fontWeight: '700', color: Palette.primary },
  pyqExplanationBox: { backgroundColor: Palette.backgroundSecondary, padding: 12, borderRadius: 8, marginTop: 10 },
  pyqExplanationHeading: { fontSize: 12.5, fontWeight: '700', color: Palette.textTitle, marginBottom: 4 },
  pyqExplanationBody: { fontSize: 12, color: Palette.textBody, lineHeight: 17 },
  quizLauncherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.cardLarge,
    padding: 20,
    borderWidth: 1,
    borderColor: Palette.primaryBorder,
    borderTopWidth: 4,
    borderTopColor: Palette.primary,
    ...Shadows.floating,
  },
  launcherTitle: { fontSize: 18, fontWeight: '800', color: Palette.textTitle, marginBottom: 4 },
  launcherDesc: { fontSize: 13, color: Palette.textSecondary, marginBottom: 16 },
  countSelectorLabel: { fontSize: 10.5, fontWeight: '800', color: Palette.textTitle, letterSpacing: 0.6, marginBottom: 8 },
  countsRow: { flexDirection: 'row', gap: 8, marginBottom: 18 },
  countPill: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: Radii.pill,
    backgroundColor: Palette.backgroundSecondary,
    borderWidth: 1,
    borderColor: Palette.border,
    alignItems: 'center',
  },
  countPillActive: { backgroundColor: Palette.primary, borderColor: Palette.primary },
  countText: { fontSize: 12.5, fontWeight: '700', color: Palette.textSecondary },
  countTextActive: { color: '#FFFFFF' },
  startQuizBtn: {
    backgroundColor: Palette.primary,
    borderRadius: Radii.button,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...Shadows.button,
  },
  startQuizBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});
