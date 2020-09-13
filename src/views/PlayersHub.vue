<template>
  <div class="ma-6">
    <PlayersHubTable :players="players" />
  </div>
</template>

<script>
import { getPlayers } from "@/services/playersHubService";
import { getToken } from "@/services/tokenService";
import PlayersHubTable from "@/components/PlayersHub/PlayersHubTable";
export default {
  components: {
    PlayersHubTable
  },
  data() {
    return {
      players: undefined
    };
  },
  mounted() {
    getToken().then(({ data }) => {
      getPlayers(data.token).then(({ data }) => {
        this.players = data?.results.map(p => ({
          ...p,
          name: `${p.first_name} ${p.last_name}`,
          cost: p.cost / 10,
          // eslint-disable-next-line
          chance_of_playing_next_round: p.chance_of_playing_next_round !== null
              ? p.chance_of_playing_next_round
              : ""
        }));
      });
    });
  }
};
</script>
