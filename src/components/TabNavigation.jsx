export default function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'canastas', label: 'Por Grupo Familiar (CBA/CBT)' },
    { id: 'gastos',   label: 'Por Gasto (Inflación Personal)' },
  ];
  return (
    <div className="bg-white rounded-2xl p-1.5 shadow-sm border border-slate-200 mb-6 inline-flex gap-1">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setActiveTab(t.id)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === t.id
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}