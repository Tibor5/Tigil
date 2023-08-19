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

    <v-container>
      <Form />
    </v-container>

  </v-main>
</template>

<script lang="ts">
import Form from "../components/NewUserForm.vue"

export default {
  components: {
    Form,
  }
}
</script>
