import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Quiz from '@/views/Quiz.vue'
import Results from '@/views/Results.vue'
import Admin from '@/views/Admin.vue'
import { supabase } from '@/services/supabase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz
  },
  {
    path: '/results',
    name: 'Results',
    component: Results
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const user = await supabase.auth.getUser()

  if (requiresAuth && !user) {
    next('/login')
  } else {
    next()
  }
})

export default router
