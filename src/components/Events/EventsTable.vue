<template>
  <div>
    <v-dialog v-model="dialog" @input="() => (selectedEvent = undefined)">
      <v-card class="px-8 py-4">
        <div class="text-center py-8" v-if="!selectedEvent">
          <v-progress-circular
            color="#37003c"
            width="10"
            size="120"
            indeterminate
          />
        </div>
        <v-card-title v-if="selectedEvent" class="headline">
          {{ `Gameweek ${selectedEvent.id}` }}
        </v-card-title>

        <FixturesCard
          v-if="selectedEvent"
          :teams="teams"
          :fixtures="selectedEvent.fixtures"
          :players="players"
        />

        <v-card-actions>
          <v-spacer />

          <v-btn color="red darken-1" text @click="closeDialog">
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card>
      <v-card-title>
        <v-container fluid>Events</v-container>
        <v-subheader class="caption">Tap any event for more</v-subheader>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="eventsSearch"
          append-icon="mdi-magnify"
          label="Search"
          color="#943c9b"
          clearable
          single-line
          hide-details
        />
      </v-card-title>
      <v-data-table
        :loading="!events"
        :headers="headers"
        :items="events"
        @click:row="event => handleSelectedEvent(event)"
        :search="eventsSearch ? 'Gameweek ' + eventsSearch : ''"
        :items-per-page="38"
        mobile-breakpoint
        hide-default-footer
        dense
      >
        <template slot="progress">
          <v-progress-linear color="#37003c" indeterminate />
        </template>
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
  </div>
</template>

<script>
import { getFixtures } from "@/services/fixturesService";
import { getToken } from "@/services/tokenService";
import FixturesCard from "@/components/Home/FixturesCard";

export default {
  name: "PlayersHubTable",
  components: {
    FixturesCard
  },
  props: {
    events: {
      required: true
    },
    players: {
      required: true
    },
    teams: {
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      selectedEvent: undefined,
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
    closeDialog() {
      this.dialog = false;
      this.selectedEvent = undefined;
    },
    handleSelectedEvent(event) {
      this.dialog = true;
      getToken()
        .then(async ({ data }) => {
          const fixtures = (await getFixtures(data.token, event.id)).data
            .results;
          this.selectedEvent = { id: event.id, fixtures };
        })
        .then(() => (this.dialog = true));
    },
    getPlayer(id) {
      return this.$props.players?.find(p => p.id === id)?.web_name;
    }
  }
};
</script>
