export default function SensorCard({ titulo, valor, unidad, icono }) {
  return (
    <article className="sensor-card">
      <span className="sensor-card__icon" aria-hidden="true">{icono}</span>
      <div>
        <p>{titulo}</p>
        <strong>{valor ?? "--"} {unidad}</strong>
      </div>
    </article>
  );
}