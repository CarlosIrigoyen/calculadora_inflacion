export default function Header({ inflacionMensual = 3.7 }) {
  const inflacionFmt = inflacionMensual.toFixed(1).replace('.', ',');
  return (
    <header className="bg-slate-900 text-white shadow-md border-b border-sky-600">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-sky-500 p-2.5 rounded-xl text-white shadow-lg shadow-sky-500/30">
            <i className="fa-solid fa-calculator text-2xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Calculadora de Canastas Familiares
            </h1>
            <p className="text-xs text-slate-400">
              Metodología INDEC N° 22 • Líneas de Indigencia y Pobreza
            </p>
          </div>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-2 flex items-center space-x-3 text-right">
          <div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
              Inflación del Periodo
            </div>
            <div className="text-lg font-bold text-sky-400 flex items-center justify-end">
              <i className="fa-solid fa-arrow-trend-up text-xs mr-1 text-emerald-400"></i>
              <span>{inflacionFmt}%</span>
              <span className="text-xs text-slate-400 ml-1.5 font-normal">
                (Mensual oficial)
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
