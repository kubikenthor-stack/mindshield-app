import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../theme/app_theme.dart';

class ChatMessage {
  final String text;
  final bool isUser;
  final DateTime time;

  ChatMessage({
    required this.text,
    required this.isUser,
    required this.time,
  });

  // Chuyển đổi sang định dạng contents cho Gemini API
  Map<String, dynamic> toGeminiContent() {
    return {
      "role": isUser ? "user" : "model",
      "parts": [
        {"text": text}
      ]
    };
  }
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

  // Cấu hình API Key (Học sinh có thể điền API key Gemini miễn phí từ Google AI Studio)
  String _geminiApiKey = ""; // Điền API Key của bạn vào đây hoặc qua Settings dialog
  final String _selectedModel = "gemini-2.5-flash";

  // SYSTEM PROMPT (Luật ngầm chỉ đạo AI theo đúng yêu cầu đề tài KHKT)
  static const String systemPrompt =
      "Bạn là một người bạn đồng hành tâm lý học đường thấu hiểu, nhẹ nhàng, "
      "luôn lắng nghe học sinh khi căng thẳng thi cử hoặc buồn bã. "
      "Không chẩn đoán bệnh y khoa, luôn khích lệ tích cực và nếu phát hiện học sinh "
      "có dấu hiệu trầm cảm nặng, hãy nhắc nhở liên hệ thầy cô hoặc số hotline 1900599930";

  final List<ChatMessage> _messages = [
    ChatMessage(
      text: "Chào bạn! Mình là người bạn đồng hành tâm lý học đường MindCare 🌿. "
          "Dù là áp lực bài vở, căng thẳng thi cử hay nỗi buồn trong lòng, "
          "mình luôn ở đây lắng nghe bạn.",
      isUser: false,
      time: DateTime.now(),
    ),
  ];

  final List<String> _quickPrompts = [
    "Mình đang rất lo về bài kiểm tra ngày mai...",
    "Làm sao để tập trung khi ngồi học?",
    "Mình cảm thấy mệt mỏi và không có động lực",
    "Gần đây mình hay bị khó ngủ vì áp lực",
  ];

  @override
  void dispose() {
    _textController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  // Gửi tin nhắn thực tế tới Google Gemini API
  Future<void> _sendMessageToGemini(String userText) async {
    if (userText.trim().isEmpty) return;

    final userMessage = ChatMessage(
      text: userText.trim(),
      isUser: true,
      time: DateTime.now(),
    );

    setState(() {
      _messages.add(userMessage);
      _isLoading = true;
    });
    _textController.clear();
    _scrollToBottom();

    // Chuẩn bị lịch sử hội thoại (Chat History) để AI hiểu ngữ cảnh
    final List<Map<String, dynamic>> contents = _messages.map((m) => m.toGeminiContent()).toList();

    try {
      if (_geminiApiKey.trim().isEmpty) {
        // Nếu chưa cấu hình API key, hiển thị phản hồi mô phỏng kèm hướng dẫn nhập Key
        await Future.delayed(const Duration(milliseconds: 1000));
        _handleLocalResponse(userText);
        return;
      }

      final url = Uri.parse(
        'https://generativelanguage.googleapis.com/v1beta/models/$_selectedModel:generateContent?key=$_geminiApiKey',
      );

      final requestBody = jsonEncode({
        "systemInstruction": {
          "parts": [
            {"text": systemPrompt}
          ]
        },
        "contents": contents,
        "generationConfig": {
          "temperature": 0.7,
          "topK": 40,
          "topP": 0.95,
          "maxOutputTokens": 1024,
        }
      });

      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: requestBody,
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(utf8.decode(response.bodyBytes));
        final candidates = data['candidates'] as List?;
        if (candidates != null && candidates.isNotEmpty) {
          final parts = candidates[0]['content']['parts'] as List;
          final botReply = parts.map((p) => p['text']).join("\n");

          setState(() {
            _messages.add(ChatMessage(
              text: botReply,
              isUser: false,
              time: DateTime.now(),
            ));
          });
        } else {
          _addErrorMessage("Không nhận được câu trả lời từ AI. Bạn thử lại nhé!");
        }
      } else {
        final errorJson = jsonDecode(utf8.decode(response.bodyBytes));
        final errorMsg = errorJson['error']?['message'] ?? "Lỗi kết nối (${response.statusCode})";
        _addErrorMessage("Lỗi Gemini API: $errorMsg");
      }
    } catch (e) {
      _addErrorMessage("Không thể kết nối mạng: $e");
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
        _scrollToBottom();
      }
    }
  }

  // Phản hồi dự phòng thông minh (tuân thủ 100% System Prompt) khi chưa kết nối API
  void _handleLocalResponse(String userText) {
    String reply;
    final lower = userText.toLowerCase();

    if (lower.contains("chết") || lower.contains("tự tử") || lower.contains("bế tắc") || lower.contains("trầm cảm nặng")) {
      reply = "Mình hiểu bạn đang trải qua những cảm xúc vô cùng nặng nề và đau đớn. "
          "Nhưng bạn ơi, bạn không hề đơn độc một mình lúc này! "
          "Xin hãy chia sẻ ngay với thầy cô giáo, cha mẹ hoặc gọi ngay đến tổng đài hỗ trợ tâm lý 1900599930 để được các cô chú chuyên gia đồng hành và bảo vệ bạn nhé. Sự an toàn của bạn là quan trọng nhất 💙.";
    } else if (lower.contains("thi") || lower.contains("kiểm tra") || lower.contains("lo")) {
      reply = "Cảm giác lo âu trước kỳ thi là phản ứng rất tự nhiên của não bộ. Đừng để nỗi sợ làm lu mờ năng lực và sự chăm chỉ của bạn suốt thời gian qua nhé! Hãy chia nhỏ đề cương ra học theo phương pháp Pomodoro 25 phút và nhớ nghỉ ngơi hợp lý. Mình tin bạn sẽ làm tốt 🌱.";
    } else if (lower.contains("buồn") || lower.contains("khóc") || lower.contains("mệt")) {
      reply = "Hãy cho phép bản thân nghỉ ngơi một chút nhé. Bạn đã rất cố gắng rồi! Một cốc nước ấm, vài hơi thở sâu hoặc nghe một điệu nhạc dịu êm sẽ giúp bạn thấy dễ chịu hơn. Nếu cần ai đó tâm sự, mình luôn ở đây.";
    } else {
      reply = "Cảm ơn bạn đã tâm sự với mình. Mọi cảm xúc của bạn đều xứng đáng được lắng nghe. Bạn có muốn cùng mình thử bài tập thở 4-7-8 để giải tỏa căng thẳng lúc này không 🌿?";
    }

    setState(() {
      _messages.add(ChatMessage(
        text: reply,
        isUser: false,
        time: DateTime.now(),
      ));
      _isLoading = false;
    });
    _scrollToBottom();
  }

  void _addErrorMessage(String error) {
    setState(() {
      _messages.add(ChatMessage(
        text: "⚠️ $error\n(Mẹo: Bạn có thể nhấn vào biểu tượng chìa khóa 🔑 trên góc để cài đặt Gemini API Key).",
        isUser: false,
        time: DateTime.now(),
      ));
    });
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  // Hộp thoại nhập API Key cho người dùng kiểm thử thực tế
  void _showApiKeyDialog() {
    final keyController = TextEditingController(text: _geminiApiKey);
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Row(
          children: [
            Icon(Icons.vpn_key_rounded, color: AppTheme.primaryBlue, size: 22),
            SizedBox(width: 8),
            Text("Cài Đặt Gemini API Key", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              "Nhập Google Gemini API Key để kết nối gửi & nhận tin nhắn thực tế qua mô hình gemini-2.5-flash:",
              style: TextStyle(fontSize: 13, color: AppTheme.textMuted),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: keyController,
              decoration: InputDecoration(
                hintText: "AIzaSy...",
                hintStyle: const TextStyle(fontSize: 13),
                filled: true,
                fillColor: const Color(0xFFF1F5F9),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
            const SizedBox(height: 10),
            const Text(
              "Hotline an toàn học đường mặc định: 1900599930",
              style: TextStyle(fontSize: 11, color: Color(0xFF059669), fontWeight: FontWeight.w500),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("Hủy"),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.primaryBlue,
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
            onPressed: () {
              setState(() {
                _geminiApiKey = keyController.text.trim();
              });
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text("Đã lưu API Key thành công!")),
              );
            },
            child: const Text("Lưu Cấu Hình"),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 9,
              height: 9,
              decoration: const BoxDecoration(
                color: Color(0xFF10B981),
                shape: BoxShape.circle,
              ),
            ),
            const SizedBox(width: 8),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text("MindBot AI", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                Text("Đồng hành tâm lý học đường", style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
              ],
            ),
          ],
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, size: 20),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.vpn_key_outlined, size: 20),
            tooltip: "Cài đặt Gemini API Key",
            onPressed: _showApiKeyDialog,
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Banner thông báo đường dây nóng an toàn học đường 1900599930
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 7),
              color: const Color(0xFFFEF2F2),
              child: const Row(
                children: [
                  Icon(Icons.shield_outlined, size: 14, color: Color(0xFFDC2626)),
                  SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      "Hotline hỗ trợ tâm lý học đường khẩn cấp: 1900599930 (24/7)",
                      style: TextStyle(fontSize: 11, color: Color(0xFFB91C1C), fontWeight: FontWeight.w500),
                    ),
                  ),
                ],
              ),
            ),

            // Danh sách tin nhắn
            Expanded(
              child: ListView.builder(
                controller: _scrollController,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                itemCount: _messages.length,
                itemBuilder: (context, index) {
                  final msg = _messages[index];
                  return _buildMessageBubble(msg);
                },
              ),
            ),

            // Hiệu ứng đang soạn tin
            if (_isLoading)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 6),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                      decoration: BoxDecoration(
                        color: const Color(0xFFF1F5F9),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: const Row(
                        children: [
                          Text(
                            "MindBot đang lắng nghe & suy nghĩ",
                            style: TextStyle(fontSize: 12, color: AppTheme.textMuted),
                          ),
                          SizedBox(width: 8),
                          SizedBox(
                            width: 12,
                            height: 12,
                            child: CircularProgressIndicator(strokeWidth: 2, color: AppTheme.primaryBlue),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

            // Gợi ý tin nhắn nhanh
            Container(
              height: 38,
              margin: const EdgeInsets.only(bottom: 6),
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: _quickPrompts.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (context, index) {
                  return ActionChip(
                    label: Text(
                      _quickPrompts[index],
                      style: const TextStyle(fontSize: 11, color: AppTheme.primaryBlue),
                    ),
                    backgroundColor: AppTheme.softMint,
                    side: BorderSide.none,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                    onPressed: () => _sendMessageToGemini(_quickPrompts[index]),
                  );
                },
              ),
            ),

            // Khung nhập tin nhắn
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: const BoxDecoration(
                color: Colors.white,
                border: Border(top: BorderSide(color: Color(0xFFE2E8F0))),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      decoration: BoxDecoration(
                        color: const Color(0xFFF8FAFC),
                        borderRadius: BorderRadius.circular(24),
                        border: Border.all(color: const Color(0xFFE2E8F0)),
                      ),
                      child: TextField(
                        controller: _textController,
                        decoration: const InputDecoration(
                          hintText: "Chia sẻ cùng MindBot...",
                          hintStyle: TextStyle(fontSize: 13, color: AppTheme.textMuted),
                          border: InputBorder.none,
                        ),
                        onSubmitted: (text) => _sendMessageToGemini(text),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Container(
                    width: 44,
                    height: 44,
                    decoration: const BoxDecoration(
                      color: AppTheme.primaryBlue,
                      shape: BoxShape.circle,
                    ),
                    child: IconButton(
                      icon: const Icon(Icons.send_rounded, color: Colors.white, size: 18),
                      onPressed: () => _sendMessageToGemini(_textController.text),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMessageBubble(ChatMessage message) {
    return Align(
      alignment: message.isUser ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        constraints: BoxConstraints(
          maxWidth: MediaQuery.of(context).size.width * 0.8,
        ),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          color: message.isUser ? AppTheme.primaryBlue : AppTheme.cardBg,
          borderRadius: BorderRadius.only(
            topLeft: const Radius.circular(20),
            topRight: const Radius.circular(20),
            bottomLeft: Radius.circular(message.isUser ? 20 : 4),
            bottomRight: Radius.circular(message.isUser ? 4 : 20),
          ),
          border: message.isUser ? null : Border.all(color: const Color(0xFFE2E8F0)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.03),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Text(
          message.text,
          style: TextStyle(
            fontSize: 13.5,
            height: 1.45,
            color: message.isUser ? Colors.white : AppTheme.textMain,
          ),
        ),
      ),
    );
  }
}
