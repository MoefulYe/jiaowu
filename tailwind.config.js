/** @type {import('tailwindcss').Config} */
import { addDynamicIconSelectors } from '@iconify/tailwind'

export default {
  corePlugins: {
    preflight: false
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {}
  },
  plugins: [
    addDynamicIconSelectors()
  ]
}
