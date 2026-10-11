import React from 'react';
import { BookOpen, CheckCircle, Lightbulb, Target, ShieldCheck, HeartHandshake } from 'lucide-react';
import { TEACHER_INFO } from '../../services/certificateService';

export const StudentGuideView: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Title */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-3">
        <span className="px-3 py-1 bg-amber-400 text-slate-900 font-bold text-xs rounded-full uppercase">
          Cẩm nang ôn thi độc quyền
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          Chiến Thuật Lấy 5–6+ Điểm Cho Học Sinh Yếu
        </h2>
        <p className="text-xs sm:text-sm text-blue-200 leading-relaxed font-light">
          "Không cần học vẹt cả quyển sách – Hãy nắm chắc 4 vùng điểm vàng để làm đúng trọn vẹn từng câu trong tầm tay!"
        </p>
        <p className="text-xs font-semibold text-amber-300">
          Biên soạn bởi: GV {TEACHER_INFO.name} – {TEACHER_INFO.school}
        </p>
      </div>

      {/* 4 Golden Point Zones */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
          <Target className="w-5 h-5 text-blue-700" />
          <span>Bản Đồ 4 Vùng Điểm Vàng (Chiến thuật 5–6 điểm)</span>
        </h3>

        {/* Zone 1 */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-blue-900 text-sm">
              VÙNG 1: Động từ chỉ thích/ghét (Ăn chắc 1.5 – 2.0 điểm)
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              Dễ nhất
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            - Nhìn thấy <strong>fancy, adore, enjoy, mind, detest</strong> &rarr; Khoanh ngay phương án có đuôi <strong>-ing</strong>.<br />
            - Nhìn thấy <strong>keen</strong> &rarr; Đi với <strong>ON</strong>; <strong>fond</strong> &rarr; Đi với <strong>OF</strong>; <strong>interested</strong> &rarr; Đi với <strong>IN</strong>.<br />
            - Nhìn thấy <strong>would like</strong> &rarr; Khoanh ngay <strong>to-V</strong> (không được chọn V-ing).
          </p>
        </div>

        {/* Zone 2 */}
        <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-indigo-900 text-sm">
              VÙNG 2: So sánh hơn của trạng từ (Ăn chắc 1.0 – 1.5 điểm)
            </span>
            <span className="text-xs font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">
              Trọng tâm
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            - Trạng từ ngắn: <strong>fast &rarr; faster</strong>; <strong>early &rarr; earlier</strong>; <strong>hard &rarr; harder</strong>.<br />
            - Trạng từ dài (đuôi -ly): <strong>more fluently</strong>, <strong>more carefully</strong>, <strong>more slowly</strong>.<br />
            - Hai từ bất quy tắc bắt buộc thuộc: <strong>well &rarr; better</strong> và <strong>badly &rarr; worse</strong>.<br />
            - <em>Cảnh giác bẫy:</em> Tuyệt đối gạch bỏ ngay phương án nào có "more faster" hoặc "carefullier"!
          </p>
        </div>

        {/* Zone 3 */}
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-emerald-900 text-sm">
              VÙNG 3: Câu ghép & Từ nối (Ăn chắc 1.0 điểm)
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              Mẹo dấu câu
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            - Nhìn trước chỗ trống có dấu phẩy <strong>", _______ S + V"</strong>: Thường chọn <strong>so</strong> (vì vậy), <strong>but</strong> (nhưng), hoặc <strong>and</strong>.<br />
            - Nhìn thấy dấu chấm phẩy và phẩy <strong>"; _______ , S + V"</strong>: Chọn <strong>however</strong> (tuy nhiên), <strong>therefore</strong> (do đó), hoặc <strong>otherwise</strong> (nếu không thì).
          </p>
        </div>

        {/* Zone 4 */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-900 text-sm">
              VÙNG 4: Ba biển báo & Thông báo thực tế (Ăn chắc 0.75 – 1.0 điểm)
            </span>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
              Hình ảnh
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            - <strong>KEEP OFF THE GRASS</strong>: Không dẫm lên cỏ (Do not walk on the grass).<br />
            - <strong>Điện thoại bị gạch chéo đỏ</strong>: Cấm dùng điện thoại (No cell phones allowed).<br />
            - <strong>COMMUNITY CLEAN-UP DAY</strong>: Tình nguyện viên tập trung vào sáng Chủ nhật để quét dọn, vệ sinh làng quê.
          </p>
        </div>
      </div>

      {/* Teacher Letter */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
        <h4 className="text-sm font-bold text-blue-950 flex items-center space-x-2">
          <HeartHandshake className="w-4 h-4 text-rose-500" />
          <span>Lời dặn dò từ Cô Vũ Thị Mai Thu:</span>
        </h4>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded-xl border border-slate-200">
          "Các em thân mến, môn Tiếng Anh không khó nếu các em kiên trì mỗi ngày 10–15 phút. Khi làm bài, hãy đọc đề thật chậm, gạch chân từ khóa và làm câu dễ trước. Chỉ cần nắm vững các chuyên đề trên là các em hoàn toàn có thể tự tin đạt điểm 5–6 trở lên. Cô luôn tin tưởng và đồng hành cùng các em!"
        </p>
      </div>
    </div>
  );
};
