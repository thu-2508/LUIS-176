import React from 'react';
import { Smartphone, Ban, Calendar, Clock, MapPin, Sparkles } from 'lucide-react';

interface SignboardMediaProps {
  mediaId: string;
}

export const SignboardMedia: React.FC<SignboardMediaProps> = ({ mediaId }) => {
  if (mediaId === 'sign_grass') {
    return (
      <div className="my-4 max-w-sm mx-auto p-4 bg-emerald-800 text-white rounded-xl shadow-lg border-4 border-amber-300 text-center relative overflow-hidden">
        <div className="absolute top-1 left-2 text-[10px] uppercase font-bold text-emerald-200 tracking-wider">
          Notice / Biển báo
        </div>
        <div className="py-3 px-2">
          <div className="w-12 h-12 mx-auto mb-2 bg-white text-emerald-800 rounded-full flex items-center justify-center font-bold text-xl shadow">
            🌱
          </div>
          <h4 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-amber-200">
            PLEASE KEEP OFF
          </h4>
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-widest text-white mt-1">
            THE GRASS
          </h3>
          <p className="text-xs text-emerald-100 mt-2 font-medium">
            (Vui lòng không đi dẫm lên cỏ)
          </p>
        </div>
      </div>
    );
  }

  if (mediaId === 'sign_phone') {
    return (
      <div className="my-4 max-w-sm mx-auto p-4 bg-white text-slate-800 rounded-xl shadow-lg border-4 border-red-500 text-center relative">
        <div className="py-2">
          {/* Universal prohibition circle with phone */}
          <div className="relative w-24 h-24 mx-auto mb-2 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-8 border-red-600 flex items-center justify-center relative">
              <Smartphone className="w-12 h-12 text-slate-700" />
              {/* Diagonal red strike */}
              <div className="absolute w-24 h-2 bg-red-600 rotate-45 transform" />
            </div>
          </div>
          <h4 className="text-lg sm:text-xl font-black uppercase tracking-wide text-red-600">
            NO CELL PHONES ALLOWED
          </h4>
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mt-1">
            IN EXAM ROOM / LIBRARY
          </p>
          <p className="text-xs text-slate-500 mt-1 italic">
            (Không sử dụng điện thoại di động trong phòng)
          </p>
        </div>
      </div>
    );
  }

  if (mediaId === 'sign_cleanup') {
    return (
      <div className="my-4 max-w-md mx-auto p-5 bg-gradient-to-br from-amber-50 to-orange-50 text-slate-800 rounded-xl shadow-lg border-2 border-amber-300 relative">
        <div className="flex items-center space-x-2 border-b border-amber-200 pb-2 mb-3">
          <span className="px-2 py-0.5 bg-blue-600 text-white text-[11px] font-bold rounded uppercase">
            COMMUNITY NOTICE
          </span>
          <span className="text-xs font-semibold text-amber-800">Thông báo cộng đồng</span>
        </div>
        <h3 className="text-lg sm:text-xl font-black text-amber-950 uppercase tracking-wide text-center">
          COMMUNITY CLEAN-UP DAY
        </h3>
        <p className="text-xs text-amber-900 text-center font-medium mt-0.5">
          "Giữ gìn đường làng ngõ xóm xanh - sạch - đẹp"
        </p>

        <div className="mt-4 space-y-2 bg-white/80 p-3 rounded-lg border border-amber-200 text-xs sm:text-sm">
          <div className="flex items-center space-x-2 text-slate-700">
            <Calendar className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span><strong>Date:</strong> This Sunday (Chủ nhật tuần này)</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-700">
            <Clock className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span><strong>Time:</strong> 8:00 AM sharp</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-700">
            <MapPin className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span><strong>Meeting Place:</strong> At the village gate (Cổng làng)</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 text-center mt-3 italic">
          All youth club members & volunteers are warmly invited to join!
        </p>
      </div>
    );
  }

  return null;
};
