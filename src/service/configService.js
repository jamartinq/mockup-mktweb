import { xml2js } from "xml-js";

const url = "/mktweb/cfg/config.xml";
const headers = new Headers({ Accept: "application/xml" });

// Version async/await
export const getConfig = async () => {
  const response = await fetch(url, headers); // Solicitud de configuracion
  const xml = await response.text(); // Obtencion del contenido de la respuesta
  const results = xml2js(xml, { compact: true }); // Conversion de XML a objeto JS

  // Mapping del objeto que representa al XML al hash name, value que conforma el AppContext
  const config = {};
  results.config.property.forEach(
    (p) => (config[p._attributes.name] = p._attributes.value)
  );

  return config;
};
