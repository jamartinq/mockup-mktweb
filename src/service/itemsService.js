// Comun a todos los "servicios"
import { VAR_ACTION, doAction, flat } from "./service";

// Claves de acciones
const ACTION_GET_CANDIDATES = "getCandidates"; // "act.itm.svc.get.candidates";
const ACTION_MOD_CANDIDATE = "modCandidate"; // "act.itm.svc.mod.candidate";
const ACTION_NEW_CANDIDATE = "newCandidate"; // "act.itm.svc.new.candidate";
const ACTION_DEL_CANDIDATE = "delCandidate"; // "act.itm.svc.del.candidate";

const ACTION_GET_ITEMS = "getItems"; // "act.itm.svc.get.items";
const ACTION_NEW_ITEMS = "newItems"; // "act.itm.svc.new.items";
const ACTION_NEW_ITEM = "newItem"; // "act.itm.svc.new.item";
const ACTION_MOD_ITEM = "modItem"; // "act.itm.svc.mod.item";
const ACTION_DEL_ITEM = "delItem"; // "act.itm.svc.del.item";

const ACTION_GET_TABLES = "getTables"; // "act.itm.svc.get.tables";

const ACTION_GET_CATEGORIES = "getCategories"; // "act.itm.svc.get.categories";
const ACTION_NEW_CATEGORY = "newCategory"; // "act.itm.svc.new.category";
const ACTION_MOD_CATEGORY = "modCategory"; // "act.itm.svc.mod.category";
const ACTION_DEL_CATEGORY = "delCategory"; // "act.itm.svc.del.category";

const ACTION_GET_CHNLTYPES = "getItemChnlTypes"; // "act.itm.svc.get.chnl.types";

// No se usa
// const ACTION_GET_CORRTYPES = "getItemCorrTypes" // "act.itm.svc.get.corr.types";

// Claves de parametros

// Comun a candidatos e items
const VAR_ITM_ID = "itm_id"; // "var.itm.id";
const VAR_ITM_NAME = "itm_name"; // "var.itm.name";
const VAR_ITM_DESC = "itm_desc"; // "var.itm.desc";
const VAR_ITM_LEVL = "itm_levl"; // "var.itm.level";
const VAR_ITM_CHRG = "itm_chrg"; // "var.itm.charge";
const VAR_ITM_CHNL = "itm_chnl"; // "var.itm.cid";
const VAR_ITM_NETW = "itm_netw"; // "var.itm.nid";
const VAR_ITM_CORR = "itm_corr"; // "var.itm.rid";

// Especifico de items
const VAR_ITM_CAT_ID = "itm_cat_id"; // "var.itm.cat.id";
const VAR_ITM_TAB_ARR_LEN = "itm_tab_arr_len"; // "var.itm.tab.arr.len";
const VAR_ITM_TAB_ID = "itm_tab_id"; // "var.itm.tab.id";
const VAR_ITM_LIN_ARR_LEN = "itm_lin_arr_len"; // "var.itm.lin.arr.len";
const VAR_ITM_LIN_ID = "itm_lin_id"; // "var.itm.lin.id";
const VAR_ITM_LIN_PCT = "itm_lin_pct"; // "var.itm.lin.pct";

const VAR_ITM_ID_ARR_LEN = "itm_id_arr_len"; // "var.itm.id.arr.len";
const VAR_ITM_NAME_ARR_LEN = "itm_name_arr_len"; // "var.itm.name.arr.len";
const VAR_ITM_DESC_ARR_LEN = "itm_desc_arr_len"; // "var.itm.desc.arr.len";

// Categories
const VAR_ITM_CAT_PID = "itm_cat_pid"; // "var.itm.cat.pid";
const VAR_ITM_CAT_NAME = "itm_cat_name"; // "var.itm.cat.name";

// Mappings - Conversión entrada -> requestData

// Datos comunes a Candidatos e Ítems
const mapLevelChargeChannelNetworkCorridor = ({
  level,
  charge,
  channel,
  network,
  corridor
}) => {
  const data = {};

  if (level != null) data[VAR_ITM_LEVL] = level;
  if (charge != null) data[VAR_ITM_CHRG] = charge;
  if (channel != null) data[VAR_ITM_CHNL] = channel;
  if (network != null) data[VAR_ITM_NETW] = network;
  if (corridor != null) data[VAR_ITM_CORR] = corridor;

  return data;
};

const mapCommon = ({
  name,
  desc,
  level,
  charge,
  channel,
  network,
  corridor
}) => {
  const data = {
    ...mapLevelChargeChannelNetworkCorridor({
      level,
      charge,
      channel,
      network,
      corridor
    })
  };

  if (name != null) data[VAR_ITM_NAME] = name;
  if (desc != null) data[VAR_ITM_DESC] = desc;

  return data;
};

// Datos específicos de Ítems
const mapCatTabsBls = ({ cat, tabs, bls }) => {
  const data = {};

  if (cat != null) data[VAR_ITM_CAT_ID] = cat;

  if (tabs != null) {
    data[VAR_ITM_TAB_ARR_LEN] = tabs.length;
    tabs.forEach((tab, index) => (data[VAR_ITM_TAB_ID + index] = tab.id));
  }

  if (bls != null) {
    data[VAR_ITM_LIN_ARR_LEN] = bls.length;
    bls.forEach((bl, index) => {
      data[VAR_ITM_LIN_ID + index] = bl.id;
      data[VAR_ITM_LIN_PCT + index] = bl.pct;
    });
  }
};

const mapItem = ({
  name,
  desc,
  level,
  charge,
  channel,
  network,
  corridor,
  cat,
  tabs,
  bls
}) => {
  const data = {
    ...mapCommon({ name, desc, level, charge, channel, network, corridor }),
    ...mapCatTabsBls({ cat, tabs, bls })
  };

  return data;
};

// Items - Candidates
const getCandidates = async () =>
  flat(
    // Revisar
    await doAction({
      [VAR_ACTION]: ACTION_GET_CANDIDATES
    })
  );

const newCandidate = async ({
  name,
  desc,
  level,
  charge,
  channel,
  network,
  corridor
}) =>
  await doAction({
    [VAR_ACTION]: ACTION_NEW_CANDIDATE,
    [VAR_ITM_NAME]: name,
    [VAR_ITM_DESC]: desc,
    [VAR_ITM_LEVL]: level,
    [VAR_ITM_CHRG]: charge,
    [VAR_ITM_CHNL]: channel,
    [VAR_ITM_NETW]: network,
    [VAR_ITM_CORR]: corridor
  });

// No parece usarse
const modCandidate = async ({
  id,
  name,
  desc,
  level,
  charge,
  channel,
  network,
  corridor
}) => {
  const data = {
    [VAR_ACTION]: ACTION_MOD_CANDIDATE,
    [VAR_ITM_ID]: id,
    ...mapCommon({ name, desc, level, charge, channel, network, corridor })
  };

  return await doAction(data);
};

const delCandidate = async ({ id }) =>
  await doAction({
    [VAR_ACTION]: ACTION_DEL_CANDIDATE,
    [VAR_ITM_ID]: id
  });

// Items
const getItems = async () =>
  flat(
    // Revisar
    await doAction({
      [VAR_ACTION]: ACTION_GET_ITEMS
    })
  );

const newItem = async ({
  id,
  name,
  desc,
  level,
  charge,
  channel,
  network,
  corridor,
  cat,
  tabs,
  bls
}) =>
  await doAction({
    [VAR_ACTION]: ACTION_NEW_ITEM,
    [VAR_ITM_ID]: id,
    ...mapItem({
      name,
      desc,
      level,
      charge,
      channel,
      network,
      corridor,
      cat,
      tabs,
      bls
    })
  });

const newItems = async ({
  candidates,
  level,
  charge,
  channel,
  network,
  corridor,
  cat,
  tabs,
  bls
}) => {
  const data = {
    [VAR_ACTION]: ACTION_NEW_ITEMS,
    [VAR_ITM_ID_ARR_LEN]: candidates.length,
    [VAR_ITM_NAME_ARR_LEN]: candidates.length,
    [VAR_ITM_DESC_ARR_LEN]: candidates.length,
    ...mapLevelChargeChannelNetworkCorridor({
      level,
      charge,
      channel,
      network,
      corridor
    }),
    ...mapCatTabsBls({ cat, tabs, bls })
  };

  candidates.forEach((candidate, index) => {
    data[VAR_ITM_ID + index] = candidate.cid;
    data[VAR_ITM_NAME + index] = candidate.name != null ? candidate.name : "";
    data[VAR_ITM_DESC + index] = candidate.desc != null ? candidate.desc : "";
  });

  return await doAction(data);
};

const modItem = async ({
  id,
  name,
  desc,
  level,
  charge,
  channel,
  network,
  corridor,
  cat,
  tabs,
  bls
}) =>
  await doAction({
    [VAR_ACTION]: ACTION_MOD_ITEM,
    [VAR_ITM_ID]: id,
    ...mapCommon({ name, desc, level, charge, channel, network, corridor }),
    ...mapCatTabsBls({ cat, tabs, bls })
  });

const delItem = async ({ id }) =>
  await doAction({
    [VAR_ACTION]: ACTION_DEL_ITEM,
    [VAR_ITM_ID]: id
  });

const getTables = async (filter) => {
  const data = {
    [VAR_ACTION]: ACTION_GET_TABLES
  };

  if (filter != null) data[VAR_ITM_ID] = filter.id;

  return flat(await doAction(data)); // Revisar
};

// Categories
const getCategories = async () =>
  flat(
    // Revisar
    await doAction({
      [VAR_ACTION]: ACTION_GET_CATEGORIES
    })
  );

const newCategory = async ({ name, pid }) => {
  const data = {
    [VAR_ACTION]: ACTION_NEW_CATEGORY,
    [VAR_ITM_CAT_NAME]: name
  };

  if (pid != null) data[VAR_ITM_CAT_PID] = pid;

  await doAction(data);
};

const modCategory = async ({ id, pid, name }) => {
  const data = {
    [VAR_ACTION]: ACTION_MOD_CATEGORY,
    [VAR_ITM_CAT_ID]: id
  };

  if (pid != null) data[VAR_ITM_CAT_PID] = pid;
  if (name != null) data[VAR_ITM_CAT_NAME] = name;

  return await doAction(data);
};

const delCategory = async ({ id }) =>
  await doAction({
    [VAR_ACTION]: ACTION_DEL_CATEGORY,
    [VAR_ITM_CAT_ID]: id
  });

// Channel Types
const getItemChnlTypes = async () =>
  flat(
    // Revisar
    await doAction({
      [VAR_ACTION]: ACTION_GET_CHNLTYPES
    })
  );

// Export
export {
  // Items - Candidates
  getCandidates,
  newCandidate,
  modCandidate,
  delCandidate,
  // Items
  getItems,
  newItem,
  newItems,
  modItem,
  delItem,
  // Tables
  getTables,
  // Categories
  getCategories,
  newCategory,
  modCategory,
  delCategory,
  // Channel Types
  getItemChnlTypes
};

// No encuentro invocaciones de flash a estas funciones, mas alla de su definicion
// Candidates: modCandidate
// Categories: newCategory, modCategory, modCategory
// Channel Types: getItemChnlTypes
