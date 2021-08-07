import Token from "./token";

const apiToken = new Token(process.env.VUE_APP_API_TOKEN);

export default apiToken;