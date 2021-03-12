// Comun a todos los "servicios"
import { VAR_ACTION, doAction, flat } from "./service";

// Claves de Acciones
const ACTION_GET_PPAY_CONCEPTS = "getPPayConcepts"; // "act.pre.svc.get.ppay.concepts";
const ACTION_NEW_PPAY_CONCEPT = "newPPayConcept"; // "act.pre.svc.new.ppay.concept";
const ACTION_MOD_PPAY_CONCEPT = "modPPayConcept"; // "act.pre.svc.mod.ppay.concept";
const ACTION_DEL_PPAY_CONCEPT = "delPPayConcept"; // "act.pre.svc.del.ppay.concept";

const ACTION_GET_PPAY_ITEMS = "getPPayItems"; // "act.pre.svc.get.ppay.items";
const ACTION_GET_PPAY_CCPT_ITEMS = "getPPayConceptItems"; // "act.pre.svc.get.ppay.concept.items";
const ACTION_SET_PPAY_ITEMS_CCPT = "setPPayItemsConcept"; // "act.pre.svc.set.ppay.items.concept";
const ACTION_REM_PPAY_ITEMS_CCPT = "remPPayItemsConcept"; // "act.pre.svc.rem.ppay.items.concept";

// Claves de parametros
const VAR_PRE_CID = "pre_cid"; // "var.pre.cid";
const VAR_PRE_NAME = "pre_name"; // "var.pre.name";
const VAR_PRE_DESC = "pre_desc"; // "var.pre.desc";
const VAR_PRE_IID_ARR_LEN = "pre_iid_arr_len"; // "var.pre.iid.arr.len";
const VAR_PRE_IID = "pre_iid"; // "var.pre.iid";

// Mappings

const mapPPayItemsConcept = ({ cid, items }) => {
  const data = {
    [VAR_PRE_CID]: cid
  };

  if (items != null) {
    data[VAR_PRE_IID_ARR_LEN] = items.length;
    items.forEach((item, index) => (data[VAR_PRE_IID + index] = item.iid));
  }

  return data;
};

// Logica de negocio - PPayConcepts

const getPPayConcepts = async () =>
  flat(
    // Revisar
    await doAction({
      [VAR_ACTION]: ACTION_GET_PPAY_CONCEPTS
    })
  );

const newPPayConcept = async ({ name, desc }) =>
  await doAction({
    [VAR_ACTION]: ACTION_NEW_PPAY_CONCEPT,
    [VAR_PRE_NAME]: name,
    [VAR_PRE_DESC]: desc
  });

const modPPayConcept = async ({ cid, name, desc }) => {
  const data = {
    [VAR_ACTION]: ACTION_MOD_PPAY_CONCEPT,
    [VAR_PRE_CID]: cid
  };

  if (name != null) data[VAR_PRE_NAME] = name;
  if (desc != null) data[VAR_PRE_DESC] = desc;

  return await doAction(data);
};

const delPPayConcept = async ({ cid }) =>
  await doAction({
    [VAR_ACTION]: ACTION_DEL_PPAY_CONCEPT,
    [VAR_PRE_CID]: cid
  });

// Logica de negocio - PPayItems

const getPPayItems = async () =>
  flat(
    await doAction({
      [VAR_ACTION]: ACTION_GET_PPAY_ITEMS
    })
  );

const getPPayConceptItems = async ({ cid }) =>
  flat(
    await doAction({
      [VAR_ACTION]: ACTION_GET_PPAY_CCPT_ITEMS,
      [VAR_PRE_CID]: cid
    })
  );

const setPPayItemsConcept = async ({ cid, items }) =>
  await doAction({
    [VAR_ACTION]: ACTION_SET_PPAY_ITEMS_CCPT,
    ...mapPPayItemsConcept({ cid, items })
  });

const remPPayItemsConcept = async ({ cid, items }) =>
  await doAction({
    [VAR_ACTION]: ACTION_REM_PPAY_ITEMS_CCPT,
    ...mapPPayItemsConcept({ cid, items })
  });

export {
  // Conceptos Prepago
  getPPayConcepts,
  newPPayConcept,
  modPPayConcept,
  delPPayConcept,
  // Items Prepago
  getPPayItems,
  getPPayConceptItems,
  setPPayItemsConcept,
  remPPayItemsConcept
};
