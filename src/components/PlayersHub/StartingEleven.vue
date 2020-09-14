<template>
  <div class="starting">
    <v-row>
      <v-col
        justify="space-around"
        align="center"
        v-for="player in team.filter(
          p => getPlayer(p.element).position_short === 'GKP'
        )"
        :key="player.element"
      >
        <v-badge
          color="black"
          v-if="player.is_captain || player.is_vice_captain"
          bottom
          overlap
          :content="getPlayerBadge(player)"
        >
          <v-img
            class="shirt"
            :src="
              [1].includes(player.position)
                ? getPlayer(player.element).team_shirt_gk
                : getPlayer(player.element).team_shirt
            "
          />
        </v-badge>
        <v-img
          v-else
          class="shirt"
          :src="
            [1].includes(player.position)
              ? getPlayer(player.element).team_shirt_gk
              : getPlayer(player.element).team_shirt
          "
        />
        <div class="placeholder">
          {{ getPlayer(player.element).name }}
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        justify="space-around"
        align="center"
        v-for="player in team.filter(
          p => getPlayer(p.element).position_short === 'DEF'
        )"
        :key="player.element"
      >
        <v-badge
          color="black"
          v-if="player.is_captain || player.is_vice_captain"
          bottom
          overlap
          :content="getPlayerBadge(player)"
        >
          <v-img
            class="shirt"
            :src="
              [1].includes(player.position)
                ? getPlayer(player.element).team_shirt_gk
                : getPlayer(player.element).team_shirt
            "
          />
        </v-badge>
        <v-img
          v-else
          class="shirt"
          :src="
            [1].includes(player.position)
              ? getPlayer(player.element).team_shirt_gk
              : getPlayer(player.element).team_shirt
          "
        />
        <div class="placeholder">
          {{ getPlayer(player.element).name }}
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        justify="space-around"
        align="center"
        v-for="player in team.filter(
          p => getPlayer(p.element).position_short === 'MID'
        )"
        :key="player.element"
      >
        <v-badge
          color="black"
          v-if="player.is_captain || player.is_vice_captain"
          bottom
          overlap
          :content="getPlayerBadge(player)"
        >
          <v-img
            class="shirt"
            :src="
              [1].includes(player.position)
                ? getPlayer(player.element).team_shirt_gk
                : getPlayer(player.element).team_shirt
            "
          />
        </v-badge>
        <v-img
          v-else
          class="shirt"
          :src="
            [1].includes(player.position)
              ? getPlayer(player.element).team_shirt_gk
              : getPlayer(player.element).team_shirt
          "
        />
        <div class="placeholder">
          {{ getPlayer(player.element).name }}
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        justify="space-around"
        align="center"
        v-for="player in team.filter(
          p => getPlayer(p.element).position_short === 'FWD'
        )"
        :key="player.element"
      >
        <v-badge
          color="black"
          v-if="player.is_captain || player.is_vice_captain"
          bottom
          overlap
          :content="getPlayerBadge(player)"
        >
          <v-img
            class="shirt"
            :src="
              [1].includes(player.position)
                ? getPlayer(player.element).team_shirt_gk
                : getPlayer(player.element).team_shirt
            "
          />
        </v-badge>
        <v-img
          v-else
          class="shirt"
          :src="
            [1].includes(player.position)
              ? getPlayer(player.element).team_shirt_gk
              : getPlayer(player.element).team_shirt
          "
        />
        <div class="placeholder">
          {{ getPlayer(player.element).name }}
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "StartingEleven",
  props: {
    team: {
      required: true
    },
    players: {
      required: true
    }
  },
  methods: {
    getPlayer(id) {
      return this.players.find(p => p.id === id);
    },
    getPlayerBadge(player) {
      if (player.is_captain) return "C";
      else if (player.is_vice_captain) return "V";
      else return "";
    }
  }
};
</script>

<style scoped>
.starting {
  background: url("http://localhost:8080/img/pitch.41c3cb4c.svg") no-repeat;
  background-position: 50%;
  background-size: cover;
}
.placeholder {
  color: #fff;
  text-align: center;
  background-color: #00000066;
  padding: 0.4rem;
  margin: 0.4rem -30%;
  width: fit-content;
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
    margin: 0.4rem -10%;
    padding: 4px;
  }
}
@media screen and (max-width: 375px) {
  .shirt {
    width: 40px;
  }
  .placeholder {
    font-size: 8px;
    font-weight: normal;
    width: min-content;
    padding: 4px;
  }
}
@media screen and (max-width: 320px) {
  .shirt {
    width: 30px;
  }
  .placeholder {
    font-size: 7px;
    font-weight: normal;
    width: 30px;
    padding: 2px;
  }
}
</style>
