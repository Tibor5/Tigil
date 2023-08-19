import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import("../views/Home.vue") },
    { path: '/profile', name: 'profile', component: () => import("../views/Profile.vue") },
    { path: '/profile/settings', name: 'settings', component: () => import("../views/Settings.vue") },
    { path: '/createpost', name: 'createpost', component: () => import("../views/NewPublication.vue") },
    { path: '/explore', name: 'explore', component: () => import("../views/Explore.vue"), meta: {
      requiresAuth: true,
    } },
    { path: '/review', name: 'review', component: () => import("../views/Review.vue") },
    { path: '/about', name: 'about', component: () => import("../views/About.vue") },
    { path: '/register', name: 'register', component: () => import("../views/Register.vue") },
  ]
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      console.error("No access allowed");
      next("/");
    }
  } else {
    next();
  }
});

export default router
