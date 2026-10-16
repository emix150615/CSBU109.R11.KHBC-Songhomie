const express = require('express');
const router = express.Router();
const { getAllSongs, getSongById, createSong } = require('../controllers/songController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', getAllSongs);
router.get('/:id', getSongById);
router.post('/', protect, createSong); // Bắt buộc đăng nhập để tạo bài hát

module.exports = router;