import { router } from "expo-router";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../components/auth-context";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = () => {
    login({ name: email.split("@")[0] || "User", email, password });
    router.replace("/pathselection" as any);
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>
        <Text style={styles.skill}>skill</Text>
        <Text style={styles.exa}>Exa</Text>
      </Text>

      <Text style={styles.welcome}>Welcome To Learning</Text>

      {/* Email */}
      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Enter Password"
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.showText}>
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Register Button */}
      <TouchableOpacity onPress={() => router.push("/register") as any}>
        <Text style={styles.registerText}>
          Don&apos;t have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  logo: {
    textAlign: "center",
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 15,
  },

  skill: {
    color: "#3b82f6",
  },

  exa: {
    color: "#06b6d4",
  },

  welcome: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 35,
    color: "#333",
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  passwordInput: {
    flex: 1,
    padding: 14,
    fontSize: 16,
  },

  showText: {
    color: "#06b6d4",
    fontWeight: "bold",
  },

  loginButton: {
    backgroundColor: "#06b6d4",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  registerText: {
    textAlign: "center",
    marginTop: 20,
    color: "#06b6d4",
    fontSize: 16,
    fontWeight: "600",
  },
});