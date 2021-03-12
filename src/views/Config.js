import { useContext } from "react";

import AppContext from "../AppContext";

const Config = () => {
  const { appContext } = useContext(AppContext);

  return (
    <div className="Config">
      <table>
        <caption>Config</caption>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {appContext &&
            Object.entries(appContext).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{JSON.stringify(value, null, 2)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Config;
