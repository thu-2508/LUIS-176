import React, { useState } from 'react';
import { Download, Upload, ShieldCheck, AlertCircle, RefreshCw, Database } from 'lucide-react';
import { exportFullData, importFullData } from '../../services/storageService';

interface BackupRestoreViewProps {
  onDataReloaded: () => void;
}

export const BackupRestoreView: React.FC<BackupRestoreViewProps> = ({ onDataReloaded }) => {
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleDownloadBackup = () => {
    const jsonStr = exportFullData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VungNenTiengAnh8_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      if (content) {
        const res = importFullData(content);
        setImportStatus(res);
        if (res.success) {
          onDataReloaded();
        }
      }
    };
    reader.readAsText(file);
  };

  const handleResetToFactory = () => {
    if (window.confirm('Cảnh báo: Bạn có chắc muốn khôi phục về dữ liệu học liệu gốc? Các thay đổi tùy chỉnh sẽ được thiết lập lại.')) {
      localStorage.clear();
      onDataReloaded();
      alert('Đã thiết lập lại dữ liệu học liệu gốc thành công!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
          Khu vực Giáo viên • Dữ Liệu
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Sao Lưu & Khôi Phục Dữ Liệu Ứng Dụng
        </h2>
        <p className="text-xs text-slate-500">
          Xuất và nhập tệp sao lưu an toàn bao gồm toàn bộ ngân hàng câu hỏi, trạng thái duyệt, lịch sử bài làm và giấy chứng nhận.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
            <Download className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            Xuất Dữ Liệu (Backup JSON)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Tải tệp JSON chứa toàn bộ dữ liệu hiện tại để lưu trữ dự phòng hoặc chuyển sang máy tính khác.
          </p>

          <button
            onClick={handleDownloadBackup}
            className="w-full py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow cursor-pointer transition flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Tải về tệp Sao Lưu (.json)</span>
          </button>
        </div>

        {/* Import Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
            <Upload className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            Khôi Phục Dữ Liệu (Restore)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nạp tệp sao lưu JSON đã lưu từ trước. Hệ thống sẽ tự động kiểm tra tính hợp lệ trước khi áp dụng.
          </p>

          <label className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow cursor-pointer transition flex items-center justify-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Chọn tệp JSON để khôi phục</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="hidden"
            />
          </label>

          {importStatus && (
            <div className={`p-3 rounded-xl text-xs font-semibold ${
              importStatus.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {importStatus.message}
            </div>
          )}
        </div>
      </div>

      {/* Reset to initial bank */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Khôi phục học liệu gốc (Factory Reset):
        </h4>
        <p className="text-xs text-slate-500">
          Nếu cần quay về trạng thái ban đầu của tài liệu đề cương Tiếng Anh 8 (2026–2027), bấm nút bên dưới:
        </p>
        <button
          onClick={handleResetToFactory}
          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-xl cursor-pointer transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Đặt lại về dữ liệu ban đầu</span>
        </button>
      </div>
    </div>
  );
};
