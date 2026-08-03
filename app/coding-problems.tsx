import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface ModuleData {
  id: number;
  moduleNum: string;
  title: string;
  completion: number;
  level: string;
  align: 'left' | 'right';
  topicKey: string;
}

const MODULES_DATA: Record<string, ModuleData[]> = {
  python: [
    { id: 1, moduleNum: 'MODULE 01', title: 'Python Core & Environment', completion: 100, level: 'Beginner', align: 'left', topicKey: 'intro' },
    { id: 2, moduleNum: 'MODULE 02', title: 'Variables & Data Types', completion: 0, level: 'Beginner', align: 'right', topicKey: 'variables' },
    { id: 3, moduleNum: 'MODULE 03', title: 'Input, Output & Formats', completion: 0, level: 'Beginner', align: 'left', topicKey: 'io' },
    { id: 4, moduleNum: 'MODULE 04', title: 'Operators & Expressions', completion: 0, level: 'Beginner', align: 'right', topicKey: 'operators' },
    { id: 5, moduleNum: 'MODULE 05', title: 'Conditional Statements & Logic', completion: 0, level: 'Intermediate', align: 'left', topicKey: 'conditionals' },
    { id: 6, moduleNum: 'MODULE 06', title: 'Loops & Iterations', completion: 0, level: 'Intermediate', align: 'right', topicKey: 'loops' },
    { id: 7, moduleNum: 'MODULE 07', title: 'Functions & Scopes', completion: 0, level: 'Intermediate', align: 'left', topicKey: 'functions' },
    { id: 8, moduleNum: 'MODULE 08', title: 'Lists, Tuples, Dicts & Sets', completion: 0, level: 'Intermediate', align: 'right', topicKey: 'structures' },
    { id: 9, moduleNum: 'MODULE 09', title: 'File & Exception Handling', completion: 0, level: 'Advanced', align: 'left', topicKey: 'files_exceptions' },
    { id: 10, moduleNum: 'MODULE 10', title: 'OOP: Classes & Objects', completion: 0, level: 'Advanced', align: 'right', topicKey: 'oop' },
  ],
  c: [
    { id: 1, moduleNum: 'MODULE 01', title: 'Structure of a C Program', completion: 0, level: 'Beginner', align: 'left', topicKey: 'intro' },
    { id: 2, moduleNum: 'MODULE 02', title: 'Variables & Data Types', completion: 0, level: 'Beginner', align: 'right', topicKey: 'variables' },
    { id: 3, moduleNum: 'MODULE 03', title: 'Input & Output (printf, scanf)', completion: 0, level: 'Beginner', align: 'left', topicKey: 'io' },
    { id: 4, moduleNum: 'MODULE 04', title: 'Operators & Logic', completion: 0, level: 'Beginner', align: 'right', topicKey: 'operators' },
    { id: 5, moduleNum: 'MODULE 05', title: 'Conditional Branching', completion: 0, level: 'Intermediate', align: 'left', topicKey: 'conditionals' },
    { id: 6, moduleNum: 'MODULE 06', title: 'Loops (for, while)', completion: 0, level: 'Intermediate', align: 'right', topicKey: 'loops' },
    { id: 7, moduleNum: 'MODULE 07', title: 'Functions & Prototypes', completion: 0, level: 'Intermediate', align: 'left', topicKey: 'functions' },
    { id: 8, moduleNum: 'MODULE 08', title: 'Arrays & Strings', completion: 0, level: 'Intermediate', align: 'right', topicKey: 'arrays_strings' },
    { id: 9, moduleNum: 'MODULE 09', title: 'Pointers & Memory Access', completion: 0, level: 'Advanced', align: 'left', topicKey: 'pointers' },
    { id: 10, moduleNum: 'MODULE 10', title: 'Structures & File I/O', completion: 0, level: 'Advanced', align: 'right', topicKey: 'structs_files' },
  ],
  cpp: [
    { id: 1, moduleNum: 'MODULE 01', title: 'C++ Program Structure', completion: 0, level: 'Beginner', align: 'left', topicKey: 'intro' },
    { id: 2, moduleNum: 'MODULE 02', title: 'Variables & Data Types', completion: 0, level: 'Beginner', align: 'right', topicKey: 'variables' },
    { id: 3, moduleNum: 'MODULE 03', title: 'I/O Streams (cin, cout)', completion: 0, level: 'Beginner', align: 'left', topicKey: 'io' },
    { id: 4, moduleNum: 'MODULE 04', title: 'Functions & References', completion: 0, level: 'Intermediate', align: 'right', topicKey: 'functions' },
    { id: 5, moduleNum: 'MODULE 05', title: 'Arrays & std::string', completion: 0, level: 'Intermediate', align: 'left', topicKey: 'arrays_strings' },
    { id: 6, moduleNum: 'MODULE 06', title: 'Classes & Objects', completion: 0, level: 'Intermediate', align: 'right', topicKey: 'oop' },
    { id: 7, moduleNum: 'MODULE 07', title: 'Inheritance & Abstract Classes', completion: 0, level: 'Advanced', align: 'left', topicKey: 'inheritance' },
    { id: 8, moduleNum: 'MODULE 08', title: 'Polymorphism & Overloading', completion: 0, level: 'Advanced', align: 'right', topicKey: 'polymorphism' },
    { id: 9, moduleNum: 'MODULE 09', title: 'Templates & Generic Code', completion: 0, level: 'Advanced', align: 'left', topicKey: 'templates' },
    { id: 10, moduleNum: 'MODULE 10', title: 'STL (Vector, Map, Set)', completion: 0, level: 'Advanced', align: 'right', topicKey: 'stl' },
  ],
  javascript: [
    { id: 1, moduleNum: 'MODULE 01', title: 'Variables (let, const, var)', completion: 0, level: 'Beginner', align: 'left', topicKey: 'variables' },
    { id: 2, moduleNum: 'MODULE 02', title: 'Data Types & Coercion', completion: 0, level: 'Beginner', align: 'right', topicKey: 'datatypes' },
    { id: 3, moduleNum: 'MODULE 03', title: 'Operators & Logical Flow', completion: 0, level: 'Beginner', align: 'left', topicKey: 'operators' },
    { id: 4, moduleNum: 'MODULE 04', title: 'Functions & Arrow Syntax', completion: 0, level: 'Intermediate', align: 'right', topicKey: 'functions' },
    { id: 5, moduleNum: 'MODULE 05', title: 'Arrays & Object Literals', completion: 0, level: 'Intermediate', align: 'left', topicKey: 'arrays_objects' },
    { id: 6, moduleNum: 'MODULE 06', title: 'Loops & Conditional Logic', completion: 0, level: 'Intermediate', align: 'right', topicKey: 'loops' },
    { id: 7, moduleNum: 'MODULE 07', title: 'DOM Manipulation', completion: 0, level: 'Intermediate', align: 'left', topicKey: 'dom' },
    { id: 8, moduleNum: 'MODULE 08', title: 'Events & Listeners', completion: 0, level: 'Intermediate', align: 'right', topicKey: 'events' },
    { id: 9, moduleNum: 'MODULE 09', title: 'ES6+ Features & Destructuring', completion: 0, level: 'Advanced', align: 'left', topicKey: 'es6' },
    { id: 10, moduleNum: 'MODULE 10', title: 'Promises & Async/Await', completion: 0, level: 'Advanced', align: 'right', topicKey: 'async' },
  ],
  reactnative: [
    { id: 1, moduleNum: 'MODULE 01', title: 'React Native Setup', completion: 0, level: 'Beginner', align: 'left', topicKey: 'setup' },
    { id: 2, moduleNum: 'MODULE 02', title: 'Core Components (View, Text)', completion: 0, level: 'Beginner', align: 'right', topicKey: 'components' },
    { id: 3, moduleNum: 'MODULE 03', title: 'JSX Syntax & Rules', completion: 0, level: 'Beginner', align: 'left', topicKey: 'jsx' },
    { id: 4, moduleNum: 'MODULE 04', title: 'Props & State Data Flow', completion: 0, level: 'Intermediate', align: 'right', topicKey: 'props_state' },
    { id: 5, moduleNum: 'MODULE 05', title: 'Styling with StyleSheet', completion: 0, level: 'Intermediate', align: 'left', topicKey: 'styling' },
    { id: 6, moduleNum: 'MODULE 06', title: 'Navigation & Expo Router', completion: 0, level: 'Intermediate', align: 'right', topicKey: 'navigation' },
    { id: 7, moduleNum: 'MODULE 07', title: 'Lists (FlatList & ScrollView)', completion: 0, level: 'Intermediate', align: 'left', topicKey: 'lists' },
    { id: 8, moduleNum: 'MODULE 08', title: 'User Input & Buttons', completion: 0, level: 'Intermediate', align: 'right', topicKey: 'user_input' },
    { id: 9, moduleNum: 'MODULE 09', title: 'API Calls (fetch & Axios)', completion: 0, level: 'Advanced', align: 'left', topicKey: 'api' },
    { id: 10, moduleNum: 'MODULE 10', title: 'Hooks & App Building', completion: 0, level: 'Advanced', align: 'right', topicKey: 'hooks_building' },
  ],
};

const LANGUAGES_LIST = [
  { id: 'python', name: 'Python 3' },
  { id: 'c', name: 'C' },
  { id: 'cpp', name: 'C++' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'reactnative', name: 'React Native' },
];

export default function SkillExaTrackScreen() {
  const [selectedLang, setSelectedLang] = useState<string>('python');
  const [activeTab, setActiveTab] = useState<'syllabus' | 'overview' | 'stats'>('syllabus');
  const [modulesState, setModulesState] = useState(MODULES_DATA);

  const modules = modulesState[selectedLang] || modulesState.python;
  const currentLangObj = LANGUAGES_LIST.find((l) => l.id === selectedLang);
  const displayTitle = currentLangObj ? currentLangObj.name : 'Python 3';

  const totalCompleted = modules.filter((m) => m.completion === 100).length;
  const overallProgress = Math.round(
    (modules.reduce((acc, curr) => acc + curr.completion, 0) / (modules.length * 100)) * 100
  );

  const handleOpenTheory = (moduleItem: ModuleData) => {
    router.push({
      pathname: '/coding/theory',
      params: {
        langId: selectedLang,
        langName: displayTitle,
        moduleNum: moduleItem.moduleNum,
        topicTitle: moduleItem.title,
        topicKey: moduleItem.topicKey,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Header */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={20} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>SkillExa Track</Text>
      </View>

      {/* Navigation Bar */}
      <View style={styles.horizontalNavRow}>
        <TouchableOpacity
          style={[styles.navTabBtn, activeTab === 'overview' && styles.navTabBtnActive]}
          onPress={() => setActiveTab('overview')}
        >
          <Feather name="grid" size={16} color={activeTab === 'overview' ? '#2563EB' : '#64748B'} />
          <Text style={[styles.navTabLabel, activeTab === 'overview' && styles.navTabLabelActive]}>Overview</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navTabBtn, activeTab === 'syllabus' && styles.navTabBtnActive]}
          onPress={() => setActiveTab('syllabus')}
        >
          <Feather name="book-open" size={16} color={activeTab === 'syllabus' ? '#2563EB' : '#64748B'} />
          <Text style={[styles.navTabLabel, activeTab === 'syllabus' && styles.navTabLabelActive]}>Syllabus</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navTabBtn}
          onPress={() =>
            router.push({
              pathname: '/coding/compiler',
              params: { langId: selectedLang, langName: displayTitle },
            })
          }
        >
          <Feather name="terminal" size={16} color="#64748B" />
          <Text style={styles.navTabLabel}>Compiler</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navTabBtn, activeTab === 'stats' && styles.navTabBtnActive]}
          onPress={() => setActiveTab('stats')}
        >
          <Feather name="trending-up" size={16} color={activeTab === 'stats' ? '#2563EB' : '#64748B'} />
          <Text style={[styles.navTabLabel, activeTab === 'stats' && styles.navTabLabelActive]}>Stats</Text>
        </TouchableOpacity>
      </View>

      {/* Language Bar */}
      <View style={styles.langPillContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.langPillScroll}>
          {LANGUAGES_LIST.map((lang) => {
            const isSelected = selectedLang === lang.id;
            return (
              <TouchableOpacity
                key={lang.id}
                style={[styles.langPill, isSelected && styles.langPillActive]}
                onPress={() => setSelectedLang(lang.id)}
              >
                <Text style={[styles.langPillText, isSelected && styles.langPillTextActive]}>
                  {lang.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeTab === 'stats' ? (
          <View>
            <Text style={styles.sectionHeading}>{displayTitle} Track Statistics</Text>
            <Text style={styles.sectionSub}>Track real-time progress across all 10 completed unit quizzes.</Text>

            <View style={styles.statCard}>
              <View>
                <Text style={styles.statLabel}>Track Completion Rate</Text>
                <Text style={styles.statValue}>{overallProgress}%</Text>
              </View>
              <MaterialCommunityIcons name="progress-check" size={32} color="#2563EB" />
            </View>

            <View style={styles.statCard}>
              <View>
                <Text style={styles.statLabel}>Completed Modules</Text>
                <Text style={styles.statValue}>{totalCompleted} / {modules.length}</Text>
              </View>
              <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={32} color="#16A34A" />
            </View>
          </View>
        ) : (
          <View style={styles.pathWrapper}>
            <Text style={styles.sectionHeading}>{displayTitle} Syllabus</Text>
            <Text style={styles.sectionSub}>Master fundamental concepts down to advanced programmatic principles.</Text>

            <View style={styles.zigzagContainer}>
              {modules.map((item, index) => {
                const isLeft = item.align === 'left';

                return (
                  <View key={item.id} style={styles.cardNodeWrapper}>
                    {index > 0 && <View style={styles.dottedConnector} />}

                    <View style={[styles.cardAlignRow, isLeft ? styles.alignLeft : styles.alignRight]}>
                      <View style={styles.originalCard}>
                        
                        <View style={styles.cardHeaderRow}>
                          <Text style={styles.moduleNumText}>{item.moduleNum}</Text>
                          <View style={styles.badgePill}>
                            <Text style={styles.badgeText}>{item.level}</Text>
                          </View>
                        </View>

                        <Text style={styles.moduleTitle}>{item.title}</Text>

                        {/* Completion Percentage Bar */}
                        <View style={styles.metaRow}>
                          <Text style={styles.metaText}>{item.completion}% Complete</Text>
                        </View>

                        {/* Uniform "Launch Unit" Action Button */}
                        <TouchableOpacity
                          style={styles.originalBtn}
                          onPress={() => handleOpenTheory(item)}
                        >
                          <Text style={styles.originalBtnText}>Launch Unit</Text>
                        </TouchableOpacity>

                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  backBtn: { marginRight: 12 },
  topBarTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  horizontalNavRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#F8FAFC', paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#E2E8F0' },
  navTabBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  navTabBtnActive: { backgroundColor: '#EFF6FF' },
  navTabLabel: { fontSize: 12, fontWeight: '600', color: '#64748B', marginLeft: 6 },
  navTabLabelActive: { color: '#2563EB', fontWeight: '700' },
  langPillContainer: { borderBottomWidth: 1, borderBottomColor: '#E2E8F0', paddingVertical: 10 },
  langPillScroll: { paddingHorizontal: 20 },
  langPill: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, backgroundColor: '#F1F5F9', marginRight: 8 },
  langPillActive: { backgroundColor: '#2563EB' },
  langPillText: { fontSize: 12, fontWeight: '600', color: '#64748B' },
  langPillTextActive: { color: '#FFFFFF', fontWeight: '700' },
  scrollContent: { padding: 20 },
  sectionHeading: { fontSize: 22, fontWeight: '800', color: '#0F172A' },
  sectionSub: { fontSize: 12, color: '#64748B', marginTop: 2, marginBottom: 20 },
  zigzagContainer: { position: 'relative', marginTop: 8 },
  cardNodeWrapper: { marginBottom: 24, position: 'relative' },
  dottedConnector: {
    position: 'absolute',
    top: -24,
    left: '50%',
    width: 2,
    height: 24,
    borderWidth: 1,
    borderColor: '#3B82F6',
    borderStyle: 'dashed',
    zIndex: -1,
  },
  cardAlignRow: { flexDirection: 'row', width: '100%' },
  alignLeft: { justifyContent: 'flex-start' },
  alignRight: { justifyContent: 'flex-end' },
  originalCard: {
    width: width * 0.82,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
  },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  moduleNumText: { fontSize: 11, fontWeight: '800', color: '#2563EB' },
  badgePill: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12, backgroundColor: '#EFF6FF' },
  badgeText: { fontSize: 10, fontWeight: '700', color: '#2563EB' },
  moduleTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 8 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  metaText: { fontSize: 12, color: '#64748B', fontWeight: '600' },
  originalBtn: { backgroundColor: '#0066FF', borderRadius: 25, paddingVertical: 12, alignItems: 'center', justifyContent: 'center' },
  originalBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  statCard: { backgroundColor: '#F8FAFC', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#E2E8F0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  statLabel: { fontSize: 12, color: '#64748B', fontWeight: '600' },
  statValue: { fontSize: 20, fontWeight: '800', color: '#0F172A', marginTop: 2 },
});