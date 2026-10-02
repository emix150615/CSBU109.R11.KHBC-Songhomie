const express = require('express');
const router = express.Router();
const { getTopHotChords, getTopAiSongs, getTopCreators } = require('../controllers/rankingController');

router.get('/top-chords', getTopHotChords);
router.get('/top-ai', getTopAiSongs);
router.get('/top-creators', getTopCreators);

module.exports = router;