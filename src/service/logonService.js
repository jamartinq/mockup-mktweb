import { request } from "./requestDispatcher";

import {
  VAR_ACTION,
  STATUS_OK,
  STATUS_ERR_GENERAL,
  STATUS_ERR_PSWRESET
} from "./service";
import { MSG_ERR_LOGON } from "./serviceConfig";

// Utilidades de mapeo

// Dado el resultado de la operacion, devuelve el valor del atributo de service.dataset.elm
// de nombre name
const getAttributeValue = (result, name) => {
  const elms = result.service.dataset.elm.filter(
    (e) => e._attributes.name === name
  );
  const value = elms.length > 0 ? elms[0]._attributes.value : null;
  console.log(value);
  return value;
};

// Claves de Acciones
const ACTION_DO_LOGON = "doLogon"; // "act.lgn.svc.do.logon";
const ACTION_DO_LOGOUT = "doLogout"; // "act.lgn.svc.do.logout";

// Claves de parametros
const VAR_LGN_USERNAME = "client_emanresu"; // "var.client.username";
const VAR_LGN_USERPASS = "client_drowssap"; // "var.client.password";

// Atributos importantes devueltos por la operacion de LOGON
const ATTR_USERGRUP_PROFILE = "client_profile"; // "var.client.profile";
const ATTR_PASSCHNG_REQUEST = "change_psw"; // "response.change.psw";

// Realiza la operacion de login
// Devuelve una promesa de resultados de login, con esta informacion:
// Si login OK: Nombre y perfil de usuario
// Si se necesita reseteo de password: un unico atributo passwordResetNeeded
// Si login KO o cualquier otro error, eleva un error
export const logon = async ({ user, password }) => {
  const result = await request({
    [VAR_ACTION]: ACTION_DO_LOGON,
    [VAR_LGN_USERNAME]: user,
    [VAR_LGN_USERPASS]: password
  });

  const logonResult = { status: result.service._attributes.status };

  switch (logonResult.status) {
    case STATUS_OK: // Login OK
      return {
        ...logonResult,
        username: user,
        profile: getAttributeValue(result, ATTR_USERGRUP_PROFILE)
      };

    case STATUS_ERR_PSWRESET: // Se necesita reseteo de password
      return {
        ...logonResult,
        passwordResetNeeded: true,
        passwordResetUrl: getAttributeValue(result, ATTR_PASSCHNG_REQUEST)
      };

    case STATUS_ERR_GENERAL: // Login KO
      throw new Error(MSG_ERR_LOGON);

    default:
      throw new Error("Error inesperado en el proceso de login"); // TODO Revisar
  }
};

export const logout = () => {
  return request({
    [VAR_ACTION]: ACTION_DO_LOGOUT
  });
};
