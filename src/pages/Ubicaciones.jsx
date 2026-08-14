import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Solución al problema común de Vite con los íconos de Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Ubicaciones() {
  const [sensores, setSensores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ubicacionesRef = ref(db, "ubicacionesSensores");
    return onValue(ubicacionesRef, (snapshot) => {
      const datos = snapshot.val() ?? {};
      setSensores(Object.entries(datos).map(([id, sensor]) => ({ id, ...sensor })));
    });
  }, []);

  // Coordenadas centrales promedio del Campus La María
  const centerPosition = [-1.0845, -79.5015];

  return (
    <main className="container">
      <header className="page-header">
        <div>
          <p className="eyebrow">Red de sensores</p>
          <h1>Mapa de Ubicaciones</h1>
          <p>Haga clic en un marcador del mapa para consultar su Dashboard en tiempo real.</p>
        </div>
      </header>

      <section 
        style={{ 
          height: "65vh", 
          width: "100%", 
          marginTop: "2rem", 
          borderRadius: "16px", 
          overflow: "hidden", 
          border: "1px solid #dce9e4",
          boxShadow: "0 8px 24px rgb(18 66 53 / 8%)"
        }}
      >
        <MapContainer center={centerPosition} zoom={17} style={{ height: "100%", width: "100%" }}>
          {/* Capa base del mapa de OpenStreetMap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Renderizado dinámico de los marcadores desde Firebase */}
          {sensores.map((sensor) => (
            <Marker
              key={sensor.id}
              position={[sensor.latitud, sensor.longitud]}
              eventHandlers={{
                click: () => {
                  // Redirección dinámica al hacer clic en el pin
                  navigate(`/sensor/${sensor.id}`);
                },
              }}
            >
              <Popup>
                <div style={{ textAlign: "center" }}>
                  <strong>{sensor.nombre}</strong><br />
                  <span style={{ fontSize: "0.85em", color: "#5c706a" }}>{sensor.zona}</span><br />
                  <span style={{ color: "#007b5b", fontWeight: "bold" }}>● {sensor.estado}</span>
                  <p style={{ margin: "5px 0 0 0", fontSize: "0.8em" }}>Clic para abrir Dashboard</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </section>
    </main>
  );
}