import React, { useState } from 'react';
import { Question } from '../../types';
import { 
  Lightbulb, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Compass,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { addMistake } from '../../services/storageService';
import { UnderlinedText } from '../UnderlinedText';

interface GuidedPracticeProps {
  questions: Question[];
  initialTopic?: string;
  onNavigateToIndependent: (topic: string) => void;
}

export const GuidedPractice: React.FC<GuidedPracticeProps> = ({
  questions,
  initialTopic,
  onNavigateToIndependent
}) => {
  const approvedQuestions = React.useMemo(() => {
    return questions.filter(q => q.reviewStatus === 'da_duyet');
  }, [questions]);

  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopic || 'all');
  const filteredQuestions = React.useMemo(() => {
    if (selectedTopic === 'all') return approvedQuestions;
    return approvedQuestions.filter(q => q.topic === selectedTopic);
  }, [approvedQuestions, selectedTopic]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Guided progressive hints state
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [hintLevel, setHintLevel] = useState<0 | 1 | 2>(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [outcome, setOutcome] = useState<'pending' | 'first_try' | 'with_hint' | 'after_sol' | 'failed'>('pending');

  const handleSelectOption = (optId: string) => {
    if (outcome !== 'pending' && outcome !== 'failed') return;
    setSelectedOpt(optId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOpt || !currentQ) return;
    const isCorrect = selectedOpt.toUpperCase() === currentQ.answer.toUpperCase();
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (isCorrect) {
      if (newAttempts === 1 && hintLevel === 0) {
        setOutcome('first_try');
      } else if (hintLevel > 0 && !showExplanation) {
        setOutcome('with_hint');
      } else {
        setOutcome('after_sol');
      }
      setShowExplanation(true);
    } else {
      // Wrong answer
      if (hintLevel === 0) {
        setHintLevel(1);
      } else if (hintLevel === 1) {
        setHintLevel(2);
      } else {
        setShowExplanation(true);
        setOutcome('failed');
      }

      // Automatically log mistake for student to review later
      addMistake({
        questionId: currentQ.id,
        questionPrompt: currentQ.prompt,
        topic: currentQ.topic,
        skill: currentQ.skill,
        studentAnswer: selectedOpt,
        correctAnswer: currentQ.answer,
        explanation: currentQ.explanation,
        userReason: 'Chưa nhận diện đúng dấu hiệu bài'
      });
    }
  };

  const handleRetrySame = () => {
    setSelectedOpt(null);
    setAttempts(0);
    setHintLevel(0);
    setShowExplanation(false);
    setOutcome('pending');
  };

  const handleNextQuestion = () => {
    handleRetrySame();
    setCurrentIndex(prev => (prev + 1) % filteredQuestions.length);
  };

  if (!currentQ) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-md mx-auto">
        <p className="text-slate-600">Không có câu hỏi nào trong chủ đề này.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Filter & Topic Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center space-x-2">
          <Compass className="w-5 h-5 text-blue-700" />
          <h3 className="font-bold text-slate-900 text-base">
            Luyện Có Hướng Dẫn
          </h3>
        </div>

        {/* Topic filter dropdown */}
        <select
          value={selectedTopic}
          onChange={e => {
            setSelectedTopic(e.target.value);
            setCurrentIndex(0);
            handleRetrySame();
          }}
          className="text-xs sm:text-sm font-medium bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="all">Tất cả chuyên đề ({approvedQuestions.length} câu)</option>
          <option value="grammar_verbs">Động từ chỉ thích/ghét</option>
          <option value="grammar_adverbs">So sánh hơn của trạng từ</option>
          <option value="grammar_compound">Câu ghép & từ nối</option>
          <option value="unit1_leisure">Unit 1: Leisure time</option>
          <option value="unit2_countryside">Unit 2: Life in countryside</option>
          <option value="unit3_teenagers">Unit 3: Teenagers</option>
          <option value="pronunciation">Phát âm & trọng âm</option>
        </select>
      </div>

      {/* Main Guided Question Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
        {/* Question Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            {currentQ.topicTitle}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Câu {currentIndex + 1} / {filteredQuestions.length}
          </span>
        </div>

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
                const isSelected = selectedOpt === opt.id;
                const isCorrect = opt.id.toUpperCase() === currentQ.answer.toUpperCase();
                const cfg = badgeConfigs[opt.id] || badgeConfigs.A;

                let optionStyle = `${cfg.border} ${cfg.hover} text-slate-800 bg-white`;
                if (isSelected && outcome === 'pending') {
                  optionStyle = 'border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-300 font-bold';
                } else if (showExplanation) {
                  if (isCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-300';
                  } else if (isSelected) {
                    optionStyle = 'border-red-400 bg-red-50 text-red-950';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={outcome !== 'pending' && outcome !== 'failed'}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition flex items-center space-x-3 cursor-pointer ${optionStyle}`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                      isSelected && outcome === 'pending' ? 'bg-blue-700 text-white shadow' : cfg.badge
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

        {/* Progressive Hint Banners */}
        {hintLevel >= 1 && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs sm:text-sm text-amber-950 space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Gợi ý 1 (Dấu hiệu nhận biết):</span>
            </div>
            <p className="italic">{currentQ.hint1}</p>
          </div>
        )}

        {hintLevel >= 2 && (
          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-300 text-xs sm:text-sm text-indigo-950 space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-indigo-800">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>Gợi ý 2 (Hướng dẫn bước làm bài):</span>
            </div>
            <p className="italic">{currentQ.hint2}</p>
          </div>
        )}

        {/* Outcome & Explanation */}
        {showExplanation && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {outcome === 'first_try' && (
                  <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Đúng lần đầu (Không cần gợi ý)</span>
                  </span>
                )}
                {outcome === 'with_hint' && (
                  <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>Đúng sau khi nhận gợi ý</span>
                  </span>
                )}
                {outcome === 'after_sol' && (
                  <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Đúng sau khi xem lời giải</span>
                  </span>
                )}
                {outcome === 'failed' && (
                  <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-900">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span>Chưa làm được (Đã ghi vào Sổ lỗi sai)</span>
                  </span>
                )}
              </div>

              <span className="text-[11px] text-slate-500 italic">
                *Đúng sau gợi ý không tính như làm độc lập
              </span>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 bg-white p-3.5 rounded-lg border border-slate-200">
              <p className="font-bold text-slate-900 mb-1">
                Đáp án chuẩn: <strong className="text-blue-700">{currentQ.answer}</strong>
              </p>
              <p className="leading-relaxed">{currentQ.explanation}</p>
            </div>
          </div>
        )}

        {/* Buttons / Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div>
            {!showExplanation ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!selectedOpt}
                className="px-6 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm shadow disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition"
              >
                Kiểm tra câu trả lời
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRetrySame}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Thử lại câu này</span>
                </button>
                <button
                  onClick={handleNextQuestion}
                  className="inline-flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold shadow cursor-pointer transition"
                >
                  <span>Làm câu tiếp theo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigateToIndependent(currentQ.topic)}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center space-x-1"
          >
            <span>Đã hiểu, chuyển sang Tự kiểm tra độc lập</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
