export default function Anexo() {
  return (
    <div className="mt-10 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
        <i className="fa-solid fa-book-open text-sky-600"></i>
        Anexo: Tabla Oficial de Unidades de Adulto Equivalente (INDEC N° 22)
      </h3>
      <p className="text-xs text-slate-600 mb-4">
        Un <strong>Adulto Equivalente (1,00)</strong> equivale al requerimiento calórico de
        un varón de 30 a 49 años (2.750 kcal/día). Las demás edades y sexos se ponderan en
        función de sus requerimientos metabólicos relativos:
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <div className="font-bold text-slate-700">Menores de 1 año</div>
          <div className="text-slate-500 mt-1">Ambos: 0,35</div>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <div className="font-bold text-slate-700">1 a 9 años</div>
          <div className="text-slate-500 mt-1">1a: 0.37 | 5a: 0.60</div>
          <div className="text-slate-500">9a: 0.69</div>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <div className="font-bold text-slate-700">10 a 17 años</div>
          <div className="text-slate-500 mt-1">Varones: 0,79 a 1,04</div>
          <div className="text-slate-500">Mujeres: 0,70 a 0,77</div>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <div className="font-bold text-slate-700">18 a 29 años</div>
          <div className="text-slate-500 mt-1">Varones: 1,02</div>
          <div className="text-slate-500">Mujeres: 0,76</div>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <div className="font-bold text-slate-700">30 a 50 años</div>
          <div className="text-slate-500 mt-1">Varones: 1,00 / 0,86</div>
          <div className="text-slate-500">Mujeres: 0,77 / 0,76</div>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <div className="font-bold text-slate-700">Más de 60 años</div>
          <div className="text-slate-500 mt-1">Varones: 0,74</div>
          <div className="text-slate-500">Mujeres: 0,67 / 0,63</div>
        </div>
      </div>
    </div>
  );
}
