// Auxiliar -> Mover a un sitio comun a todos los servicios

import { request } from "./requestDispatcher";
import { MSG_ERR_SESSION, MSG_ERR_ACTION } from "./serviceConfig";

// Cross Action
export const VAR_ACTION = "action"; // "var.client.action"

// SERVICE STATUS CODES
export const STATUS_OK = "0"; // "svc.status.ok";
export const STATUS_ERR_GENERAL = "-1"; // "svc.status.ko";
export const STATUS_ERR_SESSION = "100"; // "svc.status.relogin";
export const STATUS_ERR_PSWRESET = "200"; // "svc.status.pswrset";

// Funciones comunes de mapeo

// Dado un resultado de llamada al ServletDispatcher convertido a js, devuelve
// el array que contiene la informacion propiamente dicha
export const flat = (result) =>
  result?.service?.dataset?.elm?.map((elm) => elm._attributes);

// Funcion comun de comprobacion de error
const checkStatus = (result) => {
  const serviceStatus = result?.service?._attributes?.status;

  if (!result || serviceStatus === STATUS_ERR_SESSION) {
    throw new Error(MSG_ERR_SESSION); // TODO Revisar
  }

  if (serviceStatus !== STATUS_OK) {
    throw new Error(MSG_ERR_ACTION); // TODO Revisar
  }

  return result;
};

// Wrapper de la llamada a request que, ademas de realiza la llamada,
// comprueba el estado devuelto por la aplicacion
// Si no lo hay devuelve una promise de result
export const doAction = async (data) => {
  const result = await request(data);
  return checkStatus(result);
};
