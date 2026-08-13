import SensorCard from "../components/SensorCard";
import { useSensorData } from "../hooks/useSensorData";
import { Link, useParams } from "react-router-dom";

const formatearFecha = (timestamp) => {
  if (!timestamp) return "Sin información";
  return new Intl.DateTimeFormat("es-EC", {
    dateStyle: "medium", timeStyle: "medium", timeZone: "America/Guayaquil"
  }).format(new Date(timestamp));
};

export default function Dashboard() {
  const { sensorId } = useParams();
  const { actual, historicos, ubicacion, cargando, error } = useSensorData(sensorId);

  if (cargando) return <main className="container centered"><p>Cargando sensor…</p></main>;
  if (error) return <main className="container"><p className="error">Error: {error}</p></main>;

  if (!actual || !ubicacion) {
    return (
      <main className="container centered">
        <h1>Sensor no encontrado</h1>
        <p>No existen datos para el identificador: {sensorId}</p>
        <Link className="button-link" to="/ubicaciones">Seleccionar otro sensor</Link>
      </main>
    );
  }

  return (
    <main className="container dashboard">
      <header className="page-header dashboard-header">
        <div>
          <p className="eyebrow">Campus La María · UTEQ</p>
          <h1>{ubicacion.nombre}</h1>
          <p>{ubicacion.zona}</p>
        </div>
        <span className="status">● En línea</span>
      </header>

      <section className="cards" aria-label="Valores actuales">
        <SensorCard titulo="Temperatura" valor={actual?.temperatura} unidad="°C" icono="🌡️" />
        <SensorCard titulo="Humedad" valor={actual?.humedad} unidad="%" icono="💧" />
        <SensorCard titulo="Presión atmosférica" valor={actual?.presionAtmosferica} unidad="hPa" icono="🧭" />
      </section>

      <p className="updated">Última actualización: {formatearFecha(actual?.timestamp)}</p>
      <p className="sensor-id">Identificador: {sensorId}</p>

      <section className="table-panel">
        <h2>Historial de mediciones</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr><th>Fecha y hora</th><th>Temperatura</th><th>Humedad</th><th>Presión</th></tr>
            </thead>
            <tbody>
              {historicos.map((registro) => (
                <tr key={registro.id}>
                  <td>{formatearFecha(registro.timestamp)}</td>
                  <td>{registro.temperatura} °C</td>
                  <td>{registro.humedad} %</td>
                  <td>{registro.presionAtmosferica} hPa</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Link className="button-link" to="/ubicaciones">← Ver todos los sensores</Link>
    </main>
  );
}