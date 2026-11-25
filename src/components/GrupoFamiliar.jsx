export default function GrupoFamiliar({ integrantes, setIntegrantes }) {
  const actualizar = (id, campo, valor) => {
    setIntegrantes(
      integrantes.map((p) =>
        p.id === id
          ? { ...p, [campo]: campo === 'edad' ? parseInt(valor) || 0 : valor }
          : p
      )
    );
  };

  const agregar = () => {
    if (integrantes.length < 8) {
      setIntegrantes([
        ...integrantes,
        { id: crypto.randomUUID(), sexo: 'M', edad: 30 },
      ]);
    }
  };

  const eliminar = (id) => {
    if (integrantes.length > 1) {
      setIntegrantes(integrantes.filter((p) => p.id !== id));
    }
  };

  const cambiarCantidad = (cant) => {
    const n = parseInt(cant);
    const actuales = [...integrantes];
    if (n > actuales.length) {
      for (let i = actuales.length; i < n; i++) {
        actuales.push({ id: crypto.randomUUID(), sexo: 'M', edad: 30 });
      }
    } else {
      actuales.length = n;
    }
    setIntegrantes(actuales);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <i className="fa-solid fa-users text-sky-600"></i>
          Paso 1: Grupo Familiar
        </h3>
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500">Cantidad:</label>
          <select
            value={integrantes.length}
            onChange={(e) => cambiarCantidad(e.target.value)}
            className="border border-slate-300 rounded-lg px-2.5 py-1 text-sm font-semibold bg-slate-50 focus:ring-2 focus:ring-sky-500"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>
                {n} persona{n > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-xs text-slate-500 mb-4">
        Ingrese el sexo y edad de cada integrante para determinar sus requerimientos
        energéticos:
      </p>

      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
        {integrantes.map((p, i) => (
          <div
            key={p.id}
            className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200"
          >
            <span className="text-xs font-bold text-slate-400 w-5">#{i + 1}</span>
            <div className="flex-1 grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase">
                  Sexo
                </label>
                <select
                  value={p.sexo}
                  onChange={(e) => actualizar(p.id, 'sexo', e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-medium text-slate-700"
                >
                  <option value="M">Masculino (M)</option>
                  <option value="F">Femenino (F)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase">
                  Edad (Años)
                </label>
                <input
                  type="number"
                  min="0"
                  max="110"
                  value={p.edad}
                  onChange={(e) => actualizar(p.id, 'edad', e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-medium text-slate-700"
                />
              </div>
            </div>
            {integrantes.length > 1 && (
              <button
                onClick={() => eliminar(p.id)}
                className="text-slate-400 hover:text-rose-500 p-1.5 transition-colors"
                title="Eliminar"
              >
                <i className="fa-solid fa-trash-can text-sm"></i>
              </button>
            )}
          </div>
        ))}
      </div>

      {integrantes.length < 8 && (
        <button
          onClick={agregar}
          className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-300 transition-colors flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-plus text-xs"></i> AGREGAR INTEGRANTE
        </button>
      )}
    </div>
  );
}