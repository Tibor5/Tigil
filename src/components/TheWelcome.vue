<template>
  <v-container fluid>
    <div align="center">
      <img alt="Tigil logo" class="logo" src="@/assets/TIGIL.png" width="256" height="256" />
    </div>

    <v-row align="center" justify="center" class="hero">
      <v-col cols="12" md="6">
        <h1 align="center">Verify truth.</h1>
      </v-col>
    </v-row>

    <v-container v-if="!isLoggedin" align="center">
      <h2>
        Register or Log in
      </h2>
      <v-btn rounded="xl" size="x-large" variant="tonal" icon="fa-solid fa-arrow-right-to-bracket" to="/register"></v-btn>
    </v-container>

    <v-row v-for="post in featuredPosts" :key="post.id">
      <v-col cols="12">
        <Post :post="post"/>
      </v-col>
    </v-row>

  </v-container>

  <v-spacer></v-spacer>
  <v-divider inset></v-divider>
  <v-spacer></v-spacer>

</template>

<script lang="ts">
import Post from "./Post.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth";

let auth: any;

export default {
  components: {
    Post,
  },
  data: () => ({
    isLoggedin: false,
    featuredPosts: [
      {
        id: 1,
        title: "How to Start with Vue.js",
        author: "John Doe",
        category: "Web dev",
        verificationStatus: false,
        content: "Learn how to start building applications with Vue.js in this beginner-friendly guide.",
      },
      {
        id: 2,
        title: "Deep Dive into Vuetify",
        author: "Jane Smith",
        category: "Front-end",
        verificationStatus: true,
        content: "Explore the components and capabilities of Vuetify, the popular Vue UI library."
      },
    ],
  }),
  mounted() {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedin = true;
      } else {
        this.isLoggedin = false;
      }
    });
  },
};
</script>
