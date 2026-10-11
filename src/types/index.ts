export type TopicType = 'unit1_leisure' | 'unit2_countryside' | 'unit3_teenagers' | 'grammar_verbs' | 'grammar_adverbs' | 'grammar_compound' | 'pronunciation' | 'communication' | 'reading' | 'writing';

export type SkillType = 
  | 'vocabulary' 
  | 'grammar' 
  | 'pronunciation' 
  | 'communication' 
  | 'reading' 
  | 'writing_error' 
  | 'writing_transformation' 
  | 'writing_essay'
  | 'listening';

export type DifficultyLevel = 'nhan_biet' | 'thong_hieu' | 'van_dung';

export type QuestionType = 
  | 'multiple_choice' 
  | 'fill_in_blank' 
  | 'error_identification' 
  | 'sentence_transformation' 
  | 'sentence_ordering' 
  | 'reading_comprehension' 
  | 'sign_notice';

export type OriginType = 'trich_nguyen_ban' | 'nguon_da_chinh_sua' | 'luyen_tap_bo_sung';

export type ReviewStatus = 'cho_duyet' | 'can_kiem_tra' | 'da_duyet' | 'luu_tru';

export interface QuestionOption {
  id: string; // 'A', 'B', 'C', 'D'
  text: string;
  underlinedPart?: string; // For pronunciation or error identification
}

export interface Question {
  id: string;
  version: number;
  topic: TopicType;
  topicTitle: string;
  skill: SkillType;
  level: DifficultyLevel;
  type: QuestionType;
  prompt: string;
  underlinedPart?: string; // specifically highlighted part for pronunciation/stress
  options?: QuestionOption[];
  answer: string; // Correct answer code (e.g. 'A', or text)
  acceptedAnswers?: string[]; // Alternative accepted answers for written forms
  points: number;
  hint1: string; // Recognition clue / rule
  hint2: string; // Step-by-step guidance
  explanation: string; // Full explanation in clear Vietnamese
  sourceReference: string; // Location in source doc
  originType: OriginType;
  reviewStatus: ReviewStatus;
  reviewNote?: string; // Flag why this needs checking (e.g. câu 16 thừa for, câu 18 lặp so, etc.)
  suggestedRevision?: string;
  passageId?: string;
  mediaId?: string; // SVG or image sign
  equivalentGroupId?: string;
  caseSensitive?: boolean;
}

export interface ReadingPassage {
  id: string;
  title: string;
  topic: TopicType;
  content: string;
  vietnameseSummary?: string;
  wordCount: number;
  questionIds: string[];
}

export interface SignNoticeItem {
  id: string;
  title: string;
  signType: 'keep_off_grass' | 'no_phones' | 'clean_up_notice';
  headline: string;
  subtext: string;
  context: string;
  questionId: string;
}

export interface MiniLesson {
  id: string;
  topic: TopicType;
  title: string;
  englishTitle: string;
  coreRule: string; // Em cần nhớ
  examples: {
    english: string;
    vietnamese: string;
    note?: string;
  }[];
  steps: string[]; // Các bước làm bài
  commonMistakes: {
    wrong: string;
    right: string;
    reason: string;
  }[];
  quickCheckQuestion: Question;
}

export interface MistakeEntry {
  id: string;
  questionId: string;
  questionPrompt: string;
  topic: TopicType;
  skill: SkillType;
  studentAnswer: string;
  correctAnswer: string;
  explanation: string;
  userReason?: string; // Nguyên nhân học sinh tự nhận diện: quên từ vựng, nhầm dấu câu, chưa thuộc cấu trúc...
  createdAt: string;
  reviewSchedule: {
    day1: boolean;
    day3: boolean;
    day7: boolean;
  };
  lastReviewedAt?: string;
  resolved: boolean;
}

export interface LearningTask {
  id: string;
  title: string;
  type: 'review_lesson' | 'guided_practice' | 'independent_test' | 'review_mistake' | 'reading' | 'writing';
  topic: TopicType;
  status: 'pending' | 'in_progress' | 'completed';
  estimatedMinutes: number;
  description: string;
}

export interface StudentProfile {
  name: string;
  studentClass: string;
  fontSize: 'normal' | 'large' | 'extra-large';
  currentStreak: number;
  totalStudyMinutes: number;
  diagnosticCompleted: boolean;
  diagnosticScore?: number;
}

export interface TestSubmission {
  id: string;
  testType: 'diagnostic' | 'independent' | 'mock_exam';
  title: string;
  createdAt: string;
  totalQuestions: number;
  correctCount: number;
  totalScore: number;
  maxScore: number;
  percentage: number;
  timeSpentSeconds: number;
  answers: Record<string, string>; // questionId -> answer
  firstTryCorrectCount: number;
  guidedHelpCorrectCount: number;
  hasCertificate: boolean;
  certificateId?: string;
}

export interface Certificate {
  id: string;
  testSubmissionId: string;
  studentName: string;
  studentClass: string;
  testTitle: string;
  percentage: number;
  correctCount: number;
  totalQuestions: number;
  issuedAt: string;
  teacherName: string; // VŨ THỊ MAI THU
  schoolName: string; // THCS SÔNG ĐÀ - PH HỮU NGHỊ
  feedbackComment: string; // Nhận xét sư phạm ngắn gọn, phù hợp với kết quả
  qrVerificationCode: string;
}

export interface EssaySubmission {
  id: string;
  promptTopic: string;
  topicTitle: string;
  studentContent: string;
  wordCount: number;
  submittedAt: string;
  status: 'pending' | 'graded';
  teacherScore?: number; // thang 10
  teacherFeedback?: string;
  rubricScores?: {
    taskResponse: number; // 0 - 2.5
    coherence: number; // 0 - 2.5
    vocabulary: number; // 0 - 2.5
    grammar: number; // 0 - 2.5
  };
}
