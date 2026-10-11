import React, { useState, useEffect } from 'react';
import { 
  getQuestions, 
  getStudentProfile, 
  saveStudentProfile, 
  getMistakes, 
  getSubmissions, 
  getCertificates, 
  getDailyTasks,
  saveSubmission,
  saveCertificate
} from './services/storageService';
import { 
  Question, 
  StudentProfile, 
  MistakeEntry, 
  TestSubmission, 
  Certificate, 
  LearningTask 
} from './types';
import { Navbar } from './components/Navbar';
import { CertificateModal } from './components/CertificateModal';

// Student Components
import { StudentHome } from './components/student/StudentHome';
import { DiagnosticTest } from './components/student/DiagnosticTest';
import { TodayPath } from './components/student/TodayPath';
import { MiniLessonView } from './components/student/MiniLessonView';
import { GuidedPractice } from './components/student/GuidedPractice';
import { IndependentTest } from './components/student/IndependentTest';
import { ReadingCommView } from './components/student/ReadingCommView';
import { WritingPracticeView } from './components/student/WritingPracticeView';
import { ListeningView } from './components/student/ListeningView';
import { MockExamView } from './components/student/MockExamView';
import { MistakeNotebookView } from './components/student/MistakeNotebookView';
import { ProgressView } from './components/student/ProgressView';
import { StudentGuideView } from './components/student/StudentGuideView';
import { CertificateListView } from './components/student/CertificateListView';

// Teacher Components
import { SourceReviewView } from './components/teacher/SourceReviewView';
import { QuestionBankView } from './components/teacher/QuestionBankView';
import { MediaPassagesView } from './components/teacher/MediaPassagesView';
import { LessonManagerView } from './components/teacher/LessonManagerView';
import { EssayGradingView } from './components/teacher/EssayGradingView';
import { ClassReportView } from './components/teacher/ClassReportView';
import { BackupRestoreView } from './components/teacher/BackupRestoreView';

export default function App() {
  const [userRole, setUserRole] = useState<'student' | 'teacher'>('student');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'extra-large'>('normal');

  // Core Data States
  const [questions, setQuestions] = useState<Question[]>(getQuestions());
  const [profile, setProfile] = useState<StudentProfile>(getStudentProfile());
  const [mistakes, setMistakes] = useState<MistakeEntry[]>(getMistakes());
  const [submissions, setSubmissions] = useState<TestSubmission[]>(getSubmissions());
  const [certificates, setCertificates] = useState<Certificate[]>(getCertificates());
  const [tasks, setTasks] = useState<LearningTask[]>(getDailyTasks());

  // Certificate Modal State
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  // Profile Edit modal
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editClass, setEditClass] = useState(profile.studentClass);

  const reloadAllData = () => {
    setQuestions(getQuestions());
    setProfile(getStudentProfile());
    setMistakes(getMistakes());
    setSubmissions(getSubmissions());
    setCertificates(getCertificates());
    setTasks(getDailyTasks());
  };

  const handleToggleRole = () => {
    if (userRole === 'student') {
      setUserRole('teacher');
      setCurrentTab('source_review');
    } else {
      setUserRole('student');
      setCurrentTab('dashboard');
    }
  };

  const handleSaveSubmission = (sub: TestSubmission) => {
    saveSubmission(sub);
    setSubmissions(getSubmissions());
  };

  const handleCertificateIssued = (cert: Certificate) => {
    saveCertificate(cert);
    setCertificates(getCertificates());
    setActiveCert(cert); // Automatically open the certificate popup!
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...profile,
      name: editName.trim() || 'Học sinh Tiếng Anh 8',
      studentClass: editClass.trim() || '8A'
    };
    saveStudentProfile(updated);
    setProfile(updated);
    setIsEditingProfile(false);
  };

  // Font size multiplier class
  const fontSizeClass = fontSize === 'large' 
    ? 'text-[17px]' 
    : fontSize === 'extra-large' 
    ? 'text-[19px]' 
    : 'text-[15px]';

  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col ${fontSizeClass}`}>
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        userRole={userRole}
        onToggleRole={handleToggleRole}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        certificatesCount={certificates.length}
        onOpenCertificates={() => {
          if (userRole === 'teacher') {
            setUserRole('student');
          }
          setCurrentTab('certificates_list');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Profile Tag (Student mode) */}
        {userRole === 'student' && currentTab !== 'dashboard' && (
          <div className="mb-4 flex items-center justify-between bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-slate-500">Đang học:</span>
              <span className="font-bold text-slate-900">{profile.name} (Lớp {profile.studentClass})</span>
            </div>
            <button
              onClick={() => {
                setEditName(profile.name);
                setEditClass(profile.studentClass);
                setIsEditingProfile(true);
              }}
              className="text-blue-700 hover:underline font-semibold"
            >
              Đổi tên/lớp
            </button>
          </div>
        )}

        {/* STUDENT VIEWS */}
        {userRole === 'student' && (
          <>
            {currentTab === 'dashboard' && (
              <StudentHome
                profile={profile}
                tasks={tasks}
                certificates={certificates}
                mistakes={mistakes}
                onSelectTab={setCurrentTab}
                onOpenCertificates={() => setCurrentTab('certificates_list')}
              />
            )}

            {currentTab === 'today_path' && (
              <TodayPath
                tasks={tasks}
                onTasksUpdated={setTasks}
                onNavigate={setCurrentTab}
              />
            )}

            {currentTab === 'diagnostic' && (
              <DiagnosticTest
                questions={questions}
                profile={profile}
                onSaveSubmission={handleSaveSubmission}
                onCertificateIssued={handleCertificateIssued}
                onNavigateToLesson={() => setCurrentTab('lessons')}
              />
            )}

            {currentTab === 'lessons' && (
              <MiniLessonView
                onStartPractice={(topicId) => {
                  setCurrentTab('practice');
                }}
              />
            )}

            {currentTab === 'practice' && (
              <GuidedPractice
                questions={questions}
                onNavigateToIndependent={(t) => setCurrentTab('independent')}
              />
            )}

            {currentTab === 'independent' && (
              <IndependentTest
                questions={questions}
                profile={profile}
                onSaveSubmission={handleSaveSubmission}
                onCertificateIssued={handleCertificateIssued}
              />
            )}

            {currentTab === 'reading_comm' && (
              <ReadingCommView questions={questions} />
            )}

            {currentTab === 'writing' && (
              <WritingPracticeView
                questions={questions}
                studentName={profile.name}
              />
            )}

            {currentTab === 'listening' && (
              <ListeningView 
                profile={profile}
                onSaveSubmission={handleSaveSubmission}
                onCertificateIssued={handleCertificateIssued}
              />
            )}

            {currentTab === 'mock_exam' && (
              <MockExamView
                questions={questions}
                profile={profile}
                onSaveSubmission={handleSaveSubmission}
                onCertificateIssued={handleCertificateIssued}
                onOpenCertificates={() => setCurrentTab('certificates_list')}
              />
            )}

            {currentTab === 'mistakes' && (
              <MistakeNotebookView
                mistakes={mistakes}
                onMistakesUpdated={setMistakes}
              />
            )}

            {currentTab === 'progress' && (
              <ProgressView
                profile={profile}
                submissions={submissions}
                certificates={certificates}
                mistakes={mistakes}
                onOpenCertificate={setActiveCert}
              />
            )}

            {currentTab === 'guide' && (
              <StudentGuideView />
            )}

            {currentTab === 'certificates_list' && (
              <CertificateListView
                certificates={certificates}
                onOpenCertificate={setActiveCert}
                onNavigateToExam={() => setCurrentTab('mock_exam')}
              />
            )}
          </>
        )}

        {/* TEACHER VIEWS */}
        {userRole === 'teacher' && (
          <>
            {currentTab === 'source_review' && (
              <SourceReviewView
                questions={questions}
                onQuestionsUpdated={setQuestions}
              />
            )}

            {currentTab === 'question_bank' && (
              <QuestionBankView
                questions={questions}
                onQuestionsUpdated={setQuestions}
              />
            )}

            {currentTab === 'media_passages' && (
              <MediaPassagesView />
            )}

            {currentTab === 'lesson_manager' && (
              <LessonManagerView />
            )}

            {currentTab === 'essay_grading' && (
              <EssayGradingView />
            )}

            {currentTab === 'class_report' && (
              <ClassReportView
                submissions={submissions}
                certificates={certificates}
                mistakes={mistakes}
                questions={questions}
              />
            )}

            {currentTab === 'backup_restore' && (
              <BackupRestoreView onDataReloaded={reloadAllData} />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 border-t border-slate-800 text-xs text-center print:hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-bold text-slate-200">
            VỮNG NỀN TIẾNG ANH 8 • Ôn tập giữa học kì I – Năm học 2026–2027
          </p>
          <p>
            Giáo viên phụ trách: <strong className="text-white">VŨ THỊ MAI THU – THCS SÔNG ĐÀ – PH HỮU NGHỊ</strong>
          </p>
          <p className="text-slate-500 italic">
            “Học từng bước – Vững kiến thức – Tự tin làm bài”
          </p>
        </div>
      </footer>

      {/* Certificate Modal */}
      {activeCert && (
        <CertificateModal
          certificate={activeCert}
          onClose={() => setActiveCert(null)}
        />
      )}

      {/* Profile Edit Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900">
              Thông Tin Học Sinh
            </h3>
            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Họ và tên học sinh:</label>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-sm"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Lớp:</label>
                <input
                  type="text"
                  value={editClass}
                  onChange={e => setEditClass(e.target.value)}
                  placeholder="Ví dụ: 8A1"
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-sm"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-blue-800 text-white font-bold cursor-pointer"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
