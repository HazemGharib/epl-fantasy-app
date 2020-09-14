<template>
  <div>
    <div v-if="!team || !players" class="pa-16 text-center">
      <v-progress-circular
        :size="100"
        :width="10"
        color="#37003c"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-card v-if="team && players">
      <v-container>
        <StartingEleven
          :players="players"
          :team="team.picks.filter(p => p.position < 12)"
        />

        <div class="mt-8">
          <div class="text-h6">Substitutes</div>
          <Subs
            :players="players"
            :subs="team.picks.filter(p => p.position >= 12)"
          />
        </div>
        <div class="mt-8">
          <div class="text-h6">Chips</div>
          <Chips :chips="team.chips" />
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { getPlayers, getFantasyTeam } from "@/services/playersHubService";
import { getToken } from "@/services/tokenService";
import StartingEleven from "@/components/PlayersHub/StartingEleven";
import Subs from "@/components/PlayersHub/Subs";
import Chips from "@/components/PlayersHub/Chips";
export default {
  name: "FantasyTeamCard",
  components: {
    StartingEleven,
    Subs,
    Chips
  },
  data() {
    return {
      players: undefined,
      team: undefined
    };
  },
  mounted() {
    this.getAllPlayers();
    this.getFantasyTeam(process.env.VUE_APP_FANTASY_TEAM_ID);
  },
  methods: {
    getAllPlayers() {
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
    },
    getFantasyTeam(team) {
      getToken().then(({ data }) => {
        getFantasyTeam(data.token, team).then(({ data }) => {
          this.team = data.results;
        });
      });
    }
  }
};
</script>
