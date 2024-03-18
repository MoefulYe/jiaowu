import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type ResumeProfile, fetchResume as _fetchResume } from '@/api/user/resume'
import { type Score } from '@/components/emoji-radio.vue'
import { fetchInterest as _fetchInterest } from '@/api/assessment/interest'
import { gotoEmployeeLogin } from '@/router'

export const enum Role {
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
    const resume = ref<ResumeProfile>()
    const interest = ref<Score[]>()

    const login = (token: string, role: Role) => {
      _token.value = token
      _role.value = role
      _username.value = ''
      resume.value = undefined
      interest.value = undefined
    }
    const logout = () => {
      _token.value = ''
      _role.value = Role.Unlogin
      _username.value = ''
      gotoEmployeeLogin()
    }
    const isUnlogin = () => _role.value === Role.Unlogin
    const isEmployee = () => _role.value === Role.Employee
    const isEmployer = () => _role.value === Role.Employer
    const role = () => _role.value
    const token = () => _token.value
    const username = () => _username.value
    const setUsername = (username: string) => (_username.value = username)
    const fetchResume = async () => {
      if (resume.value === undefined) {
        resume.value = await _fetchResume()
      }
    }
    const fetchInterest = async () => {
      if (interest.value === undefined) {
        interest.value = await _fetchInterest()
      }
    }

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
      resume,
      interest,
      fetchResume,
      fetchInterest,
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
