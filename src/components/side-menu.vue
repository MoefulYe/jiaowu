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
import { isMobile } from '../util/reponsive'
import { renderIcon, renderRouterLink } from '../util/render'

enum Entry {
  Toggle,
  Person,
  Profile, //个人信息
  Education, //学业情况
  Market, //市场行情
  Job, //职业行情
  SkillRequire, //技能需求
  Trend,
  Guide, //学习指导
  Plan, //规划
  Material, //推荐
  Interest, //兴趣评估
  Skill //技能评估
}

const emit = defineEmits<{
  toggle: [value: boolean]
}>()

const isCollapsed = ref(true)
const menuEntries = computed<MenuOption[]>(() => [
  {
    label: isCollapsed.value ? '展开' : '收起',
    key: Entry.Toggle,
    show: !isMobile.value,
    icon: isCollapsed.value
      ? renderIcon(<span class="icon-[ant-design--menu-unfold-outlined] text-2xl" />)
      : renderIcon(<span class="icon-[ant-design--menu-fold-outlined] text-2xl" />)
  },
  {
    label: '个人中心',
    key: Entry.Person,
    icon: renderIcon(<span class="icon-[ph--person-simple] text-2xl" />),
    children: [
      {
        label: renderRouterLink('/profile', '基本信息'),
        key: Entry.Profile,
        icon: renderIcon(<span class="icon-[material-symbols--identity-platform]" />)
      },
      {
        label: renderRouterLink('/academic', '学业信息'),
        key: Entry.Education,
        icon: renderIcon(<span class="icon-[fluent-mdl2--education]" />)
      }
    ]
  },
  {
    label: '市场行情',
    key: Entry.Market,
    icon: renderIcon(<span class="icon-[clarity--world-line] text-2xl" />),
    children: [
      {
        label: renderRouterLink('/job/market', '职业行情'),
        key: Entry.Job,
        icon: renderIcon(<span class="icon-[flowbite--bars-from-left-outline]" />)
      },
      {
        label: renderRouterLink('/job/skill', '技能需求'),
        key: Entry.SkillRequire,
        icon: renderIcon(<span class="icon-[carbon--intent-request-active]" />)
      },
      {
        label: renderRouterLink('/job/trend', '行业趋势'),
        key: Entry.Trend,
        icon: renderIcon(<span class="icon-[ph--trend-up]" />)
      }
    ]
  },
  {
    label: '学习指导',
    key: Entry.Guide,
    icon: renderIcon(<span class="icon-[ep--guide] text-2xl" />),
    children: [
      {
        label: renderRouterLink('/study/plan', '学习规划'),
        key: Entry.Plan,
        icon: renderIcon(<span class="icon-[ph--paper-plane-tilt-light]" />)
      },
      {
        label: renderRouterLink('/study/material', '资源推荐'),
        key: Entry.Material,
        icon: renderIcon(<span class="icon-[lets-icons--materials-light]" />)
      }
    ]
  },
  {
    label: renderRouterLink('/interest', '兴趣评估'),
    key: Entry.Interest,
    icon: renderIcon(<span class="icon-[solar--heart-linear] text-2xl" />)
  },
  {
    label: renderRouterLink('/skill', '技能评估'),
    key: Entry.Skill,
    icon: renderIcon(<span class="icon-[ph--exam] text-2xl" />)
  }
])

const handleClick = async (entry: Entry) => {
  switch (entry) {
    case Entry.Toggle:
      isCollapsed.value = !isCollapsed.value
      emit('toggle', isCollapsed.value)
      break
  }
}
</script>
