import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-lg border-b border-slate-800">
      <Link to="/" className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
        🎵 Songhomie
      </Link>
      <div className="flex gap-6 items-center font-medium text-slate-300">
        <Link to="/" className="hover:text-indigo-400 transition">Home</Link>
        <Link to="/ai-analyzer" className="hover:text-indigo-400 transition">AI Analyzer</Link>
        <Link to="/rankings" className="hover:text-indigo-400 transition">Rankings</Link>
        <Link to="/competitions" className="hover:text-indigo-400 transition">Competitions</Link>
        
        {user ? (
          <div className="flex gap-4 items-center ml-4 pl-4 border-l border-slate-700">
            <span className="text-indigo-300 font-semibold">{user.username}</span>
            <button 
              onClick={logout} 
              className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg text-sm transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link 
            to="/login" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}