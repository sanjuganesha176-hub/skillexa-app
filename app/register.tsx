import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Register() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"STUDENT" | "FACULTY">("STUDENT");

  const handleContinue = () => {
    if (selectedRole === "STUDENT") {
      router.push("/register-user" as any);
    } else {
      router.push("/register-lecturer" as any);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.responsiveWrapper}>
          {/* Top Bar with circular Back button and Step pill */}
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.circularBackButton}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Feather name="arrow-left" size={20} color="#0f172a" />
            </TouchableOpacity>

            <View style={styles.stepPill}>
              <View style={styles.stepDot} />
              <Text style={styles.stepText}>Step 1 of 3</Text>
            </View>
          </View>

          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.badge}>ONBOARDING</Text>
            <Text style={styles.title}>Select Your Role</Text>
            <Text style={styles.subtitle}>
              Choose your learning or teaching profile to configure your personalized dashboard
            </Text>
          </View>

          {/* Option 1: Student Card */}
          <TouchableOpacity
            style={[
              styles.roleCard,
              selectedRole === "STUDENT" && styles.roleCardActive,
            ]}
            onPress={() => setSelectedRole("STUDENT")}
            activeOpacity={0.88}
          >
            <View style={styles.cardContent}>
              <View style={styles.studentIconBox}>
                <Feather name="user" size={22} color="#0066FF" />
              </View>

              <View style={styles.cardTexts}>
                <View style={styles.roleTitleRow}>
                  <Text style={styles.roleTitle}>Student</Text>
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularBadgeText}>POPULAR</Text>
                  </View>
                </View>
                <Text style={styles.roleDesc}>
                  Access engineering roadmaps, coding compiler, unit quizzes, and competitive exams.
                </Text>
              </View>

              <View style={styles.rightActions}>
                {selectedRole === "STUDENT" ? (
                  <View style={styles.checkedCircle}>
                    <Feather name="check" size={13} color="#FFFFFF" />
                  </View>
                ) : (
                  <View style={styles.uncheckedCircle} />
                )}
                <Feather name="chevron-right" size={18} color="#94a3b8" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Option 2: Faculty / Teacher Card */}
          <TouchableOpacity
            style={[
              styles.roleCard,
              selectedRole === "FACULTY" && styles.roleCardActive,
            ]}
            onPress={() => setSelectedRole("FACULTY")}
            activeOpacity={0.88}
          >
            <View style={styles.cardContent}>
              <View style={styles.facultyIconBox}>
                <Feather name="file-text" size={20} color="#9333EA" />
              </View>

              <View style={styles.cardTexts}>
                <View style={styles.roleTitleRow}>
                  <Text style={styles.roleTitle}>Faculty / Teacher</Text>
                  <View style={styles.facultyBadge}>
                    <Text style={styles.facultyBadgeText}>FACULTY</Text>
                  </View>
                </View>
                <Text style={styles.roleDesc}>
                  Publish curriculum content, manage lab files, design quizzes, and monitor students.
                </Text>
              </View>

              <View style={styles.rightActions}>
                {selectedRole === "FACULTY" ? (
                  <View style={styles.checkedCircle}>
                    <Feather name="check" size={13} color="#FFFFFF" />
                  </View>
                ) : (
                  <View style={styles.uncheckedCircle} />
                )}
                <Feather name="chevron-right" size={18} color="#94a3b8" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Primary Action Button */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.88}
          >
            <Text style={styles.continueButtonText}>
              {selectedRole === "STUDENT"
                ? "Continue as Student →"
                : "Continue as Faculty →"}
            </Text>
          </TouchableOpacity>

          {/* Existing account footer */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.replace("/login")}
            >
              <Text style={styles.footerHighlight}>Sign In</Text>
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
    backgroundColor: "#f8fafc",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 14 : 8,
    paddingBottom: 32,
    justifyContent: "center",
  },
  responsiveWrapper: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },
  circularBackButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#eef2f6",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  stepPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  stepDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#0066FF",
  },
  stepText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0066FF",
  },
  header: {
    marginBottom: 24,
  },
  badge: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0066FF",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 21,
    fontWeight: "400",
  },
  roleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#eef2f6",
    padding: 16,
    marginBottom: 16,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  roleCardActive: {
    borderColor: "#0066FF",
    backgroundColor: "#FFFFFF",
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  studentIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  facultyIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#FAF5FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  cardTexts: {
    flex: 1,
    paddingRight: 8,
  },
  roleTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },
  popularBadge: {
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  popularBadgeText: {
    fontSize: 10.5,
    fontWeight: "800",
    color: "#0284C7",
    letterSpacing: 0.4,
  },
  facultyBadge: {
    backgroundColor: "#FAF5FF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  facultyBadgeText: {
    fontSize: 10.5,
    fontWeight: "800",
    color: "#9333EA",
    letterSpacing: 0.4,
  },
  roleDesc: {
    fontSize: 12.5,
    color: "#64748b",
    lineHeight: 18,
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkedCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#0066FF",
    alignItems: "center",
    justifyContent: "center",
  },
  uncheckedCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#cbd5e1",
    backgroundColor: "transparent",
  },
  continueButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#0066FF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    marginBottom: 20,
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  continueButtonText: {
    fontSize: 15.5,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 13.5,
    color: "#64748b",
  },
  footerHighlight: {
    fontSize: 13.5,
    color: "#0066FF",
    fontWeight: "700",
  },
});