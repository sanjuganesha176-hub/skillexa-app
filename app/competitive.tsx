import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppHeader } from "../components/common/AppHeader";
import { useTheme } from "../components/theme-context";
import {
  COMPETITIVE_STUDY_NOTES,
  CURRENT_AFFAIRS_HIGHLIGHTS,
  GOVERNMENT_EXAM_UPDATES,
  GRAND_MOCK_EXAMS,
  CompetitiveNote,
  CurrentAffairsItem,
  GovernmentExamUpdate,
  GrandMockExam,
} from "../data/competativeSkillexaData";

type TabType = "MODULES" | "EXAMS" | "MOCKS" | "AFFAIRS" | "NOTES";

const COMPETITIVE_MODULES = [
  {
    id: "aptitude",
    title: "Quantitative Aptitude",
    badge: "10 TOPICS",
    desc: "Master arithmetic, percentages, algebra, geometry, mensuration & problem solving.",
    metaLabel: "Questions",
    metaValue: "500+ Practice MCQs",
    btnText: "Practice Quantitative Aptitude →",
    route: "/mathematics",
    icon: "percent" as keyof typeof Feather.glyphMap,
    iconColor: "#D97706",
    iconBgLight: "#FEF3C7",
    iconBgDark: "rgba(217, 119, 6, 0.2)",
    badgeColor: "#D97706",
    badgeBgLight: "#FEF3C7",
    badgeBgDark: "rgba(217, 119, 6, 0.2)",
  },
  {
    id: "reasoning",
    title: "Logical Reasoning",
    badge: "9 TOPICS",
    desc: "Syllogisms, seating arrangement, coding-decoding, series, puzzles & deduction.",
    metaLabel: "Questions",
    metaValue: "450+ Practice MCQs",
    btnText: "Practice Logical Reasoning →",
    route: "/reasoning",
    icon: "activity" as keyof typeof Feather.glyphMap,
    iconColor: "#059669",
    iconBgLight: "#D1FAE5",
    iconBgDark: "rgba(5, 150, 105, 0.2)",
    badgeColor: "#059669",
    badgeBgLight: "#D1FAE5",
    badgeBgDark: "rgba(5, 150, 105, 0.2)",
  },
  {
    id: "english",
    title: "English Language",
    badge: "7 TOPICS",
    desc: "Comprehensive grammar, voice, tenses, vocabulary, comprehension & cloze tests.",
    metaLabel: "Questions",
    metaValue: "350+ Practice MCQs",
    btnText: "Practice English Language →",
    route: "/english",
    icon: "book-open" as keyof typeof Feather.glyphMap,
    iconColor: "#0284C7",
    iconBgLight: "#E0F2FE",
    iconBgDark: "rgba(2, 132, 199, 0.2)",
    badgeColor: "#0284C7",
    badgeBgLight: "#E0F2FE",
    badgeBgDark: "rgba(2, 132, 199, 0.2)",
  },
  {
    id: "awareness",
    title: "General Awareness",
    badge: "9 TOPICS",
    desc: "Indian polity, history, geography, economy, static GK and daily current affairs.",
    metaLabel: "Questions",
    metaValue: "600+ Practice MCQs",
    btnText: "Practice General Awareness →",
    route: "/awareness",
    icon: "globe" as keyof typeof Feather.glyphMap,
    iconColor: "#EA580C",
    iconBgLight: "#FFEDD5",
    iconBgDark: "rgba(234, 88, 12, 0.2)",
    badgeColor: "#EA580C",
    badgeBgLight: "#FFEDD5",
    badgeBgDark: "rgba(234, 88, 12, 0.2)",
  },
  {
    id: "science",
    title: "General Science",
    badge: "8 TOPICS",
    desc: "Everyday physics, chemical reactions, human physiology and environmental biology.",
    metaLabel: "Questions",
    metaValue: "400+ Practice MCQs",
    btnText: "Practice General Science →",
    route: "/science",
    icon: "layers" as keyof typeof Feather.glyphMap,
    iconColor: "#DC2626",
    iconBgLight: "#FEE2E2",
    iconBgDark: "rgba(220, 38, 38, 0.2)",
    badgeColor: "#DC2626",
    badgeBgLight: "#FEE2E2",
    badgeBgDark: "rgba(220, 38, 38, 0.2)",
  },
  {
    id: "fitness",
    title: "Physical Fitness Standards",
    badge: "8 MODULES",
    desc: "Physical efficiency test benchmarks, endurance milestones and training workouts.",
    metaLabel: "Standards",
    metaValue: "100+ Benchmark Standards",
    btnText: "View Fitness Standards →",
    route: "/fitness",
    icon: "shield" as keyof typeof Feather.glyphMap,
    iconColor: "#4F46E5",
    iconBgLight: "#EEF2FF",
    iconBgDark: "rgba(79, 70, 229, 0.2)",
    badgeColor: "#4F46E5",
    badgeBgLight: "#EEF2FF",
    badgeBgDark: "rgba(79, 70, 229, 0.2)",
  },
];

export default function CompetitiveDashboard() {
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>("MODULES");
  const [selectedExam, setSelectedExam] = useState<GovernmentExamUpdate | null>(null);
  const [selectedMock, setSelectedMock] = useState<GrandMockExam | null>(null);
  const [govtExams, setGovtExams] = useState<GovernmentExamUpdate[]>(GOVERNMENT_EXAM_UPDATES);
  const [mockExams, setMockExams] = useState<GrandMockExam[]>(GRAND_MOCK_EXAMS);
  const [currentAffairs, setCurrentAffairs] = useState<CurrentAffairsItem[]>(CURRENT_AFFAIRS_HIGHLIGHTS);
  const [studyNotes, setStudyNotes] = useState<CompetitiveNote[]>(COMPETITIVE_STUDY_NOTES);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Probe and fetch live data from competitive Express backend (port 3001)
    fetch("http://localhost:3001/api/government-exams")
      .then((r) => r.json())
      .then((res) => {
        if (!isMounted) return;
        const items = res?.data;
        if (Array.isArray(items) && items.length > 0) {
          setIsBackendConnected(true);
          const mapped: GovernmentExamUpdate[] = items.map((item: any) => ({
            id: item.id,
            examName: item.exam_name || item.examName || "Government Exam",
            organization: item.organization || "Govt Agency",
            category: item.category || "SSC",
            updateType: item.update_type || "EXAM_NOTIFICATION",
            title: item.title || "Official Notification",
            shortDescription: item.short_description || item.shortDescription || "",
            fullDescription: item.full_description || item.fullDescription || "",
            postName: item.post_name || item.postName || "Cadre Officer",
            vacancy: item.vacancy || "Multiple",
            eligibility: item.eligibility || "Degree / Equivalent",
            ageLimit: item.age_limit || item.ageLimit || "18-32 Years",
            qualification: item.qualification || "Bachelor's Degree",
            applicationFee: item.application_fee || item.applicationFee || "₹100",
            selectionProcess: item.selection_process || item.selectionProcess || "Written + Interview",
            officialNotificationNumber: item.official_notification_number || item.officialNotificationNumber || "SKX-2024",
            notificationDate: item.notification_date || item.notificationDate || "",
            applicationStartDate: item.application_start_date || item.applicationStartDate || "",
            applicationLastDate: item.application_last_date || item.applicationLastDate || "TBA",
            examDate: item.exam_date || item.examDate || "TBA",
            officialSourceUrl: item.official_source_url || item.officialSourceUrl || "https://ssc.gov.in",
          }));
          setGovtExams(mapped);
        }
      })
      .catch(() => {});

    fetch("http://localhost:3001/api/mock-exams")
      .then((r) => r.json())
      .then((res) => {
        if (!isMounted) return;
        const items = Array.isArray(res) ? res : res?.data;
        if (Array.isArray(items) && items.length > 0) {
          setIsBackendConnected(true);
          const mapped: GrandMockExam[] = items.map((m: any) => ({
            id: m.id,
            title: m.title || "Grand Mock Test",
            category: m.category || "Competitive",
            targetExam: m.target_exam || m.targetExam || "National Exam",
            description: m.description || "Full-length timed mock test with negative marking.",
            durationMinutes: m.duration_minutes || m.durationMinutes || 60,
            totalQuestions: m.total_questions || m.totalQuestions || 25,
            totalMarks: m.total_marks || m.totalMarks || 100,
            passingPercentage: m.passing_percentage || m.passingPercentage || 60,
            negativeMarking: m.negative_marking || m.negativeMarking || 0.25,
            instructions: [
              `Total test duration: ${m.duration_minutes || 60} minutes`,
              `Standard negative marking of ${m.negative_marking || 0.25} per wrong answer`,
              "Score calculation and answer analysis displayed immediately upon completion",
            ],
          }));
          setMockExams(mapped);
        }
      })
      .catch(() => {});

    fetch("http://localhost:3001/api/current-affairs")
      .then((r) => r.json())
      .then((res) => {
        if (!isMounted) return;
        const items = Array.isArray(res) ? res : res?.data;
        if (Array.isArray(items) && items.length > 0) {
          const mapped: CurrentAffairsItem[] = items.map((a: any) => ({
            id: a.id,
            title: a.title,
            category: a.category,
            summary: a.summary,
            date: a.date,
            source: a.source?.publisher || a.source?.title || "Press Information Bureau (PIB)",
          }));
          setCurrentAffairs(mapped);
        }
      })
      .catch(() => {});

    fetch("http://localhost:3001/api/notes")
      .then((r) => r.json())
      .then((res) => {
        if (!isMounted) return;
        const items = res?.data;
        if (Array.isArray(items) && items.length > 0) {
          const mapped: CompetitiveNote[] = items.map((n: any) => ({
            id: n.id,
            title: n.title,
            subjectName: n.subject_name || "General",
            fileSize: n.file_size || "1.0 MB",
            description: n.description || `Verified study notes for ${n.subject_name || 'Competitive Exams'}.`,
            source: n.source || "Official Faculty Curriculum",
            fileUrl: n.file_url ? `http://localhost:3001${n.file_url}` : undefined,
          }));
          setStudyNotes(mapped);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenSourceUrl = (url: string) => {
    if (url) {
      Linking.openURL(url).catch(() => {});
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#070B14" : "#FFFFFF"}
      />
      <AppHeader
        showBack
        title="Competitive Exams"
        backLabel="Back to Paths"
        onBack={() => router.push("/pathselection" as any)}
      />

      {/* Modal 1: Government Exam Update Details */}
      <Modal
        visible={!!selectedExam}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedExam(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalBox, isDark && styles.modalBoxDark]}>
            <View style={styles.modalTopRow}>
              <View style={styles.modalHeaderTitleGroup}>
                <View style={styles.examOrgBadge}>
                  <Text style={styles.examOrgBadgeText}>{selectedExam?.organization}</Text>
                </View>
                <Text style={[styles.modalMainTitle, isDark && styles.textWhite]}>
                  {selectedExam?.examName}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setSelectedExam(null)}
                style={styles.modalCloseBtn}
                activeOpacity={0.7}
              >
                <Feather name="x" size={20} color={isDark ? "#F8FAFC" : "#64748B"} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <Text style={[styles.modalDesc, isDark && styles.textMutedDark]}>
                {selectedExam?.fullDescription}
              </Text>

              <View style={[styles.detailTable, isDark && styles.detailTableDark]}>
                <View style={styles.detailTableRow}>
                  <Text style={styles.tableLabel}>Vacancies</Text>
                  <Text style={[styles.tableValue, { color: "#10B981", fontWeight: "800" }]}>
                    {selectedExam?.vacancy}
                  </Text>
                </View>
                <View style={styles.detailTableRow}>
                  <Text style={styles.tableLabel}>Post Names</Text>
                  <Text style={[styles.tableValue, isDark && styles.textWhite]}>
                    {selectedExam?.postName}
                  </Text>
                </View>
                <View style={styles.detailTableRow}>
                  <Text style={styles.tableLabel}>Eligibility</Text>
                  <Text style={[styles.tableValue, isDark && styles.textWhite]}>
                    {selectedExam?.eligibility}
                  </Text>
                </View>
                <View style={styles.detailTableRow}>
                  <Text style={styles.tableLabel}>Age Limit</Text>
                  <Text style={[styles.tableValue, isDark && styles.textWhite]}>
                    {selectedExam?.ageLimit}
                  </Text>
                </View>
                <View style={styles.detailTableRow}>
                  <Text style={styles.tableLabel}>Selection Process</Text>
                  <Text style={[styles.tableValue, isDark && styles.textWhite]}>
                    {selectedExam?.selectionProcess}
                  </Text>
                </View>
                <View style={styles.detailTableRow}>
                  <Text style={styles.tableLabel}>Application Timeline</Text>
                  <Text style={[styles.tableValue, isDark && styles.textWhite]}>
                    {selectedExam?.applicationStartDate} to {selectedExam?.applicationLastDate}
                  </Text>
                </View>
                <View style={[styles.detailTableRow, { borderBottomWidth: 0 }]}>
                  <Text style={styles.tableLabel}>Exam Date</Text>
                  <Text style={[styles.tableValue, { color: "#D97706", fontWeight: "700" }]}>
                    {selectedExam?.examDate}
                  </Text>
                </View>
              </View>

              {selectedExam?.officialSourceUrl && (
                <TouchableOpacity
                  style={styles.openOfficialBtn}
                  onPress={() => handleOpenSourceUrl(selectedExam.officialSourceUrl)}
                  activeOpacity={0.88}
                >
                  <Feather name="external-link" size={16} color="#FFFFFF" />
                  <Text style={styles.openOfficialBtnText}>Open Official Government Portal</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal 2: Grand Mock Exam Details */}
      <Modal
        visible={!!selectedMock}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedMock(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalBox, isDark && styles.modalBoxDark]}>
            <View style={styles.modalTopRow}>
              <View style={styles.modalHeaderTitleGroup}>
                <View style={[styles.examOrgBadge, { backgroundColor: "#FEF3C7" }]}>
                  <Text style={[styles.examOrgBadgeText, { color: "#D97706" }]}>
                    {selectedMock?.category}
                  </Text>
                </View>
                <Text style={[styles.modalMainTitle, isDark && styles.textWhite]}>
                  {selectedMock?.title}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setSelectedMock(null)}
                style={styles.modalCloseBtn}
                activeOpacity={0.7}
              >
                <Feather name="x" size={20} color={isDark ? "#F8FAFC" : "#64748B"} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <Text style={[styles.modalDesc, isDark && styles.textMutedDark]}>
                {selectedMock?.description}
              </Text>

              {/* Stats Grid */}
              <View style={styles.mockStatsRow}>
                <View style={[styles.mockStatCard, isDark && styles.mockStatCardDark]}>
                  <Text style={[styles.mockStatValue, { color: "#0066FF" }]}>
                    {selectedMock?.totalQuestions}
                  </Text>
                  <Text style={styles.mockStatLabel}>Questions</Text>
                </View>
                <View style={[styles.mockStatCard, isDark && styles.mockStatCardDark]}>
                  <Text style={[styles.mockStatValue, { color: "#10B981" }]}>
                    {selectedMock?.durationMinutes}m
                  </Text>
                  <Text style={styles.mockStatLabel}>Duration</Text>
                </View>
                <View style={[styles.mockStatCard, isDark && styles.mockStatCardDark]}>
                  <Text style={[styles.mockStatValue, { color: "#D97706" }]}>
                    {selectedMock?.totalMarks}
                  </Text>
                  <Text style={styles.mockStatLabel}>Total Marks</Text>
                </View>
                <View style={[styles.mockStatCard, isDark && styles.mockStatCardDark]}>
                  <Text style={[styles.mockStatValue, { color: "#EF4444" }]}>
                    -{selectedMock?.negativeMarking}
                  </Text>
                  <Text style={styles.mockStatLabel}>Negative</Text>
                </View>
              </View>

              <Text style={[styles.instructionHeading, isDark && styles.textWhite]}>
                Exam Guidelines & Marking Scheme:
              </Text>
              {selectedMock?.instructions.map((inst, idx) => (
                <View key={idx} style={styles.instructionRow}>
                  <Feather name="check-circle" size={14} color="#10B981" style={{ marginTop: 2 }} />
                  <Text style={[styles.instructionText, isDark && styles.textMutedDark]}>
                    {inst}
                  </Text>
                </View>
              ))}

              <TouchableOpacity
                style={styles.openOfficialBtn}
                onPress={() => {
                  setSelectedMock(null);
                  router.push({
                    pathname: "/quizzpage",
                    params: {
                      section: "competitive",
                      subject: selectedMock?.category || "SSC",
                      topic: selectedMock?.title || "Mock Test",
                      count: (selectedMock?.totalQuestions || 20).toString(),
                    },
                  });
                }}
                activeOpacity={0.88}
              >
                <Feather name="play" size={16} color="#FFFFFF" />
                <Text style={styles.openOfficialBtnText}>Launch Grand Mock Test</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header Section with Theme Toggle */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                  <Text style={[styles.title, isDark && styles.titleDark]}>
                    Competitive Exams Hub
                  </Text>
                  {isBackendConnected && (
                    <View style={styles.liveBadge}>
                      <View style={styles.liveDot} />
                      <Text style={styles.liveBadgeText}>Port 3001 Live</Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
                  Verified national syllabus, exam notifications & full-length mock tests
                </Text>
              </View>

              {/* In-Page Theme Switcher Pill */}
              <TouchableOpacity
                style={[styles.themePill, isDark && styles.themePillDark]}
                onPress={toggleTheme}
                activeOpacity={0.85}
              >
                <Feather
                  name={isDark ? "sun" : "moon"}
                  size={14}
                  color={isDark ? "#F59E0B" : "#334155"}
                />
                <Text style={[styles.themePillText, isDark && styles.themePillTextDark]}>
                  {isDark ? "Light Mode" : "Dark Mode"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Cross Track Switcher Banner */}
          <TouchableOpacity
            style={[styles.crossTrackBanner, isDark && styles.crossTrackBannerDark]}
            onPress={() => router.push("/engineering" as any)}
            activeOpacity={0.88}
          >
            <View style={styles.crossTrackLeft}>
              <Feather name="cpu" size={18} color={isDark ? "#38BDF8" : "#0066FF"} />
              <View>
                <Text style={[styles.crossTrackTitle, isDark && styles.crossTrackTitleDark]}>
                  Engineering Learning Track
                </Text>
                <Text style={[styles.crossTrackSub, isDark && styles.crossTrackSubDark]}>
                  Coding, DSA, AI Mock Interview, Resume & Placements
                </Text>
              </View>
            </View>
            <Feather name="arrow-right" size={16} color={isDark ? "#38BDF8" : "#0066FF"} />
          </TouchableOpacity>

          {/* Section Navigation Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsRow}
          >
            <TouchableOpacity
              style={[
                styles.tabBtn,
                activeTab === "MODULES" && styles.tabBtnActive,
                isDark && styles.tabBtnDark,
                activeTab === "MODULES" && isDark && styles.tabBtnActiveDark,
              ]}
              onPress={() => setActiveTab("MODULES")}
              activeOpacity={0.8}
            >
              <Feather
                name="book-open"
                size={14}
                color={activeTab === "MODULES" ? "#FFFFFF" : isDark ? "#94A3B8" : "#64748B"}
              />
              <Text
                style={[
                  styles.tabBtnText,
                  activeTab === "MODULES" && styles.tabBtnTextActive,
                  isDark && styles.tabBtnTextDark,
                ]}
              >
                Core Modules (6)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabBtn,
                activeTab === "EXAMS" && styles.tabBtnActive,
                isDark && styles.tabBtnDark,
                activeTab === "EXAMS" && isDark && styles.tabBtnActiveDark,
              ]}
              onPress={() => setActiveTab("EXAMS")}
              activeOpacity={0.8}
            >
              <Feather
                name="award"
                size={14}
                color={activeTab === "EXAMS" ? "#FFFFFF" : isDark ? "#94A3B8" : "#64748B"}
              />
              <Text
                style={[
                  styles.tabBtnText,
                  activeTab === "EXAMS" && styles.tabBtnTextActive,
                  isDark && styles.tabBtnTextDark,
                ]}
              >
                Govt Vacancies ({govtExams.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabBtn,
                activeTab === "MOCKS" && styles.tabBtnActive,
                isDark && styles.tabBtnDark,
                activeTab === "MOCKS" && isDark && styles.tabBtnActiveDark,
              ]}
              onPress={() => setActiveTab("MOCKS")}
              activeOpacity={0.8}
            >
              <Feather
                name="clock"
                size={14}
                color={activeTab === "MOCKS" ? "#FFFFFF" : isDark ? "#94A3B8" : "#64748B"}
              />
              <Text
                style={[
                  styles.tabBtnText,
                  activeTab === "MOCKS" && styles.tabBtnTextActive,
                  isDark && styles.tabBtnTextDark,
                ]}
              >
                Grand Mocks ({mockExams.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabBtn,
                activeTab === "AFFAIRS" && styles.tabBtnActive,
                isDark && styles.tabBtnDark,
                activeTab === "AFFAIRS" && isDark && styles.tabBtnActiveDark,
              ]}
              onPress={() => setActiveTab("AFFAIRS")}
              activeOpacity={0.8}
            >
              <Feather
                name="globe"
                size={14}
                color={activeTab === "AFFAIRS" ? "#FFFFFF" : isDark ? "#94A3B8" : "#64748B"}
              />
              <Text
                style={[
                  styles.tabBtnText,
                  activeTab === "AFFAIRS" && styles.tabBtnTextActive,
                  isDark && styles.tabBtnTextDark,
                ]}
              >
                Current Affairs ({currentAffairs.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabBtn,
                activeTab === "NOTES" && styles.tabBtnActive,
                isDark && styles.tabBtnDark,
                activeTab === "NOTES" && isDark && styles.tabBtnActiveDark,
              ]}
              onPress={() => setActiveTab("NOTES")}
              activeOpacity={0.8}
            >
              <Feather
                name="file-text"
                size={14}
                color={activeTab === "NOTES" ? "#FFFFFF" : isDark ? "#94A3B8" : "#64748B"}
              />
              <Text
                style={[
                  styles.tabBtnText,
                  activeTab === "NOTES" && styles.tabBtnTextActive,
                  isDark && styles.tabBtnTextDark,
                ]}
              >
                Notes & Papers ({studyNotes.length})
              </Text>
            </TouchableOpacity>
          </ScrollView>

          {/* TAB 1: CORE MODULES */}
          {activeTab === "MODULES" && (
            <View>
              {COMPETITIVE_MODULES.map((mod) => (
                <View
                  key={mod.id}
                  style={[styles.moduleCard, isDark && styles.moduleCardDark]}
                >
                  <View style={styles.cardTopRow}>
                    <View
                      style={[
                        styles.iconBox,
                        {
                          backgroundColor: isDark ? mod.iconBgDark : mod.iconBgLight,
                        },
                      ]}
                    >
                      <Feather name={mod.icon} size={20} color={mod.iconColor} />
                    </View>
                    <View style={styles.textGroup}>
                      <View style={styles.titleRow}>
                        <Text style={[styles.moduleTitle, isDark && styles.moduleTitleDark]}>
                          {mod.title}
                        </Text>
                        <View
                          style={[
                            styles.badgeBox,
                            {
                              backgroundColor: isDark ? mod.badgeBgDark : mod.badgeBgLight,
                            },
                          ]}
                        >
                          <Text style={[styles.badgeText, { color: mod.badgeColor }]}>
                            {mod.badge}
                          </Text>
                        </View>
                      </View>
                      <Text style={[styles.moduleDesc, isDark && styles.moduleDescDark]}>
                        {mod.desc}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.metaRow}>
                    <Text style={[styles.metaText, isDark && styles.metaTextDark]}>
                      {mod.metaLabel}:{" "}
                      <Text style={[styles.metaBold, isDark && styles.metaBoldDark]}>
                        {mod.metaValue}
                      </Text>
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[styles.actionBtn, isDark && styles.actionBtnDark]}
                    onPress={() => router.push(mod.route as any)}
                    activeOpacity={0.88}
                  >
                    <Text style={styles.actionBtnText}>{mod.btnText}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* TAB 2: GOVERNMENT EXAM VACANCIES */}
          {activeTab === "EXAMS" && (
            <View>
              {govtExams.map((exam) => (
                <View
                  key={exam.id}
                  style={[styles.moduleCard, isDark && styles.moduleCardDark]}
                >
                  <View style={styles.cardTopRow}>
                    <View
                      style={[
                        styles.iconBox,
                        { backgroundColor: isDark ? "rgba(16, 185, 129, 0.15)" : "#ECFDF5" },
                      ]}
                    >
                      <Feather name="award" size={20} color="#10B981" />
                    </View>
                    <View style={styles.textGroup}>
                      <View style={styles.titleRow}>
                        <Text style={[styles.moduleTitle, isDark && styles.moduleTitleDark]}>
                          {exam.examName}
                        </Text>
                        <View style={[styles.badgeBox, { backgroundColor: "#ECFDF5" }]}>
                          <Text style={[styles.badgeText, { color: "#10B981" }]}>
                            {exam.category}
                          </Text>
                        </View>
                      </View>
                      <Text style={[styles.moduleDesc, isDark && styles.moduleDescDark]}>
                        {exam.title}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.examKeyInfoBox}>
                    <View style={styles.keyInfoItem}>
                      <Text style={styles.keyInfoLabel}>Total Vacancies</Text>
                      <Text style={[styles.keyInfoVal, { color: "#10B981" }]}>
                        {exam.vacancy}
                      </Text>
                    </View>
                    <View style={styles.keyInfoItem}>
                      <Text style={styles.keyInfoLabel}>Application Deadline</Text>
                      <Text style={[styles.keyInfoVal, isDark && styles.textWhite]}>
                        {exam.applicationLastDate}
                      </Text>
                    </View>
                    <View style={styles.keyInfoItem}>
                      <Text style={styles.keyInfoLabel}>Exam Date</Text>
                      <Text style={[styles.keyInfoVal, { color: "#D97706" }]}>
                        {exam.examDate}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={[styles.actionBtn, isDark && styles.actionBtnDark]}
                    onPress={() => setSelectedExam(exam)}
                    activeOpacity={0.88}
                  >
                    <Text style={styles.actionBtnText}>View Full Notification & Apply →</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* TAB 3: GRAND MOCK EXAMS */}
          {activeTab === "MOCKS" && (
            <View>
              {mockExams.map((mock) => (
                <View
                  key={mock.id}
                  style={[styles.moduleCard, isDark && styles.moduleCardDark]}
                >
                  <View style={styles.cardTopRow}>
                    <View
                      style={[
                        styles.iconBox,
                        { backgroundColor: isDark ? "rgba(217, 119, 6, 0.15)" : "#FEF3C7" },
                      ]}
                    >
                      <Feather name="clock" size={20} color="#D97706" />
                    </View>
                    <View style={styles.textGroup}>
                      <View style={styles.titleRow}>
                        <Text style={[styles.moduleTitle, isDark && styles.moduleTitleDark]}>
                          {mock.title}
                        </Text>
                        <View style={[styles.badgeBox, { backgroundColor: "#FEF3C7" }]}>
                          <Text style={[styles.badgeText, { color: "#D97706" }]}>
                            {mock.category}
                          </Text>
                        </View>
                      </View>
                      <Text style={[styles.moduleDesc, isDark && styles.moduleDescDark]}>
                        {mock.description}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.mockSummaryRow}>
                    <Text style={[styles.metaText, isDark && styles.metaTextDark]}>
                      Questions: <Text style={[styles.metaBold, isDark && styles.metaBoldDark]}>{mock.totalQuestions}</Text>
                    </Text>
                    <Text style={[styles.metaText, isDark && styles.metaTextDark]}>
                      Time: <Text style={[styles.metaBold, isDark && styles.metaBoldDark]}>{mock.durationMinutes} mins</Text>
                    </Text>
                    <Text style={[styles.metaText, isDark && styles.metaTextDark]}>
                      Negative: <Text style={[styles.metaBold, { color: "#EF4444" }]}>-{mock.negativeMarking}</Text>
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[styles.actionBtn, isDark && styles.actionBtnDark]}
                    onPress={() => setSelectedMock(mock)}
                    activeOpacity={0.88}
                  >
                    <Text style={styles.actionBtnText}>Start Grand Mock Test →</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* TAB 4: CURRENT AFFAIRS */}
          {activeTab === "AFFAIRS" && (
            <View>
              {currentAffairs.map((item) => (
                <View
                  key={item.id}
                  style={[styles.moduleCard, isDark && styles.moduleCardDark]}
                >
                  <View style={styles.affairsHeaderRow}>
                    <View style={styles.affairsCategoryBadge}>
                      <Text style={styles.affairsCategoryText}>{item.category}</Text>
                    </View>
                    <Text style={[styles.affairsDate, isDark && styles.textMutedDark]}>
                      {item.date}
                    </Text>
                  </View>

                  <Text style={[styles.affairsTitle, isDark && styles.textWhite]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.affairsSummary, isDark && styles.textMutedDark]}>
                    {item.summary}
                  </Text>

                  <View style={styles.affairsSourceRow}>
                    <Feather name="shield" size={13} color="#10B981" />
                    <Text style={styles.affairsSourceText}>Verified Source: {item.source}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* TAB 5: STUDY NOTES & PAPERS */}
          {activeTab === "NOTES" && (
            <View>
              {/* Previous Papers Link Banner */}
              <TouchableOpacity
                style={[styles.papersBanner, isDark && styles.papersBannerDark]}
                onPress={() => router.push("/papers" as any)}
                activeOpacity={0.88}
              >
                <View style={styles.crossTrackLeft}>
                  <Feather name="file-text" size={18} color="#D97706" />
                  <View>
                    <Text style={[styles.crossTrackTitle, { color: "#D97706" }]}>
                      Official Previous Year Question Papers (PYQs)
                    </Text>
                    <Text style={[styles.crossTrackSub, isDark && styles.textMutedDark]}>
                      UPSC CDS 2024, SSC CGL, IBPS PO with authentic keys
                    </Text>
                  </View>
                </View>
                <Feather name="arrow-right" size={16} color="#D97706" />
              </TouchableOpacity>

              {studyNotes.map((note) => (
                <View
                  key={note.id}
                  style={[styles.moduleCard, isDark && styles.moduleCardDark]}
                >
                  <View style={styles.cardTopRow}>
                    <View
                      style={[
                        styles.iconBox,
                        { backgroundColor: isDark ? "rgba(99, 102, 241, 0.15)" : "#EEF2FF" },
                      ]}
                    >
                      <Feather name="book" size={20} color="#6366F1" />
                    </View>
                    <View style={styles.textGroup}>
                      <View style={styles.titleRow}>
                        <Text style={[styles.moduleTitle, isDark && styles.moduleTitleDark]}>
                          {note.title}
                        </Text>
                        <View style={[styles.badgeBox, { backgroundColor: "#EEF2FF" }]}>
                          <Text style={[styles.badgeText, { color: "#6366F1" }]}>
                            {note.fileSize}
                          </Text>
                        </View>
                      </View>
                      <Text style={[styles.moduleDesc, isDark && styles.moduleDescDark]}>
                        {note.description}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.affairsSourceRow}>
                    <Feather name="check-circle" size={13} color="#10B981" />
                    <Text style={styles.affairsSourceText}>{note.source}</Text>
                  </View>

                  {note.fileUrl && (
                    <TouchableOpacity
                      style={[styles.actionBtn, isDark && styles.actionBtnDark, { marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 }]}
                      onPress={() => handleOpenSourceUrl(note.fileUrl!)}
                      activeOpacity={0.88}
                    >
                      <Feather name="download" size={14} color="#FFFFFF" />
                      <Text style={styles.actionBtnText}>Download PDF Document</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  safeAreaDark: {
    backgroundColor: "#070B14",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 48,
  },
  container: {
    width: "100%",
    maxWidth: 640,
    alignSelf: "center",
  },
  header: {
    marginBottom: 16,
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  titleDark: {
    color: "#F8FAFC",
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(16, 185, 129, 0.12)",
    borderColor: "#10B981",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
  },
  liveBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#10B981",
  },
  subtitle: {
    fontSize: 13.5,
    color: "#64748b",
    fontWeight: "400",
    lineHeight: 18,
  },
  subtitleDark: {
    color: "#94A3B8",
  },
  themePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  themePillDark: {
    backgroundColor: "#0F172A",
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  themePillText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#334155",
  },
  themePillTextDark: {
    color: "#F8FAFC",
  },
  crossTrackBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EFF6FF",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.2)",
    marginBottom: 16,
  },
  crossTrackBannerDark: {
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    borderColor: "rgba(56, 189, 248, 0.25)",
  },
  crossTrackLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  crossTrackTitle: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#0066FF",
  },
  crossTrackTitleDark: {
    color: "#38BDF8",
  },
  crossTrackSub: {
    fontSize: 11.5,
    color: "#475569",
    marginTop: 1,
  },
  crossTrackSubDark: {
    color: "#94A3B8",
  },
  tabsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 18,
    paddingVertical: 2,
  },
  tabBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  tabBtnDark: {
    backgroundColor: "#0F172A",
    borderColor: "#1E293B",
  },
  tabBtnActive: {
    backgroundColor: "#0066FF",
    borderColor: "#0066FF",
  },
  tabBtnActiveDark: {
    backgroundColor: "#0066FF",
    borderColor: "#0066FF",
  },
  tabBtnText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#64748B",
  },
  tabBtnTextDark: {
    color: "#94A3B8",
  },
  tabBtnTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  moduleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#eef2f6",
    marginBottom: 16,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  moduleCardDark: {
    backgroundColor: "#0F172A",
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  textGroup: {
    flex: 1,
    paddingTop: 2,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  moduleTitle: {
    fontSize: 16.5,
    fontWeight: "800",
    color: "#0f172a",
    flex: 1,
  },
  moduleTitleDark: {
    color: "#F8FAFC",
  },
  badgeBox: {
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  moduleDesc: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 4,
    lineHeight: 18,
  },
  moduleDescDark: {
    color: "#94A3B8",
  },
  metaRow: {
    alignItems: "flex-end",
    marginTop: 8,
    marginBottom: 2,
  },
  metaText: {
    fontSize: 12.5,
    color: "#64748b",
    fontWeight: "500",
  },
  metaTextDark: {
    color: "#94A3B8",
  },
  metaBold: {
    fontWeight: "700",
    color: "#0f172a",
  },
  metaBoldDark: {
    color: "#F8FAFC",
  },
  actionBtn: {
    height: 46,
    backgroundColor: "#0A192F",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    shadowColor: "#0A192F",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  actionBtnDark: {
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  actionBtnText: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "700",
  },
  examKeyInfoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  keyInfoItem: {
    flex: 1,
  },
  keyInfoLabel: {
    fontSize: 11,
    color: "#64748B",
    marginBottom: 2,
  },
  keyInfoVal: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#0F172A",
  },
  mockSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#EEF2F6",
  },
  affairsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  affairsCategoryBadge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  affairsCategoryText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#0066FF",
  },
  affairsDate: {
    fontSize: 12,
    color: "#64748B",
  },
  affairsTitle: {
    fontSize: 15.5,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
    lineHeight: 21,
  },
  affairsSummary: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 19,
    marginBottom: 10,
  },
  affairsSourceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  affairsSourceText: {
    fontSize: 12,
    color: "#10B981",
    fontWeight: "600",
  },
  papersBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FEF3C7",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(217, 119, 6, 0.2)",
    marginBottom: 16,
  },
  papersBannerDark: {
    backgroundColor: "rgba(217, 119, 6, 0.12)",
    borderColor: "rgba(217, 119, 6, 0.25)",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalBox: {
    width: "100%",
    maxWidth: 580,
    maxHeight: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 10,
  },
  modalBoxDark: {
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  modalTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  modalHeaderTitleGroup: {
    flex: 1,
    paddingRight: 10,
  },
  examOrgBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  examOrgBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#0066FF",
  },
  modalMainTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    lineHeight: 22,
  },
  modalCloseBtn: {
    padding: 6,
    borderRadius: 8,
  },
  modalScroll: {
    flexGrow: 0,
  },
  modalDesc: {
    fontSize: 13.5,
    color: "#475569",
    lineHeight: 20,
    marginBottom: 16,
  },
  detailTable: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  detailTableDark: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderColor: "#1E293B",
  },
  detailTableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F6",
  },
  tableLabel: {
    fontSize: 12.5,
    color: "#64748B",
    fontWeight: "500",
    flex: 1,
  },
  tableValue: {
    fontSize: 12.5,
    color: "#0F172A",
    fontWeight: "600",
    flex: 1.4,
    textAlign: "right",
  },
  openOfficialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#0066FF",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 4,
  },
  openOfficialBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  mockStatsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  mockStatCard: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  mockStatCardDark: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "#1E293B",
  },
  mockStatValue: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 2,
  },
  mockStatLabel: {
    fontSize: 10.5,
    color: "#64748B",
    fontWeight: "600",
  },
  instructionHeading: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  instructionRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 6,
  },
  instructionText: {
    fontSize: 12.5,
    color: "#475569",
    flex: 1,
    lineHeight: 18,
  },
  textWhite: {
    color: "#F8FAFC",
  },
  textMutedDark: {
    color: "#94A3B8",
  },
});
