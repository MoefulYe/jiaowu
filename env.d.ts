/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_TITLE: string
  readonly VITE_AXIOS_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
