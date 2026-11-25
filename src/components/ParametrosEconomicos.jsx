export default function ParametrosEconomicos({
  ice, setIce, valorAdultoEq, setValorAdultoEq, fechaDato,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <i className="fa-solid fa-sliders text-sky-600"></i>
          Parámetros de Referencia
        </h3>
        <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
          {fechaDato}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            CBA Adulto Eq. ($)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm">
              $
            </span>
            <input
              type="number"
              step="0.01"
              value={valorAdultoEq}
              onChange={(e) => setValorAdultoEq(parseFloat(e.target.value) || 0)}
              className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-semibold text-slate-800"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Inversa Coef. Engel (ICE)
          </label>
          <input
            type="number"
            step="0.0001"
            value={ice}
            onChange={(e) => setIce(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-semibold text-slate-800"
          />
        </div>
      </div>
    </div>
  );
}