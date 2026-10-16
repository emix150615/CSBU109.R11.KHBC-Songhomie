const Song = require('../models/Song');
const User = require('../models/User');

// @desc    Bảng xếp hạng Hợp âm Hot nhất (Nhiều lượt xem/yêu thích)
// @route   GET /api/rankings/top-chords
exports.getTopHotChords = async (req, res) => {
  try {
    const topSongs = await Song.find()
      .sort({ views: -1, likesCount: -1 })
      .limit(10)
      .populate('user_id', 'username avatar');

    res.json({ success: true, data: topSongs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ', error: error.message });
  }
};

// @desc    Bảng xếp hạng Bài hát bóc tách bởi AI tốt nhất
// @route   GET /api/rankings/top-ai
exports.getTopAiSongs = async (req, res) => {
  try {
    const aiSongs = await Song.find({ isAiGenerated: true })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user_id', 'username avatar');

    res.json({ success: true, data: aiSongs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ', error: error.message });
  }
};

// @desc    Top người đóng góp / Tác giả sôi nổi nhất
// @route   GET /api/rankings/top-creators
exports.getTopCreators = async (req, res) => {
  try {
    const topCreators = await User.find()
      .select('username avatar contributionsCount points')
      .sort({ points: -1 })
      .limit(5);

    res.json({ success: true, data: topCreators });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ', error: error.message });
  }
};