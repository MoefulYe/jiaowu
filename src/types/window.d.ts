import { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider'
import { LoadingBarApiInjection } from 'naive-ui/lib/loading-bar/src/LoadingBarProvider'
import { DialogApiInjection } from 'naive-ui/lib/dialog/src/DialogProvider'
import { Router } from 'vue-router'
import { Role } from '@/stores/user-state'

declare global {
  interface Window {
    $message: MessageApiInjection
    $loading: LoadingBarApiInjection
    $dialog: DialogApiInjection
    $router: Router
  }

  interface Pagination<T> {
    total: number,
    data: T[]
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    role?: Role
  }
}
