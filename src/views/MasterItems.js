// React
import { useEffect, useState } from "react";

// Servicios
import * as masterItemsService from "../service/masterItemsService";

// Estilos
// import "./Items.css";

// Componentes
import GridDecorator from "../components/GridDecorator";

// Definicion

// BLines
const colsBLines = [
  { key: "id", name: "ID" },
  { key: "rf", name: "Código" },
  { key: "ds", name: "Descripción" },
  { key: "ic", name: "# Items" }
];

// Item [Level, Charge, Channel, Networ, Corridor] Types
const colsTypes = [
  { key: "id", name: "ID" },
  { key: "rf", name: "Código" },
  { key: "pc", name: "# Items" },
  { key: "bc", name: "# Candidatos" }
];

const MasterItems = () => {
  // BLines
  const [bLines, setBLines] = useState([]);
  // Item Level Types
  const [itemLevelTypes, setItemLevelTypes] = useState([]);
  // Item Charge Types
  const [itemChrgTypes, setItemChrgTypes] = useState([]);
  // Item Channel Types
  const [itemChannelTypes, setItemChannelTypes] = useState([]);
  // Item Network Types
  const [itemNetwTypes, setItemNetwTypes] = useState([]);
  // Item Corridor Types
  const [itemCorrTypes, setItemCorrTypes] = useState([]);

  const refresh = () => {
    // BLines
    masterItemsService.getBLines().then((results) => setBLines(results));
    // Item Level Types
    masterItemsService
      .getItemLevelTypes()
      .then((results) => setItemLevelTypes(results));
    // Item Charge Types
    masterItemsService
      .getItemChrgTypes()
      .then((results) => setItemChrgTypes(results));
    // Item Channel Types
    masterItemsService
      .getItemChannelTypes()
      .then((results) => setItemChannelTypes(results));
    // Item Network Types
    masterItemsService
      .getItemNetwTypes()
      .then((results) => setItemNetwTypes(results));
    // Item Corridor Types
    masterItemsService
      .getItemCorrTypes()
      .then((results) => setItemCorrTypes(results));
  };

  useEffect(refresh, []);

  return (
    <div className="MasterItems twin">
      <h1>
        Master Items <button onClick={refresh}>Recargar</button>
      </h1>
      <div className="row">
        <div className="col">
          <GridDecorator
            title="Líneas de Negocio"
            rows={bLines}
            columns={colsBLines}
          />
          <GridDecorator
            title="Niveles de Items"
            rows={itemLevelTypes}
            columns={colsTypes}
          />
          <GridDecorator
            title="Tipos de Cargo"
            rows={itemChrgTypes}
            columns={colsTypes}
          />
        </div>
        <div className="col">
          <GridDecorator
            title="Tipos de Canal"
            rows={itemChannelTypes}
            columns={colsTypes}
          />
          <GridDecorator
            title="Tipos de Red"
            rows={itemNetwTypes}
            columns={colsTypes}
          />
          <GridDecorator
            title="Tipos de Corridor"
            rows={itemCorrTypes}
            columns={colsTypes}
          />
        </div>
      </div>
    </div>
  );
};

export default MasterItems;
