import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { useStateStore } from '../stores/user-state'

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
    path: '/register',
    name: 'register',
    component: () => import('@/views/register-view.vue')
  },
  {
    path: '/',
    component: () => import('@/views/user-view/user-view.vue'),
    meta: {
      requiresLogin: true
    },
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
          },
          {
            name: 'trend',
            path: 'trend',
            component: () => import('@/views/user-view/job-view/trend-view.vue')
          }
        ]
      },
      {
        name: 'company',
        path: 'company/:company',
        component: () => import('@/views/user-view/company-view.vue'),
        props: (route) => ({
          company: route.params.company
        })
      },
      {
        name: 'tech',
        path: 'tech/:tech',
        component: () => import('@/views/user-view/tech-view.vue'),
        props: (route) => ({
          tech: route.params.tech
        })
      },
      {
        name: 'interest',
        path: 'interest',
        component: () => import('@/views/user-view/interest-view.vue')
      },
      {
        name: 'skill',
        path: 'skill',
        component: () => import('@/views/user-view/skill-view.vue')
      },
      {
        name: 'study',
        path: 'study',
        children: [
          {
            name: 'study-plan',
            path: 'plan',
            component: () => import('@/views/user-view/study-view/study-plan-view.vue')
          },
          {
            name: 'study-material',
            path: 'material',
            component: () => import('@/views/user-view/study-view/study-material-view.vue')
          }
        ]
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

router.beforeEach((to) => {
  if (to.meta.requiresLogin && useStateStore().isUnlogin()) {
    gotoLogin()
  }
})

// router.afterEach((to, from, failure) => {})
export const gotoTechPage = (tech: string) =>
  window.$router.push({ name: 'tech', params: { tech } })

export const gotoHome = () => window.$router.push({ name: 'welcome' })
export const gotoLogin = () => window.$router.push({ name: 'login' })
export const gotoRegister = () => window.$router.push({ name: 'register' })
export const gotoProfile = () => window.$router.push({ name: 'profile' })

export default router
