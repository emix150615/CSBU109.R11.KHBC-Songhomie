const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

// @desc Phân tích hợp âm từ YouTube URL qua Python AI Service
// @route POST /api/ai/from-youtube
exports.analyzeYoutube = async (req, res) => {
  try {
    const { videoUrl } = req.body;
    if (!videoUrl) {
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp URL YouTube' });
    }

    const scriptPath = path.join(__dirname, '../scripts/chord_analyzer.py');
    const pythonProcess = spawn('python', [scriptPath, videoUrl], {
      env: { ...process.env, PYTHONIOENCODING: 'utf-8' }
    });

    let dataString = '';
    pythonProcess.stdout.on('data', (data) => {
      dataString += data.toString('utf-8');
    });

    pythonProcess.on('close', () => {
      try {
        const result = JSON.parse(dataString);
        res.json({ success: true, message: 'Phân tích AI từ YouTube hoàn tất', data: result });
      } catch (err) {
        res.status(500).json({ success: false, message: 'Lỗi parse dữ liệu từ Python AI', error: err.message });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ', error: error.message });
  }
};

// @desc Phân tích hợp âm & bóc tách lời từ File Audio Upload
// @route POST /api/ai/from-audio
exports.analyzeAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Vui lòng tải lên 1 file âm thanh (MP3, WAV)' });
    }

    const localFilePath = req.file.path;
    const scriptPath = path.join(__dirname, '../scripts/chord_analyzer.py');

    // 1. Thực thi Python AI Script trên file nhạc vừa upload
    const pythonProcess = spawn('python', [scriptPath, localFilePath], {
      env: { ...process.env, PYTHONIOENCODING: 'utf-8' }
    });

    let dataString = '';
    pythonProcess.stdout.on('data', (data) => {
      dataString += data.toString('utf-8');
    });

    pythonProcess.on('close', async () => {
      try {
        const aiResult = JSON.parse(dataString);

        // 2. Upload file âm thanh lên Cloudinary lưu trữ lâu dài (nếu có cấu hình)
        let cloudinaryUrl = null;
        if (process.env.CLOUDINARY_CLOUD_NAME) {
          const uploadRes = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'video', // Cloudinary dùng loại 'video' cho file audio
            folder: 'songhomie_audios'
          });
          cloudinaryUrl = uploadRes.secure_url;
        }

        // 3. Xóa file tạm trong thư mục backend/temp sau khi xử lý xong
        if (fs.existsSync(localFilePath)) {
          fs.unlinkSync(localFilePath);
        }

        res.json({
          success: true,
          message: 'Bóc tách hợp âm và lời bài hát thành công!',
          audioUrl: cloudinaryUrl,
          aiData: aiResult
        });
      } catch (err) {
        if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
        res.status(500).json({ success: false, message: 'Lỗi xử lý file từ AI', error: err.message });
      }
    });

  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ', error: error.message });
  }
};