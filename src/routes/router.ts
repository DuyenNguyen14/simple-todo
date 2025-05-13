import { PATH } from '@/constants/path'
import AuthLayout from '@/layouts/AuthLayout.vue'
import LoginPage from '@/pages/LoginPage.vue'
import SignupPage from '@/pages/SignupPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: PATH.BASE,
    component: AuthLayout,
    children: [
      {
        path: PATH.SIGNUP,
        component: SignupPage,
      },
      {
        path: PATH.LOGIN,
        component: LoginPage,
      },
    ],
  },
  // { path: PATH.HOME, component: HomePage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
