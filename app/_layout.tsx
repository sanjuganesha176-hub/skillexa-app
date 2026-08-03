import { Stack } from "expo-router";
import React from "react";
import { AuthProvider, TopProfileMenu } from "../components/auth-context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <>
        <TopProfileMenu />
        <Stack screenOptions={{ headerShown: false }} />
      </>
    </AuthProvider>
  );
}
