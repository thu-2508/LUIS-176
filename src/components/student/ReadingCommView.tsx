import React, { useState } from 'react';
import { Question } from '../../types';
import { READING_PASSAGES } from '../../data/sourceQuestions';
import { SignboardMedia } from '../SignboardMedia';
import { 
  BookOpen, 
  MessageSquare, 
  Image as ImageIcon, 
  CheckCircle, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { addMistake } from '../../services/storageService';

interface ReadingCommViewProps {
  questions: Question[];
}

export const ReadingCommView: React.FC<ReadingCommViewProps> = ({ questions }) => {
  const [subTab, setSubTab] = useState<'reading' | 'signboards' | 'communication'>('reading');
  const [selectedPassageId, setSelectedPassageId] = useState(READING_PASSAGES[0].id);

  const activePassage = READING_PASSAGES.find(p => p.id === selectedPassageId) || READING_PASSAGES[0];

  // Questions linked to this passage
  const passageQuestions = React.useMemo(() => {
    return questions.filter(q => q.passageId === activePassage.id);
  }, [questions, activePassage.id]);

  // Sign questions
  const signQuestions = React.useMemo(() => {
    return questions.filter(q => q.type === 'sign_notice');
  }, [questions]);

  // Communication questions
  const commQuestions = React.useMemo(() => {
    return questions.filter(q => q.topic === 'communication' && q.type !== 'sign_notice');
  }, [questions]);

  // Answer tracking state
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});

  const handleSelectOption = (qId: string, optId: string) => {
    if (checkedQuestions[qId]) return;
    setUserAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const handleCheckQuestion = (q: Question) => {
    const ans = userAnswers[q.id];
    if (!ans) return;

    setCheckedQuestions(prev => ({ ...prev, [q.id]: true }));

    const isCorrect = ans.toUpperCase() === q.answer.toUpperCase() ||
      (q.acceptedAnswers && q.acceptedAnswers.includes(ans.toUpperCase()));

    if (!isCorrect) {
      addMistake({
        questionId: q.id,
        questionPrompt: q.prompt,
        topic: q.topic,
        skill: q.skill,
        studentAnswer: ans,
        correctAnswer: q.answer,
        explanation: q.explanation,
        userReason: 'Đọc hiểu chưa kĩ văn bản'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub Navigation */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex space-x-2">
        <button
          onClick={() => setSubTab('reading')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 cursor-pointer transition ${
            subTab === 'reading'
              ? 'bg-blue-800 text-white shadow'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Bài đọc hiểu ({READING_PASSAGES.length} đoạn)</span>
        </button>

        <button
          onClick={() => setSubTab('signboards')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 cursor-pointer transition ${
            subTab === 'signboards'
              ? 'bg-blue-800 text-white shadow'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>3 Biển báo tài liệu nguồn</span>
        </button>

        <button
          onClick={() => setSubTab('communication')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 cursor-pointer transition ${
            subTab === 'communication'
              ? 'bg-blue-800 text-white shadow'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Giao tiếp hàng ngày</span>
        </button>
      </div>

      {/* SUBTAB 1: READING PASSAGES */}
      {subTab === 'reading' && (
        <div className="space-y-6">
          {/* Passage tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-thin">
            {READING_PASSAGES.map(pass => (
              <button
                key={pass.id}
                onClick={() => setSelectedPassageId(pass.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition ${
                  selectedPassageId === pass.id
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {pass.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Passage Column */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-blue-700 uppercase">
                  Reading Text ({activePassage.wordCount} words)
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {activePassage.title}
                </h3>
                {activePassage.vietnameseSummary && (
                  <p className="text-xs text-slate-500 italic mt-1 bg-blue-50/60 p-2 rounded-lg border border-blue-100">
                    Tóm tắt: {activePassage.vietnameseSummary}
                  </p>
                )}
              </div>

              <div className="text-sm leading-relaxed text-slate-800 whitespace-pre-line font-serif space-y-3">
                {activePassage.content}
              </div>
            </div>

            {/* Questions Column */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Câu hỏi đọc hiểu ({passageQuestions.length} câu)
              </h4>

              {passageQuestions.map((q, idx) => {
                const isChecked = checkedQuestions[q.id];
                const userAns = userAnswers[q.id];
                const isCorrect = userAns && (
                  userAns.toUpperCase() === q.answer.toUpperCase() ||
                  (q.acceptedAnswers && q.acceptedAnswers.includes(userAns.toUpperCase()))
                );

                return (
                  <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-800">
                        Câu {idx + 1}:
                      </span>
                      {q.reviewStatus === 'can_kiem_tra' && (
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                          Câu rà soát (25h TV)
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-bold text-slate-900">
                      {q.prompt}
                    </p>

                    <div className="space-y-2">
                      {q.options?.map(opt => {
                        const isSelected = userAns === opt.id;
                        let optStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';

                        if (isChecked) {
                          if (opt.id === q.answer || (q.acceptedAnswers && q.acceptedAnswers.includes(opt.id))) {
                            optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                          } else if (isSelected) {
                            optStyle = 'border-red-400 bg-red-50 text-red-950';
                          }
                        } else if (isSelected) {
                          optStyle = 'border-blue-700 bg-blue-50 text-blue-950 font-semibold';
                        }

                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption(q.id, opt.id)}
                            disabled={isChecked}
                            className={`w-full text-left p-2.5 rounded-xl border text-xs sm:text-sm flex items-center space-x-2.5 cursor-pointer transition ${optStyle}`}
                          >
                            <span className="w-5 h-5 rounded bg-slate-100 font-bold text-xs flex items-center justify-center flex-shrink-0">
                              {opt.id}
                            </span>
                            <span>{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {!isChecked ? (
                      <button
                        onClick={() => handleCheckQuestion(q)}
                        disabled={!userAns}
                        className="px-4 py-1.5 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold rounded-lg shadow disabled:opacity-40 cursor-pointer"
                      >
                        Kiểm tra câu này
                      </button>
                    ) : (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                        <div className="flex items-center space-x-1.5 font-bold">
                          {isCorrect ? (
                            <span className="text-emerald-700 flex items-center space-x-1">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Đúng rồi!</span>
                            </span>
                          ) : (
                            <span className="text-red-700 flex items-center space-x-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>Chưa đúng! Đáp án: {q.answer}</span>
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: SIGNBOARDS */}
      {subTab === 'signboards' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-950 leading-relaxed">
            <strong>Kỹ năng đọc biển báo / thông báo (Signboards & Notices):</strong> Học sinh lớp 8 cần nắm được ý nghĩa của 3 biển báo/thông báo trong tài liệu ôn tập để làm tốt các câu hỏi tình huống thực tế.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {signQuestions.map(q => {
              const isChecked = checkedQuestions[q.id];
              const userAns = userAnswers[q.id];
              const isCorrect = userAns && userAns.toUpperCase() === q.answer.toUpperCase();

              return (
                <div key={q.id} className="bg-white rounded-2xl border border-slate-200 shadow-md p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-bold text-blue-800 uppercase">
                      {q.topicTitle}
                    </span>

                    {/* Signboard Visual */}
                    {q.mediaId && <SignboardMedia mediaId={q.mediaId} />}

                    <p className="text-xs sm:text-sm font-bold text-slate-900 mt-3">
                      {q.prompt}
                    </p>

                    <div className="space-y-2 mt-3">
                      {q.options?.map(opt => {
                        const isSelected = userAns === opt.id;
                        let optStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';

                        if (isChecked) {
                          if (opt.id === q.answer) {
                            optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                          } else if (isSelected) {
                            optStyle = 'border-red-400 bg-red-50 text-red-950';
                          }
                        } else if (isSelected) {
                          optStyle = 'border-blue-700 bg-blue-50 text-blue-950 font-semibold';
                        }

                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption(q.id, opt.id)}
                            disabled={isChecked}
                            className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-center space-x-2 cursor-pointer transition ${optStyle}`}
                          >
                            <span className="w-5 h-5 rounded bg-slate-100 font-bold text-xs flex items-center justify-center flex-shrink-0">
                              {opt.id}
                            </span>
                            <span>{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    {!isChecked ? (
                      <button
                        onClick={() => handleCheckQuestion(q)}
                        disabled={!userAns}
                        className="w-full py-2 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold rounded-lg shadow disabled:opacity-40 cursor-pointer"
                      >
                        Kiểm tra đáp án
                      </button>
                    ) : (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                        <div className="font-bold">
                          {isCorrect ? (
                            <span className="text-emerald-700">Chính xác!</span>
                          ) : (
                            <span className="text-red-700">Chưa đúng! Đáp án: {q.answer}</span>
                          )}
                        </div>
                        <p className="text-slate-600">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 3: COMMUNICATION */}
      {subTab === 'communication' && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-xs text-indigo-950">
            <strong>Mẫu câu giao tiếp trọng tâm:</strong> Mời và đáp lại lời mời (Would you like...?), Khen ngợi và cảm ơn (What a nice... / That's very kind of you), Nhờ giúp đỡ (Can you help me... / Certainly!).
          </div>

          {commQuestions.map((q, idx) => {
            const isChecked = checkedQuestions[q.id];
            const userAns = userAnswers[q.id];
            const isCorrect = userAns && userAns.toUpperCase() === q.answer.toUpperCase();

            return (
              <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4">
                <span className="text-xs font-bold text-indigo-800">
                  Tình huống {idx + 1}: {q.topicTitle}
                </span>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 whitespace-pre-line font-mono text-xs sm:text-sm text-slate-800 font-semibold">
                  {q.prompt}
                </div>

                <div className="space-y-2">
                  {q.options?.map(opt => {
                    const isSelected = userAns === opt.id;
                    let optStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';

                    if (isChecked) {
                      if (opt.id === q.answer) {
                        optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                      } else if (isSelected) {
                        optStyle = 'border-red-400 bg-red-50 text-red-950';
                      }
                    } else if (isSelected) {
                      optStyle = 'border-indigo-700 bg-indigo-50 text-indigo-950 font-semibold';
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(q.id, opt.id)}
                        disabled={isChecked}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-center space-x-2.5 cursor-pointer transition ${optStyle}`}
                      >
                        <span className="w-6 h-6 rounded bg-slate-100 font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {opt.id}
                        </span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {!isChecked ? (
                  <button
                    onClick={() => handleCheckQuestion(q)}
                    disabled={!userAns}
                    className="px-5 py-2 bg-indigo-800 hover:bg-indigo-900 text-white text-xs font-bold rounded-lg shadow disabled:opacity-40 cursor-pointer"
                  >
                    Kiểm tra câu giao tiếp
                  </button>
                ) : (
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <p className="font-bold text-slate-900">
                      Đáp án đúng: <strong className="text-indigo-700">{q.answer}</strong>
                    </p>
                    <p className="text-slate-600">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
