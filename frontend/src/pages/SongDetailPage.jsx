import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function SongDetailPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [song, setSong] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [keyTranspose, setKeyTranspose] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const fetchSongAndComments = async () => {
      try {
        const songRes = await API.get(`/songs/${id}`);
        setSong(songRes.data.data);

        const commentRes = await API.get(`/comments/song/${id}`);
        setComments(commentRes.data.data || []);
      } catch (err) {
        console.error('Error fetching song detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSongAndComments();
  }, [id]);

  // Handle Auto Scroll
  useEffect(() => {
    let interval;
    if (isScrolling) {
      interval = setInterval(() => {
        window.scrollBy({ top: 1, behavior: 'smooth' });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isScrolling]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await API.post(`/comments/song/${id}`, { content: newComment });
      setComments([res.data.data, ...comments]);
      setNewComment('');
    } catch (err) {
      alert('Failed to post comment. Please log in.');
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-slate-500 font-medium">Loading song sheet...</div>;
  }

  if (!song) {
    return <div className="text-center py-20 text-slate-500 font-medium">Song not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8">
      {/* --- SONG HEADER --- */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">{song.title}</h1>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Artist: <span className="text-slate-800 font-bold">{song.artist || 'Various Artists'}</span> • Genre: {song.genre || 'Acoustic'}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-2xl text-xs font-bold">
            👁️ {song.views || 0} Views
          </div>
        </div>

        {/* --- TOOLBAR: KEY TRANSPOSER & AUTO SCROLL --- */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Transpose Key:</span>
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setKeyTranspose((prev) => prev - 1)}
                className="w-8 h-8 bg-white hover:bg-slate-200 text-slate-800 font-bold rounded-lg shadow-sm text-sm transition"
              >
                -1
              </button>
              <span className="px-3 font-mono text-sm font-bold text-indigo-600">
                {keyTranspose > 0 ? `+${keyTranspose}` : keyTranspose}
              </span>
              <button
                onClick={() => setKeyTranspose((prev) => prev + 1)}
                className="w-8 h-8 bg-white hover:bg-slate-200 text-slate-800 font-bold rounded-lg shadow-sm text-sm transition"
              >
                +1
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsScrolling(!isScrolling)}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 shadow-sm ${
              isScrolling
                ? 'bg-rose-600 hover:bg-rose-500 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {isScrolling ? '⏸ Pause Auto Scroll' : '📜 Start Auto Scroll'}
          </button>
        </div>
      </div>

      {/* --- CHORDS & LYRICS SHEET --- */}
      <div className="bg-slate-950 text-emerald-400 p-8 rounded-3xl font-mono text-sm leading-relaxed whitespace-pre-wrap overflow-x-auto shadow-xl border border-slate-800">
        {song.lyrics || (
          <div className="text-slate-500 italic">No lyrics/chords available for this song sheet.</div>
        )}
      </div>

      {/* --- COMMENTS SECTION --- */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <h2 className="text-xl font-extrabold text-slate-900">💬 Community Comments ({comments.length})</h2>

        {user ? (
          <form onSubmit={handleAddComment} className="flex gap-3">
            <input
              type="text"
              placeholder="Write a comment or chord suggestion..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition"
            >
              Post
            </button>
          </form>
        ) : (
          <p className="text-xs text-slate-400 italic">Please sign in to participate in discussion.</p>
        )}

        <div className="divide-y divide-slate-100">
          {comments.map((comment) => (
            <div key={comment._id} className="py-4 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">{comment.user_id?.username || 'User'}</span>
                <span className="text-slate-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-slate-600">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}