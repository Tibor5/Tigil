<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderBar from './components/HeaderBar.vue'
import NavDrawer from './components/NavDrawer.vue'

</script>

<template>
  <v-app dark id="Tigil">
    <NavDrawer currentMenu="Home"/>
    <HeaderBar title="Tigil"/>

    <v-main>

      <v-container>
        <nav>
          <v-btn to="/about">About</v-btn>
          <v-btn to="/createpost">New Post</v-btn>
          <v-btn to="/explore">Explore</v-btn>
          <v-btn to="/">Home</v-btn>
          <v-btn to="/profile">My profile</v-btn>
          <v-btn to="/review">Review</v-btn>
          <v-btn to="/profile/settings">Settings</v-btn>
          <v-btn to="/register">Register or sign up</v-btn>
        </nav>
      </v-container>

      <RouterView />

    </v-main>

  </v-app>
</template>
