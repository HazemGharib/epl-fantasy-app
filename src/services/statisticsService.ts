import axios from "axios";

export const getStatistics = async (token: string): Promise<object> =>
  axios.get(`${process.env.VUE_APP_FANTASY_API_URL}/statistics`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getStandings = async (token: string): Promise<object> =>
  axios.get(`${process.env.VUE_APP_FANTASY_API_URL}/standings`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
