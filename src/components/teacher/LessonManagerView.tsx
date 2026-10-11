import React from 'react';
import { MINI_LESSONS } from '../../data/lessonsData';
import { BookOpen, CheckCircle, AlertTriangle, Layers } from 'lucide-react';

export const LessonManagerView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
          Khu vực Giáo viên • Quản Lý Bài Học
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Danh Sách Các Bài Học Ngắn Cốt Lõi
        </h2>
        <p className="text-xs text-slate-500">
          Mỗi bài học được cấu trúc khoa học 5 phần: Em cần nhớ, Ví dụ mẫu, Các bước làm, Lỗi thường gặp, và Câu thử sức.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MINI_LESSONS.map(lesson => (
          <div key={lesson.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-xs font-bold text-purple-700 uppercase">
                {lesson.topic.replace('grammar_', 'Ngữ pháp ').replace('unit', 'Unit ')}
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Chuẩn đề cương
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900">
              {lesson.title}
            </h3>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 line-clamp-3">
              {lesson.coreRule}
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-blue-50 rounded-lg">
                <span className="font-bold text-blue-900">{lesson.examples.length}</span>
                <p className="text-[10px] text-slate-500">Ví dụ</p>
              </div>
              <div className="p-2 bg-emerald-50 rounded-lg">
                <span className="font-bold text-emerald-900">{lesson.steps.length}</span>
                <p className="text-[10px] text-slate-500">Bước làm</p>
              </div>
              <div className="p-2 bg-red-50 rounded-lg">
                <span className="font-bold text-red-900">{lesson.commonMistakes.length}</span>
                <p className="text-[10px] text-slate-500">Lỗi hay sai</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
