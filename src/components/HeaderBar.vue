<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title>{{ title }}</v-app-bar-title>
    <template v-slot:append>
      <v-btn v-if="!isLoggedin" icon="fa-solid fa-arrow-right-to-bracket" to="/register"></v-btn>
      <v-btn icon @click="toggleTheme">
        <v-icon class="fa" >{{ toggleThemeIcon }}</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useTheme } from 'vuetify';
import { computed } from 'vue';

export default {
  props: {
    title: String,
  },
  setup (props, context) {
    const theme = useTheme();

    const toggleThemeIcon = computed(() => {
      return theme.global.current.value.dark ? "fa-moon" : "fa-sun";
    });

    const toggleTheme = () => {
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
      context.emit('themeToggled', theme.global.name.value);
    }

    return {
      theme,
      toggleTheme,
      toggleThemeIcon
    }
  },
  data() {
    return {
      isLoggedin: false,
    }
  },
  mounted() {
    let auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedin = true;
      } else {
        this.isLoggedin = false;
      }
    });
  },
}
</script>

<style>
  .fa {
    font-style: normal !important;
  }
</style>
