import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const fmt = (n) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(n);

export default function ComparacionChart({ cbaFamiliar, cbtFamiliar }) {
  const data = {
    labels: ['Línea de Indigencia (CBA)', 'Línea de Pobreza (CBT)'],
    datasets: [
      {
        label: 'Canasta Básica Alimentaria (Alimentos)',
        data: [cbaFamiliar, cbaFamiliar],
        backgroundColor: '#f59e0b',
        borderRadius: 8,
      },
      {
        label: 'Bienes y Servicios No Alimentarios',
        data: [0, cbtFamiliar - cbaFamiliar],
        backgroundColor: '#0284c7',
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { font: { family: 'Inter', size: 11 } },
      },
      tooltip: {
        callbacks: {
          label: (context) => context.dataset.label + ': ' + fmt(context.raw),
        },
      },
    },
    scales: {
      x: { stacked: true },
      y: {
        stacked: true,
        ticks: {
          callback: (v) => '$' + (v / 1000).toLocaleString() + 'k',
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
        <i className="fa-solid fa-chart-bar text-sky-600"></i>
        Comparativa Visual de Líneas de Ingreso
      </h3>
      <p className="text-xs text-slate-500 mb-4">
        Proporción de gastos en Alimentos (CBA) vs. Otros Bienes y Servicios (CBT - CBA).
      </p>
      <div className="h-48 relative">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}