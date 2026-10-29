import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
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
import { useTheme } from '../../components/theme-context';
import { FacultyInterview } from '../../data/curriculumSchema';
import { CollegeStore } from '../../services/collegeStore';
import { FacultySystemStore } from '../../services/facultyStore';

const INTERVIEW_TYPES = [
  'Technical Interview',
  'HR Interview',
  'Coding Interview',
  'Engineering Viva',
  'Project Viva',
  'Placement Interview',
  'Custom Interview',
];

export default function FacultyInterviewScreen() {
  const { profile } = useAuth();
  const { isDark } = useTheme();
  const [interviews, setInterviews] = useState<FacultyInterview[]>([]);
  const [studentName, setStudentName] = useState('Ganesh Sharan');
  const [selectedType, setSelectedType] = useState('Technical Interview');
  const [role, setRole] = useState('Embedded Systems & IoT Engineer');
  const [scheduledTime, setScheduledTime] = useState('Tomorrow, 11:00 AM');
  const [questions, setQuestions] = useState<string[]>([
    'What is an embedded system and how does it differ from a general-purpose computer?',
    'Explain the differences between Microprocessors and Microcontrollers.',
    'What is an interrupt and how does the NVIC prevent priority inversion?',
    'Explain the role of a Watchdog Timer (WDT) in safety-critical firmware.',
    'Compare I2C, SPI, and UART in terms of wiring, speed, and communication distance.',
  ]);
  const [newQ, setNewQ] = useState('');

  useEffect(() => {
    setInterviews(FacultySystemStore.getInterviews());
    return FacultySystemStore.subscribe(() => {
      setInterviews(FacultySystemStore.getInterviews());
    });
  }, []);

  const handleAddQuestion = () => {
    if (!newQ.trim()) return;
    setQuestions([...questions, newQ.trim()]);
    setNewQ('');
  };

  const handleRemoveQuestion = (idx: number) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleScheduleInterview = () => {
    if (!studentName.trim() || !role.trim() || questions.length === 0) {
      Alert.alert('Incomplete Details', 'Please provide student name, role/subject, and at least 1 question.');
      return;
    }

    FacultySystemStore.addInterview({
      studentId: 'std-101',
      studentName: studentName.trim(),
      interviewType: selectedType as any,
      subjectOrRole: role.trim(),
      difficulty: 'medium',
      scheduledTime: scheduledTime.trim() || 'Scheduled',
      status: 'Scheduled',
      questions,
      facultyName: profile.name || 'Dr. Ramesh Kumar',
    });

    CollegeStore.dispatchNotification({
      studentId: 'std-101',
      collegeId: profile.collegeId || 'clg-kvg',
      title: '🎤 Interview Invitation',
      message: `${profile.name || 'Faculty'} scheduled a ${selectedType} for ${role.trim()} (${scheduledTime.trim()}).`,
      type: 'INTERVIEW',
      actionRoute: '/my-college',
    });

    Alert.alert('Interview Scheduled!', `Interview invitation created for ${studentName}. The student has been notified on their College workspace.`);
  };

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#070B14" : "#FFFFFF"}
      />
      <AppHeader
        showBack
        title="Take & Schedule Interviews"
        subtitle="Faculty Interview Portal"
        backLabel="Faculty Hub"
        onBack={() => router.push('/faculty-dashboard' as any)}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Banner */}
          <View style={[styles.banner, isDark && styles.bannerDark]}>
            <View style={[styles.bannerIconBox, isDark && styles.bannerIconBoxDark]}>
              <Feather name="message-square" size={20} color={isDark ? "#38BDF8" : "#0066FF"} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.bannerTitle, isDark && styles.textWhite]}>Faculty Viva & Placement Panels</Text>
              <Text style={[styles.bannerDesc, isDark && styles.textMutedDark]}>
                Conduct custom interviews with question prompts and live evaluation scorecards.
              </Text>
            </View>
          </View>

          {/* Setup Form */}
          <View style={[styles.card, isDark && styles.cardDark]}>
            <Text style={[styles.cardHeader, isDark && styles.textWhite]}>1. Interview Configuration</Text>

            <Text style={[styles.label, isDark && styles.labelDark]}>STUDENT NAME</Text>
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              value={studentName}
              onChangeText={setStudentName}
            />

            <Text style={[styles.label, { marginTop: 12 }, isDark && styles.labelDark]}>INTERVIEW TYPE</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
              {INTERVIEW_TYPES.map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[
                    styles.chip,
                    isDark && styles.chipDark,
                    selectedType === t && styles.chipActive,
                  ]}
                  onPress={() => setSelectedType(t)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      isDark && styles.chipTextDark,
                      selectedType === t && styles.chipTextActive,
                    ]}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={[styles.gridRow, { marginTop: 12 }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, isDark && styles.labelDark]}>ROLE / SUBJECT</Text>
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  value={role}
                  onChangeText={setRole}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, isDark && styles.labelDark]}>DATE / TIME</Text>
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  value={scheduledTime}
                  onChangeText={setScheduledTime}
                />
              </View>
            </View>

            {/* Questions Prompts List */}
            <Text style={[styles.label, { marginTop: 14 }, isDark && styles.labelDark]}>
              INTERVIEW QUESTIONS LIST ({questions.length})
            </Text>
            <View style={styles.questionsList}>
              {questions.map((q, idx) => (
                <View key={idx} style={[styles.qItemRow, isDark && styles.qItemRowDark]}>
                  <Text style={[styles.qItemNum, isDark && styles.qItemNumDark]}>Q{idx + 1}.</Text>
                  <Text style={[styles.qItemText, isDark && styles.textWhite]}>{q}</Text>
                  <TouchableOpacity onPress={() => handleRemoveQuestion(idx)} style={styles.deleteQBtn}>
                    <Feather name="x" size={14} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Add Question Input */}
            <View style={styles.addQRow}>
              <TextInput
                style={[styles.input, { flex: 1 }, isDark && styles.inputDark]}
                placeholder="Add question prompt..."
                placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
                value={newQ}
                onChangeText={setNewQ}
              />
              <TouchableOpacity
                style={[styles.addQBtn, isDark && styles.addQBtnDark]}
                onPress={handleAddQuestion}
              >
                <Text style={[styles.addQBtnText, isDark && styles.addQBtnTextDark]}>+ Add</Text>
              </TouchableOpacity>
            </View>

            {/* Schedule / Launch Action */}
            <View style={styles.btnRow}>
              <TouchableOpacity
                style={[styles.scheduleBtn, isDark && styles.scheduleBtnDark]}
                onPress={handleScheduleInterview}
              >
                <Feather name="calendar" size={15} color={isDark ? "#38BDF8" : "#0066FF"} />
                <Text style={[styles.scheduleBtnText, isDark && styles.scheduleBtnTextDark]}>Schedule</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.startLiveBtn}
                onPress={() =>
                  router.push({
                    pathname: '/faculty/live-interview',
                    params: {
                      studentName,
                      role,
                      interviewType: selectedType,
                    },
                  })
                }
              >
                <Feather name="video" size={15} color="#FFFFFF" />
                <Text style={styles.startLiveBtnText}>Launch Live Room →</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Existing Interviews */}
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, isDark && styles.textWhite]}>
              Scheduled & Completed Interviews ({interviews.length})
            </Text>
          </View>

          <View style={styles.interviewsList}>
            {interviews.map((item) => (
              <View key={item.id} style={[styles.interviewCard, isDark && styles.interviewCardDark]}>
                <View style={styles.intCardTop}>
                  <View>
                    <Text style={[styles.intStudentName, isDark && styles.textWhite]}>{item.studentName}</Text>
                    <Text style={[styles.intMetaText, isDark && styles.textMutedDark]}>{item.interviewType} • {item.subjectOrRole}</Text>
                  </View>
                  <View style={[styles.statusPill, isDark && styles.statusPillDark]}>
                    <Text style={[styles.statusPillText, isDark && styles.statusPillTextDark]}>{item.status}</Text>
                  </View>
                </View>

                <Text style={[styles.intTimeText, isDark && styles.textMutedDark]}>
                  🕒 {item.scheduledTime} • {item.questions.length} Questions
                </Text>

                <View style={[styles.intActions, isDark && styles.intActionsDark]}>
                  <TouchableOpacity
                    style={styles.enterRoomBtn}
                    onPress={() =>
                      router.push({
                        pathname: '/faculty/live-interview',
                        params: {
                          studentName: item.studentName,
                          role: item.subjectOrRole,
                          interviewType: item.interviewType,
                        },
                      })
                    }
                  >
                    <Feather name="video" size={13} color="#FFFFFF" />
                    <Text style={styles.enterRoomText}>Enter Video Call</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.evalBtn, isDark && styles.evalBtnDark]}
                    onPress={() =>
                      router.push({
                        pathname: '/faculty/evaluation',
                        params: {
                          interviewId: item.id,
                          studentName: item.studentName,
                          role: item.subjectOrRole,
                        },
                      })
                    }
                  >
                    <Text style={[styles.evalBtnText, isDark && styles.textWhite]}>Evaluate & Grade</Text>
                  </TouchableOpacity>
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
    borderLeftColor: '#0066FF',
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
    borderLeftColor: '#38BDF8',
  },
  bannerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerIconBoxDark: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#eef2f6',
    marginBottom: 24,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  cardHeader: {
    fontSize: 16.5,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 14,
  },
  label: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#334155',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  labelDark: {
    color: '#94A3B8',
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#0f172a',
  },
  inputDark: {
    backgroundColor: '#070B14',
    borderColor: '#1E293B',
    color: '#F8FAFC',
  },
  chipsRow: {
    gap: 8,
    paddingVertical: 2,
    marginBottom: 10,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  chipActive: {
    backgroundColor: '#0A192F',
    borderColor: '#0A192F',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  chipTextDark: {
    color: '#94A3B8',
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
  },
  questionsList: {
    gap: 8,
    marginBottom: 12,
  },
  qItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  qItemRowDark: {
    backgroundColor: '#070B14',
    borderColor: '#1E293B',
  },
  qItemNum: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0066FF',
  },
  qItemNumDark: {
    color: '#38BDF8',
  },
  qItemText: {
    flex: 1,
    fontSize: 12.5,
    color: '#0f172a',
    lineHeight: 17,
  },
  deleteQBtn: {
    padding: 4,
  },
  addQRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  addQBtn: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 14,
    borderRadius: 12,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 102, 255, 0.25)',
  },
  addQBtnDark: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  addQBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0066FF',
  },
  addQBtnTextDark: {
    color: '#38BDF8',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  scheduleBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  scheduleBtnDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  scheduleBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0066FF',
  },
  scheduleBtnTextDark: {
    color: '#38BDF8',
  },
  startLiveBtn: {
    flex: 1.5,
    backgroundColor: '#0A192F',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    shadowColor: '#0A192F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  startLiveBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '700',
  },
  sectionHeaderRow: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
  },
  interviewsList: {
    gap: 12,
  },
  interviewCard: {
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
  interviewCardDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  intCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  intStudentName: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#0f172a',
  },
  intMetaText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  statusPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusPillDark: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
  },
  statusPillTextDark: {
    color: '#10B981',
  },
  intTimeText: {
    fontSize: 12.5,
    color: '#64748b',
    marginBottom: 12,
  },
  intActions: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  intActionsDark: {
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  enterRoomBtn: {
    flex: 1,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  enterRoomText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  evalBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingVertical: 9,
    alignItems: 'center',
  },
  evalBtnDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  evalBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },
  textWhite: {
    color: '#F8FAFC',
  },
  textMutedDark: {
    color: '#94A3B8',
  },
});
