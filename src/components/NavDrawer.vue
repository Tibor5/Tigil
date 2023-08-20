<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" :rail-width="72" permanent @click="rail = false">

    <v-list-item class="custom-list-item" nav>
      <template v-if="!rail" v-slot:default>
        <v-list-item-title>
          <div align="center" class="logo-container">
            <img alt="Tigil logo" class="logo" src="@/assets/TIGIL.png" />
          </div>
        </v-list-item-title>
      </template>
      <template v-slot:append>
        <v-btn class="chevron-btn" variant="text" @click.stop="rail = !rail">
          <v-icon class="fa">
            {{ rail ? 'fa-chevron-right' : 'fa-chevron-left' }}
          </v-icon>
        </v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for='item in filteredMenuItems' :key='item.title' :value='item.value' :to='item.to' @click="item.click" link>
        <template v-slot:prepend>
          <v-icon class="fa">{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title v-if="!rail">{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

let auth: any;
const router = useRouter();

export default {
  props: {
    currentMenu: String,
  },
  data: () => ({
    isLoggedin: false,
    menuItems: [
      {
        icon: 'fa-user',
        title: 'My profile',
        value: 'myprofile',
        to: '/profile',
        click: '',
      },
      {
        icon: 'fa-home',
        title: 'Home',
        value: 'home',
        to: '/',
        click: '',
      },
      {
        icon: 'fa-earth-americas',
        title: 'Explore',
        value: 'explore',
        to: '/explore',
        click: '',
      },
      {
        icon: 'fa-add',
        title: 'Publish',
        value: 'createpost',
        to: '/createpost',
        click: '',
      },
      {
        icon: 'fa-eye',
        title: 'Review',
        value: 'reviews',
        to: '/review',
        click: '',
      },
      {
        icon: 'fa-gear',
        title: 'Settings',
        value: 'settings',
        to: '/profile/settings',
        click: '',
      },
      {
        icon: 'fa-arrow-right-from-bracket',
        title: 'Sign Out',
        value: 'signout',
        to: '',
        click: 'handleSignout',
      },
      {
        icon: 'fa-t',
        title: 'About Tigil',
        value: 'about',
        to: '/about',
        click: '',
      }
    ],
    drawer: true,
    rail: true,
  }),
  computed: {
    filteredMenuItems() {
      if (this.isLoggedin) {
        return this.menuItems;
      } else {
        return this.menuItems.filter(item => item.value !== 'signout');
      }
    }
  },
  mounted() {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedin = true;
      } else {
        this.isLoggedin = false;
      }
    });
  },
  methods: {
    handleSignout() {
      signOut(auth).then(() => {
        router.push("/");
      });
    },
  }
}
</script>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.logo {
  max-width: 100%;
  max-height: 100%;
  display: block;
}

.custom-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

.chevron-btn {
  align-self: center;
}
</style>
