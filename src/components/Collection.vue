<template>
  <div>
    <v-container>
      <v-list>
        <v-list-item-group v-if="collection">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ collection.name }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn large @click="dialog = true">
                Open
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
        <div v-else>No collection provided!</div>
      </v-list>
    </v-container>

    <v-dialog v-model="dialog" max-width="720px">
      <v-card v-if="collection">
        <v-card-title>{{ collection.name }}</v-card-title>
        <v-card-text>
          <div v-if="postsInCollection.length === 0">Collection is empty</div>
          <div v-else v-for="post in postsInCollection" :key="post.id">{{ post.title }} - {{ post.author }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { db } from "@/firebase";
import { doc, getDoc, collection } from "firebase/firestore";

interface Collection {
  id: string;
  userID: string,
  name: string;
  is_public: boolean;
  size: number,
  posts: string[];
}

export default {
  props: {
    collection: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    dialog: false,
    postsInCollection: [] as any[],
  }),
  methods: {
    async fetchPostData(postId: string) {
      try {
        const postRef = doc(db, 'Publication', postId);
        const docSnapshot = await getDoc(postRef);
        if (docSnapshot) {
          console.log('Fetched post data:', docSnapshot.data());
          return docSnapshot.data();
        } else {
          console.log("No such document!");
          return null;
        }
      } catch (error) {
        console.error("Error fetching post: ", error);
        return null;
      }
    },
    async storePostsData(collection: any) {
      const postsData = [];
      for (const postId of collection.posts) {
        const postData = await this.fetchPostData(postId);
        if (postData) {
          postsData.push(postData);
        }
      }
      this.postsInCollection = postsData;
    },
    openAndShowCollection() {
      console.log("Type of collection:" );
      console.log(typeof this.collection, this.collection);
      if (this.collection) {
        this.storePostsData(this.collection);
        this.dialog = true;
      }
    }
  },
  async mounted() {
    console.log('Shape of this.collection:', this.collection);
    this.storePostsData(this.collection);
    console.log(this.postsInCollection);
  },
  watch: {
    collection: {
      immediate: true,
      async handler(newCollection) {
        if (newCollection) {
          await this.storePostsData(newCollection);
        }
      }
    }
  }
}
</script>

