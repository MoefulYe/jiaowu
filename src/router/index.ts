import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { Role, useStateStore } from '@/stores/user-state'

const routes: RouteRecordRaw[] = [
  {
    path: '/404',
    name: 'not-found',
    component: () => import('@/views/error-view/not-found-view.vue')
  },
  {
    path: '/coming-soon',
    name: 'coming-soon',
    component: () => import('@/views/error-view/coming-soon-view.vue')
  },
  {
    path: '/401',
    name: 'forbidden',
    component: () => import('@/views/error-view/forbidden-view.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login-view.vue'),
    meta: {
      role: Role.Unlogin
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register-view.vue'),
    meta: {
      role: Role.Unlogin
    }
  },
  {
    path: '/',
    component: () => import('@/views/employee-view/employee-view.vue'),
    meta: {
      role: Role.Employee
    },
    children: [
      { path: '', redirect: { name: 'welcome' } },
      {
        name: 'welcome',
        path: 'welcome',
        component: () => import('@/views/employee-view/welcome-view.vue')
      },
      {
        name: 'profile',
        path: 'profile',
        children: [
          {
            name: 'basic-profile',
            path: 'basic',
            component: () =>
              import('@/views/employee-view/employee-profile-view/basic-profile-view.vue')
          },
          {
            name: 'academic-profile',
            path: 'academic',
            component: () =>
              import('@/views/employee-view/employee-profile-view/academic-profile-view.vue')
          },
          {
            name: 'resume-profile',
            path: 'resume',
            component: () =>
              import('@/views/employee-view/employee-profile-view/resume-view/resume-view.vue')
          }
        ]
      },
      {
        name: 'job',
        path: 'job',
        children: [
          {
            name: 'job-market',
            path: 'market',
            component: () => import('@/views/employee-view/job-view/job-market-view.vue')
          },
          {
            name: 'skill-required',
            path: 'skill',
            component: () => import('@/views/employee-view/job-view/skill-require-view.vue')
          },
          {
            name: 'trend',
            path: 'trend',
            component: () => import('@/views/employee-view/job-view/trend-view.vue')
          }
        ]
      },
      {
        name: 'company',
        path: 'company/:company',
        component: () => import('@/views/employee-view/company-view.vue'),
        props: (route) => ({
          company: route.params.company
        })
      },
      {
        name: 'tech',
        path: 'tech/:tech',
        component: () => import('@/views/employee-view/tech-view.vue'),
        props: (route) => ({
          tech: route.params.tech
        })
      },
      {
        name: 'assessment',
        path: 'assessment',
        component: () => import('@/views/employee-view/assessment-view/assessment-view.vue')
      },
      {
        name: 'interest',
        path: 'interest',
        component: () => import('@/views/employee-view/interest-view.vue')
      },
      {
        name: 'recommand',
        path: 'recommand',
        component: () => import('@/views/employee-view/recommend-view/recommand-view.vue')
      },
      {
        name: 'study',
        path: 'study',
        children: [
          {
            name: 'study-plan',
            path: 'plan',
            redirect: { name: 'coming-soon' }
          },
          {
            name: 'study-material',
            path: 'material',
            redirect: { name: 'coming-soon' }
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
  const state = useStateStore()
  const metaRole = to.meta.role
  const role = state.role()
  if (metaRole !== undefined && metaRole !== role) {
    switch (role) {
      case Role.Unlogin:
        window.$message.error('请先登录')
        router.push({ name: 'login' })
        break
      case Role.Employee:
        window.$message.error('您没有权限访问该页面')
        router.push({ name: 'welcome' })
        break
      case Role.Employer:
        window.$message.error('您没有权限访问该页面')
        router.push({ name: '401' })
    }
  }
})

// router.afterEach((to, from, failure) => {})
export const gotoTechPage = (tech: string) =>
  window.$router.push({ name: 'tech', params: { tech } })

export const gotoHome = (role: Role) => {
  switch(role) {
  case Role.Unlogin:
    window.$router.push({ name: 'login' })
    break
  case Role.Employee:
    window.$router.push({ name: 'welcome' })
    break
  case Role.Employer:
    window.$router.push({ name: 'coming-soon' })
    break
  }
}
export const gotoLogin = () => window.$router.push({ name: 'login' })
export const gotoRegister = () => window.$router.push({ name: 'register' })
export const gotoBaicProfile = () => window.$router.push({ name: 'basic-profile' })

export default router
