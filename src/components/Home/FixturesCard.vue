<template>
  <v-row no-gutters v-if="players" class="fixturesCard">
    <v-col cols="12" md="6" sm="6" v-for="info in fixtures" :key="info.id">
      <v-card class="mx-2 my-2 text-center">
        <div class="pt-8">
          <div>
            {{ new Date(info.kickoff_time).toLocaleDateString("en-my") }}
            {{ new Date(info.kickoff_time).toLocaleTimeString("en-my") }}
          </div>
          <div>
            <v-row>
              <v-col cols="2" />
              <v-col cols="3">
                <v-img
                  class="mx-auto"
                  width="50"
                  :src="getTeam(info.team_h).photo"
                />
              </v-col>
              <v-col cols="2" />
              <v-col cols="3">
                <v-img
                  class="mx-auto"
                  width="50"
                  :src="getTeam(info.team_a).photo"
                />
              </v-col>
              <v-col cols="2" />
            </v-row>
          </div>
          <div>
            <v-row>
              <v-col cols="2" />
              <v-col class="text-h6" cols="3">
                {{ info.team_h_score ? info.team_h_score : "0" }}
              </v-col>
              <v-col cols="2">
                <p class="caption">
                  {{ !info.started ? "-" : info.finished ? "FT" : "VS" }}
                </p>
              </v-col>
              <v-col class="text-h6" cols="3">
                {{ info.team_a_score ? info.team_a_score : "0" }}
              </v-col>
              <v-col cols="2" />
            </v-row>
          </div>
          <div>
            <v-list v-if="info.team_h_score || info.team_a_score">
              <v-list-group no-action prepend-icon="mdi-soccer">
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>Goal Scorers</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item>
                  <v-list-item-content>
                    <v-row>
                      <v-col class="text-h6" cols="4">
                        <div
                          v-for="stat in info.stats.filter(
                            s => s.identifier === 'goals_scored'
                          )"
                          :key="stat.code"
                        >
                          <p
                            class="text-caption"
                            v-for="item in stat.h"
                            :key="item.element"
                          >
                            {{
                              `${item.value} ` +
                                getPlayer(item.element).web_name
                            }}
                          </p>
                        </div>
                        <div
                          v-for="stat in info.stats.filter(
                            s => s.identifier === 'own_goals'
                          )"
                          :key="stat.code"
                        >
                          <p
                            class="text-caption"
                            v-for="item in stat.a"
                            :key="item.element"
                          >
                            {{
                              `${item.value} ` +
                                getPlayer(item.element).web_name +
                                " (OG)"
                            }}
                          </p>
                        </div>
                      </v-col>
                      <v-col class="text-h6" cols="4" offset="2">
                        <div
                          v-for="stat in info.stats.filter(
                            s => s.identifier === 'goals_scored'
                          )"
                          :key="stat.code"
                        >
                          <p
                            class="text-caption"
                            v-for="item in stat.a"
                            :key="item.element"
                          >
                            {{
                              `${item.value} ` +
                                getPlayer(item.element).web_name
                            }}
                          </p>
                        </div>
                        <div
                          v-for="stat in info.stats.filter(
                            s => s.identifier === 'own_goals'
                          )"
                          :key="stat.code"
                        >
                          <p
                            class="text-caption"
                            v-for="item in stat.h"
                            :key="item.element"
                          >
                            {{
                              `${item.value} ` +
                                getPlayer(item.element).web_name +
                                " (OG)"
                            }}
                          </p>
                        </div>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
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
