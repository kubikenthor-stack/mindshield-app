import React from 'react';
import { X, Award, FileSpreadsheet, Users, Activity, BarChart2 } from 'lucide-react';

interface KhktReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KhktReportModal: React.FC<KhktReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
              <Award size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Thuyết Minh Đề Tài Khoa Học Kỹ Thuật (KHKT)
              </h3>
              <p className="text-xs text-slate-500">Lĩnh vực: Hành vi và Khoa học Xã hội · Cấp Trung học</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-5 text-xs text-slate-700 leading-relaxed pr-1">
          {/* Section 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h4 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-900" />
              1. Tên đề tài &amp; Lý do chọn đề tài
            </h4>
            <p className="mb-2">
              <strong>Tên đề tài:</strong> "Nghiên cứu ứng dụng công nghệ nhận diện vi biểu cảm khuôn mặt qua camera và trợ lý trí tuệ nhân tạo nhằm sàng lọc, can thiệp sớm căng thẳng tâm lý học đường cho học sinh trung học phổ thông (MindCare)."
            </p>
            <p className="text-slate-600">
              Áp lực thi cử chuyển cấp, kỳ vọng gia đình và sự biến đổi tâm sinh lý lứa tuổi dậy thì khiến tỷ lệ học sinh gặp rối loạn lo âu và stress tăng cao (chiếm ~32.4% theo khảo sát thực tế). MindCare ra đời nhằm cung cấp công cụ tự đo lường chủ động, bảo mật và thân thiện.
            </p>
          </div>

          {/* Section 2: Research Sample Statistics */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <Users size={16} className="text-emerald-700" />
              2. Dữ liệu khảo sát thực nghiệm (N = 450 học sinh)
            </h4>
            <div className="grid grid-cols-3 gap-2.5 my-3">
              <div className="p-3 bg-white rounded-xl border border-emerald-200 text-center">
                <span className="text-[10px] text-slate-500">Mẫu khảo sát (N)</span>
                <p className="text-lg font-bold text-slate-900 tabular-nums">450</p>
                <span className="text-[10px] text-emerald-600">Khối 10, 11, 12</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-emerald-200 text-center">
                <span className="text-[10px] text-slate-500">Có biểu hiện stress</span>
                <p className="text-lg font-bold text-amber-600 tabular-nums">34.8%</p>
                <span className="text-[10px] text-amber-700">DASS-21 score &gt; 15</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-emerald-200 text-center">
                <span className="text-[10px] text-slate-500">Độ chính xác AI</span>
                <p className="text-lg font-bold text-blue-900 tabular-nums">92.4%</p>
                <span className="text-[10px] text-blue-700">Khớp chuẩn chẩn đoán</span>
              </div>
            </div>
          </div>

          {/* Section 3: Technical Framework */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <Activity size={16} className="text-blue-900" />
              3. Cơ chế hoạt động &amp; Thuật toán
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>Trích xuất đặc trưng sinh trắc học:</strong> Sử dụng mô hình Face Mesh định vị 468 điểm tọa độ (chân mày, mí mắt, khóe miệng).
              </li>
              <li>
                <strong>Phân loại mức độ stress:</strong> Thuật toán ánh xạ độ co cơ và chuyển động nháy mắt sang thang đo DASS-21 (Depression, Anxiety, Stress Scales).
              </li>
              <li>
                <strong>Tương tác can thiệp:</strong> Tích hợp kỹ thuật thở 4-7-8 kích hoạt hệ thần kinh đối giao cảm (Parasympathetic nervous system) giúp hạ nhịp tim trong 120 giây.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Hồ sơ đề tài Khoa học Kỹ thuật 2026</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
