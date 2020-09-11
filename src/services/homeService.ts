import axios from "axios";

export const getHome = async (token: string): Promise<object> =>
  axios.get(`${process.env.VUE_APP_FANTASY_API_URL}/events`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
