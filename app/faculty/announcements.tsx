import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { TargetAudienceSelector } from '../../components/TargetAudienceSelector';
import { useAuth } from '../../components/auth-context';
import { AppHeader } from '../../components/common/AppHeader';
import { useTheme } from '../../components/theme-context';
import { CollegeAnnouncement, TargetAudience } from '../../data/collegeData';
import { CollegeStore } from '../../services/collegeStore';

export default function FacultyAnnouncementsScreen() {
  const { profile } = useAuth();
  const { isDark } = useTheme();
  const [announcements, setAnnouncements] = useState<CollegeAnnouncement[]>([]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<'NORMAL' | 'HIGH' | 'URGENT'>('HIGH');
  const [isPinned, setIsPinned] = useState(true);

  const [target, setTarget] = useState<TargetAudience>({
    targetType: 'SECTION',
    collegeId: profile.collegeId || 'clg-kvg',
    collegeName: profile.collegeName || 'KVG College of Engineering',
    department: profile.department || 'ECE',
    academicYear: '3rd Year',
    section: 'A',
  });

  useEffect(() => {
    setAnnouncements(CollegeStore.getAnnouncements());
    return CollegeStore.subscribe(() => {
      setAnnouncements(CollegeStore.getAnnouncements());
    });
  }, []);

  const handlePublishAnnouncement = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Incomplete Fields', 'Please provide a title and announcement message.');
      return;
    }

    CollegeStore.addAnnouncement({
      collegeId: profile.collegeId || 'clg-kvg',
      title: title.trim(),
      content: content.trim(),
      target,
      facultyId: profile.id || 'fac-101',
      facultyName: profile.name || 'Dr. Ramesh Kumar',
      facultyDept: `${profile.department || 'ECE'} Department`,
      priority,
      isPinned,
    });

    Alert.alert(
      'Announcement Published!',
      'Targeted students in your college have been notified immediately on their SkillExa workspace.'
    );

    setTitle('');
    setContent('');
  };

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#070B14" : "#FFFFFF"}
      />
      <AppHeader
        showBack
        title="College Announcements"
        subtitle="Department Notices & Alerts"
        backLabel="Faculty Hub"
        onBack={() => router.push('/faculty-dashboard' as any)}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Authoring Card */}
          <View style={[styles.card, isDark && styles.cardDark]}>
            <Text style={[styles.cardHeader, isDark && styles.textWhite]}>
              Create Department Announcement
            </Text>

            <Text style={[styles.label, isDark && styles.labelDark]}>ANNOUNCEMENT TITLE *</Text>
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="e.g. Tomorrow's Embedded Systems Quiz at 10:00 AM"
              placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
              value={title}
              onChangeText={setTitle}
            />

            <Text style={[styles.label, { marginTop: 12 }, isDark && styles.labelDark]}>
              MESSAGE / DETAILS *
            </Text>
            <TextInput
              style={[styles.input, styles.textArea, isDark && styles.inputDark]}
              placeholder="Write clear notice instructions for students..."
              placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
              multiline
              value={content}
              onChangeText={setContent}
            />

            {/* Priority & Pinned */}
            <View style={styles.rowGrid}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, isDark && styles.labelDark]}>PRIORITY LEVEL</Text>
                <View style={styles.pillsRow}>
                  {(['NORMAL', 'HIGH', 'URGENT'] as const).map((p) => (
                    <TouchableOpacity
                      key={p}
                      style={[
                        styles.pPill,
                        isDark && styles.pPillDark,
                        priority === p && styles.pPillActive,
                      ]}
                      onPress={() => setPriority(p)}
                    >
                      <Text
                        style={[
                          styles.pPillText,
                          isDark && styles.pPillTextDark,
                          priority === p && styles.pPillTextActive,
                        ]}
                      >
                        {p}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.pinToggle,
                  isDark && styles.pinToggleDark,
                  isPinned && styles.pinToggleActive,
                ]}
                onPress={() => setIsPinned(!isPinned)}
              >
                <Feather
                  name="anchor"
                  size={14}
                  color={isPinned ? '#FFFFFF' : isDark ? '#94A3B8' : '#64748B'}
                />
                <Text
                  style={[
                    styles.pinText,
                    isDark && styles.pinTextDark,
                    isPinned && styles.pinTextActive,
                  ]}
                >
                  {isPinned ? 'Pinned' : 'Normal'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Target Audience Selector */}
            <View style={{ marginTop: 14 }}>
              <TargetAudienceSelector
                target={target}
                onChangeTarget={setTarget}
                collegeName={profile.collegeName || 'KVG College of Engineering'}
              />
            </View>

            {/* Publish Action */}
            <TouchableOpacity
              style={[styles.publishBtn, isDark && styles.publishBtnDark]}
              onPress={handlePublishAnnouncement}
              activeOpacity={0.88}
            >
              <Feather name="send" size={15} color="#FFFFFF" />
              <Text style={styles.publishBtnText}>Publish & Notify Students →</Text>
            </TouchableOpacity>
          </View>

          {/* Existing Announcements List */}
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, isDark && styles.textWhite]}>
              Active College Notices ({announcements.length})
            </Text>
          </View>

          <View style={styles.annList}>
            {announcements.map((ann) => (
              <View key={ann.id} style={[styles.annCard, isDark && styles.annCardDark]}>
                <View style={styles.annCardTop}>
                  <View style={[styles.tag, isDark && styles.tagDark]}>
                    <Text style={[styles.tagText, isDark && styles.tagTextDark]}>
                      {ann.priority} • {ann.target.targetType}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => CollegeStore.deleteAnnouncement(ann.id)}>
                    <Feather name="trash-2" size={15} color="#EF4444" />
                  </TouchableOpacity>
                </View>

                <Text style={[styles.annTitle, isDark && styles.textWhite]}>{ann.title}</Text>
                <Text style={[styles.annMsg, isDark && styles.textMutedDark]}>{ann.content}</Text>
                <Text style={[styles.annTargetMeta, isDark && styles.textSubtleDark]}>
                  Target: {ann.target.department || 'All'} {ann.target.academicYear ? `• ${ann.target.academicYear}` : ''} {ann.target.section ? `• Sec ${ann.target.section}` : ''}
                </Text>
              </View>
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
    backgroundColor: '#FFFFFF',
  },
  safeAreaDark: {
    backgroundColor: '#070B14',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 48,
  },
  container: {
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#eef2f6',
    marginBottom: 24,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  cardHeader: {
    fontSize: 16.5,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 14,
  },
  label: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#334155',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  labelDark: {
    color: '#94A3B8',
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13.5,
    color: '#0f172a',
  },
  inputDark: {
    backgroundColor: '#070B14',
    borderColor: '#1E293B',
    color: '#F8FAFC',
  },
  textArea: {
    height: 76,
    textAlignVertical: 'top',
  },
  rowGrid: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    marginTop: 12,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pPillDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  pPillActive: {
    backgroundColor: '#0A192F',
    borderColor: '#0A192F',
  },
  pPillText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#64748b',
  },
  pPillTextDark: {
    color: '#94A3B8',
  },
  pPillTextActive: {
    color: '#FFFFFF',
  },
  pinToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pinToggleDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  pinToggleActive: {
    backgroundColor: '#0A192F',
    borderColor: '#0A192F',
  },
  pinText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
  },
  pinTextDark: {
    color: '#94A3B8',
  },
  pinTextActive: {
    color: '#FFFFFF',
  },
  publishBtn: {
    backgroundColor: '#0A192F',
    borderRadius: 12,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
    shadowColor: '#0A192F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  publishBtnDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
    borderWidth: 1,
  },
  publishBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionHeaderRow: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16.5,
    fontWeight: '800',
    color: '#0f172a',
  },
  annList: {
    gap: 12,
  },
  annCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eef2f6',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  annCardDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  annCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagDark: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  tagText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#0066FF',
  },
  tagTextDark: {
    color: '#38BDF8',
  },
  annTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
  },
  annMsg: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
    marginBottom: 8,
  },
  annTargetMeta: {
    fontSize: 11.5,
    color: '#94A3B8',
  },
  textWhite: {
    color: '#F8FAFC',
  },
  textMutedDark: {
    color: '#94A3B8',
  },
  textSubtleDark: {
    color: '#64748B',
  },
});
