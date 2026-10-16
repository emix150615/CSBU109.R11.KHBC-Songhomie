# 🎵 Songhomie - AI-Powered Chord & Lyrics Platform

> **Đồ án môn học Web 2:** `CSBU109.R11.KHBC-Songhomie`  
> Nền tảng bóc tách hợp âm, dịch lời tự động bằng AI và biên soạn Chord Sheet chuyên nghiệp dành cho Guitarist & Musician.

---

## 🚀 Công nghệ sử dụng (Tech Stack)

- **Backend:** Node.js, Express.js RESTful API, MongoDB Atlas, Mongoose, Cloudinary, Multer.
- **Frontend:** React.js, Vite, Tailwind CSS v4, Axios, Context API, React Router v6.
- **AI Engine:** Python (Librosa CQT Algorithm & Faster-Whisper Speech-to-Text).
- **Architecture:** Monorepo architecture (`backend/` + `frontend/`).

---

## ✨ Tính năng nổi bật

1. **🤖 AI Auto Chord & Lyrics Extraction:** Bóc tách hợp âm chuẩn xác từ file âm thanh hoặc đường dẫn YouTube thông qua thuật toán Librosa CQT & Faster-Whisper.
2. **✍️ Manual Chord Sheet Editor:** Bộ chuyển đổi chế độ linh hoạt cho phép tự biên soạn bài hát, gán hợp âm chuẩn dạng `[C]`, `[Am]` thủ công.
3. **🎸 Smart Key Transposer & Auto Scroll:** Công cụ đổi tông hợp âm tức thì (-1/+1) và tính năng cuộn trang tự động khi biểu diễn.
4. **🏆 Rankings & Music Competitions:** Bảng xếp hạng hợp âm hot nhất tuần và các thử thách cover nhạc cụ dành cho cộng đồng.
5. **🔐 Authentication & Community Discussion:** Hệ thống đăng ký, đăng nhập bảo mật bằng JWT và khu vực bình luận tương tác.

---

## ⚡ Cài đặt & Khởi chạy (Quick Start)

**backend
cd backend
npm install
npm run dev

**frontend
cd frontend
npm install
npm run dev

---

## 📂 Cấu trúc Monorepo Dự án

```text
CSBU109.R11.KHBC-Songhomie/
├── backend/                  # RESTful API Server & AI Service
│   ├── ai_engine/            # Python AI scripts (Librosa & Faster-Whisper)
│   ├── config/               # Cấu hình kết nối MongoDB Atlas
│   ├── controllers/          # Xử lý logic API (Auth, Songs, Rankings, Comments, AI)
│   ├── middlewares/          # Auth JWT & Upload Middleware
│   ├── models/               # Mongoose Schemas (User, Song, Comment, Competition, Playlist)
│   ├── routes/               # Express Routes API Endpoints
│   ├── .env                  # Cấu hình biến môi trường Server
│   └── server.js             # Entry point Express Server
├── frontend/                 # React + Vite Client Application
│   ├── src/
│   │   ├── components/       # UI Components (Navbar, Footer, etc.)
│   │   ├── context/          # AuthContext quản lý trạng thái đăng nhập
│   │   ├── pages/            # Các trang giao diện (Home, AI Analyzer, SongDetail, Login, Register, Rankings, Competitions)
│   │   ├── services/         # Axios API Client configuration
│   │   ├── App.jsx           # Main Router Configuration
│   │   └── main.jsx          # Entry point React Vite
│   └── index.html            # HTML Shell
├── .gitignore                # File cấu hình chặn commit node_modules & .env
└── README.md                 # Tài liệu hướng dẫn dự án