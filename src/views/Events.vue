<template>
  <div class="ma-6">
    <EventsTable :events="events" :players="players" />
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
      events: undefined,
      players: undefined
    };
  },
  mounted() {
    getToken().then(({ data }) => {
      getPlayers(data.token).then(({ data }) => {
        this.players = data.results.map(p => ({
          id: p.id,
          // eslint-disable-next-line
          full_name: `${p.first_name} ${p.last_name} `
        }));
      });
    });

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
