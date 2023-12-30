<template>
  <NMenu
    :collapsed="isCollapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuEntries"
    @update-value="handleClick"
  />
</template>

<script setup lang="tsx">
import { type MenuOption, NMenu } from 'naive-ui/lib'
import { ref, computed } from 'vue'
import { GlobalOutlined } from '@vicons/antd'
import { PaperPlaneOutline, PersonOutline } from '@vicons/ionicons5'
import { Wrench20Regular } from '@vicons/fluent'
import {
  UserProfile,
  Education,
  FaceCool,
  Growth,
  ZoomArea,
  Book,
  FaceSatisfied
} from '@vicons/carbon'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@vicons/antd'
import { isMobile } from '../util/reponsive'
import { renderIcon, renderRouterLink } from '../util/render'

enum Entry {
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

const emit = defineEmits<{
  toggle: [value: boolean]
}>()

const isCollapsed = ref(true)
const menuEntries = computed<MenuOption[]>(() => {
  const entries = [
    {
      label: '个人中心',
      key: Entry.Person,
      icon: renderIcon(<PersonOutline />),
      children: [
        {
          label: renderRouterLink('/profile', '基本信息'),
          key: Entry.Profile,
          icon: renderIcon(<UserProfile />)
        },
        {
          label: renderRouterLink('/academic', '学业信息'),
          key: Entry.Education,
          icon: renderIcon(<Education />)
        }
      ]
    },
    {
      label: '市场行情',
      key: Entry.Market,
      icon: renderIcon(<GlobalOutlined />),
      children: [
        {
          label: renderRouterLink('/job/market', '职业行情'),
          key: Entry.Job,
          icon: renderIcon(<Growth />)
        },
        {
          label: renderRouterLink('/job/skill', '技能需求'),
          key: Entry.SkillNeed,
          icon: renderIcon(<FaceCool />)
        }
      ]
    },
    {
      label: '学习指导',
      key: Entry.Guide,
      icon: renderIcon(<ZoomArea />),
      children: [
        { label: '学习规划', key: Entry.Guide, icon: renderIcon(<PaperPlaneOutline />) },
        { label: '资源推荐', key: Entry.Recommand, icon: renderIcon(<Book />) }
      ]
    },
    {
      label: '兴趣评估',
      key: Entry.Interest,
      icon: renderIcon(<FaceSatisfied />)
    },
    {
      label: '技能评估',
      key: Entry.Skill,
      icon: renderIcon(<Wrench20Regular />)
    }
  ]
  if (!isMobile().value) {
    entries.unshift({
      label: isCollapsed.value ? '展开' : '收起',
      key: Entry.Toggle,
      icon: isCollapsed.value
        ? renderIcon(<MenuUnfoldOutlined />)
        : renderIcon(<MenuFoldOutlined />)
    })
  }
  return entries
})

const handleClick = async (entry: Entry) => {
  switch (entry) {
    case Entry.Toggle:
      isCollapsed.value = !isCollapsed.value
      emit('toggle', isCollapsed.value)
      break
  }
}
</script>
