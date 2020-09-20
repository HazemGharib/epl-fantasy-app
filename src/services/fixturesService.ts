import axios from "axios";

export const getFixtures = async (
  token: string,
  eventId: number
): Promise<object> =>
  axios.get(`${process.env.VUE_APP_FANTASY_API_URL}/fixtures/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
