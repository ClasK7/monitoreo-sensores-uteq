import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <strong>UTEQ Sensor Monitor</strong>
      <div>
        <NavLink to="/sensor/sensor_1205285503">Dashboard</NavLink>
        <NavLink to="/ubicaciones">Ubicaciones</NavLink>
      </div>
    </nav>
  );
}