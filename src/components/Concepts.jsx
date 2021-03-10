import React, { useEffect, useState } from "react";

import ReactDataGrid from "react-data-grid";

export const flat = (result) =>
  result?.service?.dataset?.elm?.map((elm) => elm._attributes);

function GridDecorator(props) {
  return (
    <div className="GridDecorator">
      {/*
        No me funciona
        rowGetter={(n) => concepts[n]}
        rowsCount={ROW_COUNT}
      */}
      <ReactDataGrid {...props} />
    </div>
  );
}

function Concepts(props) {
  const [concepts, setConcepts] = useState([]);

  useEffect(() => {
    fetch("/concepts.json")
      .then((response) => response.json())
      .then((json) => setConcepts(flat(json).slice(0, 8)))
      .then(console.log(concepts));
  }, []);

  return (
    <div className="Concepts">
      <h1>Conceptos</h1>
      <div className="row">
        {concepts && (
          <GridDecorator
            rows={concepts}
            columns={[
              { key: "id", name: "ID" },
              { key: "rf", name: "Código" },
              { key: "ds", name: "Descripción" }
            ]}
          />
        )}
        {concepts && (
          <GridDecorator
            rows={concepts}
            columns={[
              { key: "id", name: "ID" },
              { key: "rf", name: "Código" },
              { key: "ds", name: "Descripción" }
            ]}
          />
        )}
      </div>
    </div>
  );
}

export default Concepts;
