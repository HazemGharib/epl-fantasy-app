<template>
  <v-row>
    <v-col cols="0" sm="1" />
    <v-col v-for="chip in chips" :key="chip.name">
      <v-chip
        class="mx-auto"
        :color="chip.status_for_entry === 'available' ? 'success' : 'error'"
        link
      >
        {{ getChipName(chip.name) }}
      </v-chip>
    </v-col>
    <v-col cols="0" sm="1" />
  </v-row>
</template>

<script>
export default {
  name: "Chips",
  props: {
    chips: {
      required: true
    }
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
    }
  }
};
</script>
