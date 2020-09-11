<template>
  <v-app>
    <v-app-bar app color="#37003c" dark>
      <v-img
        alt="Vuetify Logo"
        class="logo shrink mr-2"
        contain
        :src="require('./assets/logo.svg')"
        transition="altscale-transition"
        width="68"
        height="68"
      />
      <h1 class="w-title ml-2 d-none d-xl-flex d-lg-flex d-md-flex">
        Fantasy Premier League
      </h1>
      <h4 class="w-title ml-2 d-flex d-xl-none d-lg-none d-md-none">
        Fantasy Premier League
      </h4>

      <v-spacer></v-spacer>

      <v-btn
        class="ml-2 d-none d-xl-flex d-lg-flex d-md-flex d-sm-flex"
        to="/home"
        outlined
      >
        <span>Home</span>
      </v-btn>
      <v-btn
        class="ml-2 d-none d-xl-flex d-lg-flex d-md-flex d-sm-flex"
        to="/statistics"
        outlined
      >
        <span>Statistics</span>
      </v-btn>
      <v-btn
        class="ml-2 d-none d-xl-flex d-lg-flex d-md-flex d-sm-flex"
        to="/players"
        outlined
      >
        <span>Players Hub</span>
      </v-btn>
      <v-btn
        class="ml-2 d-none d-xl-flex d-lg-flex d-md-flex d-sm-flex"
        to="/events"
        outlined
      >
        <span>Events</span>
      </v-btn>
    </v-app-bar>

    <v-main class="v-main">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  components: {},

  data: () => ({
    //
  })
});
</script>

<style scoped>
.v-main {
  background-color: aliceblue;
}
.logo {
  background-color: white;
  border-radius: 100%;
}
.w-title {
  font-family: PremierSans-Bold, Arial, "Helvetica Neue", Helvetica, sans-seriff;
  font-weight: bolder;
}
</style>
