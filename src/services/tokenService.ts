import axios from "axios";

export const getToken = async (): Promise<object> =>
  axios.post(`${process.env.VUE_APP_FANTASY_URL}/token`, {
    // eslint-disable-next-line
    client_id: process.env.VUE_APP_FANTASY_CLIENT_ID,
    secret: process.env.VUE_APP_FANTASY_SECRET
  });
