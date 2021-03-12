// React
import { useEffect, useState } from "react";

// Servicios
import * as conceptsService from "../service/conceptsService";

// Componentes
import GridDecorator from "../components/GridDecorator";

// Definicion

const cols = [
  { key: "id", name: "ID" },
  { key: "rf", name: "Código" },
  { key: "ds", name: "Descripción" }
];

const Concepts = () => {
  // Informacion especifica del componente
  const [pPayConcepts, setPPayConcepts] = useState([]);

  const refresh = () =>
    conceptsService.getPPayConcepts().then(
      (pPayConcepts) => setPPayConcepts(pPayConcepts) // El slice es provisional hasta que hagamos paginacion
    );

  // Consulta inicial de todos los Conceptos Prepago
  useEffect(refresh, []);

  return (
    <div className="Concepts twin">
      <h1>
        Conceptos <button onClick={refresh}>Recargar</button>
      </h1>
      <div className="row">
        <GridDecorator
          title="Catálogo: CONCEPTOS"
          rows={pPayConcepts}
          columns={cols}
        />
        <GridDecorator title="Conceptos" rows={pPayConcepts} columns={cols} />
      </div>
    </div>
  );
};

export default Concepts;
