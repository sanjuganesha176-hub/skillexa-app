import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppHeader } from '../components/common/AppHeader';
import { Palette, Radii, Shadows } from '../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CourseItem {
  id: string;
  track: 'engineering' | 'competitive';
  title: string;
  category: string;
  desc: string;
  meta: string;
  route: string;
  icon: keyof typeof Feather.glyphMap;
  accent: string;
}

const ALL_COURSES: CourseItem[] = [
  // Engineering Modules
  {
    id: 'eng-coding',
    track: 'engineering',
    title: 'Coding Problems',
    category: 'Programming & Logic',
    desc: 'Practice 120+ coding problems in Python, C++, Java & JS with integrated compiler.',
    meta: '120+ Problems • Real Tests',
    route: '/coding-problems',
    icon: 'terminal',
    accent: '#0066FF',
  },
  {
    id: 'eng-dsa',
    track: 'engineering',
    title: 'DSA Roadmap & Practice',
    category: 'Algorithms & Data Structures',
    desc: 'Master 17 core topics from Arrays and Linked Lists to Graphs, Trees & Dynamic Programming.',
    meta: '17 Topics • Interview Ready',
    route: '/dsa-practice',
    icon: 'code',
    accent: '#10B981',
  },
  {
    id: 'eng-interview',
    track: 'engineering',
    title: 'AI Mock Interview',
    category: 'Technical & HR Assessment',
    desc: 'Practice technical, system design and behavioral rounds with instant AI feedback and score.',
    meta: 'AI Scoring • Speech/Text',
    route: '/mock-interviews',
    icon: 'message-square',
    accent: '#A855F7',
  },
  {
    id: 'eng-resume',
    track: 'engineering',
    title: 'ATS Resume Builder',
    category: 'Career Documents',
    desc: 'Craft ATS-compliant, recruiter-ready resumes tailored for engineering roles.',
    meta: '3 Standard Templates',
    route: '/resume-builder',
    icon: 'file-text',
    accent: '#F59E0B',
  },
  {
    id: 'eng-placement',
    track: 'engineering',
    title: 'Placement Preparation',
    category: 'Campus Placement Suite',
    desc: 'Company-specific recruitment patterns, technical rounds, aptitude sets and interview guides.',
    meta: '12 Top Companies',
    route: '/placement-preparation',
    icon: 'briefcase',
    accent: '#EC4899',
  },
  // Competitive Subjects
  {
    id: 'comp-english',
    track: 'competitive',
    title: 'English Language',
    category: 'Grammar & Verbal Ability',
    desc: 'Comprehensive English grammar, active/passive voice, vocabulary, comprehension and cloze tests.',
    meta: '22 Topics • 350+ Questions',
    route: '/english',
    icon: 'book-open',
    accent: '#38BDF8',
  },
  {
    id: 'comp-math',
    track: 'competitive',
    title: 'Quantitative Aptitude',
    category: 'Numerical Ability',
    desc: 'Arithmetic, percentages, ratio & proportion, algebra, geometry, mensuration & data interpretation.',
    meta: '15 Topics • 500+ Questions',
    route: '/mathematics',
    icon: 'percent',
    accent: '#A855F7',
  },
  {
    id: 'comp-reasoning',
    track: 'competitive',
    title: 'Logical Reasoning',
    category: 'Analytical & Critical',
    desc: 'Syllogisms, seating arrangement, coding-decoding, blood relations, series and puzzles.',
    meta: '14 Topics • 450+ Questions',
    route: '/reasoning',
    icon: 'cpu',
    accent: '#10B981',
  },
  {
    id: 'comp-awareness',
    track: 'competitive',
    title: 'General Awareness',
    category: 'GK & Static Knowledge',
    desc: 'Indian polity, history, geography, economy, awards, books and daily current affairs.',
    meta: '11 Topics • 600+ Questions',
    route: '/awareness',
    icon: 'globe',
    accent: '#F59E0B',
  },
  {
    id: 'comp-science',
    track: 'competitive',
    title: 'General Science',
    category: 'Physics, Chemistry & Biology',
    desc: 'Everyday physical phenomena, basic chemistry reactions, human anatomy and environmental biology.',
    meta: '6 Topics • 400+ Questions',
    route: '/science',
    icon: 'activity',
    accent: '#EC4899',
  },
  {
    id: 'comp-fitness',
    track: 'competitive',
    title: 'Physical Fitness',
    category: 'Physical Standards & Conditioning',
    desc: 'Physical efficiency test benchmarks, endurance regimens, agility tests and training schedules.',
    meta: '9 Modules • 100+ Standards',
    route: '/fitness',
    icon: 'zap',
    accent: '#3B82F6',
  },
];

export default function CoursesScreen() {
  const [activeTab, setActiveTab] = useState<'all' | 'engineering' | 'competitive'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = ALL_COURSES.filter((c) => {
    const matchesTrack = activeTab === 'all' || c.track === activeTab;
    const matchesQuery =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesQuery;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <AppHeader
        showBack
        title="Courses & Modules"
        backLabel="Home"
        onBack={() => router.push('/home' as any)}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>All Learning Tracks</Text>
            <Text style={styles.subtitle}>
              Browse through Engineering modules and Competitive examination subjects
            </Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Feather name="search" size={18} color="#64748B" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search subjects, modules or topics..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Feather name="x" size={18} color="#64748B" />
              </TouchableOpacity>
            )}
          </View>

          {/* Filter Tabs */}
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'all' && styles.tabBtnActive]}
              onPress={() => setActiveTab('all')}
            >
              <Text style={[styles.tabBtnText, activeTab === 'all' && styles.tabBtnTextActive]}>
                All ({ALL_COURSES.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'engineering' && styles.tabBtnActive]}
              onPress={() => setActiveTab('engineering')}
            >
              <Text style={[styles.tabBtnText, activeTab === 'engineering' && styles.tabBtnTextActive]}>
                Engineering (5)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'competitive' && styles.tabBtnActive]}
              onPress={() => setActiveTab('competitive')}
            >
              <Text style={[styles.tabBtnText, activeTab === 'competitive' && styles.tabBtnTextActive]}>
                Competitive (6)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Grid of Courses */}
          <View style={styles.grid}>
            {filtered.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => router.push(item.route as any)}
                activeOpacity={0.88}
              >
                <View style={styles.cardTop}>
                  <View style={[styles.iconWrap, { backgroundColor: `${item.accent}15` }]}>
                    <Feather name={item.icon} size={22} color={item.accent} />
                  </View>
                  <View
                    style={[
                      styles.trackBadge,
                      {
                        backgroundColor:
                          item.track === 'engineering' ? '#EFF6FF' : '#FEF3C7',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.trackBadgeText,
                        {
                          color: item.track === 'engineering' ? '#0066FF' : '#D97706',
                        },
                      ]}
                    >
                      {item.track === 'engineering' ? 'ENGINEERING' : 'COMPETITIVE'}
                    </Text>
                  </View>
                </View>

                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardCategory}>{item.category}</Text>
                <Text style={styles.cardDesc} numberOfLines={3}>
                  {item.desc}
                </Text>

                <View style={styles.cardFooter}>
                  <Text style={styles.cardMeta}>{item.meta}</Text>
                  <View style={[styles.cardAction, { backgroundColor: `${item.accent}15` }]}>
                    <Text style={[styles.cardActionText, { color: item.accent }]}>Start</Text>
                    <Feather name="arrow-right" size={14} color={item.accent} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 48,
  },
  container: {
    maxWidth: 960,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13.5,
    color: '#64748B',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    padding: 3,
    marginBottom: 20,
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 9,
    borderRadius: 9,
  },
  tabBtnActive: {
    backgroundColor: '#FFFFFF',
    ...Shadows.card,
  },
  tabBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  tabBtnTextActive: {
    color: '#0F172A',
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    width: SCREEN_WIDTH > 768 ? '48.5%' : '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    justifyContent: 'space-between',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  trackBadgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 3,
  },
  cardCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 16,
    minHeight: 54,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  cardMeta: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#64748B',
    flex: 1,
  },
  cardAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  cardActionText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
});

