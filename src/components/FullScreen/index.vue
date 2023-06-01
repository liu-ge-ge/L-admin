<template>
	<fullscreen-outlined
		v-if="!fullScreen"
		style="font-size: 20px"
		@click="onFullscreen"
	/>
	<fullscreen-exit-outlined
		v-else
		style="font-size: 20px"
		@click="onFullscreen"
	/>
</template>
<script setup lang="ts">
import { isFullscreen, toggleFullscreen } from '@/utils'
import {
	FullscreenOutlined,
	FullscreenExitOutlined,
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
let fullScreen = ref(false)

fullScreen.value = isFullscreen()
/* 全屏切换 */
const onFullscreen = () => {
	try {
		fullScreen.value = toggleFullscreen()
	} catch (e) {
		message.error('您的浏览器不支持全屏模式')
	}
}
</script>
