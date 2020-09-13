<template>
  <div class="ma-6">
    <v-tabs
      slider-size="4"
      v-model="tab"
      background-color="transparent"
      color="#f7003c"
      grow
    >
      <v-tabs-slider color="#f7003c"></v-tabs-slider>
      <v-tab key="players-hub">Players Hub</v-tab>
      <v-tab key="fantasy-team">Fantasy Team</v-tab>
    </v-tabs>

    <v-tabs-items touchless v-model="tab">
      <v-tab-item key="players-hub">
        <PlayersHubTable :players="players" />
      </v-tab-item>
      <v-tab-item key="fantasy-team">
        <FantasyTeamCard />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { getPlayers } from "@/services/playersHubService";
import { getToken } from "@/services/tokenService";
import PlayersHubTable from "@/components/PlayersHub/PlayersHubTable";
import FantasyTeamCard from "@/components/PlayersHub/FantasyTeamCard";
export default {
  components: {
    PlayersHubTable,
    FantasyTeamCard
  },
  data() {
    return {
      tab: undefined,
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
