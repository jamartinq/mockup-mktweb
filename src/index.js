// React
import React from "react";
import ReactDOM from "react-dom";

// Creacion del contexto del aplicacion
import { AppContextProvider } from "./AppContext";

// Estilos generales
import "./styles.css";

// Componente principal
import App from "./App";

// Inicio
ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
