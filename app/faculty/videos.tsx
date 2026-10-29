import { Feather } from '@expo/vector-icons';
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
import { TargetAudience } from '../../data/collegeData';
import { FacultyVideo } from '../../data/curriculumSchema';
import { CollegeStore } from '../../services/collegeStore';
import { FacultySystemStore } from '../../services/facultyStore';

export default function FacultyVideosScreen() {
  const { profile } = useAuth();
  const { isDark } = useTheme();
  const [videos, setVideos] = useState<FacultyVideo[]>([]);
  const [section, setSection] = useState<'engineering' | 'competitive'>('engineering');
  const [subject, setSubject] = useState('Embedded Systems');
  const [topic, setTopic] = useState('Microcontrollers');
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('20 mins');
  const [visibility, setVisibility] = useState<'college' | 'community'>('college');

  const [target, setTarget] = useState<TargetAudience>({
    targetType: 'SECTION',
    collegeId: profile.collegeId || 'clg-kvg',
    collegeName: profile.collegeName || 'KVG College of Engineering',
    department: profile.department || 'ECE',
    academicYear: '3rd Year',
    section: 'A',
  });

  useEffect(() => {
    setVideos(FacultySystemStore.getVideos());
    return FacultySystemStore.subscribe(() => {
      setVideos(FacultySystemStore.getVideos());
    });
  }, []);

  const handlePublishVideo = () => {
    if (!title.trim() || !videoUrl.trim() || !topic.trim()) {
      Alert.alert('Incomplete Form', 'Please provide Video Title, Topic Name, and Video URL.');
      return;
    }

    FacultySystemStore.addVideo({
      section,
      subject,
      topic: topic.trim(),
      title: title.trim(),
      videoUrl: videoUrl.trim(),
      description: description.trim() || 'Faculty curated lecture video.',
      duration: duration.trim(),
      facultyName: profile.name || 'Dr. Ramesh Kumar',
      facultyDesignation: profile.facultyDesignation || 'Associate Professor',
      facultyDepartment: profile.department || 'ECE Department',
      collegeId: profile.collegeId || 'clg-kvg',
      collegeName: profile.collegeName || 'KVG College of Engineering',
      isVerifiedFaculty: true,
      visibility,
      published: true,
    });

    if (visibility === 'college') {
      CollegeStore.dispatchNotification({
        studentId: 'std-101',
        collegeId: profile.collegeId || 'clg-kvg',
        title: '🎥 New Lecture Video',
        message: `${profile.name || 'Faculty'} uploaded "${title.trim()}" for ${topic.trim()}.`,
        type: 'VIDEO',
        actionRoute: '/topic-learning',
        actionParams: {
          topic: topic.trim(),
          subject,
          section,
        },
      });

      Alert.alert('Video Attached!', `Video lesson attached to "${topic}". Target students in ${profile.collegeName || 'your college'} have been notified!`);
    } else {
      Alert.alert(
        'Published to SkillExa Community! 🌍',
        `Video lecture "${title}" is now publicly discoverable by students across all colleges.`
      );
    }
    setTitle('');
    setVideoUrl('');
    setDescription('');
  };

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#070B14' : '#FFFFFF'} />
      <AppHeader showBack title="Faculty Video Lectures" subtitle="Attach Educational Videos to Topics" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={[styles.banner, isDark && styles.bannerDark]}>
          <View style={[styles.iconBox, isDark && styles.iconBoxDark]}>
            <Feather name="film" size={20} color={isDark ? '#60A5FA' : '#0A192F'} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.bannerTitle, isDark && styles.textWhite]}>Attach Topic Video Lessons</Text>
            <Text style={[styles.bannerDesc, isDark && styles.textMutedDark]}>
              Lectures published here appear inside the corresponding student topic view marked with 🎥 Faculty Video.
            </Text>
          </View>
        </View>

        {/* Video Attacher Form */}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <Text style={[styles.cardTitle, isDark && styles.textWhite]}>1. Target Topic & Video Metadata</Text>

          <View style={styles.gridRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, isDark && styles.textMutedDark]}>SECTION</Text>
              <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                value={section}
                onChangeText={(t) => setSection(t as any)}
                placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, isDark && styles.textMutedDark]}>SUBJECT</Text>
              <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                value={subject}
                onChangeText={setSubject}
                placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
              />
            </View>
          </View>

          <Text style={[styles.label, isDark && styles.textMutedDark, { marginTop: 12 }]}>TOPIC NAME *</Text>
          <TextInput
            style={[styles.input, isDark && styles.inputDark]}
            value={topic}
            onChangeText={setTopic}
            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
          />

          <Text style={[styles.label, isDark && styles.textMutedDark, { marginTop: 12 }]}>VIDEO TITLE *</Text>
          <TextInput
            style={[styles.input, isDark && styles.inputDark]}
            placeholder="e.g. In-Depth ARM Cortex-M NVIC Interrupts"
            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={[styles.label, isDark && styles.textMutedDark, { marginTop: 12 }]}>VIDEO URL (YOUTUBE / MP4 STREAM) *</Text>
          <TextInput
            style={[styles.input, isDark && styles.inputDark]}
            placeholder="https://www.youtube.com/watch?v=..."
            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
            value={videoUrl}
            onChangeText={setVideoUrl}
          />

          <View style={[styles.gridRow, { marginTop: 12 }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, isDark && styles.textMutedDark]}>DURATION</Text>
              <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                value={duration}
                onChangeText={setDuration}
                placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
              />
            </View>
          </View>

          <Text style={[styles.label, isDark && styles.textMutedDark, { marginTop: 12 }]}>DESCRIPTION</Text>
          <TextInput
            style={[styles.input, isDark && styles.inputDark, { height: 70, textAlignVertical: 'top' }]}
            placeholder="Key concepts discussed in this lecture..."
            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
            multiline
            value={description}
            onChangeText={setDescription}
          />

          {/* Target Audience Selector & Visibility */}
          <View style={{ marginTop: 14 }}>
            <TargetAudienceSelector
              visibility={visibility}
              onChangeVisibility={setVisibility}
              target={target}
              onChangeTarget={setTarget}
              collegeName={profile.collegeName || 'KVG College of Engineering'}
            />
          </View>

          <TouchableOpacity
            style={[styles.publishBtn, isDark && styles.publishBtnDark]}
            onPress={handlePublishVideo}
            activeOpacity={0.85}
          >
            <Feather name="upload" size={16} color="#FFFFFF" />
            <Text style={styles.publishBtnText}>Publish Video to Topic</Text>
          </TouchableOpacity>
        </View>

        {/* Existing Attached Videos */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionTitle, isDark && styles.textWhite]}>Attached Topic Videos ({videos.length})</Text>
        </View>

        <View style={styles.list}>
          {videos.map((v) => (
            <View key={v.id} style={[styles.videoCard, isDark && styles.videoCardDark]}>
              <View style={styles.cardHeader}>
                <View style={[styles.badge, isDark && styles.badgeDark]}>
                  <Text style={[styles.badgeText, isDark && styles.badgeTextDark]}>
                    {v.subject} • {v.topic}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => FacultySystemStore.deleteVideo(v.id)} activeOpacity={0.7}>
                  <Feather name="trash-2" size={15} color="#EF4444" />
                </TouchableOpacity>
              </View>

              <Text style={[styles.vTitle, isDark && styles.textWhite]}>{v.title}</Text>
              <Text style={[styles.vUrl, isDark && { color: '#60A5FA' }]} numberOfLines={1}>
                🔗 {v.videoUrl}
              </Text>
              <Text style={[styles.vDesc, isDark && styles.textMutedDark]}>{v.description}</Text>
              <Text style={[styles.vMeta, isDark && { color: '#64748b' }]}>
                Duration: {v.duration || '15 mins'} • By {v.facultyName}
              </Text>
            </View>
          ))}
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  banner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eef2f6',
    borderLeftWidth: 4,
    borderLeftColor: '#0A192F',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  bannerDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
    borderLeftColor: '#60A5FA',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
  },
  bannerDesc: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eef2f6',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 12,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 10,
  },
  label: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    fontSize: 13,
    color: '#0f172a',
  },
  inputDark: {
    backgroundColor: '#162032',
    borderColor: '#334155',
    color: '#F8FAFC',
  },
  publishBtn: {
    backgroundColor: '#0A192F',
    borderRadius: 12,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  publishBtnDark: {
    backgroundColor: '#1E293B',
  },
  publishBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionHeaderRow: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  list: {
    gap: 10,
  },
  videoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#eef2f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  videoCardDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  badge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#0A192F',
  },
  badgeTextDark: {
    color: '#60A5FA',
  },
  vTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 2,
  },
  vUrl: {
    fontSize: 11.5,
    color: '#2563EB',
    marginBottom: 4,
  },
  vDesc: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 6,
  },
  vMeta: {
    fontSize: 11,
    color: '#94a3b8',
  },
  textWhite: {
    color: '#F8FAFC',
  },
  textMutedDark: {
    color: '#94A3B8',
  },
});
