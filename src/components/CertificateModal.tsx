import React, { useRef } from 'react';
import { Certificate } from '../types';
import { Award, Printer, X, CheckCircle, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-200 print:border-none print:shadow-none print:max-w-none">
        {/* Controls - Hidden on print */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white print:hidden">
          <div className="flex items-center space-x-2">
            <Award className="w-6 h-6 text-amber-400" />
            <h2 className="text-lg font-bold">Giấy Chứng Nhận Hoàn Thành Ôn Tập (Đạt trên 70%)</h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-900 text-sm font-semibold rounded-lg shadow transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>In giấy chứng nhận</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas / Document */}
        <div 
          ref={printRef}
          className="p-6 sm:p-10 md:p-12 bg-[#FCFAF2] border-[12px] border-double border-amber-600/40 m-2 sm:m-4 rounded-xl relative overflow-hidden print:m-0 print:border-8 print:p-8"
        >
          {/* Subtle Decorative Background Corner Ribbons */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-amber-500 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-amber-500 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-amber-500 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-amber-500 pointer-events-none" />

          {/* Header */}
          <div className="text-center space-y-2 relative z-10">
            <p className="text-xs sm:text-sm font-semibold tracking-widest text-slate-600 uppercase">
              {certificate.schoolName}
            </p>
            <p className="text-xs text-slate-500 italic">
              Tổ Ngoại Ngữ – Chương trình "Vững Nền Tiếng Anh 8" (2026–2027)
            </p>

            <div className="pt-4 pb-2">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                Certificate of Achievement
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-amber-900 tracking-wide uppercase">
                GIẤY CHỨNG NHẬN
              </h1>
              <p className="text-sm sm:text-base font-medium text-slate-700 mt-1">
                HOÀN THÀNH XUẤT SẮC NỘI DUNG ÔN TẬP GIỮA HỌC KÌ I
              </p>
            </div>
          </div>

          {/* Student Info */}
          <div className="text-center my-6 sm:my-8 space-y-3 relative z-10">
            <p className="text-sm text-slate-600">Chứng nhận em:</p>
            <div className="inline-block border-b-2 border-amber-800/60 pb-1 px-8 min-w-[260px]">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-wide">
                {certificate.studentName}
              </h3>
            </div>
            <p className="text-sm font-medium text-slate-600">
              Học sinh Lớp: <span className="font-bold text-slate-900">{certificate.studentClass}</span>
            </p>
          </div>

          {/* Achievement Summary */}
          <div className="max-w-2xl mx-auto my-6 p-4 sm:p-5 bg-white/90 rounded-xl border border-amber-200/80 shadow-sm relative z-10">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center divide-x divide-amber-200">
              <div>
                <p className="text-xs text-slate-500 font-medium">Nội dung ôn</p>
                <p className="text-xs sm:text-sm font-bold text-blue-900 mt-1 line-clamp-1">
                  {certificate.testTitle}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Tỉ lệ đạt</p>
                <p className="text-lg sm:text-xl font-black text-emerald-600 mt-0.5">
                  {certificate.percentage}%
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Kết quả</p>
                <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                  {certificate.correctCount}/{certificate.totalQuestions} câu đúng
                </p>
              </div>
            </div>

            {/* Pedagogical Feedback */}
            <div className="mt-4 pt-3 border-t border-amber-100 text-left">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-900 uppercase tracking-wide mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Nhận xét sư phạm từ Giáo viên bộ môn:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 italic bg-amber-50/60 p-3 rounded-lg border border-amber-200/60 leading-relaxed font-sans">
                "{certificate.feedbackComment}"
              </p>
            </div>
          </div>

          {/* Footer & Signature */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-4 items-end relative z-10">
            {/* Left: Verification code */}
            <div className="text-left space-y-1">
              <div className="inline-flex items-center space-x-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded text-xs font-semibold border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Đạt chuẩn: &ge; 70% yêu cầu</span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                Mã xác thực: {certificate.qrVerificationCode}
              </p>
              <p className="text-[11px] text-slate-400">
                Cấp ngày: {certificate.issuedAt}
              </p>
            </div>

            {/* Right: Teacher Signature */}
            <div className="text-center space-y-2">
              <p className="text-xs text-slate-500 italic">
                Hòa Bình, ngày {certificate.issuedAt}
              </p>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800">
                GIÁO VIÊN BỘ MÔN
              </p>
              {/* Signature stamp representation */}
              <div className="py-2 flex flex-col items-center justify-center">
                <div className="w-20 h-10 border border-dashed border-red-300 rounded flex items-center justify-center bg-red-50/30 rotate-[-4deg]">
                  <span className="text-[10px] text-red-600 font-bold uppercase tracking-tighter">
                    ĐÃ CHỨNG NHẬN
                  </span>
                </div>
              </div>
              <p className="text-sm sm:text-base font-serif font-bold text-blue-950 uppercase tracking-wide">
                {certificate.teacherName}
              </p>
            </div>
          </div>

          {/* Fine print note */}
          <div className="mt-6 pt-3 border-t border-slate-200/60 text-center text-[10px] text-slate-400">
            Phiếu ghi nhận hoàn thành học tập nội bộ hỗ trợ học sinh ôn tập củng cố kiến thức giữa kì I môn Tiếng Anh 8.
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <p className="text-xs text-slate-500">
            Mẹo: Bấm <strong>In giấy chứng nhận</strong> để lưu dưới dạng tệp PDF hoặc in ấn khen thưởng.
          </p>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium rounded-lg transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>In / Lưu PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-medium rounded-lg transition cursor-pointer"
            >
              Đóng lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
