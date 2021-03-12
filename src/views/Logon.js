// React
import { useContext, useState } from "react";

// Contexto
import AppContext from "../AppContext";

// Servicios
import * as logonService from "../service/logonService";

// Estilos
// import "./Logon.css";

// Definición
const Logon = () => {
  const { appContext, setAppContext } = useContext(AppContext);

  // Estado
  const [loginInput, setLoginInput] = useState({ user: "", password: "" });

  // Manejo de eventos del formulario
  const handleInputChange = (event) =>
    setLoginInput({
      ...loginInput,
      [event.target.name]: event.target.value
    });

  const handleLogon = () =>
    logonService
      .logon(loginInput)
      .then((loginResult) =>
        setAppContext({ ...appContext, session: loginResult })
      );

  // Visualizacion
  const enableSubmit = () => loginInput.user && loginInput.password;

  return (
    // Usuario no logado
    appContext.session?.passwordResetNeeded ? (
      // Usuario no logado, y se necesita cambio de contraseña: TODO Revisar
      <>
        <h1>Reseteo de contraseña requerido</h1>
        {appContext.session?.passwordResetNeeded && (
          <>
            Acceda a <a href={`${appContext.session.passwordResetUrl}`}></a>{" "}
            para realizar el cambio
          </>
        )}
      </>
    ) : (
      // Usuario no logado, pero no se necesita cambio de contraseña
      <div className="Logon">
        <div className="form">
          <label htmlFor="password">Usuario:</label>
          <input type="text" name="user" onChange={handleInputChange} />
          <label htmlFor="password">Clave:</label>
          <input type="password" name="password" onChange={handleInputChange} />
          <button onClick={handleLogon} disabled={!enableSubmit()}>
            OK
          </button>
        </div>
      </div>
    )
  );
};

export default Logon;
