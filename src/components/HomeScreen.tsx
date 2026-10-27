import React, { useState } from 'react';
import { Camera, MessageSquareHeart, Sparkles, Wind, Headphones, ShieldAlert, Heart, ChevronRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { ScreenType } from '../types';
import { soundTherapy } from '../utils/audioSynthesizer';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenBreathing: () => void;
  onOpenHotline: () => void;
}

const QUOTES = [
  {
    text: 'Bạn không cần phải hoàn hảo để trở nên tuyệt vời. Hãy cho phép bản thân nghỉ ngơi khi thấy mỏi mệt.',
    author: 'Tâm lý học đường MindCare'
  },
  {
    text: 'Một kỳ thi không định nghĩa tương lai của bạn. Nỗ lực học hỏi mỗi ngày mới là điều quý giá nhất.',
    author: 'GS. Carol Dweck (Tư duy phát triển)'
  },
  {
    text: 'Hít một hơi thật sâu. Mọi áp lực rồi sẽ qua đi, nhưng sức khỏe và sự an yên của bạn luôn là ưu tiên hàng đầu.',
    author: 'Thông điệp KHKT Học sinh'
  },
  {
    text: 'Khi bạn cảm thấy quá tải, hãy chia nhỏ từng việc. Từng bước chân nhỏ sẽ đưa bạn đi cả dặm đường.',
    author: 'Liệu pháp Hành vi Nhận thức CBT'
  }
];

const MOODS = [
  { id: 'happy', label: 'Tươi vui', emoji: '😊', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'calm', label: 'Bình yên', emoji: '🌿', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { id: 'tired', label: 'Mệt mỏi', emoji: '🥱', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'stressed', label: 'Căng thẳng', emoji: '😰', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: 'anxious', label: 'Lo âu thi', emoji: '🌧️', color: 'bg-blue-50 text-blue-700 border-blue-200' },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onOpenBreathing, onOpenHotline }) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [hasLikedQuote, setHasLikedQuote] = useState(false);

  // Time-based dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Chào buổi sáng an lành 🌿';
    if (hour < 18) return 'Chào buổi chiều nhẹ nhàng 🍃';
    return 'Buổi tối an yên bạn nhé 🌙';
  };

  const toggleSound = () => {
    if (isAudioPlaying) {
      soundTherapy.stop();
      setIsAudioPlaying(false);
    } else {
      soundTherapy.playSound('rain');
      setIsAudioPlaying(true);
    }
  };

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    setHasLikedQuote(false);
  };

  return (
    <div className="flex flex-col min-h-full pb-8">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2 pb-4">
        <div>
          <p className="text-xs font-medium text-slate-500">{getGreeting()}</p>
          <h1 className="text-2xl font-bold text-blue-950 tracking-tight flex items-center gap-2">
            MindCare
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              KHKT
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Ambient relaxing rain audio toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-full border transition-all ${
              isAudioPlaying
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 ring-2 ring-emerald-200'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title={isAudioPlaying ? 'Dừng âm thanh mưa' : 'Bật tiếng mưa thư giãn'}
          >
            <Headphones size={16} className={isAudioPlaying ? 'animate-pulse' : ''} />
          </button>

          {/* NÚT BẤM 'HỖ TRỢ KHẨN CẤP' Ở GÓC MÀN HÌNH CHÍNH */}
          <button
            onClick={onOpenHotline}
            className="px-2.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 active:scale-95 text-rose-700 border border-rose-200 text-[11px] font-bold flex items-center gap-1.5 shadow-2xs transition-all"
            title="Mở danh sách hotline và hướng dẫn tư vấn học đường"
          >
            <ShieldAlert size={14} className="text-rose-600 shrink-0" />
            <span className="whitespace-nowrap">Hỗ trợ khẩn cấp</span>
          </button>
        </div>
      </div>

      {/* Hero Affirmation / Lời chào động viên mỗi ngày */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white p-5 shadow-lg shadow-blue-950/15 mb-6">
        {/* Subtle decorative background light */}
        <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-0 right-0 p-4 opacity-15">
          <Sparkles size={72} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-medium tracking-wide text-emerald-300 uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Lời khuyên động viên hôm nay
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={nextQuote}
                className="p-1 text-slate-300 hover:text-white transition-colors"
                title="Đổi thông điệp khác"
              >
                <RefreshCw size={14} />
              </button>
              <button
                onClick={() => setHasLikedQuote(!hasLikedQuote)}
                className={`p-1 transition-colors ${hasLikedQuote ? 'text-rose-400' : 'text-slate-300 hover:text-white'}`}
                title="Yêu thích"
              >
                <Heart size={14} fill={hasLikedQuote ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          <p className="text-sm font-light italic leading-relaxed text-blue-50/95 mb-3">
            "{QUOTES[quoteIndex].text}"
          </p>

          <div className="flex items-center justify-between text-xs text-blue-200/80 pt-1 border-t border-white/10">
            <span>{QUOTES[quoteIndex].author}</span>
            <span className="text-[11px] text-emerald-300/90 font-medium">An tâm học đường</span>
          </div>
        </div>
      </div>

      {/* Quick Mood Check-in */}
      <div className="mb-6 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
            Cảm xúc của bạn lúc này thế nào?
          </h3>
          {selectedMood && (
            <span className="text-[11px] text-emerald-600 flex items-center gap-1 font-medium">
              <CheckCircle2 size={12} /> Đã ghi nhận
            </span>
          )}
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {MOODS.map((m) => {
            const isSelected = selectedMood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMood(m.id)}
                className={`flex flex-col items-center py-2 px-1 rounded-xl text-center border transition-all ${
                  isSelected
                    ? `${m.color} ring-2 ring-blue-900/20 font-semibold scale-102 shadow-xs`
                    : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/70 text-slate-600'
                }`}
              >
                <span className="text-xl mb-1">{m.emoji}</span>
                <span className="text-[11px] leading-tight truncate w-full">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Core Action Buttons requested by user */}
      <div className="space-y-3.5 mb-6">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
          Chức năng chính
        </h2>

        {/* 1. NÚT BẤM VÀO 'NHẬN DIỆN CẢM XÚC' */}
        <button
          onClick={() => onNavigate('emotion')}
          className="w-full text-left p-4 rounded-2xl bg-white hover:bg-slate-50/80 border border-slate-200 shadow-xs hover:shadow-md transition-all group flex items-center gap-4"
        >
          <div className="w-13 h-13 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 transition-transform">
            <Camera size={26} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-slate-900 text-base">Nhận diện cảm xúc</span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-emerald-100/80 text-emerald-800">
                Camera AI
              </span>
            </div>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              Mở camera trước, quét biểu cảm khuôn mặt & phân tích chỉ số căng thẳng học tập tức thì.
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-950 group-hover:bg-blue-50 transition-colors shrink-0">
            <ChevronRight size={18} />
          </div>
        </button>

        {/* 2. NÚT BẤM VÀO 'TRÒ CHUYỆN CÙNG AI' */}
        <button
          onClick={() => onNavigate('chat')}
          className="w-full text-left p-4 rounded-2xl bg-white hover:bg-slate-50/80 border border-slate-200 shadow-xs hover:shadow-md transition-all group flex items-center gap-4"
        >
          <div className="w-13 h-13 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-900 shrink-0 group-hover:scale-105 transition-transform">
            <MessageSquareHeart size={26} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-slate-900 text-base">Trò chuyện cùng AI</span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-blue-100/80 text-blue-900">
                MindBot 24/7
              </span>
            </div>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              Người bạn đồng hành lắng nghe tâm sự, tư vấn phương pháp vượt qua lo âu thi cử thấu cảm.
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-950 group-hover:bg-blue-50 transition-colors shrink-0">
            <ChevronRight size={18} />
          </div>
        </button>
      </div>

      {/* Quick Mindful Activity Banner */}
      <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/50 rounded-2xl p-4 border border-emerald-100 flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs">
            <Wind size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">Bài tập thở 4-7-8 xoa dịu</h4>
            <p className="text-[11px] text-slate-500">2 phút giúp nhịp tim trở lại trạng thái thư thái</p>
          </div>
        </div>
        <button
          onClick={onOpenBreathing}
          className="px-3 py-1.5 bg-white hover:bg-emerald-600 hover:text-white text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200 transition-colors"
        >
          Tập ngay
        </button>
      </div>

      {/* Emergency Helpline & School Counseling Support Card */}
      <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-rose-200 flex items-center justify-center text-rose-600 shadow-2xs">
            <ShieldAlert size={20} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-rose-950">Gặp khó khăn tâm lý nặng?</h4>
              <span className="text-[9px] font-bold bg-rose-200 text-rose-900 px-1.5 py-0.2 rounded-md">SOS</span>
            </div>
            <p className="text-[11px] text-rose-800/80">Hotline 1900 599 930 &amp; Phòng tư vấn tại trường</p>
          </div>
        </div>
        <button
          onClick={onOpenHotline}
          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-2xs transition-colors shrink-0"
        >
          Trợ giúp
        </button>
      </div>
    </div>
  );
};
