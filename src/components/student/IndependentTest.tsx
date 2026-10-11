import React, { useState } from 'react';
import { Question, StudentProfile, TestSubmission, Certificate } from '../../types';
import { 
  CheckCircle, 
  XCircle, 
  ShieldCheck, 
  AlertTriangle, 
  RotateCcw, 
  ArrowRight,
  Award,
  Sparkles
} from 'lucide-react';
import { issueCertificateIfEligible } from '../../services/certificateService';
import { addMistake } from '../../services/storageService';
import { UnderlinedText } from '../UnderlinedText';

interface IndependentTestProps {
  questions: Question[];
  profile: StudentProfile;
  topic?: string;
  onSaveSubmission: (submission: TestSubmission) => void;
  onCertificateIssued: (cert: Certificate) => void;
}

export const IndependentTest: React.FC<IndependentTestProps> = ({
  questions,
  profile,
  topic = 'all',
  onSaveSubmission,
  onCertificateIssued
}) => {
  const [selectedTopic, setSelectedTopic] = useState(topic);

  // Filter approved questions for this topic
  const pool = React.useMemo(() => {
    const approved = questions.filter(q => q.reviewStatus === 'da_duyet');
    if (selectedTopic === 'all') return approved;
    return approved.filter(q => q.topic === selectedTopic);
  }, [questions, selectedTopic]);

  // Take at least 5 questions
  const testQuestions = React.useMemo(() => {
    return pool.slice(0, Math.max(5, Math.min(pool.length, 8)));
  }, [pool]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<{
    correctCount: number;
    total: number;
    percentage: number;
    isMastered: boolean;
  } | null>(null);

  const currentQ = testQuestions[currentIndex];

  const handleSelectAnswer = (optId: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: optId
    }));
  };

  const handleSubmit = () => {
    let correct = 0;
    testQuestions.forEach(q => {
      const a = answers[q.id];
      if (a && a.toUpperCase() === q.answer.toUpperCase()) {
        correct++;
      } else {
        addMistake({
          questionId: q.id,
          questionPrompt: q.prompt,
          topic: q.topic,
          skill: q.skill,
          studentAnswer: a || 'Chưa chọn',
          correctAnswer: q.answer,
          explanation: q.explanation,
          userReason: 'Làm sai trong bài tự kiểm tra độc lập'
        });
      }
    });

    const total = testQuestions.length;
    const pct = (correct / total) * 100;
    const isMastered = pct >= 80;

    const submission: TestSubmission = {
      id: `sub_ind_${Date.now()}`,
      testType: 'independent',
      title: `Kiểm tra độc lập – ${selectedTopic === 'all' ? 'Tổng hợp' : selectedTopic}`,
      createdAt: new Date().toISOString(),
      totalQuestions: total,
      correctCount: correct,
      totalScore: Number(((correct / total) * 10).toFixed(1)),
      maxScore: 10,
      percentage: pct,
      timeSpentSeconds: 450,
      answers,
      firstTryCorrectCount: correct,
      guidedHelpCorrectCount: 0,
      hasCertificate: pct >= 70
    };

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
      isMastered
    });
    setIsSubmitted(true);
  };

  const handleRetake = () => {
    setAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setResult(null);
  };

  if (testQuestions.length < 5) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-lg mx-auto space-y-3">
        <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-800">Chưa đủ tối thiểu 5 câu hỏi đã duyệt</h3>
        <p className="text-sm text-slate-600">
          Chủ đề này hiện chỉ có {testQuestions.length} câu đã duyệt. Theo quy chuẩn sư phạm, bài kiểm tra độc lập yêu cầu tối thiểu 5 câu mới độc lập để xác nhận học sinh đã vững kiến thức.
        </p>
        <button
          onClick={() => setSelectedTopic('all')}
          className="mt-2 px-4 py-2 bg-blue-800 text-white text-xs font-bold rounded-lg cursor-pointer"
        >
          Chọn làm đề kiểm tra Tổng Hợp
        </button>
      </div>
    );
  }

  // Result View
  if (isSubmitted && result) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 text-center space-y-5">
        <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-blue-50 text-blue-900">
          {result.percentage >= 70 ? (
            <Award className="w-9 h-9 text-amber-500" />
          ) : (
            <CheckCircle className="w-9 h-9 text-blue-600" />
          )}
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-900">
            Kết Quả Kiểm Tra Độc Lập
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Không sử dụng gợi ý hay trợ giúp
          </p>
        </div>

        <div className="flex items-center justify-center space-x-6 py-2">
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Tỉ lệ chính xác</p>
            <p className={`text-3xl font-black ${result.percentage >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
              {Math.round(result.percentage)}%
            </p>
          </div>
          <div className="h-10 w-[1px] bg-slate-200" />
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Số câu đúng</p>
            <p className="text-3xl font-black text-slate-800">
              {result.correctCount}/{result.total}
            </p>
          </div>
        </div>

        {/* Mastery Badge */}
        {result.isMastered ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm">
            <p className="font-bold flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>ĐẠT LẦN ĐẦU (&ge; 80%)</span>
            </p>
            <p className="text-xs mt-1">
              Em đã hoàn thành xuất sắc bài kiểm tra độc lập không cần hỗ trợ. Hãy kiểm tra lại sau 2 ngày để hệ thống xác nhận trạng thái "Đã củng cố vững chắc"!
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm">
            <p className="font-bold flex items-center justify-center space-x-1.5">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Chưa đạt mức chuẩn 80%</span>
            </p>
            <p className="text-xs mt-1">
              Những câu trả lời chưa đúng đã được tự động lưu vào Sổ Lỗi Sai. Hãy xem lại lời giải chi tiết và ôn tập thêm nhé!
            </p>
          </div>
        )}

        {result.percentage >= 70 && (
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs sm:text-sm text-left flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>
              <strong>Tuyệt vời!</strong> Em đã đạt &ge; 70% và được cấp <strong>Giấy Chứng Nhận Hoàn Thành</strong> từ Cô Vũ Thị Mai Thu!
            </span>
          </div>
        )}

        <div className="pt-2 flex justify-center space-x-3">
          <button
            onClick={handleRetake}
            className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm lại</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Kiểm tra độc lập (Không có gợi ý)
          </span>
          <h3 className="font-bold text-slate-900 text-base">
            Câu {currentIndex + 1} / {testQuestions.length}
          </h3>
        </div>

        <select
          value={selectedTopic}
          onChange={e => {
            setSelectedTopic(e.target.value);
            setCurrentIndex(0);
            setAnswers({});
          }}
          className="text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 cursor-pointer"
        >
          <option value="all">Đề tổng hợp</option>
          <option value="grammar_verbs">Động từ chỉ thích/ghét</option>
          <option value="grammar_adverbs">So sánh trạng từ</option>
          <option value="grammar_compound">Câu ghép & từ nối</option>
          <option value="unit1_leisure">Unit 1</option>
          <option value="unit2_countryside">Unit 2</option>
          <option value="unit3_teenagers">Unit 3</option>
        </select>
      </div>

      {/* Question Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            {currentQ.topicTitle}
          </span>
          {currentQ.skill === 'pronunciation' && (
            <p className="text-xs text-blue-700 italic font-medium mb-1">
              Choose the word whose underlined part is pronounced differently from the others.
            </p>
          )}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-2 whitespace-pre-line">
            {currentQ.prompt}
          </h2>
        </div>

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
                    onClick={() => handleSelectAnswer(opt.id)}
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
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold disabled:opacity-40 cursor-pointer"
        >
          Câu trước
        </button>

        {currentIndex < testQuestions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex(prev => Math.min(testQuestions.length - 1, prev + 1))}
            className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold shadow cursor-pointer"
          >
            <span>Câu tiếp theo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md cursor-pointer"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Nộp bài độc lập</span>
          </button>
        )}
      </div>
    </div>
  );
};
