import 'package:flutter/material.dart';
import 'dart:async';
import '../theme/app_theme.dart';
import '../models/emotion_model.dart';

class EmotionScreen extends StatefulWidget {
  const EmotionScreen({super.key});

  @override
  State<EmotionScreen> createState() => _EmotionScreenState();
}

class _EmotionScreenState extends State<EmotionScreen> with SingleTickerProviderStateMixin {
  bool _isScanning = false;
  EmotionResult? _result;
  late AnimationController _scanAnimController;

  // Danh mục mẫu các kết quả cảm xúc chuẩn hóa tâm lý học đường
  final List<EmotionResult> _presetResults = [
    EmotionResult(
      emotion: "Căng thẳng nhẹ",
      confidence: 0.92,
      stressLevel: 42.0,
      advice: "Bạn có dấu hiệu căng thẳng vùng trán và cơ hàm. Hãy thả lỏng vai, uống một ngụm nước ấm và nghỉ ngơi 5 phút.",
      timestamp: DateTime.now(),
      suggestedAction: "Tập thở 4-7-8 xoa dịu thần kinh",
    ),
    EmotionResult(
      emotion: "Mệt mỏi học tập",
      confidence: 0.88,
      stressLevel: 68.0,
      advice: "Mắt bạn có dấu hiệu thiếu ngủ và mỏi mệt sau giờ học dài. Hãy rời xa màn hình, nhìn ra xa vào tán cây xanh 3 phút.",
      timestamp: DateTime.now(),
      suggestedAction: "Chườm ấm mắt & giãn cơ cổ vai gáy",
    ),
    EmotionResult(
      emotion: "Bình thường / Thư thái",
      confidence: 0.95,
      stressLevel: 18.0,
      advice: "Trạng thái tâm lý của bạn đang rất cân bằng và ổn định. Đây là thời điểm tuyệt vời để học tập hoặc sáng tạo!",
      timestamp: DateTime.now(),
      suggestedAction: "Duy trì năng lượng tích cực này",
    ),
    EmotionResult(
      emotion: "Tích cực & Tươi tỉnh",
      confidence: 0.96,
      stressLevel: 10.0,
      advice: "Khuôn mặt bạn rạng rỡ với nụ cười tự nhiên. Năng lượng tích cực này sẽ giúp bạn vượt qua mọi thử thách trong ngày.",
      timestamp: DateTime.now(),
      suggestedAction: "Chia sẻ nụ cười với bạn bè cùng lớp",
    ),
  ];

  int _currentSampleIndex = 0;

  @override
  void initState() {
    super.initState();
    _scanAnimController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1800),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _scanAnimController.dispose();
    super.dispose();
  }

  void _startScanning() {
    setState(() {
      _isScanning = true;
      _result = null;
    });

    // Giả lập quá trình trích xuất đặc trưng khuôn mặt (AI Facial Landmarks) trong 2.5 giây
    Timer(const Duration(milliseconds: 2400), () {
      if (!mounted) return;
      setState(() {
        _isScanning = false;
        _result = _presetResults[_currentSampleIndex % _presetResults.length];
        _currentSampleIndex++;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Nhận Diện Cảm Xúc"),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, size: 20),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.flip_camera_ios_rounded, size: 22),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text("Đang sử dụng camera trước (chế độ selfie)"),
                  duration: Duration(seconds: 1),
                ),
              );
            },
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Hướng dẫn ngắn
              Text(
                "Giữ khuôn mặt ở chính giữa khung hình",
                style: TextStyle(
                  fontSize: 13,
                  color: AppTheme.textMuted,
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(height: 14),

              // KHUNG CAMERA TRƯỚC VÀ KHUÔN MẶT GIẢ LẬP
              Container(
                height: 340,
                width: double.infinity,
                decoration: BoxDecoration(
                  color: const Color(0xFF0F172A), // Màu nền ống kính tối sâu
                  borderRadius: BorderRadius.circular(28),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.12),
                      blurRadius: 20,
                      offset: const Offset(0, 8),
                    ),
                  ],
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(28),
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      // Nền camera giả lập với gradient dịu nhẹ
                      Container(
                        decoration: const BoxDecoration(
                          gradient: RadialGradient(
                            center: Alignment.center,
                            radius: 0.9,
                            colors: [
                              Color(0xFF1E293B),
                              Color(0xFF090D16),
                            ],
                          ),
                        ),
                      ),

                      // Biểu tượng khuôn mặt mẫu minh họa
                      Opacity(
                        opacity: 0.25,
                        child: Icon(
                          Icons.face_retouching_natural_rounded,
                          size: 160,
                          color: AppTheme.softMint,
                        ),
                      ),

                      // Khung viền quét khuôn mặt (Face Scanner Bounding Box)
                      Container(
                        width: 200,
                        height: 240,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(24),
                          border: Border.all(
                            color: _isScanning
                                ? AppTheme.mintAccent
                                : Colors.white.withOpacity(0.35),
                            width: 2,
                          ),
                        ),
                        child: Stack(
                          children: [
                            // 4 góc định vị khuôn mặt
                            Positioned(top: 0, left: 0, child: _buildCorner(0)),
                            Positioned(top: 0, right: 0, child: _buildCorner(1)),
                            Positioned(bottom: 0, left: 0, child: _buildCorner(2)),
                            Positioned(bottom: 0, right: 0, child: _buildCorner(3)),

                            // Tia laser quét lên xuống khi đang phân tích
                            if (_isScanning)
                              AnimatedBuilder(
                                animation: _scanAnimController,
                                builder: (context, child) {
                                  return Positioned(
                                    top: _scanAnimController.value * 210,
                                    left: 4,
                                    right: 4,
                                    child: Container(
                                      height: 3,
                                      decoration: BoxDecoration(
                                        color: AppTheme.mintAccent,
                                        boxShadow: [
                                          BoxShadow(
                                            color: AppTheme.mintAccent.withOpacity(0.8),
                                            blurRadius: 8,
                                            spreadRadius: 2,
                                          ),
                                        ],
                                      ),
                                    ),
                                  );
                                },
                              ),
                          ],
                        ),
                      ),

                      // Trạng thái quét
                      Positioned(
                        bottom: 16,
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                          decoration: BoxDecoration(
                            color: Colors.black.withOpacity(0.65),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(
                                _isScanning ? Icons.sync_rounded : Icons.camera_alt_outlined,
                                color: _isScanning ? AppTheme.pastelGreen : Colors.white70,
                                size: 14,
                              ),
                              const SizedBox(width: 6),
                              Text(
                                _isScanning
                                    ? "Đang phân tích nét mặt AI..."
                                    : "Camera trước đã sẵn sàng",
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 12,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 20),

              // NÚT BẤM KÍCH HOẠT QUÉT
              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton(
                  onPressed: _isScanning ? null : _startScanning,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.primaryBlue,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    elevation: 0,
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        _isScanning ? Icons.hourglass_top_rounded : Icons.search_rounded,
                        size: 20,
                      ),
                      const SizedBox(width: 8),
                      Text(
                        _isScanning ? "Đang xử lý sinh trắc học..." : "Bắt Đầu Nhận Diện",
                        style: const TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 20),

              // PHẦN HIỂN THỊ KẾT QUẢ PHÂN TÍCH
              if (_result != null)
                _buildResultCard(_result!)
              else
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(18),
                  decoration: BoxDecoration(
                    color: AppTheme.cardBg,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: const Color(0xFFE2E8F0)),
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: AppTheme.softMint,
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(
                          Icons.lightbulb_outline_rounded,
                          color: Color(0xFF059669),
                          size: 20,
                        ),
                      ),
                      const SizedBox(width: 14),
                      const Expanded(
                        child: Text(
                          "Nhấn 'Bắt Đầu Nhận Diện' để AI đọc tín hiệu căng thẳng qua vi biểu cảm khuôn mặt.",
                          style: TextStyle(
                            fontSize: 13,
                            color: AppTheme.textMuted,
                            height: 1.4,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }

  // Khối góc định vị
  Widget _buildCorner(int cornerIndex) {
    return Container(
      width: 18,
      height: 18,
      decoration: BoxDecoration(
        color: Colors.transparent,
        border: Border(
          top: cornerIndex < 2 ? const BorderSide(color: AppTheme.pastelGreen, width: 3) : BorderSide.none,
          bottom: cornerIndex >= 2 ? const BorderSide(color: AppTheme.pastelGreen, width: 3) : BorderSide.none,
          left: (cornerIndex % 2 == 0) ? const BorderSide(color: AppTheme.pastelGreen, width: 3) : BorderSide.none,
          right: (cornerIndex % 2 == 1) ? const BorderSide(color: AppTheme.pastelGreen, width: 3) : BorderSide.none,
        ),
      ),
    );
  }

  // Thẻ kết quả phân tích cảm xúc
  Widget _buildResultCard(EmotionResult result) {
    Color statusColor;
    Color statusBg;
    IconData statusIcon;

    if (result.stressLevel < 25) {
      statusColor = const Color(0xFF059669);
      statusBg = const Color(0xFFD1FAE5);
      statusIcon = Icons.sentiment_very_satisfied_rounded;
    } else if (result.stressLevel < 50) {
      statusColor = const Color(0xFF2563EB);
      statusBg = const Color(0xFFDBEAFE);
      statusIcon = Icons.sentiment_satisfied_alt_rounded;
    } else {
      statusColor = const Color(0xFFD97706);
      statusBg = const Color(0xFFFEF3C7);
      statusIcon = Icons.sentiment_neutral_rounded;
    }

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppTheme.cardBg,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFFE2E8F0)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 16,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Tiêu đề kết quả
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: statusBg,
                  borderRadius: BorderRadius.circular(14),
                ),
                child: Icon(statusIcon, color: statusColor, size: 26),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Cảm xúc nhận diện:",
                      style: TextStyle(
                        fontSize: 12,
                        color: AppTheme.textMuted,
                      ),
                    ),
                    Text(
                      result.emotion,
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: statusColor,
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: const Color(0xFFF1F5F9),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  "Độ tin cậy ${(result.confidence * 100).toInt()}%",
                  style: const TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.textMuted,
                  ),
                ),
              ),
            ],
          ),

          const SizedBox(height: 16),
          const Divider(height: 1, color: Color(0xFFF1F5F9)),
          const SizedBox(height: 16),

          // Thanh đo mức độ căng thẳng
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                "Mức độ căng thẳng (Stress Level):",
                style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500),
              ),
              Text(
                "${result.stressLevel.toInt()}%",
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  color: statusColor,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: LinearProgressIndicator(
              value: result.stressLevel / 100,
              backgroundColor: const Color(0xFFE2E8F0),
              valueColor: AlwaysStoppedAnimation<Color>(statusColor),
              minHeight: 8,
            ),
          ),

          const SizedBox(height: 18),

          // LỜI KHUYÊN NGẮN CÁ NHÂN HÓA
          const Text(
            "Lời khuyên dành cho bạn:",
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w600,
              color: AppTheme.textMain,
            ),
          ),
          const SizedBox(height: 6),
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: const Color(0xFFF8FAFC),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: const Color(0xFFEDF2F7)),
            ),
            child: Text(
              result.advice,
              style: const TextStyle(
                fontSize: 13,
                height: 1.5,
                color: Color(0xFF334155),
              ),
            ),
          ),

          const SizedBox(height: 14),

          // Gợi ý hành động
          Row(
            children: [
              const Icon(Icons.check_circle_outline_rounded, size: 16, color: Color(0xFF059669)),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  "Đề xuất: ${result.suggestedAction}",
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                    color: Color(0xFF059669),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
