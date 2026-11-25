import { obtenerAdultoEquivalente } from '../utils/adultoEquivalente';

const fmt = (n) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(n);

export default function ResultadosCanasta({
  integrantes, valorAdultoEq, ice, totalVE, cbaFamiliar, cbtFamiliar,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <i className="fa-solid fa-table-list text-sky-600"></i>
          Desglose Individual por Integrante
        </span>
        <span className="text-xs font-normal text-slate-500">
          Metodología INDEC N° 22
        </span>
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-700 text-xs uppercase font-semibold">
            <tr>
              <th className="py-3 px-3 rounded-l-lg">Integrante</th>
              <th className="py-3 px-2 text-center">Sexo</th>
              <th className="py-3 px-2 text-center">Edad</th>
              <th className="py-3 px-2 text-right">V.E.</th>
              <th className="py-3 px-3 text-right">CBA Individual</th>
              <th className="py-3 px-3 text-right rounded-r-lg">CBT Individual</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
            {integrantes.map((p, i) => {
              const ve = obtenerAdultoEquivalente(p.sexo, p.edad);
              const cbaInd = ve * valorAdultoEq;
              const cbtInd = cbaInd * ice;
              return (
                <tr key={p.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                  <td className="py-2.5 px-3">Integrante {i + 1}</td>
                  <td
                    className={`py-2.5 px-2 text-center font-bold ${
                      p.sexo === 'M' ? 'text-sky-600' : 'text-pink-600'
                    }`}
                  >
                    {p.sexo}
                  </td>
                  <td className="py-2.5 px-2 text-center">{p.edad} años</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-slate-900">
                    {ve.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-700">{fmt(cbaInd)}</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">{fmt(cbtInd)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-slate-50 font-bold text-slate-900 border-t-2 border-slate-200">
            <tr>
              <td
                colSpan={3}
                className="py-3 px-3 text-right text-xs uppercase tracking-wider"
              >
                Total Grupo Familiar:
              </td>
              <td className="py-3 px-2 text-right text-sky-700">
                {totalVE.toFixed(2)}
              </td>
              <td className="py-3 px-3 text-right text-amber-700">{fmt(cbaFamiliar)}</td>
              <td className="py-3 px-3 text-right text-rose-700">{fmt(cbtFamiliar)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}