<template>
  <div v-if="players" class="fixturesCard">
    <div class="ma-8">
      <v-card class="pa-2 text-center">
        <div class="my-4" v-for="info in fixtures" :key="info.id">
          <div>
            {{ new Date(info.kickoff_time).toLocaleDateString("en-my") }}
          </div>
          <div>
            <v-row>
              <v-col cols="3" />
              <v-col cols="2"
                ><v-img
                  class="mx-auto"
                  width="50"
                  :src="getTeam(info.team_h).photo"
              /></v-col>
              <v-col cols="2">{{ info.finished ? "FT" : "-" }}</v-col>
              <v-col cols="2"
                ><v-img
                  class="mx-auto"
                  width="50"
                  :src="getTeam(info.team_a).photo"
              /></v-col>
              <v-col cols="3" />
            </v-row>
          </div>
          <div>
            <v-row>
              <v-col cols="3" />
              <v-col class="text-h6" cols="2">{{
                info.team_h_score ? info.team_h_score : "-"
              }}</v-col>
              <v-col cols="2" />
              <v-col class="text-h6" cols="2">{{
                info.team_a_score ? info.team_a_score : "-"
              }}</v-col>
              <v-col cols="3" />
            </v-row>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "FixturesCard",
  props: {
    fixtures: {
      required: true
    },
    teams: {
      required: true
    },
    players: {
      required: true
    }
  },
  methods: {
    getTeam(id) {
      return this.teams.filter(t => t.id === id).shift();
    },
    getPlayer(id) {
      return this.$props.players.find(p => p.id === id);
    }
  }
};
</script>

<style scoped>
.fixturesCard div {
  color: #673d6b;
}
</style>
