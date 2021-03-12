import { useState, useEffect, createContext } from "react";

// Servicio de carga de configuracion
import { getConfig } from "./service/configService";

// -----------------------------------------------

// Estado inicial de sesion
export const initialSessionContext = {
  status: -1,
  username: null,
  profile: null,
  passwordResetNeeded: false,
  passwordResetUrl: null
};

// ------------------------------------------------

// Ojo. El estado inicial del contexto seria asi:
/*
[
    {
        session: initialSessionContext,
        clave: valor cargados de /mktweb/cfg/config.xml
    },
    setAppContext --> Funcion que permite actualizarlo reactivamente
]
*/

// Creamos el contexto global de aplicacion
const Context = createContext();

// Definicion
export const AppContextProvider = ({ children }) => {
  // Preparar los datos de contexto para que reactivo
  const [appContext, setAppContext] = useState();

  // Cargar la configuracion asincronamente
  useEffect(() => getConfig().then((config) => setAppContext(config)), []);

  return (
    <Context.Provider value={{ appContext, setAppContext }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
