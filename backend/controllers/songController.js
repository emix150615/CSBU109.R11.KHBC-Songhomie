const Song = require('../models/Song');

// @desc    Lấy tất cả bài hát
exports.getAllSongs = async (req, res) => {
  try {
    const { search, genre } = req.query;
    let query = {};
    if (search) query.title = { $regex: search, $options: 'i' };
    if (genre) query.genre = genre;

    const songs = await Song.find(query)
      .populate('user_id', 'username avatar')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: songs.length, data: songs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ', error: error.message });
  }
};

// @desc    Lấy chi tiết bài hát theo ID
exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).populate('user_id', 'username avatar');
    if (!song) return res.status(404).json({ success: false, message: 'Không tìm thấy bài hát' });

    song.views = (song.views || 0) + 1;
    await song.save();

    res.json({ success: true, data: song });
  } catch (error) {
    res.status(500).json({ success: false, message: 'ID bài hát không hợp lệ', error: error.message });
  }
};

// @desc    Tạo bài hát mới (Tự viết thủ công hoặc lưu từ AI)
// @route   POST /api/songs
exports.createSong = async (req, res) => {
  try {
    const { title, artist, genre, key, lyrics, isAiGenerated } = req.body;

    if (!title || !lyrics) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập tiêu đề bài hát và lời kèm hợp âm' });
    }

    const song = await Song.create({
      title,
      artist: artist || 'Various Artists',
      genre: genre || 'Acoustic',
      key: key || 'C Major',
      lyrics,
      isAiGenerated: !!isAiGenerated,
      user_id: req.user?._id
    });

    res.status(201).json({ success: true, message: 'Tạo bài hát thành công!', data: song });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ', error: error.message });
  }
};