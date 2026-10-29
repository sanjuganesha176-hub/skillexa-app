import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../components/theme-context';

export default function LiveVideoInterviewScreen() {
  const { isDark } = useTheme();
  const {
    studentName = 'Ganesh Sharan',
    role = 'Embedded Systems Engineer',
    interviewType = 'Technical Interview',
  } = useLocalSearchParams<{
    studentName: string;
    role: string;
    interviewType: string;
  }>();

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [scoringNotes, setScoringNotes] = useState('');

  const questions = [
    'Q1. Explain the architectural differences between Harvard and Von Neumann architectures.',
    'Q2. What is an interrupt service routine (ISR) and why must delay functions never be used inside it?',
    'Q3. What is the role of the Watchdog Timer (WDT) in safety-critical firmware?',
    'Q4. How do I2C and SPI compare in terms of wire count, speed, and multi-device communication?',
    'Q5. Describe an embedded project where you resolved a difficult hardware/software timing bug.',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    Alert.alert('End Interview Call', 'Are you sure you want to end this interview session and proceed to evaluation?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'End & Grade',
        style: 'destructive',
        onPress: () => {
          router.replace({
            pathname: '/faculty/evaluation',
            params: {
              studentName,
              role,
            },
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <StatusBar barStyle="light-content" backgroundColor="#070B14" />

      {/* Top Session Call Header */}
      <View style={[styles.callHeader, isDark && styles.callHeaderDark]}>
        <View style={styles.liveTag}>
          <View style={styles.liveDot} />
          <Text style={styles.liveTagText}>LIVE INTERVIEW • {formatTimer(seconds)}</Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={styles.candidateName}>{studentName}</Text>
          <Text style={styles.candidateRole}>{role}</Text>
        </View>

        <TouchableOpacity style={styles.headerEndBtn} onPress={handleEndCall} activeOpacity={0.8}>
          <Feather name="phone-off" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Video Streams Container (Split View) */}
      <View style={styles.videoStage}>
        {/* Remote Candidate Stream (Primary) */}
        <View style={[styles.remoteVideoBox, isDark && styles.remoteVideoBoxDark]}>
          <View style={styles.videoPlaceholder}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarLetter}>{studentName.charAt(0)}</Text>
            </View>
            <Text style={styles.videoLabel}>{studentName} (Candidate)</Text>
            <Text style={styles.streamStatus}>Connected via WebRTC Media Stream</Text>
          </View>

          {/* Local Faculty Stream Picture-in-Picture */}
          <View style={[styles.localPipBox, isDark && styles.localPipBoxDark]}>
            {camOn ? (
              <View style={styles.pipContent}>
                <Feather name="user" size={18} color="#FFFFFF" />
                <Text style={styles.pipText}>You (Faculty)</Text>
              </View>
            ) : (
              <View style={styles.pipOff}>
                <Feather name="camera-off" size={16} color="#EF4444" />
                <Text style={styles.pipOffText}>Cam Off</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Faculty Question Prompt & Quick Scoring Drawer */}
      <View style={[styles.drawer, isDark && styles.drawerDark]}>
        <View style={styles.drawerHeader}>
          <Text style={[styles.drawerTitle, isDark && { color: '#60A5FA' }]}>
            Question {currentQIdx + 1} of {questions.length}
          </Text>
          <View style={styles.qNavBtns}>
            <TouchableOpacity
              style={[
                styles.qNavBtn,
                isDark && styles.qNavBtnDark,
                currentQIdx === 0 && { opacity: 0.4 },
              ]}
              onPress={() => setCurrentQIdx(Math.max(0, currentQIdx - 1))}
              disabled={currentQIdx === 0}
            >
              <Feather name="chevron-left" size={16} color={isDark ? '#F8FAFC' : '#0f172a'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.qNavBtn,
                isDark && styles.qNavBtnDark,
                currentQIdx === questions.length - 1 && { opacity: 0.4 },
              ]}
              onPress={() => setCurrentQIdx(Math.min(questions.length - 1, currentQIdx + 1))}
              disabled={currentQIdx === questions.length - 1}
            >
              <Feather name="chevron-right" size={16} color={isDark ? '#F8FAFC' : '#0f172a'} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.activePromptText, isDark && styles.textWhite]}>{questions[currentQIdx]}</Text>

        <TextInput
          style={[styles.notesInput, isDark && styles.notesInputDark]}
          placeholder="Type live feedback or score notes during call..."
          placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
          multiline
          value={scoringNotes}
          onChangeText={setScoringNotes}
        />
      </View>

      {/* Bottom Media Controls */}
      <View style={[styles.controlsBar, isDark && styles.controlsBarDark]}>
        <TouchableOpacity
          style={[styles.controlBtn, !micOn && styles.controlBtnOff]}
          onPress={() => setMicOn(!micOn)}
          activeOpacity={0.8}
        >
          <Feather name={micOn ? 'mic' : 'mic-off'} size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlBtn, !camOn && styles.controlBtnOff]}
          onPress={() => setCamOn(!camOn)}
          activeOpacity={0.8}
        >
          <Feather name={camOn ? 'video' : 'video-off'} size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.endCallBigBtn} onPress={handleEndCall} activeOpacity={0.85}>
          <Feather name="phone-off" size={20} color="#FFFFFF" />
          <Text style={styles.endCallText}>End Call</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A192F',
  },
  safeAreaDark: {
    backgroundColor: '#070B14',
  },
  callHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  callHeaderDark: {
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  liveTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#EF4444',
  },
  candidateName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  candidateRole: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  headerEndBtn: {
    backgroundColor: '#EF4444',
    padding: 8,
    borderRadius: 20,
  },
  videoStage: {
    flex: 1,
    padding: 12,
  },
  remoteVideoBox: {
    flex: 1,
    backgroundColor: '#0F1E36',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteVideoBoxDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  videoPlaceholder: {
    alignItems: 'center',
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#1E293B',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarLetter: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  videoLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  streamStatus: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },
  localPipBox: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 104,
    height: 136,
    backgroundColor: '#0A192F',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  localPipBoxDark: {
    backgroundColor: '#070B14',
    borderColor: '#334155',
  },
  pipContent: {
    alignItems: 'center',
    gap: 4,
  },
  pipText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  pipOff: {
    alignItems: 'center',
    gap: 4,
  },
  pipOffText: {
    fontSize: 10,
    color: '#EF4444',
    fontWeight: '700',
  },
  drawer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: 180,
  },
  drawerDark: {
    backgroundColor: '#0F172A',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  drawerTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0A192F',
    letterSpacing: 0.6,
  },
  qNavBtns: {
    flexDirection: 'row',
    gap: 8,
  },
  qNavBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qNavBtnDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  activePromptText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0f172a',
    lineHeight: 18,
    marginBottom: 8,
  },
  notesInput: {
    height: 52,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 8,
    fontSize: 12,
    color: '#0f172a',
    textAlignVertical: 'top',
  },
  notesInputDark: {
    backgroundColor: '#162032',
    borderColor: '#334155',
    color: '#F8FAFC',
  },
  controlsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    backgroundColor: '#0A192F',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  controlsBarDark: {
    backgroundColor: '#070B14',
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  controlBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtnOff: {
    backgroundColor: '#EF4444',
  },
  endCallBigBtn: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 23,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  endCallText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800',
  },
  textWhite: {
    color: '#F8FAFC',
  },
});
