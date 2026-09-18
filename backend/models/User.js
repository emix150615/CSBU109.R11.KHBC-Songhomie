const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Vui lòng nhập tên người dùng'],
    unique: true,
    trim: true,
    maxlength: [50, 'Tên người dùng không vượt quá 50 ký tự']
  },
  email: {
    type: String,
    required: [true, 'Vui lòng nhập email'],
    unique: true,
    trim: true,
    lowercase: true, // Tự động chuyển email về chữ thường
    maxlength: [100, 'Email không vượt quá 100 ký tự'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email không đúng định dạng']
  },
  password: {
    type: String,
    required: [true, 'Vui lòng nhập mật khẩu'],
    select: false // BẢO MẬT: Tự động ẩn password khi res.json() trả về phía client
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  // BỔ SUNG CHO TÍNH NĂNG PROFILE / VINH DANH / RANKING
  points: {
    type: Number,
    default: 0 // Điểm đóng góp cho cộng đồng
  },
  badges: [{
    type: String // Danh hiệu đạt được (Ví dụ: 'Master AI', 'Weekly Winner')
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);