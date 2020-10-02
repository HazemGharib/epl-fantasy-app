<template>
  <v-card>
    <v-card-title>
      <v-container fluid>Standings</v-container>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="standingsSearch"
        append-icon="mdi-magnify"
        label="Search"
        color="#943c9b"
        clearable
        single-line
        hide-details
      />
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
      <template slot="progress">
        <v-progress-linear color="#37003c" indeterminate />
      </template>
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
</template>

<script>
export default {
  name: "StandingsTable",
  props: {
    standings: {
      required: true
    }
  },
  data() {
    return {
      standingsSearch: "",
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
          sortable: false,
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
          text: "Team",
          align: "start",
          value: "team.short_name",
          width: "82"
        },
        {
          text: "P",
          align: "start",
          value: "statistics.played",
          width: "68"
        },
        {
          text: "W",
          align: "start",
          value: "statistics.won",
          width: "68"
        },
        {
          text: "D",
          align: "start",
          value: "statistics.drawn",
          width: "68"
        },
        {
          text: "L",
          align: "start",
          value: "statistics.lost",
          width: "68"
        },
        {
          text: "GF",
          align: "start",
          value: "statistics.goal_f",
          width: "68"
        },
        {
          text: "GA",
          align: "start",
          value: "statistics.goal_a",
          width: "68"
        },
        {
          text: "+/-",
          align: "start",
          value: "statistics.goal_d",
          width: "68"
        },
        {
          text: "PTS",
          align: "start",
          value: "statistics.points",
          width: "74"
        }
      ]
    };
  }
};
</script>
