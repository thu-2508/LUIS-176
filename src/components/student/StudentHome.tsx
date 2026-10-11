import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Award, 
  AlertCircle, 
  Play, 
  Flame, 
  ArrowRight, 
  Sparkles,
  BookmarkCheck,
  GraduationCap
} from 'lucide-react';
import { StudentProfile, LearningTask, Certificate, MistakeEntry } from '../../types';
import { TEACHER_INFO } from '../../services/certificateService';

interface StudentHomeProps {
  profile: StudentProfile;
  tasks: LearningTask[];
  certificates: Certificate[];
  mistakes: MistakeEntry[];
  onSelectTab: (tab: string) => void;
  onOpenCertificates: () => void;
}

export const StudentHome: React.FC<StudentHomeProps> = ({
  profile,
  tasks,
  certificates,
  mistakes,
  onSelectTab,
  onOpenCertificates
}) => {
  const unresolvedMistakes = mistakes.filter(m => !m.resolved);
  const completedTasksCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-950 rounded-2xl text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Năm học 2026–2027 • Ôn thi Giữa Học Kì I</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Xin chào, <span className="text-amber-300">{profile.name}</span> (Lớp {profile.studentClass})!
          </h1>

          <p className="text-sm sm:text-base text-blue-100 font-light leading-relaxed">
            Mục tiêu trọng tâm: Củng cố chắc chắn toàn bộ kiến thức trong đề cương, hướng tới mức <strong className="text-white font-semibold">5–6+ điểm</strong> vững vàng. Hãy bắt đầu từng bước 10–15 phút mỗi ngày!
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onSelectTab('today_path')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-900 font-bold rounded-xl shadow-lg transition cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-900" />
              <span>Bắt đầu việc hôm nay</span>
            </button>

            <button
              onClick={() => onSelectTab('mock_exam')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-xl border border-white/20 transition cursor-pointer"
            >
              <BookmarkCheck className="w-4 h-4 text-amber-300" />
              <span>Vào thi thử giữa kì</span>
            </button>
          </div>
        </div>

        {/* Decorative teacher watermark */}
        <div className="absolute right-4 bottom-4 hidden md:block text-right opacity-30 pointer-events-none">
          <p className="text-xs uppercase tracking-widest font-mono text-blue-200">Giáo viên phụ trách</p>
          <p className="text-sm font-bold text-white">{TEACHER_INFO.name}</p>
          <p className="text-[11px] text-blue-200">{TEACHER_INFO.school}</p>
        </div>
      </div>

      {/* Real Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Streak */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Chuỗi học tập</p>
            <p className="text-lg font-bold text-slate-900">{profile.currentStreak} ngày liên tiếp</p>
          </div>
        </div>

        {/* Completed tasks */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Nhiệm vụ hôm nay</p>
            <p className="text-lg font-bold text-slate-900">{completedTasksCount}/{tasks.length} hoàn thành</p>
          </div>
        </div>

        {/* Unresolved mistakes */}
        <div 
          onClick={() => onSelectTab('mistakes')}
          className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm flex items-center space-x-3 cursor-pointer hover:border-amber-400 transition"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Sổ lỗi sai cần ôn</p>
            <p className="text-lg font-bold text-slate-900">{unresolvedMistakes.length} câu</p>
          </div>
        </div>

        {/* Certificates */}
        <div 
          onClick={onOpenCertificates}
          className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm flex items-center space-x-3 cursor-pointer hover:border-blue-400 transition"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Giấy chứng nhận</p>
            <p className="text-lg font-bold text-blue-900">{certificates.length} chứng nhận (&ge;70%)</p>
          </div>
        </div>
      </div>

      {/* Main 2-column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Today's Tasks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-700" />
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  Việc hôm nay (Phiên 10–15 phút)
                </h3>
              </div>
              <button 
                onClick={() => onSelectTab('today_path')}
                className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center space-x-1"
              >
                <span>Xem chi tiết</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {tasks.map((task, idx) => (
                <div 
                  key={task.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-300 transition flex items-start justify-between gap-3"
                >
                  <div className="flex items-start space-x-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {task.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {task.description}
                      </p>
                      <div className="flex items-center space-x-3 mt-2 text-[11px] text-slate-500">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>~{task.estimatedMinutes} phút</span>
                        </span>
                        <span className="px-2 py-0.2 bg-blue-100 text-blue-800 rounded font-medium">
                          {task.topic.replace('grammar_', 'Ngữ pháp ').replace('unit', 'Unit ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (task.type === 'review_lesson') onSelectTab('lessons');
                      else if (task.type === 'guided_practice') onSelectTab('practice');
                      else if (task.type === 'review_mistake') onSelectTab('mistakes');
                      else onSelectTab('independent');
                    }}
                    className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded-lg text-blue-700 hover:bg-blue-50 transition flex-shrink-0 cursor-pointer"
                  >
                    Làm ngay
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Core Cycle Guide */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5">
            <h4 className="text-sm font-bold text-blue-950 flex items-center space-x-2 mb-2">
              <GraduationCap className="w-4 h-4 text-blue-700" />
              <span>Chu trình học tập 6 bước chuẩn khoa học:</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 bg-white rounded-lg border border-blue-100">
                <span className="font-bold text-blue-800">1. Đầu vào:</span>
                <p className="text-slate-600 text-[11px] mt-0.5">Phát hiện lỗ hổng kiến thức chính xác.</p>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-blue-100">
                <span className="font-bold text-blue-800">2. Học lại ngắn:</span>
                <p className="text-slate-600 text-[11px] mt-0.5">Tóm tắt quy tắc, tránh lỗi thường gặp.</p>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-blue-100">
                <span className="font-bold text-blue-800">3. Có hướng dẫn:</span>
                <p className="text-slate-600 text-[11px] mt-0.5">Gợi ý 2 bước khi chưa làm được.</p>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-blue-100">
                <span className="font-bold text-blue-800">4. Độc lập:</span>
                <p className="text-slate-600 text-[11px] mt-0.5">Làm 5 câu mới không trợ giúp.</p>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-blue-100">
                <span className="font-bold text-blue-800">5. Ôn lỗi sai:</span>
                <p className="text-slate-600 text-[11px] mt-0.5">Chu kỳ 1–3–7 ngày để nhớ sâu.</p>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-blue-100">
                <span className="font-bold text-blue-800">6. Thi thử:</span>
                <p className="text-slate-600 text-[11px] mt-0.5">Cấp giấy chứng nhận khi &ge; 70%.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Fast Launch & Teacher Note */}
        <div className="space-y-4">
          {/* Certificate Criteria Box */}
          <div className="bg-amber-50/70 border-2 border-amber-300/80 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center space-x-2 text-amber-900 font-bold mb-2">
              <Award className="w-5 h-5 text-amber-600" />
              <span>Quy định Cấp Giấy Chứng Nhận</span>
            </div>
            <p className="text-xs text-amber-950 leading-relaxed">
              Học sinh đạt từ <strong className="text-amber-800 font-bold">70% trở lên (tương đương &ge; 7.0 điểm)</strong> ở bài Thi thử hoặc bài Kiểm tra độc lập sẽ được <strong className="text-slate-900">Cô Vũ Thị Mai Thu</strong> cấp Giấy Chứng Nhận Hoàn Thành chính thức kèm lời nhận xét sư phạm chi tiết!
            </p>

            <button
              onClick={onOpenCertificates}
              className="mt-3 w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs rounded-xl shadow transition cursor-pointer"
            >
              Xem các chứng nhận của em ({certificates.length})
            </button>
          </div>

          {/* Quick shortcuts */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Chuyên đề học liệu
            </h4>

            <button
              onClick={() => onSelectTab('reading_comm')}
              className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center justify-between transition cursor-pointer"
            >
              <span>📖 Đọc hiểu & 3 Biển báo tài liệu</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
            </button>

            <button
              onClick={() => onSelectTab('writing')}
              className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center justify-between transition cursor-pointer"
            >
              <span>✍️ Luyện viết: Tìm lỗi, Viết lại & Đoạn văn</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
            </button>

            <button
              onClick={() => onSelectTab('listening')}
              className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center justify-between transition cursor-pointer"
            >
              <span>🎧 Khu vực Luyện nghe (Giáo viên quản lý)</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
            </button>

            <button
              onClick={() => onSelectTab('guide')}
              className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center justify-between transition cursor-pointer"
            >
              <span>💡 Chiến thuật lấy 5–6 điểm cho HS yếu</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
            </button>
          </div>

          {/* Teacher Contact Info */}
          <div className="bg-slate-100 rounded-2xl p-4 text-xs text-slate-600 space-y-1">
            <p className="font-bold text-slate-800">Hỗ trợ học tập:</p>
            <p>Giáo viên: <strong>{TEACHER_INFO.name}</strong></p>
            <p>Đơn vị: <strong>{TEACHER_INFO.school}</strong></p>
            <p className="text-[11px] text-slate-500 italic mt-1">
              "Không áp lực điểm số ảo – Học thật, hiểu thật, tự tin từng câu làm được!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
