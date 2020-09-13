<template>
  <v-card>
    <v-card-title>
      Players Hub
      <v-spacer></v-spacer>
      <v-text-field
        v-model="playersSearch"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :loading="!players"
      :headers="headers"
      :items="players"
      :search="playersSearch"
      :items-per-page="10"
      mobile-breakpoint
    >
      <template v-slot:item.photo="{ item }">
        <v-img :src="item.photo" contain aspect-ratio="1.4"></v-img>
      </template>
      <template v-slot:item.team_shirt="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-img
              v-bind="attrs"
              v-on="on"
              :alt="item.team"
              :src="item.team_shirt"
              contain
              aspect-ratio="0.8"
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
  name: "PlayersHubTable",
  props: {
    players: {
      required: true
    }
  },
  data() {
    return {
      playersSearch: "",
      headers: [
        {
          text: "",
          align: "start",
          sortable: false,
          value: "photo",
          width: "200"
        },
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
          width: "300"
        },
        {
          text: "Position",
          align: "start",
          value: "position_short",
          width: "100"
        },
        {
          text: "Team",
          align: "center",
          value: "team_shirt",
          width: "100"
        },
        {
          text: "Match Points",
          align: "center",
          value: "event_points",
          width: "120"
        },
        {
          text: "Total Points",
          align: "center",
          value: "total_points",
          width: "110"
        },
        {
          text: "Points/Game",
          align: "center",
          value: "points_per_game",
          width: "120"
        },
        {
          text: "Price (M)",
          align: "center",
          value: "cost",
          width: "110"
        },
        {
          text: "Selected %",
          align: "center",
          value: "selected",
          width: "110"
        },
        {
          text: "Chance of playing %",
          align: "center",
          value: "chance_of_playing_next_round",
          width: "150"
        }
      ]
    };
  }
};
</script>
