const express = require('express');
const router = express.Router();
const { getAllSongs, getSongById } = require('../controllers/songController');

router.get('/', getAllSongs);
router.get('/:id', getSongById);

module.exports = router;