<template>
  <v-card>
    <v-card-title>
      Events
      <v-spacer></v-spacer>
      <v-text-field
        v-model="eventsSearch"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :loading="!events"
      :headers="headers"
      :items="events"
      :search="eventsSearch"
      :items-per-page="38"
      mobile-breakpoint
      hide-default-footer
      dense
    >
      <template v-slot:item.most_captained="{ item }">
        {{ getPlayer(item.most_captained) }}
      </template>
      <template v-slot:item.most_vice_captained="{ item }">
        {{ getPlayer(item.most_vice_captained) }}
      </template>
      <template v-slot:item.most_selected="{ item }">
        {{ getPlayer(item.most_selected) }}
      </template>
      <template v-slot:item.top_element="{ item }">
        {{ getPlayer(item.top_element) }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "PlayersHubTable",
  props: {
    events: {
      required: true
    },
    players: {
      required: true
    }
  },
  data() {
    return {
      eventsSearch: "",
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
          width: "150"
        },
        {
          text: "Avgerage Score",
          align: "start",
          value: "average_entry_score",
          width: "150"
        },
        {
          text: "Deadline",
          align: "start",
          value: "deadline_time",
          width: "150"
        },
        {
          text: "Top Score",
          align: "start",
          value: "highest_score",
          width: "120"
        },
        {
          text: "Most Captained",
          align: "start",
          value: "most_captained",
          width: "250"
        },
        {
          text: "Most V. Captained",
          align: "start",
          value: "most_vice_captained",
          width: "250"
        },
        {
          text: "Most Selected",
          align: "start",
          value: "most_selected",
          width: "250"
        },
        {
          text: "Top Player",
          align: "start",
          value: "top_element",
          width: "250"
        }
      ]
    };
  },
  methods: {
    getPlayer(id) {
      return this.$props.players.find(p => p.id === id)?.full_name;
    }
  }
};
</script>
