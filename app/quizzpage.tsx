import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function QuizPage() {
  const [selected, setSelected] = useState("");

  const question = {
    text: "What is 25% of 200?",
    options: ["25", "50", "75", "100"],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SkillExa</Text>

      <Text style={styles.title}>Quiz</Text>

      <Text style={styles.progressText}>
        Question 1 of 10
      </Text>

      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.question}>
          {question.text}
        </Text>
      </View>

      {question.options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.optionCard,
            selected === option && styles.selectedCard,
          ]}
          onPress={() => setSelected(option)}
        >
          <Text
            style={[
              styles.optionText,
              selected === option &&
                styles.selectedText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextText}>
          Next Question
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },

  logo: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0F172A",
    marginTop: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 25,
  },

  progressText: {
    color: "#64748B",
    marginTop: 10,
  },

  progressBar: {
    height: 8,
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
    marginTop: 10,
  },

  progressFill: {
    width: "10%",
    height: "100%",
    backgroundColor: "#0F172A",
    borderRadius: 10,
  },

  questionCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginTop: 25,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  question: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
  },

  optionCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  selectedCard: {
    borderColor: "#0F172A",
    backgroundColor: "#F1F5F9",
  },

  optionText: {
    fontSize: 16,
    color: "#334155",
  },

  selectedText: {
    fontWeight: "700",
  },

  nextButton: {
    backgroundColor: "#0F172A",
    padding: 16,
    borderRadius: 14,
    marginTop: 25,
  },

  nextText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});