import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
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

// --- Type Definitions ---
interface SubjectItem {
  id: string;
  label: string;
  iconFamily: 'Feather' | 'MaterialIcons' | 'MaterialCommunityIcons';
  iconName: string;
  route: string;
  subLabel: string;
  topics: string;
  modules: string;
  problems: string;
  labFiles: string;
  level: string;
  progress: number;
}

interface ResourceItem {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  target: string;
}

interface StatItem {
  value: string;
  label: string;
}

// --- Dynamic Dataset Ecosystem ---
const SUBJECTS: SubjectItem[] = [
  {
    id: "coding-problems",
    label: "Coding Problems",
    iconFamily: "Feather",
    iconName: "terminal",
    route: "/coding-problems",
    subLabel: "Algorithmic Logic Module",
    topics: "Daily Challenges • String Manipulation • Bitwise Operators • Backtracking",
    modules: "8 Modules",
    problems: "250+ Problems",
    labFiles: "15 Lab Files",
    level: "All Levels",
    progress: 0.35,
  },
  {
    id: "dsa-practice",
    label: "DSA Practice",
    iconFamily: "Feather",
    iconName: "code",
    route: "/dsa-practice",
    subLabel: "Core Engineering Module",
    topics: "Arrays • Linked Lists • Stacks • Queues • Trees • Graphs • Hashing",
    modules: "18 Modules",
    problems: "450 Problems",
    labFiles: "35 Lab Files",
    level: "Intermediate",
    progress: 0.55,
  },
  {
    id: "mock-interviews",
    label: "Mock Interviews",
    iconFamily: "Feather",
    iconName: "users",
    route: "/mock-interviews",
    subLabel: "Evaluation & Assessment",
    topics: "Technical Panels • HR Paradigms • Behavioral Analytics • Peer Drills",
    modules: "6 Modules",
    problems: "40 Scenarios",
    labFiles: "12 Checklists",
    level: "Advanced",
    progress: 0.20,
  },
  {
    id: "resume-builder",
    label: "Resume Builder",
    iconFamily: "Feather",
    iconName: "file-text",
    route: "/resume-builder",
    subLabel: "Profile Compiling Module",
    topics: "ATS Standard Templates • Formatting Builders • Technical Matrix Systems",
    modules: "4 Workshops",
    problems: "25 Examples",
    labFiles: "10 Templates",
    level: "Beginner",
    progress: 0.75,
  },
  {
    id: "project-generator",
    label: "Project Generator",
    iconFamily: "Feather",
    iconName: "folder-plus",
    route: "/project-generator",
    subLabel: "Capstone Engineering Spec",
    topics: "Architecture Design • Schema Compilation • Full Stack Infrastructure",
    modules: "12 Blueprints",
    problems: "30 Specs",
    labFiles: "15 Boilerplates",
    level: "Intermediate",
    progress: 0.40,
  },
  {
    id: "placement-preparation",
    label: "Placement Preparation",
    iconFamily: "Feather",
    iconName: "briefcase",
    route: "/placement-preparation",
    subLabel: "Career Acceleration Prep",
    topics: "Quantitative Aptitude • Logical Reasoning • CS Fundamentals",
    modules: "16 Modules",
    problems: "600 Problems",
    labFiles: "40 Checklists",
    level: "Advanced Prep",
    progress: 0.15,
  },
  {
    id: "company-preparation",
    label: "Company Preparation",
    iconFamily: "Feather",
    iconName: "activity",
    route: "/company-preparation",
    subLabel: "Enterprise Evaluation Kits",
    topics: "Google Frameworks • Microsoft Patterns • Amazon Systems • FAANG Workflows",
    modules: "24 Profiles",
    problems: "180 Questions",
    labFiles: "30 Guides",
    level: "Advanced",
    progress: 0.10,
  },
  {
    id: "learning-resources",
    label: "Learning Resources",
    iconFamily: "Feather",
    iconName: "book-open",
    route: "/learning-resources",
    subLabel: "Static Resource Matrix",
    topics: "Video Whiteboards • Detailed Markdown Notes • Protocol Cheat Sheets",
    modules: "50 Compilations",
    problems: "100+ Documents",
    labFiles: "45 PDFs",
    level: "All Levels",
    progress: 0.90,
  },
];

const RESOURCES: ResourceItem[] = [
  { label: 'Video Lectures', icon: 'video', target: '/videos' },
  { label: 'Practice Problems', icon: 'edit-3', target: '/problems' },
  { label: 'Lab Experiments', icon: 'cpu', target: '/labs' },
  { label: 'Notes', icon: 'file-text', target: '/notes' },
  { label: 'Previous Papers', icon: 'copy', target: '/papers' },
  { label: 'Mock Tests', icon: 'award', target: '/mocks' },
];

const STATS: StatItem[] = [
  { value: '8 Subjects', label: 'Subjects Built' },
  { value: '120+', label: 'Video Lessons' },
  { value: '350+', label: 'Coding Problems' },
  { value: '80+', label: 'Lab Programs' },
  { value: '45 Complete', label: 'Previous Papers' },
  { value: '25 Active', label: 'Mock Tests' },
];

// --- Vector Icon Switch Module ---
const HubIcon = ({ family, name, size, color }: { family: string; name: string; size: number; color: string }) => {
  if (family === 'MaterialIcons') return <MaterialIcons name={name as any} size={size} color={color} />;
  if (family === 'MaterialCommunityIcons') return <MaterialCommunityIcons name={name as any} size={size} color={color} />;
  return <Feather name={name as any} size={size} color={color} />;
};

export default function SkillExaEngineeringDashboard() {
  const [activeTabId, setActiveTabId] = useState<string>('coding-problems');

  // Dynamic context generation
  const currentSubject = SUBJECTS.find(subj => subj.id === activeTabId) || SUBJECTS[0];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Core Institutional Branding Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>SkillExa</Text>
          <Text style={styles.subLogoText}>Engineering Learning Hub</Text>
          <Text style={styles.taglineText}>
            Master programming, core subjects, projects and placement preparation in one place.
          </Text>
        </View>

        {/* Continue Learning Sticky Course Card Banner */}
        <View style={styles.resumeBanner}>
          <View style={styles.resumeHeaderRow}>
            <View>
              <Text style={styles.resumeGreeting}>👋 Welcome Back</Text>
              <Text style={styles.resumeSubjectTitle}>Continue learning: Data Structures</Text>
            </View>
            <Feather name="play-circle" size={26} color="#2563EB" />
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '55%' }]} />
            </View>
            <Text style={styles.progressPercentageText}>55% Completed</Text>
          </View>

          <TouchableOpacity 
            style={styles.resumeActionButton}
            onPress={() => router.push('/dsa-practice' as any)}
          >
            <Text style={styles.resumeActionButtonText}>Continue Learning</Text>
          </TouchableOpacity>
        </View>

        {/* Horizontal Navigation Tab Bar Menu */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {SUBJECTS.map(subj => (
              <TouchableOpacity 
                key={subj.id} 
                onPress={() => setActiveTabId(subj.id)} 
                style={styles.tabItem}
              >
                <Text style={[styles.tabText, activeTabId === subj.id && styles.tabTextActive]}>
                  {subj.label}
                </Text>
                {activeTabId === subj.id && <View style={styles.activeLine} />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Dynamic Featured Section Learning Card */}
        <View style={styles.card}>
          <View style={styles.featuredBadge}>
            <Feather name="star" size={12} color="#2563EB" style={styles.inlineIcon} />
            <Text style={styles.featuredBadgeText}>Featured Module</Text>
          </View>

          <View style={styles.cardHeader}>
            <View style={styles.iconWrapper}>
              <HubIcon family={currentSubject.iconFamily} name={currentSubject.iconName} size={24} color="#2563EB" />
            </View>
            <View style={styles.titleWrapper}>
              <Text style={styles.cardTitle}>{currentSubject.label}</Text>
              <Text style={styles.cardSubTitle}>{currentSubject.subLabel}</Text>
            </View>
          </View>

          <Text style={styles.cardSubtopics}>{currentSubject.topics}</Text>

          {/* Descriptive Metagrid Core Block */}
          <View style={styles.metaGrid}>
            <View style={styles.metaItem}>
              <Feather name="book-open" size={14} color="#64748B" style={styles.metaItemIcon} />
              <Text style={styles.metaValue}>{currentSubject.modules}</Text>
            </View>
            <View style={styles.metaItem}>
              <Feather name="terminal" size={14} color="#64748B" style={styles.metaItemIcon} />
              <Text style={styles.metaValue}>{currentSubject.problems}</Text>
            </View>
            <View style={styles.metaItem}>
              <Feather name="file-text" size={14} color="#64748B" style={styles.metaItemIcon} />
              <Text style={styles.metaValue}>{currentSubject.labFiles}</Text>
            </View>
            <View style={styles.metaItem}>
              <Feather name="trending-up" size={14} color="#64748B" style={styles.metaItemIcon} />
              <Text style={styles.metaValue}>{currentSubject.level}</Text>
            </View>
          </View>

          {/* Core Embedded Progress Bar System Layout */}
          <View style={styles.cardProgressWrapper}>
            <View style={styles.cardProgressHeader}>
              <Text style={styles.cardProgressLabel}>Learning Progress</Text>
              <Text style={styles.cardProgressText}>{Math.round(currentSubject.progress * 100)}%</Text>
            </View>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${currentSubject.progress * 100}%` }]} />
            </View>
          </View>

          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => router.push(currentSubject.route as any)}
          >
            <Text style={styles.primaryButtonText}>Start Learning</Text>
          </TouchableOpacity>
        </View>

        {/* Learning Resources Layout Grid */}
        <Text style={styles.sectionHeading}>Learning Resources</Text>
        <View style={styles.resourceGrid}>
          {RESOURCES.map((res, i) => (
            <TouchableOpacity 
              key={i} 
              style={styles.resourceCard} 
              onPress={() => router.push(res.target as any)}
            >
              <Feather name={res.icon} size={20} color="#2563EB" style={styles.resourceIcon} />
              <Text style={styles.resourceLabel}>{res.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Personalized Statistical Analytics Grid Matrix */}
        <Text style={styles.sectionHeading}>Quick Stats</Text>
        <View style={styles.statsGrid}>
          {STATS.map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Action-Linked Placement Readiness preparation Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderInline}>
            <Feather name="briefcase" size={20} color="#2563EB" style={styles.inlineHeaderIcon} />
            <Text style={styles.blockTitle}>Placement Readiness</Text>
          </View>
          <View style={styles.checklistContainer}>
            <View style={styles.checkItemRow}>
              <Feather name="check-circle" size={15} color="#2563EB" style={styles.checkIcon} />
              <Text style={styles.checkItemText}>Aptitude Practice</Text>
            </View>
            <View style={styles.checkItemRow}>
              <Feather name="check-circle" size={15} color="#2563EB" style={styles.checkIcon} />
              <Text style={styles.checkItemText}>Coding Interview Prep</Text>
            </View>
            <View style={styles.checkItemRow}>
              <Feather name="check-circle" size={15} color="#2563EB" style={styles.checkIcon} />
              <Text style={styles.checkItemText}>HR Interview Guidance</Text>
            </View>
            <View style={styles.checkItemRow}>
              <Feather name="check-circle" size={15} color="#2563EB" style={styles.checkIcon} />
              <Text style={styles.checkItemText}>ATS Resume Builder</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => router.push('/placement-preparation' as any)}
          >
            <Text style={styles.primaryButtonText}>Start Placement Prep</Text>
          </TouchableOpacity>
        </View>

        {/* Functional Daily Coding Challenge Component Block */}
        <View style={styles.card}>
          <View style={styles.cardHeaderInline}>
            <Feather name="zap" size={20} color="#2563EB" style={styles.inlineHeaderIcon} />
            <Text style={styles.blockTitle}>Today&apos;s Coding Challenge</Text>
          </View>
          <Text style={styles.challengeMainTitle}>Reverse a Linked List</Text>
          <View style={styles.challengeMetaRow}>
            <View style={[styles.challengeBadge, { backgroundColor: '#FEF3C7' }]}>
              <Text style={[styles.challengeBadgeText, { color: '#92400E' }]}>
                Difficulty: Medium
              </Text>
            </View>
            <View style={styles.challengeBadge}>
              <Text style={styles.challengeBadgeText}>Time: 20 Minutes</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => router.push('/coding-problems' as any)}
          >
            <Text style={styles.primaryButtonText}>Solve Challenge</Text>
          </TouchableOpacity>
        </View>

        {/* Linked Functional Featured Projects Pipeline Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderInline}>
            <Feather name="folder" size={20} color="#2563EB" style={styles.inlineHeaderIcon} />
            <Text style={styles.blockTitle}>Featured Project</Text>
          </View>
          <Text style={styles.projectTypeLabel}>Mini Project Blueprint</Text>
          <Text style={styles.projectMainTitle}>Student Attendance System</Text>
          <View style={styles.techStackRow}>
            <View style={styles.techBadge}>
              <Text style={styles.techBadgeText}>Java</Text>
            </View>
            <View style={styles.techBadge}>
              <Text style={styles.techBadgeText}>MySQL</Text>
            </View>
            <View style={styles.techBadge}>
              <Text style={styles.techBadgeText}>Spring Boot</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => router.push('/project-generator' as any)}
          >
            <Text style={styles.primaryButtonText}>View Project</Text>
          </TouchableOpacity>
        </View>

        {/* Professional Engineering Tip Guidance Advice Card */}
        <View style={[styles.card, styles.tipCardBackground]}>
          <View style={styles.cardHeaderInline}>
            <Feather name="info" size={16} color="#64748B" style={styles.tipIcon} />
            <Text style={styles.tipHeading}>Engineering Tip</Text>
          </View>
          <Text style={styles.tipTextContent}>
            &quot;Write code every day. Small, consistent practice builds stronger problem-solving skills than occasional long sessions.&quot;
          </Text>
        </View>

        {/* Platform Complete System Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerBrandText}>SkillExa</Text>
          <Text style={styles.footerSubBrandText}>Engineering Learning Hub</Text>
          <Text style={styles.footerSubtext}>Learn • Practice • Build • Get Placed</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- Standardized Architecture Layout Dimensions Stylesheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: -0.5,
  },
  subLogoText: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '700',
    marginTop: 2,
  },
  taglineText: {
    fontSize: 14,
    color: '#475569',
    marginTop: 8,
    lineHeight: 20,
  },
  resumeBanner: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 18,
    borderColor: '#E2E8F0',
    borderWidth: 1,
    marginBottom: 24,
  },
  resumeHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resumeGreeting: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  resumeSubjectTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 2,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 16,
  },
  progressPercentageText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'right',
  },
  resumeActionButton: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  resumeActionButtonText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '700',
  },
  tabsContainer: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#2563EB',
    fontWeight: '700',
  },
  activeLine: {
    height: 3,
    backgroundColor: '#2563EB',
    borderRadius: 16,
    width: '100%',
    position: 'absolute',
    bottom: -1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 14,
  },
  inlineIcon: {
    marginRight: 4,
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
    padding: 12,
    borderRadius: 16,
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  titleWrapper: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E293B',
  },
  cardSubTitle: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 1,
  },
  cardSubtopics: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 16,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  metaItem: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  metaItemIcon: {
    marginRight: 8,
  },
  metaValue: {
    fontSize: 13,
    color: '#1E293B',
    fontWeight: '600',
    flex: 1,
  },
  cardProgressWrapper: {
    marginTop: 4,
    marginBottom: 20,
  },
  cardProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardProgressLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  cardProgressText: {
    fontSize: 12,
    color: '#1E293B',
    fontWeight: '700',
  },
  primaryButton: {
    backgroundColor: '#1D4ED8',
    borderRadius: 16,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 8,
    marginBottom: 16,
  },
  resourceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  resourceCard: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  resourceIcon: {
    marginBottom: 8,
  },
  resourceLabel: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#F8FAFC',
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2563EB',
  },
  statLabel: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
    marginTop: 4,
  },
  cardHeaderInline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inlineHeaderIcon: {
    marginRight: 8,
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  checklistContainer: {
    marginBottom: 18,
  },
  checkItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkIcon: {
    marginRight: 10,
  },
  checkItemText: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
  },
  challengeMainTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  challengeMetaRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  challengeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: '#F1F5F9',
  },
  challengeBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  projectTypeLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  projectMainTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 14,
  },
  techStackRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  techBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 6,
  },
  techBadgeText: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '600',
  },
  tipCardBackground: {
    backgroundColor: '#F8FAFC',
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
    marginTop: 4,
    padding: 18,
  },
  tipIcon: {
    marginRight: 6,
  },
  tipHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tipTextContent: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  footerBrandText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
  },
  footerSubBrandText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563EB',
    marginTop: 2,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 6,
  },
});