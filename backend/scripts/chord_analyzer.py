# -*- coding: utf-8 -*-
import sys
import json
import os
import io
import numpy as np

# Đảm bảo đầu ra stdout luôn là UTF-8 để Node.js không bị lỗi mã hóa font tiếng Việt
if hasattr(sys.stdout, 'buffer'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

PITCHES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

def _norm_template(vec):
    v = np.maximum(vec, 0)
    s = np.linalg.norm(v)
    return v / s if s > 1e-9 else v

def get_chord_templates():
    templates = []
    for i in range(12):
        # Major (Hợp âm Trưởng)
        t = np.zeros(12); t[i]=1.0; t[(i+4)%12]=0.85; t[(i+7)%12]=0.85
        templates.append((PITCHES[i], _norm_template(t)))
        # Minor (Hợp âm Thứ)
        t = np.zeros(12); t[i]=1.0; t[(i+3)%12]=0.85; t[(i+7)%12]=0.85
        templates.append((PITCHES[i]+"m", _norm_template(t)))
    return templates

CHORD_TEMPLATES = get_chord_templates()

def _get_faster_whisper_model():
    try:
        from faster_whisper import WhisperModel
        return WhisperModel("base", device="cpu", compute_type="int8")
    except Exception as e:
        sys.stderr.write(f"[DEBUG] Faster-Whisper Load Warning: {e}\n")
        return None

def _match_chord(chroma_vec, templates):
    v = np.maximum(chroma_vec.astype(float), 0)
    nv = np.linalg.norm(v)
    if nv < 1e-9: return None
    v /= nv
    best_name, best_sim = None, -1.0
    for name, t in templates:
        sim = float(np.dot(v, t))
        if sim > best_sim:
            best_sim, best_name = sim, name
    return best_name if best_sim > 0.4 else None

def _transcribe_audio(file_path):
    model = _get_faster_whisper_model()
    if not model: 
        return []
    
    try:
        segments, _ = model.transcribe(
            file_path, 
            language="vi", 
            beam_size=5,
            repetition_penalty=1.2,          # Chống lặp từ
            condition_on_previous_text=False # Chống ảo giác dựa trên câu trước
        )
        return [{"start": round(s.start, 2), "text": s.text.strip()} for s in segments]
    except Exception as e:
        sys.stderr.write(f"[DEBUG] Transcription Error: {e}\n")
        return []

def analyze_audio(file_path):
    try:
        if not os.path.exists(file_path):
            return {"success": False, "error": f"File không tồn tại: {file_path}"}

        # Import librosa an toàn bên trong hàm
        import librosa

        # 1. Load Audio (sr=22050 tối ưu tải CPU)
        y, sr = librosa.load(file_path, sr=22050)
        
        # 2. Tách phần nhạc tính (Harmonic)
        y_harmonic = librosa.effects.harmonic(y, margin=4)
        chroma = librosa.feature.chroma_cqt(y=y_harmonic, sr=sr)
        
        # 3. Theo dõi nhịp (Beat Tracking)
        tempo, beat_frames = librosa.beat.beat_track(y=y_harmonic, sr=sr)
        
        # 4. Trích xuất hợp âm theo nhịp
        chords_output = []
        beat_times = librosa.frames_to_time(beat_frames, sr=sr)
        last_chord = None
        for i in range(len(beat_frames)-1):
            start, end = beat_frames[i], beat_frames[i+1]
            mag = np.mean(chroma[:, start:end], axis=1)
            chord = _match_chord(mag, CHORD_TEMPLATES)
            if chord and chord != last_chord:
                chords_output.append({"time": round(float(beat_times[i]), 2), "chord": chord})
                last_chord = chord

        # 5. Dịch lời bài hát bằng Faster-Whisper
        lyrics_segments = _transcribe_audio(file_path)
        
        # 6. Gộp lời và hợp âm
        full_lyrics_text = ""
        if lyrics_segments:
            for s in lyrics_segments:
                current_chord = "C"
                for c in chords_output:
                    if c["time"] <= s["start"]: current_chord = c["chord"]
                    else: break
                
                time_str = f"[{int(s['start']//60):02d}:{s['start']%60:05.2f}]"
                full_lyrics_text += f"{time_str} ({current_chord}) {s['text']}\n"
        else:
            # Fallback nếu chưa cài whisper: Hiện danh sách hợp âm
            full_lyrics_text = "\n".join([f"[{c['time']}s] ({c['chord']}) [Beat Marker]" for c in chords_output])

        calc_tempo = round(float(tempo), 2) if np.isscalar(tempo) else round(float(tempo[0]), 2)

        return {
            "success": True,
            "lyrics": full_lyrics_text.strip(),
            "chords": chords_output,
            "tempo": calc_tempo
        }

    except ImportError:
        # Cơ chế dự phòng khi máy chưa pip install librosa
        return {
            "success": True,
            "isMock": True,
            "tempo": 120,
            "chords": [{"time": 0.0, "chord": "C"}, {"time": 4.0, "chord": "G"}, {"time": 8.0, "chord": "Am"}, {"time": 12.0, "chord": "F"}],
            "lyrics": "[00:00.00] (C) Nắng vàng góc phố quen\n[00:04.00] (G) Tiếng đàn cất lên êm đềm\n[00:08.00] (Am) Songhomie ghi lại giai điệu\n[00:12.00] (F) Trao nhau từng nốt nhạc yêu thương"
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) > 1:
        input_path = sys.argv[1]
        result = analyze_audio(input_path)
        print(json.dumps(result, ensure_ascii=False))
    else:
        print(json.dumps({"success": False, "error": "Thiếu đường dẫn file âm thanh đầu vào"}))