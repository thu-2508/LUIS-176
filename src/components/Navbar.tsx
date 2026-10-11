import React from 'react';
import { 
  BookOpen, 
  UserCheck, 
  Award, 
  Settings, 
  Menu, 
  X, 
  GraduationCap, 
  SearchCheck, 
  FileEdit, 
  Database,
  Type,
  User,
  Heart
} from 'lucide-react';
import { TEACHER_INFO } from '../services/certificateService';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  userRole: 'student' | 'teacher';
  onToggleRole: () => void;
  fontSize: 'normal' | 'large' | 'extra-large';
  onChangeFontSize: (size: 'normal' | 'large' | 'extra-large') => void;
  certificatesCount: number;
  onOpenCertificates: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  userRole,
  onToggleRole,
  fontSize,
  onChangeFontSize,
  certificatesCount,
  onOpenCertificates
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const studentTabs = [
    { id: 'dashboard', label: 'Trang chủ' },
    { id: 'today_path', label: 'Lộ trình hôm nay' },
    { id: 'diagnostic', label: 'Kiểm tra đầu vào' },
    { id: 'lessons', label: 'Học lại ngắn gọn' },
    { id: 'practice', label: 'Luyện có hướng dẫn' },
    { id: 'independent', label: 'Kiểm tra độc lập' },
    { id: 'reading_comm', label: 'Đọc hiểu & Giao tiếp' },
    { id: 'writing', label: 'Luyện viết' },
    { id: 'listening', label: 'Luyện nghe' },
    { id: 'mock_exam', label: 'Thi thử giữa kì' },
    { id: 'mistakes', label: 'Sổ lỗi sai' },
    { id: 'progress', label: 'Tiến độ' },
    { id: 'guide', label: 'Hướng dẫn' }
  ];

  const teacherTabs = [
    { id: 'source_review', label: 'Rà soát học liệu nguồn' },
    { id: 'question_bank', label: 'Ngân hàng câu hỏi' },
    { id: 'media_passages', label: 'Đoạn đọc & Biển báo' },
    { id: 'lesson_manager', label: 'Bài học & Chủ đề' },
    { id: 'essay_grading', label: 'Chấm bài tự luận' },
    { id: 'class_report', label: 'Báo cáo lớp học' },
    { id: 'backup_restore', label: 'Sao lưu & Khôi phục' }
  ];

  const activeTabs = userRole === 'student' ? studentTabs : teacherTabs;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm print:hidden">
      {/* Top banner with Teacher Credit & School */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-amber-300">
              {TEACHER_INFO.school}
            </span>
            <span className="hidden sm:inline text-blue-200">|</span>
            <span className="font-medium text-blue-100">
              Giáo viên: <strong className="text-white underline decoration-amber-400 decoration-2">{TEACHER_INFO.name}</strong>
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline italic text-blue-200">
              “{TEACHER_INFO.motto}”
            </span>
            {/* Font size controller */}
            <div className="flex items-center space-x-1 bg-white/10 px-2 py-0.5 rounded text-[11px]">
              <Type className="w-3 h-3 text-amber-300" />
              <span>Cỡ chữ:</span>
              <button 
                onClick={() => onChangeFontSize('normal')}
                className={`px-1 rounded ${fontSize === 'normal' ? 'bg-amber-400 text-slate-900 font-bold' : 'hover:bg-white/20'}`}
                title="Cỡ chuẩn"
              >
                A
              </button>
              <button 
                onClick={() => onChangeFontSize('large')}
                className={`px-1 text-xs rounded ${fontSize === 'large' ? 'bg-amber-400 text-slate-900 font-bold' : 'hover:bg-white/20'}`}
                title="Cỡ vừa (khuyên dùng)"
              >
                A+
              </button>
              <button 
                onClick={() => onChangeFontSize('extra-large')}
                className={`px-1 text-sm rounded ${fontSize === 'extra-large' ? 'bg-amber-400 text-slate-900 font-bold' : 'hover:bg-white/20'}`}
                title="Cỡ lớn dễ đọc"
              >
                A++
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & title */}
          <div 
            onClick={() => onSelectTab(userRole === 'student' ? 'dashboard' : 'source_review')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition transform">
              <GraduationCap className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-blue-950 uppercase">
                  VỮNG NỀN TIẾNG ANH 8
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 hidden sm:inline">
                  2026–2027
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Ôn tập Giữa Kì I • THCS Sông Đà - PH Hữu Nghị
              </p>
            </div>
          </div>

          {/* Right utility buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Certificate Quick Access */}
            <button
              onClick={onOpenCertificates}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold shadow-sm transition cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>Giấy chứng nhận (&ge;70%)</span>
              {certificatesCount > 0 && (
                <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1">
                  {certificatesCount}
                </span>
              )}
            </button>

            {/* Role switch toggle */}
            <button
              onClick={onToggleRole}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                userRole === 'teacher'
                  ? 'bg-purple-700 text-white shadow hover:bg-purple-800'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {userRole === 'teacher' ? (
                <>
                  <Settings className="w-3.5 h-3.5 text-amber-300" />
                  <span>Khu vực Giáo viên</span>
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>Chuyển sang GV</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onOpenCertificates}
              className="p-2 text-amber-700 hover:bg-amber-50 rounded-lg relative"
              title="Xem giấy chứng nhận"
            >
              <Award className="w-5 h-5" />
              {certificatesCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-600" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-bar (Desktop) */}
      <div className="bg-slate-100 border-t border-slate-200/80 overflow-x-auto scrollbar-thin">
        <div className="max-w-7xl mx-auto px-4 flex space-x-1 py-1.5">
          {activeTabs.map(tab => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-blue-800 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-white hover:text-blue-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500">Chế độ đang dùng:</span>
            <button
              onClick={() => {
                onToggleRole();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold px-3 py-1 rounded bg-blue-50 text-blue-800 border border-blue-200"
            >
              {userRole === 'student' ? 'Đổi sang Giáo viên' : 'Đổi sang Học sinh'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {activeTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  onSelectTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 text-left text-xs font-medium rounded-lg transition ${
                  currentTab === tab.id
                    ? 'bg-blue-800 text-white font-bold'
                    : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
