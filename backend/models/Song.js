const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Vui lòng nhập tên bài hát'],
    trim: true,
    maxlength: [255, 'Tên bài hát tối đa 255 ký tự']
  },
  artist: {
    type: String,
    trim: true,
    maxlength: [100, 'Tên ca sĩ tối đa 100 ký tự'],
    default: 'Unknown'
  },
  key: {
    type: String,
    default: 'C', // Phục vụ tính năng Transpose (Đổi tông nhạc)
    trim: true
  },
  genre: {
    type: String,
    default: 'Pop',
    trim: true
  },

  // Dành cho bài hát tự soạn thủ công (Lời + Hợp âm)
  lyricsChords: {
    type: String,
    required: false
  },

  // Dành cho bài hát bóc tách từ YouTube hoặc Audio File
  youtubeId: {
    type: String,
    unique: true,
    sparse: true
  },
  audioPath: {
    type: String,
    maxlength: 500,
    sparse: true
  },
  chordsAi: [{
    time: Number,
    chord: String
  }],
  lyricsAi: {
    type: String
  },
  type: {
    type: String,
    enum: ['generated', 'shared'],
    default: 'shared'
  },

  // BỔ SUNG TÍNH NĂNG RANKING & XÃ HỘI
  views: {
    type: Number,
    default: 0 // Phục vụ Ranking Top Hot Views
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Phục vụ Ranking bài hát yêu thích nhất
  }],
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Lưu vào bộ sưu tập cá nhân
  }],

  // BỔ SUNG TÍNH NĂNG CUỘC THI (COMPETITION)
  competition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competition',
    default: null // Liên kết tới cuộc thi nếu bài này dùng nộp thi
  },
  votes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Lượt bình chọn bài dự thi
  }],

  // Thông tin quản lý người đăng
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved' // Cho phép hiển thị ngay để tăng tương tác
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, { timestamps: true });

// INDEXING: Tối ưu tốc độ tìm kiếm bài hát & truy vấn Bảng xếp hạng
songSchema.index({ title: 'text', artist: 'text' });
songSchema.index({ views: -1 });
songSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Song', songSchema);