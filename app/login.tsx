import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth, UserRole } from "../components/auth-context";
import { Palette, Radii, Shadows } from "../constants/theme";

export default function LoginScreen() {
  const [role, setRole] = useState<UserRole>("STUDENT");
  const [authMethod, setAuthMethod] = useState<"EMAIL" | "PHONE">("EMAIL");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("student@skillexa.edu");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [password, setPassword] = useState("scholar123");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === "FACULTY") {
      setEmail("faculty@skillexa.edu");
      setPassword("prof123");
    } else {
      setEmail("student@skillexa.edu");
      setPassword("scholar123");
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === "FACULTY") {
        login({
          id: "fac-101",
          name: "Dr. Kusumadhara S",
          email: "faculty@skillexa.edu",
          password: "",
          role: "FACULTY",
          collegeId: "clg-kvg",
          collegeName: "KVG College of Engineering",
          department: "ECE",
          facultyDesignation: "Associate Professor & HOD in-charge",
          subjectsTaught: ["Embedded Systems", "Microcontrollers", "VLSI Design"],
          verificationStatus: "APPROVED",
        });
        router.replace("/faculty-dashboard" as any);
      } else {
        login({
          id: "std-101",
          name: "Ganesh Sharan",
          email: "student@skillexa.edu",
          password: "",
          role: "STUDENT",
          collegeId: "clg-kvg",
          collegeName: "KVG College of Engineering",
          department: "ECE",
          academicYear: "3rd Year",
          section: "A",
          verificationStatus: "APPROVED",
        });
        router.replace("/pathselection" as any);
      }
    }, 300);
  };

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const identifier = authMethod === "EMAIL" ? email : phone;
      if (role === "FACULTY") {
        login({
          id: "fac-101",
          name: "Dr. Kusumadhara S",
          email: authMethod === "EMAIL" ? email : "faculty@skillexa.edu",
          password,
          role: "FACULTY",
          collegeId: "clg-kvg",
          collegeName: "KVG College of Engineering",
          department: "ECE",
          facultyDesignation: "Associate Professor & HOD in-charge",
          subjectsTaught: ["Embedded Systems", "Microcontrollers", "VLSI Design"],
          verificationStatus: "APPROVED",
        });
        router.replace("/faculty-dashboard" as any);
      } else {
        login({
          id: "std-101",
          name: authMethod === "EMAIL" ? email.split("@")[0] || "Ganesh Sharan" : "Ganesh Sharan",
          email: authMethod === "EMAIL" ? email : "student@skillexa.edu",
          password,
          role: "STUDENT",
          collegeId: "clg-kvg",
          collegeName: "KVG College of Engineering",
          department: "ECE",
          academicYear: "3rd Year",
          section: "A",
          verificationStatus: "APPROVED",
        });
        router.replace("/pathselection" as any);
      }
    }, 300);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* Top Header Bar with Back and More options */}
      <View style={[styles.topBar, styles.responsiveWrapper]}>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/pathselection" as any);
            }
          }}
          style={styles.iconButton}
          activeOpacity={0.7}
        >
          <Feather name="chevron-left" size={26} color="#0f172a" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
          <Feather name="more-horizontal" size={24} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.responsiveWrapper}>
            {/* Brand Header */}
            <View style={styles.header}>
              <View style={styles.brandIconBox}>
                <Feather name="file-text" size={26} color="#FFFFFF" />
              </View>
              <Text style={styles.brandTitle}>SkillExa</Text>
              <Text style={styles.brandTagline}>
                Student Learning & Career Preparation Platform
              </Text>
            </View>

            {/* Clean White Login Card */}
            <View style={styles.loginCard}>
              <Text style={styles.cardTitle}>Welcome Back</Text>
              <Text style={styles.cardSubtitle}>
                Select your account role and sign in to continue
              </Text>

              {/* Role Switcher Tabs */}
              <View style={styles.roleTabsRow}>
                <TouchableOpacity
                  style={[styles.roleTab, role === "STUDENT" && styles.roleTabActive]}
                  onPress={() => handleRoleChange("STUDENT")}
                  activeOpacity={0.8}
                >
                  <Feather
                    name="user"
                    size={16}
                    color={role === "STUDENT" ? "#0066FF" : "#64748B"}
                  />
                  <Text
                    style={[
                      styles.roleTabText,
                      role === "STUDENT" && styles.roleTabTextActive,
                    ]}
                  >
                    Student
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.roleTab, role === "FACULTY" && styles.roleTabActive]}
                  onPress={() => handleRoleChange("FACULTY")}
                  activeOpacity={0.8}
                >
                  <Feather
                    name="square"
                    size={15}
                    color={role === "FACULTY" ? "#0066FF" : "#64748B"}
                  />
                  <Text
                    style={[
                      styles.roleTabText,
                      role === "FACULTY" && styles.roleTabTextActive,
                    ]}
                  >
                    Faculty / Teacher
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Google Sign-In Button */}
              <TouchableOpacity
                style={styles.googleBtn}
                onPress={handleGoogleSignIn}
                activeOpacity={0.85}
              >
                <Text style={styles.googleIconText}>G</Text>
                <Text style={styles.googleBtnText}>Continue with Google</Text>
              </TouchableOpacity>

              {/* OR Divider */}
              <View style={styles.orDividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.orText}>OR SIGN IN WITH</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Auth Method Switcher (Email / Phone) */}
              <View style={styles.methodTabsRow}>
                <TouchableOpacity
                  style={[
                    styles.methodTab,
                    authMethod === "EMAIL" && styles.methodTabActive,
                  ]}
                  onPress={() => setAuthMethod("EMAIL")}
                  activeOpacity={0.8}
                >
                  <Feather
                    name="mail"
                    size={14}
                    color={authMethod === "EMAIL" ? "#0066FF" : "#64748B"}
                  />
                  <Text
                    style={[
                      styles.methodTabText,
                      authMethod === "EMAIL" && styles.methodTabTextActive,
                    ]}
                  >
                    Email / Gmail
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.methodTab,
                    authMethod === "PHONE" && styles.methodTabActive,
                  ]}
                  onPress={() => setAuthMethod("PHONE")}
                  activeOpacity={0.8}
                >
                  <Feather
                    name="phone"
                    size={14}
                    color={authMethod === "PHONE" ? "#0066FF" : "#64748B"}
                  />
                  <Text
                    style={[
                      styles.methodTabText,
                      authMethod === "PHONE" && styles.methodTabTextActive,
                    ]}
                  >
                    Phone Number
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Email or Phone Input */}
              {authMethod === "EMAIL" ? (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    {role === "FACULTY"
                      ? "FACULTY GMAIL / EMAIL ADDRESS"
                      : "STUDENT GMAIL / EMAIL ADDRESS"}
                  </Text>
                  <View style={styles.inputContainer}>
                    <Feather
                      name="mail"
                      size={18}
                      color="#94A3B8"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      placeholder="student@skillexa.edu"
                      placeholderTextColor="#94A3B8"
                      style={styles.input}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    {role === "FACULTY"
                      ? "FACULTY PHONE NUMBER"
                      : "STUDENT PHONE NUMBER"}
                  </Text>
                  <View style={styles.inputContainer}>
                    <Feather
                      name="phone"
                      size={18}
                      color="#94A3B8"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      placeholder="+91 98765 43210"
                      placeholderTextColor="#94A3B8"
                      style={styles.input}
                      keyboardType="phone-pad"
                      value={phone}
                      onChangeText={setPhone}
                    />
                  </View>
                </View>
              )}

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>PASSWORD</Text>
                <View style={styles.inputContainer}>
                  <Feather
                    name="lock"
                    size={18}
                    color="#94A3B8"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    placeholder="••••••••"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeBtn}
                    activeOpacity={0.7}
                  >
                    <Feather
                      name={showPassword ? "eye-off" : "eye"}
                      size={18}
                      color="#94A3B8"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Sign In Button */}
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={handleLogin}
                activeOpacity={0.88}
              >
                <Text style={styles.loginBtnText}>
                  {isLoading
                    ? "Signing in..."
                    : "Sign In to SkillExa →"}
                </Text>
              </TouchableOpacity>

              {/* Register Link */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push("/register" as any)}
                style={styles.registerLink}
              >
                <Text style={styles.registerText}>
                  Don't have an account?{" "}
                  <Text style={styles.registerHighlight}>Register</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  keyboardView: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 4,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  responsiveWrapper: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  brandIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#0066FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  brandTagline: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
    textAlign: "center",
  },
  loginCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 18,
    lineHeight: 18,
  },
  roleTabsRow: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 4,
    gap: 6,
    marginBottom: 16,
  },
  roleTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  roleTabActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  roleTabText: {
    fontSize: 13.5,
    fontWeight: "600",
    color: "#64748B",
  },
  roleTabTextActive: {
    color: "#0066FF",
    fontWeight: "700",
  },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 10,
    marginBottom: 18,
  },
  googleIconText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#4285F4",
  },
  googleBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
  },
  orDividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  orText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 0.6,
  },
  methodTabsRow: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    padding: 3,
    marginBottom: 18,
    gap: 4,
  },
  methodTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  methodTabActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  methodTabText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#64748B",
  },
  methodTabTextActive: {
    color: "#0066FF",
    fontWeight: "700",
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#334155",
    letterSpacing: 0.4,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 14,
    color: "#0F172A",
  },
  eyeBtn: {
    padding: 6,
  },
  loginBtn: {
    backgroundColor: "#0066FF",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 18,
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  loginBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  registerLink: {
    alignItems: "center",
  },
  registerText: {
    fontSize: 13.5,
    color: "#64748B",
  },
  registerHighlight: {
    color: "#0066FF",
    fontWeight: "700",
  },
});
