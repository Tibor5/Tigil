<template>
  <!-- Verify Identity & Credentials -->
  <!-- <v-row> -->
  <!--   <v-col cols="12"> -->
  <!--     <v-btn v-if="verifiedUser" @click="verifyIdentity">Verify Identity</v-btn> -->
  <!--   </v-col> -->
  <!-- </v-row> -->

  <!-- Post Title -->
  <v-row>
    <v-col cols="12" md="8">
      <v-text-field v-model="postTitle" label="Post Title" outlined></v-text-field>
      <v-list v-if="similarPublications.length">
        <!-- <v-list-item-group> -->
        <!--   <v-list-item v-for="post in similarPublications" :key="post.id"> -->
        <!--     <v-list-item-content label="Similar publications"> -->
        <!--       <v-list-item-title>{{ post.title }}</v-list-item-title> -->
        <!--     </v-list-item-content> -->
        <!--   </v-list-item> -->
        <!-- </v-list-item-group> -->
      </v-list>
    </v-col>
  </v-row>

  <!-- Post Content -->
  <v-row>
    <v-col cols="12" md="8">
      <v-textarea v-model="postContent" label="Write your post here..." outlined rows="10"></v-textarea>
    </v-col>
  </v-row>

  <!-- References -->
  <v-row>
    <v-col cols="12" md="8">
      <v-text-field v-model="reference" label="Add Reference URL" outlined @keyup.enter="addReference"></v-text-field>
      <v-list>
        <v-list-item v-for="(ref, index) in references" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ ref }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>

  <!-- Tags -->
  <v-row>
    <v-col cols="12" md="8">
      <v-combobox v-model="tags" label="Add Tags" outlined multiple hint="Add multiple tags related to your post" required></v-combobox>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12">
      <v-btn  :loading="creating" :disabled="creating" color="primary" @click="submitAndHome">Submit Publication</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { getAuth } from "firebase/auth";
import { db } from "@/firebase";
import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { useRouter } from "vue-router";

const router = useRouter();

export default {
  data() {
    return {
      creating: false,
      userID: "",
      postTitle: "",
      postContent: "",
      reference: "",
      references: [],
      tags: [],
      verifiedUser: true,
      similarPublications: [
        {
          id: 1,
          title: 'Dummy publication 1'
        }
      ]
    };
  },
  methods: {
    getUserId() {
      const authInstance = getAuth();
      let userId = "";

      db.collection('User')
        .where('name', '==', authInstance.currentUser.email.split('@')[0])
        .get()
        .then((query: any) => {
          if (query.empty) {
            alert('User not found');
            return;
          }

          const doc = query.docs[0];
          userId = doc.id;
        })
        .then(() => {
          if (!userId) {
            alert('User Error');
            return;
          }
          this.userID = userId;
        })
        .catch((error: any ) => {
          console.error("Error fetching user:", error);
        });
    },

    // checkSimilarPosts() {
    //   this.similarPublications = [
    //     { id: 1, title: "Sample Similar Post 1" },
    //     { id: 2, title: "Sample Similar Post 2" }
    //   ];
    // },
    addReference() {
      if (this.reference) {
        this.references.push(this.reference);
        this.reference = "";
      }
    },
    submitPost() {
      addDoc(collection(db, "Publication"), {
        title: this.postTitle,
        content: this.postContent,
        userID: this.getUserId,
        references: this.references,
        tags: this.tags
      });
    },
    submitAndHome() {
      this.submitPost();
      this.$router.push("/");
    }
  },
}
</script>
