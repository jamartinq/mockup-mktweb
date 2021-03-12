// React
import { useState } from "react";

// Servicios
import * as conceptsService from "../service/conceptsService";
import * as itemsService from "../service/itemsService";
import * as masterItemsService from "../service/masterItemsService";

// Estilos
// import "./BackendTest.css";

// Definicion
const BackendTest = () => {
  const [elms, setElms] = useState([]);

  const callBackend = async (elemsPromise) => setElms(await elemsPromise);

  return (
    <div className="BackendTest">
      <div>
        <h3>Conceptos</h3>
        <button onClick={() => callBackend(conceptsService.getPPayConcepts())}>
          getPPayConcepts()
        </button>
        <button onClick={() => callBackend(conceptsService.getPPayItems())}>
          getPPayItems()
        </button>
        <button
          onClick={() =>
            callBackend(conceptsService.getPPayConceptItems({ cid: 0 }))
          }
        >
          getPPayConceptItems(0)
        </button>

        <h3>Items</h3>
        <button onClick={() => callBackend(itemsService.getCandidates())}>
          getCandidates()
        </button>
        <button onClick={() => callBackend(itemsService.getItems())}>
          getItems()
        </button>
        <button onClick={() => callBackend(itemsService.getTables())}>
          getTables()
        </button>
        <button
          onClick={() => callBackend(itemsService.getTables({ id: "10030" }))}
        >
          getTables('10030')
        </button>
        <button onClick={() => callBackend(itemsService.getCategories())}>
          getCategories()
        </button>
        <button onClick={() => callBackend(itemsService.getItemChnlTypes())}>
          getItemChnlTypes()
        </button>

        <h3>Master Items</h3>
        <button onClick={() => callBackend(masterItemsService.getBLines())}>
          getBLines()
        </button>
        <button
          onClick={() =>
            callBackend(masterItemsService.getBLines({ id: "10030" }))
          }
        >
          getBLines('10030')
        </button>
        <button
          onClick={() => callBackend(masterItemsService.getItemLevelTypes())}
        >
          getItemLevelTypes()
        </button>
        <button
          onClick={() => callBackend(masterItemsService.getItemChrgTypes())}
        >
          getItemChrgTypes()
        </button>
        <button
          onClick={() => callBackend(masterItemsService.getItemChannelTypes())}
        >
          getItemChannelTypes()
        </button>
        <button
          onClick={() => callBackend(masterItemsService.getItemNetwTypes())}
        >
          getItemNetwTypes()
        </button>
        <button
          onClick={() => callBackend(masterItemsService.getItemCorrTypes())}
        >
          getItemCorrTypes()
        </button>
        {elms.length > 0 && (
          <table>
            <thead>
              <tr>
                {Object.entries(elms[0]).map(([key]) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {elms.map((elm, index) => (
                <tr key={index}>
                  {Object.entries(elm).map(([key, value]) => (
                    <td key={key}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BackendTest;
