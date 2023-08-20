<template>
  <!-- Verify Identity & Credentials -->
  <v-row>
    <v-col cols="12">
      <v-btn @click="verifyIdentity">Verify Identity</v-btn>
    </v-col>
  </v-row>

  <!-- Post Title -->
  <v-row>
    <v-col cols="12" md="8">
      <v-text-field v-model="postTitle" label="Post Title" outlined @input="checkSimilarPosts"></v-text-field>
      <v-list v-if="similarPublications.length">
        <v-list-item-group>
          <v-list-item v-for="post in similarPublications" :key="post.id">
            <v-list-item-content label="Similar publications">
              <v-list-item-title>{{ post.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
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
      <v-btn color="primary" @click="submitPost">Submit Publication</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  data() {
    return {
      postTitle: "",
      postContent: "",
      reference: "",
      references: [],
      tags: [],
      similarPublications: [
        {
          id: 1,
          title: 'Dummy publication 1'
        }
      ] // Placeholder for similar posts
    };
  },
  methods: {
    verifyIdentity() {
      // Logic to verify identity goes here
    },
    checkSimilarPosts() {
      // Logic to check for similar posts goes here
      // For now, it's a placeholder
      this.similarPublications = [
        { id: 1, title: "Sample Similar Post 1" },
        { id: 2, title: "Sample Similar Post 2" }
      ];
    },
    addReference() {
      if (this.reference) {
        this.references.push(this.reference);
        this.reference = "";
      }
    },
    submitPost() {
      // Logic to submit post goes here
    }
  },
}
</script>
