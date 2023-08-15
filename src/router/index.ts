import { createRouter, createWebHistory } from 'vue-router'
import About from    '../views/AboutView.vue'
import NewPost from  '../views/CreateNewPostView.vue'
import Explore from  '../views/ExploreView.vue'
import Feed from     '../views/FeedView.vue'
import HomeView from '../views/HomeView.vue'
import Profile from  '../views/ProfileView.vue'
import Review from   '../views/ReviewView.vue'
import Settings from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/createpost',
      name: 'createpost',
      component: NewPost
    },
    {
      path: '/explore',
      name: 'explore',
      component: Explore
    },
    {
      path: '/feed',
      name: 'feed',
      component: Feed
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/review',
      name: 'review',
      component: Review
    },
    {
      path: '/profile/settings',
      name: 'settings',
      component: Settings
    },
  ]
})

export default router
