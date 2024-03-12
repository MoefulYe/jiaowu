/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_TITLE: string
  readonly VITE_AXIOS_BASE_URL: string
  readonly VITE_QIANFAN_AK: string
  readonly VITE_QIANFAN_SK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
