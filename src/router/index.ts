import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: { name: 'welcome' } },
  { name: 'login', path: '/login', component: () => import('@/views/login-view.vue') },
  { name: 'welcome', path: '/welcome', component: () => import('@/views/welcome-view.vue') },
  { name: 'profile', path: '/profile', component: () => import('@/views/profile-view.vue') },
  { name: 'academic', path: '/academic', component: () => import('@/views/academic-view.vue') },
  {
    name: 'job',
    path: '/job',
    children: [
      {
        name: 'job-market',
        path: 'market',
        component: () => import('@/views/job-market-view.vue')
      },
      {
        name: 'skill-required',
        path: 'skill',
        component: () => import('@/views/skill-require-view.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {})

// router.afterEach((to, from, failure) => {})

export default router
