<template>
  <v-main>
    <div>
      <h1>
        Register or log in
      </h1>
      <p>
        In order to access your profile, please log in.
        In case that you do not have an account, please register.
      </p>
    </div>

    <Form justify="end"></Form>

  </v-main>
</template>

<script lang="ts">
import Form from "../components/LoginregisterForm.vue"

export default {
  components: {
    Form,
  }
}
</script>
