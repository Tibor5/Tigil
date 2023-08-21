<template>
  <v-container>

    <!-- Title Section -->
    <v-row class="mt-5">
      <v-col cols="12">
        <h1 class="display-2">Problem Definition</h1>
        <p class="subtitle-1">A Verified Knowledge Sharing Platform</p>
      </v-col>
    </v-row>

    <!-- Motivation Section -->
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>Why Tigil?</v-card-title>
          <v-card-subtitle>Motivation</v-card-subtitle>
          <v-card-text>
            As the digital age accelerates, so does the spread of unreliable content. Existing platforms, although rich in information, often lack the means to validate their content's credibility. There's a rising need for a solution - one that not only delivers information but ensures its veracity, creating a safe and reliable space for those in pursuit of genuine insights.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Introducing Tigil Section -->
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>Introducing Tigil</v-card-title>
          <v-card-text>
            More than just a platform, Tigil is an initiative to combat misinformation in online spaces. Distinct from the likes of Quora, Tigil brings forth a unique user verification system, promising content that isn't just abundant, but accurate. At its core, Tigil champions a rigorous verification process, enhancing both the quality of information and user experience.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Features Section -->
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>Features That Set Us Apart</v-card-title>
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="feature in features" :key="feature.title">
                <v-list-item-content>
                  <v-list-item-title v-html="feature.title"></v-list-item-title>
                  <v-list-item-subtitle v-html="feature.text"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- Tigil in a Nutshell Section -->
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>Tigil in a Nutshell</v-card-title>
          <v-card-text>
            In an era where misinformation is rampant, Tigil emerges as a beacon of trust. Our commitment is simple - offer a space where authenticity reigns supreme, ensuring users not only access, but engage with genuine, credible knowledge.
            <v-btn color="primary" to="/">Join us in reshaping the way knowledge is shared and consumed online.</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  data() {
    return {
      features: [
        {
          title: "Verified Users Only",
          text: "At Tigil, credibility isn't optional. Every user goes through a comprehensive verification, ensuring only genuine participants contribute to discussions."
        },
        {
          title: "Verification Tiers",
          text: "Differentiating expertise levels, Tigil's multi-tier system identifies users with higher verifications as more authoritative."
        },
        {
          title: "Truthfulness Ranking",
          text: "An innovative algorithm rates posts and comments for their authenticity, offering users content that's not just popular, but verified."
        },
        {
          title: "Expert Communities",
          text: "Dive deep into expert-led communities. From professionals to specialists, get insights that are both profound and accurate."
        },
        { 
          title: "Transparency & Accountability",
          text: "Tigil promotes responsible content sharing. User verification levels are displayed, encouraging open, fact-based dialogues."
        },
        { 
          title: "Interactive Learning",
          text: "Engage with knowledge. From Q&A sessions, live discussions to webinars, learn directly from verified experts."
        },
        { 
          title: "Content Moderation",
          text: "Verification is our strength, but we don't stop there. A robust moderation system is in place, ensuring content quality at all times."
        }
      ]
    };
  }
};
</script>
