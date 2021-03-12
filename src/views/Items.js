// React
import { useEffect, useState } from "react";

// Servicios
import * as itemsService from "../service/itemsService";

// Estilos
// import "./Items.css";

// Componentes
import GridDecorator from "../components/GridDecorator";

// Definicion

// Candidatos
const colsCandidates = [
  { key: "id", name: "ID" },
  { key: "rf", name: "Código" },
  { key: "ds", name: "Descripción" },
  { key: "lv", name: "Nivel" },
  { key: "ct", name: "Cargo" },
  { key: "ci", name: "Canal" },
  { key: "ni", name: "Red" },
  { key: "ri", name: "Corridor" }
];

const colsItems = [
  { key: "id", name: "ID" },
  { key: "rf", name: "Código" },
  { key: "ds", name: "Descripción" },
  { key: "lv", name: "Nivel" },
  { key: "ct", name: "Cargo" },
  { key: "ci", name: "Canal" },
  { key: "ni", name: "Red" },
  { key: "ri", name: "Corridor" },
  // { key: "ti", name: "?????" }, No se muestra
  { key: "tn", name: "Categoría" },
  { key: "sn", name: "Subcategoría" }
];

const Items = () => {
  // Candidatos
  const [candidates, setCandidates] = useState([]);

  // Items
  const [items, setItems] = useState([]);

  const refresh = () => {
    itemsService.getCandidates().then((results) => setCandidates(results)); // El slice es provisional hasta que hagamos paginacion
    itemsService.getItems().then((results) => setItems(results)); // TODO El slice es provisional hasta que hagamos paginacion
  };

  // Carga inicial
  useEffect(refresh, []);

  return (
    <div className="Items twin">
      <h1>
        Items <button onClick={refresh}>Recargar</button>
      </h1>
      <div className="row">
        <GridDecorator
          title="Candidatos"
          rows={candidates}
          columns={colsCandidates}
        />
        <GridDecorator title="Items" rows={items} columns={colsItems} />
      </div>
    </div>
  );
};

export default Items;
