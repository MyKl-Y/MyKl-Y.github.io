import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoadingView from '../views/LoadingView.vue'
import LoginView from '../views/LoginView.vue'
import LaunchView from '../views/LaunchView.vue'
import DesktopView from '../views/DesktopView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'loading',
      component: LoadingView
    },
    {
      path: '/launch',
      name: 'launch',
      component: LaunchView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/desktop/:type',
      name: 'desktop',
      component: DesktopView,
      props: true
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
