<template>
	<a-layout class="layout">
		<div v-if="isShowT && topLevel" class="masking" @click="handleMask"></div>
		<a-layout-sider
			v-show="isShowT"
			v-model:collapsed="collapsed"
			:trigger="null"
			collapsible
			:theme="sidebarTheme"
			:class="[topLevel ? 'topLevel' : '']"
		>
			<div
				class="system-name"
				:style="{ color: sidebarTheme === 'dark' ? '#fff' : '#000' }"
			>
				<img src="../../../public/vite.svg" />
				<span v-if="!collapsed">{{ SYSTEM_NAME }}</span>
			</div>
			<a-menu
				id="menu"
				v-model:selectedKeys="selectedKeys"
				v-model:openKeys="openKeys"
				mode="inline"
				:theme="sidebarTheme"
			>
				<a-sub-menu
					v-for="(item, index) in routes"
					v-show="item.children?.length"
					:key="'sub-' + index"
				>
					<template #icon>
						<component :is="item.meta?.icon" />
					</template>
					<template #title>{{ item.meta?.title || item.name }}</template>
					<a-menu-item
						v-for="(children, index2) in item.children"
						:key="'sub-' + index + '-' + index2"
						@click="menuItemClick(children)"
					>
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
					borderBottom:
						topBarTheme === '#000' ? '1px solid #413e3e' : '1px solid #eee',
					color: topBarTheme === '#000' ? '#fff' : '#000',
				}"
			>
				<div class="left">
					<menu-unfold-outlined
						v-if="collapsed"
						style="font-size: 20px"
						class="trigger"
						@click="showT"
					/>
					<menu-fold-outlined
						v-else
						style="font-size: 20px"
						class="trigger"
						@click="showT"
					/>

					<span
						v-for="(item, index) in topPageUrl"
						v-show="!topLevel"
						:key="item"
						:style="{
							color: index === 0 ? '#999' : '',
							marginLeft: index === 0 ? '5%' : 0,
						}"
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
			<history-tags :top-bar-theme="topBarTheme"></history-tags>
			<a-layout-content
				class="layout-content"
				:style="{ margin: '24px 16px', minHeight: '280px' }"
			>
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
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
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
let selectedKeys = ref<string[]>(['sub-0-0'])
let openKeys = ref<string[]>(['sub-0'])
const router = useRouter()

const userStore = useUserStore()
const { routeList } = storeToRefs(userStore)
const home = routeList.value[0].children
const routes = home ? home[0]['children'] : []
const route = useRoute()
const topPageUrl = route.fullPath.split('/').slice(1)
let topLevel = ref(false) //控制遮罩层和侧面面板是否绝对定位
let isShowT = ref(true) //控制侧面面板是否显示
const menuItemClick = (children: any) => {
	router.push({ path: children.path })
}

const showT = () => {
	collapsed.value = !collapsed.value
	if (!isShowT.value) {
		isShowT.value = true
	}
}

const handleMask = () => {
	isShowT.value = false
	collapsed.value = true
}

watch(
	() => router.currentRoute.value.name,
	(newVal) => {
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

const resize = () => {
	if (document.body.clientWidth <= 768) {
		collapsed.value = false
		topLevel.value = true
	} else {
		// collapsed.value = false
		topLevel.value = false
		isShowT.value = true
	}
}

onMounted(() => {
	window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
	window.removeEventListener('resize', resize)
})
</script>
<style lang="less" scoped>
.layout {
	width: 100%;
	height: 100%;
	.topLevel {
		position: absolute;
		z-index: 999;
		top: 0;
		left: 0;
		height: 100%;
	}
	.masking {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 99;
	}
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
