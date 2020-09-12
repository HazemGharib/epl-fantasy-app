<template>
  <div class="ma-6">
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
        mobile-breakpoint
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
          value: "name",
          width: "200"
        },
        {
          text: "Avgerage Score",
          align: "start",
          value: "average_entry_score",
          width: "200"
        },
        {
          text: "Deadline",
          align: "start",
          value: "deadline_time",
          width: "200"
        },
        {
          text: "Top Score",
          align: "start",
          value: "highest_score",
          width: "200"
        },
        {
          text: "Most Captained",
          align: "start",
          value: "most_captained",
          width: "200"
        },
        {
          text: "Most V. Captained",
          align: "start",
          value: "most_vice_captained",
          width: "200"
        },
        {
          text: "Most Selected",
          align: "start",
          value: "most_selected",
          width: "200"
        },
        {
          text: "Top Player",
          align: "start",
          value: "top_element",
          width: "200"
        }
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
