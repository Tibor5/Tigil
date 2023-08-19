<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderBar from './components/HeaderBar.vue'
import NavDrawer from './components/NavDrawer.vue'

</script>

<template>
  <v-app dark id="Tigil">
    <NavDrawer currentMenu="Home" />
    <HeaderBar title="Tigil" />

    <v-main>

      <v-container class="" fluid>
        <v-row no-gutters>
          <v-col-auto cols="12">
            <v-btn class="pa-2 ma-2"><RouterLink to="/about">About</RouterLink></v-btn>
            <v-btn class="pa-2 ma-2"><RouterLink to="/createpost">New Post</RouterLink></v-btn>
            <v-btn class="pa-2 ma-2"><RouterLink to="/explore">Explore</RouterLink></v-btn>
            <v-btn class="pa-2 ma-2"><RouterLink to="/">Home</RouterLink></v-btn>
            <v-btn class="pa-2 ma-2"><RouterLink to="/profile">My profile</RouterLink></v-btn>
            <v-btn class="pa-2 ma-2"><RouterLink to="/review">Review</RouterLink></v-btn>
            <v-btn class="pa-2 ma-2"><RouterLink to="/profile/settings">Settings</RouterLink></v-btn>
            <v-btn class="pa-2 ma-2"><RouterLink to="/register">Register or sign up</RouterLink></v-btn>
          </v-col-auto>
        </v-row>
      </v-container>

      <RouterView />

    </v-main>

  </v-app>
</template>
