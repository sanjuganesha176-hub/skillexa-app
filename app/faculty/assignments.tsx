import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AppHeader } from '../../components/common/AppHeader';
import { useTheme } from '../../components/theme-context';
import { FacultyQuiz, StudentQuizSubmission } from '../../data/curriculumSchema';
import { FacultySystemStore } from '../../services/facultyStore';

export default function AssignmentsScreen() {
  const { isDark } = useTheme();
  const [quizzes, setQuizzes] = useState<FacultyQuiz[]>([]);
  const [submissions, setSubmissions] = useState<StudentQuizSubmission[]>([]);

  useEffect(() => {
    setQuizzes(FacultySystemStore.getQuizzes());
    setSubmissions(FacultySystemStore.getSubmissions());
    return FacultySystemStore.subscribe(() => {
      setQuizzes(FacultySystemStore.getQuizzes());
      setSubmissions(FacultySystemStore.getSubmissions());
    });
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#070B14" : "#FFFFFF"}
      />
      <AppHeader
        showBack
        title="Assignments & Grading"
        subtitle="Manage Assigned Quizzes & Results"
        backLabel="Faculty Hub"
        onBack={() => router.push('/faculty-dashboard' as any)}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Banner */}
          <View style={[styles.banner, isDark && styles.bannerDark]}>
            <View style={[styles.bannerIconBox, isDark && styles.bannerIconBoxDark]}>
              <Feather name="check-square" size={20} color={isDark ? "#C084FC" : "#6366F1"} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.bannerTitle, isDark && styles.textWhite]}>
                Class Assignments & Live Submissions
              </Text>
              <Text style={[styles.bannerDesc, isDark && styles.textMutedDark]}>
                Track student submissions, accuracy rates, and time taken per assessment.
              </Text>
            </View>
          </View>

          {/* 1. Active Assigned Quizzes */}
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, isDark && styles.textWhite]}>
              Active Assigned Quizzes ({quizzes.length})
            </Text>
          </View>

          <View style={styles.quizzesList}>
            {quizzes.map((q) => (
              <View key={q.id} style={[styles.quizCard, isDark && styles.quizCardDark]}>
                <View style={styles.quizTop}>
                  <View style={[styles.badge, isDark && styles.badgeDark]}>
                    <Text style={[styles.badgeText, isDark && styles.badgeTextDark]}>
                      {q.subject} • {q.topic}
                    </Text>
                  </View>
                  <Text style={[styles.durationText, isDark && styles.textMutedDark]}>
                    {q.durationMinutes} Mins • {q.totalMarks} Marks
                  </Text>
                </View>

                <Text style={[styles.quizTitle, isDark && styles.textWhite]}>{q.quizName}</Text>
                <Text style={[styles.quizDesc, isDark && styles.textMutedDark]}>{q.description}</Text>

                <View style={[styles.classesRow, isDark && styles.classesRowDark]}>
                  <Feather name="users" size={13} color={isDark ? "#94A3B8" : "#64748B"} />
                  <Text style={[styles.classesText, isDark && styles.textMutedDark]}>
                    Assigned to: {(q.assignedClasses || ['All Students']).join(', ')}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* 2. Student Submissions Feed */}
          <View style={[styles.sectionHeaderRow, { marginTop: 20 }]}>
            <Text style={[styles.sectionTitle, isDark && styles.textWhite]}>
              Recent Student Submissions ({submissions.length})
            </Text>
            <Text style={[styles.sectionSubtitle, isDark && styles.textMutedDark]}>
              Real-time auto-graded results
            </Text>
          </View>

          <View style={styles.submissionsList}>
            {submissions.map((sub) => (
              <View key={sub.id} style={[styles.submissionCard, isDark && styles.submissionCardDark]}>
                <View style={styles.subCardTop}>
                  <View style={styles.studentInfoCol}>
                    <Text style={[styles.studentName, isDark && styles.textWhite]}>{sub.studentName}</Text>
                    <Text style={[styles.subMetaText, isDark && styles.textMutedDark]}>
                      {sub.quizTitle} • {sub.submittedAt}
                    </Text>
                  </View>
                  <View style={[styles.scoreCircle, isDark && styles.scoreCircleDark]}>
                    <Text style={[styles.scoreNum, isDark && styles.scoreNumDark]}>{sub.score}</Text>
                    <Text style={[styles.scoreDen, isDark && styles.scoreDenDark]}>/{sub.totalMarks}</Text>
                  </View>
                </View>

                <View style={[styles.subStatsRow, isDark && styles.subStatsRowDark]}>
                  <View style={styles.subStatItem}>
                    <Text style={[styles.subStatLabel, isDark && styles.textMutedDark]}>ACCURACY</Text>
                    <Text style={[styles.subStatVal, { color: '#10B981' }]}>{sub.accuracy}%</Text>
                  </View>
                  <View style={styles.subStatItem}>
                    <Text style={[styles.subStatLabel, isDark && styles.textMutedDark]}>CORRECT</Text>
                    <Text style={[styles.subStatVal, isDark && styles.textWhite]}>{sub.correctAnswersCount}</Text>
                  </View>
                  <View style={styles.subStatItem}>
                    <Text style={[styles.subStatLabel, isDark && styles.textMutedDark]}>WRONG</Text>
                    <Text style={[styles.subStatVal, { color: '#EF4444' }]}>{sub.wrongAnswersCount}</Text>
                  </View>
                  <View style={styles.subStatItem}>
                    <Text style={[styles.subStatLabel, isDark && styles.textMutedDark]}>TIME</Text>
                    <Text style={[styles.subStatVal, isDark && styles.textWhite]}>{sub.timeSpent}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeAreaDark: {
    backgroundColor: '#070B14',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 48,
  },
  container: {
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
  },
  banner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eef2f6',
    borderLeftWidth: 4,
    borderLeftColor: '#6366F1',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  bannerDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
    borderLeftColor: '#818CF8',
  },
  bannerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerIconBoxDark: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
  },
  bannerTitle: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#0f172a',
  },
  bannerDesc: {
    fontSize: 12.5,
    color: '#64748b',
    marginTop: 2,
    lineHeight: 17,
  },
  sectionHeaderRow: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
  },
  sectionSubtitle: {
    fontSize: 12.5,
    color: '#64748b',
    marginTop: 2,
  },
  quizzesList: {
    gap: 12,
    marginBottom: 10,
  },
  quizCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eef2f6',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  quizCardDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  quizTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeDark: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#0066FF',
  },
  badgeTextDark: {
    color: '#38BDF8',
  },
  durationText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  quizTitle: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
  },
  quizDesc: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
    marginBottom: 10,
  },
  classesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  classesRowDark: {
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  classesText: {
    fontSize: 12,
    color: '#64748b',
  },
  submissionsList: {
    gap: 12,
  },
  submissionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eef2f6',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  submissionCardDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  subCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentInfoCol: {
    flex: 1,
  },
  studentName: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#0f172a',
  },
  subMetaText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  scoreCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreCircleDark: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  scoreNum: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0066FF',
  },
  scoreNumDark: {
    color: '#38BDF8',
  },
  scoreDen: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#0066FF',
  },
  scoreDenDark: {
    color: '#38BDF8',
  },
  subStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  subStatsRowDark: {
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  subStatItem: {
    alignItems: 'center',
  },
  subStatLabel: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.5,
  },
  subStatVal: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 2,
  },
  textWhite: {
    color: '#F8FAFC',
  },
  textMutedDark: {
    color: '#94A3B8',
  },
});
