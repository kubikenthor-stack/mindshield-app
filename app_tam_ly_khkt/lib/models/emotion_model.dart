class EmotionResult {
  final String emotion;        // e.g. "Căng thẳng nhẹ", "Mệt mỏi", "Bình thường / Thư thái", "Tích cực"
  final double confidence;     // 0.0 -> 1.0
  final double stressLevel;    // 0 -> 100%
  final String advice;         // Lời khuyên ngắn cá nhân hóa
  final DateTime timestamp;
  final String suggestedAction;// e.g. "Thực hành hít thở 4-7-8", "Nghỉ ngơi 5 phút"

  EmotionResult({
    required this.emotion,
    required this.confidence,
    required this.stressLevel,
    required this.advice,
    required this.timestamp,
    required this.suggestedAction,
  });
}
