# MindCare - Ứng Dụng Tâm Lý Học Đường (Dự án KHKT)

> Đề tài Nghiên cứu Khoa học Kỹ thuật: **"Ứng dụng Trí tuệ Nhân tạo trong nhận diện biểu cảm khuôn mặt và hỗ trợ sức khỏe tinh thần học sinh trung học (MindCare)"**

## 1. Cấu trúc thư mục Flutter (`app_tam_ly_khkt`)

```text
app_tam_ly_khkt/
├── pubspec.yaml                 # Khai báo thư viện (camera, google_fonts, http, spinkit)
├── README.md                    # Tài liệu hướng dẫn & báo cáo đề tài KHKT
└── lib/
    ├── main.dart                # Điểm khởi chạy ứng dụng (main entry point)
    ├── theme/
    │   └── app_theme.dart       # Hệ thống màu sắc: Xanh dương trầm & Xanh lá pastel dịu mát
    ├── models/
    │   └── emotion_model.dart   # Mô hình dữ liệu kết quả nhận diện cảm xúc
    └── screens/
        ├── home_screen.dart     # Màn hình chính: Lời chào động viên, điều hướng nhận diện & chat
        ├── emotion_screen.dart  # Nhận diện cảm xúc: Giả lập camera trước & quét sinh trắc học
        └── chat_screen.dart     # Trò chuyện cùng MindBot AI tham vấn tâm lý học đường
```

## 2. Hướng dẫn chạy ứng dụng

```bash
# 1. Chuyển vào thư mục dự án
cd app_tam_ly_khkt

# 2. Cài đặt các thư viện phụ thuộc
flutter pub get

# 3. Khởi chạy trên thiết bị (Điện thoại hoặc trình giả lập)
flutter run
```

## 3. Đặc điểm nổi bật phục vụ báo cáo KHKT
- **Tone màu tâm lý học**: Sử dụng tông xanh dương trầm (#1E3A8A) mang lại sự bình tĩnh và xanh lá pastel (#A7F3D0 / #D1FAE5) xoa dịu thần kinh thị giác.
- **Quy trình nhận diện**: Mô phỏng quá trình định vị điểm mốc khuôn mặt (Facial Landmarks) và phân tích các chỉ số stress học đường (nhẹ, mệt mỏi, thư thái, căng thẳng).
- **Hỗ trợ tâm lý thời gian thực**: Cung cấp giải pháp can thiệp ngay lập tức (Bài tập thở 4-7-8, nghỉ ngơi khoa học, tâm sự giải tỏa lo âu).
