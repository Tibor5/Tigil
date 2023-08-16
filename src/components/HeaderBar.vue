<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title>{{ title }}</v-app-bar-title>
    <template v-slot:append>
      <v-btn icon><v-icon class="fa">fa-search</v-icon></v-btn>
      <!-- { icon: 'fa-bell', title: 'Notifications', value: 'notifications', to:'' }, -->
      <v-btn icon><v-icon class="fa">fa-bell</v-icon></v-btn>
      <v-btn icon><v-icon class="fa">fa-ellipsis-vertical</v-icon></v-btn>
      <v-btn icon @click="toggleTheme">
        <v-icon class="fa" >{{ toggleThemeIcon }}</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { useTheme } from 'vuetify';
import { ref, computed } from 'vue';

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
}
</script>

<style>
  .fa {
    font-style: normal !important;
  }
</style>
