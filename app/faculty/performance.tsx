import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppHeader } from '../../components/common/AppHeader';
import { ProgressBar } from '../../components/common/EducationalCards';
import { useTheme } from '../../components/theme-context';
import { StudentTopicPerformance } from '../../data/curriculumSchema';
import { FacultySystemStore } from '../../services/facultyStore';

export default function StudentPerformanceScreen() {
  const { isDark } = useTheme();
  const [students, setStudents] = useState<StudentTopicPerformance[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentTopicPerformance | null>(null);

  useEffect(() => {
    const list = FacultySystemStore.getStudentPerformances();
    setStudents(list);
    if (list.length > 0) setSelectedStudent(list[0]);
    return FacultySystemStore.subscribe(() => {
      const updated = FacultySystemStore.getStudentPerformances();
      setStudents(updated);
      if (updated.length > 0 && !selectedStudent) setSelectedStudent(updated[0]);
    });
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#070B14' : '#FFFFFF'} />
      <AppHeader showBack title="Student Performance Analytics" subtitle="Topic-Wise Progress Tracking" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Student Selector Bar */}
        <View style={styles.selectorSection}>
          <Text style={[styles.sectionHeading, isDark && styles.textMutedDark]}>SELECT ENROLLED STUDENT</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.studentChips}>
            {students.map((s) => {
              const isSelected = selectedStudent?.studentId === s.studentId;
              return (
                <TouchableOpacity
                  key={s.studentId}
                  style={[
                    styles.studentChip,
                    isDark && styles.studentChipDark,
                    isSelected && (isDark ? styles.studentChipActiveDark : styles.studentChipActive),
                  ]}
                  onPress={() => setSelectedStudent(s)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.avatarBox, isDark && styles.avatarBoxDark, isSelected && styles.avatarBoxActive]}>
                    <Text style={[styles.avatarLetter, isDark && styles.textWhite, isSelected && { color: '#FFFFFF' }]}>
                      {s.studentName.charAt(0)}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.studentChipName,
                        isDark && styles.textWhite,
                        isSelected && (isDark ? styles.textWhite : { color: '#0A192F' }),
                      ]}
                    >
                      {s.studentName}
                    </Text>
                    <Text style={[styles.studentChipScore, isDark && styles.textMutedDark]}>
                      Avg Score: {s.overallScore}%
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {selectedStudent && (
          <View style={styles.detailsContainer}>
            {/* Student Profile Card */}
            <View style={[styles.profileCard, isDark && styles.profileCardDark]}>
              <View style={styles.profileHeader}>
                <View style={styles.largeAvatar}>
                  <Text style={styles.largeAvatarText}>{selectedStudent.studentName.charAt(0)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.profileName, isDark && styles.textWhite]}>{selectedStudent.studentName}</Text>
                  <Text style={[styles.profileEmail, isDark && styles.textMutedDark]}>{selectedStudent.email}</Text>
                  <View style={[styles.proBadge, isDark && styles.proBadgeDark]}>
                    <Text style={[styles.proBadgeText, isDark && styles.proBadgeTextDark]}>
                      Level 4 Scholar • Top 10% Batch
                    </Text>
                  </View>
                </View>
              </View>

              {/* High-level metrics 4-grid */}
              <View style={[styles.metricsGrid, isDark && styles.metricsGridDark]}>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, isDark && styles.textMutedDark]}>QUIZ ACCURACY</Text>
                  <Text style={[styles.metricVal, { color: '#10B981' }]}>{selectedStudent.quizAccuracy}%</Text>
                </View>

                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, isDark && styles.textMutedDark]}>NOTES READ</Text>
                  <Text style={[styles.metricVal, isDark && styles.textWhite]}>{selectedStudent.notesCompletedCount}</Text>
                </View>

                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, isDark && styles.textMutedDark]}>CODING SOLVED</Text>
                  <Text style={[styles.metricVal, { color: '#2563EB' }]}>{selectedStudent.codingSolvedCount}</Text>
                </View>

                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, isDark && styles.textMutedDark]}>DSA PROGRESS</Text>
                  <Text style={[styles.metricVal, { color: '#8B5CF6' }]}>{selectedStudent.dsaProgressPct}%</Text>
                </View>
              </View>
            </View>

            {/* Topic-Wise Performance Breakdown */}
            <View style={[styles.topicBreakdownCard, isDark && styles.topicBreakdownCardDark]}>
              <View style={styles.breakdownHeader}>
                <Feather name="bar-chart-2" size={18} color={isDark ? '#60A5FA' : '#0A192F'} />
                <Text style={[styles.breakdownTitle, isDark && styles.textWhite]}>Granular Topic-Wise Mastery</Text>
              </View>

              <View style={styles.topicList}>
                {selectedStudent.topicMastery.map((tm, idx) => (
                  <View key={idx} style={styles.topicRow}>
                    <View style={styles.topicMetaRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.subjectTag, isDark && { color: '#60A5FA' }]}>{tm.subject}</Text>
                        <Text style={[styles.topicTitleText, isDark && styles.textWhite]}>{tm.topic}</Text>
                      </View>
                      <Text
                        style={[
                          styles.percentageText,
                          tm.percentage < 70 ? { color: '#F59E0B' } : { color: '#10B981' },
                        ]}
                      >
                        {tm.percentage}%
                      </Text>
                    </View>
                    <ProgressBar
                      progress={tm.percentage / 100}
                      color={tm.percentage < 70 ? '#F59E0B' : (isDark ? '#60A5FA' : '#0A192F')}
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  selectorSection: {
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  studentChips: {
    gap: 10,
    paddingVertical: 2,
  },
  studentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#eef2f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  studentChipDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  studentChipActive: {
    borderColor: '#0A192F',
    backgroundColor: '#F1F5F9',
  },
  studentChipActiveDark: {
    borderColor: '#60A5FA',
    backgroundColor: '#1E293B',
  },
  avatarBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarBoxDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  avatarBoxActive: {
    backgroundColor: '#0A192F',
  },
  avatarLetter: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
  },
  studentChipName: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0f172a',
  },
  studentChipScore: {
    fontSize: 11,
    color: '#64748b',
  },
  detailsContainer: {
    gap: 14,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#eef2f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  profileCardDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  largeAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0A192F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeAvatarText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  profileEmail: {
    fontSize: 12.5,
    color: '#64748b',
    marginTop: 1,
  },
  proBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 6,
  },
  proBadgeDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  proBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#0A192F',
  },
  proBadgeTextDark: {
    color: '#F8FAFC',
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  metricsGridDark: {
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.6,
  },
  metricVal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 2,
  },
  topicBreakdownCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#eef2f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  topicBreakdownCardDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  breakdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  breakdownTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
  },
  topicList: {
    gap: 14,
  },
  topicRow: {
    gap: 6,
  },
  topicMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectTag: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#2563EB',
  },
  topicTitleText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0f172a',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '800',
  },
  textWhite: {
    color: '#F8FAFC',
  },
  textMutedDark: {
    color: '#94A3B8',
  },
});
