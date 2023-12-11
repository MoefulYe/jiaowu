import { type MenuOption, NIcon, NMenu } from 'naive-ui/lib'
import { defineComponent, ref } from 'vue'
import { GlobalOutlined } from '@vicons/antd'
import { PaperPlaneOutline, PersonOutline } from '@vicons/ionicons5'
import { Wrench20Regular, WrenchScrewdriver20Regular } from '@vicons/fluent'
import {
  Information,
  UserProfile,
  Education,
  FaceCool,
  Growth,
  ZoomArea,
  Book,
  FaceSatisfied
} from '@vicons/carbon'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@vicons/antd'
import { RouterLink } from 'vue-router'
import { isMobile } from '../util/reponsive'

const renderIcon = (icon: any) => () => <NIcon>{icon}</NIcon>
const renderRouterLink = (to: string, label: string) => () => (
  <RouterLink to={to}>{label}</RouterLink>
)

enum Keys {
  Toggle,
  Person,
  Profile, //个人信息
  Education, //学业情况
  Market, //市场行情
  Job, //职业行情
  SkillNeed, //技能需求
  Guide, //学习指导
  Plan, //规划
  Recommand, //推荐
  Interest, //兴趣评估
  Skill //技能评估
}

export default defineComponent({
  setup(props, { emit }) {
    const isCollapsed = ref(true)
    const menuItems: MenuOption[] = [
      {
        label: '个人中心',
        key: Keys.Person,
        icon: renderIcon(<PersonOutline />),
        children: [
          {
            label: renderRouterLink('/profile', '基本信息'),
            key: Keys.Profile,
            icon: renderIcon(<UserProfile />)
          },
          {
            label: renderRouterLink('/academic', '学业信息'),
            key: Keys.Education,
            icon: renderIcon(<Education />)
          }
        ]
      },
      {
        label: '市场行情',
        key: Keys.Market,
        icon: renderIcon(<GlobalOutlined />),
        children: [
          {
            label: renderRouterLink('/job/market', '职业行情'),
            key: Keys.Job,
            icon: renderIcon(<Growth />)
          },
          {
            label: renderRouterLink('/job/skill', '技能需求'),
            key: Keys.SkillNeed,
            icon: renderIcon(<FaceCool />)
          }
        ]
      },
      {
        label: '学习指导',
        key: Keys.Guide,
        icon: renderIcon(<ZoomArea />),
        children: [
          { label: '学习规划', key: Keys.Guide, icon: renderIcon(<PaperPlaneOutline />) },
          { label: '资源推荐', key: Keys.Recommand, icon: renderIcon(<Book />) }
        ]
      },
      {
        label: '兴趣评估',
        key: Keys.Interest,
        icon: renderIcon(<FaceSatisfied />)
      },
      {
        label: '技能评估',
        key: Keys.Skill,
        icon: renderIcon(<Wrench20Regular />)
      }
    ]
    if (!isMobile().value) {
      menuItems.unshift({
        label: () => <>{isCollapsed.value ? '展开' : '收起'}</>,
        key: Keys.Toggle,
        icon: () => (
          <>
            {isCollapsed.value ? (
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
        case Keys.Toggle:
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
