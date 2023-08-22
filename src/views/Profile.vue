<template>
  <v-container>
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
  </v-container>

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

      <template v-else-if="tab.content === 'collections'">
        <div v-for="co in tabsData.collections" :key="co.id" class="mb-4">
          <Collection :collection="co"></Collection>
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
import { doc, getDocs, getDoc, collection, FieldValue } from 'firebase/firestore';
import { db } from "@/firebase";
import { getAuth } from "firebase/auth";
import Post from "../components/Post.vue";
import Collection from "../components/Collection.vue";

interface Collection {
  id: string;
  userID: string,
  name: string;
  is_public: boolean;
  size: number,
  posts: string[];
}

export default {
  components: {
    Post,
    Collection
  },
  mounted() {
    this.getUserName();
    this.loadInitialPublications();
    this.loadUserCollections();
    console.log(this.collections)
  },
  data: () => ({
    firstname: "",
    lastname: "",
    userName: "",
    author: "",
    userBio: 'Physics enthusiast. Helping the community one post at a time.',
    currentTab: 3,
    collections: [] as Collection[],
    tabs: [
      { id: 1, name: 'Questions', content: 'questions' },
      { id: 2, name: 'Comments', content: 'comments' },
      { id: 3, name: 'Publications', content: 'publications' },
      { id: 4, name: 'Collections', content: 'collections' },
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
      comments: [
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
      publications: [] as object[],
      collections: [] as Collection[],
    } as { [key: string]: any[] },
  }),
  methods: {
    async loadInitialPublications() {
      try {
        const querySnapshot = await getDocs(collection(db, "Publication")); 
        const publications: any = [];
        querySnapshot.forEach((doc) => {
          const publicationData = doc.data();
          publications.push({
            id: doc.id,
            title: publicationData.title,
            content: publicationData.content,
            author: publicationData.author,
            userID: publicationData.userID,
            date: publicationData.date.toDate().toISOString().split('T')[0],
            verified: publicationData.verified,
            tags: publicationData.tags,
          });
        });
        this.tabsData.publications = publications;
      } catch (error) {
        console.error("Error fetching publications:", error);
      }
    },
    async getUserName() {
      const auth = getAuth();
      const uid = auth.currentUser ? auth.currentUser.uid as string : null;
      let docRef;
      if (uid) {
        docRef = doc(db, "User", uid);
      }
      const docSnap = await getDoc(docRef!);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const fullName = `${userData.firstname} ${userData.lastname}`;
        this.userName = fullName;
      } else {
        console.log("No such document!");
      }
    },
    async loadUserCollections() {
      try {
        const collectionsRef = collection(db, 'Collection');
        const snapshot = await getDocs(collectionsRef);

        this.tabsData.collections = snapshot.docs.map(doc => {
          const data = doc.data();

          return { 
            id: doc.id,
            userID: data.userID,
            name: data.name,
            is_public: data.is_public,
            size: data.size,
            posts: data.posts || [], 
          } as Collection;
        });
        console.log("Loaded collections:", this.tabsData.collections);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    }
  },
  computed: {
    numOfTabs() {
      return this.tabs.length;
    },
    currentContent() {
      const currentTab = this.tabs.find((tab: any) => tab.id === this.currentTab);
      return currentTab ? this.tabsData[currentTab.content] : [];
    },
  },
};
</script>

<style scoped>
.profile-image {
max-width: 100%;
border-radius: 50%;
}
</style>

