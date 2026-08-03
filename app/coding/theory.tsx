import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

interface LessonDetail {
  overview: string;
  points: string[];
  syntax: string;
  exampleCode: string;
  quiz: QuizQuestion[];
}

const LESSON_DATABASE: Record<string, LessonDetail> = {
  python_intro: {
    overview: 'Python is a high-level, interpreted language designed for readability. Created by Guido van Rossum, it relies on whitespace indentation for code structure.',
    points: ['Bytecode compiled on Python Virtual Machine.', 'Dynamic typing allows runtime assignment.', 'Indentation enforces scope.'],
    syntax: 'print("Hello World")',
    exampleCode: 'import sys\nprint(f"Python Version: {sys.version.split()[0]}")',
    quiz: [
      { question: '1. Who created Python?', options: ['Dennis Ritchie', 'Guido van Rossum', 'Bjarne Stroustrup', 'James Gosling'], correctIndex: 1 },
      { question: '2. How are code blocks defined in Python?', options: ['Curly Braces {}', 'Semicolons ;', 'Indentation', 'Parentheses ()'], correctIndex: 2 },
      { question: '3. What type of language is Python?', options: ['Compiled Only', 'Interpreted', 'Assembly', 'Machine Code'], correctIndex: 1 },
      { question: '4. Which keyword displays text to console?', options: ['echo', 'cout', 'printf', 'print'], correctIndex: 3 },
      { question: '5. What is the extension for Python files?', options: ['.pt', '.py', '.python', '.exe'], correctIndex: 1 },
    ],
  },
  python_variables: {
    overview: 'Variables in Python act as tags pointing to dynamic heap memory objects without requiring explicit data type keywords.',
    points: ['Primitive types include int, float, str, and bool.', 'Inspect object class using type().'],
    syntax: 'variable_name = value',
    exampleCode: 'user_name = "Srujan"\nage = 22\nprint(f"User: {user_name}, Age: {age}")',
    quiz: [
      { question: '1. Which is a valid variable declaration in Python?', options: ['int x = 5;', 'var x = 5;', 'x = 5', 'declare x = 5'], correctIndex: 2 },
      { question: '2. What function inspects variable data types?', options: ['typeof()', 'type()', 'class()', 'gettype()'], correctIndex: 1 },
      { question: '3. Which data type represents text?', options: ['int', 'float', 'str', 'bool'], correctIndex: 2 },
      { question: '4. Are variable names case-sensitive in Python?', options: ['Yes', 'No', 'Only in functions', 'Only in classes'], correctIndex: 0 },
      { question: '5. Which symbol is used for assignment?', options: ['==', '=', ':=', '->'], correctIndex: 1 },
    ],
  },
  // Default fallback for any other language module
  default_module: {
    overview: 'This module covers core syntax, architectural execution flow, and best practices for writing clean code.',
    points: ['Enforces language scope rules.', 'Optimizes runtime performance.', 'Provides reusable structured components.'],
    syntax: '// Core syntax template',
    exampleCode: 'console.log("Executing SkillExa Masterclass Unit");',
    quiz: [
      { question: '1. What is the main goal of clean code principles?', options: ['Readability & Maintenance', 'Slow Performance', 'Longer Code Length', 'Random Variable Names'], correctIndex: 0 },
      { question: '2. Which structure handles runtime errors safely?', options: ['Loops', 'Exception Handling', 'Variables', 'Comments'], correctIndex: 1 },
      { question: '3. What organizes logic into reusable blocks?', options: ['Functions', 'Pointers', 'Literals', 'Operators'], correctIndex: 0 },
      { question: '4. How are comments used in code?', options: ['Run as machine instructions', 'Explain code logic to humans', 'Create variables', 'Import libraries'], correctIndex: 1 },
      { question: '5. Why are data structures important?', options: ['Efficient data organization', 'Increase file size', 'Slow execution down', 'No specific reason'], correctIndex: 0 },
    ],
  },
};

export default function LessonTheoryScreen() {
  const { langId, langName, moduleNum, topicTitle, topicKey } = useLocalSearchParams<{
    langId: string;
    langName: string;
    moduleNum: string;
    topicTitle: string;
    topicKey: string;
  }>();

  const title = topicTitle || 'Module Topic';
  const language = langName || 'Python 3';
  const key = `${(langId || 'python').toLowerCase()}_${topicKey || 'intro'}`;
  const lesson = LESSON_DATABASE[key] || LESSON_DATABASE.python_intro || LESSON_DATABASE.default_module;

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleSelectOption = (qIdx: number, oIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmitQuiz = () => {
    let calculatedScore = 0;
    lesson.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        calculatedScore += 1;
      }
    });

    setScore(calculatedScore);
    setQuizCompleted(true);
    Alert.alert('Unit Complete!', `You scored ${calculatedScore} out of 5! Module progress marked as 100%.`);
  };

  const handleLaunchCompiler = () => {
    router.push({
      pathname: '/coding/compiler',
      params: {
        langId: langId || 'python',
        langName: language,
        initialCode: lesson.exampleCode,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={20} color="#1E293B" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.topBarSub}>{language} • {moduleNum || 'MODULE 01'}</Text>
          <Text style={styles.topBarTitle}>{title}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Theory Card */}
        <View style={styles.roundedCard}>
          <Text style={styles.cardHeaderTitle}>In-Depth Overview</Text>
          <Text style={styles.descText}>{lesson.overview}</Text>

          <Text style={styles.subHeading}>Key Takeaways:</Text>
          {lesson.points.map((pt, idx) => (
            <View key={idx} style={styles.bulletRow}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{pt}</Text>
            </View>
          ))}
        </View>

        {/* Runnable Code Snippet */}
        <View style={styles.roundedCard}>
          <Text style={styles.cardHeaderTitle}>Executable Snippet</Text>
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>{lesson.exampleCode}</Text>
          </View>

          <TouchableOpacity style={styles.compilerPillBtn} onPress={handleLaunchCompiler}>
            <Feather name="play-circle" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.compilerPillBtnText}>Open & Execute in Live Compiler</Text>
          </TouchableOpacity>
        </View>

        {/* 5-Question Module Quiz */}
        <View style={styles.roundedCard}>
          <Text style={styles.cardHeaderTitle}>Module Knowledge Quiz (5 Questions)</Text>
          <Text style={styles.descText}>Answer all 5 questions below to complete this unit and update your track statistics.</Text>

          {lesson.quiz.map((q, qIdx) => (
            <View key={qIdx} style={styles.quizBox}>
              <Text style={styles.questionText}>{q.question}</Text>
              {q.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[qIdx] === oIdx;
                const isCorrect = q.correctIndex === oIdx;

                let optionStyle = styles.optionBtn;
                if (quizCompleted) {
                  if (isCorrect) optionStyle = [styles.optionBtn, styles.correctOption];
                  else if (isSelected) optionStyle = [styles.optionBtn, styles.wrongOption];
                } else if (isSelected) {
                  optionStyle = [styles.optionBtn, styles.selectedOption];
                }

                return (
                  <TouchableOpacity
                    key={oIdx}
                    style={optionStyle}
                    onPress={() => !quizCompleted && handleSelectOption(qIdx, oIdx)}
                  >
                    <Text style={styles.optionText}>{opt}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          {!quizCompleted ? (
            <TouchableOpacity style={styles.submitQuizBtn} onPress={handleSubmitQuiz}>
              <Text style={styles.submitQuizBtnText}>Submit Quiz & Complete Module</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>Quiz Score: {score} / 5 Correct!</Text>
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  backBtn: { marginRight: 12 },
  topBarSub: { fontSize: 11, fontWeight: '700', color: '#2563EB', textTransform: 'uppercase' },
  topBarTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  scrollContent: { padding: 20 },
  roundedCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  cardHeaderTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginBottom: 10 },
  descText: { fontSize: 13, color: '#334155', lineHeight: 20, marginBottom: 14 },
  subHeading: { fontSize: 12, fontWeight: '700', color: '#0F172A', marginBottom: 8 },
  bulletRow: { flexDirection: 'row', marginBottom: 6 },
  bulletDot: { fontSize: 12, color: '#2563EB', marginRight: 8, fontWeight: '800' },
  bulletText: { fontSize: 12, color: '#475569', flex: 1 },
  codeBox: { backgroundColor: '#0F172A', borderRadius: 16, padding: 14, marginBottom: 16 },
  codeText: { fontFamily: 'monospace', fontSize: 12, color: '#38BDF8', lineHeight: 18 },
  compilerPillBtn: { backgroundColor: '#0066FF', borderRadius: 25, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  compilerPillBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  
  /* Quiz Styling */
  quizBox: { marginBottom: 16, backgroundColor: '#F8FAFC', padding: 12, borderRadius: 16 },
  questionText: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 8 },
  optionBtn: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 12, marginBottom: 6 },
  selectedOption: { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
  correctOption: { borderColor: '#16A34A', backgroundColor: '#DCFCE7' },
  wrongOption: { borderColor: '#DC2626', backgroundColor: '#FEE2E2' },
  optionText: { fontSize: 12, fontWeight: '600', color: '#1E293B' },
  submitQuizBtn: { backgroundColor: '#16A34A', borderRadius: 25, paddingVertical: 12, alignItems: 'center', marginTop: 10 },
  submitQuizBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  resultBox: { padding: 12, backgroundColor: '#DCFCE7', borderRadius: 16, alignItems: 'center', marginTop: 8 },
  resultText: { fontSize: 14, fontWeight: '800', color: '#16A34A' },
});