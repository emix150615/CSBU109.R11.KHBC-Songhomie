const Song = require('../models/Song');

// @desc    Lấy tất cả bài hát (có phân trang / tìm kiếm)
// @route   GET /api/songs
exports.getAllSongs = async (req, res) => {
  try {
    const { search, genre } = req.query;
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (genre) {
      query.genre = genre;
    }

    const songs = await Song.find(query)
      .populate('user_id', 'username avatar')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: songs.length, data: songs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ', error: error.message });
  }
};

// @desc    Lấy chi tiết một bài hát theo ID
// @route   GET /api/songs/:id
exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).populate('user_id', 'username avatar');

    if (!song) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài hát' });
    }

    // Tăng lượt xem (view count)
    song.views = (song.views || 0) + 1;
    await song.save();

    res.json({ success: true, data: song });
  } catch (error) {
    res.status(500).json({ success: false, message: 'ID bài hát không hợp lệ', error: error.message });
  }
};