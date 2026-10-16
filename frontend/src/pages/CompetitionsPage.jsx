export default function CompetitionsPage() {
  const competitions = [
    {
      id: 1,
      title: 'Acoustic Cover Challenge 2026',
      organizer: 'Songhomie Music Team',
      prize: '5,000,000 VND + Premium Badge',
      deadline: '2026-11-15',
      status: 'Active',
    },
    {
      id: 2,
      title: 'Best AI Chord Correction Contest',
      organizer: 'AI Music Lab',
      prize: '3,000,000 VND',
      deadline: '2026-12-01',
      status: 'Upcoming',
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">🎯 Community Competitions</h1>
      <p className="text-slate-600 mb-8">Participate in guitar cover challenges and win exciting rewards.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {competitions.map((comp) => (
          <div key={comp.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                comp.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {comp.status}
              </span>
              <span className="text-xs text-slate-400">Deadline: {comp.deadline}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">{comp.title}</h2>
            <p className="text-xs text-slate-500 mb-4">Organized by {comp.organizer}</p>
            
            <div className="bg-slate-50 p-3 rounded-xl mb-6 flex justify-between items-center text-sm">
              <span className="text-slate-600 font-medium">Grand Prize:</span>
              <span className="font-bold text-indigo-600">{comp.prize}</span>
            </div>

            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl text-sm transition">
              View Competition Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}