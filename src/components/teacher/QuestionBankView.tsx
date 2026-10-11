import React, { useState } from 'react';
import { Question, TopicType, SkillType, DifficultyLevel, QuestionType, OriginType, ReviewStatus } from '../../types';
import { 
  Database, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  AlertTriangle,
  Archive,
  Save,
  X
} from 'lucide-react';
import { updateQuestion, saveQuestions } from '../../services/storageService';
import { UnderlinedText } from '../UnderlinedText';

interface QuestionBankViewProps {
  questions: Question[];
  onQuestionsUpdated: (questions: Question[]) => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  questions,
  onQuestionsUpdated
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [topicFilter, setTopicFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [originFilter, setOriginFilter] = useState('all');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingQ, setEditingQ] = useState<Question | null>(null);

  // Filtered
  const filtered = questions.filter(q => {
    const matchesSearch = searchTerm === '' || 
      q.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = topicFilter === 'all' || q.topic === topicFilter;
    const matchesStatus = statusFilter === 'all' || q.reviewStatus === statusFilter;
    const matchesOrigin = originFilter === 'all' || q.originType === originFilter;
    return matchesSearch && matchesTopic && matchesStatus && matchesOrigin;
  });

  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    id: `q_cust_${Date.now()}`,
    version: 1,
    topic: 'grammar_verbs',
    topicTitle: 'Động từ chỉ thích/ghét',
    skill: 'grammar',
    level: 'thong_hieu',
    type: 'multiple_choice',
    prompt: '',
    answer: 'A',
    points: 0.25,
    hint1: '',
    hint2: '',
    explanation: '',
    sourceReference: 'Giáo viên bổ sung',
    originType: 'luyen_tap_bo_sung',
    reviewStatus: 'da_duyet',
    options: [
      { id: 'A', text: '' },
      { id: 'B', text: '' },
      { id: 'C', text: '' },
      { id: 'D', text: '' }
    ]
  });

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.prompt || !newQuestion.answer) {
      alert('Vui lòng nhập nội dung câu hỏi và đáp án đúng.');
      return;
    }

    const created: Question = {
      ...(newQuestion as Question),
      id: newQuestion.id || `q_cust_${Date.now()}`
    };

    const updated = updateQuestion(created);
    onQuestionsUpdated(updated);
    setIsAddingNew(false);
    alert('Đã thêm câu hỏi mới vào ngân hàng thành công!');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc muốn xóa hoặc lưu trữ câu hỏi này?')) {
      const updated = questions.filter(q => q.id !== id);
      saveQuestions(updated);
      onQuestionsUpdated(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
              Khu vực Giáo viên • Ngân Hàng Câu Hỏi
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Quản Lý Ngân Hàng Đề Thi ({questions.length} câu)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Phân định minh bạch: Câu trích từ tài liệu, Câu nguồn đã chỉnh sửa, và Câu luyện tập bổ sung do GV biên soạn.
            </p>
          </div>

          <button
            onClick={() => setIsAddingNew(true)}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow cursor-pointer transition"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm câu hỏi mới</span>
          </button>
        </div>

        {/* Filter controls */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Tìm theo từ khóa..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
            />
          </div>

          <select
            value={topicFilter}
            onChange={e => setTopicFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2 py-1.5 cursor-pointer"
          >
            <option value="all">Tất cả chuyên đề</option>
            <option value="grammar_verbs">Động từ chỉ thích/ghét</option>
            <option value="grammar_adverbs">So sánh hơn của trạng từ</option>
            <option value="grammar_compound">Câu ghép & từ nối</option>
            <option value="pronunciation">Phát âm & trọng âm</option>
            <option value="unit1_leisure">Unit 1: Leisure</option>
            <option value="unit2_countryside">Unit 2: Countryside</option>
            <option value="unit3_teenagers">Unit 3: Teenagers</option>
            <option value="communication">Giao tiếp</option>
            <option value="reading">Đọc hiểu</option>
            <option value="writing">Viết</option>
          </select>

          <select
            value={originFilter}
            onChange={e => setOriginFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2 py-1.5 cursor-pointer"
          >
            <option value="all">Tất cả nguồn gốc</option>
            <option value="trich_nguyen_ban">Trích nguyên bản</option>
            <option value="nguon_da_chinh_sua">Nguồn đã chỉnh sửa</option>
            <option value="luyen_tap_bo_sung">Luyện tập bổ sung (GV biên soạn)</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2 py-1.5 cursor-pointer"
          >
            <option value="all">Tất cả trạng thái duyệt</option>
            <option value="da_duyet">Đã duyệt (Dùng cho HS)</option>
            <option value="can_kiem_tra">Cần kiểm tra</option>
            <option value="cho_duyet">Chờ duyệt</option>
            <option value="luu_tru">Đã lưu trữ</option>
          </select>
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-3">
        {filtered.map((q, idx) => (
          <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2 text-xs">
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-slate-700">{q.id}</span>
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-medium">
                  {q.topicTitle}
                </span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                  q.originType === 'trich_nguyen_ban' ? 'bg-slate-100 text-slate-700' :
                  q.originType === 'nguon_da_chinh_sua' ? 'bg-amber-100 text-amber-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {q.originType === 'trich_nguyen_ban' ? 'Trích nguyên bản' :
                   q.originType === 'nguon_da_chinh_sua' ? 'Nguồn đã chỉnh sửa' : 'Luyện bổ sung'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  q.reviewStatus === 'da_duyet' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {q.reviewStatus === 'da_duyet' ? 'Đã duyệt' : 'Cần kiểm tra'}
                </span>
                <button
                  onClick={() => handleDelete(q.id)}
                  className="p-1 text-slate-400 hover:text-red-600 rounded transition"
                  title="Xóa câu"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm font-bold text-slate-900 leading-snug">
              {q.prompt}
            </p>

            {q.options && (
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                {q.options.map(opt => (
                  <span key={opt.id} className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200">
                    <strong>{opt.id}.</strong> <UnderlinedText text={opt.text} underlinedPart={q.underlinedPart} />
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
              <span className="text-slate-600 font-mono">
                Đáp án: <strong className="text-blue-800 font-bold">{q.answer}</strong>
              </span>
              <span className="text-slate-500 italic max-w-lg truncate">
                {q.explanation}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add new question modal */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-lg font-bold text-slate-900">
                Thêm Câu Hỏi Luyện Tập Bổ Sung
              </h3>
              <button onClick={() => setIsAddingNew(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNew} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Chuyên đề:</label>
                  <select
                    value={newQuestion.topic}
                    onChange={e => setNewQuestion({ 
                      ...newQuestion, 
                      topic: e.target.value as TopicType,
                      topicTitle: e.target.options[e.target.selectedIndex].text
                    })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="grammar_verbs">Động từ chỉ thích/ghét</option>
                    <option value="grammar_adverbs">So sánh hơn của trạng từ</option>
                    <option value="grammar_compound">Câu ghép & từ nối</option>
                    <option value="unit1_leisure">Unit 1: Leisure</option>
                    <option value="unit2_countryside">Unit 2: Countryside</option>
                    <option value="unit3_teenagers">Unit 3: Teenagers</option>
                    <option value="pronunciation">Phát âm & trọng âm</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Mức độ:</label>
                  <select
                    value={newQuestion.level}
                    onChange={e => setNewQuestion({ ...newQuestion, level: e.target.value as DifficultyLevel })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="nhan_biet">Nhận biết</option>
                    <option value="thong_hieu">Thông hiểu</option>
                    <option value="van_dung">Vận dụng</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Nội dung câu hỏi:</label>
                <textarea
                  rows={2}
                  value={newQuestion.prompt}
                  onChange={e => setNewQuestion({ ...newQuestion, prompt: e.target.value })}
                  placeholder="Ví dụ: My brother enjoys ________ to classical music..."
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>

              {/* 4 options */}
              <div className="grid grid-cols-2 gap-2">
                {['A', 'B', 'C', 'D'].map((optId, idx) => (
                  <div key={optId}>
                    <label className="font-bold">Phương án {optId}:</label>
                    <input
                      type="text"
                      value={newQuestion.options?.[idx]?.text || ''}
                      onChange={e => {
                        const nextOptions = [...(newQuestion.options || [])];
                        nextOptions[idx] = { id: optId, text: e.target.value };
                        setNewQuestion({ ...newQuestion, options: nextOptions });
                      }}
                      className="w-full p-2 border rounded-lg font-mono"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Đáp án đúng chuẩn:</label>
                  <select
                    value={newQuestion.answer}
                    onChange={e => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                    className="w-full p-2 border rounded-lg font-bold"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Gợi ý 1 (Dấu hiệu):</label>
                  <input
                    type="text"
                    value={newQuestion.hint1 || ''}
                    onChange={e => setNewQuestion({ ...newQuestion, hint1: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Giải thích chi tiết (Tiếng Việt):</label>
                <textarea
                  rows={2}
                  value={newQuestion.explanation || ''}
                  onChange={e => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 bg-slate-100 rounded-lg text-slate-700 font-semibold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-bold cursor-pointer shadow"
                >
                  Lưu vào Ngân Hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
