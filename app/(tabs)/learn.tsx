import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  ExternalLink,
  Info,
  PieChart,
  Shield,
  TrendingUp
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const lessons = [
  { id: 1, title: 'What is a Stock?', icon: TrendingUp, color: '#3B82F6', duration: '2 min read', content: 'A stock represents ownership in a company. When you buy a stock, you become a shareholder and own a piece of that company\'s future.' },
  { id: 2, title: 'Understanding NEPSE', icon: BookOpen, color: '#10B981', duration: '3 min read', content: 'Nepal Stock Exchange (NEPSE) is the only stock exchange in Nepal. It is the marketplace where buyers and sellers trade shares of listed companies.' },
  { id: 3, title: 'Risk & Diversification', icon: Shield, color: '#8B5CF6', duration: '4 min read', content: 'Diversification means spreading your investments across different sectors (like Banking, Hydro, and Hotels) to reduce the impact of any single stock performing poorly.' },
  { id: 4, title: 'Reading Market Data', icon: PieChart, color: '#EC4899', duration: '5 min read', content: 'Learn to interpret key metrics: Price (current cost), Volume (total shares traded today), and Market Cap (total value of the company).' },
];

const externalResources = [
  { title: 'NEPSE Official', url: 'https://www.nepalstock.com', description: 'Live market data and announcements' },
  { title: 'SEBON Website', url: 'https://www.sebon.gov.np', description: 'Regulatory info for Nepali investors' },
  { title: 'Investopedia', url: 'https://www.investopedia.com', description: 'Global stock market encyclopedia' },
];

export default function LearnScreen() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const toggleLesson = (id: number) => {
    setCompletedLessons(prev => 
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  const progress = (completedLessons.length / lessons.length) * 100;

  const handleOpenURL = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Beginner's Guide</Text>
        <Text style={styles.headerSubtitle}>Learn stock market basics step by step</Text>
      </View>

      {/* Progress Card */}
      <View style={styles.progressCard}>
        <View style={styles.progressTextContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={styles.cardTitle}>Your Progress</Text>
            <Text style={styles.progressStat}>{completedLessons.length}/{lessons.length}</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
        </View>
      </View>

      {/* Lessons Section */}
      <Text style={styles.sectionTitle}>Quick Lessons</Text>
      {lessons.map((lesson) => {
        const Icon = lesson.icon;
        const isDone = completedLessons.includes(lesson.id);
        return (
          <View key={lesson.id} style={[styles.lessonCard, isDone && styles.lessonCardCompleted]}>
            <View style={styles.lessonHeader}>
              <View style={[styles.iconBox, { backgroundColor: lesson.color + '20' }]}>
                <Icon color={lesson.color} size={20} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <View style={styles.titleRow}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.durationText}>{lesson.duration}</Text>
                </View>
                <Text style={styles.lessonContent}>{lesson.content}</Text>
              </View>
            </View>

            <TouchableOpacity 
              onPress={() => toggleLesson(lesson.id)}
              style={[styles.button, isDone ? styles.buttonCompleted : styles.buttonIncomplete]}
            >
              <Text style={[styles.buttonText, isDone ? styles.buttonTextCompleted : styles.buttonTextIncomplete]}>
                {isDone ? '✓ Completed' : 'Start Learning'}
              </Text>
              {!isDone && <CheckCircle size={16} color="#3B82F6" style={{marginLeft: 6}} />}
            </TouchableOpacity>
          </View>
        );
      })}

      {/* Verified Resources Section */}
      <Text style={styles.sectionTitle}>Verified Resources</Text>
      {externalResources.map((resource, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.resourceCard}
          onPress={() => handleOpenURL(resource.url)}
        >
          <View style={styles.resourceIconBox}>
            <ExternalLink size={18} color="#10B981" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.resourceTitle}>{resource.title}</Text>
            <Text style={styles.resourceDesc}>{resource.description}</Text>
          </View>
          <ChevronRight size={18} color="#CBD5E1" />
        </TouchableOpacity>
      ))}

      {/* Study Tip Section */}
      <View style={styles.tipCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <Info size={16} color="#92400E" />
          <Text style={styles.tipTitle}>Study Tip</Text>
        </View>
        <Text style={styles.tipText}>Complete one lesson at a time. Understanding basics is crucial before investing real money!</Text>
      </View>
      
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', paddingHorizontal: 16 },
  header: { marginTop: 60, marginBottom: 20 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#1E293B' },
  headerSubtitle: { fontSize: 15, color: '#64748B', marginTop: 4 },
  
  progressCard: { 
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    padding: 20, 
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  progressTextContainer: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '600', color: '#1E293B' },
  progressStat: { fontSize: 14, fontWeight: '700', color: '#3B82F6' },
  progressBarBg: { backgroundColor: '#F1F5F9', height: 10, borderRadius: 5 },
  progressBarFill: { backgroundColor: '#3B82F6', height: 10, borderRadius: 5 },
  
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginBottom: 16, marginTop: 8 },
  
  lessonCard: { 
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    padding: 16, 
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9'
  },
  lessonCardCompleted: { borderColor: '#A7F3D0', backgroundColor: '#F0FDF4' },
  lessonHeader: { flexDirection: 'row', marginBottom: 16 },
  iconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  lessonTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  durationText: { fontSize: 11, color: '#94A3B8', fontWeight: '600' },
  lessonContent: { fontSize: 14, color: '#64748B', lineHeight: 20 },
  
  button: { paddingVertical: 12, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  buttonIncomplete: { backgroundColor: '#EFF6FF' },
  buttonCompleted: { backgroundColor: '#DCFCE7' },
  buttonText: { fontWeight: '700', fontSize: 14 },
  buttonTextIncomplete: { color: '#3B82F6' },
  buttonTextCompleted: { color: '#10B981' },

  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  resourceIconBox: { backgroundColor: '#F0FDF4', p: 8, padding: 8, borderRadius: 10 },
  resourceTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  resourceDesc: { fontSize: 12, color: '#64748B' },

  tipCard: { backgroundColor: '#FFFBEB', padding: 16, borderRadius: 16, marginTop: 10, borderWidth: 1, borderColor: '#FEF3C7' },
  tipTitle: { fontSize: 14, fontWeight: '700', color: '#92400E', marginLeft: 8 },
  tipText: { fontSize: 13, color: '#92400E', lineHeight: 18, marginTop: 4 }
});