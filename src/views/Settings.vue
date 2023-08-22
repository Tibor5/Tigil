<template>
  <v-container fluid>
    <v-row>
      <v-col align="center">
        <!-- General Settings Card -->
        <v-card max-width="500" align="left" class="mb-6" outlined>
          <v-card-title>General</v-card-title>
          <v-card-text>
            <h3 class="mb-3">Submit your request to become a "Verifier":</h3>
            <v-text-field label="Write Request" v-model="request"></v-text-field>
            
            <v-select :items="educationLevels" label="Select Level of Education" v-model="selectedEducationLevel"></v-select>
            
            <v-text-field label="Your Qualifications" v-model="qualifications" multiline></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed :dark="!sending" :loading="sending" :disabled="sending" @click.stop="sendRequest()">SEND</v-btn>
          </v-card-actions>
        </v-card>

        <!-- Account Deletion Card -->
        <v-card max-width="500" align="left" class="mb-6" outlined v-if="hasAccount">
          <v-card-title>Delete Account</v-card-title>
          <v-card-text>
            Are you sure you want to delete your account?
          </v-card-text>
          <v-card-actions>
            <v-btn depressed color="error" @click.stop="deleteAccountPopup = true">DELETE</v-btn>
          </v-card-actions>

          <v-expand-transition>
            <v-card outlined color="error" dark v-if="deleteAccountPopup" align="left">
              <v-card-actions>
                <v-card-text>
                  This action is irreversible!
                </v-card-text>
                <v-spacer></v-spacer>
                <v-btn depressed light @click.stop="deleteAccountPopup = false">CANCEL</v-btn>
                <v-btn depressed @click.stop="deleteAccount()" :loading="deleting" :disabled="deleting">CONFIRM</v-btn>
              </v-card-actions>
            </v-card>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { db } from "@/firebase";
import { getAuth, signOut } from "firebase/auth";
import { doc, setDoc, collection, deleteDoc } from "firebase/firestore";

export default {
  data() {
    return {
      request: '',
      userID: "",
      isLoggedin: true,
      educationLevels: ['Bachelors', 'Masters', 'PhD', 'Option4', 'Option5', 'Option6'],
      selectedEducationLevel: '',
      qualifications: '',
      sending: false,
      hasAccount: true,
      deleteAccountPopup: false,
      deleting: false
    };
  },
  methods: {
    getUserId() {
      const auth = getAuth();
      const uid = auth.currentUser ? auth.currentUser.uid : null;

      if (uid) {
        console.log("Found user ID.");
        this.userID = uid!;
      } else {
        console.error("User ID not found");
      }
    },
    async sendRequest() {
      // const db = getFirestore();

      this.sending = true;

      const requestPayload = {
        request: this.request,
        education: this.selectedEducationLevel,
        qualifications: this.qualifications,
        timestamp: new Date()
      };

      try {
        await setDoc(doc(collection(db, "verifierRequests")), requestPayload);

        this.sending = false;
        alert('Request sent successfully!');
      } catch (error) {
        console.error("Error sending request: ", error);
        this.sending = false;
      }
    },
    handleSignout() {
      console.log("handleSignout")
      if (this.isLoggedin) {
        signOut(getAuth()).then(() => {
          this.isLoggedin = false;
          this.$router.push('/');
        });
      }
    },
    async deleteAccount() {
      // const db = getFirestore();

      this.getUserId();

      this.deleting = true;

      try {
        await deleteDoc(doc(db, "User", this.userID));
        
        this.deleting = false;
        this.hasAccount = false;
        alert('Account deleted successfully!');
        this.handleSignout();
      } catch (error) {
        console.error("Error deleting account: ", error);
        this.deleting = false;
      }
    }
  }
}
</script>

