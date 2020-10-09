<template>
  <div>
    <LoginCard
      v-if="!sessionExists"
      @loginSuccess="value => getFantasyTeam(value)"
      :team="team"
    />

    <v-card v-if="sessionExists" :loading="!sessionExists || !team || !players">
      <template slot="progress">
        <v-progress-linear color="#37003c" indeterminate />
      </template>
      <v-row v-if="team" class="mx-2">
        <v-col cols="7" sm="4" offset="0" offset-sm="2" class="py-0 px-1">
          <v-container>
            <div class="mb-10 font-weight-black deep-purple--text">
              {{ team.name }}
            </div>
            <div class="font-weight-light deep-purple--text">
              {{ `Points ${team.event_points}` }}
            </div>
            <div class="font-weight-light deep-purple--text">
              {{ `Total Points ${team.total_points}` }}
            </div>
          </v-container>
        </v-col>

        <v-col cols="5" sm="4" class="text-right">
          <v-btn @click="logout()" color="#37003c" dark>
            Exit
            <v-icon right dark>mdi-logout</v-icon>
          </v-btn>
        </v-col>
      </v-row>
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
      team: undefined,
      sessionExists: undefined
    };
  },
  mounted() {
    this.sessionExists = this.$cookie.get("eplf_session")?.length > 0;
    if (this.sessionExists) {
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
    logout() {
      this.$cookie.delete("eplf_session");
      this.team = undefined;
      this.players = undefined;
      this.sessionExists = false;
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
      if (!this.sessionExists) {
        this.$cookie.set("eplf_session", JSON.stringify(session), {
          expires: "1M"
        });
        this.sessionExists = true;
      }
      this.getAllPlayers();
      const { results } = (await getFantasyTeam(token, session)).data;
      if (this.sessionExists) this.team = results;
    }
  }
};
</script>
