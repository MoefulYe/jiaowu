import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStateStore = defineStore(
  'State',
  () => {
    const _token = ref<string>()
    const _username = ref('mono')
    const login = (token: string) => _token.value = token
    const logout = () => _token.value = undefined
    const isUnlogin = (): boolean => _token.value === undefined

    return {
      token: _token,
      username: _username,
      login,
      logout,
      isUnlogin
    }
  },
  {
    persist: {
      storage: window.localStorage
    }
  }
)

export type StateStore = ReturnType<typeof useStateStore>
