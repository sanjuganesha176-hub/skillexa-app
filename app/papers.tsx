import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppHeader } from '../components/common/AppHeader';
import { Palette, Radii, Shadows } from '../constants/theme';
import { OFFICIAL_QUESTION_PAPERS, OfficialQuestionPaperItem } from '../data/skillexaCurriculum';

export default function PreviousQuestionPapersScreen() {
  const [papers, setPapers] = useState<OfficialQuestionPaperItem[]>(OFFICIAL_QUESTION_PAPERS);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  useEffect(() => {
    // Fetch latest verified papers from backend API, fallback to local registry
    const fetchPapers = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:8000/api/competitive/papers');
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setPapers(json.data);
          }
        }
      } catch (e) {
        // Fallback to OFFICIAL_QUESTION_PAPERS already set in state
      } finally {
        setLoading(false);
      }
    };
    fetchPapers();
  }, []);

  const handleOpenPaper = (url: string) => {
    if (!url) return;
    Linking.openURL(url).catch((err) => {
      console.warn('Could not open official paper URL:', err);
    });
  };

  const categories = ['ALL', 'UPSC', 'SSC', 'DEFENCE', 'BANKING'];

  const filteredPapers = papers.filter((p) => {
    const matchesSearch =
      p.exam_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.paper_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'UPSC') return p.exam_name.includes('UPSC');
    if (selectedCategory === 'SSC') return p.exam_name.includes('SSC');
    if (selectedCategory === 'DEFENCE') return p.exam_name.includes('CDS') || p.exam_name.includes('NDA');
    if (selectedCategory === 'BANKING') return p.exam_name.includes('IBPS') || p.subject.toLowerCase().includes('bank');

    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#070B14" />
      <AppHeader
        title="Previous Year Papers"
        showBack
        onBack={() => router.back()}
        subtitle="Official examination papers & answer sources"
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Banner Notice */}
        <View style={styles.infoBanner}>
          <View style={styles.infoIconBox}>
            <Feather name="shield" size={20} color="#38BDF8" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Verified Official Question Papers</Text>
            <Text style={styles.infoDesc}>
              To protect copyright and ensure 100% authenticity, tap "View Official Paper" to access original PDF question papers and answer keys directly on authorized commission portals (UPSC, SSC, IBPS).
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Feather name="search" size={18} color="#64748B" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search exam, paper, or subject (e.g. UPSC, CDS, 2024)..."
            placeholderTextColor="#64748B"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Feather name="x" size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillScroll}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.pill, selectedCategory === cat && styles.pillActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.pillText, selectedCategory === cat && styles.pillTextActive]}>
                {cat === 'ALL' ? 'All Papers' : cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Paper List */}
        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#38BDF8" />
            <Text style={styles.loadingText}>Loading official question papers...</Text>
          </View>
        ) : filteredPapers.length === 0 ? (
          <View style={styles.emptyBox}>
            <Feather name="file-text" size={40} color="#475569" />
            <Text style={styles.emptyTitle}>No question papers found</Text>
            <Text style={styles.emptyDesc}>Try adjusting your search query or category filter.</Text>
          </View>
        ) : (
          <View style={styles.papersList}>
            {filteredPapers.map((paper) => (
              <View key={paper.id} style={styles.paperCard}>
                {/* Header row */}
                <View style={styles.cardHeaderRow}>
                  <View style={styles.examTagBadge}>
                    <Text style={styles.examTagText}>
                      {paper.exam_name} • {paper.exam_year}
                    </Text>
                  </View>
                  <View style={styles.subjectBadge}>
                    <Text style={styles.subjectBadgeText}>{paper.subject}</Text>
                  </View>
                </View>

                {/* Paper Title */}
                <Text style={styles.paperTitle}>{paper.paper_name}</Text>

                {/* Short Description */}
                <Text style={styles.paperDescription}>{paper.description}</Text>

                {/* Source and Reference Metadata */}
                <View style={styles.sourceRow}>
                  <View style={styles.sourceMeta}>
                    <Feather name="check-circle" size={13} color="#10B981" />
                    <Text style={styles.sourceWebsiteText}>{paper.source_website}</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusBadgeText}>Official Source</Text>
                  </View>
                </View>

                {/* Action Button: View Official Paper */}
                <TouchableOpacity
                  style={styles.actionButton}
                  activeOpacity={0.8}
                  onPress={() => handleOpenPaper(paper.official_url)}
                >
                  <Feather name="external-link" size={16} color="#070B14" />
                  <Text style={styles.actionButtonText}>View Official Paper</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070B14',
  },
  scrollContent: {
    padding: 16,
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#0B1528',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  infoIconBox: {
    marginTop: 2,
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#38BDF8',
    marginBottom: 4,
  },
  infoDesc: {
    fontSize: 12,
    lineHeight: 18,
    color: '#94A3B8',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    padding: 0,
  },
  pillScroll: {
    marginBottom: 16,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#1E293B',
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: '#38BDF8',
    borderColor: '#38BDF8',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
  },
  pillTextActive: {
    color: '#070B14',
    fontWeight: '700',
  },
  loadingBox: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#94A3B8',
    fontSize: 14,
  },
  emptyBox: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E2E8F0',
    marginTop: 12,
  },
  emptyDesc: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  papersList: {
    gap: 14,
  },
  paperCard: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
    padding: 16,
    ...Shadows.sm,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  examTagBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  examTagText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#38BDF8',
  },
  subjectBadge: {
    backgroundColor: 'rgba(168, 85, 247, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  subjectBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#C084FC',
  },
  paperTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 8,
    lineHeight: 22,
  },
  paperDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: '#94A3B8',
    marginBottom: 14,
  },
  sourceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    marginBottom: 14,
  },
  sourceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sourceWebsiteText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  statusBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10B981',
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#38BDF8',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionButtonText: {
    color: '#070B14',
    fontSize: 14,
    fontWeight: '700',
  },
});
