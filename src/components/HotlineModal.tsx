import React, { useState } from 'react';
import { X, Phone, ShieldAlert, Heart, School, UserCheck, Lock, ExternalLink, Calendar, MapPin, HelpCircle, CheckCircle2 } from 'lucide-react';

interface HotlineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HOTLINES = [
  {
    name: 'Đường dây nóng Hỗ trợ Tâm lý Học đường & Khủng hoảng',
    number: '1900 599 930',
    desc: 'Lắng nghe, can thiệp giảm căng thẳng thi cử, lo âu, buồn bã hoặc trầm cảm học sinh',
    badge: 'Ưu tiên học sinh 24/7',
    color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    callColor: 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
  },
  {
    name: 'Tổng đài Quốc gia Bảo vệ Trẻ em & Học sinh',
    number: '111',
    desc: 'Bảo vệ quyền lợi, hỗ trợ tư vấn tâm lý học đường và giải quyết bạo lực/áp lực (Miễn phí 100%)',
    badge: 'Miễn phí 24/7',
    color: 'bg-blue-50 text-blue-800 border-blue-200',
    callColor: 'text-blue-700 bg-blue-50 hover:bg-blue-100'
  },
  {
    name: 'Đường dây nóng Tâm lý Ngày Mai',
    number: '096 306 1414',
    desc: 'Đội ngũ chuyên gia tâm lý tư vấn chuyên sâu cho thanh thiếu niên gặp khủng hoảng cảm xúc',
    badge: 'Tư vấn chuyên sâu',
    color: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    callColor: 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
  },
  {
    name: 'Viện Sức khỏe Tâm thần (Bệnh viện Bạch Mai)',
    number: '024 3869 3731',
    desc: 'Khám và tư vấn chuyên môn về căng thẳng thần kinh, rối loạn giấc ngủ, kiệt sức học đường',
    badge: 'Tuyến Trung Ương',
    color: 'bg-slate-100 text-slate-800 border-slate-200',
    callColor: 'text-slate-700 bg-slate-100 hover:bg-slate-200'
  }
];

export const HotlineModal: React.FC<HotlineModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'hotlines' | 'school_counselor'>('hotlines');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-slate-950/65 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[92vh] bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors z-10"
          aria-label="Đóng"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100 shrink-0">
          <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shrink-0">
            <ShieldAlert size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">
                Trung Tâm Hỗ Trợ Khẩn Cấp
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                SOS 24/7
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Bạn không hề đơn độc một mình. Luôn có sự trợ giúp an toàn và tận tâm.
            </p>
          </div>
        </div>

        {/* Segmented Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl my-3 shrink-0">
          <button
            onClick={() => setActiveTab('hotlines')}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'hotlines'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Phone size={14} className={activeTab === 'hotlines' ? 'text-rose-600' : ''} />
            <span>Số Điện Thoại Tư Vấn</span>
          </button>
          <button
            onClick={() => setActiveTab('school_counselor')}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'school_counselor'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <School size={14} className={activeTab === 'school_counselor' ? 'text-blue-900' : ''} />
            <span>Tư Vấn Tại Trường Học</span>
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3.5">
          {activeTab === 'hotlines' ? (
            /* TAB 1: DANH SÁCH HOTLINES */
            <div className="space-y-2.5">
              <p className="text-xs text-slate-500">
                Các đường dây nóng hỗ trợ tâm lý học đường chính thức tại Việt Nam (Bảo mật cuộc gọi):
              </p>

              {HOTLINES.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-slate-300 transition-all flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{item.name}</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${item.color}`}>
                      {item.badge}
                    </span>
                  </div>

                  <a
                    href={`tel:${item.number.replace(/\s+/g, '')}`}
                    className={`w-full py-2.5 px-3 rounded-xl border border-slate-200/80 font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition-colors ${item.callColor}`}
                  >
                    <Phone size={14} />
                    <span>Gọi Ngay: {item.number}</span>
                    <ExternalLink size={12} className="opacity-60" />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            /* TAB 2: HƯỚNG DẪN TÌM GẶP CHUYÊN VIÊN TƯ VẤN TẠI TRƯỜNG */
            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3.5 bg-blue-50/80 border border-blue-200/70 rounded-2xl flex items-start gap-3">
                <School size={20} className="text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-950 text-xs sm:text-sm">
                    Phòng Tư Vấn Tâm Lý Học Đường Là Gì?
                  </h4>
                  <p className="text-[11px] text-blue-900/80 mt-1 leading-relaxed">
                    Theo Thông tư của Bộ GD&amp;ĐT, mọi trường trung học đều có tổ chức tư vấn tâm lý nhằm hỗ trợ học sinh giải tỏa áp lực thi cử, khó khăn tình bạn, mâu thuẫn gia đình và định hướng tương lai.
                  </p>
                </div>
              </div>

              {/* 3 Steps Guide */}
              <div className="space-y-2.5">
                <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wide">
                  Quy trình 3 bước tìm gặp chuyên viên tư vấn trường:
                </h5>

                {/* Step 1 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-950 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <h6 className="font-bold text-slate-900 flex items-center gap-1.5">
                      <MapPin size={13} className="text-rose-500" /> Xác định vị trí phòng tư vấn
                    </h6>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Thường được bố trí tại khu vực yên tĩnh trong khuôn viên trường (cạnh thư viện, phòng y tế hoặc phòng truyền thống) với biển hiệu <em>"Phòng Tư Vấn Tâm Lý Học Đường"</em>.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-950 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <h6 className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Calendar size={13} className="text-emerald-600" /> Cách đặt lịch hẹn gặp
                    </h6>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Bạn có thể đến trực tiếp vào giờ ra chơi/sau giờ học, gửi thư vào <strong>Hòm thư tâm sự/Hòm thư điều ước</strong> đặt trước cửa phòng, hoặc nhờ Thầy/Cô giáo chủ nhiệm kết nối.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-950 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <h6 className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Lock size={13} className="text-amber-600" /> Nguyên tắc bảo mật 100%
                    </h6>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Mọi chia sẻ của bạn được giữ bí mật tuyệt đối theo nguyên tắc đạo đức nghề nghiệp, không bị ghi vào học bạ hay tiết lộ cho bạn bè trong lớp.
                    </p>
                  </div>
                </div>
              </div>

              {/* Script gợi ý mở lời */}
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="font-bold text-emerald-950 text-xs flex items-center gap-1.5 mb-1">
                  <HelpCircle size={14} className="text-emerald-700" />
                  Gợi ý câu mở lời nếu bạn thấy ngượng ngùng:
                </span>
                <p className="italic text-[11px] text-emerald-900/90 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-emerald-100">
                  "Thầy/Cô ơi, dạo này em hơi bị quá tải vì việc học thi và có một số chuyện muốn nhờ Thầy/Cô lắng nghe và tư vấn giúp em được không ạ?"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
          <span className="flex items-center gap-1.5 text-slate-600">
            <Heart size={14} className="text-rose-500" /> Sức khỏe &amp; sự an toàn của bạn là quan trọng nhất
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};
