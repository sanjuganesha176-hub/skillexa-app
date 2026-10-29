import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
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

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header Section with Theme Toggle */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.title, isDark && styles.titleDark]}>
                  Your Exam Modules
                </Text>
                <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
                  Structured aptitude, reasoning & government exam curriculum
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

          {/* Module Cards - Styled Exactly Like Engineering Interface */}
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
  headerThemeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  headerThemeBtnDark: {
    backgroundColor: "#0F172A",
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  headerThemeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0F172A",
  },
  headerThemeTextDark: {
    color: "#F8FAFC",
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
    marginBottom: 20,
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
});
