<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    :rail-width="72"
    permanent
    @click="rail = false"
  >

    <v-list-item class="custom-list-item" nav>
      <template v-slot:default>
        <v-list-item-contents v-if="!rail">
          <v-list-item-title>
            <div align="center" class="logo-container">
              <img alt="Tigil logo" class="logo" src="@/assets/TIGIL.png" />
            </div>
          </v-list-item-title>
        </v-list-item-contents>
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
      <v-list-item
        v-for='item in menuItems'
        :key='item.title'
        :value='item.value'
        :to='item.to'
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
      { icon: 'fa-user', title: 'My profile', value: 'myprofile', to:'/profile' },
      { icon: 'fa-home', title: 'Home', value: 'home', to:'/' },
      { icon: 'fa-earth-americas', title: 'Explore', value: 'explore', to:'/explore' },
      { icon: 'fa-add', title: 'Publish', value: 'createpost', to:'/createpost' },
      { icon: 'fa-eye', title: 'Review', value: 'reviews', to:'/review' },
      { icon: 'fa-gear', title: 'Settings', value: 'settings', to:'/profile/settings' },
      { icon: 'fa-arrow-right-from-bracket', title: 'Log Out', value: 'logout', to:'/' },
      { icon: 'fa-t', title: 'About Tigil', value: 'about', to:'/about' }
    ],
    drawer: true,
    rail: true,
  }),
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
