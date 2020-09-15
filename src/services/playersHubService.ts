import axios from "axios";

export const getPlayers = async (token: string): Promise<object> =>
  axios.get(`${process.env.VUE_APP_FANTASY_API_URL}/fantasy`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getFantasySession = async (
  token: string,
  credentials: { username: string; password: string }
): Promise<object> =>
  axios.post(
    `${process.env.VUE_APP_FANTASY_API_URL}/fantasy-session`,
    {
      username: credentials.username,
      password: credentials.password
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getFantasyTeam = async (
  token: string,
  session: object
): Promise<object> =>
  axios.post(
    `${process.env.VUE_APP_FANTASY_API_URL}/fantasy-team`,
    {
      session
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
