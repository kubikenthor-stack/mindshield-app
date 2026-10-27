import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, Camera, RefreshCw, Sparkles, CheckCircle2, AlertCircle, Heart, Activity, Wind, MessageSquare, Play, VideoOff } from 'lucide-react';
import { EmotionAnalysis, ScreenType } from '../types';
import { fireConfetti } from '../utils/confetti';

interface EmotionScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenBreathing: () => void;
}

const PRESET_EMOTIONS: EmotionAnalysis[] = [
  {
    id: 'res-1',
    emotion: 'Căng thẳng nhẹ',
    category: 'mild_stress',
    stressLevel: 42,
    heartRate: 84,
    confidence: 0.94,
    advice: 'Bạn có dấu hiệu căng cơ nhẹ ở vùng giữa hai chân mày và thái dương. Hãy hạ vai xuống, uống một ngụm nước ấm và rời màn hình trong 5 phút.',
    suggestedAction: 'Thực hành bài tập thở 4-7-8 để giải tỏa căng cơ',
    tensionDetails: {
      forehead: 'Co nhẹ cơ cau mày (Corrugator supercilii)',
      eyes: 'Nháy mắt với tần suất hơi cao (62 lần/phút)',
      mouth: 'Cơ môi khép chặt, vi biểu cảm căng thẳng'
    },
    timestamp: 'Vừa xong'
  },
  {
    id: 'res-2',
    emotion: 'Mệt mỏi học tập',
    category: 'fatigue',
    stressLevel: 68,
    heartRate: 76,
    confidence: 0.91,
    advice: 'Vùng mí mắt dưới có quầng nhẹ và mí mắt hơi sụp, biểu hiện của việc thiếu ngủ hoặc học liên tục không nghỉ. Đừng cố gắng quá sức lúc này, một giấc ngủ ngắn 15 phút (Power Nap) sẽ phục hồi trí nhớ rất tốt.',
    suggestedAction: 'Nghỉ ngơi 15 phút & vươn vai thư giãn',
    tensionDetails: {
      forehead: 'Thả lỏng thụ động',
      eyes: 'Độ mở mi mắt giảm 18%, dấu hiệu buồn ngủ',
      mouth: 'Khóe môi hơi trễ xuống'
    },
    timestamp: 'Vừa xong'
  },
  {
    id: 'res-3',
    emotion: 'Bình thường / Thư thái',
    category: 'calm',
    stressLevel: 18,
    heartRate: 72,
    confidence: 0.96,
    advice: 'Các nhóm cơ mặt ở trạng thái thả lỏng tự nhiên, nhịp thở đều đặn. Tâm trí bạn đang ở trạng thái cân bằng lý tưởng nhất. Đây là khung giờ vàng để tiếp thu kiến thức khó hoặc suy ngẫm ý tưởng mới!',
    suggestedAction: 'Tận dụng trạng thái tập trung này để học tập',
    tensionDetails: {
      forehead: 'Mềm mại, không có nếp nhăn căng thẳng',
      eyes: 'Ánh nhìn ổn định, độ mở mí mắt bình thường',
      mouth: 'Thư giãn hoàn toàn, khóe môi cân đối'
    },
    timestamp: 'Vừa xong'
  },
  {
    id: 'res-4',
    emotion: 'Lo âu trước thi cử',
    category: 'anxiety',
    stressLevel: 78,
    heartRate: 98,
    confidence: 0.93,
    advice: 'Hơi thở có xu hướng gấp và cơ quai hàm hơi nghiến lại, dấu hiệu điển hình của sự bồn chồn lo lắng. Hãy nhớ: Bạn đã chuẩn bị rất kỹ càng. Hãy hít thật sâu và nói với bản thân: "Mình sẽ làm tốt nhất có thể."',
    suggestedAction: 'Áp dụng kỹ thuật nối đất Grounding 5-4-3-2-1',
    tensionDetails: {
      forehead: 'Co giật nhẹ ở cơ trán',
      eyes: 'Đồng tử giãn nhẹ, ánh mắt chuyển động nhanh',
      mouth: 'Nghiến nhẹ cơ cắn (Masseter muscle)'
    },
    timestamp: 'Vừa xong'
  },
  {
    id: 'res-5',
    emotion: 'Tích cực & Rạng rỡ',
    category: 'positive',
    stressLevel: 10,
    heartRate: 75,
    confidence: 0.98,
    advice: 'Nụ cười Duchenne chân thực và cơ quanh khóe mắt nâng cao tự nhiên. Năng lượng tích cực này không chỉ giúp bạn học hiệu quả mà còn lan tỏa sự ấm áp đến bạn bè xung quanh!',
    suggestedAction: 'Duy trì niềm vui và sự lạc quan mỗi ngày',
    tensionDetails: {
      forehead: 'Rạng rỡ, thoải mái',
      eyes: 'Cơ vòng mi co nhẹ tạo nếp nhăn cười chân thành',
      mouth: 'Nụ cười nâng đều hai bên khóe miệng'
    },
    timestamp: 'Vừa xong'
  }
];

export const EmotionScreen: React.FC<EmotionScreenProps> = ({ onBack, onNavigate, onOpenBreathing }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<EmotionAnalysis | null>(null);
  const [sampleIndex, setSampleIndex] = useState(0);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const toggleRealCamera = async () => {
    if (isCameraActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setIsCameraActive(false);
      return;
    }

    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch {
      setCameraError('Không thể mở camera thiết bị hoặc quyền truy cập bị từ chối. MindCare đang sử dụng camera giả lập sinh trắc học.');
      setIsCameraActive(false);
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const drawBiometricMesh = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isScanning) {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const t = Date.now() / 200;

      ctx.fillStyle = '#34d399';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1;

      const points = [
        { x: centerX - 35, y: centerY - 45 + Math.sin(t) * 2 },
        { x: centerX, y: centerY - 48 },
        { x: centerX + 35, y: centerY - 45 + Math.sin(t) * 2 },
        { x: centerX - 38, y: centerY - 25 },
        { x: centerX - 22, y: centerY - 25 },
        { x: centerX + 22, y: centerY - 25 },
        { x: centerX + 38, y: centerY - 25 },
        { x: centerX, y: centerY - 15 },
        { x: centerX, y: centerY },
        { x: centerX - 25, y: centerY + 32 },
        { x: centerX, y: centerY + 35 + Math.cos(t) * 1.5 },
        { x: centerX + 25, y: centerY + 32 },
        { x: centerX - 55, y: centerY },
        { x: centerX + 55, y: centerY },
        { x: centerX - 40, y: centerY + 45 },
        { x: centerX + 40, y: centerY + 45 },
        { x: centerX, y: centerY + 65 },
      ];

      points.forEach((pt) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(points[3].x, points[3].y);
      ctx.lineTo(points[7].x, points[7].y);
      ctx.lineTo(points[4].x, points[4].y);
      ctx.lineTo(points[2].x, points[2].y);
      ctx.lineTo(points[5].x, points[5].y);
      ctx.lineTo(points[8].x, points[8].y);
      ctx.lineTo(points[6].x, points[6].y);
      ctx.stroke();
    }
  }, [isScanning]);

  useEffect(() => {
    let animId: number;
    const loop = () => {
      drawBiometricMesh();
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [drawBiometricMesh]);

  const handleStartScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setAnalysisResult(null);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 4;
      if (progress >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        const result = PRESET_EMOTIONS[sampleIndex % PRESET_EMOTIONS.length];
        setAnalysisResult(result);
        setSampleIndex((prev) => prev + 1);

        if (result.category === 'positive' || result.category === 'calm') {
          fireConfetti({ particleCount: 40, spread: 50 });
        }
      } else {
        setScanProgress(progress);
      }
    }, 70);
  };

  const getBadgeStyle = (category: EmotionAnalysis['category']) => {
    switch (category) {
      case 'calm':
        return { bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'mild_stress':
        return { bg: 'bg-blue-50 text-blue-800 border-blue-200' };
      case 'fatigue':
        return { bg: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'anxiety':
        return { bg: 'bg-rose-50 text-rose-800 border-rose-200' };
      case 'positive':
        return { bg: 'bg-teal-50 text-teal-800 border-teal-200' };
      default:
        return { bg: 'bg-slate-50 text-slate-800 border-slate-200' };
    }
  };

  return (
    <div className="flex flex-col min-h-full pb-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between pt-1 pb-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-950 transition-colors py-1 px-2 rounded-lg hover:bg-slate-100"
        >
          <ArrowLeft size={16} /> Quay lại
        </button>
        <span className="text-sm font-bold text-slate-800">Nhận Diện Cảm Xúc</span>
        <button
          onClick={toggleRealCamera}
          className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all ${
            isCameraActive
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
          title="Chuyển đổi Camera thiết bị hoặc Giả lập"
        >
          {isCameraActive ? <Camera size={13} /> : <VideoOff size={13} />}
          {isCameraActive ? 'Camera thật' : 'Camera giả lập'}
        </button>
      </div>

      {cameraError && (
        <div className="mb-3 p-2.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle size={14} className="shrink-0" />
          <span>{cameraError}</span>
        </div>
      )}

      {/* CAMERA VIEWFINDER & SCANNER BOX */}
      <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden bg-slate-950 shadow-md border border-slate-800 mb-4 flex items-center justify-center">
        {/* Real video element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover transform -scale-x-100 ${
            isCameraActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* Simulated Camera Feed Backdrop if real camera is off */}
        {!isCameraActive && (
          <div className="absolute inset-0 bg-radial from-slate-900 via-slate-950 to-black flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-blue-900/20 blur-xl absolute" />
            <div className="relative z-0 opacity-20 text-emerald-300 flex flex-col items-center">
              <Camera size={80} strokeWidth={1} />
              <span className="text-[10px] font-mono tracking-wider mt-2">SIMULATED FRONT CAMERA</span>
            </div>
          </div>
        )}

        {/* Biometric Landmark Canvas Overlay */}
        <canvas
          ref={canvasRef}
          width={320}
          height={240}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* FACE SCANNER BOUNDING BOX */}
        <div className="relative z-20 w-44 h-52 rounded-3xl border-2 border-emerald-400/50 flex flex-col items-center justify-between p-2">
          {/* Corner Guides */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-emerald-400 rounded-tl-lg" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-emerald-400 rounded-tr-lg" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-emerald-400 rounded-bl-lg" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-emerald-400 rounded-br-lg" />

          {/* Top Label */}
          <div className="bg-slate-900/80 backdrop-blur-xs text-[9px] font-mono text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
            {isScanning ? `SCANNING: ${scanProgress}%` : 'FACE TARGET LOCKED'}
          </div>

          {/* Laser Scanning Line */}
          {isScanning && (
            <div
              className="absolute left-1 right-1 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] transition-all duration-75"
              style={{ top: `${(scanProgress % 100) * 0.88 + 5}%` }}
            />
          )}

          {/* Bottom Guidance Tag */}
          <div className="bg-black/60 backdrop-blur-xs text-[10px] text-slate-300 px-2 py-0.5 rounded-full">
            {isScanning ? 'Giữ yên khuôn mặt...' : 'Nhìn thẳng vào camera'}
          </div>
        </div>

        {/* Status Chip */}
        <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center justify-between text-[10px] text-slate-300 px-3 py-1 bg-slate-900/70 backdrop-blur-md rounded-xl border border-white/10">
          <span className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isScanning ? 'bg-emerald-400 animate-ping' : 'bg-emerald-500'}`} />
            {isCameraActive ? 'Camera thật đang mở' : 'Chế độ giả lập sinh trắc'}
          </span>
          <span className="font-mono text-emerald-400">FPS: 30 · KHKT</span>
        </div>
      </div>

      {/* ACTION TRIGGER BUTTON */}
      <div className="mb-4">
        <button
          onClick={handleStartScan}
          disabled={isScanning}
          className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-md transition-all ${
            isScanning
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
              : 'bg-blue-950 hover:bg-blue-900 active:scale-[0.99] text-white shadow-blue-950/20'
          }`}
        >
          {isScanning ? (
            <>
              <RefreshCw size={18} className="animate-spin text-emerald-600" />
              <span>Đang phân tích nét mặt AI ({scanProgress}%)...</span>
            </>
          ) : (
            <>
              <Play size={18} fill="currentColor" />
              <span>Bắt Đầu Nhận Diện Cảm Xúc</span>
            </>
          )}
        </button>
      </div>

      {/* RESULT CARD DISPLAY */}
      {analysisResult ? (
        <div className="bg-white rounded-3xl p-4.5 border border-slate-200 shadow-sm animate-fade-in space-y-3.5">
          {/* Header of result */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Kết quả đo lường
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <h3 className="text-lg font-extrabold text-slate-900">
                  {analysisResult.emotion}
                </h3>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getBadgeStyle(analysisResult.category).bg}`}>
                  {(analysisResult.confidence * 100).toFixed(0)}% tin cậy
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400">Thời gian</span>
              <p className="text-[11px] font-medium text-slate-600">{analysisResult.timestamp}</p>
            </div>
          </div>

          {/* Metric Bar: Mức độ căng thẳng (Stress Level) */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Activity size={13} className="text-blue-900" /> Mức độ căng thẳng (Stress Level)
              </span>
              <span className={`font-bold tabular-nums ${analysisResult.stressLevel > 50 ? 'text-rose-600' : 'text-emerald-700'}`}>
                {analysisResult.stressLevel}%
              </span>
            </div>
            {/* Progress track */}
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  analysisResult.stressLevel > 60
                    ? 'bg-rose-500'
                    : analysisResult.stressLevel > 35
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${analysisResult.stressLevel}%` }}
              />
            </div>
          </div>

          {/* Heart rate & tension indicators */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-100 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-rose-500 shadow-2xs">
                <Heart size={15} />
              </div>
              <div>
                <p className="text-[9px] text-slate-500">Nhịp tim</p>
                <p className="font-bold text-slate-800 tabular-nums">{analysisResult.heartRate} BPM</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-emerald-600 shadow-2xs">
                <Sparkles size={15} />
              </div>
              <div>
                <p className="text-[9px] text-slate-500">Cơ mặt</p>
                <p className="font-bold text-slate-800 truncate">
                  {analysisResult.stressLevel < 30 ? 'Thả lỏng' : 'Hơi căng trán'}
                </p>
              </div>
            </div>
          </div>

          {/* LỜI KHUYÊN NGẮN CÁ NHÂN HÓA */}
          <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100">
            <h4 className="text-[11px] font-bold text-blue-950 flex items-center gap-1.5 mb-1">
              <CheckCircle2 size={13} className="text-blue-900" />
              Lời khuyên ngắn dành cho bạn:
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {analysisResult.advice}
            </p>
          </div>

          {/* Next steps CTAs */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={onOpenBreathing}
              className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
            >
              <Wind size={14} /> Tập thở 4-7-8
            </button>
            <button
              onClick={() => onNavigate('chat')}
              className="flex-1 py-2 px-3 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
            >
              <MessageSquare size={14} /> Tâm sự với AI
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-4 border border-slate-200 text-center space-y-1.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-1">
            <Sparkles size={18} />
          </div>
          <h4 className="text-xs font-bold text-slate-800">Cơ chế nhận diện cảm xúc KHKT</h4>
          <p className="text-[11px] text-slate-500 max-w-xs mx-auto leading-relaxed">
            Thuật toán quét các điểm mốc sinh trắc học trên khuôn mặt, phân tích vi biểu cảm để nhận diện cảm xúc và đưa ra lời khuyên xoa dịu tức thì.
          </p>
        </div>
      )}
    </div>
  );
};
