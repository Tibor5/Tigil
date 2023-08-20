<template>
  <v-container align="center" justify="start">
    <h1>Create New Publication</h1>
  </v-container>

  <v-main>
    <NewPostForm/>
  </v-main>
</template>

<script lang="ts">
import NewPostForm from '../components/NewPostForm.vue';


export default {
  components: {
    NewPostForm,
  },
};
</script>

