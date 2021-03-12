// React
import { useContext } from "react";

// Routes
import { NavLink } from "react-router-dom";

// Contexto
import AppContext, { initialSessionContext } from "../AppContext";

// Servicios
import * as logonService from "../service/logonService";

// Estilos
// import "./NavBar.css";

// Definicion
const NavBar = () => {
  const { appContext, setAppContext } = useContext(AppContext);

  const handleLogout = () =>
    logonService.logout(appContext).then(
      // Reseteamos el estado de sesion
      () => setAppContext({ ...appContext, session: initialSessionContext })
    );

  return (
    <div className="NavBar row">
      <nav className="NavLinkGroup">
        <NavLink
          to="/config"
          className="NavLink"
          activeClassName="nav-link-active"
        >
          Config
        </NavLink>
        <NavLink
          to="/backendtest"
          className="NavLink"
          activeClassName="nav-link-active"
        >
          Backend Test
        </NavLink>
        <NavLink
          to="/conceptos"
          className="NavLink"
          activeClassName="nav-link-active"
        >
          Conceptos
        </NavLink>
        <NavLink
          to="/items"
          className="NavLink"
          activeClassName="nav-link-active"
        >
          Items
        </NavLink>
        <NavLink
          to="/masteritems"
          className="NavLink"
          activeClassName="nav-link-active"
        >
          Maestros Items
        </NavLink>
      </nav>
      <div>
        <button onClick={handleLogout}>Salir</button>
      </div>
    </div>
  );
};

export default NavBar;
