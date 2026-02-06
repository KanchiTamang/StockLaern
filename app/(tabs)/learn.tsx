import {
  Award,
  BookOpen,
  CheckCircle,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  Info,
  PieChart,
  Play,
  Shield,
  TrendingUp,
  X,
  XCircle
} from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

let WebView: any = null;
try {
  WebView = require('react-native-webview').WebView;
} catch (e) {
  console.warn('WebView not available', e);
}
function getYouTubeEmbedUrl(url: string): string {
  if (!url) return '';

  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${id}?controls=1&playsinline=1`;
  }
  if (url.includes('watch?v=')) {
    const id = url.split('watch?v=')[1].split('&')[0];
    return `https://www.youtube.com/embed/${id}?controls=1&playsinline=1`;
  }

  return url;
}

// Enhanced lesson structure with videos and MCQs
const lessons = [
  {
    id: 1,
    title: 'What is a Stock?',
    icon: TrendingUp,
    color: '#10B981',
    duration: '5 min',
    content: 'A stock represents ownership in a company. When you buy a stock, you become a shareholder and own a piece of that company\'s future. Stocks are traded on stock exchanges like NEPSE, and their prices fluctuate based on supply and demand.',
    videoUrl: 'https://youtu.be/geLITYNA9tE', // Sample YouTube URL
    mcqs: [
      {
        question: 'What does owning a stock mean?',
        options: [
          'You own a piece of the company',
          'You are a creditor to the company',
          'You work for the company',
          'You have a loan from the company'
        ],
        correctAnswer: 0,
        explanation: 'When you buy a stock, you become a shareholder and own a portion of that company.'
      },
      {
        question: 'Where are stocks traded in Nepal?',
        options: [
          'NEPSE',
          'Kathmandu Stock Market',
          'Nepal Bank',
          'SEBON'
        ],
        correctAnswer: 0,
        explanation: 'NEPSE (Nepal Stock Exchange) is the only stock exchange in Nepal where stocks are traded.'
      },
      {
        question: 'What affects stock prices?',
        options: [
          'Supply and demand',
          'Weather conditions',
          'Company location only',
          'Stock color'
        ],
        correctAnswer: 0,
        explanation: 'Stock prices fluctuate based on supply and demand in the market.'
      }
    ]
  },
  {
    id: 2,
    title: 'Understanding NEPSE',
    icon: BookOpen,
    color: '#10B981',
    duration: '6 min',
    content: 'Nepal Stock Exchange (NEPSE) is the only stock exchange in Nepal. It is the marketplace where buyers and sellers trade shares of listed companies. NEPSE provides a platform for companies to raise capital and for investors to buy and sell securities.',
    videoUrl: 'https://www.youtube.com/watch?v=ZCFkWDdmXG8',
    mcqs: [
      {
        question: 'What does NEPSE stand for?',
        options: [
          'Nepal Stock Exchange',
          'Nepal Securities Exchange',
          'Nepal Stock Education',
          'Nepal Securities Education'
        ],
        correctAnswer: 0,
        explanation: 'NEPSE stands for Nepal Stock Exchange, the only stock exchange in Nepal.'
      },
      {
        question: 'What is the main function of NEPSE?',
        options: [
          'Facilitate trading of stocks',
          'Print money',
          'Manage banks',
          'Regulate companies'
        ],
        correctAnswer: 0,
        explanation: 'NEPSE facilitates the trading of stocks and securities between buyers and sellers.'
      }
    ]
  },
  {
    id: 3,
    title: 'Risk & Diversification',
    icon: Shield,
    color: '#10B981',
    duration: '7 min',
    content: 'Diversification means spreading your investments across different sectors (like Banking, Hydro, and Hotels) to reduce the impact of any single stock performing poorly. This helps manage risk and protect your portfolio from significant losses.',
    videoUrl: 'https://www.youtube.com/watch?v=F8yRu2T3O0E',
    mcqs: [
      {
        question: 'What is diversification?',
        options: [
          'Spreading investments across different sectors',
          'Putting all money in one stock',
          'Avoiding investments',
          'Only investing in banks'
        ],
        correctAnswer: 0,
        explanation: 'Diversification means spreading investments across different sectors to reduce risk.'
      },
      {
        question: 'Why is diversification important?',
        options: [
          'To reduce risk',
          'To increase risk',
          'To avoid all investments',
          'To only invest in one company'
        ],
        correctAnswer: 0,
        explanation: 'Diversification helps reduce risk by not putting all your money in one place.'
      }
    ]
  },
  {
    id: 4,
    title: 'Reading Market Data',
    icon: PieChart,
    color: '#10B981',
    duration: '8 min',
    content: 'Learn to interpret key metrics: Price (current cost), Volume (total shares traded today), and Market Cap (total value of the company). Understanding these metrics helps you make informed investment decisions.',
    videoUrl: 'https://www.youtube.com/watch?v=ZCFkWDdmXG8',
    mcqs: [
      {
        question: 'What does "Volume" represent?',
        options: [
          'Total shares traded',
          'Stock price',
          'Company name',
          'Market location'
        ],
        correctAnswer: 0,
        explanation: 'Volume represents the total number of shares traded in a day.'
      },
      {
        question: 'What is Market Cap?',
        options: [
          'Total value of the company',
          'Stock price only',
          'Number of employees',
          'Company address'
        ],
        correctAnswer: 0,
        explanation: 'Market Cap (Market Capitalization) is the total value of all outstanding shares of a company.'
      }
    ]
  },
];

const externalResources = [
  { title: 'NEPSE Official', url: 'https://www.nepalstock.com', description: 'Live market data and announcements' },
  { title: 'SEBON Website', url: 'https://www.sebon.gov.np', description: 'Regulatory info for Nepali investors' },
  { title: 'Investopedia', url: 'https://www.investopedia.com', description: 'Global stock market encyclopedia' },
];

// MCQ Quiz Component
function MCQQuiz({ questions, onComplete }: { questions: any[], onComplete: (score: number) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  
  const scoreRef = useRef(0);

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    

    if (index === questions[currentQuestion].correctAnswer) {
      scoreRef.current += 1;
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
      setShowResult(false);
    } else {
      // This shouldn't be reached as handleFinish is called for last question
      onComplete(scoreRef.current);
    }
  };

  const handleFinish = () => {
    // Use ref to get the most up-to-date score value
    onComplete(scoreRef.current);
  };

  if (currentQuestion >= questions.length) {
    return null;
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const progress = (score / questions.length) * 100;

  return (
    <View style={styles.quizContainer}>
      <View style={styles.quizHeader}>
        <Text style={styles.quizTitle}>Quiz: Question {currentQuestion + 1}/{questions.length} | Correct: {score}</Text>
        <View style={styles.quizProgressBar}>
          <View style={[styles.quizProgressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <Text style={styles.questionText}>{question.question}</Text>

      {question.options.map((option: string, index: number) => {
        const isSelected = selectedAnswer === index;
        const isCorrectOption = index === question.correctAnswer;
        const showCorrect = answered && isCorrectOption;
        const showIncorrect = answered && isSelected && !isCorrect;

        const optionStyle = [
          styles.option,
          showCorrect && styles.optionCorrect,
          showIncorrect && styles.optionIncorrect,
        ];
        const textStyle = [
          styles.optionText,
          showCorrect && styles.optionTextCorrect,
          showIncorrect && styles.optionTextIncorrect,
        ];

        return (
          <TouchableOpacity
            key={index}
            style={optionStyle}
            onPress={() => handleAnswer(index)}
            disabled={answered}
          >
            <Text style={textStyle}>{option}</Text>
            {answered && isSelected && (
              isCorrect ? (
                <CheckCircle size={22} color="#7FB069" strokeWidth={2.5} />
              ) : (
                <XCircle size={22} color="#EF4444" strokeWidth={2.5} />
              )
            )}
            {answered && isCorrectOption && !isSelected && (
              <CheckCircle size={22} color="#7FB069" strokeWidth={2.5} />
            )}
          </TouchableOpacity>
        );
      })}

      {answered && (
        <View style={styles.explanationBox}>
          <Text style={styles.explanationText}>{question.explanation}</Text>
        </View>
      )}

      {answered && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={currentQuestion === questions.length - 1 ? handleFinish : handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Detailed Lesson View Component
function LessonDetailView({ lesson, onClose, onComplete, isCompleted }: { lesson: any, onClose: () => void, onComplete: () => void, isCompleted: boolean }) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleWatchVideo = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  const embedUrl = getYouTubeEmbedUrl(lesson.videoUrl);

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setQuizCompleted(true);
    if (score === lesson.mcqs.length) {
      onComplete();
    }
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setQuizScore(null);
    setQuizCompleted(false);
  };

  return (
    <Modal visible={true} animationType="slide" presentationStyle="formSheet">
      <View style={styles.modalContainer}>
        {/* Compact Header */}
        <View style={styles.modalHeaderCompact}>
          <View style={styles.modalHeaderTop}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <View style={[styles.modalIconBoxCompact, { backgroundColor: lesson.color + '20' }]}>
              {React.createElement(lesson.icon, { color: '#fff', size: 20 })}
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={styles.modalTitleCompact}>{lesson.title}</Text>
              {isCompleted && (
                <View style={styles.completedBadgeHeader}>
                  <CheckCircle size={16} color="#7FB069" />
                  <Text style={styles.completedBadgeText}>Completed</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          {/* Video Section */}
          <View style={styles.videoSection}>
            {!showVideo ? (
              <>
                <TouchableOpacity 
                  style={styles.videoPlaceholder}
                  onPress={handleWatchVideo}
                  activeOpacity={0.8}
                >
                  <Play size={32} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.watchVideoButton} onPress={handleWatchVideo}>
                  <Play size={16} color="#fff" />
                  <Text style={styles.watchVideoText}>Watch Video</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.videoContainer}>
                <TouchableOpacity 
                  style={styles.closeVideoButton}
                  onPress={handleCloseVideo}
                >
                  <X size={20} color="#fff" />
                </TouchableOpacity>
            {Platform.OS !== 'web' && embedUrl && (
                  <WebView
                    source={{ uri: embedUrl }}
                    style={styles.videoPlayer}
                    allowsFullscreenVideo
                    mediaPlaybackRequiresUserAction={false}
                    javaScriptEnabled
                    domStorageEnabled
                  />
                )}
                {Platform.OS === 'web' && (
                  <Text style={{ color: '#fff', textAlign: 'center', marginTop: 80 }}>
                    Video player not available on web
                  </Text>
                )}
              </View>
            )}
          </View>

          {/* Content Section */}
          <View style={styles.contentSection}>
            <Text style={styles.contentTitle}>Lesson Content</Text>
            <Text style={styles.contentText}>{lesson.content}</Text>
          </View>

          {/* Quiz Section */}
          {!showQuiz && !quizCompleted && (
            <View style={styles.quizSection}>
              <View style={styles.quizSectionHeader}>
                <HelpCircle size={18} color={lesson.color} />
                <Text style={styles.quizSectionTitle}>Test Your Knowledge</Text>
              </View>
              <Text style={styles.quizSectionDesc}>
                Take a quiz with {lesson.mcqs.length} questions to test your understanding
              </Text>
              <TouchableOpacity style={styles.startQuizButton} onPress={handleStartQuiz}>
                <HelpCircle size={14} color="#fff" />
                <Text style={styles.startQuizButtonText}>Take Quiz</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Quiz Component */}
          {showQuiz && !quizCompleted && (
            <MCQQuiz questions={lesson.mcqs} onComplete={handleQuizComplete} />
          )}

          {/* Quiz Results */}
          {quizCompleted && quizScore !== null && (
            <View style={styles.quizResults}>
              <Award size={48} color={quizScore === lesson.mcqs.length ? "#7FB069" : "#D4A574"} />
              <Text style={styles.resultsTitle}>
                {quizScore === lesson.mcqs.length ? "Perfect Score! 🎉" : "Quiz Completed!"}
              </Text>
              <Text style={styles.resultsScore}>
                You scored {quizScore} out of {lesson.mcqs.length}
              </Text>
              <Text style={styles.resultsPercentage}>
                {Math.round((quizScore / lesson.mcqs.length) * 100)}%
              </Text>
              {quizScore === lesson.mcqs.length && (
                <Text style={styles.congratsText}>Great job! You've mastered this lesson!</Text>
              )}
              <TouchableOpacity style={styles.retakeButton} onPress={handleStartQuiz}>
                <Text style={styles.retakeButtonText}>Retake Quiz</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.completeSection}>
            <TouchableOpacity
              style={styles.completeButton}
              onPress={() => {
                onComplete();
                Alert.alert('Lesson Completed!', 'Great job! You\'ve completed this lesson.', [
                  {
                    text: 'OK',
                    onPress: () => {
                      onClose();
                    }
                  }
                ]);
              }}
            >
              <CheckCircle size={18} color="#fff" />
              <Text style={styles.completeButtonText}>Mark as Complete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.retakeButton, { marginTop: 12 }]}
              onPress={onClose}
            >
              <Text style={styles.retakeButtonText}>Back to Lessons</Text>
            </TouchableOpacity>
            <Text style={styles.completeNote}>
              Click to mark this lesson as completed
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default function LearnScreen() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  const toggleLesson = (lesson: any) => {
    setSelectedLesson(lesson);
  };

  const handleLessonComplete = () => {
    if (selectedLesson && !completedLessons.includes(selectedLesson.id)) {
      setCompletedLessons(prev => [...prev, selectedLesson.id]);
    }
  };

  const progress = (completedLessons.length / lessons.length) * 100;

  const handleOpenURL = (url: string) => {
    Linking.openURL(url).catch((err: any) => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      {/* Dark Blue Header */}
      <View style={styles.blueHeader}>
        <Text style={styles.headerTitle}>Beginner's Guide</Text>
        <Text style={styles.headerSubtitle}>Learn stock market basics with videos & quizzes</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
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

        {/* Completed Lessons Section */}
        {completedLessons.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Completed Lessons</Text>
            {lessons
              .filter(lesson => completedLessons.includes(lesson.id))
              .map((lesson) => {
                const Icon = lesson.icon;
                return (
                  <TouchableOpacity
                    key={lesson.id}
                    onPress={() => toggleLesson(lesson)}
                    style={styles.completedLessonCard}
                  >
                    <View style={styles.lessonHeader}>
                      <View style={[styles.iconBox, { backgroundColor: lesson.color + '20' }]}>
                        <Icon color={lesson.color} size={20} />
                      </View>
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <View style={styles.titleRow}>
                          <Text style={styles.lessonTitle}>{lesson.title}</Text>
                          <CheckCircle size={18} color="#7FB069" />
                        </View>
                        <Text style={styles.lessonContent} numberOfLines={1}>{lesson.content}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </>
        )}

        {/* Lessons Section */}
        <Text style={styles.sectionTitle}>Interactive Lessons</Text>
        {lessons
          .filter(lesson => !completedLessons.includes(lesson.id))
          .map((lesson) => {
            const Icon = lesson.icon;
            return (
              <View key={lesson.id} style={styles.lessonCard}>
                <View style={styles.lessonHeader}>
                  <View style={[styles.iconBox, { backgroundColor: lesson.color + '20' }]}>
                    <Icon color={lesson.color} size={20} />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <View style={styles.titleRow}>
                      <Text style={styles.lessonTitle}>{lesson.title}</Text>
                      <Text style={styles.durationText}>{lesson.duration}</Text>
                    </View>
                    <Text style={styles.lessonContent} numberOfLines={2}>{lesson.content}</Text>
                    <View style={styles.lessonFeatures}>
                      <View style={styles.featureBadge}>
                        <Play size={12} color={lesson.color} />
                        <Text style={[styles.featureText, { color: lesson.color }]}>Video</Text>
                      </View>
                      <View style={styles.featureBadge}>
                        <HelpCircle size={12} color={lesson.color} />
                        <Text style={[styles.featureText, { color: lesson.color }]}>
                          Quiz
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => toggleLesson(lesson)}
                  style={styles.buttonIncomplete}
                >
                  <Text style={styles.buttonTextIncomplete}>
                    Start Learning
                  </Text>
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
              <ExternalLink size={18} color="#7FB069" />
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
          <Text style={styles.tipText}>
            Watch the video first, read the content, then take the quiz to test your knowledge. Complete all lessons to master stock market basics!
          </Text>
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>

      {/* Lesson Detail Modal */}
      {selectedLesson && (
        <LessonDetailView
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
          onComplete={handleLessonComplete}
          isCompleted={completedLessons.includes(selectedLesson.id)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  blueHeader: {
    backgroundColor: '#031D44',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  scrollView: { flex: 1, paddingHorizontal: 16 },
  header: { marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 14, color: '#CBD5E1', marginTop: 4 },

  progressCard: {
    backgroundColor: '#FAFAF5',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
    borderWidth: 1,
    borderColor: '#E8E8E3',
  },
  progressTextContainer: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '600', color: '#1E293B' },
  progressStat: { fontSize: 14, fontWeight: '700', color: '#7FB069' },
  progressBarBg: { backgroundColor: '#F1F5F9', height: 10, borderRadius: 5 },
  progressBarFill: { backgroundColor: '#7FB069', height: 10, borderRadius: 5 },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginBottom: 16, marginTop: 8 },

  lessonCard: {
    backgroundColor: '#FAFAF5',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8E8E3'
  },
  lessonCardCompleted: { borderColor: '#7FB069', backgroundColor: '#F0F7ED' },
  completedLessonCard: {
    backgroundColor: '#F0F7ED',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#7FB069',
  },
  lessonHeader: { flexDirection: 'row', marginBottom: 16 },
  iconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  lessonTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  durationText: { fontSize: 11, color: '#94A3B8', fontWeight: '600' },
  lessonContent: { fontSize: 14, color: '#64748B', lineHeight: 20, marginBottom: 8 },
  lessonFeatures: { flexDirection: 'row', gap: 8, marginTop: 4 },
  featureBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  featureText: { fontSize: 11, fontWeight: '600' },

  button: { paddingVertical: 12, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  buttonIncomplete: {
    backgroundColor: '#70A288',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 2,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCompleted: { backgroundColor: '#E0EDD8' },
  buttonText: { fontWeight: '700', fontSize: 15 },
  buttonTextIncomplete: { color: '#fff', fontSize: 15 },
  buttonTextCompleted: { color: '#6A9A5A' },

  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  resourceIconBox: { backgroundColor: '#F0F7ED', padding: 8, borderRadius: 10 },
  resourceTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  resourceDesc: { fontSize: 12, color: '#64748B' },

  tipCard: { backgroundColor: '#F5F0E8', padding: 16, borderRadius: 16, marginTop: 10, borderWidth: 1, borderColor: '#E8DCC8' },
  tipTitle: { fontSize: 14, fontWeight: '700', color: '#92400E', marginLeft: 8 },
  tipText: { fontSize: 13, color: '#92400E', lineHeight: 18, marginTop: 4 },

  // Modal Styles
  modalContainer: { flex: 1, backgroundColor: '#F8FAFC' },
  modalContent: { flex: 1, paddingHorizontal: 16 },
  modalHeader: { marginTop: 40, marginBottom: 20, alignItems: 'center' },
  modalHeaderCompact: {
    backgroundColor: '#031D44',
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E3A5F',
  },
  modalHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  closeButton: { padding: 4 },
  closeButtonText: { fontSize: 22, color: '#fff', fontWeight: '600' },
  modalIconBox: { width: 60, height: 60, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  modalIconBoxCompact: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTitle: { fontSize: 24, fontWeight: '800', color: '#1E293B', textAlign: 'center' },
  modalTitleCompact: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  completedBadgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0F7ED',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#7FB069',
  },
  completedBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6A9A5A',
  },

  // Video Section
  videoSection: { marginTop: 16, marginBottom: 20 },
  videoPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  videoContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
    position: 'relative',
    marginBottom: 12
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000'
  },
  closeVideoButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  watchVideoButton: {
    backgroundColor: '#70A288',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
  },
  watchVideoText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  // Content Section
  contentSection: {
    marginBottom: 20,
    backgroundColor: '#FAFAF5',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E3',
  },
  contentTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 10 },
  contentText: { fontSize: 14, color: '#64748B', lineHeight: 22 },

  // Quiz Section
  quizSection: {
    backgroundColor: '#FAFAF5',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E8E8E3'
  },
  quizSectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  quizSectionTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  quizSectionDesc: { fontSize: 12, color: '#64748B', marginBottom: 10, lineHeight: 18 },
  startQuizButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#7FB069',
  },
  startQuizButtonText: { color: '#fff', fontWeight: '600', fontSize: 13 },

  // MCQ Quiz Styles
  quizContainer: {
    backgroundColor: '#FAFAF5',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E8E8E3'
  },
  quizHeader: { marginBottom: 20 },
  quizTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 8 },
  quizProgressBar: { backgroundColor: '#F1F5F9', height: 6, borderRadius: 3, overflow: 'hidden' },
  quizProgressFill: { backgroundColor: '#70A288', height: 6, borderRadius: 3 },
  questionText: { fontSize: 18, fontWeight: '700', color: '#1E293B', marginBottom: 20, lineHeight: 26 },
  option: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  optionCorrect: { backgroundColor: '#F0F7ED', borderColor: '#70A288' },
  optionIncorrect: { backgroundColor: '#FEF2F2', borderColor: '#EF4444' },
  optionText: { fontSize: 15, color: '#1E293B', flex: 1 },
  optionTextCorrect: { color: '#6A9A5A', fontWeight: '600' },
  optionTextIncorrect: { color: '#EF4444', fontWeight: '600' },
  explanationBox: {
    backgroundColor: '#F0F7ED',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#70A288'
  },
  explanationText: { fontSize: 14, color: '#5A7A4F', lineHeight: 20 },
  nextButton: {
    backgroundColor: '#7FB069',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center'
  },
  nextButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  // Quiz Results
  quizResults: {
    backgroundColor: '#FAFAF5',
    padding: 32,
    borderRadius: 16,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E3'
  },
  resultsTitle: { fontSize: 24, fontWeight: '800', color: '#1E293B', marginTop: 16, marginBottom: 8 },
  resultsScore: { fontSize: 16, color: '#64748B', marginBottom: 8 },
  resultsPercentage: { fontSize: 48, fontWeight: '800', color: '#70A288', marginBottom: 8 },
  congratsText: { fontSize: 14, color: '#6A9A5A', fontWeight: '600', marginTop: 8, textAlign: 'center' },
  retakeButton: {
    backgroundColor: '#F1F5F9',
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    paddingHorizontal: 24
  },
  retakeButtonText: { color: '#64748B', fontWeight: '700', fontSize: 14 },

  // Complete Section
  completeSection: {
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 10,
    gap: 8,
    elevation: 2,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#04395E',
  },
  completeButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  completeNote: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 6,
  },
});
