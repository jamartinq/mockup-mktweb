// Comun a todos los "servicios"
import { VAR_ACTION, doAction, flat } from "./service";

// Claves de acciones

// BLines
const ACTION_GET_BLINES = "getBLines"; // "act.itm.svc.get.blines";
const ACTION_NEW_BLINE = "newBLine"; // "act.itm.svc.new.bline";
const ACTION_MOD_BLINE = "modBLine"; // "act.itm.svc.mod.bline";
const ACTION_DEL_BLINE = "delBLine"; // "act.itm.svc.del.bline";

// Item Level Types
const ACTION_GET_LVLTYPES = "getItemLevelTypes"; // "act.itm.svc.get.level.types";
const ACTION_NEW_ITMLVLTYPES = "newItemLevelTypes"; // "act.itm.svc.new.level.types";
const ACTION_MOD_ITMLVLTYPES = "modItemLevelTypes"; // "act.itm.svc.mod.level.types";
const ACTION_DEL_ITMLVLTYPES = "delItemLevelTypes"; // "act.itm.svc.del.level.types";

// Item Charge Types
const ACTION_GET_ITM_CHRGTYPES = "getItemChrgTypes"; // "act.itm.svc.get.chrg.types";
const ACTION_NEW_ITM_CHRGTYPES = "newItemChrgTypes"; // "act.itm.svc.new.chrg.types";
const ACTION_MOD_ITM_CHRGTYPES = "modItemChrgTypes"; // "act.itm.svc.mod.chrg.types";
const ACTION_DEL_ITM_CHRGTYPES = "delItemChrgTypes"; // "act.itm.svc.del.chrg.types";

// Item Channel Types
const ACTION_GET_ITM_CHNLTYPES = "getItemChnlTypes"; // "act.itm.svc.get.chnl.types";
const ACTION_NEW_ITM_CHNLTYPES = "newItemChnlTypes"; // "act.itm.svc.new.chnl.types";
const ACTION_MOD_ITM_CHNLTYPES = "modItemChnlTypes"; // "act.itm.svc.mod.chnl.types";
const ACTION_DEL_ITM_CHNLTYPES = "delItemChnlTypes"; // "act.itm.svc.del.chnl.types";

// Item Network Types
const ACTION_GET_ITM_NETWTYPES = "getItemNetwTypes"; // "act.itm.svc.get.netw.types";
const ACTION_NEW_ITM_NETWTYPES = "newItemNetwTypes"; // "act.itm.svc.new.netw.types";
const ACTION_MOD_ITM_NETWTYPES = "modItemNetwTypes"; // "act.itm.svc.mod.netw.types";
const ACTION_DEL_ITM_NETWTYPES = "delItemNetwTypes"; // "act.itm.svc.del.netw.types";

// Item Corridor Types
const ACTION_GET_ITM_CORRTYPES = "getItemCorrTypes"; // "act.itm.svc.get.corr.types";
const ACTION_NEW_ITM_CORRTYPES = "newItemCorrTypes"; // "act.itm.svc.new.corr.types";
const ACTION_MOD_ITM_CORRTYPES = "modItemCorrTypes"; // "act.itm.svc.mod.corr.types";
const ACTION_DEL_ITM_CORRTYPES = "delItemCorrTypes"; // "act.itm.svc.del.corr.types";

// Claves de parametros

// BLines
const VAR_ITM_LIN_NAME = "itm_lin_name"; // "var.itm.lin.name";
const VAR_ITM_LIN_DESC = "itm_lin_desc"; // "var.itm.lin.desc";

// Comunes a itemService y masterItemService --> TODO Revisar. De momento, repetidas.
const VAR_ITM_LIN_ID = "itm_lin_id"; // "var.itm.lin.id"; // Relacion Item <-> Blines
const VAR_ITM_ID = "itm_id"; // "var.itm.id"; // Relacion Item -> XXX Type
const VAR_ITM_NAME = "itm_name"; // "var.itm.name"; // Relacion Item -> XXX Type

// BLines
const getBLines = async (filter) => {
  const data = {
    [VAR_ACTION]: ACTION_GET_BLINES
  };

  if (filter != null) data[VAR_ITM_ID] = filter.id;

  return flat(await doAction(data)); // Revisar
};

const newBLine = async ({ name, desc }) =>
  await doAction({
    [VAR_ACTION]: ACTION_NEW_BLINE,
    [VAR_ITM_LIN_NAME]: name,
    [VAR_ITM_LIN_DESC]: desc
  });

const modBLine = async ({ id, name, desc }) => {
  const data = {
    [VAR_ACTION]: ACTION_MOD_BLINE,
    [VAR_ITM_LIN_ID]: id
  };

  if (name != null) data[VAR_ITM_LIN_NAME] = name;
  if (desc != null) data[VAR_ITM_LIN_DESC] = desc;

  return await doAction(data); // Revisar
};

const delBLine = async ({ id }) =>
  await doAction({
    [VAR_ACTION]: ACTION_DEL_BLINE,
    [VAR_ITM_LIN_ID]: id
  });

// Plantilla CRUD basada en los campos VAR_ITM_ID y VAR_ITM_NAME, comun para:
// - Item Level Types
// - Item Charge Types
// - Item Channel Types
// - Item Corridor Types
const createIdNameCrud = (
  actionCreate,
  actionRead,
  actionUpdate,
  actionDelelete
) => ({
  create: async ({ name }) =>
    await doAction({
      [VAR_ACTION]: actionCreate,
      [VAR_ITM_NAME]: name
    }),

  read: async () =>
    flat(
      // Revisar
      await doAction({
        [VAR_ACTION]: actionRead
      })
    ),

  update: async ({ id, name }) => {
    const data = {
      [VAR_ACTION]: actionUpdate,
      [VAR_ITM_ID]: id
    };

    if (name != null) data[VAR_ITM_NAME] = name;

    return await doAction(data);
  },

  delete: async ({ id }) =>
    await doAction({
      [VAR_ACTION]: actionDelelete,
      [VAR_ITM_ID]: id
    })
});

// Item Level Types
const itemLevelTypesCrud = createIdNameCrud(
  ACTION_NEW_ITMLVLTYPES,
  ACTION_GET_LVLTYPES,
  ACTION_MOD_ITMLVLTYPES,
  ACTION_DEL_ITMLVLTYPES
);
const getItemLevelTypes = itemLevelTypesCrud.read;
const newItemLevelType = itemLevelTypesCrud.create;
const setItemLevelType = itemLevelTypesCrud.update;
const remItemLevelType = itemLevelTypesCrud.delete;

// Item Charge Types
const itemChrgTypesCrud = createIdNameCrud(
  ACTION_NEW_ITM_CHRGTYPES,
  ACTION_GET_ITM_CHRGTYPES,
  ACTION_MOD_ITM_CHRGTYPES,
  ACTION_DEL_ITM_CHRGTYPES
);
const getItemChrgTypes = itemChrgTypesCrud.read;
const newItemChrgType = itemChrgTypesCrud.create;
const setItemChrgType = itemChrgTypesCrud.update;
const remItemChrgType = itemChrgTypesCrud.delete;

// Item Channel Types
const itemChannelTypesCrud = createIdNameCrud(
  ACTION_NEW_ITM_CHNLTYPES,
  ACTION_GET_ITM_CHNLTYPES,
  ACTION_MOD_ITM_CHNLTYPES,
  ACTION_DEL_ITM_CHNLTYPES
);
const getItemChannelTypes = itemChannelTypesCrud.read;
const newItemChannelType = itemChannelTypesCrud.create;
const setItemChannelType = itemChannelTypesCrud.update;
const remItemChannelType = itemChannelTypesCrud.delete;

// Item Network Types
const itemNetwTypesCrud = createIdNameCrud(
  ACTION_NEW_ITM_NETWTYPES,
  ACTION_GET_ITM_NETWTYPES,
  ACTION_MOD_ITM_NETWTYPES,
  ACTION_DEL_ITM_NETWTYPES
);
const getItemNetwTypes = itemNetwTypesCrud.read;
const newItemNetwTypes = itemNetwTypesCrud.create;
const modItemNetwTypes = itemNetwTypesCrud.update;
const remItemNetwTypes = itemNetwTypesCrud.delete;

// Item Corridor Types
const itemCorrTypesCrud = createIdNameCrud(
  ACTION_NEW_ITM_CORRTYPES,
  ACTION_GET_ITM_CORRTYPES,
  ACTION_MOD_ITM_CORRTYPES,
  ACTION_DEL_ITM_CORRTYPES
);
const getItemCorrTypes = itemCorrTypesCrud.read;
const newItemCorrTypes = itemCorrTypesCrud.create;
const modItemCorrTypes = itemCorrTypesCrud.update;
const delItemCorrTypes = itemCorrTypesCrud.delete;

// Export
export {
  // BLines
  getBLines,
  newBLine,
  modBLine,
  delBLine,
  // Item Level Types
  getItemLevelTypes,
  newItemLevelType,
  setItemLevelType,
  remItemLevelType,
  // Item Charge Types
  getItemChrgTypes,
  newItemChrgType,
  setItemChrgType,
  remItemChrgType,
  // Item Channel Types
  getItemChannelTypes,
  newItemChannelType,
  setItemChannelType,
  remItemChannelType,
  // Item Network Types
  getItemNetwTypes,
  newItemNetwTypes,
  modItemNetwTypes,
  remItemNetwTypes,
  // Item Corridor Types
  getItemCorrTypes,
  newItemCorrTypes,
  modItemCorrTypes,
  delItemCorrTypes
};
