import '@/assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from '@/router'
import App from '@/App.vue'
import { Role, useStateStore } from './stores/user-state'
import { EMPLOYEE_TITLE, EMPLOYER_TITLE } from './constants'

const entry = async () => {
  const pinia = createPinia().use(piniaPluginPersistedstate)
  const app = createApp(App).use(pinia).use(router)
  app.mount('#app')
  if (useStateStore().role() === Role.Employer) {
    window.document.title = EMPLOYER_TITLE 
  } else {
    window.document.title = EMPLOYEE_TITLE
  }
}
entry()
