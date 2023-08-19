<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Create New Publication</h1>
      </v-col>
    </v-row>

    <NewPostForm></NewPostForm>

  </v-container>
</template>

<script lang="ts">
import NewPostForm from '../components/NewPostForm.vue';


export default {
  components: {
    NewPostForm,
  },
};
</script>

