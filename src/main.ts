import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import * as firebase from "@/firebase"

import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import { fa } from "vuetify/iconsets/fa"
import "@fortawesome/fontawesome-free/css/all.css";
import { aliases, mdi } from "vuetify/iconsets/mdi"
import "vuetify/styles"

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
  theme: {
    defaultTheme: "dark",
  }
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.mount("#app")
