import React, { useState } from 'react';
import { Question, ReviewStatus } from '../../types';
import { 
  CheckCircle, 
  AlertTriangle, 
  Archive, 
  Edit3, 
  Search, 
  Filter, 
  CheckSquare, 
  Square,
  Sparkles,
  HelpCircle,
  FileCheck2
} from 'lucide-react';
import { bulkApproveQuestions, updateQuestionStatus, updateQuestion } from '../../services/storageService';
import { UnderlinedText } from '../UnderlinedText';

interface SourceReviewViewProps {
  questions: Question[];
  onQuestionsUpdated: (questions: Question[]) => void;
}

export const SourceReviewView: React.FC<SourceReviewViewProps> = ({
  questions,
  onQuestionsUpdated
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Filter questions
  const filteredQuestions = questions.filter(q => {
    const matchesStatus = filterStatus === 'all' || q.reviewStatus === filterStatus;
    const matchesSearch = searchTerm === '' || 
      q.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.sourceReference.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Toggle selection for bulk actions
  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === filteredQuestions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredQuestions.map(q => q.id));
    }
  };

  const handleBulkApprove = () => {
    if (selectedIds.length === 0) return;
    const updated = bulkApproveQuestions(selectedIds);
    onQuestionsUpdated(updated);
    setSelectedIds([]);
  };

  const handleSingleStatusChange = (id: string, status: ReviewStatus) => {
    const updated = updateQuestionStatus(id, status);
    onQuestionsUpdated(updated);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;
    const updated = updateQuestion(editingQuestion);
    onQuestionsUpdated(updated);
    setEditingQuestion(null);
  };

  const needsReviewCount = questions.filter(q => q.reviewStatus === 'can_kiem_tra').length;
  const pendingCount = questions.filter(q => q.reviewStatus === 'cho_duyet').length;
  const approvedCount = questions.filter(q => q.reviewStatus === 'da_duyet').length;

  return (
    <div className="space-y-6">
      {/* Title & Guidelines */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
              Khu vực Giáo viên • Rà Soát Học Liệu Nguồn
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Rà Soát Câu Hỏi Từ Đề Cương Ôn Tập Giữa Kì I
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Chỉ các câu có trạng thái <strong className="text-emerald-700">"Đã duyệt"</strong> mới được đưa vào bài làm của học sinh.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              Cần kiểm tra: {needsReviewCount}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
              Đã duyệt: {approvedCount}
            </span>
          </div>
        </div>

        {/* 8 Crucial Source Issues Alert Box */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-300 text-xs text-amber-950 space-y-2">
          <p className="font-bold text-amber-900 flex items-center space-x-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>8 Điểm Cần Rà Soát Đặc Biệt Được Hệ Thống Tự Động Gắn Cờ:</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-700">
            <div>1. Trắc nghiệm III, Q16: Chỗ trống đứng trước từ "for" bị thừa.</div>
            <div>2. Trắc nghiệm III, Q18: Phương án "so" xuất hiện 2 lần trùng nhau.</div>
            <div>3. Trắc nghiệm III, Q20: Phân biệt "more badly" và "worse than" chuẩn SGK.</div>
            <div>4. Bài Britain: Câu 25h TV không nêu trong bài đọc, có 2 phương án Not Mentioned/Not Stated.</div>
            <div>5. Trọng âm: Phân chia 2-2 và từ thay đổi trọng âm (hospitable).</div>
            <div>6. Tìm lỗi câu mật khẩu: "You need a password to log in..." vốn dĩ đúng ngữ pháp.</div>
            <div>7. Giao tiếp: Có thể có nhiều câu trả lời hợp lý.</div>
            <div>8. Lỗi đánh máy tài liệu: từ "dinne" và đại từ "her" &rarr; "He".</div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center space-x-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Tìm mã câu, nội dung hoặc vị trí nguồn..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 cursor-pointer font-medium"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="can_kiem_tra">Cần kiểm tra ({needsReviewCount})</option>
              <option value="cho_duyet">Chờ duyệt ({pendingCount})</option>
              <option value="da_duyet">Đã duyệt ({approvedCount})</option>
              <option value="luu_tru">Lưu trữ</option>
            </select>
          </div>

          {/* Bulk approve button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={selectAll}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center space-x-1 cursor-pointer"
            >
              {selectedIds.length === filteredQuestions.length && filteredQuestions.length > 0 ? (
                <CheckSquare className="w-3.5 h-3.5" />
              ) : (
                <Square className="w-3.5 h-3.5" />
              )}
              <span>Chọn tất cả ({selectedIds.length})</span>
            </button>

            <button
              onClick={handleBulkApprove}
              disabled={selectedIds.length === 0}
              className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg shadow flex items-center space-x-1 cursor-pointer transition"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Duyệt hàng loạt đã chọn</span>
            </button>
          </div>
        </div>
      </div>

      {/* Questions Review Table / Cards */}
      <div className="space-y-4">
        {filteredQuestions.map(q => {
          const isSelected = selectedIds.includes(q.id);
          let statusBadge = 'bg-slate-100 text-slate-700';
          if (q.reviewStatus === 'da_duyet') statusBadge = 'bg-emerald-100 text-emerald-800 border-emerald-300';
          if (q.reviewStatus === 'can_kiem_tra') statusBadge = 'bg-amber-100 text-amber-900 border-amber-300';
          if (q.reviewStatus === 'cho_duyet') statusBadge = 'bg-blue-100 text-blue-900 border-blue-300';
          if (q.reviewStatus === 'luu_tru') statusBadge = 'bg-slate-200 text-slate-600';

          return (
            <div
              key={q.id}
              className={`p-6 rounded-2xl border transition space-y-4 shadow-sm ${
                isSelected ? 'bg-purple-50/50 border-purple-400' : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelectOne(q.id)}
                    className="w-4 h-4 rounded text-purple-600 cursor-pointer"
                  />
                  <span className="font-mono text-xs font-bold text-slate-600">
                    Mã: {q.id} (v{q.version})
                  </span>
                  <span className="text-xs text-blue-800 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {q.sourceReference}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusBadge}`}>
                    {q.reviewStatus === 'da_duyet' && 'Đã duyệt'}
                    {q.reviewStatus === 'can_kiem_tra' && 'Cần kiểm tra'}
                    {q.reviewStatus === 'cho_duyet' && 'Chờ duyệt'}
                    {q.reviewStatus === 'luu_tru' && 'Đã lưu trữ'}
                  </span>
                </div>
              </div>

              {/* Prompt & Options */}
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">Nguyên văn câu hỏi:</p>
                <h3 className="text-base font-bold text-slate-900 leading-snug whitespace-pre-line">
                  {q.prompt}
                </h3>
                {q.options && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs">
                    {q.options.map(opt => (
                      <div 
                        key={opt.id}
                        className={`p-2 rounded-lg border font-mono ${
                          opt.id === q.answer 
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <strong>{opt.id}.</strong> <UnderlinedText text={opt.text} underlinedPart={q.underlinedPart} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Review Flags / Notes if any */}
              {q.reviewNote && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-1">
                  <p className="font-bold text-amber-900 flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Vấn đề phát hiện:</span>
                  </p>
                  <p>{q.reviewNote}</p>
                  {q.suggestedRevision && (
                    <p className="pt-1 text-slate-800">
                      <strong>Bản sửa đề xuất:</strong> {q.suggestedRevision}
                    </p>
                  )}
                </div>
              )}

              {/* Proposed Answer & Explanation */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <p>
                  <strong>Đáp án đề xuất:</strong> <span className="font-bold text-blue-900 font-mono text-sm">{q.answer}</span>
                </p>
                <p><strong>Giải thích:</strong> {q.explanation}</p>
              </div>

              {/* Actions on this single question */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                <button
                  onClick={() => setEditingQuestion(q)}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Sửa nội dung câu</span>
                </button>

                <div className="flex items-center space-x-2">
                  {q.reviewStatus !== 'da_duyet' && (
                    <button
                      onClick={() => handleSingleStatusChange(q.id, 'da_duyet')}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer transition shadow"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Duyệt câu này</span>
                    </button>
                  )}
                  {q.reviewStatus !== 'can_kiem_tra' && (
                    <button
                      onClick={() => handleSingleStatusChange(q.id, 'can_kiem_tra')}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold cursor-pointer"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Đánh dấu cần kiểm tra</span>
                    </button>
                  )}
                  {q.reviewStatus !== 'luu_tru' && (
                    <button
                      onClick={() => handleSingleStatusChange(q.id, 'luu_tru')}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium cursor-pointer"
                    >
                      <Archive className="w-3.5 h-3.5" />
                      <span>Lưu trữ</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Question Modal */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Sửa Câu Hỏi: {editingQuestion.id}
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nguyên văn đề câu hỏi:</label>
                <textarea
                  rows={3}
                  value={editingQuestion.prompt}
                  onChange={e => setEditingQuestion({ ...editingQuestion, prompt: e.target.value })}
                  className="w-full p-3 border border-slate-300 rounded-lg text-xs font-sans"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Đáp án đúng chuẩn:</label>
                <input
                  type="text"
                  value={editingQuestion.answer}
                  onChange={e => setEditingQuestion({ ...editingQuestion, answer: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Giải thích chi tiết (Tiếng Việt):</label>
                <textarea
                  rows={3}
                  value={editingQuestion.explanation}
                  onChange={e => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                  className="w-full p-3 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ghi chú rà soát / Đề xuất sửa:</label>
                <input
                  type="text"
                  value={editingQuestion.reviewNote || ''}
                  onChange={e => setEditingQuestion({ ...editingQuestion, reviewNote: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingQuestion(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-800 text-white rounded-lg font-bold cursor-pointer shadow"
                >
                  Lưu thay đổi (Tăng version)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
