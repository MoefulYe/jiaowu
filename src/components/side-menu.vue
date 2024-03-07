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
import { useStateStore } from '../stores/user-state'
import { gotoLogin } from '../router'
import confirm from './confirm'

enum Entry {
  Toggle,
  Home,
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
  Evaluation,
  Assessment, //兴趣评估
  Interest, //技能评估
  Logout,
  Recommand,
  Resume
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
    label: renderRouterLink('/welcome', '首页'),
    key: Entry.Home,
    icon: renderIcon(<span class="icon-[ant-design--home-outlined] text-2xl" />)
  },
  {
    label: '个人中心',
    key: Entry.Person,
    icon: renderIcon(<span class="icon-[ph--person] text-2xl" />),
    children: [
      {
        label: renderRouterLink('/profile', '基本信息'),
        key: Entry.Profile,
        icon: renderIcon(<span class="icon-[ant-design--idcard-outlined]" />)
      },
      {
        label: renderRouterLink('/academic', '学业信息'),
        key: Entry.Education,
        icon: renderIcon(<span class="icon-[fluent-mdl2--education]" />)
      },
      {
        label: renderRouterLink('/resume', '简历管理'),
        key: Entry.Resume,
        icon: renderIcon(<span class="icon-[ph--read-cv-logo]" />)
      }
    ]
  },
  {
    label: '市场行情',
    key: Entry.Market,
    icon: renderIcon(<span class="icon-[solar--global-outline] text-2xl" />),
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
        label: renderRouterLink('/job/trend', '趋势分析'),
        key: Entry.Trend,
        icon: renderIcon(<span class="icon-[ph--trend-up]" />)
      }
    ]
  },
  {
    label: '职业评估',
    key: Entry.Evaluation,
    icon: renderIcon(<span class="icon-[carbon--cube] text-2xl" />),
    children: [
      {
        label: renderRouterLink('/assessment', '职业测评'),
        key: Entry.Assessment,
        icon: renderIcon(<span class="icon-[ph--exam]" />)
      },
      {
        label: renderRouterLink('/interest', '兴趣方向'),
        key: Entry.Interest,
        icon: renderIcon(<span class="icon-[ph--heart]" />)
      },
      {
        label: renderRouterLink('/recommand', '职业推荐'),
        key: Entry.Recommand,
        icon: renderIcon(<span class="icon-[ph--lightbulb]" />)
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
        icon: renderIcon(<span class="icon-[ph--paper-plane-tilt]" />)
      },
      {
        label: renderRouterLink('/study/material', '资源推荐'),
        key: Entry.Material,
        icon: renderIcon(<span class="icon-[lets-icons--materials]" />)
      }
    ]
  },
  {
    label: '退出登录',
    key: Entry.Logout,
    icon: renderIcon(<span class="icon-[iconamoon--exit-light] text-2xl" />)
  }
])

const handleClick = async (entry: Entry) => {
  switch (entry) {
    case Entry.Toggle:
      isCollapsed.value = !isCollapsed.value
      emit('toggle', isCollapsed.value)
      break
    case Entry.Logout:
      if (await confirm('注销', '确定要注销吗？')) {
        useStateStore().logout()
        gotoLogin()
      }
      break
  }
}
</script>
