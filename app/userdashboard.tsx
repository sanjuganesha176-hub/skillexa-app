import { router } from "expo-router";
import React from "react";
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 36) / 2;

const MODULES = [
  {
    title: "Introduction to Python Core",
    duration: "25 min",
    progress: "100% Complete",
    buttonText: "Resume Track",
    isActive: true,
    route: "/subjectdashboard",
  },
  {
    title: "Variables & Memory Registers",
    duration: "40 min",
    progress: "0% Complete",
    buttonText: "Launch Unit",
    isActive: true,
    route: "/subjectdashboard",
  },
  {
    title: "Advanced Native Structures",
    duration: "90 min",
    progress: "0% Complete",
    buttonText: "Unlock Previous Lesson First",
    isActive: false,
    route: "/subjectdashboard",
  },
  {
    title: "Conditional Statements & Logic",
    duration: "45 min",
    progress: "0% Complete",
    buttonText: "Unlock Previous Lesson First",
    isActive: false,
    route: "/subjectdashboard",
  },
];

export default function UserDashboard() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.sectionLabel}>Python Syllabus</Text>
            <Text style={styles.headerTitle}>Master fundamental concepts down to advanced programmatic principles.</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.topCard}>
            <Text style={styles.topCardLabel}>Daily Fire Streak</Text>
            <Text style={styles.topCardValue}>12 Days</Text>
          </View>
          <View style={styles.topCard}>
            <Text style={styles.topCardLabel}>Platform Experience</Text>
            <Text style={styles.topCardValue}>2,450 XP</Text>
          </View>
        </View>

        <View style={styles.modulesGrid}>
          {MODULES.map((item, index) => (
            <View key={index} style={[styles.moduleCard, !item.isActive && styles.moduleCardLocked]}>
              <View style={styles.moduleTop}>
                <Text style={styles.moduleIndex}>MODULE {index + 1}</Text>
                {!item.isActive && <Text style={styles.lockLabel}>Locked</Text>}
              </View>
              <Text style={styles.moduleTitle}>{item.title}</Text>
              <Text style={styles.moduleMeta}>{item.duration}</Text>
              <Text style={styles.moduleProgress}>{item.progress}</Text>
              <TouchableOpacity
                style={[styles.moduleButton, !item.isActive && styles.moduleButtonDisabled]}
                activeOpacity={item.isActive ? 0.8 : 1}
                onPress={() => item.isActive && router.push(item.route as any)}
              >
                <Text style={[styles.buttonText, !item.isActive && styles.buttonTextDisabled]}>{item.buttonText}</Text>
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
    backgroundColor: "#f1f5f9",
  },
  container: {
    padding: 18,
    paddingBottom: 28,
  },
  header: {
    marginBottom: 22,
  },
  sectionLabel: {
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#0f172a",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    lineHeight: 34,
    color: "#0f172a",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  topCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  topCardLabel: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  topCardValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a",
  },
  modulesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  moduleCard: {
    width: CARD_WIDTH,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 2,
  },
  moduleCardLocked: {
    opacity: 0.65,
  },
  moduleTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    alignItems: "center",
  },
  moduleIndex: {
    fontSize: 11,
    fontWeight: "800",
    color: "#334155",
    letterSpacing: 0.8,
  },
  lockLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
    textTransform: "uppercase",
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 10,
  },
  moduleMeta: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 6,
  },
  moduleProgress: {
    fontSize: 12,
    color: "#0f172a",
    fontWeight: "700",
    marginBottom: 16,
  },
  moduleButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 11,
    borderRadius: 14,
    alignItems: "center",
  },
  moduleButtonDisabled: {
    backgroundColor: "#e2e8f0",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 0.5,
  },
  buttonTextDisabled: {
    color: "#94a3b8",
  },
});