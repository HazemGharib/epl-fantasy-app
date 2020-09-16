<template>
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
      ]
    };
  }
};
</script>
