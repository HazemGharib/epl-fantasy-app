import axios from "axios";

export const getPlayers = async (token: string): Promise<object> =>
  axios.get(`${process.env.VUE_APP_FANTASY_API_URL}/fantasy`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
