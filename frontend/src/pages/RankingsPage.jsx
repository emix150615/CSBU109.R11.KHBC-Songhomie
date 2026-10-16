import { useEffect, useState } from 'react';
import API from '../services/api';

export default function RankingsPage() {
  const [topChords, setTopChords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const res = await API.get('/rankings/top-chords');
        setTopChords(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch rankings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRankings();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">🏆 Leaderboard & Rankings</h1>
      <p className="text-slate-600 mb-8">Discover top trending guitar chords, AI transcriptions, and star contributors.</p>

      {loading ? (
        <div className="text-center py-12 text-slate-500 font-medium">Loading rankings...</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-xl font-bold text-slate-800">🔥 Top Trending Chords</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {topChords.length > 0 ? (
              topChords.map((song, index) => (
                <div key={song._id || index} className="p-5 flex items-center justify-between hover:bg-slate-50 transition">
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-amber-100 text-amber-700' : 
                      index === 1 ? 'bg-slate-200 text-slate-700' : 
                      index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      #{index + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-800">{song.title || 'Untitled Song'}</h3>
                      <p className="text-xs text-slate-500">Artist: {song.artist || 'Various Artists'} • Genre: {song.genre || 'Acoustic'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                      {song.views || 0} Views
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400">No ranking data available yet.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}