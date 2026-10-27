export interface EmotionAnalysis {
  id: string;
  emotion: string; // "Căng thẳng nhẹ" | "Mệt mỏi" | "Bình thường / Thư thái" | "Lo âu thi cử" | "Tích cực & Rạng rỡ"
  category: 'mild_stress' | 'fatigue' | 'calm' | 'anxiety' | 'positive';
  stressLevel: number; // 0 - 100
  heartRate: number; // BPM
  confidence: number; // 0.85 - 0.98
  advice: string;
  suggestedAction: string;
  tensionDetails: {
    forehead: string;
    eyes: string;
    mouth: string;
  };
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedAction?: string;
}

export interface FlutterCodeFile {
  path: string;
  name: string;
  category: 'config' | 'lib' | 'theme' | 'screen' | 'model' | 'docs';
  code: string;
  description: string;
}

export type ScreenType = 'home' | 'emotion' | 'chat';
