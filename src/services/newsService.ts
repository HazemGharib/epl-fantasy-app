import axios from "axios";

export const getNews = async (token: string): Promise<object> =>
  axios.get(`${process.env.VUE_APP_FANTASY_API_URL}/news`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
