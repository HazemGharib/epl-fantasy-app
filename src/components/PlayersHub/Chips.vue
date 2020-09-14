<template>
  <div>
    <v-chip
      class="ma-2"
      :color="chip.status_for_entry === 'available' ? 'success' : 'error'"
      link
      v-for="chip in chips"
      :key="chip.name"
    >
      {{ getChipName(chip.name) }}
    </v-chip>
  </div>
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
