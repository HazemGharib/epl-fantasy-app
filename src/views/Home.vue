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
    <div class="mt-8 mb-16" v-if="currentEvent && currentEvent.length">
      <div class="font-weight-black text-h4 text-center">Current Event</div>
      <div class="ma-8" v-for="i in currentEvent" :key="i.name">
        <v-card class="pa-4 text-center">
          <div class="font-weight-black text-h4 px-4 pt-4 pb-3">
            {{ i.name }}
          </div>
          <div class="text-h6 font-italic">
            {{ new Date(i.deadline_time).toLocaleDateString("en-my") }}
          </div>
          <div>Average entry score: {{ i.average_entry_score }}</div>
          <div>Highest score: {{ i.highest_score || "N/A" }}</div>
          <div>
            Most selected:
            {{
              i.most_selected
                ? `${getPlayer(i.most_selected).first_name} ${
                    getPlayer(i.most_selected).last_name
                  }`
                : "N/A"
            }}
          </div>
          <div>
            Most captained:
            {{
              i.most_captained
                ? `${getPlayer(i.most_captained).first_name} ${
                    getPlayer(i.most_captained).last_name
                  }`
                : "N/A"
            }}
          </div>
          <div>
            Most vice captained:
            {{
              i.most_vice_captained
                ? `${getPlayer(i.most_vice_captained).first_name} ${
                    getPlayer(i.most_vice_captained).last_name
                  }`
                : "N/A"
            }}
          </div>
          <div>
            Top Player:
            {{
              i.top_element
                ? `${getPlayer(i.top_element).first_name} ${
                    getPlayer(i.top_element).last_name
                  }`
                : "N/A"
            }}
          </div>
        </v-card>
      </div>
    </div>
    <div class="mt-8 mb-16" v-if="nextEvent && nextEvent.length">
      <div class="font-weight-black text-h4 text-center">Next Event</div>
      <div class="ma-8" v-for="i in nextEvent" :key="i.name">
        <v-card class="pa-4 text-center">
          <div class="font-weight-black text-h4 px-4 pt-4 pb-3">
            {{ i.name }}
          </div>
          <div class="text-h6 font-italic">
            {{ new Date(i.deadline_time).toLocaleDateString("en-my") }}
          </div>
          <div>Average entry score: {{ i.average_entry_score }}</div>
          <div>Highest score: {{ i.highest_score || "N/A" }}</div>
          <div>
            Most selected:
            {{
              i.most_selected
                ? `${getPlayer(i.most_selected).first_name} ${
                    getPlayer(i.most_selected).last_name
                  }`
                : "N/A"
            }}
          </div>
          <div>
            Most captained:
            {{
              i.most_captained
                ? `${getPlayer(i.most_captained).first_name} ${
                    getPlayer(i.most_captained).last_name
                  }`
                : "N/A"
            }}
          </div>
          <div>
            Most vice_captained:
            {{
              i.most_vice_captained
                ? `${getPlayer(i.most_vice_captained).first_name} ${
                    getPlayer(i.most_vice_captained).last_name
                  }`
                : "N/A"
            }}
          </div>
          <div>
            Top Player:
            {{
              i.top_element
                ? `${getPlayer(i.top_element).first_name} ${
                    getPlayer(i.top_element).last_name
                  }`
                : "N/A"
            }}
          </div>
        </v-card>
      </div>
    </div>
    <div class="mt-8 mb-16" v-if="lastEvent && lastEvent.length">
      <div class="font-weight-black text-h4 text-center">Last Event</div>
      <div class="ma-8" v-for="i in lastEvent" :key="i.name">
        <v-card class="pa-4 text-center">
          <div class="font-weight-black text-h4 px-4 pt-4 pb-3">
            {{ i.name }}
          </div>
          <div class="text-h6 font-italic">
            {{ new Date(i.deadline_time).toLocaleDateString("en-my") }}
          </div>
          <div>Average entry score: {{ i.average_entry_score }}</div>
          <div>Highest score: {{ i.highest_score || "N/A" }}</div>
          <div>
            Most selected:
            {{
              i.most_selected
                ? `${getPlayer(i.most_selected).first_name} ${
                    getPlayer(i.most_selected).last_name
                  }`
                : "N/A"
            }}
          </div>
          <div>
            Most captained:
            {{
              i.most_captained
                ? `${getPlayer(i.most_captained).first_name} ${
                    getPlayer(i.most_captained).last_name
                  }`
                : "N/A"
            }}
          </div>
          <div>
            Most vice captained:
            {{
              i.most_vice_captained
                ? `${getPlayer(i.most_vice_captained).first_name} ${
                    getPlayer(i.most_vice_captained).last_name
                  }`
                : "N/A"
            }}
          </div>
          <div>
            Top Player:
            {{
              i.top_element
                ? `${getPlayer(i.top_element).first_name} ${
                    getPlayer(i.top_element).last_name
                  }`
                : "N/A"
            }}
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getEvents } from "@/services/eventsService";
import { getPlayers } from "@/services/playersHubService";
import { getToken } from "@/services/tokenService";
export default {
  name: "Home",
  components: {},
  data: () => ({
    players: undefined,
    currentEvent: undefined,
    nextEvent: undefined,
    lastEvent: undefined
  }),
  mounted() {
    getToken().then(({ data }) => {
      getPlayers(data.token).then(({ data }) => {
        this.players = data.results;
      });
    });

    getToken().then(({ data }) => {
      getEvents(data.token).then(({ data }) => {
        this.currentEvent = data?.results.filter(r => r.is_current);
        this.nextEvent = data?.results.filter(r => r.is_next);

        const lastEvent = data?.results
          .filter(i => i.finished)
          .sort(
            (a, b) => new Date(b.deadline_time) - new Date(a.deadline_time)
          )[0];
        this.lastEvent = lastEvent ? [this.lastEvent] : [];
      });
    });
  },
  methods: {
    getPlayer(id) {
      return this.players.find(p => p.id === id);
    }
  }
};
</script>

<style scoped>
.home div {
  color: #673d6b;
}
</style>
