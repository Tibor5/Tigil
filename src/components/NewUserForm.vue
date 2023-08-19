<template>
  <v-container fluid v-model="dialog" persistent max-width="720">

      <v-tabs v-model="tab" show-arrows background-color="deep-green accent-4" icons-and-text dark grow>
        <v-tabs-slider color="green darken-4"></v-tabs-slider>
        <v-tab v-for="i in tabs" :key="i.id">
          <v-icon large>{{ i.icon }}</v-icon>
          <div class="caption py-1">{{ i.name }}</div>
        </v-tab>
      </v-tabs>

      <v-window v-model="tab">

        <v-window-item>
          <v-card class="px-4">
            <v-card-text>
              <v-form ref="loginForm" v-model="loginValid" lazy-validation>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="loginPassword" :append-icon="show1 ? 'fa-solid fa-eye' : 'fa-regular fa-eye-slash'"
                      :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                      label="Password" hint="At least 8 characters" counter
                      @click:append="show1 = !show1"></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6" xsm="12">
                    <v-alert v-if="loginError" type="error" dense>
                      {{ loginErrorMessage }}
                    </v-alert>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex" cols="12" sm="2" xsm="12" align-end>
                    <v-btn x-large block :disabled="!loginValid" color="success" @click="login"> Login </v-btn>
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
                    <v-btn x-large block :disabled="!registerValid" color="success" @click="register"> Register </v-btn>
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
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
const router = useRouter();
const auth = getAuth();

export default {
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
      { id: 0, name: "Login", icon: "fa-solid fa-user" },
      { id: 1, name: "Register", icon: "fa-regular fa-user" }
    ],
    loginValid: true,
    registerValid: true,

    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
    loginPassword: "",
    loginEmail: "",
    show1: false,
    show2: false,
    loginError: false,
    loginErrorMessage: "",
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
      if (this.registerValid) {
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            console.log("Successfully registered!");
            router.push("/");
          })
          .catch((error) => {
            console.log(error.code);
            alert(error.message);
          });
      }
    },
    login() {
      if (this.loginValid) {
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            console.log("Successfully logged in!");
            router.push("/explore");
          })
          .catch((error) => {
            console.log(error.code);
            this.loginError = true;
            this.loginErrorMessage = "Invalid e-mail or password";
          });
      }
    },
    // reset() {
    //   this.$refs.form.reset();
    // },
    // resetValidation() {
    //   this.$refs.form.resetValidation();
    // }
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
