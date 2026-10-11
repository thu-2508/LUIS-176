import React, { useState } from 'react';
import { Question, StudentProfile, TestSubmission, Certificate } from '../../types';
import { 
  HelpCircle, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight, 
  RotateCcw, 
  Award,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { issueCertificateIfEligible } from '../../services/certificateService';
import { addMistake } from '../../services/storageService';
import { UnderlinedText } from '../UnderlinedText';

interface DiagnosticTestProps {
  questions: Question[];
  profile: StudentProfile;
  onSaveSubmission: (submission: TestSubmission) => void;
  onCertificateIssued: (cert: Certificate) => void;
  onNavigateToLesson: () => void;
}

export const DiagnosticTest: React.FC<DiagnosticTestProps> = ({
  questions,
  profile,
  onSaveSubmission,
  onCertificateIssued,
  onNavigateToLesson
}) => {
  // Filter only approved questions from source
  const testQuestions = React.useMemo(() => {
    const approved = questions.filter(q => q.reviewStatus === 'da_duyet');
    // Take balanced sample of 12-15 questions covering pronunciation, grammar, vocabulary, reading, writing
    return approved.slice(0, 15);
  }, [questions]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<{
    correctCount: number;
    total: number;
    percentage: number;
    score: number;
    weakTopics: string[];
    strongTopics: string[];
  } | null>(null);

  const currentQ = testQuestions[currentIndex];

  const handleSelectOption = (optId: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optId
    }));
  };

  const handleDontKnow = () => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: 'DONT_KNOW'
    }));
  };

  const handleSubmit = () => {
    let correct = 0;
    const weakMap: Record<string, number> = {};
    const strongMap: Record<string, number> = {};

    testQuestions.forEach(q => {
      const ans = selectedAnswers[q.id];
      const isCorrect = ans && ans.toUpperCase() === q.answer.toUpperCase();

      if (isCorrect) {
        correct++;
        strongMap[q.topicTitle] = (strongMap[q.topicTitle] || 0) + 1;
      } else {
        weakMap[q.topicTitle] = (weakMap[q.topicTitle] || 0) + 1;
        // Automatically save to mistake notebook
        addMistake({
          questionId: q.id,
          questionPrompt: q.prompt,
          topic: q.topic,
          skill: q.skill,
          studentAnswer: ans === 'DONT_KNOW' ? 'Em chưa biết' : (ans || 'Chưa chọn'),
          correctAnswer: q.answer,
          explanation: q.explanation,
          userReason: ans === 'DONT_KNOW' ? 'Chưa học hoặc chưa nhớ kiến thức này' : 'Chọn nhầm phương án'
        });
      }
    });

    const total = testQuestions.length;
    const pct = (correct / total) * 100;
    const tenScaleScore = Number(((correct / total) * 10).toFixed(1));

    const submission: TestSubmission = {
      id: `sub_diag_${Date.now()}`,
      testType: 'diagnostic',
      title: 'Kiểm tra đầu vào – Chuẩn đoán lỗ hổng kiến thức',
      createdAt: new Date().toISOString(),
      totalQuestions: total,
      correctCount: correct,
      totalScore: tenScaleScore,
      maxScore: 10,
      percentage: pct,
      timeSpentSeconds: 600,
      answers: selectedAnswers,
      firstTryCorrectCount: correct,
      guidedHelpCorrectCount: 0,
      hasCertificate: pct >= 70
    };

    // Check certificate eligibility
    if (pct >= 70) {
      const cert = issueCertificateIfEligible(submission, profile.name, profile.studentClass);
      if (cert) {
        submission.certificateId = cert.id;
        onCertificateIssued(cert);
      }
    }

    onSaveSubmission(submission);

    setResult({
      correctCount: correct,
      total,
      percentage: pct,
      score: tenScaleScore,
      weakTopics: Object.keys(weakMap),
      strongTopics: Object.keys(strongMap)
    });
    setIsSubmitted(true);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setResult(null);
  };

  if (testQuestions.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-lg mx-auto space-y-3">
        <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-800">Chưa đủ dữ liệu câu hỏi đã duyệt</h3>
        <p className="text-sm text-slate-600">
          Hệ thống chỉ sử dụng các câu hỏi đã được giáo viên duyệt để kiểm tra học sinh. Vui lòng chuyển sang tab Giáo viên để duyệt câu hỏi trước.
        </p>
      </div>
    );
  }

  // RESULT SCREEN
  if (isSubmitted && result) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-800">
            {result.percentage >= 70 ? (
              <Award className="w-9 h-9 text-amber-500" />
            ) : (
              <CheckCircle className="w-9 h-9 text-blue-600" />
            )}
          </div>

          <h2 className="text-2xl font-black text-slate-900">
            Kết Quả Chuẩn Đoán Đầu Vào
          </h2>

          <div className="flex items-center justify-center space-x-6">
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Điểm quy đổi (thang 10)</p>
              <p className="text-3xl font-black text-blue-900">{result.score} / 10</p>
            </div>
            <div className="h-10 w-[1px] bg-slate-200" />
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Tỉ lệ chính xác</p>
              <p className={`text-3xl font-black ${result.percentage >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {Math.round(result.percentage)}%
              </p>
            </div>
            <div className="h-10 w-[1px] bg-slate-200" />
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Số câu đúng</p>
              <p className="text-3xl font-black text-slate-800">{result.correctCount}/{result.total}</p>
            </div>
          </div>

          {result.percentage >= 70 && (
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-sm flex items-center justify-between">
              <div className="flex items-center space-x-2 text-left">
                <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span>
                  <strong>Tuyệt vời!</strong> Em đạt từ 70% trở lên và đã được cấp <strong>Giấy Chứng Nhận Hoàn Thành</strong> từ Cô Vũ Thị Mai Thu!
                </span>
              </div>
            </div>
          )}

          {/* Feedback & Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-4 border-t border-slate-100">
            {/* Weak topics */}
            <div className="p-4 rounded-xl bg-red-50 border border-red-200">
              <h4 className="text-xs font-bold text-red-900 uppercase flex items-center space-x-1.5 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Phần còn hổng cần học lại:</span>
              </h4>
              {result.weakTopics.length > 0 ? (
                <ul className="text-xs text-red-800 space-y-1 list-disc list-inside">
                  {result.weakTopics.slice(0, 4).map((topic, i) => (
                    <li key={i}>{topic}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-600">Không có phần nào bị sai!</p>
              )}
            </div>

            {/* Strong topics */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <h4 className="text-xs font-bold text-emerald-900 uppercase flex items-center space-x-1.5 mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Kiến thức đã nắm vững:</span>
              </h4>
              {result.strongTopics.length > 0 ? (
                <ul className="text-xs text-emerald-800 space-y-1 list-disc list-inside">
                  {result.strongTopics.slice(0, 4).map((topic, i) => (
                    <li key={i}>{topic}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-600">Hãy bắt đầu ôn từ bài học ngắn đầu tiên!</p>
              )}
            </div>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              onClick={onNavigateToLesson}
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-xl shadow transition cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Chuyển sang Học lại ngắn gọn</span>
            </button>
            <button
              onClick={handleRetake}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại bài kiểm tra này</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE TEST QUESTION VIEW
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Test header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
        <div>
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">
            Kiểm tra đầu vào (Chuẩn đoán năng lực)
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Câu hỏi {currentIndex + 1} / {testQuestions.length}
          </h3>
        </div>

        {/* Question Counter Pill */}
        <div className="flex items-center space-x-1 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
          <span>Đã trả lời:</span>
          <strong className="text-blue-900">
            {Object.keys(selectedAnswers).length}/{testQuestions.length}
          </strong>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
              {currentQ.topicTitle}
            </span>
            <span>• Điểm: {currentQ.points}</span>
          </div>

          {currentQ.skill === 'pronunciation' && (
            <p className="text-xs text-blue-700 italic font-medium mb-1">
              Choose the word whose underlined part is pronounced differently from the others.
            </p>
          )}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug whitespace-pre-line">
            {currentQ.prompt}
          </h2>
        </div>

        {/* Options */}
        {(() => {
          const isShortOptions = currentQ.options && currentQ.options.every(o => o.text.length <= 18);
          const badgeConfigs: Record<string, { badge: string; border: string; hover: string }> = {
            A: { badge: 'bg-blue-100 text-blue-700', border: 'border-blue-200', hover: 'hover:border-blue-400 hover:bg-blue-50/40' },
            B: { badge: 'bg-purple-100 text-purple-700', border: 'border-purple-200', hover: 'hover:border-purple-400 hover:bg-purple-50/40' },
            C: { badge: 'bg-amber-100 text-amber-700', border: 'border-amber-200', hover: 'hover:border-amber-400 hover:bg-amber-50/40' },
            D: { badge: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-200', hover: 'hover:border-emerald-400 hover:bg-emerald-50/40' },
          };

          return (
            <div className={isShortOptions ? "grid grid-cols-2 md:grid-cols-4 gap-3" : "space-y-3"}>
              {currentQ.options?.map(opt => {
                const isSelected = selectedAnswers[currentQ.id] === opt.id;
                const cfg = badgeConfigs[opt.id] || badgeConfigs.A;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition flex items-center space-x-3 cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-300 font-bold'
                        : `${cfg.border} ${cfg.hover} bg-white text-slate-800 shadow-sm`
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                      isSelected ? 'bg-blue-800 text-white' : cfg.badge
                    }`}>
                      {opt.id}
                    </span>
                    <span className="text-base font-semibold">
                      <UnderlinedText text={opt.text} underlinedPart={currentQ.underlinedPart} />
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })()}

        {/* "Em chưa biết" button (crucial for honest diagnostic assessment) */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handleDontKnow}
            className={`inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              selectedAnswers[currentQ.id] === 'DONT_KNOW'
                ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Em chưa biết câu này (không đoán mò)</span>
          </button>

          <span className="text-xs text-slate-400 italic">
            Không tự chuyển câu khi chuyển tab
          </span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:bg-slate-50"
        >
          Câu trước
        </button>

        {currentIndex < testQuestions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex(prev => Math.min(testQuestions.length - 1, prev + 1))}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-sm font-bold shadow transition cursor-pointer"
          >
            <span>Câu tiếp theo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md transition cursor-pointer"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Nộp bài chuẩn đoán</span>
          </button>
        )}
      </div>
    </div>
  );
};
