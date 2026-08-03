import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PathSelection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Learning Path</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/engineering"as any)}
      >
        <Text style={styles.icon}>📚</Text>
        <Text style={styles.cardTitle}>Engineering Learning</Text>
        <Text style={styles.cardDesc}>
          Study engineering subjects and unit-wise quizzes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/competitive"as any)}
      >
        <Text style={styles.icon}>🏆</Text>
        <Text style={styles.cardTitle}>Competitive Exams</Text>
        <Text style={styles.cardDesc}>
          Aptitude, Reasoning, GK and Technical MCQs
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDesc: {
    marginTop: 5,
    color: "#64748b",
  },
});