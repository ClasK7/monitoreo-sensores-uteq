import { useEffect, useState } from "react";
import { limitToLast, onValue, orderByChild, query, ref } from "firebase/database";
import { db } from "../services/firebase";

export function useSensorData(sensorId) {
  const [actual, setActual] = useState(null);
  const [historicos, setHistoricos] = useState([]);
  const [ubicacion, setUbicacion] = useState(null);
  const [error, setError] = useState("");
  const [cargados, setCargados] = useState({ actual: false, historicos: false, ubicacion: false });

  useEffect(() => {
    setActual(null); setHistoricos([]); setUbicacion(null); setError("");
    setCargados({ actual: false, historicos: false, ubicacion: false });

    const actualRef = ref(db, `valorActual/${sensorId}`);
    const ubicacionRef = ref(db, `ubicacionesSensores/${sensorId}`);
    const historicosQuery = query(ref(db, `valoresHistoricos/${sensorId}`), orderByChild("timestamp"), limitToLast(20));

    const cancelarActual = onValue(actualRef, (snapshot) => {
        setActual(snapshot.exists() ? snapshot.val() : null);
        setCargados((estado) => ({ ...estado, actual: true }));
      }, (firebaseError) => {
        setError(firebaseError.message);
        setCargados((estado) => ({ ...estado, actual: true }));
      });

    const cancelarHistoricos = onValue(historicosQuery, (snapshot) => {
        const datos = snapshot.val() ?? {};
        const lista = Object.entries(datos).map(([id, valor]) => ({ id, ...valor })).sort((a, b) => b.timestamp - a.timestamp);
        setHistoricos(lista);
        setCargados((estado) => ({ ...estado, historicos: true }));
      }, (firebaseError) => {
        setError(firebaseError.message);
        setCargados((estado) => ({ ...estado, historicos: true }));
      });

    const cancelarUbicacion = onValue(ubicacionRef, (snapshot) => {
        setUbicacion(snapshot.exists() ? snapshot.val() : null);
        setCargados((estado) => ({ ...estado, ubicacion: true }));
      }, (firebaseError) => {
        setError(firebaseError.message);
        setCargados((estado) => ({ ...estado, ubicacion: true }));
      });

    return () => { cancelarActual(); cancelarHistoricos(); cancelarUbicacion(); };
  }, [sensorId]);

  const cargando = !cargados.actual || !cargados.historicos || !cargados.ubicacion;
  return { actual, historicos, ubicacion, cargando, error };
}