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
        @click.stop="drawer = !drawer"
      />
      <h1 class="w-title ml-2 d-none d-xl-flex d-lg-flex d-md-flex">
        Fantasy Premier League
      </h1>
      <h4 class="w-title ml-2 d-flex d-xl-none d-lg-none d-md-none">
        Fantasy Premier League
      </h4>

      <v-spacer></v-spacer>

      <v-btn
        v-for="link in links"
        :key="link.text"
        :to="link.url"
        link
        outlined
        class="ml-2 d-none d-xl-flex d-lg-flex d-md-flex d-sm-flex"
      >
        <span>{{ link.text }}</span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer color="whitesmoke" v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h4">Menu</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          color="#673d6b"
          light
          v-for="link in links"
          :key="link.text"
          :to="link.url"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

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
    drawer: null,
    links: [
      { url: "/home", text: "Home", icon: "mdi-home" },
      { url: "/statistics", text: "Statistics", icon: "mdi-numeric" },
      { url: "/players", text: "Players Hub", icon: "mdi-stadium" },
      { url: "/events", text: "Events", icon: "mdi-calendar-star" }
    ]
  })
});
</script>

<style scoped>
@font-face {
  font-family: "PremierSans";
  src: local("PremierSans"), url("./fonts/Premier Sans.ttf") format("truetype");
}

.v-main {
  background-color: whitesmoke;
}
.logo {
  cursor: pointer;
  background-color: white;
  border-radius: 100%;
  box-shadow: 0px 8px 20px 0px #000000c0;
}
.w-title {
  font-family: PremierSans;
  font-weight: 100;
  font-size: xxx-large;
}

@media screen and (max-width: 910px) {
  .w-title {
    font-size: x-large;
  }
}
</style>
