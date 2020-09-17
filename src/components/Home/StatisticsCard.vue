<template>
  <div v-if="players" class="statisticsCard">
    <v-card class="ma-8 pa-4 text-center">
      <div
        v-for="info in [statistics[0]]"
        :key="info.id"
        class="font-weight-black text-h4 px-4 pt-4 pb-3"
      >
        <v-img :src="info.photo" class="ma-2 mx-auto" width="12rem" />
        {{ `${info.first_name} ${info.last_name}` }}
        <v-spacer />
        {{
          type === "goals"
            ? `${info.goals_scored}`
            : type === "assists"
            ? `${info.assists}`
            : `${info.clean_sheets}`
        }}
      </div>
      <div v-for="info in statistics.slice(1, 5)" :key="info.id">
        {{ `${info.first_name} ${info.last_name}` }}
        {{
          type === "goals"
            ? `${info.goals_scored}`
            : type === "assists"
            ? `${info.assists}`
            : `${info.clean_sheets}`
        }}
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "StatisticsCard",
  props: {
    statistics: {
      required: true
    },
    type: {
      required: true
    },
    players: {
      required: true
    }
  },
  methods: {
    getPlayer(id) {
      return this.$props.players.find(p => p.id === id);
    }
  }
};
</script>

<style scoped>
.statisticsCard div {
  color: #673d6b;
}
</style>
