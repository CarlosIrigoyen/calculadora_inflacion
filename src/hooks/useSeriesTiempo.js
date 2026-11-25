// src/hooks/useSeriesTiempo.js
import { useState, useEffect } from 'react';

// 👇 Añadimos el proxy delante de la URL original
const BASE_URL = 'https://corsproxy.io/?' + encodeURIComponent('https://apis.datos.gob.ar/series/api/series/');

export function useSeriesTiempo(seriesIds, limit = 2) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      // ... el resto de tu lógica de fetch se mantiene exactamente igual ...
      // El código dentro de fetchAll no necesita cambios.
      // ...
    }

    if (seriesIds && seriesIds.length > 0) {
      fetchAll();
    } else {
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [seriesIds.join(','), limit]);

  return { data, loading, error };
}