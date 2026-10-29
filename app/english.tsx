import { Feather } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React, { useState, useCallback } from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppHeader } from '../components/common/AppHeader';
import { Palette, Radii, Shadows } from '../constants/theme';
import { ENGLISH_22_TOPICS, TopicProgressStore } from '../data/skillexaCurriculum';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function EnglishCourseRoadmapPage() {
  const [progressState, setProgressState] = useState<Record<string, { status: 'LOCKED' | 'UNLOCKED' | 'COMPLETED'; bestScore: number }>>({});

  const refreshProgress = useCallback(() => {
    setProgressState({ ...TopicProgressStore.getAllProgress() });
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshProgress();
      const unsub = TopicProgressStore.subscribe(refreshProgress);
      return unsub;
    }, [refreshProgress])
  );

  const completedCount = ENGLISH_22_TOPICS.filter((t) => {
    const st = progressState[t.id]?.status || (t.id === 'noun' ? 'UNLOCKED' : 'LOCKED');
    return st === 'COMPLETED';
  }).length;

  const progressPercent = Math.round((completedCount / ENGLISH_22_TOPICS.length) * 100);

  const handleTopicPress = (topic: typeof ENGLISH_22_TOPICS[0], status: 'LOCKED' | 'UNLOCKED' | 'COMPLETED') => {
    if (status === 'LOCKED') {
      Alert.alert(
        '🔒 Topic Locked',
        `"${topic.name}" is currently locked. To unlock it, complete the preceding topic's quiz with a score of at least 70%.`,
        [{ text: 'Got it', style: 'default' }]
      );
      return;
    }

    router.push({
      pathname: '/topic-learning',
      params: {
        subject: 'English',
        topic: topic.name,
        topicId: topic.id,
        section: 'competitive',
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#070B14" />
      <AppHeader showBack title="English Language" subtitle="Grammar & Vocabulary Path" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Course Header Banner */}
        <View style={styles.headerCard}>
          <View style={styles.breadcrumbRow}>
            <TouchableOpacity onPress={() => router.push('/courses' as any)}>
              <Text style={styles.breadcrumbLink}>Courses</Text>
            </TouchableOpacity>
            <Feather name="chevron-right" size={14} color="#64748B" />
            <Text style={styles.breadcrumbCurrent}>English</Text>
            <Feather name="chevron-right" size={14} color="#64748B" />
            <Text style={styles.breadcrumbCurrent}>Grammar & Vocab</Text>
          </View>

          <View style={styles.titleRow}>
            <View>
              <Text style={styles.courseTitle}>English Language Path</Text>
              <Text style={styles.courseSubtitle}>
                Master grammar, vocabulary, and comprehension across 22 sequential levels.
              </Text>
            </View>
          </View>

          {/* Progress Overview Card */}
          <View style={styles.progressOverview}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Course Completion</Text>
              <Text style={styles.progressFraction}>
                <Text style={styles.progressFractionHighlight}>{completedCount}</Text> / {ENGLISH_22_TOPICS.length} Levels Passed ({progressPercent}%)
              </Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${Math.max(progressPercent, 4)}%` }]} />
            </View>
          </View>

          {/* Quick Info Badges */}
          <View style={styles.infoBadgeRow}>
            <View style={styles.infoBadge}>
              <Feather name="award" size={13} color="#38BDF8" />
              <Text style={styles.infoBadgeText}>Pass Mark: 70%</Text>
            </View>
            <View style={styles.infoBadge}>
              <Feather name="unlock" size={13} color="#10B981" />
              <Text style={styles.infoBadgeText}>Sequential Unlock</Text>
            </View>
            <View style={styles.infoBadge}>
              <Feather name="file-text" size={13} color="#A855F7" />
              <Text style={styles.infoBadgeText}>Verified PYQs</Text>
            </View>
          </View>
        </View>

        {/* Section Header */}
        <View style={styles.timelineSectionHeader}>
          <Text style={styles.timelineTitle}>Learning Path & Level Progression</Text>
          <Text style={styles.timelineSubtitle}>
            Complete each level's learn module, previous year questions, and quiz to unlock the next level.
          </Text>
        </View>

        {/* Topic Boxes / Cards Grid */}
        <View style={styles.topicsGrid}>
          {ENGLISH_22_TOPICS.map((topic, index) => {
            const rawStatus = progressState[topic.id]?.status;
            const status: 'LOCKED' | 'UNLOCKED' | 'COMPLETED' =
              rawStatus || (index === 0 ? 'UNLOCKED' : 'LOCKED');
            const bestScore = progressState[topic.id]?.bestScore || 0;

            const isCompleted = status === 'COMPLETED';
            const isUnlocked = status === 'UNLOCKED';
            const isLocked = status === 'LOCKED';

            return (
              <TouchableOpacity
                key={topic.id}
                activeOpacity={isLocked ? 0.7 : 0.85}
                style={[
                  styles.topicBoxCard,
                  isCompleted && styles.topicBoxCardCompleted,
                  isUnlocked && styles.topicBoxCardUnlocked,
                  isLocked && styles.topicBoxCardLocked,
                ]}
                onPress={() => handleTopicPress(topic, status)}
              >
                {/* Topic Header: Topic N */}
                <View style={styles.topicBoxHeader}>
                  <Text style={styles.topicBoxIndex}>Topic {index + 1}</Text>
                  {bestScore > 0 && (
                    <View style={styles.scorePill}>
                      <Feather name="award" size={11} color="#10B981" />
                      <Text style={styles.scorePillText}>{bestScore}%</Text>
                    </View>
                  )}
                </View>

                {/* Topic Name */}
                <Text style={[styles.topicBoxName, isLocked && styles.topicBoxNameLocked]} numberOfLines={1}>
                  {topic.name}
                </Text>

                {/* Status Badge */}
                <View
                  style={[
                    styles.topicBoxStatusBadge,
                    isCompleted && styles.statusBadgeCompleted,
                    isUnlocked && styles.statusBadgeUnlocked,
                    isLocked && styles.statusBadgeLocked,
                  ]}
                >
                  {isCompleted ? (
                    <View style={styles.statusBadgeInner}>
                      <Feather name="check" size={13} color="#10B981" />
                      <Text style={styles.statusTextCompleted}>COMPLETED ✓</Text>
                    </View>
                  ) : isUnlocked ? (
                    <View style={styles.statusBadgeInner}>
                      <Feather name="unlock" size={13} color="#38BDF8" />
                      <Text style={styles.statusTextUnlocked}>UNLOCKED</Text>
                    </View>
                  ) : (
                    <View style={styles.statusBadgeInner}>
                      <Feather name="lock" size={13} color="#64748B" />
                      <Text style={styles.statusTextLocked}>LOCKED 🔒</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 60 }} />
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
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  headerCard: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 24,
    ...Shadows.card,
  },
  breadcrumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  breadcrumbLink: {
    fontSize: 12,
    fontWeight: '700',
    color: '#38BDF8',
  },
  breadcrumbCurrent: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  titleRow: {
    marginBottom: 16,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  courseSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
  },
  progressOverview: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: 14,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  progressFraction: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  progressFractionHighlight: {
    color: '#38BDF8',
    fontWeight: '800',
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 4,
  },
  infoBadgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  infoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  infoBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#CBD5E1',
  },
  timelineSectionHeader: {
    marginBottom: 20,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  timelineSubtitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  topicBoxCard: {
    width: '48%',
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 14,
    justifyContent: 'space-between',
    minHeight: 125,
    ...Shadows.card,
  },
  topicBoxCardCompleted: {
    borderColor: 'rgba(16, 185, 129, 0.35)',
    backgroundColor: 'rgba(16, 185, 129, 0.06)',
  },
  topicBoxCardUnlocked: {
    borderColor: 'rgba(56, 189, 248, 0.45)',
    backgroundColor: '#111A33',
    ...Shadows.glow,
  },
  topicBoxCardLocked: {
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    borderColor: 'rgba(255, 255, 255, 0.05)',
    opacity: 0.8,
  },
  topicBoxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  topicBoxIndex: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  topicBoxName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 12,
  },
  topicBoxNameLocked: {
    color: '#64748B',
  },
  topicBoxStatusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadgeCompleted: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
  },
  statusBadgeUnlocked: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
  },
  statusBadgeLocked: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  statusBadgeInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statusTextCompleted: {
    fontSize: 11,
    fontWeight: '800',
    color: '#10B981',
  },
  statusTextUnlocked: {
    fontSize: 11,
    fontWeight: '800',
    color: '#38BDF8',
  },
  statusTextLocked: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  timelineContainer: {
    position: 'relative',
    paddingLeft: 8,
  },
  continuousLine: {
    position: 'absolute',
    left: 27,
    top: 24,
    bottom: 40,
    width: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  nodeColumn: {
    width: 40,
    alignItems: 'center',
    marginRight: 12,
    paddingTop: 16,
  },
  nodeCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    zIndex: 2,
  },
  nodeCircleCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#059669',
    ...Shadows.sm,
  },
  nodeCircleUnlocked: {
    backgroundColor: '#0F172A',
    borderColor: '#38BDF8',
    ...Shadows.glow,
  },
  nodeCircleLocked: {
    backgroundColor: '#070B14',
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  topicCard: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    ...Shadows.card,
  },
  topicCardCompleted: {
    borderColor: 'rgba(16, 185, 129, 0.3)',
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
  },
  topicCardUnlocked: {
    borderColor: 'rgba(56, 189, 248, 0.45)',
    backgroundColor: '#111A33',
    ...Shadows.floating,
  },
  topicCardLocked: {
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  topicCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  levelTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  levelBadgeCompleted: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  levelBadgeUnlocked: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  levelBadgeLocked: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  levelBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  levelBadgeTextCompleted: {
    color: '#10B981',
  },
  levelBadgeTextUnlocked: {
    color: '#38BDF8',
  },
  levelBadgeTextLocked: {
    color: '#64748B',
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusTagCompleted: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  statusTagUnlocked: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  statusTagLocked: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  statusTagText: {
    fontSize: 10,
    fontWeight: '800',
  },
  statusTagTextCompleted: {
    color: '#10B981',
  },
  statusTagTextUnlocked: {
    color: '#38BDF8',
  },
  statusTagTextLocked: {
    color: '#64748B',
  },
  scorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  scorePillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#10B981',
  },
  topicTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  topicTitleLocked: {
    color: '#94A3B8',
  },
  topicDescription: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 14,
  },
  topicFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  featuresRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featureText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
  },
  featureTextLocked: {
    color: '#475569',
  },
  actionArrowWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
  },
  startBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#38BDF8',
  },
  reviewBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  reviewBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
  },
});
