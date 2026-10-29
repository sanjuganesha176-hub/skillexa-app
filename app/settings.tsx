import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../components/auth-context";
import { AppHeader } from "../components/common/AppHeader";
import { useTheme } from "../components/theme-context";
import { Palette, Radii, Shadows } from "../constants/theme";

export default function SettingsScreen() {
  const { profile, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    router.replace("/login" as any);
  };

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#070B14" : "#FFFFFF"}
      />
      <AppHeader
        showBack
        title="Settings & Preferences"
        backLabel="Back"
        onBack={() => router.back()}
      />

      {/* Confirmation Modal for Sign Out */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalBox, isDark && styles.modalBoxDark]}>
            <View style={styles.logoutIconBox}>
              <Feather name="log-out" size={28} color="#EF4444" />
            </View>
            <Text style={[styles.modalTitle, isDark && styles.textWhite]}>
              Sign Out of SkillExa
            </Text>
            <Text style={[styles.modalSubtitle, isDark && styles.textMutedDark]}>
              Are you sure you want to sign out? You will need to sign in again to access your learning modules.
            </Text>

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={[styles.modalCancelBtn, isDark && styles.modalCancelBtnDark]}
                onPress={() => setShowLogoutModal(false)}
                activeOpacity={0.8}
              >
                <Text style={[styles.modalCancelBtnText, isDark && styles.textWhite]}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalConfirmBtn}
                onPress={handleConfirmLogout}
                activeOpacity={0.8}
              >
                <Text style={styles.modalConfirmBtnText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Section 1: Appearance & Display */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
              APPEARANCE & THEME
            </Text>
          </View>

          <View style={[styles.card, isDark && styles.cardDark]}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: isDark ? "rgba(245, 158, 11, 0.15)" : "#FEF3C7" },
                  ]}
                >
                  <Feather
                    name={isDark ? "moon" : "sun"}
                    size={20}
                    color={isDark ? "#F59E0B" : "#D97706"}
                  />
                </View>
                <View style={styles.rowTexts}>
                  <Text style={[styles.rowTitle, isDark && styles.textWhite]}>
                    Dark Theme Mode
                  </Text>
                  <Text style={[styles.rowSubtitle, isDark && styles.textMutedDark]}>
                    {isDark ? "Dark theme active" : "Light theme active"}
                  </Text>
                </View>
              </View>

              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: "#E2E8F0", true: "#0066FF" }}
                thumbColor={isDark ? "#FFFFFF" : "#FFFFFF"}
              />
            </View>
          </View>

          {/* Section 2: Account & Profile */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
              ACCOUNT & PROFILE
            </Text>
          </View>

          <View style={[styles.card, isDark && styles.cardDark]}>
            <TouchableOpacity
              style={styles.clickableRow}
              onPress={() => router.push("/profile" as any)}
              activeOpacity={0.7}
            >
              <View style={styles.rowLeft}>
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: isDark ? "rgba(0, 102, 255, 0.15)" : "#EFF6FF" },
                  ]}
                >
                  <Feather name="user" size={20} color="#0066FF" />
                </View>
                <View style={styles.rowTexts}>
                  <Text style={[styles.rowTitle, isDark && styles.textWhite]}>
                    {profile?.name || "Student Profile"}
                  </Text>
                  <Text style={[styles.rowSubtitle, isDark && styles.textMutedDark]}>
                    {profile?.email || "student@skillexa.edu"} • {profile?.role || "STUDENT"}
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={18} color={isDark ? "#64748B" : "#94A3B8"} />
            </TouchableOpacity>
          </View>

          {/* Section 3: System & Backend Server */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
              SYSTEM & CONNECTIVITY
            </Text>
          </View>

          <View style={[styles.card, isDark && styles.cardDark]}>
            <TouchableOpacity
              style={styles.clickableRow}
              onPress={() => router.push("/system-status" as any)}
              activeOpacity={0.7}
            >
              <View style={styles.rowLeft}>
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: isDark ? "rgba(16, 185, 129, 0.15)" : "#ECFDF5" },
                  ]}
                >
                  <Feather name="activity" size={20} color="#10B981" />
                </View>
                <View style={styles.rowTexts}>
                  <Text style={[styles.rowTitle, isDark && styles.textWhite]}>
                    Backend Server Status & Diagnostics
                  </Text>
                  <Text style={[styles.rowSubtitle, isDark && styles.textMutedDark]}>
                    Configure API endpoint and test server health
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={18} color={isDark ? "#64748B" : "#94A3B8"} />
            </TouchableOpacity>
          </View>

          {/* Section 4: Sign Out */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
              SESSION
            </Text>
          </View>

          <View style={[styles.card, isDark && styles.cardDark]}>
            <TouchableOpacity
              style={styles.clickableRow}
              onPress={() => setShowLogoutModal(true)}
              activeOpacity={0.7}
            >
              <View style={styles.rowLeft}>
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: isDark ? "rgba(239, 68, 68, 0.15)" : "#FEE2E2" },
                  ]}
                >
                  <Feather name="log-out" size={20} color="#EF4444" />
                </View>
                <View style={styles.rowTexts}>
                  <Text style={[styles.rowTitle, { color: "#EF4444" }]}>
                    Sign Out of SkillExa
                  </Text>
                  <Text style={[styles.rowSubtitle, isDark && styles.textMutedDark]}>
                    End current session on this device
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={18} color="#EF4444" />
            </TouchableOpacity>
          </View>

          {/* App Info Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, isDark && styles.textMutedDark]}>
              SkillExa Platform • Version 1.0.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  safeAreaDark: {
    backgroundColor: "#070B14",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 48,
  },
  container: {
    width: "100%",
    maxWidth: 640,
    alignSelf: "center",
  },
  sectionHeader: {
    marginBottom: 8,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 0.6,
  },
  sectionTitleDark: {
    color: "#94A3B8",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEF2F6",
    ...Shadows.card,
  },
  cardDark: {
    backgroundColor: "#0F172A",
    borderColor: "#1E293B",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  clickableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  rowTexts: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 2,
  },
  rowSubtitle: {
    fontSize: 12.5,
    color: "#64748B",
  },
  textWhite: {
    color: "#F8FAFC",
  },
  textMutedDark: {
    color: "#94A3B8",
  },
  footer: {
    marginTop: 32,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "500",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalBox: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  modalBoxDark: {
    backgroundColor: "#0F172A",
    borderColor: "#1E293B",
    borderWidth: 1,
  },
  logoutIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 13.5,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  modalBtnRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
  },
  modalCancelBtnDark: {
    backgroundColor: "#1E293B",
  },
  modalCancelBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  modalConfirmBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 12,
    backgroundColor: "#EF4444",
    alignItems: "center",
  },
  modalConfirmBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});

