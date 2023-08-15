<template>
  <v-card variant="tonal">
    <v-card-title>
      {{ post.title }}
      <v-spacer></v-spacer>
      <v-btn icon @click="savePost">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn icon @click="sharePost">
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-subtitle>
      {{ post.author }}
      <v-btn text small color="primary" @click="followUser">
        Follow Author
      </v-btn>
    </v-card-subtitle>

    <v-card-text>
      {{ peekContent }}
      <!-- Additional details like post image, tags, etc. can go here -->
      <div>
        <v-chip small label color="primary" @click="followCategory(post.category)">
          {{ post.category }}
        </v-chip>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn text small color="primary" @click="viewFullPost">
        Read more
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text small @click="viewStats">
        Verification Stats: {{ post.verificationStatus }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    peekContent() {
      return `${this.post.content.substring(0, 100)}...`;
    }
  },
  methods: {
    savePost() {
      // Logic to save the post
      console.log("~~~~~ SAVE POST!")
    },
    sharePost() {
      // Logic to share the post
      console.log("~~~~~ SHARE POST!")
    },
    followCategory(category) {
      // Logic to follow the category
      console.log("~~~~~ FOLLOW CATEGORY!")
    },
    followUser() {
      // Logic to follow the user/author
      console.log("~~~~~ FOLLOW USER!")
    },
    viewFullPost() {
      // Navigate to the full post
      console.log("~~~~~ VIEW POST!")
    },
    viewStats() {
      // Display stats about the post's verification status
      console.log("~~~~~ VIEW STATS!")
    },
  }
}
</script>

