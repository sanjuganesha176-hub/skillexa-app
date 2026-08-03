import { router } from "expo-router";
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
// Import crisp, professional vector icons
import { Feather, MaterialIcons } from '@expo/vector-icons';

// Dynamic Subjects Array with mapped Vector Icon configurations
const SUBJECTS = [
  {
    id: "english",
    label: "English",
    iconFamily: "Feather",
    iconName: "book-open",
    route: "/english",
    topics: "Grammar • Vocabulary • Reading Comprehension • Verbal Ability",
    totalTopics: "7",
    questions: "350+",
    duration: "20-30 min",
    level: "Beginner → Advanced",
    isFeatured: true, // Marker for our custom badge
  },
  {
    id: "math",
    label: "Mathematics",
    iconFamily: "Feather",
    iconName: "percent",
    route: "/mathematics",
    topics: "Arithmetic • Algebra • Geometry • Trigonometry",
    totalTopics: "10",
    questions: "500+",
    duration: "25-35 min",
    level: "Intermediate",
    isFeatured: false,
  },
  {
    id: "reasoning",
    label: "Reasoning",
    iconFamily: "MaterialIcons",
    iconName: "psychology",
    route: "/reasoning",
    topics: "Coding • Decoding • Puzzles • Blood Relation",
    totalTopics: "09",
    questions: "300+",
    duration: "20 min",
    level: "All Levels",
    isFeatured: false,
  },
  {
    id: "awareness",
    label: "General Awareness",
    iconFamily: "Feather",
    iconName: "globe",
    route: "/awareness",
    topics: "History • Geography • Polity • Current Affairs",
    totalTopics: "09",
    questions: "450+",
    duration: "15-20 min",
    level: "Intermediate",
    isFeatured: false,
  },
  {
    id: "science",
    label: "Science",
    iconFamily: "Feather",
    iconName: "layers",
    route: "/science",
    topics: "Physics • Chemistry • Biology",
    totalTopics: "08",
    questions: "400+",
    duration: "25 min",
    level: "Intermediate",
    isFeatured: false,
  },
  {
    id: "fitness",
    label: "Fitness",
    iconFamily: "Feather",
    iconName: "activity",
    route: "/fitness",
    topics: "Running • Endurance • Strength • Standards",
    totalTopics: "8",
    questions: "100+",
    duration: "15 min",
    level: "Beginner",
    isFeatured: false,
  },
];

// Helper component to render clean vectors conditionally
const SubjectIcon = ({ family, name, size, color }: { family: string; name: any; size: number; color: string }) => {
  if (family === 'MaterialIcons') {
    return <MaterialIcons name={name} size={size} color={color} />;
  }
  return <Feather name={name} size={size} color={color} />;
};

export default function SkillExaDashboard() {
  const [selectedSubject, setSelectedSubject] = useState('english');

  // Completely dynamic subject calculation
  const currentSubject =
    SUBJECTS.find(subject => subject.id === selectedSubject) || SUBJECTS[0];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Premium Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>SkillExa</Text>
          <Text style={styles.subLogoText}>Competitive Exam Dashboard</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.taglineText}>Prepare smarter. Practice consistently. Achieve your goals.</Text>
        </View>

        {/* Premium Underlined Navigation Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {SUBJECTS.map(subject => (
              <TouchableOpacity
                key={subject.id}
                onPress={() => setSelectedSubject(subject.id)}
                style={styles.tabItem}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedSubject === subject.id && styles.tabTextActive,
                  ]}
                >
                  {subject.label}
                </Text>
                {selectedSubject === subject.id && (
                  <View style={styles.activeLine} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Fully Dynamic Subject Feature Card */}
        <View style={styles.card}>
          
          {/* Conditional Featured Subject Badge */}
          {currentSubject.isFeatured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>Featured Subject</Text>
            </View>
          )}

          <View style={styles.cardHeader}>
            <View style={styles.iconWrapper}>
              <SubjectIcon 
                family={currentSubject.iconFamily} 
                name={currentSubject.iconName} 
                size={24} 
                color="#2563EB" 
              />
            </View>
            <View>
              <Text style={styles.cardTitle}>
                {currentSubject.label}
              </Text>
              <Text style={styles.cardSubTitle}>
                Competitive Preparation Module
              </Text>
            </View>
          </View>

          <Text style={styles.cardSubtopics}>
            {currentSubject.topics}
          </Text>

          {/* Metadata Grid */}
          <View style={styles.metaGrid}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Topics</Text>
              <Text style={styles.metaValue}>
                {currentSubject.totalTopics}
              </Text>
            </View>

            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Questions</Text>
              <Text style={styles.metaValue}>
                {currentSubject.questions}
              </Text>
            </View>

            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Duration</Text>
              <Text style={styles.metaValue}>
                {currentSubject.duration}
              </Text>
            </View>

            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Difficulty</Text>
              <Text style={styles.metaValue}>
                {currentSubject.level}
              </Text>
            </View>
          </View>

          {/* Full-width action button with deep blue hue */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push(currentSubject.route as any)}
          >
            <Text style={styles.primaryButtonText}>
              Start Practice
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.sectionHeaderRow}>
          <Feather name="bar-chart-2" size={18} color="#1E293B" style={styles.sectionIcon} />
          <Text style={styles.sectionHeading}>Quick Stats</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>6</Text>
            <Text style={styles.statLabel}>Subjects</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>120+</Text>
            <Text style={styles.statLabel}>Practice Sets</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>5000+</Text>
            <Text style={styles.statLabel}>Total Questions</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>25</Text>
            <Text style={styles.statLabel}>Mock Tests</Text>
          </View>
        </View>

        {/* Professional Motivation Notice Card */}
        <View style={[styles.card, styles.motivationCard]}>
          <View style={styles.quizBadge}>
            <Text style={styles.quizBadgeText}>Daily Quiz Available</Text>
          </View>
          <View style={styles.motivationHeaderRow}>
            <Feather name="zap" size={14} color="#64748B" style={styles.inlineIcon} />
            <Text style={styles.motivationHeading}>Today&apos;s Motivation</Text>
          </View>
          <Text style={styles.motivationQuote}>
            &quot;The future depends on what you do today.&quot;
          </Text>
        </View>

        {/* Corporate Style Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© SkillExa 2026</Text>
          <Text style={styles.footerSubtext}>Learn • Practice • Achieve</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 24, // Expanded spacing layout
  },
  header: {
    marginBottom: 28,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2563EB', // Core unified blue accent
    letterSpacing: -0.5,
  },
  subLogoText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 3,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 28,
  },
  taglineText: {
    fontSize: 14,
    color: '#475569',
    marginTop: 6,
    lineHeight: 20,
  },
  // Underline Navigation Tabs System
  tabsContainer: {
    marginBottom: 32, // Controlled systemic gap
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tabItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginRight: 12,
    alignItems: 'center',
    position: 'relative',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#2563EB',
    fontWeight: '600',
  },
  activeLine: {
    height: 3,
    backgroundColor: "#2563EB",
    borderRadius: 10,
    width: '100%',
    position: 'absolute',
    bottom: -1,
  },
  // Elite Card Architecture
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18, // Upgraded card curvature
    padding: 22,
    marginBottom: 32, // Even content intervals
    borderWidth: 1,
    borderColor: '#F1F5F9',
    // Tight, localized premium shadow drops
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  featuredBadgeText: {
    color: '#2563EB',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconWrapper: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 12,
    marginRight: 14,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  cardSubTitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  cardSubtopics: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 20,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metaItem: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  metaLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  metaValue: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '700',
    marginTop: 3,
  },
  primaryButton: {
    backgroundColor: '#1D4ED8', // Deeper premium corporate blue
    borderRadius: 12,
    paddingVertical: 15,
    width: '100%', // Guaranteed full-width bounds
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  // Section layout structural elements
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2563EB',
  },
  statLabel: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
    marginTop: 4,
  },
  // Motivation Module styling
  motivationCard: {
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    borderWidth: 0,
    shadowOpacity: 0, // Keeps flat card look for secondary elements
    elevation: 0,
    marginTop: 8,
  },
  quizBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 99,
    marginBottom: 14,
  },
  quizBadgeText: {
    color: '#D97706',
    fontSize: 12,
    fontWeight: '700',
  },
  motivationHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  inlineIcon: {
    marginRight: 6,
  },
  motivationHeading: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  motivationQuote: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1E293B',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
    lineHeight: 22,
  },
  // Custom Footer text formatting
  footer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  footerText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#CBD5E1',
    marginTop: 3,
  },
});