<template>
  <v-container v-for="post in dummyPosts" :key="post.id">
    <Post :post="post"></Post>
  </v-container>
</template>

<script lang="ts">
import Post from '../components/Post.vue'

export default {
  components: {
    Post,
  },
  data: () => ({
    dummyPosts: [
      {
        id: 1,
        title: "How to Start with Vue.js",
        author: "John Doe",
        tags: "Web dev",
        verified: false,
        content: "Learn how to start building applications with Vue.js in this beginner-friendly guide."
      },
      {
        id: 2,
        title: "Deep Dive into Vuetify",
        author: "Jane Smith",
        tags: "Front-end",
        verified: true,
        content: "Explore the components and capabilities of Vuetify, the popular Vue UI library."
      },
      {
        id: 3,
        title: "DDPG",
        author: "Kyle Mewinski",
        tags: "Machine learning",
        verified: true,
        content: "DDPG is a model-free off-policy actor-critic algorithm that combines Deep Q Learning(DQN) and DPG. Orginal DQN works in a discrete action space and DPG extends it to the continuous action space while learning a deterministic policy."
      },
      {
        id: 4,
        title: "Intro to particle physics",
        author: "Mike Blehbinsky",
        tags: "Physics",
        verified: true,
        content: "Particle physics or high energy physics is the study of fundamental particles and forces that constitute matter and radiation. The fundamental particles in the universe are classified in the Standard Model as fermions (matter particles) and bosons (force-carrying particles)."
      },
    ],
  }),
};
</script>
