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
import { AppHeader } from '../../components/common/AppHeader';
import { useTheme } from '../../components/theme-context';
import { QuestionMetadata } from '../../data/curriculumSchema';
import { FacultySystemStore } from '../../services/facultyStore';

export default function QuestionBankScreen() {
  const { isDark } = useTheme();
  const [bank, setBank] = useState<QuestionMetadata[]>([]);
  const [selectedSection, setSelectedSection] = useState<'all' | 'engineering' | 'competitive'>('all');
  const [selectedDiff, setSelectedDiff] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Add Question Modal State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSection, setNewSection] = useState<'engineering' | 'competitive'>('engineering');
  const [newSubject, setNewSubject] = useState('Embedded Systems');
  const [newTopic, setNewTopic] = useState('Microcontrollers');
  const [newQuestion, setNewQuestion] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  useEffect(() => {
    setBank(FacultySystemStore.getQuestionBank());
    return FacultySystemStore.subscribe(() => {
      setBank(FacultySystemStore.getQuestionBank());
    });
  }, []);

  const filtered = bank.filter((q) => {
    const matchSec = selectedSection === 'all' || q.section === selectedSection;
    const matchDiff = selectedDiff === 'all' || q.difficulty === selectedDiff;
    const matchSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSec && matchDiff && matchSearch;
  });

  const handleSaveQuestion = () => {
    if (!newQuestion.trim() || !optA.trim() || !optB.trim() || !optC.trim() || !optD.trim()) {
      Alert.alert('Incomplete Form', 'Please provide question statement and all 4 options.');
      return;
    }

    FacultySystemStore.addQuestionToBank({
      section: newSection,
      category: 'subjects',
      questionType: 'mcq',
      subject: newSubject.trim(),
      topic: newTopic.trim(),
      question: newQuestion.trim(),
      options: [optA.trim(), optB.trim(), optC.trim(), optD.trim()],
      correctAnswer,
      explanation: explanation.trim() || 'Verified answer by Faculty',
      difficulty,
    });

    Alert.alert('Question Added', 'Your question has been saved to the permanent Question Bank repository.');
    setShowAddForm(false);
    setNewQuestion('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setExplanation('');
  };

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#070B14" : "#FFFFFF"}
      />
      <AppHeader
        showBack
        title="Question Bank"
        subtitle="Permanent Assessment Repository"
        backLabel="Faculty Hub"
        onBack={() => router.push('/faculty-dashboard' as any)}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Top Search & Add Control */}
          <View style={styles.topControlRow}>
            <View style={[styles.searchBox, isDark && styles.searchBoxDark]}>
              <Feather name="search" size={16} color={isDark ? "#94A3B8" : "#64748B"} />
              <TextInput
                style={[styles.searchInput, isDark && styles.textWhite]}
                placeholder="Search by topic, keyword, or subject..."
                placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <TouchableOpacity
              style={[styles.addBtn, isDark && styles.addBtnDark]}
              onPress={() => setShowAddForm(!showAddForm)}
              activeOpacity={0.88}
            >
              <Feather name={showAddForm ? 'x' : 'plus'} size={16} color="#FFFFFF" />
              <Text style={styles.addBtnText}>{showAddForm ? 'Close' : 'Add Question'}</Text>
            </TouchableOpacity>
          </View>

          {/* Section Filter Pills */}
          <View style={styles.filterPillsRow}>
            {(['all', 'engineering', 'competitive'] as const).map((s) => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.filterPill,
                  isDark && styles.filterPillDark,
                  selectedSection === s && styles.filterPillActive,
                ]}
                onPress={() => setSelectedSection(s)}
              >
                <Text
                  style={[
                    styles.filterText,
                    isDark && styles.filterTextDark,
                    selectedSection === s && styles.filterTextActive,
                  ]}
                >
                  {s === 'all' ? 'All Sections' : s === 'engineering' ? 'Engineering' : 'Competitive'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Add Question Form Card */}
          {showAddForm && (
            <View style={[styles.addFormCard, isDark && styles.addFormCardDark]}>
              <Text style={[styles.formTitle, isDark && styles.textWhite]}>Author New Bank Question</Text>

              <View style={styles.rowInputs}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label, isDark && styles.labelDark]}>SUBJECT</Text>
                  <TextInput
                    style={[styles.input, isDark && styles.inputDark]}
                    value={newSubject}
                    onChangeText={setNewSubject}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label, isDark && styles.labelDark]}>TOPIC</Text>
                  <TextInput
                    style={[styles.input, isDark && styles.inputDark]}
                    value={newTopic}
                    onChangeText={setNewTopic}
                  />
                </View>
              </View>

              <Text style={[styles.label, { marginTop: 10 }, isDark && styles.labelDark]}>
                QUESTION STATEMENT *
              </Text>
              <TextInput
                style={[styles.input, styles.textArea, isDark && styles.inputDark]}
                placeholder="Type question statement clearly..."
                placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
                multiline
                value={newQuestion}
                onChangeText={setNewQuestion}
              />

              <Text style={[styles.label, { marginTop: 10 }, isDark && styles.labelDark]}>
                OPTIONS & CORRECT ANSWER (RADIO)
              </Text>

              {[
                { val: optA, set: setOptA, idx: 0, label: 'A' },
                { val: optB, set: setOptB, idx: 1, label: 'B' },
                { val: optC, set: setOptC, idx: 2, label: 'C' },
                { val: optD, set: setOptD, idx: 3, label: 'D' },
              ].map((item) => (
                <View key={item.idx} style={styles.optRow}>
                  <TouchableOpacity
                    style={[
                      styles.radio,
                      isDark && styles.radioDark,
                      correctAnswer === item.idx && styles.radioActive,
                    ]}
                    onPress={() => setCorrectAnswer(item.idx)}
                  >
                    {correctAnswer === item.idx && <View style={styles.radioDot} />}
                  </TouchableOpacity>
                  <TextInput
                    style={[styles.optInput, isDark && styles.optInputDark]}
                    placeholder={`Option ${item.label}`}
                    placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
                    value={item.val}
                    onChangeText={item.set}
                  />
                </View>
              ))}

              <Text style={[styles.label, { marginTop: 10 }, isDark && styles.labelDark]}>EXPLANATION</Text>
              <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                placeholder="Why is this answer correct?"
                placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
                value={explanation}
                onChangeText={setExplanation}
              />

              <TouchableOpacity
                style={[styles.saveBankBtn, isDark && styles.saveBankBtnDark]}
                onPress={handleSaveQuestion}
                activeOpacity={0.88}
              >
                <Text style={styles.saveBankBtnText}>Save Question to Bank →</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Questions List */}
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, isDark && styles.textWhite]}>
              Question Repository ({filtered.length})
            </Text>
          </View>

          <View style={styles.list}>
            {filtered.map((q) => (
              <View key={q.id} style={[styles.bankCard, isDark && styles.bankCardDark]}>
                <View style={styles.bankCardHeader}>
                  <View style={[styles.badge, isDark && styles.badgeDark]}>
                    <Text style={[styles.badgeText, isDark && styles.badgeTextDark]}>
                      {q.subject} • {q.topic}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => FacultySystemStore.deleteQuestionFromBank(q.id)}>
                    <Feather name="trash-2" size={15} color="#EF4444" />
                  </TouchableOpacity>
                </View>

                <Text style={[styles.qStatement, isDark && styles.textWhite]}>{q.question}</Text>

                <View style={styles.optionsList}>
                  {q.options?.map((opt, oIdx) => (
                    <Text
                      key={oIdx}
                      style={[
                        styles.opText,
                        isDark && styles.textMutedDark,
                        q.correctAnswer === oIdx && styles.opCorrect,
                      ]}
                    >
                      {String.fromCharCode(65 + oIdx)}. {opt} {q.correctAnswer === oIdx ? '✓ (Correct)' : ''}
                    </Text>
                  ))}
                </View>

                {q.explanation ? (
                  <View style={[styles.expBox, isDark && styles.expBoxDark]}>
                    <Text style={[styles.expText, isDark && styles.textMutedDark]}>
                      💡 Solution: {q.explanation}
                    </Text>
                  </View>
                ) : null}
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
  topControlRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  searchBoxDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 13,
    color: '#0f172a',
  },
  addBtn: {
    backgroundColor: '#0A192F',
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#0A192F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  addBtnDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
    borderWidth: 1,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  filterPillsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterPillDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  filterPillActive: {
    backgroundColor: '#0A192F',
    borderColor: '#0A192F',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  filterTextDark: {
    color: '#94A3B8',
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  addFormCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#eef2f6',
    marginBottom: 20,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  addFormCardDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 12,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 10,
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
    paddingVertical: 9,
    fontSize: 13,
    color: '#0f172a',
  },
  inputDark: {
    backgroundColor: '#070B14',
    borderColor: '#1E293B',
    color: '#F8FAFC',
  },
  textArea: {
    height: 60,
    textAlignVertical: 'top',
  },
  optRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
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
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0066FF',
  },
  optInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 12.5,
    color: '#0f172a',
  },
  optInputDark: {
    backgroundColor: '#070B14',
    borderColor: '#1E293B',
    color: '#F8FAFC',
  },
  saveBankBtn: {
    backgroundColor: '#0A192F',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 14,
    shadowColor: '#0A192F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  saveBankBtnDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
    borderWidth: 1,
  },
  saveBankBtnText: {
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
  list: {
    gap: 12,
  },
  bankCard: {
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
  bankCardDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  bankCardHeader: {
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
  qStatement: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 10,
    lineHeight: 20,
  },
  optionsList: {
    gap: 4,
    marginBottom: 10,
  },
  opText: {
    fontSize: 12.5,
    color: '#64748b',
  },
  opCorrect: {
    color: '#10B981',
    fontWeight: '700',
  },
  expBox: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  expBoxDark: {
    backgroundColor: '#070B14',
    borderColor: '#1E293B',
  },
  expText: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 16,
  },
  textWhite: {
    color: '#F8FAFC',
  },
  textMutedDark: {
    color: '#94A3B8',
  },
});
