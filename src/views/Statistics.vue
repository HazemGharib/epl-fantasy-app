<template>
  <div class="ma-6">
    <v-tabs
      slider-size="4"
      v-model="tab"
      background-color="transparent"
      color="#f7003c"
      grow
    >
      <v-tabs-slider color="#f7003c"></v-tabs-slider>
      <v-tab key="standings">Standings</v-tab>
      <v-tab key="statistics">Statistics</v-tab>
    </v-tabs>

    <v-tabs-items touchless v-model="tab">
      <v-tab-item key="standings">
        <StandingsTable :standings="standings" />
      </v-tab-item>
      <v-tab-item key="statistics">
        <StatisticsTable :statistics="statistics" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { getStandings, getStatistics } from "@/services/statisticsService";
import { getToken } from "@/services/tokenService";
import StandingsTable from "@/components/Statistics/StandingsTable";
import StatisticsTable from "@/components/Statistics/StatisticsTable";
export default {
  components: {
    StandingsTable,
    StatisticsTable
  },
  data() {
    return {
      standings: undefined,
      statistics: undefined,
      tab: undefined
    };
  },
  mounted() {
    getToken().then(({ data }) => {
      getStandings(data.token).then(({ data }) => {
        this.standings = data.eplTable;
      });

      getStatistics(data.token).then(({ data }) => {
        this.statistics = data.results.map(p => ({
          ...p,
          // eslint-disable-next-line
          player_name: `${p.first_name} ${p.last_name}`
        }));
      });
    });
  }
};
</script>
