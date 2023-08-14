<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderBar from './components/HeaderBar.vue'
import NavDrawer from './components/NavDrawer.vue'
import Form from './components/Form.vue'

</script>

<template>
  <v-app dark id="Tigil">
    <NavDrawer currentMenu="Home"/>
    <HeaderBar location="Home"/>

    <v-main class="d-flex align-center justify-center"
    style="min-height: 300px;">
      <div>
        <img alt="Vue logo" class="logo" src="@/assets/TIGIL.png" width="125" height="125" />
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    
      <RouterView />

    </v-main>

  </v-app>
</template>
