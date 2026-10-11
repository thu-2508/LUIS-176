import React, { useState } from 'react';
import { READING_PASSAGES } from '../../data/sourceQuestions';
import { LISTENING_EXERCISES } from '../../data/listeningData';
import { SignboardMedia } from '../SignboardMedia';
import { BookOpen, Image as ImageIcon, Headphones, Volume2, RotateCcw, CheckCircle, Info, FileText } from 'lucide-react';
import { listeningAudioEngine } from '../../services/listeningAudioService';

export const MediaPassagesView: React.FC = () => {
  const [selectedPassage, setSelectedPassage] = useState(READING_PASSAGES[0]);
  const [selectedAudioEx, setSelectedAudioEx] = useState(LISTENING_EXERCISES[0]);
  const [isTeacherPlaying, setIsTeacherPlaying] = useState(false);

  const playTeacherAudio = (text: string) => {
    if (isTeacherPlaying) {
      stopTeacherAudio();
      return;
    }

    listeningAudioEngine.speakText({
      text,
      rate: 0.88,
      gender: 'female',
      accent: 'US',
      playChime: true,
      onStart: () => setIsTeacherPlaying(true),
      onEnd: () => setIsTeacherPlaying(false),
      onError: () => setIsTeacherPlaying(false)
    });
  };

  const stopTeacherAudio = () => {
    listeningAudioEngine.stop();
    setIsTeacherPlaying(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
          Khu vực Giáo viên • Học Liệu Đa Phương Tiện
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Quản Lý Đoạn Đọc, Biển Báo & Tệp Âm Thanh Bài Nghe
        </h2>
        <p className="text-xs text-slate-500">
          Kiểm tra tính toàn vẹn của các đoạn văn đọc hiểu, hình ảnh biển báo và kịch bản audio luyện nghe theo chương trình Ôn tập Giữa kì I.
        </p>
      </div>

      {/* Listening Audio Scripts Manager */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Headphones className="w-5 h-5 text-blue-700" />
            <span>Kịch Bản Âm Thanh & Bài Tập Nghe ({LISTENING_EXERCISES.length} Chuyên đề):</span>
          </h3>
          <span className="text-xs text-blue-700 font-semibold bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
            Unit 1 • Unit 2 • Unit 3 & Đề Tổng Hợp
          </span>
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-1">
          {LISTENING_EXERCISES.map(ex => (
            <button
              key={ex.id}
              onClick={() => {
                stopTeacherAudio();
                setSelectedAudioEx(ex);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition ${
                selectedAudioEx.id === ex.id
                  ? 'bg-blue-800 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Ex {ex.exerciseNumber}: {ex.title.split(':')[1]?.trim() || ex.title}
            </button>
          ))}
        </div>

        <div className="p-5 bg-blue-50/40 rounded-xl border border-blue-200 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-200 pb-3">
            <div>
              <span className="text-[11px] font-bold uppercase text-blue-800 bg-white px-2 py-0.5 rounded border border-blue-200 mr-2">
                {selectedAudioEx.topicUnit}
              </span>
              <h4 className="font-bold text-slate-900 text-sm inline-block">{selectedAudioEx.title}</h4>
              <p className="text-xs text-slate-600 mt-0.5">{selectedAudioEx.instruction}</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => playTeacherAudio(selectedAudioEx.audioScript)}
                className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${
                  isTeacherPlaying
                    ? 'bg-amber-500 text-slate-950 animate-pulse'
                    : 'bg-blue-800 hover:bg-blue-900 text-white'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isTeacherPlaying ? 'Dừng đọc' : 'Nghe thử kịch bản'}</span>
              </button>

              {isTeacherPlaying && (
                <button
                  onClick={stopTeacherAudio}
                  className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700"
                  title="Dừng hẳn"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 flex items-center space-x-1">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Nội dung Lời Thoại Tiếng Anh (Audio Script):</span>
            </span>
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs sm:text-sm font-sans leading-relaxed text-slate-800 whitespace-pre-line font-medium">
              {selectedAudioEx.audioScript}
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
            <strong>Tóm tắt nội dung sư phạm:</strong>
            <p className="text-slate-700">{selectedAudioEx.vietnameseSummary}</p>
          </div>
        </div>
      </div>

      {/* 3 Signboards View */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <ImageIcon className="w-5 h-5 text-purple-600" />
          <span>Ba Biển Báo / Thông Báo Nguồn Trong Tài Liệu Ôn Tập:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-center">
            <span className="text-xs font-bold text-slate-700">Biển 1: Bãi cỏ</span>
            <SignboardMedia mediaId="sign_grass" />
            <p className="text-[11px] text-slate-500">
              Biển cảnh báo không dẫm lên cỏ sân trường/công viên.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-center">
            <span className="text-xs font-bold text-slate-700">Biển 2: Cấm điện thoại</span>
            <SignboardMedia mediaId="sign_phone" />
            <p className="text-[11px] text-slate-500">
              Biển cấm sử dụng điện thoại trong phòng thi / thư viện.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-center">
            <span className="text-xs font-bold text-slate-700">Thông báo 3: Ngày chủ nhật xanh</span>
            <SignboardMedia mediaId="sign_cleanup" />
            <p className="text-[11px] text-slate-500">
              Thông báo ngày dọn dẹp vệ sinh làng quê sáng Chủ Nhật lúc 8:00 AM.
            </p>
          </div>
        </div>
      </div>

      {/* Reading Passages view */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-purple-600" />
          <span>Danh Sách 3 Đoạn Văn Đọc Hiểu:</span>
        </h3>

        <div className="flex space-x-2 overflow-x-auto pb-1">
          {READING_PASSAGES.map(pass => (
            <button
              key={pass.id}
              onClick={() => setSelectedPassage(pass)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition ${
                selectedPassage.id === pass.id
                  ? 'bg-purple-700 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {pass.title}
            </button>
          ))}
        </div>

        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <h4 className="font-bold text-slate-900 text-sm">{selectedPassage.title}</h4>
            <span className="text-xs text-slate-500">Số từ: {selectedPassage.wordCount}</span>
          </div>

          <p className="text-xs sm:text-sm font-serif leading-relaxed text-slate-800 whitespace-pre-line">
            {selectedPassage.content}
          </p>

          <p className="text-xs text-blue-900 bg-blue-50 p-2.5 rounded-lg border border-blue-200">
            <strong>Tóm tắt nội dung:</strong> {selectedPassage.vietnameseSummary}
          </p>
        </div>
      </div>
    </div>
  );
};
