// React
import { Route, Switch } from "react-router-dom";

// Vistas
import Concepts from "../views/Concepts";
import Config from "../views/Config";
import BackendTest from "../views/BackendTest";
import Items from "../views/Items";
import MasterItems from "../views/MasterItems";

// Contenido dependiente de la pestaña seleccionada
const Routes = () => {
  return (
    <Switch>
      <Route path="/config">
        <Config />
      </Route>
      <Route path="/backendtest">
        <BackendTest />
      </Route>
      <Route path="/concepts">
        <Concepts />
      </Route>
      <Route path="/items">
        <Items />
      </Route>
      <Route path="/masteritems">
        <MasterItems />
      </Route>
      <Route path="/">
        <Concepts />
      </Route>
    </Switch>
  );
};

export default Routes;
