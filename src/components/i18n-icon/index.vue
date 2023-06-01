<template>
	<a-dropdown class="drop">
		<global-outlined style="font-size: 20px" />
		<template #overlay>
			<a-menu :selected-keys="language" @click="handleClick">
				<a-menu-item key="en">English</a-menu-item>
				<a-menu-item key="zh">简体中文</a-menu-item>
			</a-menu>
		</template>
	</a-dropdown>
</template>
<script setup lang="ts">
import { GlobalOutlined } from '@ant-design/icons-vue'
import { MenuProps } from 'ant-design-vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { SYSTEM_LOCALE_NAME } from '@/config/setting'
const { locale } = useI18n()
// 当前显示语言
const language = computed(() => [locale.value])

const handleClick: MenuProps['onClick'] = ({ key }) => {
	locale.value = key as string
	localStorage.setItem(SYSTEM_LOCALE_NAME, key as string)
}
</script>
<style lang="less">
.drop {
	margin-left: 5%;
}
</style>
