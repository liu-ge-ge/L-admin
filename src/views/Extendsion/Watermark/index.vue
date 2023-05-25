<template>
  <div style="background: var(--system-content); padding: 30px">
    <a-card :bordered="false" style="width: 100%">
      <template #title>
        <a-button type="primary" @click="downImage">
          <download-outlined />
          下载图片</a-button
        >
      </template>
      <svg class="down" width="1100" height="200">
        <foreignObject x="0" y="0" width="1100" height="200">
          <div id="water"></div>
        </foreignObject>
      </svg>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import { __canvasWM, divTOimage } from '@/utils'
import { onMounted, ref } from 'vue'
let alink = ref<HTMLElement>()
onMounted(() => {
  let container = document.querySelector('#water') as HTMLElement
  __canvasWM({
    content: 'L后台管理系统水印',
    container,
    width: '260px',
    height: '50px',
  })
  divTOimage('.down', (a) => {
    alink.value = a
  })
})

const downImage = () => {
  console.log(alink, 'alink')
  alink.value?.click()
}
</script>
<style lang="less">
#water {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
}
</style>
