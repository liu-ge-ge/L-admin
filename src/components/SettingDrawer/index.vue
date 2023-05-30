<template>
	<more-outlined
		@click="showDrawer"
		style="margin-left: 20px; font-size: 20px"
	/>
	<a-drawer
		:closable="false"
		v-model:visible="visible"
		class="custom-class"
		:title="t('setting.systemSetting')"
		placement="right"
		@after-visible-change="afterVisibleChange"
	>
		<!-- 侧边栏 -->
		<div class="item">
			<p style="color: red">{{ t('setting.sidebarColor') }}</p>
			<div class="list">
				<div class="box" @click="changeSidebarTheme('dark')">
					<div class="icon">
						<check-outlined v-if="sidebarTheme === 'dark'" />
					</div>
					<div style="width: 20%; height: 100%; background-color: black"></div>
					<div style="width: 80%; height: 20px; background-color: #fff"></div>
				</div>
				<div class="box" @click="changeSidebarTheme('light')">
					<div class="icon">
						<check-outlined v-if="sidebarTheme === 'light'" />
					</div>
					<div style="width: 20%; height: 100%; background-color: #fff"></div>
					<div style="width: 80%; height: 20px; background-color: #fff"></div>
				</div>
			</div>
		</div>
		<!-- 顶栏 -->
		<div class="item" style="margin-top: 20px">
			<p style="color: red">{{ t('setting.topbarColor') }}</p>
			<div class="list">
				<div class="box" @click="changeTopBarTheme('#fff')">
					<div class="icon">
						<check-outlined v-if="topBarTheme === '#fff'" />
					</div>
					<div style="width: 20%; height: 100%; background-color: #fff"></div>
					<div style="width: 80%; height: 20px; background-color: #fff"></div>
				</div>
				<div class="box" @click="changeTopBarTheme('#000')">
					<div class="icon">
						<check-outlined v-if="topBarTheme === '#000'" />
					</div>
					<div style="width: 20%; height: 100%; background-color: #fff"></div>
					<div style="width: 80%; height: 20px; background-color: #000"></div>
				</div>
			</div>
		</div>

		<!-- 预设主题色 -->
		<div class="item" style="margin-top: 20px">
			<p style="color: red">{{ t('setting.systemColor') }}</p>
			<div class="colorList">
				<div
					class="block"
					:style="{ backgroundColor: item }"
					v-for="item in predefineColors"
					:key="item"
				></div>
				<color-picker @changeColor="setColor"></color-picker>
			</div>
		</div>
		<!-- 暗黑模式 -->
		<div
			style="margin-top: 20px; display: flex; justify-content: space-between"
		>
			<span>{{ t('setting.darkMode') }}</span>
			<a-switch v-model:checked="checked" @change="themeChange" />
		</div>
	</a-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import useGlobalStore from '@/store/global'
import { storeToRefs } from 'pinia'
import { ConfigProvider } from 'ant-design-vue'
import ColorPicker from '../ColorPicker/index.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const store = useGlobalStore()
const { setSidevarTheme, setTopBarTheme } = store
const { sidebarTheme, topBarTheme } = storeToRefs(store)

const checked = ref<boolean>(false)

const visible = ref<boolean>(false)

// 颜色选择器预设颜色
const predefineColors = ref<string[]>([
	'#f5222d',
	'#fa541c',
	'#fa8c16',
	'#faad14',
	'#a0d911',
	'#52c41a',
	'#13c2c2',
	'#2f54eb',
	'#722ed1',
	'#eb2f96',
])

const afterVisibleChange = (bool: boolean) => {
	console.log('visible', bool)
}

const showDrawer = () => {
	visible.value = true
}

const changeSidebarTheme = (val: string) => {
	setSidevarTheme(val)
	sidebarTheme.value = val
}

const changeTopBarTheme = (val: string) => {
	setTopBarTheme(val)
	topBarTheme.value = val
}

const setColor = (color: string) => {
	document.documentElement.style.setProperty('--ant-primary-color', color)
	ConfigProvider.config({
		theme: {
			primaryColor: color,
		},
	})
}

const themeChange = (e: boolean) => {
	if (e) {
		document.documentElement.style.setProperty('--system-bg', '#000')
		document.documentElement.style.setProperty('--system-content', '#141414')
		document.documentElement.style.setProperty('--system-text-color', '#fff')
		changeSidebarTheme('dark')
		changeTopBarTheme('#000')
	} else {
		document.documentElement.style.setProperty('--system-bg', '#eee')
		document.documentElement.style.setProperty('--system-content', '#fff')
		document.documentElement.style.setProperty('--system-text-color', '#000')
		changeSidebarTheme('light')
		changeTopBarTheme('#fff')
	}
}
</script>
<style lang="less">
.ant-drawer-wrapper-body,
.ant-drawer-header,
.ant-drawer-title {
	background-color: @system-content;
	color: @system-text-color;
}
.custom-class {
	.item {
		.list {
			display: flex;
			justify-content: space-between;
		}
		.box {
			width: 100px;
			height: 60px;
			display: flex;
			background-color: #d4dad5;
			box-shadow: 0 0 3px #64e4c4;
			border-radius: 5px;
			overflow: hidden;
			position: relative;
			.icon {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translateX(-50%) translateY(-50%);
				color: @primary-color;
			}
		}

		.colorList {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.block {
				width: 20px;
				height: 20px;
				border-radius: 4px;
			}
		}
	}
}
</style>
