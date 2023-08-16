<template>
  <v-card variant="tonal">
    <v-card-title>
      <v-row no-gutters>
        <v-col class="text-start">{{ post.title }}</v-col>
        <v-col class="text-end">
          <v-btn text small @click="viewStats">
            {{ post.verificationStatus ? "Verified" : "Unverified" }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-subtitle>
      {{ post.author }}
      <v-btn text small color="primary" @click="followUser">
        Follow
      </v-btn>
    </v-card-subtitle>

    <v-card-text>
      {{ peekContent }}
      <!-- Additional details like post image, tags, etc. can go here -->
      <v-spacer></v-spacer>
      <v-chip small label color="primary" @click="followCategory(post.category)">
        Subscribe: {{ post.category }}
      </v-chip>
    </v-card-text>

    <v-card-actions>
      <v-btn text small color="primary" @click="viewFullPost">
        Read more
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="savePost">
        <v-icon class="fa">fa-bookmark</v-icon>
      </v-btn>
      <v-btn icon @click="sharePost">
        <v-icon class="fa">fa-share-nodes</v-icon>
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

