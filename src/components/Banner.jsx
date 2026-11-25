export default function Banner({ onCargarEjemplo }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Estimación de Canasta Básica Alimentaria (CBA) y Total (CBT)
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Calcule los requerimientos calóricos del hogar mediante la escala de{' '}
          <strong>Adultos Equivalentes</strong> para determinar las líneas de indigencia y
          pobreza según composición familiar.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 w-full lg:w-auto">
        <button
          onClick={onCargarEjemplo}
          className="w-full sm:w-auto bg-sky-50 hover:bg-sky-100 text-sky-700 font-medium text-sm px-4 py-2.5 rounded-xl border border-sky-200 transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <i className="fa-solid fa-wand-magic-sparkles text-sky-600"></i>
          Cargar Ejemplo del Enunciado
        </button>
      </div>
    </div>
  );
}
