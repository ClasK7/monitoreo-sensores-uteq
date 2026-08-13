# Monitoreo de Sensores IoT en Tiempo Real - UTEQ

Este proyecto es una aplicación web telemática desarrollada con **React** y **Firebase Realtime Database (RTDB)**. Su objetivo es visualizar en tiempo real las mediciones ambientales de la red de sensores ubicados en el Campus La María de la Universidad Técnica Estatal de Quevedo (UTEQ).

## Características Principales

*   **Monitoreo en Tiempo Real:** Las tarjetas de telemetría (Temperatura, Humedad, Presión Atmosférica) y el historial de mediciones se actualizan instantáneamente mediante el SDK de Firebase sin necesidad de recargar la página.
*   **Enrutamiento Dinámico:** Implementación de navegación jerárquica utilizando `react-router-dom` para transitar fluidamente entre la vista global de ubicaciones y el Dashboard específico de cada nodo.
*   **Arquitectura Modular:** Uso de Custom Hooks (`useSensorData`) para separar la lógica de conexión y suscripción a la base de datos de los componentes visuales de la interfaz.

## Tecnologías Utilizadas

*   **Frontend:** React 18, Vite
*   **Enrutamiento:** React Router DOM
*   **Base de Datos (BaaS):** Firebase Realtime Database
*   **Estilos:** CSS3 Nativo (Diseño Responsivo)

## 📂 Estructura del Proyecto

La arquitectura del código sigue estrictamente el patrón modular de componentes y vistas:

```text
src/
├── components/
│   ├── Navbar.jsx       # Barra de navegación principal
│   └── SensorCard.jsx   # Tarjeta reutilizable para métricas ambientales
├── hooks/
│   └── useSensorData.js # Custom hook para consultar los tres nodos de RTDB
├── pages/
│   ├── Dashboard.jsx    # Panel dinámico del sensor seleccionado
│   └── Ubicaciones.jsx  # Cuadrícula con todos los sensores de la red
├── services/
│   └── firebase.js      # Configuración e inicialización del SDK
├── App.jsx              # Gestor de rutas de la aplicación
├── main.jsx             # Punto de entrada de React
└── styles.css           # Hoja de estilos de la interfaz