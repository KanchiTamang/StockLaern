import {
  BookOpen,
  CheckCircle,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const lessons = [
  { id: 1, title: 'What is Stock Market?', duration: '3 min read', content: 'The stock market is a platform where buyers and sellers trade shares of publicly listed companies. In Nepal, NEPSE (Nepal Stock Exchange) is the primary stock exchange.' },
  { id: 2, title: 'Understanding NEPSE', duration: '4 min read', content: 'NEPSE Index represents the overall market performance. It tracks the price movements of all listed companies.' },
  { id: 3, title: 'What are Shares?', duration: '3 min read', content: 'Shares represent ownership in a company. When you buy shares, you become a part-owner.' },
  { id: 4, title: 'Commercial Banks Sector', duration: '5 min read', content: 'Commercial banks are one of the most actively traded sectors in NEPSE.' },
  { id: 5, title: 'Reading Market Data', duration: '4 min read', content: 'Learn to interpret key metrics: Price (current stock price), Volume (shares traded), and LTP (Last Traded Price).' },
  { id: 6, title: 'Risk Management Basics', duration: '5 min read', content: 'Never invest more than you can afford to lose. Diversify your portfolio across different sectors to minimize risk.' },
];

export default function LearnScreen() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const toggleLesson = (id: number) => {
    setCompletedLessons(prev => 
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  const progress = (completedLessons.length / lessons.length) * 100;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Beginner's Guide</Text>
        <Text style={styles.headerSubtitle}>{completedLessons.length}/{lessons.length} lessons completed</Text>
      </View>

      {/* Progress Card */}
      <View style={styles.progressCard}>
        <View style={styles.progressIconContainer}>
          <BookOpen color="#FFF" size={28} />
        </View>
        <View style={styles.progressTextContainer}>
          <Text style={styles.cardTitle}>Your Progress</Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Micro Lessons</Text>

      {/* Lesson Cards */}
      {lessons.map((lesson) => (
        <View 
          key={lesson.id} 
          style={[
            styles.lessonCard, 
            completedLessons.includes(lesson.id) && styles.lessonCardCompleted
          ]}
        >
          <View style={styles.lessonHeader}>
            <View style={{ flex: 1 }}>
              <View style={styles.titleRow}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                {completedLessons.includes(lesson.id) && (
                  <CheckCircle size={18} color="#10B981" />
                )}
              </View>
              <Text style={styles.durationText}>{lesson.duration}</Text>
            </View>
          </View>
          
          <Text style={styles.lessonContent}>{lesson.content}</Text>

          <TouchableOpacity 
            onPress={() => toggleLesson(lesson.id)}
            activeOpacity={0.7}
            style={[
              styles.button, 
              completedLessons.includes(lesson.id) ? styles.buttonCompleted : styles.buttonIncomplete
            ]}
          >
            <Text style={[
              styles.buttonText, 
              completedLessons.includes(lesson.id) ? styles.buttonTextCompleted : styles.buttonTextIncomplete
            ]}>
              {completedLessons.includes(lesson.id) ? '✓ Completed' : 'Mark as Complete'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
      
      {/* Bottom Padding for scroll breathing room */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8FAFC', 
    paddingHorizontal: 16 
  },
  header: { 
    marginTop: 60, 
    marginBottom: 24 
  },
  headerTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#1E293B' 
  },
  headerSubtitle: { 
    fontSize: 14, 
    color: '#64748B', 
    marginTop: 4 
  },
  progressCard: { 
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    padding: 20, 
    flexDirection: 'row', 
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    // Elevation for Android
    elevation: 3,
  },
  progressIconContainer: { 
    width: 56, 
    height: 56, 
    backgroundColor: '#8B5CF6', 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  progressTextContainer: { 
    flex: 1, 
    marginLeft: 16 
  },
  cardTitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#1E293B', 
    marginBottom: 8 
  },
  progressBarBg: { 
    backgroundColor: '#F1F5F9', 
    height: 8, 
    borderRadius: 4 
  },
  progressBarFill: { 
    backgroundColor: '#8B5CF6', 
    height: 8, 
    borderRadius: 4 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1E293B', 
    marginTop: 32, 
    marginBottom: 16 
  },
  lessonCard: { 
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    padding: 20, 
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#F1F5F9'
  },
  lessonCardCompleted: { 
    borderColor: '#A7F3D0', 
    backgroundColor: '#F0FDF4' 
  },
  lessonHeader: { 
    flexDirection: 'row', 
    marginBottom: 12 
  },
  titleRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8 
  },
  lessonTitle: { 
    fontSize: 17, 
    fontWeight: '700', 
    color: '#1E293B' 
  },
  durationText: { 
    fontSize: 12, 
    color: '#94A3B8', 
    marginTop: 2 
  },
  lessonContent: { 
    fontSize: 15, 
    color: '#475569', 
    lineHeight: 22, 
    marginBottom: 20 
  },
  button: { 
    paddingVertical: 14, 
    borderRadius: 14, 
    alignItems: 'center' 
  },
  buttonIncomplete: { 
    backgroundColor: '#EFF6FF' 
  },
  buttonCompleted: { 
    backgroundColor: '#DCFCE7' 
  },
  buttonText: { 
    fontWeight: '700', 
    fontSize: 14 
  },
  buttonTextIncomplete: { 
    color: '#3B82F6' 
  },
  buttonTextCompleted: { 
    color: '#10B981' 
  },
});