<script setup lang="ts">
defineProps<{
  location: string
}>()
</script>

<template>
  <v-app-bar title="{{ location }}" :elevation="2">
    <template v-slot:append>
      <v-btn icon="mdi-heart"></v-btn>
      <v-btn icon="mdi-magnify"></v-btn>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
</template>
