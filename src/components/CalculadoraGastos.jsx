import { useState, useMemo, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { obtenerAdultoEquivalente } from '../utils/adultoEquivalente';

ChartJS.register(ArcElement, Tooltip, Legend);

const fmt = (n) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

const pct = (n) => n.toFixed(2).replace('.', ',') + '%';

// 13 categorías del IPC según PDF (DIPEC - Octubre 2026)
const CATEGORIAS_GASTO = [
  { id: 'alimentos',    nombre: 'Alimentos y bebidas no alcohólicas',                     variacion: 2.22, color: '#0ea5e9', icon: 'fa-utensils' },
  { id: 'bebidas',      nombre: 'Bebidas alcohólicas, tabaco y otros',                    variacion: 0.60, color: '#a855f7', icon: 'fa-wine-glass' },
  { id: 'vestimenta',   nombre: 'Prendas de vestir y calzado',                            variacion: 0.60, color: '#ec4899', icon: 'fa-shirt' },
  { id: 'vivienda',     nombre: 'Vivienda, agua, electricidad, gas y otros combustibles', variacion: 1.14, color: '#f59e0b', icon: 'fa-house' },
  { id: 'equipamiento', nombre: 'Equipamiento y mantenimiento del hogar',                variacion: 1.63, color: '#10b981', icon: 'fa-couch' },
  { id: 'salud',        nombre: 'Salud',                                                   variacion: 2.29, color: '#ef4444', icon: 'fa-heart-pulse' },
  { id: 'transporte',   nombre: 'Transporte',                                              variacion: 1.11, color: '#3b82f6', icon: 'fa-bus' },
  { id: 'comunicacion', nombre: 'Comunicación',                                            variacion: 2.81, color: '#06b6d4', icon: 'fa-phone' },
  { id: 'recreacion',   nombre: 'Recreación y cultura',                                    variacion: 1.02, color: '#84cc16', icon: 'fa-gamepad' },
  { id: 'educacion',    nombre: 'Educación',                                               variacion: 2.36, color: '#a78bfa', icon: 'fa-graduation-cap' },
  { id: 'restaurantes', nombre: 'Restaurantes y hoteles',                                  variacion: 2.32, color: '#f97316', icon: 'fa-utensils' },
  { id: 'seguros',      nombre: 'Seguros y servicios financieros',                         variacion: 2.96, color: '#64748b', icon: 'fa-shield-halved' },
  { id: 'varios',       nombre: 'Bienes y servicios varios',                               variacion: 2.33, color: '#78716c', icon: 'fa-box' },
];

// Datos del ejemplo del PDF (familia de San Salvador de Jujuy)
const GASTOS_EJEMPLO = {
  alimentos: 500000, bebidas: 50000, vestimenta: 75000, vivienda: 1000000,
  equipamiento: 25000, salud: 100000, transporte: 75000, comunicacion: 100000,
  recreacion: 25000, educacion: 10000, restaurantes: 50000, seguros: 40000,
  varios: 50000,
};

/* ─────────────────────────── Tarjeta por integrante ─────────────────────────── */
function IntegranteGastosCard({ persona, index, gastos, onChange, abierto, onToggle }) {
  const total = Object.values(gastos).reduce((s, v) => s + (parseFloat(v) || 0), 0);
  const ve = obtenerAdultoEquivalente(persona.sexo, persona.edad);
  const inflacion =
    total > 0
      ? CATEGORIAS_GASTO.reduce((sum, cat) => {
          const g = parseFloat(gastos[cat.id]) || 0;
          return sum + cat.variacion * (g / total);
        }, 0)
      : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-3.5 hover:bg-slate-50 transition-colors text-left"
      >
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
            persona.sexo === 'M' ? 'bg-sky-100 text-sky-700' : 'bg-pink-100 text-pink-700'
          }`}
        >
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-slate-900 truncate">
            Integrante {index + 1} · {persona.sexo === 'M' ? 'Masculino' : 'Femenino'} · {persona.edad} años
          </div>
          <div className="text-[11px] text-slate-500">
            VE: {ve.toFixed(2).replace('.', ',')} · Gasto: {fmt(total)}
          </div>
        </div>
        <div className="text-right pr-1">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Inflación</div>
          <div className={`text-sm font-bold ${total > 0 ? 'text-sky-600' : 'text-slate-300'}`}>
            {total > 0 ? pct(inflacion) : '—'}
          </div>
        </div>
        <i
          className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${
            abierto ? 'rotate-180' : ''
          }`}
        ></i>
      </button>

      {abierto && (
        <div className="px-3.5 pb-3.5 border-t border-slate-100">
          <div className="space-y-1 pt-2">
            {CATEGORIAS_GASTO.map((cat) => (
              <div key={cat.id} className="flex items-center gap-2 py-1">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                >
                  <i className={`fa-solid ${cat.icon} text-[10px]`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-700 truncate">{cat.nombre}</div>
                  <div className="text-[10px] text-emerald-600 font-medium">+{pct(cat.variacion)}</div>
                </div>
                <div className="relative w-32 flex-shrink-0">
                  <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-slate-400 text-xs">$</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={gastos[cat.id] || ''}
                    onChange={(e) => onChange(cat.id, e.target.value)}
                    className="w-full pl-5 pr-2 py-1 border border-slate-300 rounded text-xs text-right font-semibold focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── Componente principal ─────────────────────────── */
export default function CalculadoraGastos({ integrantes = [], gastos, setGastos }) {
  const [abierto, setAbierto] = useState(null);

  // Limpieza: cuando cambian los integrantes (add/remove), ajustar el mapa de gastos
  useEffect(() => {
    setGastos((prev) => {
      const next = {};
      integrantes.forEach((p) => {
        next[p.id] = prev[p.id] || {};
      });
      return next;
    });
  }, [integrantes, setGastos]);

  const setGasto = (intId, catId, valor) => {
    setGastos((prev) => ({
      ...prev,
      [intId]: { ...(prev[intId] || {}), [catId]: valor },
    }));
  };

  // Totales agregados por categoría (sumando todos los integrantes)
  const totalesPorCategoria = useMemo(() => {
    const totales = {};
    CATEGORIAS_GASTO.forEach((c) => (totales[c.id] = 0));
    Object.values(gastos).forEach((gInt) => {
      Object.entries(gInt).forEach(([catId, val]) => {
        if (catId in totales) totales[catId] += parseFloat(val) || 0;
      });
    });
    return totales;
  }, [gastos]);

  const totalGasto = Object.values(totalesPorCategoria).reduce((s, v) => s + v, 0);

  const inflacionFamiliar = useMemo(() => {
    if (totalGasto === 0) return 0;
    return CATEGORIAS_GASTO.reduce(
      (sum, cat) =>
        sum + cat.variacion * ((totalesPorCategoria[cat.id] || 0) / totalGasto),
      0
    );
  }, [totalesPorCategoria, totalGasto]);

  const variacionNominal = (inflacionFamiliar / 100) * totalGasto;

  // Cálculo individual por integrante
  const porIntegrante = integrantes.map((p) => {
    const gInt = gastos[p.id] || {};
    const total = Object.values(gInt).reduce((s, v) => s + (parseFloat(v) || 0), 0);
    const inflacion =
      total > 0
        ? CATEGORIAS_GASTO.reduce((sum, cat) => {
            const g = parseFloat(gInt[cat.id]) || 0;
            return sum + cat.variacion * (g / total);
          }, 0)
        : 0;
    return {
      persona: p,
      total,
      inflacion,
      ve: obtenerAdultoEquivalente(p.sexo, p.edad),
    };
  });

  const cargarEjemplo = () => {
    if (integrantes.length === 0) return;
    const totalVE = integrantes.reduce(
      (s, p) => s + obtenerAdultoEquivalente(p.sexo, p.edad),
      0
    );
    if (totalVE === 0) return;

    // Distribuye cada categoría del ejemplo proporcionalmente al VE de cada integrante
    const nuevo = {};
    integrantes.forEach((p) => {
      const factor = obtenerAdultoEquivalente(p.sexo, p.edad) / totalVE;
      nuevo[p.id] = {};
      CATEGORIAS_GASTO.forEach((cat) => {
        const valor = Math.round(GASTOS_EJEMPLO[cat.id] * factor);
        if (valor > 0) nuevo[p.id][cat.id] = valor;
      });
    });
    setGastos(nuevo);
    setAbierto(integrantes[0].id);
  };

  const limpiar = () => {
    const nuevo = {};
    integrantes.forEach((p) => {
      nuevo[p.id] = {};
    });
    setGastos(nuevo);
    setAbierto(null);
  };

  const catsConGasto = CATEGORIAS_GASTO.filter(
    (c) => (totalesPorCategoria[c.id] || 0) > 0
  );

  const datosGrafico = {
    labels: catsConGasto.map((c) => c.nombre),
    datasets: [
      {
        data: catsConGasto.map((c) => totalesPorCategoria[c.id]),
        backgroundColor: catsConGasto.map((c) => c.color),
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const opcionesGrafico = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
            const p = total > 0 ? ((ctx.raw / total) * 100).toFixed(1) : 0;
            return `${ctx.label}: ${fmt(ctx.raw)} (${p}%)`;
          },
        },
      },
    },
  };

  // Guardia: sin integrantes no se puede calcular
  if (integrantes.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center">
        <i className="fa-solid fa-users-slash text-4xl text-slate-300 mb-3"></i>
        <p className="text-slate-600 text-sm">
          Primero definí los integrantes del grupo familiar en la pestaña{' '}
          <strong>Canastas</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Banner informativo con integrantes */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <i className="fa-solid fa-receipt text-sky-600"></i>
            Calculadora de Inflación por Gasto
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Grupo familiar actual:{' '}
            <strong>
              {integrantes.length} integrante{integrantes.length > 1 ? 's' : ''}
            </strong>{' '}
            (definidos en la pestaña <em>Canastas</em>). Ingresá los gastos de cada uno por
            categoría para estimar la inflación personal del hogar.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          <button
            onClick={cargarEjemplo}
            title="Distribuye el ejemplo del PDF proporcionalmente al VE de cada integrante"
            className="w-full sm:w-auto bg-sky-50 hover:bg-sky-100 text-sky-700 font-medium text-sm px-4 py-2.5 rounded-xl border border-sky-200 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <i className="fa-solid fa-wand-magic-sparkles text-sky-600"></i>
            Cargar Ejemplo (por VE)
          </button>
          <button
            onClick={limpiar}
            className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-sm px-4 py-2.5 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <i className="fa-solid fa-eraser text-slate-500"></i>
            Limpiar datos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda: integrantes (acordeón) */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <i className="fa-solid fa-users text-sky-600"></i>
            Gastos por integrante
          </h3>
          {integrantes.map((p, idx) => (
            <IntegranteGastosCard
              key={p.id}
              persona={p}
              index={idx}
              gastos={gastos[p.id] || {}}
              onChange={(catId, valor) => setGasto(p.id, catId, valor)}
              abierto={abierto === p.id}
              onToggle={() => setAbierto(abierto === p.id ? null : p.id)}
            />
          ))}
        </div>

        {/* Columna derecha: resumen + gráfico */}
        <div className="space-y-6">
          {/* Card inflación familiar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <i className="fa-solid fa-chart-line text-sky-600"></i>
                Inflación personal
              </h3>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                Octubre 2026
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Calculada comparando Septiembre 2026 con Octubre 2026, según el IPC de la
              DIPEC.
            </p>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-sky-600">
                {inflacionFamiliar.toFixed(1).replace('.', ',')}
                <span className="text-2xl ml-1">%</span>
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Sobre un gasto total de {fmt(totalGasto)}
              </div>
              {totalGasto > 0 && (
                <div className="text-xs text-slate-600 mt-1">
                  Variación nominal:{' '}
                  <strong className="text-slate-800">{fmt(variacionNominal)}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Gráfico distribución */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <i className="fa-solid fa-chart-pie text-sky-600"></i>
              Distribución del gasto
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {catsConGasto.length === 0
                ? 'Todavía no ingresaste gastos.'
                : 'Cómo se reparte el gasto familiar entre las categorías.'}
            </p>
            {catsConGasto.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-slate-200">
                <i className="fa-solid fa-chart-pie text-6xl"></i>
              </div>
            ) : (
              <div className="h-48 relative">
                <Doughnut data={datosGrafico} options={opcionesGrafico} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabla de inflación por integrante */}
      {totalGasto > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-users-viewfinder text-sky-600"></i>
            Inflación por integrante
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-700 text-xs uppercase font-semibold">
                <tr>
                  <th className="py-2 px-3 text-left rounded-l-lg">Integrante</th>
                  <th className="py-2 px-3 text-center">VE</th>
                  <th className="py-2 px-3 text-right">Gasto</th>
                  <th className="py-2 px-3 text-right">% del gasto familiar</th>
                  <th className="py-2 px-3 text-right rounded-r-lg">Inflación personal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {porIntegrante.map((it, i) => (
                  <tr key={it.persona.id}>
                    <td className="py-2 px-3 text-slate-700">
                      Integrante {i + 1} · {it.persona.sexo === 'M' ? 'M' : 'F'} · {it.persona.edad} años
                    </td>
                    <td className="py-2 px-3 text-center text-slate-600">
                      {it.ve.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="py-2 px-3 text-right text-slate-700">{fmt(it.total)}</td>
                    <td className="py-2 px-3 text-right text-slate-600">
                      {totalGasto > 0 ? ((it.total / totalGasto) * 100).toFixed(1) : 0}%
                    </td>
                    <td
                      className={`py-2 px-3 text-right font-semibold ${
                        it.total > 0 ? 'text-sky-700' : 'text-slate-400'
                      }`}
                    >
                      {it.total > 0 ? pct(it.inflacion) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 font-bold border-t-2 border-slate-200">
                <tr>
                  <td colSpan={2} className="py-3 px-3 text-right text-xs uppercase">
                    Total familia
                  </td>
                  <td className="py-3 px-3 text-right">{fmt(totalGasto)}</td>
                  <td className="py-3 px-3 text-right">100%</td>
                  <td className="py-3 px-3 text-right text-sky-700">
                    {pct(inflacionFamiliar)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Tabla por categoría (agregada) */}
      {totalGasto > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-table text-sky-600"></i>
            Detalle por categoría (consolidado familiar)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-700 text-xs uppercase font-semibold">
                <tr>
                  <th className="py-2 px-3 text-left rounded-l-lg">Categoría</th>
                  <th className="py-2 px-3 text-right">Var%</th>
                  <th className="py-2 px-3 text-right">Gasto</th>
                  <th className="py-2 px-3 text-right">G%</th>
                  <th className="py-2 px-3 text-right rounded-r-lg">%VarG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {catsConGasto.map((cat) => {
                  const g = totalesPorCategoria[cat.id] || 0;
                  const gPct = (g / totalGasto) * 100;
                  const varG = cat.variacion * (g / totalGasto);
                  return (
                    <tr key={cat.id}>
                      <td className="py-2 px-3 text-slate-700">{cat.nombre}</td>
                      <td className="py-2 px-3 text-right text-slate-600">{pct(cat.variacion)}</td>
                      <td className="py-2 px-3 text-right text-slate-700">{fmt(g)}</td>
                      <td className="py-2 px-3 text-right text-slate-600">{gPct.toFixed(2)}%</td>
                      <td className="py-2 px-3 text-right font-semibold text-sky-700">
                        {varG.toFixed(2)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-50 font-bold border-t-2 border-slate-200">
                <tr>
                  <td colSpan={2} className="py-3 px-3 text-right text-xs uppercase">Total</td>
                  <td className="py-3 px-3 text-right">{fmt(totalGasto)}</td>
                  <td className="py-3 px-3 text-right">100%</td>
                  <td className="py-3 px-3 text-right text-sky-700">
                    {inflacionFamiliar.toFixed(2)}%
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 italic">
            Fuente: DIPEC-Jujuy · IPC Octubre 2026 · La inflación familiar pondera la
            variación de cada categoría por su proporción en el gasto total del hogar.
          </p>
        </div>
      )}
    </div>
  );
}