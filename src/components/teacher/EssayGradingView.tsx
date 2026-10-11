import React, { useState } from 'react';
import { EssaySubmission } from '../../types';
import { getEssays, saveEssay } from '../../services/storageService';
import { TEACHER_INFO } from '../../services/certificateService';
import { FileEdit, CheckCircle, Clock, User, Award, Send } from 'lucide-react';

export const EssayGradingView: React.FC = () => {
  const [essays, setEssays] = useState<EssaySubmission[]>(getEssays());
  const [activeEssayId, setActiveEssayId] = useState<string | null>(essays[0]?.id || null);

  // Rubric scoring inputs
  const [taskScore, setTaskScore] = useState<number>(2.0); // max 2.5
  const [coherenceScore, setCoherenceScore] = useState<number>(2.0); // max 2.5
  const [vocabScore, setVocabScore] = useState<number>(2.0); // max 2.5
  const [grammarScore, setGrammarScore] = useState<number>(2.0); // max 2.5
  const [teacherFeedback, setTeacherFeedback] = useState<string>(
    'Bài viết bám sát đề, diễn đạt mạch lạc. Chú ý thêm một vài lỗi chính tả và mạo từ nhé!'
  );

  const activeEssay = essays.find(e => e.id === activeEssayId) || essays[0];

  const handleGradeEssay = () => {
    if (!activeEssay) return;
    const totalScore = Number((taskScore + coherenceScore + vocabScore + grammarScore).toFixed(1));

    const updatedEssay: EssaySubmission = {
      ...activeEssay,
      status: 'graded',
      teacherScore: totalScore,
      teacherFeedback: `${teacherFeedback} - GV ${TEACHER_INFO.name}`,
      rubricScores: {
        taskResponse: taskScore,
        coherence: coherenceScore,
        vocabulary: vocabScore,
        grammar: grammarScore
      }
    };

    saveEssay(updatedEssay);
    setEssays(getEssays());
    alert(`Đã lưu kết quả chấm bài: ${totalScore}/10 điểm!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
          Khu vực Giáo viên • Chấm Tự Luận
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Chấm Đoạn Văn / Email Theo Rubric Tiêu Chuẩn (Thang 10)
        </h2>
        <p className="text-xs text-slate-500">
          Giáo viên trực tiếp đánh giá theo 4 tiêu chí rõ ràng, không sử dụng điểm giả lập số từ.
        </p>
      </div>

      {essays.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2 max-w-md mx-auto">
          <Clock className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="font-bold text-slate-800">Chưa có bài viết tự luận nào được nộp</h3>
          <p className="text-xs text-slate-500">
            Khi học sinh hoàn thành viết đoạn văn hoặc email trong mục "Luyện viết", bài làm sẽ hiển thị tại đây để Cô Mai Thu chấm điểm.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List of Essays */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase text-slate-500 mb-2">
              Danh sách bài nộp ({essays.length})
            </h4>

            {essays.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveEssayId(item.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs cursor-pointer transition ${
                  activeEssay?.id === item.id
                    ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="line-clamp-1">{item.topicTitle}</span>
                  <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                    item.status === 'graded' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.status === 'graded' ? `${item.teacherScore}đ` : 'Chờ chấm'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {item.submittedAt} • {item.wordCount} từ
                </div>
              </button>
            ))}
          </div>

          {/* Active Essay Details & Grading form */}
          {activeEssay && (
            <div className="lg:col-span-2 space-y-6">
              {/* Student Essay Box */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-bold text-slate-900 text-base">
                    {activeEssay.topicTitle}
                  </h3>
                  <span className="text-xs text-slate-500">
                    Số từ: <strong>{activeEssay.wordCount}</strong>
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-sans">
                  {activeEssay.studentContent}
                </div>
              </div>

              {/* Rubric Grading Controls */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span>Rubric Chấm Điểm 4 Tiêu Chí (Thang 10)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      1. Nội dung & bám sát đề (0 - 2.5đ):
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      min="0"
                      max="2.5"
                      value={taskScore}
                      onChange={e => setTaskScore(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 border border-slate-300 rounded-lg font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      2. Mạch lạc & liên kết (0 - 2.5đ):
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      min="0"
                      max="2.5"
                      value={coherenceScore}
                      onChange={e => setCoherenceScore(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 border border-slate-300 rounded-lg font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      3. Từ vựng & ngữ cảnh (0 - 2.5đ):
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      min="0"
                      max="2.5"
                      value={vocabScore}
                      onChange={e => setVocabScore(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 border border-slate-300 rounded-lg font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      4. Ngữ pháp, dấu câu & chính tả (0 - 2.5đ):
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      min="0"
                      max="2.5"
                      value={grammarScore}
                      onChange={e => setGrammarScore(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 border border-slate-300 rounded-lg font-bold"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="font-semibold text-slate-700 block mb-1 text-xs">
                    Nhận xét sư phạm của Giáo viên:
                  </label>
                  <textarea
                    rows={3}
                    value={teacherFeedback}
                    onChange={e => setTeacherFeedback(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="text-base font-black text-blue-900">
                    Tổng điểm: {(taskScore + coherenceScore + vocabScore + grammarScore).toFixed(1)} / 10
                  </div>

                  <button
                    onClick={handleGradeEssay}
                    className="inline-flex items-center space-x-1.5 px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow cursor-pointer transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Lưu điểm & Gửi nhận xét</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
