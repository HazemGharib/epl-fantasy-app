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
        class="mt-2 mb-2"
        v-if="currentEvent && currentEvent.length"
      >
        <div class="font-weight-black text-h4 text-center">Current Event</div>
        <EventCard :event="currentEvent" :players="players" />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="6"
        class="mt-2 mb-2"
        v-if="nextEvent && nextEvent.length"
      >
        <div class="font-weight-black text-h4 text-center">Next Event</div>
        <EventCard :event="nextEvent" :players="players" />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="6"
        class="mt-2 mb-2"
        v-if="lastEvent && lastEvent.length"
      >
        <div class="font-weight-black text-h4 text-center">Last Event</div>
        <EventCard :event="lastEvent" :players="players" />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="6"
        class="mt-2 mb-2"
        v-if="lastEvent && lastEvent.length"
      >
        <div class="font-weight-black text-h4 text-center">Goals</div>
        <StatisticsCard
          :statistics="goals"
          :type="'goals'"
          :players="players"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="6"
        class="mt-2 mb-2"
        v-if="lastEvent && lastEvent.length"
      >
        <div class="font-weight-black text-h4 text-center">Assists</div>
        <StatisticsCard
          :statistics="assists"
          :type="'assists'"
          :players="players"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="6"
        class="mt-2 mb-2"
        v-if="lastEvent && lastEvent.length"
      >
        <div class="font-weight-black text-h4 text-center">Clean Sheets</div>
        <StatisticsCard
          :statistics="cleanSheets"
          :type="'cleanSheets'"
          :players="players"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getEvents } from "@/services/eventsService";
import { getPlayers } from "@/services/playersHubService";
import { getStatistics } from "@/services/statisticsService";
import { getToken } from "@/services/tokenService";
import EventCard from "@/components/Home/EventCard";
import StatisticsCard from "@/components/Home/StatisticsCard";
export default {
  name: "Home",
  components: {
    EventCard,
    StatisticsCard
  },
  data: () => ({
    players: undefined,
    goals: undefined,
    assists: undefined,
    cleanSheets: undefined,
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
          full_name: `${p.first_name} ${p.last_name}`,
          photo: p.photo
        }));
      });

      getStatistics(data.token).then(({ data }) => {
        const { results } = data;
        this.goals = results
          .sort((p1, p2) => p2.goals_scored - p1.goals_scored)
          .slice(0, 5);

        this.assists = results
          .sort((p1, p2) => p2.assists - p1.assists)
          .slice(0, 5);

        this.cleanSheets = results
          .filter(p => p.position_short === "GKP")
          .sort((p1, p2) => p2.clean_sheets - p1.clean_sheets)
          .slice(0, 5);
        console.log(this.goals);
        console.log(this.assists);
        console.log(this.cleanSheets);
      });

      getEvents(data.token).then(({ data }) => {
        this.currentEvent = data?.results.filter(
          r => r.is_current && !r.finished
        );
        this.nextEvent = data?.results.filter(r => r.is_next);

        const lastEvent = data?.results
          .filter(i => i.finished)
          .sort(
            (a, b) => new Date(b.deadline_time) - new Date(a.deadline_time)
          )[0];
        this.lastEvent = lastEvent ? [lastEvent] : [];
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
