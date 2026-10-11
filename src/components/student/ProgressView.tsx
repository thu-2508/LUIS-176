import React from 'react';
import { StudentProfile, TestSubmission, Certificate, MistakeEntry } from '../../types';
import { Award, Flame, Clock, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

interface ProgressViewProps {
  profile: StudentProfile;
  submissions: TestSubmission[];
  certificates: Certificate[];
  mistakes: MistakeEntry[];
  onOpenCertificate: (cert: Certificate) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  profile,
  submissions,
  certificates,
  mistakes,
  onOpenCertificate
}) => {
  const totalTests = submissions.length;
  const avgScore = totalTests > 0
    ? (submissions.reduce((acc, s) => acc + s.totalScore, 0) / totalTests).toFixed(1)
    : '0.0';

  const resolvedMistakes = mistakes.filter(m => m.resolved).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Profile Summary */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Báo Cáo Tiến Bộ Của {profile.name}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Lớp {profile.studentClass} • Dữ liệu học tập và làm bài thực tế
            </p>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
            Niên khóa 2026–2027
          </span>
        </div>

        {/* 4 Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200">
            <p className="text-xs text-slate-500 font-medium">Số bài đã nộp</p>
            <p className="text-2xl font-black text-blue-900 mt-1">{totalTests}</p>
          </div>
          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200">
            <p className="text-xs text-slate-500 font-medium">Điểm trung bình</p>
            <p className="text-2xl font-black text-emerald-700 mt-1">{avgScore}/10</p>
          </div>
          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200">
            <p className="text-xs text-slate-500 font-medium">Giấy chứng nhận (&ge;70%)</p>
            <p className="text-2xl font-black text-amber-700 mt-1">{certificates.length}</p>
          </div>
          <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200">
            <p className="text-xs text-slate-500 font-medium">Lỗi sai đã chữa</p>
            <p className="text-2xl font-black text-purple-700 mt-1">{resolvedMistakes}/{mistakes.length}</p>
          </div>
        </div>
      </div>

      {/* Submissions History */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-700" />
          <span>Lịch sử các bài kiểm tra đã làm ({submissions.length})</span>
        </h3>

        {submissions.length === 0 ? (
          <p className="text-xs text-slate-500 italic text-center py-4">
            Em chưa hoàn thành bài kiểm tra nào. Hãy bắt đầu với bài Kiểm tra đầu vào hoặc Thi thử!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Thời gian</th>
                  <th className="p-3">Nội dung bài kiểm tra</th>
                  <th className="p-3 text-center">Số câu đúng</th>
                  <th className="p-3 text-center">Điểm số (Thang 10)</th>
                  <th className="p-3 text-center">Tỉ lệ</th>
                  <th className="p-3 text-right">Chứng nhận</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {submissions.map(sub => {
                  const hasCert = sub.percentage >= 70;
                  const matchingCert = certificates.find(c => c.testSubmissionId === sub.id);

                  return (
                    <tr key={sub.id} className="hover:bg-slate-50 transition">
                      <td className="p-3 whitespace-nowrap text-slate-500">
                        {new Date(sub.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="p-3 font-semibold text-slate-900">
                        {sub.title}
                      </td>
                      <td className="p-3 text-center font-mono">
                        {sub.correctCount} / {sub.totalQuestions}
                      </td>
                      <td className="p-3 text-center font-bold text-blue-900 font-mono text-sm">
                        {sub.totalScore}
                      </td>
                      <td className="p-3 text-center">
                        <span className={`font-bold ${sub.percentage >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {Math.round(sub.percentage)}%
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {hasCert ? (
                          <button
                            onClick={() => matchingCert && onOpenCertificate(matchingCert)}
                            className="inline-flex items-center space-x-1 px-2.5 py-1 bg-amber-100 text-amber-900 rounded font-bold text-[11px] hover:bg-amber-200 cursor-pointer"
                          >
                            <Award className="w-3 h-3 text-amber-600" />
                            <span>Đã cấp (&ge;70%)</span>
                          </button>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Chưa đạt 70%</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
