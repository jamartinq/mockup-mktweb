// React
import { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// Contexto
import AppContext from "./AppContext";

// Estilos
// import "./App.css";

// Componentes
import NavBar from "./components/NavBar";
import Routes from "./components/Routes";

// Vistas
import Logon from "./views/Logon";

// Utilidades comunes de la parte grafica:
// Mensajes de error y generales
// Wrappers para iniciar y parar spinners antes y despues de cada llamada

// Definicion
const App = () => {
  const { appContext } = useContext(AppContext);

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Vodafone - Web de Marketing</h1>
          {
            // Barra de navegacion solo si el usuario esta logado
            appContext?.session?.username && <NavBar />
          }
        </header>
        <main>
          {appContext ? (
            // Configuracion cargada
            appContext.session?.username ? (
              // Usuario logado
              <Routes />
            ) : (
              // Usuario no logado
              <Logon />
            )
          ) : (
            // Configuracion no cargada todavia
            <h1>Esperando a que cargue la configuracion...</h1>
          )}
        </main>
      </div>
    </Router>
  );
};

export default App;
