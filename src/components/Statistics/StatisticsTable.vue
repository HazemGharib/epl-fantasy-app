<template>
  <v-card>
    <v-card-title>
      Statistics
      <v-spacer></v-spacer>
      <v-text-field
        v-model="statisticsSearch"
        append-icon="mdi-magnify"
        label="Search"
        color="#943c9b"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :loading="!statistics"
      :headers="statisticsHeaders"
      :items="statistics"
      :search="statisticsSearch"
      :items-per-page="10"
      mobile-breakpoint
    >
      <template slot="progress">
        <v-progress-linear color="#37003c" indeterminate />
      </template>
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
</template>

<script>
export default {
  name: "StatisticsTable",
  props: {
    statistics: {
      required: true
    }
  },
  data() {
    return {
      statisticsSearch: "",
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
  }
};
</script>
