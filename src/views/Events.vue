<template>
  <div class="ma-16">
    <v-card>
      <v-card-title>
        Events
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
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
        :search="search"
        :items-per-page="38"
        hide-default-footer
        dense
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import { getEvents } from "@/services/eventsService";
import { getToken } from "@/services/tokenService";
export default {
  data() {
    return {
      events: undefined,
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Avg. Entry Score", value: "average_entry_score" },
        { text: "Deadline", value: "deadline_time" },
        { text: "Top Score", value: "highest_score" },
        { text: "Most Captained", value: "most_captained" },
        { text: "Most V. Captained", value: "most_vice_captained" },
        { text: "Most Selected", value: "most_selected" },
        { text: "Top Player", value: "top_element" }
      ]
    };
  },
  mounted() {
    getToken().then(({ data }) => {
      getEvents(data.token).then(({ data }) => {
        this.events = data?.results.map(e => ({
          ...e,
          // eslint-disable-next-line
          deadline_time: new Date(e.deadline_time).toLocaleDateString("en-my")
        }));
      });
    });
  }
};
</script>
