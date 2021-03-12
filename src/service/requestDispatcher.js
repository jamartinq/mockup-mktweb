// Mock request dispatcher

const getterActions = [
  "doLogon",
  "getPPayConcepts",
  "getPPayItems",
  "getPPayConceptItems",
  "getCandidates",
  "getItems",
  "getTables",
  "getCategories",
  "getItemChnlTypes",
  "getBLines",
  "getItemLevelTypes",
  "getItemChrgTypes",
  "getItemChannelTypes",
  "getItemNetwTypes",
  "getItemCorrTypes",
  "getItemChnlTypes"
];

export const request = async (data) => {
  console.log("request", data);

  const shortUrl = getterActions.includes(data.action) ? data.action : "ok";
  const url = `/mktweb/mock/${shortUrl}.json`;

  console.log(`fetching data from ${url}`);
  const response = await fetch(`${url}`);
  const json = await response.json();

  await console.log("response", json);

  return json;
};
