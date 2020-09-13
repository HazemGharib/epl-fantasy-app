<template>
  <div class="eventCard">
    <div class="ma-8" v-for="info in event" :key="info.name">
      <v-card class="pa-4 text-center">
        <div class="font-weight-black text-h4 px-4 pt-4 pb-3">
          {{ info.name }}
        </div>
        <div class="text-h6 font-italic">
          {{ new Date(info.deadline_time).toLocaleDateString("en-my") }}
        </div>
        <div>Average entry score: {{ info.average_entry_score }}</div>
        <div>Highest score: {{ info.highest_score || "N/A" }}</div>
        <div>
          Most selected:
          {{
            info.most_selected ? getPlayer(info.most_selected).full_name : "N/A"
          }}
        </div>
        <div>
          Most captained:
          {{
            info.most_captained
              ? getPlayer(info.most_captained).full_name
              : "N/A"
          }}
        </div>
        <div>
          Most vice captained:
          {{
            info.most_vice_captained
              ? getPlayer(info.most_vice_captained).full_name
              : "N/A"
          }}
        </div>
        <div>
          Top Player:
          {{ info.top_element ? getPlayer(info.top_element).full_name : "N/A" }}
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    event: {
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
.eventCard div {
  color: #673d6b;
}
</style>
