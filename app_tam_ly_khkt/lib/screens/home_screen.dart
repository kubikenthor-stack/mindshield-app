import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import 'emotion_screen.dart';
import 'chat_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Lời chào theo thời gian trong ngày
    final hour = DateTime.now().hour;
    String greeting;
    if (hour < 12) {
      greeting = "Chào buổi sáng an lành 🌿";
    } else if (hour < 18) {
      greeting = "Chào buổi chiều nhẹ nhàng 🍃";
    } else {
      greeting = "Buổi tối an yên bạn nhé 🌙";
    }

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Thanh tiêu đề trên cùng & NÚT BẤM 'HỖ TRỢ KHẨN CẤP' Ở GÓC
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        greeting,
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                              color: AppTheme.textMuted,
                              fontWeight: FontWeight.w500,
                            ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        "MindCare",
                        style: Theme.of(context).textTheme.displayLarge?.copyWith(
                              fontSize: 26,
                              color: AppTheme.primaryBlue,
                              letterSpacing: -0.5,
                            ),
                      ),
                    ],
                  ),

                  // NÚT 'HỖ TRỢ KHẨN CẤP' Ở GÓC MÀN HÌNH CHÍNH
                  InkWell(
                    onTap: () => _showEmergencyDialog(context),
                    borderRadius: BorderRadius.circular(20),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                      decoration: BoxDecoration(
                        color: const Color(0xFFFEF2F2),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: const Color(0xFFFECACA)),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.red.withOpacity(0.06),
                            blurRadius: 6,
                            offset: const Offset(0, 2),
                          ),
                        ],
                      ),
                      child: const Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(Icons.shield_outlined, color: Color(0xFFDC2626), size: 14),
                          SizedBox(width: 4),
                          Text(
                            "Hỗ trợ khẩn cấp",
                            style: TextStyle(
                              color: Color(0xFFB91C1C),
                              fontSize: 11,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 24),

              // Thẻ lời khuyên / động viên mỗi ngày (Daily Encouragement)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [
                      Color(0xFF1E3A8A), // Xanh dương trầm
                      Color(0xFF2563EB), // Xanh thanh bình
                    ],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(24),
                  boxShadow: [
                    BoxShadow(
                      color: AppTheme.primaryBlue.withOpacity(0.18),
                      blurRadius: 20,
                      offset: const Offset(0, 10),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.18),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: const Text(
                            "Thông điệp hôm nay",
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 12,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 14),
                    const Text(
                      '"Bạn không cần phải hoàn hảo để trở nên tuyệt vời. Hãy cho phép bản thân nghỉ ngơi khi thấy mỏi mệt."',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 15,
                        height: 1.5,
                        fontWeight: FontWeight.w400,
                        fontStyle: FontStyle.italic,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          "Học đường An Tâm · KHKT",
                          style: TextStyle(
                            color: Colors.white70,
                            fontSize: 12,
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.all(6),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.2),
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(Icons.favorite_rounded, color: Colors.white, size: 14),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 28),

              // Tiêu đề chức năng chính
              Text(
                "Tính Năng Chăm Sóc Tâm Lý",
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontSize: 17,
                      fontWeight: FontWeight.w600,
                    ),
              ),
              const SizedBox(height: 16),

              // 1. NÚT BẤM VÀO 'NHẬN DIỆN CẢM XÚC'
              _buildFeatureCard(
                context: context,
                title: "Nhận diện cảm xúc",
                subtitle: "Quét khuôn mặt qua camera trước, phân tích mức độ căng thẳng học tập",
                icon: Icons.camera_front_rounded,
                iconBg: AppTheme.softMint,
                iconColor: const Color(0xFF059669),
                badgeText: "AI Scanner",
                badgeColor: AppTheme.softMint,
                badgeTextColor: const Color(0xFF047857),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const EmotionScreen()),
                  );
                },
              ),

              const SizedBox(height: 16),

              // 2. NÚT BẤM VÀO 'TRÒ CHUYỆN CÙNG AI'
              _buildFeatureCard(
                context: context,
                title: "Trò chuyện cùng AI",
                subtitle: "Người bạn lắng nghe tâm tư học đường, giải tỏa áp lực thi cử 24/7",
                icon: Icons.chat_bubble_outline_rounded,
                iconBg: const Color(0xFFE0E7FF),
                iconColor: AppTheme.primaryBlue,
                badgeText: "MindBot 24/7",
                badgeColor: const Color(0xFFE0E7FF),
                badgeTextColor: AppTheme.primaryBlue,
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const ChatScreen()),
                  );
                },
              ),

              const SizedBox(height: 24),

              // Thẻ phụ: Bài tập thở thư giãn 4-7-8
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppTheme.cardBg,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 48,
                      height: 48,
                      decoration: BoxDecoration(
                        color: AppTheme.softMint,
                        borderRadius: BorderRadius.circular(14),
                      ),
                      child: const Icon(
                        Icons.air_rounded,
                        color: Color(0xFF059669),
                        size: 26,
                      ),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            "Bài tập thở điều hòa nhịp tim",
                            style: TextStyle(
                              fontWeight: FontWeight.w600,
                              fontSize: 14,
                              color: AppTheme.textMain,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            "2 phút giúp hạ mức hormone căng thẳng Cortisol",
                            style: TextStyle(
                              fontSize: 12,
                              color: AppTheme.textMuted,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const Icon(
                      Icons.arrow_forward_ios_rounded,
                      size: 14,
                      color: AppTheme.textMuted,
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 16),

              // Banner Hỗ trợ khẩn cấp học đường
              InkWell(
                onTap: () => _showEmergencyDialog(context),
                borderRadius: BorderRadius.circular(20),
                child: Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFEF2F2),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: const Color(0xFFFECACA)),
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: const BoxDecoration(
                          color: Colors.white,
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(Icons.shield_outlined, color: Color(0xFFDC2626), size: 20),
                      ),
                      const SizedBox(width: 12),
                      const Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "Cần trợ giúp tâm lý khẩn cấp?",
                              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF991B1B)),
                            ),
                            Text(
                              "Xem danh sách Hotline & hướng dẫn tìm gặp chuyên viên tư vấn tại trường",
                              style: TextStyle(fontSize: 11, color: Color(0xFFB91C1C)),
                            ),
                          ],
                        ),
                      ),
                      const Icon(Icons.chevron_right_rounded, color: Color(0xFFB91C1C)),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // HỘP THOẠI HIỂN THỊ DANH SÁCH HOTLINE & HƯỚNG DẪN TƯ VẤN HỌC ĐƯỜNG
  void _showEmergencyDialog(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        height: MediaQuery.of(context).size.height * 0.85,
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
        ),
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Thanh gạt modal
            Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.grey[300],
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Tiêu đề
            const Row(
              children: [
                Icon(Icons.shield_rounded, color: Color(0xFFDC2626), size: 24),
                SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Trung Tâm Hỗ Trợ Khẩn Cấp",
                        style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        "Luôn có chuyên gia lắng nghe và bảo vệ bạn",
                        style: TextStyle(fontSize: 12, color: AppTheme.textMuted),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            Expanded(
              child: ListView(
                children: [
                  // PHẦN 1: CÁC SỐ ĐIỆN THOẠI TƯ VẤN UY TÍN
                  const Text(
                    "ĐƯỜNG DÂY NÓNG HỌC ĐƯỜNG (24/7)",
                    style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.textMuted),
                  ),
                  const SizedBox(height: 10),

                  _buildHotlineCard(
                    title: "Hotline Tâm lý Học đường & Khủng hoảng",
                    phone: "1900 599 930",
                    desc: "Ưu tiên hỗ trợ học sinh khi căng thẳng thi cử, lo âu, buồn bã hoặc trầm cảm",
                    isPriority: true,
                  ),
                  _buildHotlineCard(
                    title: "Tổng đài Quốc gia Bảo vệ Trẻ em & Học sinh",
                    phone: "111",
                    desc: "Miễn phí 100% cước gọi. Tư vấn quyền lợi và can thiệp áp lực tâm lý học sinh",
                    isPriority: false,
                  ),
                  _buildHotlineCard(
                    title: "Đường dây nóng Tâm lý Ngày Mai",
                    phone: "096 306 1414",
                    desc: "Tham vấn chuyên sâu từ các chuyên gia tâm lý học đường",
                    isPriority: false,
                  ),

                  const SizedBox(height: 20),

                  // PHẦN 2: HƯỚNG DẪN TÌM GẶP CHUYÊN VIÊN TẠI TRƯỜNG
                  const Text(
                    "HƯỚNG DẪN TÌM GẶP TƯ VẤN VIÊN TẠI TRƯỜNG",
                    style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.textMuted),
                  ),
                  const SizedBox(height: 10),

                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF8FAFC),
                      borderRadius: BorderRadius.circular(18),
                      border: Border.all(color: const Color(0xFFE2E8F0)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _buildSchoolStep(
                          step: "1",
                          title: "Vị trí phòng tư vấn tâm lý",
                          content: "Thường đặt tại khu vực yên tĩnh trong trường (gần thư viện, phòng y tế hoặc khu hiệu bộ).",
                        ),
                        const SizedBox(height: 12),
                        _buildSchoolStep(
                          step: "2",
                          title: "Cách thức liên hệ đặt hẹn",
                          content: "Gặp trực tiếp trong giờ ra chơi/tan học, gửi thư vào 'Hòm thư điều ước' trước cửa phòng, hoặc nhờ GVCN kết nối.",
                        ),
                        const SizedBox(height: 12),
                        _buildSchoolStep(
                          step: "3",
                          title: "Nguyên tắc bảo mật tuyệt đối",
                          content: "Mọi thông tin của bạn được giữ bí mật 100%, không ghi vào học bạ hay tiết lộ cho bạn bè trong lớp.",
                        ),
                        const SizedBox(height: 14),
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: const Color(0xFFECFDF5),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: const Color(0xFFA7F3D0)),
                          ),
                          child: const Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "💡 Gợi ý câu mở lời nếu bạn thấy ngại:",
                                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Color(0xFF065F46)),
                              ),
                              SizedBox(height: 4),
                              Text(
                                '"Thầy/Cô ơi, dạo này em hơi bị quá tải vì bài vở và có một số chuyện muốn nhờ Thầy/Cô lắng nghe và gỡ rối giúp em được không ạ?"',
                                style: TextStyle(fontSize: 12, fontStyle: FontStyle.italic, color: Color(0xFF047857)),
                              ),
                            ],
                          ),
                        ),
                      ],
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

  static Widget _buildHotlineCard({
    required String title,
    required String phone,
    required String desc,
    required bool isPriority,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: isPriority ? const Color(0xFFFEF2F2) : Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: isPriority ? const Color(0xFFFECACA) : const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 13,
                    color: isPriority ? const Color(0xFF991B1B) : AppTheme.textMain,
                  ),
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: isPriority ? Colors.red : AppTheme.primaryBlue,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  phone,
                  style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Text(desc, style: const TextStyle(fontSize: 12, color: AppTheme.textMuted)),
        ],
      ),
    );
  }

  static Widget _buildSchoolStep({
    required String step,
    required String title,
    required String content,
  }) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 22,
          height: 22,
          decoration: const BoxDecoration(
            color: AppTheme.primaryBlue,
            shape: BoxShape.circle,
          ),
          child: Center(
            child: Text(step, style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold)),
          ),
        ),
        const SizedBox(width: 10),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: AppTheme.textMain)),
              const SizedBox(height: 2),
              Text(content, style: const TextStyle(fontSize: 12, color: AppTheme.textMuted, height: 1.35)),
            ],
          ),
        ),
      ],
    );
  }

  static Widget _buildFeatureCard({
    required BuildContext context,
    required String title,
    required String subtitle,
    required IconData icon,
    required Color iconBg,
    required Color iconColor,
    required String badgeText,
    required Color badgeColor,
    required Color badgeTextColor,
    required VoidCallback onTap,
  }) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(22),
        child: Container(
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            color: AppTheme.cardBg,
            borderRadius: BorderRadius.circular(22),
            border: Border.all(color: const Color(0xFFE2E8F0), width: 1),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.03),
                blurRadius: 12,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Row(
            children: [
              Container(
                width: 52,
                height: 52,
                decoration: BoxDecoration(
                  color: iconBg,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Icon(icon, color: iconColor, size: 26),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(
                          title,
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                            color: AppTheme.textMain,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2),
                          decoration: BoxDecoration(
                            color: badgeColor,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            badgeText,
                            style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.w600,
                              color: badgeTextColor,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 5),
                    Text(
                      subtitle,
                      style: const TextStyle(
                        fontSize: 13,
                        color: AppTheme.textMuted,
                        height: 1.35,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              Container(
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  color: const Color(0xFFF1F5F9),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(
                  Icons.arrow_forward_rounded,
                  size: 16,
                  color: AppTheme.primaryBlue,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
