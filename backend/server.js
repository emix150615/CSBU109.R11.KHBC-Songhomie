require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. KẾT NỐI DATABASE MONGODB ATLAS
connectDB();

// 2. MIDDLEWARES HỆ THỐNG
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cho phép Frontend React truy cập các file âm thanh/ảnh người dùng upload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 3. KHAI BÁO CÁC RESTFUL API ROUTES 
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/songs', require('./routes/songRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/rankings', require('./routes/rankingRoutes'));
app.use('/api/competitions', require('./routes/competitionRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));

// Thêm Route trang chủ
app.get('/', (req, res) => {
  res.send('🚀 SongHomie RESTful API Server đang chạy trên cổng ' + PORT);
});

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '🚀 SongHomie RESTful API Server đang chạy hoàn hảo!',
    timestamp: new Date()
  });
});


// 4. KHỞI ĐỘNG SERVER
app.get('/', (req, res) => {
  res.send('🚀 SongHomie RESTful API Server đang chạy thành công trên port ' + PORT);
});
app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 SongHomie API running on: http://localhost:${PORT}`);
  console.log(`=================================`);
});