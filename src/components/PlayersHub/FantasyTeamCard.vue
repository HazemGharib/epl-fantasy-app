<template>
  <div>
    <LoginCard
      v-if="!sessionExists()"
      @loginSuccess="value => getFantasyTeam(value)"
      :team="team"
    />

    <v-card v-if="sessionExists()" :loading="!team || !players">
      <template slot="progress">
        <v-progress-linear color="#37003c" indeterminate />
      </template>
      <v-container>
        <v-btn @click="logout()" color="#37003c" dark>
          Sign out
          <v-icon right dark>mdi-logout</v-icon>
        </v-btn>
      </v-container>
      <v-container v-if="team && players">
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
    if (this.sessionExists()) {
      this.getAllPlayers().then(() => {
        const session = JSON.parse(this.$cookie.get("eplf_session"));
        getToken().then(({ data }) => {
          const { token } = data;
          this.getFantasyTeam({ token, session });
        });
      });
    }
  },
  methods: {
    sessionExists() {
      return this.$cookie.get("eplf_session")?.length > 0;
    },
    logout() {
      this.$cookie.delete("eplf_session");
      this.team = undefined;
      this.players = undefined;
    },
    async getAllPlayers() {
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
      if (!this.sessionExists())
        this.$cookie.set("eplf_session", JSON.stringify(session));
      this.getAllPlayers();
      const { results } = (await getFantasyTeam(token, session)).data;
      this.team = results;
    }
  }
};
</script>
