import { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider'
import { LoadingBarApiInjection } from 'naive-ui/lib/loading-bar/src/LoadingBarProvider'
import { Router } from 'vue-router'
import type { DialogApiInjection } from 'naive-ui/lib/dialog/src/DialogProvider'
import type { useStateStore } from '@/stores/user-state'

declare global {
  interface Window {
    $message: MessageApiInjection
    $loading: LoadingBarApiInjection
    $dialog: DialogApiInjection
    $state: ReturnType<typeof useStateStore>
    $router: Router
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    requiresLogin?: boolean
  }
}
