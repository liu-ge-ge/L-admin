<template>
  <div class="tags" :style="{ backgroundColor: props.topBarTheme }">
    <div
      @click="routePush(item)"
      class="box"
      v-for="item in routeList"
      :key="item.title"
      :style="{
        backgroundColor: route.meta.title === item.title ? 'var(--ant-primary-3)' : '',
        color: route.meta.title === item.title ? 'var(--ant-primary-7)' : '',
      }"
    >
      <div
        class="round"
        :style="{
          backgroundColor: route.meta.title === item.title ? 'var(--ant-primary-6)' : '#999',
        }"
      ></div>
      {{ item.title }}
      <close-outlined v-if="route.name === item.name" style="margin-left: 5px; font-size: 12px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import HistoryTags, { Item } from './index'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
interface HistoryProps {
  topBarTheme: string
}
const props = defineProps<HistoryProps>()
let routeList = HistoryTags.routeList

const routePush = (item: Item) => {
  if (item.name != route.meta.name) {
    router.push({ name: item.name })
  }
}
</script>

<style lang="less">
.tags {
  width: 100%;
  height: 55px;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  .box {
    padding: 0 20px;
    height: 35px;
    // background-color: var(--ant-primary-3);
    // color: var(--ant-primary-7);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    .round {
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: var(--ant-primary-6);
      margin-right: 10px;
    }
  }
}
</style>
