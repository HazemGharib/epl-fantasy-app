import axios from "axios";

export const getToken = async (): Promise<object> =>
  axios.get(`${process.env.VUE_APP_FANTASY_BASE_URL}/token`);
