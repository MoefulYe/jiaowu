import { ref } from 'vue'
import { defineStore } from 'pinia'

export enum UserState {
  Unlogin,
  //未填写个人资料
  UnfillBasicInfo,
  Ok
}

export const useStateStore = defineStore(
  'State',
  () => {
    const _token = ref(
      'XZk4j5az8ohvrJzRqqvzRm9VYeBJrpn5MbbQsloH6LpeeDdDLH5kPNhyCEoj7el39TGyXLtYrJQH5ukKIpKM4I9dVwnlLwTuRx2OCZgbsDKhT60l6I0IJZn1H2saA9hP'
    )
    const _username = ref('王士杨')
    const _state = ref(UserState.Unlogin)

    const login = (token: string, username: string) => {
      _token.value = token
      _username.value = username
      _state.value = UserState.Ok
    }

    const register = (token: string, username: string) => {
      _token.value = token
      _username.value = username
      _state.value = UserState.UnfillBasicInfo
    }

    const logout = () => {
      _token.value = ''
      _username.value = ''
      _state.value = UserState.Unlogin
    }

    const fill = () => {
      _state.value = UserState.Ok
    }

    const unlogin = (): boolean => _state.value === UserState.Unlogin
    const unfill = (): boolean => _state.value === UserState.UnfillBasicInfo
    const ok = (): boolean => _state.value === UserState.Ok

    return {
      token: _token,
      username: _username,
      state: _state,
      login,
      register,
      logout,
      fill,
      unlogin,
      unfill,
      ok
    }
  },
  {
    persist: {
      storage: window.localStorage
    }
  }
)

export type StateStore = ReturnType<typeof useStateStore>
