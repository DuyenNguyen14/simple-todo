import TestHomePage from '@/pages/TestHomePage.vue'
import TestLoginPage from '@/pages/TestLoginPage.vue'
import useTestAuthStore from '@/stores/test-auth'
import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/login', name: 'Login', component: TestLoginPage },
  { path: '/', name: 'Home', component: TestHomePage, meta: { requiresAuth: true } },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

router.beforeEach(async (to, from, next) => {
  const store = useTestAuthStore()
  const { user } = storeToRefs(store)

  console.log('user.value >> ', user.value)

  if (!user.value && to.meta.requiresAuth) next({ name: 'Login' })
  else next()
})

export default router
