import { Link } from 'react-router-dom';

export default function HomePage() {
  const features = [
    {
      icon: '⚡',
      title: 'AI Chord Extraction',
      desc: 'Powered by Librosa CQT algorithms to detect guitar chords with high precision in real-time.'
    },
    {
      icon: '🎙️',
      title: 'Synced Lyrics & Speech',
      desc: 'Faster-Whisper AI engine transcribes lyrics synced perfectly to beat timestamps.'
    },
    {
      icon: '🎸',
      title: 'Smart Key Transposer',
      desc: 'Instantly transpose chords to match your vocal range or apply Capo settings with 1-click.'
    },
    {
      icon: '🏆',
      title: 'Music Competitions',
      desc: 'Participate in community guitar cover challenges, earn points, and climb the leaderboard.'
    }
  ];

  const sampleTrendingSongs = [
    { id: 1, title: 'Nàng Thơ', artist: 'Hoàng Dũng', key: 'C Major', views: '124.5K', chords: ['C', 'G', 'Am', 'F'], coverColor: 'from-amber-500 to-rose-500' },
    { id: 2, title: 'Bước Qua Mùa Cô Đơn', artist: 'Vũ', key: 'G Major', views: '98.2K', chords: ['G', 'D', 'Em', 'C'], coverColor: 'from-blue-500 to-indigo-600' },
    { id: 3, title: 'Chờ Anh Nhé', artist: 'Lâm Bảo Ngọc', key: 'A Minor', views: '85.1K', chords: ['Am', 'F', 'C', 'G'], coverColor: 'from-emerald-500 to-teal-600' },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-24 pb-32 px-6 text-center border-b border-slate-800/60">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-indigo-600/25 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-75 h-75 bg-purple-600/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase shadow-inner">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Songhomie AI Engine v2.0 Released
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1]">
            Master Any Song With <br />
            <span className="bg-linear-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent drop-shadow-sm">
              AI Guitar Chords
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Extract accurate chords and synced lyrics from YouTube or audio files in seconds. Transpose keys, edit tabs, and join music cover challenges.
          </p>

          {/* --- NỊNH MẮT CTA BUTTONS --- */}
          <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
            <Link
              to="/ai-analyzer"
              className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/30 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/40 flex items-center justify-center gap-2 text-base group"
            >
              <span>✨ Create / Analyze Song</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>

            <Link
              to="/rankings"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 font-bold rounded-2xl backdrop-blur-md transition-all duration-200 transform hover:-translate-y-1 flex items-center justify-center gap-2 text-base"
            >
              <span>🎸 Explore Library</span>
            </Link>
          </div>
        </div>
      </section>

      {/* --- FEATURE GRID --- */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Built For Modern Musicians</h2>
          <p className="text-slate-500 text-sm">Everything you need to transcribe, learn, and perform your favorite songs.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="group bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-200 transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800">{f.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- TRENDING CHORDS PREVIEW --- */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Leaderboard</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">🔥 Trending Chords This Week</h2>
          </div>
          <Link to="/rankings" className="text-indigo-600 hover:text-indigo-700 font-bold text-sm flex items-center gap-1 group">
            <span>View Full Rankings</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sampleTrendingSongs.map((song) => (
            <div key={song.id} className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 group flex flex-col justify-between">
              <div className="p-6 space-y-4">
                {/* Simulated Album Art & Header */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-linear-to-tr ${song.coverColor} flex items-center justify-center text-white font-black shadow-md text-lg shrink-0`}>
                    🎵
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-slate-800 text-base truncate group-hover:text-indigo-600 transition-colors">{song.title}</h3>
                    <p className="text-xs text-slate-400 truncate">{song.artist}</p>
                  </div>
                </div>

                {/* Chords Sequence Badges */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Progression</span>
                  <div className="flex gap-2">
                    {song.chords.map((c, idx) => (
                      <span key={idx} className="bg-indigo-50/80 border border-indigo-100 text-indigo-700 font-mono text-xs px-2.5 py-1 rounded-lg font-bold">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">👁️ {song.views}</span>
                <Link 
                  to="/ai-analyzer" 
                  className="bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white border border-indigo-200 px-3.5 py-1.5 rounded-xl font-bold transition-all shadow-sm"
                >
                  Play Song
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="relative overflow-hidden bg-linear-to-r from-slate-950 via-indigo-950 to-slate-900 rounded-3xl p-10 md:p-14 text-white text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl border border-indigo-500/20">
          <div className="space-y-2 max-w-xl relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight">Ready to transcribe your first song?</h2>
            <p className="text-slate-300 text-sm">Experience zero-delay AI chord detection with automatic synced lyrics transcription.</p>
          </div>
          <Link
            to="/ai-analyzer"
            className="relative z-10 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-indigo-500/25 hover:shadow-2xl transition transform hover:-translate-y-0.5 shrink-0 text-sm"
          >
            Start Analyzing Now
          </Link>
        </div>
      </section>
    </div>
  );
}