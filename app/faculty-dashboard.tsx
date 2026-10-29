import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../components/auth-context";
import { AppHeader } from "../components/common/AppHeader";
import { useTheme } from "../components/theme-context";
import { FacultySystemStore } from "../services/facultyStore";

export default function FacultyDashboardScreen() {
  const { profile } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [stats, setStats] = useState(FacultySystemStore.getStats());

  useEffect(() => {
    const unsub = FacultySystemStore.subscribe(() => {
      setStats(FacultySystemStore.getStats());
    });
    return unsub;
  }, []);

  const menuModules = [
    {
      id: "announcements",
      title: "College Announcements",
      desc: "Publish departmental notices and alerts to targeted classes",
      icon: "volume-2",
      accent: isDark ? "#38BDF8" : "#0066FF",
      route: "/faculty/announcements",
      count: "Direct Notices",
    },
    {
      id: "students",
      title: "My Students",
      desc: "View enrolled class roster, batch progress & metrics",
      icon: "users",
      accent: "#10B981",
      route: "/faculty/students",
      count: `${stats.totalStudents} Students`,
    },
    {
      id: "notes",
      title: "Faculty Notes",
      desc: "Create, draft, and publish rich topic notes to students",
      icon: "file-text",
      accent: isDark ? "#38BDF8" : "#0066FF",
      route: "/faculty/notes",
      count: `${stats.notesPublished} Published`,
    },
    {
      id: "create-quiz",
      title: "Create Quiz",
      desc: "Author multi-question quizzes with time & negative marking",
      icon: "plus-circle",
      accent: "#10B981",
      route: "/faculty/create-quiz",
      count: `${stats.quizzesCreated} Quizzes`,
    },
    {
      id: "question-bank",
      title: "Question Bank",
      desc: "Filterable repository of MCQs, Numerical & Coding questions",
      icon: "database",
      accent: "#D97706",
      route: "/faculty/question-bank",
      count: "50+ Questions",
    },
    {
      id: "assignments",
      title: "Assignments & Grading",
      desc: "Assign quizzes to classes and view detailed submissions",
      icon: "check-square",
      accent: isDark ? "#C084FC" : "#6366F1",
      route: "/faculty/assignments",
      count: "Active Batches",
    },
    {
      id: "interview",
      title: "Take Interview",
      desc: "Schedule custom viva & placement interviews with students",
      icon: "message-square",
      accent: isDark ? "#38BDF8" : "#0066FF",
      route: "/faculty/interview",
      count: `${stats.pendingEvaluations} Pending`,
    },
    {
      id: "live-interview",
      title: "Live Video Interview Room",
      desc: "Real-time WebRTC-ready video interview call with timer & rubric",
      icon: "video",
      accent: "#EF4444",
      route: "/faculty/live-interview",
      count: "Live Room Ready",
    },
    {
      id: "performance",
      title: "Student Performance Analytics",
      desc: "Inspect individual student progress and topic-wise mastery",
      icon: "trending-up",
      accent: "#10B981",
      route: "/faculty/performance",
      count: `${stats.totalStudents} Enrolled`,
    },
    {
      id: "videos",
      title: "Faculty Videos",
      desc: "Attach video lectures to specific curriculum topics",
      icon: "film",
      accent: isDark ? "#C084FC" : "#6366F1",
      route: "/faculty/videos",
      count: "Lectures",
    },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#070B14" : "#FFFFFF"}
      />
      <AppHeader
        showBack
        title="Faculty Portal"
        subtitle={profile.collegeName || "KVG College of Engineering"}
        backLabel="Back to Paths"
        onBack={() => router.push("/pathselection" as any)}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header Section with Theme Switcher */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.title, isDark && styles.titleDark]}>
                  Faculty Dashboard
                </Text>
                <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
                  Department curriculum, evaluation & student analytics
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

          {/* College & Faculty Verification Hero */}
          <View style={[styles.heroCard, isDark && styles.heroCardDark]}>
            <View style={styles.heroTop}>
              <View style={[styles.heroIconBox, isDark && styles.heroIconBoxDark]}>
                <Feather
                  name="award"
                  size={24}
                  color={isDark ? "#38BDF8" : "#0066FF"}
                />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.badgeRow}>
                  <View style={[styles.badge, isDark && styles.badgeDark]}>
                    <Text style={[styles.badgeText, isDark && styles.badgeTextDark]}>
                      AUTHORIZED FACULTY
                    </Text>
                  </View>
                  <View style={[styles.statusPill, isDark && styles.statusPillDark]}>
                    <Feather name="check" size={11} color="#10B981" />
                    <Text style={styles.statusText}>VERIFIED</Text>
                  </View>
                </View>

                <Text style={[styles.heroTitle, isDark && styles.heroTitleDark]}>
                  {profile.name || "Dr. Kusumadhara S"}
                </Text>
                <Text style={[styles.heroSubtitle, isDark && styles.heroSubtitleDark]}>
                  {profile.facultyDesignation || "Associate Professor"} • {profile.department || "ECE"} Department
                </Text>
                <Text style={[styles.collegeSubtext, isDark && styles.collegeSubtextDark]}>
                  {profile.collegeName || "KVG College of Engineering"}
                </Text>
              </View>
            </View>
          </View>

          {/* Real-time Stats Grid */}
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
              Dashboard Statistics
            </Text>
            <Text style={[styles.sectionSubtitle, isDark && styles.sectionSubtitleDark]}>
              Real-time department student & content metrics
            </Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={[styles.statCard, isDark && styles.statCardDark]}>
              <Text style={[styles.statVal, { color: isDark ? "#38BDF8" : "#0066FF" }]}>
                {stats.totalStudents}
              </Text>
              <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>
                Enrolled Students
              </Text>
            </View>

            <View style={[styles.statCard, isDark && styles.statCardDark]}>
              <Text style={[styles.statVal, { color: "#10B981" }]}>
                {stats.notesPublished}
              </Text>
              <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>
                Notes Published
              </Text>
            </View>

            <View style={[styles.statCard, isDark && styles.statCardDark]}>
              <Text style={[styles.statVal, { color: "#D97706" }]}>
                {stats.quizzesCreated}
              </Text>
              <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>
                Quizzes Created
              </Text>
            </View>

            <View style={[styles.statCard, isDark && styles.statCardDark]}>
              <Text style={[styles.statVal, { color: isDark ? "#C084FC" : "#6366F1" }]}>
                {stats.interviewsConducted}
              </Text>
              <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>
                Interviews Conducted
              </Text>
            </View>

            <View style={[styles.statCard, isDark && styles.statCardDark]}>
              <Text style={[styles.statVal, { color: "#EF4444" }]}>
                {stats.pendingEvaluations}
              </Text>
              <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>
                Pending Reviews
              </Text>
            </View>

            <View style={[styles.statCard, isDark && styles.statCardDark]}>
              <Text style={[styles.statVal, { color: isDark ? "#38BDF8" : "#0066FF" }]}>
                {stats.averageStudentScore}%
              </Text>
              <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>
                Class Avg Score
              </Text>
            </View>
          </View>

          {/* 10 Core Faculty Modules */}
          <View style={[styles.sectionHeaderRow, { marginTop: 12 }]}>
            <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
              Faculty Management Modules
            </Text>
            <Text style={[styles.sectionSubtitle, isDark && styles.sectionSubtitleDark]}>
              Select an option to manage department learning materials and student progress
            </Text>
          </View>

          <View style={styles.modulesGrid}>
            {menuModules.map((mod) => (
              <TouchableOpacity
                key={mod.id}
                style={[styles.modCard, isDark && styles.modCardDark]}
                onPress={() => router.push(mod.route as any)}
                activeOpacity={0.88}
              >
                <View style={styles.modCardTop}>
                  <View style={[styles.modIconBox, isDark && styles.modIconBoxDark]}>
                    <Feather
                      name={mod.icon as any}
                      size={20}
                      color={isDark ? "#38BDF8" : "#334155"}
                    />
                  </View>
                  <View style={[styles.countBadge, isDark && styles.countBadgeDark]}>
                    <Text style={[styles.countBadgeText, isDark && styles.countBadgeTextDark]}>
                      {mod.count}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.modTitle, isDark && styles.modTitleDark]}>
                  {mod.title}
                </Text>
                <Text style={[styles.modDesc, isDark && styles.modDescDark]}>
                  {mod.desc}
                </Text>

                <View style={[styles.modFooter, isDark && styles.modFooterDark]}>
                  <Text style={[styles.openLinkText, isDark && styles.openLinkTextDark]}>
                    Open Management
                  </Text>
                  <Feather
                    name="arrow-right"
                    size={14}
                    color={isDark ? "#38BDF8" : "#0066FF"}
                  />
                </View>
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
    marginBottom: 20,
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
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#eef2f6",
    borderLeftWidth: 4,
    borderLeftColor: "#0066FF",
    marginBottom: 22,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  heroCardDark: {
    backgroundColor: "#0F172A",
    borderColor: "#1E293B",
    borderLeftColor: "#38BDF8",
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },
  heroIconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  heroIconBoxDark: {
    backgroundColor: "rgba(56, 189, 248, 0.12)",
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  badge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.2)",
  },
  badgeDark: {
    backgroundColor: "rgba(56, 189, 248, 0.15)",
    borderColor: "rgba(56, 189, 248, 0.3)",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#0066FF",
    letterSpacing: 0.6,
  },
  badgeTextDark: {
    color: "#38BDF8",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.25)",
  },
  statusPillDark: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    borderColor: "rgba(16, 185, 129, 0.35)",
  },
  statusText: {
    fontSize: 9.5,
    fontWeight: "800",
    color: "#10B981",
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 3,
  },
  heroTitleDark: {
    color: "#F8FAFC",
  },
  heroSubtitle: {
    fontSize: 13,
    color: "#0066FF",
    fontWeight: "700",
  },
  heroSubtitleDark: {
    color: "#38BDF8",
  },
  collegeSubtext: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 3,
  },
  collegeSubtextDark: {
    color: "#94A3B8",
  },
  sectionHeaderRow: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0f172a",
  },
  sectionTitleDark: {
    color: "#F8FAFC",
  },
  sectionSubtitle: {
    fontSize: 12.5,
    color: "#64748b",
    marginTop: 2,
  },
  sectionSubtitleDark: {
    color: "#94A3B8",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    width: "31.3%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#eef2f6",
    alignItems: "center",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statCardDark: {
    backgroundColor: "#0F172A",
    borderColor: "#1E293B",
  },
  statVal: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10.5,
    color: "#64748b",
    fontWeight: "600",
    textAlign: "center",
  },
  statLabelDark: {
    color: "#94A3B8",
  },
  modulesGrid: {
    gap: 14,
  },
  modCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#eef2f6",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  modCardDark: {
    backgroundColor: "#0F172A",
    borderColor: "#1E293B",
  },
  modCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  modIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  modIconBoxDark: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  countBadge: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  countBadgeDark: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  countBadgeText: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#334155",
  },
  countBadgeTextDark: {
    color: "#94A3B8",
  },
  modTitle: {
    fontSize: 16.5,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 4,
  },
  modTitleDark: {
    color: "#F8FAFC",
  },
  modDesc: {
    fontSize: 13,
    color: "#64748b",
    lineHeight: 18,
    marginBottom: 14,
  },
  modDescDark: {
    color: "#94A3B8",
  },
  modFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  modFooterDark: {
    borderTopColor: "rgba(255, 255, 255, 0.08)",
  },
  openLinkText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0066FF",
  },
  openLinkTextDark: {
    color: "#38BDF8",
  },
});
