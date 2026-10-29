import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { AuthProvider } from "../components/auth-context";
import { BottomNav } from "../components/common/BottomNav";
import { ThemeProvider, useTheme } from "../components/theme-context";

function AppContent() {
  const { isDark } = useTheme();

  return (
    <View style={[styles.root, isDark && { backgroundColor: '#070B14' }]}>
      <Stack screenOptions={{ headerShown: false }} />
      <BottomNav />
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
