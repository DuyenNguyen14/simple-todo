import { PATH } from '@/constants/path'
import AuthLayout from '@/layouts/AuthLayout.vue'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import SignupPage from '@/pages/SignupPage.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: PATH.AUTH.ROOT,
    component: AuthLayout,
    children: [
      { path: PATH.AUTH.LOGIN, name: 'Login', component: LoginPage },
      { path: PATH.AUTH.SIGNUP, name: 'Signup', component: SignupPage },
    ],
  },
  {
    path: PATH.HOME,
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

router.beforeEach(async (to, from, next) => {
  const store = useAuthStore()
  const { isInitialized, isAuthenticated } = storeToRefs(store)

  if (isInitialized.value) {
    await store.fetchSession()
  }

  if (to.meta.requiresAuth && !isAuthenticated.value) next({ name: 'Login' })
  else if (to.path.includes(PATH.AUTH.ROOT) && isAuthenticated.value) next({ name: 'Home' })
  else next()
})

export default router
