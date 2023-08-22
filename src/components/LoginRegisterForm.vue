<template>
  <v-container fluid>

      <v-tabs v-model="tab" bg-color="green-accent-4" icons-and-text dark grow>
        <v-tab v-for="i in tabs" :key="i.id" color="green-lighten-4">
          <v-icon large>{{ i.icon }}</v-icon>
          <div class="caption py-1">{{ i.name }}</div>
        </v-tab>
      </v-tabs>

      <v-window v-model="tab">

        <v-window-item>
          <v-card class="px-4" variant="tonal">
            <v-card-text>User for login (DEMO ONLY): user2@email.com. Password: pass1234
              <v-form ref="loginForm" lazy-validation>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="loginEmail" label="User name or E-mail"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="loginPassword" :append-icon="show1 ? 'fa-solid fa-eye' : 'fa-regular fa-eye-slash'"
                       :type="show1 ? 'text' : 'password'" name="input-10-1"
                      label="Password" hint="At least 8 characters" counter
                      @click:append="show1 = !show1"></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6" xsm="12" align-start>
                    <v-alert v-if="loginError" type="error" dense>
                      {{ loginErrorMessage }}
                    </v-alert>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex" cols="1" sm="2" xsm="12" align-end>
                    <v-btn variant="tonal" icon="fa-brands fa-google" @click="googleLogin"></v-btn>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="2" xsm="12" align-end>
                    <v-btn x-large block :disabled="loading" :loading="loading" color="success" @click="login"> Login </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item>
          <v-card class="px-4">
            <v-card-text>
              <v-form ref="registerForm" v-model="registerValid" lazy-validation>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="firstName" :rules="[rules.required]" label="First Name" maxlength="32"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="lastName" :rules="[rules.required]" label="Last Name" maxlength="32"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="password" :append-icon="show1 ? 'fa-solid fa-eye' : 'fa-regular fa-eye-slash'"
                      :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                      label="Password" hint="At least 8 characters" counter
                      @click:append="show1 = !show1"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field block v-model="verifyPassword" :append-icon="show2 ? 'fa-solid fa-eye' : 'fa-regular fa-eye-slash'"
                      :rules="[rules.required, passwordMatch]" :type="show2 ? 'text' : 'password'" name="input-10-1"
                      label="Confirm Password" counter @click:append="show2 = !show2"></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                    <v-btn x-large block color="success" @click="register" :disabled="loading" :loading="loading"> Register </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-window-item>

      </v-window>

  </v-container>
</template>
  
<script lang="ts">
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from "@/firebase";
let auth = getAuth();

export default {
  data: () => ({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
    loginPassword: "",
    loginEmail: "",
    selected: "",
    show1: false,
    show2: false,
    loginError: false,
    loginErrorMessage: "",

    dialog: true,
    tab: 0,
    tabs: [
      { id: 0, name: "Login", icon: "fa-solid fa-user" },
      { id: 1, name: "Register", icon: "fa-regular fa-user" }
    ],
    loading: false,
    loginValid: true,
    registerValid: true,

    nameRules: [
      (value: any)  => {
        if (value) return true
        return "Name is required."
      },
    ],
    loginEmailRules: [
      (value: any) => {
        if (value) return true
        return "E-mail is requred."
      },
      (value: any) => {
        if (/.+@.+\..+/.test(value)) return true
        return "E-mail must be valid."
      },
    ],
    emailRules: [
      (value: any) => {
        if (value) return true
        return "E-mail is requred."
      },
      (value: any) => {
        if (/.+@.+\..+/.test(value)) return true
        return "E-mail must be valid."
      },
    ],
    rules: {
      required: (value: any) => !!value || "Required.",
      min: (v: any) => (v && v.length >= 8) || "Min 8 characters"
    }
  }),
  computed: {
    passwordMatch() {
      return () => this.password === this.verifyPassword || "Passwords must match";
    }
  },
  methods: {
    register() {
      this.loading = !this.loading;
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const uid = userCredential.user.uid;
          return setDoc(doc(collection(db, 'User'), uid), {
            ID: uid,
            Admin_ID: uid,
            firstname: this.firstName,
            lastname: this.lastName,
            email: this.email,
            is_expert: false,
            is_verifier: false,
          })
        })
        .then(() => {
          this.$router.push('/');
        })
        .catch((error) => {
          console.error(error.code);
        });
    },
    async login() {
      this.loading = !this.loading;
      try {
        await signInWithEmailAndPassword(getAuth(), this.loginEmail, this.loginPassword)
        .then(() => {
          this.$router.push('/explore');
        })
      } catch(error: any) {
        this.loginError = true;
        switch (error.code) {
          case "auth/invalid-email":
            this.loginErrorMessage = "Invalid email";
            this.loading = false;
            break;
          case "auth/user-not-found":
            this.loginErrorMessage = "No account with that email was found";
            this.loading = false;
            break;
          case "auth/wrong-password":
            this.loginErrorMessage = "Incorrect password";
            this.loading = false;
            break;
          default:
            this.loginErrorMessage = "Email or password are invalid";
            this.loading = false;
            break;
        }
      }
    },
    googleLogin() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result.user);
          this.$router.push('/explore');
        })
        .catch((error) => {
          console.log(error.code);
        })
    },
  },
  watch: {
    loginEmail() {
      this.loginError = false;
      this.loginErrorMessage = "";
    },
    loginPassword() {
      this.loginError = false;
      this.loginErrorMessage = "";
    }
  }
}
</script>
