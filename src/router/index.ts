import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/home",
    alias: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: () => import("../views/Statistics.vue")
  },
  {
    path: "/players",
    name: "PlayersHub",
    component: () => import("../views/PlayersHub.vue")
  },
  {
    path: "/events",
    name: "Events",
    component: () => import("../views/Events.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
