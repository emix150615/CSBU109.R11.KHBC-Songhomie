export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
            🎵 Songhomie
          </div>
          <p className="text-xs text-slate-500">© 2026 Songhomie AI Platform. CSBU109 Project.</p>
        </div>
        <div className="flex gap-6 text-sm font-medium">
          <a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a>
          <a href="#" className="hover:text-indigo-400 transition">Terms of Service</a>
          <a href="https://github.com/emix150615/CSBU109.R11.KHBC-Songhomie" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition">GitHub Repo</a>
        </div>
      </div>
    </footer>
  );
}