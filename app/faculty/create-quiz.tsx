import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
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
import { TargetAudienceSelector } from '../../components/TargetAudienceSelector';
import { useAuth } from '../../components/auth-context';
import { AppHeader } from '../../components/common/AppHeader';
import { useTheme } from '../../components/theme-context';
import { TargetAudience } from '../../data/collegeData';
import { QuestionMetadata } from '../../data/curriculumSchema';
import { CollegeStore } from '../../services/collegeStore';
import { FacultySystemStore } from '../../services/facultyStore';

interface QuestionDraft {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  marks: number;
}

export default function CreateQuizScreen() {
  const { profile } = useAuth();
  const { isDark } = useTheme();
  const [section, setSection] = useState<'Engineering' | 'Competitive Exams'>('Engineering');
  const [subject, setSubject] = useState('Embedded Systems');
  const [topic, setTopic] = useState('Microcontrollers');
  const [subtopic, setSubtopic] = useState('NVIC & Timers');
  const [visibility, setVisibility] = useState<'college' | 'community'>('college');

  const [target, setTarget] = useState<TargetAudience>({
    targetType: 'SECTION',
    collegeId: profile.collegeId || 'clg-kvg',
    collegeName: profile.collegeName || 'KVG College of Engineering',
    department: profile.department || 'ECE',
    academicYear: '3rd Year',
    section: 'A',
  });

  // Quiz Meta
  const [quizName, setQuizName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('15');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [negativeMarks, setNegativeMarks] = useState('0.5');
  const [passingScore, setPassingScore] = useState('60');

  // Multiple Questions List
  const [questions, setQuestions] = useState<QuestionDraft[]>([
    {
      id: 'q-1',
      question: 'Which register in ARM Cortex-M enables atomic bit setting without read-modify-write?',
      options: ['ODR (Output Data Register)', 'BSRR (Bit Set/Reset Register)', 'IDR (Input Data Register)', 'MODER'],
      correctAnswer: 1,
      explanation: 'BSRR allows atomic pin setting in 1 CPU cycle, preventing race conditions.',
      marks: 2,
    },
    {
      id: 'q-2',
      question: 'What is the function of the SysTick timer in ARM Cortex-M?',
      options: [
        'Generates periodic RTOS tick interrupts',
        'PWM frequency carrier clock',
        'Calculates CRC parity bytes',
        'Monitors supply brownout voltages',
      ],
      correctAnswer: 0,
      explanation: 'SysTick is a 24-bit system timer embedded in ARM cores specifically intended for RTOS scheduling.',
      marks: 2,
    },
  ]);

  const handleAddQuestion = () => {
    const newQ: QuestionDraft = {
      id: `q-${Date.now()}`,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      marks: 2,
    };
    setQuestions([...questions, newQ]);
  };

  const handleUpdateQuestion = (index: number, field: keyof QuestionDraft, value: any) => {
    const updated = [...questions];
    (updated[index] as any)[field] = value;
    setQuestions(updated);
  };

  const handleUpdateOption = (qIdx: number, optIdx: number, text: string) => {
    const updated = [...questions];
    updated[qIdx].options[optIdx] = text;
    setQuestions(updated);
  };

  const handleDeleteQuestion = (index: number) => {
    if (questions.length <= 1) {
      Alert.alert('Cannot Delete', 'A quiz must have at least one question.');
      return;
    }
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const handleDuplicateQuestion = (index: number) => {
    const copy = { ...questions[index], id: `q-${Date.now()}` };
    const updated = [...questions];
    updated.splice(index + 1, 0, copy);
    setQuestions(updated);
  };

  const handlePublishQuiz = () => {
    if (!quizName.trim()) {
      Alert.alert('Missing Name', 'Please give your quiz a descriptive title.');
      return;
    }

    // Validate that questions have content
    const hasEmpty = questions.some((q) => !q.question.trim() || q.options.some((o) => !o.trim()));
    if (hasEmpty) {
      Alert.alert('Incomplete Questions', 'Please fill in question statements and all 4 options for every question.');
      return;
    }

    const compiledQuestions: QuestionMetadata[] = questions.map((q, idx) => ({
      id: `q-${Date.now()}-${idx + 1}`,
      section: section === 'Engineering' ? 'engineering' : 'competitive',
      category: 'subjects',
      subject,
      topic: topic.trim(),
      subtopic: subtopic.trim(),
      questionType: 'mcq',
      question: q.question.trim(),
      options: q.options.map((o) => o.trim()),
      correctAnswer: q.correctAnswer,
      explanation: q.explanation.trim() || 'Verified by Faculty',
      difficulty,
    }));

    FacultySystemStore.addQuiz({
      quizName: quizName.trim(),
      section: section === 'Engineering' ? 'engineering' : 'competitive',
      subject,
      topic: topic.trim(),
      subtopic: subtopic.trim(),
      description: description.trim() || `Department quiz on ${topic} (${section})`,
      durationMinutes: parseInt(duration, 10) || 15,
      difficulty,
      passingScore: parseInt(passingScore, 10) || 60,
      negativeMarks: parseFloat(negativeMarks) || 0,
      totalMarks: compiledQuestions.length,
      questions: compiledQuestions,
      facultyName: profile.name || 'Dr. Kusumadhara S',
      collegeId: profile.collegeId || 'clg-kvg',
      collegeName: profile.collegeName || 'KVG College of Engineering',
      facultyDepartment: profile.department || 'ECE',
      visibility,
      published: true,
    });

    if (visibility === 'college') {
      CollegeStore.dispatchNotification({
        studentId: 'std-101',
        collegeId: profile.collegeId || 'clg-kvg',
        title: '📝 New Department Quiz Published',
        message: `${profile.name || 'Faculty'}: "${quizName.trim()}" (${compiledQuestions.length} Qs, ${duration} mins).`,
        type: 'QUIZ',
        actionRoute: '/quizzpage',
        actionParams: {
          topic: topic.trim(),
          subject,
          section: section === 'Engineering' ? 'engineering' : 'competitive',
        },
      });

      Alert.alert(
        'Quiz Published! 🎉',
        `"${quizName}" with ${compiledQuestions.length} questions is now live. Enrolled students in ${profile.collegeName || 'your college'} received a notification.`
      );
    } else {
      Alert.alert(
        'Quiz Published Community-Wide! 🌍',
        `"${quizName}" is published to the Global SkillExa Quiz Arena. Students from all institutions can now practice this quiz!`
      );
    }

    setQuizName('');
    setDescription('');
  };

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#070B14" : "#FFFFFF"}
      />
      <AppHeader
        showBack
        title="Create Department Quiz"
        subtitle="Multi-Question Creator & Assessment Engine"
        backLabel="Faculty Hub"
        onBack={() => router.push('/faculty-dashboard' as any)}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Banner */}
          <View style={[styles.banner, isDark && styles.bannerDark]}>
            <View style={[styles.bannerIconBox, isDark && styles.bannerIconBoxDark]}>
              <Feather name="plus-circle" size={20} color={isDark ? "#38BDF8" : "#0066FF"} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.bannerTitle, isDark && styles.textWhite]}>Build Multi-Question Quiz</Text>
              <Text style={[styles.bannerDesc, isDark && styles.textMutedDark]}>
                Configure timing, negative scoring, automated evaluation, and publish to targeted batches.
              </Text>
            </View>
          </View>

          {/* Form Card 1: Quiz Details */}
          <View style={[styles.card, isDark && styles.cardDark]}>
            <Text style={[styles.cardHeader, isDark && styles.textWhite]}>1. Quiz Configuration & Target</Text>

            <Text style={[styles.label, isDark && styles.labelDark]}>QUIZ TITLE *</Text>
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="e.g. Unit 3 NVIC & Timers Assessment"
              placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
              value={quizName}
              onChangeText={setQuizName}
            />

            <View style={styles.inputGrid}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, isDark && styles.labelDark]}>SUBJECT</Text>
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  value={subject}
                  onChangeText={setSubject}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, isDark && styles.labelDark]}>TOPIC</Text>
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  value={topic}
                  onChangeText={setTopic}
                />
              </View>
            </View>

            <View style={[styles.inputGrid, { marginTop: 10 }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, isDark && styles.labelDark]}>DURATION (MINS)</Text>
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  keyboardType="numeric"
                  value={duration}
                  onChangeText={setDuration}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={[styles.label, isDark && styles.labelDark]}>NEGATIVE MARKING</Text>
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  keyboardType="numeric"
                  value={negativeMarks}
                  onChangeText={setNegativeMarks}
                />
              </View>
            </View>

            {/* Target Audience Delivery & Visibility */}
            <View style={{ marginTop: 14 }}>
              <TargetAudienceSelector
                visibility={visibility}
                onChangeVisibility={setVisibility}
                target={target}
                onChangeTarget={setTarget}
                collegeName={profile.collegeName || 'KVG College of Engineering'}
              />
            </View>
          </View>

          {/* Form Card 2: Question Blocks */}
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, isDark && styles.textWhite]}>
              Quiz Questions ({questions.length})
            </Text>
            <Text style={[styles.sectionSubtitle, isDark && styles.textMutedDark]}>
              Add, reorder, and configure answer keys with explanations
            </Text>
          </View>

          <View style={styles.questionsContainer}>
            {questions.map((q, qIdx) => (
              <View key={q.id} style={[styles.qBlockCard, isDark && styles.qBlockCardDark]}>
                <View style={styles.qBlockHeader}>
                  <View style={[styles.qIndexBadge, isDark && styles.qIndexBadgeDark]}>
                    <Text style={[styles.qIndexText, isDark && styles.qIndexTextDark]}>
                      QUESTION {qIdx + 1}
                    </Text>
                  </View>
                  <View style={styles.qActionsRow}>
                    <TouchableOpacity onPress={() => handleDuplicateQuestion(qIdx)} style={styles.actionBtn}>
                      <Feather name="copy" size={15} color={isDark ? "#38BDF8" : "#0066FF"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteQuestion(qIdx)} style={styles.actionBtn}>
                      <Feather name="trash-2" size={15} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Statement */}
                <Text style={[styles.label, isDark && styles.labelDark]}>QUESTION STATEMENT *</Text>
                <TextInput
                  style={[styles.input, styles.textArea, isDark && styles.inputDark]}
                  placeholder="Type question statement..."
                  placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
                  multiline
                  value={q.question}
                  onChangeText={(t) => handleUpdateQuestion(qIdx, 'question', t)}
                />

                {/* 4 Options */}
                <Text style={[styles.label, { marginTop: 12 }, isDark && styles.labelDark]}>
                  OPTIONS (SELECT RADIO FOR CORRECT ANSWER)
                </Text>
                {q.options.map((opt, optIdx) => (
                  <View key={optIdx} style={styles.optRow}>
                    <TouchableOpacity
                      style={[
                        styles.radio,
                        isDark && styles.radioDark,
                        q.correctAnswer === optIdx && styles.radioActive,
                      ]}
                      onPress={() => handleUpdateQuestion(qIdx, 'correctAnswer', optIdx)}
                    >
                      {q.correctAnswer === optIdx && <View style={styles.radioDot} />}
                    </TouchableOpacity>
                    <TextInput
                      style={[styles.optInput, isDark && styles.optInputDark]}
                      placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                      placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
                      value={opt}
                      onChangeText={(t) => handleUpdateOption(qIdx, optIdx, t)}
                    />
                  </View>
                ))}

                {/* Explanation */}
                <Text style={[styles.label, { marginTop: 12 }, isDark && styles.labelDark]}>
                  EXPLANATION & SOLUTION
                </Text>
                <TextInput
                  style={[styles.input, { height: 50 }, isDark && styles.inputDark]}
                  placeholder="Why is this answer correct?"
                  placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
                  multiline
                  value={q.explanation}
                  onChangeText={(t) => handleUpdateQuestion(qIdx, 'explanation', t)}
                />
              </View>
            ))}
          </View>

          {/* Add Question Button */}
          <TouchableOpacity
            style={[styles.addQBtn, isDark && styles.addQBtnDark]}
            onPress={handleAddQuestion}
            activeOpacity={0.8}
          >
            <Feather name="plus" size={17} color={isDark ? "#38BDF8" : "#0066FF"} />
            <Text style={[styles.addQBtnText, isDark && styles.addQBtnTextDark]}>
              Add Another Question
            </Text>
          </TouchableOpacity>

          {/* Final Actions */}
          <View style={styles.finalActionsRow}>
            <TouchableOpacity
              style={[styles.draftBtn, isDark && styles.draftBtnDark]}
              onPress={() => Alert.alert('Draft Saved', 'Quiz draft has been saved.')}
            >
              <Text style={[styles.draftBtnText, isDark && styles.textWhite]}>Save Draft</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.publishQuizBtn, isDark && styles.publishQuizBtnDark]}
              onPress={handlePublishQuiz}
              activeOpacity={0.88}
            >
              <Feather name="check-circle" size={16} color="#FFFFFF" />
              <Text style={styles.publishQuizBtnText}>Publish Quiz ({questions.length} Qs) →</Text>
            </TouchableOpacity>
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
  inputGrid: {
    flexDirection: 'row',
    gap: 12,
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
  textArea: {
    height: 64,
    textAlignVertical: 'top',
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
  questionsContainer: {
    gap: 14,
    marginBottom: 16,
  },
  qBlockCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#eef2f6',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  qBlockCardDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  qBlockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  qIndexBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  qIndexBadgeDark: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  qIndexText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0066FF',
  },
  qIndexTextDark: {
    color: '#38BDF8',
  },
  qActionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    padding: 4,
  },
  optRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDark: {
    borderColor: '#475569',
  },
  radioActive: {
    borderColor: '#0066FF',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0066FF',
  },
  optInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13,
    color: '#0f172a',
  },
  optInputDark: {
    backgroundColor: '#070B14',
    borderColor: '#1E293B',
    color: '#F8FAFC',
  },
  addQBtn: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 20,
  },
  addQBtnDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  addQBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0066FF',
  },
  addQBtnTextDark: {
    color: '#38BDF8',
  },
  finalActionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  draftBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  draftBtnDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  draftBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#334155',
  },
  publishQuizBtn: {
    flex: 1.5,
    backgroundColor: '#0A192F',
    borderRadius: 12,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#0A192F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  publishQuizBtnDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
    borderWidth: 1,
  },
  publishQuizBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  textWhite: {
    color: '#F8FAFC',
  },
  textMutedDark: {
    color: '#94A3B8',
  },
});
