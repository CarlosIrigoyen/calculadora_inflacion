import { useState, useEffect } from 'react';
import { useCanastaData } from './hooks/useCanastaData';
import { obtenerAdultoEquivalente } from './utils/adultoEquivalente';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import Banner from './components/Banner';
import ParametrosEconomicos from './components/ParametrosEconomicos';
import GrupoFamiliar from './components/GrupoFamiliar';
import ResumenCards from './components/ResumenCards';
import ResultadosCanasta from './components/ResultadosCanasta';
import ComparacionChart from './components/ComparacionChart';
import Anexo from './components/Anexo';
import Footer from './components/Footer';
import CalculadoraGastos from './components/CalculadoraGastos';

const INTEGRANTES_EJEMPLO = () => [
  { id: crypto.randomUUID(), sexo: 'M', edad: 80 },
  { id: crypto.randomUUID(), sexo: 'F', edad: 45 },
  { id: crypto.randomUUID(), sexo: 'M', edad: 25 },
  { id: crypto.randomUUID(), sexo: 'F', edad: 10 },
  { id: crypto.randomUUID(), sexo: 'F', edad: 2 },
];

export default function App() {
  const { cbaAdulto, fechaDato } = useCanastaData();
  const [activeTab, setActiveTab] = useState('canastas');
  const [ice, setIce] = useState(2.21);
  const [valorAdultoEq, setValorAdultoEq] = useState(239058);
  const [apiSyncDone, setApiSyncDone] = useState(false);

  // Sincronizar con la API la primera vez que llega el dato
  useEffect(() => {
    if (!apiSyncDone && cbaAdulto) {
      setValorAdultoEq(cbaAdulto);
      setApiSyncDone(true);
    }
  }, [cbaAdulto, apiSyncDone]);

  const [integrantes, setIntegrantes] = useState(INTEGRANTES_EJEMPLO);

  // Estado compartido de gastos: { [integranteId]: { [categoriaId]: monto } }
  // Se mantiene en App para que persista al cambiar de pestaña.
  const [gastos, setGastos] = useState({});

  const totalVE = integrantes.reduce(
    (s, p) => s + obtenerAdultoEquivalente(p.sexo, p.edad),
    0
  );
  const cbaFamiliar = totalVE * valorAdultoEq;
  const cbtFamiliar = cbaFamiliar * ice;

  const cargarEjemplo = () => {
    setIntegrantes(INTEGRANTES_EJEMPLO());
    setValorAdultoEq(239058);
    setIce(2.21);
    setGastos({});
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col">
      <Header inflacionMensual={3.7} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'canastas' && (
          <>
            <Banner onCargarEjemplo={cargarEjemplo} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-6">
                <ParametrosEconomicos
                  ice={ice}
                  setIce={setIce}
                  valorAdultoEq={valorAdultoEq}
                  setValorAdultoEq={setValorAdultoEq}
                  fechaDato={fechaDato}
                />
                <GrupoFamiliar
                  integrantes={integrantes}
                  setIntegrantes={setIntegrantes}
                />
              </div>

              <div className="lg:col-span-7 space-y-6">
                <ResumenCards
                  totalVE={totalVE}
                  cbaFamiliar={cbaFamiliar}
                  cbtFamiliar={cbtFamiliar}
                />
                <ResultadosCanasta
                  integrantes={integrantes}
                  valorAdultoEq={valorAdultoEq}
                  ice={ice}
                  totalVE={totalVE}
                  cbaFamiliar={cbaFamiliar}
                  cbtFamiliar={cbtFamiliar}
                />
                <ComparacionChart
                  cbaFamiliar={cbaFamiliar}
                  cbtFamiliar={cbtFamiliar}
                />
              </div>
            </div>

            <Anexo />
          </>
        )}

        {activeTab === 'gastos' && (
          <CalculadoraGastos
            integrantes={integrantes}
            gastos={gastos}
            setGastos={setGastos}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}