<template>
  <div>
    <LoginCard @loginSuccess="value => getFantasyTeam(value)" :team="team" />

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
import LoginCard from "@/components/PlayersHub/LoginCard";
export default {
  name: "FantasyTeamCard",
  components: {
    LoginCard,
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
    async getFantasyTeam({ token, session }) {
      const { results } = (await getFantasyTeam(token, session)).data;
      this.team = results;
    }
  }
};
</script>
