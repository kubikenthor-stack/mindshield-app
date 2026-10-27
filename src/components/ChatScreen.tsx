import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Sparkles, Wind, Bot, User, ShieldAlert, HeartHandshake } from 'lucide-react';
import { ChatMessage, ScreenType } from '../types';
import { GoogleGenAI } from '@google/genai';

interface ChatScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenBreathing: () => void;
  onOpenHotline: () => void;
}

const QUICK_PROMPTS = [
  'Mình đang rất lo về kỳ thi học kỳ sắp tới...',
  'Làm sao để bớt áp lực khi bị điểm kém?',
  'Dạo này mình khó ngủ và hay mệt mỏi',
  'Làm sao để tập trung học mà không bị xao nhãng?',
  'Mình muốn học một bài tập thở xoa dịu'
];

export const ChatScreen: React.FC<ChatScreenProps> = ({ onBack, onOpenBreathing, onOpenHotline }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'bot',
      text: 'Chào bạn! Mình là MindBot 🌿 - chuyên viên tư vấn tâm lý học đường AI của MindCare. Hôm nay ở trường hay trong việc học có điều gì khiến bạn băn khoăn hay mệt mỏi không? Mình luôn ở đây và lắng nghe bạn mà không hề phán xét.',
      timestamp: 'Vừa xong'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Call Gemini or fallback psychological AI response
    try {
      let botResponse = '';
      const apiKey = process.env.GEMINI_API_KEY || (window as unknown as { GEMINI_API_KEY?: string }).GEMINI_API_KEY;

      const SYSTEM_PROMPT =
        'Bạn là một người bạn đồng hành tâm lý học đường thấu hiểu, nhẹ nhàng, luôn lắng nghe học sinh khi căng thẳng thi cử hoặc buồn bã. Không chẩn đoán bệnh y khoa, luôn khích lệ tích cực và nếu phát hiện học sinh có dấu hiệu trầm cảm nặng, hãy nhắc nhở liên hệ thầy cô hoặc số hotline 1900599930';

      if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: text,
          config: {
            systemInstruction: SYSTEM_PROMPT
          }
        });
        botResponse = response.text || '';
      }

      // If no API response or no key, use domain-rich empathetic responses
      if (!botResponse) {
        const lower = text.toLowerCase();
        if (lower.includes('trầm cảm') || lower.includes('chết') || lower.includes('tự tử') || lower.includes('bế tắc') || lower.includes('quá sức')) {
          botResponse = 'Mình cảm nhận được bạn đang phải chịu đựng áp lực và nỗi buồn rất lớn lúc này. Nhưng bạn ơi, bạn không hề đơn độc một mình đâu. Hãy nhớ rằng sức khỏe và sự an toàn của bạn luôn là điều quý giá nhất. Hãy liên hệ ngay với thầy cô giáo, cha mẹ hoặc gọi tới đường dây nóng hỗ trợ tâm lý 1900599930 để được các chuyên gia đồng hành và che chở cho bạn nhé 💙.';
        } else if (lower.includes('thi') || lower.includes('kiểm tra') || lower.includes('lo')) {
          botResponse = 'Cảm giác lo âu trước kỳ thi là phản ứng rất bình thường của não bộ. Đừng để nỗi sợ lấn át năng lực thực sự của bạn nhé! Hãy chia nhỏ đề cương thành từng phần 25 phút (kỹ thuật Pomodoro) và nhớ dành 5 phút nghỉ giữa các hiệp. Một bài kiểm tra chỉ đánh giá một thời điểm, chứ không định nghĩa toàn bộ giá trị của bạn 🌱.';
        } else if (lower.includes('ngủ') || lower.includes('thức khuya') || lower.includes('mất ngủ')) {
          botResponse = 'Giấc ngủ là chiếc sạc pin quan trọng nhất của trí não học sinh. Bạn thử cất điện thoại cách giường 2 mét trước giờ ngủ 30 phút, đồng thời thực hành kỹ thuật thở 4-7-8 nhé. Khi nhịp thở chậm lại, não sẽ tự động tiết ra melatonin giúp bạn chìm vào giấc ngủ êm đềm 🌙.';
        } else if (lower.includes('điểm kém') || lower.includes('thất bại') || lower.includes('buồn')) {
          botResponse = 'Mình rất hiểu cảm giác hụt hẫng khi kết quả không như mong đợi sau bao nỗ lực. Nhưng hãy tự hào vì bạn đã cố gắng hết mình. Hãy cho phép bản thân buồn một chút, rồi cùng xem lại câu sai như một "người thầy" chỉ ra lỗ hổng kiến thức để lấp đầy nhé! Bạn luôn có quyền thử lại 💙.';
        } else if (lower.includes('thở') || lower.includes('thư giãn')) {
          botResponse = 'Thật tuyệt vời khi bạn chủ động tìm kiếm sự bình an! Bạn có thể nhấn vào nút "Tập thở 4-7-8" ngay bên dưới để mở vòng tròn hít thở nhịp nhàng cùng MindCare nhé 🌿.';
        } else {
          botResponse = 'Cảm ơn bạn đã tin tưởng chia sẻ cùng mình. Cảm xúc nào xuất hiện cũng đều có lý do chính đáng và đáng được trân trọng. Bạn có muốn cùng mình thả lỏng vai, uống một ngụm nước ấm và thử bài tập thở ngắn 2 phút để tái tạo năng lượng không?';
        }
      }

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now() + 1}`,
            sender: 'bot',
            text: botResponse,
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setIsTyping(false);
      }, 700);
    } catch {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now() + 1}`,
            sender: 'bot',
            text: 'Mình luôn ở đây đồng hành cùng bạn. Khi thấy áp lực dồn dập, hãy cho phép bản thân dừng lại 3 phút, hít thở sâu và uống một ngụm nước ấm nhé 🌿.',
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setIsTyping(false);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-3 bg-white border-b border-slate-200/80 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-950 transition-colors py-1 px-2 rounded-lg hover:bg-slate-100"
        >
          <ArrowLeft size={16} /> Quay lại
        </button>

        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-900">
              <Bot size={18} />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 leading-none">MindBot AI</h3>
            <p className="text-[10px] text-emerald-600 font-medium mt-0.5">Lắng nghe thấu cảm 24/7</p>
          </div>
        </div>

        <button
          onClick={onOpenHotline}
          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
          title="Đường dây nóng khẩn cấp"
        >
          <ShieldAlert size={18} />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-full bg-blue-950 text-white flex items-center justify-center shrink-0 mb-1 shadow-xs">
                  <Bot size={14} />
                </div>
              )}

              <div
                className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-xs ${
                  isUser
                    ? 'bg-blue-950 text-white rounded-br-xs'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <div
                  className={`text-[9px] mt-1 text-right tabular-nums ${
                    isUser ? 'text-blue-200/80' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mb-1">
                  <User size={14} />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-500 italic py-1">
            <div className="w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center">
              <Bot size={12} />
            </div>
            <span className="flex items-center gap-1">
              MindBot đang lắng nghe &amp; soạn câu trả lời
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="px-3 py-1.5 bg-white border-t border-slate-100 shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] text-slate-400 shrink-0 flex items-center gap-1 font-semibold uppercase">
            <Sparkles size={11} className="text-emerald-500" /> Gợi ý:
          </span>
          {QUICK_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] whitespace-nowrap shrink-0 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 border border-slate-200/60 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Input Area */}
      <div className="p-3 bg-white border-t border-slate-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <button
            type="button"
            onClick={onOpenBreathing}
            className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors shrink-0"
            title="Mở bài tập thở 4-7-8"
          >
            <Wind size={18} />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Chia sẻ tâm sự hoặc cảm xúc của bạn..."
            className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all text-slate-900"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-blue-950 text-white hover:bg-blue-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
