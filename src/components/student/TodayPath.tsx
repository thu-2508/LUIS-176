import React from 'react';
import { LearningTask } from '../../types';
import { Clock, CheckCircle2, Play, BookOpen, Compass, Award, AlertCircle } from 'lucide-react';
import { updateDailyTaskStatus } from '../../services/storageService';

interface TodayPathProps {
  tasks: LearningTask[];
  onTasksUpdated: (tasks: LearningTask[]) => void;
  onNavigate: (tab: string) => void;
}

export const TodayPath: React.FC<TodayPathProps> = ({
  tasks,
  onTasksUpdated,
  onNavigate
}) => {
  const handleToggleTask = (task: LearningTask) => {
    const nextStatus: 'pending' | 'completed' = task.status === 'completed' ? 'pending' : 'completed';
    updateDailyTaskStatus(task.id, nextStatus);
    const updated = tasks.map(t => t.id === task.id ? { ...t, status: nextStatus } : t);
    onTasksUpdated(updated);
  };

  const handleLaunchTask = (task: LearningTask) => {
    if (task.type === 'review_lesson') onNavigate('lessons');
    else if (task.type === 'guided_practice') onNavigate('practice');
    else if (task.type === 'review_mistake') onNavigate('mistakes');
    else if (task.type === 'reading') onNavigate('reading_comm');
    else if (task.type === 'writing') onNavigate('writing');
    else onNavigate('independent');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
          Kế Hoạch Học Tập Từng Bước
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Lộ Trình Hôm Nay (Tối đa 3 nhiệm vụ ngắn)
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Mỗi phiên học được thiết kế cô đọng <strong>10–15 phút</strong>, ưu tiên kiến thức nền tảng và khắc phục lỗi sai thực tế, không gây quá tải cho học sinh.
        </p>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task, idx) => {
          const isDone = task.status === 'completed';
          return (
            <div
              key={task.id}
              className={`p-6 rounded-2xl border shadow-sm transition space-y-4 ${
                isDone
                  ? 'bg-slate-50/70 border-slate-200'
                  : 'bg-white border-blue-200 hover:border-blue-400'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start space-x-3.5">
                  <span className={`w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isDone ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {idx + 1}
                  </span>

                  <div>
                    <h3 className={`text-base font-bold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {task.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {task.description}
                    </p>

                    <div className="flex items-center space-x-3 mt-3 text-xs text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Khoảng {task.estimatedMinutes} phút</span>
                      </span>
                      <span className="px-2.5 py-0.5 bg-blue-50 text-blue-800 rounded-md font-medium border border-blue-100">
                        {task.topic.replace('grammar_', 'Ngữ pháp ').replace('unit', 'Unit ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2 flex-shrink-0">
                  <button
                    onClick={() => handleLaunchTask(task)}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow cursor-pointer transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Làm ngay</span>
                  </button>

                  <button
                    onClick={() => handleToggleTask(task)}
                    className={`text-xs font-semibold cursor-pointer transition flex items-center space-x-1 ${
                      isDone ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isDone ? 'Đã hoàn thành' : 'Đánh dấu xong'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
