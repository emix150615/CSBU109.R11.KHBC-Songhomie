const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { analyzeYoutube, analyzeAudio } = require('../controllers/aiController');

// API Phân tích hợp âm từ YouTube hoặc Audio File (Yêu cầu xác thực JWT)
router.post('/from-youtube', protect, analyzeYoutube);
router.post('/from-audio', protect, analyzeAudio);

module.exports = router;