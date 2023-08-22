<template>
  <v-card variant="tonal">
    <v-card-title>
      <v-row no-gutters>
        <v-col class="text-start">{{ post.title }}</v-col>
        <v-col class="text-end">
          <v-btn>
            {{ post.verified ? "Verified" : "Unverified" }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle>
      {{ post.author }}
    </v-card-subtitle>
    <v-card-text>
      {{ peekContent }}
      <v-spacer></v-spacer>
      <v-chip small label color="primary">
        Subscribe {{ post.tags }}
      </v-chip>
    </v-card-text>
    <v-card-actions>
      <v-btn small color="primary" @click="viewFullPost">
        Read more
      </v-btn>

      <v-spacer></v-spacer>

      <!-- Save -->
      <v-btn icon @click="showSaveDialog = true">
        <v-icon class="fa">fa-bookmark</v-icon>
      </v-btn>
      <v-dialog v-model="showSaveDialog" max-width="500px">
        <v-card>
          <v-card-title>Save to Collection</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item-group v-if="collections.length" v-model="selectedCollection">
                <v-list-item v-for="collection in collections" :key="collection.id" :value="collection.id" @click="selectedCollection = collection.id">
                  <v-list-item-content>
                    <v-list-item-title>{{ collection.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
              <div v-else>No collections found. Create one!</div>
            </v-list>
            <v-btn @click="showCreateCollection = true">Create New Collection</v-btn>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="saveToCollection">Save</v-btn>
            <v-btn @click="showSaveDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Create Collection Dialog (nested inside Save Dialog) -->
      <v-dialog v-model="showCreateCollection" max-width="400px">
        <v-card>
          <v-card-title>Create New Collection</v-card-title>
          <v-card-text>
            <v-text-field label="Collection Name" v-model="newCollectionName"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="createCollection">Create</v-btn>
            <v-btn @click="showCreateCollection = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Share -->
      <v-btn icon @click="sharePost">
        <v-icon class="fa">fa-share-nodes</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { getAuth } from "firebase/auth"
import { doc, addDoc, getDocs, collection, updateDoc, arrayUnion, query, where } from "firebase/firestore";
import { db } from "@/firebase";

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
    post: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    userID: "",
    showSaveDialog: false,
    showCreateCollection: false,
    collections: [] as Collection[],
    selectedCollection: "",
    newCollectionName: ''
  }),
  computed: {
    peekContent() {
      return `${this.post.content.substring(0, 100)}...`;
    }
  },
  created() {
    this.getUserId();
    this.fetchCollections();
  },
  methods: {
    getUserId() {
      const auth= getAuth();
      const uid = auth.currentUser ? auth.currentUser.uid : null;

      if (uid) {
        console.log("Found user ID.");
        this.userID = uid!;
      } else {
        console.error("User ID not found");
      }
    },
    async saveToCollection() {
      try {
        const collectionRef = doc(db, 'Collection', this.selectedCollection);
        await updateDoc(collectionRef, {
          posts: arrayUnion(this.post.id)
        });
        this.showSaveDialog = false;
        alert("Post added to collection successfully!");
      } catch (error) {
        console.error("Error saving post to collection: ", error);
        alert("Failed to save post to collection.");
      }
    },
    async createCollection() {
      try {
        const newCollectionRef = await addDoc(collection(db, 'Collection'), {
          userID: this.userID,
          name: this.newCollectionName,
          is_public: false,
          size: 0,
          posts: []
        });

        this.collections.push({
          id: newCollectionRef.id,
          userID: this.userID,
          name: this.newCollectionName,
          is_public: false,
          size: 0,
          posts: []
        });
        this.showCreateCollection = false;
        alert("Collection created successfully!");

      } catch (error) {
        console.error("Error creating collection: ", error);
        alert("Failed to create new collection.");
      }
    },
    async fetchCollections() {
      const q = query(collection(db, "Collection"), where("userID", "==", this.userID));
      const querySnapshot = await getDocs(q);

      const collections: any = [];
      querySnapshot.forEach((doc) => {
        collections.push({
          id: doc.id,
          ...doc.data()
        } as Collection);
      });

      this.collections = collections;
    },
    sharePost() {
      if (navigator.share) {
        navigator.share({
          title: this.post.title,
          text: this.peekContent, // or any other descriptive text
          // If your posts have URLs, you can add this:
          // url: `https://yourwebsite.com/posts/${this.post.id}`
        })
          .then(() => {
            console.log('Post shared successfully');
          })
          .catch((error) => {
            console.error('Error sharing post:', error);
          });
      } else {
        alert('Your browser does not support native share functionality. Please copy the link manually.');
      }
    },
    viewFullPost() {
      // Navigate to the full post
      console.log("~~~~~ VIEW POST!")
    },
  }
}
</script>

