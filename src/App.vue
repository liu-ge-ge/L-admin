<template>
  <a-config-provider :locale="zhCN">
    <router-view></router-view>
  </a-config-provider>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { SYSTEM_SIDEBAR_NAME } from './config/setting'
import { SYSTEM_TOPBAR_NAME } from './config/setting'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
onMounted(() => {
  let sidebarTheme = localStorage.getItem(SYSTEM_SIDEBAR_NAME) || ''
  let topBarTheme = localStorage.getItem(SYSTEM_TOPBAR_NAME) || ''
  if (!sidebarTheme) {
    localStorage.setItem(SYSTEM_SIDEBAR_NAME, 'dark')
  }
  if (!topBarTheme) {
    localStorage.setItem(SYSTEM_TOPBAR_NAME, '#fff')
  }
})
</script>
<style lang="less">
@import url('ant-design-vue/dist/antd.variable.less');
@import url('@/assets/styles/common/var.css');
@import url('@/assets/styles/common/common.less');
#app {
  width: 100%;
  height: 100%;
}
</style>
