import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppHeader } from '../components/common/AppHeader';
import { ProgressBar } from '../components/common/EducationalCards';
import { Palette, Radii, Shadows } from '../constants/theme';
import {
  CODING_LANGUAGES_LIST,
  CodingModule,
  getLanguageTrack,
} from '../data/codingLanguagesData';

export default function CodingProblemsPage() {
  const [selectedLangId, setSelectedLangId] = useState<string>('python');
  const [activeTab, setActiveTab] = useState<'modules' | 'problems'>('modules');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<CodingModule | null>(null);

  const activeTrack = getLanguageTrack(selectedLangId);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <AppHeader showBack title={`${activeTrack.name} Programming`} subtitle="10 Modules & Coding Challenges" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Coding & Language Tracks</Text>
          <Text style={styles.subtitle}>Select a programming language to master its 10 core modules and solve code.</Text>
        </View>

        {/* 1. Horizontal Scrollable Language Selection Bar */}
        <View style={styles.langBarWrapper}>
          <Text style={styles.langBarLabel}>SELECT PROGRAMMING LANGUAGE</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.langScroll}
          >
            {CODING_LANGUAGES_LIST.map((lang) => {
              const isActive = selectedLangId === lang.id;
              return (
                <TouchableOpacity
                  key={lang.id}
                  style={[styles.langPill, isActive && styles.langPillActive]}
                  onPress={() => setSelectedLangId(lang.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.langPillText, isActive && styles.langPillTextActive]}>
                    {lang.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Active Track Hero Card */}
        <View style={styles.trackHeroCard}>
          <View style={styles.trackHeroTop}>
            <View style={styles.trackHeroIconBox}>
              <Feather name="terminal" size={22} color={Palette.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.trackHeroTitle}>{activeTrack.name} Curriculum</Text>
              <Text style={styles.trackHeroTagline}>{activeTrack.tagline}</Text>
            </View>
          </View>

          {/* Sub-tabs: 10 Learning Modules vs Problem Bank */}
          <View style={styles.tabToggleRow}>
            <TouchableOpacity
              style={[styles.tabToggleBtn, activeTab === 'modules' && styles.tabToggleBtnActive]}
              onPress={() => setActiveTab('modules')}
            >
              <Feather name="book-open" size={14} color={activeTab === 'modules' ? Palette.primary : Palette.textSecondary} />
              <Text style={[styles.tabToggleText, activeTab === 'modules' && styles.tabToggleTextActive]}>
                10 Learning Modules
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabToggleBtn, activeTab === 'problems' && styles.tabToggleBtnActive]}
              onPress={() => setActiveTab('problems')}
            >
              <Feather name="code" size={14} color={activeTab === 'problems' ? Palette.primary : Palette.textSecondary} />
              <Text style={[styles.tabToggleText, activeTab === 'problems' && styles.tabToggleTextActive]}>
                Practice Coding Bank
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* TAB 1: 10 LEARNING MODULES */}
        {activeTab === 'modules' && (
          <View style={styles.modulesList}>
            {activeTrack.modules.map((mod) => (
              <TouchableOpacity
                key={mod.id}
                style={styles.moduleCard}
                onPress={() => setSelectedModule(mod)}
                activeOpacity={0.8}
              >
                <View style={styles.moduleTopRow}>
                  <View style={styles.modNumBadge}>
                    <Text style={styles.modNumText}>{mod.moduleNum}</Text>
                  </View>
                  <View style={styles.moduleInfo}>
                    <Text style={styles.moduleTitle}>{mod.title}</Text>
                    <Text style={styles.moduleDesc}>{mod.desc}</Text>
                  </View>
                  <Feather name="chevron-right" size={18} color={Palette.textMuted} />
                </View>

                <View style={styles.moduleFeaturesRow}>
                  <View style={styles.featChip}>
                    <Text style={styles.featChipText}>📖 Theory</Text>
                  </View>
                  <View style={styles.featChip}>
                    <Text style={styles.featChipText}>💻 Code Syntax</Text>
                  </View>
                  <View style={styles.featChip}>
                    <Text style={styles.featChipText}>📝 MCQ Quiz</Text>
                  </View>
                  <View style={styles.featChip}>
                    <Text style={styles.featChipText}>⚡ Practice Coding</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* TAB 2: PRACTICE CODING BANK */}
        {activeTab === 'problems' && (
          <View style={styles.problemBankList}>
            {activeTrack.modules.map((mod) => (
              <View key={mod.id} style={styles.problemBankCard}>
                <View style={styles.pbHeader}>
                  <Text style={styles.pbTitle}>{mod.codingTask.title}</Text>
                  <View style={styles.pbDiffBadge}>
                    <Text style={styles.pbDiffText}>{mod.codingTask.difficulty}</Text>
                  </View>
                </View>
                <Text style={styles.pbStatement}>{mod.codingTask.statement}</Text>
                
                <View style={styles.pbFooter}>
                  <Text style={styles.pbModuleRef}>From Module {mod.moduleNum}: {mod.title}</Text>
                  <TouchableOpacity
                    style={styles.solveCodeBtn}
                    onPress={() =>
                      router.push({
                        pathname: '/coding/compiler',
                        params: {
                          langId: selectedLangId,
                          langName: activeTrack.name,
                          initialCode: mod.codingTask.starterCode,
                        },
                      })
                    }
                    activeOpacity={0.85}
                  >
                    <Text style={styles.solveCodeBtnText}>Solve in IDE</Text>
                    <Feather name="arrow-right" size={13} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Module Deep-Dive Modal */}
      {selectedModule && (
        <Modal
          animationType="slide"
          transparent
          visible={!!selectedModule}
          onRequestClose={() => setSelectedModule(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.modalBadgeText}>{activeTrack.name.toUpperCase()} • MODULE {selectedModule.moduleNum}</Text>
                  <Text style={styles.modalTitle}>{selectedModule.title}</Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedModule(null)} style={styles.modalCloseBtn}>
                  <Feather name="x" size={20} color={Palette.textSecondary} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalScroll}>
                {/* 1. Theory */}
                <Text style={styles.sheetSectionTitle}>1. Theory & Easy Explanation</Text>
                <Text style={styles.sheetBodyText}>{selectedModule.theory}</Text>
                <Text style={[styles.sheetBodyText, { marginTop: 6, fontStyle: 'italic', color: Palette.textSecondary }]}>
                  {selectedModule.explanation}
                </Text>

                {/* 2. Syntax & Example Code */}
                <Text style={[styles.sheetSectionTitle, { marginTop: 14 }]}>2. Syntax & Code Example</Text>
                <View style={styles.codeSnippetBox}>
                  <Text style={styles.codeSnippetText}>{selectedModule.exampleCode}</Text>
                </View>

                {/* Expected Output */}
                <Text style={[styles.sheetSectionTitle, { marginTop: 10 }]}>Expected Output:</Text>
                <View style={styles.outputBox}>
                  <Text style={styles.outputText}>{selectedModule.expectedOutput}</Text>
                </View>

                {/* 3. Important Points & Common Mistakes */}
                <Text style={[styles.sheetSectionTitle, { marginTop: 14 }]}>3. Important Points & Pitfalls</Text>
                <View style={styles.pointsList}>
                  {selectedModule.importantPoints.map((pt, i) => (
                    <Text key={i} style={styles.pointItem}>• <Text style={{ fontWeight: '700' }}>Key:</Text> {pt}</Text>
                  ))}
                  {selectedModule.commonMistakes.map((m, i) => (
                    <Text key={i} style={[styles.pointItem, { color: Palette.danger }]}>• <Text style={{ fontWeight: '700' }}>Common Mistake:</Text> {m}</Text>
                  ))}
                </View>

                {/* Action Triggers */}
                <View style={styles.modalActionButtons}>
                  <TouchableOpacity
                    style={styles.solveBtn}
                    onPress={() => {
                      const codeTask = selectedModule.codingTask;
                      setSelectedModule(null);
                      router.push({
                        pathname: '/coding/compiler',
                        params: {
                          langId: selectedLangId,
                          langName: activeTrack.name,
                          initialCode: codeTask.starterCode,
                        },
                      });
                    }}
                    activeOpacity={0.85}
                  >
                    <Feather name="code" size={16} color="#FFFFFF" />
                    <Text style={styles.solveBtnText}>Practice Coding ({selectedModule.codingTask.title})</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.quizBtn}
                    onPress={() => {
                      setSelectedModule(null);
                      router.push({
                        pathname: '/quizzpage',
                        params: {
                          topic: `${activeTrack.name}: ${selectedModule.title}`,
                          count: '5',
                        },
                      });
                    }}
                    activeOpacity={0.85}
                  >
                    <Feather name="check-circle" size={15} color={Palette.primary} />
                    <Text style={styles.quizBtnText}>Take Module MCQ Quiz</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Palette.background },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 },
  header: { marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '800', color: Palette.textTitle, marginBottom: 4 },
  subtitle: { fontSize: 13.5, color: Palette.textSecondary },
  langBarWrapper: { marginBottom: 16 },
  langBarLabel: { fontSize: 10.5, fontWeight: '800', color: Palette.textTitle, letterSpacing: 0.6, marginBottom: 8 },
  langScroll: { gap: 8, paddingVertical: 2 },
  langPill: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: Radii.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.border,
    ...Shadows.card,
  },
  langPillActive: {
    backgroundColor: Palette.primary,
    borderColor: Palette.primary,
  },
  langPillText: { fontSize: 13, fontWeight: '700', color: Palette.textSecondary },
  langPillTextActive: { color: '#FFFFFF' },
  trackHeroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: Palette.border,
    marginBottom: 18,
    ...Shadows.card,
  },
  trackHeroTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  trackHeroIconBox: { width: 44, height: 44, borderRadius: 10, backgroundColor: Palette.primaryLight, alignItems: 'center', justifyContent: 'center' },
  trackHeroTitle: { fontSize: 17, fontWeight: '800', color: Palette.textTitle },
  trackHeroTagline: { fontSize: 12.5, color: Palette.textSecondary, marginTop: 2, lineHeight: 17 },
  tabToggleRow: {
    flexDirection: 'row',
    backgroundColor: Palette.backgroundSecondary,
    borderRadius: 10,
    padding: 4,
    gap: 6,
  },
  tabToggleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 8,
  },
  tabToggleBtnActive: { backgroundColor: '#FFFFFF', ...Shadows.card },
  tabToggleText: { fontSize: 12.5, fontWeight: '600', color: Palette.textSecondary },
  tabToggleTextActive: { color: Palette.primary, fontWeight: '700' },
  modulesList: { gap: 12 },
  moduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: Palette.border,
    ...Shadows.card,
  },
  moduleTopRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  modNumBadge: { width: 32, height: 32, borderRadius: 8, backgroundColor: Palette.primaryLight, alignItems: 'center', justifyContent: 'center' },
  modNumText: { fontSize: 13, fontWeight: '800', color: Palette.primary },
  moduleInfo: { flex: 1 },
  moduleTitle: { fontSize: 15, fontWeight: '700', color: Palette.textTitle },
  moduleDesc: { fontSize: 12, color: Palette.textSecondary, marginTop: 2 },
  moduleFeaturesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingTop: 8, borderTopWidth: 1, borderTopColor: Palette.borderSubtle },
  featChip: { backgroundColor: Palette.backgroundSecondary, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  featChipText: { fontSize: 11, fontWeight: '600', color: Palette.textBody },
  problemBankList: { gap: 12 },
  problemBankCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: Palette.border,
    ...Shadows.card,
  },
  pbHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  pbTitle: { fontSize: 15, fontWeight: '700', color: Palette.textTitle },
  pbDiffBadge: { backgroundColor: Palette.successLight, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  pbDiffText: { fontSize: 11, fontWeight: '700', color: Palette.success },
  pbStatement: { fontSize: 13, color: Palette.textBody, lineHeight: 18, marginBottom: 12 },
  pbFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTopWidth: 1, borderTopColor: Palette.borderSubtle },
  pbModuleRef: { fontSize: 11.5, color: Palette.textSecondary },
  solveCodeBtn: {
    backgroundColor: Palette.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  solveCodeBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.5)', justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '88%',
    padding: 20,
    paddingBottom: 36,
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  modalBadgeText: { fontSize: 10.5, fontWeight: '800', color: Palette.primary, letterSpacing: 0.8 },
  modalTitle: { fontSize: 19, fontWeight: '800', color: Palette.textTitle, marginTop: 2 },
  modalCloseBtn: { padding: 4 },
  modalScroll: { paddingBottom: 20 },
  sheetSectionTitle: { fontSize: 14, fontWeight: '800', color: Palette.textTitle, marginBottom: 6 },
  sheetBodyText: { fontSize: 13, color: Palette.textBody, lineHeight: 19 },
  codeSnippetBox: { backgroundColor: Palette.techNavy, borderRadius: 10, padding: 12, marginVertical: 6 },
  codeSnippetText: { fontFamily: 'monospace', fontSize: 12, color: '#E2E8F0', lineHeight: 18 },
  outputBox: { backgroundColor: Palette.backgroundSecondary, borderRadius: 8, padding: 10, borderWidth: 1, borderColor: Palette.border, marginBottom: 10 },
  outputText: { fontFamily: 'monospace', fontSize: 12, color: Palette.textTitle },
  pointsList: { gap: 6, marginBottom: 18 },
  pointItem: { fontSize: 12.5, color: Palette.textBody, lineHeight: 18 },
  modalActionButtons: { gap: 10, marginTop: 8 },
  solveBtn: {
    backgroundColor: Palette.primary,
    borderRadius: Radii.button,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...Shadows.button,
  },
  solveBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  quizBtn: {
    backgroundColor: Palette.primaryLight,
    borderWidth: 1,
    borderColor: Palette.primaryBorder,
    borderRadius: Radii.button,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  quizBtnText: { color: Palette.primary, fontSize: 14, fontWeight: '700' },
});