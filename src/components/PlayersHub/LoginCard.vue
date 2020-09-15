<template>
  <v-card :loading="loading" v-if="!team" class="pa-16">
    <template slot="progress">
      <v-progress-linear color="#37003c" indeterminate />
    </template>
    <v-alert v-if="error" border="left" color="error" dismissible dark>
      The username or password entered doesn't match any account.
    </v-alert>
    <v-text-field
      class="ma-2"
      placeholder="Username"
      :disabled="loading"
      v-model="username"
    />
    <v-text-field
      class="ma-2"
      placeholder="Password"
      type="password"
      :disabled="loading"
      v-model="password"
    />
    <v-btn
      @click="login()"
      :disabled="loading"
      :loading="loading"
      class="ma-2"
      color="#37003c"
      :dark="!loading"
      >Login</v-btn
    >
    <v-btn
      @click="clear()"
      :disabled="loading"
      class="ma-2"
      color="#37003c"
      outlined
      >Clear</v-btn
    >
  </v-card>
</template>

<script>
import { getFantasySession } from "@/services/playersHubService";
import { getToken } from "@/services/tokenService";
export default {
  name: "LoginCard",
  data() {
    return {
      loading: false,
      username: undefined,
      password: undefined,
      error: false
    };
  },
  props: {
    team: {
      required: true
    }
  },
  methods: {
    login() {
      this.loading = true;
      this.getFantasyTeam(this.username, this.password)
        .then(() => {
          this.error = false;
          this.loading = false;
        })
        .catch(() => {
          this.error = true;
          this.loading = false;
        });
    },
    clear() {
      this.username = "";
      this.password = "";
    },
    async getFantasyTeam(username, password) {
      const { token } = (await getToken()).data;
      const { session } = (
        await getFantasySession(token, { username, password })
      ).data;
      this.$emit("loginSuccess", { token, session });
    }
  }
};
</script>
