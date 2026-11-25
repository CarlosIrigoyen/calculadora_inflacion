const fmt = (n) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(n);

export default function ResumenCards({ totalVE, cbaFamiliar, cbtFamiliar }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Adultos Equivalentes
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {totalVE.toFixed(2).replace('.', ',')}
          </div>
        </div>
        <div className="text-xs text-slate-500 mt-3 flex items-center gap-1">
          <i className="fa-solid fa-person-breastfeeding text-sky-500"></i>
          Suma de unidades de consumo
        </div>
      </div>

      <div className="bg-amber-50/80 rounded-2xl p-5 shadow-sm border border-amber-200 flex flex-col justify-between">
        <div>
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center justify-between">
            <span>CBA Familiar</span>
            <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-semibold">
              Indigencia
            </span>
          </div>
          <div className="text-2xl font-extrabold text-amber-900 mt-2">
            {fmt(cbaFamiliar)}
          </div>
        </div>
        <div className="text-xs text-amber-700 mt-3 font-medium">
          Necesidades básicas alimentarias
        </div>
      </div>

      <div className="bg-rose-50/80 rounded-2xl p-5 shadow-sm border border-rose-200 flex flex-col justify-between">
        <div>
          <div className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center justify-between">
            <span>CBT Familiar</span>
            <span className="text-[10px] bg-rose-200 text-rose-900 px-1.5 py-0.5 rounded font-semibold">
              Pobreza
            </span>
          </div>
          <div className="text-2xl font-extrabold text-rose-900 mt-2">
            {fmt(cbtFamiliar)}
          </div>
        </div>
        <div className="text-xs text-rose-700 mt-3 font-medium">
          Alimentos + Servicios Básicos
        </div>
      </div>
    </div>
  );
}
