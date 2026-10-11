import React from 'react';
import { Certificate } from '../../types';
import { Award, Printer, Calendar, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { TEACHER_INFO } from '../../services/certificateService';

interface CertificateListViewProps {
  certificates: Certificate[];
  onOpenCertificate: (cert: Certificate) => void;
  onNavigateToExam: () => void;
}

export const CertificateListView: React.FC<CertificateListViewProps> = ({
  certificates,
  onOpenCertificate,
  onNavigateToExam
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-900 rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex items-center space-x-3 mb-2">
          <Award className="w-8 h-8 text-slate-950" />
          <h2 className="text-2xl sm:text-3xl font-serif font-black uppercase tracking-tight">
            Giấy Chứng Nhận Hoàn Thành (&ge;70%)
          </h2>
        </div>
        <p className="text-sm sm:text-base font-medium text-amber-950 max-w-2xl leading-relaxed">
          Được trao tặng bởi <strong>{TEACHER_INFO.name} – {TEACHER_INFO.school}</strong> khi học sinh đạt từ <strong>70% trở lên</strong> ở các bài kiểm tra độc lập và thi thử giữa kì.
        </p>
      </div>

      {certificates.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            Em chưa có Giấy chứng nhận nào
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Hãy tham gia làm <strong>Kiểm tra đầu vào</strong>, <strong>Kiểm tra độc lập</strong> hoặc <strong>Thi thử giữa kì</strong>. Khi đạt từ <strong>70% trở lên</strong>, hệ thống sẽ tự động cấp chứng nhận kèm lời nhận xét sư phạm của Cô Mai Thu!
          </p>
          <button
            onClick={onNavigateToExam}
            className="px-6 py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm rounded-xl shadow cursor-pointer transition"
          >
            Vào thi thử giữa kì ngay
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map(cert => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl border-2 border-amber-300/80 shadow-md p-5 flex flex-col justify-between space-y-4 hover:border-amber-500 transition relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100 rounded-bl-full flex items-start justify-end p-2 pointer-events-none">
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{cert.issuedAt}</span>
                  <span>• Mã: <strong className="font-mono text-slate-700">{cert.qrVerificationCode}</strong></span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1">
                  {cert.testTitle}
                </h3>

                <p className="text-xs text-slate-600">
                  Chứng nhận học sinh: <strong className="text-blue-950 font-bold">{cert.studentName}</strong> (Lớp {cert.studentClass})
                </p>

                <div className="flex items-center space-x-3 pt-1">
                  <span className="text-xl font-black text-emerald-600">
                    {cert.percentage}%
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    ({cert.correctCount}/{cert.totalQuestions} câu đúng)
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Đạt yêu cầu
                  </span>
                </div>

                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-slate-700 italic line-clamp-2">
                  "{cert.feedbackComment}"
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  GV: {cert.teacherName.split('-')[0].trim()}
                </span>
                <button
                  onClick={() => onOpenCertificate(cert)}
                  className="inline-flex items-center space-x-1.5 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs rounded-lg shadow cursor-pointer transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Xem & In giấy chứng nhận</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
