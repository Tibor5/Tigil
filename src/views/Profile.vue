<template>
  <v-container>
    <!-- User Profile Header -->
    <v-row class="mb-4">
      <v-col cols="12" md="2">
        <v-img src="/src/assets/logo.svg" class="profile-image"></v-img>
      </v-col>
      <v-col cols="12" md="8">
        <h2>{{ userName }}</h2>
        <p>{{ userBio }}</p>
        <v-btn color="primary">Follow</v-btn>
      </v-col>
    </v-row>

    <Tabs :userName="userName" :userBio="userBio" :tabs="tabs" :tabsData="tabsData"></Tabs>

  </v-container>
</template>

<script lang="ts">
import Tabs from '../components/Tabs.vue';

export default {

  components: {
    Tabs,
  },

  data: () => ({
    userName: 'John Doe',
    userBio: 'Web developer and Vue.js enthusiast. Helping the community one post at a time.',
    tabs: [
      { id: 1, name: 'Questions', content: 'questions' },
      { id: 2, name: 'Answers', content: 'answers' },
      { id: 3, name: 'Publications', content: 'publications' },
      { id: 4, name: 'Following', content: 'following' },
      { id: 5, name: 'Followers', content: 'followers' },
    ],
    tabsData: {
      questions: [
        {
          id: 1,
          title: 'How can I set up Vuetify with Nuxt.js?',
          date: '2023-04-12',
        },
        {
          id: 2,
          title: 'How to optimize performance in Vue applications?',
          date: '2023-05-10',
        },
      ],
      answers: [
        {
          id: 1,
          title: 'How is particle acceleration observed?',
          date: '2023-04-12',
        },
        {
          id: 2,
          title: 'Is there a way to build a microscope at home?',
          date: '2023-05-10',
        },
      ],
      publications: [
        {
          id: 1,
          title: 'X',
          author: 'John Doe',
          date: '2023-04-12',
        },
        {
          id: 2,
          title: 'Y',
          author: 'John Doe',
          date: '2023-05-10',
        },
      ],
      followers: [
        {
          id: 1,
          name: 'Cecil Vurnes'
        },
        {
          id: 2,
          name: 'Veronica Blake'
        },
      ],
      following: [
        {
          id: 1,
          name: 'Christina Schwimmer'
        },
        {
          id: 2,
          name: 'John Adams'
        },
      ],
    },
  }),
};
</script>

<style scoped>
.profile-image {
  max-width: 100%;
  border-radius: 50%;
}
</style>

