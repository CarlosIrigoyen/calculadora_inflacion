import { useState } from 'react';
import { obtenerAdultoEquivalente } from '../utils/adultoEquivalente';

const CATEGORIAS = [
  'Alimentos', 'Vivienda', 'Transporte', 'Salud',
  'Educación', 'Vestimenta', 'Otros',
];

const fmt = n => new Intl.NumberFormat('es-AR', {
  style: 'currency', currency: 'ARS', minimumFractionDigits: 2,
}).format(n);

const getSituacion = (total, cba, cbt) => {
  if (total === 0) return { label: 'Sin gastos', cls: 'text-slate-500' };
  if (total < cba)  return { label: 'Indigencia', cls: 'text-amber-700' };
  if (total < cbt)  return { label: 'Pobreza',    cls: 'text-rose-700' };
  return { label: 'No pobre', cls: 'text-emerald-700' };
};

function IntegranteCard({ index, persona, cbaInd, cbtInd, gastos, setGastos }) {
  const [categoria, setCategoria] = useState('Alimentos');
  const [monto, setMonto] = useState('');

  const total = gastos.reduce((s, g) => s + g.monto, 0);
  const { label, cls } = getSituacion(total, cbaInd, cbtInd);

  const agregar = () => {
    const num = parseFloat(monto);
    if (!isNaN(num) && num > 0) {
      setGastos([...gastos, { categoria, monto: num }]);
      setMonto('');
    }
  };

  const eliminar = (i) => setGastos(gastos.filter((_, j) => j !== i));

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="font-semibold mb-3">
        Integrante {index + 1} · {persona.sexo === 'M' ? 'Masculino' : 'Femenino'} · {persona.edad} años
      </h3>

      <div className="grid grid-cols-3 gap-2 text-xs mb-3">
        <div className="bg-amber-50 border border-amber-200 p-2 rounded">
          <div className="text-amber-800 font-semibold">CBA</div>
          <div className="text-amber-900 font-bold">{fmt(cbaInd)}</div>
        </div>
        <div className="bg-rose-50 border border-rose-200 p-2 rounded">
          <div className="text-rose-800 font-semibold">CBT</div>
          <div className="text-rose-900 font-bold">{fmt(cbtInd)}</div>
        </div>
        <div className="bg-sky-50 border border-sky-200 p-2 rounded">
          <div className="text-sky-800 font-semibold">Gastos</div>
          <div className="text-sky-900 font-bold">{fmt(total)}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <select
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          className="border rounded p-1 text-sm"
        >
          {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
        </select>
        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={e => setMonto(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && agregar()}
          className="border rounded p-1 w-28 text-sm"
        />
        <button
          onClick={agregar}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm"
        >
          + Agregar
        </button>
      </div>

      {gastos.length > 0 ? (
        <ul className="text-sm divide-y divide-slate-100">
          {gastos.map((g, i) => (
            <li key={i} className="flex justify-between py-1.5">
              <span>{g.categoria}: <span className="font-semibold">{fmt(g.monto)}</span></span>
              <button onClick={() => eliminar(i)} className="text-red-500 text-xs">✕</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-slate-400 italic">Sin gastos cargados aún.</p>
      )}

      <p className={`mt-3 text-sm font-semibold ${cls}`}>
        Situación individual: {label}
      </p>
    </div>
  );
}

export default function GastosPorIntegrante({
  integrantes, gastosPorId, setGastosDeIntegrante, cbaAdulto, ice,
}) {
  const totalGastosFamiliar = Object.values(gastosPorId)
    .flat()
    .reduce((s, g) => s + g.monto, 0);
  const totalVE = integrantes.reduce(
    (s, p) => s + obtenerAdultoEquivalente(p.sexo, p.edad), 0
  );
  const cbaFamiliar = totalVE * cbaAdulto;
  const cbtFamiliar = cbaFamiliar * ice;
  const { label: sitFam, cls: clsFam } = getSituacion(
    totalGastosFamiliar, cbaFamiliar, cbtFamiliar
  );

  return (
    <section className="space-y-4">
      <div className="bg-slate-50 border rounded-lg p-3 text-sm">
        <p className="text-slate-700">
          Cargá los gastos reales de cada integrante. Los valores de CBA y CBT se calculan
          automáticamente según la edad y sexo definidos en la pestaña <strong>Canastas</strong>.
        </p>
      </div>

      <div className="grid gap-4">
        {integrantes.map((p, idx) => {
          const ve = obtenerAdultoEquivalente(p.sexo, p.edad);
          const cbaInd = ve * cbaAdulto;
          const cbtInd = cbaInd * ice;
          return (
            <IntegranteCard
              key={p.id}
              index={idx}
              persona={p}
              cbaInd={cbaInd}
              cbtInd={cbtInd}
              gastos={gastosPorId[p.id] || []}
              setGastos={(nuevos) => setGastosDeIntegrante(p.id, nuevos)}
            />
          );
        })}
      </div>

      <div className="border-2 border-slate-300 rounded-lg p-4 bg-slate-50">
        <h3 className="font-bold mb-2 text-slate-900">Resumen del Hogar</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <div className="text-slate-500 text-xs uppercase">CBA Familiar</div>
            <div className="font-bold text-amber-700">{fmt(cbaFamiliar)}</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs uppercase">CBT Familiar</div>
            <div className="font-bold text-rose-700">{fmt(cbtFamiliar)}</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs uppercase">Gastos Totales</div>
            <div className="font-bold text-sky-700">{fmt(totalGastosFamiliar)}</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs uppercase">Situación</div>
            <div className={`font-bold ${clsFam}`}>{sitFam}</div>
          </div>
        </div>
      </div>
    </section>
  );
}