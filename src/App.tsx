import React, { useState } from 'react';
import { ScreenType } from './types';
import { HomeScreen } from './components/HomeScreen';
import { EmotionScreen } from './components/EmotionScreen';
import { ChatScreen } from './components/ChatScreen';
import { BreathingExerciseModal } from './components/BreathingExerciseModal';
import { HotlineModal } from './components/HotlineModal';
import { KhktReportModal } from './components/KhktReportModal';
import { FlutterCodeViewer } from './components/FlutterCodeViewer';
import { Smartphone, Monitor, Code2, Award, Wind, ShieldAlert, Sparkles, Wifi, Battery, Volume2, VolumeX } from 'lucide-react';
import { soundTherapy } from './utils/audioSynthesizer';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [isBreathingOpen, setIsBreathingOpen] = useState(false);
  const [isHotlineOpen, setIsHotlineOpen] = useState(false);
  const [isKhktReportOpen, setIsKhktReportOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'app' | 'flutter_code' | 'khkt_overview'>('app');
  const [isAmbientSoundOn, setIsAmbientSoundOn] = useState(false);

  const toggleSound = () => {
    if (isAmbientSoundOn) {
      soundTherapy.stop();
      setIsAmbientSoundOn(false);
    } else {
      soundTherapy.playSound('rain');
      setIsAmbientSoundOn(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-900 flex flex-col font-sans selection:bg-blue-900/15">
      {/* =========================================================================
          TOP BAR CONTRACT (Strict 1-row, 3-zone contract)
          Zone 1: Brand Wordmark (one line)
          Zone 2: 4-5 Navigation Links (single-line, whitespace-nowrap)
          Zone 3: 1 Primary Action CTA
         ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-blue-950 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              M
            </div>
            <span className="text-lg font-extrabold tracking-tight text-blue-950 whitespace-nowrap">
              MindCare
            </span>
          </div>

          {/* Zone 2: Navigation tabs as clean typography */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setActiveTab('app')}
              className={`hover:text-blue-950 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'app' ? 'text-blue-950 font-bold border-b-2 border-blue-950' : ''
              }`}
            >
              Mô Phỏng Ứng Dụng
            </button>
            <button
              onClick={() => setActiveTab('flutter_code')}
              className={`hover:text-blue-950 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'flutter_code' ? 'text-blue-950 font-bold border-b-2 border-blue-950' : ''
              }`}
            >
              Mã Nguồn Flutter
            </button>
            <button
              onClick={() => setIsKhktReportOpen(true)}
              className="hover:text-blue-950 transition-colors whitespace-nowrap shrink-0"
            >
              Thuyết Minh Đề Tài KHKT
            </button>
            <button
              onClick={() => setIsBreathingOpen(true)}
              className="hover:text-blue-950 transition-colors whitespace-nowrap shrink-0"
            >
              Bài Tập Thở 4-7-8
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                isAmbientSoundOn
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title={isAmbientSoundOn ? 'Tắt âm thanh thư giãn' : 'Bật tiếng mưa xoa dịu'}
            >
              {isAmbientSoundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
              <span className="hidden sm:inline">
                {isAmbientSoundOn ? 'Âm thanh mưa' : 'Tiếng êm dịu'}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('app');
                setCurrentScreen('emotion');
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-950 rounded-xl hover:bg-blue-900 shadow-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Sparkles size={14} className="text-emerald-400" />
              <span>Quét Cảm Xúc</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN PRESENTATION WORKSPACE
         ========================================================================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        {activeTab === 'flutter_code' ? (
          /* Flutter Code View Mode */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Cấu Trúc Thư Mục Flutter (Dart SDK &gt;= 3.0.0)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Mã nguồn 3 màn hình chính: HomeScreen, EmotionScreen, ChatScreen và hệ thống Theme Pastel
                </p>
              </div>
              <button
                onClick={() => setActiveTab('app')}
                className="px-3.5 py-2 text-xs font-bold rounded-xl bg-blue-950 text-white hover:bg-blue-900 transition-colors flex items-center gap-1.5"
              >
                <Smartphone size={14} /> Chạy thử trên điện thoại
              </button>
            </div>
            <FlutterCodeViewer />
          </div>
        ) : (
          /* Mobile Simulation + Scientific Context Split */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Context Column: Research Information & Quick Navigation */}
            <div className="lg:col-span-6 space-y-5">
              {/* Context Hero Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-blue-900">Đề tài KHKT Học sinh</span>
                    <span aria-hidden="true">·</span>
                    <span>Tâm lý học đường</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-medium">Bình yên &amp; Cân bằng</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight leading-tight mb-3">
                    MindCare — Ứng dụng chăm sóc sức khỏe tinh thần học sinh
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    Hệ sinh thái hỗ trợ tâm lý học sinh trung học: Nhận diện biểu cảm khuôn mặt qua camera trước, đo lường mức độ căng thẳng thi cử, bài tập thở điều hòa nhịp tim và trợ lý AI thấu cảm 24/7.
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setIsKhktReportOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors flex items-center gap-1.5"
                    >
                      <Award size={15} /> Thuyết minh đề tài KHKT
                    </button>
                    <button
                      onClick={() => setActiveTab('flutter_code')}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Code2 size={15} /> Xem mã nguồn Flutter
                    </button>
                    <button
                      onClick={() => setIsHotlineOpen(true)}
                      className="px-3 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 transition-colors flex items-center gap-1.5"
                    >
                      <ShieldAlert size={14} /> Tổng đài 111
                    </button>
                  </div>
                </div>
              </div>

              {/* 3 Core Screens Navigation Controller for Reviewers */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                  Chuyển nhanh màn hình (3 Màn hình yêu cầu)
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    onClick={() => setCurrentScreen('home')}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      currentScreen === 'home'
                        ? 'bg-blue-950 text-white border-blue-950 shadow-xs font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-medium'
                    }`}
                  >
                    <span className="text-[10px] opacity-70 block">Màn hình 1</span>
                    <span className="text-xs">Trang chủ (Home)</span>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('emotion')}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      currentScreen === 'emotion'
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-medium'
                    }`}
                  >
                    <span className="text-[10px] opacity-70 block">Màn hình 2</span>
                    <span className="text-xs">Quét Cảm Xúc</span>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('chat')}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      currentScreen === 'chat'
                        ? 'bg-blue-900 text-white border-blue-900 shadow-xs font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-medium'
                    }`}
                  >
                    <span className="text-[10px] opacity-70 block">Màn hình 3</span>
                    <span className="text-xs">Trò Chuyện AI</span>
                  </button>
                </div>
              </div>

              {/* Research Methodology Metrics */}
              <div className="p-4 rounded-3xl bg-gradient-to-r from-blue-50/90 to-emerald-50/70 border border-slate-200 text-xs text-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-950">Tiêu chuẩn nghiên cứu KHKT</span>
                  <span className="text-emerald-700 font-semibold">DASS-21 &amp; FaceMesh</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Thiết kế tuân thủ tiêu chuẩn tương tác công thái học (Ergonomics Touch Targets &gt; 44px), tông màu tĩnh dưỡng (Slate Blue &amp; Sage Green) hỗ trợ giảm căng thẳng thị giác cho học sinh khi tự đánh giá.
                </p>
              </div>
            </div>

            {/* Right Column: Realistic Smartphone Mobile Frame Running Flutter App */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[390px] h-[780px] bg-slate-950 rounded-[48px] p-3.5 shadow-2xl ring-12 ring-slate-800/80 border-4 border-slate-700 flex flex-col overflow-hidden">
                {/* Dynamic Island / Camera Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 w-28 h-6 bg-black rounded-full flex items-center justify-between px-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700/80" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
                </div>

                {/* Smartphone Status Bar */}
                <div className="h-10 pt-1.5 px-6 flex items-center justify-between text-[11px] font-semibold text-slate-800 bg-white select-none rounded-t-[36px] z-30 shrink-0">
                  <span className="font-mono text-xs">09:41</span>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Wifi size={13} />
                    <Battery size={15} />
                  </div>
                </div>

                {/* App Screen Container (Scrollable Phone Screen) */}
                <div className="flex-1 bg-[#f8fafc] overflow-y-auto px-4 relative flex flex-col">
                  {currentScreen === 'home' && (
                    <HomeScreen
                      onNavigate={setCurrentScreen}
                      onOpenBreathing={() => setIsBreathingOpen(true)}
                      onOpenHotline={() => setIsHotlineOpen(true)}
                    />
                  )}
                  {currentScreen === 'emotion' && (
                    <EmotionScreen
                      onBack={() => setCurrentScreen('home')}
                      onNavigate={setCurrentScreen}
                      onOpenBreathing={() => setIsBreathingOpen(true)}
                    />
                  )}
                  {currentScreen === 'chat' && (
                    <ChatScreen
                      onBack={() => setCurrentScreen('home')}
                      onNavigate={setCurrentScreen}
                      onOpenBreathing={() => setIsBreathingOpen(true)}
                      onOpenHotline={() => setIsHotlineOpen(true)}
                    />
                  )}
                </div>

                {/* Fixed Bottom Tab Bar (Ergonomic Mobile Touch Navigation) */}
                <div className="h-15 bg-white border-t border-slate-200/80 px-6 flex items-center justify-around z-30 shrink-0 rounded-b-[36px]">
                  <button
                    onClick={() => setCurrentScreen('home')}
                    className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${
                      currentScreen === 'home' ? 'text-blue-950 font-bold' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Smartphone size={20} />
                    <span className="text-[10px] mt-0.5">Trang chủ</span>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('emotion')}
                    className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${
                      currentScreen === 'emotion' ? 'text-emerald-700 font-bold' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Sparkles size={20} />
                    <span className="text-[10px] mt-0.5">Cảm xúc</span>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('chat')}
                    className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${
                      currentScreen === 'chat' ? 'text-blue-900 font-bold' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Monitor size={20} />
                    <span className="text-[10px] mt-0.5">MindBot AI</span>
                  </button>
                </div>

                {/* Mobile Home Gesture Indicator Bar */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-300 rounded-full z-40 pointer-events-none" />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Modals */}
      <BreathingExerciseModal
        isOpen={isBreathingOpen}
        onClose={() => setIsBreathingOpen(false)}
      />

      <HotlineModal
        isOpen={isHotlineOpen}
        onClose={() => setIsHotlineOpen(false)}
      />

      <KhktReportModal
        isOpen={isKhktReportOpen}
        onClose={() => setIsKhktReportOpen(false)}
      />

      {/* Simple Quiet Footer */}
      <footer className="mt-auto border-t border-slate-200/90 py-5 bg-white text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>MindCare · Đề tài Nghiên cứu Khoa học Kỹ thuật Tâm lý Học đường</span>
          <span className="text-slate-400">Flutter Architecture · Dart SDK · Material 3</span>
        </div>
      </footer>
    </div>
  );
}
