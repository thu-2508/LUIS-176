import React, { useState } from 'react';
import { MINI_LESSONS } from '../../data/lessonsData';
import { MiniLesson } from '../../types';
import { 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Lightbulb, 
  ArrowRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { UnderlinedText } from '../UnderlinedText';

interface MiniLessonViewProps {
  onStartPractice: (topicId: string) => void;
}

export const MiniLessonView: React.FC<MiniLessonViewProps> = ({ onStartPractice }) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(MINI_LESSONS[0].id);
  const [quickAnswer, setQuickAnswer] = useState<string | null>(null);
  const [showQuickExplanation, setShowQuickExplanation] = useState(false);

  const activeLesson = MINI_LESSONS.find(l => l.id === selectedLessonId) || MINI_LESSONS[0];

  const handleSelectLesson = (id: string) => {
    setSelectedLessonId(id);
    setQuickAnswer(null);
    setShowQuickExplanation(false);
  };

  const handleAnswerQuick = (optId: string) => {
    setQuickAnswer(optId);
    setShowQuickExplanation(true);
  };

  return (
    <div className="space-y-6">
      {/* Lesson Selector Tabs */}
      <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-thin">
        {MINI_LESSONS.map(lesson => {
          const isSelected = lesson.id === activeLesson.id;
          return (
            <button
              key={lesson.id}
              onClick={() => handleSelectLesson(lesson.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center space-x-2 ${
                isSelected
                  ? 'bg-blue-800 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{lesson.title.split('(')[0].trim()}</span>
            </button>
          );
        })}
      </div>

      {/* Lesson Detail Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-8">
        {/* Header */}
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            {activeLesson.englishTitle}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {activeLesson.title}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Thời lượng học đề xuất: 10–12 phút • Dành riêng cho học sinh củng cố kiến thức thi giữa kì I.
          </p>
        </div>

        {/* 1. Em cần nhớ (Core rule) */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-blue-900 font-bold text-base">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-black">
              1
            </span>
            <h3>Em cần nhớ (Quy tắc cốt lõi)</h3>
          </div>
          <div className="p-4 sm:p-5 rounded-xl bg-blue-50/70 border border-blue-200 text-sm leading-relaxed text-slate-800 whitespace-pre-line font-medium">
            {activeLesson.coreRule}
          </div>
        </div>

        {/* 2. Ví dụ mẫu (Examples) */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-blue-900 font-bold text-base">
            <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center text-sm font-black">
              2
            </span>
            <h3>Ví dụ mẫu chuẩn đề cương</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {activeLesson.examples.map((ex, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <p className="text-sm font-bold text-blue-950 font-sans">
                  {ex.english}
                </p>
                <p className="text-xs text-slate-600 italic">
                  &rarr; {ex.vietnamese}
                </p>
                {ex.note && (
                  <p className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                    {ex.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Các bước làm bài (Steps) */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-blue-900 font-bold text-base">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-sm font-black">
              3
            </span>
            <h3>Các bước làm bài để không mất điểm</h3>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            {activeLesson.steps.map((st, i) => (
              <div key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{st}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Lỗi thường gặp (Common Mistakes) */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-red-900 font-bold text-base">
            <span className="w-7 h-7 rounded-lg bg-red-100 text-red-800 flex items-center justify-center text-sm font-black">
              4
            </span>
            <h3>Lỗi học sinh thường làm sai trong bài kiểm tra</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {activeLesson.commonMistakes.map((m, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-red-50/50 border border-red-200 space-y-2">
                <div className="flex items-start space-x-1.5 text-xs text-red-700 line-through">
                  <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{m.wrong}</span>
                </div>
                <div className="flex items-start space-x-1.5 text-xs font-bold text-emerald-700">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{m.right}</span>
                </div>
                <p className="text-[11px] text-slate-600 bg-white p-2 rounded border border-red-100 italic">
                  Vì sao sai: {m.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Câu thử sức ngay (Quick Check Question) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-amber-950 font-bold text-base">
              <span className="w-7 h-7 rounded-lg bg-amber-400 text-slate-900 flex items-center justify-center text-sm font-black">
                5
              </span>
              <h3>Câu thử sức ngay (Quick Check)</h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 bg-amber-200 text-amber-900 rounded-full">
              Thử làm xem hiểu bài chưa
            </span>
          </div>

          <p className="text-base font-bold text-slate-900">
            {activeLesson.quickCheckQuestion.prompt}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activeLesson.quickCheckQuestion.options?.map(opt => {
              const isSelected = quickAnswer === opt.id;
              const isCorrect = opt.id === activeLesson.quickCheckQuestion.answer;
              let style = 'bg-white border-slate-200 hover:border-amber-400 text-slate-800';

              if (showQuickExplanation) {
                if (isCorrect) {
                  style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                } else if (isSelected) {
                  style = 'bg-red-100 border-red-400 text-red-950';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleAnswerQuick(opt.id)}
                  disabled={showQuickExplanation}
                  className={`p-3 rounded-xl border-2 text-left text-sm transition flex items-center space-x-2.5 cursor-pointer ${style}`}
                >
                  <span className="w-6 h-6 rounded bg-slate-100 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {opt.id}
                  </span>
                  <span className="font-semibold">
                    <UnderlinedText text={opt.text} underlinedPart={activeLesson.quickCheckQuestion.underlinedPart} />
                  </span>
                </button>
              );
            })}
          </div>

          {showQuickExplanation && (
            <div className="p-4 bg-white rounded-xl border border-amber-200 text-xs sm:text-sm text-slate-700 space-y-2">
              <div className="flex items-center space-x-2">
                {quickAnswer === activeLesson.quickCheckQuestion.answer ? (
                  <span className="text-emerald-700 font-bold flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Chính xác! Em đã nắm vững quy tắc này.</span>
                  </span>
                ) : (
                  <span className="text-red-700 font-bold flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>Chưa đúng! Đáp án đúng là {activeLesson.quickCheckQuestion.answer}.</span>
                  </span>
                )}
              </div>
              <p className="text-slate-600">
                {activeLesson.quickCheckQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Action Button: Next to Guided Practice */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => onStartPractice(activeLesson.topic)}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-xl shadow-md transition cursor-pointer"
          >
            <span>Luyện có hướng dẫn về chủ đề này</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
