import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { fa } from 'vuetify/iconsets/fa'
import "@fortawesome/fontawesome-free/css/all.css";
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBkRItOCjhY_f4cakQ_5-g64VxoYarD6uc",
  authDomain: "tigil-70bb5.firebaseapp.com",
  projectId: "tigil-70bb5",
  storageBucket: "tigil-70bb5.appspot.com",
  messagingSenderId: "945685557658",
  appId: "1:945685557658:web:0637b000c5eb536de2ca23"
};

initializeApp(firebaseConfig);

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
  theme: {
    defaultTheme: 'dark'
  }
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.mount('#app')
