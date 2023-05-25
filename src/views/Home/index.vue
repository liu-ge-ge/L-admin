<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible :theme="sidebarTheme">
      <div class="system-name" :style="{ color: sidebarTheme === 'dark' ? '#fff' : '#000' }">
        <img src="../../../public/vite.svg" />
        {{ SYSTEM_NAME }}
      </div>
      <a-menu id="menu" v-model:selectedkeys="selectedKeys" mode="inline" :theme="sidebarTheme">
        <a-sub-menu v-for="item in routes" :key="item.name">
          <template #icon>
            <component :is="item.meta?.icon" />
          </template>
          <template #title>{{ item.meta?.title || item.name }}</template>
          <a-menu-item @click="menuItemClick(children)" v-for="children in item.children" :key="children.name">
            <component :is="children.meta?.icon" />
            {{ children.meta?.title }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout class="rightLayout">
      <a-layout-header
        class="header"
        :style="{
          backgroundColor: topBarTheme,
          borderBottom: topBarTheme === '#000' ? '1px solid #413e3e' : '1px solid #eee',
          color: topBarTheme === '#000' ? '#fff' : '#000',
        }"
      >
        <div class="left">
          <menu-unfold-outlined
            style="font-size: 20px"
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined style="font-size: 20px" v-else class="trigger" @click="() => (collapsed = !collapsed)" />

          <span
            v-for="(item, index) in topPageUrl"
            :key="item"
            :style="{ color: index === 0 ? '#999' : '', marginLeft: index === 0 ? '5%' : 0 }"
            >{{ item }} <span v-if="index === 0"> / </span>
          </span>
        </div>
        <div class="right">
          <full-screen></full-screen>
          <i18n-icon></i18n-icon>
          <header-tools></header-tools>
          <user-info></user-info>
          <setting-drawer></setting-drawer>
        </div>
      </a-layout-header>
      <history-tags :topBarTheme="topBarTheme"></history-tags>
      <a-layout-content class="layout-content" :style="{ margin: '24px 16px', minHeight: '280px' }">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer class="layout-footer" style="text-align: center">
        {{ SYSTEM_PAGE_FOOTER }}
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { SYSTEM_PAGE_FOOTER, SYSTEM_NAME } from '@/config/setting'
import FullScreen from '../../components/FullScreen/index.vue'
import I18nIcon from '../../components/i18n-icon/index.vue'
import HeaderTools from '../../components/HeaderTools/index.vue'
import UserInfo from '../../components/UserInfo/index.vue'
import SettingDrawer from '../../components/SettingDrawer/index.vue'
import HistoryTags from '../../components/HistoryTags/index.vue'
import useGlobalStore from '@/store/global'
import useUserStore from '@/store/user'
import { storeToRefs } from 'pinia'

const store = useGlobalStore()
const { sidebarTheme, topBarTheme } = storeToRefs(store)

let collapsed = ref(false)
const selectedKeys = ref<string[]>(['workbench'])
const router = useRouter()

const userStore = useUserStore()
const { routeList } = storeToRefs(userStore)
const home = routeList.value[0].children
const routes = home ? home[0]['children'] : []
const route = useRoute()
const topPageUrl = route.fullPath.split('/').slice(1)

const menuItemClick = (children: any) => {
  selectedKeys.value = [children.name]
  router.push({ path: children.path })
}

watch(
  () => router.currentRoute.value.name,
  (newVal) => {
    console.log(newVal, 'newVal')
    selectedKeys.value = [newVal] as string[]
  },
  {
    immediate: true,
  }
)

watch([() => sidebarTheme.value, () => topBarTheme.value], (newValue) => {
  sidebarTheme.value = newValue[0] || 'dark'
  topBarTheme.value = newValue[1] || '#000'
})
</script>
<style lang="less">
.layout {
  width: 100%;
  height: 100%;
  .rightLayout {
    background-color: @system-bg;
    color: @system-text-color;
    .layout-footer {
      background-color: @system-bg;
    }
  }
  .system-name {
    height: 50px;
    color: white;
    text-align: center;
    line-height: 50px;
  }
  .header {
    background: #fffefe;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left,
    .right {
      width: 50%;
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
