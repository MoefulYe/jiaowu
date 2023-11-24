import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore(
  'token',
  () => {
    const token = ref(
      'XZk4j5az8ohvrJzRqqvzRm9VYeBJrpn5MbbQsloH6LpeeDdDLH5kPNhyCEoj7el39TGyXLtYrJQH5ukKIpKM4I9dVwnlLwTuRx2OCZgbsDKhT60l6I0IJZn1H2saA9hP'
    )
    const username = ref('文殊院')
    return { token, username }
  },
  {
    persist: {
      storage: window.localStorage
    }
  }
)
