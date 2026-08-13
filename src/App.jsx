import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Ubicaciones from "./pages/Ubicaciones";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/sensor/sensor_1205285503" replace />} />
        <Route path="/sensor/:sensorId" element={<Dashboard />} />
        <Route path="/ubicaciones" element={<Ubicaciones />} />
        <Route path="*" element={<Navigate to="/ubicaciones" replace />} />
      </Routes>
    </BrowserRouter>
  );
}