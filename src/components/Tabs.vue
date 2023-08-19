<template>
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
</template>

<script lang="ts">
export default {
  props: {
    userName: String,
    userBio: String,
    tabs: {
      type: Object,
      required: true,
    },
    tabsData: {
      type: Object,
      required: true,
    }
  },

  data: () => ({
    currentTab: 1,
  }),

  computed: {
    numOfTabs() {
      return this.tabs.length;
    },
    currentContent() {
      const currentTab = this.tabs.find(tab => tab.id === this.currentTab);
      return currentTab ? this.tabsData[currentTab.content] : [];
    },
  },

}
</script>
