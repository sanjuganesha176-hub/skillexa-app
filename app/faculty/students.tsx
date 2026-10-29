import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../../components/auth-context';
import { AppHeader } from '../../components/common/AppHeader';
import { ProgressBar } from '../../components/common/EducationalCards';
import { useTheme } from '../../components/theme-context';
import { StudentTopicPerformance } from '../../data/curriculumSchema';
import { FacultySystemStore } from '../../services/facultyStore';

export default function FacultyStudentsScreen() {
  const { profile } = useAuth();
  const { isDark } = useTheme();
  const [students] = useState<StudentTopicPerformance[]>(
    FacultySystemStore.getStudentPerformances()
  );
  const [selectedYear, setSelectedYear] = useState<string>('3rd Year');
  const [selectedSection, setSelectedSection] = useState<string>('A');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<StudentTopicPerformance | null>(null);

  const filteredStudents = students.filter((s) => {
    return s.studentName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#070B14" : "#FFFFFF"}
      />
      <AppHeader
        showBack
        title="My Students"
        subtitle={`${profile.collegeName || 'KVG College of Engineering'} • ${profile.department || 'ECE'} Dept`}
        backLabel="Faculty Hub"
        onBack={() => router.push('/faculty-dashboard' as any)}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Class Filter Bar */}
          <View style={[styles.filterCard, isDark && styles.filterCardDark]}>
            <Text style={[styles.filterTitle, isDark && styles.filterTitleDark]}>
              SELECT CLASS BATCH
            </Text>

            <View style={styles.pillsRow}>
              {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((y) => (
                <TouchableOpacity
                  key={y}
                  style={[
                    styles.pill,
                    isDark && styles.pillDark,
                    selectedYear === y && styles.pillActive,
                  ]}
                  onPress={() => setSelectedYear(y)}
                >
                  <Text
                    style={[
                      styles.pillText,
                      isDark && styles.pillTextDark,
                      selectedYear === y && styles.pillTextActive,
                    ]}
                  >
                    {y}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={[styles.pillsRow, { marginTop: 8 }]}>
              {['A', 'B', 'C'].map((sec) => (
                <TouchableOpacity
                  key={sec}
                  style={[
                    styles.pill,
                    isDark && styles.pillDark,
                    selectedSection === sec && styles.pillActive,
                  ]}
                  onPress={() => setSelectedSection(sec)}
                >
                  <Text
                    style={[
                      styles.pillText,
                      isDark && styles.pillTextDark,
                      selectedSection === sec && styles.pillTextActive,
                    ]}
                  >
                    Section {sec}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Search Box */}
            <View style={[styles.searchBox, isDark && styles.searchBoxDark]}>
              <Feather name="search" size={16} color={isDark ? "#94A3B8" : "#64748B"} />
              <TextInput
                style={[styles.searchInput, isDark && styles.textWhite]}
                placeholder="Search student by name or ID..."
                placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Student Cards List */}
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, isDark && styles.textWhite]}>
              Enrolled Students ({filteredStudents.length})
            </Text>
            <Text style={[styles.sectionSubtitle, isDark && styles.textMutedDark]}>
              {profile.department || 'ECE'} • {selectedYear} • Section {selectedSection}
            </Text>
          </View>

          <View style={styles.studentsList}>
            {filteredStudents.map((std) => (
              <TouchableOpacity
                key={std.studentId}
                style={[styles.stdCard, isDark && styles.stdCardDark]}
                onPress={() => setSelectedStudent(std)}
                activeOpacity={0.88}
              >
                <View style={styles.stdCardHeader}>
                  <View style={[styles.avatar, isDark && styles.avatarDark]}>
                    <Text style={[styles.avatarLetter, isDark && styles.avatarLetterDark]}>
                      {std.studentName.charAt(0)}
                    </Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={[styles.stdName, isDark && styles.textWhite]}>
                      {std.studentName}
                    </Text>
                    <Text style={[styles.stdEmail, isDark && styles.textMutedDark]}>
                      {std.email} • {selectedYear} Sec {selectedSection}
                    </Text>
                  </View>

                  <View style={[styles.scorePill, isDark && styles.scorePillDark]}>
                    <Text style={[styles.scorePillText, isDark && styles.scorePillTextDark]}>
                      {std.overallScore}% Avg
                    </Text>
                  </View>
                </View>

                {/* 4-Stat Grid */}
                <View style={[styles.statsGrid, isDark && styles.statsGridDark]}>
                  <View style={styles.statBox}>
                    <Text style={[styles.statLabel, isDark && styles.textMutedDark]}>QUIZ ACCURACY</Text>
                    <Text style={[styles.statVal, { color: '#10B981' }]}>{std.quizAccuracy}%</Text>
                  </View>

                  <View style={styles.statBox}>
                    <Text style={[styles.statLabel, isDark && styles.textMutedDark]}>NOTES READ</Text>
                    <Text style={[styles.statVal, isDark && styles.textWhite]}>{std.notesCompletedCount}</Text>
                  </View>

                  <View style={styles.statBox}>
                    <Text style={[styles.statLabel, isDark && styles.textMutedDark]}>CODING SOLVED</Text>
                    <Text style={[styles.statVal, { color: isDark ? '#38BDF8' : '#0066FF' }]}>{std.codingSolvedCount}</Text>
                  </View>

                  <View style={styles.statBox}>
                    <Text style={[styles.statLabel, isDark && styles.textMutedDark]}>INTERVIEW</Text>
                    <Text style={[styles.statVal, { color: isDark ? '#C084FC' : '#6366F1' }]}>{std.interviewsScore}%</Text>
                  </View>
                </View>

                {/* Topic Progress Sample */}
                <View style={styles.topicMiniRow}>
                  <Text style={[styles.topicMiniTitle, isDark && styles.textMutedDark]}>
                    Embedded Systems • Microcontrollers:
                  </Text>
                  <Text style={[styles.topicMiniVal, { color: isDark ? '#38BDF8' : '#0066FF' }]}>
                    74%
                  </Text>
                </View>
                <ProgressBar progress={0.74} color={isDark ? '#38BDF8' : '#0066FF'} />
              </TouchableOpacity>
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
  filterCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eef2f6',
    marginBottom: 20,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  filterCardDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  filterTitle: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#334155',
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  filterTitleDark: {
    color: '#94A3B8',
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  pillDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  pillActive: {
    backgroundColor: '#0A192F',
    borderColor: '#0A192F',
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  pillTextDark: {
    color: '#94A3B8',
  },
  pillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
    marginTop: 14,
  },
  searchBoxDark: {
    backgroundColor: '#070B14',
    borderColor: '#1E293B',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 9,
    fontSize: 13,
    color: '#0f172a',
  },
  sectionHeaderRow: {
    marginBottom: 14,
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
  studentsList: {
    gap: 14,
  },
  stdCard: {
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
  stdCardDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  stdCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarDark: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  avatarLetter: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0066FF',
  },
  avatarLetterDark: {
    color: '#38BDF8',
  },
  stdName: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#0f172a',
  },
  stdEmail: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  scorePill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  scorePillDark: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  scorePillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#10B981',
  },
  scorePillTextDark: {
    color: '#10B981',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 10,
  },
  statsGridDark: {
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.5,
  },
  statVal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 2,
  },
  topicMiniRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  topicMiniTitle: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#64748b',
  },
  topicMiniVal: {
    fontSize: 11.5,
    fontWeight: '800',
  },
  textWhite: {
    color: '#F8FAFC',
  },
  textMutedDark: {
    color: '#94A3B8',
  },
});
