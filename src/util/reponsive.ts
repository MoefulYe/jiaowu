import { ref, type Ref } from 'vue'

export const screenWidth = (): Ref<number> => {
  const width = ref(window.innerWidth)
  window.addEventListener('resize', () => {
    width.value = window.innerWidth
  })
  return width
}
export const sm = 640
export const md = 768
export const lg = 1024
export const xl = 1280
export const xxl = 1536

export const isMobile = (): Ref<boolean> => {
  const width = screenWidth()
  return ref(width.value <= sm)
}
