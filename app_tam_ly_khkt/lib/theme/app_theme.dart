import 'package:flutter/material.dart';
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
}
