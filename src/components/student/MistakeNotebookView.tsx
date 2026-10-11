import React, { useState } from 'react';
import { MistakeEntry } from '../../types';
import { 
  AlertCircle, 
  CheckCircle, 
  Calendar, 
  RotateCcw, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { resolveMistake, saveMistakes } from '../../services/storageService';
import { UnderlinedText } from '../UnderlinedText';

interface MistakeNotebookViewProps {
  mistakes: MistakeEntry[];
  onMistakesUpdated: (mistakes: MistakeEntry[]) => void;
}

export const MistakeNotebookView: React.FC<MistakeNotebookViewProps> = ({
  mistakes,
  onMistakesUpdated
}) => {
  const [filter, setFilter] = useState<'all' | 'unresolved' | 'resolved'>('unresolved');
  const [editingReasonId, setEditingReasonId] = useState<string | null>(null);
  const [customReason, setCustomReason] = useState('');

  const filtered = mistakes.filter(m => {
    if (filter === 'unresolved') return !m.resolved;
    if (filter === 'resolved') return m.resolved;
    return true;
  });

  const handleResolve = (id: string) => {
    resolveMistake(id);
    const updated = mistakes.map(m => m.id === id ? { ...m, resolved: true, lastReviewedAt: new Date().toISOString() } : m);
    onMistakesUpdated(updated);
  };

  const handleSaveReason = (id: string) => {
    if (!customReason.trim()) return;
    const updated = mistakes.map(m => m.id === id ? { ...m, userReason: customReason.trim() } : m);
    saveMistakes(updated);
    onMistakesUpdated(updated);
    setEditingReasonId(null);
    setCustomReason('');
  };

  const REASON_PRESETS = [
    'Chưa thuộc cấu trúc ngữ pháp',
    'Nhầm lẫn giới từ (keen on / fond of)',
    'Quên từ vựng trong bài đọc',
    'Nhầm dấu câu của câu ghép (; however, / , so)',
    'Đọc đề vội, không chú ý từ gạch chân',
    'Nhầm cách phát âm nguyên âm'
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Học Từ Lỗi Sai (Spaced Repetition)
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Sổ Lỗi Sai Của Em
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Ôn lại sau 1 ngày, 3 ngày và 7 ngày giúp học sinh yếu khắc phục dứt điểm lỗ hổng.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex space-x-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setFilter('unresolved')}
            className={`px-3 py-1.5 rounded-lg cursor-pointer transition ${
              filter === 'unresolved' ? 'bg-amber-500 text-slate-900 shadow' : 'text-slate-600'
            }`}
          >
            Cần ôn ({mistakes.filter(m => !m.resolved).length})
          </button>
          <button
            onClick={() => setFilter('resolved')}
            className={`px-3 py-1.5 rounded-lg cursor-pointer transition ${
              filter === 'resolved' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600'
            }`}
          >
            Đã khắc phục ({mistakes.filter(m => m.resolved).length})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg cursor-pointer transition ${
              filter === 'all' ? 'bg-white text-slate-800 shadow' : 'text-slate-600'
            }`}
          >
            Tất cả ({mistakes.length})
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
          <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
          <h3 className="font-bold text-slate-800">Không có câu sai nào trong mục này!</h3>
          <p className="text-xs text-slate-500">
            Hãy tiếp tục luyện tập hoặc làm bài thi thử để phát hiện thêm các điểm cần củng cố.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(entry => (
            <div 
              key={entry.id}
              className={`p-6 rounded-2xl border shadow-sm transition space-y-4 ${
                entry.resolved
                  ? 'bg-slate-50/70 border-slate-200 opacity-80'
                  : 'bg-white border-amber-200'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-amber-800 uppercase">
                  {entry.topic.replace('grammar_', 'Ngữ pháp ').replace('unit', 'Unit ')}
                </span>
                <span className="text-[11px] text-slate-400">
                  Ghi nhận: {new Date(entry.createdAt).toLocaleDateString('vi-VN')}
                </span>
              </div>

              {/* Prompt */}
              <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug whitespace-pre-line">
                {entry.questionPrompt}
              </h4>

              {/* Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-red-950">
                  <span className="font-bold text-red-800 block mb-0.5">Câu em đã chọn:</span>
                  <span className="font-mono text-sm">
                    <UnderlinedText text={entry.studentAnswer} />
                  </span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
                  <span className="font-bold text-emerald-800 block mb-0.5">Đáp án đúng chuẩn:</span>
                  <span className="font-mono text-sm font-bold">
                    <UnderlinedText text={entry.correctAnswer} />
                  </span>
                </div>
              </div>

              {/* Explanation */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                <strong>Giải thích vì sao đúng:</strong> {entry.explanation}
              </div>

              {/* Self Reflection / Reason why made error */}
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-900 flex items-center space-x-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Lý do em làm sai:</span>
                  </span>
                  {editingReasonId !== entry.id && (
                    <button
                      onClick={() => {
                        setEditingReasonId(entry.id);
                        setCustomReason(entry.userReason || '');
                      }}
                      className="text-blue-700 hover:underline font-semibold"
                    >
                      {entry.userReason ? 'Đổi lý do' : 'Ghi nhận lý do'}
                    </button>
                  )}
                </div>

                {editingReasonId === entry.id ? (
                  <div className="space-y-2 pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {REASON_PRESETS.map((p, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCustomReason(p)}
                          className="px-2 py-1 bg-white border border-amber-300 rounded text-[11px] text-amber-950 hover:bg-amber-100 cursor-pointer"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={customReason}
                        onChange={e => setCustomReason(e.target.value)}
                        placeholder="Hoặc tự ghi lý do..."
                        className="flex-1 p-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                      <button
                        onClick={() => handleSaveReason(entry.id)}
                        className="px-3 py-1 bg-amber-600 text-white rounded-lg font-bold text-xs cursor-pointer"
                      >
                        Lưu
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-700 italic">
                    "{entry.userReason || 'Chưa gắn lý do sai'}"
                  </p>
                )}
              </div>

              {/* Action */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Chu kỳ nhắc: 1–3–7 ngày</span>
                </span>

                {!entry.resolved ? (
                  <button
                    onClick={() => handleResolve(entry.id)}
                    className="inline-flex items-center space-x-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow cursor-pointer transition"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Em đã hiểu và khắc phục</span>
                  </button>
                ) : (
                  <span className="text-xs font-bold text-emerald-700 flex items-center space-x-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Đã khắc phục xong!</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
