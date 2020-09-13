<template>
  <div>
    <div v-if="!team || !players" class="pa-16 text-center">
      <v-progress-circular
        :size="100"
        :width="10"
        color="#37003c"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-card v-if="team">
      <v-container>
        <v-img class="pitch" :src="require('@/assets/pitch.svg')" />
        <div>
          <div
            v-for="player in team.picks"
            :key="player.element"
            :class="`pos-${player.position}`"
          >
            <v-img :src="getPlayer(player.element).team_shirt" width="50" />
            <div class="placeholder">{{ getPlayer(player.element).name }}</div>
          </div>
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { getPlayers, getFantasyTeam } from "@/services/playersHubService";
import { getToken } from "@/services/tokenService";
export default {
  name: "FantasyTeamCard",
  data() {
    return {
      players: undefined,
      team: undefined
    };
  },
  mounted() {
    this.getAllPlayers();
    this.getFantasyTeam(process.env.VUE_APP_FANTASY_TEAM_ID);
  },
  methods: {
    getPlayer(id) {
      return this.players.find(p => p.id === id);
    },
    getAllPlayers() {
      getToken().then(({ data }) => {
        getPlayers(data.token).then(({ data }) => {
          this.players = data?.results.map(p => ({
            ...p,
            name: `${p.first_name} ${p.last_name}`,
            cost: p.cost / 10,
            // eslint-disable-next-line
          chance_of_playing_next_round: p.chance_of_playing_next_round !== null
                ? p.chance_of_playing_next_round
                : ""
          }));
          console.log(this.players);
        });
      });
    },
    getFantasyTeam(team) {
      getToken().then(({ data }) => {
        getFantasyTeam(data.token, team).then(({ data }) => {
          this.team = data.results;
          console.log(this.team);
        });
      });
    }
  }
};
</script>
<style scoped>
.placeholder {
  color: #fff;
  background-color: #00000066;
  padding: 0.4rem;
  margin: 0.4rem -25%;
  width: fit-content;
  border-radius: 0.4rem;
  font-size: 14px;
  font-weight: bold;
}
.pos-1 {
  position: absolute;
  top: 5%;
  left: 47%;
}
.pos-2 {
  position: absolute;
  top: 25%;
  left: 20%;
}
.pos-3 {
  position: absolute;
  top: 25%;
  left: 40%;
}
.pos-4 {
  position: absolute;
  top: 25%;
  left: 55%;
}
.pos-5 {
  position: absolute;
  top: 25%;
  left: 75%;
}
.pos-6 {
  position: absolute;
  top: 50%;
  left: 20%;
}
.pos-7 {
  position: absolute;
  top: 50%;
  left: 40%;
}
.pos-8 {
  position: absolute;
  top: 50%;
  left: 55%;
}
.pos-9 {
  position: absolute;
  top: 50%;
  left: 75%;
}
.pos-10 {
  position: absolute;
  top: 75%;
  left: 35%;
}
.pos-11 {
  position: absolute;
  top: 75%;
  left: 60%;
}
.pos-12 {
  position: absolute;
  top: 5%;
  left: 3%;
  width: 5%;
}
.pos-13 {
  position: absolute;
  top: 30%;
  left: 3%;
  width: 5%;
}
.pos-14 {
  position: absolute;
  top: 5%;
  left: 92%;
  width: 5%;
}
.pos-15 {
  position: absolute;
  top: 30%;
  left: 92%;
  width: 5%;
}
</style>
