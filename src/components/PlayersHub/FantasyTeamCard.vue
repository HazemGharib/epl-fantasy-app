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
        <v-img
          aspect-ratio="1.2"
          min-height="700px"
          class="pitch"
          :src="require('@/assets/pitch.svg')"
        />
        <div class="starting">
          <div
            v-for="player in team.picks.filter(p => p.position < 12)"
            :key="player.element"
            :class="`pos-${player.position}`"
          >
            <v-img
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
          </div>
        </div>
        <div class="subs" style="height: 10rem">
          <div class="text-h6">Substitutes</div>
          <div
            v-for="player in team.picks.filter(p => p.position >= 12)"
            :key="player.element"
            :class="`pos-${player.position}`"
          >
            <v-img
              class="shirt"
              :src="
                [12].includes(player.position)
                  ? getPlayer(player.element).team_shirt_gk
                  : getPlayer(player.element).team_shirt
              "
            />
            <div class="placeholder">
              {{ getPlayer(player.element).name }}
            </div>
          </div>
        </div>
        <div class="mt-8">
          <div class="text-h6">Chips</div>
          <Chips :chips="team.chips" />
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { getPlayers, getFantasyTeam } from "@/services/playersHubService";
import { getToken } from "@/services/tokenService";
import Chips from "@/components/PlayersHub/Chips";
export default {
  name: "FantasyTeamCard",
  components: {
    Chips
  },
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
    getChipName(chip) {
      switch (chip) {
        case "wildcard":
          return "Wildcard";
        case "freehit":
          return "Free Hit";
        case "bboost":
          return "Bench Boost";
        case "3xc":
          return "Triple Captain";
        default:
          break;
      }
    },
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
        });
      });
    },
    getFantasyTeam(team) {
      getToken().then(({ data }) => {
        getFantasyTeam(data.token, team).then(({ data }) => {
          this.team = data.results;
        });
      });
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
.pos-1 {
  position: absolute;
  top: 5%;
  left: 47%;
}
.pos-2 {
  position: absolute;
  top: 20%;
  left: 20%;
}
.pos-3 {
  position: absolute;
  top: 20%;
  left: 40%;
}
.pos-4 {
  position: absolute;
  top: 20%;
  left: 55%;
}
.pos-5 {
  position: absolute;
  top: 20%;
  left: 75%;
}
.pos-6 {
  position: absolute;
  top: 40%;
  left: 20%;
}
.pos-7 {
  position: absolute;
  top: 40%;
  left: 40%;
}
.pos-8 {
  position: absolute;
  top: 40%;
  left: 55%;
}
.pos-9 {
  position: absolute;
  top: 40%;
  left: 75%;
}
.pos-10 {
  position: absolute;
  top: 55%;
  left: 35%;
}
.pos-11 {
  position: absolute;
  top: 55%;
  left: 60%;
}
.pos-12 {
  /* position: absolute; */
  float: left;
  margin: 1rem;
  top: 5%;
  left: 3%;
}
.pos-13 {
  /* position: absolute; */
  float: left;
  margin: 1rem;
  top: 30%;
  left: 3%;
}
.pos-14 {
  /* position: absolute; */
  float: left;
  margin: 1rem;
  top: 5%;
  left: 92%;
}
.pos-15 {
  /* position: absolute; */
  float: left;
  margin: 1rem;
  top: 30%;
  left: 92%;
}
</style>
