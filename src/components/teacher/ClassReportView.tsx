import React from 'react';
import { TestSubmission, Certificate, MistakeEntry, Question } from '../../types';
import { 
  BarChart3, 
  Users, 
  Award, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { TEACHER_INFO } from '../../services/certificateService';

interface ClassReportViewProps {
  submissions: TestSubmission[];
  certificates: Certificate[];
  mistakes: MistakeEntry[];
  questions: Question[];
}

export const ClassReportView: React.FC<ClassReportViewProps> = ({
  submissions,
  certificates,
  mistakes,
  questions
}) => {
  const totalSubmissions = submissions.length;
  const avgPercentage = totalSubmissions > 0
    ? Math.round(submissions.reduce((acc, s) => acc + s.percentage, 0) / totalSubmissions)
    : 0;

  // Most common mistake topics
  const mistakeCountByTopic: Record<string, number> = {};
  mistakes.forEach(m => {
    mistakeCountByTopic[m.topic] = (mistakeCountByTopic[m.topic] || 0) + 1;
  });

  const topMistakeTopics = Object.entries(mistakeCountByTopic)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
          Khu vực Giáo viên • Báo Cáo Tổng Hợp
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Báo Cáo Tiến Độ & Phân Tích Chất Lượng Học Tập
        </h2>
        <p className="text-xs text-slate-500">
          Dữ liệu thực tế từ các bài kiểm tra đầu vào, kiểm tra độc lập và thi thử của học sinh.
        </p>
      </div>

      {/* Top 4 Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
          <p className="text-xs text-slate-500 font-semibold uppercase">Tổng lượt làm bài</p>
          <p className="text-3xl font-black text-blue-900 mt-1">{totalSubmissions}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
          <p className="text-xs text-slate-500 font-semibold uppercase">Tỉ lệ đạt trung bình</p>
          <p className={`text-3xl font-black mt-1 ${avgPercentage >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
            {avgPercentage}%
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
          <p className="text-xs text-slate-500 font-semibold uppercase">Giấy chứng nhận (&ge;70%)</p>
          <p className="text-3xl font-black text-amber-600 mt-1">{certificates.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
          <p className="text-xs text-slate-500 font-semibold uppercase">Tổng số lỗi đã ghi nhận</p>
          <p className="text-3xl font-black text-purple-700 mt-1">{mistakes.length}</p>
        </div>
      </div>

      {/* Analytics breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Top difficult topics */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Chuyên đề học sinh hay làm sai nhất:</span>
          </h3>

          {topMistakeTopics.length === 0 ? (
            <p className="text-xs text-slate-400 italic">Chưa có đủ dữ liệu lỗi sai.</p>
          ) : (
            <div className="space-y-3">
              {topMistakeTopics.map(([topic, count], idx) => (
                <div key={topic} className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">
                    {idx + 1}. {topic.replace('grammar_', 'Ngữ pháp: ').replace('unit', 'Unit ')}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 font-bold">
                    {count} lượt sai
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Certificate Criteria Analysis */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center space-x-2">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Tiêu chí cấp chứng nhận (Đạt &ge; 70%):</span>
          </h3>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-2">
            <p>
              Hệ thống tuân thủ nghiêm ngặt chỉ đạo của <strong>GV {TEACHER_INFO.name}</strong>:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li>Chỉ cấp chứng nhận khi học sinh đạt từ <strong>70% trở lên</strong> ở bài làm thật.</li>
              <li>Tự động tổng hợp và sinh nhận xét sư phạm cá nhân hóa dựa trên phổ điểm và tỉ lệ làm đúng độc lập.</li>
              <li>Có mã xác thực tra cứu duy nhất cho từng chứng nhận được cấp.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
