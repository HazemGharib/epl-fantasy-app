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
      <v-tab key="standings">Standings</v-tab>
      <v-tab key="statistics">Statistics</v-tab>
    </v-tabs>

    <v-tabs-items touchless v-model="tab">
      <v-tab-item key="standings">
        <v-card>
          <v-card-title>
            Standings
            <v-spacer></v-spacer>
            <v-text-field
              v-model="standingsSearch"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :loading="!standings"
            :headers="standingsHeaders"
            :items="standings"
            :search="standingsSearch"
            :items-per-page="20"
            hide-default-footer
            mobile-breakpoint
          >
            <template v-slot:item.movement="{ item }">
              <v-icon>{{
                item.position.movement === null ||
                item.position.movement.includes("none")
                  ? "mdi-minus"
                  : item.position.movement.includes("up")
                  ? "mdi-chevron-up"
                  : "mdi-chevron-down"
              }}</v-icon>
            </template>
            <template v-slot:item.team_logo="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-img
                    v-bind="attrs"
                    v-on="on"
                    :alt="item.team.long_name"
                    :src="item.team.logo"
                    width="50"
                    contain
                    dense
                  ></v-img>
                </template>
                <span>{{ item.team.long_name }}</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
      <v-tab-item key="statistics">
        <v-card>
          <v-card-title>
            Statistics
            <v-spacer></v-spacer>
            <v-text-field
              v-model="statisticsSearch"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :loading="!statistics"
            :headers="statisticsHeaders"
            :items="statistics"
            :search="statisticsSearch"
            :items-per-page="10"
            mobile-breakpoint
          >
            <template v-slot:item.team_logo="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-img
                    v-bind="attrs"
                    v-on="on"
                    :alt="item.team"
                    :src="item.team_logo"
                    width="50"
                    contain
                    dense
                  ></v-img>
                </template>
                <span>{{ item.team }}</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { getStandings, getStatistics } from "@/services/statisticsService";
import { getToken } from "@/services/tokenService";
export default {
  data() {
    return {
      standings: undefined,
      statistics: undefined,
      tab: undefined,
      standingsSearch: "",
      statisticsSearch: "",
      standingsHeaders: [
        {
          text: "#",
          align: "center",
          sortable: false,
          value: "position.value",
          width: "20"
        },
        {
          text: "",
          align: "start",
          value: "movement",
          width: "10"
        },
        {
          text: "",
          align: "end",
          sortable: false,
          value: "team_logo",
          width: "20"
        },
        {
          text: "Name",
          align: "start",
          value: "team.short_name",
          width: "50"
        },
        {
          text: "Played",
          align: "center",
          value: "statistics.played",
          width: "50"
        },
        {
          text: "W",
          align: "center",
          value: "statistics.won",
          width: "50"
        },
        {
          text: "D",
          align: "center",
          value: "statistics.drawn",
          width: "50"
        },
        {
          text: "L",
          align: "center",
          value: "statistics.lost",
          width: "50"
        },
        {
          text: "GF",
          align: "center",
          value: "statistics.goal_f",
          width: "50"
        },
        {
          text: "GA",
          align: "center",
          value: "statistics.goal_a",
          width: "50"
        },
        {
          text: "+/-",
          align: "center",
          value: "statistics.goal_d",
          width: "50"
        },
        {
          text: "Points",
          align: "center",
          value: "statistics.points",
          width: "50"
        }
      ],
      statisticsHeaders: [
        {
          text: "",
          align: "end",
          sortable: false,
          value: "team_logo",
          width: "20"
        },
        {
          text: "Team",
          align: "start",
          sortable: false,
          value: "team",
          width: "20"
        },
        {
          text: "Player Name",
          align: "start",
          value: "player_name",
          width: "100"
        },
        {
          text: "Goals",
          align: "start",
          value: "goals_scored",
          width: "20"
        },
        {
          text: "Assists",
          align: "start",
          value: "assists",
          width: "20"
        },
        {
          text: "Clean Sheets",
          align: "start",
          value: "clean_sheets",
          width: "20"
        },
        {
          text: "Saves",
          align: "start",
          value: "saves",
          width: "20"
        },
        {
          text: "Yellow Cards",
          align: "start",
          value: "yellow_cards",
          width: "20"
        },
        {
          text: "Red Cards",
          align: "start",
          value: "red_cards",
          width: "20"
        },
        {
          text: "Influence Rank",
          align: "start",
          value: "influence_rank",
          width: "20"
        },
        {
          text: "Creativity Rank",
          align: "start",
          value: "creativity_rank",
          width: "20"
        },
        {
          text: "Threat Rank",
          align: "start",
          value: "threat_rank",
          width: "20"
        }
      ]
    };
  },
  mounted() {
    getToken().then(({ data }) => {
      getStandings(data.token).then(({ data }) => {
        this.standings = data.eplTable;
      });

      getStatistics(data.token).then(({ data }) => {
        this.statistics = data.results.map(p => ({
          ...p,
          // eslint-disable-next-line
          player_name: `${p.first_name} ${p.last_name}`
        }));
      });
    });
  }
};
</script>
