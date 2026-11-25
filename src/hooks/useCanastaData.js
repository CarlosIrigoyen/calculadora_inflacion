import { useState, useEffect } from 'react';

const SERIE_CBA = '150.1_CSTA_BARIA_0_D_26';
const CBA_FALLBACK = 239058;

export function useCanastaData() {
  const [cbaAdulto, setCbaAdulto] = useState(CBA_FALLBACK);
  const [fechaDato, setFechaDato] = useState('2026-09-01');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `https://apis.datos.gob.ar/series/api/series/?ids=${SERIE_CBA}&format=json&limit=1&sort=desc`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Error al consultar la API');
        const json = await res.json();
        const ultimo = json.data?.[0];
        if (ultimo && ultimo[1] != null) {
          setCbaAdulto(ultimo[1]);
          setFechaDato(ultimo[0]);
        } else {
          throw new Error('Sin datos en la respuesta');
        }
      } catch (err) {
        console.warn('API INDEC no disponible, usando valor de respaldo:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { cbaAdulto, fechaDato, loading, error };
}