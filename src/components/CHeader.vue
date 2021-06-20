<template>
  <v-app-bar dark color="primary">
    <v-app-bar-nav-icon
      v-if="isHome"
      @click="setSideBar(!sideBar)"
    ></v-app-bar-nav-icon>

    <v-btn v-if="!isHome" icon @click="$router.go(-1)">
      <v-icon>arrow_back</v-icon>
    </v-btn>

    <v-toolbar-title class="white--text">Bookstore</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-badge left overlap color="orange">
        <span slot="badge">1</span>
        <v-icon>shopping_cart</v-icon>
      </v-badge>
    </v-btn>

    <v-text-field
      v-if="isHome"
      slot="extension"
      hide-details
      append-icon="mic"
      text
      label="Search"
      prepend-inner-icon="search"
      solo-inverted
    ></v-text-field>
  </v-app-bar>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "c-header",
  methods: {
    ...mapActions({
      setSideBar: "setSideBar",
    }),
  },
  computed: {
    ...mapGetters({
      sideBar: "sideBar",
    }),
    isHome() {
      return this.$route.path === "/";
    },
  },
};
</script>