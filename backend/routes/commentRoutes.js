const express = require('express');
const router = express.Router();
const { getSongComments, createComment } = require('../controllers/commentController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/song/:songId', getSongComments);
router.post('/song/:songId', protect, createComment);

module.exports = router;