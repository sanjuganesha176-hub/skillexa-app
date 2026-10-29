import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../components/auth-context';
import { AppHeader } from '../components/common/AppHeader';
import { Palette, Radii, Shadows, Gradients } from '../constants/theme';
import { TopicProgressStore } from '../data/skillexaCurriculum';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CourseCardData {
  id: string;
  name: string;
  category: string;
  tagline: string;
  topicsCount: number;
  completedCount: number;
  route: string;
  icon: keyof typeof Feather.glyphMap;
  accentColor: string;
}

interface EngineeringModuleData {
  id: string;
  name: string;
  category: string;
  tagline: string;
  meta: string;
  route: string;
  icon: keyof typeof Feather.glyphMap;
  accentColor: string;
  badge?: string;
}

const COURSES: CourseCardData[] = [
  {
    id: 'english',
    name: 'English Language',
    category: 'Grammar & Vocabulary',
    tagline: 'Master grammar, vocabulary, comprehension, and error spotting.',
    topicsCount: 22,
    completedCount: 1,
    route: '/english',
    icon: 'book-open',
    accentColor: '#38BDF8',
  },
  {
    id: 'mathematics',
    name: 'Quantitative Aptitude',
    category: 'Arithmetic & Problem Solving',
    tagline: 'Arithmetic, algebra, geometry, mensuration and numerical aptitude.',
    topicsCount: 15,
    completedCount: 2,
    route: '/mathematics',
    icon: 'percent',
    accentColor: '#A855F7',
  },
  {
    id: 'reasoning',
    name: 'Logical Reasoning',
    category: 'Logical & Analytical',
    tagline: 'Syllogism, seating arrangement, coding-decoding and deduction.',
    topicsCount: 14,
    completedCount: 3,
    route: '/reasoning',
    icon: 'cpu',
    accentColor: '#10B981',
  },
  {
    id: 'general-awareness',
    name: 'General Awareness',
    category: 'GK & Current Affairs',
    tagline: 'Indian history, polity, geography, economics and daily news.',
    topicsCount: 11,
    completedCount: 2,
    route: '/awareness',
    icon: 'globe',
    accentColor: '#F59E0B',
  },
  {
    id: 'general-science',
    name: 'General Science',
    category: 'Physics, Chem & Bio',
    tagline: 'Everyday physics, chemical principles, human physiology and tech.',
    topicsCount: 6,
    completedCount: 2,
    route: '/science',
    icon: 'activity',
    accentColor: '#EC4899',
  },
  {
    id: 'physical-fitness',
    name: 'Physical Fitness',
    category: 'Physical Standards Tests',
    tagline: 'Endurance, running milestones, push-ups and fitness routines.',
    topicsCount: 9,
    completedCount: 4,
    route: '/fitness',
    icon: 'zap',
    accentColor: '#3B82F6',
  },
];

const ENGINEERING_MODULES: EngineeringModuleData[] = [
  {
    id: 'coding-problems',
    name: 'Coding Problems',
    category: 'Programming & Logic',
    tagline: 'Solve real-world programming problems in Python, C++, Java & JS with in-app compiler.',
    meta: '120+ Problems',
    route: '/coding-problems',
    icon: 'terminal',
    accentColor: '#38BDF8',
  },
  {
    id: 'dsa-practice',
    name: 'DSA Roadmap & Practice',
    category: 'Data Structures & Algorithms',
    tagline: 'Master 17 structured topics from arrays and linked lists to trees, graphs and DP.',
    meta: '17 Topics',
    route: '/dsa-practice',
    icon: 'code',
    accentColor: '#10B981',
  },
  {
    id: 'mock-interviews',
    name: 'AI Mock Interview',
    category: 'Career & Technical Prep',
    tagline: 'Practice technical & HR interview questions with instant voice/text AI evaluation.',
    meta: 'AI Evaluated',
    route: '/mock-interviews',
    icon: 'message-square',
    accentColor: '#A855F7',
    badge: 'AI POWERED',
  },
  {
    id: 'resume-builder',
    name: 'ATS Resume Builder',
    category: 'Professional Portfolio',
    tagline: 'Build ATS-optimized, high-scoring resumes for software & core engineering roles.',
    meta: '3 Formats',
    route: '/resume-builder',
    icon: 'file-text',
    accentColor: '#F59E0B',
  },
  {
    id: 'placement-preparation',
    name: 'Placement Preparation',
    category: 'Campus Placements',
    tagline: 'Company profiles, previous aptitude rounds, technical MCQs & campus guides.',
    meta: '12 Top Companies',
    route: '/placement-preparation',
    icon: 'briefcase',
    accentColor: '#EC4899',
  },
];

export default function HomeScreen() {
  const { profile } = useAuth();
  const userName = profile?.name || 'Scholar';

  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'progress' | 'papers'>('home');
  const [selectedTrack, setSelectedTrack] = useState<'all' | 'engineering' | 'competitive'>('all');
  const [completedTopics, setCompletedTopics] = useState<number>(1);

  useEffect(() => {
    const updateStats = () => {
      const allProg = TopicProgressStore.getAllProgress();
      const done = Object.values(allProg).filter(p => p.status === 'COMPLETED').length;
      setCompletedTopics(done);
    };

    updateStats();
    const unsub = TopicProgressStore.subscribe(updateStats);
    return unsub;
  }, []);

  const totalTopics = COURSES.reduce((acc, c) => acc + c.topicsCount, 0) + (ENGINEERING_MODULES.length * 5);
  const totalCompleted = completedTopics + 13 + 3;
  const overallPercentage = Math.round((totalCompleted / totalTopics) * 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#070B14" />
      <AppHeader />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Navigation Bar */}
        <View style={styles.subHeaderNav}>
          <View style={styles.logoRow}>
            <View style={styles.logoIcon}>
              <Feather name="layers" size={18} color="#38BDF8" />
            </View>
            <View>
              <Text style={styles.brandTitle}>Skillexa</Text>
              <Text style={styles.brandTagline}>Learn • Practice • Grow</Text>
            </View>
          </View>

          <View style={styles.navLinks}>
            <TouchableOpacity
              style={[styles.navLinkItem, activeTab === 'home' && styles.navLinkItemActive]}
              onPress={() => setActiveTab('home')}
            >
              <Text style={[styles.navLinkText, activeTab === 'home' && styles.navLinkTextActive]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navLinkItem, activeTab === 'courses' && styles.navLinkItemActive]}
              onPress={() => router.push('/courses' as any)}
            >
              <Text style={styles.navLinkText}>Courses</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navLinkItem, activeTab === 'progress' && styles.navLinkItemActive]}
              onPress={() => router.push('/progress')}
            >
              <Text style={styles.navLinkText}>Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navLinkItem, activeTab === 'papers' && styles.navLinkItemActive]}
              onPress={() => router.push('/previous-papers' as any)}
            >
              <Text style={styles.navLinkText}>Question Papers</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroBadge}>
            <View style={styles.heroBadgeDot} />
            <Text style={styles.heroBadgeText}>
              {selectedTrack === 'all'
                ? 'DUAL-TRACK PLATFORM • ENGINEERING & COMPETITIVE EXAMS'
                : selectedTrack === 'engineering'
                ? 'ENGINEERING & TECHNICAL CAREER TRACK'
                : 'COMPETITIVE EXAM PREPARATION PLATFORM'}
            </Text>
          </View>

          <Text style={styles.heroTitle}>
            {selectedTrack === 'all'
              ? 'Build Skills. Crack Exams. Master Engineering.'
              : selectedTrack === 'engineering'
              ? 'Code, Solve DSA & Ace Engineering Placements'
              : 'Build Your Skills. Prepare With Confidence.'}
          </Text>
          <Text style={styles.heroSubtitle}>
            {selectedTrack === 'all'
              ? 'Learn technical engineering modules alongside competitive examination curriculum in one unified workspace.'
              : selectedTrack === 'engineering'
              ? 'Practice real coding problems, master DSA roadmap, build ATS resumes and mock interview with AI.'
              : 'Learn concepts, practice real previous year questions, and unlock your next level.'}
          </Text>

          {/* Track Switcher Segmented Control */}
          <View style={styles.trackSwitcherWrapper}>
            <TouchableOpacity
              style={[styles.trackTab, selectedTrack === 'all' && styles.trackTabActiveAll]}
              onPress={() => setSelectedTrack('all')}
              activeOpacity={0.8}
            >
              <Feather
                name="layers"
                size={14}
                color={selectedTrack === 'all' ? '#070B14' : '#94A3B8'}
              />
              <Text
                style={[
                  styles.trackTabText,
                  selectedTrack === 'all' && styles.trackTabTextActiveDark,
                ]}
              >
                Both Tracks
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.trackTab,
                selectedTrack === 'engineering' && styles.trackTabActiveEngineering,
              ]}
              onPress={() => setSelectedTrack('engineering')}
              activeOpacity={0.8}
            >
              <Feather
                name="cpu"
                size={14}
                color={selectedTrack === 'engineering' ? '#FFFFFF' : '#94A3B8'}
              />
              <Text
                style={[
                  styles.trackTabText,
                  selectedTrack === 'engineering' && styles.trackTabTextActiveWhite,
                ]}
              >
                Engineering (5)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.trackTab,
                selectedTrack === 'competitive' && styles.trackTabActiveCompetitive,
              ]}
              onPress={() => setSelectedTrack('competitive')}
              activeOpacity={0.8}
            >
              <Feather
                name="award"
                size={14}
                color={selectedTrack === 'competitive' ? '#FFFFFF' : '#94A3B8'}
              />
              <Text
                style={[
                  styles.trackTabText,
                  selectedTrack === 'competitive' && styles.trackTabTextActiveWhite,
                ]}
              >
                Competitive (6)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Quick Path Selection Banner */}
          <View style={styles.pathSwitchBanner}>
            <View style={styles.pathSwitchLeft}>
              <Feather name="compass" size={16} color="#38BDF8" />
              <Text style={styles.pathSwitchText}>
                Want full track customization? Choose in Path Selector:
              </Text>
            </View>
            <TouchableOpacity
              style={styles.pathSwitchBtn}
              onPress={() => router.push('/pathselection' as any)}
              activeOpacity={0.8}
            >
              <Text style={styles.pathSwitchBtnText}>Path Selector →</Text>
            </TouchableOpacity>
          </View>

          {/* User Overall Progress Grid */}
          <View style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <View>
                <Text style={styles.statsHeaderTitle}>Your Overall Progress</Text>
                <Text style={styles.statsHeaderSub}>
                  {selectedTrack === 'all'
                    ? 'Readiness across Engineering modules & Competitive exam tracks'
                    : selectedTrack === 'engineering'
                    ? 'Track your engineering learning & coding milestone completions'
                    : 'Track your exam readiness across all syllabus tracks'}
                </Text>
              </View>
              <View style={styles.percentageBadge}>
                <Text style={styles.percentageBadgeText}>{overallPercentage}%</Text>
              </View>
            </View>

            {/* Overall Progress Bar */}
            <View style={styles.overallProgressTrack}>
              <View style={[styles.overallProgressFill, { width: `${overallPercentage}%` }]} />
            </View>

            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <View style={[styles.statIconWrap, { backgroundColor: 'rgba(56, 189, 248, 0.12)' }]}>
                  <Feather name="check-circle" size={16} color="#38BDF8" />
                </View>
                <Text style={styles.statValue}>{totalCompleted} / {totalTopics}</Text>
                <Text style={styles.statLabel}>Topics & Units</Text>
              </View>

              <View style={styles.statBox}>
                <View style={[styles.statIconWrap, { backgroundColor: 'rgba(168, 85, 247, 0.12)' }]}>
                  <Feather name="award" size={16} color="#A855F7" />
                </View>
                <Text style={styles.statValue}>18 Quizzes</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>

              <View style={styles.statBox}>
                <View style={[styles.statIconWrap, { backgroundColor: 'rgba(16, 185, 129, 0.12)' }]}>
                  <Feather name="trending-up" size={16} color="#10B981" />
                </View>
                <Text style={styles.statValue}>84%</Text>
                <Text style={styles.statLabel}>Avg Mastery</Text>
              </View>

              <View style={styles.statBox}>
                <View style={[styles.statIconWrap, { backgroundColor: 'rgba(245, 158, 11, 0.12)' }]}>
                  <Feather name="zap" size={16} color="#F59E0B" />
                </View>
                <Text style={styles.statValue}>7 Days 🔥</Text>
                <Text style={styles.statLabel}>Learning Streak</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 1. ENGINEERING LEARNING SECTION */}
        {(selectedTrack === 'all' || selectedTrack === 'engineering') && (
          <View style={styles.coursesSection}>
            <View style={styles.sectionHeader}>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <View style={[styles.sectionIconBadge, { backgroundColor: 'rgba(0, 102, 255, 0.15)' }]}>
                    <Feather name="cpu" size={16} color="#38BDF8" />
                  </View>
                  <Text style={styles.sectionTitle}>Engineering Learning Modules</Text>
                </View>
                <Text style={styles.sectionSubtitle}>
                  Coding, DSA roadmap, AI mock interview, ATS resume & placement readiness
                </Text>
              </View>
              <TouchableOpacity onPress={() => router.push('/engineering' as any)}>
                <Text style={styles.viewAllText}>Full Dashboard (5) →</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.coursesGrid}>
              {ENGINEERING_MODULES.map((mod) => (
                <View key={mod.id} style={styles.courseCard}>
                  <View style={styles.courseCardTop}>
                    <View style={[styles.courseIconWrap, { backgroundColor: `${mod.accentColor}18` }]}>
                      <Feather name={mod.icon} size={22} color={mod.accentColor} />
                    </View>
                    <View style={[styles.courseBadge, mod.badge ? { borderColor: mod.accentColor } : {}]}>
                      <Text
                        style={[
                          styles.courseBadgeText,
                          mod.badge ? { color: mod.accentColor, fontWeight: '800' } : {},
                        ]}
                      >
                        {mod.badge || mod.meta}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.courseName}>{mod.name}</Text>
                  <Text style={styles.courseCategory}>{mod.category}</Text>
                  <Text style={styles.courseTagline}>{mod.tagline}</Text>

                  <TouchableOpacity
                    style={[styles.continueButton, { borderColor: `${mod.accentColor}40` }]}
                    onPress={() => router.push(mod.route as any)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.continueButtonText, { color: mod.accentColor }]}>
                      Explore Module
                    </Text>
                    <Feather name="arrow-right" size={16} color={mod.accentColor} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* 2. COMPETITIVE EXAMS SECTION */}
        {(selectedTrack === 'all' || selectedTrack === 'competitive') && (
          <View style={styles.coursesSection}>
            <View style={styles.sectionHeader}>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <View style={[styles.sectionIconBadge, { backgroundColor: 'rgba(217, 119, 6, 0.15)' }]}>
                    <Feather name="award" size={16} color="#F59E0B" />
                  </View>
                  <Text style={styles.sectionTitle}>Competitive Exam Subjects</Text>
                </View>
                <Text style={styles.sectionSubtitle}>
                  Aptitude, reasoning, English, science, GK & physical standards suite
                </Text>
              </View>
              <TouchableOpacity onPress={() => router.push('/competitive' as any)}>
                <Text style={styles.viewAllText}>Full Dashboard (6) →</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.coursesGrid}>
              {COURSES.map((course) => {
                const completed = course.id === 'english' ? completedTopics : course.completedCount;
                const percent = Math.round((completed / course.topicsCount) * 100);

                return (
                  <View key={course.id} style={styles.courseCard}>
                    <View style={styles.courseCardTop}>
                      <View style={[styles.courseIconWrap, { backgroundColor: `${course.accentColor}18` }]}>
                        <Feather name={course.icon} size={22} color={course.accentColor} />
                      </View>
                      <View style={styles.courseBadge}>
                        <Text style={styles.courseBadgeText}>{course.topicsCount} Topics</Text>
                      </View>
                    </View>

                    <Text style={styles.courseName}>{course.name}</Text>
                    <Text style={styles.courseCategory}>{course.category}</Text>
                    <Text style={styles.courseTagline}>{course.tagline}</Text>

                    {/* Progress bar */}
                    <View style={styles.courseProgressSection}>
                      <View style={styles.courseProgressHeader}>
                        <Text style={styles.courseProgressLabel}>
                          {completed} of {course.topicsCount} Completed
                        </Text>
                        <Text style={[styles.courseProgressPercent, { color: course.accentColor }]}>
                          {percent}%
                        </Text>
                      </View>
                      <View style={styles.courseProgressTrack}>
                        <View
                          style={[
                            styles.courseProgressFill,
                            { width: `${Math.max(percent, 5)}%`, backgroundColor: course.accentColor },
                          ]}
                        />
                      </View>
                    </View>

                    {/* Continue Button */}
                    <TouchableOpacity
                      style={styles.continueButton}
                      onPress={() => router.push(course.route as any)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.continueButtonText}>Start Practice</Text>
                      <Feather name="arrow-right" size={16} color="#38BDF8" />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#070B14',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  subHeaderNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 12,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: 0.3,
  },
  brandTagline: {
    fontSize: 11,
    fontWeight: '600',
    color: '#38BDF8',
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  navLinkItem: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  navLinkItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#38BDF8',
  },
  navLinkText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
  },
  navLinkTextActive: {
    color: '#38BDF8',
  },
  heroSection: {
    marginBottom: 28,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  heroBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#38BDF8',
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#38BDF8',
    letterSpacing: 0.6,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#F8FAFC',
    lineHeight: 34,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 21,
    marginBottom: 18,
  },
  trackSwitcherWrapper: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 4,
    gap: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  trackTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  trackTabActiveAll: {
    backgroundColor: '#38BDF8',
  },
  trackTabActiveEngineering: {
    backgroundColor: '#0066FF',
  },
  trackTabActiveCompetitive: {
    backgroundColor: '#D97706',
  },
  trackTabText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#94A3B8',
  },
  trackTabTextActiveDark: {
    color: '#070B14',
  },
  trackTabTextActiveWhite: {
    color: '#FFFFFF',
  },
  pathSwitchBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.2)',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 10,
  },
  pathSwitchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    minWidth: 220,
  },
  pathSwitchText: {
    fontSize: 12.5,
    color: '#CBD5E1',
    fontWeight: '500',
  },
  pathSwitchBtn: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  pathSwitchBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#38BDF8',
  },
  statsCard: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    ...Shadows.card,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  statsHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  statsHeaderSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    maxWidth: 240,
  },
  percentageBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  percentageBadgeText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#38BDF8',
  },
  overallProgressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 16,
    overflow: 'hidden',
  },
  overallProgressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#38BDF8',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  statBox: {
    flex: 1,
    minWidth: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  statIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  coursesSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  sectionIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  sectionSubtitle: {
    fontSize: 12.5,
    color: '#64748B',
    marginTop: 2,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#38BDF8',
  },
  coursesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  courseCard: {
    width: SCREEN_WIDTH > 768 ? '31.5%' : '100%',
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    ...Shadows.card,
  },
  courseCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  courseIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  courseBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
  },
  courseName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 2,
  },
  courseCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
  },
  courseTagline: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 18,
    marginBottom: 16,
    minHeight: 36,
  },
  courseProgressSection: {
    marginBottom: 16,
  },
  courseProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  courseProgressLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  courseProgressPercent: {
    fontSize: 12,
    fontWeight: '800',
  },
  courseProgressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    overflow: 'hidden',
  },
  courseProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  continueButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#38BDF8',
  },
});
