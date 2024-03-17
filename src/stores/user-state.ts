import { ref } from 'vue'
import { defineStore } from 'pinia'

export enum Role {
  Unlogin,
  Employee,
  Employer
}

export type Token = string

export const useStateStore = defineStore(
  'State',
  () => {
    const _token = ref('')
    const _username = ref('')
    const _role = ref(Role.Unlogin)
    const login = (token: string, role: Role) => {
      _token.value = token
      _role.value = role
      _username.value = ''
    }
    const logout = () => {
      _token.value = ''
      _role.value = Role.Unlogin
      _username.value = ''
    }
    const isUnlogin = () => _role.value === Role.Unlogin
    const isEmployee = () => _role.value === Role.Employee
    const isEmployer = () => _role.value === Role.Employer
    const role = () => _role.value
    const token = () => _token.value
    const username = () => _username.value
    const setUsername = (username: string) => (_username.value = username)
    return {
      token,
      username,
      role,
      setUsername,
      login,
      logout,
      isUnlogin,
      isEmployee,
      isEmployer,
      _role,
      _token,
      _username
    }
  },
  {
    persist: {
      storage: window.localStorage
    }
  }
)
