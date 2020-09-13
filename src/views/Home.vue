<template>
  <div class="home">
    <div
      v-if="!currentEvent && !nextEvent && !players"
      class="ma-16 text-center"
    >
      <v-progress-circular
        :size="100"
        :width="10"
        color="#37003c"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="6"
        class="mt-8 mb-16"
        v-if="currentEvent && currentEvent.length"
      >
        <div class="font-weight-black text-h4 text-center">Current Event</div>
        <EventCard :event="currentEvent" :players="players" />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="6"
        class="mt-8 mb-16"
        v-if="nextEvent && nextEvent.length"
      >
        <div class="font-weight-black text-h4 text-center">Next Event</div>
        <EventCard :event="nextEvent" :players="players" />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="6"
        class="mt-8 mb-16"
        v-if="lastEvent && lastEvent.length"
      >
        <div class="font-weight-black text-h4 text-center">Last Event</div>
        <EventCard :event="lastEvent" :players="players" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getEvents } from "@/services/eventsService";
import { getPlayers } from "@/services/playersHubService";
import { getToken } from "@/services/tokenService";
import EventCard from "@/components/Home/EventCard";
export default {
  name: "Home",
  components: {
    EventCard
  },
  data: () => ({
    players: undefined,
    currentEvent: undefined,
    nextEvent: undefined,
    lastEvent: undefined
  }),
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
        this.currentEvent = data?.results.filter(r => r.is_current);
        this.nextEvent = data?.results.filter(r => r.is_next);

        const lastEvent = data?.results
          .filter(i => i.finished)
          .sort(
            (a, b) => new Date(b.deadline_time) - new Date(a.deadline_time)
          )[0];
        this.lastEvent = lastEvent ? [this.lastEvent] : [];
      });
    });
  }
};
</script>

<style scoped>
.home {
  color: #673d6b;
}
</style>
