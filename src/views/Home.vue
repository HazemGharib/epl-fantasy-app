<template>
  <div class="home">
    <v-alert v-if="updateAlert" class="ma-10" type="warning" border="left" dark>
      <strong>Website is being updated now</strong>
    </v-alert>

    <div v-if="news">
      <NewsCarousel :news="news" />
    </div>

    <div
      v-if="!players && !previousFixtures && !upcomingFixtures && !updateAlert"
      class="ma-16 text-center"
    >
      <v-progress-circular
        :size="100"
        :width="10"
        color="#37003c"
        indeterminate
      ></v-progress-circular>
    </div>

    <div
      v-if="
        !updateAlert &&
          players &&
          previousFixtures &&
          upcomingFixtures &&
          (currentEvent || nextEvent)
      "
    >
      <v-col cols="12" class="mt-4 mb-2">
        <v-col cols="12" class="font-weight-black text-h4 text-center">
          Fixtures
        </v-col>
        <v-col cols="12">
          <v-btn
            @click="showPreviousFixtures = !showPreviousFixtures"
            color="#37003c"
            class="mx-5"
            dark
          >
            {{ showPreviousFixtures ? "Upcoming" : "Previous" }}
          </v-btn>
        </v-col>
        <FixturesCard
          :teams="teams"
          :fixtures="showPreviousFixtures ? previousFixtures : upcomingFixtures"
          :players="players"
        />
      </v-col>
    </div>

    <v-row
      no-gutters
      v-if="!updateAlert && players && previousFixtures && upcomingFixtures"
    >
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="4"
        class="my-2"
        v-if="currentEvent && currentEvent.length"
      >
        <div class="font-weight-black text-h4 text-center">Current Event</div>
        <EventCard :event="currentEvent" :players="players" />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="4"
        class="my-2"
        v-if="nextEvent && nextEvent.length"
      >
        <div class="font-weight-black text-h4 text-center">Next Event</div>
        <EventCard :event="nextEvent" :players="players" />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="4"
        class="my-2"
        v-if="lastEvent && lastEvent.length"
      >
        <div class="font-weight-black text-h4 text-center">Last Event</div>
        <EventCard :event="lastEvent" :players="players" />
      </v-col>
    </v-row>

    <v-row
      no-gutters
      v-if="!updateAlert && players && previousFixtures && upcomingFixtures"
    >
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="4"
        class="mt-2 mb-2"
        v-if="players && goals"
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
        sm="12"
        md="6"
        lg="4"
        class="mt-2 mb-2"
        v-if="players && assists"
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
        sm="12"
        md="6"
        lg="4"
        class="mt-2 mb-2"
        v-if="players && cleanSheets"
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
import { getFixtures } from "@/services/fixturesService";
import { getNews } from "@/services/newsService";
import { getPlayers } from "@/services/playersHubService";
import { getStatistics } from "@/services/statisticsService";
import { getToken } from "@/services/tokenService";
import FixturesCard from "@/components/Home/FixturesCard";
import EventCard from "@/components/Home/EventCard";
import StatisticsCard from "@/components/Home/StatisticsCard";
import NewsCarousel from "@/components/Home/NewsCarousel";

export default {
  name: "Home",
  components: {
    FixturesCard,
    EventCard,
    StatisticsCard,
    NewsCarousel
  },
  data: () => ({
    showPreviousFixtures: false,
    updateAlert: false,
    news: undefined,
    players: undefined,
    goals: undefined,
    assists: undefined,
    cleanSheets: undefined,
    teams: undefined,
    upcomingFixtures: undefined,
    previousFixtures: undefined,
    currentEvent: undefined,
    nextEvent: undefined,
    lastEvent: undefined
  }),
  mounted() {
    getToken().then(({ data }) => {
      getNews(data.token).then(({ data }) => {
        if (data.results === "The game is being updated.")
          this.updateAlert = true;

        this.news = data.news;
      });

      getPlayers(data.token).then(({ data }) => {
        if (data.results === "The game is being updated.")
          this.updateAlert = true;

        this.players = data.results.map(p => ({
          id: p.id,
          // eslint-disable-next-line
          web_name: p.web_name,
          // eslint-disable-next-line
          full_name: `${p.first_name} ${p.last_name}`,
          // eslint-disable-next-line
          first_name: p.first_name,
          // eslint-disable-next-line
          last_name: p.last_name,
          photo: p.photo
        }));

        this.teams = data.teams.map(t => ({
          code: t.code,
          id: t.id,
          name: t.name,
          // eslint-disable-next-line @typescript-eslint/camelcase
          short_name: t.short_name,
          strength: t.strength,
          photo: t.photo
        }));
      });

      getStatistics(data.token).then(({ data }) => {
        if (data.results === "The game is being updated.")
          this.updateAlert = true;

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
      });

      getEvents(data.token)
        .then(({ data }) => {
          if (data.results === "The game is being updated.")
            this.updateAlert = true;

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
        })
        .then(async () => {
          const lastEventId = this.lastEvent[0]?.id;
          const upcomingEventId =
            this.currentEvent[0]?.id || this.nextEvent[0].id;

          const previousFixtures = await getFixtures(data.token, lastEventId);
          const upcomingFixtures = await getFixtures(
            data.token,
            upcomingEventId
          );

          this.upcomingFixtures = upcomingFixtures.data.results;
          this.previousFixtures = previousFixtures.data.results;
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
