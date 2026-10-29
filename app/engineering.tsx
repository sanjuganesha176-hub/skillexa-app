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

export default function EngineeringDashboard() {
  const { isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#070B14" : "#FFFFFF"}
      />
      <AppHeader
        showBack
        title="Engineering Learning"
        backLabel="Back to Paths"
        onBack={() => router.push("/pathselection" as any)}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={[styles.title, isDark && styles.titleDark]}>
              Your Learning Modules
            </Text>
            <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
              Structured career and technical curriculum
            </Text>
          </View>

          {/* Module 1: Coding Problems */}
          <View style={[styles.moduleCard, isDark && styles.moduleCardDark]}>
            <View style={styles.cardTopRow}>
              <View style={[styles.iconBox, isDark && styles.iconBoxDark]}>
                <Feather
                  name="terminal"
                  size={20}
                  color={isDark ? "#38BDF8" : "#334155"}
                />
              </View>
              <View style={styles.textGroup}>
                <Text style={[styles.moduleTitle, isDark && styles.moduleTitleDark]}>
                  Coding Problems
                </Text>
                <Text style={[styles.moduleDesc, isDark && styles.moduleDescDark]}>
                  Practice real programming problems.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.actionBtn, isDark && styles.actionBtnDark]}
              onPress={() => router.push("/coding-problems" as any)}
              activeOpacity={0.88}
            >
              <Text style={styles.actionBtnText}>Practice Coding →</Text>
            </TouchableOpacity>
          </View>

          {/* Module 2: DSA Practice */}
          <View style={[styles.moduleCard, isDark && styles.moduleCardDark]}>
            <View style={styles.cardTopRow}>
              <View style={[styles.iconBox, isDark && styles.iconBoxDark]}>
                <Feather
                  name="code"
                  size={20}
                  color={isDark ? "#38BDF8" : "#334155"}
                />
              </View>
              <View style={styles.textGroup}>
                <Text style={[styles.moduleTitle, isDark && styles.moduleTitleDark]}>
                  DSA Practice
                </Text>
                <Text style={[styles.moduleDesc, isDark && styles.moduleDescDark]}>
                  Master data structures and algorithms step by step.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.actionBtn, isDark && styles.actionBtnDark]}
              onPress={() => router.push("/dsa-practice" as any)}
              activeOpacity={0.88}
            >
              <Text style={styles.actionBtnText}>Continue DSA Roadmap →</Text>
            </TouchableOpacity>
          </View>

          {/* Module 3: Resume Builder */}
          <View style={[styles.moduleCard, isDark && styles.moduleCardDark]}>
            <View style={styles.cardTopRow}>
              <View style={[styles.iconBox, isDark && styles.iconBoxDark]}>
                <Feather
                  name="file-text"
                  size={20}
                  color={isDark ? "#38BDF8" : "#334155"}
                />
              </View>
              <View style={styles.textGroup}>
                <Text style={[styles.moduleTitle, isDark && styles.moduleTitleDark]}>
                  Resume Builder
                </Text>
                <Text style={[styles.moduleDesc, isDark && styles.moduleDescDark]}>
                  Create your ATS-ready professional resume.
                </Text>
              </View>
            </View>

            <View style={styles.metaRow}>
              <Text style={[styles.metaText, isDark && styles.metaTextDark]}>
                Templates:{" "}
                <Text style={[styles.metaBold, isDark && styles.metaBoldDark]}>
                  3 Standard
                </Text>
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.actionBtn, isDark && styles.actionBtnDark]}
              onPress={() => router.push("/resume-builder" as any)}
              activeOpacity={0.88}
            >
              <Text style={styles.actionBtnText}>Build Resume →</Text>
            </TouchableOpacity>
          </View>

          {/* Module 4: AI Mock Interview */}
          <View style={[styles.moduleCard, isDark && styles.moduleCardDark]}>
            <View style={styles.cardTopRow}>
              <View style={[styles.iconBox, isDark && styles.iconBoxDark]}>
                <Feather
                  name="message-square"
                  size={20}
                  color={isDark ? "#C084FC" : "#334155"}
                />
              </View>
              <View style={styles.textGroup}>
                <View style={styles.titleRow}>
                  <Text style={[styles.moduleTitle, isDark && styles.moduleTitleDark]}>
                    AI Mock Interview
                  </Text>
                  <View style={styles.aiBadge}>
                    <Text style={styles.aiBadgeText}>AI POWERED</Text>
                  </View>
                </View>
                <Text style={[styles.moduleDesc, isDark && styles.moduleDescDark]}>
                  Practice technical and HR interviews with instant AI evaluation.
                </Text>
              </View>
            </View>

            <View style={styles.metaRow}>
              <Text style={[styles.metaText, isDark && styles.metaTextDark]}>
                Average Score: -
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.actionBtn, isDark && styles.actionBtnDark]}
              onPress={() => router.push("/mock-interviews" as any)}
              activeOpacity={0.88}
            >
              <Text style={styles.actionBtnText}>Start AI Interview →</Text>
            </TouchableOpacity>
          </View>

          {/* Module 5: Placement Preparation */}
          <View style={[styles.moduleCard, isDark && styles.moduleCardDark]}>
            <View style={styles.cardTopRow}>
              <View style={[styles.iconBox, isDark && styles.iconBoxDark]}>
                <Feather
                  name="briefcase"
                  size={20}
                  color={isDark ? "#38BDF8" : "#334155"}
                />
              </View>
              <View style={styles.textGroup}>
                <Text style={[styles.moduleTitle, isDark && styles.moduleTitleDark]}>
                  Placement Preparation
                </Text>
                <Text style={[styles.moduleDesc, isDark && styles.moduleDescDark]}>
                  Prepare for aptitude, technical MCQs and HR rounds.
                </Text>
              </View>
            </View>

            <View style={styles.metaRow}>
              <Text style={[styles.metaText, isDark && styles.metaTextDark]}>
                Company Profiles:{" "}
                <Text style={[styles.metaBold, isDark && styles.metaBoldDark]}>
                  12
                </Text>
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.actionBtn, isDark && styles.actionBtnDark]}
              onPress={() => router.push("/placement-preparation" as any)}
              activeOpacity={0.88}
            >
              <Text style={styles.actionBtnText}>Prepare for Placement →</Text>
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
    marginBottom: 16,
  },
  subtitleDark: {
    color: "#94A3B8",
  },
  crossTrackBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FEF3C7",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(217, 119, 6, 0.2)",
    marginBottom: 20,
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
    color: "#D97706",
  },
  crossTrackSub: {
    fontSize: 11.5,
    color: "#78350F",
    marginTop: 1,
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
    borderColor: "#1E293B",
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  iconBoxDark: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  textGroup: {
    flex: 1,
    paddingTop: 2,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  moduleTitle: {
    fontSize: 16.5,
    fontWeight: "800",
    color: "#0f172a",
  },
  moduleTitleDark: {
    color: "#F8FAFC",
  },
  aiBadge: {
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 6,
  },
  aiBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#4338CA",
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
    borderColor: "#334155",
    borderWidth: 1,
  },
  actionBtnText: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "700",
  },
});