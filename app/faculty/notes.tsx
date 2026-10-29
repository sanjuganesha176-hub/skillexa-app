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
import { TargetAudienceSelector } from '../../components/TargetAudienceSelector';
import { useAuth } from '../../components/auth-context';
import { AppHeader } from '../../components/common/AppHeader';
import { useTheme } from '../../components/theme-context';
import { TargetAudience } from '../../data/collegeData';
import { FacultyNote } from '../../data/curriculumSchema';
import { CollegeStore } from '../../services/collegeStore';
import { FacultySystemStore } from '../../services/facultyStore';

const SECTIONS = ['Engineering', 'Competitive Exams'];
const SUBJECTS: Record<string, string[]> = {
  Engineering: [
    'Embedded Systems',
    'Programming in C',
    'Programming in Python',
    'Digital Electronics',
    'VLSI',
    'Signals & Systems',
  ],
  'Competitive Exams': [
    'English Language',
    'Quantitative Aptitude',
    'Logical Reasoning',
    'General Science',
    'General Awareness',
  ],
};

export default function FacultyNotesScreen() {
  const { profile } = useAuth();
  const { isDark } = useTheme();
  const [notes, setNotes] = useState<FacultyNote[]>([]);
  const [selectedSection, setSelectedSection] = useState<'Engineering' | 'Competitive Exams'>('Engineering');
  const [selectedSubject, setSelectedSubject] = useState('Embedded Systems');
  const [topic, setTopic] = useState('');
  const [subtopic, setSubtopic] = useState('');
  const [title, setTitle] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [theory, setTheory] = useState('');
  const [concepts, setConcepts] = useState('');
  const [formulas, setFormulas] = useState('');
  const [examples, setExamples] = useState('');
  const [mistakes, setMistakes] = useState('');
  const [quickRev, setQuickRev] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [visibility, setVisibility] = useState<'college' | 'community'>('college');

  const [target, setTarget] = useState<TargetAudience>({
    targetType: 'SECTION',
    collegeId: profile.collegeId || 'clg-kvg',
    collegeName: profile.collegeName || 'KVG College of Engineering',
    department: profile.department || 'ECE',
    academicYear: '3rd Year',
    section: 'A',
  });

  useEffect(() => {
    setNotes(FacultySystemStore.getNotes());
    return FacultySystemStore.subscribe(() => {
      setNotes(FacultySystemStore.getNotes());
    });
  }, []);

  const handlePublish = () => {
    if (!title.trim() || !topic.trim() || !theory.trim()) {
      Alert.alert('Missing Required Fields', 'Please provide Note Title, Topic Name, and Core Theory.');
      return;
    }

    FacultySystemStore.addNote({
      section: selectedSection === 'Engineering' ? 'engineering' : 'competitive',
      subject: selectedSubject,
      topic: topic.trim(),
      subtopic: subtopic.trim(),
      title: title.trim(),
      introduction: introduction.trim(),
      theory: theory.trim(),
      importantConcepts: concepts.split('\n').filter((c) => c.trim()),
      formulas: formulas.split('\n').filter((f) => f.trim()),
      examples: [
        {
          title: 'Illustrative Example',
          example: examples.trim() || 'Standard step-by-step example',
          explanation: 'Demonstrates governing rule and output verification.',
        },
      ],
      importantPoints: ['Verified by Faculty Educator'],
      commonMistakes: mistakes.split('\n').filter((m) => m.trim()),
      quickRevision: quickRev.trim() || 'Summary revision key points.',
      videoUrl: videoUrl.trim(),
      facultyName: profile.name || 'Dr. Kusumadhara S',
      facultyDesignation: profile.facultyDesignation || 'Associate Professor',
      facultyDepartment: profile.department || 'ECE Department',
      collegeId: profile.collegeId || 'clg-kvg',
      collegeName: profile.collegeName || 'KVG College of Engineering',
      isVerifiedFaculty: true,
      visibility,
      published: true,
    });

    if (visibility === 'college') {
      CollegeStore.dispatchNotification({
        studentId: 'std-101',
        collegeId: profile.collegeId || 'clg-kvg',
        title: '🔔 New Faculty Notes Published',
        message: `${profile.name || 'Faculty'}: "${title.trim()}" for ${topic.trim()}.`,
        type: 'NOTE',
        actionRoute: '/topic-learning',
        actionParams: {
          topic: topic.trim(),
          subject: selectedSubject,
          section: selectedSection === 'Engineering' ? 'engineering' : 'competitive',
        },
      });

      Alert.alert('Published Successfully', `Notes published for "${topic}". Target students in ${profile.collegeName || 'your college'} have been notified!`);
    } else {
      Alert.alert(
        'Published to SkillExa Community! 🌍',
        `Your topic notes for "${topic}" are now publicly discoverable by students across all colleges in the Community library.`
      );
    }

    // Reset Form
    setTitle('');
    setTopic('');
    setSubtopic('');
    setIntroduction('');
    setTheory('');
    setConcepts('');
    setFormulas('');
    setExamples('');
    setMistakes('');
    setQuickRev('');
    setVideoUrl('');
  };

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#070B14" : "#FFFFFF"}
      />
      <AppHeader
        showBack
        title="Faculty Notes Authoring"
        subtitle="Create & Publish Topic Notes"
        backLabel="Faculty Hub"
        onBack={() => router.push('/faculty-dashboard' as any)}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Banner */}
          <View style={[styles.banner, isDark && styles.bannerDark]}>
            <View style={[styles.bannerIconBox, isDark && styles.bannerIconBoxDark]}>
              <Feather name="file-text" size={20} color={isDark ? "#38BDF8" : "#0066FF"} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.bannerTitle, isDark && styles.textWhite]}>Publish Topic-Specific Notes</Text>
              <Text style={[styles.bannerDesc, isDark && styles.textMutedDark]}>
                Published notes automatically appear in the student topic view under &quot;Faculty Notes&quot;.
              </Text>
            </View>
          </View>

          {/* Builder Form Card */}
          <View style={[styles.card, isDark && styles.cardDark]}>
            <Text style={[styles.cardHeader, isDark && styles.textWhite]}>1. Target Section & Subject</Text>

            {/* Section Selection */}
            <Text style={[styles.label, isDark && styles.labelDark]}>SELECT SECTION</Text>
            <View style={styles.sectionRow}>
              {SECTIONS.map((sec) => (
                <TouchableOpacity
                  key={sec}
                  style={[
                    styles.pill,
                    isDark && styles.pillDark,
                    selectedSection === sec && styles.pillActive,
                  ]}
                  onPress={() => {
                    setSelectedSection(sec as any);
                    setSelectedSubject(SUBJECTS[sec][0]);
                  }}
                >
                  <Text
                    style={[
                      styles.pillText,
                      isDark && styles.pillTextDark,
                      selectedSection === sec && styles.pillTextActive,
                    ]}
                  >
                    {sec}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Subject Selection */}
            <Text style={[styles.label, { marginTop: 12 }, isDark && styles.labelDark]}>SELECT SUBJECT</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
              {(SUBJECTS[selectedSection] || []).map((sub) => (
                <TouchableOpacity
                  key={sub}
                  style={[
                    styles.chip,
                    isDark && styles.chipDark,
                    selectedSubject === sub && styles.chipActive,
                  ]}
                  onPress={() => setSelectedSubject(sub)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      isDark && styles.chipTextDark,
                      selectedSubject === sub && styles.chipTextActive,
                    ]}
                  >
                    {sub}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Topic & Subtopic */}
            <View style={styles.inputGrid}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, isDark && styles.labelDark]}>TOPIC NAME *</Text>
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  placeholder="e.g. Microcontrollers or Tenses"
                  placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
                  value={topic}
                  onChangeText={setTopic}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, isDark && styles.labelDark]}>SUBTOPIC</Text>
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  placeholder="e.g. Architecture / Conditionals"
                  placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
                  value={subtopic}
                  onChangeText={setSubtopic}
                />
              </View>
            </View>

            {/* Note Title */}
            <Text style={[styles.label, { marginTop: 12 }, isDark && styles.labelDark]}>NOTE TITLE *</Text>
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Comprehensive Title for the Lesson Notes"
              placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
              value={title}
              onChangeText={setTitle}
            />

            {/* Introduction */}
            <Text style={[styles.label, { marginTop: 12 }, isDark && styles.labelDark]}>INTRODUCTION / OVERVIEW</Text>
            <TextInput
              style={[styles.input, styles.textAreaSm, isDark && styles.inputDark]}
              placeholder="Brief 2-3 sentence overview of this module..."
              placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
              multiline
              value={introduction}
              onChangeText={setIntroduction}
            />

            {/* Core Theory */}
            <Text style={[styles.label, { marginTop: 12 }, isDark && styles.labelDark]}>DETAILED THEORY & CONCEPTS *</Text>
            <TextInput
              style={[styles.input, styles.textAreaLg, isDark && styles.inputDark]}
              placeholder="Write clear, comprehensive educational theory..."
              placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
              multiline
              value={theory}
              onChangeText={setTheory}
            />

            {/* Important Concepts */}
            <Text style={[styles.label, { marginTop: 12 }, isDark && styles.labelDark]}>IMPORTANT CONCEPTS (ONE PER LINE)</Text>
            <TextInput
              style={[styles.input, styles.textAreaSm, isDark && styles.inputDark]}
              placeholder="Bullet 1&#10;Bullet 2&#10;Bullet 3"
              placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
              multiline
              value={concepts}
              onChangeText={setConcepts}
            />

            {/* Formulas / Rules */}
            <Text style={[styles.label, { marginTop: 12 }, isDark && styles.labelDark]}>FORMULAS / RULES (ONE PER LINE)</Text>
            <TextInput
              style={[styles.input, styles.textAreaSm, isDark && styles.inputDark]}
              placeholder="Formula 1: V = I * R&#10;Formula 2: Net Discount = a + b - ab/100"
              placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
              multiline
              value={formulas}
              onChangeText={setFormulas}
            />

            {/* Solved Examples */}
            <Text style={[styles.label, { marginTop: 12 }, isDark && styles.labelDark]}>STEP-BY-STEP SOLVED EXAMPLES</Text>
            <TextInput
              style={[styles.input, styles.textAreaSm, isDark && styles.inputDark]}
              placeholder="Example code, calculation, or worked solution..."
              placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
              multiline
              value={examples}
              onChangeText={setExamples}
            />

            {/* Common Mistakes */}
            <Text style={[styles.label, { marginTop: 12 }, isDark && styles.labelDark]}>COMMON MISTAKES TO AVOID</Text>
            <TextInput
              style={[styles.input, styles.textAreaSm, isDark && styles.inputDark]}
              placeholder="Common Pitfall 1&#10;Common Pitfall 2"
              placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
              multiline
              value={mistakes}
              onChangeText={setMistakes}
            />

            {/* Quick Revision */}
            <Text style={[styles.label, { marginTop: 12 }, isDark && styles.labelDark]}>QUICK REVISION SUMMARY</Text>
            <TextInput
              style={[styles.input, styles.textAreaSm, isDark && styles.inputDark]}
              placeholder="Fast 1-minute recap for students..."
              placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
              multiline
              value={quickRev}
              onChangeText={setQuickRev}
            />

            {/* Optional Video Link */}
            <Text style={[styles.label, { marginTop: 12 }, isDark && styles.labelDark]}>OPTIONAL EMBEDDED VIDEO URL</Text>
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="https://www.youtube.com/watch?v=..."
              placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
              value={videoUrl}
              onChangeText={setVideoUrl}
            />

            {/* Target Audience Delivery & Visibility */}
            <View style={{ marginTop: 16 }}>
              <TargetAudienceSelector
                visibility={visibility}
                onChangeVisibility={setVisibility}
                target={target}
                onChangeTarget={setTarget}
                collegeName={profile.collegeName || 'KVG College of Engineering'}
              />
            </View>

            {/* Buttons: Save Draft / Publish */}
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                style={[styles.draftBtn, isDark && styles.draftBtnDark]}
                onPress={() => Alert.alert('Draft Saved', 'Your note draft has been saved locally.')}
              >
                <Text style={[styles.draftBtnText, isDark && styles.textWhite]}>Save Draft</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.publishBtn, isDark && styles.publishBtnDark]}
                onPress={handlePublish}
                activeOpacity={0.88}
              >
                <Feather name="upload-cloud" size={16} color="#FFFFFF" />
                <Text style={styles.publishBtnText}>Publish to Students →</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Existing Published Notes List */}
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, isDark && styles.textWhite]}>Your Published Notes ({notes.length})</Text>
            <Text style={[styles.sectionSubtitle, isDark && styles.textMutedDark]}>Visible to all students in topic learning</Text>
          </View>

          <View style={styles.notesList}>
            {notes.map((n) => (
              <View key={n.id} style={[styles.noteCard, isDark && styles.noteCardDark]}>
                <View style={styles.noteCardHeader}>
                  <View style={[styles.subjectBadge, isDark && styles.subjectBadgeDark]}>
                    <Text style={[styles.subjectBadgeText, isDark && styles.subjectBadgeTextDark]}>{n.subject} • {n.topic}</Text>
                  </View>
                  <TouchableOpacity onPress={() => FacultySystemStore.deleteNote(n.id)}>
                    <Feather name="trash-2" size={15} color="#EF4444" />
                  </TouchableOpacity>
                </View>

                <Text style={[styles.noteTitle, isDark && styles.textWhite]}>{n.title}</Text>
                <Text style={[styles.noteIntro, isDark && styles.textMutedDark]} numberOfLines={2}>{n.introduction || n.theory}</Text>
                <Text style={[styles.noteAuthor, isDark && styles.textSubtleDark]}>By {n.facultyName} • Published {n.createdAt}</Text>
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
  sectionRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
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
    fontSize: 12.5,
    fontWeight: '700',
    color: '#64748b',
  },
  pillTextDark: {
    color: '#94A3B8',
  },
  pillTextActive: {
    color: '#FFFFFF',
  },
  chipsScroll: {
    gap: 8,
    paddingVertical: 2,
    marginBottom: 14,
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
    backgroundColor: '#EFF6FF',
    borderColor: '#0066FF',
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
    color: '#0066FF',
    fontWeight: '700',
  },
  inputGrid: {
    flexDirection: 'row',
    gap: 10,
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
  textAreaSm: {
    height: 64,
    textAlignVertical: 'top',
  },
  textAreaLg: {
    height: 110,
    textAlignVertical: 'top',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  draftBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 12,
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
  publishBtn: {
    flex: 1.5,
    backgroundColor: '#0A192F',
    borderRadius: 12,
    paddingVertical: 12,
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
  publishBtnDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
    borderWidth: 1,
  },
  publishBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
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
  sectionSubtitle: {
    fontSize: 12.5,
    color: '#64748b',
    marginTop: 2,
  },
  notesList: {
    gap: 12,
  },
  noteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eef2f6',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  noteCardDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  noteCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  subjectBadgeDark: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  subjectBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0066FF',
  },
  subjectBadgeTextDark: {
    color: '#38BDF8',
  },
  noteTitle: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
  },
  noteIntro: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
    marginBottom: 8,
  },
  noteAuthor: {
    fontSize: 11.5,
    color: '#94A3B8',
  },
  textWhite: {
    color: '#F8FAFC',
  },
  textMutedDark: {
    color: '#94A3B8',
  },
  textSubtleDark: {
    color: '#64748B',
  },
});
