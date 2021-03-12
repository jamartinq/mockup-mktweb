// Componentes de terceros
import ReactDataGrid from "react-data-grid";

const GridDecorator = (props) => {
  return (
    <div className="GridDecorator">
      <h2>{props.title}</h2>
      {/*
          No me funciona
          rowGetter={(n) => concepts[n]}
          rowsCount={ROW_COUNT}
      */}
      <ReactDataGrid {...props} />
    </div>
  );
};

export default GridDecorator;
