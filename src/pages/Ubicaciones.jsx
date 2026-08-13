import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { Link } from "react-router-dom";
import { db } from "../services/firebase";

export default function Ubicaciones() {
  const [sensores, setSensores] = useState([]);

  useEffect(() => {
    const ubicacionesRef = ref(db, "ubicacionesSensores");
    return onValue(ubicacionesRef, (snapshot) => {
      const datos = snapshot.val() ?? {};
      setSensores(Object.entries(datos).map(([id, sensor]) => ({ id, ...sensor })));
    });
  }, []);

  return (
    <main className="container">
      <header className="page-header">
        <div>
          <p className="eyebrow">Red de sensores</p>
          <h1>Ubicaciones</h1>
          <p>Seleccione un sensor para consultar su Dashboard en tiempo real.</p>
        </div>
      </header>

      <section className="locations">
        {sensores.map((sensor) => (
          <Link className="location-card" key={sensor.id} to={`/sensor/${sensor.id}`} aria-label={`Abrir Dashboard de ${sensor.nombre}`}>
            <span className="status">● {sensor.estado}</span>
            <h2>{sensor.nombre}</h2>
            <p><strong>Campus:</strong> {sensor.campus}</p>
            <p><strong>Zona:</strong> {sensor.zona}</p>
            <p><strong>Ciudad:</strong> {sensor.ciudad}, {sensor.provincia}</p>
            <p><strong>Coordenadas:</strong> {sensor.latitud}, {sensor.longitud}</p>
            <span className="location-card__action">Ver Dashboard →</span>
          </Link>
        ))}
      </section>
    </main>
  );
}