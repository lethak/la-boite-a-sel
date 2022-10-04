import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import SoundListView from '../views/SoundListView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SoundListView,
    },
    {
      path: '/sound/:soundId',
      name: 'soundById',
      props: true,
      component: SoundListView,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/SoundListView.vue'),
    },
  ],
})

export default router
