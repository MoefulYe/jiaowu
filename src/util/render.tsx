import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'

export const renderIcon = (icon: JSX.Element) => () => <NIcon>{icon}</NIcon>
export const renderRouterLink = (to: string, label: string) => () => (
  <RouterLink to={to}>{label}</RouterLink>
)
