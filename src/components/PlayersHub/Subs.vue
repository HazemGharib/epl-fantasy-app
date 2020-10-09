<template>
  <v-row class="my-4" no-gutters>
    <v-col v-for="player in subs" :key="player.element">
      <v-img
        class="mx-auto mb-4 shirt"
        :src="
          [12].includes(player.position)
            ? getPlayer(player.element).team_shirt_gk
            : getPlayer(player.element).team_shirt
        "
      />
      <div
        class="pa-1 mx-2 text-center grey white--text rounded-lg placeholder"
      >
        <div>{{ getPlayer(player.element).web_name }}</div>
        <div>{{ player.points }}</div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Subs",
  props: {
    subs: {
      required: true
    },
    players: {
      required: true
    }
  },
  methods: {
    getPlayer(id) {
      return this.players.find(p => p.id === id);
    }
  }
};
</script>

<style scoped>
.placeholder {
  font-weight: bold;
}
.shirt {
  width: 60px;
}
@media screen and (max-width: 425px) {
  .shirt {
    width: 40px;
  }
  .placeholder {
    font-size: 10px;
    font-weight: normal;
  }
}
@media screen and (max-width: 320px) {
  .shirt {
    width: 40px;
  }
  .placeholder {
    font-size: 8px;
    font-weight: normal;
  }
}
</style>
