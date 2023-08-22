<template>
  <!-- Post Title -->
  <v-row>
    <v-col cols="12" md="8">
      <v-text-field v-model="postTitle" label="Post Title" outlined></v-text-field>
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
      <v-text-field v-model="reference" label="Add Reference URL, and press enter" outlined @keyup.enter="addReference"></v-text-field>
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
      <v-btn  :loading="creating" :disabled="creating" color="primary" @click="submitAndHome">Submit</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { getAuth } from "firebase/auth";
import { collection, doc, addDoc, getDoc, FieldValue } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  data() {
    return {
      creating: false,
      userID: "",
      author: "",
      postTitle: "",
      postContent: "",
      reference: "",
      references: [] as string[],
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
  created() {
    this.getUserId();
    this.getUserName();
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
    async getUserName() {
      const docRef = doc(db, "User", this.userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        this.author = `${userData.firstname} ${userData.lastname}`;
      } else {
        console.log("No such document!");
      }
    },
    addReference() {
      if (this.reference) {
        this.references.push(this.reference);
        this.reference = "";
      }
    },
    submitPost() {
      addDoc(collection(db, 'Publication'), {
        title: this.postTitle,
        content: this.postContent,
        author: this.author,
        userID: this.userID,
        references: this.references,
        tags: this.tags,
        date: new Date(),
        verified: false,
      });
    },
    submitAndHome() {
      this.submitPost();
      this.$router.push("/");
    }
  },
}
</script>
