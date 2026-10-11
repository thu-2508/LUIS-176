import { 
  Question, 
  StudentProfile, 
  MistakeEntry, 
  TestSubmission, 
  Certificate, 
  EssaySubmission,
  LearningTask,
  ReviewStatus 
} from '../types';
import { INITIAL_QUESTIONS } from '../data/sourceQuestions';

const STORAGE_KEYS = {
  QUESTIONS: 'vn8_questions_v1',
  PROFILE: 'vn8_student_profile_v1',
  MISTAKES: 'vn8_mistakes_v1',
  SUBMISSIONS: 'vn8_test_submissions_v1',
  CERTIFICATES: 'vn8_certificates_v1',
  ESSAYS: 'vn8_essays_v1',
  TASKS: 'vn8_tasks_v1',
  CURRENT_TEST_SESSION: 'vn8_active_test_session_v1'
};

// ==========================================
// QUESTIONS REPOSITORY
// ==========================================

export function getQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(INITIAL_QUESTIONS));
      return INITIAL_QUESTIONS;
    }
    const parsed: Question[] = JSON.parse(raw);
    if (!Array.isArray(parsed)) return INITIAL_QUESTIONS;

    // Merge or update options for pronunciation questions
    const map = new Map<string, Question>(parsed.map(q => [q.id, q]));
    INITIAL_QUESTIONS.forEach(initQ => {
      if (!map.has(initQ.id)) {
        map.set(initQ.id, initQ);
      } else {
        const existing = map.get(initQ.id)!;
        if (initQ.skill === 'pronunciation' && initQ.options) {
          existing.options = initQ.options;
          existing.underlinedPart = initQ.underlinedPart;
          existing.prompt = initQ.prompt;
        }
      }
    });

    const result = Array.from(map.values());
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(result));
    return result;
  } catch (err) {
    console.error('Error loading questions from storage, falling back to initial data', err);
    return INITIAL_QUESTIONS;
  }
}

export function saveQuestions(questions: Question[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  } catch (err) {
    console.error('Error saving questions to storage', err);
  }
}

export function updateQuestionStatus(id: string, newStatus: ReviewStatus, notes?: string): Question[] {
  const all = getQuestions();
  const updated = all.map(q => {
    if (q.id === id) {
      return {
        ...q,
        reviewStatus: newStatus,
        version: q.version + 1,
        reviewNote: notes !== undefined ? notes : q.reviewNote
      };
    }
    return q;
  });
  saveQuestions(updated);
  return updated;
}

export function updateQuestion(updatedQ: Question): Question[] {
  const all = getQuestions();
  const index = all.findIndex(q => q.id === updatedQ.id);
  if (index !== -1) {
    all[index] = { ...updatedQ, version: updatedQ.version + 1 };
  } else {
    all.push(updatedQ);
  }
  saveQuestions(all);
  return all;
}

export function bulkApproveQuestions(ids: string[]): Question[] {
  const all = getQuestions();
  const idSet = new Set(ids);
  const updated = all.map(q => {
    if (idSet.has(q.id)) {
      return {
        ...q,
        reviewStatus: 'da_duyet' as ReviewStatus,
        version: q.version + 1
      };
    }
    return q;
  });
  saveQuestions(updated);
  return updated;
}

// ==========================================
// STUDENT PROFILE
// ==========================================

const DEFAULT_PROFILE: StudentProfile = {
  name: 'Học sinh Lớp 8',
  studentClass: '8A1',
  fontSize: 'normal',
  currentStreak: 1,
  totalStudyMinutes: 25,
  diagnosticCompleted: false
};

export function getStudentProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
      return DEFAULT_PROFILE;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_PROFILE;
  }
}

export function saveStudentProfile(profile: StudentProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile', e);
  }
}

// ==========================================
// MISTAKE NOTEBOOK (SỔ LỖI SAI)
// ==========================================

export function getMistakes(): MistakeEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MISTAKES);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function addMistake(entry: Omit<MistakeEntry, 'id' | 'createdAt' | 'reviewSchedule' | 'resolved'>): MistakeEntry {
  const all = getMistakes();
  // Don't duplicate exact same mistake if still unresolved
  const existing = all.find(m => m.questionId === entry.questionId && !m.resolved);
  if (existing) {
    existing.studentAnswer = entry.studentAnswer;
    saveMistakes(all);
    return existing;
  }

  const newEntry: MistakeEntry = {
    ...entry,
    id: `mistake_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    reviewSchedule: {
      day1: false,
      day3: false,
      day7: false
    },
    resolved: false
  };

  all.unshift(newEntry);
  saveMistakes(all);
  return newEntry;
}

export function saveMistakes(mistakes: MistakeEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
  } catch (e) {
    console.error('Failed to save mistakes', e);
  }
}

export function saveMistake(entry: MistakeEntry): void {
  const all = getMistakes();
  const idx = all.findIndex(m => m.id === entry.id);
  if (idx >= 0) {
    all[idx] = entry;
  } else {
    all.unshift(entry);
  }
  saveMistakes(all);
}

export function resolveMistake(id: string): void {
  const all = getMistakes();
  const target = all.find(m => m.id === id);
  if (target) {
    target.resolved = true;
    target.lastReviewedAt = new Date().toISOString();
    saveMistakes(all);
  }
}

// ==========================================
// SUBMISSIONS & CERTIFICATES
// ==========================================

export function getSubmissions(): TestSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveSubmission(submission: TestSubmission): void {
  try {
    const all = getSubmissions();
    all.unshift(submission);
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(all));
  } catch (e) {
    console.error('Failed to save submission', e);
  }
}

export function getCertificates(): Certificate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveCertificate(certificate: Certificate): void {
  try {
    const all = getCertificates();
    all.unshift(certificate);
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(all));
  } catch (e) {
    console.error('Failed to save certificate', e);
  }
}

// ==========================================
// ESSAYS
// ==========================================

export function getEssays(): EssaySubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ESSAYS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveEssay(essay: EssaySubmission): void {
  try {
    const all = getEssays();
    const idx = all.findIndex(e => e.id === essay.id);
    if (idx !== -1) {
      all[idx] = essay;
    } else {
      all.unshift(essay);
    }
    localStorage.setItem(STORAGE_KEYS.ESSAYS, JSON.stringify(all));
  } catch (e) {
    console.error('Failed to save essay', e);
  }
}

// ==========================================
// LEARNING TASKS
// ==========================================

export function getDailyTasks(): LearningTask[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }

  const defaultTasks: LearningTask[] = [
    {
      id: 'task_1',
      title: 'Học lại: Động từ chỉ thích/ghét (fancy, adore, keen on, would like)',
      type: 'review_lesson',
      topic: 'grammar_verbs',
      status: 'pending',
      estimatedMinutes: 10,
      description: 'Nắm vững quy tắc V-ing vs to-V và tránh các lỗi nhầm lẫn giới từ thường gặp.'
    },
    {
      id: 'task_2',
      title: 'Luyện có hướng dẫn: So sánh hơn của trạng từ',
      type: 'guided_practice',
      topic: 'grammar_adverbs',
      status: 'pending',
      estimatedMinutes: 12,
      description: 'Luyện tập phân biệt trạng từ ngắn (faster, earlier) và dài (more fluently).'
    },
    {
      id: 'task_3',
      title: 'Ôn 3 câu sai trong Sổ Lỗi Sai hoặc Tự kiểm tra độc lập',
      type: 'review_mistake',
      topic: 'grammar_compound',
      status: 'pending',
      estimatedMinutes: 10,
      description: 'Rà soát lại quy tắc dấu câu của so, however, therefore, otherwise.'
    }
  ];

  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(defaultTasks));
  return defaultTasks;
}

export function updateDailyTaskStatus(taskId: string, status: 'pending' | 'in_progress' | 'completed'): void {
  const tasks = getDailyTasks();
  const updated = tasks.map(t => t.id === taskId ? { ...t, status } : t);
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(updated));
}

// ==========================================
// EXPORT & BACKUP
// ==========================================

export function exportFullData(): string {
  const data = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    profile: getStudentProfile(),
    questions: getQuestions(),
    mistakes: getMistakes(),
    submissions: getSubmissions(),
    certificates: getCertificates(),
    essays: getEssays()
  };
  return JSON.stringify(data, null, 2);
}

export function importFullData(jsonString: string): { success: boolean; message: string } {
  try {
    const data = JSON.parse(jsonString);
    if (!data.questions || !Array.isArray(data.questions)) {
      return { success: false, message: 'Tệp sao lưu không hợp lệ: thiếu danh mục câu hỏi chuẩn.' };
    }

    if (data.profile) localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(data.profile));
    if (data.questions) localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(data.questions));
    if (data.mistakes) localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(data.mistakes));
    if (data.submissions) localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(data.submissions));
    if (data.certificates) localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(data.certificates));
    if (data.essays) localStorage.setItem(STORAGE_KEYS.ESSAYS, JSON.stringify(data.essays));

    return { success: true, message: 'Khôi phục dữ liệu thành công!' };
  } catch (err: any) {
    return { success: false, message: `Lỗi đọc dữ liệu: ${err?.message || 'Không thể đọc tệp'}` };
  }
}
