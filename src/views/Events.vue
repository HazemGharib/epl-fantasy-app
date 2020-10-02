<template>
  <div class="ma-4">
    <v-alert v-if="updateAlert" class="mt-16" type="warning" border="left" dark>
      <strong>Website is being updated now</strong>
    </v-alert>
    <EventsTable v-if="!updateAlert" :events="events" :players="players" />
  </div>
</template>

<script>
import { getEvents } from "@/services/eventsService";
import { getPlayers } from "@/services/playersHubService";
import { getToken } from "@/services/tokenService";
import EventsTable from "@/components/Events/EventsTable";
export default {
  components: {
    EventsTable
  },
  data() {
    return {
      updateAlert: false,
      events: undefined,
      players: undefined
    };
  },
  mounted() {
    getToken().then(({ data }) => {
      getPlayers(data.token).then(({ data }) => {
        if (data.results === "The game is being updated.")
          this.updateAlert = true;

        this.players = data.results.map(p => ({
          id: p.id,
          // eslint-disable-next-line
          full_name: `${p.first_name} ${p.last_name} `
        }));
      });
    });

    getToken().then(({ data }) => {
      if (data.results === "The game is being updated.")
        this.updateAlert = true;

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
