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

    <!-- User Activity Tabs -->
    <v-tabs
      v-model="currentTab"
      background-color="transparent"
      color="magenta"
      show-arrows
      centered
      grow
    >
      <v-tab v-for="tab in tabs"
        :key="tab.id"
        :value="tab.id"
      >
        {{ tab.name }}
      </v-tab>
    </v-tabs>

    <v-window v-model="currentTab">
      <v-window-item
        v-for="tab in tabs"
        :key="tab.id"
        :value="tab.id">

        <div v-for="item in currentContent" :key="item.id" class="mb-4">
          <v-card flat>
            <v-card-title>{{ item.title ? item.title : item.name }}</v-card-title>
            <v-card-subtitle>{{ item.author ? item.author : userName }}</v-card-subtitle>
            <v-card-text>{{ item.date }}</v-card-text>
            <v-card-actions>
              <v-btn icon text="Edit">
                <v-icon class="fa">fa-pen</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>

      </v-window-item>
    </v-window>
  </v-container>
</template>

<script lang="ts">
export default {
  data: () => ({
    currentTab: 1,
    userName: 'John Doe',
    userBio: 'Web developer and Vue.js enthusiast. Helping the community one post at a time.',
    tabs: [
      { id: 1, name: 'Questions', content: 'questions' },
      { id: 2, name: 'Answers', content: 'answers' },
      { id: 3, name: 'Publications', content: 'publications' },
      { id: 4, name: 'Following', content: 'following' },
      { id: 5, name: 'Followers', content: 'followers' },
    ],
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
  }),
  computed: {
    numOfTabs() {
      return this.tabs.length
    },
    currentContent() {
      const currentTab = this.tabs.find(tab => tab.id === this.currentTab);
      return currentTab ? this[currentTab.content] : [];
    },
  }
};
</script>

<style scoped>
.profile-image {
  max-width: 100%;
  border-radius: 50%;
}
</style>

