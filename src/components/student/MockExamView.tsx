import React, { useState, useEffect } from 'react';
import { Question, StudentProfile, TestSubmission, Certificate } from '../../types';
import { 
  Clock, 
  Flag, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  Award, 
  RotateCcw,
  BookOpen,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { issueCertificateIfEligible } from '../../services/certificateService';
import { addMistake } from '../../services/storageService';
import { SignboardMedia } from '../SignboardMedia';
import { UnderlinedText } from '../UnderlinedText';

interface MockExamViewProps {
  questions: Question[];
  profile: StudentProfile;
  onSaveSubmission: (submission: TestSubmission) => void;
  onCertificateIssued: (cert: Certificate) => void;
  onOpenCertificates: () => void;
}

export const MockExamView: React.FC<MockExamViewProps> = ({
  questions,
  profile,
  onSaveSubmission,
  onCertificateIssued,
  onOpenCertificates
}) => {
  // Filter only approved questions
  const approvedQuestions = React.useMemo(() => {
    return questions.filter(q => q.reviewStatus === 'da_duyet');
  }, [questions]);

  // Create an exam set of 20 questions
  const examQuestions = React.useMemo(() => {
    return approvedQuestions.slice(0, 20);
  }, [approvedQuestions]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(45 * 60); // 45 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [examResult, setExamResult] = useState<{
    correctCount: number;
    total: number;
    score: number;
    percentage: number;
    timeSpent: number;
  } | null>(null);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || timeLeftSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted, timeLeftSeconds]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = examQuestions[currentIndex];

  const handleSelectOption = (optId: string) => {
    if (isSubmitted || !currentQ) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: optId
    }));
  };

  const toggleFlag = (qId: string) => {
    setFlagged(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleSubmitExam = () => {
    if (isSubmitted) return;

    let correct = 0;
    examQuestions.forEach(q => {
      const a = answers[q.id];
      const isCorrect = a && (
        a.toUpperCase() === q.answer.toUpperCase() ||
        (q.acceptedAnswers && q.acceptedAnswers.includes(a.toUpperCase()))
      );

      if (isCorrect) {
        correct++;
      } else {
        // Save to mistake notebook
        addMistake({
          questionId: q.id,
          questionPrompt: q.prompt,
          topic: q.topic,
          skill: q.skill,
          studentAnswer: a || 'Chưa trả lời',
          correctAnswer: q.answer,
          explanation: q.explanation,
          userReason: 'Sai trong bài thi thử giữa kì'
        });
      }
    });

    const total = examQuestions.length;
    const pct = total > 0 ? (correct / total) * 100 : 0;
    const score = Number(((correct / total) * 10).toFixed(1));
    const spentTime = 45 * 60 - timeLeftSeconds;

    const submission: TestSubmission = {
      id: `sub_exam_${Date.now()}`,
      testType: 'mock_exam',
      title: 'Đề Thi Thử Giữa Học Kì I – Tiếng Anh 8 (2026–2027)',
      createdAt: new Date().toISOString(),
      totalQuestions: total,
      correctCount: correct,
      totalScore: score,
      maxScore: 10,
      percentage: pct,
      timeSpentSeconds: spentTime,
      answers,
      firstTryCorrectCount: correct,
      guidedHelpCorrectCount: 0,
      hasCertificate: pct >= 70
    };

    // Check certificate issuance
    if (pct >= 70) {
      const cert = issueCertificateIfEligible(submission, profile.name, profile.studentClass);
      if (cert) {
        submission.certificateId = cert.id;
        onCertificateIssued(cert);
      }
    }

    onSaveSubmission(submission);

    setExamResult({
      correctCount: correct,
      total,
      score,
      percentage: pct,
      timeSpent: spentTime
    });
    setIsSubmitted(true);
  };

  const handleRetakeExam = () => {
    setAnswers({});
    setFlagged({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setTimeLeftSeconds(45 * 60);
    setExamResult(null);
  };

  if (examQuestions.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-md mx-auto">
        <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
        <p className="text-slate-700 font-semibold">Chưa có câu hỏi nào được duyệt cho đề thi thử.</p>
      </div>
    );
  }

  // EXAM RESULT SCREEN
  if (isSubmitted && examResult) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-900 mx-auto flex items-center justify-center">
            {examResult.percentage >= 70 ? (
              <Award className="w-10 h-10 text-amber-500" />
            ) : (
              <CheckCircle className="w-10 h-10 text-blue-600" />
            )}
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Kết Quả Bài Thi Thử Giữa Kì
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Thang Điểm 10 Chuẩn Bộ GD&ĐT
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto py-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase">Điểm thi</p>
              <p className="text-3xl font-black text-blue-900 mt-0.5">{examResult.score} / 10</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase">Tỉ lệ đạt</p>
              <p className={`text-3xl font-black mt-0.5 ${
                examResult.percentage >= 70 ? 'text-emerald-600' : 'text-amber-600'
              }`}>
                {Math.round(examResult.percentage)}%
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase">Số câu đúng</p>
              <p className="text-3xl font-black text-slate-800 mt-0.5">
                {examResult.correctCount}/{examResult.total}
              </p>
            </div>
          </div>

          {/* Certificate Banner if >= 70% */}
          {examResult.percentage >= 70 ? (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 text-left space-y-3">
              <div className="flex items-center space-x-2 text-amber-900 font-black text-sm uppercase">
                <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span>CHÚC MỪNG EM ĐẠT CHUẨN CẤP GIẤY CHỨNG NHẬN (&ge; 70%)!</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                Em đã vượt qua mức điểm 7.0 (đạt <strong>{Math.round(examResult.percentage)}%</strong>) và nhận được <strong>Giấy Chứng Nhận Hoàn Thành Ôn Tập</strong> từ Cô <strong>Vũ Thị Mai Thu - THCS Sông Đà - PH Hữu Nghị</strong>.
              </p>
              <button
                onClick={onOpenCertificates}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs rounded-xl shadow cursor-pointer transition"
              >
                Xem và In Giấy Chứng Nhận Ngay &rarr;
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-slate-700 text-left">
              <p className="font-bold text-blue-950 mb-1">Cố gắng thêm một chút nhé!</p>
              <p>
                Em đạt {Math.round(examResult.percentage)}%. Để được cấp Giấy Chứng Nhận, em cần đạt từ <strong>70% trở lên (tương đương 7.0 điểm)</strong>. Hãy vào mục <strong>Sổ Lỗi Sai</strong> để xem lại các câu chưa làm đúng, sau đó thi thử lại nhé!
              </p>
            </div>
          )}

          <div className="flex justify-center space-x-3 pt-2">
            <button
              onClick={handleRetakeExam}
              className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Thi thử lại</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE EXAM INTERFACE
  const isTimeCritical = timeLeftSeconds < 300; // < 5 mins

  return (
    <div className="space-y-6">
      {/* Top Header with Timer & Matrix Disclaimer */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3 sticky top-16 z-30">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            *Ma trận tham khảo – Giáo viên có thể điều chỉnh
          </span>
          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
            Đề Thi Thử Giữa Kì (20 câu • Thang 10)
          </h3>
        </div>

        {/* Timer Box */}
        <div className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl font-mono text-sm sm:text-base font-bold shadow-sm ${
          isTimeCritical
            ? 'bg-red-100 text-red-700 border border-red-300 animate-pulse'
            : 'bg-blue-50 text-blue-900 border border-blue-200'
        }`}>
          <Clock className="w-4 h-4" />
          <span>{formatTime(timeLeftSeconds)}</span>
        </div>

        {/* Action: Submit Button */}
        <button
          onClick={handleSubmitExam}
          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow cursor-pointer transition"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Nộp bài thi</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left 3 Columns: Active Question Card */}
        <div className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-900 font-black text-xs flex items-center justify-center">
                {currentIndex + 1}
              </span>
              <span className="text-xs font-bold text-slate-700">
                {currentQ.topicTitle}
              </span>
            </div>

            {/* Flag button */}
            <button
              onClick={() => toggleFlag(currentQ.id)}
              className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition ${
                flagged[currentQ.id]
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${flagged[currentQ.id] ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{flagged[currentQ.id] ? 'Đã đánh dấu xem lại' : 'Đánh dấu câu này'}</span>
            </button>
          </div>

          {/* Media if present */}
          {currentQ.mediaId && <SignboardMedia mediaId={currentQ.mediaId} />}

          {/* Prompt */}
          <div>
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
                  const isSelected = answers[currentQ.id] === opt.id;
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
                        isSelected ? 'bg-blue-700 text-white shadow' : cfg.badge
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

          {/* Next / Prev */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold disabled:opacity-40 cursor-pointer"
            >
              Câu trước
            </button>

            <button
              onClick={() => setCurrentIndex(prev => Math.min(examQuestions.length - 1, prev + 1))}
              disabled={currentIndex === examQuestions.length - 1}
              className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold shadow disabled:opacity-40 cursor-pointer"
            >
              <span>Câu sau</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right 1 Column: Question Navigator Matrix */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Bảng câu hỏi ({examQuestions.length})
            </h4>
            <span className="text-[11px] text-slate-500 font-medium">
              Đã làm: {Object.keys(answers).length}/{examQuestions.length}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {examQuestions.map((q, idx) => {
              const isAnswered = !!answers[q.id];
              const isCurrent = idx === currentIndex;
              const isFlagged = !!flagged[q.id];

              let btnStyle = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
              if (isAnswered) btnStyle = 'bg-blue-700 text-white font-bold';
              if (isCurrent) btnStyle += ' ring-2 ring-amber-400 ring-offset-2';
              if (isFlagged) btnStyle += ' border-2 border-amber-500';

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-9 rounded-lg text-xs font-semibold flex items-center justify-center relative cursor-pointer transition ${btnStyle}`}
                >
                  <span>{idx + 1}</span>
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-blue-700" />
              <span>Đã chọn đáp án</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-slate-100 border border-slate-300" />
              <span>Chưa làm</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-amber-100 border border-amber-500" />
              <span>Đánh dấu xem lại</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
