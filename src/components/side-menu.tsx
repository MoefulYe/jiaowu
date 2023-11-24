import { type MenuOption, NIcon, NMenu } from 'naive-ui/lib'
import { defineComponent, ref } from 'vue'
import { UnorderedListOutlined } from '@vicons/antd'
import { Task, ChartArea, Wallet } from '@vicons/carbon'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@vicons/antd'
import { RouterLink } from 'vue-router'
import { isMobile } from '../util/reponsive'

const renderIcon = (icon: any) => () => <NIcon>{icon}</NIcon>
const renderRouterLink = (to: string, label: string) => () => (
  <RouterLink to={to}>{label}</RouterLink>
)

enum Keys {
  toggle
}

export default defineComponent({
  setup(props, { emit }) {
    const isCollapsed = ref(true)
    const menuItems: MenuOption[] = []
    if (!isMobile().value) {
      menuItems.unshift({
        label: () => <>{isCollapsed.value == true ? '展开' : '收起'}</>,
        key: Keys.toggle,
        icon: () => (
          <>
            {isCollapsed.value == true ? (
              <NIcon>
                <MenuUnfoldOutlined />
              </NIcon>
            ) : (
              <NIcon>
                <MenuFoldOutlined />
              </NIcon>
            )}
          </>
        )
      })
    }

    const handleClick = async (key: Keys) => {
      switch (key) {
        case Keys.toggle:
          isCollapsed.value = !isCollapsed.value
          emit('toggle', isCollapsed.value)
          break
      }
    }

    return () => (
      <NMenu
        collapsed={isCollapsed.value}
        collapsedWidth={64}
        collapsedIconSize={22}
        options={menuItems}
        onUpdate:value={handleClick}
      />
    )
  }
})
