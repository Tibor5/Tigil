<template>
  <v-container fluid>
    <div>
      <img alt="Tigil logo" class="logo" src="@/assets/TIGIL.png" width="256" height="256" />
    </div>

    <v-row align="center" justify="left" class="hero">
      <v-col cols="12" md="6">
        <h1>Welcome to Tigil</h1>
        <p>Seek truth together.</p>
        <v-btn large color="primary">Get Started</v-btn>
      </v-col>
    </v-row>

    <v-container v-for="post in featuredPosts" :key="post.id">
      <Post :post="post"/>
    </v-container>

    <!-- <v-row align="center" justify="center"> -->
    <!--   <v-col v-for="post in featuredPosts" :key="post.id" cols="12" md="4"> -->
    <!--     <v-card> -->
    <!--       <v-card-title>{{ post.title }}</v-card-title> -->
    <!--       <v-card-subtitle>{{ post.author }}</v-card-subtitle> -->
    <!--       <v-card-text>{{ post.summary }}</v-card-text> -->
    <!--       <v-card-actions> -->
    <!--         <v-btn text>Read More</v-btn> -->
    <!--       </v-card-actions> -->
    <!--     </v-card> -->
    <!--   </v-col> -->
    <!-- </v-row> -->

  </v-container>

  <v-divider inset></v-divider>

  <v-container fluid>
    <div>
      <h2>
        Sign up or Log in
      </h2>
    </div>

  </v-container>
</template>

<script lang="ts">
import Post from './Post.vue'

export default {
  data: () => ({
    featuredPosts: [
      {
        id: 1,
        title: "How to Start with Vue.js",
        author: "John Doe",
        category: "Web dev",
        verificationStatus: false,
        content: "Learn how to start building applications with Vue.js in this beginner-friendly guide."
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
};
</script>
