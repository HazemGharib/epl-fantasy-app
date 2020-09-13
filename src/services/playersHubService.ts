import axios from "axios";

export const getPlayers = async (token: string): Promise<object> =>
  axios.get(`${process.env.VUE_APP_FANTASY_API_URL}/fantasy`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getFantasyTeam = async (
  token: string,
  team: number
): Promise<object> =>
  axios.post(
    `${process.env.VUE_APP_FANTASY_API_URL}/fantasy-team/${team}`,
    {
      username: process.env.VUE_APP_FANTASY_TEAM_USER,
      password: process.env.VUE_APP_FANTASY_TEAM_PASS
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
