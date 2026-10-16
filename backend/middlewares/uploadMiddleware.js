const multer = require('multer');
const path = require('path');

// Lưu file tạm vào thư mục backend/temp trước khi upload Cloudinary
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../temp'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Kiểm tra định dạng file
const fileFilter = (req, file, cb) => {
  const allowedAudio = ['audio/mpeg', 'audio/wav', 'audio/mp3'];
  const allowedImage = ['image/jpeg', 'image/png', 'image/webp'];

  if (allowedAudio.includes(file.mimetype) || allowedImage.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Định dạng file không hỗ trợ. Chỉ chấp nhận MP3, WAV, JPG, PNG, WEBP.'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // Tối đa 25MB
  fileFilter
});

module.exports = upload;