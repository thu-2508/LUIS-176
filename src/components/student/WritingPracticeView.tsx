import React, { useState } from 'react';
import { Question, EssaySubmission } from '../../types';
import { ESSAY_TOPICS } from '../../data/sourceQuestions';
import { 
  FileEdit, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  BookOpen, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { saveEssay } from '../../services/storageService';

interface WritingPracticeViewProps {
  questions: Question[];
  studentName: string;
}

export const WritingPracticeView: React.FC<WritingPracticeViewProps> = ({
  questions,
  studentName
}) => {
  const [activeSection, setActiveSection] = useState<'error' | 'transformation' | 'essay'>('error');

  // Error identification questions
  const errorQuestions = React.useMemo(() => {
    return questions.filter(q => q.type === 'error_identification');
  }, [questions]);

  // Transformation questions
  const transQuestions = React.useMemo(() => {
    return questions.filter(q => q.type === 'sentence_transformation');
  }, [questions]);

  // States for sentence transformation inputs
  const [transInputs, setTransInputs] = useState<Record<string, string>>({});
  const [transResults, setTransResults] = useState<Record<string, boolean>>({});

  // States for error questions
  const [errorSelected, setErrorSelected] = useState<Record<string, string>>({});
  const [errorChecked, setErrorChecked] = useState<Record<string, boolean>>({});

  // Essay State
  const [selectedEssayTopicId, setSelectedEssayTopicId] = useState(ESSAY_TOPICS[0].id);
  const activeEssay = ESSAY_TOPICS.find(e => e.id === selectedEssayTopicId) || ESSAY_TOPICS[0];
  const [essayContent, setEssayContent] = useState('');
  const [essaySubmitted, setEssaySubmitted] = useState(false);

  // Word counter helper
  const wordCount = essayContent.trim() ? essayContent.trim().split(/\s+/).length : 0;

  // Handle transformation check
  const handleCheckTransformation = (q: Question) => {
    const input = (transInputs[q.id] || '').trim().toLowerCase().replace(/[.,!?;]+$/, '');
    const correctTarget = q.answer.trim().toLowerCase().replace(/[.,!?;]+$/, '');

    let isMatch = input === correctTarget;

    if (!isMatch && q.acceptedAnswers) {
      isMatch = q.acceptedAnswers.some(ans => {
        const normalized = ans.trim().toLowerCase().replace(/[.,!?;]+$/, '');
        return normalized === input;
      });
    }

    setTransResults(prev => ({ ...prev, [q.id]: isMatch }));
  };

  const handleSelectErrorOpt = (qId: string, optId: string) => {
    if (errorChecked[qId]) return;
    setErrorSelected(prev => ({ ...prev, [qId]: optId }));
  };

  const handleCheckError = (qId: string) => {
    setErrorChecked(prev => ({ ...prev, [qId]: true }));
  };

  const handleSubmitEssay = () => {
    if (!essayContent.trim()) return;

    const submission: EssaySubmission = {
      id: `essay_${Date.now()}`,
      promptTopic: activeEssay.id,
      topicTitle: activeEssay.title,
      studentContent: essayContent,
      wordCount,
      submittedAt: new Date().toLocaleString('vi-VN'),
      status: 'pending'
    };

    saveEssay(submission);
    setEssaySubmitted(true);
  };

  return (
    <div className="space-y-6">
      {/* Sub Navigation */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex space-x-2">
        <button
          onClick={() => setActiveSection('error')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 cursor-pointer transition ${
            activeSection === 'error'
              ? 'bg-blue-800 text-white shadow'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span>Tìm & sửa lỗi sai (A/B/C/D)</span>
        </button>

        <button
          onClick={() => setActiveSection('transformation')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 cursor-pointer transition ${
            activeSection === 'transformation'
              ? 'bg-blue-800 text-white shadow'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span>Viết lại câu giữ nguyên nghĩa</span>
        </button>

        <button
          onClick={() => setActiveSection('essay')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 cursor-pointer transition ${
            activeSection === 'essay'
              ? 'bg-blue-800 text-white shadow'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <FileEdit className="w-4 h-4" />
          <span>Viết đoạn văn / Email (4 chủ đề)</span>
        </button>
      </div>

      {/* SECTION 1: ERROR IDENTIFICATION */}
      {activeSection === 'error' && (
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-950">
            <strong>Kỹ năng tìm lỗi sai:</strong> Đọc kĩ từng phần gạch chân A, B, C, D để kiểm tra cấu trúc động từ (V-ing hay to-V), so sánh trạng từ (không dùng "more faster"), hoặc dấu câu liên từ ghép.
          </div>

          {errorQuestions.map((q, idx) => {
            const isChecked = errorChecked[q.id];
            const selected = errorSelected[q.id];
            const isCorrect = selected && selected.toUpperCase() === q.answer.toUpperCase();

            return (
              <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-800">
                    Câu {idx + 1}: {q.topicTitle}
                  </span>
                  {q.reviewStatus === 'can_kiem_tra' && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                      Mục rà soát học liệu
                    </span>
                  )}
                </div>

                <p className="text-sm font-bold text-slate-900">
                  {q.prompt}
                </p>

                {/* 4 underlined parts A, B, C, D */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {q.options?.map(opt => {
                    const isOptSelected = selected === opt.id;
                    let optStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';

                    if (isChecked) {
                      if (opt.id === q.answer) {
                        optStyle = 'border-red-500 bg-red-50 text-red-950 font-bold';
                      } else if (isOptSelected) {
                        optStyle = 'border-slate-300 bg-slate-50 text-slate-500 line-through';
                      }
                    } else if (isOptSelected) {
                      optStyle = 'border-blue-700 bg-blue-50 text-blue-950 font-semibold';
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectErrorOpt(q.id, opt.id)}
                        disabled={isChecked}
                        className={`p-3 rounded-xl border-2 text-center text-xs sm:text-sm font-mono cursor-pointer transition ${optStyle}`}
                      >
                        <span className="block font-bold text-blue-700 text-sm mb-1">{opt.id}</span>
                        <span className="underline decoration-slate-400 decoration-2">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {!isChecked ? (
                  <button
                    onClick={() => handleCheckError(q.id)}
                    disabled={!selected}
                    className="px-5 py-2 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold rounded-lg shadow disabled:opacity-40 cursor-pointer"
                  >
                    Kiểm tra lỗi sai
                  </button>
                ) : (
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <p className="font-bold text-slate-900">
                      Phần chứa lỗi: <strong className="text-red-700">{q.answer}</strong>
                    </p>
                    <p className="text-slate-600">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* SECTION 2: SENTENCE TRANSFORMATION */}
      {activeSection === 'transformation' && (
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-xs text-indigo-950">
            <strong>Kỹ năng viết lại câu:</strong> Chuyển đổi linh hoạt giữa các mẫu câu quen thuộc (like more than &rarr; prefer to; faster runner &rarr; runs faster; so &rarr; therefore; interested in &rarr; fond of).
          </div>

          {transQuestions.map((q, idx) => {
            const hasChecked = transResults[q.id] !== undefined;
            const isCorrect = transResults[q.id];

            return (
              <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4">
                <span className="text-xs font-bold text-indigo-800">
                  Câu {idx + 1}: {q.topicTitle}
                </span>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 whitespace-pre-line font-mono">
                  {q.prompt}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-600">
                    Nhập câu hoàn chỉnh của em:
                  </label>
                  <input
                    type="text"
                    value={transInputs[q.id] || ''}
                    onChange={e => setTransInputs(prev => ({ ...prev, [q.id]: e.target.value }))}
                    placeholder="Gõ câu viết lại tại đây..."
                    className="w-full p-3 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCheckTransformation(q)}
                    disabled={!transInputs[q.id]?.trim()}
                    className="px-5 py-2 bg-indigo-800 hover:bg-indigo-900 text-white text-xs font-bold rounded-lg shadow disabled:opacity-40 cursor-pointer"
                  >
                    Chấm câu này
                  </button>

                  <button
                    onClick={() => {
                      setTransInputs(prev => ({ ...prev, [q.id]: q.answer }));
                      setTransResults(prev => ({ ...prev, [q.id]: true }));
                    }}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium rounded-lg cursor-pointer"
                  >
                    Xem gợi ý đáp án
                  </button>
                </div>

                {hasChecked && (
                  <div className={`p-4 rounded-xl border text-xs sm:text-sm space-y-1.5 ${
                    isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}>
                    <div className="flex items-center space-x-1.5 font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-700 flex items-center space-x-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Chính xác hoàn toàn!</span>
                        </span>
                      ) : (
                        <span className="text-amber-800 flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>Chưa khớp đáp án chuẩn!</span>
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-slate-800">
                      <strong>Đáp án đề xuất:</strong> {q.answer}
                    </p>
                    <p className="text-slate-600 italic">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* SECTION 3: ESSAY WRITING TOPICS */}
      {activeSection === 'essay' && (
        <div className="space-y-6">
          {/* Topic Selector */}
          <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-thin">
            {ESSAY_TOPICS.map(topic => (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedEssayTopicId(topic.id);
                  setEssaySubmitted(false);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition ${
                  selectedEssayTopicId === topic.id
                    ? 'bg-blue-800 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {topic.title.split('(')[0].trim()}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Writing Editor */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-blue-800">
                    Chủ đề viết tự luận
                  </span>
                  <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full">
                    {activeEssay.wordRequirement}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {activeEssay.title}
                </h3>
                <p className="text-xs text-slate-600 italic mt-1 font-serif">
                  "{activeEssay.prompt}"
                </p>
              </div>

              {/* Text Area */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Bài làm của em ({studentName}):</span>
                  <span className={`font-bold ${
                    wordCount >= 70 && wordCount <= 120 ? 'text-emerald-600' : 'text-slate-600'
                  }`}>
                    Số từ hiện tại: {wordCount} từ
                  </span>
                </div>

                <textarea
                  rows={8}
                  value={essayContent}
                  onChange={e => setEssayContent(e.target.value)}
                  placeholder="Bắt đầu viết bài của em tại đây..."
                  disabled={essaySubmitted}
                  className="w-full p-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm leading-relaxed font-sans"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500 italic">
                  *Số từ chỉ là công cụ hỗ trợ. Bài viết sẽ được giáo viên chấm theo Rubric 4 tiêu chí.
                </span>

                {!essaySubmitted ? (
                  <button
                    onClick={handleSubmitEssay}
                    disabled={!essayContent.trim()}
                    className="inline-flex items-center space-x-2 px-6 py-2.5 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold rounded-xl shadow disabled:opacity-40 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Nộp bài cho Giáo viên chấm</span>
                  </button>
                ) : (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Đã nộp bài thành công! Trạng thái: Chờ Cô Mai Thu chấm điểm.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Outline & Guidance */}
            <div className="space-y-4">
              {/* Outline */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-blue-700" />
                  <span>Dàn ý gợi ý (Outline):</span>
                </h4>
                <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed font-sans">
                  {activeEssay.outline}
                </div>
              </div>

              {/* Suggested Vocab */}
              <div className="bg-amber-50/70 rounded-2xl border border-amber-200 p-5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Từ vựng nên dùng:</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeEssay.suggestedVocabulary.map((v, i) => (
                    <span key={i} className="text-[11px] font-semibold bg-white text-amber-900 px-2 py-0.5 rounded border border-amber-200">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rubric Criteria */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 text-[11px] text-slate-600 space-y-1">
                <p className="font-bold text-slate-800 uppercase tracking-wide">
                  Rubric chấm điểm (Thang 10):
                </p>
                <p>1. Nội dung & Bám sát đề: 2.5đ</p>
                <p>2. Mạch lạc & Liên kết: 2.5đ</p>
                <p>3. Từ vựng phong phú: 2.5đ</p>
                <p>4. Ngữ pháp & Dấu câu: 2.5đ</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
