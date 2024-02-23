import { ref } from 'vue'

export const sm = 640
export const md = 768
export const lg = 1024
export const xl = 1280
export const xxl = 1536

export const isMobile = ref(window.innerWidth <= sm)
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth <= sm
})
