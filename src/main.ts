import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueCookie from "vue-cookie";
import VueTapTarget from "vue-tap-target";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(VueCookie);
Vue.use(VueTapTarget);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
