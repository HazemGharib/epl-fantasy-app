<template>
  <div class="subs">
    <div v-for="player in subs" :key="player.element">
      <v-img
        class="shirt"
        :src="
          [12].includes(player.position)
            ? getPlayer(player.element).team_shirt_gk
            : getPlayer(player.element).team_shirt
        "
      />
      <div class="placeholder">
        <div>{{ getPlayer(player.element).last_name }}</div>
        <div>{{ player.points }}</div>
      </div>
    </div>
  </div>
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
  color: #fff;
  text-align: center;
  background-color: #00000066;
  padding: 0.4rem;
  margin: 0.4rem 5%;
  width: max-content;
  border-radius: 0.4rem;
  font-size: 14px;
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
    width: min-content;
    margin: 0.4rem 10%;
    padding: 4px;
  }
}
@media screen and (max-width: 320px) {
  .shirt {
    width: 40px;
  }
  .placeholder {
    font-size: 8px;
    font-weight: normal;
    width: min-content;
    margin: 0.4rem 10%;
    padding: 4px;
  }
}
.subs {
  height: 8rem;
  display: flex;
  justify-content: space-around;
}
</style>
