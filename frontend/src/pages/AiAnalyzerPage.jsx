import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function AiAnalyzerPage() {
  const [activeTab, setActiveTab] = useState('ai'); // 'ai' hoặc 'manual'
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // State chế độ AI
  const [videoUrl, setVideoUrl] = useState('');
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  // State chế độ Tự soạn thủ công
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('Acoustic');
  const [key, setKey] = useState('C Major');
  const [lyrics, setLyrics] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);

  // Xử lý phân tích AI từ YouTube
  const handleAnalyzeYoutube = async (e) => {
    e.preventDefault();
    setAiLoading(true);
    try {
      const res = await API.post('/ai/from-youtube', { videoUrl });
      setAiResult(res.data.data);
    } catch (err) {
      alert('Failed to analyze YouTube link. Make sure Backend server is running.');
    } finally {
      setAiLoading(false);
    }
  };

  // Xử lý lưu bài hát tự soạn
  const handleCreateManualSong = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to save your song sheet!');
      return navigate('/login');
    }
    setSaveLoading(true);
    try {
      const res = await API.post('/songs', {
        title,
        artist,
        genre,
        key,
        lyrics,
        isAiGenerated: false
      });
      alert('Song sheet published successfully!');
      if (res.data.data?._id) {
        navigate(`/songs/${res.data.data._id}`);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to publish song sheet.');
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8">
      {/* --- HEADER --- */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create & Analyze Music Sheet</h1>
        <p className="text-slate-500 text-sm">Choose auto-extraction via AI or compose your own chord sheet manually.</p>
      </div>

      {/* --- MODE SWITCHER TABS --- */}
      <div className="flex bg-slate-200/80 p-1.5 rounded-2xl max-w-md mx-auto shadow-inner text-sm font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('ai')}
          className={`flex-1 py-3 rounded-xl transition flex items-center justify-center gap-2 ${
            activeTab === 'ai'
              ? 'bg-white text-indigo-600 shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🤖 AI Auto Extract</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('manual')}
          className={`flex-1 py-3 rounded-xl transition flex items-center justify-center gap-2 ${
            activeTab === 'manual'
              ? 'bg-white text-indigo-600 shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>✍️ Write Yourself</span>
        </button>
      </div>

      {/* --- TAB 1: AI AUTO EXTRACT --- */}
      {activeTab === 'ai' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Extract Chords from YouTube</h2>
            <p className="text-xs text-slate-400 mt-1">Paste a video link to automatically separate chords and transcribe lyrics.</p>
          </div>

          <form onSubmit={handleAnalyzeYoutube} className="space-y-4">
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              required
            />
            <button
              type="submit"
              disabled={aiLoading}
              className="w-full py-4 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/25 transition disabled:opacity-50 text-sm"
            >
              {aiLoading ? 'AI Model Processing...' : 'Start AI Extraction'}
            </button>
          </form>

          {aiResult && (
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="text-lg font-bold text-slate-800">AI Analysis Result</h3>
              <div className="bg-slate-950 text-emerald-400 p-6 rounded-2xl font-mono text-sm whitespace-pre-wrap">
                {aiResult.lyrics || JSON.stringify(aiResult.chords, null, 2)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- TAB 2: MANUAL EDITOR (TỰ VIẾT) --- */}
      {activeTab === 'manual' && (
        <form onSubmit={handleCreateManualSong} className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Compose New Chord Sheet</h2>
            <p className="text-xs text-slate-400 mt-1">Enter song details and format chords inline using brackets like <code className="text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded font-bold">[C]</code>.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Song Title *</label>
              <input
                type="text"
                placeholder="e.g. Nàng Thơ"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Artist / Singer</label>
              <input
                type="text"
                placeholder="e.g. Hoàng Dũng"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Genre</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm font-medium"
              >
                <option value="Acoustic">Acoustic</option>
                <option value="Pop">Pop</option>
                <option value="Ballad">Ballad</option>
                <option value="Rock">Rock</option>
                <option value="Indie">Indie</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Original Key</label>
              <input
                type="text"
                placeholder="e.g. C Major"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Chords & Lyrics Text Sheet *</label>
            <textarea
              rows="10"
              placeholder="[C] Em hát câu ca [G] mùa hạ&#10;[Am] Nắng vương trên đôi [F] bờ vai..."
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              className="w-full p-4 bg-slate-950 text-emerald-400 font-mono text-sm border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 leading-relaxed"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={saveLoading}
            className="w-full py-4 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/25 transition disabled:opacity-50 text-sm"
          >
            {saveLoading ? 'Publishing Sheet...' : 'Publish Chord Sheet'}
          </button>
        </form>
      )}
    </div>
  );
}