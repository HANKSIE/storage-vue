import LocalStorageWrapper from "./wrapper";

const apiToken = new LocalStorageWrapper(process.env.VUE_APP_API_TOKEN);

export default apiToken;