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
  useWindowDimensions,
  View,
} from "react-native";
import { AppHeader } from "../components/common/AppHeader";
import { useTheme } from "../components/theme-context";

export default function PathSelection() {
  const { isDark } = useTheme();
  const { width } = useWindowDimensions();
  const isWide = width >= 720;

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#070B14" : "#FFFFFF"}
      />
      <AppHeader />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Page Heading */}
          <View style={styles.header}>
            <Text style={[styles.title, isDark && styles.titleDark]}>
              Choose Your Path
            </Text>
            <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
              Select your main academic track
            </Text>
          </View>

          {/* Cards Row / Grid */}
          <View style={[styles.cardsContainer, isWide && styles.cardsRow]}>
            {/* 1. Engineering Learning Card */}
            <TouchableOpacity
              style={[
                styles.pathCard,
                isWide && styles.cardFlex,
                isDark && styles.pathCardDark,
              ]}
              onPress={() => router.push("/engineering" as any)}
              activeOpacity={0.92}
            >
              <View style={styles.cardTopRow}>
                <View style={styles.leftTitleGroup}>
                  <View
                    style={[
                      styles.engineeringIconBox,
                      isDark && styles.engineeringIconBoxDark,
                    ]}
                  >
                    <Feather name="cpu" size={22} color="#0066FF" />
                  </View>
                  <Text style={[styles.cardTitle, isDark && styles.cardTitleDark]}>
                    Engineering Learning
                  </Text>
                </View>
                <View style={styles.engineeringBadge}>
                  <Text style={styles.engineeringBadgeText}>5 Modules</Text>
                </View>
              </View>

              <Text style={[styles.cardDetails, isDark && styles.cardDetailsDark]}>
                Coding • DSA • Resume • Interview • Placement Ready
              </Text>

              <View style={styles.actionRow}>
                <Text style={styles.engineeringLink}>Explore Engineering →</Text>
              </View>
            </TouchableOpacity>

            {/* 2. Competitive Exams Card */}
            <TouchableOpacity
              style={[
                styles.pathCard,
                isWide && styles.cardFlex,
                isDark && styles.pathCardDark,
              ]}
              onPress={() => router.push("/competitive" as any)}
              activeOpacity={0.92}
            >
              <View style={styles.cardTopRow}>
                <View style={styles.leftTitleGroup}>
                  <View
                    style={[
                      styles.competitiveIconBox,
                      isDark && styles.competitiveIconBoxDark,
                    ]}
                  >
                    <Feather name="award" size={22} color="#D97706" />
                  </View>
                  <Text style={[styles.cardTitle, isDark && styles.cardTitleDark]}>
                    Competitive Exams
                  </Text>
                </View>
                <View style={styles.competitiveBadge}>
                  <Text style={styles.competitiveBadgeText}>6 Subjects</Text>
                </View>
              </View>

              <Text style={[styles.cardDetails, isDark && styles.cardDetailsDark]}>
                Aptitude • Reasoning • English • GK • Science • Fitness
              </Text>

              <View style={styles.actionRow}>
                <Text style={styles.competitiveLink}>Explore Competitive →</Text>
              </View>
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
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
  },
  container: {
    width: "100%",
    maxWidth: 1100,
    alignSelf: "center",
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  titleDark: {
    color: "#F8FAFC",
  },
  subtitle: {
    fontSize: 14.5,
    color: "#64748b",
    fontWeight: "400",
  },
  subtitleDark: {
    color: "#94A3B8",
  },
  cardsContainer: {
    gap: 20,
  },
  cardsRow: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  cardFlex: {
    flex: 1,
  },
  pathCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: "#eef2f6",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    justifyContent: "space-between",
  },
  pathCardDark: {
    backgroundColor: "#0F172A",
    borderColor: "#1E293B",
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  leftTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    paddingRight: 8,
  },
  engineeringIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  engineeringIconBoxDark: {
    backgroundColor: "rgba(0, 102, 255, 0.15)",
  },
  competitiveIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FEF3C7",
    alignItems: "center",
    justifyContent: "center",
  },
  competitiveIconBoxDark: {
    backgroundColor: "rgba(217, 119, 6, 0.15)",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    flexShrink: 1,
  },
  cardTitleDark: {
    color: "#F8FAFC",
  },
  engineeringBadge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  engineeringBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0066FF",
  },
  competitiveBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  competitiveBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#D97706",
  },
  cardDetails: {
    fontSize: 13,
    color: "#334155",
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 16,
    lineHeight: 19,
  },
  cardDetailsDark: {
    color: "#94A3B8",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  engineeringLink: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#0066FF",
  },
  competitiveLink: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#D97706",
  },
});
