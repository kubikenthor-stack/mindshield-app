import { FlutterCodeFile } from '../types';

export const FLUTTER_PROJECT_FILES: FlutterCodeFile[] = [
  {
    path: 'pubspec.yaml',
    name: 'pubspec.yaml',
    category: 'config',
    description: 'Khai báo cấu hình và các thư viện dependencies của Flutter (camera, fonts, v.v.)',
    code: `name: app_tam_ly_khkt
description: "MindCare - Ứng dụng hỗ trợ tâm lý học đường và nhận diện cảm xúc dự thi KHKT."
publish_to: "none"
version: 1.0.0+1

environment:
  sdk: ">=3.0.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.6
  camera: ^0.10.5+9
  google_fonts: ^6.2.1
  flutter_spinkit: ^5.2.1
  http: ^1.2.1
  shared_preferences: ^2.2.3

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/`
  },
  {
    path: 'android/app/src/main/AndroidManifest.xml',
    name: 'AndroidManifest.xml',
    category: 'config',
    description: 'Khai báo quyền CAMERA & INTERNET cho ứng dụng chạy trên Android',
    code: `<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.app_tam_ly_khkt">

    <!-- QUYỀN TRUY CẬP CAMERA CHO TÍNH NĂNG NHẬN DIỆN CẢM XÚC -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-feature android:name="android.hardware.camera" android:required="false" />
    <uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />

    <!-- QUYỀN KẾT NỐI MẠNG ĐỂ GỌI GEMINI API & HOTLINE -->
    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:label="MindCare"
        android:name="\${applicationName}"
        android:icon="@mipmap/ic_launcher">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTop"
            android:theme="@style/LaunchTheme"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|smallestScreenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
            android:hardwareAccelerated="true"
            android:windowSoftInputMode="adjustResize">
            <meta-data
              android:name="io.flutter.embedding.android.NormalTheme"
              android:resource="@style/NormalTheme"
              />
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
        <meta-data
            android:name="flutterEmbedding"
            android:value="2" />
    </application>
</manifest>`
  },
  {
    path: 'lib/main.dart',
    name: 'main.dart',
    category: 'lib',
    description: 'Điểm khởi chạy ứng dụng Flutter với cấu hình Material 3 và theme dịu nhẹ',
    code: `import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'theme/app_theme.dart';
import 'screens/home_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
    ),
  );
  runApp(const MindCareApp());
}

class MindCareApp extends StatelessWidget {
  const MindCareApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MindCare - Sức Khỏe Tâm Thần KHKT',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: const HomeScreen(),
    );
  }
}`
  },
  {
    path: 'lib/theme/app_theme.dart',
    name: 'app_theme.dart',
    category: 'theme',
    description: 'Hệ thống màu sắc tối giản: Xanh dương trầm an tâm (#1E3A8A) và Xanh lá pastel thư giãn (#A7F3D0)',
    code: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Bảng màu tối giản, dịu nhẹ mang lại cảm giác bình yên
  // Tone xanh dương trầm & xanh lá pastel
  static const Color primaryBlue = Color(0xFF1E3A8A); // Xanh dương trầm an tâm
  static const Color primaryDark = Color(0xFF0F172A); // Xanh đen sâu lắng
  static const Color pastelGreen = Color(0xFFA7F3D0); // Xanh lá pastel thư giãn
  static const Color softMint = Color(0xFFD1FAE5);    // Bạc hà dịu nhẹ
  static const Color mintAccent = Color(0xFF10B981);  // Điểm nhấn ngọc bích
  static const Color bgSurface = Color(0xFFF8FAFC);   // Nền trắng sứ mềm mại
  static const Color cardBg = Color(0xFFFFFFFF);     // Màu thẻ trắng tinh khôi
  static const Color textMain = Color(0xFF1E293B);    // Màu chữ chính
  static const Color textMuted = Color(0xFF64748B);   // Màu chữ phụ nhẹ nhàng

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: bgSurface,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryBlue,
        primary: primaryBlue,
        secondary: mintAccent,
        surface: cardBg,
      ),
      textTheme: GoogleFonts.plusJakartaSansTextTheme().copyWith(
        displayLarge: GoogleFonts.plusJakartaSans(
          fontSize: 28,
          fontWeight: FontWeight.bold,
          color: textMain,
        ),
        titleLarge: GoogleFonts.plusJakartaSans(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: textMain,
        ),
        bodyMedium: GoogleFonts.plusJakartaSans(
          fontSize: 15,
          color: textMain,
          height: 1.5,
        ),
        bodySmall: GoogleFonts.plusJakartaSans(
          fontSize: 13,
          color: textMuted,
        ),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: GoogleFonts.plusJakartaSans(
          fontSize: 18,
          fontWeight: FontWeight.w600,
          color: textMain,
        ),
        iconTheme: const IconThemeData(color: primaryBlue),
      ),
    );
  }
}`
  },
  {
    path: 'lib/screens/home_screen.dart',
    name: 'home_screen.dart',
    category: 'screen',
    description: 'HomeScreen: Lời chào động viên theo buổi, nút Nhận diện cảm xúc & Trò chuyện AI',
    code: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import 'emotion_screen.dart';
import 'chat_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final hour = DateTime.now().hour;
    String greeting = hour < 12 ? "Chào buổi sáng an lành 🌿" : (hour < 18 ? "Chào buổi chiều nhẹ nhàng 🍃" : "Buổi tối an yên bạn nhé 🌙");

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Thanh tiêu đề & Lời chào động viên
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(greeting, style: Theme.of(context).textTheme.bodySmall),
                      const SizedBox(height: 4),
                      Text("MindCare", style: Theme.of(context).textTheme.displayLarge?.copyWith(fontSize: 26, color: AppTheme.primaryBlue)),
                    ],
                  ),
                  Container(
                    width: 44,
                    height: 44,
                    decoration: BoxDecoration(
                      color: AppTheme.softMint,
                      shape: BoxShape.circle,
                      border: Border.all(color: AppTheme.pastelGreen, width: 1.5),
                    ),
                    child: const Icon(Icons.spa_rounded, color: AppTheme.mintAccent, size: 22),
                  ),
                ],
              ),
              const SizedBox(height: 24),
              // Thẻ động viên mỗi ngày
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF1E3A8A), Color(0xFF2563EB)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(24),
                ),
                child: const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("Thông điệp hôm nay", style: TextStyle(color: Colors.white70, fontSize: 12)),
                    SizedBox(height: 10),
                    Text(
                      '"Bạn không cần phải hoàn hảo để trở nên tuyệt vời. Hãy cho phép bản thân nghỉ ngơi khi thấy mỏi mệt."',
                      style: TextStyle(color: Colors.white, fontSize: 15, fontStyle: FontStyle.italic),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 28),
              // Nút: Nhận diện cảm xúc
              _buildFeatureCard(
                title: "Nhận diện cảm xúc",
                subtitle: "Quét khuôn mặt qua camera trước, phân tích mức độ căng thẳng",
                icon: Icons.camera_front_rounded,
                iconBg: AppTheme.softMint,
                iconColor: const Color(0xFF059669),
                onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const EmotionScreen())),
              ),
              const SizedBox(height: 16),
              // Nút: Trò chuyện cùng AI
              _buildFeatureCard(
                title: "Trò chuyện cùng AI",
                subtitle: "Người bạn lắng nghe tâm tư học đường, giải tỏa áp lực thi cử 24/7",
                icon: Icons.chat_bubble_outline_rounded,
                iconBg: const Color(0xFFE0E7FF),
                iconColor: AppTheme.primaryBlue,
                onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const ChatScreen())),
              ),
            ],
          ),
        ),
      ),
    );
  }

  static Widget _buildFeatureCard({
    required String title,
    required String subtitle,
    required IconData icon,
    required Color iconBg,
    required Color iconColor,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(22),
      child: Container(
        padding: const EdgeInsets.all(18),
        decoration: BoxDecoration(
          color: AppTheme.cardBg,
          borderRadius: BorderRadius.circular(22),
          border: Border.all(color: const Color(0xFFE2E8F0)),
        ),
        child: Row(
          children: [
            Container(
              width: 52,
              height: 52,
              decoration: BoxDecoration(color: iconBg, borderRadius: BorderRadius.circular(16)),
              child: Icon(icon, color: iconColor, size: 26),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: AppTheme.textMain)),
                  const SizedBox(height: 4),
                  Text(subtitle, style: const TextStyle(fontSize: 13, color: AppTheme.textMuted)),
                ],
              ),
            ),
            const Icon(Icons.arrow_forward_rounded, size: 16, color: AppTheme.primaryBlue),
          ],
        ),
      ),
    );
  }
}`
  },
  {
    path: 'lib/screens/emotion_screen.dart',
    name: 'emotion_screen.dart',
    category: 'screen',
    description: 'EmotionScreen: Camera trước giả lập, khung quét biometric, kết quả stress & lời khuyên ngắn',
    code: `import 'package:flutter/material.dart';
import 'dart:async';
import '../theme/app_theme.dart';
import '../models/emotion_model.dart';

class EmotionScreen extends StatefulWidget {
  const EmotionScreen({super.key});

  @override
  State<EmotionScreen> createState() => _EmotionScreenState();
}

class _EmotionScreenState extends State<EmotionScreen> {
  bool _isScanning = false;
  EmotionResult? _result;

  void _startScanning() {
    setState(() { _isScanning = true; _result = null; });
    Timer(const Duration(milliseconds: 2000), () {
      if (!mounted) return;
      setState(() {
        _isScanning = false;
        _result = EmotionResult(
          emotion: "Căng thẳng nhẹ",
          confidence: 0.92,
          stressLevel: 42.0,
          advice: "Bạn có dấu hiệu căng cơ vùng trán. Hãy thả lỏng vai, uống một ngụm nước ấm và nghỉ ngơi 5 phút.",
          timestamp: DateTime.now(),
          suggestedAction: "Tập thở 4-7-8 xoa dịu thần kinh",
        );
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Nhận Diện Cảm Xúc")),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              // Khung giả lập Camera trước
              Container(
                height: 320,
                width: double.infinity,
                decoration: BoxDecoration(
                  color: const Color(0xFF0F172A),
                  borderRadius: BorderRadius.circular(28),
                ),
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    const Icon(Icons.face_retouching_natural_rounded, size: 140, color: Colors.white24),
                    // Khung quét khuôn mặt
                    Container(
                      width: 190,
                      height: 230,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(24),
                        border: Border.all(color: _isScanning ? AppTheme.mintAccent : Colors.white54, width: 2),
                      ),
                    ),
                    if (_isScanning)
                      const Text("Đang phân tích nét mặt AI...", style: TextStyle(color: Colors.white, fontSize: 13)),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _isScanning ? null : _startScanning,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.primaryBlue,
                  minimumSize: const Size(double.infinity, 50),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
                child: Text(_isScanning ? "Đang quét sinh trắc học..." : "Bắt Đầu Nhận Diện", style: const TextStyle(color: Colors.white)),
              ),
              const SizedBox(height: 20),
              if (_result != null)
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: const Color(0xFFE2E8F0)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Kết quả: \${_result!.emotion}", style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppTheme.primaryBlue)),
                      const SizedBox(height: 8),
                      Text("Mức độ căng thẳng: \${_result!.stressLevel.toInt()}%"),
                      const SizedBox(height: 12),
                      Text("Lời khuyên: \${_result!.advice}", style: const TextStyle(fontSize: 14, color: AppTheme.textMain)),
                    ],
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}`
  },
  {
    path: 'lib/screens/chat_screen.dart',
    name: 'chat_screen.dart',
    category: 'screen',
    description: 'ChatScreen: Kết nối Google Gemini API với System Prompt tham vấn tâm lý học đường & hotline 1900599930',
    code: `import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../theme/app_theme.dart';

class ChatMessage {
  final String text;
  final bool isUser;
  final DateTime time;

  ChatMessage({required this.text, required this.isUser, required this.time});

  Map<String, dynamic> toGeminiContent() => {
    "role": isUser ? "user" : "model",
    "parts": [{"text": text}]
  };
}

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});
  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _textController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  bool _isLoading = false;
  String _geminiApiKey = "YOUR_GEMINI_API_KEY"; // Hoặc truyền từ SharedPreferences

  // System Prompt quy định luật ngầm cho AI đồng hành tâm lý học đường
  static const String systemPrompt =
      "Bạn là một người bạn đồng hành tâm lý học đường thấu hiểu, nhẹ nhàng, "
      "luôn lắng nghe học sinh khi căng thẳng thi cử hoặc buồn bã. "
      "Không chẩn đoán bệnh y khoa, luôn khích lệ tích cực và nếu phát hiện học sinh "
      "có dấu hiệu trầm cảm nặng, hãy nhắc nhở liên hệ thầy cô hoặc số hotline 1900599930";

  final List<ChatMessage> _messages = [
    ChatMessage(
      text: "Chào bạn! Mình là người bạn đồng hành tâm lý học đường MindCare 🌿. Dù là áp lực bài vở, kỳ thi hay chuyện bạn bè, mình luôn ở đây lắng nghe bạn.",
      isUser: false,
      time: DateTime.now(),
    ),
  ];

  Future<void> _sendMessage(String text) async {
    if (text.trim().isEmpty) return;
    setState(() {
      _messages.add(ChatMessage(text: text.trim(), isUser: true, time: DateTime.now()));
      _isLoading = true;
    });
    _textController.clear();

    try {
      final url = Uri.parse(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=\$_geminiApiKey',
      );
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          "systemInstruction": {
            "parts": [{"text": systemPrompt}]
          },
          "contents": _messages.map((m) => m.toGeminiContent()).toList(),
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(utf8.decode(response.bodyBytes));
        final reply = data['candidates'][0]['content']['parts'][0]['text'];
        setState(() {
          _messages.add(ChatMessage(text: reply, isUser: false, time: DateTime.now()));
        });
      }
    } catch (e) {
      // Fallback
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Trò Chuyện Cùng AI")),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: ListView.builder(
                controller: _scrollController,
                padding: const EdgeInsets.all(16),
                itemCount: _messages.length,
                itemBuilder: (context, i) => Text(_messages[i].text),
              ),
            ),
            // Input field
          ],
        ),
      ),
    );
  }
}`
  },
  {
    path: 'lib/models/emotion_model.dart',
    name: 'emotion_model.dart',
    category: 'model',
    description: 'Model dữ liệu kết quả phân tích cảm xúc sinh trắc học',
    code: `class EmotionResult {
  final String emotion;
  final double confidence;
  final double stressLevel;
  final String advice;
  final DateTime timestamp;
  final String suggestedAction;

  EmotionResult({
    required this.emotion,
    required this.confidence,
    required this.stressLevel,
    required this.advice,
    required this.timestamp,
    required this.suggestedAction,
  });
}`
  },
  {
    path: 'README.md',
    name: 'README.md',
    category: 'docs',
    description: 'Tài liệu hướng dẫn chạy dự án và thuyết minh đề tài nghiên cứu KHKT',
    code: `# MindCare - Ứng Dụng Tâm Lý Học Đường KHKT

Đề tài Nghiên cứu KHKT cấp trường & cấp tỉnh: "Ứng dụng Trí tuệ Nhân tạo trong nhận diện biểu cảm khuôn mặt và hỗ trợ sức khỏe tinh thần học sinh trung học".

## Lệnh cài đặt & chạy
\`\`\`bash
flutter pub get
flutter run
\`\`\`
`
  }
];
