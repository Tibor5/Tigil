<template>
  <div class="pa-4 ma-4">
    <h1>
      Register or log in
    </h1>
    <p>
      In order to access your profile, please log in.
      In case that you do not have an account, please register.
    </p>
  </div>

  <v-container style="max-width: 50%;">

    <Form :max-width="720"></Form>

  </v-container>
</template>

<script lang="ts">
import Form from "../components/LoginRegisterForm.vue"

export default {
  components: {
    Form,
  }
}
</script>
