<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    :rail-width="72"
    permanent
    @click="rail = false"
  >

    <v-list-item height="80" style="display: flex; justify-content: space-between; align-items: center;" nav>
      <template v-slot:prepend>
        <v-list-item-contents v-if="!rail">
          <v-list-item-title>Tigil</v-list-item-title>
          <v-list-item-subtitle>Create knowledge</v-list-item-subtitle>
        </v-list-item-contents>
      </template>
      <template v-slot:default>
        <v-btn variant="text" @click.stop="rail = !rail">
          <v-icon class="fa">
            {{ rail ? 'fa-chevron-right' : 'fa-chevron-left' }}
          </v-icon>
        </v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        v-for='item in menuItems'
        :key='item.title'
        :value='item.value'
        link>
        <template v-slot:prepend>
          <v-icon class="fa">{{ item.icon }}</v-icon>
        </template>
        <v-list-item-content>
          <v-list-item-title v-if="!rail">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
export default {
  props: {
    currentMenu: String,
  },
  data: () => ({
    menuItems: [
      { icon: 'fa-user', title: 'My Account', value: 'account' },
      { icon: 'fa-home', title: 'Home', value: 'home' },
      { icon: 'fa-earth-americas', title: 'Explore', value: 'explore' },
      { icon: 'fa-eye', title: 'Reviews', value: 'reviews' },
      { icon: 'fa-bell', title: 'Notifications', value: 'notifications' },
      { icon: 'fa-gear', title: 'Settings', value: 'settings' },
      { icon: 'fa-arrow-right-from-bracket', title: 'Log Out', value: 'logout' },
      { icon: 'fa-t', title: 'About Tigil', value: 'about' }
    ],
    drawer: true,
    rail: true,
  }),
}
</script>

