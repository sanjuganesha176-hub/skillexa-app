import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
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
import { AppHeader } from '../../components/common/AppHeader';
import { useTheme } from '../../components/theme-context';
import { FacultySystemStore } from '../../services/facultyStore';

export default function InterviewEvaluationScreen() {
  const { isDark } = useTheme();
  const {
    interviewId = 'int-1',
    studentName = 'Ganesh Sharan',
    role = 'Embedded Systems Engineer',
  } = useLocalSearchParams<{
    interviewId: string;
    studentName: string;
    role: string;
  }>();

  const [techScore, setTechScore] = useState('85');
  const [commScore, setCommScore] = useState('88');
  const [confScore, setConfScore] = useState('80');
  const [probScore, setProbScore] = useState('82');
  const [overallScore, setOverallScore] = useState('84');

  const [strengths, setStrengths] = useState(
    'Strong grasp of ARM Cortex-M NVIC register structures and atomic bit-banding operations.'
  );
  const [weaknesses, setWeaknesses] = useState(
    'Could provide deeper elaboration on RTOS priority inversion resolution algorithms.'
  );
  const [suggestions, setSuggestions] = useState(
    'Practice more hands-on FreeRTOS mutex inheritance labs and low-power sleep modes.'
  );
  const [summary, setSummary] = useState(
    'Recommended for Advance Embedded Firmware Placement rounds. Solid candidate.'
  );

  const handlePublishEvaluation = () => {
    FacultySystemStore.evaluateInterview(interviewId, {
      status: 'Completed',
      scores: {
        technical: parseInt(techScore, 10) || 85,
        communication: parseInt(commScore, 10) || 85,
        confidence: parseInt(confScore, 10) || 80,
        problemSolving: parseInt(probScore, 10) || 80,
        overall: parseInt(overallScore, 10) || 84,
      },
      feedback: {
        strengths: strengths.split('\n').filter((s) => s.trim()),
        weaknesses: weaknesses.split('\n').filter((w) => w.trim()),
        suggestions: suggestions.split('\n').filter((s) => s.trim()),
        overallSummary: summary.trim(),
      },
    });

    Alert.alert(
      'Evaluation Published!',
      `Interview scorecard published for ${studentName}. The student can now view their evaluation feedback.`,
      [{ text: 'Return to Dashboard', onPress: () => router.replace('/faculty-dashboard') }]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#070B14' : '#FFFFFF'} />
      <AppHeader showBack title="Interview Evaluation & Rubric" subtitle={`Candidate: ${studentName}`} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Candidate Info Card */}
        <View style={[styles.candidateCard, isDark && styles.candidateCardDark]}>
          <View style={[styles.avatarCircle, isDark && styles.avatarCircleDark]}>
            <Text style={[styles.avatarText, isDark && styles.avatarTextDark]}>{studentName.charAt(0)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.candidateName, isDark && styles.textWhite]}>{studentName}</Text>
            <Text style={[styles.candidateRole, isDark && styles.textMutedDark]}>{role} • Technical Evaluation</Text>
            <Text style={[styles.dateText, isDark && { color: '#64748b' }]}>
              Evaluated on {new Date().toISOString().split('T')[0]}
            </Text>
          </View>
        </View>

        {/* 1. Numerical Rubric Scores */}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <Text style={[styles.cardTitle, isDark && styles.textWhite]}>1. Performance Rubric Scores (/100)</Text>

          <View style={styles.scoreInputRow}>
            <View style={styles.scoreCol}>
              <Text style={[styles.scoreLabel, isDark && styles.textMutedDark]}>TECHNICAL KNOWLEDGE</Text>
              <TextInput
                style={[styles.scoreInput, isDark && styles.scoreInputDark]}
                keyboardType="numeric"
                value={techScore}
                onChangeText={setTechScore}
                placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
              />
            </View>

            <View style={styles.scoreCol}>
              <Text style={[styles.scoreLabel, isDark && styles.textMutedDark]}>COMMUNICATION</Text>
              <TextInput
                style={[styles.scoreInput, isDark && styles.scoreInputDark]}
                keyboardType="numeric"
                value={commScore}
                onChangeText={setCommScore}
                placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
              />
            </View>
          </View>

          <View style={[styles.scoreInputRow, { marginTop: 12 }]}>
            <View style={styles.scoreCol}>
              <Text style={[styles.scoreLabel, isDark && styles.textMutedDark]}>CONFIDENCE & TONE</Text>
              <TextInput
                style={[styles.scoreInput, isDark && styles.scoreInputDark]}
                keyboardType="numeric"
                value={confScore}
                onChangeText={setConfScore}
                placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
              />
            </View>

            <View style={styles.scoreCol}>
              <Text style={[styles.scoreLabel, isDark && styles.textMutedDark]}>PROBLEM SOLVING</Text>
              <TextInput
                style={[styles.scoreInput, isDark && styles.scoreInputDark]}
                keyboardType="numeric"
                value={probScore}
                onChangeText={setProbScore}
                placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
              />
            </View>
          </View>

          <View style={[styles.scoreInputRow, { marginTop: 12 }]}>
            <View style={[styles.scoreCol, { width: '100%' }]}>
              <Text style={[styles.scoreLabel, { color: isDark ? '#60A5FA' : '#0A192F' }]}>OVERALL COMPOSITE SCORE</Text>
              <TextInput
                style={[styles.scoreInput, styles.overallInput, isDark && styles.overallInputDark]}
                keyboardType="numeric"
                value={overallScore}
                onChangeText={setOverallScore}
                placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
              />
            </View>
          </View>
        </View>

        {/* 2. Qualitative Feedback */}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <Text style={[styles.cardTitle, isDark && styles.textWhite]}>2. Qualitative Insights & Recommendations</Text>

          <Text style={[styles.fieldLabel, isDark && styles.textMutedDark]}>KEY STRENGTHS</Text>
          <TextInput
            style={[styles.textArea, isDark && styles.textAreaDark, { height: 64 }]}
            placeholder="Highlight what the candidate answered well..."
            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
            multiline
            value={strengths}
            onChangeText={setStrengths}
          />

          <Text style={[styles.fieldLabel, isDark && styles.textMutedDark, { marginTop: 12 }]}>AREAS FOR IMPROVEMENT</Text>
          <TextInput
            style={[styles.textArea, isDark && styles.textAreaDark, { height: 64 }]}
            placeholder="Identify weak conceptual areas..."
            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
            multiline
            value={weaknesses}
            onChangeText={setWeaknesses}
          />

          <Text style={[styles.fieldLabel, isDark && styles.textMutedDark, { marginTop: 12 }]}>ACTIONABLE STUDY SUGGESTIONS</Text>
          <TextInput
            style={[styles.textArea, isDark && styles.textAreaDark, { height: 64 }]}
            placeholder="What should the student study next?"
            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
            multiline
            value={suggestions}
            onChangeText={setSuggestions}
          />

          <Text style={[styles.fieldLabel, isDark && styles.textMutedDark, { marginTop: 12 }]}>FACULTY SUMMARY VERDICT</Text>
          <TextInput
            style={[styles.textArea, isDark && styles.textAreaDark, { height: 56 }]}
            placeholder="Final recommendation summary..."
            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
            multiline
            value={summary}
            onChangeText={setSummary}
          />
        </View>

        {/* Publish Action */}
        <TouchableOpacity
          style={[styles.publishBtn, isDark && styles.publishBtnDark]}
          onPress={handlePublishEvaluation}
          activeOpacity={0.85}
        >
          <Feather name="check-circle" size={16} color="#FFFFFF" />
          <Text style={styles.publishBtnText}>Publish Evaluation to Student</Text>
        </TouchableOpacity>
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
  candidateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eef2f6',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  candidateCardDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircleDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0A192F',
  },
  avatarTextDark: {
    color: '#60A5FA',
  },
  candidateName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  candidateRole: {
    fontSize: 12.5,
    color: '#64748b',
    marginTop: 1,
  },
  dateText: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eef2f6',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 12,
  },
  scoreInputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  scoreCol: {
    flex: 1,
  },
  scoreLabel: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  scoreInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
  },
  scoreInputDark: {
    backgroundColor: '#162032',
    borderColor: '#334155',
    color: '#F8FAFC',
  },
  overallInput: {
    backgroundColor: '#F1F5F9',
    borderColor: '#0A192F',
    color: '#0A192F',
  },
  overallInputDark: {
    backgroundColor: '#1E293B',
    borderColor: '#60A5FA',
    color: '#60A5FA',
  },
  fieldLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  textArea: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    fontSize: 12.5,
    color: '#0f172a',
    textAlignVertical: 'top',
  },
  textAreaDark: {
    backgroundColor: '#162032',
    borderColor: '#334155',
    color: '#F8FAFC',
  },
  publishBtn: {
    backgroundColor: '#0A192F',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  publishBtnDark: {
    backgroundColor: '#1E293B',
  },
  publishBtnText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '700',
  },
  textWhite: {
    color: '#F8FAFC',
  },
  textMutedDark: {
    color: '#94A3B8',
  },
});
