import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/404',
    name: 'not-found',
    component: () => import('@/views/error-view/not-found-view.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login-view.vue')
  },
  {
    path: '/',
    component: () => import('@/views/user-view/index.vue'),
    children: [
      { path: '', redirect: { name: 'welcome' } },
      {
        name: 'welcome',
        path: 'welcome',
        component: () => import('@/views/user-view/welcome-view.vue')
      },
      {
        name: 'profile',
        path: 'profile',
        component: () => import('@/views/user-view/profile-view.vue')
      },
      {
        name: 'academic',
        path: 'academic',
        component: () => import('@/views/user-view/academic-view.vue')
      },
      {
        name: 'job',
        path: 'job',
        children: [
          {
            name: 'job-market',
            path: 'market',
            component: () => import('@/views/user-view/job-view/job-market-view.vue')
          },
          {
            name: 'skill-required',
            path: 'skill',
            component: () => import('@/views/user-view/job-view/skill-require-view.vue')
          }
        ]
      },
      {
        name: 'company',
        path: 'company/:company',
        component: () => import('@/views/user-view/company-view.vue')
      },
      {
        name: 'tech',
        path: 'tech/:tech',
        component: () => import('@/views/user-view/tech-view.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'not-found' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {})

// router.afterEach((to, from, failure) => {})
export const gotoTechPage = (tech: string) =>
  window.$router.push({ name: 'tech', params: { tech } })

export const gotoHome = () => window.$router.push({ name: 'welcome' })

export default router
