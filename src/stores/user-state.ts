import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStateStore = defineStore(
  'State',
  () => {
    const _token = ref('')
    const _username = ref('')

    const login = (token: string, username: string) => {
      _token.value = token
      _username.value = username
    }

    const logout = () => {
      _token.value = ''
      _username.value = ''
    }

    const isUnlogin = (): boolean => _token.value.length === 0

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
