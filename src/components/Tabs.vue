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

      <template v-if="tab.content === 'publications'">
        <div v-for="pub in tabsData.publications" :key="pub.id" class="mb-4">
          <Post :post="pub"></Post>
        </div>
      </template>

      <template v-if="tab.content === 'collections'">
        <div v-for="co in tabsData.collections" :key="co.id" class="mb-4">
          <Collection :data="collections"></Collection>
        </div>
      </template>

      <template v-else>
        <div v-for="item in currentContent" :key="item.id" class="mb-4">
          <v-card flat>
            <v-card-title>{{ item.title ? item.title : item.name }}</v-card-title>
            <v-card-subtitle>{{ item.author }}</v-card-subtitle>
            <v-card-text>{{ item.date }}</v-card-text>
            <v-card-actions>
              <v-btn icon text="Read">
                <v-icon class="fa">fa-arrow-down</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </template>

    </v-window-item>
  </v-window>
</template>

<script lang="ts">
import Post from "./Post.vue"
import Collection from "./Collection.vue"
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  components: {
    Post,
  },
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
    currentTab: 3,
    collections: [] as object[],
  }),
  computed: {
    numOfTabs() {
      return this.tabs.length;
    },
    currentContent() {
      const currentTab = this.tabs.find((tab: any) => tab.id === this.currentTab);
      return currentTab ? this.tabsData[currentTab.content] : [];
    },
  },
  methods: {
    async loadCollections() {
      const collectionsRef = collection(db, 'Collection');
      const snapshot = await getDocs(collectionsRef);

      this.collections = snapshot.docs.map(doc => {
        return { 
          id: doc.id,
          ...doc.data()
          // UserID: doc.UserID, 
          // name: doc.name,
          // is_public: doc.is_public,
          // size: doc.size,
          // publications: doc.publicationIDs,
        };
      });
    },
  }

}
</script>
