<template>
  <div class="ma-4">
    <v-alert v-if="updateAlert" class="ma-10" type="warning" border="left" dark>
      <strong>Website is being updated now</strong>
    </v-alert>

    <v-tabs
      v-if="!updateAlert"
      slider-size="4"
      v-model="tab"
      background-color="transparent"
      color="#f7003c"
      grow
    >
      <v-tabs-slider color="#f7003c"></v-tabs-slider>
      <v-tab key="standingsTab">Standings</v-tab>
      <v-tab key="statisticsTab">Statistics</v-tab>
    </v-tabs>

    <v-tabs-items touchless v-model="tab">
      <v-tab-item key="standingsTab">
        <StandingsTable :standings="standings" />
      </v-tab-item>
      <v-tab-item key="statisticsTab">
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
      updateAlert: false,
      standings: undefined,
      statistics: undefined,
      tab: undefined
    };
  },
  mounted() {
    getToken().then(({ data }) => {
      getStandings(data.token).then(({ data }) => {
        if (data.results === "The game is being updated.")
          this.updateAlert = true;

        this.standings = data.eplTable;
      });

      getStatistics(data.token).then(({ data }) => {
        if (data.results === "The game is being updated.")
          this.updateAlert = true;

        this.statistics = data.results
          .map(p => ({
            ...p,
            // eslint-disable-next-line
          player_name: `${p.first_name} ${p.last_name}`
          }))
          .sort((p1, p2) => p1.threat_rank - p2.threat_rank);
      });
    });
  }
};
</script>
