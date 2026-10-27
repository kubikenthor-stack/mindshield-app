import React, { useState, useEffect } from 'react';
import { X, Play, RotateCcw } from 'lucide-react';
import { fireConfetti } from '../utils/confetti';

interface BreathingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BreathingExerciseModal: React.FC<BreathingModalProps> = ({ isOpen, onClose }) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'ready'>('ready');
  const [timer, setTimer] = useState(4);
  const [cycles, setCycles] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Transition to next phase
        if (phase === 'inhale') {
          setPhase('hold');
          return 7;
        } else if (phase === 'hold') {
          setPhase('exhale');
          return 8;
        } else {
          setPhase('inhale');
          setCycles((c) => {
            const nextCycles = c + 1;
            if (nextCycles >= 3) {
              fireConfetti({ particleCount: 50, spread: 60 });
            }
            return nextCycles;
          });
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, phase]);

  if (!isOpen) return null;

  const startExercise = () => {
    setIsActive(true);
    setPhase('inhale');
    setTimer(4);
    setCycles(0);
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase('ready');
    setTimer(4);
    setCycles(0);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Hít vào chậm rãi bằng mũi...';
      case 'hold':
        return 'Nín thở & thả lỏng vai...';
      case 'exhale':
        return 'Thở ra từ từ bằng miệng...';
      default:
        return 'Sẵn sàng thư giãn tâm trí';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 flex flex-col items-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Đóng"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            Kỹ thuật 4-7-8 xoa dịu thần kinh
          </span>
          <h3 className="text-xl font-bold text-slate-800 mt-2">Bài Tập Thở Điều Hòa Nhịp Tim</h3>
          <p className="text-xs text-slate-500 mt-1">Giúp giảm nhanh hormone Cortisol gây căng thẳng học tập</p>
        </div>

        {/* Breathing Animated Sphere */}
        <div className="relative w-56 h-56 flex items-center justify-center my-4">
          {/* Outer ripples */}
          <div
            className={`absolute inset-0 rounded-full border-2 border-emerald-300 transition-all duration-1000 ${
              phase === 'inhale' ? 'scale-110 opacity-60' : phase === 'hold' ? 'scale-105 opacity-80' : 'scale-90 opacity-20'
            }`}
          />
          <div
            className={`absolute -inset-4 rounded-full border border-sky-200 transition-all duration-1000 ${
              phase === 'inhale' ? 'scale-105 opacity-40' : 'scale-95 opacity-10'
            }`}
          />

          {/* Core Breathing Bubble */}
          <div
            className={`w-36 h-36 rounded-full flex flex-col items-center justify-center transition-all duration-1000 shadow-xl ${
              phase === 'inhale'
                ? 'scale-125 bg-gradient-to-br from-emerald-200 to-sky-300 text-slate-800'
                : phase === 'hold'
                ? 'scale-125 bg-gradient-to-br from-sky-300 to-indigo-300 text-slate-800'
                : phase === 'exhale'
                ? 'scale-90 bg-gradient-to-br from-emerald-100 to-teal-200 text-slate-700'
                : 'bg-emerald-50 text-emerald-800'
            }`}
          >
            <span className="text-4xl font-extrabold tabular-nums tracking-tight">
              {isActive ? timer : '4-7-8'}
            </span>
            <span className="text-[11px] font-medium tracking-wide uppercase opacity-80 mt-1">
              {phase === 'inhale' ? 'Hít Vào' : phase === 'hold' ? 'Giữ Hơi' : phase === 'exhale' ? 'Thở Ra' : 'Bắt Đầu'}
            </span>
          </div>
        </div>

        {/* Guidance Instruction */}
        <div className="text-center h-12 flex flex-col justify-center mb-6">
          <p className="text-sm font-semibold text-slate-700">{getPhaseText()}</p>
          {isActive && (
            <p className="text-xs text-slate-400 mt-1">
              Đã hoàn thành: <span className="font-semibold text-emerald-600">{cycles} chu kỳ</span> / 3
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 w-full">
          {!isActive ? (
            <button
              onClick={startExercise}
              className="flex-1 py-3 px-4 bg-blue-900 hover:bg-blue-800 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Play size={16} /> Bắt đầu bài tập (2 phút)
            </button>
          ) : (
            <>
              <button
                onClick={resetExercise}
                className="p-3 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                title="Làm lại"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => setIsActive(false)}
                className="flex-1 py-3 px-4 bg-slate-800 text-white font-medium text-sm rounded-xl hover:bg-slate-700 transition-colors"
              >
                Tạm dừng
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
